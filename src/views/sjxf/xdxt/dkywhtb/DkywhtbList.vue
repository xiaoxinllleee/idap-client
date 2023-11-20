<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号">
              <a-input placeholder="请输入业务编号" v-model="queryParam.businessNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同编号">
              <a-input placeholder="请输入合同编号" v-model="queryParam.contractNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="放款日期">
              <a-range-picker @change="onChangefkrq" v-model="queryParam.appPutOutDate" :format="dateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日期">
              <a-range-picker @change="onChangedqrq" v-model="queryParam.appMaturityDate" :format="dateFormat2"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款业务合同表')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

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
    <dkywhtb-modal ref="modalForm" @ok="modalFormOk"></dkywhtb-modal>
  </a-card>
</template>

<script>
  import DkywhtbModal from './modules/DkywhtbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from '@/utils/util'

  export default {
    name: "DkywhtbList",
    mixins:[JeecgListMixin],
    components: {
      DkywhtbModal
    },
    data () {
      return {
        description: '贷款业务合同表管理页面',
        // 表头
        dateFormat:'YYYYMMDD',
        dateFormat2:'YYYYMMDD',
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
            title: '批准期限日',
            align:"center",
            dataIndex: 'appTermDay'
           },
		   {
            title: '基准利率,基准利率类型',
            align:"center",
            dataIndex: 'appRateType'
           },
		   {
            title: '浮动方式',
            align:"center",
            dataIndex: 'appFloatType'
           },
		   {
            title: '浮动比率,利息收入',
            align:"center",
            dataIndex: 'appRateFloat'
           },
		   {
            title: '基准利率,利率,批准利率,签约利率,原借款利率',
            align:"center",
            dataIndex: 'appRate'
           },
		   {
            title: '比例,票面金额',
            align:"center",
            dataIndex: 'appPdgRatio'
           },
		   {
            title: '金额,利息收入',
            align:"center",
            dataIndex: 'appPdgSum'
           },
		   {
            title: '支付方式',
            align:"center",
            dataIndex: 'appPdgPayMethod'
           },
		   {
            title: '比例,实付金额',
            align:"center",
            dataIndex: 'appMfeeRatio'
           },
		   {
            title: '票面金额',
            align:"center",
            dataIndex: 'appMfeeSum'
           },
		   {
            title: '支付方式',
            align:"center",
            dataIndex: 'appMfeePayMethod'
           },
		   {
            title: '保证金比例,利息收入',
            align:"center",
            dataIndex: 'appBailRatio'
           },
		   {
            title: '保证金金额,实付金额',
            align:"center",
            dataIndex: 'appBailSum'
           },
		   {
            title: '还款宽限期,张数',
            align:"center",
            dataIndex: 'appGp'
           },
		   {
            title: '还款期次,张数',
            align:"center",
            dataIndex: 'appPayTimes'
           },
		   {
            title: '还款周期',
            align:"center",
            dataIndex: 'appPayCyc'
           },
		   {
            title: '罚息利率类型',
            align:"center",
            dataIndex: 'fineRateType'
           },
		   {
            title: '逾期罚息利率',
            align:"center",
            dataIndex: 'fineRate'
           },
		   {
            title: '签约借款用途(66*3)',
            align:"center",
            dataIndex: 'actualPurpose'
           },
		   {
            title: '还款资金来源,签约还款来源',
            align:"center",
            dataIndex: 'paySource'
           },
		   {
            title: '还本方式,还款方式',
            align:"center",
            dataIndex: 'corpusPayMethod'
           },
		   {
            title: '付息方式,计息方式',
            align:"center",
            dataIndex: 'interestPayMethod'
           },
		   {
            title: '使用授信协议号ID',
            align:"center",
            dataIndex: 'creditAggreementId'
           },
		   {
            title: '货币交易合同编号,其他相关协议,原借款合同号',
            align:"center",
            dataIndex: 'relativeAgreement'
           },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'signDate'
           },
		   {
            title: '合同编号,协议编号,原借款合同号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '约定发放日',
            align:"center",
            dataIndex: 'contractPutOutDate'
           },
		   {
            title: '约定到期日',
            align:"center",
            dataIndex: 'contractMaturity'
           },
		   {
            title: '涉及第三方',
            align:"center",
            dataIndex: 'thirdParty'
           },
		   {
            title: '第三方法人代码',
            align:"center",
            dataIndex: 'thirdPartyId'
           },
		   {
            title: '申请人涉及第三方所在地区和国家',
            align:"center",
            dataIndex: 'thirdPartyRegion'
           },
		   {
            title: '原借款金额',
            align:"center",
            dataIndex: 'totalSum'
           },
		   {
            title: '原借款种类',
            align:"center",
            dataIndex: 'ourRole'
           },
		   {
            title: '有无追索权',
            align:"center",
            dataIndex: 'reversibility'
           },
		   {
            title: '担保方式,原担保方式',
            align:"center",
            dataIndex: 'vouchType'
           },
		   {
            title: '担保方式2',
            align:"center",
            dataIndex: 'vouchType1'
           },
		   {
            title: '担保方式3',
            align:"center",
            dataIndex: 'vouchType2'
           },
		   {
            title: '保证金方式',
            align:"center",
            dataIndex: 'vouchClass'
           },
		   {
            title: '展期次数',
            align:"center",
            dataIndex: 'extendTimes'
           },
		   {
            title: '借新还旧次数',
            align:"center",
            dataIndex: 'lngoTimes'
           },
		   {
            title: '还旧借新次数',
            align:"center",
            dataIndex: 'golnTimes'
           },
		   {
            title: '债务重组次数',
            align:"center",
            dataIndex: 'drTimes'
           },
		   {
            title: '首次发放日',
            align:"center",
            dataIndex: 'firstPutOutDate'
           },
		   {
            title: '综合风险度',
            align:"center",
            dataIndex: 'riskRate'
           },
		   {
            title: '已出帐总金额',
            align:"center",
            dataIndex: 'putOutTotalSum'
           },
		   {
            title: '备用1',
            align:"center",
            dataIndex: 'describe1'
           },
		   {
            title: '借据号码(总部发的合同号)',
            align:"center",
            dataIndex: 'describe2'
           },
		   {
            title: '其他审批意见',
            align:"center",
            dataIndex: 'describe3'
           },
		   {
            title: '备用4',
            align:"center",
            dataIndex: 'describe4'
           },
		   {
            title: '备用5',
            align:"center",
            dataIndex: 'describe5'
           },
		   {
            title: '备用6',
            align:"center",
            dataIndex: 'describe6'
           },
		   {
            title: '逾期原因',
            align:"center",
            dataIndex: 'describe7'
           },
		   {
            title: '预计收回时间',
            align:"center",
            dataIndex: 'describe8'
           },
		   {
            title: '抵押质押金额和保证人明细',
            align:"center",
            dataIndex: 'describe9'
           },
		   {
            title: '抵押质押保证人明细',
            align:"center",
            dataIndex: 'describe10'
           },
		   {
            title: '录入机构',
            align:"center",
            dataIndex: 'orgId'
           },
		   {
            title: '录入操作员',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '输入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '更改日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '还款帐号,结算账号',
            align:"center",
            dataIndex: 'dealerAccount'
           },
		   {
            title: '罚息月利率',
            align:"center",
            dataIndex: 'punishMonthRate'
           },
		   {
            title: '钞汇标志',
            align:"center",
            dataIndex: 'bankFlag'
           },
		   {
            title: '放款日期',
            align:"center",
            dataIndex: 'appPutOutDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'appMaturityDate'
           },
		   {
            title: '是否启用授信',
            align:"center",
            dataIndex: 'isCredit'
           },
		   {
            title: '公证机构',
            align:"center",
            dataIndex: 'notaryOrg'
           },
		   {
            title: '公证人',
            align:"center",
            dataIndex: 'notary'
           },
		   {
            title: '公正日期',
            align:"center",
            dataIndex: 'notaryDate'
           },
		   {
            title: '是否公正',
            align:"center",
            dataIndex: 'isNotary'
           },
		   {
            title: '是否同时公正',
            align:"center",
            dataIndex: 'isTheSameNotary'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'balance'
           },
		   {
            title: '授信序号',
            align:"center",
            dataIndex: 'creditDetailId'
           },
		   {
            title: '是否利率定价',
            align:"center",
            dataIndex: 'appRateExecType'
           },
		   {
            title: '保证金币种',
            align:"center",
            dataIndex: 'appBailCurrecny'
           },
		   {
            title: '贷款方式',
            align:"center",
            dataIndex: 'loanMode'
           },
		   {
            title: '是否使用贷款证',
            align:"center",
            dataIndex: 'isUseLoanCard'
           },
		   {
            title: '是否财政贴息',
            align:"center",
            dataIndex: 'isFinanceIntBal'
           },
		   {
            title: '贷款投向',
            align:"center",
            dataIndex: 'industryType'
           },
		   {
            title: '人行标准',
            align:"center",
            dataIndex: 'pbcStandard'
           },
		   {
            title: '本行标准',
            align:"center",
            dataIndex: 'selfStandard'
           },
		   {
            title: '合同类型, 授信方式',
            align:"center",
            dataIndex: 'contractType'
           },
		   {
            title: '逾期罚息比例',
            align:"center",
            dataIndex: 'fineRatio'
           },
		   {
            title: '挤占拥用罚息比例',
            align:"center",
            dataIndex: 'apprFineRatio'
           },
		   {
            title: '放贷人编号',
            align:"center",
            dataIndex: 'fkId'
           },
		   {
            title: '征信业务种类',
            align:"center",
            dataIndex: 'businessKind'
           },
		   {
            title: '贷款形式',
            align:"center",
            dataIndex: 'businessType3'
           },
		   {
            title: '借款人存款账号',
            align:"center",
            dataIndex: 'jbckzh'
           },
		   {
            title: '包收责任人',
            align:"center",
            dataIndex: 'assureUserId'
           },
		   {
            title: '审查责任人',
            align:"center",
            dataIndex: 'censorUserId'
           },
		   {
            title: '审批责任人',
            align:"center",
            dataIndex: 'examApprUserId'
           },
		   {
            title: '管理责任人',
            align:"center",
            dataIndex: 'managerUserId'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: '贷款类型',
            align:"center",
            dataIndex: 'businessType'
           },
		   {
            title: '贷款科目一,贷款性质,业务分类,业务品种',
            align:"center",
            dataIndex: 'businessSubType'
           },
		   {
            title: '贷款分类,贷款科目二,发生类型',
            align:"center",
            dataIndex: 'occurType'
           },
		   {
            title: '业务流程,适用的流程',
            align:"center",
            dataIndex: 'businessFlow'
           },
		   {
            title: '业务阶段',
            align:"center",
            dataIndex: 'businessPhase'
           },
		   {
            title: '业务形态',
            align:"center",
            dataIndex: 'businessStatus'
           },
		   {
            title: '业务分类',
            align:"center",
            dataIndex: 'businessType1'
           },
		   {
            title: '风险类型',
            align:"center",
            dataIndex: 'businessType2'
           },
		   {
            title: '业务属性1',
            align:"center",
            dataIndex: 'businessAttribute1'
           },
		   {
            title: '业务属性2',
            align:"center",
            dataIndex: 'businessAttribute2'
           },
		   {
            title: '业务属性3',
            align:"center",
            dataIndex: 'businessAttribute3'
           },
		   {
            title: '业务属性4',
            align:"center",
            dataIndex: 'businessAttribute4'
           },
		   {
            title: '承兑申请人姓名',
            align:"center",
            dataIndex: 'applicantName'
           },
		   {
            title: '用款计划',
            align:"center",
            dataIndex: 'planAllocation'
           },
		   {
            title: '实际用款情况',
            align:"center",
            dataIndex: 'actualAllocation'
           },
		   {
            title: '汇票期限,批准期限,签约期限,申请借新还旧期限,原借款(期限)',
            align:"center",
            dataIndex: 'appTerm'
           },
		   {
            title: '批准日期',
            align:"center",
            dataIndex: 'appDate'
           },
		   {
            title: '汇票币种,批准币种,签约币种',
            align:"center",
            dataIndex: 'appCurrency'
           },
		   {
            title: '金额(汇票,借款,批准保函,批准,票面,签约,申请,原借款)',
            align:"center",
            dataIndex: 'appSum'
           },
		   {
            title: '张数',
            align:"center",
            dataIndex: 'appProp'
           },
		   {
            title: '批准期限年',
            align:"center",
            dataIndex: 'appTermYear'
           },
		   {
            title: '批准期限月',
            align:"center",
            dataIndex: 'appTermMonth'
           },
		   {
            title: '贴息类型',
            align:"center",
            dataIndex: 'businessOther1'
           },
		   {
            title: '合同打印类型',
            align:"center",
            dataIndex: 'businessOther2'
           },
		   {
            title: '贷款其他属性3',
            align:"center",
            dataIndex: 'businessOther3'
           },
		   {
            title: '贷款其他属性4',
            align:"center",
            dataIndex: 'businessOther4'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },

		  /* {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },*/
          {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'edate'
          },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		/*   {
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
          list: "/dkywhtb/dkywhtb/list",
          delete: "/dkywhtb/dkywhtb/delete",
          deleteBatch: "/dkywhtb/dkywhtb/deleteBatch",
          exportXlsUrl: "dkywhtb/dkywhtb/exportXls",
          importExcelUrl: "dkywhtb/dkywhtb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.appPutOutDate;
        delete param.appMaturityDate;
        return filterObj(param);
      },
      onChangefkrq(value,dateString){
        let appPutOutDateString = dateString
        this.queryParam.appPutOutDate_begin = appPutOutDateString[0]
        this.queryParam.appPutOutDate_end = appPutOutDateString[1]
      },
      onChangedqrq(value,dateString){
        let appMaturityDateString = dateString
        this.queryParam.appMaturityDate_begin = appMaturityDateString[0]
        this.queryParam.appMaturityDate_end = appMaturityDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>