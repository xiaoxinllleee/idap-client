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
          label="数据日期">
          <a-date-picker v-decorator="[ 'sjrq', validatorRules.sjrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目代号">
          <a-input placeholder="请输入项目代号" v-decorator="['xmdh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目名称">
          <a-input placeholder="请输入项目名称" v-decorator="['xmmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期初借方余额">
          <a-input placeholder="请输入期初借方余额" v-decorator="['qcjfye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期初贷方余额">
          <a-input placeholder="请输入期初贷方余额" v-decorator="['qcdfye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期借方发生额">
          <a-input placeholder="请输入本期借方发生额" v-decorator="['bqjffse', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期贷方发生额">
          <a-input placeholder="请输入本期贷方发生额" v-decorator="['bqdffse', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期末借方余额">
          <a-input placeholder="请输入期末借方余额" v-decorator="['qmjfye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期末贷方余额">
          <a-input placeholder="请输入期末贷方余额" v-decorator="['qmdfye', {}]" />
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
    name: "SgtzCwbbywzkbModal",
    data () {
      return {
        bzlx:'',
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
          sjrq:{rules: [{ required: true, message: '请输入数据日期!' }]},
        },
        url: {
          add1: "/cwbbywzkbRmb/sgtzCwbbywzkbRmb/add",
          edit1: "/cwbbywzkbRmb/sgtzCwbbywzkbRmb/edit",

          add2: "/cwbbywzkbWzrmb/sgtzCwbbywzkbWzrmb/add",
          edit2: "/cwbbywzkbWzrmb/sgtzCwbbywzkbWzrmb/edit",

          add3: "/cwbbywzkb/sgtzCwbbywzkb/add",
          edit3: "/cwbbywzkb/sgtzCwbbywzkb/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add (num) {
        this.bzlx=num
        this.edit({},num);
      },
      edit (record,num) {
        this.form.resetFields();
        this.bzlx=num
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sjrq','xmdh','xmdh1','xmmc','qcjfye','qcdfye','bqjffse','bqdffse','qmjfye','qmdfye'))
		  //时间格式化
          this.form.setFieldsValue({sjrq:this.model.sjrq?moment(this.model.sjrq):null})
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
            console.log(this.bzlx,'=============')
            if (this.bzlx == 1){
              if(!this.model.id){
                httpurl+=this.url.add1;
                method = 'post';
              }else{
                httpurl+=this.url.edit1;
                method = 'put';
              }
            }else if (this.bzlx ==2){
              if(!this.model.id){
                httpurl+=this.url.add2;
                method = 'post';
              }else{
                httpurl+=this.url.edit2;
                method = 'put';
              }
            }else {
              if(!this.model.id){
                httpurl+=this.url.add3;
                method = 'post';
              }else{
                httpurl+=this.url.edit3;
                method = 'put';
              }
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.sjrq = formData.sjrq?formData.sjrq.format():null;
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok',this.bzlx);
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