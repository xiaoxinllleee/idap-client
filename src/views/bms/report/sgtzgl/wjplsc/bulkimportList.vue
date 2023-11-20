<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="日期">
              <a-date-picker v-model="days" />
            </a-form-item>
          </a-col>
        <!--  <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-month-picker placeholder="请选择数据日期" v-model="queryParam.days"  :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a-button type="import" @click="excelImport" style="margin-left: 8px" >批量导入</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('ddw')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">



        <span slot="action" slot-scope="text, record">
            <a @click="downLoad(record)">下载</a>
        </span>

      </a-table>

    </div>
    <!-- table区域-end -->
    <new-excel-import  ref="excelImportModal"   @ok="Complete"></new-excel-import>
<!--    <excel-import ref="excelImportModal" @ok="Complete"/>-->
<!--    <bulkimport-modal  ref="excelImportModal" ></bulkimport-modal>-->
  </a-card>


</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import newExcelImport from '@/components/common/newExcelImport'
  import { downFile } from '../../../../../api/manage'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'
/*  import ExcelImport from '@/components/common/ExcelImport'*/
/*  import bulkimportModal from './modal/bulkimportModal'*/
  export default {
    name: "bulkimportList",
    mixins:[JeecgListMixin],
    components: {
      newExcelImport
    },
    data () {
      return {
        description: 'ddw管理页面',
        days:'',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        rq:'',
        columns: [
		   {
            title: '上传文件名称',
            align:"center",
            dataIndex: 'fileName'
           },
		   {
            title: '上传文件路径',
            align:"center",
            dataIndex: 'filePath'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'fileDate'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/wjplsc/bulkimport/list",
          delete: "/wjplsc/bulkimport/delete",
          deleteBatch: "/wjplsc/bulkimport/deleteBatch",
          exportXlsUrl: "/wjplsc/bulkimport/exportXls",
          importExcelUrl: "/wjplsc/bulkimport/importExcel",
          saveZipDataUrl:"/wjplsc/bulkimport/saveZipData"
       },
    }
  },
  computed: {

    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      // getQueryParams () {
      //   //获取查询条件
      //   let sqp = {}
      //   let tjMoment=""
      //   if (this.superQueryParams) {
      //     sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      //   }
      //   if (this.queryParam.days) {
      //     tjMoment=moment(this.queryParam.days).format("YYYYMM")+'01'
      //   }
      //   var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      //   param.field = this.getQueryField()
      //   param.pageNo = this.ipagination.current
      //   param.pageSize = this.ipagination.pageSize
      //   param.days=tjMoment
      //   return filterObj(param)
      // },
      // beforeUpload() {
      //   if (this.queryParam.fiscalDate){
      //     this.rq = this.queryParam.fiscalDate.format("YYYYMM") + '01';
      //   }
      // },
      Complete(data)
      {

        console.log(data)


      },
      downLoad(row)
      {
        console.log('downloadFile', row)
        let fileName =row.fileName
        console.log(fileName)
        downFile('/sys/common/downloadReport/' + row.fileName, {}).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName);
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName;
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
          this.exportLoading=false
        })
      },
      searchReset() {
        this.queryParam={};
      },
      excelImport()
      {

        if(this.days==null||this.days=='')
        {
          this.$message.warning('请先选择日期');
          return
        }
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.url.importExcelUrl
        params.exportTemplateName = this.exportTemplateName
        params.days=this.days.format("YYYY-MM-DD HH:MM:SS")
        this.$refs.excelImportModal.showModal(params)
        this.loadData(1);
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>