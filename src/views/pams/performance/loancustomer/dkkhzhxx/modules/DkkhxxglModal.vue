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
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', validatorRules.jgdm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户编号">
          <a-input placeholder="请输入客户编号" v-decorator="['khbh', validatorRules.khbh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['hth', validatorRules.hth ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['zjlx', {}]" />
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
          <a-input placeholder="请输入客户类型" v-decorator="['khlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营销类型">
          <a-input placeholder="请输入营销类型" v-decorator="['yxlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同金额">
          <a-input placeholder="请输入合同金额" v-decorator="['htje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同余额">
          <a-input placeholder="请输入合同余额" v-decorator="['htye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最早合同发放日期">
          <a-date-picker v-decorator="[ 'zzhtffrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最早合同到期日期">
          <a-date-picker v-decorator="[ 'zzhtdqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同发放日期">
          <a-date-picker v-decorator="[ 'htffrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同发放日期">
          <a-date-picker v-decorator="[ 'htdqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品信息">
          <a-input placeholder="请输入产品信息" v-decorator="['cpxx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营销人">
          <a-input placeholder="请输入营销人" v-decorator="['yxr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营销比例">
          <a-input placeholder="请输入营销比例" v-decorator="['yxbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管户人">
          <a-input placeholder="请输入管户人" v-decorator="['ghr', {}]" />
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
          label="包收人">
          <a-input placeholder="请输入包收人" v-decorator="['bsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="包收比例">
          <a-input placeholder="请输入包收比例" v-decorator="['bsbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审批人">
          <a-input placeholder="请输入审批人" v-decorator="['spr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审批比例">
          <a-input placeholder="请输入审批比例" v-decorator="['spbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调查人">
          <a-input placeholder="请输入调查人" v-decorator="['dcr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调查比例">
          <a-input placeholder="请输入调查比例" v-decorator="['dcbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入标识（0：导入 1：录入 2：修改）">
          <a-input placeholder="请输入录入标识（0：导入 1：录入 2：修改）" v-decorator="['lrbz', {}]" />
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
    name: "DkkhxxglModal",
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
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        khbh:{rules: [{ required: true, message: '请输入客户编号!' }]},
        hth:{rules: [{ required: true, message: '请输入合同号!' }]},
        },
        url: {
          add: "/dkkhzhxx/dkkhxxgl/add",
          edit: "/dkkhzhxx/dkkhxxgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','khbh','hth','khmc','zjlx','zjhm','khlx','yxlx','htje','htye','cpxx','yxr','yxbl','ghr','ghbl','bsr','bsbl','spr','spbl','dcr','dcbl','lrbz','lrr'))
		  //时间格式化
          this.form.setFieldsValue({zzhtffrq:this.model.zzhtffrq?moment(this.model.zzhtffrq):null})
          this.form.setFieldsValue({zzhtdqrq:this.model.zzhtdqrq?moment(this.model.zzhtdqrq):null})
          this.form.setFieldsValue({htffrq:this.model.htffrq?moment(this.model.htffrq):null})
          this.form.setFieldsValue({htdqrq:this.model.htdqrq?moment(this.model.htdqrq):null})
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
            formData.zzhtffrq = formData.zzhtffrq?formData.zzhtffrq.format():null;
            formData.zzhtdqrq = formData.zzhtdqrq?formData.zzhtdqrq.format():null;
            formData.htffrq = formData.htffrq?formData.htffrq.format():null;
            formData.htdqrq = formData.htdqrq?formData.htdqrq.format():null;
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