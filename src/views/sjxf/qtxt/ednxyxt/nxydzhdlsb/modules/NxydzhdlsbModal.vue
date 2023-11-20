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
          <a-input placeholder="请输入报文编号" v-decorator="['packid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易日期">
          <a-input placeholder="请输入交易日期" v-decorator="['txDate', validatorRules.txDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易时间HHMMSS">
          <a-input placeholder="请输入交易时间HHMMSS" v-decorator="['txTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易流水">
          <a-input placeholder="请输入交易流水" v-decorator="['traceNo', validatorRules.traceNo ]" />
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
          label="接收行号">
          <a-input placeholder="请输入接收行号" v-decorator="['rcvNpsBrno', {}]" />
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
          label="扣款户名">
          <a-input placeholder="请输入扣款户名" v-decorator="['debitName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款账号">
          <a-input placeholder="请输入付款账号" v-decorator="['payAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款开户行号">
          <a-input placeholder="请输入付款开户行号" v-decorator="['payNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额">
          <a-input placeholder="请输入交易金额" v-decorator="['txAmt', {}]" />
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
          label="接收行名">
          <a-input placeholder="请输入接收行名" v-decorator="['rcvNpsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送清算行号">
          <a-input placeholder="请输入发送清算行号" v-decorator="['sndSttlBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收清算行号">
          <a-input placeholder="请输入接收清算行号" v-decorator="['rcvSttlBrno', validatorRules.rcvSttlBrno ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报文标识号">
          <a-input placeholder="请输入报文标识号" v-decorator="['msgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优先级别">
          <a-input placeholder="请输入优先级别" v-decorator="['npsLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易种类">
          <a-input placeholder="请输入交易种类" v-decorator="['transferType', {}]" />
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
          label="清算日期">
          <a-input placeholder="请输入清算日期" v-decorator="['sttlDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易日期（退汇时）">
          <a-input placeholder="请输入原交易日期（退汇时）" v-decorator="['orTxDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易流水（退汇时）">
          <a-input placeholder="请输入原交易流水（退汇时）" v-decorator="['orTraceno', {}]" />
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
          label="主机流水号">
          <a-input placeholder="请输入主机流水号" v-decorator="['accTraceno', {}]" />
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
          label="现转标志">
          <a-input placeholder="请输入现转标志" v-decorator="['ctFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="赔偿金金额">
          <a-input placeholder="请输入赔偿金金额" v-decorator="['cpsAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拒付金额">
          <a-input placeholder="请输入拒付金额" v-decorator="['rfuAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原托收金额">
          <a-input placeholder="请输入原托收金额" v-decorator="['orgnlamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付金额">
          <a-input placeholder="请输入支付金额" v-decorator="['pmtamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="多付金额">
          <a-input placeholder="请输入多付金额" v-decorator="['oddamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收取客户手续费">
          <a-input placeholder="请输入收取客户手续费" v-decorator="['chrg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费标志">
          <a-input placeholder="请输入手续费标志" v-decorator="['chrgCtFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡折标志">
          <a-input placeholder="请输入卡折标志" v-decorator="['cbFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支取方式">
          <a-input placeholder="请输入支取方式" v-decorator="['drawType', {}]" />
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
          label="付款人名称">
          <a-input placeholder="请输入付款人名称" v-decorator="['payName', {}]" />
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
          label="收款人开户行行号">
          <a-input placeholder="请输入收款人开户行行号" v-decorator="['pyeNpsBrno', {}]" />
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
          label="密押">
          <a-input placeholder="请输入密押" v-decorator="['authWord', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付密码">
          <a-input placeholder="请输入支付密码" v-decorator="['payPwd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用途">
          <a-input placeholder="请输入用途" v-decorator="['purpose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <a-input placeholder="请输入业务类型" v-decorator="['attr', {}]" />
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
          label="凭证种类">
          <a-input placeholder="请输入凭证种类" v-decorator="['noteType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证号码">
          <a-input placeholder="请输入凭证号码" v-decorator="['noteNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据种类">
          <a-input placeholder="请输入票据种类" v-decorator="['vouType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据日期">
          <a-input placeholder="请输入票据日期" v-decorator="['vouDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据号码">
          <a-input placeholder="请输入票据号码" v-decorator="['vouNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['idType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['idNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退汇原因">
          <a-input placeholder="请输入退汇原因" v-decorator="['backReason', {}]" />
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
          label="收费单位流水号">
          <a-input placeholder="请输入收费单位流水号" v-decorator="['flownb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属期间">
          <a-input placeholder="请输入所属期间" v-decorator="['term', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴费类型">
          <a-input placeholder="请输入缴费类型" v-decorator="['payfeetp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费附言">
          <a-input placeholder="请输入收费附言" v-decorator="['rmk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送落地日期">
          <a-input placeholder="请输入发送落地日期" v-decorator="['sndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收落地日期">
          <a-input placeholder="请输入接收落地日期" v-decorator="['rcvDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="往来标志">
          <a-input placeholder="请输入往来标志" v-decorator="['srFlag', {}]" />
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
          label="中心应答码">
          <a-input placeholder="请输入中心应答码" v-decorator="['npsRespcd', {}]" />
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
          label="支付平台处理码">
          <a-input placeholder="请输入支付平台处理码" v-decorator="['respcd', {}]" />
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
          label="交易时间HHMMSS">
          <a-input placeholder="请输入交易时间HHMMSS" v-decorator="['sndTime', {}]" />
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
          label="原发起行行号">
          <a-input placeholder="请输入原发起行行号" v-decorator="['orNpsBrno', {}]" />
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
          label="二次授权员">
          <a-input placeholder="请输入二次授权员" v-decorator="['authTel2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权标志">
          <a-input placeholder="请输入授权标志" v-decorator="['authFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="参考报文标识号">
          <a-input placeholder="请输入参考报文标识号" v-decorator="['orMsgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原状态">
          <a-input placeholder="请输入原状态" v-decorator="['reservers', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核流水">
          <a-input placeholder="请输入复核流水" v-decorator="['refTraceno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="来账次数">
          <a-input placeholder="请输入来账次数" v-decorator="['rcvTimes', {}]" />
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
          label="挂账原因">
          <a-input placeholder="请输入挂账原因" v-decorator="['susReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起始日期">
          <a-input placeholder="请输入起始日期" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-input placeholder="请输入结束日期" v-decorator="['edate', {}]" />
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
    name: "NxydzhdlsbModal",
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
        txDate:{rules: [{ required: true, message: '请输入交易日期!' }]},
        traceNo:{rules: [{ required: true, message: '请输入交易流水!' }]},
        sndNpsBrno:{rules: [{ required: true, message: '请输入发起行号!' }]},
        rcvSttlBrno:{rules: [{ required: true, message: '请输入接收清算行号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/nxydzhdlsb/nxydzhdlsb/add",
          edit: "/nxydzhdlsb/nxydzhdlsb/edit",
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
          this.form.setFieldsValue(pick(this.model,'packid','txDate','txTime','traceNo','sndNpsBrno','rcvNpsBrno','debitAcc','debitName','payAcc','payNpsBrno','txAmt','sndNpsName','rcvNpsName','sndSttlBrno','rcvSttlBrno','msgid','npsLevel','transferType','npsDate','sttlDate','orTxDate','orTraceno','accDate','accTraceno','cur','ctFlag','cpsAmt','rfuAmt','orgnlamt','pmtamt','oddamt','chrg','chrgCtFlag','cbFlag','drawType','payAddr','payName','pyeAcc','pyeNpsBrno','pyeName','pyeAddr','authWord','payPwd','purpose','attr','busType','noteType','noteNum','vouType','vouDate','vouNumber','idType','idNo','backReason','stat','flownb','term','payfeetp','rmk','sndDate','rcvDate','srFlag','chkFlag','npsRespcd','accRespcd','respcd','susAcno','sndTime','brno','tel','chkTel','orNpsBrno','authTel','authTel2','authFlag','orMsgid','remark','reservers','refTraceno','rcvTimes','reserver1','susReason','sdate','edate','loadDate','legalNo','dtnum'))
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