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
          label="CMT编号/报文类型">
          <a-input placeholder="请输入CMT编号/报文类型" v-decorator="['cmtno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通信级标识号">
          <a-input placeholder="请输入通信级标识号" v-decorator="['commid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通信级参考号">
          <a-input placeholder="请输入通信级参考号" v-decorator="['refcommid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报文标识号">
          <a-input placeholder="请输入报文标识号" v-decorator="['msgno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送网点">
          <a-input placeholder="请输入发送网点" v-decorator="['sndBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收网点">
          <a-input placeholder="请输入接收网点" v-decorator="['rcvBrNo', {}]" />
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
          label="交易时间">
          <a-input placeholder="请输入交易时间" v-decorator="['txTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人行的交易序号">
          <a-input placeholder="请输入人行的交易序号" v-decorator="['orderno', validatorRules.orderno ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="货币符号">
          <a-input placeholder="请输入货币符号" v-decorator="['curNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证类型">
          <a-input placeholder="请输入凭证类型" v-decorator="['noteType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冠子号码">
          <a-input placeholder="请输入冠子号码" v-decorator="['notePreno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证号">
          <a-input placeholder="请输入凭证号" v-decorator="['noteNo', {}]" />
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
          label="密码/证件号码">
          <a-input placeholder="请输入密码/证件号码" v-decorator="['drawval', {}]" />
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
          label="手续费标志">
          <a-input placeholder="请输入手续费标志" v-decorator="['txChrgInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费">
          <a-input placeholder="请输入手续费" v-decorator="['chrgAmt', {}]" />
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
          label="发起行行号">
          <a-input placeholder="请输入发起行行号" v-decorator="['orBrNo', validatorRules.orBrNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起行行名">
          <a-input placeholder="请输入发起行行名" v-decorator="['orBrNm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人开户行行号">
          <a-input placeholder="请输入付款人开户行行号" v-decorator="['payOpnBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人开户行行名">
          <a-input placeholder="请输入付款人开户行行名" v-decorator="['payOpnBrNm', {}]" />
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
          label="付款人姓名">
          <a-input placeholder="请输入付款人姓名" v-decorator="['payName', {}]" />
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
          label="接收行清算行号">
          <a-input placeholder="请输入接收行清算行号" v-decorator="['cashQsNo', {}]" />
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
          label="接收行行名">
          <a-input placeholder="请输入接收行行名" v-decorator="['acBrNm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人开户行行号">
          <a-input placeholder="请输入收款人开户行行号" v-decorator="['cashOpnBrNo', {}]" />
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
          label="中介机构1">
          <a-input placeholder="请输入中介机构1" v-decorator="['mediary1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="中介机构1名称">
          <a-input placeholder="请输入中介机构1名称" v-decorator="['mediaryname1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="中介机构2">
          <a-input placeholder="请输入中介机构2" v-decorator="['mediary2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="中介机构2名称">
          <a-input placeholder="请输入中介机构2名称" v-decorator="['mediaryname2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <a-input placeholder="请输入业务类型" v-decorator="['ywKind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务种类">
          <a-input placeholder="请输入业务种类" v-decorator="['ywType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="一二代标志">
          <a-input placeholder="请输入一二代标志" v-decorator="['begSts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优先级别">
          <a-input placeholder="请输入优先级别" v-decorator="['operlevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="端到端标识号">
          <a-input placeholder="请输入端到端标识号" v-decorator="['endtoendid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清算日期">
          <a-input placeholder="请输入清算日期" v-decorator="['clsdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务状态">
          <a-input placeholder="请输入业务状态" v-decorator="['hvSts', {}]" />
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
          label="核心记账日期">
          <a-input placeholder="请输入核心记账日期" v-decorator="['hostDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心记账流水号">
          <a-input placeholder="请输入核心记账流水号" v-decorator="['traceNo', {}]" />
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
          label="入账账号">
          <a-input placeholder="请输入入账账号" v-decorator="['enteracc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账账户名称">
          <a-input placeholder="请输入入账账户名称" v-decorator="['enteraccnm', {}]" />
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
          label="手工入账核心日期">
          <a-input placeholder="请输入手工入账核心日期" v-decorator="['enterdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工入账核心流水">
          <a-input placeholder="请输入手工入账核心流水" v-decorator="['entertrace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工入账柜员">
          <a-input placeholder="请输入手工入账柜员" v-decorator="['entertel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工入账平台流水">
          <a-input placeholder="请输入手工入账平台流水" v-decorator="['enterswno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送时核心记账日期">
          <a-input placeholder="请输入发送时核心记账日期" v-decorator="['hostDateSnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发送时核心记账流水号">
          <a-input placeholder="请输入发送时核心记账流水号" v-decorator="['traceNoSnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原支付来账交易状态">
          <a-input placeholder="请输入原支付来账交易状态" v-decorator="['hvOsts', {}]" />
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
          label="打印次数">
          <a-input placeholder="请输入打印次数" v-decorator="['hvPrtInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拒绝重发标志">
          <a-input placeholder="请输入拒绝重发标志" v-decorator="['resendInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拒绝重新发送日期">
          <a-input placeholder="请输入拒绝重新发送日期" v-decorator="['resendDate', {}]" />
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
          label="借贷标志">
          <a-input placeholder="请输入借贷标志" v-decorator="['cdFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收平台流水号">
          <a-input placeholder="请输入接收平台流水号" v-decorator="['rcvSwno', {}]" />
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
          label="授权操作员流水号">
          <a-input placeholder="请输入授权操作员流水号" v-decorator="['authTraceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核操作员">
          <a-input placeholder="请输入复核操作员" v-decorator="['chk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核操作员流水号">
          <a-input placeholder="请输入复核操作员流水号" v-decorator="['chkTraceNo', {}]" />
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
          label="发送操作员流水号">
          <a-input placeholder="请输入发送操作员流水号" v-decorator="['sendTraceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错账处理日期">
          <a-input placeholder="请输入错账处理日期" v-decorator="['dealerrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错账处理柜员">
          <a-input placeholder="请输入错账处理柜员" v-decorator="['dealerrTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错账处理主机流水">
          <a-input placeholder="请输入错账处理主机流水" v-decorator="['dealerrHostno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错账处理平台流水">
          <a-input placeholder="请输入错账处理平台流水" v-decorator="['dealerrSwno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处理状态">
          <a-input placeholder="请输入处理状态" v-decorator="['procstat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处理码">
          <a-input placeholder="请输入处理码" v-decorator="['respcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应答信息">
          <a-input placeholder="请输入应答信息" v-decorator="['rspinfo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务处理参与机构">
          <a-input placeholder="请输入业务处理参与机构" v-decorator="['procarty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['hvBrf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注2">
          <a-input placeholder="请输入备注2" v-decorator="['hvBrf2', {}]" />
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
          label="附言2">
          <a-input placeholder="请输入附言2" v-decorator="['remark2', {}]" />
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
          label="记账账号名称">
          <a-input placeholder="请输入记账账号名称" v-decorator="['accnm', {}]" />
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
          label="卡折标识">
          <a-input placeholder="请输入卡折标识" v-decorator="['kzFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权标志">
          <a-input placeholder="请输入授权标志" v-decorator="['sqbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账机构/挂账机构">
          <a-input placeholder="请输入入账机构/挂账机构" v-decorator="['susBrno', {}]" />
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
          label="补发标志">
          <a-input placeholder="请输入补发标志" v-decorator="['resndflg', {}]" />
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
          label="sDate">
          <a-input placeholder="请输入sDate" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eDate">
          <a-input placeholder="请输入eDate" v-decorator="['edate', {}]" />
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
    name: "DezfywzbModal",
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
        orderno:{rules: [{ required: true, message: '请输入人行的交易序号!' }]},
        orBrNo:{rules: [{ required: true, message: '请输入发起行行号!' }]},
        lwInd:{rules: [{ required: true, message: '请输入来往标识!' }]},
        legalNo:{rules: [{ required: true, message: '请输入法人标识!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/dezfywzb/dezfywzb/add",
          edit: "/dezfywzb/dezfywzb/edit",
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
          this.form.setFieldsValue(pick(this.model,'cmtno','commid','refcommid','msgno','sndBrNo','rcvBrNo','txDate','wtDate','txTime','orderno','curNo','noteType','notePreno','noteNo','drawtype','drawval','txAmt','txChrgInd','chrgAmt','payQsNo','orBrNo','orBrNm','payOpnBrNo','payOpnBrNm','payAcNo','payName','payAddr','cashQsNo','acBrNo','acBrNm','cashOpnBrNo','cashOpnBrNm','cashAcNo','cashName','cashAddr','mediary1','mediaryname1','mediary2','mediaryname2','ywKind','ywType','begSts','operlevel','endtoendid','clsdate','hvSts','tel','hostDate','traceNo','susflag','enteracc','enteraccnm','enteropenbrn','enterdate','entertrace','entertel','enterswno','hostDateSnd','traceNoSnd','hvOsts','checkflag','hostflag','hvPrtInd','resendInd','resendDate','lwInd','cdFlag','rcvSwno','authTel','authTraceNo','chk','chkTraceNo','sendTel','sendTraceNo','dealerrDate','dealerrTel','dealerrHostno','dealerrSwno','procstat','respcode','rspinfo','procarty','hvBrf','hvBrf2','remark','remark2','accno','accnm','chargeoff','kzFlag','sqbz','susBrno','chanType','susAcno','susReason','resndflg','chnlid','sdate','edate','loadDate','legalNo','dtnum'))
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