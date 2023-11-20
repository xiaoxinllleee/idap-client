<template>
  <div class="clearfix">
    <div>
    <a-divider orientation="left" style="color: #1890FF;">身份信息--本人身份证正反面</a-divider>
      <j-image-upload text="上传" :bizPath="bizPath" :imageType="1" @imageChange="imageChange" :isMultiple="true" v-model="BrsfCardpicList"></j-image-upload>
    </div>
    <div>
      <a-divider orientation="left" >身份信息--配偶身份证正反面</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="2"   @imageChange="imageChange" isMultiple v-model="PesfCardpicList"/>

    </div>
    <div>
      <a-divider orientation="left">身份信息--结婚证户口本</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="3"   @imageChange="imageChange" isMultiple v-model="JhzHkbpicList"/>

    </div>
    <div>
      <a-divider orientation="left">身份信息--人像照片</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="4"   @imageChange="imageChange" isMultiple v-model="SfxxRxzppicList"/>

    </div>
    <div>
      <a-divider orientation="left">资产信息--房屋拍照</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="5"   @imageChange="imageChange" isMultiple v-model="ZcxxFwpicList"/>

    </div>
    <div>
      <a-divider orientation="left">资产信息--权证拍照</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="6"   @imageChange="imageChange" isMultiple v-model="ZcxxQzpicList"/>

    </div>
    <div>
      <a-divider orientation="left">资产信息--汽车</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="7"   @imageChange="imageChange" isMultiple v-model="ZcxxQcpicList"/>

    </div>
    <div>
      <a-divider orientation="left" >资产信息--其他资产</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="8"   @imageChange="imageChange" isMultiple v-model="ZcxxQtpicList"/>

    </div>
    <div>
      <a-divider orientation="left" >经营项目--经营场所、场地(果园、鱼塘等)</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="9"   @imageChange="imageChange" isMultiple v-model="JyxmpicList"/>

    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">采集者--采集者拍照</a-divider>
      <j-image-upload :bizPath="bizPath"  :imageType="10"   @imageChange="imageChange" isMultiple v-model="CjzpicList"/>

    </div>


  </div>
</template>



<script>

  import JImageUpload from '@comp/jeecg/JImageUpload.vue'
  import { httpAction, putAction, getAction, postAction, postActionJson } from '@/api/manage'

  export default {
    components: { JImageUpload },
    props:{
      bizPath:{
        type:String,
        required:false,
        default:"khzl/xend/",
      },
      showupload:
        {
          type: Boolean,
          default: false
        },
      zjhm:String,
    },
    watch:{
      zjhm:{
        immediate:true,
        handler() {
          this.getFjxxData()
        },
      },
    },

    data() {

      return {
        deleteFilesHzfjxx: [],
        uploadFilesHzfjxx: [],
        BrsfCardpicList: [],
        PesfCardpicList:[],
        JhzHkbpicList:[],
        SfxxRxzppicList:[],
        ZcxxFwpicList:[],
        ZcxxQzpicList:[],
        ZcxxQcpicList:[],
        ZcxxQtpicList:[],
        JyxmpicList:[],
        CjzpicList:[],
        // 附件上传请求头
        requestHeader: '',
        // 图片上传路径
        picUploadList: [],
        // 图片回显路径
        picWebUrlList: [],
        test:''
      };
    },

    created(){

    },


    methods: {
      handleCancel() {
        console.log("1111111111")
      },


      getFjxxData(){

        getAction('/xend/pad/queryXendFjxx020',{id:this.zjhm}).then(response => {
          if (response.success) {
            console.log(response.result)
            for (let i = 0; i < response.result.length; i++) {
              if (response.result[i].zllx == 1) {
                this.BrsfCardpicList.push(response.result[i]);
              }else if (response.result[i].zllx == 2) {
                this.PesfCardpicList.push(response.result[i]);
              }  else if (response.result[i].zllx == 3) {
                this.JhzHkbpicList.push(response.result[i]);
              } else if (response.result[i].zllx == 4) {
                this.SfxxRxzppicList.push(response.result[i]);
              } else if (response.result[i].zllx == 5) {
                this.ZcxxFwpicList.push(response.result[i]);
              } else if (response.result[i].zllx == 6) {
                this.ZcxxQzpicList.push(response.result[i]);
              } else if (response.result[i].zllx == 7) {
                this.ZcxxQcpicList.push(response.result[i]);
              } else if (response.result[i].zllx == 8) {
                this.ZcxxQtpicList.push(response.result[i]);
              } else if (response.result[i].zllx == 9) {
                this.JyxmpicList.push(response.result[i]);
              } else if (response.result[i].zllx == 10) {
                this.CjzpicList.push(response.result[i]);
              }
            }

          } else {
            this.BrsfCardpicList = [];
            this.PesfCardpicList = [];
            this.JhzHkbpicList = [];
            this.SfxxRxzppicList=[];
            this.ZcxxFwpicList=[];
            this.ZcxxQzpicList=[];
            this.ZcxxQcpicList=[];
            this.ZcxxQtpicList=[];
            this.JyxmpicList=[];
            this.CjzpicList=[];

          }
        }).catch(function (error) {
        });

      },

      imageChange(data) {
        console.log("213444444444")
        console.log(data)
        if (data.imageType == '1'){
          this.BrsfCardpicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '2'){
          this.PesfCardpicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '3'){
          this.JhzHkbpicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '4'){
          this.SfxxRxzppicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '5'){
          this.ZcxxFwpicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '6'){
          this.ZcxxQzpicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '7'){
          this.ZcxxQcpicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '8'){
          this.ZcxxQtpicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '9'){
          this.JyxmpicList = data.uploadFiles? data.uploadFiles : [];
        }
        if (data.imageType == '10'){
          this.CjzpicList = data.uploadFiles? data.uploadFiles : [];
        }
        this.uploadFilesHzfjxx=data.uploadFiles? data.uploadFiles : [];
        this.deleteFilesHzfjxx = data.deleteFiles ? data.deleteFiles : [];
        this.$emit('getImageData', { uploadFilesHzfjxx: this.uploadFilesHzfjxx, deleteFilesHzfjxx: this.deleteFilesHzfjxx })
      },


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
