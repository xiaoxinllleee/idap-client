<template>
  <a-modal :title="title"
           :width="500"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="qydm">
          <a-input placeholder="请输入qydm" v-decorator="['qydm', validatorRules.qydm ]" />
        </a-form-item>-->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="指标ID" hasFeedback>
          <a-input placeholder="请输入指标ID" v-decorator="['zbid', validatorRules.zbid ]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="指标名称" hasFeedback>
          <a-input placeholder="请输入指标名称" v-decorator="['zbmc', validatorRules.zbmc ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="录入方式" hasFeedback>
          <j-dict-select-tag placeholder="请选择录入方式" v-decorator="['llfs', validatorRules.llfs ]" dict-code="dklldj_lrfs" :trigger-change="true"/>
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
    name: "KhxmszModal",
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
          zbid:{rules: [{ required: true, message: '请输入指标ID！' }]},
          zbmc:{rules: [{ required: true, message: '请输入指标名称！' }]},
          llfs:{rules: [{ required: true, message: '请选择录入方式！' }]},
        },
        url: {
          add: "/csszgl/khxmsz/add",
          edit: "/csszgl/khxmsz/edit",
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
          this.form.setFieldsValue(pick(this.model,'zbid','zbmc','llfs'))
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
            if(!this.model.zbid){
              httpurl+=this.url.add;
              method = 'post';
            }else{
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