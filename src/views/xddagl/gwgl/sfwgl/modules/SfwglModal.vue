<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1" animated='animated'>
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="book"/>基本信息</span>
            <a-row class="form-row" :gutter="24">
              <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发文编号">
          <a-input :disabled="disabled" placeholder="请输入发文编号" v-decorator="['fwbh', validatorRules.fwbh]" />
        </a-form-item>
              </a-col>
              <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发文部室">
          <j-tree-select placeholder="请选择发文部室" v-decorator="['cwdw', validatorRules.cwdw]"  dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                         treeNodeFilterProp="title" pid-field="sjywjgdm"
                         :showSearch="true" :treeDefaultExpandAll="true"
                         :triggerChange="true"
          />
        </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人">
          <a-input placeholder="请输入联系人" v-decorator="['fzr', {}]" />
        </a-form-item>
              </a-col>
              <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发文日期">
          <a-date-picker v-decorator="[ 'qfrq', {}]" style="width: 100%"/>
        </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="标题">
          <a-input placeholder="请输入标题" v-decorator="['bt', {}]" />
        </a-form-item>
              </a-col>
              <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
        </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :span="24">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="收文单位">
                  <a-card>
                    <div :style="{ marginBottom: '5px' }">
                      <a-checkbox v-show="!viewFalg" :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                        全选
                      </a-checkbox>
                    </div>
                    <a-row class="form-row" :gutter="24">
                    <div v-for="(item,index) in plainOptions" :key="index">
                        <a-col :span="8">
                            <a-checkbox ref="checkedboxlist" :value="item.value" v-model="checkedList[index]">
                              {{item.label}}
                            </a-checkbox>
                        </a-col>
                    </div>
                    </a-row>
                  </a-card>
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>

            <a-tab-pane key="2">
              <span slot="tab"><a-icon type="book"/>附件管理</span>
              <a-card><form>
                <a-table :columns="columns_fjxx"
                         :dataSource="dataSource_fjxx"
                         :pagination="false">
                <span slot="action" slot-scope="text, record">
                  <!--<photo-view ref="pictureView" @ok="modalFormOk"/>-->
                   <a @click="view(record)">预览</a>
                   <a-divider type="vertical" />
                   <a @click="down(record)">下载</a>
                  <a-divider type="vertical"/>
                   <a @click="tiqu(record)">提取</a>
                     <a-divider type="vertical" />
                    <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                      <a>删除</a>
                    </a-popconfirm>
                </span>
                </a-table>
              </form></a-card>
              <a-card v-show="this.show">
                <a-upload-dragger
                  name="file"
                  :multiple="true"
                  :action="uploadAction"
                  :data="{biz:'sfwglpdf/'+bizPath}"
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
    <tiqu-modal ref="tiquModal" @close="TiquClose" @ok="tiquOK"></tiqu-modal>
  </a-modal>
</template>

