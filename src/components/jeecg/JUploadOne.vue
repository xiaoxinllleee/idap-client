<template>
  <div>
    <template v-if="uploadValues!= null" v-for="(file,fileKey) of [(uploadValues||{})]">
      <a-input
        :key="fileKey"
        :readOnly="true"
        :value="file.name"
      >
        <template slot="addonBefore" style="width: 30px">
          <a-tooltip v-if="file.status==='uploading'" :title="`上传中(${Math.floor(file.percent)}%)`">
            <a-icon type="loading"/>
          </a-tooltip>
          <a-tooltip v-else-if="file.status==='done' && file.success" title="上传完成">
            <a-icon type="check-circle" style="color:#00DB00;"/>
          </a-tooltip>
          <a-tooltip v-else title="上传失败">
            <a-icon type="exclamation-circle" style="color:red;"/>
          </a-tooltip>
        </template>
        <template slot="addonAfter" style="width: 30px">
          <a-tooltip title="删除并重新上传">
            <a-icon
              v-if="file.status!=='uploading'"
              type="close-circle"
              style="cursor: pointer;"
              @click="handleClickDelFile"/>
          </a-tooltip>
        </template>

      </a-input>
    </template>

    <div :hidden="uploadValues != null">
      <a-upload
        name="file"
        :multiple=multiple
        :action="uploadAction"
        :headers="headers"
        :data="{'isup':1,'biz':bizPath}"
        :fileList="fileList"
        :listType="listType"
        :class="cssClass"
        :beforeUpload="beforeUpload"
        @change="handleChange">
        <a-button>
          <a-icon type="upload" />{{ text }}
        </a-button>
      </a-upload>
    </div>
  </div>


</template>

<script>

  import Vue from 'vue'
  import { ACCESS_TOKEN } from "@/store/mutation-types"

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
        urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
        headers:{},
        fileList: [],
        deletePaths: [],
        uploadValues:null,
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
        type:[String, Object],
        required:false
      },
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
      }
    },
    watch:{
      value:{
        handler(val) {
          console.log('watch value', val)
          if(val) {
            if (typeof (val) == 'string') {
              this.initFileList(val)
            } else {
              this.initFileList(val.path)
            }
          } else {
            this.fileList = [];
            this.uploadValues = null
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
      initFileList(paths){
        if(!paths || paths.length==0){
          //return [];
          // update-begin- --- author:os_chengtgen ------ date:20190729 ---- for:issues:326,Jupload组件初始化bug
          this.fileList = [];
          this.uploadValues = null
          return;
          // update-end- --- author:os_chengtgen ------ date:20190729 ---- for:issues:326,Jupload组件初始化bug
        }
        let fileList = [];
        let arr = paths.split(",")
        for(var a=0;a<arr.length;a++){
          fileList.push({
            uid:uidGenerator(),
            name:getFileName(arr[a]),
            status: 'done',
            url: this.urlDownload+arr[a],
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
        let name = ''
        if(!uploadFiles || uploadFiles.length==0){
          path = ''
          name = ''
        }
        let patharr = [];
        let namearr = [];


        for(var a=0;a<uploadFiles.length;a++){
          patharr.push(uploadFiles[a].response.message)
          namearr.push(uploadFiles[a].name)
        }
        if(patharr.length>0){
          path = patharr.join(",")
          name = namearr.join(",")
        }
        let data = {
          path: path,
          name: name,
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
        this.fileList=[];
        //TODO 扩展功能验证文件大小
        return true
      },
      handleChange(info) {
        console.log(info)
        let { file } = info
        let value = {
          name: file.name,
          type: file.type,
          size: file.size,
          status: file.status,
          percent: file.percent,
          success: file.response ? file.response.success : false
        }
        this.uploadValues = this.bindValuesChange(value,'uploadValues')
        console.log("--文件列表改变--")
        let fileList = info.fileList
        console.log(fileList)
        if(info.file.status==='done'){
          if(info.file.response.success){
            fileList = fileList.map((file) => {
              if (file.response) {
                file.url = this.urlDownload+file.response.message;
              }
              return file;
            });
            this.$message.success(`${info.file.name} 上传成功!`);
          } else {
            this.$message.error(`${info.file.name} 上传失败:${info.file.response.message}`);
          }
        }else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败.`);
        }else if(info.file.status === 'removed'){
          this.handleDelete(info.file)
        }
        this.fileList = fileList
        if((info.file.status==='done' && info.file.response.success) || info.file.status === 'removed'){
          this.handlePathChange()
        }
      },

      /** 记录用到数据绑定的组件的值 */
      bindValuesChange(value,key) {
        let values = Object.assign({}, this[key])
        values = value
        return values
      },
      handleDelete(file){
        //如有需要新增 删除逻辑
        this.deletePaths.push(file.response.message)
      },
      handleClickDelFile() {
        this.fileList = [];
        this.uploadValues = null
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