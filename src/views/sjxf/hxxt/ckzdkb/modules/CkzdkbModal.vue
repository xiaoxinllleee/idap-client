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
          label="accNo">
          <a-input placeholder="请输入accNo" v-decorator="['accNo', validatorRules.accNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctOpenDt">
          <a-input placeholder="请输入acctOpenDt" v-decorator="['acctOpenDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctType">
          <a-input placeholder="请输入acctType" v-decorator="['acctType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="intCat">
          <a-input placeholder="请输入intCat" v-decorator="['intCat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="productCode">
          <a-input placeholder="请输入productCode" v-decorator="['productCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="productName">
          <a-input placeholder="请输入productName" v-decorator="['productName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="mastAcct">
          <a-input placeholder="请输入mastAcct" v-decorator="['mastAcct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subAcctNo">
          <a-input placeholder="请输入subAcctNo" v-decorator="['subAcctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="custName">
          <a-input placeholder="请输入custName" v-decorator="['custName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="identType">
          <a-input placeholder="请输入identType" v-decorator="['identType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="identNo">
          <a-input placeholder="请输入identNo" v-decorator="['identNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subAcctCode">
          <a-input placeholder="请输入subAcctCode" v-decorator="['subAcctCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subAcctCurr">
          <a-input placeholder="请输入subAcctCurr" v-decorator="['subAcctCurr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subAcctCurrType">
          <a-input placeholder="请输入subAcctCurrType" v-decorator="['subAcctCurrType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="mcaInd">
          <a-input placeholder="请输入mcaInd" v-decorator="['mcaInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="fromTab">
          <a-input placeholder="请输入fromTab" v-decorator="['fromTab', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="voucherType">
          <a-input placeholder="请输入voucherType" v-decorator="['voucherType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="voucherNo">
          <a-input placeholder="请输入voucherNo" v-decorator="['voucherNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pbVolumeNo">
          <a-input placeholder="请输入pbVolumeNo" v-decorator="['pbVolumeNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pbSequenceNo">
          <a-input placeholder="请输入pbSequenceNo" v-decorator="['pbSequenceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="defaultBal">
          <a-input placeholder="请输入defaultBal" v-decorator="['defaultBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="branchNo">
          <a-input placeholder="请输入branchNo" v-decorator="['branchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="branchName">
          <a-input placeholder="请输入branchName" v-decorator="['branchName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="currStatus">
          <a-input placeholder="请输入currStatus" v-decorator="['currStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="currency">
          <a-input placeholder="请输入currency" v-decorator="['currency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="currBal">
          <a-input placeholder="请输入currBal" v-decorator="['currBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="customerNo">
          <a-input placeholder="请输入customerNo" v-decorator="['customerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="belongCusttype">
          <a-input placeholder="请输入belongCusttype" v-decorator="['belongCusttype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="belongCustdesc">
          <a-input placeholder="请输入belongCustdesc" v-decorator="['belongCustdesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="savingType">
          <a-input placeholder="请输入savingType" v-decorator="['savingType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="savinDesc">
          <a-input placeholder="请输入savinDesc" v-decorator="['savinDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="productNo">
          <a-input placeholder="请输入productNo" v-decorator="['productNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctName">
          <a-input placeholder="请输入acctName" v-decorator="['acctName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lstFinDt">
          <a-input placeholder="请输入lstFinDt" v-decorator="['lstFinDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="crStoreRate">
          <a-input placeholder="请输入crStoreRate" v-decorator="['crStoreRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctPctMgnRate">
          <a-input placeholder="请输入acctPctMgnRate" v-decorator="['acctPctMgnRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subjNo">
          <a-input placeholder="请输入subjNo" v-decorator="['subjNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subjName">
          <a-input placeholder="请输入subjName" v-decorator="['subjName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="glClassCode">
          <a-input placeholder="请输入glClassCode" v-decorator="['glClassCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="intFrmDt">
          <a-input placeholder="请输入intFrmDt" v-decorator="['intFrmDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="intToDt">
          <a-input placeholder="请输入intToDt" v-decorator="['intToDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="rate">
          <a-input placeholder="请输入rate" v-decorator="['rate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subAcctOut">
          <a-input placeholder="请输入subAcctOut" v-decorator="['subAcctOut', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="endDate">
          <a-input placeholder="请输入endDate" v-decorator="['endDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="contractBaseId">
          <a-input placeholder="请输入contractBaseId" v-decorator="['contractBaseId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="contractRateId">
          <a-input placeholder="请输入contractRateId" v-decorator="['contractRateId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acNo">
          <a-input placeholder="请输入acNo" v-decorator="['acNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctEfctDate">
          <a-input placeholder="请输入acctEfctDate" v-decorator="['acctEfctDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="annlReviewDate">
          <a-input placeholder="请输入annlReviewDate" v-decorator="['annlReviewDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="aprlNo">
          <a-input placeholder="请输入aprlNo" v-decorator="['aprlNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="breakRuleInd">
          <a-input placeholder="请输入breakRuleInd" v-decorator="['breakRuleInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="cashWdlExpDate">
          <a-input placeholder="请输入cashWdlExpDate" v-decorator="['cashWdlExpDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="expDateAutoFrz">
          <a-input placeholder="请输入expDateAutoFrz" v-decorator="['expDateAutoFrz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="fcyCode">
          <a-input placeholder="请输入fcyCode" v-decorator="['fcyCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="firstDepAmt">
          <a-input placeholder="请输入firstDepAmt" v-decorator="['firstDepAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="greenAcctInd">
          <a-input placeholder="请输入greenAcctInd" v-decorator="['greenAcctInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="greenExpiryDt">
          <a-input placeholder="请输入greenExpiryDt" v-decorator="['greenExpiryDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="newBranchNo">
          <a-input placeholder="请输入newBranchNo" v-decorator="['newBranchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ngbAcctInd">
          <a-input placeholder="请输入ngbAcctInd" v-decorator="['ngbAcctInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="noOfStopDep">
          <a-input placeholder="请输入noOfStopDep" v-decorator="['noOfStopDep', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="noOfStopWdl">
          <a-input placeholder="请输入noOfStopWdl" v-decorator="['noOfStopWdl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="orinMatDt">
          <a-input placeholder="请输入orinMatDt" v-decorator="['orinMatDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="partialWdlAmt">
          <a-input placeholder="请输入partialWdlAmt" v-decorator="['partialWdlAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="partialWdlCnt">
          <a-input placeholder="请输入partialWdlCnt" v-decorator="['partialWdlCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="realDepCnt">
          <a-input placeholder="请输入realDepCnt" v-decorator="['realDepCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tempAcctExpDt">
          <a-input placeholder="请输入tempAcctExpDt" v-decorator="['tempAcctExpDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tfrRestFlag">
          <a-input placeholder="请输入tfrRestFlag" v-decorator="['tfrRestFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctTypeChgFlag">
          <a-input placeholder="请输入acctTypeChgFlag" v-decorator="['acctTypeChgFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="atmAcctFlag">
          <a-input placeholder="请输入atmAcctFlag" v-decorator="['atmAcctFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="chrExemProfile">
          <a-input placeholder="请输入chrExemProfile" v-decorator="['chrExemProfile', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="crTierGrpId">
          <a-input placeholder="请输入crTierGrpId" v-decorator="['crTierGrpId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="freezeExpDate">
          <a-input placeholder="请输入freezeExpDate" v-decorator="['freezeExpDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="holdVal">
          <a-input placeholder="请输入holdVal" v-decorator="['holdVal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="intAvailable">
          <a-input placeholder="请输入intAvailable" v-decorator="['intAvailable', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="typeIntAccr">
          <a-input placeholder="请输入typeIntAccr" v-decorator="['typeIntAccr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="termManRollNo">
          <a-input placeholder="请输入termManRollNo" v-decorator="['termManRollNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="noOfHolds">
          <a-input placeholder="请输入noOfHolds" v-decorator="['noOfHolds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="noOfStops">
          <a-input placeholder="请输入noOfStops" v-decorator="['noOfStops', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="odArea">
          <a-input placeholder="请输入odArea" v-decorator="['odArea', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="odLinkInd">
          <a-input placeholder="请输入odLinkInd" v-decorator="['odLinkInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="odVisaArea">
          <a-input placeholder="请输入odVisaArea" v-decorator="['odVisaArea', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sweepAcctFlag">
          <a-input placeholder="请输入sweepAcctFlag" v-decorator="['sweepAcctFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="telrAcctProd">
          <a-input placeholder="请输入telrAcctProd" v-decorator="['telrAcctProd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="trfAcctNo">
          <a-input placeholder="请输入trfAcctNo" v-decorator="['trfAcctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="varIntRate">
          <a-input placeholder="请输入varIntRate" v-decorator="['varIntRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="withTaxType">
          <a-input placeholder="请输入withTaxType" v-decorator="['withTaxType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="fcyCashTrf">
          <a-input placeholder="请输入fcyCashTrf" v-decorator="['fcyCashTrf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lcyAcctType">
          <a-input placeholder="请输入lcyAcctType" v-decorator="['lcyAcctType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="odIndicator">
          <a-input placeholder="请输入odIndicator" v-decorator="['odIndicator', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="productInd">
          <a-input placeholder="请输入productInd" v-decorator="['productInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="termBasis">
          <a-input placeholder="请输入termBasis" v-decorator="['termBasis', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="termDaysMax">
          <a-input placeholder="请输入termDaysMax" v-decorator="['termDaysMax', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctGrp">
          <a-input placeholder="请输入acctGrp" v-decorator="['acctGrp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctDesc">
          <a-input placeholder="请输入acctDesc" v-decorator="['acctDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sIntFrmDt">
          <a-input placeholder="请输入sIntFrmDt" v-decorator="['sIntFrmDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="inoutFlag">
          <a-input placeholder="请输入inoutFlag" v-decorator="['inoutFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="drIntAdjustment">
          <a-input placeholder="请输入drIntAdjustment" v-decorator="['drIntAdjustment', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="fccCiAdjAccr">
          <a-input placeholder="请输入fccCiAdjAccr" v-decorator="['fccCiAdjAccr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="trmIntAccr">
          <a-input placeholder="请输入trmIntAccr" v-decorator="['trmIntAccr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="contractIntIncr">
          <a-input placeholder="请输入contractIntIncr" v-decorator="['contractIntIncr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="acctDescDepp">
          <a-input placeholder="请输入acctDescDepp" v-decorator="['acctDescDepp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="crSopDate">
          <a-input placeholder="请输入crSopDate" v-decorator="['crSopDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="drEopDate">
          <a-input placeholder="请输入drEopDate" v-decorator="['drEopDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="crIdDet">
          <a-input placeholder="请输入crIdDet" v-decorator="['crIdDet', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lstMntDt">
          <a-input placeholder="请输入lstMntDt" v-decorator="['lstMntDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lstCustCrDt">
          <a-input placeholder="请输入lstCustCrDt" v-decorator="['lstCustCrDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lstCustDrDt">
          <a-input placeholder="请输入lstCustDrDt" v-decorator="['lstCustDrDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="netAvBalYtd">
          <a-input placeholder="请输入netAvBalYtd" v-decorator="['netAvBalYtd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="netAvNoYtd">
          <a-input placeholder="请输入netAvNoYtd" v-decorator="['netAvNoYtd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="legalNo">
          <a-input placeholder="请输入legalNo" v-decorator="['legalNo', {}]" />
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
    name: "CkzdkbModal",
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
        accNo:{rules: [{ required: true, message: '请输入accNo!' }]},
        },
        url: {
          add: "/ckzdkb/ckzdkb/add",
          edit: "/ckzdkb/ckzdkb/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataDate','loadDate','accNo','acctOpenDt','acctType','intCat','productCode','productName','mastAcct','subAcctNo','custName','identType','identNo','subAcctCode','subAcctCurr','subAcctCurrType','mcaInd','fromTab','voucherType','voucherNo','pbVolumeNo','pbSequenceNo','defaultBal','branchNo','branchName','currStatus','currency','currBal','customerNo','belongCusttype','belongCustdesc','savingType','savinDesc','productNo','acctName','lstFinDt','crStoreRate','acctPctMgnRate','subjNo','subjName','glClassCode','intFrmDt','intToDt','rate','subAcctOut','endDate','contractBaseId','contractRateId','acNo','acctEfctDate','annlReviewDate','aprlNo','breakRuleInd','cashWdlExpDate','expDateAutoFrz','fcyCode','firstDepAmt','greenAcctInd','greenExpiryDt','newBranchNo','ngbAcctInd','noOfStopDep','noOfStopWdl','orinMatDt','partialWdlAmt','partialWdlCnt','realDepCnt','tempAcctExpDt','tfrRestFlag','acctTypeChgFlag','atmAcctFlag','chrExemProfile','crTierGrpId','freezeExpDate','holdVal','intAvailable','typeIntAccr','termManRollNo','noOfHolds','noOfStops','odArea','odLinkInd','odVisaArea','sweepAcctFlag','telrAcctProd','trfAcctNo','varIntRate','withTaxType','fcyCashTrf','lcyAcctType','odIndicator','productInd','termBasis','termDaysMax','acctGrp','acctDesc','sIntFrmDt','inoutFlag','drIntAdjustment','fccCiAdjAccr','trmIntAccr','contractIntIncr','acctDescDepp','crSopDate','drEopDate','crIdDet','lstMntDt','lstCustCrDt','lstCustDrDt','netAvBalYtd','netAvNoYtd','legalNo'))
		  //时间格式化
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