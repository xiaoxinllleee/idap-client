<template>
  <div class="clearfix">

    <div>
      <a-divider v-show="this.pylx === '1' || this.pylx === '4' || this.pylx === ''" orientation="left" style="color: #1890FF;">评议照片</a-divider>
      <a-divider v-show="this.pylx === '2'" orientation="left" style="color: #1890FF;">音频文件</a-divider>
      <a-divider v-show="this.pylx === '3'" orientation="left" style="color: #1890FF;">微信截图</a-divider>
      <a-upload :disabled ="showupload"
                :action="uploadAction"
                list-type="picture-card"
                :file-list="QtpyPhotoFileList"
                :data="{biz:'nh/nhjbxx/'+ this.defaultMonthOpera}"
                @preview="handlePreview" v-if="this.pylx != '2'">
        <div v-if="QtpyPhotoFileList.length < 9 " >
          <!--<a-icon type="plus" />-->
          <div class="ant-upload-text">Image</div>
        </div>
      </a-upload>
      <a-modal :width="800" :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 95%;" :src="previewImage"/>
      </a-modal>
    </div>

    <div>
      <a-divider orientation="left" style="color: #1890FF;">评议表</a-divider>
      <a-upload :disabled ="showupload"
                :action="uploadAction"
                list-type="picture-card"
                :file-list="QtpyTableFileList"
                :data="{biz:'nh/nhjbxx/'+ this.defaultMonthOpera}"
                @preview="handlePreview">
        <div v-if="QtpyTableFileList.length < 9 " >
          <!--<a-icon type="plus" />-->
          <div class="ant-upload-text">Image</div>
        </div>
      </a-upload>
      <a-modal :width="800" :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 95%" :src="previewImage"/>
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
    name: 'PhotoViewQtpy',
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
        pylx: '',
        previewImage: '',
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: undefined,
        imgdate: {},
        QtpyPhotoFileList: [],
        QtpyTableFileList: [],
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
        if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      },
      showImg(value) {
        // console.log('(PhotoView)Method[showImg]-value :',value);
        if (this.pylx === '1') {
          this.QtpyPhotoFileList = this.initFileListArr(value.typeOneFileList);
        } else if (this.pylx === '2') {
          /*this.QtpyPhotoFileList = this.initFileListArr(value.typeTwoFileList);*/
        } else if (this.pylx === '3') {
          this.QtpyPhotoFileList = this.initFileListArr(value.typeThreeFileList);
        } else if (this.pylx === '4') {
          this.QtpyPhotoFileList = this.initFileListArr(value.typeFourFileList);
        }
        // console.info('纸质评议 -',this.QtpyPhotoFileList);
      },
      showSenateImg(value) {
        this.QtpyTableFileList = this.initFileListArr(value.SenateTableFileList);
      },
      close() {
          this.QtpyPhotoFileList = [];
      },
      initFileListArr(val) {
        console.info('获取文件访问路径 -',val);
        let fileList = [];
        if (!val || val.length === 0) return fileList;
        for (var a = 0; a < val.length; a++) {
          console.info('val[a].url -',val[a].url)
          let url = getFileAccessHttpUrl(val[a].url, this.urlDownload, "http");
          console.info('url -',url)
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