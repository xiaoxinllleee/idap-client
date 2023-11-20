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
          label="归属网格">
          <a-input placeholder="请输入归属网格" v-decorator="['wgbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="归属机构">
          <a-input placeholder="请输入归属机构" v-decorator="['jgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型">
          <a-input placeholder="请输入客户类型" v-decorator="['khlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户号编码">
          <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="姓名">
          <a-input placeholder="请输入姓名" v-decorator="['khmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="名族">
          <a-input placeholder="请输入名族" v-decorator="['mz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="婚姻状况">
          <a-input placeholder="请输入婚姻状况" v-decorator="['hyzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户口性质">
          <a-input placeholder="请输入户口性质" v-decorator="['hkxz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="与户主关系">
          <a-input placeholder="请输入与户主关系" v-decorator="['yhzgx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文化程度">
          <a-input placeholder="请输入文化程度" v-decorator="['whcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职业">
          <a-input placeholder="请输入职业" v-decorator="['cshygz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系方式">
          <a-input placeholder="请输入联系方式" v-decorator="['sjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户籍地址">
          <a-input placeholder="请输入户籍地址" v-decorator="['hjdz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="常住地址">
          <a-input placeholder="请输入常住地址" v-decorator="['zz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原所属乡镇">
          <a-input placeholder="请输入原所属乡镇" v-decorator="['yssxz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原行政村">
          <a-input placeholder="请输入原行政村" v-decorator="['yxzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="住址1">
          <a-input placeholder="请输入住址1" v-decorator="['zz1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="住址2">
          <a-input placeholder="请输入住址2" v-decorator="['zz2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否不良贷款客户">
          <a-input placeholder="请输入是否不良贷款客户" v-decorator="['sfbldkh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否贫困户">
          <a-input placeholder="请输入是否贫困户" v-decorator="['sfpkh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否低保户">
          <a-input placeholder="请输入是否低保户" v-decorator="['sfdbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统评定结果：1-灰名单，2-白名单，3-黑名单">
          <a-input placeholder="请输入系统评定结果：1-灰名单，2-白名单，3-黑名单" v-decorator="['xtpdjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统评定说明">
          <a-input placeholder="请输入系统评定说明" v-decorator="['xtpdsm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关键人评定结果">
          <a-input placeholder="请输入关键人评定结果" v-decorator="['gjrpdjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关键人评定说明">
          <a-input placeholder="请输入关键人评定说明" v-decorator="['gjrpdsm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最终评定结果">
          <a-input placeholder="请输入最终评定结果" v-decorator="['zzpdjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最终评定说明">
          <a-input placeholder="请输入最终评定说明" v-decorator="['zzpdsm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否外出务工">
          <a-input placeholder="请输入是否外出务工" v-decorator="['sfycdg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户重要程度">
          <a-input placeholder="请输入客户重要程度" v-decorator="['kfyyqk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户潜在业务">
          <a-input placeholder="请输入客户潜在业务" v-decorator="['kcqzyw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户授信情况">
          <a-input placeholder="请输入客户授信情况" v-decorator="['khsxqk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经度">
          <a-input placeholder="请输入经度" v-decorator="['longitude', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="纬度">
          <a-input placeholder="请输入纬度" v-decorator="['latitude', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子签名1">
          <a-input placeholder="请输入电子签名1" v-decorator="['sign1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子签名2">
          <a-input placeholder="请输入电子签名2" v-decorator="['sign2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备用号码">
          <a-input placeholder="请输入备用号码" v-decorator="['byhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="陪访人">
          <a-input placeholder="请输入陪访人" v-decorator="['pfr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型1">
          <a-input placeholder="请输入客户类型1" v-decorator="['khlx1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型2">
          <a-input placeholder="请输入客户类型2" v-decorator="['khlx2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有无子女">
          <a-input placeholder="请输入有无子女" v-decorator="['ywzn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="健康状况">
          <a-input placeholder="请输入健康状况" v-decorator="['jkzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="劳动能力">
          <a-input placeholder="请输入劳动能力" v-decorator="['ldnl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="居住年限">
          <a-input placeholder="请输入居住年限" v-decorator="['jznx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高学历">
          <a-input placeholder="请输入最高学历" v-decorator="['zgxl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高学位">
          <a-input placeholder="请输入最高学位" v-decorator="['zgxw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="道德品质综合评价">
          <a-input placeholder="请输入道德品质综合评价" v-decorator="['ddpzzhpj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="居住状态">
          <a-input placeholder="请输入居住状态" v-decorator="['jzzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件签发日期">
          <a-date-picker v-decorator="[ 'zjqfrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件到期日期">
          <a-date-picker v-decorator="[ 'zjdqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="返乡时间">
          <a-date-picker v-decorator="[ 'fxsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否授信（1：是 2：否）">
          <a-input placeholder="请输入是否授信（1：是 2：否）" v-decorator="['sfsx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评议信息有效标识：0-无效，1-有效">
          <a-input placeholder="请输入评议信息有效标识：0-无效，1-有效" v-decorator="['pyxxFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户基础信息有效标识：0-无效，1-有效">
          <a-input placeholder="请输入客户基础信息有效标识：0-无效，1-有效" v-decorator="['khxxFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户管理有效标识：0-无效，1-有效">
          <a-input placeholder="请输入客户管理有效标识：0-无效，1-有效" v-decorator="['khglFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户签名标识：0-无效，1-有效">
          <a-input placeholder="请输入客户签名标识：0-无效，1-有效" v-decorator="['signFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属客户经理">
          <a-input placeholder="请输入所属客户经理" v-decorator="['sskhjl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工作单位">
          <a-input placeholder="请输入工作单位" v-decorator="['gzdw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工作单位地址">
          <a-input placeholder="请输入工作单位地址" v-decorator="['gzdwdz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="腾讯QQ号码">
          <a-input placeholder="请输入腾讯QQ号码" v-decorator="['qq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="务工城市">
          <a-input placeholder="请输入务工城市" v-decorator="['wgcs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否吸毒人员">
          <a-input placeholder="请输入是否吸毒人员" v-decorator="['sfxdry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子签名3">
          <a-input placeholder="请输入电子签名3" v-decorator="['sign3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否授信对象">
          <a-input placeholder="请输入是否授信对象" v-decorator="['sfsxdx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="采集点（定位地址）">
          <a-input placeholder="请输入采集点（定位地址）" v-decorator="['gddz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="住地邮编">
          <a-input placeholder="请输入住地邮编" v-decorator="['zdyb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不予授信情况">
          <a-input placeholder="请输入不予授信情况" v-decorator="['bysxqx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="采集状态(1:采集户 ，2:收集户， 3:不予授信,)">
          <a-input placeholder="请输入采集状态(1:采集户 ，2:收集户， 3:不予授信,)" v-decorator="['cjzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收集户原因">
          <a-input placeholder="请输入收集户原因" v-decorator="['sjhyy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上传状态">
          <a-input placeholder="请输入上传状态" v-decorator="['cjwczt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="具体从事经营项目">
          <a-input placeholder="请输入具体从事经营项目" v-decorator="['jtcsxm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="务工地区">
          <a-input placeholder="请输入务工地区" v-decorator="['wgdq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="务工类型">
          <a-input placeholder="请输入务工类型" v-decorator="['wglx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型3">
          <a-input placeholder="请输入客户类型3" v-decorator="['khlx3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入标识">
          <a-input placeholder="请输入录入标识" v-decorator="['lrbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入时间">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入人">
          <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="upDt">
          <a-input placeholder="请输入upDt" v-decorator="['upDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="upTm">
          <a-input placeholder="请输入upTm" v-decorator="['upTm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zdyzbm">
          <a-input placeholder="请输入zdyzbm" v-decorator="['zdyzbm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="khblsh">
          <a-input placeholder="请输入khblsh" v-decorator="['khblsh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ddpzzhpj1">
          <a-input placeholder="请输入ddpzzhpj1" v-decorator="['ddpzzhpj1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ddpzzhpj2">
          <a-input placeholder="请输入ddpzzhpj2" v-decorator="['ddpzzhpj2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="qzywyysj">
          <a-input placeholder="请输入qzywyysj" v-decorator="['qzywyysj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属支行">
          <a-input placeholder="请输入所属支行" v-decorator="['sszh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="性别">
          <a-input placeholder="请输入性别" v-decorator="['xb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年龄">
          <a-input placeholder="请输入年龄" v-decorator="['nl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否户主">
          <a-input placeholder="请输入是否户主" v-decorator="['sfhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否领取社保卡">
          <a-input placeholder="请输入是否领取社保卡" v-decorator="['sflqsbk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否开通社保卡">
          <a-input placeholder="请输入是否开通社保卡" v-decorator="['sfktsbk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="患病记录">
          <a-input placeholder="请输入患病记录" v-decorator="['hbjl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否非法集资">
          <a-input placeholder="请输入是否非法集资" v-decorator="['sfffjz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否公职人员">
          <a-input placeholder="请输入是否公职人员" v-decorator="['sfgzry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现担任职务">
          <a-input placeholder="请输入现担任职务" v-decorator="['xdrzw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业类别">
          <a-input placeholder="请输入行业类别" v-decorator="['hylb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户分群">
          <a-input placeholder="请输入客户分群" v-decorator="['khfq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职业">
          <a-input placeholder="请输入职业" v-decorator="['cszy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="从业年限">
          <a-input placeholder="请输入从业年限" v-decorator="['cynx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他外部数据1">
          <a-input placeholder="请输入其他外部数据1" v-decorator="['qtwbsj1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他外部数据2">
          <a-input placeholder="请输入其他外部数据2" v-decorator="['qtwbsj2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他外部数据3">
          <a-input placeholder="请输入其他外部数据3" v-decorator="['qtwbsj3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他外部数据4">
          <a-input placeholder="请输入其他外部数据4" v-decorator="['qtwbsj4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他外部数据5">
          <a-input placeholder="请输入其他外部数据5" v-decorator="['qtwbsj5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号码（导入）">
          <a-input placeholder="请输入手机号码（导入）" v-decorator="['sjhmImport', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留号码">
          <a-input placeholder="请输入预留号码" v-decorator="['ylhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="我行诉讼">
          <a-input placeholder="请输入我行诉讼" v-decorator="['whss', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="诈骗人员">
          <a-input placeholder="请输入诈骗人员" v-decorator="['zpry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="非法集资">
          <a-input placeholder="请输入非法集资" v-decorator="['ffjz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否服刑">
          <a-input placeholder="请输入是否服刑" v-decorator="['sffx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款真实性">
          <a-input placeholder="请输入贷款真实性" v-decorator="['dkzsx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注1">
          <a-input placeholder="请输入备注1" v-decorator="['bz1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注2">
          <a-input placeholder="请输入备注2" v-decorator="['bz2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否死亡">
          <a-input placeholder="请输入是否死亡" v-decorator="['sfsw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="停留时间">
          <a-input placeholder="请输入停留时间" v-decorator="['tlsj', {}]" />
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
    name: "KhxxglKhxqNhModal",
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
        },
        url: {
          add: "/nh/khxxglKhxqNh/add",
          edit: "/nh/khxxglKhxqNh/edit",
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
          this.form.setFieldsValue(pick(this.model,'wgbh','jgdm','khlx','hhbm','khmc','zjhm','mz','hyzk','hkxz','yhzgx','whcd','cshygz','sjhm','hjdz','zz','bz','yssxz','yxzc','zz1','zz2','sfbldkh','sfpkh','sfdbh','xtpdjg','xtpdsm','gjrpdjg','gjrpdsm','zzpdjg','zzpdsm','sfycdg','kfyyqk','kcqzyw','khsxqk','longitude','latitude','sign1','sign2','byhm','pfr','khlx1','khlx2','ywzn','jkzk','ldnl','jznx','zgxl','zgxw','ddpzzhpj','jzzt','sfsx','pyxxFlag','khxxFlag','khglFlag','signFlag','sskhjl','gzdw','gzdwdz','qq','wgcs','sfxdry','sign3','sfsxdx','gddz','zdyb','bysxqx','cjzt','sjhyy','cjwczt','jtcsxm','wgdq','wglx','khlx3','lrbz','lrr','upDt','upTm','zdyzbm','khblsh','ddpzzhpj1','ddpzzhpj2','qzywyysj','sszh','xb','nl','sfhz','sflqsbk','sfktsbk','hbjl','sfffjz','sfgzry','xdrzw','hylb','khfq','cszy','cynx','qtwbsj1','qtwbsj2','qtwbsj3','qtwbsj4','qtwbsj5','sjhmImport','ylhm','whss','zpry','ffjz','sffx','dkzsx','bz1','bz2','sfsw','tlsj'))
		  //时间格式化
          this.form.setFieldsValue({zjqfrq:this.model.zjqfrq?moment(this.model.zjqfrq):null})
          this.form.setFieldsValue({zjdqrq:this.model.zjdqrq?moment(this.model.zjdqrq):null})
          this.form.setFieldsValue({fxsj:this.model.fxsj?moment(this.model.fxsj):null})
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            formData.zjqfrq = formData.zjqfrq?formData.zjqfrq.format():null;
            formData.zjdqrq = formData.zjdqrq?formData.zjdqrq.format():null;
            formData.fxsj = formData.fxsj?formData.fxsj.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            
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