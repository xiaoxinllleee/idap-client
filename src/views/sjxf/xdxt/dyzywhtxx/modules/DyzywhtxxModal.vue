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
          label="被保险人">
          <a-input placeholder="请输入被保险人" v-decorator="['insurant', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始日期">
          <a-input placeholder="请输入开始日期" v-decorator="['insureBeginDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保单号码">
          <a-input placeholder="请输入保单号码" v-decorator="['insureCertNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押物保险单编号">
          <a-input placeholder="请输入抵押物保险单编号" v-decorator="['insureChangeDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['insureCurrency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="责任情况(66*3)">
          <a-input placeholder="请输入责任情况(66*3)" v-decorator="['insureDescribe', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-input placeholder="请输入到期日期" v-decorator="['insureEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保险金额">
          <a-input placeholder="请输入保险金额" v-decorator="['insureSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保险品种">
          <a-input placeholder="请输入保险品种" v-decorator="['insureType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司代码">
          <a-input placeholder="请输入公司代码" v-decorator="['insurerCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司名称">
          <a-input placeholder="请输入公司名称" v-decorator="['insurerName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否变更">
          <a-input placeholder="请输入是否变更" v-decorator="['isChange', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否核保">
          <a-input placeholder="请输入是否核保" v-decorator="['isCheck', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否评估">
          <a-input placeholder="请输入是否评估" v-decorator="['isEval', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否登记">
          <a-input placeholder="请输入是否登记" v-decorator="['isGuaranty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否保险">
          <a-input placeholder="请输入是否保险" v-decorator="['isInsure', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否监管">
          <a-input placeholder="请输入是否监管" v-decorator="['isMonitor', {}]" />
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
          label="权属情况,他人质权">
          <a-input placeholder="请输入权属情况,他人质权" v-decorator="['isOtherSignee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记证入库">
          <a-input placeholder="请输入登记证入库" v-decorator="['isRegister', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否租赁">
          <a-input placeholder="请输入是否租赁" v-decorator="['isTenancy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押期限质押期限">
          <a-input placeholder="请输入抵押期限质押期限" v-decorator="['maturity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="监管单位名称">
          <a-input placeholder="请输入监管单位名称" v-decorator="['monitorDeptName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="监管描述">
          <a-input placeholder="请输入监管描述" v-decorator="['monitorDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="监管编号">
          <a-input placeholder="请输入监管编号" v-decorator="['monitorNo', {}]" />
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
          label="公正机构">
          <a-input placeholder="请输入公正机构" v-decorator="['notaryOrg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其它约定">
          <a-input placeholder="请输入其它约定" v-decorator="['otherAssumpsit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="权属所有人编号">
          <a-input placeholder="请输入权属所有人编号" v-decorator="['othermanId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注销日期">
          <a-input placeholder="请输入注销日期" v-decorator="['outputDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴款开始日期">
          <a-input placeholder="请输入缴款开始日期" v-decorator="['payBeginDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴款结束日">
          <a-input placeholder="请输入缴款结束日" v-decorator="['payEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴款方">
          <a-input placeholder="请输入缴款方" v-decorator="['payMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴款期限">
          <a-input placeholder="请输入缴款期限" v-decorator="['payTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="投保人">
          <a-input placeholder="请输入投保人" v-decorator="['policyHolder', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="占有份额">
          <a-input placeholder="请输入占有份额" v-decorator="['possessRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始时间,买入日期,起始日期">
          <a-input placeholder="请输入开始时间,买入日期,起始日期" v-decorator="['purchaseDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记金额">
          <a-input placeholder="请输入登记金额" v-decorator="['registerValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="暂末用">
          <a-input placeholder="请输入暂末用" v-decorator="['relativeContract', {}]" />
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
          label="出质人名称">
          <a-input placeholder="请输入出质人名称" v-decorator="['signeeName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押方式">
          <a-input placeholder="请输入抵押方式" v-decorator="['signeeType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保关系">
          <a-input placeholder="请输入担保关系" v-decorator="['sureRelation', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保保证期限">
          <a-input placeholder="请输入担保保证期限" v-decorator="['suretyTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每期缴款金额">
          <a-input placeholder="请输入每期缴款金额" v-decorator="['termPaySum', {}]" />
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
          label="已使用金额">
          <a-input placeholder="请输入已使用金额" v-decorator="['vouchValue', {}]" />
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
          label="风险预警比例">
          <a-input placeholder="请输入风险预警比例" v-decorator="['forecastRiskRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵质押方式1">
          <a-input placeholder="请输入抵质押方式1" v-decorator="['guarantyDetail1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵质押方式2">
          <a-input placeholder="请输入抵质押方式2" v-decorator="['guarantyDetail2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="争议解决方式">
          <a-input placeholder="请输入争议解决方式" v-decorator="['jjfs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="仲裁机构全称">
          <a-input placeholder="请输入仲裁机构全称" v-decorator="['zcjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他事项">
          <a-input placeholder="请输入其他事项" v-decorator="['qtsx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签约日期">
          <a-input placeholder="请输入签约日期" v-decorator="['qyrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签约地点">
          <a-input placeholder="请输入签约地点" v-decorator="['qydd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同份数">
          <a-input placeholder="请输入合同份数" v-decorator="['fs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="持票人,收益人,受益人">
          <a-input placeholder="请输入持票人,收益人,受益人" v-decorator="['beneficiary', {}]" />
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
          label="评估机构资质证结止日">
          <a-input placeholder="请输入评估机构资质证结止日" v-decorator="['certificateEnddate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input placeholder="请输入描述" v-decorator="['checkAssureDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核保人编号">
          <a-input placeholder="请输入核保人编号" v-decorator="['checkAssureId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="变现能力">
          <a-input placeholder="请输入变现能力" v-decorator="['chgCashAble', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估价格,质押物金额">
          <a-input placeholder="请输入评估价格,质押物金额" v-decorator="['confirmValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押合同号">
          <a-input placeholder="请输入抵押合同号" v-decorator="['contractNo', {}]" />
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
          label="登记证存放地">
          <a-input placeholder="请输入登记证存放地" v-decorator="['depositary', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出质人现地址">
          <a-input placeholder="请输入出质人现地址" v-decorator="['describe1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出质人电话">
          <a-input placeholder="请输入出质人电话" v-decorator="['describe2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托书编号">
          <a-input placeholder="请输入委托书编号" v-decorator="['describe3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托人">
          <a-input placeholder="请输入委托人" v-decorator="['describe4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="受托人">
          <a-input placeholder="请输入受托人" v-decorator="['describe5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托日期">
          <a-input placeholder="请输入委托日期" v-decorator="['describe6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内容描述">
          <a-input placeholder="请输入内容描述" v-decorator="['describe7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['describe8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估编号">
          <a-input placeholder="请输入评估编号" v-decorator="['evalCardNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估时间">
          <a-input placeholder="请输入评估时间" v-decorator="['evalDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估方式">
          <a-input placeholder="请输入评估方式" v-decorator="['evalMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估机构">
          <a-input placeholder="请输入评估机构" v-decorator="['evalName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押物价值,评估净值,质物价值">
          <a-input placeholder="请输入抵押物价值,评估净值,质物价值" v-decorator="['evalNetValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估机构代码">
          <a-input placeholder="请输入评估机构代码" v-decorator="['evalOrgId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估机构名称">
          <a-input placeholder="请输入评估机构名称" v-decorator="['evalOrgName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估有效期">
          <a-input placeholder="请输入评估有效期" v-decorator="['evalTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="认定价值">
          <a-input placeholder="请输入认定价值" v-decorator="['evalValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估机构资质">
          <a-input placeholder="请输入评估机构资质" v-decorator="['evalorgLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="解除担保时间">
          <a-input placeholder="请输入解除担保时间" v-decorator="['freeSureDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否冻结">
          <a-input placeholder="请输入是否冻结" v-decorator="['freezed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保物数量">
          <a-input placeholder="请输入担保物数量" v-decorator="['guarantyAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="物品性质">
          <a-input placeholder="请输入物品性质" v-decorator="['guarantyAttribute', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵/质押代码">
          <a-input placeholder="请输入抵/质押代码" v-decorator="['guarantyCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['guarantyCurrency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保物简述">
          <a-input placeholder="请输入担保物简述" v-decorator="['guarantyDescribe', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流水编号">
          <a-input placeholder="请输入流水编号" v-decorator="['guarantyDetailId', validatorRules.guarantyDetailId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="暂末用">
          <a-input placeholder="请输入暂末用" v-decorator="['guarantyId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存放地点">
          <a-input placeholder="请输入存放地点" v-decorator="['guarantyLocation', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押物名称,质物名称,质押物名称">
          <a-input placeholder="请输入抵押物名称,质物名称,质押物名称" v-decorator="['guarantyName', {}]" />
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
          label="抵押物编号,质押物编号">
          <a-input placeholder="请输入抵押物编号,质押物编号" v-decorator="['guarantyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押率,质押率,担保率,折扣率">
          <a-input placeholder="请输入抵押率,质押率,担保率,折扣率" v-decorator="['guarantyRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记日期">
          <a-input placeholder="请输入登记日期" v-decorator="['guarantyRegDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记编号">
          <a-input placeholder="请输入登记编号" v-decorator="['guarantyRegNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记机构">
          <a-input placeholder="请输入登记机构" v-decorator="['guarantyRegOrg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押物类型">
          <a-input placeholder="请输入抵押物类型" v-decorator="['guarantySort', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="暂末用">
          <a-input placeholder="请输入暂末用" v-decorator="['guarantyStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵/质押期限">
          <a-input placeholder="请输入抵/质押期限" v-decorator="['guarantyTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账面价值">
          <a-input placeholder="请输入账面价值" v-decorator="['guarantyTxtSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押物种类,质物种类">
          <a-input placeholder="请输入抵押物种类,质物种类" v-decorator="['guarantyType', {}]" />
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
          label="到期日期">
          <a-input placeholder="请输入到期日期" v-decorator="['guarantyWoDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押期限,质押期限">
          <a-input placeholder="请输入抵押期限,质押期限" v-decorator="['holdTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押金额,质物金额">
          <a-input placeholder="请输入抵押金额,质物金额" v-decorator="['implValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记日期">
          <a-input placeholder="请输入登记日期" v-decorator="['inputDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵质押人类型">
          <a-input placeholder="请输入抵质押人类型" v-decorator="['signeeCustType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通知书号">
          <a-input placeholder="请输入通知书号" v-decorator="['sid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['flag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已出库金额">
          <a-input placeholder="请输入已出库金额" v-decorator="['outputValue', {}]" />
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
    name: "DyzywhtxxModal",
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
        guarantyDetailId:{rules: [{ required: true, message: '请输入流水编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/dyzywhtxx/dyzywhtxx/add",
          edit: "/dyzywhtxx/dyzywhtxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataFlag','insurant','insureBeginDate','insureCertNo','insureChangeDate','insureCurrency','insureDescribe','insureEndDate','insureSum','insureType','insurerCode','insurerName','isChange','isCheck','isEval','isGuaranty','isInsure','isMonitor','isNotary','isOtherSignee','isRegister','isTenancy','maturity','monitorDeptName','monitorDesc','monitorNo','notary','notaryDate','notaryOrg','otherAssumpsit','othermanId','outputDate','payBeginDate','payEndDate','payMethod','payTerm','policyHolder','possessRate','purchaseDate','registerValue','relativeContract','remark','signeeName','signeeType','sureRelation','suretyTerm','termPaySum','userId','vouchValue','updateDate','forecastRiskRatio','guarantyDetail1','guarantyDetail2','jjfs','zcjg','qtsx','qyrq','qydd','fs','beneficiary','businessNo','certificateEnddate','checkAssureDesc','checkAssureId','chgCashAble','confirmValue','contractNo','custId','depositary','describe1','describe2','describe3','describe4','describe5','describe6','describe7','describe8','evalCardNo','evalDate','evalMethod','evalName','evalNetValue','evalOrgId','evalOrgName','evalTerm','evalValue','evalorgLevel','freeSureDate','freezed','guarantyAmount','guarantyAttribute','guarantyCode','guarantyCurrency','guarantyDescribe','guarantyDetailId','guarantyId','guarantyLocation','guarantyName','guarantyNdNo','guarantyNo','guarantyRate','guarantyRegDate','guarantyRegNo','guarantyRegOrg','guarantySort','guarantyStatus','guarantyTerm','guarantyTxtSum','guarantyType','guarantyValue','guarantyWoDate','holdTerm','implValue','inputDate','signeeCustType','sid','flag','outputValue','sDate','eDate','loadDate','legalNo','dtnum'))
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