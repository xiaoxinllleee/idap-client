<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.dataDate" @change="dateChage()" style="width: 100%;" :disabled-date="disabledDate" :format="dateFormat"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目代号">
              <a-input placeholder="请输入项目代号" v-model="queryParam.xmdh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目名称">
              <j-input placeholder="请输入项目名称" v-model="queryParam.xmmc" type="likemore"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="币种">
              <j-input placeholder="请输入币种" v-model="queryParam.bz" type="likemore"></j-input>
            </a-form-item>
          </a-col>

<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
<!--              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
<!--              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
<!--&lt;!&ndash;              <a @click="handleToggleSearch" style="margin-left: 8px">&ndash;&gt;-->
<!--&lt;!&ndash;                {{ toggleSearchStatus ? '收起' : '展开' }}&ndash;&gt;-->
<!--&lt;!&ndash;                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>&ndash;&gt;-->
<!--&lt;!&ndash;              </a>&ndash;&gt;-->
<!--            </span>-->
<!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('日均全科目表')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport" v-has="'rjqkmb:import'">导入</a-button>
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
      <span style="float: right; font-size: 10pt;font-weight: bold;">单元/万元</span>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table bordered
               ref="table"
               size="small"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'rjqkmb:edit'">编辑</a>
          <a-divider type="vertical" v-has="'rjqkmb:edit'"/>
          <a-dropdown v-has="'rjqkmb:delete'">
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
    <rj-qkmb-modal ref="modalForm" @ok="modalFormOk"></rj-qkmb-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import RjQkmbModal from './modules/RjQkmbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from "@/components/jeecg/JInput";
  import ExcelImport from '@/components/common/ExcelImport'
  import moment from "moment";
  import {filterObj} from "@/utils/util";
  import {deleteAction, downFile} from "@/api/manage";
  import {notification} from "ant-design-vue";

  export default {
    name: "QkmbList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      RjQkmbModal,
      ExcelImport
    },
    data () {
      return {
        description: '日均全科目表管理页面',
        dateFormat: 'YYYY-MM-DD',
        rq:'',
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
            title: '项目代号',
            align: "center",
            dataIndex: 'xmdh'
          },
          {
            title: '项目名称',
            align: "center",
            dataIndex: 'xmmc'
          },
          // {
          //   title: '币种',
          //   align: "center",
          //   dataIndex: 'bz'
          // },
          {
            title: '期末借方年日均余额',
            align: "center",
            dataIndex: 'qmjfNrjye',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '期末贷方年日均余额',
            align: "center",
            dataIndex: 'qmdfNrjye',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '项目代号',
            align: "center",
            dataIndex: 'xmdhT'
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
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/tjbb/tjfz/sgtzdr/qkmb/list",
          delete: "/tjbb/tjfz/sgtzdr/qkmb/delete",
          deleteBatch: "/tjbb/tjfz/sgtzdr/qkmb/deleteBatch",
          exportXlsUrl: "tjbb/tjfz/sgtzdr/qkmb/exportXls",
          importExcelUrl: "tjbb/tjfz/sgtzdr/qkmb/importExcel",
          exportTemplateUrl: "tjbb/tjfz/sgtzdr/qkmb/exportTemplateXls",
        },
        exportTemplateName: '日均全科目表导入模板',
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
       * 限制a-date-picker组件不可选择比当前大的月份
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
          param.dataDate = moment(param.dataDate).format(this.dateFormat)
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
          param.dataDate = moment(param.dataDate).format(this.dateFormat)
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
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xlsx')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xlsx'
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
          'xmdh': record.xmdh
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
      dateChage(){
        if (this.queryParam.dataDate) {
          this.rq = this.queryParam.dataDate.format("YYYY-MM-DD");
        }
      },
      excelImport(){
        if (this.queryParam.dataDate == undefined || this.queryParam.dataDate == '') {
          this.$message.error("请选择数据日期!")
          return
        } else {
          let params = {}
          let rq=moment(this.queryParam.dataDate).format("YYYY-MM-DD")
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${rq}`
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
