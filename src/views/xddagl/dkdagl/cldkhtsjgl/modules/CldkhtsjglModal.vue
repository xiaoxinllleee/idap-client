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
            <span slot="tab"><a-icon type="book"/>基本信息</span>

            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="机构代码">
                  <j-tree-select
                    v-decorator="['jgdm',validatorRules.jgdm ]"
                    placeholder="请选择机构代码"
                    treeNodeFilterProp="title"
                    dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                    :sszh="true"
                    pid-field="sjywjgdm"
                    :showSearch="true"
                    :treeDefaultExpandAll=true
                    :disabled="this.disabled"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户姓名">
                  <a-input placeholder="请输入客户姓名" v-decorator="['khmc', {}]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户类型">
                  <j-dict-select-tag placeholder="请输入客户类型" v-decorator="['khlx', {}]" :triggerChange="true"
                                     dictCode="xdda_khlx" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="联系电话">
                  <a-input placeholder="请输入联系电话" v-decorator="['lxdh', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="联系地址">
                  <a-input placeholder="请输入联系地址" v-decorator="['lxdz', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签约日期">
                  <a-date-picker v-decorator="[ 'qyrq', {}]" style="width: 100%" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="合同号">
                  <a-input placeholder="请输入合同号" v-decorator="['hth', validatorRules.hth ]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="业务编号">
                  <a-input placeholder="请输入业务编号" v-decorator="['ywbh', {}]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="放款日期">
                  <a-date-picker v-decorator="[ 'fkrq', {}]" style="width: 100%" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="到期日期">
                  <a-date-picker v-decorator="[ 'dqrq', {}]" style="width: 100%" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签约期限">
                  <a-input placeholder="请输入签约期限" v-decorator="['qyqx', {}]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签约金额">
                  <a-input placeholder="请输入签约金额" v-decorator="['qyje', {}]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="数据日期">
                  <a-date-picker v-decorator="[ 'sjrq', {}]" style="width: 100%" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款金额">
                  <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款余额">
                  <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="最早贷款日期">
                  <a-date-picker v-decorator="[ 'zzdkrq', {}]" style="width: 100%" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="最早到期日期">
                  <a-date-picker v-decorator="[ 'zzdqrq', {}]" style="width: 100%" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款品种">
                  <j-dict-select-tag placeholder="请选择贷款品种" v-decorator="['dkpz', {}]" :triggerChange="true"
                                     dictCode="dkzl"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款品种(补充)">
                  <j-dict-select-tag placeholder="请选择贷款品种(补充)" v-decorator="['dkpzbc', {}]" :triggerChange="true"
                                     dictCode="dkzlbc"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="担保方式">
                  <j-dict-select-tag placeholder="请选择担保方式" v-decorator="['dbfs', {}]" dictCode="dbfs"
                                     :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款责任人工号">
                  <a-input placeholder="请输入贷款责任人工号" v-decorator="['dkzrr', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否用信">
                  <j-dict-select-tag placeholder="请选择是否用信" v-decorator="['sfsx', {}]" dictCode="yxzt"
                                     :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="档案编号">
                  <a-input placeholder="请输入档案编号" v-decorator="['dabh', {}]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否上传档案">
                  <j-dict-select-tag placeholder="请选择是否上传档案" v-decorator="['sfscda', {}]" dictCode="sfbs"
                                     :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>

          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="book"/>附件管理</span>
            <a-card>
              <form>
                <a-table :columns="columns_fjxx"
                         :dataSource="dataSource_fjxx"
                         :pagination="false">
                  <!--                <span slot="action" slot-scope="text, record">-->
                  <!--                  <photo-view ref="pictureView" @ok="modalFormOk"/>-->
                  <!--                </span>-->
                  <span slot="action" slot-scope="text, record">
                  <!--<photo-view ref="pictureView" @ok="modalFormOk"/>-->
                   <a @click="view(record)">预览</a>
                     <a-divider type="vertical"/>
                   <a @click="down(record)">下载</a>
                     <a-divider type="vertical"/>
                   <a @click="tiqu(record)">提取</a>
                     <a-divider type="vertical"/>
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
                    label="资料类型">
                    <j-dict-select-tag placeholder="请选择资料类型" v-model="zllx" @input="zllxChange"
                                       dictCode="cldkhtsjgl_fjlx" styel="width: 70%"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="贷后管理时间"
                    v-show="this.zllx == '2'">
                    <a-date-picker v-model="dhglsj" style="width: 100%"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-upload-dragger
                name="file"
                :multiple="true"
                :disabled="flag"
                :action="uploadAction"
                :data="{biz:'xddazlpdf/'+bizPath}"
                @change="handleChange"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox"/>
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
    <tiqu-modal ref="tiquModal" @close="TiquClose" @ok="tiquOK"></tiqu-modal>

  </a-modal>
