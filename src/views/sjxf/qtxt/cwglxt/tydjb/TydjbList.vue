<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="审批编号">
              <a-input placeholder="请输入审批编号" v-model="queryParam.appNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="成交单编号">
              <a-input placeholder="请输入成交单编号" v-model="queryParam.contractNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易对手名称">
              <a-input placeholder="请输入交易对手名称" v-model="queryParam.ctpyName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资金账户户名">
              <a-input placeholder="请输入资金账户户名" v-model="queryParam.accountName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资金账号">
              <a-input placeholder="请输入资金账号" v-model="queryParam.bankAcno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属部门">
              <a-input placeholder="请输入所属部门" v-model="queryParam.depNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属账务机构">
              <a-input placeholder="请输入所属账务机构" v-model="queryParam.brNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('同业登记簿')">导出</a-button>
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
        :scroll="{x:8430}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tydjb-modal ref="modalForm" @ok="modalFormOk"></tydjb-modal>
  </a-card>
</template>

<script>
  import TydjbModal from './modules/TydjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "TydjbList",
    mixins:[JeecgListMixin],
    components: {
      TydjbModal
    },
    data () {
      return {
        description: '同业登记簿管理页面',
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
            title: '审批编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '成交单编号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '交易笔次',
            align:"center",
            dataIndex: 'txCnt'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tradeType'
           },
		   {
            title: '交易对手编号',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '交易对手版本号',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: '交易对手名称',
            align:"center",
            dataIndex: 'ctpyName'
           },
		   {
            title: '资金账户户名',
            align:"center",
            dataIndex: 'accountName'
           },
		   {
            title: '资金开户行名',
            align:"center",
            dataIndex: 'bankName'
           },
		   {
            title: '资金账号',
            align:"center",
            dataIndex: 'bankAcno'
           },
		   {
            title: '支付系统行号',
            align:"center",
            dataIndex: 'bankNo'
           },
		   {
            title: '同业申请金额(元)',
            align:"center",
            dataIndex: 'industryAmt'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'icDate'
           },
		   {
            title: '期限(天)',
            align:"center",
            dataIndex: 'term'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'mtrDate'
           },
		   {
            title: '利率(%)',
            align:"center",
            dataIndex: 'rate'
           },
		   {
            title: '逾期利率',
            align:"center",
            dataIndex: 'overRate'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'ywNo'
           },
		   {
            title: '利率性质',
            align:"center",
            dataIndex: 'rateProperty'
           },
		   {
            title: '利率类型',
            align:"center",
            dataIndex: 'rateType'
           },
		   {
            title: '日利率计算方式',
            align:"center",
            dataIndex: 'dateRateNum'
           },
		   {
            title: '利息结算方式',
            align:"center",
            dataIndex: 'lxjsType'
           },
		   {
            title: '利息结算周期',
            align:"center",
            dataIndex: 'lxjsCyc'
           },
		   {
            title: '浮动利率变动周期',
            align:"center",
            dataIndex: 'fdllCyc'
           },
		   {
            title: '计提利息周期',
            align:"center",
            dataIndex: 'jtlxCyc'
           },
		   {
            title: '计提利息方式',
            align:"center",
            dataIndex: 'jtlxType'
           },
		   {
            title: '上次计提日期',
            align:"center",
            dataIndex: 'lJtDate'
           },
		   {
            title: '是否允许提前提取',
            align:"center",
            dataIndex: 'tqzqType'
           },
		   {
            title: '提前支取利息来源',
            align:"center",
            dataIndex: 'tqzqRateSour'
           },
		   {
            title: '提前支取利率(%)',
            align:"center",
            dataIndex: 'tqzqRate'
           },
		   {
            title: '提前支取利率生效日',
            align:"center",
            dataIndex: 'tqzqBeginDate'
           },
		   {
            title: '是否到期转存',
            align:"center",
            dataIndex: 'isDeposit'
           },
		   {
            title: '到期转存方式',
            align:"center",
            dataIndex: 'depositType'
           },
		   {
            title: '转存操作类型',
            align:"center",
            dataIndex: 'depositDotype'
           },
		   {
            title: '到期申请编号',
            align:"center",
            dataIndex: 'dappNo'
           },
		   {
            title: '转存新增金额(元)',
            align:"center",
            dataIndex: 'addAmt'
           },
		   {
            title: '内部帐AC_NO',
            align:"center",
            dataIndex: 'acNo'
           },
		   {
            title: '内部帐AC_ID',
            align:"center",
            dataIndex: 'acId'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '所属部门',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '所属账务机构',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '所属联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '计划编号',
            align:"center",
            dataIndex: 'planNo'
           },
		   {
            title: '计划日期',
            align:"center",
            dataIndex: 'chnlInd'
           },
		   {
            title: '提前支取利率类型',
            align:"center",
            dataIndex: 'tqzqRateType'
           },
		   {
            title: '提前支取日利率计算方式',
            align:"center",
            dataIndex: 'tqzqDateRateNum'
           },
		   {
            title: '本方经办人',
            align:"center",
            dataIndex: 'trader'
           },
		   {
            title: '对方经办人',
            align:"center",
            dataIndex: 'ctpyTrader'
           },
		   {
            title: '摘要',
            align:"center",
            dataIndex: 'brf'
           },
		   {
            title: '定活标志',
            align:"center",
            dataIndex: 'dhType'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '本方编号',
            align:"center",
            dataIndex: 'bctpyNo'
           },
		   {
            title: '本方版本号',
            align:"center",
            dataIndex: 'bversion'
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
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   /*{
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
          list: "/tydjb/tydjb/list",
          delete: "/tydjb/tydjb/delete",
          deleteBatch: "/tydjb/tydjb/deleteBatch",
          exportXlsUrl: "tydjb/tydjb/exportXls",
          importExcelUrl: "tydjb/tydjb/importExcel",
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