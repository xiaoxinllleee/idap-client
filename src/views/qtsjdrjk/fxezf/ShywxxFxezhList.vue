<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户名称">
              <a-input placeholder="请输入商户名称" v-model="queryParam.shmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户类型">
              <a-input placeholder="请输入商户类型" v-model="queryParam.shlx"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="法人代表姓名">
                <a-input placeholder="请输入法人代表姓名" v-model="queryParam.frdbxx"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="法人代表证件号">
                <a-input placeholder="请输入法人代表证件号" v-model="queryParam.drzjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="商户联系电话">
                <a-input placeholder="请输入商户联系电话" v-model="queryParam.shlxdh"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('福祥E支付')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>


    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

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
    <shywxxFxezh-modal ref="modalForm" @ok="modalFormOk"></shywxxFxezh-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import ShywxxFxezhModal from './modules/ShywxxFxezhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {downFile} from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  export default {
    name: 'ShywxxFxezhList',
    mixins: [JeecgListMixin],
    components: {
      ShywxxFxezhModal,ExcelImport
    },
    data() {
      return {
        description: '福祥E支付管理页面',
        // 表头
        columns: [
          {
            title: '商户名称',
            align: 'center',
            dataIndex: 'shmc'
          },
          {
            title: '商户类型',
            align: 'center',
            dataIndex: 'shlx'
          },
          {
            title: '法人代表姓名',
            align: 'center',
            dataIndex: 'frdbxx'
          },
          {
            title: '法人代表证件号',
            align: 'center',
            dataIndex: 'drzjhm'
          },
          {
            title: '商户联系电话',
            align: 'center',
            dataIndex: 'shlxdh'
          },
          {
            title: '营业地区',
            align: 'center',
            dataIndex: 'yydq'
          },
          {
            title: '商户入网状态',
            align: 'center',
            dataIndex: 'ssrwzt'
          },
          {
            title: '交易状态',
            align: 'center',
            dataIndex: 'jyzt'
          },
          {
            title: '渠道',
            align: 'center',
            dataIndex: 'qd'
          },
          {
            title: '商户所属支行',
            align: 'center',
            dataIndex: 'shsszh'
          },
          {
            title: '客户经理姓名',
            align: 'center',
            dataIndex: 'khjlxm'
          },
        ],
        url: {
          list: '/SHYWXX_FXEZH/shywxxFxezh/list',
          delete: '/SHYWXX_FXEZH/shywxxFxezh/delete',
          deleteBatch: '/SHYWXX_FXEZH/shywxxFxezh/deleteBatch',
          exportXlsUrl: 'SHYWXX_FXEZH/shywxxFxezh/exportXls',
          importExcelUrl: 'SHYWXX_FXEZH/shywxxFxezh/importExcel',
          exportTemplateUrl: "SHYWXX_FXEZH/shywxxFxezh/exportTemplateXls",
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = '福祥E支付数据导入'
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