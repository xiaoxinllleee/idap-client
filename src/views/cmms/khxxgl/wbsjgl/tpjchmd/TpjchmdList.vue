<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <j-input placeholder="请输入姓名" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <j-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></j-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="健康状况">
              <a-input placeholder="请输入健康状况" v-model="queryParam.jkzk"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="劳动技能">
              <a-input placeholder="请输入劳动技能" v-model="queryParam.ldjn"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户类型">
              <a-input placeholder="请输入户类型" v-model="queryParam.hlx"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Tpjchmd:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('脱贫户及监测户名单')" v-has="'Tpjchmd:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Tpjchmd:imp'">导入</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Tpjchmd:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'Tpjchmd:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tpjchmd-modal ref="modalForm" @ok="modalFormOk"></tpjchmd-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import TpjchmdModal from './modules/TpjchmdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "TpjchmdList",
    mixins:[JeecgListMixin],
    components: {
      TpjchmdModal, ExcelImport, JInput
    },
    data () {
      return {
        description: '脱贫户及监测户名单管理页面',
        exportTemplateName : '脱贫户及监测户名单导入模板',
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
            title: '姓名',
            align:"center",
            width:70,
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '健康状况',
            align:"center",
            dataIndex: 'jkzk'
           },
		   {
            title: '劳动技能',
            align:"center",
            dataIndex: 'ldjn'
           },
		   {
            title: '致贫原因',
            align:"center",
            dataIndex: 'zpyy'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh'
           },
		   {
            title: '户类型',
            align:"center",
            dataIndex: 'hlx'
           },
		   {
            title: '易返贫致贫户(监测对象)类型',
            align:"center",
            dataIndex: 'yfpzpflx'
           },
		   {
            title: '风险是否消除',
            align:"center",
            dataIndex: 'fxsfxc'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/wbsjgl/tpjchmd/list",
          delete: "/wbsjgl/tpjchmd/delete",
          deleteBatch: "/wbsjgl/tpjchmd/deleteBatch",
          exportXlsUrl: "wbsjgl/tpjchmd/exportXls",
          importExcelUrl: "wbsjgl/tpjchmd/importExcel",
          exportTemplateUrl: "wbsjgl/tpjchmd/exportTemplateXls",
       },
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