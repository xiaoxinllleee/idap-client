<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="12" :gutter="6"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否只读">
            <j-dict-select-tag placeholder="请选择是否只读" v-decorator="['readonly', validatorRules.readonly ]"
                               dict-code="sfbz" :trigger-change="true"/>
            <!--<a-switch checkedChildren="是" unCheckedChildren="否" @change="onChose" v-model="readonlyCheck"/>-->
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" :gutter="6"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="考核项目">
            <j-dict-select-tag placeholder="请选择考核项目" v-decorator="['zbid', validatorRules.zbid ]"
                               dict-code="rate:rate_zbkxxb,zbmc,zbid" :trigger-change="true"/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="6"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="指标符号">
            <j-dict-select-tag placeholder="请选择指标符号" v-decorator="['zbabs', validatorRules.zbabs ]"
                               dict-code="abs" :trigger-change="true"/>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" :gutter="6"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="指标规则ID">
            <a-input placeholder="请输入指标规则ID" v-decorator="['zbgzid', validatorRules.zbgzid ]" :disabled="this.disabled" />
          </a-form-item></a-col>
          <a-col :span="12" :gutter="6"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="指标规则名称">
            <a-input placeholder="请输入指标规则名称" v-decorator="['zbgzmc', validatorRules.zbgzmc ]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" :gutter="6"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="指标规则分值">
            <a-input-number placeholder="请输入指标规则分值" v-decorator="['zbgzfz', validatorRules.zbgzfz ]" :min="0" style="width: 100%;" />
          </a-form-item></a-col>
          <a-col :span="12" :gutter="6"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="指标结果">
            <a-input placeholder="请输入指标结果" v-decorator="['zbjg', {}]" />
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "XmgzszModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        //readonlyCheck: false,
        disableSubmit: false,
        confirmLoading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        labelCol_A: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        wrapperCol_A: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
        //readonly: 1,
        form: this.$form.createForm(this),
        validatorRules:{
          readonly:{rules: [{ required: true, message: '请选择是否只读！' }]},
          zbid:{rules: [{ required: true, message: '请选择考核项目！' }]},
          zbabs:{rules: [{ required: true, message: '请选择指标符号！' }]},
          zbgzid:{rules: [{ required: true, message: '请输入指标规则ID！' }]},
          zbgzmc:{rules: [{ required: true, message: '请输入指标规则名称！' }]},
          zbgzfz:{rules: [{ required: true, message: '请输入指标规则分值！' }]},
        },
        url: {
          add: "/csszgl/xmgzsz/add",
          edit: "/csszgl/xmgzsz/edit",
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
        // if (record.zbgzid){
        //   this.readonlyCheck = (record.readonly == 1)?true:false;
        // }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        //this.model.readonly = this.readonly;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'readonly','zbid','zbgzid','zbgzmc','zbabs','zbgzfz','zbjg'))
        });
      },
      // onChose(checked) {
      //   if (checked) {
      //     this.readonly = 1;
      //     this.readonlyCheck = true;
      //   } else {
      //     this.readonly = 2;
      //     this.readonlyCheck = false;
      //   }
      // },
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
            if(!this.model.zbgzid){
              httpurl+=this.url.add;
              method = 'post';
            } else {
              httpurl+=this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log(values)
            console.log(formData)
            //formData.readonly = this.readonly;
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