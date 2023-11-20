<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :keyboard="false"
    :maskClosable="false"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-decorator="[ 'tjyf', validatorRules.tjyf ]" style="width: 100%" :format="monthFormat" :disabled="model.acctNo != undefined"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="推广人编号">
              <a-input placeholder="请输入推广人编号" v-decorator="['tgh', validatorRules.tgh]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="卡号">
              <a-input placeholder="请输入卡号" v-decorator="['acctNo', validatorRules.acctNo ]" :disabled="model.acctNo != undefined" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['ctfcCd', validatorRules.ctfcCd]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['custName', validatorRules.custName]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="余额">
              <a-input-number placeholder="请输入余额" v-decorator="['balance', {}]" :min="0" style="width: 100%"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="逾期期数">
              <a-input-number placeholder="请输入逾期期数" v-decorator="['yqqs', {}]" :min="0" style="width: 100%"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DjkxxglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        defaultMonthOpera:'',
        monthFormat:'YYYY-MM',
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          acctNo:{rules: [{ required: true, message: '请输入卡号!' }]},
          tjyf:{rules: [{ required: true, message: '请选择统计月份!' }]},
          tgh:{rules: [{ required: true, message: '请输入推广人编号!' }]},
          ctfcCd:{rules: [{ required: true, message: '请输入证件号码!' }]},
          custName:{rules: [{ required: true, message: '请输入客户名称!' }]},
        },
        url: {
          add: "/djkxxgl/djkxxgl/add",
          edit: "/djkxxgl/djkxxgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'tgh','acctNo','custName','ctfcCd','putoutSum','balance','yqqs'))
          //时间格式化
          //this.form.setFieldsValue({putOutDate:this.model.putOutDate?moment(this.model.putOutDate):null})
          //this.form.setFieldsValue({maturity:this.model.maturity?moment(this.model.maturity):null})
          //this.form.setFieldsValue({minCalcDate:this.model.minCalcDate?moment(this.model.minCalcDate):null})
          //this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
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
            if(!this.model.acctNo && !this.model.tjyf){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            //formData.putOutDate = formData.putOutDate?formData.putOutDate.format():null;
            //formData.maturity = formData.maturity?formData.maturity.format():null;
            //formData.minCalcDate = formData.minCalcDate?formData.minCalcDate.format():null;
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.tjyf = formData.tjyf?moment(formData.tjyf).format("YYYY-MM") + '-01':null;

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              }else{
                that.$message.warning(res.message);
                that.model = {}
              }
            }).finally(() => {
              that.confirmLoading = false;
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