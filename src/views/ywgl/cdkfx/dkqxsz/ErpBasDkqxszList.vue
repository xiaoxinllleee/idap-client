<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="组织标识">
            <j-tree-select placeholder="请选择支行" v-model="queryParam.zzbz"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" />
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="有效标志">
              <a-select  placeholder="全部" v-model="queryParam.yxbz" style="width: 100%" >
                <a-select-option value="0">
                  无效
                </a-select-option>
                <a-select-option value="1">
                  有效
                </a-select-option>
              </a-select>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'dkqxsz:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷款权限设置')" v-has="'dkqxsz:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
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
        rowKey="zzbz"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkqxsz:edit'">编辑</a>

          <a-divider type="vertical" />
         <!-- <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                  </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.zzbz)" v-has="'dkqxsz:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <erpBasDkqxsz-modal ref="modalForm" @ok="modalFormOk"></erpBasDkqxsz-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import ErpBasDkqxszModal from './modules/ErpBasDkqxszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import store from '@/store/'
  export default {
    name: "ErpBasDkqxszList",
    mixins:[JeecgListMixin],
    components: {
      ErpBasDkqxszModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: 'Erp_bas_dkqxsz管理页面',
        exportTemplateName: '贷款权限设置导入模板',
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
            title: '所属组织',
            align:"center",
            dataIndex: 'zzbz'
           },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
		   {
            title: '单笔贷款限额',
            align:"center",
            dataIndex: 'dbdkxe'
           },
		   {
            title: '单户贷款限额',
            align:"center",
            dataIndex: 'dhdkxe'
           },
		   {
            title: '有效标志',
            align:"center",
            dataIndex: 'yxbz_dictText',
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkqxsz/erpBasDkqxsz/list",
          delete: "/dkqxsz/erpBasDkqxsz/delete",
          deleteBatch: "/dkqxsz/erpBasDkqxsz/deleteBatch",
          exportXlsUrl: "dkqxsz/erpBasDkqxsz/exportXls",
          importExcelUrl: "dkqxsz/erpBasDkqxsz/importExcel",
          exportTemplateUrl: "/dkqxsz/erpBasDkqxsz/exportTemplateXls",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      searchReset() {
        this.queryParam={zzbz:''};
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>