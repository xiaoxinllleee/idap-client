<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="保存"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">

      <a-form :form="form">
        <a-divider orientation="center" style="color: #1890FF;">基本信息</a-divider>
        <a-card class="card" :bordered="true">
          <!--隐藏域-->
          <a-input placeholder="客户证件号码" v-decorator="['zjhm', validatorRules.zjhm ]" hidden/>
          <j-tree-select placeholder="所属组织" v-decorator="['zzbz', validatorRules.zzbz]" dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" :treeDefaultExpandAll=true :disabled="true" hidden/>
          <!--隐藏域-->

          <a-row>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价年份">
                <a-input placeholder="定价年份" v-decorator="['djnf', validatorRules.djnf]" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位">
                <span style="font-weight: bolder">万元</span>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请客户名称">
                <a-input placeholder="申请客户名称" :disabled="true" v-decorator="['khmc', validatorRules.khmc]"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人代表">
                <a-input placeholder="法人代表" v-decorator="['frdb', {}]" disabled/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上年授信额度">
                <a-input-number placeholder="上年授信额度" v-decorator="['snsxed', {}]" style="width: 100%" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上年优惠后执行利率不得低于">
                <a-input-number placeholder="上年优惠后执行利率不得低于" v-decorator="['snzxll', {}]" style="width: 100%" disabled/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合授信额度">
                <!--设置初始默认值：initialValue:'100'-->
                <a-input-number placeholder="综合授信额度" v-decorator="['zhsxed', validatorRules.zhsxed]" :min="0" :max="100000" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 16 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 7 }}" label="贷款授信+承兑敞口(除专项贷款外)">
                <a-input-number placeholder="贷款授信+承兑敞口(除专项贷款外)" v-decorator="['cdck', validatorRules.cdck]" @blur="computeRpckzdkbl" :min="0" :max="100000" style="width: 100%"/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
                <j-dict-select-tag placeholder="请选择" v-decorator="['dkqx', validatorRules.dkqx]" :triggerChange="true" dictCode="dkqxly"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型">
                <!--客户类型默认值为:`个人`：initialValue:'1'-->
                <j-dict-select-tag placeholder="请选择" v-decorator="['khlx', validatorRules.khlx]" :triggerChange="true" dictCode="lldj_khlx" disabled/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否便民卡">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfbmk', validatorRules.sfbmk]" :triggerChange="true" dictCode="sfbz" :disabled="sfbmkDisabled"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否保证保险贷款">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfbzbxdk', validatorRules.sfbzbxdk]" :triggerChange="true" dictCode="sfbz"/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 16 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 7 }}" label="是否享受`小微客户定价普惠措施`">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfjzxkh', validatorRules.sfjzxkh]" :triggerChange="true" dictCode="sfbz" :disabled="sfjzxkhDisabled"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否高危行业">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfgwhy', validatorRules.sfgwhy]" :triggerChange="true" dictCode="sfbz" :disabled="sfgwhyDisabled"/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 16 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 7 }}" label="农村三权抵（质）押贷款">
                <j-dict-select-tag placeholder="请选择" v-decorator="['ncsqdzydk', validatorRules.ncsqdzydk]" :triggerChange="true" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否为花炮企业">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfhpqy', validatorRules.sfhpqy]" :triggerChange="true" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">1.信用等级</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="20" :offset="2">
              <a-form-item>
                <!--默认选中：initialValue:'GZ00004'-->
                <a-radio-group buttonStyle="solid" v-decorator="['KH00001',{}]">
                  <a-radio value="GZ00001">企业A</a-radio>
                  <a-radio value="GZ00002">企业AA</a-radio>
                  <a-radio value="GZ00003">企业AAA</a-radio>
                  <a-radio value="GZ00006">企业BBB</a-radio>
                  <a-radio value="GZ00004">个人1级</a-radio>
                  <a-radio value="GZ00005">个人2级</a-radio>
                  <a-radio value="GZ00056">个人3级</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">2.扣分项目</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="center" align="middle">
            <a-col :span="10" :offset="1">
              <a-form-item>借款人（含法人代表、主要股东及配偶）征信有不良记录</a-form-item>
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item>
                <!--默认值：initialValue:0-->
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00009', {}]" :min="0" :max="100" :step="1" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              <a-form-item>借款人上年在本行贷款（含贷记卡）未按期清息、还款次数</a-form-item>
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item>
                <!--默认值：initialValue:0-->
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00010', {}]" :min="0" :max="99" :step="1" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">3.资产负债率</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >资产总额</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00013', {}]" @blur="calcFzl" :min="0" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >负债总额</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00014', {}]" @blur="calcFzl" :min="0" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >资产负债率（%）</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="资产负债率" v-decorator="['GZ00015', {initialValue:0}]"
                                :min="0" style="width: 30%" disabled
                                :formatter="value => `${value}%`"
                                :parser="value => value.replace('%','')"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">4.经营期限</a-divider>
        <a-card class="card" :bordered="true">
          <a-row   type="flex" justify="start" align="middle">
            <a-col :span="4" :offset="2">
              <a-form-item >
                <!--默认值：initialValue:'GZ00055'-->
                <a-radio-group buttonStyle="solid" v-decorator="['KH00004',{}]">
                  <a-col style="margin-bottom: 20px">
                    <a-radio value="GZ00016">公司客户经营时间15年以上</a-radio>
                  </a-col>
                  <a-col style="margin-bottom: 20px">
                    <a-radio value="GZ00017">公司客户经营时间10-15年</a-radio>
                  </a-col>
                  <a-col style="margin-bottom: 20px">
                    <a-radio value="GZ00018">公司客户经营时间5-10年</a-radio>
                  </a-col>
                  <a-col style="margin-bottom: 20px">
                    <a-radio value="GZ00019">个人客户与本行贷款往来10年以上</a-radio>
                  </a-col>
                  <a-col style="margin-bottom: 20px">
                    <a-radio value="GZ00020">个人客户与本行贷款往来5-10年</a-radio>
                  </a-col>
                  <a-col>
                    <a-radio value="GZ00055">新客户不计分</a-radio>
                  </a-col>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">5.销售收入归行</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >销售收入</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00021', {}]" @blur="calcBs" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >流动负债</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00022', {}]" @blur="calcBs" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >倍数</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00023', {initialValue:0}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">6.客户存款贡献</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >开户基本账户往来年限</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00031', {initialValue:'2'}]" :triggerChange="true" dictCode="lldj_khnx" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三年第一个年度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="前三年第一个年度存款日平" v-decorator="['GZ00033', {initialValue:'0'}]"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三年第二个年度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="前三年第二个年度存款日平" v-decorator="['GZ00034', {initialValue:'0'}]"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三年第三个年度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="前三年第三个年度存款日平" v-decorator="['GZ00035', {initialValue:'0'}]"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >日平存款占贷款比例（%）</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="日平存款占贷款比例" v-decorator="['GZ00032', {initialValue:'0'}]":min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户上一个年度在其他银行存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00036', {}]" @blur="computeRpckzdkbl" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户上一个年度在其他银行定期存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00037', {}]" @blur="computeRpckzdkbl" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >定价存款日平合计</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="定价存款日平合计" v-decorator="['GZ00038', {initialValue:'0'}]" :min="0" style="width:30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <!--<a-divider orientation="left" style="color: #1890FF;">7.客户收益贡献</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>上年执行利率(‰)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="上年执行利率" v-decorator="['GZ00039', {initialValue:'0.00'}]"
                                @blur="computeKhsygx" :min="0" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>本行资金成本率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00040', {initialValue:'4.00'}]" :min="0"
                                style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>上年贷款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00041', {}]" @blur="computeKhsygx" :min="0"
                                style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>收益贡献</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input tpye="number" placeholder="收益贡献" v-decorator="['GZ00042', {initialValue: '0.00'}]" :min="0"
                         style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>-->

        <a-divider orientation="left" style="color: #1890FF;">7.客户代理业务</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >本年在本行代发工资人数</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00043', {}]" :min="0" :step="1" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >高危行业财产保险本年应保或第一受益人不是本行</a-form-item></a-col>
            <a-col :span="6">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00044', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >高危行业财产保险本年应保不全</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00045', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >保险到期未能如期续保且第一受益人不是本行、不能覆盖定价周期</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00046', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">8.其他业务</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >实际控制企业有国际贸易业务外汇结算量(美元)</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00047', {}]" :triggerChange="true" :min="0" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >其他银行存款日平占本行存款日平比例(%)</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00048', {}]" :min="0" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >基本账户未在我行或在我行但资金归行不走基本账户</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00049', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >客户能够开立我行手机银行、口袋零钱及其他第三方支付绑定我行卡但未开通的，或开通未使用的，每项扣2分</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00057', {}]" :min="0" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <!--<a-divider orientation="left" style="color: #1890FF;">10.基准利率</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>贷款一年(含)以内基准利率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="贷款一年(含)以内基准利率" v-decorator="['GZ00050', {initialValue:'4.35'}]" :min="0"
                                style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>贷款一至五年(含)基准利率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="贷款一至五年(含)基准利率" v-decorator="['GZ00051', {initialValue:'4.35'}]" :min="0"
                                style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>贷款五年以上基准利率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="贷款五年以上基准利率" v-decorator="['GZ00052', {initialValue:'4.90'}]" :min="0"
                                style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">11.资金成本率</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>本行资金成本率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="本行资金成本率" v-decorator="['GZ00053', {initialValue:'4.00'}]" :min="0"
                                style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>-->

        <a-divider orientation="left" style="color: #1890FF;">9.客户担保信息</a-divider>
        <a-card class="card" :bordered="true">
          <j-editable-table ref="khdbxx"
                            AddButtonName="添加担保信息"
                            :disabled="false"
                            :loading="dbxxTable.loading"
                            :columns="dbxxTable.columns"
                            :dataSource="dbxxTable.dataSource"
                            :maxHeight="300"
                            :rowNumber="true"
                            :rowSelection="true"
                            :actionButton="true"
                            @valueChange="valueChange">
          </j-editable-table>
        </a-card>
      </a-form>

    </a-spin>

  </a-modal>
