<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.dataDate" :disabled-date="disabledDate" :format="dateFormat" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务">
              <j-dict-select-tag v-model="queryParam.xh" dict-code="ywzbmc"></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleStatistics" type="primary" icon="plus" :loading="btnLoading" v-has="'gxywqk:statistics'">{{btnName}}</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('各项业务情况表')">导出
      </a-button>
      <span style="float: right; font-size: 10pt;font-weight: bold;">单元/万元</span>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table bordered
               ref="table"
               size="small"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <!--<span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import {downFile, getAction, postAction} from "@/api/manage";
  import {notification} from "ant-design-vue";
  import {filterObj} from "@/utils/util";

  export default {
    name: "GxywqkbList",
    mixins: [JeecgListMixin],
    components: {},
    data() {
      return {
        description: '各项业务情况表管理页面',
        btnName: '数据统计',
        btnLoading: false,
        dateFormat: 'YYYY-MM-DD',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender: function (t, r, index) {
          //     return parseInt(index) + 1;
          //   }
          // },
          {
            title: '数据日期',
            align: "center",
            dataIndex: 'dataDate'
          },
          {
            title: '序号',
            align: "center",
            dataIndex: 'xh'
          },
          {
            title: '业务名称',
            align: "center",
            dataIndex: 'xh_dictText'
          },
          {
            title: '本期余额',
            align: "center",
            dataIndex: 'bqye',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '比昨日',
            align: "center",
            dataIndex: 'bzr',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '比上月',
            align: "center",
            dataIndex: 'bsy',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '比年初',
            align: "center",
            dataIndex: 'bnc',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '比上年同期',
            align: "center",
            dataIndex: 'bsntq',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz',
            width: 255,
          },
          // {
          //   title: '录入标识(0 导入 1 录入 2 修改)',
          //   align: "center",
          //   dataIndex: 'lrbz'
          // },
          // {
          //   title: '录入人',
          //   align: "center",
          //   dataIndex: 'lrr'
          // },
          // {
          //   title: '录入时间',
          //   align: "center",
          //   dataIndex: 'lrsj'
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: {customRender: 'action'},
          // }
        ],
        url: {
          list: "/tjbb/gxywqkb/list",
          // delete: "/tjbb/gxywqkb/delete",
          // deleteBatch: "/tjbb/gxywqkb/deleteBatch",
          exportXlsUrl: "tjbb/gxywqkb/exportXls",
          // importExcelUrl: "tjbb/gxywqkb/importExcel",
          statistics: "/tjbb/gxywqkb/statistics",
        },
      }
    },
    created() {
      this.getCurrentDate()
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      /**
       * 限制a-date-picker组件不可选择比当前大的日期
       * @param current
       * @returns {*|boolean}
       */
      disabledDate(current) {
        return current && current > moment()
      },
      getCurrentDate() {
        this.queryParam = {
          dataDate: undefined
        }
        this.queryParam.dataDate = moment(this.getCurrentDataFront()).format(this.dateFormat)
        console.info('默认统计数据日期:',this.queryParam.dataDate)
      },
      getCurrentDataFront () {
        var date = new Date()
        // date.setDate(1)
        var month = parseInt(date.getMonth() + 1)
        var day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        const time = date.getFullYear() + '-' + month + '-' + day
        return time
      },
      getQueryParams() {
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (!param.dataDate) {
          delete param.dataDate
        } else {
          // 日期格式化
          param.dataDate = moment(param.dataDate).format('YYYY-MM-DD')
        }
        if (param.xh === undefined || param.xh === 'undefined') {
          delete param.xh
        }
        return filterObj(param);
      },
      searchReset() {
        this.queryParam = {
          dataDate: undefined
        }
        this.getCurrentDate()
        this.loadData(1)
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = Object.assign({}, this.queryParam)
        if (param.xh === undefined || param.xh === 'undefined') {
          delete param.xh
        }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        // 日期格式化
        param.dataDate = moment(param.dataDate).format('YYYY-MM-DD')
        param.paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        console.log('下载参数:', param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          console.log('handleExportXls data:', data)
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xlsx');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xlsx';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(()=>{
          this.exportLoading = false
        })
      },
      /**
       * 各项业务情况：数据统计
       */
      handleStatistics() {
        var params = this.getQueryParams();
        if (!params.dataDate) {
          notification.warning({message: '系统提示', description: '请选择数据日期进行统计！', duration: 4})
          return
        }
        this.loading = true
        this.btnLoading = true
        this.btnName = '正在统计，请稍等...'
        postAction(this.url.statistics,{'dataDate': params.dataDate}).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '操作成功！', duration: 4})
          } else {
            notification.warning({message: '系统提示', description: res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: error, duration: 4})
        }).finally(() => {
          this.loading = false
          this.btnLoading = false
          this.btnName = '数据统计'
          this.loadData(1)
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
