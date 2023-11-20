<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户">
              <a-input placeholder="请输入账户" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联机交易号">
              <a-input placeholder="请输入联机交易号" v-model="queryParam.sid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员ID">
              <a-input placeholder="请输入操作员ID" v-model="queryParam.userId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借据号">
              <a-input placeholder="请输入借据号" v-model="queryParam.voucherNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款类型">
              <a-input placeholder="请输入贷款类型" v-model="queryParam.businessType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号，合同号">
              <a-input placeholder="请输入业务编号，合同号" v-model="queryParam.businessNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同编号">
              <a-input placeholder="请输入合同编号" v-model="queryParam.contractId"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款业务借据表')">导出</a-button>
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
        :scroll="{x:34300}"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkywjjb-modal ref="modalForm" @ok="modalFormOk"></dkywjjb-modal>
  </a-card>
</template>

<script>
  import DkywjjbModal from './modules/DkywjjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DkywjjbList",
    mixins:[JeecgListMixin],
    components: {
      DkywjjbModal
    },
    data () {
      return {
        description: '贷款业务借据表管理页面',
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
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '核心借据号',
            align:"center",
            dataIndex: 'hxjjh'
           },
		   {
            title: '联机交易号',
            align:"center",
            dataIndex: 'sid'
           },
		   {
            title: '逾期标志',
            align:"center",
            dataIndex: 'yqbz'
           },
		   {
            title: '记账日期',
            align:"center",
            dataIndex: 'jzDate'
           },
		   {
            title: '五级分类可疑金额',
            align:"center",
            dataIndex: 'suspiciousSum'
           },
		   {
            title: '操作员ID',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '借据号',
            align:"center",
            dataIndex: 'voucherNo'
           },
		   {
            title: '放贷流程流水号',
            align:"center",
            dataIndex: 'voucherFlow'
           },
		   {
            title: '放贷状态',
            align:"center",
            dataIndex: 'voucherStatus'
           },
		   {
            title: '展期标志',
            align:"center",
            dataIndex: 'extendFlag'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'endDate'
           },
		   {
            title: '贷款期限',
            align:"center",
            dataIndex: 'appTerm'
           },
		   {
            title: '贷款种类',
            align:"center",
            dataIndex: 'loanKind'
           },
		   {
            title: '存款帐号',
            align:"center",
            dataIndex: 'depositNo'
           },
		   {
            title: '贷款科目一',
            align:"center",
            dataIndex: 'businessSubject1'
           },
		   {
            title: '贷款科目二',
            align:"center",
            dataIndex: 'businessSubject2'
           },
		   {
            title: '贷款科目三',
            align:"center",
            dataIndex: 'businessSubject3'
           },
		   {
            title: '贷款科目四',
            align:"center",
            dataIndex: 'businessSubject4'
           },
		   {
            title: '贷款科目五',
            align:"center",
            dataIndex: 'businessSubject5'
           },
		   {
            title: '欠息日期',
            align:"center",
            dataIndex: 'calcDate'
           },
		   {
            title: '最小欠息日',
            align:"center",
            dataIndex: 'minCalcDate'
           },
		   {
            title: '实际用途',
            align:"center",
            dataIndex: 'actualPurpose'
           },
		   {
            title: '统计用途',
            align:"center",
            dataIndex: 'statiPurpose'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '是否投保',
            align:"center",
            dataIndex: 'isInsure'
           },
		   {
            title: '发生类型',
            align:"center",
            dataIndex: 'occurType'
           },
		   {
            title: '征信业务种类',
            align:"center",
            dataIndex: 'businessKind'
           },
		   {
            title: '起息日期',
            align:"center",
            dataIndex: 'qxDate'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '批准利率',
            align:"center",
            dataIndex: 'appRate'
           },
		   {
            title: '批准金额',
            align:"center",
            dataIndex: 'appSum'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'balance'
           },
		   {
            title: '关联序号',
            align:"center",
            dataIndex: 'businessDueId'
           },
		   {
            title: '业务编号，合同号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: '交易编号',
            align:"center",
            dataIndex: 'businessPhase'
           },
		   {
            title: '贷款类型',
            align:"center",
            dataIndex: 'businessType'
           },
		   {
            title: '五级分类关注金额',
            align:"center",
            dataIndex: 'concernSum'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '五级分类类型',
            align:"center",
            dataIndex: 'fiveClassType'
           },
		   {
            title: '放款人编号',
            align:"center",
            dataIndex: 'fkId'
           },
		   {
            title: '四级状态',
            align:"center",
            dataIndex: 'fourClassState'
           },
		   {
            title: '利息损失',
            align:"center",
            dataIndex: 'interestlosingSum'
           },
		   {
            title: '征信提交次数',
            align:"center",
            dataIndex: 'isSubmit'
           },
		   {
            title: '五级分类损失金额',
            align:"center",
            dataIndex: 'loseSum'
           },
		   {
            title: '五级分类正常金额',
            align:"center",
            dataIndex: 'normalSum'
           },
		   {
            title: '部门号交易编号',
            align:"center",
            dataIndex: 'orgId'
           },
		   {
            title: '五级分类次级金额',
            align:"center",
            dataIndex: 'secondarySum'
           },
		   {
            title: '放款起始日期',
            align:"center",
            dataIndex: 'startDate'
           },
		   {
            title: '24个月还款状态',
            align:"center",
            dataIndex: 'stateOf24'
           },
		   {
            title: '借款人证件类型',
            align:"center",
            dataIndex: 'borrowerZjlx'
           },
		   {
            title: '借款人证件号码',
            align:"center",
            dataIndex: 'borrowerZjhm'
           },
		   {
            title: '合同编号',
            align:"center",
            dataIndex: 'contractId'
           },
		   {
            title: '利率类型',
            align:"center",
            dataIndex: 'intRateType'
           },
		   {
            title: '基准利率',
            align:"center",
            dataIndex: 'benchmarkRate'
           },
		   {
            title: '浮动利率',
            align:"center",
            dataIndex: 'floatingInt'
           },
		   {
            title: '逾期利率',
            align:"center",
            dataIndex: 'overdueInt'
           },
		   {
            title: '上次结息余额',
            align:"center",
            dataIndex: 'preIntsetlBal'
           },
		   {
            title: '实收本金',
            align:"center",
            dataIndex: 'totalOverAmt'
           },
		   {
            title: '实收利息',
            align:"center",
            dataIndex: 'totalOverIntr'
           },
		   {
            title: '实收罚息',
            align:"center",
            dataIndex: 'totalOverPnintr'
           },
		   {
            title: '实收复利',
            align:"center",
            dataIndex: 'totalOverReintr'
           },
		   {
            title: '应收本金',
            align:"center",
            dataIndex: 'receAmt'
           },
		   {
            title: '应收利息',
            align:"center",
            dataIndex: 'receIntr'
           },
		   {
            title: '应收罚息',
            align:"center",
            dataIndex: 'recePnintr'
           },
		   {
            title: '应收复利',
            align:"center",
            dataIndex: 'receReintr'
           },
		   {
            title: '核销本金',
            align:"center",
            dataIndex: 'disAmt'
           },
		   {
            title: '核销利息',
            align:"center",
            dataIndex: 'disIntr'
           },
		   {
            title: '核销罚息',
            align:"center",
            dataIndex: 'disPnintr'
           },
		   {
            title: '核销复利',
            align:"center",
            dataIndex: 'disReintr'
           },
		   {
            title: '分类时间',
            align:"center",
            dataIndex: 'fiveClassDate'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'appCurrency'
           },
		   {
            title: '展期日期',
            align:"center",
            dataIndex: 'extendDate'
           },
		   {
            title: '分类调整日期',
            align:"center",
            dataIndex: 'fiveAdjustDate'
           },
		   {
            title: '测算五级分类',
            align:"center",
            dataIndex: 'fiveTypeCalc'
           },
		   {
            title: '正常转关注',
            align:"center",
            dataIndex: 'normToConc'
           },
		   {
            title: '正常转次级',
            align:"center",
            dataIndex: 'normToSeco'
           },
		   {
            title: '正常转可疑',
            align:"center",
            dataIndex: 'normToSusp'
           },
		   {
            title: '正常转损失',
            align:"center",
            dataIndex: 'normToLose'
           },
		   {
            title: '关注转次级',
            align:"center",
            dataIndex: 'concToSeco'
           },
		   {
            title: '关注转可疑',
            align:"center",
            dataIndex: 'concToSusp'
           },
		   {
            title: '关注转损失',
            align:"center",
            dataIndex: 'concToLose'
           },
		   {
            title: '次级转可疑',
            align:"center",
            dataIndex: 'secoToSusp'
           },
		   {
            title: '次级转损失',
            align:"center",
            dataIndex: 'secoToLose'
           },
		   {
            title: '可疑转损失',
            align:"center",
            dataIndex: 'suspToLose'
           },
		   {
            title: '关注转正常',
            align:"center",
            dataIndex: 'concToNorm'
           },
		   {
            title: '次级转关注',
            align:"center",
            dataIndex: 'secoToConc'
           },
		   {
            title: '次级转正常',
            align:"center",
            dataIndex: 'secoToNorm'
           },
		   {
            title: '可疑转次级',
            align:"center",
            dataIndex: 'suspToSeco'
           },
		   {
            title: '可疑转关注',
            align:"center",
            dataIndex: 'suspToConc'
           },
		   {
            title: '可疑转正常',
            align:"center",
            dataIndex: 'suspToNorm'
           },
		   {
            title: '损失转可疑',
            align:"center",
            dataIndex: 'loseToSusp'
           },
		   {
            title: '损失转次级',
            align:"center",
            dataIndex: 'loseToSeco'
           },
		   {
            title: '损失转关注',
            align:"center",
            dataIndex: 'loseToConc'
           },
		   {
            title: '损失转正常',
            align:"center",
            dataIndex: 'loseToNorm'
           },
		   {
            title: '分类调整类型',
            align:"center",
            dataIndex: 'fiveAdjustType'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'fiveTypeManual'
           },
		   {
            title: '支付方式',
            align:"center",
            dataIndex: 'payMode'
           },
		   {
            title: '委托支付账号',
            align:"center",
            dataIndex: 'precPayAccount'
           },
		   {
            title: '总余额',
            align:"center",
            dataIndex: 'totleBalance'
           },
		   {
            title: '减值日期',
            align:"center",
            dataIndex: 'devalueDate'
           },
		   {
            title: '减值金额',
            align:"center",
            dataIndex: 'devalueSum'
           },
		   {
            title: '减值类型',
            align:"center",
            dataIndex: 'devalueType'
           },
		   {
            title: '减值模式',
            align:"center",
            dataIndex: 'devalueMode'
           },
		   {
            title: '是否减值',
            align:"center",
            dataIndex: 'isDevalue'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '贷款投向',
            align:"center",
            dataIndex: 'purposeType'
           },
		   {
            title: '贷款投向1',
            align:"center",
            dataIndex: 'purposeType1'
           },
		   {
            title: '贷款投向2',
            align:"center",
            dataIndex: 'purposeType2'
           },
		   {
            title: '贷款投向3',
            align:"center",
            dataIndex: 'purposeType3'
           },
		   {
            title: '贷款投向4',
            align:"center",
            dataIndex: 'purposeType4'
           },
		   {
            title: '贷款投向5',
            align:"center",
            dataIndex: 'purposeType5'
           },
		   {
            title: '贷款投向6',
            align:"center",
            dataIndex: 'purposeType6'
           },
		   {
            title: '贷款投向7',
            align:"center",
            dataIndex: 'purposeType7'
           },
		   {
            title: '贷款投向8',
            align:"center",
            dataIndex: 'purposeType8'
           },
		   {
            title: '是否政府投融资平台',
            align:"center",
            dataIndex: 'isGovInvest'
           },
		   {
            title: '政府投融资明细',
            align:"center",
            dataIndex: 'govInvestDetail'
           },
		   {
            title: '是否战略性新兴产业',
            align:"center",
            dataIndex: 'isTacticRising'
           },
		   {
            title: '战略性新兴产业明细',
            align:"center",
            dataIndex: 'tacticRisingDetail'
           },
		   {
            title: '固定资产类型',
            align:"center",
            dataIndex: 'fixedType'
           },
		   {
            title: '固定资产类型1',
            align:"center",
            dataIndex: 'fixedType1'
           },
		   {
            title: '固定资产类型2',
            align:"center",
            dataIndex: 'fixedType2'
           },
		   {
            title: '固定资产类型3',
            align:"center",
            dataIndex: 'fixedType3'
           },
		   {
            title: '固定资产类型4',
            align:"center",
            dataIndex: 'fixedType4'
           },
		   {
            title: '催收登记日期',
            align:"center",
            dataIndex: 'urgedSignDate'
           },
		   {
            title: '五级分类级别',
            align:"center",
            dataIndex: 'fiveClassLevel'
           },
		   {
            title: '代理机构号',
            align:"center",
            dataIndex: 'agentOrgId'
           },
		   {
            title: '福祥便民卡号',
            align:"center",
            dataIndex: 'cardNo'
           },
		   {
            title: '支付类型',
            align:"center",
            dataIndex: 'precPayType'
           },
		   {
            title: '委托支付人名称',
            align:"center",
            dataIndex: 'precPayName'
           },
		   {
            title: '委托支付行号',
            align:"center",
            dataIndex: 'precPayBankNo'
           },
		   {
            title: '委托支付行名',
            align:"center",
            dataIndex: 'precPayBankCn'
           },
		   {
            title: '产品大类',
            align:"center",
            dataIndex: 'productType'
           },
		   {
            title: '产品子类',
            align:"center",
            dataIndex: 'productSubType'
           },
		   {
            title: '本金逾期日期',
            align:"center",
            dataIndex: 'overdueDate'
           },
		   {
            title: '逾期次数',
            align:"center",
            dataIndex: 'dueCount'
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
		 /*  {
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
          list: "/dkywjjb/dkywjjb/list",
          delete: "/dkywjjb/dkywjjb/delete",
          deleteBatch: "/dkywjjb/dkywjjb/deleteBatch",
          exportXlsUrl: "dkywjjb/dkywjjb/exportXls",
          importExcelUrl: "dkywjjb/dkywjjb/importExcel",
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