<template>
  <div class="clearfix">
    <div>
      <a-divider orientation="left" style="color: #1890FF;">借款人(共同借款人)身份证复印件</a-divider>
      <a-upload :disabled ="showupload"
                :action="uploadAction"
                list-type="picture-card"
                :file-list="jkrsfzfileList"
                :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
                @preview="handlePreview"
                @change="jkrsfzhandleChange">
        <div v-if="jkrsfzfileList.length < 9 " >
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
      <a-divider orientation="left" style="color: #1890FF;">借款人（共同借款人）婚姻状态证明复印件</a-divider>
      <a-upload :disabled ="showupload"
                :action="uploadAction"
                list-type="picture-card"
                :file-list="jkrhyztfileList"
                :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
                @preview="handlePreview"
                @change="jkrhyzthandleChange">
        <div v-if="jkrhyztfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">经营企业三证或三证合一复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="jyqyszfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="jyqyszhandleChange"
      >
        <div v-if="jyqyszfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">企业资质证书复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="qyzzzsfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="qyzzzshandleChange"
      >
        <div v-if="qyzzzsfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">特种行业生产（经营）许可证复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="tzhyscfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="tzhyschandleChange"
      >
        <div v-if="tzhyscfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">开户许可证复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="khxkfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="khxkhandleChange"
      >
        <div v-if="khxkfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">公司章程或合伙人协议复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="gszcfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="gszchandleChange"
      >
        <div v-if="gszcfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">近三年及上月财务报表复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="jsnbbfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="jsnbbhandleChange"
      >
        <div v-if="jsnbbfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">高危行业财产保险单复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="gwhyfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="gwhyhandleChange"
      >
        <div v-if="gwhyfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">贷款用途证明材料</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="dkytfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="dkythandleChange"
      >
        <div v-if="dkytfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">抵押物评估报告单</a-divider>
      <a-upload list-type="picture-card"
                :disabled ="showupload"
                :action="uploadAction"
                :file-list="dywpgfileList"
                :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
                @preview="handlePreview"
                @change="dywpghandleChange">
        <div v-if="dywpgfileList.length < 9 ">
          <a-icon type="plus"/>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">抵押物权证复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="dyqzfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="dyqzhandleChange"
      >
        <div v-if="dyqzfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">抵（质）押人身份证及相关证件的复印件</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="dyrsfzfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="dyrsfzhandleChange"
      >
        <div v-if="dyrsfzfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">抵（质）押人《股东会（董事会）决议</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="dyrgdhfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="dyrgdhhandleChange"
      >
        <div v-if="dyrgdhfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">未出租声明或租赁合同（协议）</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="wczfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="wczhandleChange"
      >
        <div v-if="wczfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">承诺函（承诺人、出租人）</a-divider>
      <a-upload list-type="picture-card"
                :disabled ="showupload"
                :action="uploadAction"
                :file-list="crhfileList"
                :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
                @preview="handlePreview"
                @change="crhchandleChange">
        <div v-if="crhfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">保证人基本资料</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="bzrjbzzfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="bzrjbzzhandleChange"
      >
        <div v-if="bzrjbzzfileList.length < 9 ">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
    <div>
      <a-divider orientation="left" style="color: #1890FF;">保证人《股东会（董事会）决议》或担保公司担保函</a-divider>
      <a-upload
        :disabled ="showupload"
        :action="uploadAction"
        list-type="picture-card"
        :file-list="bzrgdhfileList"
        :data="{biz:'dkzl/grdkzl/'+ this.defaultMonthOpera}"
        @preview="handlePreview"
        @change="bzrgdhhandleChange"
      >
        <div v-if="bzrgdhfileList.length < 9">
          <a-icon type="plus" />
          <div class="ant-upload-text" >
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
    name: 'PhotoView',
    components: { },
    props:{
      showupload:
        {
        type: Boolean,
        default: false
      }
    },
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
        jkrsfzfileList: [],
        jkrhyztfileList:[],
        jyqyszfileList:[],
        qyzzzsfileList:[],
        tzhyscfileList:[],
        khxkfileList:[],
        gszcfileList:[],
        jsnbbfileList:[],
        gwhyfileList:[],
        dkytfileList:[],
        dywpgfileList:[],
        dyqzfileList:[],
        dyrsfzfileList:[],
        dyrgdhfileList:[],
        wczfileList:[],
        crhfileList:[],
        bzrjbzzfileList:[],
        bzrgdhfileList:[],
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
        //this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month+'-'+curMonth.date, this.monthFormat);
        this.defaultMonthOpera = curMonth.year.toString()+0+curMonth.month.toString()+curMonth.date.toString();
        console.log('curMonth :',curMonth);
        console.log('defaultMonthOpera :',this.defaultMonthOpera);
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

      jkrsfzhandleChange({ fileList }) {
        console.log("借款人(共同借款人)身份证复印件")
        this.jkrsfzfileList = fileList;
        console.log(this.jkrsfzfileList)
      },
      jkrhyzthandleChange({fileList}){
        console.log("借款人（共同借款人）婚姻状态证明复印件")
        this.jkrhyztfileList = fileList;
        console.log(this.jkrhyztfileList)
      },
      jyqyszhandleChange({fileList}){
        console.log("经营企业三证或三证合一复印件")
        this. jyqyszfileList = fileList;
        console.log(this. jyqyszfileList)
      },
      qyzzzshandleChange({fileList}){
        console.log("企业资质证书复印件")
        this.qyzzzsfileList = fileList;
        console.log(this.qyzzzsfileList)
      },
      tzhyschandleChange({fileList}){
        console.log("特种行业生产（经营）许可证复印件")
        this.tzhyscfileList = fileList;
        console.log(this.tzhyscfileList)
      },
      khxkhandleChange({fileList}){
        console.log("开户许可证复印件")
        this.khxkfileList = fileList;
        console.log(this.khxkfileList)
      },
      gszchandleChange({fileList}){
        console.log("公司章程或合伙人协议复印件")
        this.gszcfileList = fileList;
        console.log(this.gszcfileList)
      },
      jsnbbhandleChange({fileList}){
        console.log("近三年及上月财务报表复印件")
        this.jsnbbfileList = fileList;
        console.log(this.jsnbbfileList)
      },
      gwhyhandleChange({fileList}){
        console.log("高危行业财产保险单复印件")
        this.gwhyfileList = fileList;
        console.log(this.gwhyfileList)
      },
      dkythandleChange({fileList}){
        console.log("贷款用途证明材料")
        this.dkytfileList = fileList;
        console.log(this.dkytfileList)
      },
      dywpghandleChange({fileList}){
        console.log("抵押物评估报告单")
        this.dywpgfileList = fileList;
        console.log(this.dywpgfileList)
      },
      dyqzhandleChange({fileList}){
        console.log("抵押物权证复印件")
        this.dyqzfileList = fileList;
        console.log(this.dyqzfileList)
      },
      dyrsfzhandleChange({fileList}){
        console.log("抵（质）押人身份证及相关证件的复印件")
        this.dyrsfzfileList = fileList;
        console.log(this.dyrsfzfileList)
      },
      dyrgdhhandleChange({fileList}){
        console.log("抵（质）押人《股东会（董事会）决议")
        this.dyrgdhfileList = fileList;
        console.log(this.dyrgdhfileList)
      },
      wczhandleChange({fileList}){
        console.log("未出租声明或租赁合同（协议）")
        this.wczfileList = fileList;
        console.log(this.wczfileList)
      },
      crhchandleChange({fileList}){
        console.log("承诺函（承诺人、出租人）")
        this.crhfileList = fileList;
        console.log(this.crhfileList)
      },
      bzrjbzzhandleChange({fileList}){
        console.log("保证人基本资料")
        this.bzrjbzzfileList = fileList;
        console.log(this.bzrjbzzfileList)
      },
      bzrgdhhandleChange({fileList}){
        console.log("保证人《股东会（董事会）决议》或担保公司担保函")
        this.bzrgdhfileList = fileList;
        console.log(this.bzrgdhfileList)
      },

      add(){
        this.imgdate= {
          "jkrsfzfileList":this.jkrsfzfileList,
          "jkrhyztfileList":this.jkrhyztfileList,
          "jyqyszfileList":this.jyqyszfileList,
          "qyzzzsfileList":this.qyzzzsfileList,
          "tzhyscfileList":this.tzhyscfileList,
          "khxkfileList":this.khxkfileList,
          "gszcfileList":this.gszcfileList,
          "jsnbbfileList": this.jsnbbfileList,
          "gwhyfileList":this.gwhyfileList,
          "dkytfileList": this.dkytfileList,
          "dywpgfileList":this.dywpgfileList,
          "dyqzfileList":this.dyqzfileList,
          "dyrsfzfileList": this.dyrsfzfileList,
          "dyrgdhfileList":this.dyrgdhfileList,
          "wczfileList":this.wczfileList,
          "crhfileList": this.crhfileList,
          "bzrjbzzfileList": this.bzrjbzzfileList,
          "bzrgdhfileList":this.bzrgdhfileList
        }
        console.log(this.imgdate)
      },
      showImg(value){
        console.log('(PhotoView)Method[showImg]-value :',value);
        console.log('studentImg :',this.studentImg);
        this.jkrsfzfileList= this.initFileListArr(value.jkrsfzfileList);
        this.jkrhyztfileList= this.initFileListArr(value.jkrhyztfileList);
        this.jyqyszfileList= this.initFileListArr(value.jyqyszfileList);
        this.qyzzzsfileList= this.initFileListArr(value.qyzzzsfileList);
        this.tzhyscfileList=this.initFileListArr(value.tzhyscfileList);
        this.khxkfileList=this.initFileListArr(value.khxkfileList);
        this.gszcfileList=this.initFileListArr(value.gszcfileList);
        this.jsnbbfileList=this.initFileListArr(value.jsnbbfileList);
        this.gwhyfileList=this.initFileListArr(value.gwhyfileList);
        this.dkytfileList=this.initFileListArr(value.dkytfileList);
        this.dywpgfileList=this.initFileListArr(value.dywpgfileList);
        this.dyqzfileList=this.initFileListArr(value.dyqzfileList);
        this.dyrsfzfileList=this.initFileListArr(value.dyrsfzfileList);
        this.dyrgdhfileList=this.initFileListArr(value.dyrgdhfileList);
        this.wczfileList=this.initFileListArr(value.wczfileList);
        this.crhfileList=this.initFileListArr(value.crhfileList);
        this.bzrjbzzfileList=this.initFileListArr(value.bzrjbzzfileList);
        this.bzrgdhfileList=this.initFileListArr(value.bzrgdhfileList);
      },
      close(){
          this.jkrsfzfileList=[],
          this.jkrhyztfileList=[],
          this.jyqyszfileList=[],
          this.qyzzzsfileList=[],
          this.tzhyscfileList=[],
          this.khxkfileList=[],
          this.gszcfileList=[],
          this.jsnbbfileList=[],
          this.gwhyfileList=[],
          this.dkytfileList=[],
          this.dywpgfileList=[],
          this.dyqzfileList=[],
          this.dyrsfzfileList=[],
          this.dyrgdhfileList=[],
          this.wczfileList=[],
          this.crhfileList=[],
          this.bzrjbzzfileList=[],
          this.bzrgdhfileList=[]
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