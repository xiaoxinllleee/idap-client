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
          label="贴现合同号">
          <a-input placeholder="请输入贴现合同号" v-decorator="['contractNo', {}]" />
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
          label="交易类型">
          <a-input placeholder="请输入交易类型" v-decorator="['tradeType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易操作类型">
          <a-input placeholder="请输入交易操作类型" v-decorator="['discountType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现签收日期(贴现日)">
          <a-input placeholder="请输入贴现签收日期(贴现日)" v-decorator="['discountDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据面值总额(元)">
          <a-input placeholder="请输入票据面值总额(元)" v-decorator="['totalParAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未摊销利息调整总额(元)">
          <a-input placeholder="请输入未摊销利息调整总额(元)" v-decorator="['adjustAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现结算总金额(元)">
          <a-input placeholder="请输入贴现结算总金额(元)" v-decorator="['totalPayAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值准备总额(元)">
          <a-input placeholder="请输入减值准备总额(元)" v-decorator="['totalInpairAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值损失总额(元)">
          <a-input placeholder="请输入减值损失总额(元)" v-decorator="['totalLossAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已确认利息支出金额(元)">
          <a-input placeholder="请输入已确认利息支出金额(元)" v-decorator="['ytotalAdjustAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="线上清算标记">
          <a-input placeholder="请输入线上清算标记" v-decorator="['isOnline', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息调整标志">
          <a-input placeholder="请输入利息调整标志" v-decorator="['adjustFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息调整摊销方法">
          <a-input placeholder="请输入利息调整摊销方法" v-decorator="['adjustMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回购约定日期">
          <a-input placeholder="请输入回购约定日期" v-decorator="['backDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织机构代码证">
          <a-input placeholder="请输入组织机构代码证" v-decorator="['ogzCode', {}]" />
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
          label="开户行行号">
          <a-input placeholder="请输入开户行行号" v-decorator="['bankNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审批编号">
          <a-input placeholder="请输入审批编号" v-decorator="['appNo', {}]" />
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
          label="贴现合同状态">
          <a-input placeholder="请输入贴现合同状态" v-decorator="['sts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记操作员">
          <a-input placeholder="请输入登记操作员" v-decorator="['regTel', {}]" />
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
          label="账务机构">
          <a-input placeholder="请输入账务机构" v-decorator="['brNo', {}]" />
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
          label="利率来源方式">
          <a-input placeholder="请输入利率来源方式" v-decorator="['rateSource', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品1">
          <a-input placeholder="请输入产品1" v-decorator="['prdtNo1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品2">
          <a-input placeholder="请输入产品2" v-decorator="['prdtNo2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品3">
          <a-input placeholder="请输入产品3" v-decorator="['prdtNo3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品4">
          <a-input placeholder="请输入产品4" v-decorator="['prdtNo4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品5">
          <a-input placeholder="请输入产品5" v-decorator="['prdtNo5', {}]" />
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
          label="到期申请审批编号">
          <a-input placeholder="请输入到期申请审批编号" v-decorator="['dappNo', {}]" />
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
          label="处理模式">
          <a-input placeholder="请输入处理模式" v-decorator="['doModel', {}]" />
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
          label="法人联社号">
          <a-input placeholder="请输入法人联社号" v-decorator="['upBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对方名称">
          <a-input placeholder="请输入交易对方名称" v-decorator="['discountName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资金开户行行名">
          <a-input placeholder="请输入资金开户行行名" v-decorator="['bankName', {}]" />
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
          label="version">
          <a-input placeholder="请输入version" v-decorator="['version', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subCtpyNo">
          <a-input placeholder="请输入subCtpyNo" v-decorator="['subCtpyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="subVersion">
          <a-input placeholder="请输入subVersion" v-decorator="['subVersion', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ctpyDepNo">
          <a-input placeholder="请输入ctpyDepNo" v-decorator="['ctpyDepNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bctpyDepNo">
          <a-input placeholder="请输入bctpyDepNo" v-decorator="['bctpyDepNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bversion">
          <a-input placeholder="请输入bversion" v-decorator="['bversion', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bsubCtpyNo">
          <a-input placeholder="请输入bsubCtpyNo" v-decorator="['bsubCtpyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bctpyNo">
          <a-input placeholder="请输入bctpyNo" v-decorator="['bctpyNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bsubVersion">
          <a-input placeholder="请输入bsubVersion" v-decorator="['bsubVersion', {}]" />
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
          label="原系统标识">
          <a-input placeholder="请输入原系统标识" v-decorator="['sourceId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载类型">
          <a-input placeholder="请输入加载类型" v-decorator="['loadType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="legalNo">
          <a-input placeholder="请输入legalNo" v-decorator="['legalNo', {}]" />
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
    name: "TxbdjbModal",
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
        },
        url: {
          add: "/txbdjb/txbdjb/add",
          edit: "/txbdjb/txbdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'contractNo','txCnt','tradeType','discountType','discountDate','totalParAmt','adjustAmt','totalPayAmt','totalInpairAmt','totalLossAmt','ytotalAdjustAmt','isOnline','adjustFlag','adjustMethod','backDate','ogzCode','bankAcno','bankNo','appNo','lvlFive','sts','regTel','regDate','brNo','acNo','acId','rateSource','prdtNo1','prdtNo2','prdtNo3','prdtNo4','prdtNo5','rateType','dappNo','dateRateNum','doModel','ctpyNo','upBrNo','discountName','bankName','curNo','version','subCtpyNo','subVersion','ctpyDepNo','bctpyDepNo','bversion','bsubCtpyNo','bctpyNo','bsubVersion','dataDate','loadDate','sourceId','loadType','legalNo'))
		  //时间格式化
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