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
          label="组织标识">
          <j-tree-select
            v-decorator="['zzbz',{}]"
            placeholder="请选择组织标识"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
            :disabled="true"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位标识">
          <j-dict-select-tag
            v-decorator="['gwbz',{}]"
            placeholder="全部"
            dictCode="Hr_bas_post,gwmc,gwbz"
            :triggerChange="true"
            :disabled="true"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理标识">
          <a-input placeholder="请输入客户经理标识" v-decorator="['khjlbz', {}]" :disabled="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="会计证">
          <!--<a-input placeholder="请输入会计证" v-decorator="['kjz', {}]" />-->
          <j-dict-select-tag placeholder="请选择会计证" v-decorator="['kjz', {}]" :triggerChange="true" dictCode="ywbz"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银行业从业资格证">
          <!--<a-input placeholder="请输入银行业从业资格证" v-decorator="['yhycyzgz', {}]" />-->
          <j-dict-select-tag placeholder="请选择银行业从业资格证" v-decorator="['yhycyzgz', {}]" :triggerChange="true" dictCode="ywbz"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算机操作证">
          <!--<a-input placeholder="请输入计算机操作证" v-decorator="['jsjczz', {}]" />-->
          <j-dict-select-tag placeholder="请选择计算机操作证" v-decorator="['jsjczz', {}]" :triggerChange="true" dictCode="ywbz"/>
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
    name: "GwzzpfModal",
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
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        gwbz:{rules: [{ required: true, message: '请输入岗位标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        },
        url: {
          add: "/gwzzpf/gwzzpf/add",
          edit: "/gwzzpf/gwzzpf/edit",
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
          this.form.setFieldsValue(pick(this.model,'zzbz','gwbz','yggh','khjlbz','kjz','yhycyzgz','jsjczz'))
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
            if(!this.model.zzbz && !this.model.gwbz && !this.model.yggh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
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