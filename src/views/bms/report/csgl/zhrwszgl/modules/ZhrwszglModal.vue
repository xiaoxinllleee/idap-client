<template>
  <a-modal
    :title='title'
    :width='600'
    :visible='visible'
    :confirmLoading='confirmLoading'
    @ok='handleOk'
    @cancel='handleCancel'
    cancelText='关闭'>

    <a-spin :spinning='confirmLoading'>
      <a-form :form='form'>

        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="任务ID">-->
        <!--          <a-input placeholder="请输入任务ID" v-decorator="['taskId', validatorRules.taskId ]" />-->
        <!--        </a-form-item>-->
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='任务年度'>
          <a-date-picker v-decorator="[ 'taskYear', validatorRules.taskYear ]" disabled />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='机构编码'>
          <a-input placeholder='请输入机构编码' v-decorator="['branchNo', validatorRules.branchNo ]" disabled />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='任务编码'>
          <a-input placeholder='请输入任务编码' v-decorator="['taskCode', validatorRules.taskCode ]" disabled />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='任务名称'>
          <a-input placeholder='请输入任务名称' v-decorator="['taskName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='任务值'>
          <a-input placeholder='请输入任务值' v-decorator="['taskValue', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='备注'>
          <a-input placeholder='请输入备注' v-decorator="['remarks', {}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'

export default {
  name: 'ZhrwszglModal',
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        taskId: { rules: [{ required: true, message: '请输入任务ID!' }] },
        taskYear: { rules: [{ required: true, message: '请输入任务年度!' }] },
        branchNo: { rules: [{ required: true, message: '请输入机构编码!' }] },
        taskCode: { rules: [{ required: true, message: '请输入任务编码!' }] }
      },
      url: {
        add: '/report/csgl/zhrwszgl/add',
        edit: '/report/csgl/zhrwszgl/edit'
      }
    }
  },
  created() {
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'branchNo', 'taskCode', 'taskName', 'taskValue', 'remarks'))
        //时间格式化
        this.form.setFieldsValue({ taskYear: this.model.taskYear ? moment(this.model.taskYear) : null })
      })

    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.taskYear) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.taskYear = formData.taskYear ? formData.taskYear.format('YYYY') + '0101' : null
          console.log(formData)
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.$emit('ok')
            } else {
              that.$message.warning(res.message)
            }
          }).finally(() => {
            that.confirmLoading = false
            that.close()
          })


        }
      })
    },
    handleCancel() {
      this.close()
    }


  }
}
</script>

<style lang='less' scoped>

</style>