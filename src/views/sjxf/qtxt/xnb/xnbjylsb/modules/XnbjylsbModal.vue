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
          label="平台受理日期">
          <a-input placeholder="请输入平台受理日期" v-decorator="['workdate', validatorRules.workdate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台业务序号">
          <a-input placeholder="请输入平台业务序号" v-decorator="['workseqid', validatorRules.workseqid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台受理时间">
          <a-input placeholder="请输入平台受理时间" v-decorator="['worktime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="平台交易代码">
          <a-input placeholder="请输入平台交易代码" v-decorator="['tradecode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统标识">
          <a-input placeholder="请输入系统标识" v-decorator="['sysid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应用标识">
          <a-input placeholder="请输入应用标识" v-decorator="['appid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起渠道代码">
          <a-input placeholder="请输入发起渠道代码" v-decorator="['chnlcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起渠道流水号">
          <a-input placeholder="请输入发起渠道流水号" v-decorator="['chnlseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起渠道日期">
          <a-input placeholder="请输入发起渠道日期" v-decorator="['chnldate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起渠道时间">
          <a-input placeholder="请输入发起渠道时间" v-decorator="['chnltime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作网点">
          <a-input placeholder="请输入操作网点" v-decorator="['brno', {}]" />
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
          label="授权网点">
          <a-input placeholder="请输入授权网点" v-decorator="['authbrno', {}]" />
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
          label="操作终端号">
          <a-input placeholder="请输入操作终端号" v-decorator="['terminalcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="身份证号">
          <a-input placeholder="请输入身份证号" v-decorator="['identno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="姓名">
          <a-input placeholder="请输入姓名" v-decorator="['truename', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴费年度">
          <a-input placeholder="请输入缴费年度" v-decorator="['payyear', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴费档次">
          <a-input placeholder="请输入缴费档次" v-decorator="['paylevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴费身份">
          <a-input placeholder="请输入缴费身份" v-decorator="['payident', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴费金额">
          <a-input placeholder="请输入缴费金额" v-decorator="['payamt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴款方式">
          <a-input placeholder="请输入缴款方式" v-decorator="['payway', {}]" />
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
          label="缴款卡号">
          <a-input placeholder="请输入缴款卡号" v-decorator="['paycardno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴款账号">
          <a-input placeholder="请输入缴款账号" v-decorator="['payacctno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存折号码">
          <a-input placeholder="请输入存折号码" v-decorator="['passbookno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="缴费单号">
          <a-input placeholder="请输入缴费单号" v-decorator="['payno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社保机构编码">
          <a-input placeholder="请输入社保机构编码" v-decorator="['socialorgcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社保险种">
          <a-input placeholder="请输入社保险种" v-decorator="['socialkind', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证号码">
          <a-input placeholder="请输入凭证号码" v-decorator="['voucherno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="打印方式">
          <a-input placeholder="请输入打印方式" v-decorator="['printway', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起始时间">
          <a-input placeholder="请输入起始时间" v-decorator="['startdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="截止时间">
          <a-input placeholder="请输入截止时间" v-decorator="['enddate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心请求UUID">
          <a-input placeholder="请输入核心请求UUID" v-decorator="['requuid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心应答UUID">
          <a-input placeholder="请输入核心应答UUID" v-decorator="['rspuuid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统处理状态">
          <a-input placeholder="请输入账务系统处理状态" v-decorator="['bankstatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统处理错误码">
          <a-input placeholder="请输入账务系统处理错误码" v-decorator="['bankerrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统处理错误信息">
          <a-input placeholder="请输入账务系统处理错误信息" v-decorator="['bankerrmsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账务系统对账状态">
          <a-input placeholder="请输入账务系统对账状态" v-decorator="['bankchkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方交易时间">
          <a-input placeholder="请输入第三方交易时间" v-decorator="['reqtime', {}]" />
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
          label="第三方处理码">
          <a-input placeholder="请输入第三方处理码" v-decorator="['corperrcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方处理信息">
          <a-input placeholder="请输入第三方处理信息" v-decorator="['corperrmsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第三方对账状态">
          <a-input placeholder="请输入第三方对账状态" v-decorator="['corpchkflag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易当前业务步骤">
          <a-input placeholder="请输入交易当前业务步骤" v-decorator="['tradebusistep', {}]" />
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
          label="原平台受理日期">
          <a-input placeholder="请输入原平台受理日期" v-decorator="['origworkdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原平台业务序号">
          <a-input placeholder="请输入原平台业务序号" v-decorator="['origworkseqid', {}]" />
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
          label="BSP标识号">
          <a-input placeholder="请输入BSP标识号" v-decorator="['bspno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务拒绝码">
          <a-input placeholder="请输入业务拒绝码" v-decorator="['errcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务拒绝原因">
          <a-input placeholder="请输入业务拒绝原因" v-decorator="['errmsg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留1">
          <a-input placeholder="请输入预留1" v-decorator="['reserved1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留2">
          <a-input placeholder="请输入预留2" v-decorator="['reserved2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留3">
          <a-input placeholder="请输入预留3" v-decorator="['reserved3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心流水">
          <a-input placeholder="请输入核心流水" v-decorator="['hostreqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心日期">
          <a-input placeholder="请输入核心日期" v-decorator="['hostdate', {}]" />
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
    name: "XnbjylsbModal",
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
        workdate:{rules: [{ required: true, message: '请输入平台受理日期!' }]},
        workseqid:{rules: [{ required: true, message: '请输入平台业务序号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/xnbjylsb/xnbjylsb/add",
          edit: "/xnbjylsb/xnbjylsb/edit",
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
          this.form.setFieldsValue(pick(this.model,'workdate','workseqid','worktime','tradecode','sysid','appid','chnlcode','chnlseqno','chnldate','chnltime','brno','tellerno','authbrno','authtellerno','terminalcode','identno','truename','payyear','paylevel','payident','payamt','payway','cardflag','paycardno','payacctno','passbookno','payno','socialorgcode','socialkind','voucherno','printway','startdate','enddate','requuid','rspuuid','bankstatus','bankerrcode','bankerrmsg','bankchkflag','reqtime','corpstatus','corperrcode','corperrmsg','corpchkflag','tradebusistep','busistatus','origworkdate','origworkseqid','revflag','bspno','errcode','errmsg','remark','reserved1','reserved2','reserved3','hostreqno','hostdate','dataDate','loadDate','legalNo','dtnum'))
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