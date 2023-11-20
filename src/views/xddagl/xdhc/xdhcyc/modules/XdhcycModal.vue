<template>
  <a-modal
    :title="title"
    :width="1400"
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
                  label="序号">
                  <a-input placeholder="请输入序号" v-decorator="['xh', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="机构代码">
                  <a-input placeholder="请输入机构代码" v-decorator="['jgdm', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="机构名称">
                  <a-input placeholder="请输入机构代码" v-decorator="['jgdm_dictText', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户姓名">
                  <a-input placeholder="请输入客户姓名" v-decorator="['khxm', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="手机号码">
                  <a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="合同号">
                  <a-input placeholder="请输入合同号" v-decorator="['hth', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="最新借款日期">
                  <a-date-picker v-decorator="[ 'zxjkrq', {}]" style="width:100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款金额">
                  <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="担保方式">
                  <a-input placeholder="请输入担保方式" v-decorator="['dbfs', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="第一责任人">
                  <a-input placeholder="请输入第一责任人" v-decorator="['zrr', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="利率">
                  <a-input placeholder="请输入利率" v-decorator="['ll', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="主客户经理">
                  <a-input placeholder="请输入主客户经理" v-decorator="['khjl', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="合同批准日">
                  <a-date-picker v-decorator="[ 'htzpr', {}]" style="width:100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="合同金额">
                  <a-input placeholder="请输入合同金额" v-decorator="['htje', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否核查">
                  <!--          <a-input placeholder="请输入是否核查" v-decorator="['sfhc', {}]" />-->
                  <j-dict-select-tag :trigger-change="true" dict-code="sfhc" v-decorator="['sfhc', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="核查日期">
                  <a-date-picker v-decorator="[ 'lrsj', {}]" style="width:100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="核查人员">
                  <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
                </a-form-item>
              </a-col>
            </a-row>

          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="book" />附件管理</span>
            <a-card>
              <a-table :columns="columns_fjxx"
                       :dataSource="dataSource_fjxx"
                       :pagination="false">
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
            </a-card>
            <a-card v-show="this.show">
              <a-row>
                <a-col :span="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="资料类型">
                    <j-dict-select-tag placeholder="请选择资料类型" v-model="zllx" @input="zllxChange" dictCode="xdhc_fjlx"
                                       style="width: 70%" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-upload-dragger
                name="file"
                :multiple="true"
                :disabled="flag"
                :action="uploadAction"
                :data="{biz:'xdhcyc/'+bizPath}"
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
import { deleteAction, getAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import store from '@/store/'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JiamiModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/JiamiModal'
let Base64 = require('js-base64').Base64;

export default {
  name: 'XdhcycModal',
  components: {
    JTreeSelect, JiamiModal
  },
  data () {
    return {
      hth: '',
      title: '操作',
      visible: false,
      zllx: '',
      bizPath: '',
      show: false,
      uploadAction: window._CONFIG['domianURL'] + '/sys/common/upload',
      urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
      fjxxList: [],
      imgdate: {},
      flag: true,
      model: {},
      columns_fjxx: [
        // {
        //   title: '文件类型',
        //   dataIndex: 'fjlx_dictText',
        //   align: 'center',
        //   key: 'fjlx'
        // },
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
      disabled: false,
      disableSubmit: true,
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
      validatorRules: {},
      url: {
        add: '/xdhcyc/xdhcyc/add',
        edit: '/xdhcyc/xdhcyc/edit',
        deletefjxx: '/sfwglfjxx/sfwglFjxx/delete',
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

    // imageUploadChange(data) {
    //   let path = data.path
    //   console.log(path)
    // },
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
            item.name = this.zllx + '_' + item.name
          }
        })
        this.fjxxList = fileList
        console.log('@@@@@@@@@@@@' + this.fjxxList)
        this.$message.success(`${info.file.name} 文件上传成功.`)
        this.flag = true
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`)
      }
    },

    add () {
      this.edit({})
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
      console.log('@@@@@@@@@@@@' + this.bizPath)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'xh', 'jgdm', 'jgdm_dictText', 'khxm', 'sjhm', 'zjhm', 'hth', 'dkje', 'dbfs', 'zrr', 'll', 'khjl', 'htje', 'sfhc', 'lrr'))
        //时间格式化
        this.form.setFieldsValue({ zxjkrq: this.model.zxjkrq ? moment(this.model.zxjkrq) : null })
        this.form.setFieldsValue({ htzpr: this.model.htzpr ? moment(this.model.htzpr) : null })
        this.form.setFieldsValue({ lrsj: this.model.lrsj ? moment(this.model.lrsj) : null })
      });
      this.hth = record.hth;
      this.loadFjxxData(record.hth);
    },
    loadFjxxData(hth){
      getAction('/sfwglfjxx/sfwglFjxx/queryXdhcFjxx', { "hth": hth }).then((res) => {
        this.dataSource_fjxx = res.result
      });
    },

    close () {
      this.$emit('close')
      this.fjxxList = []
      this.flag = true
      this.zllx = ''
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
          if (!this.model.hth) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          this.imgdate = { 'imgdate': this.fjxxList }
          let formData = Object.assign(this.model, values, this.imgdate, { 'zllx': this.zllx })
          //时间格式化
          // formData.zxjkrq = formData.zxjkrq?formData.zxjkrq.format():null;
          // formData.htzpr = formData.htzpr?formData.htzpr.format():null;
          // formData.lrsj = formData.lrsj?formData.lrsj.format():null;

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