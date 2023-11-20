<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行名称">
              <a-input placeholder="请输入支行名称" v-model="queryParam.zhmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="首贷户户名">
              <a-input placeholder="请输入首贷户户名" v-model="queryParam.sdhhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="首次贷款日期">
              <a-input placeholder="请输入首次贷款日期" v-model="queryParam.scdkrq"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号（17位）">
              <a-input placeholder="请输入贷款账号（17位）" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="授信金额（万元）">
              <a-input placeholder="请输入授信金额（万元）" v-model="queryParam.sxje"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('支行首贷户情况统计表')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
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
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sgztZhsdhqktjb-modal ref="modalForm" @ok="modalFormOk"></sgztZhsdhqktjb-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import SgztZhsdhqktjbModal from './modules/SgztZhsdhqktjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "SgztZhsdhqktjbList",
    mixins:[JeecgListMixin],
    components: {
      SgztZhsdhqktjbModal, ExcelImport
    },
    data () {
      return {
        description: '支行首贷户情况统计表管理页面',
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '支行名称',
            align:"center",
            dataIndex: 'zhmc'
           },
		   {
            title: '首贷户户名',
            align:"center",
            dataIndex: 'sdhhm'
           },
		   {
            title: '首次贷款日期',
            align:"center",
            dataIndex: 'scdkrq'
           },
		   {
            title: '贷款账号（17位）',
            align:"center",
            dataIndex: 'dkzh'
           },
		   {
            title: '授信金额（万元）',
            align:"center",
            dataIndex: 'sxje'
           },
		   {
            title: '首次贷款金额（万元）',
            align:"center",
            dataIndex: 'scdkje'
           },
		   {
            title: '首贷户客户类型',
            align:"center",
            dataIndex: 'sdhkhlx'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: '授信（元）',
            align:"center",
            dataIndex: 'sx'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zhsdhqktjb/sgztZhsdhqktjb/list",
          delete: "/zhsdhqktjb/sgztZhsdhqktjb/delete",
          deleteBatch: "/zhsdhqktjb/sgztZhsdhqktjb/deleteBatch",
          exportXlsUrl: "zhsdhqktjb/sgztZhsdhqktjb/exportXls",
          importExcelUrl: "zhsdhqktjb/sgztZhsdhqktjb/importExcel",
          exportTemplateUrl:"/zhsdhqktjb/sgztZhsdhqktjb/exportTemplateXls",
       },
        exportTemplateName: '支行首贷户情况统计表导入模板'
    }
  },
  computed: {},
    methods: {
      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>