<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

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
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('收单类业务账户管理')" v-has="'sdlywzhgl:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'sdlywzhgl:import'">导入</a-button>
     <!-- <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button @click="searchReset" icon="reload">重置</a-button>-->
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey=""
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'sdlywzhgl:delete'">
                  <a>删除</a>
          </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from "@/components/jeecg/JInput"
  import ExcelImport from '@/components/common/ExcelImport'
  import { deleteAction } from '@/api/manage'
  import store from '@/store/'

  export default {
    name: "SdlywzhglList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,ExcelImport,JInput
    },
    data () {
      return {
        description: '收单类业务账户管理管理页面',
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
            title: '账号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/sdlywzhgl/sdlywzhgl/list",
          delete: "/sdlywzhgl/sdlywzhgl/delete",
          deleteBatch: "/sdlywzhgl/sdlywzhgl/deleteBatch",
          exportXlsUrl: "sdlywzhgl/sdlywzhgl/exportXls",
          importExcelUrl: "sdlywzhgl/sdlywzhgl/importExcel",
          exportTemplateUrl: "/sdlywzhgl/sdlywzhgl/exportTemplateXls",
       },
        exportTemplateName: "收单类业务账户管理导入模板"
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
    },
    methods: {
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {jgdm: record.jgdm,zh: record.zh}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
          console.log(this.queryParam.jgdm)
        }
        this.paramsInited = true
      },
      searchReset() {
        this.queryParam = {};
        this.queryParam.jgdm=""
        if (!store.getters.isRoot){
          this.queryParam.jgdm=store.getters.ywjgdm
        }
        this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>