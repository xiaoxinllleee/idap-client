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
      <a-form :form="form" >
        <a-divider orientation="center" style="color: #1890FF;">基本信息</a-divider>
        <a-card class="card" :bordered="true">
          <!--隐藏域-->
          <a-input placeholder="客户证件号码" v-decorator="['zjhm', {}]" hidden></a-input>
          <j-tree-select placeholder="所属组织" v-decorator="['zzbz', {}]" dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" :treeDefaultExpandAll=true :disabled="true" hidden/>
          <a-input hidden placeholder="基准利率" v-decorator="['jjll',{}]"/>
          <a-input hidden placeholder="报价日期" v-decorator="['bjrq',{}]"/>
          <a-input hidden placeholder="LPR利率" v-decorator="['lprll',{}]"/>
          <!--隐藏域-->

          <a-row>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价年份">
                <a-input placeholder="定价年份"  v-decorator="['djnf', {}]" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位">
                <span style="font-weight: bolder">万元</span>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请客户名称">
                <a-input placeholder="申请客户名称" :disabled=true v-decorator="['khmc', {rules: [{ required: true, message: '申请客户名称不能为空!' }]}]" disabled=""/>
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
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上年优惠后执行利率不得低于:">
                <a-input-number placeholder="上年优惠后执行利率不得低于" v-decorator="['snzxll', {}]" style="width: 100%" disabled/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合授信额度">
                <a-input-number :disabled="true" placeholder="综合授信额度" v-decorator="['zhsxed', {rules: [{ required: true, message: '请输入授信额度!' }]}]" :min="0" :max="100000" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 16 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 7 }}"  label="贷款授信+承兑敞口(除专项贷款外)">
                <a-input-number placeholder="贷款授信+承兑敞口(除专项贷款外)"
                                v-decorator="['cdck', {rules: [{ required: true, message: '请输入贷款授信+承兑敞口!' }]}]"
                                :min="0" :max="100000" style="width: 100%" disabled/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
                <j-dict-select-tag placeholder="请选择" v-decorator="['dkqx', {rules: [{ required: true, message: '请选择贷款期限!' }],initialValue:'请选择'}]" :triggerChange="true" dictCode="dkqxly" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型">
                <!--客户类型默认值为:`个人`：initialValue:'1'-->
                <j-dict-select-tag placeholder="请选择" v-decorator="['khlx', {rules: [{ required: true, message: '请选择客户类型!' }],initialValue:'1'}]" :triggerChange="true" dictCode="lldj_khlx" disabled/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否便民卡">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfbmk', {rules: [{ required: true, message: '请选择是否便民卡!' }],initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否保证保险贷款">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfbzbxdk', {rules: [{ required: true, message: '请选择是否保证保险贷款!' }],initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" disabled/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 16 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 7 }}" label="是否享受`小微客户定价普惠措施`">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfjzxkh', {rules: [{ required: true, message: '请选择是否享受`小微客户定价普惠措施`!' }],initialValue:'2'}]"
                                   :triggerChange="true" dictCode="sfbz" :disabled="sfjzxkhDisabled" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否高危行业">
                <j-dict-select-tag placeholder="请选择"
                                   v-decorator="['sfgwhy', {rules: [{ required: true, message: '请选择是否高危行业!' }],initialValue:'2'}]"
                                   :triggerChange="true" dictCode="sfbz" :disabled="sfgwhyDisabled"/>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 16 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 7 }}" label="农村三权抵（质）押贷款">
                <j-dict-select-tag placeholder="请选择" v-decorator="['ncsqdzydk', {}]" :triggerChange="true" dictCode="sfbz" :disabled="ncsqdzydkDisabled"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否为花炮企业">
                <j-dict-select-tag placeholder="请选择" v-decorator="['sfhpqy', {}]" :triggerChange="true" dictCode="sfbz" :disabled="sfhpqyDisabled"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">1.信用等级(得分：{{this.model.DF_KH00001}})</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="20" :offset="2">
              <a-form-item >
                <!--默认选中：initialValue:'GZ00004'-->
                <a-radio-group :disabled="true"  buttonStyle="solid" v-decorator="['KH00001',{}]">
                  <a-radio value="GZ00001">企业A</a-radio>
                  <a-radio value="GZ00002">企业AA</a-radio>
                  <a-radio value="GZ00003">企业AAA</a-radio>
                  <a-radio value="GZ00004">个人1级</a-radio>
                  <a-radio value="GZ00005">个人2级</a-radio>
                  <a-radio value="GZ00006">信用等级BBB</a-radio>
                  <a-radio value="GZ00056">个人3级</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">2.扣分项目(得分：{{this.model.DF_KH00002}})</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              <a-form-item>借款人(含法人代表、主要股东及配偶)征信有不良记录</a-form-item>
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item>
                <!--默认值：initialValue:0-->
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00009', {}]" :min="0" :max="99" :step="1" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex"  justify="center" align="middle">
            <a-col :span="10" :offset="1">
              <a-form-item>借款人上年在本行贷款(含贷记卡)未按期清息、还款次数</a-form-item>
            </a-col>
            <a-col :span="11" :offset="0">
              <a-form-item>
                <!--默认值：initialValue:0-->
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00010', {}]" :min="0" :max="99" :step="1" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">3.资产负债率(得分：{{this.model.DF_KH00003}})</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >资产总额</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00013', {}]" @blur="calcFzl" :min="0" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >负债总额</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00014', {}]" @blur="calcFzl" :min="0" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >资产负债率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="资产负债率" v-decorator="['GZ00015', {initialValue: 0}]"
                                :min="0" style="width: 30%" disabled
                                :formatter="value => `${value}%`"
                                :parser="value => value.replace('%','')"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">4.经营期限(得分：{{this.model.DF_KH00004}})</a-divider>
        <a-card class="card" :bordered="true">
          <a-row   type="flex" justify="start" align="middle">
            <a-col :span="4" :offset="2">
              <a-form-item >
                <!--默认值：initialValue:'GZ00055'-->
                <a-radio-group :disabled="true"  buttonStyle="solid" v-decorator="['KH00004',{}]">
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

        <a-divider orientation="left" style="color: #1890FF;">5.销售收入归行(得分：{{this.model.DF_KH00005}})</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >销售收入</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00021', {}]" @blur="calcBs" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >流动负债</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number :disabled="true"  placeholder="请填写数字" v-decorator="['GZ00022', {}]" @blur="calcBs" :min="0" style="width: 30%" />
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

        <a-divider orientation="left" style="color: #1890FF;">6.客户存款贡献(得分：{{this.model.KHGXDF}})</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >开户基本账户往来年限</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <j-dict-select-tag :disabled="true"  placeholder="请选择" v-decorator="['GZ00031', {initialValue:'1'}]" :triggerChange="true" dictCode="lldj_khnx" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >日平存款占贷款比例(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input type="=number" placeholder="请填写数字" v-decorator="['GZ00032', {initialValue:'0'}]":min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三年第一个年度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00033', {initialValue:'0.00'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三年第二个年度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00034', {initialValue:'0.00'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三年第三个年度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00035', {initialValue:'0.00'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户上一个年度在其他银行存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number :disabled="true"  placeholder="请填写数字" v-decorator="['GZ00036', {}]" @blur="computeRpckzdkbl" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户上一个年度在其他银行定期存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number  :disabled="true" placeholder="请填写数字" v-decorator="['GZ00037', {}]" @blur="computeRpckzdkbl" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >定价存款日平合计</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00038', {initialValue:'0.0000'}]" :min="0" style="width:30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider v-if="false" orientation="left" style="color: #1890FF;">7.客户收益贡献(得分：{{this.model.DF_KH00008}})</a-divider>
        <a-card v-if="false"  class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >上年执行利率(‰)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="上年执行利率" v-decorator="['GZ00039', {initialValue:'0.00'}]" @blur="computeKhsygx" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >本行资金成本率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00040', {initialValue:'4.00'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >上年贷款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00041', {}]" @blur="computeKhsygx" :min="0" style="width: 30%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >收益贡献</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input tpye="number" placeholder="收益贡献" v-decorator="['GZ00042', {initialValue: '0.00'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">7.客户代理业务(得分：{{this.model.DF_KH00009}})</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >本年在本行代发工资人数</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00043', {}]" :min="0" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >高危行业财产保险本年应保或第一受益人不是本行</a-form-item></a-col>
            <a-col :span="6">
              <a-form-item >
                <j-dict-select-tag :disabled="true" placeholder="请选择" v-decorator="['GZ00044', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >高危行业财产保险本年应保不全</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <j-dict-select-tag :disabled="true" placeholder="请选择" v-decorator="['GZ00045', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >保险到期未能如期续保且第一受益人不是本行、不能覆盖定价周期</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <j-dict-select-tag :disabled="true" placeholder="请选择" v-decorator="['GZ00046', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">8.其他业务(得分：{{this.model.DF_KH00010}})</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >实际控制企业有国际贸易业务外汇结算量(美元)</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00047', {}]" :triggerChange="true" :min="0" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >其他银行存款日平占本行存款日平比例(%)</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00048', {}]" :min="0" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >基本账户未在我行或在我行但资金归行不走基本账户</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <j-dict-select-tag :disabled="true" placeholder="请选择" v-decorator="['GZ00049', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="15" :offset="2">
              <a-form-item >客户能够开立我行手机银行、口袋零钱及其他第三方支付绑定我行卡但未开通的，或开通未使用的，每项扣2分</a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item >
                <a-input-number :disabled="true" placeholder="请填写数字" v-decorator="['GZ00057', {}]" :min="0" style="width: 50%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider v-if="false" orientation="left" style="color: #1890FF;">9.基准利率</a-divider>
        <a-card v-if="false" class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >贷款一年(含)以内基准利率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="贷款一年(含)以内基准利率"  v-decorator="['GZ00050', {initialValue:'4.35'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >贷款一至五年(含)基准利率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="贷款一至五年(含)基准利率" v-decorator="['GZ00051', {initialValue:'4.35'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >贷款五年以上基准利率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="贷款五年以上基准利率"  v-decorator="['GZ00052', {initialValue:'4.90'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider v-if="false" orientation="left" style="color: #1890FF;">10.资金成本率</a-divider>
        <a-card v-if="false"  class="card" :bordered="true">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >本行资金成本率(%)</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="本行资金成本率"  v-decorator="['GZ00053', {initialValue:'4.00'}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">9.客户担保信息(得分：{{this.model.dbzdf}})</a-divider>
        <j-editable-table ref="khdbxx"
                          :disabled="true"
                          :loading="dydbTable.loading"
                          :columns="dydbTable.columns"
                          :dataSource="dydbTable.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :onscroll="true"
                          :actionButton="false"/>

        <!--<a-divider orientation="left" style="color: #1890FF;">10.得分合计</a-divider>-->
        <a-card class="card" :bordered="true" style="margin-top: 20px">
          <a-row class="form-row" >
            <a-descriptions title="系统提示" v-if="Number.parseInt(sfhpqyDisplay) === 1">
              <a-descriptions-item label="其中">{{ this.note }}</a-descriptions-item>
            </a-descriptions>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价得分合计">
                <a-input v-decorator="['dfhj', {initialValue:'0'}]" style="width: auto" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="对应档次LPR利率">
                <a-input v-decorator="['dyyhjdcs']" style="width: auto" disabled/>&nbsp;%
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠前LPR基点">
                <a-input v-decorator="['jdbp']" style="width: auto" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠前执行利率">
                <a-input v-decorator="['zxll']" style="width: auto" :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>&nbsp;%
              </a-form-item>
            </a-col>


            <!--2023年5月12日 张斐然 利率展示中间一行隐藏-->
            <!--            <a-col :span="12">
                          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠后LPR基点">
                            <a-input v-decorator="['yhhjdbp']" style="width: auto" disabled/>
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠后执行利率">
                            <a-input v-decorator="['yhhZxll6']" style="width: auto" :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>&nbsp;%
                          </a-form-item>
                        </a-col>-->

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠后最终LPR基点">
                <a-input v-decorator="['yhhLprjd7']" style="width: auto" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠后最终执行利率">
                <a-input v-decorator="['yhhzxll']" style="width: auto" :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>&nbsp;%
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { putAction,getAction } from '@/api/manage'
import { FormTypes, getRefPromise } from '@/utils/JEditableTableUtil'
import JEditableTable from '@comp/jeecg/JEditableTable'

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
      submitData: {},
      title: "利率定价计算",
      opType: 'add',
      spzt: '0',
      dbje: '',
      model: {},
      visible: false,
      labelCol: {
        sm: {span: 11},
      },
      wrapperCol: {
        sm: {span: 12},
      },
      dydbTable: {
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
            validateRules: [{
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
                message: '${title}不能为空' // 提示的文本
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
            defaultValue: '',
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
            validateRules: [{
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
      // validatorRules:{
      //   djnf:{rules: [{ required: true, message: '请输入定价年份!' }]},
      //   zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
      // },
      sfjzxkhDisabled: true, // 是否享受`小微客户定价普惠措施` 禁用标识
      sfgwhyDisabled:  true, // 是否高危行业 禁用标识
      ncsqdzydkDisabled: true , // 农村三权抵（质）押贷款 禁用标识
      sfhpqyDisabled: true,  // 是否为花炮企业 禁用标识
      sfhpqyDisplay: 2,  // //计算、重新计算、查看、打印 花炮企业优惠政策信息展示标识 1 展示 2 不展示
      note: '', // 花炮企业一类担保部分优惠信息
      fApi:{},
      //表单生成规则
      rule:[],
      //组件参数配置
      option:{
        //表单提交事件
        form:{
          labelPosition:"right",
          labelWidth:200,
          labelcolon:true,
          showMessage:true,
        },
        row:{
          gutter:6,
        },
        rateDbxxgls:[],
        resetBtn: false,
        submitBtn: false,
        onSubmit:function (formData) {
          alert(JSON.stringify(formData));
          this.submitData=JSON.stringify(formData);
        },

      },
      url: {
        add: "/dklldj/lldjjs/add",
        edit: "/dklldj/lldjjs/edit",
        sqmxlist:"/dklldj/lldjsq/sqmxlist",
        getCompute:"/dklldj/lldjjs/getCompute",
        getDbxxByZjhm: "/dklldj/lldjsq/getDbxxByZjhm",
        getjsonMock: '/dklldj.zbgzsz/zbgzsz/getjsonMock',
        getNameByZjhm: "/dklldj.jbxxgl.khxxgl/rate_khjbxxb/getNameByZjhm",
      },
    }
  },
  created () {
    //this.initJsonMock();
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      console.log('LljsModal.edit() 参数 record\n',record)
      this.visible = true
      this.confirmLoading = true
      this.form.resetFields()
      this.model = Object.assign({}, record)
      let djnfstr = record.djnf.toString()
      var djnf = djnfstr.length > 4 ? djnfstr.substr(0, 4) : djnfstr
      this.model.djnf = djnf
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(
          this.model,
          'zzbz', 'zjhm', 'djnf', 'khmc', 'frdb', 'snsxed', 'snzxll', 'zhsxed', 'cdck', 'dkqx', 'khlx', 'sfbmk', 'sfbzbxdk', 'sfjzxkh', 'sfgwhy', 'ncsqdzydk', 'sfhpqy',
          'KH00001','KH00004',
          'GZ00009','GZ00010', 'GZ00013','GZ00014','GZ00015', 'GZ00021','GZ00022','GZ00023', 'GZ00031','GZ00032','GZ00033','GZ00034','GZ00035','GZ00036','GZ00037','GZ00038',
          'GZ00039','GZ00040','GZ00041','GZ00042', 'GZ00043','GZ00044','GZ00045','GZ00046', 'GZ00047','GZ00048','GZ00049', 'GZ00050','GZ00051','GZ00052','GZ00053','GZ00057'
        ))
        var dksx = this.form.getFieldValue('cdck')
        console.info('承兑敞口+贷款授信：',dksx)
        if (dksx) {
          let data = {
            'zjhm': this.model.zjhm,
            'djnf': this.model.djnf + '-01-01'
          }
          this.confirmLoading = true
          getAction(this.url.sqmxlist, data).then((res) => {
            if (res.success) {
              console.log('LljsModal - edit - sqmxlist\n',res.result)
              this.form.setFieldsValue(
                pick(res.result,'KH00001','KH00004',
                  'GZ00009','GZ00010', 'GZ00013','GZ00014','GZ00015', 'GZ00021','GZ00022','GZ00023', 'GZ00031','GZ00032','GZ00033','GZ00034','GZ00035','GZ00036','GZ00037','GZ00038',
                  'GZ00039','GZ00040','GZ00041','GZ00042', 'GZ00043','GZ00044','GZ00045','GZ00046', 'GZ00047','GZ00048','GZ00049', 'GZ00050','GZ00051','GZ00052','GZ00053','GZ00057'
                ))
              getAction(this.url.getCompute, data).then((res) => {
                if (res.success) {
                  console.log('LljsModal - edit - getCompute\n',res.result)
                  this.model = Object.assign(this.model, res.result)
                  this.form.setFieldsValue(pick(
                    res.result,
                    'xydjdf', 'dfkh00002', 'dfkh00003', 'dfkh00004', 'dfkh00005', 'khgxdf', 'dfkh00008', 'dfkh00010',
                    'dbzdf', 'dfhj', 'dyyhjdcs', 'jdbp', 'zxll', 'yhhjdbp', 'yhhZxll6', 'yhhLprjd7', 'yhhzxll'
                  ))
                } else {
                  this.$message.warning(res.message,5)
                }
              }).finally(() => {
                console.log('model数据\n',this.model)
                console.info('花炮企业：',Number.parseInt(this.model.sfhpqy))
                console.info('小微客户定价普惠措施：',Number.parseInt(this.model.sfjzxkh))
                console.info('展示：',Number.parseInt(this.model.sfhpqyDisplay))
                if (Number.parseInt(this.model.sfhpqy) === 1 &&
                  Number.parseInt(this.model.sfjzxkh) === 2 &&
                  Number.parseInt(this.model.sfhpqyDisplay) === 1) {
                  this.sfhpqyDisplay = Number.parseInt(this.model.sfhpqyDisplay)
                  // 花炮企业一类担保部分优惠信息
                  this.note = this.model.note
                  console.info('展示：',this.sfhpqyDisplay)
                } else {
                  this.sfhpqyDisplay = 2;
                  this.note = '';
                }
                this.confirmLoading = false
              })
              this.queryDbxx()
            } else {
              this.$message.warning(res.message,5)
            }
          })
        }
      })
    },
    // 查询客户担保信息
    queryDbxx() {
      var zjhm = this.model.zjhm
      var djnf = this.model.djnf+'-01-01'
      console.log('定价年份',this.model.djnf);
      let data = {
        'zjhm': zjhm,
        'djnf': djnf
      }
      getAction(this.url.getDbxxByZjhm, data).then((res) => {
        if (res.success) {
          this.dydbTable.dataSource = res.result;
        } else {
          this.$message.warning(res.message,5)
        }
      }).catch((error) => {
        this.$message.error('客户担保信息获取失败，请联系管理员处理！', error)
      }).finally(() => {})
    },
    // 确认保存
    handleOk() {
      //如果授信额度变化了 就要重新计算
      //this.computeRpckzdkbl();
      const that = this;
      that.$confirm({
        title: '提示',
        content: '是否确认执行该操作?',
        onOk() {
          that.form.validateFields((err, values) => {
            if (!err) {
              let httpurl = that.url.add
              console.info('操作标识',that.opType)
              if (that.opType === 'edit') {
                httpurl = that.url.edit
              }
              let method = 'post'
              let formData = Object.assign(that.model, values)
              console.log('审批状态:', that.spzt)
              var spzt = Number(that.spzt).toFixed(0)
              if (spzt === 1) {
                formData.spzt = '1'
              } else {
                formData.spzt = '0'
              }
              let djnfstr = formData.djnf.toString()
              formData.djnf = djnfstr.length === 4 ? djnfstr + '-01-01' : djnfstr
              console.log('利率定价计算 保存formData', formData)
              that.confirmLoading = true
              httpAction(httpurl, formData, method).then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.$emit('ok')
                  that.close()
                } else {
                  that.$message.warning(res.message)
                }
              }).finally(() => {
                that.confirmLoading = false
              })
            }
          })
        },
        onCancel() {
          console.log('用户取消操作！')
        },
      });

    },
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close');
      this.dydbTable.dataSource=[];
      this.model.djnf="";
      this.visible = false;
    },
    // 测算`GZ00015:资产负债率`
    calcFzl(){
      var zcze = this.form.getFieldValue('GZ00013')
      if (zcze == null || zcze === 0 || zcze === '') {
        this.form.setFieldsValue({GZ00015: 0})
        return
      }
      var zcfz = this.form.getFieldValue('GZ00014')
      if (zcfz == null || zcfz === 0 || zcfz === '') {
        this.form.setFieldsValue({GZ00015: 0})
        return
      }
      var result = (Number(zcfz) / Number(zcze)) * 100
      result = result.toFixed(2)
      this.form.setFieldsValue({GZ00015: result})
    },
    // 测算`GZ00023:销售收入归行倍数`
    calcBs() {
      // 销售收入
      var xssr = this.form.getFieldValue('GZ00021')
      console.log('xssr:'+xssr)
      if (xssr == null || xssr === 0 || xssr === '') {
        this.form.setFieldsValue({GZ00023: 0})
        return
      }
      // 流动负债
      var ldfz = this.form.getFieldValue('GZ00022')
      console.log('ldfz:'+ldfz)

      if (ldfz == null || ldfz === 0 || ldfz === '') {
        this.form.setFieldsValue({GZ00023: 0})
        return
      }
      var result = (Number(xssr) / Number(ldfz))
      result = result.toFixed(2)
      this.form.setFieldsValue({GZ00023: result})
    },
    // 测算`日平存款占贷款比例`
    computeRpckzdkbl(){
      var qsndynrp = this.form.getFieldValue('GZ00033')
      var qsndenrp = this.form.getFieldValue('GZ00034')
      var qsndsnrp = this.form.getFieldValue('GZ00035')
      var khsnqtrp = this.form.getFieldValue('GZ00036')
      var khsnqtdqrp = this.form.getFieldValue('GZ00037')
      console.log(khsnqtdqrp)
      var  khsnqtrpsum=Number(khsnqtrp==undefined?0:khsnqtrp)+Number(khsnqtdqrp==undefined?0:khsnqtdqrp);
      var mul = qsndynrp * 0.1 + qsndenrp * 0.2 + qsndsnrp * 0.7 + khsnqtrpsum * 0.1
      var mul2 =khsnqtrpsum;
      mul = mul > mul2 ? mul : mul2;
      this.form.setFieldsValue({GZ00038: mul.toFixed(2)});
      this.rpckzdkbl();
    },
    // 日平存款占贷款比例
    rpckzdkbl() {
      var rpsum =this.form.getFieldValue('GZ00038');
      var dksx = this.form.getFieldValue('cdck');
      var mul = (dksx==undefined?0:dksx)/(rpsum==undefined?0:rpsum)*100;
      this.form.setFieldsValue({GZ00032: mul.toFixed(2)})
    },
    // 测算客户`收益贡献`
    computeKhsygx(){
      var snzxll = this.form.getFieldValue('GZ00039')
      var zjcbl  = this.form.getFieldValue('GZ00040')
      var sndkrp = this.form.getFieldValue('GZ00041')
      var sygx = (Number(snzxll) * 12 ) / 10 - Number(zjcbl)
      sygx = sygx / 100
      sygx = sygx * Number(sndkrp)
      sygx = sygx.toFixed(2)
      this.form.setFieldsValue({ GZ00042: sygx})
    },

    // 获取表单生成规则`rule[]`
    initJsonMock() {
      var nowYear = moment(new Date(), 'YYYY')
      console.info('当前年份:', nowYear)
      putAction(this.url.getjsonMock, {}).then((res) => {
        if (res.success) {
          this.rule = res.result
        } else {
          this.$message.warning(res.message,5)
        }
      }).catch((error) => {
        this.$message.error('系统错误，请联系管理员处理！', error)
      }).finally(() => {})
    },
    // TODO: 方法用处不明
    change(){},
    // TODO: 方法用处不明
    writeName(){
      var zjhm = this.form.getFieldValue('zjhm')
      console.log('writeName zjhm:', zjhm)
      getAction(this.url.getNameByZjhm, {'zjhm': zjhm}).then((res) => {
        if (res.success) {
          console.log('writeName getAction res:', res)
          this.form.setFieldsValue({'khmc': res.result.khmc, 'zzbz': res.result.zzbz})
        } else {
          this.$message.warning(res.message,5)
        }
      }).catch((error) => {
        this.$message.error('系统错误，请联系管理员处理！', error)
      }).finally(() => {})
    },
    // TODO: 暂未调用，用处不明
    parseJson(json) {
      return JSON.parse(json, function (k, v) {
        if (v != null && v.indexOf && v.index0f("function") > -1) {
          try {
            return eval("(function()(return " + v + " })()")
          } catch (e) {
            return void console.error("[form- create]#F#Jk :".concat(v))
          }
        }
        return v
      })
    },
  }
}
</script>

<style lang="less" scoped>

.form-row {
  height: 40px;
}
</style>
