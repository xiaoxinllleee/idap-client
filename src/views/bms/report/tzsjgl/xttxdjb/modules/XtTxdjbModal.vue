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
          label="贴现日期">
          <a-date-picker v-decorator="[ 'txrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请单位">
          <a-input placeholder="请输入申请单位" v-decorator="['sqdw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="承兑行">
          <a-input placeholder="请输入承兑行" v-decorator="['cdh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票日">
          <a-date-picker v-decorator="[ 'cpr', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日">
          <a-date-picker v-decorator="[ 'dqr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现金额">
          <a-input placeholder="请输入贴现金额" v-decorator="['txje', {}]" />
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
          label="贴现利率">
          <a-input placeholder="请输入贴现利率" v-decorator="['txll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现余额">
          <a-input placeholder="请输入贴现余额" v-decorator="['txye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请支行">
          <a-input placeholder="请输入申请支行" v-decorator="['sqzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业">
          <a-input placeholder="请输入行业" v-decorator="['hy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="规模">
          <a-input placeholder="请输入规模" v-decorator="['gm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分摊后金额">
          <a-input placeholder="请输入分摊后金额" v-decorator="['fthje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-month-picker :format="monthFormat" v-decorator="[ 'sjrq', validatorRules.sjrq]" />
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
    name: "XtTxdjbModal",
    data () {
      return {
        monthFormat: 'YYYY-MM',
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
          sjrq: {rules: [{required: true, message: '数据日期不能为空!'}]}
        },
        url: {
          add: "/xttxdjb/xtTxdjb/add",
          edit: "/xttxdjb/xtTxdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'sqdw','cdh','txje','syts','txll','txye','sqzh','hy','gm','fthje'))
		  //时间格式化
          this.form.setFieldsValue({txrq:this.model.txrq?moment(this.model.txrq):null})
          this.form.setFieldsValue({cpr:this.model.cpr?moment(this.model.cpr):null})
          this.form.setFieldsValue({dqr:this.model.dqr?moment(this.model.dqr):null})
          this.form.setFieldsValue({sjrq:this.model.sjrq?moment(this.model.sjrq):null})
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
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.txrq = formData.txrq?formData.txrq.format():null;
            formData.cpr = formData.cpr?formData.cpr.format():null;
            formData.dqr = formData.dqr?formData.dqr.format():null;
            formData.sjrq = formData.sjrq?formData.sjrq.format("YYYY-MM") + '-01':null;

            console.log(formData)
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


    }
  }
</script>

<style lang="less" scoped>

</style>