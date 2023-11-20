<template>
  <a-modal
    :title='title'
    :width='800'
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
          label='部门名称'>
          <j-dict-select-tag v-decorator="['departId', validatorRules.departId]"
                             dict-code='v_hr_bas_organization_cmms, zzjc, zzbz' :trigger-change='true' />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='部门印章图片'>
          <j-upload text='上传图片'
                    fileType='image'
                    listType='picture'
                    class='upload-list-inline'
                    :value='imagePaths'
                    :bizPath='bizPath'
                    @change='imageUploadChange'
          />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='备注'>
          <a-input placeholder='请输入备注' v-decorator="['bz', {}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import JUpload from '@/components/jeecg/JUpload'

export default {
  name: 'SysDepartmentSignModal',
  components: { JUpload },
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
        departId: { rules: [{ required: true, message: '请选择要上传印章的部门名称!' }] }
      },
      url: {
        add: '/sys/sysDepartmentSign/add'
      },
      imagePaths: [],
      bizPath: 'images/depertSign'
    }
  },
  created() {
  },
  methods: {
    add() {
      this.imagePaths = []
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'departId', 'scr', 'zldx', 'zllj', 'fwlj', 'bz'))
        //时间格式化
        this.form.setFieldsValue({ scsj: this.model.scsj ? moment(this.model.scsj) : null })
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
          if (this.imagePaths.length <= 0) {
            this.$message.error('请上传部门印章图片！！！')
            return
          }
          if (this.imagePaths.length > 1) {
            this.$message.error('印章图片只上传一张！！！')
            return
          }
          that.confirmLoading = true
          let httpurl = this.url.add
          let method = 'post'
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.scsj = formData.scsj ? formData.scsj.format() : null
          formData.fwlj =this.imagePaths[0]

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
      this.imagePaths = []
      this.close()
    },
    imageUploadChange(data) {
      this.imagePaths = data.path.split(',')
    }
  }
}
</script>

<style lang='less' scoped>

</style>