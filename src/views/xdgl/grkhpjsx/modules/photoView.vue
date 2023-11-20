<template>
  <div class="clearfix">
    <div>
    <a-divider orientation="left" style="color: #1890FF;">身份信息--本人身份证正反面</a-divider>
    <a-upload
      :disabled ="showupload"
      :action="uploadAction"
      list-type="picture-card"
      :file-list="brsfzfileList"
      :data="{biz:'khzl/'+bizPath}"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="brsfzfileList.length < 9">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
      <a-modal :width="800" :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
    <div>
      <a-divider orientation="left" >身份信息--配偶身份证正反面</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="posfzfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handlepofjChange"
      >
       <!-- :data="{biz:bizPath}"-->
        <div v-if="posfzfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left">身份信息--结婚证户口本</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="jhzfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handljhzChange"
      >
        <div v-if="jhzfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left">身份信息--人像照片</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="rxzpfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handlerxzpChange"
      >
        <div v-if="rxzpfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left">资产信息--房屋拍照</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="fwpzfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handlefwpzChange"
      >
        <div v-if="fwpzfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left">资产信息--权证拍照</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="qzpzfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handleqzpzChange"
      >
        <div v-if="qzpzfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left">资产信息--汽车</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="qczpfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handleqczpChange"
      >
        <div v-if="qczpfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" >资产信息--其他资产</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="qtzcfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handleqtzcChange"
      >
        <div v-if="qtzcfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" >经营项目--经营场所、场地(果园、鱼塘等)</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="jycsfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handlejycsChange"
      >
        <div v-if="jycsfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">采集者--采集者拍照</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="cjzpzfileList"
        :data="{biz:'khzl/'+bizPath}"
        @preview="handlePreview"
        @change="handcjzpzChange"
      >
        <div v-if="cjzpzfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>


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
      showupload:
        {
          type: Boolean,
          default: false
        }
    },


    data() {

      return {
        imgdate:{},
        uploadAction:window._CONFIG['domianURL']+"/sys/common/upload",
        urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
        //urlDownload:window._CONFIG['staticDomainURL'],
        previewVisible: false,
        previewImage: '',
        brsfzfileList: [],
        posfzfileList:[],
        jhzfileList:[],
        rxzpfileList:[],
        fwpzfileList:[],
        qzpzfileList:[],
        qczpfileList:[],
        qtzcfileList:[],
        jycsfileList:[],
        cjzpzfileList:[],
      };
    },

    created(){

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
        console.log("本人身份证");
        this.brsfzfileList = fileList;
        console.log(this.brsfzfileList)


      },
      handlepofjChange({ fileList }) {
        console.log("配偶身份证");
        this.posfzfileList = fileList;
        console.log(this.posfzfileList)
      },
      handljhzChange({ fileList }) {
        this.jhzfileList = fileList;
        console.log("结婚证");
        console.log(this.jhzfileList)
      },
      handlerxzpChange({ fileList }){
        this.rxzpfileList = fileList;
        console.log("人像拍照");
        console.log(this.rxzpfileList)
      },
      handlefwpzChange({fileList}){
        this.fwpzfileList = fileList;
        console.log("房屋拍照");
        console.log(this.fwpzfileList)
      },
      handleqzpzChange({fileList}){
        this.qzpzfileList = fileList;
        console.log("权重拍照");
        console.log(this.qzpzfileList)
      },
      handleqczpChange({fileList}){
        this.qczpfileList = fileList;
        console.log("汽车照片");
        console.log(this.qczpfileList)
      },
      handleqtzcChange({fileList}){
        this.qtzcfileList = fileList;
        console.log("其他资产");
        console.log(this.qtzcfileList)
      },
      handlejycsChange({fileList}){
        this.jycsfileList = fileList;
        console.log("经营场所、场地(果园、鱼塘等)");
        console.log(this.jycsfileList)
      },
      handcjzpzChange({fileList}){
        this.cjzpzfileList = fileList;
        console.log("采集者--采集者拍照");
        console.log(this.cjzpzfileList)
      },

      add(){
        this.imgdate={
          "brsfzfileList":this.brsfzfileList,
          "posfzfileList":this.posfzfileList,
          "jhzfileList":this.jhzfileList,
          "rxzpfileList":this.rxzpfileList,
          "fwpzfileList":this.fwpzfileList,
          "qzpzfileList":this.qzpzfileList,
          "qczpfileList":this.qczpfileList,
          "qtzcfileList":this.qtzcfileList,
          "jycsfileList":this.jycsfileList,
          "cjzpzfileList":this.cjzpzfileList
        }
        console.log(this.imgdate)
      },
      showImg(value){
        console.log(value);
        console.log("-----------------");
        console.log(this.studentImg)
        this.brsfzfileList = this.initFileListArr(value.brsfzArray);
        this.posfzfileList = this.initFileListArr(value.posfzArray);
        this.jhzfileList  = this.initFileListArr(value.jhzArray);
        this.rxzpfileList = this.initFileListArr(value.rxzpArray);
        this.fwpzfileList = this.initFileListArr(value.fwpzArray);
        this.qzpzfileList = this.initFileListArr(value.qzpzArray);
        this.qczpfileList = this.initFileListArr(value.qczpArray);
        this.qtzcfileList = this.initFileListArr(value.qtzcArray);
        this.jycsfileList = this.initFileListArr(value.jycsArray);
        this.cjzpzfileList = this.initFileListArr(value.cjzpzArray);
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
          this.brsfzfileList=[],
          this.posfzfileList=[],
          this.jhzfileList=[],
          this.rxzpfileList=[],
          this.fwpzfileList=[],
          this.qzpzfileList=[],
          this.qczpfileList=[],
          this.qtzcfileList=[],
          this.jycsfileList=[],
          this.cjzpzfileList=[]
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
