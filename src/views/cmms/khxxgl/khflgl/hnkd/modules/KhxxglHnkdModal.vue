<template>
  <a-modal
    :title="title"
    :width="1600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="额度（元）">
              <a-input type="number" placeholder="请输入额度" v-decorator="['sxed', {}]" disabled/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="基点">
              <a-input type="number" placeholder="请输入基点" v-decorator="['jd', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="授信期限（月）">
              <a-input type="number" placeholder="请输入授信期限" v-decorator="['sxqx', {}]" />
            </a-form-item>
          </a-col>

          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户分群">
              <j-dict-select-tag placeholder="请选择客户分群" v-decorator="['khfq', {}]"  :triggerChange="true" dict-code="hnkd_khfq"/>
            </a-form-item>
          </a-col>

          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户经理工号">
              <a-input  placeholder="请输入客户经理工号" v-decorator="['khjl', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24" >
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="调查责任人一工号" >
              <a-input  placeholder="请输入调查责任人一工号" v-decorator="['dczrr1', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="调查责任人一比例" >
              <a-input type="number" placeholder="请输入调查责任人一比例" v-decorator="['dczrr1bl', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="调查责任人二工号" >
              <a-input  placeholder="请输入调查责任人二工号" v-decorator="['dczrr2', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="调查责任人二比例" >
              <a-input  placeholder="请输入调查责任人二比例" v-decorator="['dczrr2bl', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
        <a-col :lg="6">
          <a-form-item
            :labelCol="{span:10}"
            :wrapperCol="{span:12}"
            :labelAlign="labelAlign"
            label="管理责任人工号" >
            <a-input  type="number" placeholder="请输入管理责任人工号" v-decorator="['glzrr', {}]"/>
          </a-form-item>
        </a-col>

        <a-col :lg="6">
          <a-form-item
            :labelCol="{span:10}"
            :wrapperCol="{span:12}"
            :labelAlign="labelAlign"
            label="管理责任人比例" >
            <a-input  type="number" placeholder="请输入管理责任人比例" v-decorator="['glzrrbl', {}]"/>
          </a-form-item>
        </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="审查责任人工号" >
              <a-input  placeholder="请输入审查责任人工号" v-decorator="['sczrr', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="审查责任人比例" >
              <a-input type="number"  placeholder="请输入管理责任人工号比例" v-decorator="['sczrrbl', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="最终审批责任人工号" >
              <a-input  placeholder="最终审批责任人工号" v-decorator="['zzspzrr', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="最终审批责任人比例" >
              <a-input  type="number" placeholder="请输入最终审批责任人比例" v-decorator="['zzspzrrbl', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="第一责任人工号" >
              <a-input  placeholder="请输入第一责任人工号" v-decorator="['dyzrr', {}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="第一责任人比例" >
              <a-input  type="number" placeholder="请输入第一责任人比例" v-decorator="['dyzrrbl', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="民族">
              <j-dict-select-tag placeholder="请选择民族" v-decorator="['mz', {}]"  :triggerChange="true" dict-code="mz"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户类型1">
              <j-dict-select-tag placeholder="请选择客户类型1" v-decorator="['khlx1', {}]"  :triggerChange="true" dict-code="hnkd_khlx1"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户类型2">
              <j-dict-select-tag placeholder="请选择客户类型2" v-decorator="['khlx2', {}]"  :triggerChange="true" dict-code="hnkd_khlx2"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="乡镇">
              <j-dict-select-tag placeholder="请选择乡镇" v-decorator="['ssxz', {}]"  :triggerChange="true" dict-code="hnkd_xzzc"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="有无子女">
              <j-dict-select-tag placeholder="请选择有无子女" v-decorator="['ywzn', {}]"  :triggerChange="true" dict-code="ywbz"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="健康状况">
              <j-dict-select-tag placeholder="请选择健康状况" v-decorator="['jkzk', {}]"  :triggerChange="true" dict-code="hnkd_jkzk"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="婚姻状况">
              <j-dict-select-tag placeholder="请选择婚姻状况" v-decorator="['hyzk', {}]"  :triggerChange="true" dict-code="hnkd_hyzk"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="家庭人口">
              <a-input  placeholder="请输入家庭人口" v-decorator="['jtrk', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="配偶姓名">
              <a-input  placeholder="请输入配偶姓名" v-decorator="['poxm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="配偶证件号码">
              <a-input  placeholder="请输入配偶证件号码" v-decorator="['pozjhm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="劳动能力">
              <j-dict-select-tag placeholder="请选择劳动能力" v-decorator="['ldnl', {}]"  :triggerChange="true" dict-code="hnkd_ldnl"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="居住年限">
              <j-dict-select-tag placeholder="请选择居住年限" v-decorator="['jznx', {}]"  :triggerChange="true" dict-code="jznx"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="居住状况">
              <j-dict-select-tag placeholder="请选择居住状况" v-decorator="['jzzk', {}]"  :triggerChange="true" dict-code="hnkd_jzzk"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="最高学历">
              <j-dict-select-tag placeholder="请选择最高学历" v-decorator="['zgxl', {}]"  :triggerChange="true" dict-code="hnkd_zgxl"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="常住地址">
              <a-input  placeholder="请输入常住地址" v-decorator="['czdz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="通讯地址">
              <a-input  placeholder="请输入通讯地址" v-decorator="['txdz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="行政区划代码">
              <a-input  placeholder="请输入行政区划代码" v-decorator="['xzqhdm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="住地邮政编码">
              <a-input  placeholder="请输入住地邮政编码" v-decorator="['zdyzbm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="手机号码">
              <a-input  placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否户主">
              <j-dict-select-tag placeholder="请选择是否户主" v-decorator="['sfhz', {}]"  :triggerChange="true" dict-code="sfbz"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="是否发送短信提醒">
              <j-dict-select-tag placeholder="请选择是否发送短信提醒" v-decorator="['sffsdx', {}]"  :triggerChange="true" dict-code="sfbz"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现工作单位">
              <a-input  placeholder="请输入现工作单位" v-decorator="['xgzdw', {}]" />
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="现担任职务">
              <j-dict-select-tag placeholder="请选择行业" v-decorator="['xdrzw', {}]"  :triggerChange="true" dict-code="hnkd_xdrzw"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="行业">
              <j-dict-select-tag placeholder="请选择行业" v-decorator="['hy', {}]"  :triggerChange="true" dict-code="app_hylb"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="经营情况是否正常">
              <j-dict-select-tag placeholder="请选择经营情况是否正常" v-decorator="['jyqk', {}]"  :triggerChange="true" dict-code="sfbz"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="产品市场需求情况">
              <j-dict-select-tag placeholder="请选择产品市场需求情况" v-decorator="['scxu', {}]"  :triggerChange="true" dict-code="scxu"/>
            </a-form-item>
          </a-col>


          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="借款人还款意愿">
              <j-dict-select-tag placeholder="请选择借款人还款意愿" v-decorator="['hkyy', {}]"  :triggerChange="true" dict-code="hnkd_hkyy"/>
            </a-form-item>
          </a-col>


          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="职业">
              <j-dict-select-tag placeholder="请选择职业" v-decorator="['zy', {}]"  :triggerChange="true" dict-code="hnkd_zy"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="职称">
              <j-dict-select-tag placeholder="请选择职称" v-decorator="['zc', {}]"  :triggerChange="true" dict-code="hnkd_zc"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="从业年限">
              <j-dict-select-tag placeholder="请选择从业年限" v-decorator="['cynx', {}]"  :triggerChange="true" dict-code="hnkd_cynx"/>
            </a-form-item>
          </a-col>

          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="综合评价标志">
              <j-dict-select-tag placeholder="请选择综合评价标志" v-decorator="['pjbz', {}]"  :triggerChange="true" dict-code="pjbz"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="个体工商户名称">
              <a-input  placeholder="请输入现个体工商户名称" v-decorator="['gtgshmc', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="统一社会信用代码">
              <a-input  placeholder="请输入统一社会信用代码" v-decorator="['xydm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="家庭年收入">
              <a-input  placeholder="请输入家庭年收入" v-decorator="['jtnsr', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="个人年收入">
              <a-input  placeholder="请输入个人年收入" v-decorator="['grnsr', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="循环标志">
              <j-dict-select-tag placeholder="请选择循环标志" v-decorator="['xhbz', {}]"  :triggerChange="true" dict-code="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="信用等级">
              <j-dict-select-tag placeholder="请选择信用等级" v-decorator="['xydj', {}]"  :triggerChange="true" dict-code="app_xydj"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="户籍地址">
              <a-input  placeholder="请输入户籍地址" v-decorator="['hjdz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:10}"
              :wrapperCol="{span:12}"
              :labelAlign="labelAlign"
              label="户籍所在地行政区划">
              <a-input  placeholder="请输入户籍所在地行政区划" v-decorator="['hjszdxzqh', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="6">
            <a-form-item
              :labelCol="{span:6}"
              :wrapperCol="{span:14}"
              :labelAlign="labelAlign"
              label="通讯地址邮编">
              <a-input  placeholder="请输入通讯地址邮编" v-decorator="['txdzyb', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="就业状况">
              <j-dict-select-tag placeholder="请选择信用等级" v-decorator="['jyzk', {}]"  :triggerChange="true" dict-code="hnkd_jyzk"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="单位性质">
              <j-dict-select-tag placeholder="请选择单位性质" v-decorator="['dwxz', {}]"  :triggerChange="true" dict-code="hnkd_dwxz"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="最高学位">
              <j-dict-select-tag placeholder="请选择最高学位" v-decorator="['zgxw', {}]"  :triggerChange="true" dict-code="hnkd_zgxw"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :lg="6">
          <a-col>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="新市民">
              <j-dict-select-tag placeholder="请选择是否" v-decorator="['xsm', {}]"  :triggerChange="true" dict-code="sfbz"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "KhxxglHnkdModal",
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
        labelAlign:'left',

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/nh/khxxglHnkd/add",
          edit: "/nh/khxxglHnkd/editly",
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
          this.form.setFieldsValue(pick(this.model,'zjhm','sxed','jd','sxqx','khjl','dczrr1','dczrr1bl','dczrr2','dczrr2bl','glzrr','glzrrbl','sczrr','sczrrbl','zzspzrr','zzspzrrbl','dyzrr','dyzrrbl','sffsdx','jyqk','scxu','hkyy','pjbz','xhbz','xydj','gtgshmc','xydm','ywzn','poxm','pozjhm','jtrk','txdz','grnsr','jtnsr','zc','khlx','sfycdg','wgbh','ssxz','khmc','hhbm','hjszdxzqh','txdzyb','jyzk','dwxz','zgxw','sszh','mz','khlx1','khlx2','jkzk','hyzk','ldnl','jznx','jzzk','zgxl','czdz','zdyzbm','sjhm','sfhz','xgzdw','xdrzw','zy','cynx','zhpj','hjdz','hjsz','poid','imp_result','khfq','xzqhdm','hy','hjyzbm','txdjyb','podh','xsm'))
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
            let httpurl = that.url.edit;
            let formData = Object.assign(this.model, values);
            //时间格式化
            console.log(formData)
            httpAction(httpurl,formData,'post').then((res)=>{
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