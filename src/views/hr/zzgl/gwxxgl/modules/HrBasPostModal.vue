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
              label="岗位标识">
              <a-input placeholder="请输入岗位标识" :disabled="model.gwbz != undefined" v-decorator="['gwbz', validatorRules.gwbz ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <a-input placeholder="请输入岗位名称" v-decorator="['gwmc', validatorRules.gwmc]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位性质">
              <j-dict-select-tag  v-decorator="['gwxz']" :triggerChange="true" placeholder="请选择岗位性质"
                                  dictCode="gwxz"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否启用">
              <j-dict-select-tag  v-decorator="['sfqy', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择是否启用"
                                  dictCode="sfbz"/>
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
  import moment from "moment"
  import { duplicateCheck } from '@/api/api'

  export default {
    name: "HrBasPostModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        disableSubmit: false,
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
          gwbz:{rules: [{ required: true, message: '请输入岗位标识!' }, {validator:this.validateInputGwbz}]},
          gwmc:{rules: [{ required: true, message: '请输入岗位名称!' }]},
        },
        url: {
          add: "/gwxxgl/hrBasPost/add",
          edit: "/gwxxgl/hrBasPost/edit",
        },
      }
    },
    created () {
    },
    methods: {
      validateInputGwbz(rule, value, callback){
        console.log("value",value)
        if (!this.model.gwbz && value) {
          var params = {
            tableName: "HR_BAS_POST",
            fieldName: "gwbz",
            fieldVal: value,
          };
          duplicateCheck(params).then((res)=>{
            if(res.success){
              callback();
            }else{
              callback(res.message);
            }
          })
        } else {
          callback();
        }
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'gwbz','gwmc','sfqy','gwxz'))
		  //时间格式化
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
            if(!this.model.gwbz){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            
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