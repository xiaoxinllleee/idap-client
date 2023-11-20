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
          label="员工姓名">
          <j-select-ygxx type="radio" v-decorator="['jobnumber_dictText', validatorRules.jobnumber ]" @change="ygxxChange"></j-select-ygxx>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['jobnumber', validatorRules.jobnumber ]" disabled/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['acctNo', validatorRules.acctNo ,validatorRules.acctNo ]" :disabled="flag=='edit'" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['balance', validatorRules.balance ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核销日期">
          <a-date-picker v-decorator="[ 'hxrq', ,validatorRules.hxrq]" :format="dateFormat" style="width: 100%" />
        </a-form-item>

      </a-form>
    </a-spin>
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import AccountInfo from './AccountInfo'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "HxdkglModal",
    components: { JTreeSelect,AccountInfo,JSelectYgxx },
    data () {
      return {
        flag:'add',
        defaultDate:'',
        dateFormat: 'YYYY-MM-DD',
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
        record:{
          jobnumber:'',
          jobnumber_dictText:''
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          acctNo:{rules: [{ required: true, message: '请输入贷款账号!' }]},
          jobnumber:{rules: [{ required: true, message: '请选择员工!' }]},
           hxrq:{rules: [{ required: true, message: '请选择核销日期!' }]},
        },
        url: {
          add: "/hxdkgl/hxdkgl/add",
          edit: "/hxdkgl/hxdkgl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      FindBack(){
        this.$refs.accountInfo.init()
      },
      add () {
        this.flag='add';
        const year = new Date().getFullYear()
        const mounth = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
        const date = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
        const dateStr=year+'-'+mounth+'-'+date;
        this.visible=true;
        this.$nextTick(() => {
          this.form.setFieldsValue({
            hxrq: moment(dateStr, this.dateFormat)
          })
        });

      },
      ygxxChange(ygxx) {
        console.log('ygxxChange', ygxx)
        this.form.setFieldsValue({jobnumber: ygxx.yggh})
        this.form.setFieldsValue({ygxm: ygxx.ygxm})

      },
      edit (record) {
        this.flag='edit';

        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jobnumber','acctNo','balance','hxrq','jobnumber_dictText'))
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.form.resetFields()
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
            formData.hxrq = formData.hxrq?formData.hxrq.format():null;
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

      colseWindow(args){
        this.record.jobnumber = args.jobnumber
        this.record.jobnumber_dictText = args.jobnumber_dictText
        this.model = Object.assign({}, this.record)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jobnumber','jobnumber_dictText'))  // loadsh的pick方法
        })
      }


    }
  }
</script>

<style lang="less" scoped>

</style>