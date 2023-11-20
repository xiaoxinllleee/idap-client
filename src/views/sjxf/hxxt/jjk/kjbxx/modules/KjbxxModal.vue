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
          <a-input placeholder="请输入银行号" v-decorator="['inst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡号">
          <a-input placeholder="请输入卡号" v-decorator="['no', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡产品号">
          <a-input placeholder="请输入卡产品号" v-decorator="['product', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡BIN代码">
          <a-input placeholder="请输入卡BIN代码" v-decorator="['bin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户号">
          <a-input placeholder="请输入客户号" v-decorator="['customer', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡名">
          <a-input placeholder="请输入卡名" v-decorator="['name1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡名">
          <a-input placeholder="请输入卡名" v-decorator="['name2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址行1">
          <a-input placeholder="请输入地址行1" v-decorator="['address1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址行2">
          <a-input placeholder="请输入地址行2" v-decorator="['address2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址行3">
          <a-input placeholder="请输入地址行3" v-decorator="['address3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址行4">
          <a-input placeholder="请输入地址行4" v-decorator="['address4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮编">
          <a-input placeholder="请输入邮编" v-decorator="['postcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电话号码">
          <a-input placeholder="请输入电话号码" v-decorator="['phone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="专用地址标记">
          <a-input placeholder="请输入专用地址标记" v-decorator="['hasAddress', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="专用地址到期日期">
          <a-input placeholder="请输入专用地址到期日期" v-decorator="['addressExpiry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡创建日期">
          <a-input placeholder="请输入卡创建日期" v-decorator="['creationDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡签发日期">
          <a-input placeholder="请输入卡签发日期" v-decorator="['issueDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡压印浮字日期">
          <a-input placeholder="请输入卡压印浮字日期" v-decorator="['embossingDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡到期日">
          <a-input placeholder="请输入卡到期日" v-decorator="['expiryDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡重发日">
          <a-input placeholder="请输入卡重发日" v-decorator="['reissueDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡最后保留日期">
          <a-input placeholder="请输入卡最后保留日期" v-decorator="['lastMaintDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡最后支取日期">
          <a-input placeholder="请输入卡最后支取日期" v-decorator="['lastWithdrawalDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡最后使用日期">
          <a-input placeholder="请输入卡最后使用日期" v-decorator="['lastUseDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后一次卡费">
          <a-input placeholder="请输入最后一次卡费" v-decorator="['lastFeeDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡的使用柜台">
          <a-input placeholder="请输入卡的使用柜台" v-decorator="['useCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="密码">
          <a-input placeholder="请输入密码" v-decorator="['pvv', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="无效的PIN的重试计数">
          <a-input placeholder="请输入无效的PIN的重试计数" v-decorator="['pinRetries', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡状况">
          <a-input placeholder="请输入卡状况" v-decorator="['status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡托收分行">
          <a-input placeholder="请输入卡托收分行" v-decorator="['colBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设为hot卡的原因码">
          <a-input placeholder="请输入设为hot卡的原因码" v-decorator="['hotReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设为hot的机构">
          <a-input placeholder="请输入设为hot的机构" v-decorator="['hotBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设为warm卡的原因码">
          <a-input placeholder="请输入设为warm卡的原因码" v-decorator="['warmReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设为warm卡的机构">
          <a-input placeholder="请输入设为warm卡的机构" v-decorator="['warmBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="标志">
          <a-input placeholder="请输入标志" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记名票据">
          <a-input placeholder="请输入记名票据" v-decorator="['note', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记名票据日期">
          <a-input placeholder="请输入记名票据日期" v-decorator="['noteDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="便民卡放款密码">
          <a-input placeholder="请输入便民卡放款密码" v-decorator="['password', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡签发次数">
          <a-input placeholder="请输入卡签发次数" v-decorator="['issueCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发卡机构">
          <a-input placeholder="请输入发卡机构" v-decorator="['issueBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发卡所在分行">
          <a-input placeholder="请输入发卡所在分行" v-decorator="['issueRegion', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省份机构">
          <a-input placeholder="请输入省份机构" v-decorator="['provincialBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="warm卡的次数计数">
          <a-input placeholder="请输入warm卡的次数计数" v-decorator="['warmCount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡是否已经自动warm">
          <a-input placeholder="请输入卡是否已经自动warm" v-decorator="['autowarmed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pcv码">
          <a-input placeholder="请输入pcv码" v-decorator="['pcv', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总行">
          <a-input placeholder="请输入总行" v-decorator="['parent', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Pvk类型">
          <a-input placeholder="请输入Pvk类型" v-decorator="['pvkType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="口挂日期">
          <a-input placeholder="请输入口挂日期" v-decorator="['informalLostDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="书挂日期">
          <a-input placeholder="请输入书挂日期" v-decorator="['formalLostDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="密码挂失日期">
          <a-input placeholder="请输入密码挂失日期" v-decorator="['pinLostDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="密码挂失重置日期">
          <a-input placeholder="请输入密码挂失重置日期" v-decorator="['pinLostReissueDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="锁卡日期">
          <a-input placeholder="请输入锁卡日期" v-decorator="['lockedDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡解锁日期">
          <a-input placeholder="请输入卡解锁日期" v-decorator="['hotDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Visa卡重试计数">
          <a-input placeholder="请输入Visa卡重试计数" v-decorator="['cvvRetries', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="短信签约标志">
          <a-input placeholder="请输入短信签约标志" v-decorator="['sms', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发卡索引">
          <a-input placeholder="请输入发卡索引" v-decorator="['issueIndex', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="下期年费日期">
          <a-input placeholder="请输入下期年费日期" v-decorator="['annualFeeNext', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年费日期">
          <a-input placeholder="请输入年费日期" v-decorator="['annualFeeDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年费百分值">
          <a-input placeholder="请输入年费百分值" v-decorator="['annualFeePercent', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年费周期">
          <a-input placeholder="请输入年费周期" v-decorator="['annualFreePeriod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余年费">
          <a-input placeholder="请输入剩余年费" v-decorator="['annualFeeResidual', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="列入黑名单日期">
          <a-input placeholder="请输入列入黑名单日期" v-decorator="['blacklistDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="列入黑名单原因">
          <a-input placeholder="请输入列入黑名单原因" v-decorator="['blacklistReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="列入黑名单机构">
          <a-input placeholder="请输入列入黑名单机构" v-decorator="['blacklistBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主帐号更新">
          <a-input placeholder="请输入主帐号更新" v-decorator="['panReplaced', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效值">
          <a-input placeholder="请输入有效值" v-decorator="['availablePoints', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="历史可用积分">
          <a-input placeholder="请输入历史可用积分" v-decorator="['hisAvailablePoints', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用值">
          <a-input placeholder="请输入使用值" v-decorator="['usedPoints', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总值">
          <a-input placeholder="请输入总值" v-decorator="['totalPoints', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Pin初始化标志">
          <a-input placeholder="请输入Pin初始化标志" v-decorator="['pinForceInit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="专用visa标志">
          <a-input placeholder="请输入专用visa标志" v-decorator="['hasCvv', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工标识">
          <a-input placeholder="请输入员工标识" v-decorator="['isStaff', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="城市银行代码">
          <a-input placeholder="请输入城市银行代码" v-decorator="['pbocCity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省份隐含代码">
          <a-input placeholder="请输入省份隐含代码" v-decorator="['pbocProvince', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人标志">
          <a-input placeholder="请输入个人标志" v-decorator="['personalised', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CVN">
          <a-input placeholder="请输入CVN" v-decorator="['cvn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户服务ID">
          <a-input placeholder="请输入客户服务ID" v-decorator="['customer2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年费周期内卡消费次数累积">
          <a-input placeholder="请输入年费周期内卡消费次数累积" v-decorator="['poscount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近重置POSCOUNT字段日期">
          <a-input placeholder="请输入最近重置POSCOUNT字段日期" v-decorator="['resetdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ATM行内转账交易开通标识">
          <a-input placeholder="请输入ATM行内转账交易开通标识" v-decorator="['atmTfxIntFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ATM跨行转账交易开通标识">
          <a-input placeholder="请输入ATM跨行转账交易开通标识" v-decorator="['atmTfxExtFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银联开通日期">
          <a-input placeholder="请输入银联开通日期" v-decorator="['cuppaySignDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银联关闭日期">
          <a-input placeholder="请输入银联关闭日期" v-decorator="['cuppayCloseDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银联开通标识">
          <a-input placeholder="请输入银联开通标识" v-decorator="['cuppaySignFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银联重试次数">
          <a-input placeholder="请输入银联重试次数" v-decorator="['cuppayRetries', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后银联交易日期">
          <a-input placeholder="请输入最后银联交易日期" v-decorator="['lastCuppayRetryDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后PIN重试日期">
          <a-input placeholder="请输入最后PIN重试日期" v-decorator="['lastPinRetryDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后更新时间">
          <a-input placeholder="请输入最后更新时间" v-decorator="['lastMaintainDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后更新操作">
          <a-input placeholder="请输入最后更新操作" v-decorator="['lastMaintainFlag', {}]" />
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
          label="数据日期">
          <a-input placeholder="请输入数据日期" v-decorator="['dataDate', {}]" />
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
    name: "KjbxxModal",
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
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/kjbxx/kjbxx/add",
          edit: "/kjbxx/kjbxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'inst','no','product','bin','customer','name1','name2','address1','address2','address3','address4','postcode','phone','hasAddress','addressExpiry','creationDate','issueDate','embossingDate','expiryDate','reissueDate','lastMaintDate','lastWithdrawalDate','lastUseDate','lastFeeDate','useCount','pvv','pinRetries','status','colBranch','hotReason','hotBranch','warmReason','warmBranch','remark','note','noteDate','password','issueCount','issueBranch','issueRegion','provincialBranch','warmCount','autowarmed','pcv','parent','pvkType','informalLostDate','formalLostDate','pinLostDate','pinLostReissueDate','lockedDate','hotDate','cvvRetries','sms','issueIndex','annualFeeNext','annualFeeDate','annualFeePercent','annualFreePeriod','annualFeeResidual','blacklistDate','blacklistReason','blacklistBranch','panReplaced','availablePoints','hisAvailablePoints','usedPoints','totalPoints','pinForceInit','hasCvv','isStaff','pbocCity','pbocProvince','personalised','cvn','customer2','poscount','resetdate','atmTfxIntFlag','atmTfxExtFlag','cuppaySignDate','cuppayCloseDate','cuppaySignFlag','cuppayRetries','lastCuppayRetryDate','lastPinRetryDate','lastMaintainDate','lastMaintainFlag','sdate','edate','dataDate','loadDate','legalNo','dtnum'))
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