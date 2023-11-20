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
        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="系统简称">
              <a-input  placeholder="请输入系统简称" v-decorator="['xtjc', {rules: [{ required: true, message: '请输入系统简称' }]}]"  />
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="系统名称">
              <a-input :required="true" placeholder="请输入系统名称" v-decorator="['xtmc', {rules: [{ required: true, message: '请输入系统名称' }]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否启用">
              <a-select placeholder="请选择是否启用"  style="width: 180px" :required="true"  v-decorator="['sfqy', {rules: [{ required: true, message: '请选择是否启用' }]}]">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="2">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="排序序号">
              <a-input placeholder="请输入排序序号"  v-decorator="['sx', {rules: [{ required: true, message: '请输入排序序号' }]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { postAction } from '@/api/manage'
  import pick from 'lodash.pick'

  export default {
    name: "SubSystemModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 10}
        },
        wrapperCol: {
          xs: {span: 80},
          sm: {span: 12}
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          xtjc: {rules: [{ required: true, message: '请输入系统简称!' }]},
          xtmc: {rules: [{ required: true, message: '请输入系统名称!' }]},
        },
        url: {
          add: "/subsystem/add",
          edit: "/subsystem/edit",
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
          this.form.setFieldsValue(pick(this.model,'xtjc','xtmc','sfqy','sx','bz'))
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
            if(!this.model.id){
              httpurl+=this.url.add;
            }else{
              httpurl+=this.url.edit;
            }
            let formData = Object.assign(this.model, values);
            console.log(formData)
            postAction(httpurl,formData).then((res)=>{
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