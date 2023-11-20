<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.sskhjl"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属类型">
              <j-dict-select-tag placeholder="请选所属类型" v-model="queryParam.sslx" dict-code="sslx"/>
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
      <a-button icon="download" @click="handleExportXls('客户归属客户经理')" v-has="'khsskhjl:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'khsskhjl:imp'">导入</a-button>
      <a-button @click="khjlfpModules" type="primary" icon="plus" v-has="'khsskhjl:khjlfp'">分配客户经理</a-button>


      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
              <a-button type="primary" icon="import">导入</a-button>
            </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'khsskhjl:edit'">编辑</a>

<!--          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <khsskhjl-modal ref="modalForm" @ok="modalFormOk"></khsskhjl-modal>
    <KhjlfpModal ref="khjlfpModules" @ok="modalFormOk" ></KhjlfpModal>
  </a-card>
</template>

<script>
  import khsskhjlModal from './modules/khsskhjlModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import KhjlfpModal from './modules/KhjlfpModal'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "khsskhjlList",
    mixins:[JeecgListMixin],
    components: {
      khsskhjlModal,KhjlfpModal, ExcelImport
    },
    data () {
      return {
        description: '客户归属客户经理管理页面',
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
		  /* {
            title: '客户编号',
            align:"center",
            dataIndex: 'dabh'
           },*/
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
          {
            title: '所属类型',
            align:"center",
            dataIndex: 'sslx_dictText'
          },
		   {
            title: '所属客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText'
           },
          {
            title: '客户经理工号',
            align:"center",
            dataIndex: 'sskhjl'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khgs/khsskhjl/list",
          delete: "/khgs/khsskhjl/delete",
          deleteBatch: "/khgs/khsskhjl/deleteBatch",
          exportXlsUrl: "khgs/khsskhjl/exportXls",
          importExcelUrl: "khgs/khsskhjl/importExcel",
          exportTemplateUrl:"/khgs/khsskhjl/exportTemplateXls",
       },
        exportTemplateName: '客户归属管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      khjlfpModules(){
        this.$refs.khjlfpModules.visible = true;
        this.$refs.khjlfpModules.init()
        //this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>