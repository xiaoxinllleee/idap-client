<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;" :disabled-date="disabledDate" :format="monthFormat"></a-month-picker>
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
      <a-button @click="handleStatistics" type="primary" icon="plus" :loading="btnLoading" v-has="'lxwcqktj:statistics'">{{btnName}}</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('利息完成情况统计表（五）')">导出</a-button>
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
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import moment from 'moment'
  import {notification} from "ant-design-vue";
  import {downFile, getAction, postAction} from "@/api/manage";
  import {filterObj} from "@/utils/util";

  export default {
    name: "LxwcqktjbList",
    mixins:[JeecgListMixin],
    components: {JEllipsis, JTreeSelect},
    data () {
      return {
        description: '利息完成情况统计表（五）管理页面',
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
            dataIndex: 'tjyf',
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
            title: '利息收入',
            children: [
              {
                title: '利息总收入',
                align: "center",
                dataIndex: 'lxzsr',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '其中',
                children: [
                  {
                    title: '上年底应收利息余额',
                    align: "center",
                    dataIndex: 'sndYslxye',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                  {
                    title: '本月底应收利息余额',
                    align: "center",
                    dataIndex: 'bydYslxye',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                  {
                    title: '本年新增应收利息',
                    align: "center",
                    dataIndex: 'bnxzyslx',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                  {
                    title: '比上月（+，-）',
                    align: "center",
                    dataIndex: 'bsy',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                  {
                    title: '比上年同期（+，-）',
                    align: "center",
                    dataIndex: 'bsntq',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                  {
                    title: '比上年同期增长率',
                    align: "center",
                    dataIndex: 'bsntqzzl',
                    customRender:(text)=>{
                      if (text != null) {
                        return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      }
                    },
                  },
                ]
              },
              {
                title: '全年收入',
                align: "center",
                dataIndex: 'qnsr',
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
                title: '任务完成率排名',
                align: "center",
                dataIndex: 'rwwclpm'
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
          list: "/tjbb/dkywfx/lxwcqktjb/list",
          // delete: "/tjbb/dkywfx/lxwcqktjb/delete",
          // deleteBatch: "/tjbb/dkywfx/lxwcqktjb/deleteBatch",
          exportXlsUrl: "tjbb/dkywfx/lxwcqktjb/exportXls",
          // importExcelUrl: "tjbb/dkywfx/lxwcqktjb/importExcel",
          statistics: "/tjbb/dkywfx/lxwcqktjb/statistics"
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
          tjyf: undefined
        }
        this.queryParam.tjyf = moment(this.getCurrentDataFront()).format(this.monthFormat)
        console.info('默认统计月份:',this.queryParam.tjyf)
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
        if (params.tjyf !== undefined && params.tjyf !== null && params.tjyf !== '') {
          params.tjyf = moment(params.tjyf).format('YYYY-MM') + '-01'
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
        if (this.queryParam.tjyf) {
          tjyf = moment(this.queryParam.tjyf).format("YYYY-MM")+"-01";
        }
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (tjyf) {
          param.tjyf = tjyf;
        }
        return filterObj(param);
      },
      searchReset() {
        this.queryParam = {
          tjyf: undefined
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
        if (param.tjyf !== undefined && param.tjyf !== null && param.tjyf !== '') {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf;
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
       * 利息完成情况统计表（五）：数据统计
       */
      handleStatistics() {
        var params = this.getQueryParams();
        if (!params.tjyf) {
          notification.warning({message: '系统提示', description: '请选择统计月份进行统计！', duration: 4})
          return
        }
        this.loading = true
        this.btnLoading = true
        this.btnName = '正在统计，请稍等...'
        postAction(this.url.statistics,{'tjyf': params.tjyf}).then((res) => {
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
