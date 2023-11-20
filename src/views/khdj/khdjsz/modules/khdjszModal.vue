<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading"><a-form :form="form">
        <a-form-item label="等级编号" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入等级编号" v-decorator="['djbh', validatorRules.djbh ]" :disabled="disabledFlag"/>
        </a-form-item>

        <a-form-item label="等级名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入等级名称" v-decorator="['djmc', validatorRules.djmc]" />
        </a-form-item>

        <a-form-item label="等级描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea placeholder="请输入等级描述" v-decorator="['djms', {}]" :row="2"/>
        </a-form-item>
    </a-form></a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { duplicateCheck } from '../../../../api/api'

  export default {
    name: "khdj_khdjszModal",
    components: {},
    data () {
      return {
        title:"操作",
        visible: false,
        disabledFlag: false,
        confirmLoading: false,
        disableSubmit: false,
        model: {},
        form: this.$form.createForm(this),
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
          djbh:{rules: [
              { required: true, message: '请输入等级编号!' },
              { validator: this.validataCode }
          ]},
          djmc:{rules: [{ required: true, message: '请输入等级名称!' }]},
        },
        url: {
          add: "/khdj_khdjsz/khdj_khdjsz/add",
          edit: "/khdj_khdjsz/khdj_khdjsz/edit",
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
          this.form.setFieldsValue(pick(this.model,'djbh','djmc','djms'))
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
          tableName: 'KHDJ_KHDJSZ',
          fieldName: 'djbh',
          fieldVal: value,
          dataId: this.model.djbh,
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