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
          label="银行号">
          <a-input placeholder="请输入银行号" v-decorator="['instNo', validatorRules.instNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省代码">
          <a-input placeholder="请输入省代码" v-decorator="['provinceCode', validatorRules.provinceCode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证类型">
          <a-input placeholder="请输入凭证类型" v-decorator="['ibdType', validatorRules.ibdType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证前缀及凭证号码">
          <a-input placeholder="请输入凭证前缀及凭证号码" v-decorator="['srlNoPrefix', validatorRules.srlNoPrefix ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证号码">
          <a-input placeholder="请输入凭证号码" v-decorator="['serialNo', validatorRules.serialNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记录号">
          <a-input placeholder="请输入记录号" v-decorator="['recNo', validatorRules.recNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐号">
          <a-input placeholder="请输入帐号" v-decorator="['acctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失日期">
          <a-input placeholder="请输入挂失日期" v-decorator="['trnDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失时间">
          <a-input placeholder="请输入挂失时间" v-decorator="['trnTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易柜员">
          <a-input placeholder="请输入交易柜员" v-decorator="['trnTelrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易机构">
          <a-input placeholder="请输入交易机构" v-decorator="['trnBrchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失类型：1－口头挂失 2－书面挂失">
          <a-input placeholder="请输入挂失类型：1－口头挂失 2－书面挂失" v-decorator="['lstType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失开始日期">
          <a-input placeholder="请输入挂失开始日期" v-decorator="['lstStartDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失终止日期">
          <a-input placeholder="请输入挂失终止日期" v-decorator="['lstEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失人">
          <a-input placeholder="请输入挂失人" v-decorator="['proposer', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重空签发日期">
          <a-input placeholder="请输入重空签发日期" v-decorator="['issueDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失金额">
          <a-input placeholder="请输入挂失金额" v-decorator="['issueAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流水号">
          <a-input placeholder="请输入流水号" v-decorator="['jrnlNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当挂失的存单、存折挂失换折后，该标识位会置为1">
          <a-input placeholder="请输入当挂失的存单、存折挂失换折后，该标识位会置为1" v-decorator="['procFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失人身份证类型">
          <a-input placeholder="请输入挂失人身份证类型" v-decorator="['idType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失人身份证号码">
          <a-input placeholder="请输入挂失人身份证号码" v-decorator="['idNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失原因">
          <a-input placeholder="请输入挂失原因" v-decorator="['lstReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失代理人身份证类型">
          <a-input placeholder="请输入挂失代理人身份证类型" v-decorator="['agentIdType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失代理人身份证号码">
          <a-input placeholder="请输入挂失代理人身份证号码" v-decorator="['agentIdNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="解挂网点号">
          <a-input placeholder="请输入解挂网点号" v-decorator="['lstCancelBr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="解挂柜员号">
          <a-input placeholder="请输入解挂柜员号" v-decorator="['lstCancelTelr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="解挂日期">
          <a-input placeholder="请输入解挂日期" v-decorator="['lstCancelDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="解挂时间">
          <a-input placeholder="请输入解挂时间" v-decorator="['lstCancelTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="解挂流水号">
          <a-input placeholder="请输入解挂流水号" v-decorator="['lstCancelJrnl', {}]" />
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
          label="加载日期">
          <a-input placeholder="请输入加载日期" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
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
    name: "ZkgsbModal",
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
        instNo:{rules: [{ required: true, message: '请输入银行号!' }]},
        provinceCode:{rules: [{ required: true, message: '请输入省代码!' }]},
        ibdType:{rules: [{ required: true, message: '请输入凭证类型!' }]},
        srlNoPrefix:{rules: [{ required: true, message: '请输入凭证前缀及凭证号码!' }]},
        serialNo:{rules: [{ required: true, message: '请输入凭证号码!' }]},
        recNo:{rules: [{ required: true, message: '请输入记录号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/zkgsb/zkgsb/add",
          edit: "/zkgsb/zkgsb/edit",
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
          this.form.setFieldsValue(pick(this.model,'instNo','provinceCode','ibdType','srlNoPrefix','serialNo','recNo','acctNo','trnDate','trnTime','trnTelrNo','trnBrchNo','lstType','lstStartDate','lstEndDate','proposer','issueDate','issueAmt','jrnlNo','procFlag','idType','idNo','lstReason','agentIdType','agentIdNo','lstCancelBr','lstCancelTelr','lstCancelDt','lstCancelTime','lstCancelJrnl','sdate','edate','loadDate','legalNo','dtnum'))
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