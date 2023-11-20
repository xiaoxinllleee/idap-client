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
          label="账号">
          <a-input placeholder="请输入账号" v-decorator="['key1', validatorRules.key1 ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表明最近的GLDM记录通常值为0">
          <a-input placeholder="请输入表明最近的GLDM记录通常值为0" v-decorator="['gldvst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="该字段现在不用值始终为0">
          <a-input placeholder="请输入该字段现在不用值始终为0" v-decorator="['noTrans', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统名此处值为GEN">
          <a-input placeholder="请输入系统名此处值为GEN" v-decorator="['syst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部帐所属分行">
          <a-input placeholder="请输入内部帐所属分行" v-decorator="['branch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户状态">
          <a-input placeholder="请输入账户状态" v-decorator="['status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品类型">
          <a-input placeholder="请输入产品类型" v-decorator="['prodType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品子类">
          <a-input placeholder="请输入产品子类" v-decorator="['prodCat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="供未来使用">
          <a-input placeholder="请输入供未来使用" v-decorator="['relationship', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="供未来使用">
          <a-input placeholder="请输入供未来使用" v-decorator="['allocation', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="40位长账户名供查询使用">
          <a-input placeholder="请输入40位长账户名供查询使用" v-decorator="['ledgerName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="30位长其他语言账户名供查询使用">
          <a-input placeholder="请输入30位长其他语言账户名供查询使用" v-decorator="['othCurrLedgName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['currency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前账户余额">
          <a-input placeholder="请输入当前账户余额" v-decorator="['cumCurrVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户余额通常为零">
          <a-input placeholder="请输入开户余额通常为零" v-decorator="['openVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月实际余额">
          <a-input placeholder="请输入月实际余额" v-decorator="['monthVal13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计预算金额">
          <a-input placeholder="请输入累计预算金额" v-decorator="['bdgtCumVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预算起始金额">
          <a-input placeholder="请输入预算起始金额" v-decorator="['bdgtOpenVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月预算余额">
          <a-input placeholder="请输入月预算余额" v-decorator="['bdgtMonthVal13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流水号">
          <a-input placeholder="请输入流水号" v-decorator="['jrnlseq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目号当前未用">
          <a-input placeholder="请输入项目号当前未用" v-decorator="['projCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一本汇票前缀">
          <a-input placeholder="请输入上一本汇票前缀" v-decorator="['lastChqAlpha', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一本汇票号码">
          <a-input placeholder="请输入上一本汇票号码" v-decorator="['lastChqSeq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本账户签发本汇票数量当前未用">
          <a-input placeholder="请输入本账户签发本汇票数量当前未用" v-decorator="['chqsIssTday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本账户签发本汇票总金额当前未用">
          <a-input placeholder="请输入本账户签发本汇票总金额当前未用" v-decorator="['chqsIssTdayAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本账户已解付本汇票数量目前未用">
          <a-input placeholder="请输入本账户已解付本汇票数量目前未用" v-decorator="['chqsPaidTday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本账户已解付本汇票金额目前未用">
          <a-input placeholder="请输入本账户已解付本汇票金额目前未用" v-decorator="['chqsPaidTdayAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本账户未结清本汇票数量目前未用">
          <a-input placeholder="请输入本账户未结清本汇票数量目前未用" v-decorator="['unclChqs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本账户已冻结本汇票数量目前未用">
          <a-input placeholder="请输入本账户已冻结本汇票数量目前未用" v-decorator="['stoppedChqs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未记录的跨货币交易总金额通常为0目前未用">
          <a-input placeholder="请输入未记录的跨货币交易总金额通常为0目前未用" v-decorator="['crossCurrVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未记录的跨分行交易总金额通常为0目前未用">
          <a-input placeholder="请输入未记录的跨分行交易总金额通常为0目前未用" v-decorator="['interBrVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="非交易跨货币金额通常为0目前未用">
          <a-input placeholder="请输入非交易跨货币金额通常为0目前未用" v-decorator="['nonTxCrCurrVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本账户已冻结本汇票金额目前未用">
          <a-input placeholder="请输入本账户已冻结本汇票金额目前未用" v-decorator="['chqsStoppedAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态最后修改日期">
          <a-input placeholder="请输入状态最后修改日期" v-decorator="['lastStatDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="安全校验标志位">
          <a-input placeholder="请输入安全校验标志位" v-decorator="['secAccessInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特殊账户标识">
          <a-input placeholder="请输入特殊账户标识" v-decorator="['specialAcctInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="该账户已取消本汇票数量目前不用">
          <a-input placeholder="请输入该账户已取消本汇票数量目前不用" v-decorator="['chqsCancelledCtr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="该账户已取消本汇票金额目前不用">
          <a-input placeholder="请输入该账户已取消本汇票金额目前不用" v-decorator="['chqsCancelledAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一支票顺序号">
          <a-input placeholder="请输入上一支票顺序号" v-decorator="['lastChqDupNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户号">
          <a-input placeholder="请输入客户号" v-decorator="['customerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账单产生频率产品层对账单产生频率">
          <a-input placeholder="请输入对账单产生频率产品层对账单产生频率" v-decorator="['stmntFreq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账单格式">
          <a-input placeholder="请输入对账单格式" v-decorator="['stmntForm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账单日期历法">
          <a-input placeholder="请输入对账单日期历法" v-decorator="['stmntDateIndic', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账单借方总金额">
          <a-input placeholder="请输入对账单借方总金额" v-decorator="['totDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账单贷方总金额">
          <a-input placeholder="请输入对账单贷方总金额" v-decorator="['totCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="供未来使用">
          <a-input placeholder="请输入供未来使用" v-decorator="['consolidateFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户上一交易会计日">
          <a-input placeholder="请输入账户上一交易会计日" v-decorator="['lstFinDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户对账单数量">
          <a-input placeholder="请输入账户对账单数量" v-decorator="['noOfStmnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户未发送电子邮件数">
          <a-input placeholder="请输入账户未发送电子邮件数" v-decorator="['msgsPending', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户总电子邮件数">
          <a-input placeholder="请输入账户总电子邮件数" v-decorator="['noOfMessages', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账单周期">
          <a-input placeholder="请输入对账单周期" v-decorator="['statementCycle', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账单日期">
          <a-input placeholder="请输入对账单日期" v-decorator="['statementDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户开户日期">
          <a-input placeholder="请输入账户开户日期" v-decorator="['acctOpenDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="GLPP产品参数中的ProductRestriction32种的转账限制">
          <a-input placeholder="请输入GLPP产品参数中的ProductRestriction32种的转账限制" v-decorator="['postingMask', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="32种报告限制目前不用">
          <a-input placeholder="请输入32种报告限制目前不用" v-decorator="['reportMask', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="GLCCGL分类代码代表了客户在企业总帐控制的账户">
          <a-input placeholder="请输入GLCCGL分类代码代表了客户在企业总帐控制的账户" v-decorator="['glClassCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="段码原用于公司总帐出报表时区分GL类型现不用">
          <a-input placeholder="请输入段码原用于公司总帐出报表时区分GL类型现不用" v-decorator="['glSegment', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账单份数">
          <a-input placeholder="请输入对账单份数" v-decorator="['statementCopies', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一次产品类型修改日期">
          <a-input placeholder="请输入上一次产品类型修改日期" v-decorator="['lastAcctTypeChg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="该账户是否涉及预约转账">
          <a-input placeholder="请输入该账户是否涉及预约转账" v-decorator="['sweepAcctFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否更新外汇头寸账户">
          <a-input placeholder="请输入是否更新外汇头寸账户" v-decorator="['exchgPosnFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="该账户最早的倒退日交易日期">
          <a-input placeholder="请输入该账户最早的倒退日交易日期" v-decorator="['oldestBdateDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销帐码标识">
          <a-input placeholder="请输入销帐码标识" v-decorator="['srnInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销帐码借贷标识">
          <a-input placeholder="请输入销帐码借贷标识" v-decorator="['srnCrdrInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预约转账标识">
          <a-input placeholder="请输入预约转账标识" v-decorator="['sweepInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="推迟转账日预约转账时推迟的费用上划天数">
          <a-input placeholder="请输入推迟转账日预约转账时推迟的费用上划天数" v-decorator="['delayDays', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预约转账的转入账户">
          <a-input placeholder="请输入预约转账的转入账户" v-decorator="['motherAcctno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指明向母账户中上划资金的方式">
          <a-input placeholder="请输入指明向母账户中上划资金的方式" v-decorator="['pushPostingFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易用借贷标识">
          <a-input placeholder="请输入交易用借贷标识" v-decorator="['drCrFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易总借方金额">
          <a-input placeholder="请输入交易总借方金额" v-decorator="['cshadvTotDr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易总贷方金额">
          <a-input placeholder="请输入交易总贷方金额" v-decorator="['cshadvTotCr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收益代码从前用于出报表统计">
          <a-input placeholder="请输入收益代码从前用于出报表统计" v-decorator="['profitCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关户标识用于关户交易">
          <a-input placeholder="请输入关户标识用于关户交易" v-decorator="['closureFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="库存限额目前仅存储开户页面传来的值无相应处理">
          <a-input placeholder="请输入库存限额目前仅存储开户页面传来的值无相应处理" v-decorator="['vaultLimitAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="免税种类用于免除该账户的特定费用">
          <a-input placeholder="请输入免税种类用于免除该账户的特定费用" v-decorator="['chrExemProfile', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费次数">
          <a-input placeholder="请输入收费次数" v-decorator="['chrCnt10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['chrVal10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否允许bancslink柜员访问的产品">
          <a-input placeholder="请输入是否允许bancslink柜员访问的产品" v-decorator="['allowBl', {}]" />
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
          label="加载时间">
          <a-input placeholder="请输入加载时间" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', validatorRules.legalNo ]" />
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
    name: "ZzzhzbModal",
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
        key1:{rules: [{ required: true, message: '请输入账号!' }]},
        legalNo:{rules: [{ required: true, message: '请输入法人标识!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/zzzhzb/zzzhzb/add",
          edit: "/zzzhzb/zzzhzb/edit",
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
          this.form.setFieldsValue(pick(this.model,'key1','gldvst','noTrans','syst','branch','status','prodType','prodCat','relationship','allocation','ledgerName','othCurrLedgName','currency','cumCurrVal','openVal','monthVal01','monthVal02','monthVal03','monthVal04','monthVal05','monthVal06','monthVal07','monthVal08','monthVal09','monthVal10','monthVal11','monthVal12','monthVal13','bdgtCumVal','bdgtOpenVal','bdgtMonthVal01','bdgtMonthVal02','bdgtMonthVal03','bdgtMonthVal04','bdgtMonthVal05','bdgtMonthVal06','bdgtMonthVal07','bdgtMonthVal08','bdgtMonthVal09','bdgtMonthVal10','bdgtMonthVal11','bdgtMonthVal12','bdgtMonthVal13','jrnlseq','projCode','lastChqAlpha','lastChqSeq','chqsIssTday','chqsIssTdayAmt','chqsPaidTday','chqsPaidTdayAmt','unclChqs','stoppedChqs','crossCurrVal','interBrVal','nonTxCrCurrVal','chqsStoppedAmt','lastStatDate','secAccessInd','specialAcctInd','chqsCancelledCtr','chqsCancelledAmt','lastChqDupNo','customerNo','stmntFreq','stmntForm','stmntDateIndic','totDr','totCr','consolidateFlag','lstFinDt','noOfStmnt','msgsPending','noOfMessages','statementCycle','statementDay','acctOpenDate','postingMask','reportMask','glClassCode','glSegment','statementCopies','lastAcctTypeChg','sweepAcctFlag','exchgPosnFlag','oldestBdateDate','srnInd','srnCrdrInd','sweepInd','delayDays','motherAcctno','pushPostingFlag','drCrFlag','cshadvTotDr','cshadvTotCr','profitCode','closureFlag','vaultLimitAmt','chrExemProfile','chrCnt01','chrVal01','chrCnt02','chrVal02','chrCnt03','chrVal03','chrCnt04','chrVal04','chrCnt05','chrVal05','chrCnt06','chrVal06','chrCnt07','chrVal07','chrCnt08','chrVal08','chrCnt09','chrVal09','chrCnt10','chrVal10','allowBl','sdate','edate','loadDate','legalNo','dtnum'))
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