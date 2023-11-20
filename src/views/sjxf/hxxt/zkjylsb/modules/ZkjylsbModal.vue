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
          label="交易日期">
          <a-input placeholder="请输入交易日期" v-decorator="['tranDate', validatorRules.tranDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流水号">
          <a-input placeholder="请输入流水号" v-decorator="['jrnlNo', validatorRules.jrnlNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="序列号">
          <a-input placeholder="请输入序列号" v-decorator="['sequenceNo', validatorRules.sequenceNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易时间">
          <a-input placeholder="请输入交易时间" v-decorator="['tranTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银行号">
          <a-input placeholder="请输入银行号" v-decorator="['instNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省代码">
          <a-input placeholder="请输入省代码" v-decorator="['provinceCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐号">
          <a-input placeholder="请输入帐号" v-decorator="['acctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证类型">
          <a-input placeholder="请输入凭证类型" v-decorator="['ibdType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起始号码">
          <a-input placeholder="请输入起始号码" v-decorator="['startSerialNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="终止号码">
          <a-input placeholder="请输入终止号码" v-decorator="['endSerialNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调用码">
          <a-input placeholder="请输入调用码" v-decorator="['callCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易代码">
          <a-input placeholder="请输入交易代码" v-decorator="['tranNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易机构号">
          <a-input placeholder="请输入交易机构号" v-decorator="['branchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易柜员">
          <a-input placeholder="请输入交易柜员" v-decorator="['tellerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易数量">
          <a-input placeholder="请输入交易数量" v-decorator="['trnQty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="旧状态      11-销毁      14-支取方式挂失      10-待销毁      03-在途      05-未用      07-未激活      30-遗失      31-内部作废      12-收回      13-外部作废      06-使用      32-圈存      33-止付      09-挂失      08-挂失确认      20-锁定">
          <a-input placeholder="请输入旧状态      11-销毁      14-支取方式挂失      10-待销毁      03-在途      05-未用      07-未激活      30-遗失      31-内部作废      12-收回      13-外部作废      06-使用      32-圈存      33-止付      09-挂失      08-挂失确认      20-锁定" v-decorator="['oldStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新状态      11-销毁      14-支取方式挂失      10-待销毁      03-在途      05-未用      07-未激活      30-遗失      31-内部作废      12-收回      13-外部作废      06-使用      32-圈存      33-止付      09-挂失      08-挂失确认      20-锁定">
          <a-input placeholder="请输入新状态      11-销毁      14-支取方式挂失      10-待销毁      03-在途      05-未用      07-未激活      30-遗失      31-内部作废      12-收回      13-外部作废      06-使用      32-圈存      33-止付      09-挂失      08-挂失确认      20-锁定" v-decorator="['newStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权柜员">
          <a-input placeholder="请输入授权柜员" v-decorator="['supTellerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input placeholder="请输入描述" v-decorator="['description', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="旧密码">
          <a-input placeholder="请输入旧密码" v-decorator="['oldPassword', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新密码">
          <a-input placeholder="请输入新密码" v-decorator="['newPassword', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="系统">
          <a-input placeholder="请输入系统" v-decorator="['sys', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="过期日">
          <a-input placeholder="请输入过期日" v-decorator="['expiryDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转出机构号">
          <a-input placeholder="请输入转出机构号" v-decorator="['frmBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入机构号">
          <a-input placeholder="请输入转入机构号" v-decorator="['toBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转出柜员">
          <a-input placeholder="请输入转出柜员" v-decorator="['frmTelrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入柜员">
          <a-input placeholder="请输入转入柜员" v-decorator="['toTelrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原交易流水号">
          <a-input placeholder="请输入原交易流水号" v-decorator="['traceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冲正标识 Y:Yes冲正交易或该交易已被冲正 N:No非冲正交易或该交易未被冲正">
          <a-input placeholder="请输入冲正标识 Y:Yes冲正交易或该交易已被冲正 N:No非冲正交易或该交易未被冲正" v-decorator="['sysCorrectFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批处理标识">
          <a-input placeholder="请输入批处理标识" v-decorator="['sysBatchFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附加信息">
          <a-input placeholder="请输入附加信息" v-decorator="['addiData', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="维护的日期">
          <a-input placeholder="请输入维护的日期" v-decorator="['lastMaintDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="维护标志">
          <a-input placeholder="请输入维护标志" v-decorator="['lastMaintStat', {}]" />
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
    name: "ZkjylsbModal",
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
        tranDate:{rules: [{ required: true, message: '请输入交易日期!' }]},
        jrnlNo:{rules: [{ required: true, message: '请输入流水号!' }]},
        sequenceNo:{rules: [{ required: true, message: '请输入序列号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/zkjylsb/zkjylsb/add",
          edit: "/zkjylsb/zkjylsb/edit",
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
          this.form.setFieldsValue(pick(this.model,'tranDate','jrnlNo','sequenceNo','tranTime','instNo','provinceCode','acctNo','ibdType','startSerialNo','endSerialNo','callCode','tranNo','branchNo','tellerNo','trnQty','oldStatus','newStatus','supTellerNo','description','oldPassword','newPassword','sys','expiryDate','frmBrNo','toBrNo','frmTelrNo','toTelrNo','traceNo','sysCorrectFlag','sysBatchFlag','addiData','lastMaintDate','lastMaintStat','dataDate','loadDate','legalNo','dtnum'))
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