<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="close"
           okText="导出"
           cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--<a-card class="card" :bordered="false">-->
        <a-table bordered
                 size="middle"
                 rowKey="zjhm"
                 :dataSource="this.dataSource"
                 :columns="columns"
                 :pagination="false"
                 :loading="false"/>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction, downFile } from '@/api/manage'
  export default {
    name: 'yxkhModal',
    data() {
      return {
        title: '用信客户明细',
        visible: false,
        confirmLoading: false,
        model: {},
        form: this.$form.createForm(this),
        url: {
          list: '/tjfx/zftjysb/xzcysb/yxkh',
          exportXlsUrl: '/tjfx/zftjysb/xzcysb/exportYxkhXls',
        },
        dataSource: [],
        columns: [
          {
            title: '户号编码',
            dataIndex: 'hhbm',
            align: "center",
            width: 140
          },
          {
            title: '客户名称',
            dataIndex: 'khmc',
            align: "center",
            width: 120
          },
          {
            title: '证件号码',
            dataIndex: 'zjhm',
            align: "center",
            width: 140
          },
        ],

      }
    },
    methods: {
      detail(record) {
        this.model = Object.assign({}, record)
        this.confirmLoading = true
        this.visible = true
        let param = {'ssxz': record.ssxz, 'xzc': record.xzc}
        getAction(this.url.list, param).then(res => {
          this.dataSource = res.result
        }).finally(() => {
          this.confirmLoading = false;
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        let fileName = "走访统计验收表-用信客户"
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {'ssxz': this.model.ssxz, 'xzc': this.model.xzc}
        console.log("导出参数",param)
        downFile(this.url.exportXlsUrl,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
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