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

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', validatorRules.jgdm ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户编号">
          <a-input placeholder="请输入客户编号" v-decorator="['khbh', validatorRules.khbh ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['zjlx', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最早开户日期">
          <a-date-picker v-decorator="[ 'zzkhrq', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="管户人">
          <a-input placeholder="请输入管户人" v-decorator="['ghr', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="管户比例">
          <a-input placeholder="请输入管户比例" v-decorator="['ghbl', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="录入标识">
          <a-input placeholder="请输入录入标识" v-decorator="['lrbz', {}]" />
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
    name: "WdyjSjyhkhghxxbModal",
    data () {
      return {
        title:"操作",
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
            jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
            khbh:{rules: [{ required: true, message: '请输入客户编号!' }]},
        },
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        url: {
          add: "/performance/sjyhkhghxx/add",
          edit: "/performance/sjyhkhghxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','khbh','khmc','zjlx','zjhm','ghr','ghbl','lrbz'))
		  //时间格式化
          this.form.setFieldsValue({zzkhrq:this.model.zzkhrq?moment(this.model.zzkhrq):null})
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
            formData.zzkhrq = formData.zzkhrq?formData.zzkhrq.format():null;
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