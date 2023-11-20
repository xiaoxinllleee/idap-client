<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="调节类型">
              <j-dict-select-tag placeholder="请选择调节类型" v-model="queryParam.tjlx" dict-code="xstjlx"></j-dict-select-tag>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ErpPersonalTjxs:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人调节系数')" v-has="'ErpPersonalTjxs:export'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'ErpPersonalTjxs:import'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'ErpPersonalTjxs:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'ErpPersonalTjxs:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <erpPersonalTjxs-modal ref="modalForm" @ok="modalFormOk"></erpPersonalTjxs-modal>
  </a-card>
</template>

<script>
  import ErpPersonalTjxsModal from './modules/ErpPersonalTjxsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "ErpPersonalTjxsList",
    mixins:[JeecgListMixin],
    components: {
      ErpPersonalTjxsModal, ExcelImport
    },
    data () {
      return {
        description: '个人调节系数管理页面',
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
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
		   {
            title: '调节类型',
            align:"center",
            dataIndex: 'tjlx_dictText'
           },
		   {
            title: '调节系数',
            align:"center",
            dataIndex: 'tjxs'
           },
		   {
            title: '生效日期起',
            align:"center",
            dataIndex: 'sxrqBegin'
           },
		   {
            title: '生效日期止',
            align:"center",
            dataIndex: 'sxrqEnd'
           },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            ellipsis: true,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/grtjxs/erpPersonalTjxs/list",
          delete: "/grtjxs/erpPersonalTjxs/delete",
          deleteBatch: "/grtjxs/erpPersonalTjxs/deleteBatch",
          exportXlsUrl: "grtjxs/erpPersonalTjxs/exportXls",
          importExcelUrl: "grtjxs/erpPersonalTjxs/importExcel",
          exportTemplateUrl:"/grtjxs/erpPersonalTjxs/exportTemplateXls",
    },
        exportTemplateName: '个人调节系数导入模板'
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