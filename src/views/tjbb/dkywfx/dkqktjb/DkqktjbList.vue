<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.dataDate" style="width: 100%;" :disabled-date="disabledDate" :format="monthFormat"></a-month-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.jgbm" dict="v_hr_bas_organization_cmms,zzjc,ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"></j-tree-select>
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
      <a-button @click="handleStatistics" type="primary" icon="plus" :loading="btnLoading" v-has="'dkqktj:statistics'">{{btnName}}</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('贷款情况统计表(二）')">导出</a-button>
      <span style="float: right; font-size: 10pt;font-weight: bold;">单元/万元、%</span>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
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
               :scroll="{x: 2000}"
               @change="handleTableChange">


        <span slot="jgmc" slot-scope="text">
          <j-ellipsis :value="text" :length="5"/>
        </span>
        <!--<span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
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
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import {notification} from "ant-design-vue";
  import {downFile, getAction, postAction} from "@/api/manage";
  import {filterObj} from "@/utils/util";
  import JEllipsis from "@/components/jeecg/JEllipsis";

  export default {
    name: "DkqktjbList",
    mixins:[JeecgListMixin],
    components: {JEllipsis, JTreeSelect},
    data () {
      return {
        description: '贷款情况统计表(二）管理页面',
        btnName: '数据统计',
        btnLoading: false,
        monthFormat: 'YYYY-MM',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'dataDate',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
          {
            title: '机构编码',
            align: "center",
            dataIndex: 'jgbm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgbm_dictText',
            scopedSlots: {customRender: 'jgmc'},
          },
          {
            title: '贷款余额',
            children: [
              {
                title: '本期贷款余额',
                align: "center",
                dataIndex: 'bqdkye',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '今年增减额',
                children: [
                  {
                    title: '比年初（+，-）',
                    align: "center",
                    dataIndex: 'jnzjeBnc',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                  {
                    title: '比上月（+，-）',
                    align: "center",
                    dataIndex: 'jnzjeBsy',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                ]
              },
              {
                title: '比上年同期增减额',
                align: "center",
                dataIndex: 'bsntqzje',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '增长率',
                align: "center",
                dataIndex: 'zzl',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '全年任务',
                align: "center",
                dataIndex: 'qnrw',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '完成比例',
                align: "center",
                dataIndex: 'wcbl',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '排名',
                align: "center",
                dataIndex: 'dkyePm'
              },
              {
                title: '其中',
                children: [
                  {
                    title: '农业贷款余额',
                    align: "center",
                    dataIndex: 'nydkye',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                  {
                    title: '非农业贷款余额',
                    align: "center",
                    dataIndex: 'fnydkye',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                ]
              },
            ]
          },
          {
            title: '贷款累放',
            align: "center",
            dataIndex: 'dklf',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '贷款累收',
            align: "center",
            dataIndex: 'djls',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '贷款到期收回率',
            children: [
              {
                title: '应收金额',
                align: "center",
                dataIndex: 'ysje',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '实收金额',
                align: "center",
                dataIndex: 'ssje',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '下欠余额',
                align: "center",
                dataIndex: 'xqye',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '收回率',
                align: "center",
                dataIndex: 'shl',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '排名',
                align: "center",
                dataIndex: 'dkdqshlPm'
              },
            ]
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
          list: "/tjbb/dkywfx/dkqktjb/list",
          // delete: "/tjbb/dkywfx/dkqktjb/delete",
          // deleteBatch: "/tjbb/dkywfx/dkqktjb/deleteBatch",
          exportXlsUrl: "tjbb/dkywfx/dkqktjb/exportXls",
          // importExcelUrl: "tjbb/dkywfx/dkqktjb/importExcel",
          statistics: "/tjbb/dkywfx/dkqktjb/statistics"
        },
      }
    },
    created() {
      this.getCurrentMonth()
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      /**
       * 限制a-date-picker组件不可选择比当前大的月份
       * @param current
       * @returns {*|boolean}
       */
      disabledDate(current) {
        return current && current > moment().endOf('day');
      },
      getCurrentMonth() {
        this.queryParam = {
          dataDate: undefined
        }
        this.queryParam.dataDate = moment(this.getCurrentDataFront()).format(this.dateFormat)
        console.info('默认统计月份:',this.queryParam.dataDate)
      },
      getCurrentDataFront () {
        var date = new Date()
        date.setDate(1)
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
      loadData(arg) {
        if (!this.url.list) {
          notification.error({ message: '系统提示', description: '请设置url.list属性!',duration: 4})
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();
        if (params.dataDate !== undefined && params.dataDate !== null && params.dataDate !== '') {
          params.dataDate = moment(params.dataDate).format('YYYY-MM') + '-01'
        }
        console.info('查询参数:',params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          } else {
            this.dataSource = [];
            this.ipagination.total = 0;
            this.loading = false;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },
      getQueryParams() {
        let tjyf = '';
        if (this.queryParam.dataDate) {
          tjyf = moment(this.queryParam.dataDate).format("YYYY-MM")+"-01";
        }
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.dataDate) {
          param.dataDate = tjyf;
        }
        return filterObj(param);
      },
      searchReset() {
        this.queryParam = {
          dataDate: undefined
        }
        this.getCurrentMonth()
        this.loadData(1)
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = Object.assign({}, this.queryParam)
        let tjyf = ''
        if (param.dataDate !== undefined && param.dataDate !== null && param.dataDate !== '') {
          tjyf = moment(param.dataDate).format("YYYY-MM") + '-01'
        }
        param.dataDate = tjyf;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
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
       * 贷款情况统计表（二）：数据统计
       */
      handleStatistics() {
        var params = this.getQueryParams();
        if (!params.dataDate) {
          notification.warning({message: '系统提示', description: '请选择统计月份进行统计！', duration: 4})
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
