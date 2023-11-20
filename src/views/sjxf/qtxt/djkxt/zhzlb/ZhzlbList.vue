<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.cardNbr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.xaccount"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡片产品种类">
              <a-input placeholder="请输入卡片产品种类" v-model="queryParam.product"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="分行编号">
              <a-input placeholder="请输入分行编号" v-model="queryParam.branch"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="公司编号">
              <a-input placeholder="请输入公司编号" v-model="queryParam.business"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="信用额度">
              <a-input placeholder="请输入信用额度" v-model="queryParam.credLimit"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('账户资料表')">导出</a-button>
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
        :scroll="{x:23450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zhzlb-modal ref="modalForm" @ok="modalFormOk"></zhzlb-modal>
  </a-card>
</template>

<script>
  import ZhzlbModal from './modules/ZhzlbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZhzlbList",
    mixins:[JeecgListMixin],
    components: {
      ZhzlbModal
    },
    data () {
      return {
        description: '账户资料表管理页面',
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
            title: '卡号',
            align:"center",
            dataIndex: 'cardNbr'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'xaccount'
           },
		   {
            title: '最近地址修改日期',
            align:"center",
            dataIndex: 'addChgday'
           },
		   {
            title: '帐单地址类型',
            align:"center",
            dataIndex: 'addrType'
           },
		   {
            title: '卡片产品种类',
            align:"center",
            dataIndex: 'product'
           },
		   {
            title: '分行编号',
            align:"center",
            dataIndex: 'branch'
           },
		   {
            title: '公司编号',
            align:"center",
            dataIndex: 'business'
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'dayOpened'
           },
		   {
            title: '信用额度',
            align:"center",
            dataIndex: 'credLimit'
           },
		   {
            title: '第二币种信用额度',
            align:"center",
            dataIndex: 'credlimX'
           },
		   {
            title: '分期付款信用额度',
            align:"center",
            dataIndex: 'mpLimit'
           },
		   {
            title: '授权未请款金额',
            align:"center",
            dataIndex: 'authsAmt'
           },
		   {
            title: '还款截止日期',
            align:"center",
            dataIndex: 'cutoffDay'
           },
		   {
            title: '上次还款日期',
            align:"center",
            dataIndex: 'lastpayday'
           },
		   {
            title: '已结算付款额',
            align:"center",
            dataIndex: 'paymtClrd'
           },
		   {
            title: '本期消费净额',
            align:"center",
            dataIndex: 'purchases'
           },
		   {
            title: '本期消费净额(正负号)',
            align:"center",
            dataIndex: 'purchasesFlag'
           },
		   {
            title: '本期年费金额',
            align:"center",
            dataIndex: 'cardFees'
           },
		   {
            title: '本期预借现金费用总额',
            align:"center",
            dataIndex: 'cashAdfee'
           },
		   {
            title: '本期预借现金总额',
            align:"center",
            dataIndex: 'cashAdvce'
           },
		   {
            title: '本期其它费用的总额',
            align:"center",
            dataIndex: 'otherFees'
           },
		   {
            title: '本期预收罚金',
            align:"center",
            dataIndex: 'penchgAcc'
           },
		   {
            title: '逾期金额',
            align:"center",
            dataIndex: 'stmOverdu'
           },
		   {
            title: '逾期天数',
            align:"center",
            dataIndex: 'dayOdue'
           },
		   {
            title: '争议金额',
            align:"center",
            dataIndex: 'queryAmt'
           },
		   {
            title: '本期借记调整金额',
            align:"center",
            dataIndex: 'debitAdj'
           },
		   {
            title: '本期贷记调帐金额',
            align:"center",
            dataIndex: 'credAdj'
           },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'closeCode'
           },
		   {
            title: '账户状态日期',
            align:"center",
            dataIndex: 'closeChdy'
           },
		   {
            title: '昨日消费余额',
            align:"center",
            dataIndex: 'balFree'
           },
		   {
            title: '昨日预借现金余额',
            align:"center",
            dataIndex: 'balInt'
           },
		   {
            title: '昨日预借现金余额符号',
            align:"center",
            dataIndex: 'balIntFlag'
           },
		   {
            title: '昨日费用余额',
            align:"center",
            dataIndex: 'balNoint'
           },
		   {
            title: '昨日利息余额',
            align:"center",
            dataIndex: 'balOrint'
           },
		   {
            title: '帐户进入催收队列的日期',
            align:"center",
            dataIndex: 'octDayin'
           },
		   {
            title: '货币代码',
            align:"center",
            dataIndex: 'currNum'
           },
		   {
            title: '最近一次计息日期',
            align:"center",
            dataIndex: 'intUptody'
           },
		   {
            title: '应收利息',
            align:"center",
            dataIndex: 'intChgd'
           },
		   {
            title: '本帐期的还款笔数',
            align:"center",
            dataIndex: 'nbrPaymnt'
           },
		   {
            title: '本帐期的一般消费笔数',
            align:"center",
            dataIndex: 'nbrPurch'
           },
		   {
            title: '本帐期的所有交易笔数',
            align:"center",
            dataIndex: 'nbrTrans'
           },
		   {
            title: '当期调整的红利积分',
            align:"center",
            dataIndex: 'pointAdj1'
           },
		   {
            title: '当期兑换的红利积分',
            align:"center",
            dataIndex: 'pointClm'
           },
		   {
            title: '累计的红利积分',
            align:"center",
            dataIndex: 'pointCum'
           },
		   {
            title: '当期新增的红利积分',
            align:"center",
            dataIndex: 'pointEar'
           },
		   {
            title: '自动扣款代码',
            align:"center",
            dataIndex: 'repayCode1'
           },
		   {
            title: '最近一期帐单的不计息余额',
            align:"center",
            dataIndex: 'stmNoint'
           },
		   {
            title: '最近一期帐单的消费余额',
            align:"center",
            dataIndex: 'stmBalfre'
           },
		   {
            title: '最近一期帐单的利息余额',
            align:"center",
            dataIndex: 'stmBalori'
           },
		   {
            title: '最近一期帐单的预借现金余额',
            align:"center",
            dataIndex: 'stmBalint'
           },
		   {
            title: '最近一期帐单的预借现金符号',
            align:"center",
            dataIndex: 'stmBalintSign'
           },
		   {
            title: '最近一期帐单金额',
            align:"center",
            dataIndex: 'stmBalnce'
           },
		   {
            title: '最近一期帐单的最低应缴款',
            align:"center",
            dataIndex: 'stmMindue'
           },
		   {
            title: '帐单代码',
            align:"center",
            dataIndex: 'stmCode'
           },
		   {
            title: '逾期金额1',
            align:"center",
            dataIndex: 'ageingA1'
           },
		   {
            title: '逾期金额2',
            align:"center",
            dataIndex: 'ageingA2'
           },
		   {
            title: '逾期金额3',
            align:"center",
            dataIndex: 'ageingA3'
           },
		   {
            title: '逾期金额4',
            align:"center",
            dataIndex: 'ageingA4'
           },
		   {
            title: '逾期金额5',
            align:"center",
            dataIndex: 'ageingA5'
           },
		   {
            title: '逾期金额6',
            align:"center",
            dataIndex: 'ageingA6'
           },
		   {
            title: '逾期最高期数',
            align:"center",
            dataIndex: 'mthsOdue'
           },
		   {
            title: '复利余额',
            align:"center",
            dataIndex: 'balCmpint'
           },
		   {
            title: '当期发生退货金额',
            align:"center",
            dataIndex: 'credVouch'
           },
		   {
            title: '帐单日',
            align:"center",
            dataIndex: 'cycleNbr'
           },
		   {
            title: '购汇功能选项',
            align:"center",
            dataIndex: 'exchCode1'
           },
		   {
            title: '分期付款授权金额',
            align:"center",
            dataIndex: 'mpAuths'
           },
		   {
            title: '分期付款剩余总额,包含利息、本金和费用',
            align:"center",
            dataIndex: 'mpBal'
           },
		   {
            title: '帐单地址栏位1',
            align:"center",
            dataIndex: 'address1'
           },
		   {
            title: '帐单地址栏位2',
            align:"center",
            dataIndex: 'address2'
           },
		   {
            title: '帐单地址栏位3',
            align:"center",
            dataIndex: 'address3'
           },
		   {
            title: '帐单地址栏位4',
            align:"center",
            dataIndex: 'address4'
           },
		   {
            title: '帐单地址栏位5',
            align:"center",
            dataIndex: 'address5'
           },
		   {
            title: '帐单地址邮编',
            align:"center",
            dataIndex: 'postCode'
           },
		   {
            title: '昨日分期余额',
            align:"center",
            dataIndex: 'balMp'
           },
		   {
            title: '上期帐单分期余额',
            align:"center",
            dataIndex: 'stmBalmp'
           },
		   {
            title: '关联还款账号1',
            align:"center",
            dataIndex: 'bankacctA1'
           },
		   {
            title: '关联还款账号2',
            align:"center",
            dataIndex: 'bankacctA2'
           },
		   {
            title: '关联还款账号3',
            align:"center",
            dataIndex: 'bankacctA3'
           },
		   {
            title: '关联还款账号4',
            align:"center",
            dataIndex: 'bankacctA4'
           },
		   {
            title: '关联账号代码1',
            align:"center",
            dataIndex: 'bankcodeA1'
           },
		   {
            title: '关联账号代码1',
            align:"center",
            dataIndex: 'bankcodeA2'
           },
		   {
            title: '关联账号代码1',
            align:"center",
            dataIndex: 'bankcodeA3'
           },
		   {
            title: '关联账号代码1',
            align:"center",
            dataIndex: 'bankcodeA4'
           },
		   {
            title: '人民币自扣还款标志',
            align:"center",
            dataIndex: 'repayCode2'
           },
		   {
            title: '美元自扣还款标志',
            align:"center",
            dataIndex: 'repayCodx'
           },
		   {
            title: '购汇功能选项',
            align:"center",
            dataIndex: 'exchFlag'
           },
		   {
            title: '购汇金额选项',
            align:"center",
            dataIndex: 'exchCode2'
           },
		   {
            title: '最近一期帐单处理日',
            align:"center",
            dataIndex: 'stmClosdy'
           },
		   {
            title: '当期调整红利积分符号',
            align:"center",
            dataIndex: 'pointAdj2'
           },
		   {
            title: '累计总积分符号',
            align:"center",
            dataIndex: 'pointCum02'
           },
		   {
            title: '账户征信代码_职务',
            align:"center",
            dataIndex: 'credcode1'
           },
		   {
            title: '账户征信代码_项目',
            align:"center",
            dataIndex: 'credcode2'
           },
		   {
            title: '帐户标志位',
            align:"center",
            dataIndex: 'acctFlag'
           },
		   {
            title: '帐户预借现金比例',
            align:"center",
            dataIndex: 'caPcnt'
           },
		   {
            title: '有无分行推荐函',
            align:"center",
            dataIndex: 'brnchIntr'
           },
		   {
            title: '分行建议额度',
            align:"center",
            dataIndex: 'brnchcrlmt'
           },
		   {
            title: '核实内容',
            align:"center",
            dataIndex: 'vrfCntnt'
           },
		   {
            title: '账户级短信费免收标志',
            align:"center",
            dataIndex: 'smsFreeyn'
           },
		   {
            title: '临时额度',
            align:"center",
            dataIndex: 'tempLimit'
           },
		   {
            title: '临时额度失效日期',
            align:"center",
            dataIndex: 'tlmtEnd'
           },
		   {
            title: '临时额度生效日期',
            align:"center",
            dataIndex: 'tlmtBeg'
           },
		   {
            title: '预借积分额度',
            align:"center",
            dataIndex: 'paLimit'
           },
		   {
            title: '已全额还款标志',
            align:"center",
            dataIndex: 'payFlag'
           },
		   {
            title: '应收复利',
            align:"center",
            dataIndex: 'intChdcmp'
           },
		   {
            title: '上期应计利息',
            align:"center",
            dataIndex: 'intNotion'
           },
		   {
            title: '当期应计利息',
            align:"center",
            dataIndex: 'intCunot'
           },
		   {
            title: '当期应计复利',
            align:"center",
            dataIndex: 'intCurcmp'
           },
		   {
            title: '应计复利利息',
            align:"center",
            dataIndex: 'intCmpond'
           },
		   {
            title: '账户质押办卡/调额标志',
            align:"center",
            dataIndex: 'impFlag'
           },
		   {
            title: '不上报征信数据原因',
            align:"center",
            dataIndex: 'ncredRsn'
           },
		   {
            title: '监控代码',
            align:"center",
            dataIndex: 'montrCode'
           },
		   {
            title: '影子额度',
            align:"center",
            dataIndex: 'credLmt2'
           },
		   {
            title: '影子额度标志',
            align:"center",
            dataIndex: 'infoFlag'
           },
		   {
            title: '本期费用01',
            align:"center",
            dataIndex: 'balNint01'
           },
		   {
            title: '本期费用02',
            align:"center",
            dataIndex: 'balNint02'
           },
		   {
            title: '本期费用03',
            align:"center",
            dataIndex: 'balNint03'
           },
		   {
            title: '本期费用04',
            align:"center",
            dataIndex: 'balNint04'
           },
		   {
            title: '本期费用05',
            align:"center",
            dataIndex: 'balNint05'
           },
		   {
            title: '本期费用06',
            align:"center",
            dataIndex: 'balNint06'
           },
		   {
            title: '本期费用07',
            align:"center",
            dataIndex: 'balNint07'
           },
		   {
            title: '本期费用08',
            align:"center",
            dataIndex: 'balNint08'
           },
		   {
            title: '本期费用09',
            align:"center",
            dataIndex: 'balNint09'
           },
		   {
            title: '本期费用10',
            align:"center",
            dataIndex: 'balNint10'
           },
		   {
            title: '上期费用01',
            align:"center",
            dataIndex: 'stmNint01'
           },
		   {
            title: '上期费用02',
            align:"center",
            dataIndex: 'stmNint02'
           },
		   {
            title: '上期费用03',
            align:"center",
            dataIndex: 'stmNint03'
           },
		   {
            title: '上期费用04',
            align:"center",
            dataIndex: 'stmNint04'
           },
		   {
            title: '上期费用05',
            align:"center",
            dataIndex: 'stmNint05'
           },
		   {
            title: '上期费用06',
            align:"center",
            dataIndex: 'stmNint06'
           },
		   {
            title: '上期费用07',
            align:"center",
            dataIndex: 'stmNint07'
           },
		   {
            title: '上期费用08',
            align:"center",
            dataIndex: 'stmNint08'
           },
		   {
            title: '上期费用09',
            align:"center",
            dataIndex: 'stmNint09'
           },
		   {
            title: '上期费用10',
            align:"center",
            dataIndex: 'stmNint10'
           },
		   {
            title: '核销标志',
            align:"center",
            dataIndex: 'wrofFlag'
           },
		   {
            title: '核销原因代码',
            align:"center",
            dataIndex: 'canclResn'
           },
		   {
            title: '停收利息',
            align:"center",
            dataIndex: 'shadowInt'
           },
		   {
            title: '停收复利',
            align:"center",
            dataIndex: 'shadowCmp'
           },
		   {
            title: '停收滞纳金',
            align:"center",
            dataIndex: 'shadowPen'
           },
		   {
            title: '表内转表外费用',
            align:"center",
            dataIndex: 'balCmpfee'
           },
		   {
            title: '消费免息标志',
            align:"center",
            dataIndex: 'fpFlag'
           },
		   {
            title: '消费免息额度固定值',
            align:"center",
            dataIndex: 'freeLimit'
           },
		   {
            title: '消费免息额度比率',
            align:"center",
            dataIndex: 'freePcnt'
           },
		   {
            title: '消费免息额度最大值',
            align:"center",
            dataIndex: 'freeMax'
           },
		   {
            title: '消费免息额度最小值',
            align:"center",
            dataIndex: 'freeMin'
           },
		   {
            title: '分期剩余本金',
            align:"center",
            dataIndex: 'mpRemPpl'
           },
		   {
            title: '预设临额',
            align:"center",
            dataIndex: 'credLmt3'
           },
		   {
            title: '自动分期计划相关字段',
            align:"center",
            dataIndex: 'mpautoGw'
           },
		   {
            title: '利率代码',
            align:"center",
            dataIndex: 'intCode'
           },
		   {
            title: '上次信用额度更改日期',
            align:"center",
            dataIndex: 'credChday'
           },
		   {
            title: '不可调整额度账户',
            align:"center",
            dataIndex: 'adjFlag'
           },
		   {
            title: '照会结论',
            align:"center",
            dataIndex: 'noteRst'
           },
		   {
            title: '照会原因',
            align:"center",
            dataIndex: 'noteRsn'
           },
		   {
            title: '关帐详细原因',
            align:"center",
            dataIndex: 'reclaCode'
           },
		   {
            title: '宽限期新增积分',
            align:"center",
            dataIndex: 'pointCum2'
           },
		   {
            title: '被折算掉积分',
            align:"center",
            dataIndex: 'pointRev'
           },
		   {
            title: '未结清还款金额',
            align:"center",
            dataIndex: 'paymtUncl'
           },
		   {
            title: '争议代码',
            align:"center",
            dataIndex: 'queryCode'
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
          list: "/zhzlb/zhzlb/list",
          delete: "/zhzlb/zhzlb/delete",
          deleteBatch: "/zhzlb/zhzlb/deleteBatch",
          exportXlsUrl: "zhzlb/zhzlb/exportXls",
          importExcelUrl: "zhzlb/zhzlb/importExcel",
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