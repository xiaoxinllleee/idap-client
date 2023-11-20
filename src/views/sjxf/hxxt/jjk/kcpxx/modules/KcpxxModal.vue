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
          <a-input placeholder="请输入银行号" v-decorator="['institution', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="BIN号">
          <a-input placeholder="请输入BIN号" v-decorator="['bin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产口号">
          <a-input placeholder="请输入产口号" v-decorator="['no', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品名称">
          <a-input placeholder="请输入产品名称" v-decorator="['name', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡的默认有效时限">
          <a-input placeholder="请输入卡的默认有效时限" v-decorator="['defaultExpiry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务码">
          <a-input placeholder="请输入服务码" v-decorator="['serviceRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易约束标识位">
          <a-input placeholder="请输入交易约束标识位" v-decorator="['txnRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户约束标识位">
          <a-input placeholder="请输入商户约束标识位" v-decorator="['merchantRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户类型限制">
          <a-input placeholder="请输入商户类型限制" v-decorator="['merchanttypeRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="区域约束">
          <a-input placeholder="请输入区域约束" v-decorator="['regionRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附属卡数量">
          <a-input placeholder="请输入附属卡数量" v-decorator="['subsidiaryRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易币种">
          <a-input placeholder="请输入交易币种" v-decorator="['currencyRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡段索引">
          <a-input placeholder="请输入卡段索引" v-decorator="['cardRange', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡段格式">
          <a-input placeholder="请输入卡段格式" v-decorator="['cardRangeFormat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="未用">
          <a-input placeholder="请输入未用" v-decorator="['pvki', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户关联卡数量">
          <a-input placeholder="请输入客户关联卡数量" v-decorator="['replica', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子渠道交易开关">
          <a-input placeholder="请输入电子渠道交易开关" v-decorator="['secondaryAccess', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="密码重输次数">
          <a-input placeholder="请输入密码重输次数" v-decorator="['pinRetries', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="CVV重试次数">
          <a-input placeholder="请输入CVV重试次数" v-decorator="['cvvRetries', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型">
          <a-input placeholder="请输入客户类型" v-decorator="['custTypeRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户性别约束">
          <a-input placeholder="请输入客户性别约束" v-decorator="['genderRestrict', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡介质类型">
          <a-input placeholder="请输入卡介质类型" v-decorator="['mediaType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重要空白凭证号">
          <a-input placeholder="请输入重要空白凭证号" v-decorator="['ibdType', {}]" />
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
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="换卡关联信息">
          <a-input placeholder="请输入换卡关联信息" v-decorator="['controlInfo10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo01', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo02', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo03', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo04', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo05', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo06', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo07', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo08', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo09', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户关联信息">
          <a-input placeholder="请输入账户关联信息" v-decorator="['linkInfo10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开卡方式">
          <a-input placeholder="请输入开卡方式" v-decorator="['issueWayFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银联交易开通标识">
          <a-input placeholder="请输入银联交易开通标识" v-decorator="['cuppayDefaultFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近维护日期">
          <a-input placeholder="请输入最近维护日期" v-decorator="['lastMaintainDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近维护标志">
          <a-input placeholder="请输入最近维护标志" v-decorator="['lastMaintainFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品码">
          <a-input placeholder="请输入产品码" v-decorator="['productCode', {}]" />
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
    name: "KcpxxModal",
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
          add: "/kcpxx/kcpxx/add",
          edit: "/kcpxx/kcpxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'institution','bin','no','name','defaultExpiry','serviceRestrict','txnRestrict','merchantRestrict','merchanttypeRestrict','regionRestrict','subsidiaryRestrict','currencyRestrict','cardRange','cardRangeFormat','pvki','replica','secondaryAccess','pinRetries','cvvRetries','custTypeRestrict','genderRestrict','mediaType','ibdType','status','controlInfo01','controlInfo02','controlInfo03','controlInfo04','controlInfo05','controlInfo06','controlInfo07','controlInfo08','controlInfo09','controlInfo10','linkInfo01','linkInfo02','linkInfo03','linkInfo04','linkInfo05','linkInfo06','linkInfo07','linkInfo08','linkInfo09','linkInfo10','issueWayFlag','cuppayDefaultFlag','lastMaintainDate','lastMaintainFlag','productCode','sdate','edate','loadDate','dtnum'))
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