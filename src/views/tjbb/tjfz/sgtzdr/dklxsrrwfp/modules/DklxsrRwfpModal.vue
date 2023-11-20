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
          <a-date-picker v-decorator="[ 'dataDate', validatorRules.dataDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgbm', validatorRules.jgbm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网点名称">
          <a-input placeholder="请输入网点名称" v-decorator="['wdmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="全年利息收入">
          <a-input placeholder="请输入全年利息收入" v-decorator="['qnlxsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="一季度利息收入">
          <a-input placeholder="请输入一季度利息收入" v-decorator="['jdlxsrOne', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="二季度利息收入">
          <a-input placeholder="请输入二季度利息收入" v-decorator="['jdlxsrTwo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="三季度利息收入">
          <a-input placeholder="请输入三季度利息收入" v-decorator="['jdlxsrThree', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="四季度利息收入">
          <a-input placeholder="请输入四季度利息收入" v-decorator="['jdlxsrFour', {}]" />
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="录入标识(0 导入 1 录入 2 修改)">-->
<!--          <a-input placeholder="请输入录入标识(0 导入 1 录入 2 修改)" v-decorator="['lrbz', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="录入人">-->
<!--          <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--          label="录入时间">-->
<!--          <a-date-picker v-decorator="[ 'lrsj', {}]" />-->
<!--        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DklxsrRwfpModal",
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
        dataDate:{rules: [{ required: true, message: '请输入数据日期!' }]},
        jgbm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        },
        url: {
          add: "/tjbb/tjfz/sgtzdr/dklxsrrwfp/dklxsrRwfp/add",
          edit: "/tjbb/tjfz/sgtzdr/dklxsrrwfp/dklxsrRwfp/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgbm','wdmc','qnlxsr','jdlxsrOne','jdlxsrTwo','jdlxsrThree','jdlxsrFour'))
		  //时间格式化
          this.form.setFieldsValue({dataDate:this.model.dataDate?moment(this.model.dataDate):null})
          // this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            if(!this.model.dataDate){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dataDate = formData.dataDate?formData.dataDate.format("YYYY-MM-DD"):null;
            // formData.lrsj = formData.lrsj?formData.lrsj.format():null;

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