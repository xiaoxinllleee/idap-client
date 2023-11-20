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
          label="统计数据项标识">
          <a-input placeholder="请输入统计数据项标识" v-decorator="['tjbs', validatorRules.tjbs ]" :disabled="disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计数据项名称">
          <a-input placeholder="请输入统计数据项名称" v-decorator="['tjmc', validatorRules.tjmc ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="科目号">
          <a-input placeholder="请输入科目号" v-decorator="['kmh', validatorRules.kmh ]" :disabled="disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账符号">
          <j-dict-select-tag :triggerChange="true" placeholder="请选择记账符号" dictCode="abs" v-decorator="['ab', validatorRules.ad]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "KmtjszModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        disabled: true,
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
        tjbs:{rules: [{ required: true, message: '请输入统计数据项标识!' }]},
        tjmc:{rules: [{ required: true, message: '请输入统计数据项名称!' }]},
        kmh:{rules: [{ required: true, message: '请输入科目号!' }]},
        ad:{rules: [{ required: true, message: '请选择记账符号!' }]},
        },
        url: {
          add: "/kmtjsz/kmtjsz/add",
          edit: "/kmtjsz/kmtjsz/edit",
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
          this.form.setFieldsValue(pick(this.model,'tjbs','tjmc','kmh','ab'))
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
            if(!this.model.tjmc && !this.model.kmh){
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