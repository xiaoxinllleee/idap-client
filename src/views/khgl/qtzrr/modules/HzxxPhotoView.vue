<template>
  <div class="clearfix">
    <a-row class="form-row" :gutter="24">
      <a-col :lg="12">
          <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="入户照片">
          <a-upload
            :action="uploadAction"
            list-type="picture-card"
            :file-list="RhzppicList"
            :data="{biz:this.bizPathUpload}"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="RhzppicList.length < 9">
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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="房屋照片">
          <a-upload
            :action="uploadAction"
            list-type="picture-card"
            :file-list="FwzppicList"
            :data="{biz:this.bizPathUpload}"
            @preview="handlePreview"
            @change="handleFwzpChange"
          >
            <!-- :data="{biz:bizPath}"-->
            <div v-if="FwzppicList.length < 9">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
      </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="24">
      <a-col :lg="12">
        <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="与客户合影">
            <a-upload
              :action="uploadAction"
              list-type="picture-card"
              :file-list="YkhhypicList"
              :data="{biz:this.bizPathUpload}"
              @preview="handlePreview"
              @change="handYkhhyChange"
            >
              <div v-if="YkhhypicList.length < 9">
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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="室内照片">
            <a-upload
              :action="uploadAction"
              list-type="picture-card"
              :file-list="SnzppicList"
              :data="{biz:this.bizPathUpload}"
              @preview="handlePreview"
              @change="handSnzpChange"
            >
              <div v-if="SnzppicList.length < 9">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="24">
      <a-col :lg="12">
        <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="户口薄">
            <a-upload
              :action="uploadAction"
              list-type="picture-card"
              :file-list="HkbpicList"
              :data="{biz:this.bizPathUpload}"
              @preview="handlePreview"
              @change="handHkbChange"
            >
              <div v-if="HkbpicList.length < 9">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
        </a-form-item>
      </a-col>
      <a-col :lg="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其他附件">
            <a-upload
              :action="uploadAction"
              list-type="picture-card"
              :file-list="QtfjpicList"
              :data="{biz:this.bizPathUpload}"
              @preview="handlePreview"
              @change="handQtfjChange"
            >
              <div v-if="QtfjpicList.length < 9">
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
        RhzppicList: [],
        FwzppicList:[],
        YkhhypicList:[],
        SnzppicList:[],
        HkbpicList:[],
        QtfjpicList:[],
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
        console.log("入户照片");
        this.RhzppicList = fileList;
        console.log(this.RhzppicList)
      },
      handleFwzpChange({ fileList }) {
        console.log("房屋照片");
        this.FwzppicList = fileList;
        console.log(this.FwzppicList)
      },
      handYkhhyChange({ fileList }) {
        this.YkhhypicList = fileList;
        console.log("与客户合影");
        console.log(this.YkhhypicList)
      },
      handSnzpChange({ fileList }){
        this.SnzppicList = fileList;
        console.log("室内照片");
        console.log(this.SnzppicList)
      },
      handHkbChange({fileList}){
        this.HkbpicList = fileList;
        console.log("户口薄");
        console.log(this.HkbpicList)
      },
      handQtfjChange({fileList}){
        this.QtfjpicList = fileList;
        console.log("其他附件");
        console.log(this.QtfjpicList)
      },


      add(){
        this.imgdate={
          "RhzppicList":this.RhzppicList,
          "FwzppicList":this.FwzppicList,
          "YkhhypicList":this.YkhhypicList,
          "SnzppicList":this.SnzppicList,
          "HkbpicList":this.HkbpicList,
          "QtfjpicList":this.QtfjpicList,
        }
        console.log(this.imgdate)
      },
      showImg(value){
        console.log(value);
        console.log("-----------------");
        console.log(this.studentImg)
        /*for (let i = 0; i < value.length; i++) {
          if (value[i].zllx==1){
            this.RhzppicList.push(value[i]);
          }else if (value[i].zllx==2){
            this.FwzppicList.push(value[i]);
          }else if (value[i].zllx==3){
            this.YkhhypicList.push(value[i]);
          }else if (value[i].zllx==4){
            this.SnzppicList.push(value[i]);
          }else if (value.zllx==5){
            this.HkbpicList.push(value[i]);
          }else if (value.zllx==6){
            this.QtfjpicList.push(value[i]);
          }

         this.RhzppicList = this.initFileListArr( this.RhzppicList);
        this.FwzppicList = this.initFileListArr( this.FwzppicList);
        this.YkhhypicList  = this.initFileListArr(this.YkhhypicList);
        this.SnzppicList = this.initFileListArr(this.SnzppicList);
        this.HkbpicList = this.initFileListArr(this.HkbpicList);
        this.QtfjpicList = this.initFileListArr(this.QtfjpicList);

        }*/


        this.RhzppicList = this.initFileListArr(value.rhzpArray);
        this.FwzppicList = this.initFileListArr(value.fwzpArray);
        this.YkhhypicList  = this.initFileListArr(value.ykhhyArray);
        this.SnzppicList = this.initFileListArr(value.snzpArray);
        this.HkbpicList = this.initFileListArr(value.hkbArray);
        this.QtfjpicList = this.initFileListArr(value.qtfjArray);
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
          this.RhzppicList=[],
          this.FwzppicList=[],
          this.YkhhypicList=[],
          this.SnzppicList=[],
          this.HkbpicList=[],
          this.QtfjpicList=[]
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
