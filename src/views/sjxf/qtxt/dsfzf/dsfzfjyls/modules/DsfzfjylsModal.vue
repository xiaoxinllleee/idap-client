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
          label="渠道交易日期">
          <a-input placeholder="请输入渠道交易日期" v-decorator="['chnldate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="渠道交易流水">
          <a-input placeholder="请输入渠道交易流水" v-decorator="['chnlseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台交易日期">
          <a-input placeholder="请输入平台交易日期" v-decorator="['workdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台交易流水">
          <a-input placeholder="请输入平台交易流水" v-decorator="['workseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上核心流水号">
          <a-input placeholder="请输入上核心流水号" v-decorator="['hostserialno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台时间">
          <a-input placeholder="请输入平台时间" v-decorator="['worktime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地区代码">
          <a-input placeholder="请输入地区代码" v-decorator="['zoneid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <a-input placeholder="请输入业务类型" v-decorator="['tradetype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对于代收代付类的交易">
          <a-input placeholder="请输入对于代收代付类的交易" v-decorator="['cupflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作柜员">
          <a-input placeholder="请输入操作柜员" v-decorator="['tellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作终端号">
          <a-input placeholder="请输入操作终端号" v-decorator="['terminalno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构码">
          <a-input placeholder="请输入机构码" v-decorator="['bankno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜面流水号">
          <a-input placeholder="请输入柜面流水号" v-decorator="['counterseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权柜员">
          <a-input placeholder="请输入授权柜员" v-decorator="['authtellerno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对账区分">
          <a-input placeholder="请输入对账区分" v-decorator="['needchk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心记账状态">
          <a-input placeholder="请输入核心记账状态" v-decorator="['hoststatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心交易流水号">
          <a-input placeholder="请输入核心交易流水号" v-decorator="['hostseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心交易日期">
          <a-input placeholder="请输入核心交易日期" v-decorator="['hostdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心错误码">
          <a-input placeholder="请输入核心错误码" v-decorator="['hosterrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心错误信息">
          <a-input placeholder="请输入核心错误信息" v-decorator="['hosterrmsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心对账标志">
          <a-input placeholder="请输入核心对账标志" v-decorator="['hostchkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方处理状态">
          <a-input placeholder="请输入第三方处理状态" v-decorator="['corpstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方流水号">
          <a-input placeholder="请输入第三方流水号" v-decorator="['corpseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方交易日期">
          <a-input placeholder="请输入第三方交易日期" v-decorator="['corpdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方错误码">
          <a-input placeholder="请输入第三方错误码" v-decorator="['corperrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方错误信息">
          <a-input placeholder="请输入第三方错误信息" v-decorator="['corperrmsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方对账标志">
          <a-input placeholder="请输入第三方对账标志" v-decorator="['corpchkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务状态">
          <a-input placeholder="请输入业务状态" v-decorator="['busistatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务错误码">
          <a-input placeholder="请输入业务错误码" v-decorator="['busierrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务错误信息">
          <a-input placeholder="请输入业务错误信息" v-decorator="['busierrmsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学校编码">
          <a-input placeholder="请输入学校编码" v-decorator="['xxbm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学校名称">
          <a-input placeholder="请输入学校名称" v-decorator="['xxmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学费期次">
          <a-input placeholder="请输入学费期次" v-decorator="['termno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户号码">
          <a-input placeholder="请输入用户号码" v-decorator="['userid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户姓名">
          <a-input placeholder="请输入用户姓名" v-decorator="['username', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="专业">
          <a-input placeholder="请输入专业" v-decorator="['major', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="班级">
          <a-input placeholder="请输入班级" v-decorator="['class', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电话">
          <a-input placeholder="请输入电话" v-decorator="['mobile', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人账号">
          <a-input placeholder="请输入付款人账号" v-decorator="['payeraccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="付款人名称">
          <a-input placeholder="请输入付款人名称" v-decorator="['payername', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['acctseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人账号">
          <a-input placeholder="请输入收款人账号" v-decorator="['payeeaccno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人名称">
          <a-input placeholder="请输入收款人名称" v-decorator="['payeename', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人开户机构号">
          <a-input placeholder="请输入收款人开户机构号" v-decorator="['payeeopenbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴费方式">
          <a-input placeholder="请输入缴费方式" v-decorator="['cashflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡折标志">
          <a-input placeholder="请输入卡折标志" v-decorator="['cardflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现金项目编号">
          <a-input placeholder="请输入现金项目编号" v-decorator="['cashprjcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="中间账户">
          <a-input placeholder="请输入中间账户" v-decorator="['acctbrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="币种">
          <a-input placeholder="请输入币种" v-decorator="['currcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额">
          <a-input placeholder="请输入交易金额" v-decorator="['amt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手续费">
          <a-input placeholder="请输入手续费" v-decorator="['fee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="摘要码">
          <a-input placeholder="请输入摘要码" v-decorator="['memcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['idno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['idtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证类型">
          <a-input placeholder="请输入凭证类型" v-decorator="['vouchtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证机构">
          <a-input placeholder="请输入凭证机构" v-decorator="['vouchbatch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证号码">
          <a-input placeholder="请输入凭证号码" v-decorator="['vouchno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证日期">
          <a-input placeholder="请输入凭证日期" v-decorator="['vouchdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发票打印次数">
          <a-input placeholder="请输入发票打印次数" v-decorator="['prtnum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正标志">
          <a-input placeholder="请输入冲正标志" v-decorator="['revflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易日期">
          <a-input placeholder="请输入原交易日期" v-decorator="['otrandate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易流水号">
          <a-input placeholder="请输入原交易流水号" v-decorator="['otranseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易上核心流水号">
          <a-input placeholder="请输入原交易上核心流水号" v-decorator="['otranhostno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注1">
          <a-input placeholder="请输入备注1" v-decorator="['reserve1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注2">
          <a-input placeholder="请输入备注2" v-decorator="['reserve2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注3">
          <a-input placeholder="请输入备注3" v-decorator="['reserve3', {}]" />
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
          label="导入日期">
          <a-input placeholder="请输入导入日期" v-decorator="['loadDate', {}]" />
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
    name: "DsfzfjylsModal",
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
          add: "/dsfzfjyls/dsfzfjyls/add",
          edit: "/dsfzfjyls/dsfzfjyls/edit",
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
          this.form.setFieldsValue(pick(this.model,'chnldate','chnlseqno','workdate','workseqno','hostserialno','worktime','zoneid','tradetype','cupflag','tellerno','terminalno','bankno','counterseqno','authtellerno','needchk','hoststatus','hostseqno','hostdate','hosterrcode','hosterrmsg','hostchkflag','corpstatus','corpseqno','corpdate','corperrcode','corperrmsg','corpchkflag','busistatus','busierrcode','busierrmsg','xxbm','xxmc','termno','userid','username','major','class','mobile','payeraccno','payername','acctseqno','payeeaccno','payeename','payeeopenbrno','cashflag','cardflag','cashprjcode','acctbrno','currcode','amt','fee','memcode','idno','idtype','vouchtype','vouchbatch','vouchno','vouchdate','prtnum','revflag','otrandate','otranseqno','otranhostno','reserve1','reserve2','reserve3','dataDate','loadDate','legalNo','dtnum'))
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