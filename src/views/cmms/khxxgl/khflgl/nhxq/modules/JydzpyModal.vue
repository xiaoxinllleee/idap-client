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
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="先锋党员和公职人员">
                    <j-dict-radio-tag v-model="model.xfdyhgzry" dict-code="xfdyhgzry"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="书香家族">
                    <j-dict-radio-tag v-model="model.sxjz" dict-code="sxjz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="乡村振兴家庭">
                    <j-dict-radio-tag v-model="model.xczxjt" dict-code="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>

                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="遵纪守法户">
                    <j-dict-radio-tag v-model="model.zjsfh" dict-code="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>

                <a-col :span="16">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="和谐家庭">
                    <j-dict-radio-tag v-model="model.hxjt" dict-code="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>


                <a-col :span="16">
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