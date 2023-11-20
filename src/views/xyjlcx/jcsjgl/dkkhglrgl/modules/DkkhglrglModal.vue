<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="借款人证件号码">
          <a-input placeholder="请输入借款人证件号码" v-decorator="['jkrzjhm', validatorRules.jkrzjhm ]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="借款人名称">
          <a-input placeholder="请输入借款人名称" v-decorator="['jkrmc', {}]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联人证件类型">
          <j-dict-select-tag v-decorator="['glrzjlx', {}]" :triggerChange="true" placeholder="请选择关联人证件类型" dictCode="dkjkpt_zjlx"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联人证件号码">
          <a-input placeholder="请输入关联人证件号码" v-decorator="['glrzjhm', validatorRules.glrzjhm ]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联人姓名">
          <a-input placeholder="请输入关联人姓名" v-decorator="['glrxm', {}]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联关系">
          <j-dict-select-tag v-decorator="['glgx', validatorRules.glgx]" :triggerChange="true" placeholder="请选择关联关系" dictCode="dkjkpt_glgx"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联人工作单位">
          <a-input placeholder="请输入关联人工作单位" v-decorator="['glrgzdw', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联人联系电话">
          <a-input placeholder="请输入关联人联系电话" v-decorator="['glrlxdh', {}]" />
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
    name: "DkkhglrglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disabled:false,
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
        validatorRules: {
          jkrzjhm: {rules: [{required: true, message: '请输入借款人证件号码!'}]},
          glrzjhm: {rules: [{required: true, message: '请输入关联人证件号码!'}]},
          glgx: {rules: [{required: true, message: '请选择关联关系!'}]},
        },
        url: {
          add: "/dkkhglrgl/dkkhglrgl/add",
          edit: "/dkkhglrgl/dkkhglrgl/edit",
        },
      }
    },
    created () {},
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jkrzjhm', 'jkrmc', 'glrzjlx', 'glrzjhm', 'glrxm', 'glgx', 'glrgzdw', 'glrlxdh'))
        })
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.jkrzjhm && !this.model.glrzjhm) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log(formData)
            console.info('借款人证件号码:', formData.jkrzjhm)
            console.info("关联人证件号码:", formData.glrzjhm)
            if (formData.jkrzjhm === formData.glrzjhm) {
              notification.warning({message: '系统提示', description: '借款人证件号码不能与关联人证件号码相同！', duration: 4})
              return false
            }
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }
        })
      },
      handleCancel() {
        this.close()
      },

      /**
       * 身份证号码校验
       * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
       */
      checkIdCard: function (idCard) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(idCard)) {
          return true
        } else {
          return false
        }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>