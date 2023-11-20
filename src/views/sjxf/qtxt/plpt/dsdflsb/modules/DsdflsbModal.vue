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
          <a-input placeholder="请输入交易日期" v-decorator="['jyrq', validatorRules.jyrq ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易批次号">
          <a-input placeholder="请输入交易批次号" v-decorator="['jypch', validatorRules.jypch ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位编号">
          <a-input placeholder="请输入单位编号" v-decorator="['dwbh', validatorRules.dwbh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目编号">
          <a-input placeholder="请输入项目编号" v-decorator="['xmbh', validatorRules.xmbh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="序列号">
          <a-input placeholder="请输入序列号" v-decorator="['xlh', validatorRules.xlh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位账号">
          <a-input placeholder="请输入单位账号" v-decorator="['dwzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="代收发标志">
          <a-input placeholder="请输入代收发标志" v-decorator="['dsfbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件种类">
          <a-input placeholder="请输入证件种类" v-decorator="['zjlb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="帐号">
          <a-input placeholder="请输入帐号" v-decorator="['zh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['hth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行别">
          <a-input placeholder="请输入行别" v-decorator="['hb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收金额">
          <a-input placeholder="请输入应收金额" v-decorator="['ysje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额">
          <a-input placeholder="请输入交易金额" v-decorator="['jyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易标志">
          <a-input placeholder="请输入交易标志" v-decorator="['jybz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="大写金额">
          <a-input placeholder="请输入大写金额" v-decorator="['dxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户名">
          <a-input placeholder="请输入户名" v-decorator="['hm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="纳税编号">
          <a-input placeholder="请输入纳税编号" v-decorator="['nsbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额1">
          <a-input placeholder="请输入明细金额1" v-decorator="['mxje1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额2">
          <a-input placeholder="请输入明细金额2" v-decorator="['mxje2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额3">
          <a-input placeholder="请输入明细金额3" v-decorator="['mxje3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额4">
          <a-input placeholder="请输入明细金额4" v-decorator="['mxje4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额5">
          <a-input placeholder="请输入明细金额5" v-decorator="['mxje5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额6">
          <a-input placeholder="请输入明细金额6" v-decorator="['mxje6', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额7">
          <a-input placeholder="请输入明细金额7" v-decorator="['mxje7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额8">
          <a-input placeholder="请输入明细金额8" v-decorator="['mxje8', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额9">
          <a-input placeholder="请输入明细金额9" v-decorator="['mxje9', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额10">
          <a-input placeholder="请输入明细金额10" v-decorator="['mxje10', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额11">
          <a-input placeholder="请输入明细金额11" v-decorator="['mxje11', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额12">
          <a-input placeholder="请输入明细金额12" v-decorator="['mxje12', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额13">
          <a-input placeholder="请输入明细金额13" v-decorator="['mxje13', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额14">
          <a-input placeholder="请输入明细金额14" v-decorator="['mxje14', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="明细金额15">
          <a-input placeholder="请输入明细金额15" v-decorator="['mxje15', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="检查操作柜员">
          <a-input placeholder="请输入检查操作柜员" v-decorator="['jcczgy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="检查操作机构">
          <a-input placeholder="请输入检查操作机构" v-decorator="['jcczjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="检查日期">
          <a-input placeholder="请输入检查日期" v-decorator="['jcrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="检查时间">
          <a-input placeholder="请输入检查时间" v-decorator="['jcsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="检验UUID">
          <a-input placeholder="请输入检验UUID" v-decorator="['jyuuid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通过标志">
          <a-input placeholder="请输入通过标志" v-decorator="['tgbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="错误信息">
          <a-input placeholder="请输入错误信息" v-decorator="['cwxx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留1">
          <a-input placeholder="请输入预留1" v-decorator="['yl1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留2">
          <a-input placeholder="请输入预留2" v-decorator="['yl2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预留3">
          <a-input placeholder="请输入预留3" v-decorator="['yl3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心错误码">
          <a-input placeholder="请输入核心错误码" v-decorator="['hostcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心错误信息">
          <a-input placeholder="请输入核心错误信息" v-decorator="['hostcwxx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心流水">
          <a-input placeholder="请输入核心流水" v-decorator="['hostseqno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心交易日期">
          <a-input placeholder="请输入核心交易日期" v-decorator="['hosttradedate', {}]" />
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
    name: "DsdflsbModal",
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
        jyrq:{rules: [{ required: true, message: '请输入交易日期!' }]},
        jypch:{rules: [{ required: true, message: '请输入交易批次号!' }]},
        dwbh:{rules: [{ required: true, message: '请输入单位编号!' }]},
        xmbh:{rules: [{ required: true, message: '请输入项目编号!' }]},
        xlh:{rules: [{ required: true, message: '请输入序列号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/dsdflsb/dsdflsb/add",
          edit: "/dsdflsb/dsdflsb/edit",
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
          this.form.setFieldsValue(pick(this.model,'jyrq','jypch','dwbh','xmbh','xlh','dwzh','dsfbz','zjlb','zjh','zh','hth','hb','ysje','jyje','jybz','dxje','hm','nsbh','mxje1','mxje2','mxje3','mxje4','mxje5','mxje6','mxje7','mxje8','mxje9','mxje10','mxje11','mxje12','mxje13','mxje14','mxje15','jcczgy','jcczjg','jcrq','jcsj','jyuuid','tgbz','cwxx','bz','yl1','yl2','yl3','hostcode','hostcwxx','hostseqno','hosttradedate','dataDate','loadDate','legalNo','dtnum'))
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