</template>

<script>
  import {getAction, httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {FormTypes} from '@/utils/JEditableTableUtil'
  import JEditableTable from '@comp/jeecg/JEditableTable'
  import {notification} from "ant-design-vue";

  export default {
    name: "LldjsqModal",
    components: {
      JTreeSelect,
      JEditableTable
    },
    props: {
      // 是否显示操作按钮
      actionButton: {
        type: Boolean,
        default: false
      },
      // 是否显示行号
      rowNumber: {
        type: Boolean,
        default: false
      },
      // 是否可选择行
      rowSelection: {
        type: Boolean,
        default: false
      },
      // 页面是否在加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 页面是否在加载中
      maxHeight: {
        type: Number,
        default: 400
      },
      // 要禁用的行
      disabledRows: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否禁用全部组件
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否可拖拽排序
      dragSort: {
        type: Boolean,
        default: false
      },
      dragSortKey: {
        type: String,
        default: 'orderNum'
      },
      AddButtonName:{
        type: String,
        default: '新增'
      }
    },
    data () {
      return {
        submitData:{},
        title:"操作",
        dbje:'',
        model: {},
        visible: false,
        labelCol: {
          sm: { span: 11 },
        },
        wrapperCol: {
          sm: { span: 12 },
        },
        dbxxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '抵押物类型',
              key: 'dbw',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'dbw',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }]
            },
            {
              title: '所有权人',
              key: 'syqr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              ellipsis: true,
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }]
            },
            {
              title: '评估价值',
              key: 'pgjz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules:[
                {
                  required: true, // 必填
                  message: '${title}不能为空' // 提示的文本
                },
                {
                  pattern: /^([0-9]*|d*.d{1}?d*)$/, // 正则
                  message: '${title}只能是带一位小数点的数字'
                }
              ]
            },
            {
              title: '实际担保金额',
              key: 'sjdbje',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules:[
                {
                  required: true, // 必填
                  message: '${title}不能为空', // 提示的文本
                },
                {
                  pattern: /^([0-9]*|d*.d{1}?d*)$/, // 正则
                  message: '${title}只能是带一位小数点的数字'
                },
              ]
            },
            {
              title: '担保率(%)',
              key: 'dbl',
              type: FormTypes.inputNumber,
              defaultValue: '0',
              placeholder: '请输入${title}',
              disabled: true,
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }]
            },
            {
              title: '担保类型',
              key: 'dblx',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'dblx',
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }]
            },
            {
              title: '担保物描述',
              key: 'dbwms',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              ellipsis: true,
              validateRules:[{
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              }]
            },
          ]
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          djnf: {rules: [{required: true, message: '定价年份为空!'}]},
          zzbz: {rules: [{required: true, message: '所属组织为空!'}]},
          zjhm: {rules: [{required: true, message: '证件号码为空!'}]},
          khmc: {rules: [{required: true, message: '客户名称为空!'}]},
          zhsxed: {rules: [{required: true, message: '授信额度为空!'}]},
          cdck: {rules: [{required: true, message: '贷款授信+承兑敞口(除专项贷款外)为空!'}]},
          dkqx: {rules: [{required: true, message: '贷款期限为空!'}], initialValue: '1'},
          khlx: {rules: [{required: true, message: '客户类型为空!'}], initialValue: '1'},
          sfbmk: {rules: [{required: false, message: '请选择是否便民卡!'}], initialValue: '2'},
          sfbzbxdk: {rules: [{required: true, message: '请选择是否保证保险贷款!'}], initialValue: '2'},
          sfjzxkh: {rules: [{required: true, message: '请选择是否享受`小微客户定价普惠措施`!'}], initialValue: '2'},
          sfgwhy: {rules: [{required: true, message: '请选择是否高危行业!'}], initialValue: '2'},
          ncsqdzydk: {rules: [{required: true, message: '请选择是否农村三权抵（质）押贷款!'}], initialValue: '2'},
          sfhpqy: {rules: [{required: false, message: '请选择是否为花炮企业!'}], initialValue: '2'}
        },
        sfjzxkhDisabled: true, // 是否享受`小微客户定价普惠措施` 禁用标识
        sfgwhyDisabled:  true, // 是否高危行业 禁用标识
        sfbmkDisabled: false,  // 是否便民卡 禁用标识
        // sfhpqyDisplay: false,  // 是否为花炮企业 显示标识
        oprFlag: 'add',
        khqsndyndqckrp: '',
        khqsndendqckrp: '',
        khqsndsndqckrp: '',
        dbxxCheck: true,
        url: {
          add: "/dklldj/lldjsq/add",
          edit: "/dklldj/lldjsq/edit",
          sqmxlist:"/dklldj/lldjsq/sqmxlist",
          //getNameByZjhm: "/dklldj.jbxxgl.khxxgl/rate_khjbxxb/getNameByZjhm",
          getDbxxByZjhm: "/dklldj/lldjsq/getDbxxByZjhm",
          //getjsonMock: '/dklldj.zbgzsz/zbgzsz/getjsonMock',
        },
      }
    },
    created () {},
    methods: {

      add() {
        this.edit({})
      },

      edit(record) {
        this.visible = true
        this.confirmLoading = true
        console.info('edit-record',record)
        // 是否高危行业 禁用标识 处理 客户类型 企业 时可用 个人客户 不可用
        if (Number.parseInt(record.khlx) === 2) {
          this.sfgwhyDisabled = false
        } else {
          this.sfgwhyDisabled = true
        }
        //console.info('是否高危行业 禁用标识',this.sfgwhyDisabled)
        this.form.resetFields()
        this.model = Object.assign({}, record)
        let djnfstr = record.djnf.toString()
        this.model.djnf = djnfstr.length > 4 ? djnfstr.substr(0, 4) : djnfstr
        console.info('定价申请数据返回:',this.model)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(
            this.model,
            'zzbz', 'zjhm',
            'djnf', 'khmc', 'frdb', 'snsxed', 'snzxll', 'zhsxed', 'cdck', 'khlx',
            'khqsndyndqckrp', 'khqsndendqckrp', 'khqsndsndqckrp',
            'GZ00033', 'GZ00034', 'GZ00035', 'GZ00032',
            'GZ00039','GZ00040','GZ00050','GZ00051','GZ00052','GZ00053'
          ))
        })
        console.info('操作标识:',this.oprFlag)
        if (this.oprFlag === 'edit') {
          this.form.setFieldsValue(pick(
            this.model,
            'dkqx', 'khlx', 'sfbmk', 'sfbzbxdk', 'sfjzxkh', 'sfgwhy', 'ncsqdzydk', 'sfhpqy'
          ))
          let data = {
            'zjhm': this.model.zjhm,
            'djnf': this.model.djnf+"-01-01"
          }
          //this.confirmLoading = true
          getAction(this.url.sqmxlist, data).then((res) => {
            if (res.success) {
              console.info('定价申请明细数据返回:',res.result)
              this.form.setFieldsValue(
                pick(res.result,
                  'KH00001', 'KH00004',
                  'GZ00009', 'GZ00010',
                  'GZ00013', 'GZ00014', 'GZ00015',
                  'GZ00021', 'GZ00022', 'GZ00023',
                  'GZ00031', 'GZ00032', 'GZ00036', 'GZ00037', 'GZ00038',
                  'GZ00043', 'GZ00044', 'GZ00045', 'GZ00046',
                  'GZ00047', 'GZ00048', 'GZ00049', 'GZ00057'
                ))
            } else {
              notification.error({ message: '系统提示', description: '查询定价申请明细失败!'+res.message,duration: 4})
            }
          }).finally(()=>{
            // 计算日平存款占贷款比例
            this.computeRpckzdkbl()
            //查询担保信息
            this.queryDbxx()
          })
        }
        this.confirmLoading = false
      },

      // 查询客户担保信息
      queryDbxx() {
        let data = {
          'zjhm': this.model.zjhm,
          'djnf': this.model.djnf+'-01-01'
        }
        getAction(this.url.getDbxxByZjhm, data).then((res) => {
          if (res.success) {
            this.dbxxTable.dataSource = res.result
          } else {
            notification.warning({ message: '系统提示', description: '查询客户担保信息失败!'+res.message,duration: 4})
          }
        }).catch((error) => {
          notification.error({ message: '系统提示', description: '查询客户担保信息失败!'+error,duration: 4})
        })
      },

      // 测算`日平存款占贷款比例`
      computeRpckzdkbl() {
        var cdck = this.form.getFieldValue('cdck')
        cdck = Number(cdck).toFixed(2)
        if (cdck > 0) {
          /**
           * 便民卡要素联动已弃用
           * 2022年12月7日 星期三
           * @Author Penghr
           * 客户确认：浏阳农商银行-普惠金融部-张斐然
           */
          // 是否便民卡 贷款授信+承兑敞口在10万元-50万元(含)时，是否便民卡自动选择为是，否则为否
          //if (cdck >= 10 && cdck <= 50) {
          //  this.form.setFieldsValue({sfbmk: 1})
          //} else {
          //  this.form.setFieldsValue({sfbmk: 2})
          //}
          // 是否享受`小微客户定价普惠措施` 禁用 启用 处理 默认为否且禁用，若贷款授信+承兑敞口在100万(含)-1000万(含)，可自行选择
          if (cdck >= 100 && cdck <= 1000) {
            this.sfjzxkhDisabled = false
          } else {
            this.sfjzxkhDisabled = true
            this.form.setFieldsValue({sfjzxkh: 2})
          }
        }
        var qsndynrp   = this.form.getFieldValue('GZ00033') // 前三年第一个年度存款日平
        var qsndenrp   = this.form.getFieldValue('GZ00034') // 前三年第二个年度存款日平
        var qsndsnrp   = this.form.getFieldValue('GZ00035') // 前三年第三个年度存款日平
        var khsnqtrp   = this.form.getFieldValue('GZ00036') // 客户上一个年度在其他银行存款日平
        console.info('客户上一个年度在其他银行存款日平:'+khsnqtrp)
        //var khsnqtrpsum = Number(khsnqtrp === undefined ? 0 : khsnqtrp) + Number(khsnqtdqrp === undefined ? 0 : khsnqtdqrp);
        var khsnqtrpsum = Number(khsnqtrp === undefined ? 0 : khsnqtrp)
        console.info('客户上一个年度在其他银行存款日平合计:'+khsnqtrpsum)
        var mul = (qsndynrp * 0.1) + (qsndenrp * 0.2) + (qsndsnrp * 0.7) + (khsnqtrpsum * 0.1)
        var mul2 = Number(qsndsnrp === undefined ? 0 : qsndsnrp) + (khsnqtrpsum * 0.1)
        mul = mul > mul2 ? mul : mul2
        var rpckzdkbl = 0; //日平存款占贷款比例
        if (cdck > 0) {
          rpckzdkbl = (mul / cdck) * 100
          rpckzdkbl = Number(rpckzdkbl).toFixed(2)
        }
        //console.info('定价日平合计:',mul)
        //console.info('贷款授信额度:',cdck)
        console.info('日平存款占贷款比例:',rpckzdkbl)
        this.form.setFieldsValue({ GZ00032: rpckzdkbl })
        //计算加权定价日平存款合计
        var khsnqtdqrp = this.form.getFieldValue('GZ00037') // 客户上一个年度在其他银行定期存款日平
        console.info('客户上一个年度在其他银行定期存款日平:'+khsnqtdqrp)
        var qsndyndqrp = this.form.getFieldValue('khqsndyndqckrp')
        var qsndendqrp = this.form.getFieldValue('khqsndendqckrp')
        var qsndsndqrp = this.form.getFieldValue('khqsndsndqckrp')
        console.info('前三年第一年定期日平:',qsndyndqrp)
        console.info('前三年第二年定期日平:',qsndendqrp)
        console.info('前三年第三年定期日平:',qsndsndqrp)
        console.info('前三年第一年存款日平:',qsndynrp)
        console.info('前三年第二年存款日平:',qsndenrp)
        console.info('前三年第三年存款日平:',qsndsnrp)
        //前三年第一个年日平合计 = 前三年第一个年日平 + 前三年第一个年存款日平
        var qsndynrphj = Number(qsndynrp === undefined ? 0 : qsndynrp) + Number(qsndyndqrp === undefined ? 0 : qsndyndqrp)
        //前三年第二个年日平合计 = 前三年第二个年日平 + 前三年第二个年存款日平
        var qsndenrphj = Number(qsndenrp === undefined ? 0 : qsndenrp) + Number(qsndendqrp === undefined ? 0 : qsndendqrp)
        //前三年第三个年日平合计 = 前三年第三个年日平 + 前三年第三个年存款日平
        var qsndsnrphj = Number(qsndsnrp === undefined ? 0 : qsndsnrp) + Number(qsndsndqrp === undefined ? 0 : qsndsndqrp)
        //客户上年其他日平合计 = GZ00036 客户上一个年度在其他银行存款日平 + GZ00037 客户上一个年度在其他银行定期存款日平
        var khsnqtrphj = Number(khsnqtrp === undefined ? 0 : khsnqtrp) + Number(khsnqtdqrp === undefined ? 0 : khsnqtdqrp)
        //加权存款日平合计 = (前三年第一个年日平合计*0.1) + (前三年第二个年日平合计*0.2) + (前三年第三个年日平合计*0.7) + (客户上年其他日平合计*0.1)
        console.info('存款日平合计 = (前三年第一个年日平合计*0.1) + (前三年第二个年日平合计*0.2) + (前三年第三个年日平合计*0.7) + (客户上年其他日平合计*0.1)')
        console.info('前三年第一个年日平合计:', qsndynrphj)
        console.info('前三年第二个年日平合计:', qsndenrphj)
        console.info('前三年第三个年日平合计:', qsndsnrphj)
        console.info('客户上年其他日平合计:', khsnqtrphj)
        var jqckrphj = (qsndynrphj * 0.1) + (qsndenrphj * 0.2) + (qsndsnrphj * 0.7) + (khsnqtrphj * 0.1)
        //若`加权存款日平合计`大于`前三年第三年日平`，则`定价存款日平合计`等于`加权存款日平合计`，反之则等于`前三年第三年日平`
        jqckrphj = jqckrphj > qsndsnrp ? jqckrphj : qsndsnrp
        jqckrphj = Number(jqckrphj).toFixed(2)
        console.info('定价存款日平合计:', jqckrphj)
        this.form.setFieldsValue({ GZ00038: jqckrphj })
      },

      // 计算`GZ00015:资产负债率`
      calcFzl(){
        var zcze = this.form.getFieldValue('GZ00013')
        console.info('资产总额：'+zcze)
        if (zcze == null || zcze === 0 || zcze === '') {
          this.form.setFieldsValue({GZ00015: 0.00})
          return
        }
        var zcfz = this.form.getFieldValue('GZ00014')
        console.info('资产负债：'+zcfz)
        if (zcfz == null || zcfz === 0 || zcfz === '') {
          this.form.setFieldsValue({GZ00015: 0.00})
          return
        }
        var result = (Number(zcfz) / Number(zcze)) * 100
        result = result.toFixed(2)
        this.form.setFieldsValue({GZ00015: result})
      },

      // 计算`GZ00023:销售收入归行倍数`
      calcBs() {
        // 销售收入
        var xssr = this.form.getFieldValue('GZ00021')
        console.info('销售收入：'+xssr)
        if (xssr == null || xssr === 0 || xssr === '') {
          this.form.setFieldsValue({GZ00023: 0.00})
          return
        }
        // 流动负债
        var ldfz = this.form.getFieldValue('GZ00022')
        console.info('流动负债：'+ldfz)
        if (ldfz == null || ldfz === 0 || ldfz === '') {
          this.form.setFieldsValue({GZ00023: 0.00})
          return
        }
        var result = (Number(xssr) / Number(ldfz))
        result = result.toFixed(2)
        this.form.setFieldsValue({GZ00023: result})
      },

      // 担保信息验证
      viDbxx() {
        var dbje = 0
        let {error, values} = this.$refs.khdbxx.getValuesSync({})
        if (error === 0) {
          console.log('表单验证通过，数据：', values)
          this.dbxxCheck = true
          if (values == null || values.length === 0) {
            this.$message.warning("请添加担保信息")
            return
          }
          if (values.length > 0) {
            this.model.rateDbxxgls = values
            values.filter((item, i) => {
              dbje = dbje + (item.sjdbje - 0)
            })
          }
          this.dbje = dbje
        } else {
          console.log('未通过表单验证，数据：', values)
          this.dbxxCheck = false
          values.forEach((item,index) =>{
            console.info('index',index)
            console.info('item',item)
            if (item.dbw === undefined || item.dbw === '') {
              this.$message.warning("抵押物类型为空！")
              return
            }
            if (item.syqr === undefined || item.syqr === '') {
              this.$message.warning("所有权人为空！")
              return
            }
            if (item.pgjz === undefined || item.pgjz === '') {
              this.$message.warning("评估价值为空！")
              return
            }
            if (item.sjdbje === undefined || item.sjdbje === '') {
              this.$message.warning("实际担保金额为空！")
              return
            }
            if (item.dbl === undefined || item.dbl === '') {
              this.$message.warning("担保率为空！")
              return
            }
            if (item.dblx === undefined || item.dblx === '') {
              this.$message.warning("担保类型为空！")
              return
            }
            if (item.dbwms === undefined || item.dbwms === '') {
              this.$message.warning("担保物描述为空！")
              return
            }
          })
        }
      },

      valueChange(record) {
        var sjdbje = record.row.sjdbje
        var pgjz   = record.row.pgjz
        if (sjdbje && pgjz) {
          sjdbje = Number(sjdbje).toFixed(2)
          pgjz = Number(pgjz).toFixed(2)
          var dbl = (sjdbje / pgjz) * 100
          dbl = Number(dbl).toFixed(0)
          this.$refs.khdbxx.setValues([
            {
              rowKey: record.row.id,
              values: {
                'dbl': dbl,
              }
            },
          ])
        }
      },

      // 确认保存
      handleOk() {
        const that = this;
        //校验客户担保信息
        that.viDbxx()
        if (that.dbxxCheck === false) {
          return false
        }
        that.$confirm({
          title: '提示',
          content: '是否确认执行该操作?',
          onOk() {
            that.form.validateFields((err, values) => {
              if (!err) {
                var zhsxed   = that.form.getFieldValue('zhsxed')   //综合授信额度
                var cdck     = that.form.getFieldValue('cdck')     //贷款授信+承兑敞口(除专项贷款外)
                var khlx     = that.form.getFieldValue('khlx')     //客户类型
                var sfbmk    = that.form.getFieldValue('sfbmk')    //是否便民卡
                var sfjzxkh  = that.form.getFieldValue('sfjzxkh')  //是否享受`小微客户定价普惠措施`
                var sfgwhy   = that.form.getFieldValue('sfgwhy')   //是否高危行业
                var ncsqdzydk   = that.form.getFieldValue('ncsqdzydk')   //农村三权抵（质）押贷款
                var sfhpqy   = that.form.getFieldValue('sfhpqy')   //是否为花炮企业
                var GZ00044  = that.form.getFieldValue('GZ00044')  //高危行业财产保险本年应保或第一受益人不是本行
                var GZ00045  = that.form.getFieldValue('GZ00045')  //高危行业财产保险本年应保不全
                var GZ00046  = that.form.getFieldValue('GZ00046')  //保险到期未能如期续保且第一受益人不是本行、不能覆盖定价周期
                var GZ00049  = that.form.getFieldValue('GZ00049')  //基本账户未在我行或在我行但资金归行不走基本账户
                var xydj     = ""; //信用等级
                var jyqx     = ""; //经营期限
                if (zhsxed <= 10 || zhsxed >= 100000) {
                  that.$message.warning('综合授信金额输入不符合要求，需大于10万元（含）且小于100000万元（含），金额以万元为单位，请检查!')
                  return
                }
                if (cdck <= 0) {
                  that.$message.warning('贷款授信+承兑敞口金额必须大于0!，金额以万元为单位，请检查!')
                  return
                } else if (cdck <= 10 || cdck >= 100000) {
                  that.$message.warning('贷款授信+承兑敞口金额输入不符合要求，需大于10万元（含）且小于100000万元（含），金额以万元为单位，请检查!')
                  return
                } else if (cdck >= 10 && cdck <= 50) {
                  /**
                   * 便民卡要素联动已弃用
                   * 2022年12月7日 星期三
                   * @Author Penghr
                   * 客户确认：浏阳农商银行-普惠金融部-张斐然
                   */
                  //if (sfbmk === undefined) {
                  //  that.$message.warning('请选择是否便民卡!')
                  //  return
                  //}
                } else if (cdck >= 100 && cdck <= 1000) {
                  if (sfjzxkh === undefined) {
                    that.$message.warning('请选择是否享受`小微客户定价普惠措施`!')
                    return
                  }
                }
                if (ncsqdzydk === undefined) {
                  that.$message.warning('请选择是否农村三权抵（质）押贷款!')
                  return
                }
                if (sfhpqy === undefined) {
                  that.$message.warning('请选择是否花炮企业!')
                  return
                }
                if (khlx === 2) {
                  if (sfgwhy === undefined) {
                    that.$message.warning('请选择是否高危行业!')
                    return
                  }
                }
                console.info('实际担保金额：',that.dbje)
                console.info('贷款授信额度：',cdck)
                if (that.dbje < (cdck - 0)) {
                  that.$message.warning("实际担保金额不能小于贷款授信+承兑敞口金额，金额以万元为单位，请修改实际担保金额!")
                  return
                }
                if (GZ00044 === undefined || GZ00044 === 'undefined') {
                  that.$message.warning('`高危行业财产保险本年应保或第一受益人不是本行`未选择!')
                  return
                }
                if (GZ00045 === undefined || GZ00045 === 'undefined') {
                  that.$message.warning('`高危行业财产保险本年应保不全`未选择!')
                  return
                }
                if (GZ00046 === undefined || GZ00046 === 'undefined') {
                  that.$message.warning('`保险到期未能如期续保且第一受益人不是本行、不能覆盖定价周期`未选择!')
                  return
                }
                if (GZ00049 === undefined || GZ00049 === 'undefined') {
                  that.$message.warning('`基本账户未在我行或在我行但资金归行不走基本账户`未选择!')
                  return
                }

                let formData = Object.assign(that.model, values)
                console.log('handleOk formData:', formData)
                xydj = formData.KH00001
                jyqx = formData.KH00004
                // console.info('xydj',xydj)
                // console.info('jyqx',jyqx)
                if (xydj === null || xydj === undefined) {
                  that.$message.warning('请选择信用等级!')
                  return
                }
                if (jyqx === null || jyqx === undefined) {
                  that.$message.warning('请选择经营期限!')
                  return
                }

                let httpurl = ''
                let method = ''
                if (that.oprFlag === 'add') {
                  httpurl += that.url.add
                  method = 'post'
                } else {
                  httpurl += that.url.edit
                  method = 'put'
                }
                that.confirmLoading = true
                httpAction(httpurl, formData, method).then((res) => {
                  if (res.success) {
                    that.$message.success(res.message)
                    that.$emit('ok')
                  } else {
                    that.$message.warning(res.message)
                  }
                }).finally(() => {
                  that.confirmLoading = false
                  that.close()
                })
              }
            })
          },
          onCancel() {
            console.log('用户取消操作！')
          },
        })
      },

      handleCancel() {
        this.close()
      },

      close() {
        this.$emit('close')
        this.dbxxTable.dataSource = []
        this.model.djnf = ""
        this.visible = false
      },
    }
  }
</script>

<style lang="less" scoped>

.form-row {
  height: 40px;
}
</style>