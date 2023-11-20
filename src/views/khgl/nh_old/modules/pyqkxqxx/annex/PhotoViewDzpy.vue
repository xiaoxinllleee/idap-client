<template>
  <div class="clearfix">
    <div>
      <a-divider orientation="left" style="color: #1890FF; margin-top: -15px;">评议照片</a-divider>
      <a-upload :disabled ="showupload"
                :action="uploadAction"
                list-type="picture-card"
                :file-list="DzpyFileList"
                :data="{biz:'nh/nhjbxx/'+ this.defaultMonthOpera}"
                @preview="handlePreview"
                @change="DzpyHandleChange">
        <div v-if="DzpyFileList.length < 9 " >
          <!--<a-icon type="plus" />-->
          <div class="ant-upload-text">Image</div>
        </div>
      </a-upload>
      <a-modal :width="800" :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 95%;" :src="previewImage" />
      </a-modal>
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
    })
  }
  const uidGenerator=()=>{
    return '-'+parseInt(Math.random()*10000+1,10);
  }
  export default {
    name: 'PhotoViewDzpy',
    components: {},
    props:{
      showupload: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        previewVisible: false,
        previewImage: '',
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: undefined,
        imgdate: {},
        DzpyFileList: [],
        uploadAction:window._CONFIG['domianURL']+"/sys/common/upload",
        urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
      }
    },
    created() {
      this.getCurrentMonth();
    },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {
          year : curDate.getFullYear(),
          month: curDate.getMonth() + 1,
          date:curDate.getDate()
        }
        this.defaultMonthOpera = curMonth.year.toString() + 0 + curMonth.month.toString() + curMonth.date.toString();
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
      DzpyHandleChange({ fileList }) {
        this.DzpyFileList = fileList;
        console.info('DzpyHandleChange -',this.DzpyFileList);
      },
      // add(){
      //   this.imgdate = { "DzpyFileList": this.DzpyFileList };
      //   console.info('add -',this.imgdate);
      // },
      showImg(value){
        console.log('(PhotoView)Method[showImg]-value :',value);
        this.DzpyFileList = this.initFileListArr(value);
        console.info('电子评议 -',this.DzpyFileList);
      },
      close(){
          this.DzpyFileList = [];
      },
      initFileListArr(val){
        let fileList = [];
        if (!val || val.length === 0) return fileList;
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
        // this.fileList = fileList;
        return fileList;
      }
    },
  }
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