</template>

<script>
  import {deleteAction, httpAction} from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import pick from 'lodash.pick'
  import moment from 'moment'
  import {getAction} from '../../../../../api/manage'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import ARow from 'ant-design-vue/es/grid/Row'
  import JiamiModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/JiamiModal'
  import TiquModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/TiquModal'
  import store from '@/store/'
  let Base64 = require('js-base64').Base64;

  export default {
    name: 'CldkhtsjglModal',
    components: {
      ARow, JTreeSelect, JUploadOne, JiamiModal, TiquModal
    },
    data() {
      return {
        hth: '',
        zllx: '',
        dhglsj: '',
        bizPath: '',
        show: false,
        uploadAction: window._CONFIG['domianURL'] + '/sys/common/upload',
        urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
        fjxxList: [],
        title: '操作',
        visible: false,
        imgdate: {},
        flag: true,
        disableSubmit: true,
        disabled: false,
        model: {},
        columns_fjxx: [
          {
            title: '文件类型',
            dataIndex: 'fjlx_dictText',
            align: 'center',
            key: 'fjlx'
          },
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
            scopedSlots: {customRender: 'action'}
          },
          {
            title: '贷后管理时间',
            dataIndex: 'dhglsj',
            key: 'dhglsj'
          }
        ],
        dataSource_fjxx: [],
        labelCol: {
          xs: {span: 24},
          sm: {span: 5}
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16}
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          hth: {rules: [{required: true, message: '请输入合同号!'}]}
        },
        url: {
          add: '/cldkhtsjgl/cldkhtsjgl/add',
          edit: '/cldkhtsjgl/cldkhtsjgl/edit',
          delete: '/cldkhtsjglfjxx/cldkhtsjglFjxx/delete'
        }
      }
    },

    created() {

    },
    methods: {
      tiquOK(msg) {
        console.info('message', msg)
        const param = {
          'ymbegin': msg.ymbegin,
          'ymend': msg.ymend,
          'wjlj': msg.wjlj
        }
        getAction('/sys/common/downLoadJmtqWj', param).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            window.open(
              `${window._CONFIG['downloadJmWJDomainURL']}/` + res.result + "?passWord=" + msg.password
            )
          } else {
            this.$message.warning("提取失败！")
          }
        })
      },
      TiquClose() {
        console.log('提取已关闭！')
      },
      tiqu(record) {
        console.log('文件路径:', record.wjlj)
        this.wjlj = record.wjlj;
        this.$refs.tiquModal.init();
        this.$refs.tiquModal.wjlj = record.wjlj
      },
      down(record) {
        console.log('文件路径:', record.wjlj)
        this.wjlj = record.wjlj;
        this.$refs.jiamiModal.init()
      },
      JiamiClose() {
        console.log('加密已关闭！')
      },
      JiamiOk(password) {
        window.open(
          `${window._CONFIG['downloadJmWJDomainURL']}/` + this.wjlj + "?passWord=" + password
        )
      },

      view(record) {
        console.log(record)
        let url = `${window._CONFIG['staticDomainURL']}/` + record.fwlj;
        console.log(url)
        window.open(
          //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
          `${window._CONFIG['kkFileViewURL']}` + '?url=' + encodeURIComponent(Base64.encode(url)) + '&watermarkTxt=' + encodeURIComponent(store.getters.userInfo.realname)
        );
      },


      loadFjxxData(hth) {
        getAction('/dkdaglfjxx/dkdaglFjxx/queryFjxx', {'hth': hth}).then((res) => {
          this.dataSource_fjxx = res.result
        })
      },

      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, {wjid: record.wjid}).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            this.loadFjxxData(record.hth)
          } else {
            that.$message.warning(res.message)
          }
        })
      },

      imageUploadChange(data) {
        let path = data.path
        console.log(path)
      },
      zllxChange(val) {
        if (val == '' || val == 'undefined') {
          this.flag = true
        } else {
          this.flag = false
        }
      },
      handleChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          let fileObject = info.file
          let fileList = info.fileList
          let dhsj = moment(this.dhglsj).format('YYYY-MM-DD')
          fileList.forEach(item => {
            if (item.uid.indexOf(fileObject.uid) != -1) {
              item.name = this.zllx + '_' + item.name
            }
          })
          this.dhglsj = dhsj
          console.log('@@@@@@@@@@@@' + this.dhglsj)
          this.fjxxList = fileList
          console.log(this.fjxxList)
          this.$message.success(`${info.file.name} 文件上传成功.`)
          this.flag = true
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} 文件上传失败.`)
        }

      },

      add() {
        this.edit({})
      },
      edit(record) {
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
          this.form.setFieldsValue(pick(this.model, 'jgdm', 'zjhm', 'khmc', 'khlx', 'lxdh', 'lxdz', 'hth', 'ywbh', 'qyqx', 'qyje', 'dkje', 'dkye', 'sfsx', 'dkzrr', 'dkpz', 'dabh', 'sfscda', 'dkpzbc', 'dbfs'))
          //时间格式化
          this.form.setFieldsValue({sjrq: this.model.sjrq ? moment(this.model.sjrq) : null})
          this.form.setFieldsValue({qyrq: this.model.qyrq ? moment(this.model.qyrq) : null})
          this.form.setFieldsValue({fkrq: this.model.fkrq ? moment(this.model.fkrq) : null})
          this.form.setFieldsValue({dqrq: this.model.dqrq ? moment(this.model.dqrq) : null})
          this.form.setFieldsValue({zzdkrq: this.model.zzdkrq ? moment(this.model.zzdkrq) : null})
          this.form.setFieldsValue({zzdqrq: this.model.zzdqrq ? moment(this.model.zzdqrq) : null})
        });
        getAction('/dkdaglfjxx/dkdaglFjxx/queryFjxx', {'hth': record.hth}).then((res) => {
          this.dataSource_fjxx = res.result
        })

      },
      close() {
        this.$emit('close')
        this.fjxxList = []
        this.flag = true
        this.dhglsj = ''
        this.zllx = ''
        this.visible = false
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            //that.confirmLoading = true
            let httpurl = ''
            let method = ''
            if (!this.model.hth) {
              httpurl += this.url.add
              method = 'post'
            } else {
              httpurl += this.url.edit
              method = 'put'
            }
            this.imgdate = {'imgdate': this.fjxxList}
            let formData = Object.assign(this.model, values, this.imgdate, {'zllx': this.zllx, 'dhglsj': this.dhglsj})

            formData.sjrq = formData.sjrq?formData.sjrq.format():null;
            formData.qyrq = formData.qyrq?formData.qyrq.format():null;
            formData.fkrq = formData.fkrq?formData.fkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.zzdkrq = formData.zzdkrq?formData.zzdkrq.format():null;
            formData.zzdqrq = formData.zzdqrq?formData.zzdqrq.format():null;

            if (this.zllx == 2 && this.dhglsj == ''){
              this.$message.warning('请选择贷后管理时间')
              return
            }
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
      handleCancel() {
        this.close()
      }

    }
  }
</script>

<style lang="less" scoped>

</style>