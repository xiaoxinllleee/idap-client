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
          label="资产编号">
          <a-input placeholder="请输入资产编号" v-decorator="['capNo', validatorRules.capNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="源资产编号">
          <a-input placeholder="请输入源资产编号" v-decorator="['oCapNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片序号">
          <a-input placeholder="请输入卡片序号" v-decorator="['acSeqn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产性质">
          <a-input placeholder="请输入资产性质" v-decorator="['captype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产名称">
          <a-input placeholder="请输入资产名称" v-decorator="['capName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取得方式">
          <a-input placeholder="请输入取得方式" v-decorator="['rootIn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账日期">
          <a-input placeholder="请输入入账日期" v-decorator="['openDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记部门">
          <a-input placeholder="请输入登记部门" v-decorator="['regDepNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产种类">
          <a-input placeholder="请输入资产种类" v-decorator="['capCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产子类">
          <a-input placeholder="请输入资产子类" v-decorator="['subCapCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="品牌型号">
          <a-input placeholder="请输入品牌型号" v-decorator="['chara', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位">
          <a-input placeholder="请输入单位" v-decorator="['unit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原值">
          <a-input placeholder="请输入原值" v-decorator="['cost', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="折旧后余额（净值）或称账面价值">
          <a-input placeholder="请输入折旧后余额（净值）或称账面价值" v-decorator="['depBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['depSts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="摊销方式">
          <a-input placeholder="请输入摊销方式" v-decorator="['depMode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="净残值率(%)">
          <a-input placeholder="请输入净残值率(%)" v-decorator="['leaveRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际利率(%)">
          <a-input placeholder="请输入实际利率(%)" v-decorator="['actRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分摊方式">
          <a-input placeholder="请输入分摊方式" v-decorator="['proMode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="折旧周期">
          <a-input placeholder="请输入折旧周期" v-decorator="['depCyc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="摊销期限（月）">
          <a-input placeholder="请输入摊销期限（月）" v-decorator="['depTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已使用月数">
          <a-input placeholder="请输入已使用月数" v-decorator="['useTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已折旧次数">
          <a-input placeholder="请输入已折旧次数" v-decorator="['afDepCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总工作量">
          <a-input placeholder="请输入总工作量" v-decorator="['tWorkAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期工作量">
          <a-input placeholder="请输入本期工作量" v-decorator="['workTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="折旧率">
          <a-input placeholder="请输入折旧率" v-decorator="['depRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存放地点">
          <a-input placeholder="请输入存放地点" v-decorator="['addr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产状况">
          <a-input placeholder="请输入资产状况" v-decorator="['capBrf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次折旧额">
          <a-input placeholder="请输入上次折旧额" v-decorator="['evedepamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地使用税上次计提日">
          <a-input placeholder="请输入土地使用税上次计提日" v-decorator="['lstDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易笔数">
          <a-input placeholder="请输入交易笔数" v-decorator="['tdCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值金额（总额）">
          <a-input placeholder="请输入减值金额（总额）" v-decorator="['devalue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作员号">
          <a-input placeholder="请输入操作员号" v-decorator="['tel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账机构号">
          <a-input placeholder="请输入记账机构号" v-decorator="['opnBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="市场价格">
          <a-input placeholder="请输入市场价格" v-decorator="['marval', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评估日期">
          <a-input placeholder="请输入评估日期" v-decorator="['evaDate', {}]" />
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
          label="计量日期">
          <a-input placeholder="请输入计量日期" v-decorator="['pubDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公允价值">
          <a-input placeholder="请输入公允价值" v-decorator="['pubBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计量方式">
          <a-input placeholder="请输入计量方式" v-decorator="['comType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附件地址">
          <a-input placeholder="请输入附件地址" v-decorator="['attachAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="租赁开始日期">
          <a-input placeholder="请输入租赁开始日期" v-decorator="['charterDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="房产税上次计提日期">
          <a-input placeholder="请输入房产税上次计提日期" v-decorator="['turnDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处置日期">
          <a-input placeholder="请输入处置日期" v-decorator="['dealDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处置金额">
          <a-input placeholder="请输入处置金额" v-decorator="['dealAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处置费用">
          <a-input placeholder="请输入处置费用" v-decorator="['dealFee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入资本公积金金额">
          <a-input placeholder="请输入转入资本公积金金额" v-decorator="['zrZbgjjBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="维护费用">
          <a-input placeholder="请输入维护费用" v-decorator="['prepareFee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期付款类型">
          <a-input placeholder="请输入分期付款类型" v-decorator="['installType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="供应单位">
          <a-input placeholder="请输入供应单位" v-decorator="['sale', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="启用日期">
          <a-input placeholder="请输入启用日期" v-decorator="['useDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用部门">
          <a-input placeholder="请输入使用部门" v-decorator="['usePart', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="净额=残值">
          <a-input placeholder="请输入净额=残值" v-decorator="['leaveBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期折旧额">
          <a-input placeholder="请输入本期折旧额" v-decorator="['curDepValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期折旧额">
          <a-input placeholder="请输入上期折旧额" v-decorator="['lcurDepValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期初原值">
          <a-input placeholder="请输入期初原值" v-decorator="['qcAvbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年原值累计增加">
          <a-input placeholder="请输入本年原值累计增加" v-decorator="['yAddAvbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期间原值累计增加">
          <a-input placeholder="请输入期间原值累计增加" v-decorator="['termAddAvbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年原值累计减少">
          <a-input placeholder="请输入本年原值累计减少" v-decorator="['yDecAvbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期间原值累计减少">
          <a-input placeholder="请输入期间原值累计减少" v-decorator="['termDecAvbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年初累计折旧余额">
          <a-input placeholder="请输入年初累计折旧余额" v-decorator="['yDepBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期初累计折旧余额">
          <a-input placeholder="请输入期初累计折旧余额" v-decorator="['termDepBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年累计折旧减少">
          <a-input placeholder="请输入本年累计折旧减少" v-decorator="['yDepDec', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期间累计折旧减少">
          <a-input placeholder="请输入期间累计折旧减少" v-decorator="['termDepDec', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年累计折旧总额">
          <a-input placeholder="请输入本年累计折旧总额" v-decorator="['yDepamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产账号">
          <a-input placeholder="请输入资产账号" v-decorator="['inAcNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账标志">
          <a-input placeholder="请输入记账标志" v-decorator="['jzFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="折旧日期">
          <a-input placeholder="请输入折旧日期" v-decorator="['depDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应缴税额级别">
          <a-input placeholder="请输入应缴税额级别" v-decorator="['payTaxInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="房屋应缴税额级别">
          <a-input placeholder="请输入房屋应缴税额级别" v-decorator="['payTaxLvl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应缴税额">
          <a-input placeholder="请输入应缴税额" v-decorator="['payTax', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地面积">
          <a-input placeholder="请输入土地面积" v-decorator="['buildArea', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理人">
          <a-input placeholder="请输入管理人" v-decorator="['manager', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处置数量">
          <a-input placeholder="请输入处置数量" v-decorator="['dealCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处置原因">
          <a-input placeholder="请输入处置原因" v-decorator="['dealBrf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地位置">
          <a-input placeholder="请输入土地位置" v-decorator="['landPosition', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地权证编号">
          <a-input placeholder="请输入土地权证编号" v-decorator="['landCardno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用地性质">
          <a-input placeholder="请输入用地性质" v-decorator="['landUsekind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地取得日">
          <a-input placeholder="请输入土地取得日" v-decorator="['landGetdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地到期日">
          <a-input placeholder="请输入土地到期日" v-decorator="['landExpdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结构形式">
          <a-input placeholder="请输入结构形式" v-decorator="['archStruct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清理余额">
          <a-input placeholder="请输入清理余额" v-decorator="['qlAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="增加批准文号">
          <a-input placeholder="请输入增加批准文号" v-decorator="['authNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地权证编号">
          <a-input placeholder="请输入土地权证编号" v-decorator="['buildCardno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用途描述">
          <a-input placeholder="请输入用途描述" v-decorator="['useKind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府补助编号">
          <a-input placeholder="请输入政府补助编号" v-decorator="['grantNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品号">
          <a-input placeholder="请输入产品号" v-decorator="['prdtNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="扣收保证金金额">
          <a-input placeholder="请输入扣收保证金金额" v-decorator="['marginAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="股东编号">
          <a-input placeholder="请输入股东编号" v-decorator="['shareholderNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入股股数">
          <a-input placeholder="请输入入股股数" v-decorator="['shareSize', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每股票面价格">
          <a-input placeholder="请输入每股票面价格" v-decorator="['sharePrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资本溢价金额">
          <a-input placeholder="请输入资本溢价金额" v-decorator="['premiumBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预付款编号">
          <a-input placeholder="请输入预付款编号" v-decorator="['advanceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预付款金额">
          <a-input placeholder="请输入预付款金额" v-decorator="['advanceAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产公允价值">
          <a-input placeholder="请输入资产公允价值" v-decorator="['currPubBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款总额">
          <a-input placeholder="请输入付款总额" v-decorator="['rentAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未确认融资费用">
          <a-input placeholder="请输入未确认融资费用" v-decorator="['unrecognizedBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="租赁期限">
          <a-input placeholder="请输入租赁期限" v-decorator="['rentTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="融资租入折现率">
          <a-input placeholder="请输入融资租入折现率" v-decorator="['cashRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="捐赠方名称">
          <a-input placeholder="请输入捐赠方名称" v-decorator="['presentName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="捐赠事由">
          <a-input placeholder="请输入捐赠事由" v-decorator="['presentBrf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购入价格">
          <a-input placeholder="请输入购入价格" v-decorator="['buyAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="税金金额">
          <a-input placeholder="请输入税金金额" v-decorator="['taxAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他费用">
          <a-input placeholder="请输入其他费用" v-decorator="['elseAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="立项审批编号">
          <a-input placeholder="请输入立项审批编号" v-decorator="['projectAppNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['suppName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同编号">
          <a-input placeholder="请输入合同编号" v-decorator="['pactNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户编号">
          <a-input placeholder="请输入客户编号" v-decorator="['suppNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用状况">
          <a-input placeholder="请输入使用状况" v-decorator="['useType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编码">
          <a-input placeholder="请输入业务编码" v-decorator="['ywNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="权利证书编号">
          <a-input placeholder="请输入权利证书编号" v-decorator="['rightCardno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财务流水号">
          <a-input placeholder="请输入财务流水号" v-decorator="['traceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易日期">
          <a-input placeholder="请输入交易日期" v-decorator="['txDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人联社号">
          <a-input placeholder="请输入法人联社号" v-decorator="['upBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-input placeholder="请输入到期日期" v-decorator="['expDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初始取得资产编号">
          <a-input placeholder="请输入初始取得资产编号" v-decorator="['srcCapNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初始取得资产来源">
          <a-input placeholder="请输入初始取得资产来源" v-decorator="['oRootIn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类结果">
          <a-input placeholder="请输入五级分类结果" v-decorator="['lvlFive', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用人">
          <a-input placeholder="请输入使用人" v-decorator="['usePerson', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购置人">
          <a-input placeholder="请输入购置人" v-decorator="['payPerson', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理部门">
          <a-input placeholder="请输入管理部门" v-decorator="['manPart', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购置部门">
          <a-input placeholder="请输入购置部门" v-decorator="['payDepNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['curNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上传附件的编号">
          <a-input placeholder="请输入上传附件的编号" v-decorator="['annexNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['dataDate', {}]" />
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
    name: "WxzcdjbModal",
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
        capNo:{rules: [{ required: true, message: '请输入资产编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/wxzcdjb/wxzcdjb/add",
          edit: "/wxzcdjb/wxzcdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'capNo','oCapNo','acSeqn','captype','capName','rootIn','openDate','regDepNo','capCode','subCapCode','chara','unit','cost','depBal','depSts','depMode','leaveRate','actRate','proMode','depCyc','depTime','useTime','afDepCnt','tWorkAmt','workTime','depRate','addr','capBrf','evedepamt','lstDate','tdCnt','devalue','tel','opnBrNo','marval','evaDate','remark','pubDate','pubBal','comType','attachAddr','charterDate','turnDate','dealDate','dealAmt','dealFee','zrZbgjjBal','prepareFee','installType','sale','useDate','usePart','leaveBal','curDepValue','lcurDepValue','qcAvbal','yAddAvbal','termAddAvbal','yDecAvbal','termDecAvbal','yDepBal','termDepBal','yDepDec','termDepDec','yDepamt','inAcNo','jzFlag','depDate','payTaxInd','payTaxLvl','payTax','buildArea','manager','dealCnt','dealBrf','landPosition','landCardno','landUsekind','landGetdate','landExpdate','archStruct','qlAmt','authNo','buildCardno','useKind','grantNo','prdtNo','marginAmt','shareholderNo','shareSize','sharePrice','premiumBal','advanceNo','advanceAmt','currPubBal','rentAmt','unrecognizedBal','rentTime','cashRate','presentName','presentBrf','buyAmt','taxAmt','elseAmt','projectAppNo','suppName','pactNo','suppNo','useType','ywNo','rightCardno','traceNo','txDate','upBrNo','expDate','srcCapNo','oRootIn','lvlFive','usePerson','payPerson','manPart','payDepNo','curNo','annexNo','dataDate','loadDate','legalNo','dtnum'))
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