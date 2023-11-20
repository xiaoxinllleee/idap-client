<template>
  <a-modal :title="title"
           :width="600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="指标规则项目">
          <j-dict-select-tag placeholder="请选择指标规则项目" v-decorator="['zbgzid', validatorRules.zbgzid ]"
                             dict-code="rate:rate_zbgzxxb,zbgzmc,zbgzid" :trigger-change="true" :show-search="true"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表达式键值">
          <a-input-number placeholder="请输入表达式键值" v-decorator="['bdskey', {}]"
                          :disabled="this.disabled" style="width: 100%;" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表达式值">
          <a-input placeholder="请输入表达式值" v-decorator="['bdsvalue', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表达式分值">
          <a-input-number placeholder="请输入表达式分值" v-decorator="['bdsfz', {}]" style="width: 100%;" />
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
    name: "GzbdsszModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        disableSubmit: false,
        confirmLoading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules:{
          zbgzid:{rules: [{ required: true, message: '请选择指标规则项目！' }]},
          bdskey:{rules: [{ required: true, message: '请输入表达式键值！' }]},
          bdsvalue:{rules: [{ required: true, message: '请输入表达式值！' }]},
          bdsfz:{rules: [{ required: true, message: '请输入表达式分值！' }]},
        },
        url: {
          add: "/csszgl/gzbdssz/add",
          edit: "/csszgl/gzbdssz/edit",
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
          this.form.setFieldsValue(pick(this.model,'zbgzid','bdskey','bdsvalue','bdsfz'))
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
            if (!this.model.zbgzid) {
              httpurl+=this.url.add;
              method = 'post';
            } else {
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log(values)
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