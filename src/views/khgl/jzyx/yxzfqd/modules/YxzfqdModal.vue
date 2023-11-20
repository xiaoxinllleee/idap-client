<template>
  <a-modal
    :title="title"
    :width="1100"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', validatorRules.khmc]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="证件号码">
            <a-input placeholder="请输入证件号码" v-decorator="['zjhm', validatorRules.zjhm ]" />
          </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="电话号码">
              <a-input placeholder="请输入电话号码" v-decorator="['dhhm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="一卡通账号">
              <a-input placeholder="请输入一卡通账号" v-decorator="['yktzh', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="种植地址">
              <a-input placeholder="请输入种植地址" v-decorator="['zzdd', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="租赁稻田面积">
              <a-input placeholder="请输入租赁稻田面积" v-decorator="['zldtmj', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="补贴金额">
              <a-input placeholder="请输入补贴金额" v-decorator="['btje', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="镇办核实双季稻种植">
              <a-input placeholder="请输入镇办核实双季稻种植" v-decorator="['zbhssjdzz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="优先类型">
              <j-dict-select-tag placeholder="请选择优先类型" style="width: 100%;" v-decorator="['yxlx', validatorRules.yxlx]" :triggerChange="true" dictCode="jzyx_yxlx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="其他">
              <a-input placeholder="请输入其他" v-decorator="['qt', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "YxzfqdModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
          khmc:{rules: [{ required: true, message: '请输入客户名称!' }]},
          yxlx:{rules: [{ required: true, message: '请选择优先类型!' }]},
        },
        url: {
          add: "/jzyx/yxzfqd/add",
          edit: "/jzyx/yxzfqd/edit",
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
          this.form.setFieldsValue(pick(this.model,'khmc','zjhm','dhhm','yktzh','zzdd','zldtmj','btje','zbhssjdzz','yxlx','qt'))
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
            formData.htqsrq = formData.htqsrq?formData.htqsrq.format():null;
            formData.htdqrq = formData.htdqrq?formData.htdqrq.format():null;
            formData.qyrq = formData.qyrq?formData.qyrq.format():null;

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