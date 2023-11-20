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
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['socNo', validatorRules.socNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐号">
          <a-input placeholder="请输入帐号" v-decorator="['acctNo', validatorRules.acctNo ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账日期">
          <a-input placeholder="请输入入账日期" v-decorator="['postDate', validatorRules.postDate ]" />
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
          label="业务类型">
          <a-input placeholder="请输入业务类型" v-decorator="['businessType', validatorRules.businessType ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="入账时间">
          <a-input placeholder="请输入入账时间" v-decorator="['postTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="序列号">
          <a-input placeholder="请输入序列号" v-decorator="['seqNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员号">
          <a-input placeholder="请输入柜员号" v-decorator="['tellerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['branchNo', {}]" />
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
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户姓名">
          <a-input placeholder="请输入客户姓名" v-decorator="['customerName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府机构">
          <a-input placeholder="请输入政府机构" v-decorator="['governmentAgency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法律实施">
          <a-input placeholder="请输入法律实施" v-decorator="['lawEnforceOfir', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办公人员名">
          <a-input placeholder="请输入办公人员名" v-decorator="['officerIdName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办公人员ID">
          <a-input placeholder="请输入办公人员ID" v-decorator="['officerIdNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法律文书">
          <a-input placeholder="请输入法律文书" v-decorator="['legalDocName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通知号">
          <a-input placeholder="请输入通知号" v-decorator="['noticeNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冻结类型">
          <a-input placeholder="请输入冻结类型" v-decorator="['freezeType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冻结原因">
          <a-input placeholder="请输入冻结原因" v-decorator="['freezeReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="透支标志">
          <a-input placeholder="请输入透支标志" v-decorator="['odInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冻结金额">
          <a-input placeholder="请输入冻结金额" v-decorator="['freezeAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原冻结流水号">
          <a-input placeholder="请输入原冻结流水号" v-decorator="['oriFreezeJrnlNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原冻结日期">
          <a-input placeholder="请输入原冻结日期" v-decorator="['oriFreezeDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冻结日期">
          <a-input placeholder="请输入冻结日期" v-decorator="['freezeMatDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转账类型">
          <a-input placeholder="请输入转账类型" v-decorator="['trfType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转账金额">
          <a-input placeholder="请输入转账金额" v-decorator="['trfAmount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收账号">
          <a-input placeholder="请输入接收账号" v-decorator="['receiveAcctNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收姓名">
          <a-input placeholder="请输入接收姓名" v-decorator="['receiveCustName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="接收银行">
          <a-input placeholder="请输入接收银行" v-decorator="['receiveBankName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转账SRN号">
          <a-input placeholder="请输入转账SRN号" v-decorator="['trfSrnNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="查询内容">
          <a-input placeholder="请输入查询内容" v-decorator="['enquiryContent', {}]" />
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
          label="子类型">
          <a-input placeholder="请输入子类型" v-decorator="['subType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="册号">
          <a-input placeholder="请输入册号" v-decorator="['volumeNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['sequenceNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优先级">
          <a-input placeholder="请输入优先级" v-decorator="['priorityNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户余额">
          <a-input placeholder="请输入账户余额" v-decorator="['acctBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可用金额">
          <a-input placeholder="请输入可用金额" v-decorator="['availAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="othGovFreeAmt">
          <a-input placeholder="请输入othGovFreeAmt" v-decorator="['othGovFreeAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="marFreeAmt">
          <a-input placeholder="请输入marFreeAmt" v-decorator="['marFreeAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pleFreeFlg">
          <a-input placeholder="请输入pleFreeFlg" v-decorator="['pleFreeFlg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实际冻结金额">
          <a-input placeholder="请输入实际冻结金额" v-decorator="['realFreezeAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原始冻结金额">
          <a-input placeholder="请输入原始冻结金额" v-decorator="['origFreezeAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始日期">
          <a-input placeholder="请输入开始日期" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-input placeholder="请输入结束日期" v-decorator="['edate', {}]" />
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
    name: "DjjddjbModal",
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
        socNo:{rules: [{ required: true, message: '请输入机构号!' }]},
        acctNo:{rules: [{ required: true, message: '请输入帐号!' }]},
        postDate:{rules: [{ required: true, message: '请输入入账日期!' }]},
        jrnlNo:{rules: [{ required: true, message: '请输入流水号!' }]},
        businessType:{rules: [{ required: true, message: '请输入业务类型!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/djjddjb/djjddjb/add",
          edit: "/djjddjb/djjddjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'socNo','acctNo','postDate','jrnlNo','businessType','postTime','seqNo','tellerNo','branchNo','supTellerNo','status','customerName','governmentAgency','lawEnforceOfir','officerIdName','officerIdNo','legalDocName','noticeNo','freezeType','freezeReason','odInd','freezeAmount','oriFreezeJrnlNo','oriFreezeDate','freezeMatDate','trfType','trfAmount','receiveAcctNo','receiveCustName','receiveBankName','trfSrnNo','enquiryContent','remark','subType','volumeNo','sequenceNo','priorityNo','acctBalance','availAmt','othGovFreeAmt','marFreeAmt','pleFreeFlg','realFreezeAmt','origFreezeAmt','sdate','edate','loadDate','legalNo','dtnum'))
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