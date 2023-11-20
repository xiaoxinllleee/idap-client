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
          label="机构码">
          <a-input placeholder="请输入机构码" v-decorator="['instNo', validatorRules.instNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['acctNo', validatorRules.acctNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="循环号码">
          <a-input placeholder="请输入循环号码" v-decorator="['cycleNo', validatorRules.cycleNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拖欠表的期数">
          <a-input placeholder="请输入拖欠表的期数" v-decorator="['termNo', validatorRules.termNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['bucketSeqNo', validatorRules.bucketSeqNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易日期">
          <a-input placeholder="请输入交易日期" v-decorator="['txnDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="此记录当前的状态">
          <a-input placeholder="请输入此记录当前的状态" v-decorator="['recordStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易标识">
          <a-input placeholder="请输入交易标识" v-decorator="['txnInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整原因码">
          <a-input placeholder="请输入调整原因码" v-decorator="['adjReasonCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账日期">
          <a-input placeholder="请输入入账日期" v-decorator="['postingDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易流水号">
          <a-input placeholder="请输入交易流水号" v-decorator="['jrnlNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="倒退日调整金额">
          <a-input placeholder="请输入倒退日调整金额" v-decorator="['backAdjAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否有因为还款重算了还款金额">
          <a-input placeholder="请输入是否有因为还款重算了还款金额" v-decorator="['repayPrnRecalc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="标识延期的计提利息">
          <a-input placeholder="请输入标识延期的计提利息" v-decorator="['deferIntAccr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码1">
          <a-input placeholder="请输入欠款桶子代码1" v-decorator="['bucketCode1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码2">
          <a-input placeholder="请输入欠款桶子代码2" v-decorator="['bucketCode2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码3">
          <a-input placeholder="请输入欠款桶子代码3" v-decorator="['bucketCode3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码4">
          <a-input placeholder="请输入欠款桶子代码4" v-decorator="['bucketCode4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码5">
          <a-input placeholder="请输入欠款桶子代码5" v-decorator="['bucketCode5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码6">
          <a-input placeholder="请输入欠款桶子代码6" v-decorator="['bucketCode6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码7">
          <a-input placeholder="请输入欠款桶子代码7" v-decorator="['bucketCode7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码8">
          <a-input placeholder="请输入欠款桶子代码8" v-decorator="['bucketCode8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码9">
          <a-input placeholder="请输入欠款桶子代码9" v-decorator="['bucketCode9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码10">
          <a-input placeholder="请输入欠款桶子代码10" v-decorator="['bucketCode10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码11">
          <a-input placeholder="请输入欠款桶子代码11" v-decorator="['bucketCode11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码12">
          <a-input placeholder="请输入欠款桶子代码12" v-decorator="['bucketCode12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码13">
          <a-input placeholder="请输入欠款桶子代码13" v-decorator="['bucketCode13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码14">
          <a-input placeholder="请输入欠款桶子代码14" v-decorator="['bucketCode14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠款桶子代码15">
          <a-input placeholder="请输入欠款桶子代码15" v-decorator="['bucketCode15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="桶子子码">
          <a-input placeholder="请输入桶子子码" v-decorator="['subBucketCode15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还金额">
          <a-input placeholder="请输入应还金额" v-decorator="['txnAmt15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已还金额">
          <a-input placeholder="请输入已还金额" v-decorator="['collectedAmt15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整金额">
          <a-input placeholder="请输入调整金额" v-decorator="['adjustedAmt15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的基础利率">
          <a-input placeholder="请输入当前的基础利率" v-decorator="['basedRate15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算日期天数">
          <a-input placeholder="请输入计算日期天数" v-decorator="['basedDays15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上一还款日，开始日">
          <a-input placeholder="请输入上一还款日，开始日" v-decorator="['basedDate15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当天日期，截止日">
          <a-input placeholder="请输入交易当天日期，截止日" v-decorator="['basedToDate15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前的本金金额">
          <a-input placeholder="请输入当前的本金金额" v-decorator="['basedAmt15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后维护日期">
          <a-input placeholder="请输入最后维护日期" v-decorator="['lstFinUpdDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后维护类型U-更新I-新增">
          <a-input placeholder="请输入最后维护类型U-更新I-新增" v-decorator="['lstFinStat', {}]" />
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
          label="加载日期">
          <a-input placeholder="请输入加载日期" v-decorator="['loadDate', {}]" />
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
    name: "QkmxdjModal",
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
        instNo:{rules: [{ required: true, message: '请输入机构码!' }]},
        acctNo:{rules: [{ required: true, message: '请输入贷款账号!' }]},
        cycleNo:{rules: [{ required: true, message: '请输入循环号码!' }]},
        termNo:{rules: [{ required: true, message: '请输入拖欠表的期数!' }]},
        bucketSeqNo:{rules: [{ required: true, message: '请输入序号!' }]},
        legalNo:{rules: [{ required: true, message: '请输入法人标识!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/qkmxdj/qkmxdj/add",
          edit: "/qkmxdj/qkmxdj/edit",
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
          this.form.setFieldsValue(pick(this.model,'instNo','acctNo','cycleNo','termNo','bucketSeqNo','txnDate','recordStatus','txnInd','adjReasonCode','postingDate','jrnlNo','backAdjAmt','repayPrnRecalc','deferIntAccr','bucketCode1','subBucketCode1','txnAmt1','collectedAmt1','adjustedAmt1','basedRate1','basedDays1','basedDate1','basedToDate1','basedAmt1','bucketCode2','subBucketCode2','txnAmt2','collectedAmt2','adjustedAmt2','basedRate2','basedDays2','basedDate2','basedToDate2','basedAmt2','bucketCode3','subBucketCode3','txnAmt3','collectedAmt3','adjustedAmt3','basedRate3','basedDays3','basedDate3','basedToDate3','basedAmt3','bucketCode4','subBucketCode4','txnAmt4','collectedAmt4','adjustedAmt4','basedRate4','basedDays4','basedDate4','basedToDate4','basedAmt4','bucketCode5','subBucketCode5','txnAmt5','collectedAmt5','adjustedAmt5','basedRate5','basedDays5','basedDate5','basedToDate5','basedAmt5','bucketCode6','subBucketCode6','txnAmt6','collectedAmt6','adjustedAmt6','basedRate6','basedDays6','basedDate6','basedToDate6','basedAmt6','bucketCode7','subBucketCode7','txnAmt7','collectedAmt7','adjustedAmt7','basedRate7','basedDays7','basedDate7','basedToDate7','basedAmt7','bucketCode8','subBucketCode8','txnAmt8','collectedAmt8','adjustedAmt8','basedRate8','basedDays8','basedDate8','basedToDate8','basedAmt8','bucketCode9','subBucketCode9','txnAmt9','collectedAmt9','adjustedAmt9','basedRate9','basedDays9','basedDate9','basedToDate9','basedAmt9','bucketCode10','subBucketCode10','txnAmt10','collectedAmt10','adjustedAmt10','basedRate10','basedDays10','basedDate10','basedToDate10','basedAmt10','bucketCode11','subBucketCode11','txnAmt11','collectedAmt11','adjustedAmt11','basedRate11','basedDays11','basedDate11','basedToDate11','basedAmt11','bucketCode12','subBucketCode12','txnAmt12','collectedAmt12','adjustedAmt12','basedRate12','basedDays12','basedDate12','basedToDate12','basedAmt12','bucketCode13','subBucketCode13','txnAmt13','collectedAmt13','adjustedAmt13','basedRate13','basedDays13','basedDate13','basedToDate13','basedAmt13','bucketCode14','subBucketCode14','txnAmt14','collectedAmt14','adjustedAmt14','basedRate14','basedDays14','basedDate14','basedToDate14','basedAmt14','bucketCode15','subBucketCode15','txnAmt15','collectedAmt15','adjustedAmt15','basedRate15','basedDays15','basedDate15','basedToDate15','basedAmt15','lstFinUpdDt','lstFinStat','dataDate','loadDate','legalNo','dtnum'))
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