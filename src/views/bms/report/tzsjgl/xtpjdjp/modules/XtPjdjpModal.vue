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
          label="票据介质">
          <a-input placeholder="请输入票据介质" v-decorator="['pjjz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据金额面值（元）">
          <a-input placeholder="请输入票据金额面值（元）" v-decorator="['pjjemz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票日期">
          <a-date-picker v-decorator="[ 'cprq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据实际到期日">
          <a-date-picker v-decorator="[ 'pjsjdqr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余天数">
          <a-input placeholder="请输入剩余天数" v-decorator="['syts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票人">
          <a-input placeholder="请输入出票人" v-decorator="['cpr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票人证件代码">
          <a-input placeholder="请输入出票人证件代码" v-decorator="['cprzjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="承兑人/行">
          <a-input placeholder="请输入承兑人/行" v-decorator="['cdr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="承兑人证件代码">
          <a-input placeholder="请输入承兑人证件代码" v-decorator="['cdrzjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现申请人">
          <a-input placeholder="请输入贴现申请人" v-decorator="['zxsqr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现申请人证件代码">
          <a-input placeholder="请输入贴现申请人证件代码" v-decorator="['zxsqrzjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现申请人行业">
          <a-input placeholder="请输入贴现申请人行业" v-decorator="['zxsqrhy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现申请人地区代码">
          <a-input placeholder="请输入贴现申请人地区代码" v-decorator="['zxsqrdqdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应付利息（元）">
          <a-input placeholder="请输入应付利息（元）" v-decorator="['yflx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算金额（元）">
          <a-input placeholder="请输入结算金额（元）" v-decorator="['jsje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成交日">
          <a-date-picker v-decorator="[ 'cjr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算日">
          <a-date-picker v-decorator="[ 'jsr', {}]" />
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
    name: "XtPjdjpModal",
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
          add: "/xtpjdjp/xtPjdjp/add",
          edit: "/xtpjdjp/xtPjdjp/edit",
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
          this.form.setFieldsValue(pick(this.model,'pjjz','pjjemz','syts','cpr','cprzjhm','cdr','cdrzjhm','zxsqr','zxsqrzjhm','zxsqrhy','zxsqrdqdm','yflx','jsje'))
		  //时间格式化
          this.form.setFieldsValue({cprq:this.model.cprq?moment(this.model.cprq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
          this.form.setFieldsValue({pjsjdqr:this.model.pjsjdqr?moment(this.model.pjsjdqr):null})
          this.form.setFieldsValue({cjr:this.model.cjr?moment(this.model.cjr):null})
          this.form.setFieldsValue({jsr:this.model.jsr?moment(this.model.jsr):null})
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
            formData.cprq = formData.cprq?formData.cprq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.pjsjdqr = formData.pjsjdqr?formData.pjsjdqr.format():null;
            formData.cjr = formData.cjr?formData.cjr.format():null;
            formData.jsr = formData.jsr?formData.jsr.format():null;
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