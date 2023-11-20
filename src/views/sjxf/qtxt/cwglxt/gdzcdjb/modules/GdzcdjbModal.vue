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
          label="单价">
          <a-input placeholder="请输入单价" v-decorator="['price', {}]" />
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
          label="数量">
          <a-input placeholder="请输入数量" v-decorator="['totnum', {}]" />
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
          label="折旧方式">
          <a-input placeholder="请输入折旧方式" v-decorator="['depMode', {}]" />
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
          label="折旧期限（月）">
          <a-input placeholder="请输入折旧期限（月）" v-decorator="['depTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已使用月数（月）">
          <a-input placeholder="请输入已使用月数（月）" v-decorator="['useTime', {}]" />
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
          label="存放地点（座落地）">
          <a-input placeholder="请输入存放地点（座落地）" v-decorator="['addr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产使用状况">
          <a-input placeholder="请输入资产使用状况" v-decorator="['capBrf', {}]" />
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
          label="所属机构">
          <a-input placeholder="请输入所属机构" v-decorator="['opnBrNo', {}]" />
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
          label="在建工程卡片号">
          <a-input placeholder="请输入在建工程卡片号" v-decorator="['projectNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="在建工程细分的">
          <a-input placeholder="请输入在建工程细分的" v-decorator="['partNo', {}]" />
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
          label="固定资产年初原值">
          <a-input placeholder="请输入固定资产年初原值" v-decorator="['btAvbal', {}]" />
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
          label="是否房地合一">
          <a-input placeholder="请输入是否房地合一" v-decorator="['blUnity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联无形资产编号">
          <a-input placeholder="请输入关联无形资产编号" v-decorator="['intCapNo', {}]" />
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
          label="上次折旧日期">
          <a-input placeholder="请输入上次折旧日期" v-decorator="['depDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地应缴税额级别">
          <a-input placeholder="请输入土地应缴税额级别" v-decorator="['payTaxInd', {}]" />
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
          label="附件地址">
          <a-input placeholder="请输入附件地址" v-decorator="['attachAddr', {}]" />
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
          label="保管人">
          <a-input placeholder="请输入保管人" v-decorator="['manager', {}]" />
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
          label="资产分类">
          <a-input placeholder="请输入资产分类" v-decorator="['capKind', {}]" />
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
          label="土地取得日期">
          <a-input placeholder="请输入土地取得日期" v-decorator="['landGetdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地到期日期">
          <a-input placeholder="请输入土地到期日期" v-decorator="['landExpdate', {}]" />
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
          label="建筑面积">
          <a-input placeholder="请输入建筑面积" v-decorator="['archArea', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机具设备号">
          <a-input placeholder="请输入机具设备号" v-decorator="['machineNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="车辆号">
          <a-input placeholder="请输入车辆号" v-decorator="['carNo', {}]" />
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
          label="用途">
          <a-input placeholder="请输入用途" v-decorator="['useKind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发票号码">
          <a-input placeholder="请输入发票号码" v-decorator="['fpbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="条形码">
          <a-input placeholder="请输入条形码" v-decorator="['txm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘点状态">
          <a-input placeholder="请输入盘点状态" v-decorator="['chkSts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘点确定日期">
          <a-input placeholder="请输入盘点确定日期" v-decorator="['chkSDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘点机构">
          <a-input placeholder="请输入盘点机构" v-decorator="['chkBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘点人描述">
          <a-input placeholder="请输入盘点人描述" v-decorator="['chkTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘点日期">
          <a-input placeholder="请输入盘点日期" v-decorator="['chkDate', {}]" />
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
          label="事后确认事项号">
          <a-input placeholder="请输入事后确认事项号" v-decorator="['cfmAppNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="事后确认子序号">
          <a-input placeholder="请输入事后确认子序号" v-decorator="['cfmAppNoSeq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买价">
          <a-input placeholder="请输入买价" v-decorator="['payAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="安装费">
          <a-input placeholder="请输入安装费" v-decorator="['installAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="税费">
          <a-input placeholder="请输入税费" v-decorator="['taxAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="运费">
          <a-input placeholder="请输入运费" v-decorator="['transportAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他费用">
          <a-input placeholder="请输入其他费用" v-decorator="['otherAmt', {}]" />
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
          label="购置部门">
          <a-input placeholder="请输入购置部门" v-decorator="['payDepNo', {}]" />
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
          label="产权证号">
          <a-input placeholder="请输入产权证号" v-decorator="['propertyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发动机号">
          <a-input placeholder="请输入发动机号" v-decorator="['engineNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="车架号码">
          <a-input placeholder="请输入车架号码" v-decorator="['frameNo', {}]" />
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
          label="申请编号">
          <a-input placeholder="请输入申请编号" v-decorator="['appNo', {}]" />
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
          label="当前市场公允价值">
          <a-input placeholder="请输入当前市场公允价值" v-decorator="['currPubBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="租金支付总金额">
          <a-input placeholder="请输入租金支付总金额" v-decorator="['rentAmt', {}]" />
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
          label="折现利率">
          <a-input placeholder="请输入折现利率" v-decorator="['cashRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="股东号">
          <a-input placeholder="请输入股东号" v-decorator="['shareholderNo', {}]" />
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
          label="捐赠单位/个人">
          <a-input placeholder="请输入捐赠单位/个人" v-decorator="['presentName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="捐赠单位/事由">
          <a-input placeholder="请输入捐赠单位/事由" v-decorator="['presentBrf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘盈时间">
          <a-input placeholder="请输入盘盈时间" v-decorator="['gainsDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="低值易耗品类别">
          <a-input placeholder="请输入低值易耗品类别" v-decorator="['gainsNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘点经办人">
          <a-input placeholder="请输入盘点经办人" v-decorator="['gainsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘盈确认审批编号">
          <a-input placeholder="请输入盘盈确认审批编号" v-decorator="['gainsAppNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产状况">
          <a-input placeholder="请输入资产状况" v-decorator="['useSts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金金额">
          <a-input placeholder="请输入保证金金额" v-decorator="['marginAmt', {}]" />
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
          label="业务编码">
          <a-input placeholder="请输入业务编码" v-decorator="['ywNo', {}]" />
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
          label="管理人">
          <a-input placeholder="请输入管理人" v-decorator="['manPart', {}]" />
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
    name: "GdzcdjbModal",
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
          add: "/gdzcdjb/gdzcdjb/add",
          edit: "/gdzcdjb/gdzcdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'capNo','oCapNo','acSeqn','captype','capName','rootIn','price','openDate','regDepNo','capCode','subCapCode','chara','unit','totnum','cost','depBal','depSts','depMode','leaveRate','actRate','proMode','depCyc','depTime','useTime','afDepCnt','tWorkAmt','workTime','depRate','addr','capBrf','evedepamt','lstDate','tdCnt','devalue','tel','opnBrNo','marval','evaDate','remark','pubDate','pubBal','comType','charterDate','turnDate','dealDate','dealAmt','dealFee','zrZbgjjBal','projectNo','partNo','prepareFee','installType','sale','useDate','usePart','leaveBal','curDepValue','lcurDepValue','btAvbal','qcAvbal','yAddAvbal','termAddAvbal','yDecAvbal','termDecAvbal','yDepBal','termDepBal','yDepDec','termDepDec','yDepamt','blUnity','intCapNo','inAcNo','jzFlag','depDate','payTaxInd','payTax','attachAddr','buildArea','manager','dealCnt','dealBrf','capKind','landPosition','landCardno','landUsekind','landGetdate','landExpdate','archStruct','archArea','machineNo','carNo','payTaxLvl','qlAmt','authNo','buildCardno','useKind','fpbh','txm','chkSts','chkSDate','chkBrNo','chkTel','chkDate','grantNo','cfmAppNo','cfmAppNoSeq','payAmt','installAmt','taxAmt','transportAmt','otherAmt','usePerson','payDepNo','payPerson','propertyNo','engineNo','frameNo','projectAppNo','appNo','suppNo','suppName','pactNo','advanceNo','advanceAmt','currPubBal','rentAmt','unrecognizedBal','rentTime','cashRate','shareholderNo','shareSize','sharePrice','premiumBal','presentName','presentBrf','gainsDate','gainsNo','gainsName','gainsAppNo','useSts','marginAmt','prdtNo','ywNo','traceNo','txDate','upBrNo','expDate','srcCapNo','oRootIn','lvlFive','manPart','curNo','dataDate','loadDate','legalNo','dtnum'))
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