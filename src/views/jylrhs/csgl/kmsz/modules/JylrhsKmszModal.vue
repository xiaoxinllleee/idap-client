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
          label='一级科目号'>
          <a-input placeholder='请输入一级科目号' v-decorator="['subjectNo1', validatorRules.subjectNo1 ]" :disabled='opEdit'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='一级科目名'>
          <a-input placeholder='请输入一级科目名' v-decorator="['subjectName1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='二级科目号'>
          <a-input placeholder='请输入二级科目号' v-decorator="['subjectNo2', validatorRules.subjectNo2 ]" :disabled='opEdit'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='二级科目名'>
          <a-input placeholder='请输入二级科目名' v-decorator="['subjectName2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='收支分类'>
          <j-dict-select-tag placeholder='请选择' v-decorator="['szfl', validatorRules.szfl ]" dict-code='zbdl' :trigger-change='triggerChange' />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='统计分类'>
          <j-dict-select-tag placeholder='请选择' v-decorator="['tjfl', validatorRules.tjfl ]" dict-code='zbxl' :trigger-change='triggerChange' />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='备注'>
          <a-textarea placeholder='请输入备注' v-decorator="['remark', {}]" :row='4'/>
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
  name: 'JylrhsKmszModal',
  data() {
    return {
      title: '操作',
      visible: false,
      opEdit: true,
      triggerChange: true,
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
        szfl: { rules: [{ required: true, message: '请选择收支分类!' }] },
        tjfl: { rules: [{ required: true, message: '请选择统计分类!' }] },
        subjectNo1: { rules: [{ required: true, message: '请输入一级科目号!' }] },
        subjectNo2: { rules: [{ required: true, message: '请输入二级科目号!' }] }
      },
      url: {
        add: '/jylrhs/csgl/kmsz/add',
        edit: '/jylrhs/csgl/kmsz/edit'
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
        this.form.setFieldsValue(pick(this.model, 'szfl', 'tjfl', 'subjectNo1', 'subjectName1', 'subjectNo2', 'subjectName2', 'remark'))
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