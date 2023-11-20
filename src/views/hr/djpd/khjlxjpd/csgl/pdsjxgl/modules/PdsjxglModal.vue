<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项ID">
          <a-input placeholder="请输入数据项ID" v-decorator="['sjxid', validatorRules.sjxid ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项名称">
          <a-input placeholder="请输入数据项名称" v-decorator="['sjxmc', validatorRules.sjxmc]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项维度">
          <j-dict-select-tag v-decorator="['sjxwd', validatorRules.sjxwd]" :triggerChange="true" placeholder="请选择数据项维度"
                             dictCode="rqwd"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据来源">
          <j-dict-select-tag v-decorator="['sjly', {}]" :triggerChange="true" placeholder="请选择数据来源"
                             dictCode="sjxsjly"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="执行顺序">
          <a-input placeholder="请输入执行顺序" v-decorator="['zxsx', {}]" />
        </a-form-item>
        <!--<a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="数据项取值SQL">
        <a-input placeholder="请输入数据项取值SQL" v-decorator="['sjxsql', {}]" />
      </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项SQL">
          <a-textarea placeholder="请输入数据项SQL" v-decorator="['sjxsql', {}]" :rows="10" />
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
    name: "PdsjxglModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: true,
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
        sjxid:{rules: [{ required: true, message: '请输入数据项ID!' }]},
        sjxwd:{rules: [{ required: true, message: '请输入数据项维度!' }]},
        sjxmc:{rules: [{ required: true, message: '请选择数据项名称!' }]},
        },
        url: {
          add: "/pdsjxgl/pdsjxgl/add",
          edit: "/pdsjxgl/pdsjxgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'sjxid','sjxmc','sjxwd','sjxsql','sjly','zxsx'))
		  //时间格式化
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
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
            if(!this.model.sjxid && !this.model.sjxwd){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            /*formData.lrsj = formData.lrsj?formData.lrsj.format():null;*/

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