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
          label='记账日期'>
<!--          <a-month-picker v-decorator="[ 'fiscalDate', validatorRules.fiscalDate ]" :format='monthFormat' style='width: 100%' :disabled='opEdit'/>-->
          <a-date-picker v-decorator="[ 'fiscalDate', validatorRules.fiscalDate ]" :format="dateFormat" style="width: 100%;" :disabled='opEdit'></a-date-picker>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='业务机构'>
          <a-input v-if='opEdit' placeholder='业务机构' v-decorator="['jgdm_dictText', {} ]" disabled/>
<!--          <j-tree-select v-else placeholder='请选择业务机构' v-decorator="['jgdm', validatorRules.jgdm ]" @change='ywjgChange'-->
<!--                         dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm' treeNodeFilterProp='title'-->
<!--                         show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true' :isAll='false'/>-->
          <j-tree-select v-else
                         placeholder="请选择业务机构"
                         pid-field="sjywjgdm_b"
                         :showSearch="true"
                         :isAll='false'
                         treeNodeFilterProp="title"
                         v-decorator="['jgdm', validatorRules.jgdm ]"
                         dict="v_hr_bas_organization,zzjc,ywjgdm"
                         condition='{"sjywjgdm": "ywjgdm"}'
                         :tree-default-expand-all="true"
                         @change='ywjgChange'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='记账分类'>
          <j-dict-select-tag placeholder='记账分类' v-decorator="['jzfl', validatorRules.jzfl ]" dict-code='zbdl'
                             :trigger-change='triggerChange' disabled/>
          <a-button v-if='!opEdit' type='primary' size='small' :disabled="JzkmDisabled" @click='onSearchLookup'>查找带回</a-button>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='记账科目'>
          <j-dict-select-tag placeholder='记账科目' v-decorator="['jzkm', validatorRules.jzkm ]"
                             dict-code='jylrhs:jylrhs_kmsz,subject_name2,subject_no2' disabled/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='金额(元)'>
          <a-input-number placeholder='请输入金额' v-decorator="['je', {}]" :setp='1' :precision='2' style='width: 100%'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='记账部门'>
<!--          <a-input placeholder='请输入记账部门' v-decorator="['jzbm', {}]" />-->
          <j-tree-select placeholder='请选择记账部门' v-decorator="['jzbm', {} ]"
                         dict='hr_bas_organization,zzjc,zzbz' pidField='sjzzbz' treeNodeFilterProp='title'
                         show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true' :isAll='false'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='备注'>
          <a-textarea placeholder='请输入备注' v-decorator="['remark', {}]" :row='4'/>
        </a-form-item>

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
import { mapGetters } from 'vuex'
import SelectJzkmModal from '@views/jylrhs/jylrsj/fyftjz/modules/SelectJzkmModal.vue'
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'JylrhsFyftjzModal',
  components: { SelectJzkmModal, JTreeSelect },
  data() {
    return {
      title: '操作',
      visible: false,
      opEdit: true,
      // disabled: true,
      JzkmDisabled: true,
      triggerChange: true,
      monthFormat: 'YYYY-MM',
      dateFormat: 'YYYY-MM-DD',
      // 记账分类 中文字典名
      JzflDictText: undefined,
      // 记账科目 中文字典名
      // SubDictText: undefined,
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
        fiscalDate: { rules: [{ required: true, message: '请选择记账日期!' }] },
        jgdm: { rules: [{ required: true, message: '请选择业务机构!' }] },
        jzfl: { rules: [{ required: true, message: '请选择记账分类!' }] },
        jzkm: { rules: [{ required: true, message: '请选择记账科目!' }] }
      },
      url: {
        add: '/jylrhs/jylrsj/fyftjz/add',
        edit: '/jylrhs/jylrsj/fyftjz/edit',
        jzbmGet: '/ygrggl/hrBasStaffPost/queryJgdmByYggh'
      }
    }
  },
  created() {
  },
  watch: {
    form: {
      handler (value) {
        console.log('watch value',value)
      },
      deep: true
    }
  },
  methods: {
    ...mapGetters(['nickname', 'avatar', 'userInfo', 'orgCode']),

    //获取当月最后1天日期
    getMonthLastDay(fiscalDate) {
      // console.log('获取当月最后1天日期 / 当前月份', fiscalDate)
      var date = moment(fiscalDate).format('YYYYMMDD')
      // var date = new Date()
      // console.log('当前记账日期', date)
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
    add() {
      this.opEdit = false
      // this.disabled = false
      this.edit({})
    },
    edit(record) {
      console.log('record',record)
      this.visible = true
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'jgdm_dictText', 'jzfl', 'jzkm', 'je', 'jzbm', 'remark'))
        //时间格式化
        this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
        this.form.setFieldsValue({ je: this.model.je ? this.model.je : 0 })
        if (!record.jzbm) {
          let yggh = this.userInfo().workNo
          console.log('员工工号',yggh)
          // TODO 没有指定记账部门，则自动赋值当前员工所属部门/机构
          getAction(this.url.jzbmGet,{'yggh': yggh}).then((res)=> {
            if (res.success) {
              console.log('当前员工所属部门/机构信息',res.result)
              this.form.setFieldsValue({jzbm: res.result.zzbz ? res.result.zzbz : null})
              this.$forceUpdate()
            }
          }).catch((error)=>{
            console.error('当前员工所属部门/机构信息获取失败！',error)
          })
        }
      })
    },
    close() {
      this.JzflDictText = undefined
      // this.SubDictText = undefined
      this.opEdit = true
      this.JzkmDisabled = true
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
          // formData.fiscalDate = formData.fiscalDate ? formData.fiscalDate.format('YYYY-MM')+'-'+ this.getMonthLastDay(formData.fiscalDate): null
          formData.je = formData.je ? formData.je : 0
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

    onSearchLookup: function() {
      let jgdm = this.form.getFieldValue("jgdm")
      console.info('已选择业务机构',jgdm)
      if (jgdm !== undefined && jgdm !== 'undefined') {
        this.$refs.selectJzkmModal.ywjg = jgdm
        this.$refs.selectJzkmModal.url.list = '/jylrhs/csgl/kmsz/listLookup'
        this.$refs.selectJzkmModal.add()
      } else {
        notification.warning({message: '系统提示', description: '请选择业务机构！', duration: 4})
        return
      }
    },
    selectOK: function (data) {
      console.info('查找带回数据：',data[0])
      // console.info('已选择记账二级科目',data[0].subjectName2,data[0].subjectNo2)
      this.JzflDictText = data[0].szfl_dictText
      // this.SubDictText = data[0].subjectName2
      console.log('data[0].jzfl',data[0].szfl)
      console.log('data[0].jzkm',data[0].subjectNo2)
      this.form.setFieldsValue({ jzfl: data[0].szfl ? data[0].szfl : undefined })
      this.form.setFieldsValue({ jzkm: data[0].subjectNo2 ? data[0].subjectNo2 : undefined })
      console.log('form',this.form)
    },

    /**
     * 业务机构改变监听事件
     * 业务机构改变 记账科目/记账分类 需清除 重新选择
     */
    ywjgChange(value) {
      let that = this
      if (value) {
        // 记账科目/记账分类 值清空
        that.JzflDictText = undefined
        // that.SubDictText = undefined
        that.form.setFieldsValue({ jzfl: undefined, jzkm: undefined })
        // 记账分类 查找带回 取消禁用
        that.JzkmDisabled = false
      }
    },
  }
}
</script>

<style lang='less' scoped>

</style>