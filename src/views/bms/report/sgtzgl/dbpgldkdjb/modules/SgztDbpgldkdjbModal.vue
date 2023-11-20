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
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['xh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-date-picker v-decorator="[ 'fiscalDate', validatorRules.fiscalDate]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构编码">
          <a-input placeholder="请输入机构编码" v-decorator="['jgbm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保人名称">
          <a-input placeholder="请输入担保人名称" v-decorator="['dbrmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品编号">
          <a-input placeholder="请输入担保品编号" v-decorator="['dbpbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品大类">
          <a-input placeholder="请输入担保品大类" v-decorator="['dbpdl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品名称">
          <a-input placeholder="请输入担保品名称" v-decorator="['dbpmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品合同号">
          <a-input placeholder="请输入担保品合同号" v-decorator="['dbphth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人名称">
          <a-input placeholder="请输入借款人名称" v-decorator="['jkrmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保金额（元）">
          <a-input placeholder="请输入担保金额（元）" v-decorator="['dbje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同开始日期">
          <a-date-picker v-decorator="[ 'htksrq', validatorRules.htksrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同终止日">
          <a-date-picker v-decorator="[ 'htzzrq', validatorRules.htzzrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额（元）">
          <a-input placeholder="请输入贷款余额（元）" v-decorator="['dkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品状态">
          <a-input placeholder="请输入担保品状态" v-decorator="['dbpzt', {}]" />
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
    name: "SgztDbpgldkdjbModal",
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
          fiscalDate: { rules: [{ required: true, message: '请选择数据日期!' }] },
          htksrq: { rules: [{ required: true, message: '请选择合同开始日期!' }] },
          htzzrq: { rules: [{ required: true, message: '请选择合同终止日期!' }] },
        },
        url: {
          add: "/dbpgldkdjb/sgztDbpgldkdjb/add",
          edit: "/dbpgldkdjb/sgztDbpgldkdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'xh','fiscalDate','jgbm','dbrmc','dbpbh','dbpdl','dbpmc','dbphth','jkrmc','zjhm','dbje','dkye','dbpzt'))
		  //时间格式化
          this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
          this.form.setFieldsValue({htksrq:this.model.htksrq?moment(this.model.htksrq):null})
          this.form.setFieldsValue({htzzrq:this.model.htzzrq?moment(this.model.htzzrq):null})
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
            formData.fiscalDate = formData.fiscalDate ? formData.fiscalDate.format() : null
            formData.htksrq = formData.htksrq?formData.htksrq.format():null;
            formData.htzzrq = formData.htzzrq?formData.htzzrq.format():null;

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