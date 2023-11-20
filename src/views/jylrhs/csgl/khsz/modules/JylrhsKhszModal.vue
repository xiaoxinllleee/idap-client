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
          <a-input v-if='opEdit' placeholder='业务机构' v-decorator="['jgdm_dictText', {} ]" disabled/>
<!--          <j-tree-select v-else placeholder='请选择业务机构' v-decorator="['jgdm', validatorRules.jgdm ]"-->
<!--                         dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm' treeNodeFilterProp='title'-->
<!--                         show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true' :isAll='false'/>-->
          <j-tree-select v-else
                         placeholder="请选择业务机构" v-decorator="['jgdm', validatorRules.jgdm ]"
                         pid-field="sjywjgdm_b"
                         treeNodeFilterProp="title"
                         condition='{"sjywjgdm": "ywjgdm"}'
                         dict="v_hr_bas_organization,zzjc,ywjgdm"
                         :showSearch="true"
                         :tree-default-expand-all="true"/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='指标'>
          <a-input placeholder='指标名称' v-decorator="['zbid_dictText', {} ]" :disabled='disabled'/>
<!--          <j-dict-select-tag placeholder='请选择' v-decorator="['zbid', validatorRules.zbid ]"-->
<!--                             dict-code='jylrhs:jylrhs_zbk,zbid||zbmc,zbid,kg=1 order by zbid'-->
<!--                             :trigger-change='triggerChange' disabled></j-dict-select-tag>-->
          <a-button v-if='!opEdit' type='primary' size='small' :disabled="opEdit" @click='onSearchLookup'>查找带回</a-button>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='考核周期'>
          <j-dict-select-tag placeholder='请选择' v-decorator="['khzq', validatorRules.khzq ]" :trigger-change='triggerChange' dict-code='rqwd' :disabled='disabled'/>
        </a-form-item>
        <!--        <a-form-item-->
        <!--          :labelCol="labelCol"-->
        <!--          :wrapperCol="wrapperCol"-->
        <!--          label="记账类型">-->
        <!--          <a-input placeholder="请输入记账类型" v-decorator="['jzlx', validatorRules.jzlx ]" />-->
        <!--        </a-form-item>-->
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='计提比率'>
          <a-input type='number' placeholder='请输入计提比率' v-decorator="['jtbl', {}]" allow-clear :min='0' :step='0.1' suffix="%" style='width: 100%;'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='参考利率'>
          <a-input type='number' placeholder='请输入参考利率' v-decorator="['ckll', {}]" allow-clear :min='0' :step='0.1' suffix="%" style='width: 100%;'/>
        </a-form-item>
        <a-form-item
          :labelCol='labelCol'
          :wrapperCol='wrapperCol'
          label='调剂系数'>
          <a-input type='number' placeholder='请输入调剂系数' v-decorator="['tjxs', {}]" allow-clear :min='0' :step='0.1' suffix="%" style='width: 100%;'/>
        </a-form-item>

      </a-form>
    </a-spin>

    <select-zb-modal ref='selectZbModal' @selectFinished="selectOK"/>

  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import JDictSelectTag from '@comp/dict/JDictSelectTag.vue'
import notification from 'ant-design-vue/lib/notification'
import SelectZbModal from '@views/jylrhs/csgl/zbk/modules/SelectZbModal.vue'

export default {
  name: 'JylrhsKhszModal',
  components: { JDictSelectTag, JTreeSelect, SelectZbModal },
  data() {
    return {
      title: '操作',
      visible: false,
      opEdit: true,
      disabled: true,
      triggerChange: true,
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
        jgdm: { rules: [{ required: true, message: '请选择业务机构!' }] },
        zbid: { rules: [{ required: true, message: '请选择指标!' }] },
        // jzlx:{rules: [{ required: true, message: '请输入记账类型!' }]},
        khzq: { rules: [{ required: true, message: '请选择考核周期!' }] }
      },
      url: {
        add: '/jylrhs/csgl/khsz/add',
        edit: '/jylrhs/csgl/khsz/edit',
        duplicateCheck: '/jylrhs/csgl/khsz/check',
      }
    }
  },
  created() {
  },
  methods: {
    add() {
      this.opEdit = false
      this.disabled = false
      this.edit({})
    },
    edit(record) {
      console.log('record',record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'jgdm_dictText', 'zbid', 'zbid_dictText', 'jtbl', 'ckll', 'tjxs', 'khzq'))
      })
    },
    close() {
      this.zbmc = undefined
      this.opEdit = true
      this.disabled = true
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
          if (!this.opEdit) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          console.log(formData)

          if (!this.opEdit) {
            let parameter = {
              'jgdm': formData.jgdm,
              'zbid': formData.zbid,
              'khzq': formData.khzq
            }
            getAction(this.url.duplicateCheck,parameter).then((res)=>{
              if (res.success) {
                console.log('res',res)
                notification.success({message: '系统提示', description: res.message, duration: 4})
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
              } else {
                notification.warning({message: '系统提示', description: res.message, duration: 4})
                return
              }
            }).catch((error)=>{
              console.log('考核设置信息查重校验失败！',error)
            }).finally(()=>{
              that.confirmLoading = false
            })
          } else {
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
        }
      })
    },
    handleCancel() {
      this.close()
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