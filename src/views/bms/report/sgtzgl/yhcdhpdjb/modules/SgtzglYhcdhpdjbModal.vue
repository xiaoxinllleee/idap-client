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
          label="签发机构名称">
          <j-tree-select
            v-decorator="['qfjgmc',{}]"
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
          label="银行承兑汇票">
          <a-input placeholder="请输入银行承兑汇票或有账户账号" v-decorator="['yhcdhphyzhzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票人名称">
          <a-input placeholder="请输入出票人名称" v-decorator="['cprmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出票人账号">
          <a-input placeholder="请输入出票人账号" v-decorator="['cprzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票面金额(元)">
          <a-input placeholder="请输入票面金额(元)" v-decorator="['pmje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="凭证号码">
          <a-input placeholder="请输入凭证号码" v-decorator="['pzhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签发日期">
          <a-date-picker v-decorator="[ 'qfrq', validatorRules.qfrq]" />
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
          label="未用注销日期">
          <a-date-picker v-decorator="[ 'wyzxrq', validatorRules.wyzxrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前状态">
          <a-input placeholder="请输入当前状态" v-decorator="['dqzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新银行承兑汇票号">
          <a-input placeholder="请输入新银行承兑汇票号" v-decorator="['xyhcdhph', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="兑付日期">
          <a-date-picker v-decorator="[ 'dfrq', validatorRules.dfrq]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金账号">
          <a-input placeholder="请输入保证金账号" v-decorator="['bzjzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金比例（%）">
          <a-input placeholder="请输入保证金比例（%）" v-decorator="['bzjbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证金金额(元)">
          <a-input placeholder="请输入保证金金额(元)" v-decorator="['bzjje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费比例（‰）">
          <a-input placeholder="请输入收费比例（‰）" v-decorator="['sfbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收费金额(元)">
          <a-input placeholder="请输入收费金额(元)" v-decorator="['sfje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人名称">
          <a-input placeholder="请输入收款人名称" v-decorator="['skrmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人账号">
          <a-input placeholder="请输入收款人账号" v-decorator="['skrzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款人行号">
          <a-input placeholder="请输入收款人行号" v-decorator="['skrhh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经办柜员">
          <a-input placeholder="请输入经办柜员" v-decorator="['jbgy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人">
          <a-input placeholder="请输入第一责任人" v-decorator="['dyzrr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否发生垫款">
          <a-input placeholder="请输入是否发生垫款" v-decorator="['sffsdk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="垫款账号">
          <a-input placeholder="请输入垫款账号" v-decorator="['dkzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编号">
          <a-input placeholder="请输入业务编号" v-decorator="['ywbh', {}]" />
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
    name: "SgtzglYhcdhpdjbModal",
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
          qfrq: { rules: [{ required: true, message: '请选择签发日期!' }] },
          dqrq: { rules: [{ required: true, message: '请选择到期日期!' }] },
          wyzxrq: { rules: [{ required: true, message: '请选择未用注销日期!' }] },
          dfrq: { rules: [{ required: true, message: '请选择兑付日期!' }] },
        },
        url: {
          add: "/yhcdhpdjb/sgtzglYhcdhpdjb/add",
          edit: "/yhcdhpdjb/sgtzglYhcdhpdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'xh','fiscalDate','qfjgmc','yhcdhphyzhzh','cprmc','cprzh','pmje','pzhm','qfrq','dqrq','wyzxrq','dqzt','xyhcdhph','dfrq','bzjzh','bzjbl','bzjje','sfbl','sfje','skrmc','skrzh','skrhh','jbgy','dyzrr','sffsdk','dkzh','ywbh'))
		  //时间格式化
          this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
          this.form.setFieldsValue({qfrq:this.model.qfrq?moment(this.model.qfrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
          this.form.setFieldsValue({zxrq:this.model.zxrq?moment(this.model.zxrq):null})
          this.form.setFieldsValue({dfrq:this.model.dfrq?moment(this.model.dfrq):null})
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
            formData.qfrq = formData.qfrq?formData.qfrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.zxrq = formData.zxrq?formData.zxrq.format():null;
            formData.dfrq = formData.dfrq?formData.dfrq.format():null;
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