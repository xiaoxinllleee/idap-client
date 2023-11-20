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
          label="发放日期">
          <a-date-picker v-decorator="[ 'ffrq', {}]"/>
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
          label="发放金额(元)">
          <a-input placeholder="请输入发放金额" v-decorator="['ffje', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="余额(元)">
          <a-input placeholder="请输入余额" v-decorator="['ye', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="再贷款利率">
          <a-input placeholder="请输入再贷款利率" v-decorator="['zdkll', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年利率上限">
          <a-input placeholder="请输入年利率上限" v-decorator="['nllsx', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['hth', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否归还">
          <a-input placeholder="请输入是否归还" v-decorator="['sfgh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="押品">
          <a-input placeholder="请输入押品" v-decorator="['xp', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本月日均">
          <a-input placeholder="请输入本月日均" v-decorator="['byrj', {}]"/>
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
  name: "XtZdkdjbModal",
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
        add: "/xtzdkdjb/xtZdkdjb/add",
        edit: "/xtzdkdjb/xtZdkdjb/edit",
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
        this.form.setFieldsValue(pick(this.model, 'ffje', 'ye', 'zdkll', 'nllsx', 'hth', 'sfgh', 'xp', 'bz', 'byrj', 'syts'))
        //时间格式化
        this.form.setFieldsValue({ffrq: this.model.ffrq ? moment(this.model.ffrq) : null})
        this.form.setFieldsValue({dqrq: this.model.dqrq ? moment(this.model.dqrq) : null})
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
          formData.ffrq = formData.ffrq ? formData.ffrq.format() : null;
          formData.dqrq = formData.dqrq ? formData.dqrq.format() : null;
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