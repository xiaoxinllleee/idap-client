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
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['socNo', validatorRules.socNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号">
          <a-input placeholder="请输入账号" v-decorator="['mastAcct', validatorRules.mastAcct ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="子账号类型">
          <a-input placeholder="请输入子账号类型" v-decorator="['subAcctType', validatorRules.subAcctType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="子账户利益范畴">
          <a-input placeholder="请输入子账户利益范畴" v-decorator="['subAcctIntCate', validatorRules.subAcctIntCate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="子账号类型">
          <a-input placeholder="请输入子账号类型" v-decorator="['subAcctNo', validatorRules.subAcctNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="子货币代码">
          <a-input placeholder="请输入子货币代码" v-decorator="['subAcctCurr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="子货币类型">
          <a-input placeholder="请输入子货币类型" v-decorator="['subAcctCurrType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="子账户状态">
          <a-input placeholder="请输入子账户状态" v-decorator="['subAcctStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关闭子账户流水号">
          <a-input placeholder="请输入关闭子账户流水号" v-decorator="['subAcCloseJrnl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关闭子账户日期">
          <a-input placeholder="请输入关闭子账户日期" v-decorator="['subAcCloseDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="填充">
          <a-input placeholder="请输入填充" v-decorator="['fil01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['edate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载时间">
          <a-input placeholder="请输入加载时间" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', validatorRules.legalNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天入库表编号-对不同的表名唯一">
          <a-input placeholder="请输入天入库表编号-对不同的表名唯一" v-decorator="['dtnum', validatorRules.dtnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dttime">
          <a-date-picker v-decorator="[ 'dttime', {}]" />
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
    name: "HqckzzzhdzbModal",
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
        socNo:{rules: [{ required: true, message: '请输入机构号!' }]},
        mastAcct:{rules: [{ required: true, message: '请输入账号!' }]},
        subAcctType:{rules: [{ required: true, message: '请输入子账号类型!' }]},
        subAcctIntCate:{rules: [{ required: true, message: '请输入子账户利益范畴!' }]},
        subAcctNo:{rules: [{ required: true, message: '请输入子账号类型!' }]},
        legalNo:{rules: [{ required: true, message: '请输入法人标识!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/hqckzzzhdzb/hqckzzzhdzb/add",
          edit: "/hqckzzzhdzb/hqckzzzhdzb/edit",
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
          this.form.setFieldsValue(pick(this.model,'socNo','mastAcct','subAcctType','subAcctIntCate','subAcctNo','subAcctCurr','subAcctCurrType','subAcctStatus','subAcCloseJrnl','subAcCloseDate','fil01','sdate','edate','loadDate','legalNo','dtnum'))
		  //时间格式化
          this.form.setFieldsValue({dttime:this.model.dttime?moment(this.model.dttime):null})
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
            formData.dttime = formData.dttime?formData.dttime.format():null;
            
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