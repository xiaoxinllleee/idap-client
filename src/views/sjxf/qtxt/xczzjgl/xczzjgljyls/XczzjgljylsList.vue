<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-input placeholder="请输入交易状态" v-model="queryParam.state"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作机构代码">
              <a-input placeholder="请输入操作机构代码" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员">
              <a-input placeholder="请输入操作柜员" v-model="queryParam.operNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户账号">
              <a-input placeholder="请输入客户账号" v-model="queryParam.custAcctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户账号类型">
              <a-input placeholder="请输入客户账号类型" v-model="queryParam.custAcctType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户账号科目">
              <a-input placeholder="请输入客户账号科目" v-model="queryParam.custAcctKmh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-input placeholder="请输入交易状态" v-model="queryParam.tranStat"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('乡财政资金管理交易流水')">导出</a-button>
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
        :scroll="{x:6450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xczzjgljyls-modal ref="modalForm" @ok="modalFormOk"></xczzjgljyls-modal>
  </a-card>
</template>

<script>
  import XczzjgljylsModal from './modules/XczzjgljylsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XczzjgljylsList",
    mixins:[JeecgListMixin],
    components: {
      XczzjgljylsModal
    },
    data () {
      return {
        description: '乡财政资金管理交易流水管理页面',
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
            title: '前置日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '前置流水号',
            align:"center",
            dataIndex: 'seqNo'
           },
		   {
            title: '前置时间',
            align:"center",
            dataIndex: 'txTime'
           },
		   {
            title: '前置交易码',
            align:"center",
            dataIndex: 'txCode'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'state'
           },
		   {
            title: '请求渠道编码',
            align:"center",
            dataIndex: 'chNo'
           },
		   {
            title: '接入节点号',
            align:"center",
            dataIndex: 'sndApp'
           },
		   {
            title: '请求渠道日期',
            align:"center",
            dataIndex: 'chDate'
           },
		   {
            title: '请求渠道交易码',
            align:"center",
            dataIndex: 'chTxCode'
           },
		   {
            title: '渠道流水号',
            align:"center",
            dataIndex: 'chSeqNo'
           },
		   {
            title: '机构 操作机构代码',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'operNo'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'authOperNo'
           },
		   {
            title: '中间业务类型',
            align:"center",
            dataIndex: 'zjywlx'
           },
		   {
            title: '核心交易码',
            align:"center",
            dataIndex: 'hostTxCode'
           },
		   {
            title: '核心日期',
            align:"center",
            dataIndex: 'hostDate'
           },
		   {
            title: '核心流水号',
            align:"center",
            dataIndex: 'hostSeqNo'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'txAmt'
           },
		   {
            title: '借贷标志',
            align:"center",
            dataIndex: 'dcFlag'
           },
		   {
            title: '单位编码',
            align:"center",
            dataIndex: 'unitNo'
           },
		   {
            title: '单位名称',
            align:"center",
            dataIndex: 'unitName'
           },
		   {
            title: '单位账号',
            align:"center",
            dataIndex: 'unitAcctNo'
           },
		   {
            title: '第三方交易码',
            align:"center",
            dataIndex: 'entTxCode'
           },
		   {
            title: '企业日期',
            align:"center",
            dataIndex: 'entDate'
           },
		   {
            title: '企业流水号',
            align:"center",
            dataIndex: 'entSeqNo'
           },
		   {
            title: '客户账号',
            align:"center",
            dataIndex: 'custAcctNo'
           },
		   {
            title: '客户账号类型',
            align:"center",
            dataIndex: 'custAcctType'
           },
		   {
            title: '客户账号机构',
            align:"center",
            dataIndex: 'custAcctInst'
           },
		   {
            title: '客户账号科目',
            align:"center",
            dataIndex: 'custAcctKmh'
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '第三方客户标识符',
            align:"center",
            dataIndex: 'fCustNo'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'tranStat'
           },
		   {
            title: '错误码',
            align:"center",
            dataIndex: 'errCode'
           },
		   {
            title: '错误信息',
            align:"center",
            dataIndex: 'errMsg'
           },
		   {
            title: '自定义自段1',
            align:"center",
            dataIndex: 'usrdefine1'
           },
		   {
            title: '自定义自段2',
            align:"center",
            dataIndex: 'usrdefine2'
           },
		   {
            title: 'UUID',
            align:"center",
            dataIndex: 'uuid'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载日期',
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
          list: "/xczzjgljyls/xczzjgljyls/list",
          delete: "/xczzjgljyls/xczzjgljyls/delete",
          deleteBatch: "/xczzjgljyls/xczzjgljyls/deleteBatch",
          exportXlsUrl: "xczzjgljyls/xczzjgljyls/exportXls",
          importExcelUrl: "xczzjgljyls/xczzjgljyls/importExcel",
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