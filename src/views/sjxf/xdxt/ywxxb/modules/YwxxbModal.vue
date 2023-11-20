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
          label="dataFlag">
          <a-input placeholder="请输入dataFlag" v-decorator="['dataFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务受理号">
          <a-input placeholder="请输入业务受理号" v-decorator="['busCreCode', {}]" />
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
          label="授信序号">
          <a-input placeholder="请输入授信序号" v-decorator="['creditDetailId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前台客户号">
          <a-input placeholder="请输入前台客户号" v-decorator="['custFrontCode', {}]" />
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
          label="债务重组次数">
          <a-input placeholder="请输入债务重组次数" v-decorator="['drTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期时间">
          <a-input placeholder="请输入展期时间" v-decorator="['extendTimes', {}]" />
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
          label="罚息利率类型">
          <a-input placeholder="请输入罚息利率类型" v-decorator="['fineRateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次还款日期">
          <a-input placeholder="请输入首次还款日期" v-decorator="['firstReturnDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放款人编号">
          <a-input placeholder="请输入放款人编号" v-decorator="['fkId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期后总期限">
          <a-input placeholder="请输入展期后总期限" v-decorator="['golnTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公证书编号">
          <a-input placeholder="请输入公证书编号" v-decorator="['guarantyNdNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原借款利率">
          <a-input placeholder="请输入原借款利率" v-decorator="['guarantyRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保总价值">
          <a-input placeholder="请输入担保总价值" v-decorator="['guarantyValue', {}]" />
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
          label="付息方式,计息方式">
          <a-input placeholder="请输入付息方式,计息方式" v-decorator="['interestPayMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息比例">
          <a-input placeholder="请输入利息比例" v-decorator="['interestScal', {}]" />
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
          label="借新还旧次数">
          <a-input placeholder="请输入借新还旧次数" v-decorator="['lngoTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款帐号">
          <a-input placeholder="请输入贷款帐号" v-decorator="['loanAccount', {}]" />
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
          label="录入机构">
          <a-input placeholder="请输入录入机构" v-decorator="['orgId', {}]" />
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
          label="还款资金来源,签约还款来源">
          <a-input placeholder="请输入还款资金来源,签约还款来源" v-decorator="['paySource', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="归还比例">
          <a-input placeholder="请输入归还比例" v-decorator="['paymentScal', {}]" />
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
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remark', {}]" />
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
          label="综合风险度">
          <a-input placeholder="请输入综合风险度" v-decorator="['riskRate', {}]" />
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
          label="更改日期">
          <a-input placeholder="请输入更改日期" v-decorator="['updateDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作员编号">
          <a-input placeholder="请输入操作员编号" v-decorator="['userId', {}]" />
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
          label="warrantorId">
          <a-input placeholder="请输入warrantorId" v-decorator="['warrantorId', {}]" />
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
          label="付息账号">
          <a-input placeholder="请输入付息账号" v-decorator="['jbckzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同类型">
          <a-input placeholder="请输入合同类型" v-decorator="['contractType', {}]" />
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
          label="联络员">
          <a-input placeholder="请输入联络员" v-decorator="['contactUserId', {}]" />
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
          label="相片路径">
          <a-input placeholder="请输入相片路径" v-decorator="['photo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前台结算帐号">
          <a-input placeholder="请输入前台结算帐号" v-decorator="['accountNo', {}]" />
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
          label="利率执行方式">
          <a-input placeholder="请输入利率执行方式" v-decorator="['appRateExecType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请书号">
          <a-input placeholder="请输入申请书号" v-decorator="['applicantId', {}]" />
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
          label="保证金比例,利息收入">
          <a-input placeholder="请输入保证金比例,利息收入" v-decorator="['applyBailRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金金额,欠息金额,实付金额">
          <a-input placeholder="请输入保证金金额,欠息金额,实付金额" v-decorator="['applyBailSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请币种">
          <a-input placeholder="请输入申请币种" v-decorator="['applyCurrency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签定货币交易合同日期,申请日期">
          <a-input placeholder="请输入签定货币交易合同日期,申请日期" v-decorator="['applyDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请浮动方式, 申请利率浮动方式">
          <a-input placeholder="请输入申请浮动方式, 申请利率浮动方式" v-decorator="['applyFloatType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款宽限期,原借款期限,张数">
          <a-input placeholder="请输入还款宽限期,原借款期限,张数" v-decorator="['applyGp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原担保方式,支付方式">
          <a-input placeholder="请输入原担保方式,支付方式" v-decorator="['applyMfeePayMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理费比例,实付金额">
          <a-input placeholder="请输入管理费比例,实付金额" v-decorator="['applyMfeeRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本次偿还金额,管理费金额,票面金额">
          <a-input placeholder="请输入本次偿还金额,管理费金额,票面金额" v-decorator="['applyMfeeSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款周期">
          <a-input placeholder="请输入还款周期" v-decorator="['applyPayCyc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款期次,张数">
          <a-input placeholder="请输入还款期次,张数" v-decorator="['applyPayTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方式">
          <a-input placeholder="请输入支付方式" v-decorator="['applyPdgPayMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票面金额,手续费比例">
          <a-input placeholder="请输入票面金额,手续费比例" v-decorator="['applyPdgRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息收入,手续费金额">
          <a-input placeholder="请输入利息收入,手续费金额" v-decorator="['applyPdgSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="张数">
          <a-input placeholder="请输入张数" v-decorator="['applyProp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请贷款用途">
          <a-input placeholder="请输入申请贷款用途" v-decorator="['applyPurpose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请执行利率,实付金额">
          <a-input placeholder="请输入申请执行利率,实付金额" v-decorator="['applyRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请浮动比例, 申请浮动比率, 申请利息收入">
          <a-input placeholder="请输入申请浮动比例, 申请浮动比率, 申请利息收入" v-decorator="['applyRateFloat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请利率类型">
          <a-input placeholder="请输入申请利率类型" v-decorator="['applyRateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票面金额,申请承兑汇票金额,申请金额,申请贴现金额">
          <a-input placeholder="请输入票面金额,申请承兑汇票金额,申请金额,申请贴现金额" v-decorator="['applySum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="汇票张数,申请期限">
          <a-input placeholder="请输入汇票张数,申请期限" v-decorator="['applyTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请期限日">
          <a-input placeholder="请输入申请期限日" v-decorator="['applyTermDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请期限月">
          <a-input placeholder="请输入申请期限月" v-decorator="['applyTermMonth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请期限年">
          <a-input placeholder="请输入申请期限年" v-decorator="['applyTermYear', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金支付帐号,支付帐号">
          <a-input placeholder="请输入保证金支付帐号,支付帐号" v-decorator="['bailAccount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基期信用等级">
          <a-input placeholder="请输入基期信用等级" v-decorator="['baseEvaluateResult', {}]" />
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
          label="业务流程,适用的流程">
          <a-input placeholder="请输入业务流程,适用的流程" v-decorator="['businessFlow', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编号">
          <a-input placeholder="请输入业务编号" v-decorator="['businessNo', {}]" />
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
          label="贷款科目一,贷款性质,业务分类,业务品种">
          <a-input placeholder="请输入贷款科目一,贷款性质,业务分类,业务品种" v-decorator="['businessSubType', {}]" />
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
          label="还本方式,还款方式">
          <a-input placeholder="请输入还本方式,还款方式" v-decorator="['corpusPayMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联机交易号">
          <a-input placeholder="请输入联机交易号" v-decorator="['sid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率类型">
          <a-input placeholder="请输入利率类型" v-decorator="['rateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品代码">
          <a-input placeholder="请输入产品代码" v-decorator="['productType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款周期类型">
          <a-input placeholder="请输入还款周期类型" v-decorator="['repyCycTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款方式类型">
          <a-input placeholder="请输入还款方式类型" v-decorator="['repyMthTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动利率生效类型">
          <a-input placeholder="请输入浮动利率生效类型" v-decorator="['fltRateEffTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自动扣款类型">
          <a-input placeholder="请输入自动扣款类型" v-decorator="['atmDdtTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="足额扣款类型">
          <a-input placeholder="请输入足额扣款类型" v-decorator="['fullDdtTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提前还款后的重算方式">
          <a-input placeholder="请输入提前还款后的重算方式" v-decorator="['advRepyAfRtrMth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次还款日标识">
          <a-input placeholder="请输入首次还款日标识" v-decorator="['frstRepyDtTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托资金协议号">
          <a-input placeholder="请输入委托资金协议号" v-decorator="['entrstFndAgrmtNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动周期">
          <a-input placeholder="请输入浮动周期" v-decorator="['fltCycTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动周期基数">
          <a-input placeholder="请输入浮动周期基数" v-decorator="['fltCycBscTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次浮动日">
          <a-input placeholder="请输入首次浮动日" v-decorator="['rateFrstFltDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始日期">
          <a-input placeholder="请输入开始日期" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-input placeholder="请输入结束日期" v-decorator="['eDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载时间">
          <a-input placeholder="请输入加载时间" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人编号">
          <a-input placeholder="请输入法人编号" v-decorator="['legalNo', {}]" />
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
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lprFlag">
          <a-input placeholder="请输入lprFlag" v-decorator="['lprFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lprRateId">
          <a-input placeholder="请输入lprRateId" v-decorator="['lprRateId', {}]" />
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
    name: "YwxxbModal",
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
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/ywxxb/ywxxb/add",
          edit: "/ywxxb/ywxxb/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataFlag','busCreCode','creditAggreementId','creditDetailId','custFrontCode','custId','drTimes','extendTimes','fineRate','fineRateType','firstReturnDate','fkId','golnTimes','guarantyNdNo','guarantyRate','guarantyValue','inputDate','interestPayMethod','interestScal','isCredit','lngoTimes','loanAccount','occurType','orgId','ourRole','paySource','paymentScal','relativeAgreement','remark','reversibility','riskRate','thirdParty','thirdPartyId','thirdPartyRegion','totalSum','updateDate','userId','vouchClass','vouchType','vouchType1','vouchType2','warrantorId','loanMode','isUseLoanCard','isFinanceIntBal','fineRatio','apprFineRatio','businessKind','businessType3','jbckzh','contractType','industryType','contactUserId','assureUserId','photo','accountNo','appBailCurrecny','appRateExecType','applicantId','applicantName','applyBailRatio','applyBailSum','applyCurrency','applyDate','applyFloatType','applyGp','applyMfeePayMethod','applyMfeeRatio','applyMfeeSum','applyPayCyc','applyPayTimes','applyPdgPayMethod','applyPdgRatio','applyPdgSum','applyProp','applyPurpose','applyRate','applyRateFloat','applyRateType','applySum','applyTerm','applyTermDay','applyTermMonth','applyTermYear','bailAccount','baseEvaluateResult','businessAttribute1','businessAttribute2','businessAttribute3','businessAttribute4','businessFlow','businessNo','businessPhase','businessStatus','businessSubType','businessType','businessType1','businessType2','corpusPayMethod','sid','rateType','productType','repyCycTp','repyMthTp','fltRateEffTp','atmDdtTp','fullDdtTp','advRepyAfRtrMth','frstRepyDtTp','entrstFndAgrmtNo','fltCycTp','fltCycBscTp','rateFrstFltDt','sDate','eDate','loadDate','legalNo','dtnum','lprFlag','lprRateId'))
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