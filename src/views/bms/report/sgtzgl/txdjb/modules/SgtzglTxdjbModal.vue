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
          <a-date-picker v-decorator="[ 'fiscalDate', validatorRules.fiscalDate]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <j-tree-select
            v-decorator="['jgmc',{}]"
            placeholder="请选择机构"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号">
          <a-input placeholder="请输入账号" v-decorator="['zh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据号码">
          <a-input placeholder="请输入票据号码" v-decorator="['pjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据金额">
          <a-input placeholder="请输入票据金额" v-decorator="['pjje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现金额">
          <a-input placeholder="请输入贴现金额" v-decorator="['txxj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现余额">
          <a-input placeholder="请输入贴现余额" v-decorator="['txje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现日期">
          <a-date-picker v-decorator="[ 'txrq', validatorRules.txrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', validatorRules.dqrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票据状态">
          <a-input placeholder="请输入票据状态" v-decorator="['pjzt', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "SgtzglTxdjbModal",
    components: {
      JTreeSelect
    },
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
          fiscalDate: { rules: [{ required: true, message: '请选择数据日期!' }] },
          txrq: { rules: [{ required: true, message: '请选择贴现日期!' }] },
          dqrq: { rules: [{ required: true, message: '请选择到期日期!' }] },
        },
        url: {
          add: "/txdjb/sgtzglTxdjb/add",
          edit: "/txdjb/sgtzglTxdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgmc','zh','khmc','pjhm','pjje','txxj','txje','pjzt'))
		  //时间格式化
          this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
          this.form.setFieldsValue({txrq:this.model.txrq?moment(this.model.txrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
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
            formData.fiscalDate = formData.fiscalDate ? formData.fiscalDate.format() : null
            formData.txrq = formData.txrq?formData.txrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;

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