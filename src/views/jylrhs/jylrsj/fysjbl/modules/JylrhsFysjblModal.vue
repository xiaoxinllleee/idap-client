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
          label='会计日期'>
          <a-month-picker v-decorator="[ 'fiscalDate', validatorRules.fiscalDate ]" :format='monthFormat' style='width: 100%' :disabled='opEdit'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='业务机构'>
<!--          <a-input placeholder='请输入业务机构编码' v-decorator="['jgdm', validatorRules.jgdm ]" />-->
          <a-input v-if='opEdit' placeholder='业务机构' v-decorator="['jgdm_dictText', validatorRules.jgdm_dictText ]" disabled/>
<!--          <j-tree-select v-else placeholder='请选择业务机构' v-decorator="['jgdm', validatorRules.jgdm ]"-->
<!--                         dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm' treeNodeFilterProp='title'-->
<!--                         show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true' :isAll='false'/>-->
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
          label='指标'>
          <a-input placeholder='指标名称' v-decorator="['zbid_dictText', {} ]" :disabled='opEdit'/>
<!--          <j-dict-select-tag placeholder='请选择' v-decorator="['zbid', validatorRules.zbid ]"-->
<!--                             dict-code='jylrhs:jylrhs_zbk,zbid||zbmc,zbid,kg=1 order by zbid'-->
<!--                             :trigger-change='triggerChange' disabled/>-->
          <a-button v-if='!opEdit' type='primary' size='small' :disabled="opEdit" @click='onSearchLookup'>查找带回</a-button>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='调整类型'>
          <j-dict-select-tag placeholder='请选择' v-decorator="['tzlx', validatorRules.tzlx ]" dict-code='tzlx' :trigger-change='triggerChange' />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='金额'>
          <a-input-number placeholder="请输入金额" v-decorator="['je', {}]" :step='1' :precision="3" style="width: 100%;" />
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='备注'>
          <a-textarea placeholder='请输入备注' v-decorator="['remark', {}]" :row='4'/>
        </a-form-item>

      </a-form>
    </a-spin>

    <select-zb-modal ref='selectZbModal' @selectFinished="selectOK"/>

  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import notification from 'ant-design-vue/lib/notification'
import SelectZbModal from '@views/jylrhs/csgl/zbk/modules/SelectZbModal.vue'

export default {
  name: 'JylrhsFysjblModal',
  components: { JTreeSelect, SelectZbModal },
  data() {
    return {
      title: '操作',
      visible: false,
      opEdit: true,
      // disabled: true,
      triggerChange: true,
      monthFormat: 'YYYY-MM',
      zbmc: undefined,
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
        fiscalDate: { rules: [{ required: true, message: '请选择会计日期!' }] },
        jgdm: { rules: [{ required: true, message: '请选择业务机构!' }] },
        zbid: { rules: [{ required: true, message: '请输入指标ID!' }] },
        tzlx: { rules: [{ required: true, message: '请选择调整类型!' }] },
        jgdm_dictText: { rules: [{ required: true, message: '业务机构为空!' }] },
        zbid_dictText: { rules: [{ required: true, message: '指标为空!' }] },
      },
      url: {
        add: '/jylrhs/jylrsj/fysjbl/add',
        edit: '/jylrhs/jylrsj/fysjbl/edit'
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
      console.log('record',record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'jgdm', 'jgdm_dictText', 'zbid', 'zbid_dictText', 'je', 'tzlx', 'remark'))
        //时间格式化
        this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
      })
    },
    close() {
      this.zbmc = undefined
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
          // formData.fiscalDate = formData.fiscalDate ? formData.fiscalDate.format() : null
          formData.fiscalDate = formData.fiscalDate ? formData.fiscalDate.format('YYYY-MM')+'-'+ this.getMonthLastDay(formData.fiscalDate): null
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
    },
    //获取当月最后1天日期
    getMonthLastDay(fiscalDate) {
      // console.log('获取当月最后1天日期 / 当前月份', fiscalDate)
      var date = moment(fiscalDate).format('YYYYMMDD')
      // var date = new Date()
      // console.log('当前会计日期', date)
      let new_year = parseInt(date.substring(0, 4))//取当前的年份
      let month = parseInt(date.substring(4, 6))
      let new_month = month//取当前的月份
      // console.log('month', month)
      // console.log('new_month', new_month)
      // let weekday = date.getDay();  //获取是周几
      let d = new Date(new_year, new_month, 1)//取当年当月中的第一天
      // 如果一个日期格式和一个毫秒相减，会变成一个时间毫秒戳
      // 获取当月最后一天日期
      return new Date(d.getTime() - 1000 * 60 * 60 * 24).getDate()
    },

    onSearchLookup: function() {
      this.$refs.selectZbModal.add()
    },

    selectOK: function (data) {
      console.info('selectOK 已选择：',data[0])
      this.zbmc = data[0].zbmc
      this.form.setFieldsValue({ zbid: data[0].zbid ? data[0].zbid : undefined })
    },
  }
}
</script>

<style lang='less' scoped>

</style>