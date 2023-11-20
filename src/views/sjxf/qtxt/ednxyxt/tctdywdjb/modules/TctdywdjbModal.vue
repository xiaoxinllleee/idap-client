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
          label="报文编号">
          <a-input placeholder="请输入报文编号" v-decorator="['packid', validatorRules.packid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <a-input placeholder="请输入业务类型" v-decorator="['prtry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务种类">
          <a-input placeholder="请输入业务种类" v-decorator="['busType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托日期">
          <a-input placeholder="请输入委托日期" v-decorator="['txDate', validatorRules.txDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农信银日期">
          <a-input placeholder="请输入农信银日期" v-decorator="['npsDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送时间">
          <a-input placeholder="请输入发送时间" v-decorator="['sndTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务日期">
          <a-input placeholder="请输入账务日期" v-decorator="['accDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清算日期">
          <a-input placeholder="请输入清算日期" v-decorator="['sttlDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构码">
          <a-input placeholder="请输入机构码" v-decorator="['brno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起行号">
          <a-input placeholder="请输入发起行号" v-decorator="['sndNpsBrno', validatorRules.sndNpsBrno ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起行名">
          <a-input placeholder="请输入发起行名" v-decorator="['sndNpsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起成员行号">
          <a-input placeholder="请输入发起成员行号" v-decorator="['sndSttlBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收行号">
          <a-input placeholder="请输入接收行号" v-decorator="['rcvNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接受行名">
          <a-input placeholder="请输入接受行名" v-decorator="['rcvNpsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收成员行号">
          <a-input placeholder="请输入接收成员行号" v-decorator="['rcvSttlBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易流水号">
          <a-input placeholder="请输入交易流水号" v-decorator="['traceNo', validatorRules.traceNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易流水号">
          <a-input placeholder="请输入原交易流水号" v-decorator="['orTraceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主机流水号">
          <a-input placeholder="请输入主机流水号" v-decorator="['accTraceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="止付编号">
          <a-input placeholder="请输入止付编号" v-decorator="['stopNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['cur', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额">
          <a-input placeholder="请输入交易金额" v-decorator="['amt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现转标志">
          <a-input placeholder="请输入现转标志" v-decorator="['ctFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收取客户手续费">
          <a-input placeholder="请输入收取客户手续费" v-decorator="['cusChrg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费现转标志">
          <a-input placeholder="请输入手续费现转标志" v-decorator="['chrgFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付给NCC手续费">
          <a-input placeholder="请输入付给NCC手续费" v-decorator="['npsChrg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人账号">
          <a-input placeholder="请输入付款人账号" v-decorator="['payAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款账户类型">
          <a-input placeholder="请输入付款账户类型" v-decorator="['payAccType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人名称">
          <a-input placeholder="请输入付款人名称" v-decorator="['payName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人开户行行号">
          <a-input placeholder="请输入付款人开户行行号" v-decorator="['payOpnBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款行行号">
          <a-input placeholder="请输入付款行行号" v-decorator="['payNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人开户清算行">
          <a-input placeholder="请输入付款人开户清算行" v-decorator="['paySttlBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人地址">
          <a-input placeholder="请输入付款人地址" v-decorator="['payAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人账号">
          <a-input placeholder="请输入收款人账号" v-decorator="['pyeAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款账户类型">
          <a-input placeholder="请输入收款账户类型" v-decorator="['pyeAccType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人名称">
          <a-input placeholder="请输入收款人名称" v-decorator="['pyeName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人地址">
          <a-input placeholder="请输入收款人地址" v-decorator="['pyeAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人开户行行号">
          <a-input placeholder="请输入收款人开户行行号" v-decorator="['pyeOpnBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款行行号">
          <a-input placeholder="请输入收款行行号" v-decorator="['pyeNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人开户清算行">
          <a-input placeholder="请输入收款人开户清算行" v-decorator="['pyeSttlBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['certType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['certNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人凭证号码">
          <a-input placeholder="请输入付款人凭证号码" v-decorator="['payVouNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存折余额">
          <a-input placeholder="请输入存折余额" v-decorator="['payVouBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人凭证号码">
          <a-input placeholder="请输入收款人凭证号码" v-decorator="['pyeVouNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存折余额">
          <a-input placeholder="请输入存折余额" v-decorator="['pyeVouBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['ps', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附言">
          <a-input placeholder="请输入附言" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务状态">
          <a-input placeholder="请输入业务状态" v-decorator="['stat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款确认标志">
          <a-input placeholder="请输入存款确认标志" v-decorator="['affiFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="往来标志">
          <a-input placeholder="请输入往来标志" v-decorator="['srFlag', validatorRules.srFlag ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账标志">
          <a-input placeholder="请输入对账标志" v-decorator="['chkFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处理码">
          <a-input placeholder="请输入处理码" v-decorator="['respcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主机响应码">
          <a-input placeholder="请输入主机响应码" v-decorator="['accRespcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂账账号">
          <a-input placeholder="请输入挂账账号" v-decorator="['susAcno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="NCC响应码">
          <a-input placeholder="请输入NCC响应码" v-decorator="['npsRespcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回执业务应答码">
          <a-input placeholder="请输入回执业务应答码" v-decorator="['rcvRespcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拒绝码">
          <a-input placeholder="请输入拒绝码" v-decorator="['rejRespcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拒绝信息">
          <a-input placeholder="请输入拒绝信息" v-decorator="['rejReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易时间">
          <a-input placeholder="请输入交易时间" v-decorator="['txTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作员">
          <a-input placeholder="请输入操作员" v-decorator="['tel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核员">
          <a-input placeholder="请输入复核员" v-decorator="['chkTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权员">
          <a-input placeholder="请输入授权员" v-decorator="['authTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报文标识号">
          <a-input placeholder="请输入报文标识号" v-decorator="['msgid', validatorRules.msgid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送报文标识号">
          <a-input placeholder="请输入发送报文标识号" v-decorator="['sndMsgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送报文编号">
          <a-input placeholder="请输入发送报文编号" v-decorator="['sndPackid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="参考报文标识号">
          <a-input placeholder="请输入参考报文标识号" v-decorator="['refMsgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细标识号">
          <a-input placeholder="请输入明细标识号" v-decorator="['txid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="端到端标识号">
          <a-input placeholder="请输入端到端标识号" v-decorator="['endid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="渠道类型">
          <a-input placeholder="请输入渠道类型" v-decorator="['channel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留">
          <a-input placeholder="请输入预留" v-decorator="['reservers', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡序列号">
          <a-input placeholder="请输入卡序列号" v-decorator="['cardseqid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款冲销记录原状态">
          <a-input placeholder="请输入存款冲销记录原状态" v-decorator="['sreserve', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保留">
          <a-input placeholder="请输入保留" v-decorator="['dreserve', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留1">
          <a-input placeholder="请输入预留1" v-decorator="['reserver1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="扣款人账号">
          <a-input placeholder="请输入扣款人账号" v-decorator="['debitAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起始日期">
          <a-input placeholder="请输入起始日期" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-input placeholder="请输入结束日期" v-decorator="['eDate', {}]" />
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
    name: "TctdywdjbModal",
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
        packid:{rules: [{ required: true, message: '请输入报文编号!' }]},
        txDate:{rules: [{ required: true, message: '请输入委托日期!' }]},
        sndNpsBrno:{rules: [{ required: true, message: '请输入发起行号!' }]},
        traceNo:{rules: [{ required: true, message: '请输入交易流水号!' }]},
        srFlag:{rules: [{ required: true, message: '请输入往来标志!' }]},
        msgid:{rules: [{ required: true, message: '请输入报文标识号!' }]},
        legalNo:{rules: [{ required: true, message: '请输入法人标识!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/tctdywdjb/tctdywdjb/add",
          edit: "/tctdywdjb/tctdywdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'packid','prtry','busType','txDate','npsDate','sndTime','accDate','sttlDate','brno','sndNpsBrno','sndNpsName','sndSttlBrno','rcvNpsBrno','rcvNpsName','rcvSttlBrno','traceNo','orTraceNo','accTraceNo','stopNo','cur','amt','ctFlag','cusChrg','chrgFlag','npsChrg','payAcc','payAccType','payName','payOpnBrno','payNpsBrno','paySttlBrno','payAddr','pyeAcc','pyeAccType','pyeName','pyeAddr','pyeOpnBrno','pyeNpsBrno','pyeSttlBrno','certType','certNo','payVouNo','payVouBal','pyeVouNo','pyeVouBal','ps','remark','stat','affiFlag','srFlag','chkFlag','respcd','accRespcd','susAcno','npsRespcd','rcvRespcd','rejRespcd','rejReason','txTime','tel','chkTel','authTel','msgid','sndMsgid','sndPackid','refMsgid','txid','endid','channel','reservers','cardseqid','sreserve','dreserve','reserver1','debitAcc','sDate','eDate','loadDate','legalNo','dtnum'))
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