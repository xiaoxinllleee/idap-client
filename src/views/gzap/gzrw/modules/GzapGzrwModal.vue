<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal cancelText="关闭"
           :title="title"
           :width="900"
           :visible="visible"
           :confirm-loading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false">
          <a-row :gutter="24">
            <a-col :md="12" :sm="8"><a-form-item label="任务名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input placeholder="工作任务/任务名称" v-decorator="['rwmc', {}]" disabled/>
            </a-form-item></a-col>
            <a-col :md="12" :sm="8"><a-form-item label="任务类型" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <j-dict-select-tag placeholder="工作任务/任务类型" dict-code="gzap_rwlx" v-decorator="['rwlx', {}]" disabled/></a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="8"><a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-date-picker placeholder="工作任务/开始时间" v-decorator="['kssj', {}]" style="width: 100%;" disabled/>
            </a-form-item></a-col>
            <a-col :md="12" :sm="8"><a-form-item label="结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-date-picker placeholder="工作任务/结束时间" v-decorator="['jssj', {}]" style="width: 100%;" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="8"><a-form-item label="任务状态" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <j-dict-select-tag placeholder="工作任务/任务状态" dict-code="gzap_rwxfzt" v-decorator="['rwzt', {}]" disabled/>
            </a-form-item></a-col>
            <a-col :md="12" :sm="8"><a-form-item label="重要级别" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <j-dict-select-tag placeholder="工作任务/重要级别" dict-code="gzap_zyjb" v-decorator="['zyjb', {}]" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="8"><a-form-item label="任务值" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input disabled placeholder="工作任务/任务值" v-decorator="['rwz', {}]"/>
            </a-form-item></a-col>
            <a-col :md="12" :sm="8"><a-form-item label="完成值" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input-number placeholder="请填写完成值" :min="0" v-model="value" v-decorator="['wcz', validatorRules.wcz]" style="width: 240px;"/>
            </a-form-item></a-col>
          </a-row>
          <a-row style="margin-top: -20px;">
            <a-col :span="24" :pull="2"><a-form-item label="完成情况"
                                                     :labelCol="{ xs: { span: 24 }, sm: { span: 5 } }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" hasFeedback>
              <a-textarea placeholder="请填写完成情况" v-decorator="['wcqk', validatorRules.wcqk]" :autosize="{ minRows: 2, maxRows: 4 }"/>
            </a-form-item></a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction,httpAction } from '@/api/manage'
  import moment from 'moment'
  import pick from 'lodash.pick'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import JEditableTable from '../../../../components/jeecg/JEditableTable'
  import JSelectUserByDep from '../../../../components/jeecgbiz/JSelectUserByDep'
  
  export default {
    name: "GzapGzrwModal",
    components: {
      JSelectUserByDep,
      JEditableTable,
      ATextarea,
      AFormItem,
      moment
    },
    data() {
      return {
        title: "填写完成情况",
        visible: false,
        confirmLoading: false,
        khsjDate: null,
        jssjDate: null,
        dateFormat: 'YYYY-MM-DD',
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules: {
          wcz:{rules: [{ required: true, message: '请填写完成值!' }]},
          wcqk:{rules: [{ required: true, message: '请填写完成情况!' }]},
        },
        url: {
          edit: "/gzrw/gzapGzrw/editMission"
        },
      }
    },
    created() {},
    methods: {
      moment,
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'rwmc', 'rwlx', 'kssj', 'jssj', 'rwzt', 'zyjb', 'rwz', 'wcz', 'wcqk'))
          this.form.setFieldsValue({})
          // 时间格式化
          this.form.setFieldsValue({ kssj: this.model.kssj ? moment(this.model.kssj) : null })
          this.form.setFieldsValue({ jssj: this.model.jssj ? moment(this.model.jssj) : null })
        });
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method  = '';
            if (!this.model.id) {
              httpurl += this.url.add;
              method  =  'post';
            } else {
              httpurl += this.url.edit;
              method  =  'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据：",formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success('填写成功');
                that.$emit('ok');
              } else {
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
      }
    }
  }
</script>

<style scoped>

</style>