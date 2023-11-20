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
          label="机构编码">
          <a-input placeholder="请输入机构编码" v-decorator="['jgbm', validatorRules.jgbm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期：各项贷款本期借方发生额">
          <a-input placeholder="请输入本期：各项贷款本期借方发生额" v-decorator="['bqGxdkBqjffse', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期：各项贷款本期借方发生额">
          <a-input placeholder="请输入上期：各项贷款本期借方发生额" v-decorator="['sqGxdkBqjffse', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上上期：各项贷款本期借方发生额">
          <a-input placeholder="请输入上上期：各项贷款本期借方发生额" v-decorator="['ssqGxdkBqjffse', {}]" />
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
    name: "GxdkBqJffseModal",
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
          jgbm:{rules: [{ required: true, message: '请输入机构编码!' }]},
        },
        url: {
          add: "/tjbb/tjfz/sgtzdr/gxdkBqJffse/add",
          edit: "/tjbb/tjfz/sgtzdr/gxdkBqJffse/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgbm','bqGxdkBqjffse','sqGxdkBqjffse','ssqGxdkBqjffse'))
		      //时间格式化
          this.form.setFieldsValue({dataDate:this.model.dataDate?moment(this.model.dataDate):null})
          //this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            if(this.opType === 'add'){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dataDate = formData.dataDate?formData.dataDate.format():null;
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;

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