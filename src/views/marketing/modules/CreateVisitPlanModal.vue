<template>
  <a-modal :title="title"
           :width="600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- 主表单区域 -->
        <a-row class="form-row"><a-form-item label="客户类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag placeholder="请选择客户类型" v-decorator="['khlx', validatorRules.khlx]" dict-code="KHHF_KHLX"
                             style="width: 368px;" :trigger-change="true"/>
        </a-form-item></a-row>
        <a-row class="form-row"><a-form-item label="计划开始月份" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-month-picker placeholder="请选择开始月份" v-decorator="[ 'jhkssj', validatorRules.jhkssj]" format="YYYY-MM" style="width: 368px;"/>
        </a-form-item></a-row>
        <a-row class="form-row"><a-form-item label="计划结束月份" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-month-picker placeholder="请选择结束月份" v-decorator="[ 'jhjssj', validatorRules.jhjssj]" format="YYYY-MM" style="width: 368px;"/>
        </a-form-item></a-row>
        <a-row class="form-row"><a-form-item label="计划说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea placeholder="请填写计划说明" v-decorator="['jhsm', {}]" :autosize="{ minRows: 2, maxRows: 6 }" :rows="2" style="width: 368px;"/>
        </a-form-item></a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "CreateVisitPlanModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          khlx: {rules: [{required: true, message: '请选择客户类型!'}]},
          jhkssj: {rules: [{required: true, message: '请选择计划开始月份!'}]},
          jhjssj: {rules: [{required: true, message: '请选择计划结束月份!'}]},
        },
        url: {
          add: "/cjhfjh/yxglKhhfjh/add",
          edit: "/cjhfjh/yxglKhhfjh/edit",
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
          this.form.setFieldsValue(pick(this.model,'khlx','jhkssj','jhjssj','jhsm'))
          //时间格式化
          this.form.setFieldsValue({jhkssj: this.model.jhkssj ? moment(this.model.jhkssj) : null})
          this.form.setFieldsValue({jhjssj: this.model.jhjssj ? moment(this.model.jhjssj) : null})
        });
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.id) {
              httpurl+=this.url.add;
              method = 'post';
            } else {
              httpurl+=this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.jhkssj = formData.jhkssj ? formData.jhkssj.format() : null;
            formData.jhjssj = formData.jhjssj ? formData.jhjssj.format() : null;
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
      close () {
        this.$emit('close');
        this.visible = false;
      },
    }
  }
</script>

<style lang="less" scoped>
</style>