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
          label="卡号">
          <a-input placeholder="请输入卡号" v-decorator="['cardNbr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品编号">
          <a-input placeholder="请输入产品编号" v-decorator="['product', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片状态代码">
          <a-input placeholder="请输入卡片状态代码" v-decorator="['canclCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片状态日期">
          <a-input placeholder="请输入卡片状态日期" v-decorator="['canclDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片挂失员工">
          <a-input placeholder="请输入卡片挂失员工" v-decorator="['canclEmpl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片挂失时间">
          <a-input placeholder="请输入卡片挂失时间" v-decorator="['canclTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外卡黑名单动作代码">
          <a-input placeholder="请输入外卡黑名单动作代码" v-decorator="['actioncode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产生日期">
          <a-input placeholder="请输入产生日期" v-decorator="['createDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每日外币预借现金笔数">
          <a-input placeholder="请输入每日外币预借现金笔数" v-decorator="['cashadNox', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每日本币预借现金笔数">
          <a-input placeholder="请输入每日本币预借现金笔数" v-decorator="['cashadvNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="递送方式">
          <a-input placeholder="请输入递送方式" v-decorator="['despatch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第二道凸字(企业卡的公司名称)">
          <a-input placeholder="请输入第二道凸字(企业卡的公司名称)" v-decorator="['embossLn2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凸字名称">
          <a-input placeholder="请输入凸字名称" v-decorator="['embossNme', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日(YYMM)">
          <a-input placeholder="请输入到期日(YYMM)" v-decorator="['expiryDte', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重发卡的新到期日(YYMM)">
          <a-input placeholder="请输入重发卡的新到期日(YYMM)" v-decorator="['expiryNew', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片费用代码">
          <a-input placeholder="请输入卡片费用代码" v-decorator="['feeCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发卡日期">
          <a-input placeholder="请输入发卡日期" v-decorator="['issueDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发卡原因代码">
          <a-input placeholder="请输入发卡原因代码" v-decorator="['issueReas', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片遗失日期">
          <a-input placeholder="请输入卡片遗失日期" v-decorator="['lossDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂失方式">
          <a-input placeholder="请输入挂失方式" v-decorator="['lossReprt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片遗失时间">
          <a-input placeholder="请输入卡片遗失时间" v-decorator="['lossTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日外币存款最大金额">
          <a-input placeholder="请输入允许每日外币存款最大金额" v-decorator="['depamTdx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日本币存款最大金额">
          <a-input placeholder="请输入允许每日本币存款最大金额" v-decorator="['depamTdy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日外币存款最多次数(作废)">
          <a-input placeholder="请输入允许每日外币存款最多次数(作废)" v-decorator="['depnoTdx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日本币存款最多次数(作废)">
          <a-input placeholder="请输入允许每日本币存款最多次数(作废)" v-decorator="['depnoTdy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日存款最多次数(作废)">
          <a-input placeholder="请输入允许每日存款最多次数(作废)" v-decorator="['depositNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许本币预借现金最多次数">
          <a-input placeholder="请输入允许本币预借现金最多次数" v-decorator="['hrcashNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许外币预借现金最多次数">
          <a-input placeholder="请输入允许外币预借现金最多次数" v-decorator="['hrcashNox', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日外币缴款最大金额">
          <a-input placeholder="请输入允许每日外币缴款最大金额" v-decorator="['maxPamtx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许使用PIN错误最多次数">
          <a-input placeholder="请输入允许使用PIN错误最多次数" v-decorator="['maxPintry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日PIN错误次数">
          <a-input placeholder="请输入允许每日PIN错误次数" v-decorator="['pinFaildl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许PIN错误次数">
          <a-input placeholder="请输入允许PIN错误次数" v-decorator="['pinFails', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日外币购货总额">
          <a-input placeholder="请输入允许每日外币购货总额" v-decorator="['purcamTdx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许每日本币购货总额">
          <a-input placeholder="请输入允许每日本币购货总额" v-decorator="['purcamTdy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许今日外币购货次数">
          <a-input placeholder="请输入允许今日外币购货次数" v-decorator="['purchsNox', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="允许今日本币购货次数">
          <a-input placeholder="请输入允许今日本币购货次数" v-decorator="['purchseNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重发卡日期">
          <a-input placeholder="请输入重发卡日期" v-decorator="['reissDte', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="紧急替代卡标志">
          <a-input placeholder="请输入紧急替代卡标志" v-decorator="['urgentfee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效期的起始日期">
          <a-input placeholder="请输入有效期的起始日期" v-decorator="['validFrom', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重发卡有效期的起始日期">
          <a-input placeholder="请输入重发卡有效期的起始日期" v-decorator="['validNew', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="短信通知标志">
          <a-input placeholder="请输入短信通知标志" v-decorator="['smsYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消费使用密码标志">
          <a-input placeholder="请输入消费使用密码标志" v-decorator="['pinChk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片版面">
          <a-input placeholder="请输入卡片版面" v-decorator="['cdfrm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附卡单独设置额度比例">
          <a-input placeholder="请输入附卡单独设置额度比例" v-decorator="['limitX', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附卡额度比例">
          <a-input placeholder="请输入附卡额度比例" v-decorator="['credLmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['custrNbr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入网机构代码">
          <a-input placeholder="请输入入网机构代码" v-decorator="['areaCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="下次收年费月份">
          <a-input placeholder="请输入下次收年费月份" v-decorator="['feeMonth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币网上交易开通标志">
          <a-input placeholder="请输入外币网上交易开通标志" v-decorator="['ecYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外币网上交易开通期限">
          <a-input placeholder="请输入外币网上交易开通期限" v-decorator="['ecEnddt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="境外交易开关">
          <a-input placeholder="请输入境外交易开关" v-decorator="['ltnonlyYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本币无磁交易开关">
          <a-input placeholder="请输入本币无磁交易开关" v-decorator="['track2N', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片激活日期">
          <a-input placeholder="请输入卡片激活日期" v-decorator="['activeday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片激活渠道">
          <a-input placeholder="请输入卡片激活渠道" v-decorator="['activech', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片注销原因代码">
          <a-input placeholder="请输入卡片注销原因代码" v-decorator="['canclReas', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否允许无磁无密商户交易">
          <a-input placeholder="请输入是否允许无磁无密商户交易" v-decorator="['ntnpYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="消费密码生效金额">
          <a-input placeholder="请输入消费密码生效金额" v-decorator="['pinLmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片单独积分兑换年费">
          <a-input placeholder="请输入卡片单独积分兑换年费" v-decorator="['cdptfeeYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可取现功能">
          <a-input placeholder="请输入可取现功能" v-decorator="['withdrwYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可转出功能">
          <a-input placeholder="请输入可转出功能" v-decorator="['xfrfromYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可存款功能">
          <a-input placeholder="请输入可存款功能" v-decorator="['depositYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可余额查询功能">
          <a-input placeholder="请输入可余额查询功能" v-decorator="['balinqYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可消费功能">
          <a-input placeholder="请输入可消费功能" v-decorator="['purchYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可找现功能">
          <a-input placeholder="请输入可找现功能" v-decorator="['cashbckYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ATM转账、电话转账、网银转账、手机转账功能字段">
          <a-input placeholder="请输入ATM转账、电话转账、网银转账、手机转账功能字段" v-decorator="['xfrchnl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="续卡类型">
          <a-input placeholder="请输入续卡类型" v-decorator="['reissType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="取消PRMMT账期控制">
          <a-input placeholder="请输入取消PRMMT账期控制" v-decorator="['clmlimYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否续卡标志位">
          <a-input placeholder="请输入是否续卡标志位" v-decorator="['reissFlg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡收费标志位">
          <a-input placeholder="请输入换卡收费标志位" v-decorator="['replacefee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="IC卡标志位">
          <a-input placeholder="请输入IC卡标志位" v-decorator="['pbocYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后一次交易发生日期">
          <a-input placeholder="请输入最后一次交易发生日期" v-decorator="['authPday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后一次交易发生时间">
          <a-input placeholder="请输入最后一次交易发生时间" v-decorator="['authPtime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="硬件序列号">
          <a-input placeholder="请输入硬件序列号" v-decorator="['hdwrSn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡片序号">
          <a-input placeholder="请输入卡片序号" v-decorator="['issueNbr', {}]" />
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
    name: "KpzlbModal",
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
          add: "/kpzlb/kpzlb/add",
          edit: "/kpzlb/kpzlb/edit",
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
          this.form.setFieldsValue(pick(this.model,'cardNbr','product','canclCode','canclDay','canclEmpl','canclTime','actioncode','createDay','cashadNox','cashadvNo','despatch','embossLn2','embossNme','expiryDte','expiryNew','feeCode','issueDay','issueReas','lossDay','lossReprt','lossTime','depamTdx','depamTdy','depnoTdx','depnoTdy','depositNo','hrcashNo','hrcashNox','maxPamtx','maxPintry','pinFaildl','pinFails','purcamTdx','purcamTdy','purchsNox','purchseNo','reissDte','urgentfee','validFrom','validNew','smsYn','pinChk','cdfrm','limitX','credLmt','custrNbr','areaCode','feeMonth','ecYn','ecEnddt','ltnonlyYn','track2N','activeday','activech','canclReas','ntnpYn','pinLmt','cdptfeeYn','withdrwYn','xfrfromYn','depositYn','balinqYn','purchYn','cashbckYn','xfrchnl','reissType','clmlimYn','reissFlg','replacefee','pbocYn','authPday','authPtime','hdwrSn','issueNbr','sdate','edate','loadDate','legalNo','dtnum'))
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