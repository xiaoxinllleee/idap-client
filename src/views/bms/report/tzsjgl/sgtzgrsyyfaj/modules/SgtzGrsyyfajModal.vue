<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-month-picker v-decorator="[ 'sjrq', {}]" :disabled="disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <j-tree-select
            v-decorator="['jgdm',validatorRules.jgdm ]"
            placeholder="请选择机构代码"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款帐号">
          <a-input placeholder="请输入贷款帐号" v-decorator="['dkzh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmz', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册证件号">
          <a-input placeholder="请输入注册证件号" v-decorator="['zczjhm', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款金额">
          <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本金余额">
          <a-input placeholder="请输入本金余额" v-decorator="['bjye', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款日期
">
          <a-input placeholder="请输入贷款日期
" v-decorator="['dkrq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展期日期
">
          <a-input placeholder="请输入展期日期
" v-decorator="['zqrq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期
">
          <a-input placeholder="请输入到期日期
" v-decorator="['dqrq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上次结息日
">
          <a-input placeholder="请输入上次结息日
" v-decorator="['scjxq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款年利率%
">
          <a-input placeholder="请输入贷款年利率%
" v-decorator="['dknll', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类状态
">
          <a-input placeholder="请输入五级分类状态
" v-decorator="['wjfl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期天数
">
          <a-input placeholder="请输入逾期天数
" v-decorator="['yqts', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理
">
          <a-input placeholder="请输入客户经理
" v-decorator="['khjl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主客户经理
">
          <a-input placeholder="请输入主客户经理
" v-decorator="['zkhjl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人
">
          <a-input placeholder="请输入第一责任人
" v-decorator="['dyzrr', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行政村组
">
          <a-input placeholder="请输入行政村组
" v-decorator="['xzcz', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="详细地址
">
          <a-input placeholder="请输入详细地址
" v-decorator="['xxdz', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系电话
">
          <a-input placeholder="请输入联系电话
" v-decorator="['lxdh', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人性质分类
">
          <a-input placeholder="请输入借款人性质分类
" v-decorator="['jkrxzfl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人性质分类1
">
          <a-input placeholder="请输入借款人性质分类1
" v-decorator="['jkrxzfl1', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人性质分类2
">
          <a-input placeholder="请输入借款人性质分类2
" v-decorator="['jkrxzfl2', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人性质分类3
">
          <a-input placeholder="请输入借款人性质分类3
" v-decorator="['jkrxzfl3', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业规模
">
          <a-input placeholder="请输入企业规模
" v-decorator="['qygm', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业规模1
">
          <a-input placeholder="请输入企业规模1
" v-decorator="['qygm1', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款品种
">
          <a-input placeholder="请输入贷款品种
" v-decorator="['dkpz', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期限分类
">
          <a-input placeholder="请输入期限分类
" v-decorator="['qxfl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式
">
          <a-input placeholder="请输入担保方式
" v-decorator="['dbfs', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向
">
          <a-input placeholder="请输入贷款投向
" v-decorator="['dktx', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向1
">
          <a-input placeholder="请输入贷款投向1
" v-decorator="['dktx1', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向2
">
          <a-input placeholder="请输入贷款投向2
" v-decorator="['dktx2', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向3
">
          <a-input placeholder="请输入贷款投向3
" v-decorator="['dktx3', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向4
">
          <a-input placeholder="请输入贷款投向4
" v-decorator="['dktx4', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人行业分类
">
          <a-input placeholder="请输入借款人行业分类
" v-decorator="['jkrhyfl', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人行业分类1
">
          <a-input placeholder="请输入借款人行业分类1
" v-decorator="['jkrhyfl1', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人行业分类2
">
          <a-input placeholder="请输入借款人行业分类2
" v-decorator="['jkrhyfl2', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人行业分类3
">
          <a-input placeholder="请输入借款人行业分类3
" v-decorator="['jkrhyfl3', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期日期
">
          <a-input placeholder="请输入逾期日期
" v-decorator="['yqrq', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借据号
              ">
          <a-input placeholder="请输入借据号
              " v-decorator="['jhj', {}]"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import JTreeSelect from '@comp/jeecg/JTreeSelect'

export default {
  name: 'SgtzGrsyyfajModal',
  components: {
    JTreeSelect
  },
  data () {
    return {
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {},
      url: {
        add: '/sgtzgrsyyfaj/sgtzGrsyyfaj/add',
        edit: '/sgtzgrsyyfaj/sgtzGrsyyfaj/edit',
      },
    }
  },
  created () {
  },
  methods: {
    add () {
      this.edit({})
    },
    edit (record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'sjrq','jgdm', 'dkzh', 'khmz', 'zczjhm', 'dkje', 'bjye', 'dkrq', 'zqrq', 'dqrq', 'scjxq', 'dknll', 'wjfl', 'yqts', 'khjl', 'zkhjl', 'dyzrr', 'xzcz', 'xxdz', 'lxdh', 'jkrxzfl', 'jkrxzfl1', 'jkrxzfl2', 'jkrxzfl3', 'qygm', 'qygm1', 'dkpz', 'qxfl', 'dbfs', 'dktx', 'dktx1', 'dktx2', 'dktx3', 'dktx4', 'jkrhyfl', 'jkrhyfl1', 'jkrhyfl2', 'jkrhyfl3', 'yqrq', 'jhj'))
        //时间格式化
        //this.form.setFieldsValue({ sjrq: this.model.sjrq ? moment(this.model.sjrq) : null })
      })

    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.sjrq && !this.model.dkzh) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          //formData.sjrq = formData.sjrq ? formData.sjrq.format() : null

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
    handleCancel () {
      this.close()
    },

  }
}
</script>

<style lang="less" scoped>

</style>