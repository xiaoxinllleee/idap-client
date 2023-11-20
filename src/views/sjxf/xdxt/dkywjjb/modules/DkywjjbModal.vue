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
          label="核心借据号">
          <a-input placeholder="请输入核心借据号" v-decorator="['hxjjh', {}]" />
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
          label="逾期标志">
          <a-input placeholder="请输入逾期标志" v-decorator="['yqbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账日期">
          <a-input placeholder="请输入记账日期" v-decorator="['jzDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类可疑金额">
          <a-input placeholder="请输入五级分类可疑金额" v-decorator="['suspiciousSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作员ID">
          <a-input placeholder="请输入操作员ID" v-decorator="['userId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借据号">
          <a-input placeholder="请输入借据号" v-decorator="['voucherNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放贷流程流水号">
          <a-input placeholder="请输入放贷流程流水号" v-decorator="['voucherFlow', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放贷状态">
          <a-input placeholder="请输入放贷状态" v-decorator="['voucherStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期标志">
          <a-input placeholder="请输入展期标志" v-decorator="['extendFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-input placeholder="请输入结束日期" v-decorator="['endDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款期限">
          <a-input placeholder="请输入贷款期限" v-decorator="['appTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款种类">
          <a-input placeholder="请输入贷款种类" v-decorator="['loanKind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款帐号">
          <a-input placeholder="请输入存款帐号" v-decorator="['depositNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款科目一">
          <a-input placeholder="请输入贷款科目一" v-decorator="['businessSubject1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款科目二">
          <a-input placeholder="请输入贷款科目二" v-decorator="['businessSubject2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款科目三">
          <a-input placeholder="请输入贷款科目三" v-decorator="['businessSubject3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款科目四">
          <a-input placeholder="请输入贷款科目四" v-decorator="['businessSubject4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款科目五">
          <a-input placeholder="请输入贷款科目五" v-decorator="['businessSubject5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠息日期">
          <a-input placeholder="请输入欠息日期" v-decorator="['calcDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最小欠息日">
          <a-input placeholder="请输入最小欠息日" v-decorator="['minCalcDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际用途">
          <a-input placeholder="请输入实际用途" v-decorator="['actualPurpose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计用途">
          <a-input placeholder="请输入统计用途" v-decorator="['statiPurpose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入日期">
          <a-input placeholder="请输入录入日期" v-decorator="['inputDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="更新日期">
          <a-input placeholder="请输入更新日期" v-decorator="['updateDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否投保">
          <a-input placeholder="请输入是否投保" v-decorator="['isInsure', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发生类型">
          <a-input placeholder="请输入发生类型" v-decorator="['occurType', {}]" />
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
          label="起息日期">
          <a-input placeholder="请输入起息日期" v-decorator="['qxDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号">
          <a-input placeholder="请输入账号" v-decorator="['acctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批准利率">
          <a-input placeholder="请输入批准利率" v-decorator="['appRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批准金额">
          <a-input placeholder="请输入批准金额" v-decorator="['appSum', {}]" />
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
          label="关联序号">
          <a-input placeholder="请输入关联序号" v-decorator="['businessDueId', validatorRules.businessDueId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编号，合同号">
          <a-input placeholder="请输入业务编号，合同号" v-decorator="['businessNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易编号">
          <a-input placeholder="请输入交易编号" v-decorator="['businessPhase', {}]" />
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
          label="五级分类关注金额">
          <a-input placeholder="请输入五级分类关注金额" v-decorator="['concernSum', {}]" />
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
          label="五级分类类型">
          <a-input placeholder="请输入五级分类类型" v-decorator="['fiveClassType', {}]" />
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
          label="四级状态">
          <a-input placeholder="请输入四级状态" v-decorator="['fourClassState', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息损失">
          <a-input placeholder="请输入利息损失" v-decorator="['interestlosingSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="征信提交次数">
          <a-input placeholder="请输入征信提交次数" v-decorator="['isSubmit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类损失金额">
          <a-input placeholder="请输入五级分类损失金额" v-decorator="['loseSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类正常金额">
          <a-input placeholder="请输入五级分类正常金额" v-decorator="['normalSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部门号交易编号">
          <a-input placeholder="请输入部门号交易编号" v-decorator="['orgId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类次级金额">
          <a-input placeholder="请输入五级分类次级金额" v-decorator="['secondarySum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放款起始日期">
          <a-input placeholder="请输入放款起始日期" v-decorator="['startDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="24个月还款状态">
          <a-input placeholder="请输入24个月还款状态" v-decorator="['stateOf24', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人证件类型">
          <a-input placeholder="请输入借款人证件类型" v-decorator="['borrowerZjlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人证件号码">
          <a-input placeholder="请输入借款人证件号码" v-decorator="['borrowerZjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同编号">
          <a-input placeholder="请输入合同编号" v-decorator="['contractId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率类型">
          <a-input placeholder="请输入利率类型" v-decorator="['intRateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基准利率">
          <a-input placeholder="请输入基准利率" v-decorator="['benchmarkRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动利率">
          <a-input placeholder="请输入浮动利率" v-decorator="['floatingInt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期利率">
          <a-input placeholder="请输入逾期利率" v-decorator="['overdueInt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次结息余额">
          <a-input placeholder="请输入上次结息余额" v-decorator="['preIntsetlBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收本金">
          <a-input placeholder="请输入实收本金" v-decorator="['totalOverAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收利息">
          <a-input placeholder="请输入实收利息" v-decorator="['totalOverIntr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收罚息">
          <a-input placeholder="请输入实收罚息" v-decorator="['totalOverPnintr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收复利">
          <a-input placeholder="请输入实收复利" v-decorator="['totalOverReintr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收本金">
          <a-input placeholder="请输入应收本金" v-decorator="['receAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收利息">
          <a-input placeholder="请输入应收利息" v-decorator="['receIntr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收罚息">
          <a-input placeholder="请输入应收罚息" v-decorator="['recePnintr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收复利">
          <a-input placeholder="请输入应收复利" v-decorator="['receReintr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销本金">
          <a-input placeholder="请输入核销本金" v-decorator="['disAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销利息">
          <a-input placeholder="请输入核销利息" v-decorator="['disIntr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销罚息">
          <a-input placeholder="请输入核销罚息" v-decorator="['disPnintr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销复利">
          <a-input placeholder="请输入核销复利" v-decorator="['disReintr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分类时间">
          <a-input placeholder="请输入分类时间" v-decorator="['fiveClassDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['appCurrency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期日期">
          <a-input placeholder="请输入展期日期" v-decorator="['extendDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分类调整日期">
          <a-input placeholder="请输入分类调整日期" v-decorator="['fiveAdjustDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="测算五级分类">
          <a-input placeholder="请输入测算五级分类" v-decorator="['fiveTypeCalc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正常转关注">
          <a-input placeholder="请输入正常转关注" v-decorator="['normToConc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正常转次级">
          <a-input placeholder="请输入正常转次级" v-decorator="['normToSeco', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正常转可疑">
          <a-input placeholder="请输入正常转可疑" v-decorator="['normToSusp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正常转损失">
          <a-input placeholder="请输入正常转损失" v-decorator="['normToLose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关注转次级">
          <a-input placeholder="请输入关注转次级" v-decorator="['concToSeco', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关注转可疑">
          <a-input placeholder="请输入关注转可疑" v-decorator="['concToSusp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关注转损失">
          <a-input placeholder="请输入关注转损失" v-decorator="['concToLose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="次级转可疑">
          <a-input placeholder="请输入次级转可疑" v-decorator="['secoToSusp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="次级转损失">
          <a-input placeholder="请输入次级转损失" v-decorator="['secoToLose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可疑转损失">
          <a-input placeholder="请输入可疑转损失" v-decorator="['suspToLose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关注转正常">
          <a-input placeholder="请输入关注转正常" v-decorator="['concToNorm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="次级转关注">
          <a-input placeholder="请输入次级转关注" v-decorator="['secoToConc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="次级转正常">
          <a-input placeholder="请输入次级转正常" v-decorator="['secoToNorm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可疑转次级">
          <a-input placeholder="请输入可疑转次级" v-decorator="['suspToSeco', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可疑转关注">
          <a-input placeholder="请输入可疑转关注" v-decorator="['suspToConc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可疑转正常">
          <a-input placeholder="请输入可疑转正常" v-decorator="['suspToNorm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="损失转可疑">
          <a-input placeholder="请输入损失转可疑" v-decorator="['loseToSusp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="损失转次级">
          <a-input placeholder="请输入损失转次级" v-decorator="['loseToSeco', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="损失转关注">
          <a-input placeholder="请输入损失转关注" v-decorator="['loseToConc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="损失转正常">
          <a-input placeholder="请输入损失转正常" v-decorator="['loseToNorm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分类调整类型">
          <a-input placeholder="请输入分类调整类型" v-decorator="['fiveAdjustType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类(手工)">
          <a-input placeholder="请输入五级分类(手工)" v-decorator="['fiveTypeManual', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方式">
          <a-input placeholder="请输入支付方式" v-decorator="['payMode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托支付账号">
          <a-input placeholder="请输入委托支付账号" v-decorator="['precPayAccount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总余额">
          <a-input placeholder="请输入总余额" v-decorator="['totleBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值日期">
          <a-input placeholder="请输入减值日期" v-decorator="['devalueDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值金额">
          <a-input placeholder="请输入减值金额" v-decorator="['devalueSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值类型">
          <a-input placeholder="请输入减值类型" v-decorator="['devalueType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值模式">
          <a-input placeholder="请输入减值模式" v-decorator="['devalueMode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否减值">
          <a-input placeholder="请输入是否减值" v-decorator="['isDevalue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注1">
          <a-input placeholder="请输入备注1" v-decorator="['remark1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注2">
          <a-input placeholder="请输入备注2" v-decorator="['remark2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向">
          <a-input placeholder="请输入贷款投向" v-decorator="['purposeType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向1">
          <a-input placeholder="请输入贷款投向1" v-decorator="['purposeType1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向2">
          <a-input placeholder="请输入贷款投向2" v-decorator="['purposeType2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向3">
          <a-input placeholder="请输入贷款投向3" v-decorator="['purposeType3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向4">
          <a-input placeholder="请输入贷款投向4" v-decorator="['purposeType4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向5">
          <a-input placeholder="请输入贷款投向5" v-decorator="['purposeType5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向6">
          <a-input placeholder="请输入贷款投向6" v-decorator="['purposeType6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向7">
          <a-input placeholder="请输入贷款投向7" v-decorator="['purposeType7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向8">
          <a-input placeholder="请输入贷款投向8" v-decorator="['purposeType8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否政府投融资平台">
          <a-input placeholder="请输入是否政府投融资平台" v-decorator="['isGovInvest', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府投融资明细">
          <a-input placeholder="请输入政府投融资明细" v-decorator="['govInvestDetail', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否战略性新兴产业">
          <a-input placeholder="请输入是否战略性新兴产业" v-decorator="['isTacticRising', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="战略性新兴产业明细">
          <a-input placeholder="请输入战略性新兴产业明细" v-decorator="['tacticRisingDetail', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="固定资产类型">
          <a-input placeholder="请输入固定资产类型" v-decorator="['fixedType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="固定资产类型1">
          <a-input placeholder="请输入固定资产类型1" v-decorator="['fixedType1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="固定资产类型2">
          <a-input placeholder="请输入固定资产类型2" v-decorator="['fixedType2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="固定资产类型3">
          <a-input placeholder="请输入固定资产类型3" v-decorator="['fixedType3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="固定资产类型4">
          <a-input placeholder="请输入固定资产类型4" v-decorator="['fixedType4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="催收登记日期">
          <a-input placeholder="请输入催收登记日期" v-decorator="['urgedSignDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类级别(十级)">
          <a-input placeholder="请输入五级分类级别(十级)" v-decorator="['fiveClassLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="代理机构号">
          <a-input placeholder="请输入代理机构号" v-decorator="['agentOrgId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="福祥便民卡号">
          <a-input placeholder="请输入福祥便民卡号" v-decorator="['cardNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付类型">
          <a-input placeholder="请输入支付类型" v-decorator="['precPayType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托支付人名称">
          <a-input placeholder="请输入委托支付人名称" v-decorator="['precPayName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托支付行号">
          <a-input placeholder="请输入委托支付行号" v-decorator="['precPayBankNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托支付行名">
          <a-input placeholder="请输入委托支付行名" v-decorator="['precPayBankCn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品大类">
          <a-input placeholder="请输入产品大类" v-decorator="['productType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品子类">
          <a-input placeholder="请输入产品子类" v-decorator="['productSubType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本金逾期日期">
          <a-input placeholder="请输入本金逾期日期" v-decorator="['overdueDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期次数">
          <a-input placeholder="请输入逾期次数" v-decorator="['dueCount', {}]" />
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
          label="加载时间">
          <a-input placeholder="请输入加载时间" v-decorator="['loadDate', {}]" />
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
    name: "DkywjjbModal",
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
        businessDueId:{rules: [{ required: true, message: '请输入关联序号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/dkywjjb/dkywjjb/add",
          edit: "/dkywjjb/dkywjjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataFlag','hxjjh','sid','yqbz','jzDate','suspiciousSum','userId','voucherNo','voucherFlow','voucherStatus','extendFlag','endDate','appTerm','loanKind','depositNo','businessSubject1','businessSubject2','businessSubject3','businessSubject4','businessSubject5','calcDate','minCalcDate','actualPurpose','statiPurpose','inputDate','updateDate','isInsure','occurType','businessKind','qxDate','acctNo','appRate','appSum','balance','businessDueId','businessNo','businessPhase','businessType','concernSum','custId','fiveClassType','fkId','fourClassState','interestlosingSum','isSubmit','loseSum','normalSum','orgId','secondarySum','startDate','stateOf24','borrowerZjlx','borrowerZjhm','contractId','intRateType','benchmarkRate','floatingInt','overdueInt','preIntsetlBal','totalOverAmt','totalOverIntr','totalOverPnintr','totalOverReintr','receAmt','receIntr','recePnintr','receReintr','disAmt','disIntr','disPnintr','disReintr','fiveClassDate','appCurrency','extendDate','fiveAdjustDate','fiveTypeCalc','normToConc','normToSeco','normToSusp','normToLose','concToSeco','concToSusp','concToLose','secoToSusp','secoToLose','suspToLose','concToNorm','secoToConc','secoToNorm','suspToSeco','suspToConc','suspToNorm','loseToSusp','loseToSeco','loseToConc','loseToNorm','fiveAdjustType','fiveTypeManual','payMode','precPayAccount','totleBalance','devalueDate','devalueSum','devalueType','devalueMode','isDevalue','remark1','remark2','purposeType','purposeType1','purposeType2','purposeType3','purposeType4','purposeType5','purposeType6','purposeType7','purposeType8','isGovInvest','govInvestDetail','isTacticRising','tacticRisingDetail','fixedType','fixedType1','fixedType2','fixedType3','fixedType4','urgedSignDate','fiveClassLevel','agentOrgId','cardNo','precPayType','precPayName','precPayBankNo','precPayBankCn','productType','productSubType','overdueDate','dueCount','sDate','eDate','loadDate','legalNo','dtnum'))
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