<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="等级编号">
            <j-input placeholder="请输入等级编号" v-model="queryParam.djbh"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="等级名称">
            <j-input placeholder="请输入等级名称" v-model="queryParam.djmc" type="likemore"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="等级描述">
            <j-input placeholder="请输入等级描述" v-model="queryParam.djms" type="likemore"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'khdjsz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('客户评定等级设置')" style="margin-left: 8px;" v-has="'khdjsz:exp'">导出</a-button>
      <a-button icon="import" @click="handleImport" style="margin-left: 8px;" v-has="'khdjsz:imp'">导入</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay"><a-menu-item key="1" @click="batchDel">
          <a-icon type="delete"/>删除
        </a-menu-item></a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :loading="loading"
               :dataSource="dataSource"
               :pagination="ipagination"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="djms" slot-scope="text">
          <j-ellipsis :value="text" :length="50" />
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'khdjsz:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'khdjsz:del'">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay"><a-menu-item><a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
            </a-popconfirm></a-menu-item></a-menu>
          </a-dropdown>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <KhdjszModal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import KhdjszModal from './modules/khdjszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import JInput from '../../../components/jeecg/JInput'
  import ExcelImport from '../../../components/common/ExcelImport'

  export default {
    name: "khdj_khdjszList",
    mixins:[JeecgListMixin],
    components: {
      ExcelImport,
      KhdjszModal, JEllipsis, JInput
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
          {
            title: '等级编号',
            align:"center",
            dataIndex: 'djbh',
            //sorter: (a, b) => b.djbh - a.djbh,
          },
          {
            title: '等级名称',
            align:"center",
            dataIndex: 'djmc',
            scopedSlots: { customRender: 'edit' },
          },
          {
            title: '等级描述',
            align:"center",
            dataIndex: 'djms',
            width: 600,
            scopedSlots: { customRender: 'djms' },
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/khdj_khdjsz/khdj_khdjsz/list",
          delete: "/khdj_khdjsz/khdj_khdjsz/delete",
          deleteBatch: "/khdj_khdjsz/khdj_khdjsz/deleteBatch",
          exportXlsUrl: "khdj_khdjsz/khdj_khdjsz/exportXls",
          importExcelUrl: "khdj_khdjsz/khdj_khdjsz/importExcel",
          exportTemplateUrl: "khdj_khdjsz/khdj_khdjsz/exportTemplateXls",
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
        this.$refs.modalForm.disabledFlag = true;
        this.$refs.modalForm.okType = 'edit';
      },
      handleImport() {
        let param = {};
        param.exportTemplateUrl = this.url.exportTemplateUrl;
        param.importExcelUrl = this.importExcelUrl;
        param.exportTemplateName = "客户评定等级导入模板";
        this.$refs.excelImportModal.showModal(param);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>