<template>
  <a-modal
    :title='title'
    :width='1200'
    :visible='visible'
    :confirmLoading='confirmLoading'
    @ok='handleOk'
    @cancel='handleCancel'
    cancelText='关闭'>

    <a-spin :spinning='confirmLoading'>
      <a-form :form='form'>

        <a-card title='待分配业务信息'>
          <a-row class='form-row' :gutter='24'>
            <a-col :lg='12'>
              <a-form-item
                :labelCol='labelCol'
                :wrapperCol='wrapperCol'
                label='分配方式'>
                <a-radio-group name='radioGroup' v-model='fpfs' :default-value='fpfs'>
                  <a-radio :value='1'>
                    平均分配
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :lg='12'>
              <a-form-item
                :labelCol='labelCol'
                :wrapperCol='wrapperCol'
                label='请选择分配类型'>
                <a-radio-group name='radioGroup' v-model='fplx' :default-value='fplx'>
                  <a-radio :value='3'>
                    全部业务
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class='form-row' :gutter='24'>
            <a-col :lg='12'>
              <a-form-item
                :labelCol='labelCol'
                :wrapperCol='wrapperCol'
                label='组织标识'>
                <j-tree-select
                  v-decorator="['zzbz',validatorRules.zzbz]"
                  placeholder='请选择组织标识'
                  treeNodeFilterProp='title'
                  dict='v_hr_bas_organization_cmms, zzjc, zzbz'
                  :sszh='true'
                  pid-field='sjzzbz'
                  :showSearch='true'
                  :treeDefaultExpandAll=true
                  :disabled='disabled'
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class='form-row' :gutter='24'>
            <a-col :lg='12'>
              <a-form-item
                :labelCol='labelCol'
                :wrapperCol='wrapperCol'
                label='机构业务笔数'>
                <a-input placeholder='请输入机构业务笔数' v-decorator="['qtywbs', {}]" :disabled='disabled' />
              </a-form-item>
            </a-col>
            <a-col :lg='12'>
              <a-form-item
                :labelCol='labelCol'
                :wrapperCol='wrapperCol'
                label='机构现金流量'>
                <a-input placeholder='请输入机构现金流量' v-decorator="['qtxjll', {}]" :disabled='disabled' />
              </a-form-item>
            </a-col>
          </a-row>


          <a-row class='form-row' :gutter='24'>
            <a-col :lg='12'>
              <a-form-item
                :labelCol='labelCol'
                :wrapperCol='wrapperCol'
                label='ATM业务笔数'>
                <a-input placeholder='请输入ATM业务笔数' v-decorator="['atmywbs', {}]" :disabled='disabled' />
              </a-form-item>
            </a-col>
            <a-col :lg='12'>
              <a-form-item
                :labelCol='labelCol'
                :wrapperCol='wrapperCol'
                label='ATM现金流量'>
                <a-input placeholder='请输入ATM现金流量' v-decorator="['atmxjll', {}]" :disabled='disabled' />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class='form-row' :gutter='24'>
            <a-col :lg='12'>
              <a-form-item
                :labelCol='labelCol'
                :wrapperCol='wrapperCol'
                label='分配日期'>
                <a-date-picker v-decorator="[ 'tjrq', {}]" :disabled='disabled' />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :title='cardTitle'>
          <div class='table-operator'>
            <a-table
              ref='table'
              size='middle'
              bordered
              :rowKey='rowKey'
              :columns='columns'
              :dataSource='dataSource'
              :pagination='ipagination'
              :loading='loading'
              :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'
              @change='handleTableChange'
            >
            </a-table>
          </div>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { filterObj } from '@/utils/util'

