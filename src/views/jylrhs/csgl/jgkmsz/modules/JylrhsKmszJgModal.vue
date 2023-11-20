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
          label='业务机构'>
          <a-input v-if='opEdit' placeholder='业务机构' v-decorator="['jgdm_dictText', {} ]" disabled />
<!--          <j-tree-select v-else placeholder='请选择业务机构' v-decorator="['jgdm', validatorRules.jgdm ]"-->
<!--                         dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm' treeNodeFilterProp='title'-->
<!--                         show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true'-->
<!--                         :isAll='false' />-->
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
          label='一级科目'>
          <!-- 新增时，用于保存一级科目名（不展示） -->
<!--          <a-input v-if='!this.opEdit' hidden placeholder='一级科目名' v-decorator="['subjectName1', {}]" />-->
          <!-- 新增时，用于保存一级科目号（不展示） -->
          <a-input v-if='!this.opEdit' hidden placeholder='一级科目号' v-decorator="['subjectNo1', validatorRules.subjectNo1 ]" />
          <!-- 编辑时，用于转换/保存一级科目号 -->
          <j-dict-select-tag v-if='this.opEdit' placeholder='请选择' v-decorator="['subjectNo1', validatorRules.subjectNo1 ]" dict-code='jylrhs:jylrhs_kmsz,subject_name1,subject_no1' disabled/>
          <!-- 新增时，用于选择一、二级科目，显示一级科目名 -->
          <a-input-search v-else placeholder="请选择" v-model="subjectName1" readOnly @search="onSearchLookup">
            <a-button slot="enterButton">查找带回</a-button>
          </a-input-search>
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='一级科目名'>-->
<!--          <a-input placeholder='请输入一级科目名' v-decorator="['subjectName1', {}]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='二级科目'>
          <!-- 新增时，用于保存二级科目名（不展示） -->
<!--          <a-input v-if='!this.opEdit' hidden placeholder='二级科目名' v-decorator="['subjectName2', {}]" />-->
          <j-dict-select-tag  placeholder='请选择' v-decorator="['subjectNo2', validatorRules.subjectNo2 ]" dict-code='jylrhs:jylrhs_kmsz,subject_name2,subject_no2' disabled/>
        </a-form-item>
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='二级科目名'>-->
<!--          <a-input placeholder='请输入二级科目名' v-decorator="['subjectName2', {}]" />-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='上限额度(元)'>
          <a-input-number placeholder='请输入上限额度' v-decorator="['sxed', validatorRules.sxed ]" :step='1' :precision='2' style='width: 100%;' />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='备注'>
          <a-textarea placeholder='请输入备注' v-decorator="['remark', {}]" :rows='4' />
        </a-form-item>
        <!--        <a-form-item-->
        <!--        :labelCol="labelCol"-->
        <!--        :wrapperCol="wrapperCol"-->
        <!--        label="操作类型">-->
        <!--        <a-input placeholder="请输入操作类型" v-decorator="['oprationType', {}]" />-->
        <!--      </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="操作员">-->
        <!--          <a-input placeholder="请输入操作员" v-decorator="['operator', {}]" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="操作时间">-->
        <!--          <a-date-picker v-decorator="[ 'oprationTime', {}]" />-->
        <!--        </a-form-item>-->

      </a-form>
    </a-spin>

    <select-jzkm-modal ref="selectJzkmModal" @selectFinished="selectOK"/>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import SelectJzkmModal from '@views/jylrhs/jylrsj/fyftjz/modules/SelectJzkmModal.vue'
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'JylrhsKmszJgModal',
  components: { JTreeSelect,SelectJzkmModal },
  data() {
    return {
      title: '操作',
      visible: false,
      opEdit: true,
      // disabled: true,
      triggerChange: true,
      subjectName1: '',
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
        jgdm: { rules: [{ required: true, message: '请选择业务机构!' }] },
        subjectNo1: { rules: [{ required: false, message: '请选择一级科目!' }] },
        subjectNo2: { rules: [{ required: false, message: '请选择二级科目!' }] },
        sxed: { rules: [{ required: true, message: '请输入上限额度!' }] }
      },
      url: {
        add: '/jylrhs/csgl/jgkmsz/add',
        edit: '/jylrhs/csgl/jgkmsz/edit',
        duplicateCheck: '/jylrhs/csgl/jgkmsz/check',
      }
    }
  },
  created() {
  },
  methods: {
    add() {
      this.opEdit = false
      // this.disabled = false
      this.edit({})
    },
    edit(record) {
      // console.log('record',record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'jgdm_dictText', 'subjectNo1', 'subjectNo2', 'sxed', 'remark'))
        //时间格式化
        // this.form.setFieldsValue({ oprationTime: this.model.oprationTime ? moment(this.model.oprationTime) : null })
        this.form.setFieldsValue({ sxed: this.model.sxed ? this.model.sxed : 0 })
      })

    },
    close() {
      this.opEdit = true
      // this.disabled = true
      this.subjectName1 = ''
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          let httpurl = ''
          let method = ''
          if (!this.opEdit) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          // 判断一、二级科目是否已选择
          if (formData.subjectNo1 === undefined || formData.subjectNo1 === '') {
            notification.warning({message: '系统提示', description: '请选择一级科目！', duration: 4})
            return
          }
          if (formData.subjectNo2 === undefined || formData.subjectNo2 === '') {
            notification.warning({message: '系统提示', description: '二级科目为空！', duration: 4})
            return
          }
          //时间格式化
          // formData.oprationTime = formData.oprationTime ? formData.oprationTime.format() : null
          console.log(formData)
          that.confirmLoading = true
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

    onSearchLookup: function() {
      this.$refs.selectJzkmModal.add()
    },
    selectOK: function (data) {
      console.info('已选择科目',data[0])
      this.subjectName1 = data[0].subjectName1
      this.form.setFieldsValue({ subjectNo1: data[0].subjectNo1 ? data[0].subjectNo1 : undefined })
      // this.form.setFieldsValue({ subjectName1: subjectName1 ? data[0].subjectName1 : undefined })
      this.form.setFieldsValue({ subjectNo2: data[0].subjectNo2 ? data[0].subjectNo2 : undefined })
      // this.form.setFieldsValue({ subjectName2: subjectName2 ? data[0].subjectName2 : undefined })
    },
  }
}
</script>

<style lang='less' scoped>

</style>