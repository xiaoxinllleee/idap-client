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
          label="平台受理日期">
          <a-input placeholder="请输入平台受理日期" v-decorator="['workdate', validatorRules.workdate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台业务序号">
          <a-input placeholder="请输入平台业务序号" v-decorator="['workseqid', validatorRules.workseqid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台受理时间">
          <a-input placeholder="请输入平台受理时间" v-decorator="['worktime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台模板代码">
          <a-input placeholder="请输入平台模板代码" v-decorator="['templatecode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台交易代码">
          <a-input placeholder="请输入平台交易代码" v-decorator="['tradecode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统标识">
          <a-input placeholder="请输入系统标识" v-decorator="['sysid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应用标识">
          <a-input placeholder="请输入应用标识" v-decorator="['appid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留系统标识">
          <a-input placeholder="请输入预留系统标识" v-decorator="['resid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起渠道代码">
          <a-input placeholder="请输入发起渠道代码" v-decorator="['chnlcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起渠道日期">
          <a-input placeholder="请输入发起渠道日期" v-decorator="['chnldate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起渠道流水号">
          <a-input placeholder="请输入发起渠道流水号" v-decorator="['chnlseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作网点">
          <a-input placeholder="请输入操作网点" v-decorator="['brno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作柜员">
          <a-input placeholder="请输入操作柜员" v-decorator="['tellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核柜员">
          <a-input placeholder="请输入复核柜员" v-decorator="['chktellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权柜员">
          <a-input placeholder="请输入授权柜员" v-decorator="['authtellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作终端号">
          <a-input placeholder="请输入操作终端号" v-decorator="['terminalno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="来往账标志">
          <a-input placeholder="请输入来往账标志" v-decorator="['mbflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商业银行行号">
          <a-input placeholder="请输入商业银行行号" v-decorator="['bankno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="委托日期">
          <a-input placeholder="请输入委托日期" v-decorator="['busidate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应答报文标识号">
          <a-input placeholder="请输入应答报文标识号" v-decorator="['rspmsgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务状态">
          <a-input placeholder="请输入业务状态" v-decorator="['busistatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当前业务步骤">
          <a-input placeholder="请输入交易当前业务步骤" v-decorator="['tradebusistep', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="版本号">
          <a-input placeholder="请输入版本号" v-decorator="['ver', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起节点代码">
          <a-input placeholder="请输入发起节点代码" v-decorator="['src', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收节点代码">
          <a-input placeholder="请输入接收节点代码" v-decorator="['des', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应用名称">
          <a-input placeholder="请输入应用名称" v-decorator="['app', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报文编号">
          <a-input placeholder="请输入报文编号" v-decorator="['msgtype', {}]" />
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
          label="报文参考号">
          <a-input placeholder="请输入报文参考号" v-decorator="['msgref', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工作日期">
          <a-input placeholder="请输入工作日期" v-decorator="['cleardate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留字段">
          <a-input placeholder="请输入预留字段" v-decorator="['reserve', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实时批量标志">
          <a-input placeholder="请输入实时批量标志" v-decorator="['realflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="征收机关代码">
          <a-input placeholder="请输入征收机关代码" v-decorator="['taxorgcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="包流水号">
          <a-input placeholder="请输入包流水号" v-decorator="['packno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易流水号/申报序号">
          <a-input placeholder="请输入交易流水号/申报序号" v-decorator="['trano', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外部申报电子序号">
          <a-input placeholder="请输入外部申报电子序号" v-decorator="['outerlevyno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申报状态">
          <a-input placeholder="请输入申报状态" v-decorator="['levystatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经收类别">
          <a-input placeholder="请输入经收类别" v-decorator="['handletype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款行行号">
          <a-input placeholder="请输入收款行行号" v-decorator="['payeebankno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款单位代码">
          <a-input placeholder="请输入收款单位代码" v-decorator="['payeeorgcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人账号">
          <a-input placeholder="请输入收款人账号" v-decorator="['payeeacct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人名称">
          <a-input placeholder="请输入收款人名称" v-decorator="['payeename', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款行行号">
          <a-input placeholder="请输入付款行行号" v-decorator="['paybkcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款开户行行号">
          <a-input placeholder="请输入付款开户行行号" v-decorator="['payopbkcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款账户">
          <a-input placeholder="请输入付款账户" v-decorator="['payacct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴款单位名称">
          <a-input placeholder="请输入缴款单位名称" v-decorator="['handorgname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额">
          <a-input placeholder="请输入交易金额" v-decorator="['traamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="税票号码/费票号码">
          <a-input placeholder="请输入税票号码/费票号码" v-decorator="['taxvouno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="税种/险种条数">
          <a-input placeholder="请输入税种/险种条数" v-decorator="['taxtypenum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开票日期">
          <a-input placeholder="请输入开票日期" v-decorator="['billdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="税务登记号">
          <a-input placeholder="请输入税务登记号" v-decorator="['taxregistno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="纳税人代码">
          <a-input placeholder="请输入纳税人代码" v-decorator="['taxpaycode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="纳税人名称/缴费单位名称">
          <a-input placeholder="请输入纳税人名称/缴费单位名称" v-decorator="['taxpayname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="协议书号">
          <a-input placeholder="请输入协议书号" v-decorator="['protocolno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国库代码">
          <a-input placeholder="请输入国库代码" v-decorator="['trecode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业代码">
          <a-input placeholder="请输入企业代码" v-decorator="['corpcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预算种类">
          <a-input placeholder="请输入预算种类" v-decorator="['budgettype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="整理期标志">
          <a-input placeholder="请输入整理期标志" v-decorator="['trimsign', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业注册类型">
          <a-input placeholder="请输入企业注册类型" v-decorator="['corptype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="打印付款凭证标志">
          <a-input placeholder="请输入打印付款凭证标志" v-decorator="['printvousign', {}]" />
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
          label="备注1">
          <a-input placeholder="请输入备注1" v-decorator="['remark1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注2">
          <a-input placeholder="请输入备注2" v-decorator="['remark2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回执处理结果">
          <a-input placeholder="请输入回执处理结果" v-decorator="['result', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回执附言">
          <a-input placeholder="请输入回执附言" v-decorator="['addword', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="扣税日期/扣费日期">
          <a-input placeholder="请输入扣税日期/扣费日期" v-decorator="['taxdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="扣税/扣费处理结果">
          <a-input placeholder="请输入扣税/扣费处理结果" v-decorator="['payresult', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="扣税/扣费附言">
          <a-input placeholder="请输入扣税/扣费附言" v-decorator="['payaddword', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户机构">
          <a-input placeholder="请输入开户机构" v-decorator="['accbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统受理日期">
          <a-input placeholder="请输入账务系统受理日期" v-decorator="['bankdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统受理时间">
          <a-input placeholder="请输入账务系统受理时间" v-decorator="['banktime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统受理流水号">
          <a-input placeholder="请输入账务系统受理流水号" v-decorator="['bankseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统记账日期">
          <a-input placeholder="请输入账务系统记账日期" v-decorator="['bankrspdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统记账流水号">
          <a-input placeholder="请输入账务系统记账流水号" v-decorator="['bankrspseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统处理状态">
          <a-input placeholder="请输入账务系统处理状态" v-decorator="['bankstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统处理错误码">
          <a-input placeholder="请输入账务系统处理错误码" v-decorator="['bankerrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统处理错误信息">
          <a-input placeholder="请输入账务系统处理错误信息" v-decorator="['bankerrmsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统对账状态">
          <a-input placeholder="请输入账务系统对账状态" v-decorator="['bankchkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账类型">
          <a-input placeholder="请输入对账类型" v-decorator="['chkaccttype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账日期">
          <a-input placeholder="请输入对账日期" v-decorator="['chkdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账批次">
          <a-input placeholder="请输入对账批次" v-decorator="['chkacctord', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账状态">
          <a-input placeholder="请输入对账状态" v-decorator="['chkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="撤销标志">
          <a-input placeholder="请输入撤销标志" v-decorator="['backflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="撤销流水号">
          <a-input placeholder="请输入撤销流水号" v-decorator="['backno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="撤销日期">
          <a-input placeholder="请输入撤销日期" v-decorator="['backdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="撤销原因">
          <a-input placeholder="请输入撤销原因" v-decorator="['backreason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正标志">
          <a-input placeholder="请输入冲正标志" v-decorator="['revflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正申请序号">
          <a-input placeholder="请输入冲正申请序号" v-decorator="['cancelno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正原因">
          <a-input placeholder="请输入冲正原因" v-decorator="['cancelreason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="MQID">
          <a-input placeholder="请输入MQID" v-decorator="['mqid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="打印次数">
          <a-input placeholder="请输入打印次数" v-decorator="['printcnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据来源">
          <a-input placeholder="请输入数据来源" v-decorator="['datasource', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账处理标志">
          <a-input placeholder="请输入对账处理标志" v-decorator="['dealflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留字段1">
          <a-input placeholder="请输入预留字段1" v-decorator="['reserved1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留字段2">
          <a-input placeholder="请输入预留字段2" v-decorator="['reserved2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留字段3">
          <a-input placeholder="请输入预留字段3" v-decorator="['reserved3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-input placeholder="请输入数据日期" v-decorator="['dataDate', {}]" />
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
    name: "JylsModal",
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
        workdate:{rules: [{ required: true, message: '请输入平台受理日期!' }]},
        workseqid:{rules: [{ required: true, message: '请输入平台业务序号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/jyls/jyls/add",
          edit: "/jyls/jyls/edit",
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
          this.form.setFieldsValue(pick(this.model,'workdate','workseqid','worktime','templatecode','tradecode','sysid','appid','resid','chnlcode','chnldate','chnlseqno','brno','tellerno','chktellerno','authtellerno','terminalno','mbflag','bankno','busidate','rspmsgid','busistatus','tradebusistep','ver','src','des','app','msgtype','msgid','msgref','cleardate','reserve','realflag','taxorgcode','packno','trano','outerlevyno','levystatus','handletype','payeebankno','payeeorgcode','payeeacct','payeename','paybkcode','payopbkcode','payacct','handorgname','traamt','taxvouno','taxtypenum','billdate','taxregistno','taxpaycode','taxpayname','protocolno','trecode','corpcode','budgettype','trimsign','corptype','printvousign','remark','remark1','remark2','result','addword','taxdate','payresult','payaddword','accbrno','bankdate','banktime','bankseqno','bankrspdate','bankrspseqno','bankstatus','bankerrcode','bankerrmsg','bankchkflag','chkaccttype','chkdate','chkacctord','chkflag','backflag','backno','backdate','backreason','revflag','cancelno','cancelreason','mqid','printcnt','datasource','dealflag','reserved1','reserved2','reserved3','dataDate','loadDate','legalNo','dtnum'))
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