<template>
  <a-modal :title="title"
           :width="900"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false" style="background-color: #FFF;">
          <a-row><a-col :span="12" :gutter="8"><a-form-item label="是否启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
          </a-form-item></a-col></a-row>
         <!-- <a-row>
          &lt;!&ndash;  <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="数据项维度" hasFeedback>
              <j-dict-select-tag placeholder="请选择数据项维度" v-decorator="['sjxwd', validatorRules.sjxwd]"
                                 dict-code="rqwd" :trigger-change="true"/>
            </a-form-item></a-col>&ndash;&gt;

          </a-row>-->
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="数据项ID" hasFeedback>
              <a-input placeholder="请输入数据项ID" v-decorator="['sjxid', validatorRules.sjxid ]"/>
            </a-form-item></a-col>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="数据项名称" hasFeedback>
              <a-input placeholder="请输入数据项名称" v-decorator="['sjxmc', validatorRules.sjxmc]"/>
            </a-form-item></a-col>
          </a-row>
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="数据来源" hasFeedback>
              <j-dict-select-tag placeholder="请选择数据来源" v-decorator="['sjly', {}]"
                                 dict-code="sjly" :trigger-change="true"/>
            </a-form-item></a-col>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="执行顺序" hasFeedback>
              <a-input-number placeholder="请输入执行顺序" v-decorator="['zxsx', validatorRules.zxsx]" :min="0" :max="100" style="width: 267px;"/>
            </a-form-item></a-col>
          </a-row>
          <a-row>
            <a-col :span="12" :gutter="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型" hasFeedback>
            <j-dict-select-tag placeholder="请选择客户类型" v-decorator="['khlx', validatorRules.khlx]" dict-code="khlx" :trigger-change="true"/>
          </a-form-item></a-col></a-row>
          <a-row style="margin-top: -20px;"><a-col :span="24" :pull="2">
            <a-form-item :labelCol="{ xs: { span: 24 }, sm: { span: 5 } }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" label="数据项SQL">
              <a-textarea placeholder="请输入数据项SQL" v-decorator="['sjxsql', validatorRules.sjxsql]" :row="2"/>
            </a-form-item>
          </a-col></a-row>
          <a-row style="margin-top: -20px;"><a-col :span="24" :pull="2">
            <a-form-item :labelCol="{ xs: { span: 24 }, sm: { span: 5 } }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" label="备注">
              <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]" :row="2"/>
            </a-form-item>
          </a-col></a-row>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "PjsxSjxxxModal",
    data () {
      return {
        title:"操作",
        visible: false,
        visibleCheck: true,
        confirmLoading: false,
        model: {},
        status: 1,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules:{
          sjxwd:{rules: [{ required: true, message: '请选择数据项维度！' }]},
          khlx:{rules: [{ required: true, message: '请选择客户类型！' }]},
          sjxid:{rules: [{ required: true, message: '请输入数据项ID！' }]},
          sjxmc:{rules: [{ required: true, message: '请输入数据项名称！' }]},
          zxsx:{rules: [{ required: true, message: '请输入执行顺序！' }]},
          sjxsql:{rules: [{ required: true, message: '请输入数据项SQL！' }]}
        },
        url: {
          add: "/pjsxsjx/pjsxSjxxx/add",
          edit: "/pjsxsjx/pjsxSjxxx/edit",
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
        if (record.id) {
          this.visibleCheck = (record.status == 1) ? true : false;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.model.status = this.status;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sjxid','sjxmc','sjxwd','status','zxsx','sjly','bz','khlx','sjxsql'))
        });
      },
      onChose(checked) {
        if (checked) {
          this.status = 1;
          this.visibleCheck = true;
        } else {
          this.status = 2;
          this.visibleCheck = false;
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
            formData.status = this.status;
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
    }
  }
</script>

<style lang="less" scoped>

</style>