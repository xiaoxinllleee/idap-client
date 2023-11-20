<template>
  <div class="clearfix">
    <div>
      <a-divider orientation="left" style="color: #1890FF;">入户照片</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="brsfzfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="brsfzfileList.length < 9 " >
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal  :width="800" :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">商铺照片</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="posfzfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="posfzfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>

    </div>

    <div>
      <a-divider orientation="left" style="color: #1890FF;">与客户合影</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="jhzfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="jhzfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>

    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">室内照片</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="rxzpfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="rxzpfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>

    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">营业执照</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="fwpzfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="fwpzfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>

    </div>

    <div>
      <a-divider orientation="left" style="color: #1890FF;">特种行业经营许可证明</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="qzpzfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="qzpzfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>

    </div>

    <div>
      <a-divider orientation="left" style="color: #1890FF;">经营项目</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="qczpfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="qczpfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>

    </div>

    <div>
      <a-divider orientation="left" style="color: #1890FF;">经营场地租赁合同</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="qtzcfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="qtzcfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>

    </div>

    <div>
      <a-divider orientation="left" style="color: #1890FF;">其他附件</a-divider>
      <a-upload
        :disabled ="true"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="jycsfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
      >
        <div v-if="jycsfileList.length < 9 ">
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

  import moment from 'moment'
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
    name: 'fjxx',
    components: { },

    data() {
      return {
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: undefined,
        imgdate:{},
        uploadAction:window._CONFIG['domianURL']+"/sys/common/upload",
        urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
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

      };
    },
    created() {
      this.getCurrentMonth();
    },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1,date:curDate.getDate() }
        this.defaultMonthOpera = curMonth.year.toString()+0+curMonth.month.toString()+curMonth.date.toString();
        console.log(curMonth)
        console.log("------------")
        console.log(this.defaultMonthOpera)

      },
      handleCancel() {
        this.previewVisible = false;
      },
      async handlePreview(file) {

        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      },




      showImg(value){
        console.log("-------value----------");
        console.log(value);
        this.brsfzfileList= this.initFileListArr(value.brsfzArray);
        this.posfzfileList= this.initFileListArr(value.posfzArray);
        this.jhzfileList= this.initFileListArr(value.jhzArray);
        this.rxzpfileList= this.initFileListArr(value.rxzpArray);
        this.fwpzfileList=this.initFileListArr(value.fwpzArray);
        this.qzpzfileList=this.initFileListArr(value.qzpzArray);
        this.qczpfileList=this.initFileListArr(value.qczpArray);
        this.qtzcfileList=this.initFileListArr(value.qtzcArray);
        this.jycsfileList=this.initFileListArr(value.jycsArray);

      },
      close(){
        this.brsfzfileList=[]
          this.posfzfileList=[],
          this.jhzfileList=[],
          this.rxzpfileList=[],
          this.fwpzfileList=[],
          this.qzpzfileList=[],
          this.qczpfileList=[],
          this.qtzcfileList=[],
          this.jycsfileList=[]
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
        return fileList
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