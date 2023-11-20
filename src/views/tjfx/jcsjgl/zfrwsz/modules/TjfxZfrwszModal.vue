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
          label="统计维度">
          <j-dict-select-tag placeholder="请选择" v-decorator="['tjwd', validatorRules.tjwd ]" :triggerChange="true"
                             dictCode="ywltj_tjwd" :disabled="this.disabled" @change="tjwdChange" />
        </a-form-item>
        <a-form-item v-if="this.wdlx=='MM' || this.model.tjwd =='MM'"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol"
                     label="统计月份">
          <a-month-picker v-decorator="[ 'tjrq', validatorRules.tjrq]" :disabled="this.disabled" />
        </a-form-item>

        <a-row class="form-row" :gutter="0" v-if="this.wdlx=='Q'|| this.model.tjwd =='Q'">
          <a-col :span="3">
          </a-col>
          <a-col :span="10">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="统计年度">
              <a-date-picker
                placeholder="请选择年份"
                format="YYYY"
                mode="year"
                :value="ssnf"
                :open="open"
                @openChange="openChange"
                @panelChange="panelChange2"
                :disabled="this.disabled"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="统计季度">
              <a-select placeholder="统计季度" v-model="tjjd" @change="selectValue" style="width: 148px;"
                        :disabled="this.disabled">
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
              <!--              <a-date-picker v-decorator="[ 'tjrq', validatorRules.tjrq]" :disabled="this.disabled"/>-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item v-if="this.wdlx=='YYYY'|| this.model.tjwd =='YYYY'"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol"
                     label="统计年份">
          <a-date-picker
            placeholder="请选择年份"
            :format="monthFormat"
            mode="year"
            :value="year"
            :open="open"
            @openChange="openChange"
            @panelChange="panelChange"
            :disabled="this.disabled"
            :defaultValue="dateValue"
          />
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
        <a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型">
            <j-dict-select-tag placeholder="请选择" v-decorator="['khlx', validatorRules.khlx]" :triggerChange="true"
                               dictCode="khlx" />
          </a-form-item>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务">
          <a-input placeholder="请输入任务" v-decorator="['rw', validatorRules.rw]" />
        </a-form-item>


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import JTreeSelect from '@/components/jeecg/JTreeSelect'

export default {
  name: 'TjfxZfrwszModal',
  components: {
    JTreeSelect
  },
  data () {
    return {
      dafaultYear: '',
      open: false,
      year: moment(),
      dateValue: '',
      monthFormat: 'YYYY',
      wdlx: '',
      ssnf: '',
      nf: '',
      tjjd: '',
      title: '操作',
      visible: false,
      disabled: false,
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
        tjwd: { rules: [{ required: true, message: '请选择统计维度!' }] },
        tjrq: { rules: [{ required: true, message: '请选择统计月份!' }] },
        jgdm: { rules: [{ required: true, message: '请选择机构名称!' }] },
        khlx: { rules: [{ required: true, message: '请选择客户类型!' }] },
        rw: { rules: [{ required: true, message: '请输入任务!' }] }
      },
      url: {
        add: '/zfrwsz/tjfxZfrwsz/add',
        edit: '/zfrwsz/tjfxZfrwsz/edit'
      }
    }
  },
  created () {
  },
  methods: {
    /** 下拉选择 */
    selectValue (value, date) {
      console.log('selectValue(value) => ' + value, date)
      //this.$emit('change', val)
      //this.model.tjrq=this.year.format("YYYY-"+val+"-01");
      console.log(this.ssnf)
      console.log(this.tjjd)
      let ssnf = this.ssnf.format('YYYY')
      console.log(ssnf)
      let startDate = ssnf + '-' + this.tjjd + '-01'
      console.log(startDate)
      this.model.tjrq = startDate
    },

    openChange (status) {
      if (status) {
        this.open = true
      } else {
        this.open = false
      }
    },
    panelChange (value) {
      this.year = value

      let nf = this.year.format('YYYY' + '-01' + '-01')
      if (nf == null && nf == undefined && nf == '') {
        this.$message.warning('请重新选择日期')
        return
      }
      this.model.tjrq = nf
      console.log(nf)
      this.open = false
    },
    panelChange2 (value) {
      this.ssnf = value
      this.ssnf.format('YYYY')
      this.open = false
    },
    tjwdChange (value) {
      this.wdlx = value
    },

    add () {
      this.edit({})
    },
    edit (record) {
      console.log(JSON.stringify(record))
      this.disabled = true
      this.form.resetFields()
      this.model = Object.assign({}, record)
      if (this.model.tjrq!=null) {
        this.tjjd = this.model.tjrq.substring(5, 7)
        this.ssnf = this.model.tjrq.substring(0, 4)
      }
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'tjwd', 'tjrq', 'jgdm', 'khlx', 'rw'))
            //时间格式化
            //this.form.setFieldsValue({tjrq:this.model.tjrq?moment(this.model.tjrq):null})
            // this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          })

        }
      ,
        close()
        {
          this.$emit('close')
          this.visible = false
        }
      ,
        handleOk()
        {
          if (this.wdlx == 'YYYY') {
            this.model.tjrq = moment(this.year).format('YYYY') + '-01-01'
          }
          if (this.wdlx=="Q"){
            if (this.model.tjrq==null){
              this.$message.warning('请选择季度')
              return
            }

          }
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
              let formData = Object.assign(this.model, this.model.tjrq, values)
              //时间格式化
              //formData.tjrq = formData.tjrq?formData.tjrq.format():null;
              //formData.lrsj = formData.lrsj?formData.lrsj.format():null;

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
        }
      ,
        handleCancel()
        {
          this.wdlx=''
          this.close()
        }
      ,

      }
    }
</script>

<style lang="less" scoped>

</style>