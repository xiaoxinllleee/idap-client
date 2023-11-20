<template>
  <a-modal :title="title"
           :width="1000"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组织机构">
          <!--<j-tree-select placeholder="请选择机构名称" v-decorator="['jgdm', validatorRules.jgdm]"  dict="hr_bas_organization, zzjc, ywjgdm"
                         :showSearch="true" :treeDefaultExpandAll="true"
                         pid-field="sjzzbz" treeNodeFilterProp="title" :getAllZzjg="allZzjg"></j-tree-select>-->
          <j-tree-select placeholder="请选择支行" v-decorator="['jgdm', validatorRules.jgdm]"
                         dict="v_hr_bas_organization_cmms,zzjc,ywjgdm" pidField="sjywjgdm"
                         treeNodeFilterProp="title"
                         :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否电子发票">
          <j-dict-select-tag v-decorator="['sfdzfp', validatorRules.sfdzfp]" :triggerChange="true" placeholder="请选择是否店子发票" dictCode="sfbz"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="开票日期">
          <a-date-picker v-decorator="[ 'kprq', validatorRules.kprq]" style="width: 100%"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="货物或应税劳务、服务名称">
          <a-input placeholder="请输入货物或应税劳务、服务名称" v-decorator="['fwmc', validatorRules.fwmc]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="发票号码">
          <a-input placeholder="请输入发票号码" v-decorator="['fphm', validatorRules.fphm ]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="发票代码">
          <a-input placeholder="请输入发票代码" v-decorator="['hydm', validatorRules.hydm ]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="价税合计金额">
          <a-input placeholder="请输入价税合计金额" v-decorator="['jshj', validatorRules.jshj]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="开票地区">
          <a-input placeholder="请输入开票地区" v-decorator="['kpdq', validatorRules.kpdq]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="销售方单位名称">
          <a-input placeholder="请输入销售方单位名称" v-decorator="['xsfdwmc', validatorRules.xsfdwmc]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="列账项目名称">
          <a-input placeholder="请输入列账项目名称" v-decorator="['lzxmmc', validatorRules.lzxmmc]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经办人">
          <a-input placeholder="请输入经办人" v-decorator="['jbr', validatorRules.jbr]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="记账人">
          <a-input placeholder="请输入记账人" v-decorator="['jzr', validatorRules.jzr]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remarks', {}]" />
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
    name: "ZzsfpxxModal",
    components:{ JTreeSelect },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        allZzjg: '1',
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        size: 'small',
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          jgdm: {rules: [{required: true, message: '请输入组织机构!'}]},
          sfdzfp: {rules: [{required: true, message: '请选择是否店子发票!'}]},
          kprq: {rules: [{required: true, message: '请输入开票日期!'}]},
          fwmc: {rules: [{required: true, message: '请输入货物或应税劳务、服务名称!'}]},
          fphm: {rules: [{required: true, message: '请输入发票号码!'}]},
          hydm: {rules: [{required: true, message: '请输入发票代码!'}]},
          jshj: {rules: [{required: true, message: '请输入价税合计金额!'}]},
          kpdq: {rules: [{required: true, message: '请输入开票地区!'}]},
          xsfdwmc: {rules: [{required: true, message: '请输入销售方单位名称!'}]},
          lzxmmc: {rules: [{required: true, message: '请输入列账项目名称!'}]},
          jbr: {rules: [{required: true, message: '请输入经办人!'}]},
          jzr: {rules: [{required: true, message: '请输入记账人!'}]},
        },
        url: {
          add: "/zzsfpxx/zzsfpxx/add",
          edit: "/zzsfpxx/zzsfpxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'hydm','fwmc','jshj','fphm','kpdq','xsfdwmc','lzxmmc','sfdzfp','jgdm','remarks','jzr','jbr'))
		  //时间格式化
          this.form.setFieldsValue({kprq:this.model.kprq?moment(this.model.kprq):null})
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({xgsj:this.model.xgsj?moment(this.model.xgsj):null})*/
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
            if(!this.model.fphm && !this.model.hydm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log(formData.kprq)
            //时间格式化
             formData.kprq = formData.kprq?formData.kprq.format("YYYY-MM-DD"):null;
            // formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            // formData.xgsj = formData.xgsj?formData.xgsj.format():null;

            console.log(formData)
            console.log(formData.kprq)
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