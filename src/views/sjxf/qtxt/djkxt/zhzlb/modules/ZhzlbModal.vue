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
          label="卡号">
          <a-input placeholder="请输入卡号" v-decorator="['cardNbr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号">
          <a-input placeholder="请输入账号" v-decorator="['xaccount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近地址修改日期">
          <a-input placeholder="请输入最近地址修改日期" v-decorator="['addChgday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单地址类型">
          <a-input placeholder="请输入帐单地址类型" v-decorator="['addrType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片产品种类">
          <a-input placeholder="请输入卡片产品种类" v-decorator="['product', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分行编号">
          <a-input placeholder="请输入分行编号" v-decorator="['branch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司编号">
          <a-input placeholder="请输入公司编号" v-decorator="['business', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户日期">
          <a-input placeholder="请输入开户日期" v-decorator="['dayOpened', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用额度">
          <a-input placeholder="请输入信用额度" v-decorator="['credLimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第二币种信用额度">
          <a-input placeholder="请输入第二币种信用额度" v-decorator="['credlimX', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期付款信用额度">
          <a-input placeholder="请输入分期付款信用额度" v-decorator="['mpLimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权未请款金额">
          <a-input placeholder="请输入授权未请款金额" v-decorator="['authsAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款截止日期">
          <a-input placeholder="请输入还款截止日期" v-decorator="['cutoffDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次还款日期">
          <a-input placeholder="请输入上次还款日期" v-decorator="['lastpayday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已结算付款额">
          <a-input placeholder="请输入已结算付款额" v-decorator="['paymtClrd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期消费净额">
          <a-input placeholder="请输入本期消费净额" v-decorator="['purchases', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期消费净额(正负号)">
          <a-input placeholder="请输入本期消费净额(正负号)" v-decorator="['purchasesFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期年费金额">
          <a-input placeholder="请输入本期年费金额" v-decorator="['cardFees', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期预借现金费用总额">
          <a-input placeholder="请输入本期预借现金费用总额" v-decorator="['cashAdfee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期预借现金总额">
          <a-input placeholder="请输入本期预借现金总额" v-decorator="['cashAdvce', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期其它费用的总额">
          <a-input placeholder="请输入本期其它费用的总额" v-decorator="['otherFees', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期预收罚金">
          <a-input placeholder="请输入本期预收罚金" v-decorator="['penchgAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期金额">
          <a-input placeholder="请输入逾期金额" v-decorator="['stmOverdu', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期天数">
          <a-input placeholder="请输入逾期天数" v-decorator="['dayOdue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="争议金额">
          <a-input placeholder="请输入争议金额" v-decorator="['queryAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期借记调整金额">
          <a-input placeholder="请输入本期借记调整金额" v-decorator="['debitAdj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期贷记调帐金额">
          <a-input placeholder="请输入本期贷记调帐金额" v-decorator="['credAdj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户状态">
          <a-input placeholder="请输入账户状态" v-decorator="['closeCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户状态日期">
          <a-input placeholder="请输入账户状态日期" v-decorator="['closeChdy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="昨日消费余额">
          <a-input placeholder="请输入昨日消费余额" v-decorator="['balFree', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="昨日预借现金余额">
          <a-input placeholder="请输入昨日预借现金余额" v-decorator="['balInt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="昨日预借现金余额符号">
          <a-input placeholder="请输入昨日预借现金余额符号" v-decorator="['balIntFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="昨日费用余额">
          <a-input placeholder="请输入昨日费用余额" v-decorator="['balNoint', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="昨日利息余额">
          <a-input placeholder="请输入昨日利息余额" v-decorator="['balOrint', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐户进入催收队列的日期">
          <a-input placeholder="请输入帐户进入催收队列的日期" v-decorator="['octDayin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="货币代码">
          <a-input placeholder="请输入货币代码" v-decorator="['currNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一次计息日期">
          <a-input placeholder="请输入最近一次计息日期" v-decorator="['intUptody', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收利息">
          <a-input placeholder="请输入应收利息" v-decorator="['intChgd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本帐期的还款笔数">
          <a-input placeholder="请输入本帐期的还款笔数" v-decorator="['nbrPaymnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本帐期的一般消费笔数">
          <a-input placeholder="请输入本帐期的一般消费笔数" v-decorator="['nbrPurch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本帐期的所有交易笔数">
          <a-input placeholder="请输入本帐期的所有交易笔数" v-decorator="['nbrTrans', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期调整的红利积分">
          <a-input placeholder="请输入当期调整的红利积分" v-decorator="['pointAdj1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期兑换的红利积分">
          <a-input placeholder="请输入当期兑换的红利积分" v-decorator="['pointClm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计的红利积分">
          <a-input placeholder="请输入累计的红利积分" v-decorator="['pointCum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期新增的红利积分">
          <a-input placeholder="请输入当期新增的红利积分" v-decorator="['pointEar', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自动扣款代码">
          <a-input placeholder="请输入自动扣款代码" v-decorator="['repayCode1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一期帐单的不计息余额">
          <a-input placeholder="请输入最近一期帐单的不计息余额" v-decorator="['stmNoint', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一期帐单的消费余额">
          <a-input placeholder="请输入最近一期帐单的消费余额" v-decorator="['stmBalfre', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一期帐单的利息余额">
          <a-input placeholder="请输入最近一期帐单的利息余额" v-decorator="['stmBalori', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一期帐单的预借现金余额">
          <a-input placeholder="请输入最近一期帐单的预借现金余额" v-decorator="['stmBalint', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一期帐单的预借现金符号">
          <a-input placeholder="请输入最近一期帐单的预借现金符号" v-decorator="['stmBalintSign', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一期帐单金额">
          <a-input placeholder="请输入最近一期帐单金额" v-decorator="['stmBalnce', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一期帐单的最低应缴款">
          <a-input placeholder="请输入最近一期帐单的最低应缴款" v-decorator="['stmMindue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单代码">
          <a-input placeholder="请输入帐单代码" v-decorator="['stmCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期金额1">
          <a-input placeholder="请输入逾期金额1" v-decorator="['ageingA1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期金额2">
          <a-input placeholder="请输入逾期金额2" v-decorator="['ageingA2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期金额3">
          <a-input placeholder="请输入逾期金额3" v-decorator="['ageingA3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期金额4">
          <a-input placeholder="请输入逾期金额4" v-decorator="['ageingA4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期金额5">
          <a-input placeholder="请输入逾期金额5" v-decorator="['ageingA5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期金额6">
          <a-input placeholder="请输入逾期金额6" v-decorator="['ageingA6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期最高期数">
          <a-input placeholder="请输入逾期最高期数" v-decorator="['mthsOdue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复利余额">
          <a-input placeholder="请输入复利余额" v-decorator="['balCmpint', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期发生退货金额">
          <a-input placeholder="请输入当期发生退货金额" v-decorator="['credVouch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单日">
          <a-input placeholder="请输入帐单日" v-decorator="['cycleNbr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购汇功能选项">
          <a-input placeholder="请输入购汇功能选项" v-decorator="['exchCode1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期付款授权金额">
          <a-input placeholder="请输入分期付款授权金额" v-decorator="['mpAuths', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期付款剩余总额,包含利息、本金和费用">
          <a-input placeholder="请输入分期付款剩余总额,包含利息、本金和费用" v-decorator="['mpBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单地址栏位1">
          <a-input placeholder="请输入帐单地址栏位1" v-decorator="['address1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单地址栏位2">
          <a-input placeholder="请输入帐单地址栏位2" v-decorator="['address2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单地址栏位3">
          <a-input placeholder="请输入帐单地址栏位3" v-decorator="['address3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单地址栏位4">
          <a-input placeholder="请输入帐单地址栏位4" v-decorator="['address4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单地址栏位5">
          <a-input placeholder="请输入帐单地址栏位5" v-decorator="['address5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐单地址邮编">
          <a-input placeholder="请输入帐单地址邮编" v-decorator="['postCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="昨日分期余额">
          <a-input placeholder="请输入昨日分期余额" v-decorator="['balMp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期帐单分期余额">
          <a-input placeholder="请输入上期帐单分期余额" v-decorator="['stmBalmp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联还款账号1">
          <a-input placeholder="请输入关联还款账号1" v-decorator="['bankacctA1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联还款账号2">
          <a-input placeholder="请输入关联还款账号2" v-decorator="['bankacctA2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联还款账号3">
          <a-input placeholder="请输入关联还款账号3" v-decorator="['bankacctA3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联还款账号4">
          <a-input placeholder="请输入关联还款账号4" v-decorator="['bankacctA4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联账号代码1">
          <a-input placeholder="请输入关联账号代码1" v-decorator="['bankcodeA1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联账号代码1">
          <a-input placeholder="请输入关联账号代码1" v-decorator="['bankcodeA2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联账号代码1">
          <a-input placeholder="请输入关联账号代码1" v-decorator="['bankcodeA3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联账号代码1">
          <a-input placeholder="请输入关联账号代码1" v-decorator="['bankcodeA4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人民币自扣还款标志">
          <a-input placeholder="请输入人民币自扣还款标志" v-decorator="['repayCode2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="美元自扣还款标志">
          <a-input placeholder="请输入美元自扣还款标志" v-decorator="['repayCodx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购汇功能选项">
          <a-input placeholder="请输入购汇功能选项" v-decorator="['exchFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购汇金额选项">
          <a-input placeholder="请输入购汇金额选项" v-decorator="['exchCode2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一期帐单处理日">
          <a-input placeholder="请输入最近一期帐单处理日" v-decorator="['stmClosdy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期调整红利积分符号">
          <a-input placeholder="请输入当期调整红利积分符号" v-decorator="['pointAdj2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计总积分符号">
          <a-input placeholder="请输入累计总积分符号" v-decorator="['pointCum2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户征信代码_职务">
          <a-input placeholder="请输入账户征信代码_职务" v-decorator="['credcode1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户征信代码_项目">
          <a-input placeholder="请输入账户征信代码_项目" v-decorator="['credcode2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐户标志位">
          <a-input placeholder="请输入帐户标志位" v-decorator="['acctFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐户预借现金比例">
          <a-input placeholder="请输入帐户预借现金比例" v-decorator="['caPcnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有无分行推荐函">
          <a-input placeholder="请输入有无分行推荐函" v-decorator="['brnchIntr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分行建议额度">
          <a-input placeholder="请输入分行建议额度" v-decorator="['brnchcrlmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核实内容">
          <a-input placeholder="请输入核实内容" v-decorator="['vrfCntnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户级短信费免收标志">
          <a-input placeholder="请输入账户级短信费免收标志" v-decorator="['smsFreeyn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时额度">
          <a-input placeholder="请输入临时额度" v-decorator="['tempLimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时额度失效日期">
          <a-input placeholder="请输入临时额度失效日期" v-decorator="['tlmtEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时额度生效日期">
          <a-input placeholder="请输入临时额度生效日期" v-decorator="['tlmtBeg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预借积分额度">
          <a-input placeholder="请输入预借积分额度" v-decorator="['paLimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已全额还款标志">
          <a-input placeholder="请输入已全额还款标志" v-decorator="['payFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收复利">
          <a-input placeholder="请输入应收复利" v-decorator="['intChdcmp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期应计利息">
          <a-input placeholder="请输入上期应计利息" v-decorator="['intNotion', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期应计利息">
          <a-input placeholder="请输入当期应计利息" v-decorator="['intCunot', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期应计复利">
          <a-input placeholder="请输入当期应计复利" v-decorator="['intCurcmp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应计复利利息">
          <a-input placeholder="请输入应计复利利息" v-decorator="['intCmpond', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户质押办卡/调额标志">
          <a-input placeholder="请输入账户质押办卡/调额标志" v-decorator="['impFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不上报征信数据原因">
          <a-input placeholder="请输入不上报征信数据原因" v-decorator="['ncredRsn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="监控代码">
          <a-input placeholder="请输入监控代码" v-decorator="['montrCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="影子额度">
          <a-input placeholder="请输入影子额度" v-decorator="['credLmt2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="影子额度标志">
          <a-input placeholder="请输入影子额度标志" v-decorator="['infoFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用01">
          <a-input placeholder="请输入本期费用01" v-decorator="['balNint01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用02">
          <a-input placeholder="请输入本期费用02" v-decorator="['balNint02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用03">
          <a-input placeholder="请输入本期费用03" v-decorator="['balNint03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用04">
          <a-input placeholder="请输入本期费用04" v-decorator="['balNint04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用05">
          <a-input placeholder="请输入本期费用05" v-decorator="['balNint05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用06">
          <a-input placeholder="请输入本期费用06" v-decorator="['balNint06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用07">
          <a-input placeholder="请输入本期费用07" v-decorator="['balNint07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用08">
          <a-input placeholder="请输入本期费用08" v-decorator="['balNint08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用09">
          <a-input placeholder="请输入本期费用09" v-decorator="['balNint09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期费用10">
          <a-input placeholder="请输入本期费用10" v-decorator="['balNint10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用01">
          <a-input placeholder="请输入上期费用01" v-decorator="['stmNint01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用02">
          <a-input placeholder="请输入上期费用02" v-decorator="['stmNint02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用03">
          <a-input placeholder="请输入上期费用03" v-decorator="['stmNint03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用04">
          <a-input placeholder="请输入上期费用04" v-decorator="['stmNint04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用05">
          <a-input placeholder="请输入上期费用05" v-decorator="['stmNint05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用06">
          <a-input placeholder="请输入上期费用06" v-decorator="['stmNint06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用07">
          <a-input placeholder="请输入上期费用07" v-decorator="['stmNint07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用08">
          <a-input placeholder="请输入上期费用08" v-decorator="['stmNint08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用09">
          <a-input placeholder="请输入上期费用09" v-decorator="['stmNint09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期费用10">
          <a-input placeholder="请输入上期费用10" v-decorator="['stmNint10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销标志">
          <a-input placeholder="请输入核销标志" v-decorator="['wrofFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销原因代码">
          <a-input placeholder="请输入核销原因代码" v-decorator="['canclResn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="停收利息">
          <a-input placeholder="请输入停收利息" v-decorator="['shadowInt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="停收复利">
          <a-input placeholder="请输入停收复利" v-decorator="['shadowCmp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="停收滞纳金">
          <a-input placeholder="请输入停收滞纳金" v-decorator="['shadowPen', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表内转表外费用">
          <a-input placeholder="请输入表内转表外费用" v-decorator="['balCmpfee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消费免息标志">
          <a-input placeholder="请输入消费免息标志" v-decorator="['fpFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消费免息额度固定值">
          <a-input placeholder="请输入消费免息额度固定值" v-decorator="['freeLimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消费免息额度比率">
          <a-input placeholder="请输入消费免息额度比率" v-decorator="['freePcnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消费免息额度最大值">
          <a-input placeholder="请输入消费免息额度最大值" v-decorator="['freeMax', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消费免息额度最小值">
          <a-input placeholder="请输入消费免息额度最小值" v-decorator="['freeMin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期剩余本金">
          <a-input placeholder="请输入分期剩余本金" v-decorator="['mpRemPpl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预设临额">
          <a-input placeholder="请输入预设临额" v-decorator="['credLmt3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自动分期计划相关字段">
          <a-input placeholder="请输入自动分期计划相关字段" v-decorator="['mpautoGw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率代码">
          <a-input placeholder="请输入利率代码" v-decorator="['intCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次信用额度更改日期">
          <a-input placeholder="请输入上次信用额度更改日期" v-decorator="['credChday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不可调整额度账户">
          <a-input placeholder="请输入不可调整额度账户" v-decorator="['adjFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="照会结论">
          <a-input placeholder="请输入照会结论" v-decorator="['noteRst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="照会原因">
          <a-input placeholder="请输入照会原因" v-decorator="['noteRsn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关帐详细原因">
          <a-input placeholder="请输入关帐详细原因" v-decorator="['reclaCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="宽限期新增积分">
          <a-input placeholder="请输入宽限期新增积分" v-decorator="['pointCum2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="被折算掉积分">
          <a-input placeholder="请输入被折算掉积分" v-decorator="['pointRev', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未结清还款金额">
          <a-input placeholder="请输入未结清还款金额" v-decorator="['paymtUncl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="争议代码">
          <a-input placeholder="请输入争议代码" v-decorator="['queryCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['edate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载日期">
          <a-input placeholder="请输入加载日期" v-decorator="['loadDate', {}]" />
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
    name: "ZhzlbModal",
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
          add: "/zhzlb/zhzlb/add",
          edit: "/zhzlb/zhzlb/edit",
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
          this.form.setFieldsValue(pick(this.model,'cardNbr','xaccount','addChgday','addrType','product','branch','business','dayOpened','credLimit','credlimX','mpLimit','authsAmt','cutoffDay','lastpayday','paymtClrd','purchases','purchasesFlag','cardFees','cashAdfee','cashAdvce','otherFees','penchgAcc','stmOverdu','dayOdue','queryAmt','debitAdj','credAdj','closeCode','closeChdy','balFree','balInt','balIntFlag','balNoint','balOrint','octDayin','currNum','intUptody','intChgd','nbrPaymnt','nbrPurch','nbrTrans','pointAdj1','pointClm','pointCum','pointEar','repayCode1','stmNoint','stmBalfre','stmBalori','stmBalint','stmBalintSign','stmBalnce','stmMindue','stmCode','ageingA1','ageingA2','ageingA3','ageingA4','ageingA5','ageingA6','mthsOdue','balCmpint','credVouch','cycleNbr','exchCode1','mpAuths','mpBal','address1','address2','address3','address4','address5','postCode','balMp','stmBalmp','bankacctA1','bankacctA2','bankacctA3','bankacctA4','bankcodeA1','bankcodeA2','bankcodeA3','bankcodeA4','repayCode2','repayCodx','exchFlag','exchCode2','stmClosdy','pointAdj2','pointCum2','credcode1','credcode2','acctFlag','caPcnt','brnchIntr','brnchcrlmt','vrfCntnt','smsFreeyn','tempLimit','tlmtEnd','tlmtBeg','paLimit','payFlag','intChdcmp','intNotion','intCunot','intCurcmp','intCmpond','impFlag','ncredRsn','montrCode','credLmt2','infoFlag','balNint01','balNint02','balNint03','balNint04','balNint05','balNint06','balNint07','balNint08','balNint09','balNint10','stmNint01','stmNint02','stmNint03','stmNint04','stmNint05','stmNint06','stmNint07','stmNint08','stmNint09','stmNint10','wrofFlag','canclResn','shadowInt','shadowCmp','shadowPen','balCmpfee','fpFlag','freeLimit','freePcnt','freeMax','freeMin','mpRemPpl','credLmt3','mpautoGw','intCode','credChday','adjFlag','noteRst','noteRsn','reclaCode','pointCum2','pointRev','paymtUncl','queryCode','sdate','edate','loadDate','legalNo','dtnum'))
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