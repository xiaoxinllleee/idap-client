<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :maskClosable="false"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭"
           okText="审批">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input  disabled="disabled" placeholder="请输入客户名称" v-decorator="['khmc', {}]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input  placeholder="请输入证件号码" v-decorator="['zjhm', validatorRules.zjhm ]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良记录行为描述">
          <!--<a-select placeholder="请选择不良记录行为描述" v-decorator="['bljlxwms', {} ]" />-->
          <j-dict-select-tag v-decorator="['bljlxwms', validatorRules.bljlxwms]" :triggerChange="true" placeholder="请选择不良记录行为描述"
                             disabled="disabled" dictCode="bljlxwms" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记日期">
          <a-date-picker disabled="disabled" v-decorator="[ 'djrq', {} ]" style="width: 100%" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审批结果">
              <a-select  v-model="spjg">
                <a-select-option value="1">
                  通过
                </a-select-option>
                <a-select-option value="2">
                  失败
                </a-select-option>
              </a-select>
            </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {notification} from "ant-design-vue";

  export default {
    name: "SpModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        disableSubmit: true,
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
        validatorRules: {
          zjhm: {rules: [{required: true, message: '请输入证件号码!'}]},
          bljlxwms: {rules: [{required: true, message: '不良记录行为描述!'}]},
        },
        spjg: '', //审批结果
        url: {
          sp: "/hmdgl/hmdgl/sp",
        },
      }
    },
    created () {
    },
    methods: {
      sp(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zjhm','khmc','yxbz','bljlxwms','blxwjsrq','spjg'))
          //时间格式化
          this.form.setFieldsValue({djrq:this.model.djrq?moment(this.model.djrq):null})
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
            //that.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            formData.spjg = this.spjg
            console.info(formData)
            if (formData.zjhm === '' || formData.zjhm === undefined) {
              notification.warning({ message: '系统提示', description:'证件号码不能为空！',duration: 4})
              return false
            }
            if (formData.bljlxwms === '' || formData.bljlxwms === undefined) {
              notification.warning({ message: '系统提示', description:'不良记录行为描述不能为空！',duration: 4})
              return false
            }
            if (formData.spjg === '' || formData.spjg === undefined) {
              notification.warning({ message: '系统提示', description:'请选择审批结果！',duration: 4})
              return false
            }
            httpAction(this.url.sp, formData, 'put').then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning('审批失败');
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