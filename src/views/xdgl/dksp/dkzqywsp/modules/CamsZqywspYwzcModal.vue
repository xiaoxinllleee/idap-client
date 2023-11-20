<template>
  <a-modal
    :title='title'
    :width='1200'
    :visible='visible'
    :confirmLoading='confirmLoading'
    @ok='handleOk'
    :okButtonProps='{ props: {disabled: disableSubmit} }'
    @cancel='handleCancel'
    cancelText='关闭'>

    <a-spin :spinning='confirmLoading'>
      <a-form :form='form'>
        <a-tabs default-active-key='1'>
          <a-tab-pane tab='基本信息' key='1' :forceRender='true'>
            <a-divider orientation='left' style='color: #1890FF;'>基本信息</a-divider>
            <a-row :gutter='24' v-if='!isEdit'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='借款人'>
                  <a-input placeholder='请输入借款人' v-decorator="['khmc', validatorRules.khmc]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='贷款账号'>
                  <a-input placeholder='请输入贷款账号' v-decorator="['dkzh',validatorRules.dkzh]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='证件号码'>
                  <a-input placeholder='请输入证件号码' v-decorator="['zjhm',validatorRules.zjhm]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'>
                  <a-button type='primary' @click='getDkxx'>查询</a-button>
                  <span style='color: red'>(查询贷款信息[根据借款人、贷款账号、证件号码])</span>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter='24' v-if='isEdit'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='借款人'>
                  <a-input placeholder='请输入借款人' v-decorator="['khmc', validatorRules.khmc]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='贷款账号'>
                  <a-input placeholder='请输入贷款账号' v-decorator="['dkzh',validatorRules.dkzh]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='证件号码'>
                  <a-input placeholder='请输入证件号码' v-decorator="['zjhm',validatorRules.zjhm]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter='24'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='贷款种类'>
                  <j-dict-select-tag placeholder='请选择贷款种类' v-decorator="['dkzl',validatorRules.dkzl]"
                                     :showSearch='true' :triggerChange='true' dictCode='dkzl' />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='原合同编号'>
                  <a-input placeholder='请输入原合同编号' v-decorator="['yhtbh', validatorRules.yhtbh]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter='24'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='原贷款日期'>
                  <a-date-picker v-decorator="[ 'ydkrq', validatorRules.ydkrq]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='原到期日期'>
                  <a-date-picker v-decorator="[ 'ydqrq', validatorRules.ydqrq]" />
                </a-form-item>
              </a-col>
            </a-row>
            <row :gutter='24'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='原贷款金额(小写)'>
                  <a-input-number placeholder='请输入原贷款金额(万元)' style='width: 250px'
                                  :formatter="value => value? `${value}万元` : ''"
                                  :parser="value => value.replace('万', '').replace('元','')"
                                  @change='ydkjeChange'
                                  v-decorator="['ydkje',validatorRules.sqzqje]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='原贷款金额(大写)'>
                  <a-input placeholder='根据小写自动生成'
                           v-decorator="['ydkjedx', {}]" disabled />
                </a-form-item>
              </a-col>
            </row>
            <a-row :gutter='24'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='利率'>
                  <a-input placeholder='请输入利率' v-decorator="['ll',validatorRules.ll]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='所属机构'>
                  <j-tree-select
                    v-decorator="['sszh',validatorRules.sszh]"
                    placeholder='请选择机构'
                    dict='V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ'
                    pidField='sjzzbz'
                    :disabled='true'
                    :treeDefaultExpandAll=true
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter='24'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='申请展期金额(小写)'>
                  <a-input-number placeholder='请输入申请展期金额(万元)' style='width: 250px'
                                  :formatter="value => value? `${value}万元` : ''"
                                  :parser="value => value.replace('万', '').replace('元','')"
                                  @change='sqzqjeChange'
                                  v-decorator="['sqzqje',validatorRules.sqzqje]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='申请展期金额(大写)'>
                  <a-input placeholder='根据小写自动生成'
                           v-decorator="['sqzqjedx', {}]" disabled />
                </a-form-item>
              </a-col>
            </a-row>
            <row :gutter='24'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='申请展期日期'>
                  <a-date-picker placeholder='请选择申请展期日期' v-decorator="[ 'sqzqrq',validatorRules.sqzqrq]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='申请展期期限（月）'>
                  <!--              <a-input placeholder='请输入申请展期期限（月）' v-decorator="['sqzqqx',validatorRules.sqzqqx]" />-->
                  <a-input-number placeholder='请输入申请展期期限（月）' v-decorator="['sqzqqx',validatorRules.sqzqqx]"
                                  :min='0' style='width: 250px' />
                </a-form-item>
              </a-col>
            </row>
            <a-row :gutter='24'>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='包收责任人'>
                  <a-input placeholder='请输入包收责任人' v-decorator="['bszrr', validatorRules.bszrr]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='管理责任人'>
                  <a-input placeholder='请输入管理责任人' v-decorator="['glzrr',validatorRules.glzrr]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter='24'>
              <a-col :lg='24'>
                <a-form-item
                  :labelCol='{ span: 4 }'
                  :wrapperCol='{ span: 12 }'
                  label='申请展期还款理由'>
                  <a-textarea placeholder='请输入申请展期还款理由' v-decorator="['sqzqhkly', validatorRules.sqzqhkly]"
                              :row='2' />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg='24'>
                <a-form-item
                  :labelCol='{ span: 4 }'
                  :wrapperCol='{ span: 12 }'
                  label='备注'>
                  <a-textarea placeholder='请输入备注' v-decorator="['bz', {}]" :row='2' />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab='贷款展期业务审批资料' key='2' :forceRender='true'>
            <a-row>
              <a-col :span='24'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='贷款展期业务审批资料'>
                  <JUploadOne
                    v-decorator="['fjxxList[0]',validatorRules.spzl]"
                    text='上传附件'
                    class='upload-list-inline'
                  />
                </a-form-item>
              </a-col>
              <a-col :span='24'>
                <a-form-item
                  :labelCol='labelCol'
                  :wrapperCol='wrapperCol'
                  label='其他资料'>
                  <JUploadOne
                    v-decorator="['fjxxList[1]',{}]"
                    text='上传附件'
                    class='upload-list-inline'
                    @change="(data)=>imageUploadChange(data, '3')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider orientation='left' style='color: #1890FF;' v-if='isEdit'>已上传附件</a-divider>
            <a-table bordered
                     size='middle'
                     rowKey='id'
                     :dataSource='khzlColumns.data'
                     :columns='khzlColumns.columns'
                     :pagination='false'
                     :loading='khzlColumns.loading'
                     v-if='isEdit'>
              <span slot='action' slot-scope='text, record'>
                <a @click='viewFj(record)'>预览</a>
                <a-divider type='vertical' />
                <a @click='down(record)'>下载</a>
                <a-divider type='vertical' />
                <a-popconfirm title='确定删除吗?' @confirm='() => doDelete(record)'>
                        <a>删除</a>
                </a-popconfirm>
              </span>
            </a-table>
          </a-tab-pane>
        </a-tabs>
        <DkxxModal ref='dkxx' @close='closeDkxx'></DkxxModal>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import DkxxModal from '@views/xdgl/dksp/dkzqywsp/modules/DkxxModal'
