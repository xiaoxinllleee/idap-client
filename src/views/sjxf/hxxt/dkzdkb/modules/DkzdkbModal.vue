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
          label="数据日期">
          <a-input placeholder="请输入数据日期" v-decorator="['dataDate', {}]" />
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
          label="客户号">
          <a-input placeholder="请输入客户号" v-decorator="['custId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构码">
          <a-input placeholder="请输入机构码" v-decorator="['brNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <a-input placeholder="请输入机构名称" v-decorator="['brName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户名">
          <a-input placeholder="请输入户名" v-decorator="['custName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['identType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['identNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号(17位)">
          <a-input placeholder="请输入贷款账号(17位)" v-decorator="['acctNo', validatorRules.acctNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷拮据号">
          <a-input placeholder="请输入信贷拮据号" v-decorator="['voucherNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['businessNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款日期">
          <a-input placeholder="请输入借款日期" v-decorator="['qxDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日">
          <a-input placeholder="请输入到期日" v-decorator="['endDate', {}]" />
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
          label="剩余天数">
          <a-input placeholder="请输入剩余天数" v-decorator="['remainingDays', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率">
          <a-input placeholder="请输入利率" v-decorator="['intRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款金额">
          <a-input placeholder="请输入贷款金额" v-decorator="['applicAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放款金额">
          <a-input placeholder="请输入放款金额" v-decorator="['advVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['loanBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起息日">
          <a-input placeholder="请输入起息日" v-decorator="['intStrtDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结息日">
          <a-input placeholder="请输入结息日" v-decorator="['repayDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品大类">
          <a-input placeholder="请输入产品大类" v-decorator="['tfMcaSubAcctTp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品小类">
          <a-input placeholder="请输入产品小类" v-decorator="['tfMcaSubIntCat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品名称">
          <a-input placeholder="请输入产品名称" v-decorator="['catTypeName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型">
          <a-input placeholder="请输入客户类型" v-decorator="['custType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户所属行业类型">
          <a-input placeholder="请输入客户所属行业类型" v-decorator="['mainIndustry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业规模">
          <a-input placeholder="请输入企业规模" v-decorator="['entScale', {}]" />
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
          label="扣款户名">
          <a-input placeholder="请输入扣款户名" v-decorator="['payCustName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款账户余额">
          <a-input placeholder="请输入还款账户余额" v-decorator="['payAcctBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类调整日期">
          <a-input placeholder="请输入五级分类调整日期" v-decorator="['fiveAdjustDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款形态">
          <a-input placeholder="请输入贷款形态" v-decorator="['fiveClassType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式">
          <a-input placeholder="请输入担保方式" v-decorator="['vouchType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人">
          <a-input placeholder="请输入第一责任人" v-decorator="['custCn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最终审批人">
          <a-input placeholder="请输入最终审批人" v-decorator="['dutyCustId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最终审批人name">
          <a-input placeholder="请输入最终审批人name" v-decorator="['employeeName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户电话">
          <a-input placeholder="请输入客户电话" v-decorator="['linkmanTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户地址">
          <a-input placeholder="请输入客户地址" v-decorator="['addr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账户欠息">
          <a-input placeholder="请输入贷款账户欠息" v-decorator="['oweInterest', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放款账号">
          <a-input placeholder="请输入放款账号" v-decorator="['trfAcctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="便民卡卡号">
          <a-input placeholder="请输入便民卡卡号" v-decorator="['cardNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款方式">
          <a-input placeholder="请输入还款方式" v-decorator="['repaySched', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款总期数">
          <a-input placeholder="请输入贷款总期数" v-decorator="['loanTrm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良贷款标识">
          <a-input placeholder="请输入不良贷款标识" v-decorator="['badDebtInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品代码">
          <a-input placeholder="请输入产品代码" v-decorator="['actType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子[P],未还本金13523拖欠本金">
          <a-input placeholder="请输入桶子[P],未还本金13523拖欠本金" v-decorator="['unpdPrinBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子[I],拖欠利息结息交易13509">
          <a-input placeholder="请输入桶子[I],拖欠利息结息交易13509" v-decorator="['capUnpdInt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子[A],FINE2利息罚息结息交易11721">
          <a-input placeholder="请输入桶子[A],FINE2利息罚息结息交易11721" v-decorator="['unpdArrsIntBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['curr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息计提,每日增加一个增量,结息清零">
          <a-input placeholder="请输入利息计提,每日增加一个增量,结息清零" v-decorator="['intAccr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拖欠本金">
          <a-input placeholder="请输入拖欠本金" v-decorator="['unpdArrPrnBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本金罚息计提">
          <a-input placeholder="请输入本金罚息计提" v-decorator="['arrIntAccr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息罚息计提">
          <a-input placeholder="请输入利息罚息计提" v-decorator="['fine2IntAccr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠本罚息">
          <a-input placeholder="请输入欠本罚息" v-decorator="['unpdIntArrPrn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复利应计利息,结息时加入到桶子[E]bois.unpd_int_arr_prn">
          <a-input placeholder="请输入复利应计利息,结息时加入到桶子[E]bois.unpd_int_arr_prn" v-decorator="['fine4IntAccr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本金核算码">
          <a-input placeholder="请输入本金核算码" v-decorator="['glClassCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同金额">
          <a-input placeholder="请输入合同金额" v-decorator="['appSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应计利息">
          <a-input placeholder="请输入应计利息" v-decorator="['intIncr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否停止计息">
          <a-input placeholder="请输入是否停止计息" v-decorator="['stopAccrual', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="科目号">
          <a-input placeholder="请输入科目号" v-decorator="['subjNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="科目号名称">
          <a-input placeholder="请输入科目号名称" v-decorator="['subjName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后金融交易日期">
          <a-input placeholder="请输入最后金融交易日期" v-decorator="['lstFinDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指该贷款账户的建立是由哪个或有账户来的(垫款贷款)">
          <a-input placeholder="请输入指该贷款账户的建立是由哪个或有账户来的(垫款贷款)" v-decorator="['ctaReference', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号(16位)">
          <a-input placeholder="请输入贷款账号(16位)" v-decorator="['accNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期前产品子类">
          <a-input placeholder="请输入展期前产品子类" v-decorator="['currIntCat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期后产品子类">
          <a-input placeholder="请输入展期后产品子类" v-decorator="['newIntCat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期后产品代码">
          <a-input placeholder="请输入展期后产品代码" v-decorator="['newAcctType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期前产品代码">
          <a-input placeholder="请输入展期前产品代码" v-decorator="['currAcctType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期前到期日">
          <a-input placeholder="请输入展期前到期日" v-decorator="['currExpDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期后到期日">
          <a-input placeholder="请输入展期后到期日" v-decorator="['newExpDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重整批准日期,交易当天">
          <a-input placeholder="请输入重整批准日期,交易当天" v-decorator="['approveDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期原利率">
          <a-input placeholder="请输入展期原利率" v-decorator="['oldRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期标志">
          <a-input placeholder="请输入展期标志" v-decorator="['expFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销本金">
          <a-input placeholder="请输入核销本金" v-decorator="['glBucketDue01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销利息">
          <a-input placeholder="请输入核销利息" v-decorator="['glBucketDue02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销罚息3">
          <a-input placeholder="请输入核销罚息3" v-decorator="['glBucketDue03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销罚息4">
          <a-input placeholder="请输入核销罚息4" v-decorator="['glBucketDue04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销罚息5">
          <a-input placeholder="请输入核销罚息5" v-decorator="['glBucketDue05', {}]" />
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
          label="置换旧账号">
          <a-input placeholder="请输入置换旧账号" v-decorator="['reOldAcctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本金置换日期">
          <a-input placeholder="请输入本金置换日期" v-decorator="['prnReDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息置换日期">
          <a-input placeholder="请输入利息置换日期" v-decorator="['intReDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本金置换金额">
          <a-input placeholder="请输入本金置换金额" v-decorator="['prnReAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息置换金额">
          <a-input placeholder="请输入利息置换金额" v-decorator="['intReAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款还款金额">
          <a-input placeholder="请输入贷款还款金额" v-decorator="['dueAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原贷款还款金额">
          <a-input placeholder="请输入原贷款还款金额" v-decorator="['oldDueAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原贷款总期数">
          <a-input placeholder="请输入原贷款总期数" v-decorator="['oldLoanTrm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金协议号">
          <a-input placeholder="请输入资金协议号" v-decorator="['fundAgrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销日期">
          <a-input placeholder="请输入核销日期" v-decorator="['badDebtTrfDte', {}]" />
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
          label="合同约定发放日">
          <a-input placeholder="请输入合同约定发放日" v-decorator="['contractPutOutDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同约定到期日">
          <a-input placeholder="请输入合同约定到期日" v-decorator="['contractMaturity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同批准日期">
          <a-input placeholder="请输入合同批准日期" v-decorator="['appDate', {}]" />
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
          label="申请币种">
          <a-input placeholder="请输入申请币种" v-decorator="['applyCurrency', {}]" />
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
          label="信贷贷款品种">
          <a-input placeholder="请输入信贷贷款品种" v-decorator="['businessPhase', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类调整日期">
          <a-input placeholder="请输入五级分类调整日期" v-decorator="['fiveClassDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余期数">
          <a-input placeholder="请输入剩余期数" v-decorator="['remRepays', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户状态">
          <a-input placeholder="请输入账户状态" v-decorator="['stat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拖欠本金">
          <a-input placeholder="请输入拖欠本金" v-decorator="['oweAmtP', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拖欠利息">
          <a-input placeholder="请输入拖欠利息" v-decorator="['oweAmtI', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本金罚息">
          <a-input placeholder="请输入本金罚息" v-decorator="['oweAmtW', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息罚息">
          <a-input placeholder="请输入利息罚息" v-decorator="['oweAmtA', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拖欠复利">
          <a-input placeholder="请输入拖欠复利" v-decorator="['oweAmtE', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应计本金">
          <a-input placeholder="请输入应计本金" v-decorator="['bucketCdeP', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应计本金的利息">
          <a-input placeholder="请输入应计本金的利息" v-decorator="['bucketCdeI', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应计本金的罚息">
          <a-input placeholder="请输入应计本金的罚息" v-decorator="['bucketCdeW', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应计利息的罚息">
          <a-input placeholder="请输入应计利息的罚息" v-decorator="['bucketCdeA', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应计利息的复利">
          <a-input placeholder="请输入应计利息的复利" v-decorator="['bucketCdeE', {}]" />
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
          label="autoDbtAcctNo">
          <a-input placeholder="请输入autoDbtAcctNo" v-decorator="['autoDbtAcctNo', {}]" />
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
    name: "DkzdkbModal",
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
        acctNo:{rules: [{ required: true, message: '请输入贷款账号(17位)!' }]},
        legalNo:{rules: [{ required: true, message: '请输入法人标识!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/dkzdkb/dkzdkb/add",
          edit: "/dkzdkb/dkzdkb/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataDate','loadDate','custId','brNo','brName','custName','identType','identNo','acctNo','voucherNo','businessNo','qxDate','endDate','loanKind','remainingDays','intRate','applicAmount','advVal','loanBal','intStrtDate','repayDay','tfMcaSubAcctTp','tfMcaSubIntCat','catTypeName','custType','mainIndustry','entScale','purposeType','payCustName','payAcctBal','fiveAdjustDate','fiveClassType','vouchType','custCn','dutyCustId','employeeName','linkmanTel','addr','oweInterest','trfAcctNo','cardNo','repaySched','loanTrm','badDebtInd','actType','unpdPrinBal','capUnpdInt','unpdArrsIntBal','curr','intAccr','unpdArrPrnBal','arrIntAccr','fine2IntAccr','unpdIntArrPrn','fine4IntAccr','glClassCode','appSum','intIncr','stopAccrual','subjNo','subjName','lstFinDate','ctaReference','accNo','currIntCat','newIntCat','newAcctType','currAcctType','currExpDate','newExpDate','approveDt','oldRate','expFlag','glBucketDue01','glBucketDue02','glBucketDue03','glBucketDue04','glBucketDue05','appPutOutDate','appMaturityDate','reOldAcctNo','prnReDate','intReDate','prnReAmount','intReAmount','dueAmt','oldDueAmt','oldLoanTrm','fundAgrNo','badDebtTrfDte','signDate','contractPutOutDate','contractMaturity','appDate','orgId','applyCurrency','appTerm','businessPhase','fiveClassDate','remRepays','stat','oweAmtP','oweAmtI','oweAmtW','oweAmtA','oweAmtE','bucketCdeP','bucketCdeI','bucketCdeW','bucketCdeA','bucketCdeE','legalNo','dtnum','autoDbtAcctNo'))
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