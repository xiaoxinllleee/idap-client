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
          label='指标ID'>
          <a-input placeholder='请输入指标ID' v-decorator="['zbid', validatorRules.zbid ]" :disabled='opEdit'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='指标名称'>
          <a-input placeholder='请输入指标名称' v-decorator="['zbmc', validatorRules.zbmc]"/>
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='开关'>-->
<!--          <a-input placeholder='请输入开关' v-decorator="['kg', validatorRules.kg ]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='指标大类'>
          <j-dict-select-tag placeholder='请选择' v-decorator="['zbdl', validatorRules.zbdl]" :trigger-change='triggerChange' dict-code='zbdl'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='指标小类'>
          <j-dict-select-tag placeholder='请选择' v-decorator="['zbxl', validatorRules.zbxl]" :trigger-change='triggerChange' dict-code='zbxl' />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='数据来源'>
          <j-dict-select-tag placeholder='请选择' v-decorator="['sjly', validatorRules.sjly]" :trigger-change='triggerChange' dict-code='data_source'/>
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='函数'>-->
<!--          <a-textarea placeholder='请输入函数' v-decorator="['fun', {}]" :rows="4"/>-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='说明'>
          <a-textarea placeholder='请输入说明' v-decorator="['remark', {}]" :rows="4"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction, postAction, putAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import JDictSelectTag from '@comp/dict/JDictSelectTag.vue'
import { duplicateCheck } from '@api/api'
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'JylrhsZbkModal',
  components: { JDictSelectTag },
  data() {
    return {
      title: '操作',
      visible: false,
      // disabled: true,
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
        zbid: { rules: [{ required: true, message: '请输入指标ID!' }] },/*, {validator:this.validateZBID}*/
        zbmc: { rules: [{ required: true, message: '请输入指标名称!' }] },
        zbdl: { rules: [{ required: true, message: '请选择指标大类!' }] },
        zbxl: { rules: [{ required: true, message: '请选择指标小类!' }] },
        sjly: { rules: [{ required: true, message: '请选择数据来源!' }] },
      },
      url: {
        add: '/jylrhs/csgl/zbk/add',
        edit: '/jylrhs/csgl/zbk/edit',
        duplicateCheck: '/jylrhs/csgl/zbk/check',
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
        this.form.setFieldsValue(pick(this.model, 'zbid', 'zbmc', 'zbdl', 'zbxl', 'sjly', 'remark'))
      })
      console.log('this.model',this.model)
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
            // 默认启用
            this.model.kg = 1
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
              that.close()
              that.$emit('ok')
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
    },

    validateZBID(rule, value, callback){
      console.log("value",value)
      if (!this.model.zbid && value) {
        getAction(this.url.duplicateCheck, {'zbid': value}).then((res) => {
          if (res.success) {
            callback()
          } else {
            callback(res.message)
          }
        })
      } else {
        callback()
      }
    },
  }
}
</script>

<style lang='less' scoped>

</style>