import pick from 'lodash.pick'
import JEditableTable from '@/components/jeecg/JEditableTable'
import { digitUppercase } from '@/utils/util'
import { FormTypes, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import store from '@/store/'
import JUploadOne from '@/components/jeecg/JUploadOne'

export default {
  name: 'CamsZqywspYwzcAddModal',
  components: { DkxxModal, JEditableTable, JTreeSelect, JUploadOne },
  data() {
    return {
      title: '操作',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        khmc: { rules: [{ required: true, message: '请输入借款人!' }] },
        dkzh: { rules: [{ required: true, message: '请输入贷款账号!' }] },
        ll: { rules: [{ required: true, message: '请输入利率!' }] },
        sqzqje: { rules: [{ required: true, message: '请输入申请展期金额!' }] },
        bszrr: { rules: [{ required: true, message: '请输入包收责任人!' }] },
        glzrr: { rules: [{ required: true, message: '请输入管理责任人!' }] },
        sszh: { rules: [{ required: true, message: '请选择机构!' }] },
        dkzl: { rules: [{ required: true, message: '请选择贷款种类!' }] },
        yhtbh: { rules: [{ required: true, message: '请输入原合同编号!' }] },
        ydkrq: { rules: [{ required: true, message: '请输入原贷款日期!' }] },
        ydqrq: { rules: [{ required: true, message: '请输入原到期日期!' }] },
        ydkje: { rules: [{ required: true, message: '请输入原贷款金额!' }] },
        sqzqhkly: { rules: [{ required: true, message: '请输入申请展期还款理由!' }] },
        sqzqqx: { rules: [{ required: true, message: '请输入申请展期期限!' }] },
        sqzqrq: { rules: [{ required: true, message: '请选择申请展期日期!' }] },
        spzl: { rules: [{ required: true, message: '请上传审批资料!' }] },
        zjhm: { rules: [{ required: true, message: '请输入证件号码!' }] }
      },
      model: {},
      tmpDkxx: {},
      isEdit: false,
      row: {},
      disableSubmit: false,
      sszh: '',
      props: {
        modalCreated: {
          type: Boolean,
          required: false,
          default: false
        },
        modalParam: {
          type: Object,
          required: false
        }
      },
      khzlColumns: {
        data: [],
        columns: [
          {
            title: '附件名称',
            dataIndex: 'zlmc',
            align: 'center'
          },
          {
            title: '附件类型',
            dataIndex: 'zllx_dictText',
            align: 'center'
          },
          {
            title: '上传人',
            dataIndex: 'scr',
            align: 'center'
          },
          {
            title: '上传时间',
            dataIndex: 'scsj',
            align: 'center'
          },
          {
            title: ' 操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        loading: false
      },
      deleteFiles: []
    }
  },
  watch: {
    modalCreated: {
      immediate: true,
      handler(val) {
        console.log('watch modalCreated', val)
        if (val) {
          this.showModal()
        }
      }
    }
  },
  methods: {
    getFjxx(khid) {
      //获取附件信息
      getAction('/dksp/khzl/queryByKhid', { khid: khid }).then(res => {
        if (res.success) {
          if (res.result) {
            this.khzlColumns.data = res.result
            if (this.khzlColumns.data && this.khzlColumns.data.length > 0) {
              this.khzlColumns.data.forEach(fjxx => {
                fjxx.zllx_dictText = fjxx.zllx == '9' ? '贷款展期业务审批资料' : '其他资料'
              })
            }
            let spzllList = res.result.filter(item => {
              return item.zllx == '9'
            })
            if (spzllList && spzllList.length > 0) {
              this.validatorRules.spzl = {}
            }
          }
        }
      })
    },
    showModal(id) {
      this.disableSubmit = true
      getAction('/dkzqywsp/camsZqywspYwzc/queryById', { id: id }).then(res => {
        this.edit(res.result)
      })
    },
    close() {
      this.disableSubmit = false
      this.visible = false
    },
    add() {
      this.title = '新增业务'
      this.$nextTick(() => {
        this.form.setFieldsValue({ 'sszh': store.getters.userInfo.orgCode })
      })
    },
    view(row) {
      this.disableSubmit = true
      this.edit(row)
    },
    edit(row) {
      this.form.resetFields();
      this.isEdit = true
      this.row = row
      if (row.sqzqje != null && row.sqzqje != undefined && row.sqzqje != '') {
        this.sqzqjeChange(row.sqzqje)
      }
      if (row.ydkje != null && row.ydkje != undefined && row.ydkje != '') {
        this.ydkjeChange(row.ydkje)
      }
      let tmp = Object.assign({}, row)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(tmp, 'id', 'khmc', 'dkzh', 'dkzl', 'yhtbh', 'ydkrq', 'ydkje', 'ydqrq', 'll', 'sqzqjedx', 'sqzqje', 'bszrr', 'glzrr', 'bz', 'sqzqhkly', 'sszh', 'sqzqqx', 'sqzqrq','zjhm'))
        this.form.setFields({fjxxList:null})
      })
      if (row.id) {
        this.getFjxx(row.id)
      }
    },
    handleCancel() {
      let tmp = {
        khmc: '',
        dkzh: '',
        dkzl: '',
        yhtbh: '',
        ydkrq: '',
        ydkje: '',
        ydqrq: '',
        ll: '',
        sqzqjedx: '',
        sqzqje: '',
        bszrr: '',
        glzrr: '',
        bz: '',
        sqzqhkly: '',
        sszh: '',
        sqzqqx: '',
        sqzqrq: '',
        fjxxList:null,
        zjhm:'',
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(tmp, 'khmc', 'dkzh', 'dkzl', 'yhtbh', 'ydkrq', 'ydkje', 'ydqrq', 'll', 'sqzqjedx', 'sqzqje', 'bszrr', 'glzrr', 'bz', 'sqzqhkly', 'sszh', 'sqzqqx', 'sqzqrq','fjxxList','zjhm'))
      })
      this.isEdit = false
      this.deleteFiles = []
      this.$emit('close')
      this.close()
    },
    getDkxx() {
      let khmc = this.form.getFieldValue('khmc')
      let dkzh = this.form.getFieldValue('dkzh')
      let zjhm = this.form.getFieldValue('zjhm')
      if (!this.isCheck(khmc) && !this.isCheck(dkzh) && !this.isCheck(zjhm)) {
        this.$message.error('查询条件不能为空！！')
      } else {
        let params = {
          khmc: khmc,
          dkzh: dkzh,
          zjhm: zjhm
        }
        this.confirmLoading = true
        getAction('/dkzqywsp/camsZqywspYwzc/getDkxx', params).then(res => {
          if (res.success) {
            if (res.result == null || res.result == undefined || res.result.length == 0) {
              this.$message.warning('未查询到相关贷款信息！！')
            } else {
              if (res.result.length > 1) {
                this.$refs.dkxx.visible = true
                this.$refs.dkxx.init(res.result)
              } else {
                if (res.result[0].ydkje != null && res.result[0].ydkje != '' && res.result[0].ydkje != undefined) {
                  res.result[0].ydkje = Number(res.result[0].ydkje) / 10000
                  this.ydkjeChange(res.result[0].ydkje)
                }
                let tmp = Object.assign({}, res.result[0])
                this.$nextTick(() => {
                  this.form.setFieldsValue(pick(tmp, 'khmc', 'dkzh', 'dkzl', 'yhtbh', 'ydkrq', 'ydkje', 'ydqrq','zjhm'))
                })
              }
            }
          } else {
            this.$message.error('查询贷款信息失败！！请联系管理员！！')
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      }
    },
    isCheck(e) {
      if (e == null || e == undefined || e == '') {
        return false
      }
      return true
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let formData = Object.assign(this.model, values)
          let dkspKhzlList = []
          if (formData.fjxxList != null && formData.fjxxList != undefined && formData.fjxxList.length > 0) {
            formData.fjxxList.forEach((fjxx, index) => {
              if (fjxx) {
                console.log('fjxx', fjxx)
                let khzl = { zlmc: fjxx.name, fwlj: fjxx.path, zllx: index == 0 ? 9 : 10 }
                dkspKhzlList.push(khzl)
              }
            })
          }
          formData.dkspKhzlList = dkspKhzlList
          formData.deleteFiles = this.deleteFiles
          let url = ''
          let method = ''
          if (!this.isEdit) {
            url = '/dkzqywsp/camsZqywspYwzc/add'
            method = 'post'
          } else {
            url = '/dkzqywsp/camsZqywspYwzc/edit'
            method = 'put'
            formData.id = this.row.id
          }
          console.log('龚辉' + JSON.stringify(formData.dkspKhzlList))
          httpAction(url, formData, method).then(res => {
            if (res.success) {
              if (this.isEdit) {
                this.$message.success('修改成功！！')
              } else {
                let that = this
                this.$confirm({
                  title: '操作成功',
                  okText: '确定',
                  cancelText: '取消',
                  content: '当前为"草稿"状态，建议立即到<我的申请>中提交该审批流程，是否立即跳转到我的申请??',
                  onOk: () => {
                    this.$router.push({
                      path: '/activiti/apply-manage/applyManage'
                    })
                  },
                  onCancel: e => {
                    if (e.triggerCancel) {
                      this.handleCancel()
                      that.$message.success('添加成功！！')
                      return
                    }
                    // 函数体 方法
                    e()
                  }
                })
              }
            } else {
              this.$message.error('执行失败！！请联系管理员！！')
            }
          }).finally(() => {
            this.handleCancel()
          })
        }
      })
    },
    closeDkxx(dkxx) {
      if (dkxx.ydkje != null && dkxx.ydkje != '' && dkxx.ydkje != undefined) {
        dkxx.ydkje = Number(dkxx.ydkje) / 10000
        this.ydkjeChange(dkxx.ydkje)
      }
      let tmp = Object.assign({}, dkxx)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(tmp, 'khmc', 'dkzh', 'dkzl', 'yhtbh', 'ydkrq', 'ydkje', 'ydqrq'))
      })
    },
    sqzqjeChange(value) {
      if (value) {
        let sqzqje = digitUppercase(value * 10000)
        this.form.setFieldsValue({ 'sqzqjedx': sqzqje })
      }
    },
    ydkjeChange(value) {
      if (value) {
        let ydkje = digitUppercase(value * 10000)
        this.form.setFieldsValue({ 'ydkjedx': ydkje })
      }
    },
    imageUploadChange(data, type) {
      let path = data.path
      console.log('imageUploadChange', data, type)
    },
    viewFj(record) {
      console.log(record)
      let url = `${window._CONFIG['staticDomainURL']}/` + record.fwlj
      window.open(
        //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
        `${window._CONFIG['kkFileViewURL']}` + '?url=' + encodeURIComponent(Base64.encode(url))
      )
    },
    down(record) {
      console.log(record)
      //http://127.0.0.1:3001/cmms/sys/common/download/demo_1594171157273.docx
      window.open(
        `${window._CONFIG['staticDomainURL']}/` + record.fwlj
      )
    },
    doDelete(record) {
      console.log('doDelete', record)
      this.deleteFiles.push(record.id)
      this.khzlColumns.data = this.khzlColumns.data.filter(item => {
        return item.id != record.id
      })
      //判断还有没有附件
      let zllx = '9'
      let fjxxList = this.form.getFieldValue('fjxxList')

      let khzlList = this.khzlColumns.data.filter(item => {
        return item.zllx == zllx
      })
      if (!fjxxList[0] && khzlList.length === 0) {
        this.validatorRules.spzl = { rules: [{ required: true, message: '请上传审批资料!' }] }
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>