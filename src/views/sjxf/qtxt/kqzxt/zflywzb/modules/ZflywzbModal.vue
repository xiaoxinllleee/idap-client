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
          label="业务类型:1-本代本;2-本代他;3-他代本">
          <a-input placeholder="请输入业务类型:1-本代本;2-本代他;3-他代本" v-decorator="['tradetype', {}]" />
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
          label="预留标识">
          <a-input placeholder="请输入预留标识" v-decorator="['resid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务受理日期">
          <a-input placeholder="请输入业务受理日期" v-decorator="['busidate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务标识">
          <a-input placeholder="请输入业务标识" v-decorator="['busiflag', {}]" />
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
          label="发起渠道交易种类">
          <a-input placeholder="请输入发起渠道交易种类" v-decorator="['chnlprocode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起渠道交易时间">
          <a-input placeholder="请输入发起渠道交易时间" v-decorator="['chnltrantime', {}]" />
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
          label="发起渠道时间">
          <a-input placeholder="请输入发起渠道时间" v-decorator="['chnltime', {}]" />
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
          label="发起渠道检索参考号">
          <a-input placeholder="请输入发起渠道检索参考号" v-decorator="['chnlrefno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作分行号">
          <a-input placeholder="请输入操作分行号" v-decorator="['zoneno', {}]" />
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
          label="出纳员">
          <a-input placeholder="请输入出纳员" v-decorator="['cashier', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="虚拟账户">
          <a-input placeholder="请输入虚拟账户" v-decorator="['virtualaccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务受理清算行号">
          <a-input placeholder="请输入业务受理清算行号" v-decorator="['bankno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="来往账标志:1-往账;2-来账">
          <a-input placeholder="请输入来往账标志:1-往账;2-来账" v-decorator="['mbflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借贷标识:0-非借非贷;1-借;2-贷">
          <a-input placeholder="请输入借贷标识:0-非借非贷;1-借;2-贷" v-decorator="['dcflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现金转账标识:1-现金;2-转账;3-内部转账">
          <a-input placeholder="请输入现金转账标识:1-现金;2-转账;3-内部转账" v-decorator="['cashflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易货币">
          <a-input placeholder="请输入交易货币" v-decorator="['curcode', {}]" />
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
          label="实际交易金额">
          <a-input placeholder="请输入实际交易金额" v-decorator="['realtradeamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费类型">
          <a-input placeholder="请输入手续费类型" v-decorator="['feeflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费金额">
          <a-input placeholder="请输入手续费金额" v-decorator="['feeamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报文类型:即外部报文编号">
          <a-input placeholder="请输入报文类型:即外部报文编号" v-decorator="['msgtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报文标识号:外部流水号,系统跟踪号等">
          <a-input placeholder="请输入报文标识号:外部流水号,系统跟踪号等" v-decorator="['msgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易处理码">
          <a-input placeholder="请输入交易处理码" v-decorator="['processcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易传输时间">
          <a-input placeholder="请输入交易传输时间" v-decorator="['systime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="源ID">
          <a-input placeholder="请输入源ID" v-decorator="['sourceid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="目标ID">
          <a-input placeholder="请输入目标ID" v-decorator="['destid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起方类型">
          <a-input placeholder="请输入发起方类型" v-decorator="['sendtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起方日期">
          <a-input placeholder="请输入发起方日期" v-decorator="['senddate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起方时间">
          <a-input placeholder="请输入发起方时间" v-decorator="['sendtime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起方流水号">
          <a-input placeholder="请输入发起方流水号" v-decorator="['sendseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起清算机构标识码">
          <a-input placeholder="请输入发起清算机构标识码" v-decorator="['sendclearbank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起机构标识码">
          <a-input placeholder="请输入发起机构标识码" v-decorator="['sendbank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收方日期">
          <a-input placeholder="请输入接收方日期" v-decorator="['recvdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收方时间">
          <a-input placeholder="请输入接收方时间" v-decorator="['recvtime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收方流水号">
          <a-input placeholder="请输入接收方流水号" v-decorator="['recvseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收清算机构标识码">
          <a-input placeholder="请输入接收清算机构标识码" v-decorator="['recvclearbank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收机构标识码">
          <a-input placeholder="请输入接收机构标识码" v-decorator="['recvbank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收方处理状态">
          <a-input placeholder="请输入接收方处理状态" v-decorator="['recvstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收方处理码">
          <a-input placeholder="请输入接收方处理码" v-decorator="['recverrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收方处理信息">
          <a-input placeholder="请输入接收方处理信息" v-decorator="['recverrmsg', {}]" />
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
          label="账务系统受理流水号">
          <a-input placeholder="请输入账务系统受理流水号" v-decorator="['bankseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统记账日期:核心记账日期">
          <a-input placeholder="请输入账务系统记账日期:核心记账日期" v-decorator="['bankrspdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统记账流水号:核心记账流水号">
          <a-input placeholder="请输入账务系统记账流水号:核心记账流水号" v-decorator="['bankrspseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心处理状态">
          <a-input placeholder="请输入核心处理状态" v-decorator="['bankstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心处理码">
          <a-input placeholder="请输入核心处理码" v-decorator="['bankerrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心处理信息">
          <a-input placeholder="请输入核心处理信息" v-decorator="['bankerrmsg', {}]" />
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
          label="账务系统冲正标志">
          <a-input placeholder="请输入账务系统冲正标志" v-decorator="['bankrevflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心交易码">
          <a-input placeholder="请输入核心交易码" v-decorator="['bankmsgtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心交易处理码">
          <a-input placeholder="请输入核心交易处理码" v-decorator="['bankprocode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心受理流水序号">
          <a-input placeholder="请输入核心受理流水序号" v-decorator="['bankseqid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心记账检索参考号8583格式">
          <a-input placeholder="请输入核心记账检索参考号8583格式" v-decorator="['bankrefno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方交易日期">
          <a-input placeholder="请输入第三方交易日期" v-decorator="['corpdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方交易时间">
          <a-input placeholder="请输入第三方交易时间" v-decorator="['corptime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方处理状态">
          <a-input placeholder="请输入第三方处理状态" v-decorator="['corpstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方处理码">
          <a-input placeholder="请输入第三方处理码" v-decorator="['corperrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方处理信息">
          <a-input placeholder="请输入第三方处理信息" v-decorator="['corperrmsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方对账状态">
          <a-input placeholder="请输入第三方对账状态" v-decorator="['corpchkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方交易传输时间">
          <a-input placeholder="请输入第三方交易传输时间" v-decorator="['corptrantime', {}]" />
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
          label="业务状态">
          <a-input placeholder="请输入业务状态" v-decorator="['busistatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务冲正标志">
          <a-input placeholder="请输入业务冲正标志" v-decorator="['revflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主账号">
          <a-input placeholder="请输入主账号" v-decorator="['accno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="子账号">
          <a-input placeholder="请输入子账号" v-decorator="['subaccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主账号名称">
          <a-input placeholder="请输入主账号名称" v-decorator="['accname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主账号实际余额">
          <a-input placeholder="请输入主账号实际余额" v-decorator="['accbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主账号开户机构">
          <a-input placeholder="请输入主账号开户机构" v-decorator="['accbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡类型:00-本行借记卡;01-本行贷记卡;99-他行卡">
          <a-input placeholder="请输入卡类型:00-本行借记卡;01-本行贷记卡;99-他行卡" v-decorator="['cardtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡有效期">
          <a-input placeholder="请输入卡有效期" v-decorator="['expiredate', {}]" />
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
          label="二磁道数据">
          <a-input placeholder="请输入二磁道数据" v-decorator="['track2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="三磁道数据">
          <a-input placeholder="请输入三磁道数据" v-decorator="['track3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转出主账号">
          <a-input placeholder="请输入转出主账号" v-decorator="['outaccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转出子账号">
          <a-input placeholder="请输入转出子账号" v-decorator="['outsubaccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转出主账号名称">
          <a-input placeholder="请输入转出主账号名称" v-decorator="['outaccname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转出主账号实际余额">
          <a-input placeholder="请输入转出主账号实际余额" v-decorator="['outaccbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入主账号">
          <a-input placeholder="请输入转入主账号" v-decorator="['inaccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入子账号">
          <a-input placeholder="请输入转入子账号" v-decorator="['insubaccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入主账号名称">
          <a-input placeholder="请输入转入主账号名称" v-decorator="['inaccname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入主账号实际余额">
          <a-input placeholder="请输入转入主账号实际余额" v-decorator="['inaccbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务点进入方式">
          <a-input placeholder="请输入服务点进入方式" v-decorator="['inputtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务点条件码">
          <a-input placeholder="请输入服务点条件码" v-decorator="['condcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务点PIN获取码">
          <a-input placeholder="请输入服务点PIN获取码" v-decorator="['pincode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="检索参考号">
          <a-input placeholder="请输入检索参考号" v-decorator="['indexrefno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银联检索参考号">
          <a-input placeholder="请输入银联检索参考号" v-decorator="['corprefno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终端标识">
          <a-input placeholder="请输入终端标识" v-decorator="['devid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终端类型">
          <a-input placeholder="请输入终端类型" v-decorator="['devtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终端清算日期">
          <a-input placeholder="请输入终端清算日期" v-decorator="['devcleardate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终端状态">
          <a-input placeholder="请输入终端状态" v-decorator="['devstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终端对账状态">
          <a-input placeholder="请输入终端对账状态" v-decorator="['devchkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户类型">
          <a-input placeholder="请输入商户类型" v-decorator="['merchanttype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户号">
          <a-input placeholder="请输入商户号" v-decorator="['merchantno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户名称">
          <a-input placeholder="请输入商户名称" v-decorator="['merchantname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清算日期">
          <a-input placeholder="请输入清算日期" v-decorator="['cleardate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清算金额">
          <a-input placeholder="请输入清算金额" v-decorator="['clearamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="清算汇率">
          <a-input placeholder="请输入清算汇率" v-decorator="['clearrate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原平台受理日期">
          <a-input placeholder="请输入原平台受理日期" v-decorator="['origworkdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原平台受理序号">
          <a-input placeholder="请输入原平台受理序号" v-decorator="['origworkseqid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原始数据">
          <a-input placeholder="请输入原始数据" v-decorator="['origdata', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原报文类型">
          <a-input placeholder="请输入原报文类型" v-decorator="['origmsgtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原报文标识号">
          <a-input placeholder="请输入原报文标识号" v-decorator="['origmsgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原银联交易传输时间">
          <a-input placeholder="请输入原银联交易传输时间" v-decorator="['origcorptrantime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原发起清算机构标识码">
          <a-input placeholder="请输入原发起清算机构标识码" v-decorator="['origsendclearbank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原发起机构标识码">
          <a-input placeholder="请输入原发起机构标识码" v-decorator="['origsendbank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易金额">
          <a-input placeholder="请输入原交易金额" v-decorator="['origamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易手续费">
          <a-input placeholder="请输入原交易手续费" v-decorator="['origfeeamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原账务系统受理日期">
          <a-input placeholder="请输入原账务系统受理日期" v-decorator="['origbankdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原账务系统受理流水号">
          <a-input placeholder="请输入原账务系统受理流水号" v-decorator="['origbankseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="响应码">
          <a-input placeholder="请输入响应码" v-decorator="['rspcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="响应数据">
          <a-input placeholder="请输入响应数据" v-decorator="['rspdata', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网络管理信息码">
          <a-input placeholder="请输入网络管理信息码" v-decorator="['netmanagecode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证类型">
          <a-input placeholder="请输入凭证类型" v-decorator="['vouchtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证日期">
          <a-input placeholder="请输入凭证日期" v-decorator="['vouchdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证号码">
          <a-input placeholder="请输入凭证号码" v-decorator="['vouchno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际余额">
          <a-input placeholder="请输入实际余额" v-decorator="['actualbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['idtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['idno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权代码">
          <a-input placeholder="请输入授权代码" v-decorator="['authno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权完成码">
          <a-input placeholder="请输入授权完成码" v-decorator="['authcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附加数据">
          <a-input placeholder="请输入附加数据" v-decorator="['adddata', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="版本号">
          <a-input placeholder="请输入版本号" v-decorator="['verid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易信息">
          <a-input placeholder="请输入交易信息" v-decorator="['tradeinfo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附加交易信息">
          <a-input placeholder="请输入附加交易信息" v-decorator="['addtradeinfo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方预留">
          <a-input placeholder="请输入第三方预留" v-decorator="['corpreserved', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="受理方保留">
          <a-input placeholder="请输入受理方保留" v-decorator="['sendreserved', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发卡方保留">
          <a-input placeholder="请输入发卡方保留" v-decorator="['cardreserved', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消息鉴别码MAC">
          <a-input placeholder="请输入消息鉴别码MAC" v-decorator="['mac', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="BSP集群标识号">
          <a-input placeholder="请输入BSP集群标识号" v-decorator="['bspno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算标识">
          <a-input placeholder="请输入结算标识" v-decorator="['chkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易批次号">
          <a-input placeholder="请输入交易批次号" v-decorator="['batchnum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="F60自定义域">
          <a-input placeholder="请输入F60自定义域" v-decorator="['custom', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="IC卡数据">
          <a-input placeholder="请输入IC卡数据" v-decorator="['iccarddata', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="IC卡锁卡状态">
          <a-input placeholder="请输入IC卡锁卡状态" v-decorator="['lockicstatus', {}]" />
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
          label="平台受理日期8583格式">
          <a-input placeholder="请输入平台受理日期8583格式" v-decorator="['date8583', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台交易传输时间8583格式">
          <a-input placeholder="请输入平台交易传输时间8583格式" v-decorator="['trantime8583', {}]" />
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
          label="预留1">
          <a-input placeholder="请输入预留1" v-decorator="['reserved1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留2">
          <a-input placeholder="请输入预留2" v-decorator="['reserved2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留3">
          <a-input placeholder="请输入预留3" v-decorator="['reserved3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统类型">
          <a-input placeholder="请输入账务系统类型" v-decorator="['bankhosttype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后处理时间">
          <a-input placeholder="请输入最后处理时间" v-decorator="['lasttime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bap请求流水号">
          <a-input placeholder="请输入bap请求流水号" v-decorator="['bapseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bsp请求流水号">
          <a-input placeholder="请输入bsp请求流水号" v-decorator="['bspseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应答">
          <a-input placeholder="请输入应答" v-decorator="['bspseqnoa', {}]" />
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
    name: "ZflywzbModal",
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
          add: "/zflywzb/zflywzb/add",
          edit: "/zflywzb/zflywzb/edit",
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
          this.form.setFieldsValue(pick(this.model,'workdate','workseqid','worktime','templatecode','tradecode','tradetype','sysid','appid','resid','busidate','busiflag','chnlcode','chnlprocode','chnltrantime','chnldate','chnltime','chnlseqno','chnlrefno','zoneno','brno','tellerno','chktellerno','authtellerno','cashier','virtualaccno','bankno','mbflag','dcflag','cashflag','curcode','amt','realtradeamt','feeflag','feeamt','msgtype','msgid','processcode','systime','sourceid','destid','sendtype','senddate','sendtime','sendseqno','sendclearbank','sendbank','recvdate','recvtime','recvseqno','recvclearbank','recvbank','recvstatus','recverrcode','recverrmsg','bankdate','bankseqno','bankrspdate','bankrspseqno','bankstatus','bankerrcode','bankerrmsg','bankchkflag','bankrevflag','bankmsgtype','bankprocode','bankseqid','bankrefno','corpdate','corptime','corpstatus','corperrcode','corperrmsg','corpchkflag','corptrantime','tradebusistep','busistatus','revflag','accno','subaccno','accname','accbal','accbrno','cardtype','expiredate','cardseqid','track2','track3','outaccno','outsubaccno','outaccname','outaccbal','inaccno','insubaccno','inaccname','inaccbal','inputtype','condcode','pincode','indexrefno','corprefno','devid','devtype','devcleardate','devstatus','devchkflag','merchanttype','merchantno','merchantname','cleardate','clearamt','clearrate','origworkdate','origworkseqid','origdata','origmsgtype','origmsgid','origcorptrantime','origsendclearbank','origsendbank','origamt','origfeeamt','origbankdate','origbankseqno','rspcode','rspdata','netmanagecode','vouchtype','vouchdate','vouchno','actualbal','idtype','idno','authno','authcode','adddata','verid','tradeinfo','addtradeinfo','corpreserved','sendreserved','cardreserved','mac','bspno','chkflag','batchnum','custom','iccarddata','lockicstatus','printcnt','date8583','trantime8583','remark','reserved1','reserved2','reserved3','bankhosttype','lasttime','bapseqno','bspseqno','bspseqnoa','dataDate','loadDate','legalNo','dtnum'))
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