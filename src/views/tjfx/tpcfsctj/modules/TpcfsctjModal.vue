<template>
  <a-modal
    :title="title"
    width="60%"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="导出详情"
    cancelText="关闭">
    <div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="hhbm"
               :columns="columns"
               :dataSource="dataSource"
               :loading="loading"
               :pagination="false"
               >
      </a-table>
    </div>
  </a-modal>
</template>

<script>
  import { getAction, downFile } from '@/api/manage'
  export default {
    name: "TpcfsctjModal",
    data () {
      return {
        description: '图片重复上传统计详情',
        title:"查看详情",
        record: {},
        visible: false,
        loading: false,
        dataSource:[],
        type: 1,
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText',
          },
          {
            title: '户号编码',
            align: "center",
            dataIndex: 'hhbm',
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'hzxm',
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'hzzjhm',
          },
          {
            title: '上传人',
            align: "center",
            dataIndex: 'scr_dictText',
          },
          {
            title: '上传时间',
            align: "center",
            dataIndex: 'scsj',
          },
        ],
        url: {
          list: "/tjfx/tpcfsctj/viewDetail",
          exportXlsUrl: "/tjfx/tpcfsctj/exportDetail",
        },
      }
    },
    created(){
    },
    methods: {
      init(record, type) {
        this.record = record
        this.type = type
        let params = {}
        params.md5 = record.md5
        if(type == 2) {
          params.hhbm = record.hhbm
        } else if (type == 3) {
          params.sszh = record.sszh
          params.xzc = record.xzc
        }
        this.loading = true;
        let _that = this
        getAction(this.url.list, params).then((res) => {
          console.log('res', res)
          _that.dataSource = res.result
          this.loading = false;
        })
        this.visible = true
      },
      handleOk() {
        let fileName = "图片重复上传详情"
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {}
        param.md5 = this.record.md5
        if(this.type == 2) {
          params.hhbm = record.hhbm
        }
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
      handleCancel() {
        this.$emit('close');
        this.visible = false;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>