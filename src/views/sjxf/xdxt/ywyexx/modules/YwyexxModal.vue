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
          label="删除标志">
          <a-input placeholder="请输入删除标志" v-decorator="['dataFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['accNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未收利息">
          <a-input placeholder="请输入未收利息" v-decorator="['accruedIuterest', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款帐号/汇票号">
          <a-input placeholder="请输入贷款帐号/汇票号" v-decorator="['acctNo', validatorRules.acctNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际还款金额">
          <a-input placeholder="请输入实际还款金额" v-decorator="['actualPayMonthSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="呆帐金额">
          <a-input placeholder="请输入呆帐金额" v-decorator="['badbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['balance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编号">
          <a-input placeholder="请输入业务编号" v-decorator="['businessNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易编码">
          <a-input placeholder="请输入交易编码" v-decorator="['businessPhase', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款类别">
          <a-input placeholder="请输入贷款类别" v-decorator="['businessType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲销标志">
          <a-input placeholder="请输入冲销标志" v-decorator="['cancelFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['currency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷客户号">
          <a-input placeholder="请输入信贷客户号" v-decorator="['custId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['custName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心客户号">
          <a-input placeholder="请输入核心客户号" v-decorator="['custNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款合同号码">
          <a-input placeholder="请输入贷款合同号码" v-decorator="['dkhth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收利息">
          <a-input placeholder="请输入实收利息" v-decorator="['dueLuterest', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="呆滞金额">
          <a-input placeholder="请输入呆滞金额" v-decorator="['dullbal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="罚息金额">
          <a-input placeholder="请输入罚息金额" v-decorator="['finebal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销户日期">
          <a-input placeholder="请输入销户日期" v-decorator="['finishDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="放款人员">
          <a-input placeholder="请输入放款人员" v-decorator="['fkId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="获取数据时间">
          <a-input placeholder="请输入获取数据时间" v-decorator="['getDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收息账户余额">
          <a-input placeholder="请输入收息账户余额" v-decorator="['houldPayMonthSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表内欠息余额">
          <a-input placeholder="请输入表内欠息余额" v-decorator="['intbal1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外欠息余额">
          <a-input placeholder="请输入表外欠息余额" v-decorator="['intbal2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款类型0贷款1票据2贴现">
          <a-input placeholder="请输入贷款类型0贷款1票据2贴现" v-decorator="['kind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-input placeholder="请输入到期日期" v-decorator="['maturity', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本月利息累收">
          <a-input placeholder="请输入本月利息累收" v-decorator="['monthIntbalPileAccept', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本月本金累收">
          <a-input placeholder="请输入本月本金累收" v-decorator="['monthOwePileAccept', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本月本金累放">
          <a-input placeholder="请输入本月本金累放" v-decorator="['monthOwePilePut', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易社网点号">
          <a-input placeholder="请输入交易社网点号" v-decorator="['org', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['orgId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期金额">
          <a-input placeholder="请输入逾期金额" v-decorator="['overDuebal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期期数">
          <a-input placeholder="请输入逾期期数" v-decorator="['overDuebalTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠本金额">
          <a-input placeholder="请输入欠本金额" v-decorator="['oweBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算账号">
          <a-input placeholder="请输入结算账号" v-decorator="['payAcctno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款月数">
          <a-input placeholder="请输入还款月数" v-decorator="['payTermMonth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款日期">
          <a-input placeholder="请输入贷款日期" v-decorator="['putOutDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款金额">
          <a-input placeholder="请输入贷款金额" v-decorator="['putoutSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率">
          <a-input placeholder="请输入利率" v-decorator="['rate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本月应还款金额">
          <a-input placeholder="请输入本月应还款金额" v-decorator="['shouldPayMonthSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应还款期数">
          <a-input placeholder="请输入应还款期数" v-decorator="['shouldPayTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款期限">
          <a-input placeholder="请输入贷款期限" v-decorator="['term', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借据号/汇票号">
          <a-input placeholder="请输入借据号/汇票号" v-decorator="['voucherNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年利息累收">
          <a-input placeholder="请输入本年利息累收" v-decorator="['yearIntbalPileAccept', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年本金累收">
          <a-input placeholder="请输入本年本金累收" v-decorator="['yearOwePileAccept', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年本金累放">
          <a-input placeholder="请输入本年本金累放" v-decorator="['yearOwePilePut', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期利率">
          <a-input placeholder="请输入逾期利率" v-decorator="['yqll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="罚息利率">
          <a-input placeholder="请输入罚息利率" v-decorator="['fxll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期利率">
          <a-input placeholder="请输入展期利率" v-decorator="['zqll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期利率1">
          <a-input placeholder="请输入展期利率1" v-decorator="['zqll1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期金额">
          <a-input placeholder="请输入展期金额" v-decorator="['zqje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收息账号">
          <a-input placeholder="请输入收息账号" v-decorator="['sxzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂息账号">
          <a-input placeholder="请输入挂息账号" v-decorator="['gxzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表外账号">
          <a-input placeholder="请输入表外账号" v-decorator="['bwzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="暂末用">
          <a-input placeholder="请输入暂末用" v-decorator="['bjflh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收利率累计">
          <a-input placeholder="请输入应收利率累计" v-decorator="['yslxlj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放累计">
          <a-input placeholder="请输入发放累计" v-decorator="['fflj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回收累计">
          <a-input placeholder="请输入回收累计" v-decorator="['hslj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款用途(核心)">
          <a-input placeholder="请输入贷款用途(核心)" v-decorator="['dkyt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计账科目">
          <a-input placeholder="请输入计账科目" v-decorator="['jzkm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起息日期">
          <a-input placeholder="请输入起息日期" v-decorator="['qxrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="四级分类状态">
          <a-input placeholder="请输入四级分类状态" v-decorator="['fourClassState', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心借据号">
          <a-input placeholder="请输入核心借据号" v-decorator="['hxjjh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['zjlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记息标志">
          <a-input placeholder="请输入记息标志" v-decorator="['jxbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一次还款日期">
          <a-input placeholder="请输入最近一次还款日期" v-decorator="['zjychkrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式">
          <a-input placeholder="请输入担保方式" v-decorator="['dbfs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷证件类型">
          <a-input placeholder="请输入信贷证件类型" v-decorator="['xdzjlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷证件号码">
          <a-input placeholder="请输入信贷证件号码" v-decorator="['xdzjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总余额">
          <a-input placeholder="请输入总余额" v-decorator="['totleBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总减值金额">
          <a-input placeholder="请输入总减值金额" v-decorator="['zjzje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值标志">
          <a-input placeholder="请输入减值标志" v-decorator="['jzbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="更新日期">
          <a-input placeholder="请输入更新日期" v-decorator="['updateDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期罚息余额">
          <a-input placeholder="请输入逾期罚息余额" v-decorator="['fineBalance1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期业务欠本金">
          <a-input placeholder="请输入分期业务欠本金" v-decorator="['taBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期业务欠利息">
          <a-input placeholder="请输入分期业务欠利息" v-decorator="['taInterestBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计欠款期数">
          <a-input placeholder="请输入累计欠款期数" v-decorator="['taTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="连续欠款期数">
          <a-input placeholder="请输入连续欠款期数" v-decorator="['lcaTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期次数">
          <a-input placeholder="请输入展期次数" v-decorator="['extendTimes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="垫款标志">
          <a-input placeholder="请输入垫款标志" v-decorator="['advanceFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款频率">
          <a-input placeholder="请输入还款频率" v-decorator="['termsFreq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务状态">
          <a-input placeholder="请输入业务状态" v-decorator="['businessStat', {}]" />
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
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['eDate', {}]" />
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
    name: "YwyexxModal",
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
        acctNo:{rules: [{ required: true, message: '请输入贷款帐号/汇票号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/ywyexx/ywyexx/add",
          edit: "/ywyexx/ywyexx/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataFlag','accNo','accruedIuterest','acctNo','actualPayMonthSum','badbal','balance','businessNo','businessPhase','businessType','cancelFlag','currency','custId','custName','custNo','dkhth','dueLuterest','dullbal','finebal','finishDate','fkId','getDate','houldPayMonthSum','intbal1','intbal2','kind','maturity','monthIntbalPileAccept','monthOwePileAccept','monthOwePilePut','org','orgId','overDuebal','overDuebalTerm','oweBalance','payAcctno','payTermMonth','putOutDate','putoutSum','rate','shouldPayMonthSum','shouldPayTerm','term','voucherNo','yearIntbalPileAccept','yearOwePileAccept','yearOwePilePut','yqll','fxll','zqll','zqll1','zqje','sxzh','gxzh','bwzh','bjflh','yslxlj','fflj','hslj','dkyt','jzkm','qxrDate','fourClassState','hxjjh','zjlx','zjhm','jxbz','zjychkrq','dbfs','xdzjlx','xdzjhm','totleBalance','zjzje','jzbz','updateDate','fineBalance1','taBalance','taInterestBalance','taTimes','lcaTimes','extendTimes','advanceFlag','termsFreq','businessStat','sDate','eDate','loadDate','legalNo','dtnum'))
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