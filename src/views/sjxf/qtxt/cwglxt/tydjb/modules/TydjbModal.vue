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
          label="审批编号">
          <a-input placeholder="请输入审批编号" v-decorator="['appNo', validatorRules.appNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成交单编号">
          <a-input placeholder="请输入成交单编号" v-decorator="['contractNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易笔次">
          <a-input placeholder="请输入交易笔次" v-decorator="['txCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易类型">
          <a-input placeholder="请输入交易类型" v-decorator="['tradeType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手编号">
          <a-input placeholder="请输入交易对手编号" v-decorator="['ctpyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手版本号">
          <a-input placeholder="请输入交易对手版本号" v-decorator="['version', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手名称">
          <a-input placeholder="请输入交易对手名称" v-decorator="['ctpyName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金账户户名">
          <a-input placeholder="请输入资金账户户名" v-decorator="['accountName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金开户行名">
          <a-input placeholder="请输入资金开户行名" v-decorator="['bankName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金账号">
          <a-input placeholder="请输入资金账号" v-decorator="['bankAcno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付系统行号">
          <a-input placeholder="请输入支付系统行号" v-decorator="['bankNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="同业申请金额(元)">
          <a-input placeholder="请输入同业申请金额(元)" v-decorator="['industryAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起息日">
          <a-input placeholder="请输入起息日" v-decorator="['icDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期限(天)">
          <a-input placeholder="请输入期限(天)" v-decorator="['term', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日">
          <a-input placeholder="请输入到期日" v-decorator="['mtrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率(%)">
          <a-input placeholder="请输入利率(%)" v-decorator="['rate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期利率">
          <a-input placeholder="请输入逾期利率" v-decorator="['overRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <a-input placeholder="请输入业务类型" v-decorator="['ywNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率性质">
          <a-input placeholder="请输入利率性质" v-decorator="['rateProperty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率类型">
          <a-input placeholder="请输入利率类型" v-decorator="['rateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日利率计算方式">
          <a-input placeholder="请输入日利率计算方式" v-decorator="['dateRateNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息结算方式">
          <a-input placeholder="请输入利息结算方式" v-decorator="['lxjsType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息结算周期">
          <a-input placeholder="请输入利息结算周期" v-decorator="['lxjsCyc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动利率变动周期">
          <a-input placeholder="请输入浮动利率变动周期" v-decorator="['fdllCyc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计提利息周期">
          <a-input placeholder="请输入计提利息周期" v-decorator="['jtlxCyc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计提利息方式">
          <a-input placeholder="请输入计提利息方式" v-decorator="['jtlxType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次计提日期">
          <a-input placeholder="请输入上次计提日期" v-decorator="['lJtDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否允许提前提取">
          <a-input placeholder="请输入是否允许提前提取" v-decorator="['tqzqType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提前支取利息来源">
          <a-input placeholder="请输入提前支取利息来源" v-decorator="['tqzqRateSour', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提前支取利率(%)">
          <a-input placeholder="请输入提前支取利率(%)" v-decorator="['tqzqRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提前支取利率生效日">
          <a-input placeholder="请输入提前支取利率生效日" v-decorator="['tqzqBeginDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否到期转存">
          <a-input placeholder="请输入是否到期转存" v-decorator="['isDeposit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期转存方式">
          <a-input placeholder="请输入到期转存方式" v-decorator="['depositType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转存操作类型">
          <a-input placeholder="请输入转存操作类型" v-decorator="['depositDotype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期申请编号">
          <a-input placeholder="请输入到期申请编号" v-decorator="['dappNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转存新增金额(元)">
          <a-input placeholder="请输入转存新增金额(元)" v-decorator="['addAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部帐AC_NO">
          <a-input placeholder="请输入内部帐AC_NO" v-decorator="['acNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部帐AC_ID">
          <a-input placeholder="请输入内部帐AC_ID" v-decorator="['acId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类结果">
          <a-input placeholder="请输入五级分类结果" v-decorator="['lvlFive', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['sts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属部门">
          <a-input placeholder="请输入所属部门" v-decorator="['depNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属账务机构">
          <a-input placeholder="请输入所属账务机构" v-decorator="['brNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属联社号">
          <a-input placeholder="请输入所属联社号" v-decorator="['upBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划编号">
          <a-input placeholder="请输入计划编号" v-decorator="['planNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划日期">
          <a-input placeholder="请输入计划日期" v-decorator="['chnlInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提前支取利率类型">
          <a-input placeholder="请输入提前支取利率类型" v-decorator="['tqzqRateType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提前支取日利率计算方式">
          <a-input placeholder="请输入提前支取日利率计算方式" v-decorator="['tqzqDateRateNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本方经办人">
          <a-input placeholder="请输入本方经办人" v-decorator="['trader', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对方经办人">
          <a-input placeholder="请输入对方经办人" v-decorator="['ctpyTrader', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="摘要">
          <a-input placeholder="请输入摘要" v-decorator="['brf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定活标志">
          <a-input placeholder="请输入定活标志" v-decorator="['dhType', {}]" />
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
          label="本方编号">
          <a-input placeholder="请输入本方编号" v-decorator="['bctpyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本方版本号">
          <a-input placeholder="请输入本方版本号" v-decorator="['bversion', {}]" />
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
    name: "TydjbModal",
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
        appNo:{rules: [{ required: true, message: '请输入审批编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/tydjb/tydjb/add",
          edit: "/tydjb/tydjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'appNo','contractNo','txCnt','tradeType','ctpyNo','version','ctpyName','accountName','bankName','bankAcno','bankNo','industryAmt','icDate','term','mtrDate','rate','overRate','ywNo','rateProperty','rateType','dateRateNum','lxjsType','lxjsCyc','fdllCyc','jtlxCyc','jtlxType','lJtDate','tqzqType','tqzqRateSour','tqzqRate','tqzqBeginDate','isDeposit','depositType','depositDotype','dappNo','addAmt','acNo','acId','lvlFive','sts','depNo','brNo','upBrNo','planNo','chnlInd','tqzqRateType','tqzqDateRateNum','trader','ctpyTrader','brf','dhType','curNo','bctpyNo','bversion','sDate','eDate','loadDate','legalNo','dtnum'))
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