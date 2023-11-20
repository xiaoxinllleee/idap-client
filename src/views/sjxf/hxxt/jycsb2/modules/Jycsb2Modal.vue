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
          <a-input placeholder="请输入银行号" v-decorator="['instNo', validatorRules.instNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['tranCode', validatorRules.tranCode ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="助记码">
          <a-input placeholder="请输入助记码" v-decorator="['mnemonic', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现金总额">
          <a-input placeholder="请输入现金总额" v-decorator="['cashTots', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态汇总">
          <a-input placeholder="请输入状态汇总" v-decorator="['stTots', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="查询代号">
          <a-input placeholder="请输入查询代号" v-decorator="['enqCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分类码代号">
          <a-input placeholder="请输入分类码代号" v-decorator="['ledgerCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员级别">
          <a-input placeholder="请输入柜员级别" v-decorator="['txCap', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易描述">
          <a-input placeholder="请输入交易描述" v-decorator="['txDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="费用矩阵">
          <a-input placeholder="请输入费用矩阵" v-decorator="['feeMask', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="多货币统计">
          <a-input placeholder="请输入多货币统计" v-decorator="['mcurrStTots', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本交易内部分行统计第一网点">
          <a-input placeholder="请输入本交易内部分行统计第一网点" v-decorator="['ibStTots', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="多货币内部分行统计">
          <a-input placeholder="请输入多货币内部分行统计" v-decorator="['mcIbStTots', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有关本交易对应要求标识">
          <a-input placeholder="请输入有关本交易对应要求标识" v-decorator="['correspondenceReq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="过账层级">
          <a-input placeholder="请输入过账层级" v-decorator="['postingLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CGL组件1">
          <a-input placeholder="请输入CGL组件1" v-decorator="['cglComponent1Sb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CGL组件2">
          <a-input placeholder="请输入CGL组件2" v-decorator="['cglComponent2Sb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账标识">
          <a-input placeholder="请输入记账标识" v-decorator="['cglPostingIndSb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CGL组件1">
          <a-input placeholder="请输入CGL组件1" v-decorator="['cglComponent1Cc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CGL组件2">
          <a-input placeholder="请输入CGL组件2" v-decorator="['cglComponent2Cc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账标识">
          <a-input placeholder="请输入记账标识" v-decorator="['cglPostingIndCc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CGL组件1">
          <a-input placeholder="请输入CGL组件1" v-decorator="['cglComponent1Ib', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CGL组件2">
          <a-input placeholder="请输入CGL组件2" v-decorator="['cglComponent2Ib', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账标识">
          <a-input placeholder="请输入记账标识" v-decorator="['cglPostingIndIb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="限制指示器">
          <a-input placeholder="请输入限制指示器" v-decorator="['cglQualifier', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逆转符号">
          <a-input placeholder="请输入逆转符号" v-decorator="['cglSignReversal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报表解释序列号">
          <a-input placeholder="请输入报表解释序列号" v-decorator="['tcnarrSeqNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报表解释交易类型">
          <a-input placeholder="请输入报表解释交易类型" v-decorator="['narrTxtType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款优先级">
          <a-input placeholder="请输入还款优先级" v-decorator="['priorityCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="夜间允许标志">
          <a-input placeholder="请输入夜间允许标志" v-decorator="['nightEnable', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="OFFSITE_BRH_FLG">
          <a-input placeholder="请输入OFFSITE_BRH_FLG" v-decorator="['offsiteBrhFlg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否允许跨机构交易">
          <a-input placeholder="请输入是否允许跨机构交易" v-decorator="['ibAllowedFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="SUPR_OVERRIDE_FLG">
          <a-input placeholder="请输入SUPR_OVERRIDE_FLG" v-decorator="['suprOverrideFlg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证打印标志">
          <a-input placeholder="请输入凭证打印标志" v-decorator="['voucherReqInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证格式1">
          <a-input placeholder="请输入凭证格式1" v-decorator="['voucherForm1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证格式2">
          <a-input placeholder="请输入凭证格式2" v-decorator="['voucherForm2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证输出代码">
          <a-input placeholder="请输入凭证输出代码" v-decorator="['vchrOutputCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="刷新标识">
          <a-input placeholder="请输入刷新标识" v-decorator="['refreshMask', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易描述的记忆码">
          <a-input placeholder="请输入交易描述的记忆码" v-decorator="['longMnemonic', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="跨机构标志">
          <a-input placeholder="请输入跨机构标志" v-decorator="['interBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权类型">
          <a-input placeholder="请输入授权类型" v-decorator="['overriderType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额限制标志">
          <a-input placeholder="请输入交易金额限制标志" v-decorator="['txnAmtLimitInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="限制金额">
          <a-input placeholder="请输入限制金额" v-decorator="['txnLimitAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CARD_NO_REQD">
          <a-input placeholder="请输入CARD_NO_REQD" v-decorator="['cardNoReqd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="费用矩阵">
          <a-input placeholder="请输入费用矩阵" v-decorator="['feeMatrix', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自动/半自动收费标志">
          <a-input placeholder="请输入自动/半自动收费标志" v-decorator="['autoInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现金收费的账号">
          <a-input placeholder="请输入现金收费的账号" v-decorator="['semiCashBglacct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="FEE_SUBMOD">
          <a-input placeholder="请输入FEE_SUBMOD" v-decorator="['feeSubmod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="反洗钱标志">
          <a-input placeholder="请输入反洗钱标志" v-decorator="['amlFlag', {}]" />
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
          label="加载日期">
          <a-input placeholder="请输入加载日期" v-decorator="['loadDate', {}]" />
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
    name: "Jycsb2Modal",
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
        instNo:{rules: [{ required: true, message: '请输入银行号!' }]},
        tranCode:{rules: [{ required: true, message: '请输入交易码!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/jycsb2/jycsb2/add",
          edit: "/jycsb2/jycsb2/edit",
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
          this.form.setFieldsValue(pick(this.model,'instNo','tranCode','mnemonic','cashTots','stTots','enqCode','ledgerCode','txCap','txDesc','feeMask','status','mcurrStTots','ibStTots','mcIbStTots','correspondenceReq','postingLevel','cglComponent1Sb','cglComponent2Sb','cglPostingIndSb','cglComponent1Cc','cglComponent2Cc','cglPostingIndCc','cglComponent1Ib','cglComponent2Ib','cglPostingIndIb','cglQualifier','cglSignReversal','tcnarrSeqNo','narrTxtType','priorityCode','nightEnable','offsiteBrhFlg','ibAllowedFlag','suprOverrideFlg','voucherReqInd','voucherForm1','voucherForm2','vchrOutputCode','refreshMask','longMnemonic','interBranch','overriderType','txnAmtLimitInd','txnLimitAmt','cardNoReqd','feeMatrix','autoInd','semiCashBglacct','feeSubmod','amlFlag','sdate','edate','loadDate','dtnum'))
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