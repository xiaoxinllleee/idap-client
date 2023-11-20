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
          label="机构码">
          <a-input placeholder="请输入机构码" v-decorator="['instNo', validatorRules.instNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐号">
          <a-input placeholder="请输入帐号" v-decorator="['accNo', validatorRules.accNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CTAVST">
          <a-input placeholder="请输入CTAVST" v-decorator="['ctavst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="NO_TX">
          <a-input placeholder="请输入NO_TX" v-decorator="['noTx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="NO_PER_TX">
          <a-input placeholder="请输入NO_PER_TX" v-decorator="['noPerTx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记录号">
          <a-input placeholder="请输入记录号" v-decorator="['recNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="NO_NON_FIN">
          <a-input placeholder="请输入NO_NON_FIN" v-decorator="['noNonFin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统模块">
          <a-input placeholder="请输入系统模块" v-decorator="['system', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户所在的机构">
          <a-input placeholder="请输入客户所在的机构" v-decorator="['branch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户状态">
          <a-input placeholder="请输入账户状态" v-decorator="['status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户类型">
          <a-input placeholder="请输入账户类型" v-decorator="['acctType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品细类">
          <a-input placeholder="请输入产品细类" v-decorator="['intCat', {}]" />
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
          label="最近的维护交易日">
          <a-input placeholder="请输入最近的维护交易日" v-decorator="['lastMaintDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近的金融交易日">
          <a-input placeholder="请输入最近的金融交易日" v-decorator="['lastFinDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="GL分类代码">
          <a-input placeholder="请输入GL分类代码" v-decorator="['glClassCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户号">
          <a-input placeholder="请输入客户号" v-decorator="['customerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前账户金额">
          <a-input placeholder="请输入当前账户金额" v-decorator="['currentBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="访问码">
          <a-input placeholder="请输入访问码" v-decorator="['accessCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="进入机构号">
          <a-input placeholder="请输入进入机构号" v-decorator="['accessBranchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="进入柜员号">
          <a-input placeholder="请输入进入柜员号" v-decorator="['accessTellerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据类型">
          <a-input placeholder="请输入票据类型" v-decorator="['instrumentType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="FEE_BEARER">
          <a-input placeholder="请输入FEE_BEARER" v-decorator="['feeBearer', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请日期">
          <a-input placeholder="请输入申请日期" v-decorator="['applicationDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请金额">
          <a-input placeholder="请输入申请金额" v-decorator="['applicationAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原国家">
          <a-input placeholder="请输入原国家" v-decorator="['originCountry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="目标国家">
          <a-input placeholder="请输入目标国家" v-decorator="['destCountry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可信用银行">
          <a-input placeholder="请输入可信用银行" v-decorator="['creditAvailWith', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否有信用">
          <a-input placeholder="请输入是否有信用" v-decorator="['creditAvailBy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="适用地区">
          <a-input placeholder="请输入适用地区" v-decorator="['placeOfExpiry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日">
          <a-input placeholder="请输入到期日" v-decorator="['dateOfExpiry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付免除文件">
          <a-input placeholder="请输入支付免除文件" v-decorator="['chargeExProfile', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核准日">
          <a-input placeholder="请输入核准日" v-decorator="['approvalDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核准金额">
          <a-input placeholder="请输入核准金额" v-decorator="['approvalAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最新变更账户类型日期">
          <a-input placeholder="请输入最新变更账户类型日期" v-decorator="['lastAcctTypeChg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="释放交易金额">
          <a-input placeholder="请输入释放交易金额" v-decorator="['releaseAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保费率">
          <a-input placeholder="请输入担保费率" v-decorator="['feeRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金比例">
          <a-input placeholder="请输入保证金比例" v-decorator="['marginRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商业交易ID">
          <a-input placeholder="请输入商业交易ID" v-decorator="['busSalesId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易部门监督人">
          <a-input placeholder="请输入交易部门监督人" v-decorator="['busDepSpvsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存档文件序列号">
          <a-input placeholder="请输入存档文件序列号" v-decorator="['fldDocSrlNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取款日期">
          <a-input placeholder="请输入取款日期" v-decorator="['drwdownDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一次下载长度">
          <a-input placeholder="请输入第一次下载长度" v-decorator="['frstDrwdownLen', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息偿还通知天数">
          <a-input placeholder="请输入利息偿还通知天数" v-decorator="['intRpyNtcDays', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款收据">
          <a-input placeholder="请输入还款收据" v-decorator="['rpayReceipt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存储状态">
          <a-input placeholder="请输入存储状态" v-decorator="['storeStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利润费用">
          <a-input placeholder="请输入利润费用" v-decorator="['marginFee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账单接收号码">
          <a-input placeholder="请输入账单接收号码" v-decorator="['baNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="L/C即付标识">
          <a-input placeholder="请输入L/C即付标识" v-decorator="['lcSightInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="PRE_RECEIVABLE">
          <a-input placeholder="请输入PRE_RECEIVABLE" v-decorator="['preReceivable', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CTA的期数">
          <a-input placeholder="请输入CTA的期数" v-decorator="['term', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期数单位">
          <a-input placeholder="请输入期数单位" v-decorator="['termBasis', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="IBP号码">
          <a-input placeholder="请输入IBP号码" v-decorator="['ibpNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人姓名">
          <a-input placeholder="请输入收款人姓名" v-decorator="['benefName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['contractNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同类型">
          <a-input placeholder="请输入合同类型" v-decorator="['contractType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票人帐号">
          <a-input placeholder="请输入出票人帐号" v-decorator="['escrowAcct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核准等级">
          <a-input placeholder="请输入核准等级" v-decorator="['apprvalLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金帐号">
          <a-input placeholder="请输入保证金帐号" v-decorator="['guarrantyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="假日处理">
          <a-input placeholder="请输入假日处理" v-decorator="['holProcess', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期自动扣款方式">
          <a-input placeholder="请输入到期自动扣款方式" v-decorator="['deductMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人姓名">
          <a-input placeholder="请输入收款人姓名" v-decorator="['drawerName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期利率">
          <a-input placeholder="请输入逾期利率" v-decorator="['overdueIntRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款行地址">
          <a-input placeholder="请输入收款行地址" v-decorator="['payeeBankNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人帐号">
          <a-input placeholder="请输入收款人帐号" v-decorator="['payeeAcctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理">
          <a-input placeholder="请输入客户经理" v-decorator="['relManager', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="HOLD_JRN_NO">
          <a-input placeholder="请输入HOLD_JRN_NO" v-decorator="['holdJrnNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据号码">
          <a-input placeholder="请输入票据号码" v-decorator="['draftNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="BGD所在的机构">
          <a-input placeholder="请输入BGD所在的机构" v-decorator="['bgdBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款行的名称">
          <a-input placeholder="请输入收款行的名称" v-decorator="['payeeBankName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款行地址1">
          <a-input placeholder="请输入收款行地址1" v-decorator="['payeeBankAdd1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款行地址2">
          <a-input placeholder="请输入收款行地址2" v-decorator="['payeeBankAdd2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款行地址3">
          <a-input placeholder="请输入收款行地址3" v-decorator="['payeeBankAdd3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="一本通子账户类型">
          <a-input placeholder="请输入一本通子账户类型" v-decorator="['escrowMcaSubTyp', {}]" />
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
          label="最后的维护日期">
          <a-input placeholder="请输入最后的维护日期" v-decorator="['lastMaintDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后的维护状态">
          <a-input placeholder="请输入最后的维护状态" v-decorator="['lastMaintStat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后维护日期">
          <a-input placeholder="请输入最后维护日期" v-decorator="['lstFinUpdDt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后维护类型">
          <a-input placeholder="请输入最后维护类型" v-decorator="['lstFinStat', {}]" />
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
    name: "HyzhzdModal",
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
        instNo:{rules: [{ required: true, message: '请输入机构码!' }]},
        accNo:{rules: [{ required: true, message: '请输入帐号!' }]},
        legalNo:{rules: [{ required: true, message: '请输入法人标识!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/hyzhzd/hyzhzd/add",
          edit: "/hyzhzd/hyzhzd/edit",
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
          this.form.setFieldsValue(pick(this.model,'instNo','accNo','ctavst','noTx','noPerTx','recNo','noNonFin','system','branch','status','acctType','intCat','currency','lastMaintDt','lastFinDt','glClassCode','customerNo','currentBalance','accessCode','accessBranchNo','accessTellerNo','instrumentType','feeBearer','applicationDate','applicationAmt','originCountry','destCountry','creditAvailWith','creditAvailBy','placeOfExpiry','dateOfExpiry','chargeExProfile','approvalDate','approvalAmount','lastAcctTypeChg','releaseAmount','feeRate','marginRate','busSalesId','busDepSpvsr','fldDocSrlNo','drwdownDate','frstDrwdownLen','intRpyNtcDays','rpayReceipt','storeStatus','marginFee','baNo','lcSightInd','preReceivable','term','termBasis','ibpNo','benefName','contractNo','contractType','escrowAcct','apprvalLevel','guarrantyNo','holProcess','deductMethod','drawerName','overdueIntRate','payeeBankNo','payeeAcctNo','relManager','holdJrnNo','draftNumber','bgdBranch','payeeBankName','payeeBankAdd1','payeeBankAdd2','payeeBankAdd3','escrowMcaSubTyp','fil01','lastMaintDate','lastMaintStat','lstFinUpdDt','lstFinStat','sdate','edate','loadDate','legalNo','dtnum'))
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