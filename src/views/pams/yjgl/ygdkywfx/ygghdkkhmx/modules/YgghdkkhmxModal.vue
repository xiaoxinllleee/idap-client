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
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
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
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['custName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最早贷款发放日期">
          <a-date-picker v-decorator="[ 'zzffrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户贷款余额">
          <a-input placeholder="请输入存量客户贷款余额" v-decorator="['clKhdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户贷款余额">
          <a-input placeholder="请输入客户贷款余额" v-decorator="['khdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户月日平1">
          <a-input placeholder="请输入存量客户月日平1" v-decorator="['clKhyrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户月日平2">
          <a-input placeholder="请输入存量客户月日平2" v-decorator="['clKhyrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户月日平3">
          <a-input placeholder="请输入存量客户月日平3" v-decorator="['clKhyrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户月日平1">
          <a-input placeholder="请输入客户月日平1" v-decorator="['khyrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户月日平2">
          <a-input placeholder="请输入客户月日平2" v-decorator="['khyrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户月日平3">
          <a-input placeholder="请输入客户月日平3" v-decorator="['khyrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户季日平1">
          <a-input placeholder="请输入存量客户季日平1" v-decorator="['clKhjrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户季日平2">
          <a-input placeholder="请输入存量客户季日平2" v-decorator="['clKhjrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户季日平3">
          <a-input placeholder="请输入存量客户季日平3" v-decorator="['clKhjrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季日平1">
          <a-input placeholder="请输入季日平1" v-decorator="['khjrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季日平2">
          <a-input placeholder="请输入季日平2" v-decorator="['khjrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季日平3">
          <a-input placeholder="请输入季日平3" v-decorator="['khjrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户年日平1">
          <a-input placeholder="请输入存量客户年日平1" v-decorator="['clKhnrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户年日平2">
          <a-input placeholder="请输入存量客户年日平2" v-decorator="['clKhnrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量客户年日平3">
          <a-input placeholder="请输入存量客户年日平3" v-decorator="['clKhnrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年日平1">
          <a-input placeholder="请输入年日平1" v-decorator="['khnrp1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年日平2">
          <a-input placeholder="请输入年日平2" v-decorator="['khnrp2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年日平3">
          <a-input placeholder="请输入年日平3" v-decorator="['khnrp3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户模拟利润">
          <a-input placeholder="请输入客户模拟利润" v-decorator="['khmnlr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户贷款金额">
          <a-input placeholder="请输入客户贷款金额" v-decorator="['khdkje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效客户标志">
          <a-input placeholder="请输入有效客户标志" v-decorator="['yxkhbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量有效客户标志">
          <a-input placeholder="请输入存量有效客户标志" v-decorator="['clYxkhbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款标签">
          <a-input placeholder="请输入贷款标签" v-decorator="['dkbq', {}]" />
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
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "YgghdkkhmxModal",
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
          add: "/ygghdkkhmx/ygghdkkhmx/add",
          edit: "/ygghdkkhmx/ygghdkkhmx/edit",
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
          this.form.setFieldsValue(pick(this.model,'yggh','jgdm','zjhm','custType','custName','clKhdkye','khdkye','clKhyrp1','clKhyrp2','clKhyrp3','khyrp1','khyrp2','khyrp3','clKhjrp1','clKhjrp2','clKhjrp3','khjrp1','khjrp2','khjrp3','clKhnrp1','clKhnrp2','clKhnrp3','khnrp1','khnrp2','khnrp3','khmnlr','khdkje','yxkhbz','clYxkhbz','dkbq','lrbz','lrr'))
		  //时间格式化
          this.form.setFieldsValue({tjrq:this.model.tjrq?moment(this.model.tjrq):null})
          this.form.setFieldsValue({zzffrq:this.model.zzffrq?moment(this.model.zzffrq):null})
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
            formData.zzffrq = formData.zzffrq?formData.zzffrq.format():null;
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