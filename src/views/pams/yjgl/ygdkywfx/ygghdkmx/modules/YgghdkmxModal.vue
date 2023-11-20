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
          label="统计日期">
          <a-date-picker v-decorator="[ 'tjrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['dkzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户姓名">
          <a-input placeholder="请输入客户姓名" v-decorator="['custName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型">
          <a-input placeholder="请输入客户类型" v-decorator="['custType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
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
          label="业务编号">
          <a-input placeholder="请输入业务编号" v-decorator="['businessNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发放日期">
          <a-date-picker v-decorator="[ 'ffrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签约日期">
          <a-date-picker v-decorator="[ 'qyrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款金额">
          <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量余额">
          <a-input placeholder="请输入存量余额" v-decorator="['clye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款期限">
          <a-input placeholder="请输入贷款期限" v-decorator="['dkqx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率">
          <a-input placeholder="请输入利率" v-decorator="['ll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷贷款品种">
          <a-input placeholder="请输入信贷贷款品种" v-decorator="['businessPhase', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款五级分类">
          <a-input placeholder="请输入贷款五级分类" v-decorator="['fiveClassType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量五级分类">
          <a-input placeholder="请输入存量五级分类" v-decorator="['clFiveClassType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月初五级分类">
          <a-input placeholder="请输入月初五级分类" v-decorator="['ycFiveClassType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="模拟利润">
          <a-input placeholder="请输入模拟利润" v-decorator="['mnlr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主客户经理员工号">
          <a-input placeholder="请输入主客户经理员工号" v-decorator="['custManagerId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款月日平1">
          <a-input placeholder="请输入存量贷款月日平1" v-decorator="['clDkyrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款月日平2">
          <a-input placeholder="请输入存量贷款月日平2" v-decorator="['clDkyrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款月日平1">
          <a-input placeholder="请输入贷款月日平1" v-decorator="['dkyrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款月日平2">
          <a-input placeholder="请输入贷款月日平2" v-decorator="['dkyrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款季日平1">
          <a-input placeholder="请输入存量贷款季日平1" v-decorator="['clDkjrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款季日平2">
          <a-input placeholder="请输入存量贷款季日平2" v-decorator="['clDkjrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款季日平1">
          <a-input placeholder="请输入贷款季日平1" v-decorator="['dkjrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款季日平2">
          <a-input placeholder="请输入贷款季日平2" v-decorator="['dkjrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款年日平1">
          <a-input placeholder="请输入存量贷款年日平1" v-decorator="['clDknrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款年日平2">
          <a-input placeholder="请输入存量贷款年日平2" v-decorator="['clDknrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款年日平1">
          <a-input placeholder="请输入贷款年日平1" v-decorator="['dknrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款年日平2">
          <a-input placeholder="请输入贷款年日平2" v-decorator="['dknrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入标志">
          <a-input placeholder="请输入录入标志" v-decorator="['lrbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入人">
          <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入时间">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款月日平3">
          <a-input placeholder="请输入存量贷款月日平3" v-decorator="['clDkyrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款月日平3">
          <a-input placeholder="请输入贷款月日平3" v-decorator="['dkyrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款季日平3">
          <a-input placeholder="请输入存量贷款季日平3" v-decorator="['clDkjrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款季日平3">
          <a-input placeholder="请输入贷款季日平3" v-decorator="['dkjrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量贷款年日平3">
          <a-input placeholder="请输入存量贷款年日平3" v-decorator="['clDknrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款年日平3">
          <a-input placeholder="请输入贷款年日平3" v-decorator="['dknrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管户比例">
          <a-input placeholder="请输入管户比例" v-decorator="['ghbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成本率">
          <a-input placeholder="请输入成本率" v-decorator="['cbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率差">
          <a-input placeholder="请输入利率差" v-decorator="['llc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日利率差">
          <a-input placeholder="请输入日利率差" v-decorator="['rllc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月初贷款余额">
          <a-input placeholder="请输入月初贷款余额" v-decorator="['ycDkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品大类">
          <a-input placeholder="请输入产品大类" v-decorator="['cpdl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品小类">
          <a-input placeholder="请输入产品小类" v-decorator="['cpxl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款标签">
          <a-input placeholder="请输入贷款标签" v-decorator="['dkbq', {}]" />
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
    name: "YgghdkmxModal",
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
          add: "/ygghdkmx/ygghdkmx/add",
          edit: "/ygghdkmx/ygghdkmx/edit",
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
          this.form.setFieldsValue(pick(this.model,'yggh','jgdm','dkzh','custName','custType','zjhm','hth','businessNo','dkje','dkye','clye','dkqx','ll','businessPhase','fiveClassType','clFiveClassType','ycFiveClassType','mnlr','custManagerId','clDkyrp1','clDkyrp2','dkyrp1','dkyrp2','clDkjrp1','clDkjrp2','dkjrp1','dkjrp2','clDknrp1','clDknrp2','dknrp1','dknrp2','lrbz','lrr','clDkyrp3','dkyrp3','clDkjrp3','dkjrp3','clDknrp3','dknrp3','ghbl','cbl','llc','rllc','ycDkye','cpdl','cpxl','dkbq'))
		  //时间格式化
          this.form.setFieldsValue({tjrq:this.model.tjrq?moment(this.model.tjrq):null})
          this.form.setFieldsValue({ffrq:this.model.ffrq?moment(this.model.ffrq):null})
          this.form.setFieldsValue({qyrq:this.model.qyrq?moment(this.model.qyrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            formData.tjrq = formData.tjrq?formData.tjrq.format():null;
            formData.ffrq = formData.ffrq?formData.ffrq.format():null;
            formData.qyrq = formData.qyrq?formData.qyrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            
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