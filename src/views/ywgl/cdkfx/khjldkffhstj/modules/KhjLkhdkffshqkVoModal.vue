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
          label="sjywjgdm">
          <a-input placeholder="请输入sjywjgdm" v-decorator="['sjywjgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="custid">
          <a-input placeholder="请输入custid" v-decorator="['custid', validatorRules.custid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tjyf">
          <a-date-picker v-decorator="[ 'tjyf', validatorRules.tjyf ]" />
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
          label="dnffysh">
          <a-input placeholder="请输入dnffysh" v-decorator="['dnffysh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dnffwsh">
          <a-input placeholder="请输入dnffwsh" v-decorator="['dnffwsh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dnffyish">
          <a-input placeholder="请输入dnffyish" v-decorator="['dnffyish', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dnffdqshl">
          <a-input placeholder="请输入dnffdqshl" v-decorator="['dnffdqshl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yqnffysh">
          <a-input placeholder="请输入yqnffysh" v-decorator="['yqnffysh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yqnffwsh">
          <a-input placeholder="请输入yqnffwsh" v-decorator="['yqnffwsh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yqnffyish">
          <a-input placeholder="请输入yqnffyish" v-decorator="['yqnffyish', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yqnffdqshl">
          <a-input placeholder="请输入yqnffdqshl" v-decorator="['yqnffdqshl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lrsj">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lrbz">
          <a-input placeholder="请输入lrbz" v-decorator="['lrbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lrczy">
          <a-input placeholder="请输入lrczy" v-decorator="['lrczy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ffysh">
          <a-input placeholder="请输入ffysh" v-decorator="['ffysh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ffwsh">
          <a-input placeholder="请输入ffwsh" v-decorator="['ffwsh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ffyish">
          <a-input placeholder="请输入ffyish" v-decorator="['ffyish', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ffdqshl">
          <a-input placeholder="请输入ffdqshl" v-decorator="['ffdqshl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="jgdm">
          <a-input placeholder="请输入jgdm" v-decorator="['jgdm', {}]" />
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
    name: "KhjLkhdkffshqkVoModal",
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
        custid:{rules: [{ required: true, message: '请输入custid!' }]},
        tjyf:{rules: [{ required: true, message: '请输入tjyf!' }]},
        },
        url: {
          add: "/khjldkffhstj/khjLkhdkffshqkVo/add",
          edit: "/khjldkffhstj/khjLkhdkffshqkVo/edit",
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
          this.form.setFieldsValue(pick(this.model,'sjywjgdm','custid','dnffysh','dnffwsh','dnffyish','dnffdqshl','yqnffysh','yqnffwsh','yqnffyish','yqnffdqshl','lrbz','lrczy','ffysh','ffwsh','ffyish','ffdqshl','jgdm'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
          this.form.setFieldsValue({beginday:this.model.beginday?moment(this.model.beginday):null})
          this.form.setFieldsValue({endday:this.model.endday?moment(this.model.endday):null})
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
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            formData.beginday = formData.beginday?formData.beginday.format():null;
            formData.endday = formData.endday?formData.endday.format():null;
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