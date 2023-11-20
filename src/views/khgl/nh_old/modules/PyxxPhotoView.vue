<template>
  <div class="clearfix">
    <a-row class="form-row" :gutter="24">
      <a-col :lg="12">
          <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议照片">
          <a-upload
            :action="uploadAction"
            list-type="picture-card"
            :file-list="PyzppicList"
            :data="{biz:this.bizPathUpload}"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="PyzppicList.length < 9">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :width = "800" :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
          </a-form-item>
      </a-col>
      <a-col :lg="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议表">
          <a-upload
            :action="uploadAction"
            list-type="picture-card"
            :file-list="PybpicList"
            :data="{biz:this.bizPathUpload}"
            @preview="handlePreview"
            @change="handleFwzpChange"
          >
            <!-- :data="{biz:bizPath}"-->
            <div v-if="PybpicList.length < 9">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
      </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>



<script>
  import { getFileAccessHttpUrl } from '@/api/manage';

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const uidGenerator=()=>{
    return '-'+parseInt(Math.random()*10000+1,10);
  }
  export default {
    props:{
      studentImg:{
        type:Object
      },
      bizPath:{
        type:String,
        required:false,
        default:" ",
      },

    },

    data() {
      return {
        labelCol: {
          xs: {span: 24},
          sm: {span: 6},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 10},
        },
        imgdate:{},
        uploadAction:window._CONFIG['domianURL']+"/sys/common/upload",
        urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
        urlDownload:window._CONFIG['staticDomainURL'],
        previewVisible: false,
        previewImage: '',
        PyzppicList: [],
        PybpicList:[],
      };
    },

    created(){

    },
    computed: {
      bizPathUpload() {
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1;
        let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
          .getDate();
        return this.bizPath + year + month + day;;
      }
    },

    methods: {
      handleCancel() {
        this.previewVisible = false;
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
        console.log("--------------")
        console.log(file)
      },
      handleChange({ fileList }) {
        console.log("评议照片");
        this.PyzppicList = fileList;
        console.log(this.PyzppicList)
      },
      handleFwzpChange({ fileList }) {
        console.log("评议表");
        this.PybpicList = fileList;
        console.log(this.PybpicList)
      },



      add(){
        this.imgdate={
          "PyzppicList":this.PyzppicList,
          "PybpicList":this.PybpicList,
        }
        console.log(this.imgdate)
      },
      showImg(value){
        console.log(value);
        console.log("-----------------");
        console.log(this.studentImg)

        this.PyzppicList = this.initFileListArr(value.rhzpArray);
        this.PybpicList = this.initFileListArr(value.fwzpArray);
      },


      initFileListArr(val){
        let fileList = [];

        if(!val || val.length==0){
          return fileList ;
        }
          for (var a = 0; a < val.length; a++) {
            let url = getFileAccessHttpUrl(val[a].url, this.urlDownload, "http");
            fileList.push({
              uid: uidGenerator(),
              name: val[a].name,
              status: 'done',
              url: url,
              response: {
                status: "history",
                message: val[a].url
              }
            })
          }
          //this.fileList = fileList
          return fileList
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

      close(){
          this.PyzppicList=[],
          this.PybpicList=[]
      }

    },
  };
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
