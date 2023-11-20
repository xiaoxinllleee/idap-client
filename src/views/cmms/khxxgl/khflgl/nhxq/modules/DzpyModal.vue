<template>
  <a-modal :title="title"
           :width="1450"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: true} }"
           :destroyOnClose="true"
           @ok="handleCancel"
           @cancel="handleCancel"
           cancelText="关闭">

    <!--客户管理\农户信息管理\新增农户信息-->
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="16">
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" >
                    <span slot="label">婚姻状况({{model.hyzk}}分)</span>
                    <j-dict-radio-tag v-model="model.hyzk" dict-code="py_hyzk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">年龄情况({{model.nnqk}}分)</span>
                    <j-dict-radio-tag v-model="model.nnqk" dict-code="py_nlqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>

                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">健康状况情况({{model.jkztqk}}分)</span>
                    <j-dict-radio-tag v-model="model.jkztqk" dict-code="py_jkzkqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">经营能力({{model.jynl}}分)</span>
                    <j-dict-radio-tag v-model="model.jynl" dict-code="py_jynl" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">房屋价值情况({{model.fwjzqk}}分)</span>
                    <j-dict-radio-tag v-model="model.fwjzqk" dict-code="py_fwjz" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">大宗耐用消费品情况({{model.dznyxfpqk}}分)</span>
                    <j-dict-radio-tag v-model="model.dznyxfpqk" dict-code="py_xfpqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">农机具情况({{model.njjqk}}分)</span>
                    <j-dict-radio-tag v-model="model.njjqk" dict-code="py_njjqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">经营状况({{model.jyqk}}分)</span>
                    <j-dict-select-tag v-model="model.jyqk" dict-code="py_jyzk"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">家庭纯收入情况({{model.jtcsrqk}}分)</span>
                    <j-dict-radio-tag v-model="model.jtcsrqk" dict-code="py_jtcsr"  :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">家庭总收入、总支出占比情况({{model.jtzsr}}分)</span>
                    <j-dict-select-tag v-model="model.jtzsr" dict-code="py_jtzsr"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">借款人还款意愿情况({{model.jkrhkyy}}分)</span>
                    <j-dict-radio-tag v-model="model.jkrhkyy" dict-code="py_jkrhkyyqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">借款人本金逾期情况({{model.jkrbjyq}}分)</span>
                    <j-dict-radio-tag v-model="model.jkrbjyq" dict-code="py_jkrbjyqqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">借款人利息逾期情况({{model.jkrlxyq}}分)</span>
                    <j-dict-radio-tag v-model="model.jkrlxyq" dict-code="py_jkrlxyqqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">存款业务往来情况({{model.ckywwl}}分)</span>
                    <j-dict-select-tag v-model="model.ckywwl" dict-code="py_ckywwlqk" ></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">职业情况({{model.zwqk}}分)</span>
                    <j-dict-radio-tag v-model="model.zwqk" dict-code="py_zyqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">家庭成员关系({{model.jtcygx}}分)</span>
                    <j-dict-radio-tag v-model="model.jtcygx" dict-code="py_jtcygx" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">家庭劳动力人数情况({{model.jtndlrsqk}}分)</span>
                    <j-dict-radio-tag v-model="model.jtndlrsqk" dict-code="py_jtldlrsqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">家庭人口素质和技能状况({{model.jtrkszhjn}}分)</span>
                    <j-dict-select-tag v-model="model.jtrkszhjn" dict-code="py_jtrkszhjnqk"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">信誉状况({{model.xyzk}}分)</span>
                    <j-dict-radio-tag v-model="model.xyzk" dict-code="py_xyzk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">社会声望及荣誉情况({{model.shswjry}}分)</span>
                    <j-dict-select-tag v-model="model.shswjry" dict-code="py_shsy"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">社会关系状况({{model.shgxzk}}分)</span>
                    <j-dict-select-tag v-model="model.shgxzk" dict-code="py_shgxzk"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">生活习惯情况({{model.shxgqk}}分)</span>
                    <j-dict-select-tag v-model="model.shxgqk" dict-code="py_shxgqk" :disabled="dis"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">交通运输工具情况({{model.jtysgjqk}}分)</span>
                    <j-dict-radio-tag v-model="model.jtysgjqk" dict-code="py_jtysgjqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">在民间是否有高息借款({{model.zmjgljk}}分)</span>
                    <j-dict-radio-tag v-model="model.zmjgljk" dict-code="py_sfgxjk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <span slot="label">其他金融机构贷款情况({{model.jrjgdkqk}}分)</span>
                    <j-dict-radio-tag v-model="model.jrjgdkqk" dict-code="py_jrjgdkqk" :disabled="dis"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>
                <a-row :getter="16">
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议得分">
                    <a-input v-model="model.pydf"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="信用等级">
                    <j-dict-select-tag v-model="model.cxd" dict-code="bkbpy_xydj"> </j-dict-select-tag>
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="建议授信额度">
                  <a-input  v-model="model.jysxed" />
                </a-form-item>
              </a-col>
                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议员姓名">
                    <a-input  v-model="model.pyyxm" />
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议员证件号">
                    <a-input  v-model="model.pyyzjhm" />
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议时间">
                    <a-input  v-model="model.pysj" />
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
                    <a-input  v-model="model.bz" />
                  </a-form-item>
                </a-col>


              </a-row>
            </a-card>
      </a-form>
    </a-spin>


  </a-modal>


</template>

<script>
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
import JDictRadioTag from '@comp/dict/JDictRadioTag'
import pick from 'lodash.pick'
import moment from 'moment'
import { httpAction,getAction } from '@api/manage'

export default {
  name: "JcxxpyModal",
  components: {
    JTreeSelect,JTreeSelectNotJg,JDictRadioTag
  },
  data () {
    return {
      confirmLoading: false,
      form: this.$form.createForm(this),
      title:"",
      visible: false,
      dictOptions:[],
      dis:true,
      result:[],
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },

    }
  },
  created () {
  },
  methods: {
    view(record){
      this.model = record
      console.log("view")
      this.title = record.pylxVal
      this.visible = true


    },
    close () {
      this.visible = false;
    },
    handleCancel () {
      this.close()
    },


  }
}
</script>

<style scoped>

</style>