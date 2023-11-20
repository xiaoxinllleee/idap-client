<template>
  <a-modal :title="title" :width="800" :visible="visible" :confirmLoading="confirmLoading"
           @ok="handleOk" @cancel="handleCancel" cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="区间编号">
          <a-input placeholder="请输入区间编号" v-decorator="['qjbh', validatorRules.qjbh ]" :disabled="editdisabled"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="额度起">
          <a-input placeholder="请输入" v-decorator="['edq', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="额度止">
          <a-input placeholder="请输入" v-decorator="['edz', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利率起">
          <a-input placeholder="请输入" v-decorator="['llq', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="利率止">
          <a-input placeholder="请输入" v-decorator="['llz', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调整系数">
          <a-input placeholder="请输入" v-decorator="['tzxs', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="风险计提系数">
          <a-input placeholder="请输入" v-decorator="['fxjtxs', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-input placeholder="请输入" v-decorator="['bz', {}]" />
        </a-form-item>
        <!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="lrr">
          <a-input placeholder="请输入lrr" v-decorator="['lrr', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="lrsj">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="lrbz">
          <a-input placeholder="请输入lrbz" v-decorator="['lrbz', {}]" />
        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DkqjjjModal",
    data() {
      return {
        title: "操作",
        visible: false,
        editdisabled: false,
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          qjbh: {rules: [{required: true, message: '请输入区间编号!'}]},
        },
        url: {
          add: "/khlc/dkqjjj/add",
          edit: "/khlc/dkqjjj/edit",
        },
      }
    },
    created() {},
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'qjbh', 'edq', 'edz', 'llq', 'llz', 'tzxs', 'fxjtxs', 'bz'))
          //时间格式化
          // this.form.setFieldsValue({lrsj: this.model.lrsj ? moment(this.model.lrsj) : null})
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
            if (!that.editdisabled) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            // formData.lrsj = formData.lrsj ? formData.lrsj.format() : null;

            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
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