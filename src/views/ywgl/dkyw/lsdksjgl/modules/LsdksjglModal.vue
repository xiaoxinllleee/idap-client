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
          label="客户经理标识">
          <a-input placeholder="请输入客户经理标识" v-decorator="['custManagerId', {}]" />
          <!--<j-dict-select-tag placeholder="请选择客户经理"v-decorator="['custManagerId']"  :triggerChange="true" dict-code="HR_BAS_STAFF,YGXM||KHJLBH,KHJLBH,KHJLBH IS NOT NULL" :show-search="true"/>-->

        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <j-tree-select
            v-decorator="['org',validatorRules.org]"
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
          label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['acctNo', validatorRules.acctNo]"  :disabled="flag=='edit'" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['custName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['ctfcCd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款发放日期">
          <a-date-picker v-decorator="[ 'putOutDate',  validatorRules.putOutDate]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款到期日期">
          <a-date-picker v-decorator="[ 'maturity',  validatorRules.maturity]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最早欠息日期">
          <a-date-picker v-decorator="[ 'qxDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款发放金额">
          <a-input placeholder="请输入贷款发放金额" v-decorator="['putoutSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="记账科目">
          <a-input placeholder="请输入记账科目" v-decorator="['jzkm', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "LsdksjglModal",
    components:{ JTreeSelect },
    data () {
      return {
        flag:'add',
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
        disableSubmit: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          org:{rules: [{ required: true, message: '请输入网点号/发放机构/机构代号!' }]},
          acctNo:{rules: [{ required: true, message: '请输入贷款账号!' }]},
          putOutDate:{rules: [{ required: true, message: '请选择发放日期!' }]},
          maturity:{rules: [{ required: true, message: '请选择发放日期!' }]},

        },
        url: {
          add: "/lsdksjgl/lsdksjgl/add",
          edit: "/lsdksjgl/lsdksjgl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.flag='add';
        this.edit({});
      },
      edit (record) {
        if(record.acctNo){
          this.flag='edit';
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'custManagerId','acctNo','custName','ctfcCd','putoutSum','jzkm','org','putOutDate','maturity','qxDate'))
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
            if(this.flag=='add'){
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