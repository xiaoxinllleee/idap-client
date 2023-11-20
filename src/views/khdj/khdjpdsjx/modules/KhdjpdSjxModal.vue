<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :span="12" :gutter="6"><a-form-item label="是否启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="6"><a-form-item label="评定规则" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-switch checkedChildren="是" unCheckedChildren="否" @change="onChose_" v-model="visibleCheck_"/>
          </a-form-item></a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :span="12" :gutter="6"><a-form-item label="数据项维度" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <!--<j-dict-select-tag placeholder="请选择数据项维度" v-decorator="['sjxwd', validatorRules.sjxwd]" :triggerChange="true" dictCode="rqwd"/>-->
            <a-select placeholder="请选择数据项维度" v-decorator="['sjxwd', validatorRules.sjxwd]" style="width: 100%;" :disabled="readonlyFlag">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="MM">月</a-select-option>
              <a-select-option value="Q">季</a-select-option>
              <a-select-option value="YYYY">年</a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :span="12"><a-form-item label="数据项ID" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input placeholder="请输入数据项ID" v-decorator="['sjxid', validatorRules.sjxid]" :disabled="readonlyFlag"/>
          </a-form-item></a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :span="12"><a-form-item label="数据项名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <a-input placeholder="请输入数据项名称" v-decorator="['sjxmc', validatorRules.sjxmc]"/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="6"><a-form-item label="折算系数" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number placeholder="请输入折算系数" v-decorator="['zsxs', {}]" :min="0" style="width: 100%;" />
          </a-form-item></a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :span="12"><a-form-item label="执行顺序" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <a-input-number placeholder="请输入执行顺序" v-decorator="['zxsx', validatorRules.zxsx]" :min="0" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="6"><a-form-item/></a-col>
        </a-row>
        <a-row style="margin-top: -20px;">
          <a-col :span="24" :pull="2"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="计算SQL">
            <a-textarea placeholder="请输入计算SQL" v-decorator="['sjxsql', validatorRules.sjxsql]" :row="4" :readonly="readonlyFlag"/>
          </a-form-item></a-col>
        </a-row>
        <a-row style="margin-top: -20px;">
          <a-col :span="24" :pull="2"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="备注">
            <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]" :row="2"/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { duplicateCheck } from '../../../../api/api'

  export default {
    name: "KhdjpdSjxModal",
    data () {
      return {
        title:"操作",
        visible: false,
        visibleCheck: true,
        visibleCheck_: true,
        confirmLoading: false,
        disableSubmit: false,
        readonlyFlag: false,
        model: {},
        form: this.$form.createForm(this),
        sfqy: 1,
        sfpdgz: 1,
        okType: 'add',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        labelCol_A: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        wrapperCol_A: {
          xs: { span: 24 },
          sm: { span: 19 },
        },
        validatorRules:{
          sjxwd:{rules: [{required: true, message: '请选择数据项维度！'}]},
          sjxid: {rules: [
              { required: true, message: '请输入数据项ID!' },
              { validator: this.validataCode }
            ]},
          sjxmc:{rules: [{required: true, message: '请输入数据项名称！'}]},
          zsxs:{rules: [{required: false, message: '请输入折算系数！'}]},
          zxsx:{rules: [{required: true, message: '请输入执行顺序！'}]},
          sfpdgz:{rules: [{required: true, message: '请选择是否评定规则！'}]},
          sfqy:{rules: [{required: true, message: '请选择是否启用！'}]},
          sjxsql:{rules: [{required: false, message: '请输入数据项SQL！'}]},
        },
        url: {
          add: "/khdjpdsjx/khdjpdSjx/add",
          edit: "/khdjpdsjx/khdjpdSjx/edit",
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
        if (record.id){
          this.visibleCheck = (record.sfqy == 1) ? true : false;
          this.visibleCheck_ = (record.sfpdgz == 1) ? true : false;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.model.sfqy = this.sfqy;
        this.model.sfpdgz = this.sfpdgz;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'sjxid', 'sjxmc', 'sjxwd', 'zsxs', 'zxsx', 'sfqy', 'sfpdgz', 'sjxsql', 'bz'))
        });
      },
      onChose(checked) {
        if (checked) {
          this.sfqy = 1;
          this.visibleCheck = true;
        } else {
          this.sfqy = 2;
          this.visibleCheck = false;
        }
      },
      onChose_(checked) {
        if (checked) {
          this.sfpdgz = 1;
          this.visibleCheck_ = true;
        } else {
          this.sfpdgz = 2;
          this.visibleCheck_ = false;
        }
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
            console.log(formData)
            formData.sfqy = this.sfqy;
            formData.sfpdgz = this.sfpdgz;
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
      close () {
        this.$emit('close');
        this.visible = false;
      },
      validataCode: function(rule, value, callback) {
        var params = {
          tableName: 'KHDJ_DJPDSJX',
          fieldName: 'sjxid',
          fieldVal: value,
        }
        if (this.okType == "add") {
          if (params.fieldVal != null && params.fieldVal != 'undefined') {
            duplicateCheck(params).then((res) => {
              if (res.success) {
                callback()
              } else {
                callback(res.message)
              }
            });
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
    }
  }
</script>