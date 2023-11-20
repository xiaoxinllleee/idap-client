<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择开户机构"
                             v-model="queryParam.khjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <a-input placeholder="请输入客户类型" v-model="queryParam.khlx"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类别">
              <a-input placeholder="请输入客户类别" v-model="queryParam.khlb"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('协定存款明细表')">导出</a-button>
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
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <sgtzglXdckmxb-modal ref="modalForm" @ok="modalFormOk"></sgtzglXdckmxb-modal>
  </a-card>
</template>

<script>
  import SgtzglXdckmxbModal from './modules/SgtzglXdckmxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "SgtzglXdckmxbList",
    mixins:[JeecgListMixin],
    components: {
      SgtzglXdckmxbModal,ExcelImport,JTreeSelect
    },
    data () {
      return {
        description: '协定存款明细表管理页面',
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
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx'
           },
		   {
            title: '客户类别',
            align:"center",
            dataIndex: 'khlb'
           },
		   {
            title: '客户性质',
            align:"center",
            dataIndex: 'khxz'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'zhzt'
           },
		   {
            title: '协定编号',
            align:"center",
            dataIndex: 'xdbh'
           },
		   {
            title: '协定开始日期',
            align:"center",
            dataIndex: 'xdksrq'
           },
		   {
            title: '协定终止日期',
            align:"center",
            dataIndex: 'xdzzrq'
           },
		   {
            title: '账户余额',
            align:"center",
            dataIndex: 'zhye'
           },
		   {
            title: '利率',
            align:"center",
            dataIndex: 'll'
           },
		   {
            title: '产品类别',
            align:"center",
            dataIndex: 'cplb'
           },
		   {
            title: '合同状态',
            align:"center",
            dataIndex: 'htzt'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/xdckmxb/sgtzglXdckmxb/list",
          delete: "/xdckmxb/sgtzglXdckmxb/delete",
          deleteBatch: "/xdckmxb/sgtzglXdckmxb/deleteBatch",
          exportXlsUrl: "xdckmxb/sgtzglXdckmxb/exportXls",
          importExcelUrl: "xdckmxb/sgtzglXdckmxb/importExcel",
          exportTemplateUrl:"/xdckmxb/sgtzglXdckmxb/exportTemplateXls",
       },
        exportTemplateName: '协定存款明细表导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>