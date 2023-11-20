<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', validatorRules.zjhm ]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', validatorRules.khmc ]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效标识">
          <j-dict-select-tag v-decorator="['yxbz', {}]" :triggerChange="true" placeholder="请选择有效标识"
                             dictCode="hmdyxbz" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良记录行为描述">
          <!--<a-select placeholder="请选择不良记录行为描述" v-decorator="['bljlxwms', {} ]" />-->
          <j-dict-select-tag v-decorator="['bljlxwms', validatorRules.bljlxwms]" :triggerChange="true" placeholder="请选择不良记录行为描述"
                              dictCode="bljlxwms" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记日期">
          <a-date-picker v-decorator="[ 'djrq', validatorRules.djrq ]" style="width: 100%" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不良行为结束日期">
          <a-date-picker v-decorator="[ 'blxwjsrq', {}]" style="width: 100%" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="情况说明">
          <a-input placeholder="请输入情况说明" v-decorator="['qksm', validatorRules.qksm ]" />
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
    name: "HmdglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: true,
        disableSubmit: true,
        confirmLoading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules:{
        khmc:{rules: [{ required: true, message: '请输入客户名称!' }]},
        djrq:{rules: [{ required: true, message: '请输入登记日期!' }]},
        zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
        bljlxwms:{rules: [{ required: true, message: '请选择不良记录行为描述！'}]},
        // qksm: {rules: [{ required: bljlxwms == '7', message: '不良记录行为描述为手工添加时，情况说明不能为空！'}]},

        },
        url: {
          add: "/hmdgl/hmdgl/add",
          edit: "/hmdgl/hmdgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'zjhm','khmc','yxbz','bljlxwms','qksm'))
		  //时间格式化
          this.form.setFieldsValue({djrq:this.model.djrq?moment(this.model.djrq):null})
          //this.form.setFieldsValue({bljlmcrq:this.model.bljlmcrq?moment(this.model.bljlmcrq):null})
          this.form.setFieldsValue({blxwjsrq:this.model.blxwjsrq?moment(this.model.blxwjsrq):null})
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
            if(!this.model.zjhm && !this.model.bljlxwms){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
              formData.djrq = formData.djrq?formData.djrq.format():null;
            //  formData.bljlmcrq = formData.bljlmcrq?formData.bljlmcrq.format():null;
              formData.blxwjsrq = formData.blxwjsrq?formData.blxwjsrq.format():null;
            /*formData.spsj = formData.spsj?formData.spsj.format():null;
            formData.mcsj = formData.mcsj?formData.mcsj.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;*/

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