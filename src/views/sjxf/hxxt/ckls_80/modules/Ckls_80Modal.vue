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
          <a-input placeholder="请输入机构号" v-decorator="['instNo', {}]" />
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
          label="记录号">
          <a-input placeholder="请输入记录号" v-decorator="['recNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易类型">
          <a-input placeholder="请输入交易类型" v-decorator="['tranType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['stat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="该条数据记录日期">
          <a-input placeholder="请输入该条数据记录日期" v-decorator="['postDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易发生日期">
          <a-input placeholder="请输入交易发生日期" v-decorator="['trnDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统日期">
          <a-input placeholder="请输入系统日期" v-decorator="['systemDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统时间">
          <a-input placeholder="请输入系统时间" v-decorator="['systemTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员号和网点">
          <a-input placeholder="请输入柜员号和网点" v-decorator="['tellAndBr', {}]" />
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
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['trnCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终端号">
          <a-input placeholder="请输入终端号" v-decorator="['brterm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="渠道">
          <a-input placeholder="请输入渠道" v-decorator="['channel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="删除标志">
          <a-input placeholder="请输入删除标志" v-decorator="['deli', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="chqNoDays">
          <a-input placeholder="请输入chqNoDays" v-decorator="['chqNoDays', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="amount">
          <a-input placeholder="请输入amount" v-decorator="['amount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="balance">
          <a-input placeholder="请输入balance" v-decorator="['balance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="batchNo">
          <a-input placeholder="请输入batchNo" v-decorator="['batchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dayfileFlag">
          <a-input placeholder="请输入dayfileFlag" v-decorator="['dayfileFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="correction">
          <a-input placeholder="请输入correction" v-decorator="['correction', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="merchCountryCode">
          <a-input placeholder="请输入merchCountryCode" v-decorator="['merchCountryCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="deferDays">
          <a-input placeholder="请输入deferDays" v-decorator="['deferDays', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="miscDrCrInd">
          <a-input placeholder="请输入miscDrCrInd" v-decorator="['miscDrCrInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="repostTime">
          <a-input placeholder="请输入repostTime" v-decorator="['repostTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="postSeq">
          <a-input placeholder="请输入postSeq" v-decorator="['postSeq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="chqType">
          <a-input placeholder="请输入chqType" v-decorator="['chqType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="txnInd">
          <a-input placeholder="请输入txnInd" v-decorator="['txnInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tranSystem">
          <a-input placeholder="请输入tranSystem" v-decorator="['tranSystem', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tranDesc">
          <a-input placeholder="请输入tranDesc" v-decorator="['tranDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tranAcct">
          <a-input placeholder="请输入tranAcct" v-decorator="['tranAcct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="virtualAcct">
          <a-input placeholder="请输入virtualAcct" v-decorator="['virtualAcct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="thisDepCnt">
          <a-input placeholder="请输入thisDepCnt" v-decorator="['thisDepCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="brkRuleindBefimg">
          <a-input placeholder="请输入brkRuleindBefimg" v-decorator="['brkRuleindBefimg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="updCurrBalInd">
          <a-input placeholder="请输入updCurrBalInd" v-decorator="['updCurrBalInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subAcctType">
          <a-input placeholder="请输入subAcctType" v-decorator="['subAcctType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="volume">
          <a-input placeholder="请输入volume" v-decorator="['volume', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sequNum">
          <a-input placeholder="请输入sequNum" v-decorator="['sequNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="withdrMeth">
          <a-input placeholder="请输入withdrMeth" v-decorator="['withdrMeth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="cloNoticeNum">
          <a-input placeholder="请输入cloNoticeNum" v-decorator="['cloNoticeNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="noticeNum">
          <a-input placeholder="请输入noticeNum" v-decorator="['noticeNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eduInd">
          <a-input placeholder="请输入eduInd" v-decorator="['eduInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="maturityFlg">
          <a-input placeholder="请输入maturityFlg" v-decorator="['maturityFlg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lostDte">
          <a-input placeholder="请输入lostDte" v-decorator="['lostDte', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lostLogNum">
          <a-input placeholder="请输入lostLogNum" v-decorator="['lostLogNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="filler">
          <a-input placeholder="请输入filler" v-decorator="['filler', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="issueDate">
          <a-input placeholder="请输入issueDate" v-decorator="['issueDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="delayIntDays">
          <a-input placeholder="请输入delayIntDays" v-decorator="['delayIntDays', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="trfInActTyp">
          <a-input placeholder="请输入trfInActTyp" v-decorator="['trfInActTyp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="crSettleIntReason">
          <a-input placeholder="请输入crSettleIntReason" v-decorator="['crSettleIntReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="crChangeToSuspClo">
          <a-input placeholder="请输入crChangeToSuspClo" v-decorator="['crChangeToSuspClo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="curr">
          <a-input placeholder="请输入curr" v-decorator="['curr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="promoCode">
          <a-input placeholder="请输入promoCode" v-decorator="['promoCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="cshAnalyNum">
          <a-input placeholder="请输入cshAnalyNum" v-decorator="['cshAnalyNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="filler1">
          <a-input placeholder="请输入filler1" v-decorator="['filler1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="origJrnl">
          <a-input placeholder="请输入origJrnl" v-decorator="['origJrnl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="supervisorid">
          <a-input placeholder="请输入supervisorid" v-decorator="['supervisorid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="clientContact">
          <a-input placeholder="请输入clientContact" v-decorator="['clientContact', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pwdlIntAmount">
          <a-input placeholder="请输入pwdlIntAmount" v-decorator="['pwdlIntAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="filler2">
          <a-input placeholder="请输入filler2" v-decorator="['filler2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dataDate">
          <a-input placeholder="请输入dataDate" v-decorator="['dataDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="loadDate">
          <a-input placeholder="请输入loadDate" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
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
    name: "Ckls_80Modal",
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
        },
        url: {
          add: "/ckls_80/ckls_80/add",
          edit: "/ckls_80/ckls_80/edit",
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
          this.form.setFieldsValue(pick(this.model,'instNo','acctNo','recNo','tranType','stat','postDate','trnDate','systemDate','systemTime','tellAndBr','jrnlNo','trnCode','brterm','channel','deli','chqNoDays','amount','balance','batchNo','dayfileFlag','correction','merchCountryCode','deferDays','miscDrCrInd','repostTime','postSeq','chqType','txnInd','tranSystem','tranDesc','tranAcct','virtualAcct','thisDepCnt','brkRuleindBefimg','updCurrBalInd','subAcctType','volume','sequNum','withdrMeth','cloNoticeNum','noticeNum','eduInd','maturityFlg','lostDte','lostLogNum','filler','issueDate','delayIntDays','trfInActTyp','crSettleIntReason','crChangeToSuspClo','curr','promoCode','cshAnalyNum','filler1','origJrnl','supervisorid','clientContact','pwdlIntAmount','filler2','dataDate','loadDate','legalNo'))
		  //时间格式化
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