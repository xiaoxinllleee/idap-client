<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
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
                  label="机构代码">
                  <j-tree-select
                    v-decorator="['ywjg',validatorRules.ywjg ]"
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
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户姓名">
                  <a-input placeholder="请输入客户姓名" v-decorator="['khxm', validatorRules.khxm]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input placeholder="请输入证件号码" v-decorator="['zjhm', validatorRules.zjhm]" :disabled="this.disabled"
                           :maxLength="18"/>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="联系电话">
                  <a-input placeholder="请输入联系电话" v-decorator="['sjhm', validatorRules.sjhm]" :disabled="this.disabled"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="联系地址">
                  <a-input placeholder="请输入联系地址" v-decorator="['dz', validatorRules.dz]" :disabled="this.disabled"/>
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

            <a-card title="附件上传" v-show="this.show">
              <a-row class="form-row" :gutter="24">
                <a-col :span="12">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="资料类型:">
                    <j-dict-select-tag placeholder="请选择资料类型" v-model="zllx" @input="zllxChange" dict-code="dqzlfjlx"/>
                  </a-form-item>
                </a-col>

              </a-row>

              <a-upload-dragger
                name="file"
                :multiple="true"
                :disabled="flag"
                :action="uploadAction"
                :data="{biz:'dqdazl/'+bizPath}"
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
  import {deleteAction, getAction, httpAction} from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import JiamiModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/JiamiModal'
  import TiquModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/TiquModal'
  import pick from 'lodash.pick'
  import store from '@/store/'
  let Base64 = require('js-base64').Base64;

  export default {
    name: "DqdazlglModal",
    components: {
      JTreeSelect, JUploadOne, JiamiModal, TiquModal
    },
    data() {
      return {
        hth:'',
        zllx: '',
        bizPath: '',
        uploadAction: window._CONFIG['domianURL'] + "/sys/common/upload",
        urlDownload: window._CONFIG['domianURL'] + "/sys/common/download/",
        dqdazlFjxxList: [],
        fjxxList: [],
        flag: true,
        imgdate: {},
        title: "操作",
        show: false,
        visible: false,
        disabled: false,
        orderMainModel: {dkdaglFjxxList: [{}],},
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

        ],
        dataSource_fjxx: [],
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          ywjg: {rules: [{required: true, message: '请选择机构代码!'}]},
          khxm: {rules: [{required: true, message: '请输入客户姓名!'}]},
          zjhm: {rules: [{required: true, message: '请输入证件号码!'}]},
          sjhm: {rules: [{required: true, message: '请输入联系电话!'}]},
          dz: {rules: [{required: true, message: '请输入联系地址!'}]},
        },

        url: {
          add: "/dqdazlgl/dqdazlgl/add",
          edit: "/dqdazlgl/dqdazlgl/edit",
          delete: '/cldkhtsjglfjxx/cldkhtsjglFjxx/delete'
        },
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
        // window.open(
        //   //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
        //   `${window._CONFIG['kkFileViewURL']}` + '?url=' + encodeURIComponent(url) + '&watermarkTxt=' + encodeURIComponent(store.getters.userInfo.realname)
        // );
        window.open(
          //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
          `${window._CONFIG['kkFileViewURL']}` + '?url=' + encodeURIComponent(Base64.encode(url)) + '&watermarkTxt=' + encodeURIComponent(store.getters.userInfo.realname)
        );
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
        console.log(this.fjxxList)
      },
      loadFjxxData(hth) {
        getAction('/dqdazlgl/dqdazlgl/queryFjxx', {'hth':hth}).then((res) => {
          this.dataSource_fjxx = res.result
        })
      },
      imageUploadChange(data) {
        let path = data.path
        console.log(path)
      },
      zllxChange(val) {
        if (val == '' || val == 'undefined') {
          this.flag = true;
        } else {
          this.flag = false;
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
          fileList.forEach(item => {
            if (item.uid.indexOf(fileObject.uid) != -1) {
              item.name = this.zllx + "_" + item.name;
            }
          })
          this.fjxxList = fileList;
          console.log(this.fjxxList)
          this.$message.success(`${info.file.name} 文件上传成功.`);

        } else if (status === 'error') {
          this.$message.error(`${info.file.name} 文件上传失败.`);
        }
      },
      add() {
        this.edit({});
      },
      edit(record) {
        console.log(record)
        if (JSON.stringify(record) == '{}') {
          this.show = false;
        } else {
          this.show = true;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.bizPath = this.model.khxm + "_" + this.model.zjhm
        console.log(this.bizPath)
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'khxm', 'zjhm', 'sjhm', 'dz', 'ywjg'))
          //时间格式化
          //this.form.setFieldsValue({htrq:this.model.htrq?moment(this.model.htrq):null})
          //this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
        });
        getAction('/dqdazlgl/dqdazlgl/queryFjxx', {'hth':record.id}).then((res) => {
          this.dataSource_fjxx = res.result
        })

      },

      /*beforeUpload(file,fileList){
        console.log(fileList[0])
        if(this.zllx==''||this.zllx==undefined){
          this.$message.warning("上传前必须选择资料类型！");
          this.dqdazlFjxxList=[];
          return false;
        }
      },*/

      close() {
        this.$emit('close');
        this.zllx = '';
        this.dqdazlFjxxList = [];
        this.visible = false;
        this.fjxxList=[];
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.id) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            this.imgdate = {"imgdate": this.fjxxList}
            console.log(this.imgdate)
            let formData = Object.assign(this.model, values, this.imgdate, {"zllx": this.zllx});
            //时间格式化
            // formData.htrq = formData.htrq?formData.htrq.format():null;
            // formData.lrsj = formData.lrsj?formData.lrsj.format():null;

            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
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