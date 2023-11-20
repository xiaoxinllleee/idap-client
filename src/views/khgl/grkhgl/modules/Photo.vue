<template>
  <a-modal :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    <a-card :bordered="false" :class="{'abcdefg':true}">
      <div class="no-print" style="text-align: right">
        <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
      </div>
      <section ref="print" id="printContent" class="abcdefg">
        <div class="clearfix">
          <div v-if="ImgList===0">
            <a-divider orientation="left" style="color: red;">暂无证件信息</a-divider>
          </div>

          <div v-if="this.pictureList[0].brsfzfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">本人身份证正反面</a-divider>
            <img @click="rotate(item.uid)" v-for="(item,i) in this.pictureList[0].brsfzfileList" alt="example"  :class="item.uid" :ref="item.uid"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px;" :src="item.url"/>
          </div>

          <div v-if="this.pictureList[0].posfzfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">配偶身份证正反面</a-divider>
            <img class="Img" ref="Images" @click="rotate" v-for="(item,i) in this.pictureList[0].posfzfileList" alt="example"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>
            <!--            <img class="Img" v-for="(item,i) in this.posfzfileList" alt="example"style="width: 300px;margin-left: 36px;padding-bottom: 50px" :src="item.url"/>-->
          </div>

          <div v-if="this.pictureList[0].jhzfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">结婚证户口本</a-divider>
            <img class="Img" ref="Images" @click="rotate" v-for="(item,i) in this.pictureList[0].jhzfileList" alt="example"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>
            <!--            <img class="Img" v-for="(item,i) in this.jhzfileList" alt="example"style="width: 300px;margin-left: 36px;padding-bottom: 50px" :src="item.url"/>-->

          </div>

          <div v-if="this.pictureList[0].rxzpfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">人像照片</a-divider>
            <!--            <img class="Img" v-for="(item,i) in this.rxzpfileList" alt="example"style="width: 400px;margin-left: 150px;padding-bottom: 50px" :src="item.url"/>-->
            <img class="Img" ref="Images" @click="rotate" v-for="(item,i) in this.pictureList[0].rxzpfileList" alt="example"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>

          </div>

          <div v-if="this.pictureList[0].fwpzfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">房屋拍照</a-divider>
            <!--            <img class="Img" v-for="(item,i) in this.fwpzfileList" alt="example" style="width: 400px;margin-left: 150px;padding-bottom: 50px" :src="item.url"/>-->
            <img class="Img" ref="Images" @click="rotate" v-for="(item,i) in this.pictureList[0].fwpzfileList" alt="example"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>

          </div>
          <div v-if="this.pictureList[0].qzpzfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">权证拍照</a-divider>
            <!--            <img class="Img" v-for="(item,i) in this.qzpzfileList" alt="example" style="width: 400px;margin-left: 150px;padding-bottom: 50px" :src="item.url"/>-->
            <img class="Img" ref="Images" @click="rotate" v-for="(item,i) in this.pictureList[0].qzpzfileList" alt="example"
                 style=" width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>

          </div>
          <div v-if="this.pictureList[0].qczpfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">汽车</a-divider>

            <!--            <img class="Img" v-for="(item,i) in this.qczpfileList" alt="example" style="width: 400px;margin-left: 150px;padding-bottom: 50px" :src="item.url"/>-->
            <img class="Img" ref="Images" @click="rotate" v-for="(item,i) in this.pictureList[0].qczpfileList" alt="example"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>

          </div>
          <div v-if="this.pictureList[0].qtzcfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">其他资产</a-divider>

            <!--            <img class="Img" v-for="(item,i) in this.qtzcfileList" alt="example" style="width: 400px;margin-left: 150px;padding-bottom: 50px" :src="item.url"/>-->
            <img class="Img"ref="Images" @click="rotate"  v-for="(item,i) in this.pictureList[0].qtzcfileList" alt="example"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>

          </div>
          <div v-if="this.pictureList[0].jycsfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">经营场所、场地(果园、鱼塘等)</a-divider>
            <!--            <img class="Img" v-for="(item,i) in this.jycsfileList" alt="example" style="width: 400px;margin-left: 150px;padding-bottom: 50px" :src="item.url"/>-->
            <img class="Img"ref="Images" @click="rotate" v-for="(item,i) in this.pictureList[0].jycsfileList" alt="example"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>

          </div>
          <div v-if="this.pictureList[0].cjzpzfileList.length>0">
            <a-divider orientation="left" style="color: #1890FF;">采集者拍照</a-divider>

            <!--            <img class="Img" v-for="(item,i) in this.cjzpzfileList" alt="example" style="width: 400px;margin-left: 150px;padding-bottom: 50px" :src="item.url"/>-->
            <img class="Img" ref="Images" @click="rotate"v-for="(item,i) in this.pictureList[0].cjzpzfileList" alt="example"
                 style="width: 420px;margin-left: 135px;padding-bottom: 10px" :src="item.url"/>
          </div>
        </div>
      </section>
    </a-card>
  </a-modal>
</template>

