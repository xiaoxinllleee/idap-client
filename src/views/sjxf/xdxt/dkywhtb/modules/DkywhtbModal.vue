<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="删除标志">
          <a-input placeholder="请输入删除标志" v-decorator="['dataFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批准期限日">
          <a-input placeholder="请输入批准期限日" v-decorator="['appTermDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基准利率,基准利率类型">
          <a-input placeholder="请输入基准利率,基准利率类型" v-decorator="['appRateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动方式">
          <a-input placeholder="请输入浮动方式" v-decorator="['appFloatType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动比率,利息收入">
          <a-input placeholder="请输入浮动比率,利息收入" v-decorator="['appRateFloat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基准利率,利率,批准利率,签约利率,原借款利率">
          <a-input placeholder="请输入基准利率,利率,批准利率,签约利率,原借款利率" v-decorator="['appRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="比例,票面金额">
          <a-input placeholder="请输入比例,票面金额" v-decorator="['appPdgRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="金额,利息收入">
          <a-input placeholder="请输入金额,利息收入" v-decorator="['appPdgSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方式">
          <a-input placeholder="请输入支付方式" v-decorator="['appPdgPayMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="比例,实付金额">
          <a-input placeholder="请输入比例,实付金额" v-decorator="['appMfeeRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票面金额">
          <a-input placeholder="请输入票面金额" v-decorator="['appMfeeSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方式">
          <a-input placeholder="请输入支付方式" v-decorator="['appMfeePayMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金比例,利息收入">
          <a-input placeholder="请输入保证金比例,利息收入" v-decorator="['appBailRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金金额,实付金额">
          <a-input placeholder="请输入保证金金额,实付金额" v-decorator="['appBailSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款宽限期,张数">
          <a-input placeholder="请输入还款宽限期,张数" v-decorator="['appGp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款期次,张数">
          <a-input placeholder="请输入还款期次,张数" v-decorator="['appPayTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款周期">
          <a-input placeholder="请输入还款周期" v-decorator="['appPayCyc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="罚息利率类型">
          <a-input placeholder="请输入罚息利率类型" v-decorator="['fineRateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期罚息利率">
          <a-input placeholder="请输入逾期罚息利率" v-decorator="['fineRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签约借款用途(66*3)">
          <a-input placeholder="请输入签约借款用途(66*3)" v-decorator="['actualPurpose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款资金来源,签约还款来源">
          <a-input placeholder="请输入还款资金来源,签约还款来源" v-decorator="['paySource', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还本方式,还款方式">
          <a-input placeholder="请输入还本方式,还款方式" v-decorator="['corpusPayMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付息方式,计息方式">
          <a-input placeholder="请输入付息方式,计息方式" v-decorator="['interestPayMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用授信协议号ID">
          <a-input placeholder="请输入使用授信协议号ID" v-decorator="['creditAggreementId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="货币交易合同编号,其他相关协议,原借款合同号">
          <a-input placeholder="请输入货币交易合同编号,其他相关协议,原借款合同号" v-decorator="['relativeAgreement', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签约日期">
          <a-input placeholder="请输入签约日期" v-decorator="['signDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同编号,协议编号,原借款合同号">
          <a-input placeholder="请输入合同编号,协议编号,原借款合同号" v-decorator="['contractNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="约定发放日">
          <a-input placeholder="请输入约定发放日" v-decorator="['contractPutOutDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="约定到期日">
          <a-input placeholder="请输入约定到期日" v-decorator="['contractMaturity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="涉及第三方">
          <a-input placeholder="请输入涉及第三方" v-decorator="['thirdParty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方法人代码">
          <a-input placeholder="请输入第三方法人代码" v-decorator="['thirdPartyId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人涉及第三方所在地区和国家">
          <a-input placeholder="请输入申请人涉及第三方所在地区和国家" v-decorator="['thirdPartyRegion', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原借款金额">
          <a-input placeholder="请输入原借款金额" v-decorator="['totalSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原借款种类">
          <a-input placeholder="请输入原借款种类" v-decorator="['ourRole', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有无追索权">
          <a-input placeholder="请输入有无追索权" v-decorator="['reversibility', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式,原担保方式">
          <a-input placeholder="请输入担保方式,原担保方式" v-decorator="['vouchType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式2">
          <a-input placeholder="请输入担保方式2" v-decorator="['vouchType1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式3">
          <a-input placeholder="请输入担保方式3" v-decorator="['vouchType2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金方式">
          <a-input placeholder="请输入保证金方式" v-decorator="['vouchClass', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期次数">
          <a-input placeholder="请输入展期次数" v-decorator="['extendTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借新还旧次数">
          <a-input placeholder="请输入借新还旧次数" v-decorator="['lngoTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还旧借新次数">
          <a-input placeholder="请输入还旧借新次数" v-decorator="['golnTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债务重组次数">
          <a-input placeholder="请输入债务重组次数" v-decorator="['drTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次发放日">
          <a-input placeholder="请输入首次发放日" v-decorator="['firstPutOutDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="综合风险度">
          <a-input placeholder="请输入综合风险度" v-decorator="['riskRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已出帐总金额">
          <a-input placeholder="请输入已出帐总金额" v-decorator="['putOutTotalSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备用1">
          <a-input placeholder="请输入备用1" v-decorator="['describe1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借据号码(总部发的合同号)">
          <a-input placeholder="请输入借据号码(总部发的合同号)" v-decorator="['describe2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他审批意见">
          <a-input placeholder="请输入其他审批意见" v-decorator="['describe3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备用4">
          <a-input placeholder="请输入备用4" v-decorator="['describe4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备用5">
          <a-input placeholder="请输入备用5" v-decorator="['describe5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备用6">
          <a-input placeholder="请输入备用6" v-decorator="['describe6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期原因">
          <a-input placeholder="请输入逾期原因" v-decorator="['describe7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预计收回时间">
          <a-input placeholder="请输入预计收回时间" v-decorator="['describe8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押质押金额和保证人明细">
          <a-input placeholder="请输入抵押质押金额和保证人明细" v-decorator="['describe9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押质押保证人明细">
          <a-input placeholder="请输入抵押质押保证人明细" v-decorator="['describe10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入机构">
          <a-input placeholder="请输入录入机构" v-decorator="['orgId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入操作员">
          <a-input placeholder="请输入录入操作员" v-decorator="['userId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="输入日期">
          <a-input placeholder="请输入输入日期" v-decorator="['inputDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="更改日期">
          <a-input placeholder="请输入更改日期" v-decorator="['updateDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户编号">
          <a-input placeholder="请输入客户编号" v-decorator="['custId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款帐号,结算账号">
          <a-input placeholder="请输入还款帐号,结算账号" v-decorator="['dealerAccount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="罚息月利率">
          <a-input placeholder="请输入罚息月利率" v-decorator="['punishMonthRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="钞汇标志">
          <a-input placeholder="请输入钞汇标志" v-decorator="['bankFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放款日期">
          <a-input placeholder="请输入放款日期" v-decorator="['appPutOutDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-input placeholder="请输入到期日期" v-decorator="['appMaturityDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用授信">
          <a-input placeholder="请输入是否启用授信" v-decorator="['isCredit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公证机构">
          <a-input placeholder="请输入公证机构" v-decorator="['notaryOrg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公证人">
          <a-input placeholder="请输入公证人" v-decorator="['notary', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公正日期">
          <a-input placeholder="请输入公正日期" v-decorator="['notaryDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否公正">
          <a-input placeholder="请输入是否公正" v-decorator="['isNotary', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否同时公正">
          <a-input placeholder="请输入是否同时公正" v-decorator="['isTheSameNotary', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['balance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信序号">
          <a-input placeholder="请输入授信序号" v-decorator="['creditDetailId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否利率定价">
          <a-input placeholder="请输入是否利率定价" v-decorator="['appRateExecType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金币种">
          <a-input placeholder="请输入保证金币种" v-decorator="['appBailCurrecny', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款方式">
          <a-input placeholder="请输入贷款方式" v-decorator="['loanMode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否使用贷款证">
          <a-input placeholder="请输入是否使用贷款证" v-decorator="['isUseLoanCard', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否财政贴息">
          <a-input placeholder="请输入是否财政贴息" v-decorator="['isFinanceIntBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向">
          <a-input placeholder="请输入贷款投向" v-decorator="['industryType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人行标准">
          <a-input placeholder="请输入人行标准" v-decorator="['pbcStandard', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本行标准">
          <a-input placeholder="请输入本行标准" v-decorator="['selfStandard', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同类型, 授信方式">
          <a-input placeholder="请输入合同类型, 授信方式" v-decorator="['contractType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期罚息比例">
          <a-input placeholder="请输入逾期罚息比例" v-decorator="['fineRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挤占拥用罚息比例">
          <a-input placeholder="请输入挤占拥用罚息比例" v-decorator="['apprFineRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放贷人编号">
          <a-input placeholder="请输入放贷人编号" v-decorator="['fkId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="征信业务种类">
          <a-input placeholder="请输入征信业务种类" v-decorator="['businessKind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款形式">
          <a-input placeholder="请输入贷款形式" v-decorator="['businessType3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人存款账号">
          <a-input placeholder="请输入借款人存款账号" v-decorator="['jbckzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="包收责任人">
          <a-input placeholder="请输入包收责任人" v-decorator="['assureUserId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审查责任人">
          <a-input placeholder="请输入审查责任人" v-decorator="['censorUserId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审批责任人">
          <a-input placeholder="请输入审批责任人" v-decorator="['examApprUserId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理责任人">
          <a-input placeholder="请输入管理责任人" v-decorator="['managerUserId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编号">
          <a-input placeholder="请输入业务编号" v-decorator="['businessNo', validatorRules.businessNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款类型">
          <a-input placeholder="请输入贷款类型" v-decorator="['businessType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款科目一,贷款性质,业务分类,业务品种">
          <a-input placeholder="请输入贷款科目一,贷款性质,业务分类,业务品种" v-decorator="['businessSubType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款分类,贷款科目二,发生类型">
          <a-input placeholder="请输入贷款分类,贷款科目二,发生类型" v-decorator="['occurType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务流程,适用的流程">
          <a-input placeholder="请输入业务流程,适用的流程" v-decorator="['businessFlow', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务阶段">
          <a-input placeholder="请输入业务阶段" v-decorator="['businessPhase', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务形态">
          <a-input placeholder="请输入业务形态" v-decorator="['businessStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务分类">
          <a-input placeholder="请输入业务分类" v-decorator="['businessType1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险类型">
          <a-input placeholder="请输入风险类型" v-decorator="['businessType2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务属性">
          <a-input placeholder="请输入业务属性" v-decorator="['businessAttribute1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务属性">
          <a-input placeholder="请输入业务属性" v-decorator="['businessAttribute2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务属性">
          <a-input placeholder="请输入业务属性" v-decorator="['businessAttribute3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务属性">
          <a-input placeholder="请输入业务属性" v-decorator="['businessAttribute4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="承兑申请人姓名,申请人,申请人姓名,申请展期人">
          <a-input placeholder="请输入承兑申请人姓名,申请人,申请人姓名,申请展期人" v-decorator="['applicantName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用款计划">
          <a-input placeholder="请输入用款计划" v-decorator="['planAllocation', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际用款情况">
          <a-input placeholder="请输入实际用款情况" v-decorator="['actualAllocation', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="汇票期限,批准期限,签约期限,申请借新还旧期限,原借款期限">
          <a-input placeholder="请输入汇票期限,批准期限,签约期限,申请借新还旧期限,原借款期限" v-decorator="['appTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批准日期">
          <a-input placeholder="请输入批准日期" v-decorator="['appDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="汇票币种,批准币种,签约币种">
          <a-input placeholder="请输入汇票币种,批准币种,签约币种" v-decorator="['appCurrency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="汇票金额,借款金额,批准保函金额,批准金额,票面金额,签约金额,申请金额,原借款金额">
          <a-input placeholder="请输入汇票金额,借款金额,批准保函金额,批准金额,票面金额,签约金额,申请金额,原借款金额" v-decorator="['appSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="张数">
          <a-input placeholder="请输入张数" v-decorator="['appProp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批准期限年">
          <a-input placeholder="请输入批准期限年" v-decorator="['appTermYear', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批准期限月">
          <a-input placeholder="请输入批准期限月" v-decorator="['appTermMonth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴息类型">
          <a-input placeholder="请输入贴息类型" v-decorator="['businessOther1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同打印类型">
          <a-input placeholder="请输入合同打印类型" v-decorator="['businessOther2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款其他属性3">
          <a-input placeholder="请输入贷款其他属性3" v-decorator="['businessOther3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款其他属性4">
          <a-input placeholder="请输入贷款其他属性4" v-decorator="['businessOther4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['eDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-input placeholder="请输入数据日期" v-decorator="['dataDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天入库表编号-对不同的表名唯一">
          <a-input placeholder="请输入天入库表编号-对不同的表名唯一" v-decorator="['dtnum', validatorRules.dtnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dttime">
          <a-date-picker v-decorator="[ 'dttime', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DkywhtbModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        businessNo:{rules: [{ required: true, message: '请输入业务编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/dkywhtb/dkywhtb/add",
          edit: "/dkywhtb/dkywhtb/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'dataFlag','appTermDay','appRateType','appFloatType','appRateFloat','appRate','appPdgRatio','appPdgSum','appPdgPayMethod','appMfeeRatio','appMfeeSum','appMfeePayMethod','appBailRatio','appBailSum','appGp','appPayTimes','appPayCyc','fineRateType','fineRate','actualPurpose','paySource','corpusPayMethod','interestPayMethod','creditAggreementId','relativeAgreement','signDate','contractNo','contractPutOutDate','contractMaturity','thirdParty','thirdPartyId','thirdPartyRegion','totalSum','ourRole','reversibility','vouchType','vouchType1','vouchType2','vouchClass','extendTimes','lngoTimes','golnTimes','drTimes','firstPutOutDate','riskRate','putOutTotalSum','describe1','describe2','describe3','describe4','describe5','describe6','describe7','describe8','describe9','describe10','orgId','userId','inputDate','updateDate','remark','custId','dealerAccount','punishMonthRate','bankFlag','appPutOutDate','appMaturityDate','isCredit','notaryOrg','notary','notaryDate','isNotary','isTheSameNotary','balance','creditDetailId','appRateExecType','appBailCurrecny','loanMode','isUseLoanCard','isFinanceIntBal','industryType','pbcStandard','selfStandard','contractType','fineRatio','apprFineRatio','fkId','businessKind','businessType3','jbckzh','assureUserId','censorUserId','examApprUserId','managerUserId','businessNo','businessType','businessSubType','occurType','businessFlow','businessPhase','businessStatus','businessType1','businessType2','businessAttribute1','businessAttribute2','businessAttribute3','businessAttribute4','applicantName','planAllocation','actualAllocation','appTerm','appDate','appCurrency','appSum','appProp','appTermYear','appTermMonth','businessOther1','businessOther2','businessOther3','businessOther4','sDate','eDate','dataDate','legalNo','dtnum'))
		  //时间格式化
          this.form.setFieldsValue({dttime:this.model.dttime?moment(this.model.dttime):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dttime = formData.dttime?formData.dttime.format():null;
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>