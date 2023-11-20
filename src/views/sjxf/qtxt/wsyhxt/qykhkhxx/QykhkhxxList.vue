<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银客户号">
              <a-input placeholder="请输入网银客户号" v-model="queryParam.cifCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称(中文)">
              <a-input placeholder="请输入客户名称(中文)" v-model="queryParam.cifNamecn"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.cifCtfno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
       <!--       <a-input placeholder="请输入开户机构" v-model="queryParam.cifOpennode"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.cifOpennode"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系电话">
              <a-input placeholder="请输入联系电话" v-model="queryParam.cifPhone"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.cifStt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销客户经理编号">
              <a-input placeholder="请输入营销客户经理编号" v-model="queryParam.cifMcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销客户经理姓名">
              <a-input placeholder="请输入营销客户经理姓名" v-model="queryParam.cifMname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核心客户号">
              <a-input placeholder="请输入核心客户号" v-model="queryParam.cifHostno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户操作员">
              <a-input placeholder="请输入开户操作员" v-model="queryParam.cifOpenteller"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业客户开户信息')">导出</a-button>

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
        :scroll="{x:3450}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <qykhkhxx-modal ref="modalForm" @ok="modalFormOk"></qykhkhxx-modal>
  </a-card>
</template>

<script>
  import QykhkhxxModal from './modules/QykhkhxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "QykhkhxxList",
    mixins:[JeecgListMixin],
    components: {
      QykhkhxxModal,JTreeSelect
    },
    data () {
      return {
        description: '企业客户开户信息管理页面',
        // 表头
        columns: [
          {
            title: '',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '网银客户号',
            align:"center",
            dataIndex: 'cifCstno'
           },
		   {
            title: '客户名称(中文)',
            align:"center",
            dataIndex: 'cifNamecn'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'cifCtftyp'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'cifCtfno'
           },
		   {
            title: '开户时间',
            align:"center",
            dataIndex: 'cifOpentime'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'cifOpennode_dictText'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'cifPhone'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'cifStt'
           },
		   {
            title: '营销客户经理编号',
            align:"center",
            dataIndex: 'cifMcode'
           },
		   {
            title: '营销客户经理姓名',
            align:"center",
            dataIndex: 'cifMname'
           },
		   {
            title: '核心客户号',
            align:"center",
            dataIndex: 'cifHostno'
           },
		   {
            title: '开户操作员',
            align:"center",
            dataIndex: 'cifOpenteller'
           },
		   {
            title: '最后更新时间',
            align:"center",
            dataIndex: 'cifModifytime'
           },
		   {
            title: '注销机构',
            align:"center",
            dataIndex: 'cifCancelnode'
           },
		   {
            title: '注销操作员',
            align:"center",
            dataIndex: 'cifCancelteller'
           },
		   {
            title: '注销时间',
            align:"center",
            dataIndex: 'cifCanceltime'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		  /* {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'dttime',
            align:"center",
            dataIndex: 'dttime'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/qykhkhxx/qykhkhxx/list",
          delete: "/qykhkhxx/qykhkhxx/delete",
          deleteBatch: "/qykhkhxx/qykhkhxx/deleteBatch",
          exportXlsUrl: "qykhkhxx/qykhkhxx/exportXls",
          importExcelUrl: "qykhkhxx/qykhkhxx/importExcel",
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