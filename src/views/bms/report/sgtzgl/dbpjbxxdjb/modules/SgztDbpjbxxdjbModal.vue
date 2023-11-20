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
            placeholder="请选择机构名称"
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
          label="入库日期">
          <a-date-picker v-decorator="[ 'rkrq',validatorRules.rkrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出库日期">
          <a-date-picker v-decorator="[ 'ckrq', validatorRules.ckrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品编号">
          <a-input placeholder="请输入担保品编号" v-decorator="['dbpbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品大类">
          <a-input placeholder="请输入担保品大类" v-decorator="['dbpdl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品细类（按三级分类）">
          <a-input placeholder="请输入担保品细类（按三级分类）" v-decorator="['dbpxl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵质押人名称">
          <a-input placeholder="请输入抵质押人名称" v-decorator="['dzyrmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵质押人证件号码">
          <a-input placeholder="请输入抵质押人证件号码" v-decorator="['dzyrzjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保品状态">
          <a-input placeholder="请输入担保品状态" v-decorator="['dbpzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记权利价值之和（元）">
          <a-input placeholder="请输入登记权利价值之和（元）" v-decorator="['djqljzzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同开始日期">
          <a-date-picker v-decorator="[ 'htksrq', validatorRules.htksrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同结束日期">
          <a-date-picker v-decorator="[ 'htjsrq', validatorRules.htjsrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人名称">
          <a-input placeholder="请输入借款人名称" v-decorator="['jkrmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额（元）">
          <a-input placeholder="请输入贷款余额（元）" v-decorator="['dkye', {}]" />
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
    name: "SgztDbpjbxxdjbModal",
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
          htksrq: { rules: [{ required: true, message: '请选择合同开始日期!' }] },
          htjsrq: { rules: [{ required: true, message: '请选择合同结束日期!' }] },
          rkrq: { rules: [{ required: true, message: '请选择入库日期!' }] },
          ckrq: { rules: [{ required: true, message: '请选择出库日期!' }] },
        },
        url: {
          add: "/dbpjbxxdjb/sgztDbpjbxxdjb/add",
          edit: "/dbpjbxxdjb/sgztDbpjbxxdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'xh','fiscalDate','jgmc','dbpbh','dbpdl','dbpxl','dzyrmc','dzyrzjhm','dbpzt','djqljzzh','jkrmc','zjhm','dkye'))
		  //时间格式化
          this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
          this.form.setFieldsValue({rkrq:this.model.rkrq?moment(this.model.rkrq):null})
          this.form.setFieldsValue({ckrq:this.model.ckrq?moment(this.model.ckrq):null})
          this.form.setFieldsValue({htksrq:this.model.htksrq?moment(this.model.htksrq):null})
          this.form.setFieldsValue({htjsrq:this.model.htjsrq?moment(this.model.htjsrq):null})
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
            formData.rkrq = formData.rkrq?formData.rkrq.format():null;
            formData.ckrq = formData.ckrq?formData.ckrq.format():null;
            formData.htksrq = formData.htksrq?formData.htksrq.format():null;
            formData.htjsrq = formData.htjsrq?formData.htjsrq.format():null;

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