<script>
import { deleteAction, httpAction, postAction, putAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import store from '@/store/'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import {getAction} from "../../../../../api/manage";
  import JiamiModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/JiamiModal'
  import TiquModal from '@/views/xddagl/dkdagl/cldkhtsjgl/modules/TiquModal'
  let Base64 = require('js-base64').Base64;

  export default {
    name: "SfwglModal",
    components: { JTreeSelect, JiamiModal, TiquModal},
    data () {
      return {
        cwdwDictext:'',
        disabled:false,
        indeterminate: false,
        checkAll: true,
        plainOptions:[],
        checkedList: [],
        checkedListBak: [],
        id: '',
        title:"操作",
        visible: false,
        disableSubmit:true,
        bizPath:'',
        show: false,
        uploadAction:window._CONFIG['domianURL']+"/sys/common/upload",
        urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
        fjxxList:[],
        imgdate:{},
        model: {},
        viewFalg:false,
        columns_fjxx:[
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
            key: 'lrr',
          },
          {
            title: '上传时间',
            dataIndex: 'lrsj',
            align: 'center',
            key: 'lrsj',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          },
        ],
        dataSource_fjxx: [],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          cwdw:{rules:[{required:true,message:'请选择发文部室!'}]},
          fwbh:{rules:[{required:true,message:'请输入发文编号!'}]},
        },
        url: {
          add: "/sfwgl/sfwgl/add",
          edit: "/sfwgl/sfwgl/edit",
          fjsc: "/sfwgl/sfwgl/fjsc",
          deletefjxx: '/sfwglfjxx/sfwglFjxx/delete',
          addInit: '/sfwgl/sfwgl/addInit',
        },
      }
    },
    created () {
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
      },
      tiqu(record) {
        this.wjlj = record.wjlj;
        this.$refs.tiquModal.init();
        this.$refs.tiquModal.wjlj = record.wjlj
      },
      onChange(checkedList) {
        this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length;
        this.checkAll = checkedList.length === this.plainOptions.length;
      },
      onCheckAllChange(e) {
        Object.assign(this, {
          checkedList: e.target.checked ? this.checkedListBak : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
      },
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
        let url = `${window._CONFIG['staticDomainURL']}/` + record.fwlj
        window.open(
          //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
          `${window._CONFIG['kkFileViewURL']}` + '?url=' + encodeURIComponent(Base64.encode(url)) + '&watermarkTxt=' + encodeURIComponent(store.getters.userInfo.realname)
        )
      },
      handleDelete: function (record) {
        if (!this.url.deletefjxx) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.deletefjxx, { wjid: record.wjid }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            this.loadFjxxData(this.id)

          } else {
            that.$message.warning(res.message)
          }
        })
      },
      handleChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
          let fileObject=info.file
          let fileList=info.fileList;
          fileList.forEach(item =>{
            if(item.uid.indexOf(fileObject.uid) != -1){
              item.name=item.name;
            }
          })
          this.fjxxList=fileList;
          this.$message.success(`${info.file.name} 文件上传成功.`);
          this.flag = true
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} 文件上传失败.`);
        }

      },

      add () {
        getAction(this.url.addInit, {'id': ''}).then((res) => {
         let arr=res.result.list
          let swdw=res.result.swdw
          for (let i=0;i<arr.length;i++){
            let obj={label:arr[i].zzjc,value:arr[i].zzbz}
            this.plainOptions.push(obj)
            this.checkedListBak.push(true)
            this.checkedList.push(true)
          }
        });
        this.checkAll=true
        this.visible = true;
        // this.edit({});
      },
      edit (record) {
        if(JSON.stringify(record)=='{}'){
          this.show = false
        }else {
          this.show = true
          this.disabled=true
          this.cwdwDictext=record.cwdw
        }

        this.form.resetFields();
        this.model = Object.assign({}, record);
        //this.bizPath= this.model.khmc+"_"+this.model.zjhm;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'bt','fwbh','cwdw','fzr','bz','cwdw_dictText'))
		  //时间格式化
          this.form.setFieldsValue({qfrq:this.model.qfrq?moment(this.model.qfrq):null})
        });
        this.id = record.id;
        this.loadFjxxData(record.id);
        getAction(this.url.addInit, {'id': this.id}).then((res) => {
          let arr=res.result.list
          let swdw=res.result.swdw
          let swdwView=[];
          for (let i=0;i<arr.length;i++){
            let obj={label:arr[i].zzjc,value:arr[i].zzbz}
            if (this.viewFalg && swdw[i]){
              this.plainOptions.push(obj)
              this.checkedListBak.push(true)
              swdwView[swdwView.length]=true
            } else if (!this.viewFalg){
              this.plainOptions.push(obj)
              this.checkedListBak.push(true)
            }
          }
          if (this.viewFalg){
            this.checkedList=swdwView
          } else {
            this.checkedList=swdw
          }
        });
      },
      loadFjxxData(id) {
        getAction("/sfwglfjxx/sfwglFjxx/queryFjxx", { "id": id }).then((res) => {
          this.dataSource_fjxx = res.result;
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.fjxxList = [];
        this.plainOptions=[]
        this.checkedList=[]
        this.checkAll=false
        this.disabled=false
        this.viewFalg=false
      },
      handleOk () {
        let swdw=[]
        for(let i=0;i<this.checkedList.length;i++){
          if (this.$refs.checkedboxlist[i].checked==true){
            swdw.push(this.$refs.checkedboxlist[i].value)
          }
        }
        if (swdw.length==0){
          this.$message.warning("最少选择一个收文单位")
          return
        }
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            this.imgdate={"imgdate":this.fjxxList}
            let formData = Object.assign(this.model, values,this.imgdate);
            //时间格式化
            formData.swdw=swdw.toString()
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>