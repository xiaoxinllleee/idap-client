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
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="节点目录">
          <a-input placeholder="请输入节点id" v-decorator="['jdid', validatorRules.jdid ]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务名称">
          <a-input hidden="true" placeholder="请输入节点id" v-decorator="['jdid', validatorRules.jdid ]" />

          <a-input placeholder="请输入任务名称" v-decorator="['rwmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务存储过程">
          <a-input placeholder="请输入任务存储过程" v-decorator="['rwgc', {}]" />
        </a-form-item>

        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用">
          <a-input placeholder="请输入是否启用" v-decorator="['sfqy', {}]" />
        </a-form-item>-->
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一次执行时间">
          <a-date-picker v-decorator="[ 'zjyczxsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一次执行状态">
          <a-input placeholder="请输入最近一次执行状态" v-decorator="['zjyczxzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近一次执行耗时">
          <a-input placeholder="请输入最近一次执行耗时" v-decorator="['zjyczxhs', {}]" />
        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DpJdrwglModal",
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
        jdid:{rules: [{ required: true, message: '请输入节点id!' }]},
        },
        url: {
          add: "/system/dpJdrwgl/add",
          edit: "/system/dpJdrwgl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add (jdid) {
        this.edit({jdid:jdid});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'rwmc','rwgc','jdid','sfqy','zjyczxzt','zjyczxhs'))
		  //时间格式化
          this.form.setFieldsValue({zjyczxsj:this.model.zjyczxsj?moment(this.model.zjyczxsj):null})
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
            formData.zjyczxsj = formData.zjyczxsj?formData.zjyczxsj.format():null;

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