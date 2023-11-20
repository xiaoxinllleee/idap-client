<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="放款人编号">
              <a-input placeholder="请输入放款人编号" v-model="queryParam.fkId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款帐号">
              <a-input placeholder="请输入贷款帐号" v-model="queryParam.loanAccount"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="利息比例">
              <a-input placeholder="请输入利息比例" v-model="queryParam.interestScal"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号">
              <a-input placeholder="请输入业务编号" v-model="queryParam.businessNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款类型">
              <a-input placeholder="请输入贷款类型" v-model="queryParam.businessType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="风险类型">
              <a-input placeholder="请输入风险类型" v-model="queryParam.businessType2"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('业务信息表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
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
        :scroll="{x:15430}"
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
    <ywxxb-modal ref="modalForm" @ok="modalFormOk"></ywxxb-modal>
  </a-card>
</template>

<script>
  import YwxxbModal from './modules/YwxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YwxxbList",
    mixins:[JeecgListMixin],
    components: {
      YwxxbModal
    },
    data () {
      return {
        description: '业务信息表管理页面',
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
		 /*  {
            title: 'dataFlag',
            align:"center",
            dataIndex: 'dataFlag'
           },*/
		   {
            title: '业务受理号',
            align:"center",
            dataIndex: 'busCreCode'
           },
		   {
            title: '使用授信协议号ID',
            align:"center",
            dataIndex: 'creditAggreementId'
           },
		   {
            title: '授信序号',
            align:"center",
            dataIndex: 'creditDetailId'
           },
		   {
            title: '前台客户号',
            align:"center",
            dataIndex: 'custFrontCode'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '债务重组次数',
            align:"center",
            dataIndex: 'drTimes'
           },
		   {
            title: '展期时间',
            align:"center",
            dataIndex: 'extendTimes'
           },
		   {
            title: '逾期罚息利率',
            align:"center",
            dataIndex: 'fineRate'
           },
		   {
            title: '罚息利率类型',
            align:"center",
            dataIndex: 'fineRateType'
           },
		   {
            title: '首次还款日期',
            align:"center",
            dataIndex: 'firstReturnDate'
           },
		   {
            title: '放款人编号',
            align:"center",
            dataIndex: 'fkId'
           },
		   {
            title: '展期后总期限',
            align:"center",
            dataIndex: 'golnTimes'
           },
		   {
            title: '公证书编号',
            align:"center",
            dataIndex: 'guarantyNdNo'
           },
		   {
            title: '原借款利率',
            align:"center",
            dataIndex: 'guarantyRate'
           },
		   {
            title: '担保总价值',
            align:"center",
            dataIndex: 'guarantyValue'
           },
		   {
            title: '输入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '付息方式,计息方式',
            align:"center",
            dataIndex: 'interestPayMethod'
           },
		   {
            title: '利息比例',
            align:"center",
            dataIndex: 'interestScal'
           },
		   {
            title: '是否启用授信',
            align:"center",
            dataIndex: 'isCredit'
           },
		   {
            title: '借新还旧次数',
            align:"center",
            dataIndex: 'lngoTimes'
           },
		   {
            title: '贷款帐号',
            align:"center",
            dataIndex: 'loanAccount'
           },
		   {
            title: '贷款分类,贷款科目二,发生类型',
            align:"center",
            dataIndex: 'occurType'
           },
		   {
            title: '录入机构',
            align:"center",
            dataIndex: 'orgId'
           },
		   {
            title: '原借款种类',
            align:"center",
            dataIndex: 'ourRole'
           },
		   {
            title: '还款资金来源,签约还款来源',
            align:"center",
            dataIndex: 'paySource'
           },
		   {
            title: '归还比例',
            align:"center",
            dataIndex: 'paymentScal'
           },
		   {
            title: '货币交易合同编号,其他相关协议,原借款合同号',
            align:"center",
            dataIndex: 'relativeAgreement'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '有无追索权',
            align:"center",
            dataIndex: 'reversibility'
           },
		   {
            title: '综合风险度',
            align:"center",
            dataIndex: 'riskRate'
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
            title: '更改日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '操作员编号',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '保证金方式',
            align:"center",
            dataIndex: 'vouchClass'
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
            title: 'WARRANTOR_ID',
            align:"center",
            dataIndex: 'warrantorId'
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
            title: '付息账号',
            align:"center",
            dataIndex: 'jbckzh'
           },
		   {
            title: '合同类型',
            align:"center",
            dataIndex: 'contractType'
           },
		   {
            title: '贷款投向',
            align:"center",
            dataIndex: 'industryType'
           },
		   {
            title: '联络员',
            align:"center",
            dataIndex: 'contactUserId'
           },
		   {
            title: '包收责任人',
            align:"center",
            dataIndex: 'assureUserId'
           },
		   {
            title: '相片路径',
            align:"center",
            dataIndex: 'photo'
           },
		   {
            title: '前台结算帐号',
            align:"center",
            dataIndex: 'accountNo'
           },
		   {
            title: '保证金币种',
            align:"center",
            dataIndex: 'appBailCurrecny'
           },
		   {
            title: '利率执行方式',
            align:"center",
            dataIndex: 'appRateExecType'
           },
		   {
            title: '申请书号',
            align:"center",
            dataIndex: 'applicantId'
           },
		   {
            title: '承兑申请人姓名,申请人,申请人姓名,申请展期人',
            align:"center",
            dataIndex: 'applicantName'
           },
		   {
            title: '保证金比例,利息收入',
            align:"center",
            dataIndex: 'applyBailRatio'
           },
		   {
            title: '保证金金额,欠息金额,实付金额',
            align:"center",
            dataIndex: 'applyBailSum'
           },
		   {
            title: '申请币种',
            align:"center",
            dataIndex: 'applyCurrency'
           },
		   {
            title: '签定货币交易合同日期,申请日期',
            align:"center",
            dataIndex: 'applyDate'
           },
		   {
            title: '申请浮动方式, 申请利率浮动方式',
            align:"center",
            dataIndex: 'applyFloatType'
           },
		   {
            title: '还款宽限期,原借款期限,张数',
            align:"center",
            dataIndex: 'applyGp'
           },
		   {
            title: '原担保方式,支付方式',
            align:"center",
            dataIndex: 'applyMfeePayMethod'
           },
		   {
            title: '管理费比例,实付金额',
            align:"center",
            dataIndex: 'applyMfeeRatio'
           },
		   {
            title: '本次偿还金额,管理费金额,票面金额',
            align:"center",
            dataIndex: 'applyMfeeSum'
           },
		   {
            title: '还款周期',
            align:"center",
            dataIndex: 'applyPayCyc'
           },
		   {
            title: '还款期次,张数',
            align:"center",
            dataIndex: 'applyPayTimes'
           },
		   {
            title: '支付方式',
            align:"center",
            dataIndex: 'applyPdgPayMethod'
           },
		   {
            title: '票面金额,手续费比例',
            align:"center",
            dataIndex: 'applyPdgRatio'
           },
		   {
            title: '利息收入,手续费金额',
            align:"center",
            dataIndex: 'applyPdgSum'
           },
		   {
            title: '张数',
            align:"center",
            dataIndex: 'applyProp'
           },
		   {
            title: '申请贷款用途',
            align:"center",
            dataIndex: 'applyPurpose'
           },
		   {
            title: '申请执行利率,实付金额',
            align:"center",
            dataIndex: 'applyRate'
           },
		   {
            title: '申请浮动比例, 申请浮动比率, 申请利息收入',
            align:"center",
            dataIndex: 'applyRateFloat'
           },
		   {
            title: '申请利率类型',
            align:"center",
            dataIndex: 'applyRateType'
           },
		   {
            title: '票面金额,申请承兑汇票金额,申请金额,申请贴现金额',
            align:"center",
            dataIndex: 'applySum'
           },
		   {
            title: '汇票张数,申请期限',
            align:"center",
            dataIndex: 'applyTerm'
           },
		   {
            title: '申请期限日',
            align:"center",
            dataIndex: 'applyTermDay'
           },
		   {
            title: '申请期限月',
            align:"center",
            dataIndex: 'applyTermMonth'
           },
		   {
            title: '申请期限年',
            align:"center",
            dataIndex: 'applyTermYear'
           },
		   {
            title: '保证金支付帐号,支付帐号',
            align:"center",
            dataIndex: 'bailAccount'
           },
		   {
            title: '基期信用等级',
            align:"center",
            dataIndex: 'baseEvaluateResult'
           },
		   {
            title: '业务属性',
            align:"center",
            dataIndex: 'businessAttribute1'
           },
		   {
            title: '业务属性',
            align:"center",
            dataIndex: 'businessAttribute2'
           },
		   {
            title: '业务属性',
            align:"center",
            dataIndex: 'businessAttribute3'
           },
		   {
            title: '业务属性',
            align:"center",
            dataIndex: 'businessAttribute4'
           },
		   {
            title: '业务流程,适用的流程',
            align:"center",
            dataIndex: 'businessFlow'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'businessNo'
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
            title: '贷款科目一,贷款性质,业务分类,业务品种',
            align:"center",
            dataIndex: 'businessSubType'
           },
		   {
            title: '贷款类型',
            align:"center",
            dataIndex: 'businessType'
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
            title: '还本方式,还款方式',
            align:"center",
            dataIndex: 'corpusPayMethod'
           },
		   {
            title: '联机交易号',
            align:"center",
            dataIndex: 'sid'
           },
		   {
            title: '利率类型',
            align:"center",
            dataIndex: 'rateType'
           },
		   {
            title: '产品代码',
            align:"center",
            dataIndex: 'productType'
           },
		   {
            title: '还款周期类型',
            align:"center",
            dataIndex: 'repyCycTp'
           },
		   {
            title: '还款方式类型',
            align:"center",
            dataIndex: 'repyMthTp'
           },
		   {
            title: '浮动利率生效类型',
            align:"center",
            dataIndex: 'fltRateEffTp'
           },
		   {
            title: '自动扣款类型',
            align:"center",
            dataIndex: 'atmDdtTp'
           },
		   {
            title: '足额扣款类型',
            align:"center",
            dataIndex: 'fullDdtTp'
           },
		   {
            title: '提前还款后的重算方式',
            align:"center",
            dataIndex: 'advRepyAfRtrMth'
           },
		   {
            title: '首次还款日标识',
            align:"center",
            dataIndex: 'frstRepyDtTp'
           },
		   {
            title: '委托资金协议号',
            align:"center",
            dataIndex: 'entrstFndAgrmtNo'
           },
		   {
            title: '浮动周期',
            align:"center",
            dataIndex: 'fltCycTp'
           },
		   {
            title: '浮动周期基数',
            align:"center",
            dataIndex: 'fltCycBscTp'
           },
		   {
            title: '首次浮动日',
            align:"center",
            dataIndex: 'rateFrstFltDt'
           },
		   {
            title: '开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人编号',
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
            title: 'lprFlag',
            align:"center",
            dataIndex: 'lprFlag'
           },
		   {
            title: 'lprRateId',
            align:"center",
            dataIndex: 'lprRateId'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ywxxb/ywxxb/list",
          delete: "/ywxxb/ywxxb/delete",
          deleteBatch: "/ywxxb/ywxxb/deleteBatch",
          exportXlsUrl: "ywxxb/ywxxb/exportXls",
          importExcelUrl: "ywxxb/ywxxb/importExcel",
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