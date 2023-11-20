<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款品种大类">
              <a-input placeholder="请输入贷款品种大类" v-decorator="['dkcpdl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款品种小类1">
              <a-input placeholder="请输入贷款品种小类1" v-decorator="['dkcpxl', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款品种小类2">
              <a-input placeholder="请输入贷款品种小类2" v-decorator="['dkcpzl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="一年以内（含）">
              <a-input placeholder="请输入一年以内（含）利率" v-decorator="['ynqll', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="二年">
              <a-input placeholder="请输入二年期利率" v-decorator="['enqll', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="三年">
              <a-input placeholder="请输入三年期利率" v-decorator="['snqll', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="三年至五年（含）">
              <a-input placeholder="请输入三年至五年（含）利率" v-decorator="['sdwnqll', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="五年以上">
              <a-input placeholder="请输入五年以上利率" v-decorator="['wnqysll', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="产品图片">
              <a-upload
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                :action="uploadAction"
                 accept="image/*"
                :data="{'isup':1}"
                :headers="headers"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="picUrl" :src="getAvatarView()" alt="头像" style="height:150px;max-width:400px"/>
                <div v-else>
                  <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="产品介绍文档PDF">
              <a-upload-dragger
                name="file"
                :multiple="false"
                :file-list="fileList"
                :disabled="flag"
                :action="uploadAction"
                :data="{biz:'dkcpjs/'+bizPath}"
                @change="handlePDFChange"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox"/>
                </p>
                <p class="ant-upload-text">
                  点击选择或者拖拽PDF文件上传
                </p>

              </a-upload-dragger>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JImageUpload from '@/components/jeecg/JImageUpload'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from "@/store/mutation-types"

  export default {
    name: "DkcpjsModal",
    components: {
      JImageUpload
    },
    data () {
      return {
        title:"操作",
        visible: false,
        uploadLoading:false,
        uploadAction: window._CONFIG['domianURL'] + "/sys/common/upload",
        download:window._CONFIG['downloadDomainURL'],
        picUrl: "",
        pdfUrl: "",
        filename:"",
        flag:false,
        bizPath: '',
        picList:[],
        headers:{},
        fjxxList:[],
        fileList:[],
        model: {},
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
        },
        url: {
          fileUpload: window._CONFIG['domianURL']+"/sys/common/upload",
          imgerver: window._CONFIG['staticDomainURL'],
          add: "/dkcpjs/dkcpjs/add",
          edit: "/dkcpjs/dkcpjs/edit",
        },
      }
    },
    computed:{
      uploadAction:function () {
        return this.url.fileUpload;
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"X-Access-Token":token}
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        console.log(this.model.fjlj)

        if(this.model.fjlj){
          this.picUrl = "Has no pic url yet";
        }
        console.log(this.model.pdflj)

        if(this.model.pdflj){
           let file={
             url:this.download+"/"+this.model.pdflj,
             type: "application/pdf",
             name:this.model.pdfname,
             uid: "vc-upload-1692160417936-8",
             status: "done",
           };
          this.fileList =[];
          this.fileList.push(file);
        }
        console.log( this.fileList)

        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'dkcpdl','dkcpxl','dkcpzl','ynqll','enqll','snqll','sdwnqll','wnqysll','bz'))
		  //时间格式化
        });

      },
      beforeUpload: function(file){
        var fileType = file.type;
        if(fileType.indexOf('image')<0){
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },
      handleChange (info) {
        this.picUrl = "";
        if (info.file.status === 'uploading') {
          this.uploadLoading = true;
          return
        }
        if (info.file.status === 'done') {
          var response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if(response.success){
            this.model.fjlj = response.message;
            this.picUrl = "Has no pic url yet";
          }else{
            this.$message.warning(response.message);
          }
        }
      },

      handlePDFChange(info) {
      /*  const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          let fileObject = info.file
          let fileList = info.fileList;
          fileList.forEach(item => {
            if (item.uid.indexOf(fileObject.uid) != -1) {
              item.name = 'pdf' + "_" + item.name;
            }
          })
          this.fjxxList = fileList;
          console.log(this.fjxxList)
          if(fileList.length==1){
            this.flag=true;
          }
          console.log(this.fjxxList)
          this.$message.success(`${info.file.name} 文件上传成功.`);

        } else if (status === 'error') {
          this.$message.error(`${info.file.name} 文件上传失败.`);
        }*/


        let resFileList = [...info.fileList];
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        resFileList = resFileList.slice(-1);

        // 2. read from response and show file link
        resFileList = resFileList.map(file => {
          if (file.response) {
            // Component will show file.url as link
            console.log(file.response)
            file.url = this.download+"/"+file.response.message;
          }
          return file;
        });
        this.fileList = resFileList;
        console.log(this.fileList)
        this.pdfUrl=this.fileList[0].response.message;
        this.filename=this.fileList[0].name;
        console.log(this.pdfUrl)
      },
      getAvatarView(){
        console.log(this.url.imgerver +"/"+ this.model.fjlj)
        return this.url.imgerver +"/"+ this.model.fjlj;
      },
      close () {
        this.$emit('close');
        this.picList=[];
        this.picUrl = "";
        this.fjxxList=[];
        this.fileList=[];
        this.visible = false;
      },
      handleOk () {
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
            console.log(this.picList);
            let formData = Object.assign(this.model, values);
            //时间格式化
            let fjlj = that.model.fjlj;
            formData.fjlj = fjlj;
            formData.pdflj=this.pdfUrl;
            formData.pdfname=this.filename;
            console.log(formData)
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