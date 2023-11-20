<template>
  <a-modal
    :title="title"
    :width="1500"
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
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="机构名称">
                  <a-input placeholder="请输入机构名称" v-decorator="['jgdm_dictText', validatorRules.jgdm]"
                           disabled="false"/>
                  <a-button @click="FindBack" type="primary" icon="plus" v-show="model.jgdm == undefined">查找带回
                  </a-button>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户姓名">
                  <a-input placeholder="请输入客户姓名" v-decorator="['khmc', {}]" disabled="false"/>
                </a-form-item>
              </a-col>

            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" disabled="false"/>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="单户贷款金额">
                  <a-input placeholder="请输入单户贷款金额" v-decorator="['dhdkje', {}] " disabled="false"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="单户贷款余额">
                  <a-input placeholder="请输入单户贷款余额" v-decorator="['dhdkye', {}]" disabled="false"/>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="最新借款日期">
                  <a-date-picker v-decorator="[ 'zxjkrq', {}]" disabled="false" style="width:100%"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>

            <a-tab-pane key="2">

              <span slot="tab"><a-icon type="book" />附件管理</span>
              <a-card>
              <a-card v-show="this.addshow">
                <form>
                  <a-table :columns="columns_fjxx"
                           :dataSource="dataSource_fjxx"
                           :pagination="false" >
                    <!--                <span slot="action" slot-scope="text, record">-->
                    <!--                  <photo-view ref="pictureView" @ok="modalFormOk"/>-->
                    <!--                </span>-->
                    <span slot="action" slot-scope="text, record">
                  <!--<photo-view ref="pictureView" @ok="modalFormOk"/>-->
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
              <a-row class="form-row" :gutter="24">
                <a-col :span="6">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="附件年份">
                    <a-select  @change="selectValue" placeholder="请选择" style="width : 100%">
                      <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="类型">
                    <j-dict-select-tag placeholder="请选择类型" @input="zllxChange" v-model="zllx"  dictCode="dhjczllrfjlx"
                                       style="width : 100%" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="附件时间节点">
                    <j-dict-select-tag placeholder="请选择附件时间节点" v-model="fjsj" dictCode="fjsjjd"   style="width : 100%"  />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :span="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="检查情况说明">
                    <a-textarea placeholder="" v-model="bz" style="width : 100%"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-upload-dragger
                name="file"
                :multiple="true"
                :disabled="flag"
                :action="uploadAction"
                :data="{biz:'dhjczllr/'+bizPath}"
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
              </a-card>
          </a-tab-pane>


        </a-tabs>
      </a-form>
    </a-spin>
    <dhjczllr-info ref="dhjczllrInfo" @close="colseWindow"></dhjczllr-info>
    <jiami-modal ref="jiamiModal" @close="JiamiClose" @ok="JiamiOk"></jiami-modal>

  </a-modal>
</template>