<script>

  import { getFileAccessHttpUrl } from '@/api/manage'
  import { httpAction, putAction, getAction, downFile } from '@/api/manage'

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  const uidGenerator = () => {
    return '-' + parseInt(Math.random() * 10000 + 1, 10)
  }
  export default {

    data() {
      return {
        visible: false,
        imgdate: {},
        confirmLoading: false,
        currentPage: 0,
        uploadAction: window._CONFIG['domianURL'] + '/sys/common/upload',
        urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
        //urlDownload: window._CONFIG['staticDomainURL'],
        previewImage: '',
        ImgList: [],
        pictureList: [
          {
          brsfzfileList: [],
          posfzfileList: [],
          jhzfileList: [],
          rxzpfileList: [],
          fwpzfileList: [],
          qzpzfileList: [],
          qczpfileList: [],
          qtzcfileList: [],
          jycsfileList: [],
          cjzpzfileList: [],
          }
        ],
        fileInfo: {
          fileUrl: '',
          deg: 0
        },
      }
    },
    created() {
      // 设置图片初始旋转角度
      this.pictureList.forEach(item => {
        item.deg = 0
      })
      this.fileInfo = this.pictureList[this.currentPage]
    },

    methods: {
      //旋转图片
      // rotate(uid) {
      // /*  let uid ='';
      //   for (let i = 0;i<this.pictureList[0].brsfzfileList.length;i++){
      //     console.log('---------')
      //     console.log(this.pictureList[0].brsfzfileList)
      //
      //     console.log(this.pictureList[0].brsfzfileList[i])
      //     uid =this.pictureList[0].brsfzfileList[i].uid
      //   }
      //   console.log("uid="+uid)*/
      //   let images=this.$refs[uid];
      //   console.log(images)
      //   for (var a = 0; a < images.length; a++) {
      //     this.fileInfo = this.pictureList[this.currentPage]
      //     console.log("deg="+this.fileInfo.deg)
      //     this.fileInfo.deg += 90
      //     if (this.fileInfo.deg >= 360) {
      //       this.fileInfo.deg = 0
      //     }
      //     images[a].style.transform = `rotate(${this.fileInfo.deg}deg)`
      //   }
      //
      // },

      add(record) {
        this.visible = true
        let params = { 'zjhm': record.zjhm }
        getAction('khgl/vKhglKrkhgl/img', params).then((res) => {
          if (res.success) {
            this.showImg(res.result)
          }
        })
        this.imgdate = {
          'brsfzfileList': this.pictureList[0].brsfzfileList,
          'posfzfileList': this.pictureList[0].posfzfileList,
          'jhzfileList': this.pictureList[0].jhzfileList,
          'rxzpfileList': this.pictureList[0].rxzpfileList,
          'fwpzfileList': this.pictureList[0].fwpzfileList,
          'qzpzfileList': this.pictureList[0].qzpzfileList,
          'qczpfileList': this.pictureList[0].qczpfileList,
          'qtzcfileList': this.pictureList[0].qtzcfileList,
          'jycsfileList': this.pictureList[0].jycsfileList,
          'cjzpzfileList': this.pictureList[0].cjzpzfileList
        }

      },
      showImg(value) {
        console.log(value)
        console.log('-----------------')
        console.log(value.brsfzArray.length + '---' + value.posfzArray.length)
        this.ImgList = value.brsfzArray.length
          + value.jhzArray.length
          + value.qzpzArray.length
          + value.cjzpzArray.length
          + value.qtzcArray.length
          + value.posfzArray.length
          + value.qczpArray.length
          + value.jycsArray.length
          + value.rxzpArray.length
          + value.fwpzArray.length
        this.pictureList[0].brsfzfileList = this.initFileListArr(value.brsfzArray)
        this.pictureList[0].posfzfileList = this.initFileListArr(value.posfzArray)
        this.pictureList[0].jhzfileList = this.initFileListArr(value.jhzArray)
        this.pictureList[0].rxzpfileList = this.initFileListArr(value.rxzpArray)
        this.pictureList[0].fwpzfileList = this.initFileListArr(value.fwpzArray)
        this.pictureList[0].qzpzfileList = this.initFileListArr(value.qzpzArray)
        this.pictureList[0].qczpfileList = this.initFileListArr(value.qczpArray)
        this.pictureList[0].qtzcfileList = this.initFileListArr(value.qtzcArray)
        this.pictureList[0].jycsfileList = this.initFileListArr(value.jycsArray)
        this.pictureList[0].cjzpzfileList = this.initFileListArr(value.cjzpzArray)

      },
      handleCancel() {
        this.visible = false
        this.close()
      },
      handleOk() {
        this.visible = false
        this.close()
      },


      close() {
        this.$emit('close')
        this.visible = false
      },
      initFileListArr(val) {
        let fileList = []

        if (!val || val.length == 0) {
          return fileList
        }
        for (var a = 0; a < val.length; a++) {
          let url = getFileAccessHttpUrl(val[a].url, this.urlDownload, 'http')
          fileList.push({
            uid: uidGenerator(),
            name: val[a].name,
            status: 'done',
            url: url,
            response: {
              status: 'history',
              message: val[a].url
            }
          })
        }
        return fileList
      },


      close() {
        this.pictureList[0].brsfzfileList = [],
          this.pictureList[0].posfzfileList = [],
          this.pictureList[0].jhzfileList = [],
          this.pictureList[0].rxzpfileList = [],
          this.pictureList[0].fwpzfileList = [],
          this.pictureList[0].qzpzfileList = [],
          this.pictureList[0].qczpfileList = [],
          this.pictureList[0].qtzcfileList = [],
          this.pictureList[0].jycsfileList = [],
          this.pictureList[0].cjzpzfileList = []
      }

    }
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
