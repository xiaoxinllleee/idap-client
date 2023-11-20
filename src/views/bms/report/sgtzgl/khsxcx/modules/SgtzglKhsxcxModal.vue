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
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['xh', {}]" />
        </a-form-item>
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
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册号码">
          <a-input placeholder="请输入注册号码" v-decorator="['zchm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户号">
          <a-input placeholder="请输入客户号" v-decorator="['khh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务品种编号">
          <a-input placeholder="请输入业务品种编号" v-decorator="['ywpzbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务品种名称">
          <a-input placeholder="请输入业务品种名称" v-decorator="['ywpzmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信开始日期">
          <a-date-picker v-decorator="[ 'sxksrq', validatorRules.sxksrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信到期日期">
          <a-date-picker v-decorator="[ 'sxdqrq', validatorRules.sxdqrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信种类">
          <a-input placeholder="请输入授信种类" v-decorator="['sxzl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部授信额度">
          <a-input placeholder="请输入内部授信额度" v-decorator="['nbsxed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部授信已使用额度">
          <a-input placeholder="请输入内部授信已使用额度" v-decorator="['nbsxysyed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部授信冻结额度">
          <a-input placeholder="请输入内部授信冻结额度" v-decorator="['nbsxdjed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公开授信额度">
          <a-input placeholder="请输入公开授信额度" v-decorator="['gksxed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公开授信已使用额度">
          <a-input placeholder="请输入公开授信已使用额度" v-decorator="['gksxysyed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公开授信冻结额度">
          <a-input placeholder="请输入公开授信冻结额度" v-decorator="['gksxdjed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主客户经理">
          <a-input placeholder="请输入主客户经理" v-decorator="['zkhjl', {}]" />
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
    name: "SgtzglKhsxcxModal",
    components:{
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
          sxksrq: { rules: [{ required: true, message: '请选择授信开始日期!' }] },
          sxdqrq: { rules: [{ required: true, message: '请选择授信到期日期!' }] },
        },
        url: {
          add: "/khsxcx/sgtzglKhsxcx/add",
          edit: "/khsxcx/sgtzglKhsxcx/edit",
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
          this.form.setFieldsValue(pick(this.model,'xh','fiscalDate','jgmc','khmc','zchm','khh','ywpzbh','ywpzmc','sxzl','nbsxed','nbsxysyed','nbsxdjed','gksxed','gksxysyed','gksxdjed','zkhjl'))
		  //时间格式化
          this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
          this.form.setFieldsValue({sxksrq:this.model.sxksrq?moment(this.model.sxksrq):null})
          this.form.setFieldsValue({sxdqrq:this.model.sxdqrq?moment(this.model.sxdqrq):null})
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
            formData.sxksrq = formData.sxksrq?formData.sxksrq.format():null;
            formData.sxdqrq = formData.sxdqrq?formData.sxdqrq.format():null;

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