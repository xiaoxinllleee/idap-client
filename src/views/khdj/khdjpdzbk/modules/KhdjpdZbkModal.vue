<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row>
          <a-col :span="12" :gutter="6"><a-form-item label="是否启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
          </a-form-item></a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="6"><a-form-item label="指标维度" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <j-dict-select-tag placeholder="请选择指标维度" v-decorator="['zbwd', validatorRules.zbwd]" :triggerChange="true" dictCode="rqwd"/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="6"><a-form-item label="指标ID" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input placeholder="请输入指标ID" v-decorator="['zbid', validatorRules.zbid]"/>
          </a-form-item></a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="6"><a-form-item label="指标名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <a-input placeholder="请输入指标名称" v-decorator="['zbmc', validatorRules.zbmc]"/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="6"><a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]"/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>

  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'

  export default {
    name: "KhdjpdZbkModal",
    data () {
      return {
        title:"操作",
        visible: false,
        visibleCheck: true,
        confirmLoading: false,
        model: {},
        sfqy: 1,
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
          zbwd:{rules: [{required: true, message: '请选择指标维度！'}]},
          zbid:{rules: [{required: true, message: '请输入指标ID！'}]},
          zbmc:{rules: [{required: true, message: '请输入指标名称！'}]},
          sfqy:{rules: [{required: true, message: '请选择是否启用！'}]},
        },
        url: {
          add: "/khdjpdzbk/khdjpdZbk/add",
          edit: "/khdjpdzbk/khdjpdZbk/edit",
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
        if (record.id){
          this.visibleCheck = (record.sfqy == 1) ? true : false;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.model.sfqy = this.sfqy;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'zbid', 'zbmc', 'zbwd', 'sfqy', 'bz'))
        });
      },
      onChose(checked) {
        if (checked) {
          this.sfqy = 1;
          this.visibleCheck = true;
        } else {
          this.sfqy = 2;
          this.visibleCheck = false;
        }
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
            console.log(formData)
            formData.sfqy = this.sfqy;
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
      close () {
        this.$emit('close');
        this.visible = false;
      },
    }
  }
</script>

<style lang="less" scoped>
</style>