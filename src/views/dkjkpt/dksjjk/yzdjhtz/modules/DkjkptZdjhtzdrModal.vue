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
          <a-month-picker v-decorator="[ 'sjrq', validatorRules.sjrq]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <j-tree-select
            v-decorator="['jgdm',validatorRules.jgdm]"
            placeholder="请选择机构名称"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
            :disabled="this.disabled"
          />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户姓名">
          <a-input placeholder="请输入客户姓名" v-decorator="['khxm', validatorRules.khxm]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', validatorRules.zjhm]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签订类型">
          <j-dict-select-tag   v-decorator="['qdlx', validatorRules.qdlx]" :triggerChange="true" dictCode="qdlx" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款频率">
          <j-dict-select-tag   v-decorator="['hkpl', validatorRules.hkpl]" :triggerChange="true" dictCode="ywltj_tjwd" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划还款金额">
          <a-input placeholder="请输入计划还款金额" v-decorator="['jhkkjg', validatorRules.jhkkjg]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划还款截止日期">
          <a-date-picker placeholder="请输入计划还款截止日期" v-decorator="['jhhkjzrq', {}]" style="width: 100%;"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
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
    name: "DkjkptZdjhtzdrModal",
    components:{
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
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
          sjrq:{rules: [{ required: true, message: '请选择数据日期!' }]},
          jgdm:{rules: [{ required: true, message: '请选择机构名称!' }]},
          khxm:{rules: [{ required: true, message: '请输入客户姓名!' }]},
          zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
          qdlx:{rules: [{ required: true, message: '请选择签订类型!' }]},
          hkpl:{rules: [{ required: true, message: '请选择还款频率!' }]},
          jhkkjg:{rules: [{ required: true, message: '请输入计划还款金额!' }]},
        },
        url: {
          add: "/zdjhtzdr/dkjkptZdjhtzdr/add",
          edit: "/zdjhtzdr/dkjkptZdjhtzdr/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','khxm','zjhm','qdlx','hkpl','jhkkjg','jhhkjzrq','bz','lrr'))
		  //时间格式化
          this.form.setFieldsValue({sjrq:this.model.sjrq?moment(this.model.sjrq):null})
          this.form.setFieldsValue({jhhkjzrq:this.model.jhhkjzrq?moment(this.model.jhhkjzrq):null})
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
            if(!this.model.sjrq && !this.model.jgdm && !this.model.zjhm && !this.model.qdlx && !this.model.hkpl){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.sjrq = formData.sjrq?formData.sjrq.format('YYYY-MM-01'):null;
            formData.jhhkjzrq = formData.jhhkjzrq?formData.jhhkjzrq.format('YYYYMMDD'):null;

            console.log(formData)
            console.log(formData.sjrq)

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