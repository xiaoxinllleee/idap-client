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
          label="报文类型">
          <a-input placeholder="请输入报文类型" v-decorator="['msgtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易机构">
          <a-input placeholder="请输入交易机构" v-decorator="['brNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心记账日期">
          <a-input placeholder="请输入核心记账日期" v-decorator="['jzDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心记账流水号">
          <a-input placeholder="请输入核心记账流水号" v-decorator="['hostno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂账标志">
          <a-input placeholder="请输入挂账标志" v-decorator="['susflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账帐号">
          <a-input placeholder="请输入入账帐号" v-decorator="['enteracc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账帐户名称">
          <a-input placeholder="请输入入账帐户名称" v-decorator="['enteraccnm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账账号开户机构">
          <a-input placeholder="请输入入账账号开户机构" v-decorator="['enteropenbrn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工入账日期/借记来帐处理日期">
          <a-input placeholder="请输入手工入账日期/借记来帐处理日期" v-decorator="['enterdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工入账流水/借记来账处理流水">
          <a-input placeholder="请输入手工入账流水/借记来账处理流水" v-decorator="['entertrace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工入账柜员/借记来账处理柜员">
          <a-input placeholder="请输入手工入账柜员/借记来账处理柜员" v-decorator="['entertel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工入账平台流水/借记来账处理平台流水">
          <a-input placeholder="请输入手工入账平台流水/借记来账处理平台流水" v-decorator="['enterswno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台日期">
          <a-input placeholder="请输入平台日期" v-decorator="['txDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托日期">
          <a-input placeholder="请输入委托日期" v-decorator="['wtDate', validatorRules.wtDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="小额日期">
          <a-input placeholder="请输入小额日期" v-decorator="['bepsdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付交易序号">
          <a-input placeholder="请输入支付交易序号" v-decorator="['orderno', validatorRules.orderno ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回执支付序号">
          <a-input placeholder="请输入回执支付序号" v-decorator="['respno', {}]" />
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
          label="业务类型">
          <a-input placeholder="请输入业务类型" v-decorator="['txtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务种类">
          <a-input placeholder="请输入业务种类" v-decorator="['txkind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起行行号">
          <a-input placeholder="请输入发起行行号" v-decorator="['orBrNo', validatorRules.orBrNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起清算行行号">
          <a-input placeholder="请输入发起清算行行号" v-decorator="['payQsNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收行行号">
          <a-input placeholder="请输入接收行行号" v-decorator="['acBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收清算行行号">
          <a-input placeholder="请输入接收清算行行号" v-decorator="['cashQsNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['curNo', {}]" />
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
          label="借贷标志">
          <a-input placeholder="请输入借贷标志" v-decorator="['cdflag', {}]" />
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
          label="冠字号码">
          <a-input placeholder="请输入冠字号码" v-decorator="['notePreno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证号码">
          <a-input placeholder="请输入凭证号码" v-decorator="['noteNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支取方式">
          <a-input placeholder="请输入支取方式" v-decorator="['drawtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="密码/证件号码/支付密码">
          <a-input placeholder="请输入密码/证件号码/支付密码" v-decorator="['drawval', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人开户行">
          <a-input placeholder="请输入付款人开户行" v-decorator="['payOpnBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人开户行名称">
          <a-input placeholder="请输入付款人开户行名称" v-decorator="['payOpnBrNm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人账号">
          <a-input placeholder="请输入付款人账号" v-decorator="['payAcNo', {}]" />
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
          label="收款人开户行">
          <a-input placeholder="请输入收款人开户行" v-decorator="['cashOpnBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人开户行行名">
          <a-input placeholder="请输入收款人开户行行名" v-decorator="['cashOpnBrNm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人账号">
          <a-input placeholder="请输入收款人账号" v-decorator="['cashAcNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人姓名">
          <a-input placeholder="请输入收款人姓名" v-decorator="['cashName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人地址">
          <a-input placeholder="请输入收款人地址" v-decorator="['cashAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附言">
          <a-input placeholder="请输入附言" v-decorator="['lvBrf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附言2">
          <a-input placeholder="请输入附言2" v-decorator="['lvBrf2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回执期限">
          <a-input placeholder="请输入回执期限" v-decorator="['returndays', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="多方协议号">
          <a-input placeholder="请输入多方协议号" v-decorator="['protno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="NPC转发日期">
          <a-input placeholder="请输入NPC转发日期" v-decorator="['trandate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="来往标识">
          <a-input placeholder="请输入来往标识" v-decorator="['lwInd', validatorRules.lwInd ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回执日期">
          <a-input placeholder="请输入回执日期" v-decorator="['respDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务回执状态">
          <a-input placeholder="请输入业务回执状态" v-decorator="['rcpstat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务拒绝码">
          <a-input placeholder="请输入业务拒绝码" v-decorator="['rejectcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务拒绝原因">
          <a-input placeholder="请输入业务拒绝原因" v-decorator="['rejectreason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入操作员">
          <a-input placeholder="请输入录入操作员" v-decorator="['inputTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核操作员">
          <a-input placeholder="请输入复核操作员" v-decorator="['checkTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权操作员">
          <a-input placeholder="请输入授权操作员" v-decorator="['authTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送操作员">
          <a-input placeholder="请输入发送操作员" v-decorator="['sendTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回执操作员">
          <a-input placeholder="请输入回执操作员" v-decorator="['respTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核平台流水">
          <a-input placeholder="请输入复核平台流水" v-decorator="['checkTraceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收平台流水">
          <a-input placeholder="请输入接收平台流水" v-decorator="['rcvTraceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错账处理操作员">
          <a-input placeholder="请输入错账处理操作员" v-decorator="['dealTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错账处理日期">
          <a-input placeholder="请输入错账处理日期" v-decorator="['dealDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错账处理平台流水/冻结流水">
          <a-input placeholder="请输入错账处理平台流水/冻结流水" v-decorator="['dealSwno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错账处理流水号">
          <a-input placeholder="请输入错账处理流水号" v-decorator="['dealTraceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易状态(可参考附录)">
          <a-input placeholder="请输入交易状态(可参考附录)" v-decorator="['lvSts', {}]" />
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
          label="手续费标志">
          <a-input placeholder="请输入手续费标志" v-decorator="['txChrgInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费金额">
          <a-input placeholder="请输入手续费金额" v-decorator="['chrgAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人行对账检查状态">
          <a-input placeholder="请输入人行对账检查状态" v-decorator="['checkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行内对账检查状态">
          <a-input placeholder="请输入行内对账检查状态" v-decorator="['hostflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="包委托日期">
          <a-input placeholder="请输入包委托日期" v-decorator="['packDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="包序号">
          <a-input placeholder="请输入包序号" v-decorator="['packno', validatorRules.packno ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['filler', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注2">
          <a-input placeholder="请输入备注2" v-decorator="['filler2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户类型">
          <a-input placeholder="请输入账户类型" v-decorator="['accType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账账号">
          <a-input placeholder="请输入记账账号" v-decorator="['accno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账账户名称">
          <a-input placeholder="请输入记账账户名称" v-decorator="['accnm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报文优先级">
          <a-input placeholder="请输入报文优先级" v-decorator="['mesgpriority', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销账编号">
          <a-input placeholder="请输入销账编号" v-decorator="['chargeoff', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡折标志">
          <a-input placeholder="请输入卡折标志" v-decorator="['kzFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="渠道类型">
          <a-input placeholder="请输入渠道类型" v-decorator="['chanType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂账机构/入账机构">
          <a-input placeholder="请输入挂账机构/入账机构" v-decorator="['susBrno', {}]" />
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
          label="挂账原因">
          <a-input placeholder="请输入挂账原因" v-decorator="['susReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="代收付标志">
          <a-input placeholder="请输入代收付标志" v-decorator="['dsfFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['batch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处理标识">
          <a-input placeholder="请输入处理标识" v-decorator="['dealflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="渠道ID">
          <a-input placeholder="请输入渠道ID" v-decorator="['chnlid', {}]" />
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
          label="数据加载日期">
          <a-input placeholder="请输入数据加载日期" v-decorator="['loadDate', {}]" />
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
    name: "XezfjyzbModal",
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
        wtDate:{rules: [{ required: true, message: '请输入委托日期!' }]},
        orderno:{rules: [{ required: true, message: '请输入支付交易序号!' }]},
        orBrNo:{rules: [{ required: true, message: '请输入发起行行号!' }]},
        lwInd:{rules: [{ required: true, message: '请输入来往标识!' }]},
        packno:{rules: [{ required: true, message: '请输入包序号!' }]},
        legalNo:{rules: [{ required: true, message: '请输入法人标识!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/xezfjyzb/xezfjyzb/add",
          edit: "/xezfjyzb/xezfjyzb/edit",
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
          this.form.setFieldsValue(pick(this.model,'msgtype','brNo','jzDate','hostno','susflag','enteracc','enteraccnm','enteropenbrn','enterdate','entertrace','entertel','enterswno','txDate','wtDate','bepsdate','orderno','respno','txTime','txtype','txkind','orBrNo','payQsNo','acBrNo','cashQsNo','curNo','txAmt','cdflag','noteType','notePreno','noteNo','drawtype','drawval','payOpnBrNo','payOpnBrNm','payAcNo','payName','payAddr','cashOpnBrNo','cashOpnBrNm','cashAcNo','cashName','cashAddr','lvBrf','lvBrf2','returndays','protno','trandate','lwInd','respDate','rcpstat','rejectcode','rejectreason','inputTel','checkTel','authTel','sendTel','respTel','checkTraceNo','rcvTraceNo','dealTel','dealDate','dealSwno','dealTraceNo','lvSts','prtTimes','txChrgInd','chrgAmt','checkflag','hostflag','packDate','packno','filler','filler2','accType','accno','accnm','mesgpriority','chargeoff','kzFlag','chanType','susBrno','susAcno','susReason','dsfFlag','batch','dealflag','chnlid','sdate','edate','loadDate','legalNo','dtnum'))
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