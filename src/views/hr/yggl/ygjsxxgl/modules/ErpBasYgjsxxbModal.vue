<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <j-select-ygxx type="radio" v-decorator="['ygxm', validatorRules.ygxm ]" @change="ygxxChange"></j-select-ygxx>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工工号">
              <a-input placeholder="请输入员工工号" v-decorator="['yggh', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="家属姓名">
              <a-input placeholder="请输入家属姓名" v-decorator="['jsxm', validatorRules.jsxm]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="家属证件号码">
              <a-input placeholder="请输入家属证件号码" v-decorator="['jszjhm', validatorRules.jszjhm ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="家属关系">
              <j-dict-select-tag  v-decorator="['jsgx']" :triggerChange="true" placeholder="请选择家属关系"
                                  dictCode="ygjsgx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="家属联系方式">
              <a-input placeholder="请输入家属联系方式" v-decorator="['jslxfs', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import moment from "moment"

  export default {
    name: "ErpBasYgjsxxbModal",
    components: {
      JSelectYgxx
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        disableSubmit: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        ygxm:{rules: [{ required: true, message: '请选择员工!' }]},
        jsxm:{rules: [{ required: true, message: '请输入家属姓名!' }]},
        jszjhm:{rules: [{ required: true, message: '请输入家属证件号码!' }]},
        },
        url: {
          add: "/ygjsxxgl/erpBasYgjsxxb/add",
          edit: "/ygjsxxgl/erpBasYgjsxxb/edit",
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
          this.form.setFieldsValue(pick(this.model,'yggh','ygxm','jsgx','jsxm','jszjhm','jslxfs'))
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      ygxxChange(ygxx) {
        console.log('ygxxChange', ygxx)
        this.form.setFieldsValue({yggh: ygxx.yggh})
        this.form.setFieldsValue({ygxm: ygxx.ygxm})

      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.yggh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log(formData)

            formData.ygxm = formData.ygxm.ygxm
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