<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷记卡机构编码">
              <a-input placeholder="请输入贷记卡机构编码" v-model="queryParam.tgjgbh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'djkwdgl:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷记卡网点关联')" v-has="'djkwdgl:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'djkwdgl:import'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">

                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'djkwdgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <djkwdgl-modal ref="modalForm" @ok="modalFormOk"></djkwdgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import DjkwdglModal from './modules/DjkwdglModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {deleteAction} from "../../../../api/manage";
  import ExcelImport from '@/components/common/ExcelImport'
  import store from '@/store/'

  export default {
    name: "DjkwdglList",
    mixins:[JeecgListMixin],
    components: {
      DjkwdglModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '贷记卡网点关联管理页面',
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
            title: '贷记卡机构编码',
            align:"center",
            dataIndex: 'tgjgbh'
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrczy'
          },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/djkwdgl/djkwdgl/list",
          delete: "/djkwdgl/djkwdgl/delete",
          deleteBatch: "/djkwdgl/djkwdgl/deleteBatch",
          exportXlsUrl: "djkwdgl/djkwdgl/exportXls",
          importExcelUrl: "djkwdgl/djkwdgl/importExcel",
          exportTemplateUrl: "/djkwdgl/djkwdgl/exportTemplateXls",
       },
        exportTemplateName: '贷记卡网点关联导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      searchReset() {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {jgdm: record.jgdm,tgjgbh: record.tgjgbh}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>