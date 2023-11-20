<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网格编号">
              <a-input placeholder="请输入网格编号" v-model="queryParam.wgbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网格名称">
              <j-input placeholder="请输入网格名称" v-model="queryParam.wgmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网格类型">
              <j-dict-select-tag v-model="queryParam.wglx" placeholder="请选择网格类型" dictCode="wglx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Wgzbxx:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('网格坐标信息')" v-has="'Wgzbxx:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Wgzbxx:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'Wgzbxx:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown v-has="'Wgzbxx:del'">
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'Wgzbxx:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <wgzbxx-modal ref="modalForm" @ok="modalFormOk"></wgzbxx-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import WgzbxxModal from './modules/WgzbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from "@/components/jeecg/JInput";


  export default {
    name: "WgzbxxList",
    mixins:[JeecgListMixin],
    components: {
      WgzbxxModal, ExcelImport, JInput
    },
    data () {
      return {
        description: '网格坐标信息管理页面',
        exportTemplateName : '网格坐标信息导入模板',
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
            title: '网格编号',
            align:"center",
            dataIndex: 'wgbh'
          },
		      {
            title: '网格名称',
            align:"center",
            dataIndex: 'wgmc'
           },
		   {
            title: '网格类型',
            align:"center",
            dataIndex: 'wglx_dictText'
           },
		   {
            title: '网格中心点经度',
            align:"center",
            dataIndex: 'longitude'
           },
		   {
            title: '网格中心点纬度',
            align:"center",
            dataIndex: 'latitude'
           },

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/wghgl/wgzbxx/list",
          delete: "/wghgl/wgzbxx/delete",
          deleteBatch: "/wghgl/wgzbxx/deleteBatch",
          exportXlsUrl: "/wghgl/wgzbxx/exportXls",
          importExcelUrl: "/wghgl/wgzbxx/importExcel",
          exportTemplateUrl: "/wghgl/wgzbxx/exportTemplateXls",
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