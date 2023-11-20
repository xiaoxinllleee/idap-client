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
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='记账ID'>-->
<!--          <a-input placeholder='请输入记账ID' v-decorator="['jzid', validatorRules.jzid ]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='业务机构'>
          <a-input v-if='opEdit' placeholder='业务机构' v-decorator="['jgdm_dictText', {} ]" disabled />
<!--          <a-input placeholder='请输入业务机构' v-decorator="['jgdm', {}]" :disabled='opEdit'/>-->
          <j-tree-select v-else
                         placeholder="请选择业务机构"
                         pid-field="sjywjgdm_b"
                         :showSearch="true"
                         treeNodeFilterProp="title"
                         v-decorator="['jgdm', validatorRules.jgdm ]"
                         dict="v_hr_bas_organization,zzjc,ywjgdm"
                         condition='{"sjywjgdm": "ywjgdm"}'
                         :tree-default-expand-all="true"/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='记账日期'>
          <a-date-picker v-decorator="[ 'jzrq', validatorRules.jzrq ]" style='width: 100%;' :disabled='opEdit'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='列账子目'>
          <j-dict-select-tag placeholder='请选择' v-decorator="['lzzm', validatorRules.lzzm ]" :disabled='opEdit' :trigger-change='triggerChange'
                             dict-code="jylrhs:jylrhs_kmsz,subject_name2,subject_no2,subject_no1='6601' order by subject_no2"/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='金额'>
          <a-input-number placeholder='请输入金额' v-decorator="['je', {}]" :setp='1' :precision='2' style='width: 100%'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='摘要'>
          <a-textarea placeholder='请输入摘要' v-decorator="['zy', {}]" :row='4'/>
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='操作类型'>-->
<!--          <a-input placeholder='请输入操作类型' v-decorator="['oprationType', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='操作员'>-->
<!--          <a-input placeholder='请输入操作员' v-decorator="['opration', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='操作时间'>-->
<!--          <a-date-picker v-decorator="[ 'oprationTime', {}]" />-->
<!--        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import notification from 'ant-design-vue/lib/notification'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'

export default {
  name: 'JylrhsDxfyjzModal',
  components: { JTreeSelect },
  data() {
    return {
      title: '操作',
      opEdit: true,
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
      triggerChange: true,
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        // jzid: { rules: [{ required: true, message: '请输入记账ID!' }] }
        jgdm: { rules: [{ required: true, message: '请选择业务机构!' }] },
        lzzm: { rules: [{ required: true, message: '请选择列账子目!' }] },
        jzrq: { rules: [{ required: true, message: '请选择记账日期!' }] },
        je: { rules: [{ required: true, message: '请输入金额!' }] }
      },
      url: {
        add: '/jylrhs/csgl/dxfyjz/add',
        edit: '/jylrhs/csgl/dxfyjz/edit'
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
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'jzid', 'jgdm', 'jgdm_dictText', 'zy', 'je', 'lzzm'))
        //时间格式化
        this.form.setFieldsValue({ jzrq: this.model.jzrq ? moment(this.model.jzrq) : null })
        //this.form.setFieldsValue({ oprationTime: this.model.oprationTime ? moment(this.model.oprationTime) : null })
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
          //时间格式化
          formData.jzrq = formData.jzrq ? formData.jzrq.format() : null
          // formData.oprationTime = formData.oprationTime ? formData.oprationTime.format() : null

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