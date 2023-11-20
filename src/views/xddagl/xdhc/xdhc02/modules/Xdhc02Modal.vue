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
                  label="机构代码">
                  <a-input placeholder="请输入机构代码" v-decorator="['jgdm_dictText', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户姓名">
                  <a-input placeholder="请输入客户姓名" v-decorator="['khmc', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户类型">
                  <a-input placeholder="请输入客户类型" v-decorator="['khlx_dictText', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="联系电话">
                  <a-input placeholder="请输入联系电话" v-decorator="['lxdh', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="联系地址">
                  <a-input placeholder="请输入联系地址" v-decorator="['lxdz', {}]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签约日期">
                  <a-date-picker v-decorator="[ 'qyrq', {}]" disabled="disabled" style="width:100%"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="合同号">
                  <a-input placeholder="请输入合同号" v-decorator="['hth', validatorRules.hth ]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="业务编号">
                  <a-input placeholder="请输入业务编号" v-decorator="['ywbh', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="放款日期">
                  <a-date-picker v-decorator="[ 'fkrq', {}]" disabled="disabled" style="width:100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="到期日期">
                  <a-date-picker v-decorator="[ 'dqrq', {}]" disabled="disabled" style="width:100%"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签约期限">
                  <a-input placeholder="请输入签约期限" v-decorator="['qyqx', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签约金额">
                  <a-input placeholder="请输入签约金额" v-decorator="['qyje', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="数据日期">
                  <a-date-picker v-decorator="[ 'sjrq', {}]" disabled="disabled" style="width:100%"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款金额">
                  <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款余额">
                  <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="最早贷款日期">
                  <a-date-picker v-decorator="[ 'zzdkrq', {}]" disabled="disabled" style="width:100%"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="最早到期日期">
                  <a-date-picker v-decorator="[ 'zzdqrq', {}]" disabled="disabled" style="width:100%"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款品种">
                  <!--          <a-input placeholder="请输入贷款品种" v-decorator="['dkpz', {}]" />-->
                  <j-dict-select-tag :trigger-change="true" dict-code="dkzl" v-decorator="['dkpz', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款品种(补充)">
                  <!--          <a-input placeholder="请输入贷款品种(补充)" v-decorator="['dkpzbc', {}]" />-->
                  <j-dict-select-tag :trigger-change="true" dict-code="dkzlbc" v-decorator="['dkpzbc', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="担保方式">
                  <j-dict-select-tag :trigger-change="true" dict-code="gljydbfs" v-decorator="['dbfs_dictText', {}]" disabled="disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款责任人工号">
                  <a-input placeholder="请输入贷款责任人工号" v-decorator="['dkzrr', {}]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否用信">
                 <!-- <a-input placeholder="请输入是否用信" v-decorator="['sfsx_dictText', {}]" disabled="disabled" />-->
                  <j-dict-select-tag :trigger-change="true" dict-code="yxzt" v-decorator="['sfsx', {}]" disabled="disabled"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="档案编号">
                  <a-input placeholder="请输入档案编号" v-decorator="['dabh', {}]" disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否上传档案">
                 <!-- <a-input placeholder="请输入是否上传档案" v-decorator="['sfscda_dictText', {}]" disabled="disabled" />-->
                  <j-dict-select-tag :trigger-change="true" dict-code="sfbs" v-decorator="['sfscda', {}]" disabled="disabled"/>
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
                      <j-dict-select-tag  v-model="fjlx" @input="zllxChange" dictCode="cldkhtsjgl_fjlx" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="贷后管理时间"
                      v-show="this.fjlx == '2'">
                      <a-date-picker v-model="dhglsj" style="width: 100%"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-upload-dragger
                  name="file"
                  :multiple="true"
                  :disabled="flag"
                  :action="uploadAction"
                  :data="{biz:'xdhc02/'+bizPath}"
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
import { deleteAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import store from '@/store/'
import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
import { getAction } from '../../../../../api/manage'
import JiamiModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/JiamiModal'
let Base64 = require('js-base64').Base64;

export default {
  name: 'Xdhc02Modal',
  components: {
    JTreeSelect, JiamiModal
  },
  data () {
    return {
      fjlx:'',
      dhglsj: '',
      bizPath:'',
      imgdate:{},
      show: false,
      uploadAction:window._CONFIG['domianURL']+"/sys/common/upload",
      urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
      fjxxList:[],
      title: '操作',
      visible: false,
      disabled: false,
      cldkhtsjglFjxxList: [],
      flag: true,
      disableSubmit: true,
      model: {},
      columns_fjxx:[
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
          title: '贷后管理时间',
          dataIndex: 'dhglsj',
          key: 'dhglsj'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource_fjxx:[],
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
        hth: { rules: [{ required: true, message: '请输入合同号!' }] }
      },
      url: {
        add: '/xdhc02/xdhc02/add',
        edit: '/xdhc02/xdhc02/edit',
        deletefjxx: '/dkdaglfjxx/dkdaglFjxx/delete',
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

    zllxChange(val){
      if(val==''||val=='undefined'){
        this.flag=true;
      }else{
        this.flag=false;
      }
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        let fileObject=info.file
        let fileList=info.fileList;
        fileList.forEach(item =>{
          if(item.uid.indexOf(fileObject.uid) != -1){
            item.name=this.fjlx+"_"+item.name;
          }
        })
        this.fjxxList=fileList;
        console.log(this.fjxxList)
        this.$message.success(`${info.file.name} 文件上传成功.`);

      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`);
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
      this.bizPath= this.model.khmc+"_"+this.model.zjhm;
      console.log(this.bizPath)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'jgdm_dictText', 'zzdqrq', 'zjhm', 'khmc', 'khlx_dictText', 'lxdh', 'lxdz', 'hth', 'ywbh', 'qyqx', 'qyje', 'dkje', 'dkye', 'sfsx', 'dkzrr', 'dkpz', 'dabh', 'sfscda', 'dkpzbc', 'dbfs_dictText'))
        //时间格式化
        this.form.setFieldsValue({ sjrq: this.model.sjrq ? moment(this.model.sjrq) : null })
        this.form.setFieldsValue({ qyrq: this.model.qyrq ? moment(this.model.qyrq) : null })
        this.form.setFieldsValue({ fkrq: this.model.fkrq ? moment(this.model.fkrq) : null })
        this.form.setFieldsValue({ dqrq: this.model.dqrq ? moment(this.model.dqrq) : null })
        this.form.setFieldsValue({ zzdkrq: this.model.zzdkrq ? moment(this.model.zzdkrq) : null })
        this.form.setFieldsValue({ zzdqrq: this.model.zzdqrq ? moment(this.model.zzdqrq) : null })
        //this.form.setFieldsValue({ lrsj: this.model.lrsj ? moment(this.model.lrsj) : null })
        //this.form.setFieldsValue({ tqrq: this.model.tqrq ? moment(this.model.tqrq) : null })
      })
      this.dkzh = record.hth
      this.loadFjxxData(record.hth)
    },

loadFjxxData(hth){
  getAction("/dkdaglfjxx/dkdaglFjxx/queryFjxx", { "hth": hth }).then((res) => {
    this.dataSource_fjxx = res.result;
  });
},

    close () {
      this.$emit('close')
      this.fjlx='';
      this.flag=true;
      this.visible = false
    },
    handleOk () {
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
          } this.imgdate={"imgdate":this.fjxxList}
          let formData = Object.assign(this.model, values,this.imgdate,{"fjlx":this.fjlx});
          //时间格式化
       /*   formData.sjrq = formData.sjrq ? formData.sjrq.format() : null
          formData.qyrq = formData.qyrq ? formData.qyrq.format() : null
          formData.fkrq = formData.fkrq ? formData.fkrq.format() : null
          formData.dqrq = formData.dqrq ? formData.dqrq.format() : null
          formData.zzdkrq = formData.zzdkrq ? formData.zzdkrq.format() : null
          formData.zzdqrq = formData.zzdqrq ? formData.zzdqrq.format() : null
          formData.lrsj = formData.lrsj ? formData.lrsj.format() : null
          formData.tqrq = formData.tqrq ? formData.tqrq.format() : null*/
          if (this.zllx == 2 && this.dhglsj == ''){
            this.$message.warning('请选择贷后管理时间！')
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
    handleCancel () {
      this.close()
    }

  }
}
</script>

<style lang="less" scoped>

</style>