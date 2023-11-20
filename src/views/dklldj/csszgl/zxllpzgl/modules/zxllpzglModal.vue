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

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="信贷贷款品种">
          <j-dict-select-tag placeholder="请输入信贷贷款品种" v-decorator="['xddkpz', {}]" dict-code="xddkpz_one" :trigger-change="true"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
          <j-dict-select-tag placeholder="请输入贷款期限" v-decorator="['dkqx', {}]" dict-code="dkqx" :trigger-change="true"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价得分起">
          <a-input-number placeholder="请输入定价得分" v-decorator="['zhpcdfBegin', {}]"
                          :min="0" :step="1" style="width: 100%"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价得分止">
          <a-input-number placeholder="请输入定价得分" v-decorator="['zhpcdfEnd', {}]"
                          :min="0" :step="1" style="width: 100%"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="下浮比例(%)">
          <a-input-number placeholder="请输入下浮比例(%)" v-decorator="['xfbl', {}]"
                          :min="0" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" style="width: 100%"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="月执行利率(‰)">
          <a-input-number placeholder="请输入月执行利率(‰)" v-decorator="['zxllM', {}]"
                          :min="0" :formatter="value => `${value}‰`" :parser="value => value.replace('‰', '')" style="width: 100%"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="执行利率(%)">
          <a-input-number placeholder="请输入执行利率(%)" v-decorator="['zxllY', {}]"
                          :min="0" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" style="width: 100%"/>
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
    name: "zxllpzglModal",
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

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/csszgl/zxllpzgl/add",
          edit: "/csszgl/zxllpzgl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'xddkpz', 'dkqx', 'zhpcdfBegin', 'zhpcdfEnd', 'xfbl', 'zxllM', 'zxllY'))
        });

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
            if (!this.model.id) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);

            console.log(formData)
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
    }
  }
</script>

<style lang="less" scoped>

</style>