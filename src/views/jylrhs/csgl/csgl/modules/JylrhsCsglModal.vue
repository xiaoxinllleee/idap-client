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

        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='参数编号'>
          <a-input placeholder='请输入参数编号' v-decorator="['paramNo', validatorRules.paramNo ]" :disabled='opEdit'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='参数名称'>
          <a-input placeholder='请输入参数名称' v-decorator="['paramName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='数值1'>
          <a-input placeholder='请输入数值1' v-decorator="['paramValue1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='数值2'>
          <a-input placeholder='请输入数值2' v-decorator="['paramValue2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='文本参数'>
          <a-input placeholder='请输入文本参数' v-decorator="['textParam', validatorRules.textParam]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'JylrhsCsglModal',
  data() {
    return {
      title: '操作',
      visible: false,
      // disabled: true,
      // 编辑 操作标识
      opEdit: true,
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
        paramNo: { rules: [{ required: true, message: '请输入参数编号!' }] },
        textParam: { rules: [{ required: true, message: '请输入文本参数!' }] },
      },
      url: {
        add: '/jylrhs/csgl/csgl/add',
        edit: '/jylrhs/csgl/csgl/edit'
      }
    }
  },
  created() {
  },
  methods: {
    add() {
      this.opEdit = false
      this.edit({})
    },
    edit(record) {
      console.log('record',record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'paramNo', 'paramName', 'paramValue1', 'paramValue2', 'textParam'))
      })
    },
    close() {
      this.opEdit = true
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
          if (!that.opEdit) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          console.log(formData)
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              // that.$message.success(res.message)
              notification.success({ message: '系统提示', description:res.message, duration: 4})
              that.$emit('ok')
              that.close()
            } else {
              // that.$message.warning(res.message)
              notification.warning({ message: '系统提示', description:res.message, duration: 4})
            }
          }).finally(() => {
            that.confirmLoading = false
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