export default {
  name: 'YwlfpdayModal',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelect
  },
  data() {
    return {
      title: '操作',
      fpfs: 1,
      fplx: 3,
      visible: false,
      zzbz: '',
      tjrq: '',
      disabled: true,
      model: {
        fpfs: '',
        fplx: ''
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      dataSource: [],
      columns: [],
      columns1: [
        {
          title: '员工工号',
          align: 'center',
          dataIndex: 'yggh'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'yggh_dictText'
        },
        {
          title: '岗位',
          align: 'center',
          dataIndex: 'gwbz_dictText'
        }
      ],
      columns2: [
        {
          title: '岗位',
          align: 'center',
          dataIndex: 'gwbz'
        },
        {
          title: '岗位标志',
          align: 'center',
          dataIndex: 'gwmc'
        }
      ],
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        zzbz: { rules: [{ required: true, message: '请输入组织标志!' }] },
        fpid: { rules: [{ required: true, message: '请输入分配数据ID!' }] },
        tjrq: { rules: [{ required: true, message: '请输入统计日期!' }] },
        jgdm: { rules: [{ required: true, message: '请输入机构代码!' }] }
      },
      url: {
        gwlist: '/ywlfpday/ywlfpday/gwlist',
        yglist: '/ywlfpday/ywlfpday/yglist',
        add: '/ywlfpday/ywlfpday/add',
        edit: '/ywlfpday/ywlfpday/edit'
      },
      cardTitle: '',
      lx: '',
      row: {}
    }
  },
  created() {
    console.log(this.fpfs)
    console.log(this.fplx)
  },
  methods: {
    loadData(arg) {
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()//查询条件
      params.pageNo = this.ipagination.current
      params.pageSize = this.ipagination.pageSize
      console.info(params)
      let url = ''
      if (this.lx == '2') {
        url = this.url.gwlist
      } else {
        params.zzbz = this.zzbz
        params.tjrq = this.tjrq
        url = this.url.yglist
      }
      this.loading = true
      getAction(url, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
          this.loading = false
        } else {
          this.dataSource = []
          this.ipagination.total = 0
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message, 5)
          this.loading = false
        }
        this.loading = false
      })
    },
    add() {
      this.edit({})
    },
    edit(lx, record) {
      this.lx = lx
      this.row = record
      if (lx == '3') {
        this.cardTitle = '柜员信息'
        this.columns = this.columns1
      } else if (lx == '2') {
        this.cardTitle = '岗位信息'
        this.columns = this.columns2
      } else {
        this.cardTitle = '柜员信息'
        this.columns = this.columns1
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.zzbz = record.zzbz
      this.tjrq = record.tjrq
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'zzbz', 'atmywbs', 'atmxjll', 'qtywbs', 'qtxjll'))
        //时间格式化
        this.form.setFieldsValue({ tjrq: this.model.tjrq ? moment(this.model.tjrq) : null })
        // this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
        // this.form.setFieldsValue({fpsj:this.model.fpsj?moment(this.model.fpsj):null})
      })
      this.loadData(1)
    },
    close() {
      this.selectionRows = []
      this.selectedRowKeys = []
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.selectionRows == null || this.selectionRows == undefined || this.selectionRows.length == 0) {
            if (this.lx == '2') {
              this.$message.error('平均分配时请至少选择一种岗位！')
            } else {
              this.$message.error('平均分配时请至少选择一位员工！')
            }
            return
          }
          // that.confirmLoading = true
          let formData = Object.assign(this.model, this.fpfs.toString(), this.fplx.toString(), values)
          //时间格式化
          formData.tjrq = formData.tjrq ? moment(formData.tjrq).format('YYYY-MM-DD') : null
          let ygghList = []
          let gwxxList = []
          if (this.lx == '2') {
            this.selectionRows.forEach(e => {
              gwxxList.push(e.gwbz)
            })
          } else {
            this.selectionRows.forEach(e => {
              ygghList.push(e.yggh)
            })
          }
          formData.ygghList = ygghList
          formData.gwxxList = gwxxList
          formData.lx = this.lx
          formData.fprq = formData.tjrq
          formData.fpid = this.row.fpid

          httpAction(this.url.edit, formData, 'put').then((res) => {
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
      this.close()
    }


  }
}
</script>

<style lang='less' scoped>

</style>