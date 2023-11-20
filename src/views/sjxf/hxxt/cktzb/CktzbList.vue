<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主键">
              <a-input placeholder="请输入主键" v-model="queryParam.key1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="当日总存现金额">
<!--              <a-input placeholder="请输入当日总存现金额" v-model="queryParam.todCdepTotAmt"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.todCdepTotAmt_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.todCdepTotAmt_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="当日总取现金额">
<!--              <a-input placeholder="请输入当日总取现金额" v-model="queryParam.todCwdlTotAmt"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.todCwdlTotAmt_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.todCwdlTotAmt_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户关联存折状态">
              <a-input placeholder="请输入账户关联存折状态" v-model="queryParam.pbStatus"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行存折版本号">
              <a-input placeholder="请输入银行存折版本号" v-model="queryParam.pbVerNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存折号">
              <a-input placeholder="请输入存折号" v-model="queryParam.pbNumber"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户发起人">
              <a-input placeholder="请输入账户发起人" v-model="queryParam.actPromoter"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款拓展表')">导出</a-button>
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
    <cktzb-modal ref="modalForm" @ok="modalFormOk"></cktzb-modal>
  </a-card>
</template>

<script>
  import CktzbModal from './modules/CktzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CktzbList",
    mixins:[JeecgListMixin],
    components: {
      CktzbModal
    },
    data () {
      return {
        description: '存款拓展表管理页面',
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
            title: '主键',
            align:"center",
            dataIndex: 'key1'
           },
		   {
            title: '当日总存现金额',
            align:"center",
            dataIndex: 'todCdepTotAmt'
           },
		   {
            title: '当日总取现金额',
            align:"center",
            dataIndex: 'todCwdlTotAmt'
           },
		   {
            title: '通提密码标示',
            align:"center",
            dataIndex: 'allBrInd'
           },
		   {
            title: '通提密码',
            align:"center",
            dataIndex: 'allBrPwd'
           },
		   {
            title: '通提密码尝试次数',
            align:"center",
            dataIndex: 'allBrPswdCtr'
           },
		   {
            title: '账户关联存折状态',
            align:"center",
            dataIndex: 'pbStatus'
           },
		   {
            title: '印鉴挂失状态',
            align:"center",
            dataIndex: 'chopStatus'
           },
		   {
            title: '记录现金/转账的最新的业务日期',
            align:"center",
            dataIndex: 'cshBusDate'
           },
		   {
            title: 'CR_TIER_IND',
            align:"center",
            dataIndex: 'crTierInd'
           },
		   {
            title: '拒付支票次数',
            align:"center",
            dataIndex: 'chkDishonorCnt'
           },
		   {
            title: '取消支票次数',
            align:"center",
            dataIndex: 'cancellChkCnt'
           },
		   {
            title: '银行存折版本号',
            align:"center",
            dataIndex: 'pbVerNo'
           },
		   {
            title: 'CHASE_FLAG',
            align:"center",
            dataIndex: 'chaseFlag'
           },
		   {
            title: '台湾新光人寿保险单号码',
            align:"center",
            dataIndex: 'skliPoid'
           },
		   {
            title: '定期账户账户层透支百分比率',
            align:"center",
            dataIndex: 'tdOdCollPct'
           },
		   {
            title: '定期账户账户层定义,透支的借记利率加减点',
            align:"center",
            dataIndex: 'tdOdMrglRte'
           },
		   {
            title: '定期账户金额冻结原因',
            align:"center",
            dataIndex: 'tdHoldOption'
           },
		   {
            title: '定期账户金额冻结原因',
            align:"center",
            dataIndex: 'tdHoldReason'
           },
		   {
            title: '支票签约类型',
            align:"center",
            dataIndex: 'chkAgrmntType'
           },
		   {
            title: '支票签约日期',
            align:"center",
            dataIndex: 'signoffDate'
           },
		   {
            title: '即交互式语音应答访问标示',
            align:"center",
            dataIndex: 'ivrAccessGrnt'
           },
		   {
            title: '手机银行访问标示',
            align:"center",
            dataIndex: 'mbAccessGrnt'
           },
		   {
            title: '网银访问准许标示',
            align:"center",
            dataIndex: 'ibAccessGrnt'
           },
		   {
            title: '定期账户财务产品码',
            align:"center",
            dataIndex: 'complexTd'
           },
		   {
            title: 'ATM账户突出标志',
            align:"center",
            dataIndex: 'embossFlag'
           },
		   {
            title: '文件上传通知标志',
            align:"center",
            dataIndex: 'clctUploadNtc'
           },
		   {
            title: '文件下载关闭标志',
            align:"center",
            dataIndex: 'clctDownloadCls'
           },
		   {
            title: '支票黑名单日期',
            align:"center",
            dataIndex: 'blacklistDate'
           },
		   {
            title: 'ATM卡状态',
            align:"center",
            dataIndex: 'atmCardStatus'
           },
		   {
            title: '变更开户行后新的分行号',
            align:"center",
            dataIndex: 'newBranchNo'
           },
		   {
            title: '抵消账户指示',
            align:"center",
            dataIndex: 'offsetAcctInd'
           },
		   {
            title: '补登最后打印的rec-no',
            align:"center",
            dataIndex: 'lastPrintRecno'
           },
		   {
            title: '最新维护日期',
            align:"center",
            dataIndex: 'lastHousekeepDt'
           },
		   {
            title: 'Nostro BGL账户',
            align:"center",
            dataIndex: 'nostroBglAct'
           },
		   {
            title: '存折号',
            align:"center",
            dataIndex: 'pbNumber'
           },
		   {
            title: '存折已打印的行数（活期使用）',
            align:"center",
            dataIndex: 'pbLineNo'
           },
		   {
            title: 'ABANDON_OFFSET_FL',
            align:"center",
            dataIndex: 'abandonOffsetFl'
           },
		   {
            title: 'TERM_LST_DEDUCTDT',
            align:"center",
            dataIndex: 'termLstDeductdt'
           },
		   {
            title: '这个字段记录2009交易成功的最新日期',
            align:"center",
            dataIndex: 'deductSuccDate'
           },
		   {
            title: '这个字段记录2009交易成功转账的次数',
            align:"center",
            dataIndex: 'termDeductCnt'
           },
		   {
            title: '这个字段记录2009交易失败的次数',
            align:"center",
            dataIndex: 'deductFailCnt'
           },
		   {
            title: 'FUND_TYPE',
            align:"center",
            dataIndex: 'fundType'
           },
		   {
            title: '帐户开户类型',
            align:"center",
            dataIndex: 'actOpenType'
           },
		   {
            title: '证明验证人员证件类型',
            align:"center",
            dataIndex: 'cvoIdType'
           },
		   {
            title: '证明验证人员证件号码',
            align:"center",
            dataIndex: 'cvoIdNo'
           },
		   {
            title: '账户发起人',
            align:"center",
            dataIndex: 'actPromoter'
           },
		   {
            title: 'ACT_PROMOTER_SGMT',
            align:"center",
            dataIndex: 'actPromoterSgmt'
           },
		   {
            title: '账户利润代码',
            align:"center",
            dataIndex: 'actProfitCode'
           },
		   {
            title: '2009交易转账金额',
            align:"center",
            dataIndex: 'tdInstAmt'
           },
		   {
            title: 'Purchase reference',
            align:"center",
            dataIndex: 'complexPurchRef'
           },
		   {
            title: '每日提转入款总额',
            align:"center",
            dataIndex: 'tdyTrnsInTot'
           },
		   {
            title: '每日提转出款总额',
            align:"center",
            dataIndex: 'tdyTrnsOutTot'
           },
		   {
            title: '透支应付利息',
            align:"center",
            dataIndex: 'odIntDue'
           },
		   {
            title: '超出透支应付利息',
            align:"center",
            dataIndex: 'odExcessIntDue'
           },
		   {
            title: 'swindleStat',
            align:"center",
            dataIndex: 'swindleStat'
           },
		   {
            title: 'srcOfFundCode',
            align:"center",
            dataIndex: 'srcOfFundCode'
           },
		   {
            title: '欠款原因代码',
            align:"center",
            dataIndex: 'arrReasonCode'
           },
		   {
            title: 'discReasonCode',
            align:"center",
            dataIndex: 'discReasonCode'
           },
		   {
            title: '重空类型',
            align:"center",
            dataIndex: 'voucherType'
           },
		   {
            title: '重空号码',
            align:"center",
            dataIndex: 'voucherNo'
           },
		   {
            title: '存折册号',
            align:"center",
            dataIndex: 'pbVolumeNo'
           },
		   {
            title: '存折序号',
            align:"center",
            dataIndex: 'pbSequenceNo'
           },
		   {
            title: '资金来源账户',
            align:"center",
            dataIndex: 'tdFundFromAc'
           },
		   {
            title: '外币代码',
            align:"center",
            dataIndex: 'fcyCode'
           },
		   {
            title: '结算账户标示',
            align:"center",
            dataIndex: 'acctInd'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'address'
           },
		   {
            title: '电话号码1',
            align:"center",
            dataIndex: 'tel1'
           },
		   {
            title: '电话号码2',
            align:"center",
            dataIndex: 'tel2'
           },
		   {
            title: '联系人姓名',
            align:"center",
            dataIndex: 'contactName'
           },
		   {
            title: '邮政编码',
            align:"center",
            dataIndex: 'postCode'
           },
		   {
            title: '合同编号',
            align:"center",
            dataIndex: 'contractNum'
           },
		   {
            title: '对账协议编号',
            align:"center",
            dataIndex: 'statAgrtNum'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'institution'
           },
		   {
            title: '账户管理协议编号',
            align:"center",
            dataIndex: 'actMangtAgrtNum'
           },
		   {
            title: '收支范围',
            align:"center",
            dataIndex: 'inOutScope'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '账户用法',
            align:"center",
            dataIndex: 'acctUsage'
           },
		   {
            title: '取现有效期',
            align:"center",
            dataIndex: 'cshWdlEndDate'
           },
		   {
            title: '累计取现限额',
            align:"center",
            dataIndex: 'totCshWdlLmt'
           },
		   {
            title: '业务种类',
            align:"center",
            dataIndex: 'busiType'
           },
		   {
            title: '商业号',
            align:"center",
            dataIndex: 'busiNum'
           },
		   {
            title: '申报标识',
            align:"center",
            dataIndex: 'declareInd'
           },
		   {
            title: '开户核准件编号',
            align:"center",
            dataIndex: 'apprNum'
           },
		   {
            title: '外币账户属性',
            align:"center",
            dataIndex: 'fxAcctAttr'
           },
		   {
            title: '外汇限额编号',
            align:"center",
            dataIndex: 'fxAmtLmtCode'
           },
		   {
            title: '外汇额度超限标识',
            align:"center",
            dataIndex: 'fxExcdInd'
           },
		   {
            title: '大额存款签定日期',
            align:"center",
            dataIndex: 'amtAcctDepDate'
           },
		   {
            title: '大额存款期限',
            align:"center",
            dataIndex: 'amtAcctEndDate'
           },
		   {
            title: '贷款帐号',
            align:"center",
            dataIndex: 'loadAcct'
           },
		   {
            title: '正对单周期',
            align:"center",
            dataIndex: 'positivePeriod'
           },
		   {
            title: '正对单打印循环',
            align:"center",
            dataIndex: 'positiveCircular'
           },
		   {
            title: '正对单打印日',
            align:"center",
            dataIndex: 'positiveDay'
           },
		   {
            title: '正对单份数',
            align:"center",
            dataIndex: 'positiveCopyNum'
           },
		   {
            title: '是否发送正对单标示',
            align:"center",
            dataIndex: 'positiveMailInd'
           },
		   {
            title: '可付利息',
            align:"center",
            dataIndex: 'intPayable'
           },
		   {
            title: '人民币结算账户属性',
            align:"center",
            dataIndex: 'lcySetlAcctAttr'
           },
		   {
            title: '取息频率',
            align:"center",
            dataIndex: 'whdIntFreq'
           },
		   {
            title: '实存次数',
            align:"center",
            dataIndex: 'realDepCnt'
           },
		   {
            title: '首次存入金额',
            align:"center",
            dataIndex: 'firstDepAmt'
           },
		   {
            title: '是否违约标示',
            align:"center",
            dataIndex: 'breakRuleInd'
           },
		   {
            title: '结息周期内的利息金额',
            align:"center",
            dataIndex: 'intForIntDep'
           },
		   {
            title: '账户最新财务交易日期',
            align:"center",
            dataIndex: 'lstNorTxnDt'
           },
		   {
            title: '止取数目',
            align:"center",
            dataIndex: 'noOfStopWdl'
           },
		   {
            title: '止存数目',
            align:"center",
            dataIndex: 'noOfStopDep'
           },
		   {
            title: '国债账户标示',
            align:"center",
            dataIndex: 'ngbAcctInd'
           },
		   {
            title: '国债预开户标示',
            align:"center",
            dataIndex: 'ngbPrevOpenInd'
           },
		   {
            title: '国债代码',
            align:"center",
            dataIndex: 'ngbCode'
           },
		   {
            title: '开户许可证编号',
            align:"center",
            dataIndex: 'acctOpenPemtNo'
           },
		   {
            title: '核准号',
            align:"center",
            dataIndex: 'aprlNo'
           },
		   {
            title: '人行核准日期',
            align:"center",
            dataIndex: 'aprlDate'
           },
		   {
            title: '账户启用日期',
            align:"center",
            dataIndex: 'acctEfctDate'
           },
		   {
            title: '账户层边际利率百分比',
            align:"center",
            dataIndex: 'acctPctMgnRate'
           },
		   {
            title: '部提次数',
            align:"center",
            dataIndex: 'partialWdlCnt'
           },
		   {
            title: '付息方式',
            align:"center",
            dataIndex: 'intPaid'
           },
		   {
            title: '协定金额',
            align:"center",
            dataIndex: 'contractAmt'
           },
		   {
            title: '协定金额',
            align:"center",
            dataIndex: 'payMethod'
           },
		   {
            title: '对公账户截止日期',
            align:"center",
            dataIndex: 'endDateCorpAcct'
           },
		   {
            title: '对公账户自动冻结到期日',
            align:"center",
            dataIndex: 'expDateAutoFrz'
           },
		   {
            title: '违约后存款日期',
            align:"center",
            dataIndex: 'depDateAfBreak'
           },
		   {
            title: '违约后总金额',
            align:"center",
            dataIndex: 'totAmtAfBreak'
           },
		   {
            title: '合同号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '部提金额',
            align:"center",
            dataIndex: 'partialWdlAmt'
           },
		   {
            title: '如无交易,是否发送印刷版对账单',
            align:"center",
            dataIndex: 'stateNoTxn'
           },
		   {
            title: '发送电子对账单标示',
            align:"center",
            dataIndex: 'statMailingInd'
           },
		   {
            title: '累计余额',
            align:"center",
            dataIndex: 'defaultBal'
           },
		   {
            title: '每日累计余额',
            align:"center",
            dataIndex: 'dailyAccuBal'
           },
		   {
            title: '累计天数',
            align:"center",
            dataIndex: 'daysAccum'
           },
		   {
            title: '可用利息',
            align:"center",
            dataIndex: 'contractIntAvab'
           },
		   {
            title: '利息增量',
            align:"center",
            dataIndex: 'contractIntIncr'
           },
		   {
            title: '延期储蓄利息',
            align:"center",
            dataIndex: 'delaySavingInt'
           },
		   {
            title: '主/子账户标示',
            align:"center",
            dataIndex: 'mcaInd'
           },
		   {
            title: '账户总支取金额',
            align:"center",
            dataIndex: 'totCshWdl'
           },
		   {
            title: '开户交易日',
            align:"center",
            dataIndex: 'acctOpenTrnDt'
           },
		   {
            title: '关闭激活原因',
            align:"center",
            dataIndex: 'closeActvReason'
           },
		   {
            title: '支票密码类型',
            align:"center",
            dataIndex: 'chqPasswrdType'
           },
		   {
            title: '临时户到期日',
            align:"center",
            dataIndex: 'tempAcctExpDt'
           },
		   {
            title: '年审日期',
            align:"center",
            dataIndex: 'annlReviewDate'
           },
		   {
            title: '冻结到期日',
            align:"center",
            dataIndex: 'freezeExpDate'
           },
		   {
            title: 'Third level accounting',
            align:"center",
            dataIndex: 'thrdLvlAccount'
           },
		   {
            title: 'Vostro账户最低利率',
            align:"center",
            dataIndex: 'cccdaVostroLow'
           },
		   {
            title: '外币项目（对公使用）',
            align:"center",
            dataIndex: 'fcyItem'
           },
		   {
            title: '外币种类',
            align:"center",
            dataIndex: 'fcyClass'
           },
		   {
            title: '外币范围',
            align:"center",
            dataIndex: 'fcyRange'
           },
		   {
            title: '取消需罚息金额部分的利息',
            align:"center",
            dataIndex: 'ntcCnclIntPen'
           },
		   {
            title: '阈值',
            align:"center",
            dataIndex: 'nrdaThresholdAmt'
           },
		   {
            title: '外币关户号',
            align:"center",
            dataIndex: 'fcyClosureNumber'
           },
		   {
            title: '零存整取标示',
            align:"center",
            dataIndex: 'noFailInstal'
           },
		   {
            title: '允许支取利息',
            align:"center",
            dataIndex: 'intAllowWithd'
           },
		   {
            title: '主账户标示',
            align:"center",
            dataIndex: 'primAcctFlag'
           },
		   {
            title: '存款重空日期',
            align:"center",
            dataIndex: 'firstDepIbdDt'
           },
		   {
            title: '页码',
            align:"center",
            dataIndex: 'pageNo'
           },
		   {
            title: '从1999-11-1至到期日利息税',
            align:"center",
            dataIndex: 'int1999ToTerm'
           },
		   {
            title: '上次使用的存折类型',
            align:"center",
            dataIndex: 'lastPbType'
           },
		   {
            title: '上次使用的存折号码',
            align:"center",
            dataIndex: 'lastPbNumber'
           },
		   {
            title: '费用累计标示',
            align:"center",
            dataIndex: 'chrAccuInd'
           },
		   {
            title: '零售贷款 -自助贷款',
            align:"center",
            dataIndex: 'selfServLoan'
           },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'isoAcctType'
           },
		   {
            title: '账户连接卡标示',
            align:"center",
            dataIndex: 'cardLinkFlag'
           },
		   {
            title: '账户原到期日',
            align:"center",
            dataIndex: 'orinMatDt'
           },
		   {
            title: '绿色账户标识',
            align:"center",
            dataIndex: 'greenAcctInd'
           },
		   {
            title: '绿色账户到期日',
            align:"center",
            dataIndex: 'greenExpiryDt'
           },
		   {
            title: '重空省代码（地区码）',
            align:"center",
            dataIndex: 'ibdProvinceCode'
           },
		   {
            title: '存折更新册号',
            align:"center",
            dataIndex: 'pbRenewVolume'
           },
		   {
            title: '取现有效期',
            align:"center",
            dataIndex: 'cashWdlExpDate'
           },
		   {
            title: '特殊转账限制标示',
            align:"center",
            dataIndex: 'tfrRestFlag'
           },
		   {
            title: '股金存折已打印行数',
            align:"center",
            dataIndex: 'pbDivLineNo'
           },
		   {
            title: 'maxFreezeSeqNo',
            align:"center",
            dataIndex: 'maxFreezeSeqNo'
           },
		   {
            title: '账户最近维护日期',
            align:"center",
            dataIndex: 'lastMaintDate'
           },
		   {
            title: '账户最近维护标识',
            align:"center",
            dataIndex: 'lastMaintStat'
           },
		   {
            title: 'sDate',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: 'eDate',
            align:"center",
            dataIndex: 'eDate'
           },
		   {
            title: 'dataDate',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: 'loadDate',
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
          list: "/cktzb/cktzb/list",
          delete: "/cktzb/cktzb/delete",
          deleteBatch: "/cktzb/cktzb/deleteBatch",
          exportXlsUrl: "cktzb/cktzb/exportXls",
          importExcelUrl: "cktzb/cktzb/importExcel",
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