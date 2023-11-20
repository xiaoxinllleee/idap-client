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
          label="所属支行">
          <a-input placeholder="请输入所属支行" v-decorator="['sszh', validatorRules.sszh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', validatorRules.tjyf ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主客户经理">
          <a-input placeholder="请输入主客户经理" v-decorator="['zkhjl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信额度">
          <a-input placeholder="请输入授信额度" v-decorator="['sxed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信额度">
          <a-input placeholder="请输入用信额度" v-decorator="['yxed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信户数">
          <a-input placeholder="请输入用信户数" v-decorator="['yxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总户数">
          <a-input placeholder="请输入总户数" v-decorator="['zhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同可用金额">
          <a-input placeholder="请输入合同可用金额" v-decorator="['htkyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信户数">
          <a-input placeholder="请输入授信户数" v-decorator="['sxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用信户数排名">
          <a-input placeholder="请输入用信户数排名" v-decorator="['yxhspm', {}]" />
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
    name: "TjfxXdxtkhsxyxtjKhjlModal",
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
        sszh:{rules: [{ required: true, message: '请输入所属支行!' }]},
        tjyf:{rules: [{ required: true, message: '请输入统计月份!' }]},
        },
        url: {
          add: "/TjfxXdxtkhsxyxtjKhjl/tjfxXdxtkhsxyxtjKhjl/add",
          edit: "/TjfxXdxtkhsxyxtjKhjl/tjfxXdxtkhsxyxtjKhjl/edit",
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
          this.form.setFieldsValue(pick(this.model,'sszh','zkhjl','sxed','yxed','yxhs','zhs','htkyje','sxhs','yxhspm'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
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
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            
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