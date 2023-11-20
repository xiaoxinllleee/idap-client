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
          label="在建工程立项编号">
          <a-input placeholder="请输入在建工程立项编号" v-decorator="['projectAppNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工程编号（卡片代号）">
          <a-input placeholder="请输入工程编号（卡片代号）" v-decorator="['projectNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工程名称">
          <a-input placeholder="请输入工程名称" v-decorator="['projectName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记日期">
          <a-input placeholder="请输入登记日期" v-decorator="['openDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工程分摊项目数">
          <a-input placeholder="请输入工程分摊项目数" v-decorator="['appCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总成本">
          <a-input placeholder="请输入总成本" v-decorator="['totCost', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总预算成本">
          <a-input placeholder="请输入总预算成本" v-decorator="['totBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="在建工程类型">
          <a-input placeholder="请输入在建工程类型" v-decorator="['projectKnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取得方式">
          <a-input placeholder="请输入取得方式" v-decorator="['rootIn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他费用">
          <a-input placeholder="请输入其他费用" v-decorator="['feeAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期付款次数">
          <a-input placeholder="请输入分期付款次数" v-decorator="['payTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已付分期数">
          <a-input placeholder="请输入已付分期数" v-decorator="['useTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首付">
          <a-input placeholder="请输入首付" v-decorator="['firstPay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期付款额">
          <a-input placeholder="请输入分期付款额" v-decorator="['instalments', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购买价的现值">
          <a-input placeholder="请输入购买价的现值" v-decorator="['nowBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="确认的融资费用">
          <a-input placeholder="请输入确认的融资费用" v-decorator="['knowBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未确认的融资金额">
          <a-input placeholder="请输入未确认的融资金额" v-decorator="['unknowBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应付本金减少额">
          <a-input placeholder="请输入应付本金减少额" v-decorator="['payBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应付本金余额">
          <a-input placeholder="请输入应付本金余额" v-decorator="['unPayBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="折现率">
          <a-input placeholder="请输入折现率" v-decorator="['leaveRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际利率(%)">
          <a-input placeholder="请输入实际利率(%)" v-decorator="['actRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次减值额">
          <a-input placeholder="请输入上次减值额" v-decorator="['evedepamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次交易日">
          <a-input placeholder="请输入上次交易日" v-decorator="['lstDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="今日交易笔数">
          <a-input placeholder="请输入今日交易笔数" v-decorator="['tdCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值金额">
          <a-input placeholder="请输入减值金额" v-decorator="['devalue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期周期">
          <a-input placeholder="请输入分期周期" v-decorator="['projectCyc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作员号">
          <a-input placeholder="请输入操作员号" v-decorator="['tel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户机构号">
          <a-input placeholder="请输入开户机构号" v-decorator="['opnBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工程状态">
          <a-input placeholder="请输入工程状态" v-decorator="['projectSts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地点">
          <a-input placeholder="请输入地点" v-decorator="['addr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="盘盈盘亏金额">
          <a-input placeholder="请输入盘盈盘亏金额" v-decorator="['profitLostBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期付款方法">
          <a-input placeholder="请输入分期付款方法" v-decorator="['instalmentsType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="完工日期">
          <a-input placeholder="请输入完工日期" v-decorator="['finishDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同笔数">
          <a-input placeholder="请输入合同笔数" v-decorator="['loanCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="启用日期">
          <a-input placeholder="请输入启用日期" v-decorator="['useDate', {}]" />
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
          label="增加批准文号">
          <a-input placeholder="请输入增加批准文号" v-decorator="['addAuthNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减少批准文号">
          <a-input placeholder="请输入减少批准文号" v-decorator="['redAuthNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注销日期">
          <a-input placeholder="请输入注销日期" v-decorator="['redDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同编号">
          <a-input placeholder="请输入合同编号" v-decorator="['contractNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产类型">
          <a-input placeholder="请输入资产类型" v-decorator="['capCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属事项编号">
          <a-input placeholder="请输入所属事项编号" v-decorator="['projectCfmNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工程总预算（暂未使用）">
          <a-input placeholder="请输入工程总预算（暂未使用）" v-decorator="['projectBudg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金来源">
          <a-input placeholder="请输入资金来源" v-decorator="['fundSrc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="在建工程状况">
          <a-input placeholder="请输入在建工程状况" v-decorator="['projectCond', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="在建工程账户">
          <a-input placeholder="请输入在建工程账户" v-decorator="['proAcNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账标志">
          <a-input placeholder="请输入记账标志" v-decorator="['jzFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="事后确认子序号">
          <a-input placeholder="请输入事后确认子序号" v-decorator="['projectCfmSeqn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品号">
          <a-input placeholder="请输入产品号" v-decorator="['prdtNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原资产编号">
          <a-input placeholder="请输入原资产编号" v-decorator="['oCapNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="股东号">
          <a-input placeholder="请输入股东号" v-decorator="['shareholderNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入股股数">
          <a-input placeholder="请输入入股股数" v-decorator="['shareSize', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每股票面价格">
          <a-input placeholder="请输入每股票面价格" v-decorator="['sharePrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资本溢价金额">
          <a-input placeholder="请输入资本溢价金额" v-decorator="['premiumBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财务流水号">
          <a-input placeholder="请输入财务流水号" v-decorator="['traceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易日期">
          <a-input placeholder="请输入交易日期" v-decorator="['txDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人联社号">
          <a-input placeholder="请输入法人联社号" v-decorator="['upBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初始取得资产编号">
          <a-input placeholder="请输入初始取得资产编号" v-decorator="['srcCapNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初始取得资产来源">
          <a-input placeholder="请输入初始取得资产来源" v-decorator="['oRootIn', {}]" />
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
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['curNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附件编号">
          <a-input placeholder="请输入附件编号" v-decorator="['annexNo', {}]" />
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
    name: "ZjgcdjbModal",
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
          add: "/zjgcdjb/zjgcdjb/add",
          edit: "/zjgcdjb/zjgcdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'projectAppNo','projectNo','projectName','openDate','appCnt','totCost','totBal','projectKnd','rootIn','feeAmt','payTerm','useTerm','firstPay','instalments','nowBal','knowBal','unknowBal','payBal','unPayBal','leaveRate','actRate','evedepamt','lstDate','tdCnt','devalue','projectCyc','tel','opnBrNo','projectSts','addr','profitLostBal','instalmentsType','finishDay','loanCnt','useDate','brf','addAuthNo','redAuthNo','redDate','contractNo','capCode','projectCfmNo','projectBudg','fundSrc','projectCond','proAcNo','jzFlag','projectCfmSeqn','prdtNo','oCapNo','shareholderNo','shareSize','sharePrice','premiumBal','traceNo','txDate','upBrNo','srcCapNo','oRootIn','lvlFive','curNo','annexNo','dataDate','loadDate','legalNo','dtnum'))
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