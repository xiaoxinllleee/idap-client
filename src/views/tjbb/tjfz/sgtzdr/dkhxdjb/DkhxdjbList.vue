<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.dataDate" style="width: 100%;" @change='dateChage()' :disabled-date="disabledDate" :format="dateFormat"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.jgbm" dict="v_hr_bas_organization_cmms,zzjc,ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"></j-tree-select>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款户名">
              <j-input placeholder="请输入贷款户名" v-model="queryParam.custName" type="likemore"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus" v-has="'dkhxdjb:add'">新增</a-button>-->
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('贷款核销登记薄')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport" v-has="'dkhxdjb:import'">导入</a-button>
      <span style="float: right; font-size: 10pt;font-weight: bold;">单元/万元</span>
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
               :scroll="{x:2200}"
               @change="handleTableChange">

        <span slot="jgmc" slot-scope="text">
          <j-ellipsis :value="text" :length="5"/>
        </span>
        <span slot="identNo" slot-scope="text">
          <j-ellipsis :value="text" :length="15"/>
        </span>
        <span slot="dkzh" slot-scope="text">
          <j-ellipsis :value="text" :length="15"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkhxdjb:edit'">编辑</a>
          <a-divider type="vertical" v-has="'dkhxdjb:edit'"/>
          <a-dropdown v-has="'dkhxdjb:delete'">
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkhxdjb-modal ref="modalForm" @ok="modalFormOk"></dkhxdjb-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkhxdjbModal from './modules/DkhxdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import {notification} from "ant-design-vue";
  import JInput from "@/components/jeecg/JInput";
  import {filterObj} from "@/utils/util";
  import {deleteAction, downFile} from "@/api/manage";
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "DkhxdjbList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      JEllipsis,
      JInput,
      DkhxdjbModal,
      ExcelImport
    },
    data () {
      return {
        description: '贷款核销登记薄管理页面',
        dateFormat: 'YYYY-MM-DD',
        rq:'',
        // 表头
        columns: [
          /*{
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },*/
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
            title: '开户机构编号',
            align: "center",
            dataIndex: 'jgbm'
          },
          {
            title: '开户机构名称',
            align: "center",
            dataIndex: 'jgbm_dictText',
            // dataIndex: 'jgmc',
            scopedSlots: {customRender: 'jgmc'},
          },
          {
            title: '贷款户名',
            align: "center",
            dataIndex: 'custName'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'identNo',
            scopedSlots: {customRender: 'identNo'},
          },
          {
            title: '贷款账号',
            align: "center",
            dataIndex: 'dkzh',
            scopedSlots: {customRender: 'dkzh'},
          },
          {
            title: '借款日期',
            align: "center",
            dataIndex: 'jkrq'
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'dqrq'
          },
          {
            title: '贷款余额（元）',
            align: "center",
            dataIndex: 'dkye',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '核销日期',
            align: "center",
            dataIndex: 'hxrq'
          },
          {
            title: '核销本金（元）',
            align: "center",
            dataIndex: 'hxbj',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '核销利息（元）',
            align: "center",
            dataIndex: 'hxlx',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '第一责任人',
            align: "center",
            dataIndex: 'dyzrr'
          },
          /*{
            title: '录入标识(0 导入 1 录入 2 修改)',
            align: "center",
            dataIndex: 'lrbz'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/tjbb/tjfz/sgtzdr/dkhxdjb/list",
          delete: "/tjbb/tjfz/sgtzdr/dkhxdjb/delete",
          deleteBatch: "/tjbb/tjfz/sgtzdr/dkhxdjb/deleteBatch",
          exportXlsUrl: "tjbb/tjfz/sgtzdr/dkhxdjb/exportXls",
          importExcelUrl: "tjbb/tjfz/sgtzdr/dkhxdjb/importExcel",
          exportTemplateUrl: "tjbb/tjfz/sgtzdr/dkhxdjb/exportTemplateXls",
        },
        exportTemplateName: '贷款核销登记薄导入模板',
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
      dateChage(){
        if (this.queryParam.dataDate) {
          this.rq = this.queryParam.dataDate.format("YYYY-MM-DD");
        }
      },
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
        // this.queryParam.dataDate = moment(this.getCurrentDataFront()).format(this.dateFormat)
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
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        // 日期格式化
        if (param.dataDate) {
          param.dataDate = moment(param.dataDate).format('YYYY-MM-DD')
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
      importComplete (filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath:', filePath)
        downFile('/sys/common/download/' + filePath, param).then((data) => {
          if (!data) {
            notification.error({message: '系统提示', descriptions: '文件下载失败！', duration: 4})
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        })
        this.loadData(1)
      },
      handleEdit: function (record) {
        this.$refs.modalForm.opType = 'edit'
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
      },
      handleDelete: function (record) {
        if (!this.url.delete) {
          notification.error({ message: '系统提示', description: '请设置url.delete属性!',duration: 4})
          return
        }
        var that = this
        var parameters = {
          'dataDate': record.dataDate,
          'jgbm': record.jgbm,
          'identNo': record.identNo,
        }
        deleteAction(that.url.delete, parameters).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      excelImport(){
        if (this.queryParam.dataDate == undefined || this.queryParam.dataDate == '') {
          this.$message.error("请选择数据日期!")
          return
        } else {
          let params = {}
          this.rq=moment(this.queryParam.dataDate).format("YYYY-MM-DD");
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rq}`
          params.exportTemplateName = this.exportTemplateName
          var param = Object.assign({}, this.queryParam, params);
          this.$refs.excelImportModal.showModal(param);
        }
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
