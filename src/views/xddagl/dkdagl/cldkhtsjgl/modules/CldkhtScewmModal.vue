<template>
  <a-modal
    :title="title"
    :width="350"
    :visible="visible"
    @ok="handleCancel"
    @cancel="handleCancel"
    cancelText="关闭">

   <img alt="example" style="width: 100%" :src="previewImage1"/>
   <img alt="example" style="width: 100%" :src="previewImage2"/>
  </a-modal>
</template>

<script>



  import { putAction } from '@api/manage'

  export default {
    name: "CldkhtScewmModal",
    components: {

    },
    data(){
      return{
        urlDownload:window._CONFIG['domianURL'] + "/sys/common/download/",
        previewImage1:'',
        previewImage2:'',
        title:'生成二维码',
        visible: false,
      }
    },
    methods: {
      init(record) {
        this.visible = true
        this.ewm(record);
      },
      ewm(record){
        let data = {
          "jgdm":record.jgdm,
          "dkpz":record.dkpz,
          "khmc":record.khmc,
          "zjhm":record.zjhm,
          "hth":record.hth,
          "dabh":record.dabh,

        }
        putAction("/cldkhtsjgl/cldkhtsjgl/scewm",data).then((res)=>{
          this.previewImage1 = this.urlDownload + res.result.savePath
          this.previewImage2 = this.urlDownload + res.result.savetpPath
        })
      },

      close() {
        this.visible=false;
        this.scewm(record)
        this.previewImage1='',
        this.previewImage2=''
      },
      handleCancel() {
        this.close()
      },

    }
  }

</script>

<style scoped>

</style>