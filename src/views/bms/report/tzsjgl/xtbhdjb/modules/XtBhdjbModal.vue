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
          label="机构编码">
          <a-input placeholder="请输入机构编码" v-decorator="['jgbm', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保函账号">
          <a-input placeholder="请输入保函账号" v-decorator="['bhzh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保函类型">
          <a-input placeholder="请输入保函类型" v-decorator="['bhlx', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保函金额">
          <a-input placeholder="请输入保函金额" v-decorator="['bhje', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签发日期">
          <a-date-picker v-decorator="[ 'qfrq', {}]"/>
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
          label="报表日期">
          <a-date-picker v-decorator="[ 'bbrq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天数">
          <a-input placeholder="请输入天数" v-decorator="['ts', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人名称">
          <a-input placeholder="请输入申请人名称" v-decorator="['sqrmc', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请人账号">
          <a-input placeholder="请输入申请人账号" v-decorator="['sqrzh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金账号">
          <a-input placeholder="请输入保证金账号" v-decorator="['bzjzh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金金额">
          <a-input placeholder="请输入保证金金额" v-decorator="['bzjje', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费比例">
          <a-input placeholder="请输入收费比例" v-decorator="['sfbl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额">
          <a-input placeholder="请输入收费金额" v-decorator="['sfje', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人名称">
          <a-input placeholder="请输入收款人名称" v-decorator="['skrmc', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人账号">
          <a-input placeholder="请输入收款人账号" v-decorator="['skrzh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人行号">
          <a-input placeholder="请输入收款人行号" v-decorator="['skrhh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员">
          <a-input placeholder="请输入柜员" v-decorator="['gy', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人">
          <a-input placeholder="请输入第一责任人" v-decorator="['dyzrr', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否发生垫款">
          <a-input placeholder="请输入是否发生垫款" v-decorator="['sffsdk', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="垫款账号">
          <a-input placeholder="请输入垫款账号" v-decorator="['dkzh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编号">
          <a-input placeholder="请输入业务编号" v-decorator="['ywbh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="余额">
          <a-input placeholder="请输入余额" v-decorator="['ye', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['zt', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-month-picker :format="monthFormat" v-decorator="[ 'sjrq', validatorRules.sjrq]"/>
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
  name: "XtBhdjbModal",
  data() {
    return {
      title: "操作",
      visible: false,
      monthFormat: 'YYYY-MM',
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
        add: "/xtbhdjb/xtBhdjb/add",
        edit: "/xtbhdjb/xtBhdjb/edit",
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
        this.form.setFieldsValue(pick(this.model, 'jgbm', 'bhzh', 'bhlx', 'bhje', 'ts', 'sqrmc', 'sqrzh', 'bzjzh', 'bzjje', 'sfbl', 'sfje', 'skrmc', 'skrzh', 'skrhh', 'gy', 'dyzrr', 'sffsdk', 'dkzh', 'ywbh', 'ye', 'zt'))
        //时间格式化
        this.form.setFieldsValue({qfrq: this.model.qfrq ? moment(this.model.qfrq) : null})
        this.form.setFieldsValue({dqrq: this.model.dqrq ? moment(this.model.dqrq) : null})
        this.form.setFieldsValue({bbrq: this.model.bbrq ? moment(this.model.bbrq) : null})
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
          formData.qfrq = formData.qfrq ? formData.qfrq.format() : null;
          formData.dqrq = formData.dqrq ? formData.dqrq.format() : null;
          formData.bbrq = formData.bbrq ? formData.bbrq.format() : null;
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