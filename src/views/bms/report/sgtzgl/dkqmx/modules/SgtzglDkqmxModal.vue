<template>
  <a-modal
    :title="title"
    :width="1500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="数据日期">
              <a-date-picker v-decorator="[ 'fiscalDate', validatorRules.fiscalDate]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网点名称">
              <j-tree-select
                v-decorator="['wdmc',{}]"
                placeholder="请选择网点名称"
                treeNodeFilterProp="title"
                dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                :sszh="true"
                pid-field="sjywjgdm"
                :showSearch="true"
                :treeDefaultExpandAll=true
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-decorator="['dkzh',validatorRules.dkzh ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="借款人名称">
              <a-input placeholder="请输入借款人名称" v-decorator="['jkrmc', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="借款人证件号码">
              <a-input placeholder="请输入借款人证件号码" v-decorator="['jkrzjhm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款金额">
              <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款余额">
              <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款日期">
              <a-date-picker v-decorator="[ 'dkrq', validatorRules.dkrq]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="展期日期">
              <a-date-picker v-decorator="[ 'zqrq', validatorRules.zqrq]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款到期日">
              <a-date-picker v-decorator="[ 'dkdqr', validatorRules.dkdqr]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="上次结息日">
              <a-date-picker v-decorator="[ 'scjxr', validatorRules.scjxr]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款利率">
              <a-input placeholder="请输入贷款利率" v-decorator="['dkll', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="五级形态">
              <a-input placeholder="请输入五级形态" v-decorator="['wjfl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户经理">
              <a-input placeholder="请输入客户经理" v-decorator="['khjl', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主客户经理">
              <a-input placeholder="请输入主客户经理" v-decorator="['zkhjl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="第一责任人">
              <a-input placeholder="请输入第一责任人" v-decorator="['dyzrr', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="行政村组">
              <a-input placeholder="请输入行政村组" v-decorator="['xzcz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户详细地址">
              <a-input placeholder="请输入客户详细地址" v-decorator="['khxxdz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户联系方式">
              <a-input placeholder="请输入客户联系方式" v-decorator="['khlxfs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户类型">
              <a-input placeholder="请输入客户类型" v-decorator="['khlx', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户类型1">
              <a-input placeholder="请输入客户类型1" v-decorator="['khlx1', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户类型2">
              <a-input placeholder="请输入客户类型2" v-decorator="['khlx2', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户类型3">
              <a-input placeholder="请输入客户类型3" v-decorator="['khlx3', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="企业规模">
              <a-input placeholder="请输入企业规模" v-decorator="['qygm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="企业规模1">
              <a-input placeholder="请输入企业规模1" v-decorator="['qygm1', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务品种">
              <a-input placeholder="请输入业务品种" v-decorator="['ywpz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款原始期限">
              <a-input placeholder="请输入贷款原始期限" v-decorator="['dkysqx', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="担保方式">
              <a-input placeholder="请输入担保方式" v-decorator="['dbfs', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款投向">
              <a-input placeholder="请输入贷款投向" v-decorator="['dktx', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款投向1">
              <a-input placeholder="请输入贷款投向1" v-decorator="['dktx1', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款投向2">
              <a-input placeholder="请输入贷款投向2" v-decorator="['dktx2', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款投向3">
              <a-input placeholder="请输入贷款投向3" v-decorator="['dktx3', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款投向4">
              <a-input placeholder="请输入贷款投向4" v-decorator="['dktx4', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款投向5">
              <a-input placeholder="请输入贷款投向5" v-decorator="['dktx5', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款投向6">
              <a-input placeholder="请输入贷款投向6" v-decorator="['dktx6', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款投向7">
              <a-input placeholder="请输入贷款投向7" v-decorator="['dktx7', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="贷款投向8">
                      <a-input placeholder="请输入贷款投向8" v-decorator="['dktx8', {}]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="是否财政贴息">
                      <a-input placeholder="请输入是否财政贴息" v-decorator="['sfcztx', {}]" />
                    </a-form-item>
                  </a-col>
                </a-row>
        <a-row class="form-row" :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="贷款其他类型">
                      <a-input placeholder="请输入贷款其他类型" v-decorator="['dkqtlx', {}]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="备注1">
                      <a-input placeholder="请输入备注1" v-decorator="['bz1', {}]" />
                    </a-form-item>
                  </a-col>
                </a-row>
        <a-row class="form-row" :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="备注2">
                      <a-input placeholder="请输入备注2" v-decorator="['bz2', {}]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="固定资产类型">
                      <a-input placeholder="请输入固定资产类型" v-decorator="['gdzclx', {}]" />
                    </a-form-item>
                  </a-col>
                </a-row>
        <a-row class="form-row" :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="固定资产类型1">
                      <a-input placeholder="请输入固定资产类型1" v-decorator="['gdzclx1', {}]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="固定资产类型2">
                      <a-input placeholder="请输入固定资产类型2" v-decorator="['gdzclx2', {}]" />
                    </a-form-item>
                  </a-col>
                </a-row>
        <a-row class="form-row" :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="固定资产类型3">
                      <a-input placeholder="请输入固定资产类型3" v-decorator="['gdzclx3', {}]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="固定资产类型4">
                      <a-input placeholder="请输入固定资产类型4" v-decorator="['gdzclx4', {}]" />
                    </a-form-item>
                  </a-col>
                </a-row>
        <a-row class="form-row" :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="借款人所属行业门类">
                      <a-input placeholder="请输入借款人所属行业门类" v-decorator="['jkrsshyml', {}]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="借款人所属行业大类">
                      <a-input placeholder="请输入借款人所属行业大类" v-decorator="['jkrsshydl', {}]" />
                    </a-form-item>
                  </a-col>
                </a-row>
        <a-row class="form-row" :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="借款人所属行业中类">
                      <a-input placeholder="请输入借款人所属行业中类" v-decorator="['jkrsshyzl', {}]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="借款人所属行业小类">
                      <a-input placeholder="请输入借款人所属行业小类" v-decorator="['jkrsshyxl', {}]" />
                    </a-form-item>
                  </a-col>
                </a-row>
        <a-row class="form-row" :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="逾期日期">
                      <a-date-picker v-decorator="[ 'yqrq', validatorRules.yqrq]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="合同编号">
                      <a-input placeholder="请输入合同编号" v-decorator="['htbh', {}]" />
                    </a-form-item>
                  </a-col>
                </a-row>


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
  name: 'SgtzglDkqmxModal',
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
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        fiscalDate: { rules: [{ required: true, message: '请选择数据日期!' }] },
        dkzh: { rules: [{ required: true, message: '请输入贷款账号!' }] },
        scjxr: { rules: [{ required: true, message: '请选择上次结息日!' }] },
        dkrq: { rules: [{ required: true, message: '请选择贷款日期!' }] },
        zqrq: { rules: [{ required: true, message: '请选择展期日期!' }] },
        dkdqr: { rules: [{ required: true, message: '请选择贷款到期日期!' }] },
        yqrq: { rules: [{ required: true, message: '请选逾期日期!' }] }
      },
      url: {
        add: '/dkqmx/sgtzglDkqmx/add',
        edit: '/dkqmx/sgtzglDkqmx/edit'
      }
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
        this.form.setFieldsValue(pick(this.model, 'fiscalDate', 'wdmc', 'dkzh', 'jkrmc', 'jkrzjhm', 'dkje', 'dkye', 'dkrq', 'zqrq', 'dkdqr', 'scjxr', 'dkll', 'wjfl', 'khjl', 'zkhjl', 'dyzrr', 'xzcz', 'khxxdz', 'khlxfs', 'khlx', 'khlx1', 'khlx2', 'khlx3', 'qygm', 'qygm1', 'ywpz', 'dkysqx', 'dbfs', 'dktx', 'dktx1', 'dktx2', 'dktx3', 'dktx4', 'dktx5', 'dktx6', 'dktx7', 'dktx8', 'sfcztx', 'dkqtlx', 'bz1', 'bz2', 'gdzclx', 'gdzclx1', 'gdzclx2', 'gdzclx3', 'gdzclx4', 'jkrsshyml', 'jkrsshydl', 'jkrsshyzl', 'jkrsshyxl', 'yqrq','htbh'))
        //时间格式化
        this.form.setFieldsValue({ fiscalDate: this.model.fiscalDate ? moment(this.model.fiscalDate) : null })
        this.form.setFieldsValue({ yqrq: this.model.yqrq ? moment(this.model.yqrq) : null })
        this.form.setFieldsValue({ dkrq: this.model.dkrq ? moment(this.model.dkrq) : null })
        this.form.setFieldsValue({ zqrq: this.model.zqrq ? moment(this.model.zqrq) : null })
        this.form.setFieldsValue({ dkdqr: this.model.dkdqr ? moment(this.model.dkdqr) : null })
        this.form.setFieldsValue({ scjxr: this.model.scjxr ? moment(this.model.scjxr) : null })
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
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.fiscalDate = formData.fiscalDate ? formData.fiscalDate.format() : null
          formData.yqrq = formData.yqrq ? formData.yqrq.format() : null
          formData.dkrq = formData.dkrq ? formData.dkrq.format() : null
          formData.zqrq = formData.zqrq ? formData.zqrq.format() : null
          formData.dkdqr = formData.dkdqr ? formData.dkdqr.format() : null
          formData.scjxr = formData.scjxr ? formData.scjxr.format() : null

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
    }

  }
}
</script>

<style lang="less" scoped>

</style>