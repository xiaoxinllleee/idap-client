<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
  >
    <a-card style="margin-top: 10px" :bordered="false" title="导入文件">
      <a-button v-if="url.exportXlsUrl != null" type="primary" icon="download" @click="handleExportXls(exportTemplateName)">下载导入模板</a-button>
      <a-divider  v-if="url.exportXlsUrl != null" type="horizontal" />
      <!-- 操作按钮区域 -->
      <div class="table-operator">
        <j-upload text="上传文件" fileType="file" listType="text" :value="videoPaths" @change="importChange"/>
        <a-button type="primary" icon="download" :disabled="disabled" :loading="confirmLoading" @click="doImport()">开始导入</a-button>
      </div>
    </a-card>
    <div slot="footer">
      <a-button @click="handleCancel">关闭</a-button>
    </div>
  </a-modal>
</template>

<script>
  import JUpload from '@/components/jeecg/JUpload'
  import { httpAction,getAction,downFile } from '@/api/manage'

  export default {
    name: 'ExcelImport',
    description: 'Excel导入公共modal',
    components: {
      JUpload
    },
    data(){
      return {
        title: '',
        visible: false,
        confirmLoading: false,
        videoPaths: '',
        exportTemplateName: '导入模板',
        filePaths: '',
        url:{
          list: '',
          exportXlsUrl: '',
          importExcelUrl: '',
        },
        disabled: true,
        wgbh:'',
      }
    },
    methods: {
      created() {
        this.disabled = true
      },
      showModal(params) {
        console.log("===ExcelImport showModal===>")
        console.log(params)
        this.visible = true
        this.disabled = true
        this.filePaths = ''
        this.url.exportXlsUrl = params.exportTemplateUrl
        this.url.importExcelUrl = params.importExcelUrl
        this.exportTemplateName = params.exportTemplateName
        this.wgbh=params.wgbh
      },
      importChange(data) {
        console.log("data")
        console.log(data)
        this.filePaths = data.path
        if (this.filePaths.length > 0) {
          this.disabled = false
        } else {
          this.disabled = true
        }

      },
      doImport() {
        let formData = {
          filePaths: this.filePaths,
          wgbh:this.wgbh
        }
        let method = 'post'
        this.confirmLoading = true;
        httpAction(this.url.importExcelUrl,formData, method).then((res)=>{
          if(res.success){
            this.$message.success(res.message);
            this.$emit('ok');
          }else{
            this.$message.warning(res.message,5);
          }
        }).finally(() => {
          this.confirmLoading = false;
          this.close()
        })
      },
      handleOk () {

      },
      handleCancel () {
        this.close()
      },
      close () {
        this.$emit('close')
        this.visible = false
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导入模板"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        console.log("导出参数",param)
        downFile(this.url.exportXlsUrl,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
         /* if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data]), fileName+'.xls')
          }else{
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName+'.xls')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link); //下载完成移除元素
            window.URL.revokeObjectURL(url); //释放掉blob对象
          }*/
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
      },
    }
  }
</script>

<style scoped>

</style>