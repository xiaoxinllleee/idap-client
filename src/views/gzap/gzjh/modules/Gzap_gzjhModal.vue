<template>
  <a-modal cancelText="关闭"
           :title="title"
           :width="900"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false">
          <a-row :gutter="24">
            <a-col :md="12" :sm="8"><a-form-item label="开始日期" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-date-picker placeholder="计划开始日期" v-decorator="['jhkssj', {}]" style="width: 230px;" disabled/>
            </a-form-item></a-col>
            <a-col :md="12" :sm="8"><a-form-item label="结束日期" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-date-picker placeholder="计划结束日期" v-decorator="['jhjssj', {}]" style="width: 230px;" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="8"><a-form-item label="工作类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <j-dict-select-tag placeholder="工作计划/工作类型" v-decorator="['jhlx', {}]" dict-code="gzap_gzlx" style="width: 230px;" disabled/>
            </a-form-item></a-col>
            <a-col :md="12" :sm="8"><a-form-item label="计划概述" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input placeholder="工作计划/计划概述" v-decorator="['jhgs', {}]" style="width: 230px;" disabled/>
            </a-form-item></a-col>
          </a-row>
        </a-card>
        <a-row style="margin-top: -20px;">
          <a-col :span="24" :pull="2">
            <a-form-item label="计划内容" :labelCol="{ xs: { span: 24 }, sm: { span: 5 } }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" hasFeedback>
              <a-textarea placeholder="工作计划/计划内容" v-decorator="['jhnr', {}]" :autosize="{ minRows: 2, maxRows: 4 }" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="24" :pull="2">
            <a-form-item label="完成情况" :labelCol="{ xs: { span: 24 }, sm: { span: 5 } }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" hasFeedback>
              <a-textarea placeholder="请填写计划完成情况" v-decorator="['sjwcqk', validatorRules.sjwcqk]" :autosize="{ minRows: 2, maxRows: 4 }"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from 'moment'
  import AFormItem from 'ant-design-vue/es/form/FormItem'

  export default {
    name: "Gzap_jhxfModal",
    components: { AFormItem, moment },
    data () {
      return {
        title: "完成情况填写",
        visible: false,
        confirmLoading: false,
        dateFormat: 'YYYY-MM-DD',
        jhkssjdate: null,
        jhjssjdate: null,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        validatorRules:{
          sjwcqk:{rules: [{ required: true, message: '请填写计划完成情况!' }]},
        },
        form: this.$form.createForm(this),
        url: {
          edit: "/gzjh/vGzapGzjh/editMyPlan",
        },
      }
    },
    created() {},
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    methods: {
      moment,
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jhkssj', 'jhjssj', 'jhlx', 'jhgs', 'jhnr', 'sjwcqk'))
          // 时间格式化
          this.form.setFieldsValue({ jhkssj: this.model.jhkssj ? moment(this.model.jhkssj) : null })
          this.form.setFieldsValue({ jhjssj: this.model.jhjssj ? moment(this.model.jhjssj) : null })
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
            let method  = '';
            if (!this.model.id) {
              httpurl+=this.url.add;
              method = 'post';
            } else {
              httpurl+=this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            httpAction(httpurl,formData,method).then((res)=>{
              if (res.success) {
                that.$message.success('填写成功');
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
      }
    }
  }
</script>

<style lang="less" scoped>

</style>