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
          label="委托日期">
          <a-input placeholder="请输入委托日期" v-decorator="['txDate', validatorRules.txDate ]" />
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
          label="发起机构码">
          <a-input placeholder="请输入发起机构码" v-decorator="['sndBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起行号">
          <a-input placeholder="请输入发起行号" v-decorator="['sndNpsBrno', {}]" />
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
          label="发起成员行号（清算行号）">
          <a-input placeholder="请输入发起成员行号（清算行号）" v-decorator="['sndSttlBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收机构码(行内系统)">
          <a-input placeholder="请输入接收机构码(行内系统)" v-decorator="['rcvBrno', {}]" />
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
          label="接收行名">
          <a-input placeholder="请输入接收行名" v-decorator="['rcvNpsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收成员行号（清算行号）">
          <a-input placeholder="请输入接收成员行号（清算行号）" v-decorator="['rcvSttlBrno', {}]" />
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
          label="主机流水号">
          <a-input placeholder="请输入主机流水号" v-decorator="['accTraceNo', {}]" />
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
          <a-input placeholder="请输入交易金额" v-decorator="['txAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现转标志">
          <a-input placeholder="请输入现转标志" v-decorator="['cfFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票金额">
          <a-input placeholder="请输入出票金额" v-decorator="['draftAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余金额">
          <a-input placeholder="请输入剩余金额" v-decorator="['remainAmt', {}]" />
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
          label="支取方式">
          <a-input placeholder="请输入支取方式" v-decorator="['drawType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核押标志">
          <a-input placeholder="请输入核押标志" v-decorator="['testFlag', {}]" />
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
          label="付款人名称">
          <a-input placeholder="请输入付款人名称" v-decorator="['payName', {}]" />
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
          label="付款行号">
          <a-input placeholder="请输入付款行号" v-decorator="['payNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款清算行行号">
          <a-input placeholder="请输入付款清算行行号" v-decorator="['paySttlBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="持票人账号">
          <a-input placeholder="请输入持票人账号" v-decorator="['holdAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="持票人名称">
          <a-input placeholder="请输入持票人名称" v-decorator="['holdName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="持票人行号">
          <a-input placeholder="请输入持票人行号" v-decorator="['holdNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡着标志">
          <a-input placeholder="请输入卡着标志" v-decorator="['cbFlag', {}]" />
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
          label="收款人账号">
          <a-input placeholder="请输入收款人账号" v-decorator="['pyeAcc', {}]" />
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
          label="收款人开户行">
          <a-input placeholder="请输入收款人开户行" v-decorator="['pyeNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人清算行">
          <a-input placeholder="请输入收款人清算行" v-decorator="['pyeSttlBrno', {}]" />
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
          label="汇票日期（票据日期）">
          <a-input placeholder="请输入汇票日期（票据日期）" v-decorator="['draftDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="汇票号码（票据号码）">
          <a-input placeholder="请输入汇票号码（票据号码）" v-decorator="['draftNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据版本号">
          <a-input placeholder="请输入票据版本号" v-decorator="['version', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="兑付方式">
          <a-input placeholder="请输入兑付方式" v-decorator="['payWay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核发送日期">
          <a-input placeholder="请输入复核发送日期" v-decorator="['sndDate', {}]" />
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
          label="对账标志">
          <a-input placeholder="请输入对账标志" v-decorator="['chkFlag', {}]" />
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
          label="密押">
          <a-input placeholder="请输入密押" v-decorator="['seal', {}]" />
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
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remark', {}]" />
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
          label="NCC响应码">
          <a-input placeholder="请输入NCC响应码" v-decorator="['npsRespcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="打印次数">
          <a-input placeholder="请输入打印次数" v-decorator="['prtTimes', {}]" />
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
          label="操作员(交易控制/统计用字段)">
          <a-input placeholder="请输入操作员(交易控制/统计用字段)" v-decorator="['tel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核员(交易控制/统计用字段)">
          <a-input placeholder="请输入复核员(交易控制/统计用字段)" v-decorator="['chkTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权员(交易控制/统计用字段)">
          <a-input placeholder="请输入授权员(交易控制/统计用字段)" v-decorator="['authTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有无第三联标志">
          <a-input placeholder="请输入有无第三联标志" v-decorator="['billflg', {}]" />
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
          label="报文标识号(针对来帐应到填写此字段)">
          <a-input placeholder="请输入报文标识号(针对来帐应到填写此字段)" v-decorator="['sndMsgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报文编码(针对来帐应到填写此字段)">
          <a-input placeholder="请输入报文编码(针对来帐应到填写此字段)" v-decorator="['sndPackid', {}]" />
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
          label="业务种类">
          <a-input placeholder="请输入业务种类" v-decorator="['doType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退票原因">
          <a-input placeholder="请输入退票原因" v-decorator="['reason', {}]" />
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
          label="复核流水号">
          <a-input placeholder="请输入复核流水号" v-decorator="['refTraceno', {}]" />
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
          label="预留2">
          <a-input placeholder="请输入预留2" v-decorator="['reserver2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['eDate', {}]" />
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
    name: "HpywdjbModal",
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
        txDate:{rules: [{ required: true, message: '请输入委托日期!' }]},
        traceNo:{rules: [{ required: true, message: '请输入交易流水号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/hpywdjb/hpywdjb/add",
          edit: "/hpywdjb/hpywdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'packid','txDate','accDate','npsDate','sttlDate','sndBrno','sndNpsBrno','sndNpsName','sndSttlBrno','rcvBrno','rcvNpsBrno','rcvNpsName','rcvSttlBrno','traceNo','accTraceNo','cur','txAmt','cfFlag','draftAmt','remainAmt','cusChrg','chrgFlag','npsChrg','drawType','testFlag','payAcc','payName','payAddr','payNpsBrno','paySttlBrno','holdAcc','holdName','holdNpsBrno','cbFlag','debitAcc','pyeAcc','pyeName','pyeAddr','pyeNpsBrno','pyeSttlBrno','stat','draftDate','draftNo','version','payWay','sndDate','rcvDate','chkFlag','srFlag','seal','payPwd','purpose','remark','accRespcd','npsRespcd','prtTimes','txTime','tel','chkTel','authTel','billflg','msgid','sndMsgid','sndPackid','refMsgid','doType','reason','susAcno','refTraceno','reserver1','reserver2','sDate','eDate','loadDate','legalNo','dtnum'))
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