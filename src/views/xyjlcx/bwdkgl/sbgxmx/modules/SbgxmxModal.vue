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
          label="业务机构">
          <j-dict-select-tag v-decorator="['ywjg', {}]" :triggerChange="true" placeholder="请选择业务机构"
                             dictCode="v_hr_bas_organization_cmms, zzjc, ywjgdm"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="填报日期">
          <a-date-picker v-decorator="[ 'tbrq', {}]" style="width: 100%" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号">
          <a-input placeholder="请输入账号" v-decorator="['zh', validatorRules.zh ]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人姓名">
          <a-input placeholder="请输入借款人姓名" v-decorator="['jkrxm', {}]" />
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
          label="借款日期">
          <a-date-picker v-decorator="[ 'jkrq', {}]" style="width: 100%" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]" style="width: 100%" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工计息挂息金额">
          <a-input placeholder="请输入手工计息挂息金额" v-decorator="['gxje', validatorRules.gxje]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手工计息挂息余额">
          <a-input placeholder="请输入手工计息挂息余额" v-decorator="['gxye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销利息挂息金额">
          <a-input placeholder="请输入核销利息挂息金额" v-decorator="['hxlxgxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销利息挂息余额">
          <a-input placeholder="请输入核销利息挂息余额" v-decorator="['hxlxgxye', {}]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂息金额合计">
          <a-input placeholder="请输入挂息金额合计" v-decorator="['gxjehj', {}]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂息余额合计">
          <a-input placeholder="请输入挂息余额合计" v-decorator="['gxyehj', {}]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="情况说明">
          <a-input placeholder="请输入情况说明" v-decorator="['qksm', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import ACol from "ant-design-vue/es/grid/Col";

  export default {
    name: "SbgxmxModal",
    components: {ACol},
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
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
        zh:{rules: [{ required: true, message: '请输入账号!' }]},
        gxje:{rules: [{ required: true, message: '请输入手工计息挂息金额!' }]}
        },
        url: {
          add: "/sbgxmx/sbgxmx/add",
          edit: "/sbgxmx/sbgxmx/edit",
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
          this.form.setFieldsValue(pick(this.model,'ywjg','zh','jkrxm','zjhm','gxje','gxye','hxlxgxje','hxlxgxye','gxjehj','gxyehj','qksm'))
		  //时间格式化
          this.form.setFieldsValue({tbrq:this.model.tbrq?moment(this.model.tbrq):null})
          this.form.setFieldsValue({jkrq:this.model.jkrq?moment(this.model.jkrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
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
            if(!this.model.zh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.tbrq = formData.tbrq?formData.tbrq.format():null;
            formData.jkrq = formData.jkrq?formData.jkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            /*formData.lrsj = formData.lrsj?formData.lrsj.format():null;*/
            
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