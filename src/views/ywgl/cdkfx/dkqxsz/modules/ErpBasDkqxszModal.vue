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
            label="组织标志">
            <j-tree-select placeholder="请选择组织" v-decorator="['zzbz', validatorRules.zzbz]"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            <!--<j-dict-select-tag :triggerChange="true"  v-decorator="['zzbz', validatorRules.zzbz]" dicCode = "zzbz" placeholder="全部"-->
                               <!--dictCode="Hr_bas_organization,zzjc,zzbz" />-->
          </a-form-item>
        </div>
        <div v-else="flag">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="组织标志">
            <j-dict-select-tag :triggerChange="true" disabled="disabled" v-decorator="['zzbz', validatorRules.zzbz]" dicCode = "zzbz" placeholder="全部"
                               dictCode="Hr_bas_organization,zzjc,zzbz"/>
          </a-form-item>
        </div>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单笔贷款限额">
          <a-input placeholder="请输入单笔贷款限额" v-decorator="['dbdkxe', validatorRules.dbdkxe ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户贷款限额">
          <a-input placeholder="请输入单户贷款限额" v-decorator="['dhdkxe',validatorRules.dhdkxe]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有效标识">
          <j-dict-select-tag :triggerChange="true" v-decorator="['yxbz', validatorRules.yxbz]" dictCode="yxbz"/>
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
    name: "ErpBasDkqxszModal",
    components : {
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        flag:false,
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
        zzbz:{rules: [{ required: true, message: '请输入组织标志!' }]},
        dbdkxe:{rules: [{ required: true, message: '请输入单笔贷款限额!' }]},
        dhdkxe:{rules: [{ required: true, message: '请输入组织标志!' }]},
        yxbz:{rules: [{ required: true, message: '请输入组织标志!' }]},
        },
        url: {
          add: "/dkqxsz/erpBasDkqxsz/add",
          edit: "/dkqxsz/erpBasDkqxsz/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.flag=true
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zzbz','dbdkxe','dhdkxe','yxbz'))
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
            if(!this.model.zzbz){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
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