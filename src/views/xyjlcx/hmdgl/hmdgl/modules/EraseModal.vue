<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    okText="抹除">

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
          label="有效标识">
          <j-dict-select-tag v-decorator="['yxbz', {}]" :triggerChange="true" placeholder="请选择有效标识"
                             disabled="disabled"  dictCode="hmdyxbz" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良记录行为描述">
          <!--<a-select placeholder="请选择不良记录行为描述" v-decorator="['bljlxwms', {} ]" />-->
          <j-dict-select-tag v-decorator="['bljlxwms', {}]" :triggerChange="true" placeholder="请选择不良记录行为描述"
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
          label="不良行为抹除日期">
          <a-date-picker v-decorator="[ 'blxwjsrq', {}]" style="width: 100%"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="情况说明">
          <a-input placeholder="请输入情况说明" v-decorator="['qksm', {}]" />
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
    name: "HmdglModal",
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
        validatorRules:{
          zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
          bljlxwms:{rules: [{ required: true, message: '不良记录行为描述!' }]},

        },
        url: {
          erase: "/hmdgl/hmdgl/erase",
        },
      }
    },
    created () {
    },
    methods: {
      erase (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zjhm','khmc','yxbz','bljlxwms','djrq','blxwjsrq','qksm'))
		      //时间格式化
          this.form.setFieldsValue({djrq:this.model.djrq?moment(this.model.djrq):null})
          this.form.setFieldsValue({bljlmcrq:this.model.bljlmcrq?moment(this.model.bljlmcrq):null})
          this.form.setFieldsValue({blxwjsrq:this.model.blxwjsrq?moment(this.model.blxwjsrq):null})
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
            let formData = Object.assign(this.model, values);
            //时间格式化
            console.log(formData)
            httpAction(this.url.erase, formData, 'put').then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning('抹除失败');
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