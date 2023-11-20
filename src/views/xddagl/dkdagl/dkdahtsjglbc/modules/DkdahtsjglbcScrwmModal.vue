<template>
  <a-modal
    :title="title"
    :width="350"
    :visible="visible"
    @cancel="handleCancel"
    @ok="handleCancel"
    cancelText="关闭">

    <img alt="example" style="width: 100%" :src="previewImage" />
    <img alt="example" style="width: 100%" :src="previewImage2" />
  </a-modal>


</template>
<script>

  import { putAction } from '@api/manage'

  export default {
    name: "DkdahtsjglbcScrwmModal",
    components:{

    },
    data () {
      return {
        urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
        previewImage:'',
        previewImage2:'',
        title:"生成二维码",
        visible: false,
        url: {
        },
      }
    },
    created () {
    },
    methods: {
      init(record){
        this.visible = true;
        this.ewm(record);
      },
      ewm (record) {
        let data ={
          "jgdm":record.jgdm,
          "khmc":record.khmc,
          "zjhm":record.zjhm,
          "hth":record.hth,
          "dabh":record.dabh,
        }
        putAction("/dkdahtsjglbc/dkdahtsjglbc/scewm",data).then((res)=>{
          this.previewImage = this.urlDownload + res.result.savePath
          this.previewImage2 = this.urlDownload + res.result.savetpPath
        });

      },

      close () {
        this.visible = false;
        this.ewm(record)
        this.previewImage='',
        this.previewImage2=''
      },

      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>

</style>