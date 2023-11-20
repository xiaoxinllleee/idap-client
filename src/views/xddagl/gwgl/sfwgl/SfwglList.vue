<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="标题">
              <a-input placeholder="请输入标题" v-model="queryParam.bt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发文编号">
              <a-input placeholder="请输入发文编号" v-model="queryParam.fwbh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发文部室标识">
              <a-input placeholder="请输入发文部室标识" v-model="queryParam.cwdw"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系人">
              <a-input placeholder="请输入联系人" v-model="queryParam.fzr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发文日期">
              <a-input placeholder="请输入发文日期" v-model="queryParam.qfrq"></a-input>
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
      <a-button  @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('收发文管理')" v-has="'sfwgl:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>-->
      <a-button  icon="import" @click="excelImport" v-has="'sfwgl:import'">导入</a-button>
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
           <a @click="handleView(record)" v-has="'xfdkhtsj:view'">查看</a>
            <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>

<!--         <a @click="handleView(record)" v-has="'sfwgl:see'">查看</a>-->
          <a-divider type="vertical" />
       <!--   <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                  </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'sfwgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sfwgl-modal ref="modalForm" @ok="modalFormOk"></sfwgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import SfwglModal from './modules/SfwglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction } from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  export default {
    name: "SfwglList",
    mixins:[JeecgListMixin],
    components: {
      SfwglModal,ExcelImport,JTreeSelect
    },
    data () {
      return {
        description: '收发文管理管理页面',
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
            title: '标题',
            align:"center",
            dataIndex: 'bt'
           },
		   {
            title: '发文编号',
            align:"center",
            dataIndex: 'fwbh'
           },
		   {
            title: '发文部室标识',
            align:"center",
            dataIndex: 'cwdw'
           },
          {
            title: '发文部室',
            align:"center",
            dataIndex: 'cwdw_dictText'
           },
		   {
            title: '联系人',
            align:"center",
            dataIndex: 'fzr'
           },

		   {
            title: '发文日期',
            align:"center",
            dataIndex: 'qfrq'
           },

		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/sfwgl/sfwgl/list",
          delete: "/sfwgl/sfwgl/delete",
          deleteBatch: "/sfwgl/sfwgl/deleteBatch",
          exportXlsUrl: "sfwgl/sfwgl/exportXls",
          importExcelUrl: "sfwgl/sfwgl/importExcel",
          exportTemplateUrl: "/sfwgl/sfwgl/exportTemplateXls",
       },
        exportTemplateName: '收发文管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleEdit: function(record) {
        console.log('SfwglList => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
      },

      handleView: function(record) {
        console.log('SfwglList => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看详情";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.show = false;
        this.$refs.modalForm.viewFalg=true
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { id: record.id }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>