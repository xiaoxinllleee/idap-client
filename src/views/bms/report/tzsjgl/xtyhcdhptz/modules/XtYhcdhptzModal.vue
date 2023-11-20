<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="台账类型">
          <a-input placeholder="请输入台账类型" v-decorator="['tzlx', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票人行业分类">
          <a-input placeholder="请输入出票人行业分类" v-decorator="['cprhyfl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票号">
          <a-input placeholder="请输入票号" v-decorator="['ph', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票人">
          <a-input placeholder="请输入出票人" v-decorator="['cpr', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人">
          <a-input placeholder="请输入收款人" v-decorator="['skr', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票日期">
          <a-date-picker v-decorator="[ 'cprq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余天数">
          <a-input placeholder="请输入剩余天数" v-decorator="['syts', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票金额（元）">
          <a-input placeholder="请输入出票金额（元）" v-decorator="['cpje', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="余额（元）">
          <a-input placeholder="请输入余额（元）" v-decorator="['ye', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="解付金额（元）">
          <a-input placeholder="请输入解付金额（元）" v-decorator="['jfje', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="解付日期">
          <a-date-picker v-decorator="[ 'jfrq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金比例">
          <a-input placeholder="请输入保证金比例" v-decorator="['bzjbl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金金额（元）">
          <a-input placeholder="请输入保证金金额（元）" v-decorator="['bzjje', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请支行">
          <a-input placeholder="请输入申请支行" v-decorator="['sqzh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业">
          <a-input placeholder="请输入行业" v-decorator="['hy', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="规模">
          <a-input placeholder="请输入规模" v-decorator="['gm', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-month-picker :format="monthFormat" v-decorator="[ 'sjrq',validatorRules.sjrq]"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import {httpAction} from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"

export default {
  name: "PepTzglXtYhcdhptzModal",
  data() {
    return {
      monthFormat: 'YYYY-MM',
      title: "操作",
      visible: false,
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
        sjrq: {rules: [{required: true, message: '数据日期不能为空!'}]}
      },
      url: {
        add: "/xtyhcdhptz/pepTzglXtYhcdhptz/add",
        edit: "/xtyhcdhptz/pepTzglXtYhcdhptz/edit",
      },
    }
  },
  created() {
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
        this.form.setFieldsValue(pick(this.model, 'tzlx', 'cprhyfl', 'ph', 'cpr', 'skr', 'syts', 'cpje', 'ye', 'jfje', 'bzjbl', 'bzjje', 'sqzh', 'hy', 'gm'))
        //时间格式化
        this.form.setFieldsValue({cprq: this.model.cprq ? moment(this.model.cprq) : null})
        this.form.setFieldsValue({dqrq: this.model.dqrq ? moment(this.model.dqrq) : null})
        this.form.setFieldsValue({jfrq: this.model.jfrq ? moment(this.model.jfrq) : null})
        this.form.setFieldsValue({sjrq: this.model.sjrq ? moment(this.model.sjrq) : null})
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
          //时间格式化
          formData.cprq = formData.cprq ? formData.cprq.format() : null;
          formData.dqrq = formData.dqrq ? formData.dqrq.format() : null;
          formData.jfrq = formData.jfrq ? formData.jfrq.format() : null;
          formData.sjrq = formData.sjrq ? formData.sjrq.format("YYYY-MM") + '-01' : null;

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