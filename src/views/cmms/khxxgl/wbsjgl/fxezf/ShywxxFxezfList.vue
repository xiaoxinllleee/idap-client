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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ShywxxFxezf:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('福祥E支付')" v-has="'ShywxxFxezf:exp'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'ShywxxFxezf:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'ShywxxFxezf:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'ShywxxFxezf:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <shywxxFxezf-modal ref="modalForm" @ok="modalFormOk"></shywxxFxezf-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import ShywxxFxezfModal from './modules/ShywxxFxezfModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "ShywxxFxezfList",
    mixins:[JeecgListMixin],
    components: {
      ShywxxFxezfModal,ExcelImport
    },
    data () {
      return {
        description: '福祥E支付管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '商户名称',
            align:"center",
            dataIndex: 'shmc'
           },
		   {
            title: '商户类型',
            align:"center",
            dataIndex: 'shlx'
           },
		   {
            title: '法人代表姓名',
            align:"center",
            dataIndex: 'frdbxx'
           },
		   {
            title: '法人代表证件号',
            align:"center",
            dataIndex: 'drzjhm'
           },
		   {
            title: '商户联系电话',
            align:"center",
            dataIndex: 'shlxdh'
           },
		   {
            title: '营业地区',
            align:"center",
            dataIndex: 'yydq'
           },
		   {
            title: '商户入网状态',
            align:"center",
            dataIndex: 'ssrwzt'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'jyzt'
           },
		   {
            title: '渠道',
            align:"center",
            dataIndex: 'qd'
           },
		   {
            title: '商户所属支行',
            align:"center",
            dataIndex: 'shsszh'
           },
		   {
            title: '客户经理姓名',
            align:"center",
            dataIndex: 'khjlxm'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/SHYWXX_FXEZH/shywxxFxezh/list",
          delete: "/SHYWXX_FXEZH/shywxxFxezh/delete",
          deleteBatch: "/SHYWXX_FXEZH/shywxxFxezh/deleteBatch",
          exportXlsUrl: "/SHYWXX_FXEZH/shywxxFxezh/exportXls",
          importExcelUrl: "/SHYWXX_FXEZH/shywxxFxezh/importExcel",
          exportTemplateUrl: "/SHYWXX_FXEZH/shywxxFxezh/exportTemplateXls",
       },
        exportTemplateName: '福祥E支付导入模板'
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