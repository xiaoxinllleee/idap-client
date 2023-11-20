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
          label="zhjgdm">
          <a-input placeholder="请输入zhjgdm" v-decorator="['zhjgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="jgdm">
          <a-input placeholder="请输入jgdm" v-decorator="['jgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="custid">
          <a-input placeholder="请输入custid" v-decorator="['custid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tjyf">
          <a-date-picker v-decorator="[ 'tjyf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="beginday">
          <a-date-picker v-decorator="[ 'beginday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="endday">
          <a-date-picker v-decorator="[ 'endday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dkffje">
          <a-input placeholder="请输入dkffje" v-decorator="['dkffje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dkffbs">
          <a-input placeholder="请输入dkffbs" v-decorator="['dkffbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dkffhs">
          <a-input placeholder="请输入dkffhs" v-decorator="['dkffhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="shlx">
          <a-input placeholder="请输入shlx" v-decorator="['shlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="shbj">
          <a-input placeholder="请输入shbj" v-decorator="['shbj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="shbs">
          <a-input placeholder="请输入shbs" v-decorator="['shbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="shhs">
          <a-input placeholder="请输入shhs" v-decorator="['shhs', {}]" />
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
    name: "ModDkfxJgkhjldkshqkMVoModal",
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
          add: "/khjldkffshltj/modDkfxJgkhjldkshqkMVo/add",
          edit: "/khjldkffshltj/modDkfxJgkhjldkshqkMVo/edit",
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
          this.form.setFieldsValue(pick(this.model,'zhjgdm','jgdm','custid','dkffje','dkffbs','dkffhs','shlx','shbj','shbs','shhs'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
          this.form.setFieldsValue({beginday:this.model.beginday?moment(this.model.beginday):null})
          this.form.setFieldsValue({endday:this.model.endday?moment(this.model.endday):null})
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
            formData.beginday = formData.beginday?formData.beginday.format():null;
            formData.endday = formData.endday?formData.endday.format():null;
            
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