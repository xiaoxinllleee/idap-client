<template>
  <a-modal
    :title="title"
    :width="1400"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
  >
    <VPmaFEngineSchemeStatList ref="khfajgList" > </VPmaFEngineSchemeStatList>
  </a-modal>
</template>

<script>
  import {extractBatch,updateBatchzt} from '@/api/api'
  import moment from 'moment'
  import VPmaFEngineSchemeStatList from '@views/pams/khlc/khfajg/VPmaFEngineSchemeStatList'

  export default {
    name: 'BatchExtract',
    description: '提取',
    components: {
      VPmaFEngineSchemeStatList
    },
    data(){
      return {
        rowData:{},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        tjrqb:'',
        tjrqe:'',
        title: '',
        visible: false,
        schemeId:'',
        confirmLoading: false,
        videoPaths: '',
        filePaths: '',
        url:{
          list: '',
          exportXlsUrl: '',
          importExcelUrl: '',
        },
        disabled: true,
      }
    },
    methods: {
      created() {
      },
      handleOk () {
        this.$emit('ok');
        this.close()
      },
      open(schemeId){
        console.log(schemeId)
        this.$nextTick(() => {
          let _this =this;
          this.$refs.khfajgList.queryParam.schemeId=schemeId;
          setTimeout(function (){
            _this.$refs.khfajgList.loadData(1);
          }, 200);
        });

      },
      handleCancel () {
        this.close()
      },
      close () {
        this.tjrqe='';
        this.tjrqb='';
        this.rowData={};
        this.$emit('close')
        this.visible = false
      },
    }
  }
</script>

<style scoped>

</style>