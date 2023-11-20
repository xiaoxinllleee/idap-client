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
          label="主键">
          <a-input placeholder="请输入主键" v-decorator="['key1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当日总存现金额">
          <a-input placeholder="请输入当日总存现金额" v-decorator="['todCdepTotAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当日总取现金额">
          <a-input placeholder="请输入当日总取现金额" v-decorator="['todCwdlTotAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通提密码标示">
          <a-input placeholder="请输入通提密码标示" v-decorator="['allBrInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通提密码">
          <a-input placeholder="请输入通提密码" v-decorator="['allBrPwd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通提密码尝试次数">
          <a-input placeholder="请输入通提密码尝试次数" v-decorator="['allBrPswdCtr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联存折状态">
          <a-input placeholder="请输入账户关联存折状态" v-decorator="['pbStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="印鉴挂失状态">
          <a-input placeholder="请输入印鉴挂失状态" v-decorator="['chopStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记录现金/转账的最新的业务日期">
          <a-input placeholder="请输入记录现金/转账的最新的业务日期" v-decorator="['cshBusDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="crTierInd">
          <a-input placeholder="请输入crTierInd" v-decorator="['crTierInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拒付支票次数">
          <a-input placeholder="请输入拒付支票次数" v-decorator="['chkDishonorCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取消支票次数">
          <a-input placeholder="请输入取消支票次数" v-decorator="['cancellChkCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银行存折版本号">
          <a-input placeholder="请输入银行存折版本号" v-decorator="['pbVerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="chaseFlag">
          <a-input placeholder="请输入chaseFlag" v-decorator="['chaseFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="台湾新光人寿保险单号码">
          <a-input placeholder="请输入台湾新光人寿保险单号码" v-decorator="['skliPoid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期账户账户层透支百分比率">
          <a-input placeholder="请输入定期账户账户层透支百分比率" v-decorator="['tdOdCollPct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期账户账户层定义,透支的借记利率加减点">
          <a-input placeholder="请输入定期账户账户层定义,透支的借记利率加减点" v-decorator="['tdOdMrglRte', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期账户金额冻结原因">
          <a-input placeholder="请输入定期账户金额冻结原因" v-decorator="['tdHoldOption', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期账户金额冻结原因">
          <a-input placeholder="请输入定期账户金额冻结原因" v-decorator="['tdHoldReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支票签约类型">
          <a-input placeholder="请输入支票签约类型" v-decorator="['chkAgrmntType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支票签约日期">
          <a-input placeholder="请输入支票签约日期" v-decorator="['signoffDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="即交互式语音应答访问标示">
          <a-input placeholder="请输入即交互式语音应答访问标示" v-decorator="['ivrAccessGrnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机银行访问标示">
          <a-input placeholder="请输入手机银行访问标示" v-decorator="['mbAccessGrnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网银访问准许标示">
          <a-input placeholder="请输入网银访问准许标示" v-decorator="['ibAccessGrnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定期账户财务产品码">
          <a-input placeholder="请输入定期账户财务产品码" v-decorator="['complexTd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ATM账户突出标志">
          <a-input placeholder="请输入ATM账户突出标志" v-decorator="['embossFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文件上传通知标志">
          <a-input placeholder="请输入文件上传通知标志" v-decorator="['clctUploadNtc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文件下载关闭标志">
          <a-input placeholder="请输入文件下载关闭标志" v-decorator="['clctDownloadCls', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支票黑名单日期">
          <a-input placeholder="请输入支票黑名单日期" v-decorator="['blacklistDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ATM卡状态">
          <a-input placeholder="请输入ATM卡状态" v-decorator="['atmCardStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="变更开户行后新的分行号">
          <a-input placeholder="请输入变更开户行后新的分行号" v-decorator="['newBranchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵消账户指示">
          <a-input placeholder="请输入抵消账户指示" v-decorator="['offsetAcctInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="补登最后打印的rec-no">
          <a-input placeholder="请输入补登最后打印的rec-no" v-decorator="['lastPrintRecno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最新维护日期">
          <a-input placeholder="请输入最新维护日期" v-decorator="['lastHousekeepDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Nostro BGL账户">
          <a-input placeholder="请输入Nostro BGL账户" v-decorator="['nostroBglAct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存折号">
          <a-input placeholder="请输入存折号" v-decorator="['pbNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存折已打印的行数（活期使用）">
          <a-input placeholder="请输入存折已打印的行数（活期使用）" v-decorator="['pbLineNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="abandonOffsetFl">
          <a-input placeholder="请输入abandonOffsetFl" v-decorator="['abandonOffsetFl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="termLstDeductdt">
          <a-input placeholder="请输入termLstDeductdt" v-decorator="['termLstDeductdt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="这个字段记录2009交易成功的最新日期">
          <a-input placeholder="请输入这个字段记录2009交易成功的最新日期" v-decorator="['deductSuccDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="这个字段记录2009交易成功转账的次数">
          <a-input placeholder="请输入这个字段记录2009交易成功转账的次数" v-decorator="['termDeductCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="这个字段记录2009交易失败的次数">
          <a-input placeholder="请输入这个字段记录2009交易失败的次数" v-decorator="['deductFailCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="fundType">
          <a-input placeholder="请输入fundType" v-decorator="['fundType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐户开户类型">
          <a-input placeholder="请输入帐户开户类型" v-decorator="['actOpenType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证明验证人员证件类型">
          <a-input placeholder="请输入证明验证人员证件类型" v-decorator="['cvoIdType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证明验证人员证件号码">
          <a-input placeholder="请输入证明验证人员证件号码" v-decorator="['cvoIdNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户发起人">
          <a-input placeholder="请输入账户发起人" v-decorator="['actPromoter', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="actPromoterSgmt">
          <a-input placeholder="请输入actPromoterSgmt" v-decorator="['actPromoterSgmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户利润代码">
          <a-input placeholder="请输入账户利润代码" v-decorator="['actProfitCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="2009交易转账金额">
          <a-input placeholder="请输入2009交易转账金额" v-decorator="['tdInstAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Purchase reference">
          <a-input placeholder="请输入Purchase reference" v-decorator="['complexPurchRef', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每日提转入款总额">
          <a-input placeholder="请输入每日提转入款总额" v-decorator="['tdyTrnsInTot', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每日提转出款总额">
          <a-input placeholder="请输入每日提转出款总额" v-decorator="['tdyTrnsOutTot', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="透支应付利息">
          <a-input placeholder="请输入透支应付利息" v-decorator="['odIntDue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="超出透支应付利息">
          <a-input placeholder="请输入超出透支应付利息" v-decorator="['odExcessIntDue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="swindleStat">
          <a-input placeholder="请输入swindleStat" v-decorator="['swindleStat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="srcOfFundCode">
          <a-input placeholder="请输入srcOfFundCode" v-decorator="['srcOfFundCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款原因代码">
          <a-input placeholder="请输入欠款原因代码" v-decorator="['arrReasonCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="discReasonCode">
          <a-input placeholder="请输入discReasonCode" v-decorator="['discReasonCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重空类型">
          <a-input placeholder="请输入重空类型" v-decorator="['voucherType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重空号码">
          <a-input placeholder="请输入重空号码" v-decorator="['voucherNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存折册号">
          <a-input placeholder="请输入存折册号" v-decorator="['pbVolumeNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存折序号">
          <a-input placeholder="请输入存折序号" v-decorator="['pbSequenceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金来源账户">
          <a-input placeholder="请输入资金来源账户" v-decorator="['tdFundFromAc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币代码">
          <a-input placeholder="请输入外币代码" v-decorator="['fcyCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算账户标示">
          <a-input placeholder="请输入结算账户标示" v-decorator="['acctInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址">
          <a-input placeholder="请输入地址" v-decorator="['address', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电话号码1">
          <a-input placeholder="请输入电话号码1" v-decorator="['tel1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电话号码2">
          <a-input placeholder="请输入电话号码2" v-decorator="['tel2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人姓名">
          <a-input placeholder="请输入联系人姓名" v-decorator="['contactName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮政编码">
          <a-input placeholder="请输入邮政编码" v-decorator="['postCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同编号">
          <a-input placeholder="请输入合同编号" v-decorator="['contractNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账协议编号">
          <a-input placeholder="请输入对账协议编号" v-decorator="['statAgrtNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['institution', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户管理协议编号">
          <a-input placeholder="请输入账户管理协议编号" v-decorator="['actMangtAgrtNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收支范围">
          <a-input placeholder="请输入收支范围" v-decorator="['inOutScope', {}]" />
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
          label="账户用法">
          <a-input placeholder="请输入账户用法" v-decorator="['acctUsage', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取现有效期">
          <a-input placeholder="请输入取现有效期" v-decorator="['cshWdlEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计取现限额">
          <a-input placeholder="请输入累计取现限额" v-decorator="['totCshWdlLmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务种类">
          <a-input placeholder="请输入业务种类" v-decorator="['busiType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商业号">
          <a-input placeholder="请输入商业号" v-decorator="['busiNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申报标识">
          <a-input placeholder="请输入申报标识" v-decorator="['declareInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户核准件编号">
          <a-input placeholder="请输入开户核准件编号" v-decorator="['apprNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币账户属性">
          <a-input placeholder="请输入外币账户属性" v-decorator="['fxAcctAttr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外汇限额编号">
          <a-input placeholder="请输入外汇限额编号" v-decorator="['fxAmtLmtCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外汇额度超限标识">
          <a-input placeholder="请输入外汇额度超限标识" v-decorator="['fxExcdInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="大额存款签定日期">
          <a-input placeholder="请输入大额存款签定日期" v-decorator="['amtAcctDepDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="大额存款期限">
          <a-input placeholder="请输入大额存款期限" v-decorator="['amtAcctEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款帐号">
          <a-input placeholder="请输入贷款帐号" v-decorator="['loadAcct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正对单周期">
          <a-input placeholder="请输入正对单周期" v-decorator="['positivePeriod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正对单打印循环">
          <a-input placeholder="请输入正对单打印循环" v-decorator="['positiveCircular', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正对单打印日">
          <a-input placeholder="请输入正对单打印日" v-decorator="['positiveDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正对单份数">
          <a-input placeholder="请输入正对单份数" v-decorator="['positiveCopyNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否发送正对单标示">
          <a-input placeholder="请输入是否发送正对单标示" v-decorator="['positiveMailInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可付利息">
          <a-input placeholder="请输入可付利息" v-decorator="['intPayable', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人民币结算账户属性">
          <a-input placeholder="请输入人民币结算账户属性" v-decorator="['lcySetlAcctAttr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取息频率">
          <a-input placeholder="请输入取息频率" v-decorator="['whdIntFreq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实存次数">
          <a-input placeholder="请输入实存次数" v-decorator="['realDepCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次存入金额">
          <a-input placeholder="请输入首次存入金额" v-decorator="['firstDepAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否违约标示">
          <a-input placeholder="请输入是否违约标示" v-decorator="['breakRuleInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结息周期内的利息金额">
          <a-input placeholder="请输入结息周期内的利息金额" v-decorator="['intForIntDep', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户最新财务交易日期">
          <a-input placeholder="请输入账户最新财务交易日期" v-decorator="['lstNorTxnDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="止取数目">
          <a-input placeholder="请输入止取数目" v-decorator="['noOfStopWdl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="止存数目">
          <a-input placeholder="请输入止存数目" v-decorator="['noOfStopDep', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国债账户标示">
          <a-input placeholder="请输入国债账户标示" v-decorator="['ngbAcctInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国债预开户标示">
          <a-input placeholder="请输入国债预开户标示" v-decorator="['ngbPrevOpenInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国债代码">
          <a-input placeholder="请输入国债代码" v-decorator="['ngbCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户许可证编号">
          <a-input placeholder="请输入开户许可证编号" v-decorator="['acctOpenPemtNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核准号">
          <a-input placeholder="请输入核准号" v-decorator="['aprlNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人行核准日期">
          <a-input placeholder="请输入人行核准日期" v-decorator="['aprlDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户启用日期">
          <a-input placeholder="请输入账户启用日期" v-decorator="['acctEfctDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户层边际利率百分比">
          <a-input placeholder="请输入账户层边际利率百分比" v-decorator="['acctPctMgnRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部提次数">
          <a-input placeholder="请输入部提次数" v-decorator="['partialWdlCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付息方式">
          <a-input placeholder="请输入付息方式" v-decorator="['intPaid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="协定金额">
          <a-input placeholder="请输入协定金额" v-decorator="['contractAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="协定金额">
          <a-input placeholder="请输入协定金额" v-decorator="['payMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对公账户截止日期">
          <a-input placeholder="请输入对公账户截止日期" v-decorator="['endDateCorpAcct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对公账户自动冻结到期日">
          <a-input placeholder="请输入对公账户自动冻结到期日" v-decorator="['expDateAutoFrz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="违约后存款日期">
          <a-input placeholder="请输入违约后存款日期" v-decorator="['depDateAfBreak', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="违约后总金额">
          <a-input placeholder="请输入违约后总金额" v-decorator="['totAmtAfBreak', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['contractNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部提金额">
          <a-input placeholder="请输入部提金额" v-decorator="['partialWdlAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="如无交易,是否发送印刷版对账单">
          <a-input placeholder="请输入如无交易,是否发送印刷版对账单" v-decorator="['stateNoTxn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送电子对账单标示">
          <a-input placeholder="请输入发送电子对账单标示" v-decorator="['statMailingInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计余额">
          <a-input placeholder="请输入累计余额" v-decorator="['defaultBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每日累计余额">
          <a-input placeholder="请输入每日累计余额" v-decorator="['dailyAccuBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计天数">
          <a-input placeholder="请输入累计天数" v-decorator="['daysAccum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可用利息">
          <a-input placeholder="请输入可用利息" v-decorator="['contractIntAvab', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息增量">
          <a-input placeholder="请输入利息增量" v-decorator="['contractIntIncr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="延期储蓄利息">
          <a-input placeholder="请输入延期储蓄利息" v-decorator="['delaySavingInt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主/子账户标示">
          <a-input placeholder="请输入主/子账户标示" v-decorator="['mcaInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户总支取金额">
          <a-input placeholder="请输入账户总支取金额" v-decorator="['totCshWdl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户交易日">
          <a-input placeholder="请输入开户交易日" v-decorator="['acctOpenTrnDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关闭激活原因">
          <a-input placeholder="请输入关闭激活原因" v-decorator="['closeActvReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支票密码类型">
          <a-input placeholder="请输入支票密码类型" v-decorator="['chqPasswrdType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时户到期日">
          <a-input placeholder="请输入临时户到期日" v-decorator="['tempAcctExpDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年审日期">
          <a-input placeholder="请输入年审日期" v-decorator="['annlReviewDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冻结到期日">
          <a-input placeholder="请输入冻结到期日" v-decorator="['freezeExpDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Third level accounting">
          <a-input placeholder="请输入Third level accounting" v-decorator="['thrdLvlAccount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Vostro账户最低利率">
          <a-input placeholder="请输入Vostro账户最低利率" v-decorator="['cccdaVostroLow', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币项目（对公使用）">
          <a-input placeholder="请输入外币项目（对公使用）" v-decorator="['fcyItem', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币种类">
          <a-input placeholder="请输入外币种类" v-decorator="['fcyClass', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币范围">
          <a-input placeholder="请输入外币范围" v-decorator="['fcyRange', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取消需罚息金额部分的利息">
          <a-input placeholder="请输入取消需罚息金额部分的利息" v-decorator="['ntcCnclIntPen', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="阈值">
          <a-input placeholder="请输入阈值" v-decorator="['nrdaThresholdAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币关户号">
          <a-input placeholder="请输入外币关户号" v-decorator="['fcyClosureNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="零存整取标示">
          <a-input placeholder="请输入零存整取标示" v-decorator="['noFailInstal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许支取利息">
          <a-input placeholder="请输入允许支取利息" v-decorator="['intAllowWithd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主账户标示">
          <a-input placeholder="请输入主账户标示" v-decorator="['primAcctFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款重空日期">
          <a-input placeholder="请输入存款重空日期" v-decorator="['firstDepIbdDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="页码">
          <a-input placeholder="请输入页码" v-decorator="['pageNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="从1999-11-1至到期日利息税">
          <a-input placeholder="请输入从1999-11-1至到期日利息税" v-decorator="['int1999ToTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次使用的存折类型">
          <a-input placeholder="请输入上次使用的存折类型" v-decorator="['lastPbType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次使用的存折号码">
          <a-input placeholder="请输入上次使用的存折号码" v-decorator="['lastPbNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="费用累计标示">
          <a-input placeholder="请输入费用累计标示" v-decorator="['chrAccuInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="零售贷款 -自助贷款">
          <a-input placeholder="请输入零售贷款 -自助贷款" v-decorator="['selfServLoan', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户类型">
          <a-input placeholder="请输入账户类型" v-decorator="['isoAcctType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户连接卡标示">
          <a-input placeholder="请输入账户连接卡标示" v-decorator="['cardLinkFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户原到期日">
          <a-input placeholder="请输入账户原到期日" v-decorator="['orinMatDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="绿色账户标识">
          <a-input placeholder="请输入绿色账户标识" v-decorator="['greenAcctInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="绿色账户到期日">
          <a-input placeholder="请输入绿色账户到期日" v-decorator="['greenExpiryDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重空省代码（地区码）">
          <a-input placeholder="请输入重空省代码（地区码）" v-decorator="['ibdProvinceCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存折更新册号">
          <a-input placeholder="请输入存折更新册号" v-decorator="['pbRenewVolume', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取现有效期">
          <a-input placeholder="请输入取现有效期" v-decorator="['cashWdlExpDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特殊转账限制标示">
          <a-input placeholder="请输入特殊转账限制标示" v-decorator="['tfrRestFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="股金存折已打印行数">
          <a-input placeholder="请输入股金存折已打印行数" v-decorator="['pbDivLineNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="maxFreezeSeqNo">
          <a-input placeholder="请输入maxFreezeSeqNo" v-decorator="['maxFreezeSeqNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户最近维护日期">
          <a-input placeholder="请输入账户最近维护日期" v-decorator="['lastMaintDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户最近维护标识">
          <a-input placeholder="请输入账户最近维护标识" v-decorator="['lastMaintStat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sdate">
          <a-input placeholder="请输入sDate" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eDate">
          <a-input placeholder="请输入eDate" v-decorator="['edate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dataDate">
          <a-input placeholder="请输入dataDate" v-decorator="['dataDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="loadDate">
          <a-input placeholder="请输入loadDate" v-decorator="['loadDate', {}]" />
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
    name: "CktzbModal",
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
          add: "/cktzb/cktzb/add",
          edit: "/cktzb/cktzb/edit",
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
          this.form.setFieldsValue(pick(this.model,'key1','todCdepTotAmt','todCwdlTotAmt','allBrInd','allBrPwd','allBrPswdCtr','pbStatus','chopStatus','cshBusDate','crTierInd','chkDishonorCnt','cancellChkCnt','pbVerNo','chaseFlag','skliPoid','tdOdCollPct','tdOdMrglRte','tdHoldOption','tdHoldReason','chkAgrmntType','signoffDate','ivrAccessGrnt','mbAccessGrnt','ibAccessGrnt','complexTd','embossFlag','clctUploadNtc','clctDownloadCls','blacklistDate','atmCardStatus','newBranchNo','offsetAcctInd','lastPrintRecno','lastHousekeepDt','nostroBglAct','pbNumber','pbLineNo','abandonOffsetFl','termLstDeductdt','deductSuccDate','termDeductCnt','deductFailCnt','fundType','actOpenType','cvoIdType','cvoIdNo','actPromoter','actPromoterSgmt','actProfitCode','tdInstAmt','complexPurchRef','tdyTrnsInTot','tdyTrnsOutTot','odIntDue','odExcessIntDue','swindleStat','srcOfFundCode','arrReasonCode','discReasonCode','voucherType','voucherNo','pbVolumeNo','pbSequenceNo','tdFundFromAc','fcyCode','acctInd','address','tel1','tel2','contactName','postCode','contractNum','statAgrtNum','institution','actMangtAgrtNum','inOutScope','remark','acctUsage','cshWdlEndDate','totCshWdlLmt','busiType','busiNum','declareInd','apprNum','fxAcctAttr','fxAmtLmtCode','fxExcdInd','amtAcctDepDate','amtAcctEndDate','loadAcct','positivePeriod','positiveCircular','positiveDay','positiveCopyNum','positiveMailInd','intPayable','lcySetlAcctAttr','whdIntFreq','realDepCnt','firstDepAmt','breakRuleInd','intForIntDep','lstNorTxnDt','noOfStopWdl','noOfStopDep','ngbAcctInd','ngbPrevOpenInd','ngbCode','acctOpenPemtNo','aprlNo','aprlDate','acctEfctDate','acctPctMgnRate','partialWdlCnt','intPaid','contractAmt','payMethod','endDateCorpAcct','expDateAutoFrz','depDateAfBreak','totAmtAfBreak','contractNo','partialWdlAmt','stateNoTxn','statMailingInd','defaultBal','dailyAccuBal','daysAccum','contractIntAvab','contractIntIncr','delaySavingInt','mcaInd','totCshWdl','acctOpenTrnDt','closeActvReason','chqPasswrdType','tempAcctExpDt','annlReviewDate','freezeExpDate','thrdLvlAccount','cccdaVostroLow','fcyItem','fcyClass','fcyRange','ntcCnclIntPen','nrdaThresholdAmt','fcyClosureNumber','noFailInstal','intAllowWithd','primAcctFlag','firstDepIbdDt','pageNo','int1999ToTerm','lastPbType','lastPbNumber','chrAccuInd','selfServLoan','isoAcctType','cardLinkFlag','orinMatDt','greenAcctInd','greenExpiryDt','ibdProvinceCode','pbRenewVolume','cashWdlExpDate','tfrRestFlag','pbDivLineNo','maxFreezeSeqNo','lastMaintDate','lastMaintStat','sdate','edate','dataDate','loadDate','legalNo','dtnum'))
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