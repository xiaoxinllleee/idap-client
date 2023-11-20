<template>
  <a-card :bordered="false">

    <!-- 查询区域 begin -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="参数ID">
            <a-input placeholder="请输入参数ID" v-model="queryParam.pid"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="参数名称">
            <j-input placeholder="请输入参数名称" v-model="queryParam.pname" type="likemore"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button @click="searchQuery" type="primary" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
          </span></a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域 end -->

    <!-- 操作按钮区域 begin -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'KhdjCsgl:add'">新增</a-button>
      <a-button @click="handleExportXls('客户等级评定参数')" icon="download" style="margin-left: 8px;" v-has="'KhdjCsgl:exp'">导出</a-button>
      <a-button icon="import" @click="handleImport" style="margin-left: 8px;" v-has="'KhdjCsgl:imp'">导入</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay"><a-menu-item key="1" @click="batchDel">
          <a-icon type="delete"/>删除
        </a-menu-item></a-menu>
        <a-button style="margin-left: 8px">批量操作 <a-icon type="down"/></a-button>
      </a-dropdown>
    </div>
    <!-- 操作按钮区域 end -->

    <!-- table区域 begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="poutline" slot-scope="text">
          <j-ellipsis :value="text" :length="40" />
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'KhdjCsgl:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'KhdjCsgl:del'">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域 end -->

    <!-- 表单区域 begin -->
    <khdjCsgl-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 end -->
  </a-card>
</template>

<script>
  import KhdjCsglModal from './modules/KhdjCsglModal'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../components/jeecg/JInput'
  import ExcelImport from '../../../components/common/ExcelImport'

  export default {
    name: "KhdjCsglList",
    mixins:[JeecgListMixin],
    components: {
      ExcelImport,
      KhdjCsglModal,
      JEllipsis,
      JInput
    },
    data () {
      return {
        description: '客户等级评定参数管理管理页面',
        // 表头
        columns: [
          // {
          //   title: '序号',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '参数ID',
            align:"center",
            dataIndex: 'pid'
          },
          {
            title: '参数名称',
            align:"center",
            dataIndex: 'pname',
            scopedSlots: { customRender: 'edit' },
          },
          {
            title: '参数值',
            align:"center",
            dataIndex: 'pvalue'
          },
          {
            title: '参数描述',
            align:"center",
            dataIndex: 'poutline',
            width: 500,
            scopedSlots: { customRender: 'poutline' },
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/khdjcsgl/khdjCsgl/list",
          delete: "/khdjcsgl/khdjCsgl/delete",
          deleteBatch: "/khdjcsgl/khdjCsgl/deleteBatch",
          exportXlsUrl: "khdjcsgl/khdjCsgl/exportXls",
          importExcelUrl: "khdjcsgl/khdjCsgl/importExcel",
          exportTemplateUrl: "khdjcsgl/khdjCsgl/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.okType = 'edit';
      },
      handleImport() {
        let param = {};
        param.exportTemplateUrl = this.url.exportTemplateUrl;
        param.importExcelUrl = this.importExcelUrl;
        param.exportTemplateName = "等级评定参数导入模板";
        this.$refs.excelImportModal.showModal(param);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>