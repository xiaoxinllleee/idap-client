<template>
  <a-upload
    name="file"
    :multiple=multiple
    :action="uploadAction"
    :headers="headers"
    :data="{'isup':1,'bizPath':bizPath,'biz':bizPath}"
    :fileList="fileList"
    :listType="listType"
    :class="cssClass"
    :beforeUpload="beforeUpload"
    @change="handleChange"
    :disabled="disabled"
    :returnUrl="returnUrl">
    <a-button>
      <a-icon type="upload" />{{ text }}
    </a-button>
  </a-upload>
</template>

<script>

  import Vue from 'vue'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import { getFileAccessHttpUrl } from '@/api/manage';

  const FILE_TYPE_ALL = "all"
  const FILE_TYPE_IMG = "image"
  const FILE_TYPE_TXT = "file"
  const uidGenerator=()=>{
    return '-'+parseInt(Math.random()*10000+1,10);
  }
  const getFileName=(path)=>{
    if(path.lastIndexOf("\\")>=0){
      let reg=new RegExp("\\\\","g");
      path = path.replace(reg,"/");
    }
    return path.substring(path.lastIndexOf("/")+1);
  }
  export default {
    name: 'JUpload',
    data(){
      return {
        uploadAction:window._CONFIG['domianURL']+"/sys/common/upload",
        urlDownload:window._CONFIG['staticDomainURL'],
        headers:{},
        fileList: [],
        deletePaths: [],
	newFileList: [],
      }
    },
    props:{
      text:{
        type:String,
        required:false,
        default:"点击上传"
      },
      multiple:{
        type: Boolean,
        required: false,
        default: false
      },
      fileType:{
        type:String,
        required:false,
        default:FILE_TYPE_ALL
      },
      /*这个属性用于控制文件上传的业务路径*/
      bizPath:{
        type:String,
        required:false,
        default:"temp"
      },
      value:{
        type:[String,Array],
        required:false
      },
      // update-begin- --- author:wangshuai ------ date:20190929 ---- for:Jupload组件增加是否能够点击
      disabled:{
        type:Boolean,
        required:false,
        default: false
      },
      // update-end- --- author:wangshuai ------ date:20190929 ---- for:Jupload组件增加是否能够点击
      //此属性被废弃了
      triggerChange:{
        type: Boolean,
        required: false,
        default: false
      },
      listType:{
        type:String,
        required:false,
        default:"text"
      },
      cssClass:{
        type:String,
        required:false,
        default: ""
      },
      /**
       * update -- author:lvdandan -- date:20190219 -- for:Jupload组件增加是否返回url，
       * true：仅返回url
       * false：返回fileName filePath fileSize
       */
      returnUrl:{
        type:Boolean,
        required:false,
        default: true
      },
    },
    watch:{
      value: {
        handler(val) {
          if (val instanceof Array) {
            if (this.returnUrl) {
              this.initFileList(val.join(','))
            } else {
              this.initFileListArr(val);
            }
          } else {
            this.initFileList(val)
          }
        },
        //立即执行此方法，否则在value值变动时才会触发
        immediate: true
      }
    },
    created(){
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"X-Access-Token":token}
    },

    methods:{
      initFileListArr(val){
        if(!val || val.length==0){
          this.fileList = [];
          return;
        }
        let fileList = [];
        for(var a=0;a<val.length;a++){
          fileList.push({
            uid:uidGenerator(),
            name:val[a].fileName,
            status: 'done',
            url: val[a].filePath,
            response:{
              status:"history",
              message:val[a].filePath
            }
          })
        }
        this.fileList = fileList
      },
      initFileList(paths){
        if(!paths || paths.length==0){
          //return [];
          // update-begin- --- author:os_chengtgen ------ date:20190729 ---- for:issues:326,Jupload组件初始化bug
          this.fileList = [];
          return;
          // update-end- --- author:os_chengtgen ------ date:20190729 ---- for:issues:326,Jupload组件初始化bug
        }
        let fileList = [];
        let arr = paths.split(",")
        for(var a=0;a<arr.length;a++){
          let url = getFileAccessHttpUrl(arr[a],this.urlDownload,"http");
          fileList.push({
            uid:uidGenerator(),
            name:getFileName(arr[a]),
            status: 'done',
            url: url,
            response:{
              status:"history",
              message:arr[a]
            }
          })
        }
        this.fileList = fileList
      },
      handlePathChange(){
        let uploadFiles = this.fileList
        console.log(uploadFiles)
        let path = ''
        if(!uploadFiles || uploadFiles.length==0){
          path = ''
        }
        let arr = [];


        for(var a=0;a<uploadFiles.length;a++){
          arr.push(uploadFiles[a].response.message)
        }
        if(arr.length>0){
          path = arr.join(",")
        }
        let data = {
          path: path,
          deletePath: this.deletePaths.join(",")
        }
        this.$emit('change', data);
      },
      beforeUpload(file){
        let fileType = file.type;
        if(this.fileType===FILE_TYPE_IMG){
          if(fileType.indexOf('image')<0){
            this.$message.warning('请上传图片');
            return false;
          }
        }else if(this.fileType===FILE_TYPE_TXT){
          if(fileType.indexOf('image')>=0){
            this.$message.warning('请上传文件');
            return false;
          }
        }
        //TODO 扩展功能验证文件大小
        return true
      },
      handleChange(info) {
        console.log("--文件列表改变--")
        let fileList = info.fileList
        console.log(fileList)
        if(info.file.status==='done'){
          if(info.file.response.success){
            fileList = fileList.map((file) => {
              if (file.response) {
                let reUrl = file.response.message;
                file.url = getFileAccessHttpUrl(reUrl,this.urlDownload,"http");
              }
              return file;
            });
          }
          //this.$message.success(`${info.file.name} 上传成功!`);
        }else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败.`);
        }else if(info.file.status === 'removed'){
          this.handleDelete(info.file)
        }
        this.fileList = fileList
        if(info.file.status==='done' || info.file.status === 'removed'){
          //returnUrl为true时仅返回文件路径
          if(this.returnUrl){
            this.handlePathChange()
          }else{
            //returnUrl为false时返回文件名称、文件路径及文件大小
            fileList = fileList.filter((file) => {
              if (file.response) {
                return file.response.success === true;
              }
              return false;
            }).map((file) => {
              var fileJson = {
                fileName:file.name,
                filePath:file.response.message,
                fileSize:file.size
              };
              this.newFileList.push(fileJson);
              this.$emit('change', this.newFileList);
            });
          }
        }
      },
      handleDelete(file){
        //如有需要新增 删除逻辑
        this.deletePaths.push(file.response.message)
      },
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>

<style scoped>

</style>