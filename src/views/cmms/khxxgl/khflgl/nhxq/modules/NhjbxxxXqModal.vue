<template>
  <a-modal :title="title"
           :width="1450"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: true} }"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <!--客户管理\农户信息管理\新增农户信息-->
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-tabs default-active-key="1" animated="animated">
          <!--Tab 1：农户基本信息\Begin-->
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="book"/>个人信息</span>
            <a-card class="card" :bordered="false">
              <a-divider orientation="left" style="color: #1890FF;margin-top: -20px;">基本信息</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属网格">
                    <a-input placeholder="所属网格" v-model="dqUser.wgbh_dictText"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                    <j-dict-select-tag placeholder="请输入所属支行" v-model="dqUser.sszh" :triggerChange="true"
                                       dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                    <a-input placeholder="请输入户号编码" v-model="dqUser.hhbm"/>
                  </a-form-item>
                </a-col>


                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
                    <a-input placeholder="请输入客户名称" v-model="dqUser.khmc"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                    <a-input placeholder="请输入身份证号码" v-model="dqUser.zjhm"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码">
                    <a-input placeholder="请输入手机号码" v-model="dqUser.sjhm"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户性别">
                    <j-dict-select-tag placeholder="请选择客户性别" v-model="dqUser.xb" :triggerChange="true"
                                       dictCode="sex"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年龄">
                    <a-input placeholder="请输入年龄" v-model="dqUser.nl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="预留号码">
                    <a-input placeholder="请输入预留号码" v-model="dqUser.ylhm"/>
                  </a-form-item>
                </a-col>


                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系">
                    <j-dict-select-tag placeholder="请选择与户主关系" v-model="dqUser.yhzgx" :triggerChange="true"
                                       dictCode="yhzgx"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否户主">
                    <j-dict-select-tag placeholder="请选择是否户主" v-model="dqUser.sfhz"
                                       :triggerChange="true" dictCode="sfbz"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否发送短信">
                    <j-dict-select-tag placeholder="请选择发送短信" v-model="hnkd.sffsdx" :triggerChange="true"
                                       dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="有无子女">
                    <j-dict-select-tag placeholder="请选择有无子女" v-model="hnkd.ywzn" :triggerChange="true"
                                       dict-code="ywbz"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况">
                    <j-dict-select-tag placeholder="请选择婚姻状况" v-model="dqUser.hyzk" :triggerChange="true"
                                       dict-code="hyzk"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="民族">
                    <j-dict-select-tag placeholder="请选择客户民族" v-model="dqUser.mz" :triggerChange="true"
                                       dict-code="mz"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="配偶姓名">
                    <a-input placeholder="请输入配偶姓名" v-model="hnkd.poxm"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="配偶证件号码">
                    <a-input placeholder="请输入配偶证件号码" v-model="hnkd.poxm"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭人口">
                    <a-input placeholder="请输入家庭人口" v-model="hnkd.jtrk"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="健康状况">
                    <j-dict-select-tag placeholder="请选择健康状况" v-model="dqUser.jkzk" :triggerChange="true"
                                       dict-code="jkzk"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="劳动能力">
                    <j-dict-select-tag placeholder="请选择劳动能力" v-model="dqUser.ldnl" :triggerChange="true"
                                       dict-code="ldnl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最高学历">
                    <j-dict-select-tag placeholder="请选择最高学历" v-model="dqUser.zgxl" :triggerChange="true"
                                       dict-code="xl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住状态">
                    <j-dict-select-tag placeholder="请选择借款人还款意愿" v-model="dqUser.jzzt" :triggerChange="true"
                                       dict-code="jzzt"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住年限">
                    <j-dict-select-tag placeholder="请选择借款人还款意愿" v-model="dqUser.jznx" :triggerChange="true"
                                       dict-code="jznx"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最高学位">
                    <j-dict-select-tag placeholder="请选择借款人还款意愿" v-model="dqUser.zgxw" :triggerChange="true"
                                       dict-code="zgxw"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款真实性">
                    <a-input placeholder="请输入贷款真实性" v-model="dqUser.dkzsx"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户籍地址">
                    <a-input placeholder="请输入户籍地址" @blur="dhczdz" v-model="dqUser.hjdz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="住地邮编">
                    <a-input placeholder="请输入住地邮编" v-model="dqUser.zdyb"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="常住地址">
                    <a-input placeholder="请输入常住地址" v-model="dqUser.zz"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="个人年收入(万元)">
                    <a-input placeholder="请输入个人年收入(万元" oninput="if (value>10000)value=10000 "
                             v-model="hnkd.grnsr"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭年收入(万元)">
                    <a-input placeholder="请输入家庭年收入(万元)" oninput="if (value>10000)value=10000 "
                             v-model="hnkd.jtnsr"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="借款人还款意愿">
                    <j-dict-select-tag placeholder="请选择借款人还款意愿" v-model="hnkd.hkyy" :triggerChange="true"
                                       dict-code="hkyy"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合评价标志">
                    <j-dict-select-tag placeholder="请选择综合评价标志" v-model="hnkd.pjbz" :triggerChange="true"
                                       dict-code="pjbz"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="循环标志">
                    <j-dict-select-tag placeholder="请选择循环标志" v-model="hnkd.xhbz" :triggerChange="true"
                                       dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="信用等级">
                    <j-dict-select-tag placeholder="请选择信用等级" v-model="hnkd.xydj" :triggerChange="true"
                                       dict-code="app_xydj"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户分群">
                    <j-dict-select-tag placeholder="请选择客户分群" v-model="dqUser.khfq" :triggerChange="true"
                                       dict-code="app_khfq"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型I">
                    <j-dict-select-tag placeholder="请输入客户类型I" v-model="dqUser.khlx1" :triggerChange="true"
                                       dict-code="khlx1"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型II">
                    <j-dict-select-tag placeholder="请输入客户类型II" v-model="dqUser.khlx2" :triggerChange="true"
                                       dict-code="khlx2"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="行业">
                    <a-input v-model="dqUser.hylb_dictText"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="从业年限">
                    <j-dict-select-tag placeholder="从业年限" v-model="dqUser.cynx" :triggerChange="true"
                                       dict-code="cynx"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职业">
                    <j-dict-select-tag placeholder="职业" v-model="dqUser.cszy" :triggerChange="true"
                                       dict-code="app_zc"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职称">
                    <j-dict-select-tag placeholder="职业" v-model="hnkd.zc" :triggerChange="true"
                                       dict-code="app_zc"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营情况是否正常">
                    <j-dict-select-tag placeholder="经营情况是否正常" v-model="hnkd.jyqk" :triggerChange="true"
                                       dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="产品市场需求情况">
                    <j-dict-select-tag placeholder="产品市场需求情况" v-model="hnkd.scxu" :triggerChange="true"
                                       dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="个体工商户名称">
                    <a-input placeholder="请输入个体工商户名称" v-model="hnkd.gtgshmc"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item v-show="dqUser.khfq==1" :labelCol="labelCol" :wrapperCol="wrapperCol" label="现工作单位">
                    <a-input placeholder="现工作单位" v-model="dqUser.cshygz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" v-show="dqUser.khfq==1" :wrapperCol="wrapperCol" label="现担任职务">
                    <j-dict-select-tag placeholder="请选择现担任职务" v-model="dqUser.xdrzw" :triggerChange="true"
                                       dict-code="app_xdrzw"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="请输入备注一">
                    <a-input placeholder="请输入备注一" v-model="dqUser.bz1"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注二">
                    <a-input placeholder="请输入备注二" v-model="dqUser.bz2"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="统一社会信用代码">
                    <a-input placeholder="请输入统一社会信用代码" v-model="hnkd.xydm"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="额度(万元)">
                    <a-input placeholder="请输入额度(万元)" oninput="if (value>10000)value=10000 " v-model="hnkd.sxed"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="基点">
                    <a-input placeholder="请输入基点" v-model="hnkd.jd"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="授信期限（月）">
                    <a-input placeholder="请输入授信期限（月）" v-model="hnkd.sxqx"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理工号">
                    <a-input placeholder="请输入客户经理工号" :value="username" v-model="hnkd.khjl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调查责任人一工号">
                    <a-input placeholder="请输入调查责任人一工号" v-model="hnkd.dczrr1"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调查责任人一比例">
                    <a-input placeholder="请输入调查责任人一比例" v-model="hnkd.dczrr1bl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调查责任人二工号">
                    <a-input placeholder="请输入调查责任人二工号" v-model="hnkd.dczrr2"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调查责任人二比例">
                    <a-input placeholder="请输入调查责任人二比例" v-model="hnkd.dczrr2bl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="管理责任人工号">
                    <a-input placeholder="请输入管理责任人工号" v-model="hnkd.glzrr"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="管理责任人比例">
                    <a-input placeholder="请输入管理责任人比例" v-model="hnkd.glzrrbl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="审查责任人工号">
                    <a-input placeholder="请输入审查责任人工号" v-model="hnkd.sczrr"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="审查责任人比例">
                    <a-input placeholder="请输入审查责任人比例" v-model="hnkd.sczrrbl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终审批人工号">
                    <a-input placeholder="请输入最终审批责任人工号" v-model="hnkd.zzspzrr"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终审批人比例">
                    <a-input placeholder="请输入最终审批责任人比例" v-model="hnkd.zzspzrrbl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="第一责任人工号">
                    <a-input placeholder="请输入第一责任人工号" v-model="hnkd.dyzrr"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="第一责任人比例">
                    <a-input placeholder="请输入第一责任人比例" v-model="hnkd.dyzrrbl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否外出务工">
                    <j-dict-select-tag placeholder="请选择是否外出务工" v-model="dqUser.sfycdg" :triggerChange="true"
                                       dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8" v-show="dqUser.sfycdg=='1'">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="务工地区">
                    <a-cascader
                      :options="areaOptions"
                      v-model="wgqds"
                    />
                  </a-form-item>
                </a-col>

                <a-col :lg="8" v-show="dqUser.sfycdg=='1'">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="务工类型">
                    <j-dict-select-tag style="width: 150px;" v-model="dqUser.wglx" dictCode="khgl_wglx"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8" v-show="dqUser.sfycdg=='1'">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="务工具体地址">
                    <a-input v-model="dqUser.wgcs"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="我行诉讼">
                    <a-input placeholder="请输入我行诉讼" v-model="dqUser.whss"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="重大疾病">
                    <a-input placeholder="请输入重大疾病" v-model="dqUser.hbjl"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="诈骗人员">
                    <a-input placeholder="请输入诈骗人员" v-model="dqUser.zpry"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="非法集资">
                    <a-input placeholder="请输入非法集资" v-model="dqUser.ffjz"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否吸毒">
                    <j-dict-select-tag style="width: 150px;" v-model="dqUser.sfxdry" dictCode="sfbz"
                                       :trigger-change="true"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否服刑">
                    <j-dict-select-tag style="width: 150px;" v-model="dqUser.sffx" dictCode="sfbz"
                                       :trigger-change="true"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否死亡">
                    <j-dict-select-tag style="width: 150px;" v-model="dqUser.sfsw" dictCode="sfbz"
                                       :trigger-change="true"/>
                  </a-form-item>
                </a-col>
              </a-row>


            </a-card>
          </a-tab-pane>

          <!--Tab 2：家庭相关情况-->
          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="book"/>家庭相关情况</span>
            <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
            <a-card class="card" :bordered="false">
              <a-row :getter="24">
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                    <a-input placeholder="户号编码" v-model="dqUser.hhbm"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属网格">
                    <a-input placeholder="所属网格" v-model="dqUser.wgbh_dictText"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                    <j-dict-select-tag placeholder="请输入所属支行" v-model="dqUser.sszh" :triggerChange="true"
                                       dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户主姓名">
                    <a-input v-model="khglNhhzxxgl.hzxm"/>
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="授信对象">
                    <a-input v-model="khglNhhzxxgl.sxdxzjh"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户口性质">
                    <j-dict-select-tag v-model="khglNhhzxxgl.hkxz" dictCode="khgl_hkxz"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户重要程度">
                    <j-dict-select-tag v-model="khglNhhzxxgl.khzycd" dictCode="khgl_khzycd"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户授信情况">
                    <j-dict-select-tag v-model="khglNhhzxxgl.khsxqk" dictCode="khgl_sxqk"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户等级">
                    <j-dict-select-tag v-model="khglNhhzxxgl.khdj" dictCode="khdj"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户风险度">
                    <j-dict-select-tag v-model="khglNhhzxxgl.khfxd" dictCode="khfxd"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="陪访人">
                    <a-input placeholder="陪访人" v-model="khglNhhzxxgl.pfr"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总行陪访人">
                    <a-input placeholder="总行陪访人" v-model="khglNhhzxxgl.zhpfr"/>
                  </a-form-item>
                </a-col>


                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否有不良贷款">
                    <j-dict-radio-tag v-model="khglNhhzxxgl.sfbldkh" dictCode="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="脱贫及检测户">
                    <j-dict-radio-tag v-model="khglNhhzxxgl.sfpkh" dictCode="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="五保、低保户">
                    <j-dict-radio-tag v-model="khglNhhzxxgl.sfdbh" dictCode="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否惠农补贴户">
                    <j-dict-radio-tag v-model="khglNhhzxxgl.sfhnbth" dictCode="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务跟踪人">
                    <a-input placeholder="服务跟踪人" v-model="khglNhhzxxgl.fwgzr"/>
                  </a-form-item>
                </a-col>

                <a-col :span="8" v-if="qybm==100">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="(家庭)累计碳积分">
                    <a-input v-model="jtljtjf" disabled/>
                  </a-form-item>
                </a-col>

                <a-col :span="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户潜在业务">
                    <a-checkbox-group v-model="khqzywList">
                      <a-checkbox value="1">存款</a-checkbox>
                      <a-checkbox value="2">贷款</a-checkbox>
                      <a-checkbox value="3">手机银行</a-checkbox>
                      <a-checkbox value="4">网上银行</a-checkbox>
                      <a-checkbox value="5">ETC等</a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="他行业务情况">
                    <a-checkbox-group v-model="khglNhhzxxgl.thywqk">
                      <a-checkbox value="1">手机银行</a-checkbox>
                      <a-checkbox value="2">扫码支付</a-checkbox>
                      <a-checkbox value="3">ETC</a-checkbox>
                      <a-checkbox value="4">社保卡</a-checkbox>
                      <a-checkbox value="5">其他</a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
                    <a-input placeholder="备注" v-model="khglNhhzxxgl.bz"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议备注">
                    <a-input placeholder="评议备注" v-model="khglNhhzxxgl.pybz"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="录入位置">
                    <a-input placeholder="经度：  纬度：" v-model="khglNhhzxxgl.jwdxx" readonly/>
                  </a-form-item>
                </a-col>


              </a-row>
            </a-card>

            <a-divider orientation="left" style="color: #1890FF;">家庭信息</a-divider>
            <a-card>
              <form>
                <a-table bordered
                         :columns="columns_jtqk"
                         :dataSource="userAllInfo.nhxqs"
                         :loading="loading"
                         :pagination="false"
                />
              </form>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="9" v-if="qybm==400" forceRender>
            <span slot="tab"><a-icon type="book"/>走访信息</span>
            <a-card class="card" :bordered="false">
              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="归属网格">
                    <a-input placeholder="所属网格" v-model="dqUser.wgbh_dictText"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="归属机构">
                    <j-dict-select-tag placeholder="请输入所属支行" v-model="dqUser.sszh" :triggerChange="true"
                                       dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="户号编码">
                    <a-input placeholder="请输入户号编码" v-model="dqUser.hhbm"/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户姓名">
                    <a-input placeholder="请输入户号编码" v-model="dqUser.khmc"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="证件号码">
                    <a-input placeholder="请输入户号编码" v-model="dqUser.zjhm"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="与户主关系">
                    <j-dict-select-tag placeholder="请选择与户主关系" v-model="dqUser.yhzgx" :triggerChange="true"
                                       dictCode="yhzgx"/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="性别">
                    <j-dict-select-tag placeholder="请选择性别" v-model="dqUser.xb"  :triggerChange="true"  dict-code="sex" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="年龄">
                    <a-input placeholder="请输入年龄" v-model="dqUser.nl"  disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="客户类型">
                    <j-dict-select-tag placeholder="请选择客户类型" v-model="khglNhhzxxgl.khlx"  :triggerChange="true"  dict-code="xtpdjg" disabled/>
                  </a-form-item>
                </a-col>
                <!--<a-col :lg="8">-->
                <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="手机号码">-->
                <!--<a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />-->
                <!--</a-form-item>-->
                <!--</a-col>-->
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    :labelCol="{span: 2}"
                    :wrapperCol="{span: 22}"
                    label="户籍地址">
                    <a-input placeholder="请输入户籍地址" v-model="dqUser.hjdz" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    :labelCol="{span: 2}"
                    :wrapperCol="{span: 22}"
                    label="走访地址">
                    <a-input placeholder="请输入走访地址" v-model="khglNhhzxxgl.zfdz"/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="走访面见人">
                    <a-select
                      v-model="khglNhhzxxgl.zfmjr"
                      style="width: 100%"
                      placeholder="请选择"
                    >
                      <a-select-option
                        v-for="(item) in tableDataJtcyxx"
                        :key= "item.zjhm"
                        :label="item.khmc"
                        :value="item.zjhm"
                      >
                        {{ item.khmc }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="与目标客户关系">
                    <a-input placeholder="请输入与目标客户关系" v-model="khglNhhzxxgl.ymbkhgx" />
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="联系方式">
                    <a-input placeholder="请输入联系方式" v-model="dqUser.sjhm" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="是否加微信好友">
                    <j-dict-select-tag placeholder="请选择是否加微信好友" v-model="khglNhhzxxgl.sfjwxhy" :triggerChange="true"  dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="贷款意向书">
                    <j-dict-select-tag placeholder="请选择贷款意向书" v-model="khglNhhzxxgl.dkyxs"  :triggerChange="true"  dict-code="sfbz"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="走访人员">
                    <a-input placeholder="请输入走访人员" v-model="khglNhhzxxgl.zfry" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    :labelCol="{span: 2}"
                    :wrapperCol="{span: 22}"
                    label="走访日期">
                    <a-date-picker placeholder="请选择走访日期" v-model="khglNhhzxxgl.zfrq" style="width: 100%;" format="YYYY-MM-DD"></a-date-picker>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :lg="24">
                  <a-form-item
                    :labelCol="{span: 2}"
                    :wrapperCol="{span: 22}"
                    label="备注">
                    <a-textarea placeholder="请输入备注" v-model="khglNhhzxxgl.bz" :autoSize="true"/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-divider orientation="left" style="color: #1890FF;">佐证材料</a-divider>
              <a-row :gutter="24">
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="与客户合影">
                    <j-image-upload text="上传" :imageType="3" isMultiple v-model="YkhhypicList"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="贷款意向书">
                    <j-image-upload text="上传" :imageType="8" isMultiple v-model="DkyxspicList"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="24">
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="微信照片">
                    <j-image-upload text="上传" :imageType="9" isMultiple v-model="WxzppicList"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="其他">
                    <j-image-upload text="上传" :imageType="6"  isMultiple v-model="QtfjpicList"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>

            </a-card>
          </a-tab-pane>

          <!--Tab 3：业务信息-->
          <a-tab-pane key="3">
            <span slot="tab"><a-icon type="book"/>业务信息</span>
            <a-card class="card" :bordered="false">

              <a-divider orientation="left" style="color: #1890FF;">存款信息</a-divider>
              <a-table bordered
                       :columns="ckxxColunms"
                       :dataSource="userAllInfo.cdkywxxList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">贷款信息</a-divider>
              <a-table bordered
                       :columns="dkxxColunms"
                       :dataSource="userAllInfo.cdkywxxList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">贷款数据明细</a-divider>
              <a-table bordered
                       :columns="dksjmxColunms"
                       :dataSource="userAllInfo.dksjmxList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">手机银行信息</a-divider>
              <a-table bordered
                       :columns="sjyhColunms"
                       :dataSource="userAllInfo.sjyhList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">ETC信息</a-divider>
              <a-table bordered
                       :columns="etcColunms"
                       :dataSource="userAllInfo.etcList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;">信用卡信息</a-divider>
              <a-table bordered
                       :columns="xykcolunms"
                       :dataSource="userAllInfo.xykList"
                       rowKey="id"
                       :pagination="false"
                       :loading="loading"
              />
              <a-divider orientation="left" style="color: #1890FF;" v-if="qybm==100">个人碳积分</a-divider>
              <a-table bordered
                       :columns="grtjfcolunms"
                       :dataSource="grtjfList"
                       :rowKey="(record,index)=>{return index}"
                       :pagination="false"
                       :loading="loading" >
                <span slot="ljtjf" slot-scope="ljtjf,record">
          <a @click="detailGrtjf()">{{ ljtjf }}</a>
        </span>
                <span slot="dhdsjf" slot-scope="dhdsjf,record">
          <a @click="detailGrtjfDh()">{{ dhdsjf }}</a>
        </span>
              </a-table>
            </a-card>
          </a-tab-pane>

          <!--Tab 4：房产情况\Begin-->
          <a-tab-pane key="4">
            <span slot="tab"><a-icon type="book"/>评级授信</span>
            <a-divider orientation="left" style="color: #1890FF;">房产情况</a-divider>
            <a-table bordered
                     :columns="fcqkColumns"
                     :dataSource="userAllInfo.camsZcsxNhfcxxPads"
                     rowKey="id"
                     :pagination="false"
                     :loading="loading"
            />
            <a-divider orientation="left" style="color: #1890FF;">资产情况</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :dataSource="this.dataSource1"
                       :columns="Cams_Zcsx_NhzcqkTable.columns"/>
            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">负债情况</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :dataSource="this.dataSource2"
                       :columns="Cams_Zcsx_NhfzqkTable.columns"/>
            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">经营情况</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :dataSource="this.dataSource3"
                       :columns="Cams_Zcsx_NhjyqkTable.columns">

                <span slot="jsr" slot-scope="text,record">
                  {{ record.xmnsr - record.xmnzc }}
                </span>
              </a-table>
            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">总评打分</a-divider>
            <a-card class="card" :bordered="true">

              <a-row class="form-row" :gutter="8">
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="净资产">
                    <a-input v-model="camsZcsxNhpjsxxxPads.nhjzc"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="净收入">
                    <a-input v-model="camsZcsxNhpjsxxxPads.nhcsr"></a-input>
                  </a-form-item>
                </a-col>

                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="劳动力人数">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.ndlrs" dictCode="khgl_ldlrs"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="社会评价">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.nhshpj" dictCode="khgl_shpj"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目从业时间">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.jyxmcysj"
                                       dictCode="khgl_jyxmcysj"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与本行往来时间">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.ybhlwsj"
                                       dictCode="khgl_ywhxdwlsj"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合竞争实力">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.zhjzsl" dictCode="khgl_zhjzsl"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资信状况">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.nhzxzk" dictCode="khgl_dkzxzk"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷记卡逾期情况">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.djkyqqk"
                                       dictCode="khgl_djkyqqk"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总评得分小计">
                    <a-input v-model="camsZcsxNhpjsxxxPads.zpdfxj"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>

            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">评级授信</a-divider>
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="16">
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算等级">
                    <a-input v-model="camsZcsxNhpjsxxxPads.xtcspddj"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调整后等级">
                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.tzhdj" dictCode="tzhdj"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="等级调整事项">
                    <a-input v-model="camsZcsxNhpjsxxxPads.djtzsx"/>
                  </a-form-item>
                </a-col>
                <!--                <a-col :lg="12">-->
                <!--                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算额度">-->
                <!--                    <a-input v-model="camsZcsxNhpjsxxxPads.xtcssxed"/>-->
                <!--                  </a-form-item>-->
                <!--                </a-col>-->


                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="内部授信额度">
                    <a-input v-model="camsZcsxNhpjsxxxPads.nbcsed"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="外部授信额度">
                    <a-input v-model="camsZcsxNhpjsxxxPads.gksxed"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理授信额度">
                    <a-input v-model="camsZcsxNhpjsxxxPads.khjlsxed"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终授信额度">
                    <a-input v-model="camsZcsxNhpjsxxxPads.nhzzsxed"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="12">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
                    <a-input style="width: 640px" type="textarea" v-model="camsZcsxNhpjsxxxPads.bz"/>
                  </a-form-item>
                </a-col>
                <!--                <a-col :lg="12">-->
                <!--                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="背靠背评议信用等级">-->
                <!--                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.czlwpddj"-->
                <!--                                       dictCode="bkbpy_xydj"></j-dict-select-tag>-->
                <!--                  </a-form-item>-->
                <!--                </a-col>-->
                <!--                <a-col :lg="12">-->
                <!--                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="背靠背评议额度">-->
                <!--                    <a-input v-model="camsZcsxNhpjsxxxPads.czlwsxed"/>-->
                <!--                  </a-form-item>-->
                <!--                </a-col>-->

                <!--                <a-col :lg="12">-->
                <!--                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理评定等级">-->
                <!--                    <j-dict-select-tag v-model="camsZcsxNhpjsxxxPads.khjlpddj" dictCode="tzhdj"></j-dict-select-tag>-->
                <!--                  </a-form-item>-->
                <!--                </a-col>-->

              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="5">
            <span slot="tab"><a-icon type="book"/>背靠背评议</span>
            <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>

            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属网格">
                  <a-input placeholder="所属网格" v-model="dqUser.wgbh_dictText"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                  <j-dict-select-tag placeholder="请输入所属支行" v-model="dqUser.sszh" :triggerChange="true"
                                     dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                  <a-input placeholder="请输入户号编码" v-model="dqUser.hhbm"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="授信对象">
                  <a-input placeholder="请输入授信对象" v-model="khglNhhzxxgl.sxdx"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="授信对象证件">
                  <a-input placeholder="请输入授信对象证件" v-model="khglNhhzxxgl.sxdxzjh"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主客户经理">
                  <j-dict-select-tag placeholder="请选择主客户经理" v-model="khglNhhzxxgl.zkhjl"
                                     :triggerChange="true" dict-code="HR_BAS_STAFF,YGXM,YGGH"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider orientation="left" style="color: #1890FF;">评议信息列表</a-divider>
            <a-table bordered
                     :columns="bkbColunms"
                     :dataSource="userAllInfo.nhbkbpies"
                     rowKey="id"
                     :pagination="false"
                     :loading="loading"
            >
              <span slot="detail" slot-scope="pylx,record">
              <a @click="viewBkbpy(record)">{{ pylx }}</a>
            </span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="8" forceRender>
            <span slot="tab"><a-icon type="book"/>附件管理</span>
            <!--新化 展示照片预览图 方便客户抽检 -->
            <a-form layout="vertical" v-if="qybm == '320'">
              <a-row :gutter="12">
                <a-col :lg="8">
                  <a-form-item
                    label="入户照片">
                    <j-image-upload text="上传" :imageType="8" isMultiple v-model="RhzppicList" class="nhfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="房屋照片">
                    <j-image-upload text="上传" :imageType="8" isMultiple v-model="FwzppicList" class="nhfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="与客户合影">
                    <j-image-upload text="上传" :imageType="3" isMultiple v-model="YkhhypicList" class="nhfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="12">
                <a-col :lg="8">
                  <a-form-item
                    label="室内照片">
                    <j-image-upload text="上传" :imageType="8" isMultiple v-model="SnzppicList" class="nhfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="户口簿">
                    <j-image-upload text="上传" :imageType="8" isMultiple v-model="HkbpicList" class="nhfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item
                    label="其他附件">
                    <j-image-upload text="上传" :imageType="3" isMultiple v-model="QtfjpicList" class="nhfjUploadClass"></j-image-upload>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
            <a-button type="primary" @click="fjxz(1)">
              个人附件下载
            </a-button>
            {{ fgf }}{{ fgf }}
            <a-button type="primary" @click="fjxz(2)">
              家庭附件下载
            </a-button>

            <a-divider orientation="left" style="color: #1890FF;">个人附件</a-divider>
            <a-table bordered
                     :columns="columns_fjgl"
                     :dataSource="userAllInfo.fjgls"
                     rowKey="zlbh"
                     :pagination="false"
                     :loading="loading"
            >
               <span slot="action" slot-scope="text,record">
                <a @click="ylFj(record)">预览</a>{{ fgf }}
                <a @click="xzFj(record)">下载</a>
                </span>
            </a-table>
            <a-divider orientation="left" style="color: #1890FF;">家庭附件</a-divider>
            <a-table bordered
                     :columns="columns_fjgl"
                     :dataSource="userAllInfo.khglNhhzzllbs"
                     rowKey="zlbh"
                     :pagination="false"
                     :loading="loading"
            >
               <span slot="action" slot-scope="text,record">
                <a @click="ylFj(record)">预览</a>{{ fgf }}
                <a @click="xzFj(record)">下载</a>
                </span>
            </a-table>
            <a-divider orientation="left" style="color: #1890FF;">背靠背评议附件</a-divider>
            <a-table bordered
                     :columns="columns_bkb"
                     :dataSource="userAllInfo.pyfjxxes"
                     rowKey="id"
                     :pagination="false"
                     :loading="loading"
            >
               <span slot="action" slot-scope="text,record">
                <a @click="ylFj(record)">预览</a>{{ fgf }}
                <a @click="xzFj(record)">下载</a>
                </span>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>


    <bysxqk-modal ref="bysxqkModal"></bysxqk-modal>
    <jcxxpy-modal ref="jcxxpyModal"></jcxxpy-modal>
    <jydzpy-modal ref="jydzpyModal"></jydzpy-modal>
    <dzpy-modal ref="dzpyModal"></dzpy-modal>
    <qtpy-modal ref="qtpyModal"></qtpy-modal>
    <fj-modal ref="fjModal"></fj-modal>
    <grtjf-detail ref="grtjf"></grtjf-detail>
    <grtjf-dh-detail ref="grtjfdh"></grtjf-dh-detail>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import moment from 'moment'
import {httpAction, putAction, getAction} from '@/api/manage'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import JUploadOne from '@/components/jeecg/JUploadOne'
import photoView from '@views/khgl/nh_old/modules/photoView'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import JMultiSelectTag from '@comp/dict/JMultiSelectTag'
import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
import {getFileAccessHttpUrl} from '@/api/manage'
import BysxqkModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/BysxqkModal'
import JcxxpyModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/JcxxpyModal'
import JydzpyModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/JydzpyModal'
import DzpyModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/DzpyModal'
import QtpyModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/QtpyModal'
import JDictRadioTag from '@comp/dict/JDictRadioTag'
import FjModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/FjModal'
import {provinceAndCityData} from 'element-china-area-data'
import GrtjfDetail from "./GrtjfDetail";
import store from '@/store/'
import GrtjfDhDetail from "./GrtjfDhDetail";
import JImageUpload from '@/components/jeecg/JImageUpload'

export default {
  name: 'NhjbxxModal',
  components: {
    JDictRadioTag,
    AFormItem,
    JUploadOne,
    photoView,
    JMultiSelectTag,
    JSelectYgxx,
    BysxqkModal,
    JcxxpyModal,
    JydzpyModal,
    DzpyModal,
    QtpyModal,
    FjModal,
    GrtjfDetail,
    store,
    GrtjfDhDetail,
    JImageUpload
  },
  mixins: [JeecgListMixin],
  // export function saveHnkd(param) {
  //   return request({
  //     url: '/aa/khxxglHnkd/add',
  //     method: 'post',
  //     data: param
  //   })
  // }
  // export function editHnkd(param) {
  //   return request({
  //     url: '/aa/khxxglHnkd/edit',
  //     method: 'post',
  //     data: param
  //   })
  // }
  data() {
    return {
      hnkd: {},
      areaOptions: provinceAndCityData,
      title: '操作',
      visible: false,
      urlDownload: window._CONFIG['staticDomainURL'],
      model: {sskhjl: ' '},
      zkhjlacct: '',
      imgsrc: '',
      fgf: ' ',
      labelCol: {
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
      },
      dataSource_jtcy: [],
      dataSource_fjgl: {},
      dataSource_nhfjgl: {},
      zjhmFlag: false,
      disableSubmit: true,
      confirmLoading: false,
      animated: true,
      form: this.$form.createForm(this),
      validatorRules: {
        zjhm: {rules: [{required: true, messkhmc: '请输入证件号码!'}]},
        qydm: {rules: [{required: true, messkhmc: '请输入区域代码!'}]}
      },
      dataSource: [],
      dataSource1: [],
      dataSource2: [],
      dataSource3: [],
      grtjfList: [{}],
      list: {},
      //业务信息-个人碳积分信息
      grtjfcolunms: [
        {
          title: '公交出行',
          children: [
            {
              title: '多少g',
              align: 'center',
              dataIndex: 'dsg1'
            },
            {
              title: '多少次',
              align: 'center',
              dataIndex: 'dsc1'
            }
          ]
        },
        {
          title: '本行签约ETC（至少支付0.01元）',
          children: [
            {
              title: '多少g',
              align: 'center',
              dataIndex: 'dsg2'
            },
            {
              title: '多少次',
              align: 'center',
              dataIndex: 'dsc2'
            }
          ]
        },
        {
          title: '本行手机银行-生活-缴费',
          children: [
            {
              title: '多少g',
              align: 'center',
              dataIndex: 'dsg3'
            },
            {
              title: '多少笔',
              align: 'center',
              dataIndex: 'dsc3'
            }
          ]
        },
        {
          title: '步行出行',
          children: [
            {
              title: '多少g',
              align: 'center',
              dataIndex: 'dsg4'
            },
            {
              title: '多少步',
              align: 'center',
              dataIndex: 'dsc4'
            }
          ]
        },
        {
          title: '旧物回收',
          children: [
            {
              title: '多少g',
              align: 'center',
              dataIndex: 'dsg5'
            },
            {
              title: '多少次',
              align: 'center',
              dataIndex: 'dsc5'
            }
          ]
        },
        {
          title: '兑换多少积分',
          children: [
            {
              title: '',
              align: 'center',
              dataIndex: 'dhdsjf',
              scopedSlots: {customRender: 'dhdsjf'},
            },
          ]
        },
        {
          title: '累计碳积分',
          children: [
            {
              title: '',
              align: 'center',
              dataIndex: 'ljtjf',
              scopedSlots: {customRender: 'ljtjf'},
            }
          ]
        },
      ],
      dhdsjf: 0,
      ljtjf: 0,
      jtljtjf: 0,
      dhjf: 0,
      zjhmString: '',
      //业务信息-存款信息
      ckxxColunms: [
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '存款累计(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'ckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'ckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'cknrpye'
            }
          ]
        },
        {
          title: '活期存款(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'hqckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'hqckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'hqcknrpye'
            }
          ]
        },
        {
          title: '定期存款(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'dqckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'dqckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'dqcknrpye'
            }
          ]
        }

      ],
      //贷款信息
      dkxxColunms: [
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '贷款金额',
          align: 'center',
          dataIndex: 'dkje'
        },
        {
          title: '贷款余额',
          align: 'center',
          dataIndex: 'dkye'
        },
        {
          title: '最近贷款到期日期',
          align: 'center',
          dataIndex: 'zjdkdqrq'
        },
        {
          title: '不良贷款余额',
          align: 'center',
          dataIndex: 'bldkye'
        },
        {
          title: '表外不良贷款余额',
          align: 'center',
          dataIndex: 'bwbldkye'
        }
      ],
      //贷款数据明细
      dksjmxColunms: [
        {title: '贷款账号', dataIndex: 'dkzh'},
        {title: '便民卡卡号', dataIndex: 'bmkkh'},
        {title: '贷款金额', dataIndex: 'dkje'},
        {title: '贷款余额', dataIndex: 'dkye'},
        {title: '贷款形态', dataIndex: 'dkxt'},
        {title: '贷款利率', dataIndex: 'dkll'},
        {title: '担保方式', dataIndex: 'dbfs'},
        {title: '第一责任人', dataIndex: 'dyzrr'},
        {title: '主客户经理', dataIndex: 'khjlbz'},
        {title: '贷款品种', dataIndex: 'dkpz'},
        {title: '借款日期', dataIndex: 'jkrq'},
        {title: '贷款日期', dataIndex: 'dqrq'},
        {title: '剩余天数', dataIndex: 'syts'},
        {title: '欠息天数', dataIndex: 'qxts'},
        {title: '表内外欠息和', dataIndex: 'bnwqxh'}
      ],
      //手机银行
      sjyhColunms: [
        {title: '客户姓名', dataIndex: 'khmc'},
        {title: '证件号码', dataIndex: 'zjhm'},
        {title: '开户机构', dataIndex: 'openJgdm'},
        {title: '开户日期', dataIndex: 'openDate'},
        {title: '开户类型', dataIndex: 'openType'},
        {title: '销户姓名', dataIndex: 'cancelGyh'},
        {title: '状态', dataIndex: 'status'},
        {title: '本月交易金额', dataIndex: 'jyjeBy'},
        {title: '本月交易笔数', dataIndex: 'jybsBy'},
        {title: '本年交易金额', dataIndex: 'jyjeBn'},
        {title: '本年交易笔数', dataIndex: 'jybsBn'},
        {title: '历史交易金额', dataIndex: 'jyjeLs'},
        {title: '历史交易笔数', dataIndex: 'jybsLs'}
      ],
      //ETC
      etcColunms: [{title: '客户姓名', dataIndex: 'khmc'},
        {title: '证件号码', dataIndex: 'zjhm'},
        {title: '操作网点', dataIndex: 'operJgdm'},
        {title: '绑定时间', dataIndex: 'workDate'},
        {title: '操作人员', dataIndex: 'operYggh'},
        {title: '账户类型', dataIndex: 'zhlx'},
        {title: '开户机构', dataIndex: 'openJgdm'},
        {title: '账号', dataIndex: 'zh'},
        {title: '车牌号码', dataIndex: 'cphm'},
        {title: '状态', dataIndex: 'status'},
        {title: '预解绑日期', dataIndex: 'yjbrq'}],
      //信用卡
      xykcolunms: [
        {title: '客户名称', dataIndex: 'khmc'},
        {title: '证件号码', dataIndex: 'zjhm'},
        {title: '联系电话', dataIndex: 'lxdh'},
        {title: '卡品种', dataIndex: 'kpz'},
        {title: '发卡日期', dataIndex: 'fkrq'},
        {title: '卡号', dataIndex: 'kh'},
        {title: '信用额度', dataIndex: 'xyed'},
        {title: '推广人员', dataIndex: 'tgry'}
      ],
      //背靠背评议
      bkbColunms: [
        {title: '评议轮数', dataIndex: 'pylsVal'},
        {title: '评议员姓名', dataIndex: 'pyyxm'},
        {title: '评议人证件号', dataIndex: 'pyyzjhm'},
        {title: '是否了解情况', dataIndex: 'sfljqk'},
        {title: '评议得分', dataIndex: 'pydf'},
        {title: '基础模型测算', dataIndex: 'jcmxcs'},
        {title: '评议类型', dataIndex: 'pylxVal', scopedSlots: {customRender: 'detail'}},
        {title: '评议时间', dataIndex: 'pysj'},

      ],

      // 房产情况
      fcqkColumns: [
        {
          title: '房产位置',
          dataIndex: 'fcwz',
          key: 'fcwz',
          width: '20%',
          align: 'center',
          scopedSlots: {customRender: 'fcwz'}
        },
        {
          title: '房产性质',
          dataIndex: 'fcxz',
          key: 'fcxz',
          width: '15%',
          align: 'center',
          scopedSlots: {customRender: 'fcxz'}
        },
        {
          title: '房产面积(平米)',
          dataIndex: 'fcmj',
          key: 'fcmj',
          width: '15%',
          align: 'center',
          scopedSlots: {customRender: 'fcmj'}
        },
        {
          title: '单价(元)',
          dataIndex: 'fcdj',
          key: 'fcdj',
          width: '15%',
          align: 'center',
          scopedSlots: {customRender: 'fcdj'}
        },
        {
          title: '房产价值',
          dataIndex: 'fcjz',
          key: 'fcjz',
          width: '15%',
          align: 'center',
          scopedSlots: {customRender: 'fcjz'}
        },
        {
          title: '备注',
          dataIndex: 'bz',
          key: 'bz',
          width: '15%',
          align: 'center',
          scopedSlots: {customRender: 'bz'}
        }
        // {
        //   title: '户号编码',
        //   dataIndex: 'hhbm',
        //   key: 'hhbm',
        //   width: '10%',
        //   align: "center",
        //   scopedSlots: {customRender: 'hhbm'}
        // },
        // {
        //   title: '客户名称',
        //   dataIndex: 'khmc',
        //   key: 'khmc',
        //   width: '10%',
        //   align: "center",
        //   scopedSlots: {customRender: 'khmc'}
        // },
        // {
        //   title: '证件号码',
        //   dataIndex: 'zjhm',
        //   key: 'zjhm',
        //   width: '20%',
        //   align: "center",
        //   scopedSlots: {customRender: 'zjhm'}
        // },
      ],
      Cams_Zcsx_NhfxxxTable: {
        columns: [
          {
            title: '房产位置',
            dataIndex: 'fcwz',
            key: 'fcwz',
            width: '20%',
            align: 'center',
            scopedSlots: {customRender: 'fcwz'}
          },
          {
            title: '房产性质',
            dataIndex: 'fcxz',
            key: 'fcxz',
            width: '15%',
            align: 'center',
            scopedSlots: {customRender: 'fcxz'}
          },
          {
            title: '房产面积(平米)',
            dataIndex: 'fcmj',
            key: 'fcmj',
            width: '15%',
            align: 'center',
            scopedSlots: {customRender: 'fcmj'}
          },
          {
            title: '单价(元)',
            dataIndex: 'fcdj',
            key: 'fcdj',
            width: '15%',
            align: 'center',
            scopedSlots: {customRender: 'fcdj'}
          },
          {
            title: '房产价值',
            dataIndex: 'fcjz',
            key: 'fcjz',
            width: '15%',
            align: 'center',
            scopedSlots: {customRender: 'fcjz'}
          },
          {
            title: '备注',
            dataIndex: 'bz',
            key: 'bz',
            width: '15%',
            align: 'center',
            scopedSlots: {customRender: 'bz'}
          }
          // {
          //   title: '户号编码',
          //   dataIndex: 'hhbm',
          //   key: 'hhbm',
          //   width: '10%',
          //   align: "center",
          //   scopedSlots: {customRender: 'hhbm'}
          // },
          // {
          //   title: '客户名称',
          //   dataIndex: 'khmc',
          //   key: 'khmc',
          //   width: '10%',
          //   align: "center",
          //   scopedSlots: {customRender: 'khmc'}
          // },
          // {
          //   title: '证件号码',
          //   dataIndex: 'zjhm',
          //   key: 'zjhm',
          //   width: '20%',
          //   align: "center",
          //   scopedSlots: {customRender: 'zjhm'}
          // },
        ]
      },
      // 资产情况
      zcqkColumns: [
        {
          title: '资产类型',
          dataIndex: 'zclx',
          key: 'zclx',
          width: '25%',
          align: 'center',
          scopedSlots: {customRender: 'zclx'}
        },
        {
          title: '资产数量',
          dataIndex: 'zcsl',
          key: 'zcsl',
          width: '25%',
          align: 'center',
          scopedSlots: {customRender: 'zcsl'}
        },
        {
          title: '资产价格(元)',
          dataIndex: 'zcjg',
          key: 'zcjg',
          width: '25%',
          align: 'center',
          scopedSlots: {customRender: 'zcjg'}
        },
        {
          title: '资产说明',
          dataIndex: 'zcsm',
          key: 'zcsm',
          width: '25%',
          align: 'center',
          scopedSlots: {customRender: 'zcsm'}
        }
      ],
      Cams_Zcsx_NhzcqkTable: {
        columns: [
          {
            title: '资产类型',
            dataIndex: 'zclx',
            key: 'zclx',
            width: '25%',
            align: 'center',
            scopedSlots: {customRender: 'zclx'}
          },
          {
            title: '资产数量',
            dataIndex: 'zcsl',
            key: 'zcsl',
            width: '25%',
            align: 'center',
            scopedSlots: {customRender: 'zcsl'}
          },
          {
            title: '资产价格(元)',
            dataIndex: 'zcjg',
            key: 'zcjg',
            width: '25%',
            align: 'center',
            scopedSlots: {customRender: 'zcjg'}
          },
          {
            title: '资产说明',
            dataIndex: 'zcsm',
            key: 'zcsm',
            width: '25%',
            align: 'center',
            scopedSlots: {customRender: 'zcsm'}
          }
        ]
      },
      // 负债情况
      Cams_Zcsx_NhfzqkTable: {
        columns: [
          {
            title: '借款方式',
            dataIndex: 'jkfs',
            key: 'jkfs',
            width: '25%',
            align: 'center',
            scopedSlots: {customRender: 'jkfs'}
          },
          {
            title: '债权人',
            dataIndex: 'zqr',
            key: 'zqr',
            width: '25%',
            align: 'center',
            scopedSlots: {customRender: 'zqr'}
          },
          {
            title: '借款说明',
            dataIndex: 'jksm',
            key: 'jksm',
            width: '25%',
            align: 'center',
            scopedSlots: {customRender: 'jksm'}
          },
          {
            title: '借款金额(元)',
            dataIndex: 'jkje',
            key: 'jkje',
            width: '25%',
            align: 'center',
            scopedSlots: {customRender: 'jkje'}
          },
        ]
      },
      // 经营情况
      Cams_Zcsx_NhjyqkTable: {
        columns: [
          {
            title: '项目类型',
            dataIndex: 'xmlx',
            align: 'center',
          },
          {
            title: '项目情况',
            dataIndex: 'xmqk',
            align: 'center',
          },
          {
            title: '项目年收入(元)',
            dataIndex: 'xmnsr',
            align: 'center',
          },
          {
            title: '项目年支出(元)',
            dataIndex: 'xmnzc',
            align: 'center',
          },
          {
            title: '项目净收入(元)',
            align: 'center',
            scopedSlots: {customRender: 'jsr'},
          }
        ]
      },
      infoList: [],
      //家庭情况
      columns_jtqk: [
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'xb',
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '年龄',
          align: 'center',
          dataIndex: 'nl'
        },
        {
          title: '电话',
          dataIndex: 'sjhm',
          align: 'center'
        },
        {
          title: '与户主关系',
          dataIndex: 'yhzgx',
          align: 'center'
        },
        /*{
          title: '存款余额',
          dataIndex: 'ckye',
          align: 'center'
        },
        {
          title: '存款日均',
          dataIndex: 'ckrpye',
          align: 'center'
        }, {
          title: '贷款余额',
          dataIndex: 'dkye',
          align: 'center'
        }*/
      ],
      //附件管理
      columns_fjgl: [
        {
          title: '资料编号',
          dataIndex: 'zlbh',
          key: 'zlbh'
        },
        {
          title: '资料类型',
          dataIndex: 'zllx',
        },
        {
          title: '资料名称',
          dataIndex: 'zlmc',
          key: 'zlmc'
        },
        {
          title: '附件备注',
          dataIndex: 'fjbz',
          key: 'fjbz'
        },
        {
          title: '上传人',
          dataIndex: 'scr',
          key: 'scr'
        },
        {
          title: '上传时间',
          dataIndex: 'scsj',
          key: 'scsj'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: {customRender: 'action'}
        }
      ],
      columns_bkb: [
        {
          title: '评议类型',
          dataIndex: 'pylx',
        },
        {
          title: '资料类型',
          dataIndex: 'zllx',
        },
        {
          title: '资料名称',
          dataIndex: 'zlmc',
        },
        {
          title: '附件备注',
          dataIndex: 'bz',
        },
        {
          title: '上传人',
          dataIndex: 'createBy',
        },
        {
          title: '上传时间',
          dataIndex: 'createTime',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: {customRender: 'action'}
        }
      ],

      //个人相关信息
      userAllInfo: {},
      username: '',
      dqUser: {},
      khglNhhzxxgl: {},
      camsZcsxNhpjsxxxPads: {},
      wgqds: [],
      jtrk: '',
      bkbpyed: '',
      zzpyed: '',
      url: {
        add: '/nh/nhjbxx/add',
        edit: '/nh/nhjbxx/edit',
        list: '/nh/nhjbxx/list',
        NhfcqkList: '/nh/nhjbxx/queryCams_Zcsx_NhfxxxByMainId',
        queryByIdHnkd: '/nh/khxxglHnkd/queryById',
        Cams_Zcsx_Nhzcxx: {
          list: '/nh/nhjbxx/queryCams_Zcsx_NhzcxxByMainId',
          fzqklist: '/nh/nhjbxx/queryCams_Zcsx_NhfzqkByMainId',
          jyqklist: '/khglNhhzxxgl/khglNhhzxxgl/queryPjsxJyqkTable',
          pjxxlist: '/nh/nhjbxx/queryCams_Zcsx_NhpjxxByMainId'
        }
      },
      qybm: '',
      dhList: [],
      RhzppicList: [],
      FwzppicList: [],
      SnzppicList: [],
      YkhhypicList: [],
      HkbpicList: [],
      DkyxspicList: [],
      WxzppicList: [],
      QtfjpicList: [],
      tableDataJtcyxx: [],
      khqzywList: [],
    }
  },
  created() {
    this.qybm = store.getters.qybm
  },
  mounted() {

  },
  methods: {
    detailGrtjfDh() {
      if (this.dhList) {
        this.$refs.grtjfdh.edit(this.dhList)
      }
    },
    detailGrtjf() {
      if (this.infoList) {
        this.$refs.grtjf.edit(this.infoList);
      }
    },
    dhczdz() {
      if (this.formDataHmcxx.zz == '' || this.formDataHmcxx.zz == null) {
        this.formDataHmcxx.zz = this.formDataHmcxx.hjdz
      }
      this.hnkd.txdz = this.formDataHmcxx.hjdz
    },
    fjxz(val) {

      console.log(' ==============> fjxz')
      console.log(this.userAllInfo.fjgls)
      console.log(this.userAllInfo.pyfjxxes)
      console.log(this.userAllInfo.khglNhhzzllbs)

      if (val == '1') {
        if (this.userAllInfo.fjgls == null && this.userAllInfo.pyfjxxes == null) {
          this.$message.warning('不存在个人附件信息')
          return
        }
      } else if (val == '2') {
        if (this.userAllInfo.khglNhhzzllbs == null) {
          this.$message.warning('不存在家庭附件信息')
        }
      }

      let params = {
        'val': val,
        'zjhm': this.dqUser.zjhm,
        'hhbm': this.dqUser.hhbm,
      }
      getAction('/khflgl/nhxq/downloadFj', params).then((res) => {
        if (res.success) {
          window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
        }
      })
    },

    ylFj(record) {
      this.$refs.fjModal.view(record)
    },
    xzFj(record) {
      window.location.href = `${window._CONFIG['staticDomainURL']}/` + record.fwlj
    },

    viewBkbpy(record) {
      console.log('viewBkbpy')
      console.log(record)
      console.log(record.sfljqk)

      //不予授信情况 和 不了解情况
      if (record.pylx == '0' || record.sfljqk == '否') {
        this.$refs.bysxqkModal.view(record)
      } else if (record.pylx == '9') {
        this.$refs.jcxxpyModal.view(record)
      } else if (record.pylx == '6') {
        this.$refs.jydzpyModal.view(record)
      } else if (record.pylx == '5') {
        this.$refs.dzpyModal.view(record)
      } else {
        this.$refs.qtpyModal.view(record)
      }
    },
    add() {
      this.edit({})
    },
    getHnkd(id) {
      let info = localStorage.getItem('pro__Login_Userinfo')
      this.username = JSON.parse(info).value.username
      getAction(this.url.queryByIdHnkd, {id: id}).then(res => {
        this.hnkd = Object.assign({}, res.result)
        this.hnkd.jtrk = this.jtrk
        this.hnkd.sxed = this.bkbpyed > this.zzpyed ? this.bkbpyed : this.zzpyed
        if ((this.zzpyed != null && this.bkbpyed > this.zzpyed) || this.zzpyed == null) {
          this.hnkd.sxed = this.bkbpyed
        }
        if (this.zzpyed != null && this.zzpyed > this.bkbpyed) {
          this.hnkd.sxed = this.zzpyed
        }
        console.log('111111')
        //let bl = 100;
        if (this.hnkd.khjl == null) {
          this.hnkd.khjl = this.username
        }
        if (this.hnkd.dczrr1 == null) {
          this.hnkd.dczrr1 = this.username
        }
        /* if (this.hnkd.dczrr1bl == null){
           this.hnkd.dczrr1bl = bl
         }*/
        if (this.hnkd.dczrr2 == null) {
          this.hnkd.dczrr2 = this.username
        }
        /*   if (this.hnkd.dczrr2bl == null){
             this.hnkd.dczrr2bl = bl
           }*/
        if (this.hnkd.glzrr == null) {
          this.hnkd.glzrr = this.username
        }
        /* if (this.hnkd.glzrrbl == null){
           this.hnkd.glzrrbl = bl
         }*/
        if (this.hnkd.sczrr == null) {
          this.hnkd.sczrr = this.username
        }
        /*  if (this.hnkd.sczrrbl == null){
            this.hnkd.sczrrbl = bl
          }*/
        if (this.hnkd.zzspzrr == null) {
          this.hnkd.zzspzrr = this.username
        }
        /*  if (this.hnkd.zzspzrrbl == null){
            this.hnkd.zzspzrrbl = bl
          }*/
        if (this.hnkd.dyzrr == null) {
          this.hnkd.dyzrr = this.username
        }

      })
    },
    edit(record) {
      this.getHnkd(record.id)
      console.log('record====>')
      console.log(record)
      this.dqUser = record
      if (record.wgdq) {
        this.wgqds = record.wgdq.split(',')
      }

      if (record.zjhm) {
        getAction('/khxxgl.wbsjgl.tjf.tjfdh/khxxglGrtjfDh/queryInfoByZjhm', {zjhm: record.zjhm}).then((res) => {
          if (res.success) {
            this.dhjf = 0;
            this.dhList = res.result
            for (let i = 0; i < res.result.length; i++) {
              this.dhjf = this.dhjf + res.result[i].dhjf
            }
          }
        })
      }

      if (record.zjhm) {
        getAction('/grtjf/vWbsjglGrtjs/queryInfoByZjhm', {zjhm: record.zjhm}).then((res) => {
          if (res.success) {
            this.infoList = res.result
            this.list = {}
            this.grtjfList = []
            this.ljtjf = 0
            this.dhdsjf = 0
            for (let i = 0; i < res.result.length; i++) {
              if (res.result[i].lx == 1) {
                this.list.dsg1 = res.result[i].jf;
                this.list.dsc1 = res.result[i].dsc;
              } else if (res.result[i].lx == 2) {
                this.list.dsg2 = res.result[i].jf;
                this.list.dsc2 = res.result[i].dsc;
              } else if (res.result[i].lx == 3) {
                this.list.dsg3 = res.result[i].jf;
                this.list.dsc3 = res.result[i].dsc;
              } else if (res.result[i].lx == 4) {
                this.list.dsg4 = res.result[i].jf;
                this.list.dsc4 = res.result[i].dsc;
              } else if (res.result[i].lx == 5) {
                this.list.dsg5 = res.result[i].jf;
                this.list.dsc5 = res.result[i].dsc;
              } else {
                this.list = {}
              }
              this.ljtjf = this.ljtjf + res.result[i].jf * res.result[i].dsc
            }
            this.list.zjhm = record.zjhm
            this.list.dhdsjf = this.dhjf
            this.list.ljtjf = this.ljtjf
            this.grtjfList.push(this.list)
          } else {
            this.grtjfList = []
          }
        })
      }


      if (record.id) {
        this.khqzywList = []
        getAction('/khflgl/nhxq/getAllInfo', {id: record.id}).then((res) => {
          this.jtljtjf = ''
          console.log('res====>')
          console.log(res)
          this.userAllInfo = res.result
          if (res.result.khglNhhzxxgl != null) {
            this.khglNhhzxxgl = res.result.khglNhhzxxgl
            let qzywString = this.khglNhhzxxgl.khqzyw
            if (qzywString) {
              this.khqzywList = qzywString.split(',')
            }
            let jwdxx = ' 经度：' + (this.khglNhhzxxgl.longitude ? this.khglNhhzxxgl.longitude : '') + '  纬度：' + (this.khglNhhzxxgl.latitude ? this.khglNhhzxxgl.latitude : '')
            this.$set(this.khglNhhzxxgl, 'jwdxx', jwdxx)
          }
          if (res.result.camsZcsxNhpjsxxxPads != null) {
            this.camsZcsxNhpjsxxxPads = res.result.camsZcsxNhpjsxxxPads
          }
          if (this.khglNhhzxxgl) {
            this.zjhmString = this.zjhmString + this.khglNhhzxxgl.hzzjhm
          }
          if (res.result.nhxqs) {
            for (let i = 0; i < res.result.nhxqs.length; i++) {
              this.zjhmString = this.zjhmString + ',' + res.result.nhxqs[i].zjhm
            }
          }
          if (this.zjhmString && this.qybm=='100') {
            getAction('/grtjf/vWbsjglGrtjs/queryJttjfByZjhm', {zjhm: this.zjhmString}).then((res) => {
              if (res.success) {
                this.jtljtjf = 0
                for (let i = 0; i < res.result.length; i++) {
                  this.jtljtjf = this.jtljtjf + (Number(res.result[i].jf) * Number(res.result[i].dsc))
                }
              }
            })
          }
        })
      }

      if (record.zjhm) {
        this.zjhmFlag = false
        getAction(this.url.Cams_Zcsx_Nhzcxx.pjxxlist, {zjhm: record.zjhm}).then((res) => {
          this.model = Object.assign({}, res.result)
        })
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'xtpdsm', 'xgr', 'sfxdry', 'sfpkh', 'sfdb', 'sfktxyk', 'sfktfmk', 'sfgzry', 'sfffjz', 'hbjl', 'infoRate', 'sfktsmf', 'sflqsbk', 'sfktsbk', 'yssxz', 'yxzc', 'xtpdjg', 'jgdm', 'sszh', 'ssyxdy', 'hhbm', 'yhzgx', 'sfhz', 'khmc', 'zjhm', 'khlx', 'lxfs', 'dz', 'xb', 'nl', 'mz', 'hyzk', 'bz', 'lrbz', 'lrr'))
        // 时间格式化
      })

      if (record.zjhm) {
        let params = {zjhm: record.zjhm}
        getAction(this.url.Cams_Zcsx_Nhzcxx.list, params).then((res) => {
          console.info(res)
          if (res.success) {
            this.dataSource1 = res.result
          }
          console.log('dataSource1', res)

        })
      }
      // 加载子表数据
      if (record.zjhm) {
        let params = {zjhm: record.zjhm}
        getAction(this.url.Cams_Zcsx_Nhzcxx.fzqklist, params).then((res) => {
          console.info(res)
          if (res.success) {
            this.dataSource2 = res.result
          }
        })
      }
      // 加载子表数据
      if (record.zjhm) {
        let params = {hhbm: record.hhbm}
        getAction(this.url.Cams_Zcsx_Nhzcxx.jyqklist, params).then((res) => {
          console.info(res)
          if (res.success) {
            this.dataSource3 = res.result
          }
        })
      }
      if (record.hhbm) {
        //查询家庭成员信息
        getAction('/khflgl/nhxq/queryJtcyxx', {hhbm: record.hhbm}).then((res) => {
          console.log('queryJtcyxx', res)
          if(res.success && res.result) {
            this.tableDataJtcyxx = res.result
          } else {
            this.tableDataJtcyxx = []
          }
        })
        this.getFjxx(record.hhbm)
      }
    },
    getFjxx(hhbm){
      let _this = this
      //请求个人附件-证件信息-身份证
      getAction('/KhglNhhzzllb/khglNhhzzllb/queryNhhzFjxx', { hhbm: hhbm }).then(function(response) {
        if (response.success) {
          for (let i = 0; i < response.result.length; i++) {
            if (response.result[i].zllx == 1) {
              _this.RhzppicList.push(response.result[i])
            } else if (response.result[i].zllx == 2) {
              _this.FwzppicList.push(response.result[i])
            } else if (response.result[i].zllx == 3) {
              _this.YkhhypicList.push(response.result[i])
            } else if (response.result[i].zllx == 4) {
              _this.SnzppicList.push(response.result[i])
            } else if (response.result[i].zllx == 5) {
              _this.HkbpicList.push(response.result[i])
            } else if (response.result[i].zllx == 6) {
              _this.QtfjpicList.push(response.result[i])
            } else if (response.result[i].zllx == 8) {
              _this.DkyxspicList.push(response.result[i])
            } else if (response.result[i].zllx == 9) {
              _this.WxzppicList.push(response.result[i])
            }
          }
        } else {
          _this.RhzppicList = []
          _this.FwzppicList = []
          _this.SnzppicList = []
          _this.HkbpicList = []
          _this.YkhhypicList = []
          _this.QtfjpicList = []
          _this.DkyxspicList = []
          _this.WxzppicList = []
        }
      }).catch(function(error) {
      })
    },
    close() {
      this.$emit('close')
      this.RhzppicList = []
      this.FwzppicList = []
      this.SnzppicList = []
      this.HkbpicList = []
      this.YkhhypicList = []
      this.QtfjpicList = []
      this.DkyxspicList = []
      this.WxzppicList = []
      this.tableDataJtcyxx = []
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.lrsj = formData.lrsj ? formData.lrsj.format() : null
          formData.zjqfrq = formData.zjqfrq ? formData.zjqfrq.format() : null
          formData.zjdqrq = formData.zjdqrq ? formData.zjdqrq.format() : null
          formData.fxsj = formData.fxsj ? formData.fxsj.format() : null

          console.log(formData)
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              that.$messkhmc.success(res.messkhmc)
              that.$emit('ok')
            } else {
              that.$messkhmc.warning(res.messkhmc)
            }
          }).finally(() => {
            that.confirmLoading = false
            that.close()
          })
        }
      })
    },
    handleCancel() {
      console.log('handleCancel')
      this.userAllInfo = {}
      this.close()
    },
    GetValueZkhjl(value) {
      this.model.sskhjl = value.yggh
      this.zkhjlacct = value.ygxm
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form .ant-form-item {
  margin-bottom: 5px;
}
  /deep/ .nhfjUploadClass .ant-upload-list-picture-card-container {
    width: 204px;
    height: 204px;
  }
  /deep/ .nhfjUploadClass .ant-upload-list-picture-card .ant-upload-list-item{
    width: 204px;
    height: 204px;
  }
  /deep/ .nhfjUploadClass .ant-upload.ant-upload-select-picture-card {
    display: none !important;
  }
</style>