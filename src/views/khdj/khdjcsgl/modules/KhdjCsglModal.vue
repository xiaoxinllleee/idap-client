<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="参数ID" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入参数ID" v-decorator="['pid', validatorRules.pid ]"/>
        </a-form-item>
        <a-form-item label="参数名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入参数名称" v-decorator="['pname', validatorRules.pname]"/>
        </a-form-item>
        <a-form-item label="参数值" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入参数值" v-decorator="['pvalue', validatorRules.pvalue]"/>
        </a-form-item>
        <a-form-item label="参数描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea placeholder="请输入参数描述" v-decorator="['poutline', {}]" :rows="2"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { duplicateCheck } from '../../../../api/api'

  export default {
    name: "KhdjCsglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        okType: 'add',
        validatorRules:{
          pid:{rules: [
              { required: true, message: '请输入参数ID!' },
              { validator: this.validataCode }
          ]},
          pname:{rules: [{ required: true, message: '请输入参数名称!' }]},
          pvalue:{rules: [{ required: true, message: '请输入参数值!' }]}
        },
        url: {
          add: "/khdjcsgl/khdjCsgl/add",
          edit: "/khdjcsgl/khdjCsgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'pid','pname','pvalue','poutline'))
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
      validataCode: function(rule, value, callback) {
        var params = {
          tableName: 'KHDJ_CSGL',
          fieldName: 'pid',
          fieldVal: value,
          dataId: this.model.pid,
        }
        if (this.okType == "add") {
          if (params.fieldVal != null && params.fieldVal != 'undefined') {
            duplicateCheck(params).then((res) => {
              if (res.success) {
                callback()
              } else {
                callback(res.message)
              }
            });
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>