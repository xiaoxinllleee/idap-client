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
          label="户名">
          <a-input placeholder="请输入户名" v-decorator="['hm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号">
          <a-input placeholder="请输入账号" v-decorator="['zh', validatorRules.zh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="代理机构">
          <a-input placeholder="请输入代理机构" v-decorator="['dljg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="代理机构名称">
          <a-input placeholder="请输入代理机构名称" v-decorator="['dljgmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', validatorRules.jgdm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <a-input placeholder="请输入机构名称" v-decorator="['jgmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="科目号">
          <a-input placeholder="请输入科目号" v-decorator="['kmh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="科目号名称">
          <a-input placeholder="请输入科目号名称" v-decorator="['kmmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易日期">
          <a-date-picker v-decorator="[ 'jyrq', validatorRules.jyrq ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易时间">
          <a-input placeholder="请输入交易时间" v-decorator="['jysj', validatorRules.jysj ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码">
          <a-input placeholder="请输入交易码" v-decorator="['jym', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易码名称">
          <a-input placeholder="请输入交易码名称" v-decorator="['jymmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额">
          <a-input placeholder="请输入交易金额" v-decorator="['jyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户余额">
          <a-input placeholder="请输入账户余额" v-decorator="['zhye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借贷标志">
          <a-input placeholder="请输入借贷标志" v-decorator="['jdbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账柜员号">
          <a-input placeholder="请输入记账柜员号" v-decorator="['jzgy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账柜员名称">
          <a-input placeholder="请输入记账柜员名称" v-decorator="['jzgymc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核柜员号">
          <a-input placeholder="请输入复核柜员号" v-decorator="['fhgy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="复核柜员名称">
          <a-input placeholder="请输入复核柜员名称" v-decorator="['fhgymc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对应账号">
          <a-input placeholder="请输入对应账号" v-decorator="['dyzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对应账号户名">
          <a-input placeholder="请输入对应账号户名" v-decorator="['dyzhhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="积数">
          <a-input placeholder="请输入积数" v-decorator="['zhjs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="摘要">
          <a-input placeholder="请输入摘要" v-decorator="['zy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="柜员流水">
          <a-input placeholder="请输入柜员流水" v-decorator="['gylsh', {}]" />
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
    name: "LyzhJyjsChangeModal",
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
        zh:{rules: [{ required: true, message: '请输入账号!' }]},
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        jyrq:{rules: [{ required: true, message: '请输入交易日期!' }]},
        jysj:{rules: [{ required: true, message: '请输入交易时间!' }]},
        },
        url: {
          add: "/sjxf/hxxt/lslscx/lyzhJyjsChange/add",
          edit: "/sjxf/hxxt/lslscx/lyzhJyjsChange/edit",
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
          this.form.setFieldsValue(pick(this.model,'hm','zh','dljg','dljgmc','jgdm','jgmc','kmh','kmmc','jysj','jym','jymmc','jyje','zhye','jdbz','jzgy','jzgymc','fhgy','fhgymc','dyzh','dyzhhm','zhjs','zy','gylsh'))
		  //时间格式化
          this.form.setFieldsValue({jyrq:this.model.jyrq?moment(this.model.jyrq):null})
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
            formData.jyrq = formData.jyrq?formData.jyrq.format():null;

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