<template>
  <a-modal
    :title="title"
    :width="1600"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1" animated="animated">
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="book" />基本信息</span>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="数据日期">
                  <a-date-picker v-decorator="[ 'tjyf', {}]" disabled="disabled" style="width:100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="机构代码">
                  <a-input v-decorator="['jgdm_dictText', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户姓名">
                  <a-input v-decorator="['khmc', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input v-decorator="['zjhm', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户类型">
                  <a-input v-decorator="['khlx', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="地址">
                  <a-input v-decorator="['dz', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款账号">
                  <a-input v-decorator="['dkzh', validatorRules.dkzh ]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="便民卡卡号">
                  <a-input v-decorator="['bmkkh', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款金额">
                  <a-input v-decorator="['dkje', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款余额">
                  <a-input v-decorator="['dkye', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="借款日期">
                  <a-date-picker v-decorator="[ 'jkrq', {}]" disabled="disabled" style="width:100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="到期日期">
                  <a-date-picker v-decorator="[ 'dqrq', {}]" disabled="disabled" style="width:100%" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="起息日">
                  <a-date-picker v-decorator="[ 'qxr', {}]" disabled="disabled" style="width:100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="结息日">
                  <a-input v-decorator="['jxr', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款期限">
                  <a-input v-decorator="['dkqx', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="产品名称">
                  <a-input v-decorator="['cpmc', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="剩余天数">
                  <a-input v-decorator="['syts', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="欠息天数">
                  <a-input v-decorator="['qxts', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="表内应计利息">
                  <a-input v-decorator="['bnyjlx', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="表内应收利息">
                  <a-input v-decorator="['bnyslx', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="表外应计利息">
                  <a-input v-decorator="['bwyjlx', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="表外应收利息">
                  <a-input v-decorator="['bwyslx', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="表内外欠息和">
                  <a-input v-decorator="['bnwqxh', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款利率">
                  <a-input v-decorator="['dkll', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="担保方式">
                  <a-input v-decorator="['dbfs', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="第一责任人">
                  <a-input placeholder="请输入第一责任人" v-decorator="['dyzrr', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="主客户经理">
                  <a-input placeholder="" v-decorator="['khjlbz', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="label"
                  :wrapperCol="wrapper"
                  label="客户所属行业类型">
                  <a-input placeholder="请输入所属行业类型" v-decorator="['khsshylx_dictText', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款投向">
                  <a-input placeholder="请输入贷款投向" v-decorator="['dktx', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款形态">
                  <a-input placeholder="请输入贷款形态" v-decorator="['dkxt', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="信贷贷款品种">
                  <a-input placeholder="请输入信贷贷款品种" v-decorator="['xddkpz_dictText', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="到期情况监测">
                  <j-dict-select-tag :triggerChange="true" dict-code="dqqkjc" v-decorator="['dqqkjc', {}]"
                                     disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="不良形成原因">
                  <!--          <a-input placeholder="请输入不良形成原因" v-decorator="['blxcyy', {}]" />-->
                  <j-dict-select-tag :triggerChange="true" dict-code="blxcyy" v-decorator="['blxcyy', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="责任界定">
                  <!--          <a-input placeholder="请输入责任界定" v-decorator="['zrjd', {}]" />-->
                  <j-dict-select-tag :triggerChange="true" dict-code="zrjd" v-decorator="['zrjd', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="清收处置措施">
                  <!--          <a-input placeholder="请输入清收处置措施" v-decorator="['qsczcs', {}]" />-->
                  <j-dict-select-tag :triggerChange="true" dict-code="qsczcs" v-decorator="['qsczcs', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="清收处置时限">
                  <a-input placeholder="请输入清收处置时限" v-decorator="['qsczsx', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="主要责任人">
                  <a-input placeholder="请输入主要责任人" v-decorator="['zyzrr', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="次要责任人">
                  <a-input placeholder="请输入次要责任人" v-decorator="['cyzrr', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="清收责任人">
                  <a-input placeholder="请输入清收责任人" v-decorator="['qszrr', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="备注">
                  <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>

          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="book" />附件管理</span>
            <a-card>
              <form>
                <a-table :columns="columns_fjxx"
                         :dataSource="dataSource_fjxx"
                         :pagination="false">
                  <!--                <span slot="action" slot-scope="text, record">-->
                  <!--                  <photo-view ref="pictureView" @ok="modalFormOk"/>-->
                  <!--                </span>-->
                  <span slot="action" slot-scope="text, record">
                     <a @click="view(record)">预览</a>
                   <a-divider type="vertical" />
                   <a @click="down(record)">下载</a>
                     <a-divider type="vertical" />
                    <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                    <a>删除</a>
                   </a-popconfirm>
                    </span>

                </a-table>
              </form>
            </a-card>
            <a-card v-show="this.show">
              <a-row>
                <a-col :span="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="类型">
                    <j-dict-select-tag placeholder="请选择类型" v-model="lx" @input="zllxChange" dictCode="fjlx" />
                  </a-form-item>
                </a-col>

              </a-row>
              <a-upload-dragger
                name="file"
                :multiple="true"
                :disabled="flag"
                :action="uploadAction"
                :data="{biz:'xdhc01/'+bizPath}"
                @change="handleChange"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">
                  点击选择或者拖拽PDF文件上传
                </p>

              </a-upload-dragger>
            </a-card>


          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
    <jiami-modal ref="jiamiModal" @close="JiamiClose" @ok="JiamiOk"></jiami-modal>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import store from '@/store/'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import ARow from 'ant-design-vue/es/grid/Row'
import { deleteAction, getAction } from '../../../../../api/manage'
import JiamiModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/JiamiModal'
let Base64 = require('js-base64').Base64;

export default {
  name: 'Xdhc01Modal',
  components: {
    JTreeSelect, ARow, JiamiModal
  },
  data () {
    return {
      lx: '',
      bizPath: '',
      show: false,
      uploadAction: window._CONFIG['domianURL'] + '/sys/common/upload',
      urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
      imgdate: {},
      title: '操作',
      cldkhtsjglFjxxList: [],
      flag: true,
      visible: false,
      disabled: false,
      disableSubmit: true,
      model: {},
      columns_fjxx: [
        {
          title: '文件名称',
          dataIndex: 'wjlj',
          align: 'center',
          key: 'wjlj',
          customRender: function (text) {
            return !text ? "" : (text.length > 0 ? text.substr(text.lastIndexOf("/")+1) : text)
          },
        },
        {
          title: '文件类型',
          dataIndex: 'fjlx_dictText',
          align: 'center',
          key: 'fjlx'
        },
        {
          title: '上传人',
          dataIndex: 'lrr',
          align: 'center',
          key: 'lrr'
        },
        {
          title: '上传时间',
          dataIndex: 'lrsj',
          align: 'center',
          key: 'lrsj'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }

      ],
      dataSource_fjxx: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      label: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapper: {
        xs: { span: 24 },
        sm: { span: 15 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        dkzh: { rules: [{ required: true, message: '请输入贷款账号!' }] }
      },
      url: {
        add: '/xdhc01/xdhc01/add',
        edit: '/xdhc01/xdhc01/edit',
        deletefjxx: '/xdhcfjxx/xdhcfjxx/delete',
      }
    }
  },
  created () {
  },
  methods: {
    down(record){
      console.log('文件路径:',record.wjlj)
      this.wjlj=record.wjlj;
      this.$refs.jiamiModal.init()
    },
    JiamiClose() {
      console.log('加密已关闭！')
    },
    JiamiOk(password) {
      window.open(
        `${window._CONFIG['downloadJmWJDomainURL']}/`+ this.wjlj+"?passWord="+password
      )
    },
    view (record) {
      console.log(record)
      let url = `${window._CONFIG['staticDomainURL']}/` + record.fwlj

      console.log(url)
      window.open(
        //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
        `${window._CONFIG['kkFileViewURL']}` + '?url=' + encodeURIComponent(Base64.encode(url)) + '&watermarkTxt=' + encodeURIComponent(store.getters.userInfo.realname)
      )
    },
    handleDelete: function (record) {
      console.log(record)
      if (!this.url.deletefjxx) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      deleteAction(that.url.deletefjxx, { wjid: record.wjid }).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadFjxxData(this.dkzh)
        } else {
          that.$message.warning(res.message)
        }
      })
    },

    edit (record) {
      if(JSON.stringify(record)=='{}'){
        this.show = false
      }else {
        this.show = true
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.bizPath = this.model.khmc + '_' + this.model.zjhm
      console.log(this.bizPath)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'jgdm_dictText', 'khmc', 'zjhm', 'khlx', 'dz', 'dkzh', 'bmkkh', 'dkje', 'dkye', 'jxr', 'dkqx', 'cpmc', 'syts', 'qxts', 'bnyjlx', 'bnyslx', 'bwyjlx', 'bwyslx', 'bnwqxh', 'dkll', 'dbfs', 'dyzrr', 'khjlbz', 'khsshylx_dictText', 'dktx', 'dkxt', 'xddkpz_dictText', 'dqqkjc', 'blxcyy', 'zrjd', 'qsczcs', 'qsczsx', 'qszrr', 'bz', 'zyzrr'))
        //时间格式化
        this.form.setFieldsValue({ tjyf: this.model.tjyf ? moment(this.model.tjyf) : null })
        this.form.setFieldsValue({ jkrq: this.model.jkrq ? moment(this.model.jkrq) : null })
        this.form.setFieldsValue({ dqrq: this.model.dqrq ? moment(this.model.dqrq) : null })
        this.form.setFieldsValue({ qxr: this.model.qxr ? moment(this.model.qxr) : null })
        //this.form.setFieldsValue({ lrsj: this.model.lrsj ? moment(this.model.lrsj) : null })
      })
      this.dkzh = record.dkzh
      this.loadFjxxData(record.dkzh)

    },

    loadFjxxData (dkzh) {
      getAction('/xdhcfjxx/xdhcfjxx/queryFjxx', { 'dkzh': dkzh }).then((res) => {
        this.dataSource_fjxx = res.result
      })
    },

    zllxChange (val) {
      if (val == '' || val == 'undefined') {
        this.flag = true
      } else {
        this.flag = false
      }
    },

    handleChange (info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        let fileObject = info.file
        let fileList = info.fileList
        fileList.forEach(item => {
          if (item.uid.indexOf(fileObject.uid) != -1) {
            item.name = this.lx + '_' + item.name
          }
        })
        this.fjxxList = fileList
        console.log(this.fjxxList)
        this.$message.success(`${info.file.name} 文件上传成功.`)

      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`)
      }
    },
    add () {
      this.edit({})
    },
    close () {
      this.$emit('close')
      this.cldkhtsjglFjxxList = []
      this.flag = true
      this.lx = ''
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
          if (!this.model.dkzh) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          this.imgdate = { 'imgdate': this.fjxxList }
          let formData = Object.assign(this.model, values, this.imgdate, { 'lx': this.lx })
          //时间格式化
          //formData.tjyf = formData.tjyf?formData.tjyf.format():null;
          //formData.jkrq = formData.jkrq?formData.jkrq.format():null;
          //formData.dqrq = formData.dqrq?formData.dqrq.format():null;
          //formData.qxr = formData.qxr?formData.qxr.format():null;
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
    },
    handleCancel () {
      this.close()
    }

  }
}
</script>

<style lang="less" scoped>

</style>