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
          label="txDate">
          <a-input placeholder="请输入txDate" v-decorator="['txDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="txTime">
          <a-input placeholder="请输入txTime" v-decorator="['txTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="traceNo">
          <a-input placeholder="请输入traceNo" v-decorator="['traceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="npsDate">
          <a-input placeholder="请输入npsDate" v-decorator="['npsDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="msgid">
          <a-input placeholder="请输入msgid" v-decorator="['msgid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="brno">
          <a-input placeholder="请输入brno" v-decorator="['brno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tel">
          <a-input placeholder="请输入tel" v-decorator="['tel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sndNpsBrno">
          <a-input placeholder="请输入sndNpsBrno" v-decorator="['sndNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="rcvNpsBrno">
          <a-input placeholder="请输入rcvNpsBrno" v-decorator="['rcvNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sndNpsName">
          <a-input placeholder="请输入sndNpsName" v-decorator="['sndNpsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="rcvNpsName">
          <a-input placeholder="请输入rcvNpsName" v-decorator="['rcvNpsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="manageType">
          <a-input placeholder="请输入manageType" v-decorator="['manageType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="protocolno">
          <a-input placeholder="请输入protocolno" v-decorator="['protocolno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="customerNum">
          <a-input placeholder="请输入customerNum" v-decorator="['customerNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="merchant">
          <a-input placeholder="请输入merchant" v-decorator="['merchant', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="channel">
          <a-input placeholder="请输入channel" v-decorator="['channel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="flag">
          <a-input placeholder="请输入flag" v-decorator="['flag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="payAcc">
          <a-input placeholder="请输入payAcc" v-decorator="['payAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="payAccName">
          <a-input placeholder="请输入payAccName" v-decorator="['payAccName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="payAccType">
          <a-input placeholder="请输入payAccType" v-decorator="['payAccType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="payNpsBrno">
          <a-input placeholder="请输入payNpsBrno" v-decorator="['payNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="payNpsName">
          <a-input placeholder="请输入payNpsName" v-decorator="['payNpsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="certtype">
          <a-input placeholder="请输入certtype" v-decorator="['certtype', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="certno">
          <a-input placeholder="请输入certno" v-decorator="['certno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="phone">
          <a-input placeholder="请输入phone" v-decorator="['phone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="cardvaildate">
          <a-input placeholder="请输入cardvaildate" v-decorator="['cardvaildate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="cvv2">
          <a-input placeholder="请输入cvv2" v-decorator="['cvv2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="messageid">
          <a-input placeholder="请输入messageid" v-decorator="['messageid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="msgverifycode">
          <a-input placeholder="请输入msgverifycode" v-decorator="['msgverifycode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pyeAcc">
          <a-input placeholder="请输入pyeAcc" v-decorator="['pyeAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pyeAccName">
          <a-input placeholder="请输入pyeAccName" v-decorator="['pyeAccName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pyeNpsBrno">
          <a-input placeholder="请输入pyeNpsBrno" v-decorator="['pyeNpsBrno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pyeNpsName">
          <a-input placeholder="请输入pyeNpsName" v-decorator="['pyeNpsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="customerId">
          <a-input placeholder="请输入customerId" v-decorator="['customerId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="busType">
          <a-input placeholder="请输入busType" v-decorator="['busType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="singletranslimit">
          <a-input placeholder="请输入singletranslimit" v-decorator="['singletranslimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="daytotalcount">
          <a-input placeholder="请输入daytotalcount" v-decorator="['daytotalcount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="daytotallimit">
          <a-input placeholder="请输入daytotallimit" v-decorator="['daytotallimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="protocolBeginDate">
          <a-input placeholder="请输入protocolBeginDate" v-decorator="['protocolBeginDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="protocolEndDate">
          <a-input placeholder="请输入protocolEndDate" v-decorator="['protocolEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sttlDate">
          <a-input placeholder="请输入sttlDate" v-decorator="['sttlDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="stat">
          <a-input placeholder="请输入stat" v-decorator="['stat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="rejRespcd">
          <a-input placeholder="请输入rejRespcd" v-decorator="['rejRespcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="rejReason">
          <a-input placeholder="请输入rejReason" v-decorator="['rejReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="addinfo">
          <a-input placeholder="请输入addinfo" v-decorator="['addinfo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="purpose">
          <a-input placeholder="请输入purpose" v-decorator="['purpose', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="reserve1">
          <a-input placeholder="请输入reserve1" v-decorator="['reserve1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="reserve2">
          <a-input placeholder="请输入reserve2" v-decorator="['reserve2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sDate">
          <a-input placeholder="请输入sDate" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eDate">
          <a-input placeholder="请输入eDate" v-decorator="['eDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="loadDate">
          <a-input placeholder="请输入loadDate" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="legalNo">
          <a-input placeholder="请输入legalNo" v-decorator="['legalNo', {}]" />
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
    name: "XyfkqylsbModal",
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
          add: "/xyfkqylsb/xyfkqylsb/add",
          edit: "/xyfkqylsb/xyfkqylsb/edit",
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
          this.form.setFieldsValue(pick(this.model,'txDate','txTime','traceNo','npsDate','msgid','brno','tel','sndNpsBrno','rcvNpsBrno','sndNpsName','rcvNpsName','manageType','protocolno','customerNum','merchant','channel','flag','payAcc','payAccName','payAccType','payNpsBrno','payNpsName','certtype','certno','phone','cardvaildate','cvv2','messageid','msgverifycode','pyeAcc','pyeAccName','pyeNpsBrno','pyeNpsName','customerId','busType','singletranslimit','daytotalcount','daytotallimit','protocolBeginDate','protocolEndDate','sttlDate','stat','rejRespcd','rejReason','addinfo','purpose','reserve1','reserve2','sDate','eDate','loadDate','legalNo','dtnum'))
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