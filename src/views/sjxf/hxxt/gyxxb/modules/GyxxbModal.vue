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
          label="柜员号">
          <a-input placeholder="请输入柜员号" v-decorator="['tellerNo', validatorRules.tellerNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主银行号">
          <a-input placeholder="请输入主银行号" v-decorator="['primInst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近的消息序号">
          <a-input placeholder="请输入最近的消息序号" v-decorator="['lastMsgSeq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['brchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主机构号">
          <a-input placeholder="请输入主机构号" v-decorator="['primBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终端号">
          <a-input placeholder="请输入终端号" v-decorator="['termInBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近签到机构">
          <a-input placeholder="请输入最近签到机构" v-decorator="['lastBranchSignon', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银行内的终端号">
          <a-input placeholder="请输入银行内的终端号" v-decorator="['termNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终端类型 0–分行柜员终端类型 1–ATM终端类型">
          <a-input placeholder="请输入终端类型 0–分行柜员终端类型 1–ATM终端类型" v-decorator="['termType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签到日期">
          <a-input placeholder="请输入签到日期" v-decorator="['signOnDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="二进制日期">
          <a-input placeholder="请输入二进制日期" v-decorator="['signOnDateBin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账日期">
          <a-input placeholder="请输入记账日期" v-decorator="['postDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签到标志">
          <a-input placeholder="请输入签到标志" v-decorator="['signonFlag', {}]" />
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
          label="语言代码">
          <a-input placeholder="请输入语言代码" v-decorator="['preferredLang', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="能力级别">
          <a-input placeholder="请输入能力级别" v-decorator="['capable', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主级别">
          <a-input placeholder="请输入主级别" v-decorator="['primCap', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组别">
          <a-input placeholder="请输入组别" v-decorator="['grpNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主组别">
          <a-input placeholder="请输入主组别" v-decorator="['primGrp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子邮件模块安全级别">
          <a-input placeholder="请输入电子邮件模块安全级别" v-decorator="['elmSec', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子邮件模块基本安全级别">
          <a-input placeholder="请输入电子邮件模块基本安全级别" v-decorator="['primElmSec', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近活动日期">
          <a-input placeholder="请输入最近活动日期" v-decorator="['dteLastActive', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主币种">
          <a-input placeholder="请输入主币种" v-decorator="['primCurrency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币1">
          <a-input placeholder="请输入外币1" v-decorator="['foreignCurr01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币2">
          <a-input placeholder="请输入外币2" v-decorator="['foreignCurr02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币3">
          <a-input placeholder="请输入外币3" v-decorator="['foreignCurr03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币4">
          <a-input placeholder="请输入外币4" v-decorator="['foreignCurr04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币5">
          <a-input placeholder="请输入外币5" v-decorator="['foreignCurr05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效的消息号码">
          <a-input placeholder="请输入有效的消息号码" v-decorator="['noActMsgs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="待阅信息数">
          <a-input placeholder="请输入待阅信息数" v-decorator="['msgsPending', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员名称">
          <a-input placeholder="请输入柜员名称" v-decorator="['tellerName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员密码">
          <a-input placeholder="请输入柜员密码" v-decorator="['tellerPword', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错误密码尝试次数">
          <a-input placeholder="请输入错误密码尝试次数" v-decorator="['tellerPwordRetry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="访问安全代码">
          <a-input placeholder="请输入访问安全代码" v-decorator="['accessSecurCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基本安全代码">
          <a-input placeholder="请输入基本安全代码" v-decorator="['primSecCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="密码变更日期">
          <a-input placeholder="请输入密码变更日期" v-decorator="['changePwordDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权号">
          <a-input placeholder="请输入授权号" v-decorator="['tellerAuthority', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码1">
          <a-input placeholder="请输入最近十次使用过的密码1" v-decorator="['pwordArea01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码2">
          <a-input placeholder="请输入最近十次使用过的密码2" v-decorator="['pwordArea02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码3">
          <a-input placeholder="请输入最近十次使用过的密码3" v-decorator="['pwordArea03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码4">
          <a-input placeholder="请输入最近十次使用过的密码4" v-decorator="['pwordArea04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码5">
          <a-input placeholder="请输入最近十次使用过的密码5" v-decorator="['pwordArea05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码6">
          <a-input placeholder="请输入最近十次使用过的密码6" v-decorator="['pwordArea06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码7">
          <a-input placeholder="请输入最近十次使用过的密码7" v-decorator="['pwordArea07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码8">
          <a-input placeholder="请输入最近十次使用过的密码8" v-decorator="['pwordArea08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码9">
          <a-input placeholder="请输入最近十次使用过的密码9" v-decorator="['pwordArea09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近十次使用过的密码10">
          <a-input placeholder="请输入最近十次使用过的密码10" v-decorator="['pwordArea10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前交易的账号">
          <a-input placeholder="请输入当前交易的账号" v-decorator="['currentAc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['currentTran', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ACC_INVOLVED">
          <a-input placeholder="请输入ACC_INVOLVED" v-decorator="['accInvolved', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处理标志">
          <a-input placeholder="请输入处理标志" v-decorator="['progressFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码1">
          <a-input placeholder="请输入需要授权交易的错误码1" v-decorator="['errorCode01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值1">
          <a-input placeholder="请输入授权值1" v-decorator="['errorOverride01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码2">
          <a-input placeholder="请输入需要授权交易的错误码2" v-decorator="['errorCode02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值2">
          <a-input placeholder="请输入授权值2" v-decorator="['errorOverride02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码3">
          <a-input placeholder="请输入需要授权交易的错误码3" v-decorator="['errorCode03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值3">
          <a-input placeholder="请输入授权值3" v-decorator="['errorOverride03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码4">
          <a-input placeholder="请输入需要授权交易的错误码4" v-decorator="['errorCode04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值4">
          <a-input placeholder="请输入授权值4" v-decorator="['errorOverride04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码5">
          <a-input placeholder="请输入需要授权交易的错误码5" v-decorator="['errorCode05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值5">
          <a-input placeholder="请输入授权值5" v-decorator="['errorOverride05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码6">
          <a-input placeholder="请输入需要授权交易的错误码6" v-decorator="['errorCode06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值6">
          <a-input placeholder="请输入授权值6" v-decorator="['errorOverride06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码7">
          <a-input placeholder="请输入需要授权交易的错误码7" v-decorator="['errorCode07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值7">
          <a-input placeholder="请输入授权值7" v-decorator="['errorOverride07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码8">
          <a-input placeholder="请输入需要授权交易的错误码8" v-decorator="['errorCode08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值8">
          <a-input placeholder="请输入授权值8" v-decorator="['errorOverride08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码9">
          <a-input placeholder="请输入需要授权交易的错误码9" v-decorator="['errorCode09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值9">
          <a-input placeholder="请输入授权值9" v-decorator="['errorOverride09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="需要授权交易的错误码10">
          <a-input placeholder="请输入需要授权交易的错误码10" v-decorator="['errorCode10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权值10">
          <a-input placeholder="请输入授权值10" v-decorator="['errorOverride10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="往来目的标识">
          <a-input placeholder="请输入往来目的标识" v-decorator="['corrDestination', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员缺席原因      0-Tellerpresent未缺席      1-Tellersick病假      2-Telleronannualleave年假      9-Otherreason其他原因">
          <a-input placeholder="请输入柜员缺席原因      0-Tellerpresent未缺席      1-Tellersick病假      2-Telleronannualleave年假      9-Otherreason其他原因" v-decorator="['absReasCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权柜员号">
          <a-input placeholder="请输入授权柜员号" v-decorator="['supTeller', validatorRules.supTeller ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消息数">
          <a-input placeholder="请输入消息数" v-decorator="['noOfMessages', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="SECTION部门">
          <a-input placeholder="请输入SECTION部门" v-decorator="['section', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近的终端消息">
          <a-input placeholder="请输入最近的终端消息" v-decorator="['lastTerminalMsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户类型      001-Teller柜面柜员      002-Dealer       03-BackOffice       04-Manager       05-Administration       06-CreditOfficer       07-Treasurer       08-Management       09-FinancialControl       10-Audit       11-RiskManagement       012–AccountOffice       013–AccountOfficeManager       014-RET">
          <a-input placeholder="请输入用户类型      001-Teller柜面柜员      002-Dealer       03-BackOffice       04-Manager       05-Administration       06-CreditOfficer       07-Treasurer       08-Management       09-FinancialControl       10-Audit       11-RiskManagement       012–AccountOffice       013–AccountOfficeManager       014-RET" v-decorator="['userType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="额度监控标志 Y-MonitorLimit柜员交易金额被监控额度 N-NonMonitorLimit柜员交易金额不被监控（农信全为’N’）">
          <a-input placeholder="请输入额度监控标志 Y-MonitorLimit柜员交易金额被监控额度 N-NonMonitorLimit柜员交易金额不被监控（农信全为’N’）" v-decorator="['limitMonitorFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="货币对模板代码">
          <a-input placeholder="请输入货币对模板代码" v-decorator="['curpTemplateCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未在FF中找到">
          <a-input placeholder="请输入未在FF中找到" v-decorator="['aoGroup', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="会计主管经理号">
          <a-input placeholder="请输入会计主管经理号" v-decorator="['aoManagerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员交易限额">
          <a-input placeholder="请输入柜员交易限额" v-decorator="['tellerLimits', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工号">
          <a-input placeholder="请输入员工号" v-decorator="['employeeId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日终轧账检查标志0-未轧账(签到时更新为0) 1-已轧账(用户轧账交易9015会设置为1)">
          <a-input placeholder="请输入日终轧账检查标志0-未轧账(签到时更新为0) 1-已轧账(用户轧账交易9015会设置为1)" v-decorator="['eodBalInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户部门">
          <a-input placeholder="请输入用户部门" v-decorator="['userDepart', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权柜员组号">
          <a-input placeholder="请输入授权柜员组号" v-decorator="['authGroupNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时值班机构号">
          <a-input placeholder="请输入临时值班机构号" v-decorator="['tempBranchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时值班用户组">
          <a-input placeholder="请输入临时值班用户组" v-decorator="['tempUserTeamNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时值班用户级别">
          <a-input placeholder="请输入临时值班用户级别" v-decorator="['tempUserLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时值班用户类型">
          <a-input placeholder="请输入临时值班用户类型" v-decorator="['tempUserType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时值班开始日期">
          <a-input placeholder="请输入临时值班开始日期" v-decorator="['tempStartDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="临时值班结束日期">
          <a-input placeholder="请输入临时值班结束日期" v-decorator="['tempEndDate', {}]" />
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
          label="上次交易日期">
          <a-input placeholder="请输入上次交易日期" v-decorator="['lastMaintDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次交易状态">
          <a-input placeholder="请输入上次交易状态" v-decorator="['lastMaintStat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始日期">
          <a-input placeholder="请输入开始日期" v-decorator="['sdate', {}]" />
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
    name: "GyxxbModal",
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
        tellerNo:{rules: [{ required: true, message: '请输入柜员号!' }]},
        supTeller:{rules: [{ required: true, message: '请输入授权柜员号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/gyxxb/gyxxb/add",
          edit: "/gyxxb/gyxxb/edit",
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
          this.form.setFieldsValue(pick(this.model,'socNo','tellerNo','primInst','lastMsgSeq','brchNo','primBranch','termInBranch','lastBranchSignon','termNo','termType','signOnDate','signOnDateBin','postDate','signonFlag','stat','preferredLang','capable','primCap','grpNo','primGrp','elmSec','primElmSec','dteLastActive','primCurrency','foreignCurr01','foreignCurr02','foreignCurr03','foreignCurr04','foreignCurr05','noActMsgs','msgsPending','tellerName','tellerPword','tellerPwordRetry','accessSecurCode','primSecCode','changePwordDate','tellerAuthority','pwordArea01','pwordArea02','pwordArea03','pwordArea04','pwordArea05','pwordArea06','pwordArea07','pwordArea08','pwordArea09','pwordArea10','currentAc','currentTran','accInvolved','progressFlag','errorCode01','errorOverride01','errorCode02','errorOverride02','errorCode03','errorOverride03','errorCode04','errorOverride04','errorCode05','errorOverride05','errorCode06','errorOverride06','errorCode07','errorOverride07','errorCode08','errorOverride08','errorCode09','errorOverride09','errorCode10','errorOverride10','corrDestination','absReasCode','supTeller','noOfMessages','section','lastTerminalMsg','userType','limitMonitorFlag','curpTemplateCode','aoGroup','aoManagerNo','tellerLimits','employeeId','eodBalInd','userDepart','authGroupNo','tempBranchNo','tempUserTeamNo','tempUserLevel','tempUserType','tempStartDate','tempEndDate','fil01','lastMaintDate','lastMaintStat','sdate','edate','loadDate','legalNo','dtnum'))
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