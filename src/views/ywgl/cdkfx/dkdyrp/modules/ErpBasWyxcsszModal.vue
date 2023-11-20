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
        <div v-if="flag">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="参数编码">
            <a-input placeholder="请输入参数编码" v-decorator="['csbm', validatorRules.csbm ]" />
          </a-form-item>
        </div>
        <div v-else="flag">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="参数编码">
            <a-input placeholder="请输入参数编码" disabled="disabled" v-decorator="['csbm', validatorRules.csbm ]" />
          </a-form-item>
        </div>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="参数名称">
          <a-input placeholder="请输入参数名称" v-decorator="['csmc', validatorRules.csmc]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始日期">
          <a-input placeholder="请输入开始日期" v-decorator="['ksrq',  validatorRules.ksrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-input placeholder="请输入结束日期" v-decorator="['jsrq',  validatorRules.jsrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="启用标识">
          <j-dict-select-tag :triggerChange="true" v-decorator="['qybz', validatorRules.qybz]"  dictCode="qybz1"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否跨月">
          <j-dict-select-tag :triggerChange="true" v-decorator="['sfky', validatorRules.sfky]" dictCode="sfky"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction,getAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"

export default {
  name: "ErpBasWyxcsszModal",

  data () {
    return {
      title:"操作",
      visible: false,
      queryParams:{},
      flag:false,
      model: {},
      judge:{},
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
        csbm:{rules: [{ required: true, message: '参数编号不能为空!' }]},
        csmc:{rules: [{ required: true, message: '参数名称不能为空!' }]},
        ksrq:{rules: [{ required: true, message: '开始日期不能为空!' }]},
        jsrq:{rules: [{ required: true, message: '结束日期不能为空!' }]},
        qybz:{rules: [{ required: true, message: '启动标识不能为空!' }]},
        sfky:{rules: [{ required: true, message: '是否跨月不能为空!' }]},

      },
      url: {
        add: "/dkdyrp/erpBasWyxcssz/add",
        edit: "/dkdyrp/erpBasWyxcssz/edit",
      },
    }
  },
  created () {
  },
  methods: {
    add () {
      this.flag=true;
      this.edit({});
    },
    edit (record) {
      this.form.resetFields();
      this.model = Object.assign({}, record);
      if(this.model.qybz!=null) {
        this.model.qybz = this.model.qybz + '';
      }
      if(this.model.sfky) {
        this.model.sfky = this.model.sfky + '';
      }
      this.visible = true;
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,'csbm','csmc','ksrq','jsrq','qybz','sfky','lrbz','lrr'))
        //时间格式化
        //this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
      });

    },
    close () {
      this.$emit('close');
      this.visible = false;
      this.flag=false;
    },
    handleOk () {
      const that = this;
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true;
          let httpurl = '';
          let method = '';
          if(!this.model.csbm){
            httpurl+=this.url.add;
            method = 'post';
          }else{
            httpurl+=this.url.edit;
            method = 'put';
          }
          let formData = Object.assign(this.model, values);
          //时间格式化
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