<script>
  import {httpAction, getAction, deleteAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import DhjczllrInfo from './DhjczllrInfo'
  import JiamiModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/JiamiModal'
  import store from '@/store/'
  let Base64 = require('js-base64').Base64;

  export default {
    name: "DhjczllrModal",
    components: {
      JTreeSelect, DhjczllrInfo, JiamiModal
    },
    data() {
      return {
        bz: '',
        fjnf: '',
        fjsj: '',
        zllx: '',
        fjsjjd: '',
        bizPath: '',
        show: false,
        addshow: false,
        uploadAction: window._CONFIG['domianURL'] + "/sys/common/upload",
        urlDownload: window._CONFIG['domianURL'] + "/sys/common/download/",
        dqdazlFjxxList: [],
        fjxxList: [],
        imgdate: {},
        disableSubmit: true,
        dateValue: '',
        title: "操作",
        flag: true,
        disabled: false,
        visible: false,
        model: {},
        dataSource_fjxx: '',
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
            title: '文件时间节点',
            dataIndex: 'fjsjjd_dictText',
            align: 'center',
            key: 'fjsj'
          },
          {
            title: '检查情况',
            dataIndex: 'bz',
            align: 'center',
            key: 'bz'
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
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        records: {
          jgdm_dictText: '',
          khmc: '',
          zjhm: '',
          dhdkje: '',
          dhdkye: '',
          zxjkrq: '',
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          jgdm: {rules: [{required: true, message: '请选择机构代码!'}]},
        },
        url: {
          add: "/dhjczllr/dhjczllr/add",
          edit: "/dhjczllr/dhjczllr/edit",
          delete:"/dhjczllr/dhjczllr/deletefjxx"
        },
      }
    },
    created() {
      this.init();
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

      view(record){
        console.log(record)
        let url= `${window._CONFIG['staticDomainURL']}/`+ record.fwlj;

        console.log(url)
        window.open(
          //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
/*
          `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url)+'&watermarkTxt=' + encodeURIComponent(store.getters.userInfo.realname)
*/
          `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(Base64.encode(url))+'&watermarkTxt=' + encodeURIComponent(store.getters.userInfo.realname)

        );
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { wjid: record.wjid }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            this.loadFjxxData(record.zjhm)
          } else {
            that.$message.warning(res.message)
          }
        })
      },

      loadFjxxData (zjhm) {
        getAction('/dhjczllr/dhjczllr/queryFjxx', { 'zjhm': zjhm }).then((res) => {
          this.dataSource_fjxx = res.result
        })
      },

      colseWindow(args) {
        this.records.jgdm_dictText = args.jgdm_dictText,
          this.records.khmc = args.khmc,
          this.records.zjhm = args.zjhm,
          this.records.dhdkje = args.dhdkje,
          this.records.dhdkye = args.dhdkye,
          this.records.zxjkrq = args.zxjkrq,
          this.model = Object.assign({}, this.records)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jgdm_dictText', 'khmc', 'zjhm', 'dhdkje', 'dhdkye', 'zxjkrq'))  // loadsh的pick方法
        })
      },
      FindBack() {
        this.$refs.dhjczllrInfo.init();
      },


      imageUploadChange(data) {
        let path = data.path
        console.log(path)
      },
      selectValue(val) {
        console.log(val)
        this.fjnf = val;
      },
      init() {
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.dateValue = year;
        this.initSelectYear(year)
      },
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + '-01-01'), label: ((year - i) + '')});
        }
      },
      zllxChange(val) {
        if (val == '' || val == 'undefined') {
          this.flag = true;
        } else {
          this.flag = false;
        }
        if (val != '' || val == 1 ){
        this.fjsj = 7
        }
      },
      handleChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          let fileObject = info.file
          let fileList = info.fileList;

          /*let fjsja = moment(this.fjnf).format("YYYY")+"-01-01";*/
          fileList.forEach(item => {
            if (item.uid.indexOf(fileObject.uid) != -1) {
              item.name = this.zllx + '_' + item.name
            }
          })
          //this.fjnf = fjsja;
          console.log(this.fjnf)
          this.fjxxList = fileList;
          this.$message.success(`${info.file.name} 文件上传成功.`);
          this.flag = true
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} 文件上传失败.`);
        }
      },

      add() {
        this.edit({});
      },
      edit(record) {
        if (JSON.stringify(record)=='{}') {
          this.show = true
        }else {
          this.show = false
        }
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.bizPath = this.model.khmc + "_" + this.model.zjhm
        console.log(this.bizPath)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jgdm_dictText', 'khmc', 'zjhm', 'dhdkje', 'dhdkye'))
          //时间格式化
          this.form.setFieldsValue({zxjkrq: this.model.zxjkrq ? moment(this.model.zxjkrq) : null})
          //this.form.setFieldsValue({fjnf:this.model.fjnf?moment(this.model.fjnf):null})
        });

          getAction('/dhjczllr/dhjczllr/queryFjxx', { 'zjhm': record.zjhm }).then((res) => {
            this.dataSource_fjxx = res.result
          })
      },

      close() {
        this.$emit('close');
        this.dqdazlFjxxList = [];
        this.flag = true;
        this.zllx = '';
        this.fjsj = '';
        this.bz = '';
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            // that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.zjhm) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            this.imgdate = {"imgdate": this.fjxxList}
            let formData = Object.assign(this.model, values, this.imgdate, {
              "zllx": this.zllx,
              "fjnf": this.fjnf,
              "bz": this.bz,
              "fjsj": this.fjsj
            });
            //时间格式化
            //formData.zxjkrq = formData.zxjkrq?formData.zxjkrq.format():null;
            //formData.fjnf = formData.fjnf?formData.fjnf.format():null;
          if (this.zllx == ''){
           this.$message.warning('请选择附件类型！')
            return
          }
          if (this.fjsj == ''){
            this.$message.warning('请选择附件年份！')
            return
          }
            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              //that.confirmLoading = false;
              that.close();
            })

          }
        })
      },
      handleCancel() {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>