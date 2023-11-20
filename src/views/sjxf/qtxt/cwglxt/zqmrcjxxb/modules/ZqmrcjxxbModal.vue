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
          label="成交单编号">
          <a-input placeholder="请输入成交单编号" v-decorator="['pactNo', validatorRules.pactNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易明细笔次">
          <a-input placeholder="请输入交易明细笔次" v-decorator="['txCnt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券代码">
          <a-input placeholder="请输入债券代码" v-decorator="['bondNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券名称">
          <a-input placeholder="请输入债券名称" v-decorator="['bondName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券市场类型">
          <a-input placeholder="请输入债券市场类型" v-decorator="['bondMarkettype', {}]" />
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
          label="持有意图">
          <a-input placeholder="请输入持有意图" v-decorator="['holdAim', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余期限">
          <a-input placeholder="请输入剩余期限" v-decorator="['remianTerm', {}]" />
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
          label="结算金额(元)">
          <a-input placeholder="请输入结算金额(元)" v-decorator="['fullPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="券面总额(万元)">
          <a-input placeholder="请输入券面总额(万元)" v-decorator="['parBal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期收益率(%)">
          <a-input placeholder="请输入到期收益率(%)" v-decorator="['yieldMaty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计实收利息金额(元)">
          <a-input placeholder="请输入累计实收利息金额(元)" v-decorator="['actRecIntst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计计提金额(元)">
          <a-input placeholder="请输入累计计提金额(元)" v-decorator="['sumJtAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计确认投资收益(元)">
          <a-input placeholder="请输入累计确认投资收益(元)" v-decorator="['sumSyAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年累计计提金额(元)">
          <a-input placeholder="请输入本年累计计提金额(元)" v-decorator="['bnSumJtAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本年累计确认投资收益(元)">
          <a-input placeholder="请输入本年累计确认投资收益(元)" v-decorator="['bnSumSyAmt', {}]" />
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
          label="内部账AC_ID">
          <a-input placeholder="请输入内部账AC_ID" v-decorator="['acId', {}]" />
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
          label="上次计提日期">
          <a-input placeholder="请输入上次计提日期" v-decorator="['lJtDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次起息日期">
          <a-input placeholder="请输入上次起息日期" v-decorator="['lIcDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本次起息日期">
          <a-input placeholder="请输入本次起息日期" v-decorator="['icDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="下次付息日期">
          <a-input placeholder="请输入下次付息日期" v-decorator="['fxDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结算方式">
          <a-input placeholder="请输入结算方式" v-decorator="['settleType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金结算速度">
          <a-input placeholder="请输入资金结算速度" v-decorator="['capSettype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记日期">
          <a-input placeholder="请输入登记日期" v-decorator="['regDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购入日期">
          <a-input placeholder="请输入购入日期" v-decorator="['buyDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金结算日">
          <a-input placeholder="请输入资金结算日" v-decorator="['capDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对方交易员">
          <a-input placeholder="请输入对方交易员" v-decorator="['ctpyTrader', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本方交易员">
          <a-input placeholder="请输入本方交易员" v-decorator="['trader', {}]" />
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
          label="买入立项申请编号">
          <a-input placeholder="请输入买入立项申请编号" v-decorator="['appNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买入立项分项序号">
          <a-input placeholder="请输入买入立项分项序号" v-decorator="['appSeqn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金拨付申请编号">
          <a-input placeholder="请输入资金拨付申请编号" v-decorator="['zjappNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券所属账务机构">
          <a-input placeholder="请输入债券所属账务机构" v-decorator="['brNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用部门">
          <a-input placeholder="请输入使用部门" v-decorator="['depNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="使用人">
          <a-input placeholder="请输入使用人" v-decorator="['suppNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券状态">
          <a-input placeholder="请输入债券状态" v-decorator="['sts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易净价(元)">
          <a-input placeholder="请输入交易净价(元)" v-decorator="['byNetPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="百元应计利息(元)">
          <a-input placeholder="请输入百元应计利息(元)" v-decorator="['byIntst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="百元全价(元)">
          <a-input placeholder="请输入百元全价(元)" v-decorator="['byFullPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买入时应计利息总额(元)">
          <a-input placeholder="请输入买入时应计利息总额(元)" v-decorator="['buyintstAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额(元)">
          <a-input placeholder="请输入交易金额(元)" v-decorator="['netPrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型号">
          <a-input placeholder="请输入业务类型号" v-decorator="['ywNo', {}]" />
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
          label="计提利息周期">
          <a-input placeholder="请输入计提利息周期" v-decorator="['intstCycle', {}]" />
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
          label="计提利息方式">
          <a-input placeholder="请输入计提利息方式" v-decorator="['jtType', {}]" />
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
          label="正回购质押面值总额(元)">
          <a-input placeholder="请输入正回购质押面值总额(元)" v-decorator="['zyParBal', {}]" />
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
          label="债券序号">
          <a-input placeholder="请输入债券序号" v-decorator="['bondSeqn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费比例">
          <a-input placeholder="请输入手续费比例" v-decorator="['serviceRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费收入">
          <a-input placeholder="请输入手续费收入" v-decorator="['serviceIncome', {}]" />
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
          label="回购金额">
          <a-input placeholder="请输入回购金额" v-decorator="['backParBal', {}]" />
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
          label="数据加载日期">
          <a-input placeholder="请输入数据加载日期" v-decorator="['loadDate', {}]" />
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
    name: "ZqmrcjxxbModal",
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
        pactNo:{rules: [{ required: true, message: '请输入成交单编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/zqmrcjxxb/zqmrcjxxb/add",
          edit: "/zqmrcjxxb/zqmrcjxxb/edit",
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
          this.form.setFieldsValue(pick(this.model,'pactNo','txCnt','bondNo','bondName','bondMarkettype','ctpyNo','version','holdAim','remianTerm','prdtNo','fullPrice','parBal','yieldMaty','actRecIntst','sumJtAmt','sumSyAmt','bnSumJtAmt','bnSumSyAmt','acNo','acId','actRate','lJtDate','lIcDate','icDate','fxDate','settleType','capSettype','regDate','buyDate','capDate','ctpyTrader','trader','brf','appNo','appSeqn','zjappNo','brNo','depNo','suppNo','sts','byNetPrice','byIntst','byFullPrice','buyintstAmt','netPrice','ywNo','planNo','chnlInd','intstCycle','dateRateNum','jtType','upBrNo','zyParBal','lvlFive','bondSeqn','serviceRate','serviceIncome','bctpyNo','bversion','backParBal','sDate','eDate','loadDate','legalNo','dtnum'))
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