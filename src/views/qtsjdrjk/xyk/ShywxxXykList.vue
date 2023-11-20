<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系电话">
              <a-input placeholder="请输入联系电话" v-model="queryParam.lxdh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡品种">
              <a-input placeholder="请输入卡品种" v-model="queryParam.kpz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="推广人员">
              <a-input placeholder="请输入推广人员" v-model="queryParam.tgry"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('信用卡')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>


    </div>

    <!-- table区域-begin -->
    <div>


      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <shywxxXyk-modal ref="modalForm" @ok="modalFormOk"></shywxxXyk-modal>

    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import ShywxxXykModal from './modules/ShywxxXykModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {downFile} from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "ShywxxXykList",
    mixins:[JeecgListMixin],
    components: {
      ShywxxXykModal,ExcelImport
    },
    data () {
      return {
        description: '信用卡管理页面',
        // 表头
        columns: [

		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh'
           },
		   {
            title: '卡品种',
            align:"center",
            dataIndex: 'kpz'
           },
		   {
            title: '发卡日期',
            align:"center",
            dataIndex: 'fkrq'
           },
		   {
            title: '卡号',
            align:"center",
            dataIndex: 'kh'
           },
		   {
            title: '信用额度',
            align:"center",
            dataIndex: 'xyed'
           },
		   {
            title: '推广人员',
            align:"center",
            dataIndex: 'tgry'
           },

        ],
		url: {
          list: "/SHYWXX_XYK/shywxxXyk/list",
          delete: "/SHYWXX_XYK/shywxxXyk/delete",
          deleteBatch: "/SHYWXX_XYK/shywxxXyk/deleteBatch",
          exportXlsUrl: "SHYWXX_XYK/shywxxXyk/exportXls",
          importExcelUrl: "SHYWXX_XYK/shywxxXyk/importExcel",
          exportTemplateUrl: "SHYWXX_XYK/shywxxXyk/exportTemplateXls",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = '信用卡数据导入'
        this.$refs.excelImportModal.showModal(params)
      },
      searchReset: function() {
        this.queryParam = {}
        this.loadData(1);
      },
      importComplete(filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath')
        console.log(filePath)
        downFile('/sys/common/download/' + filePath, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
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

        this.loadData()
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>