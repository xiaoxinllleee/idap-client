<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.branchNo"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             pid-field="sjywjgdm" treeNodeFilterProp="title"
                             :showSearch="true" :tree-default-expand-all="true">
              </j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.identNo" style="width: 100%;"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.subAcctNo" style="width: 100%;"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户姓名">
              <j-input placeholder="请输入客户姓名" v-model="queryParam.custName"></j-input>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button @click="searchReset" icon="reload">重置</a-button>
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'jkryzhgl:add'">添加</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('监控人员账户管理')" v-has="'jkryzhgl:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'jkryzhgl:import'">导入</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="identNo,subAcctNo"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a v-has="'jkryzhgl:delete'">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ckjkptJkryzhgl-modal ref="modalForm" @ok="modalFormOk"></ckjkptJkryzhgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import CkjkptJkryzhglModal from './modules/CkjkptJkryzhglModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {deleteAction} from "@/api/manage";
  import JInput from "../../../../../components/jeecg/JInput";
  import store from '@/store/'
  import ExcelImport from "@/components/common/ExcelImport";
  import {notification} from "ant-design-vue";

  export default {
    name: "CkjkptJkryzhglList",
    mixins: [JeecgListMixin],
    components: {
      JInput,
      JTreeSelect,
      CkjkptJkryzhglModal,
      ExcelImport
    },
    data() {
      return {
        description: '监控人员账户管理页面',
        exportTemplateName: '监控人员账户管理导入模板',
        // 表头
        columns: [
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'branchNo',
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'branchNo_dictText'
          },
          {
            title: '客户姓名',
            align: "center",
            dataIndex: 'custName'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'identNo'
          },
          {
            title: '账号',
            align: "center",
            dataIndex: 'subAcctNo'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/CkjkptJkryzhgl/ckjkptJkryzhgl/list",
          delete: "/CkjkptJkryzhgl/ckjkptJkryzhgl/delete",
          deleteBatch: "/CkjkptJkryzhgl/ckjkptJkryzhgl/deleteBatch",
          exportXlsUrl: "CkjkptJkryzhgl/ckjkptJkryzhgl/exportXls",
          importExcelUrl: "CkjkptJkryzhgl/ckjkptJkryzhgl/importExcel",
          exportTemplateUrl: "CkjkptJkryzhgl/ckjkptJkryzhgl/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      searchReset() {
        this.queryParam = {branchNo: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.branchNo = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          notification.error({message: '系统提示', description: '请设置url.delete属性!', duration: 4})
          return
        }
        if (record.subAcctNo === null || record.identNo === null) {
          notification.error({message: '系统提示', description: '账号/证件号码为空，请核实！', duration: 4})
          return
        }
        var params = {
          'subAcctNo': record.subAcctNo,
          'identNo': record.identNo
        }
        var that = this;
        deleteAction(that.url.delete, params).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: res.message, duration: 4})
            that.loadData();
          } else {
            notification.warning({message: '系统提示', description: res.message, duration: 4})
          }
        });
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>