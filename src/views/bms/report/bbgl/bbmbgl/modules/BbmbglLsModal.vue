<template>
  <a-modal :title="title"
           :width="1600"
           :visible="visible"
           @cancel="handleCancel"
           @ok="handleCancel"
  >
    <a-table bordered
             :columns="columns"
             :dataSource="dataSource"
             rowKey="id"
             :pagination="ipagination"
             :loading="loading"
             @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="downloadTemplate(record)">下载模板文件</a>
      </span>
    </a-table>


  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { downFile } from '@/api/manage'

  export default {
    name: "BbmbglLsModal",
    mixins:[JeecgListMixin],
    components: {
    },
    data () {
      return {
        title:"历史报表模板信息",
        visible: false,
        loading:false,
        result:[],
        model: {},
        url:{
          list:'/bbgl/bbmbglLs/list',
        },
        columns: [
          {
            title: '报表编号',
            align: 'center',
            dataIndex: 'bbbh'
          },
          {
            title: '报表名称',
            align: 'center',
            dataIndex: 'bbmc'
          },
          {
            title: '版本号',
            align: 'center',
            dataIndex: 'bbh'
          },
          {
            title: '创建人',
            align: 'center',
            dataIndex: 'createBy'
          },
          {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
      }
    },
    created () {
    },
    methods: {
      view(record){
        this.model = record
        this.visible = true

        this.queryParam.bbbh = record.bbbh
        this.loadData()

      },
      close () {
        this.visible = false;
      },
      handleCancel () {
        this.close()
      },
      downloadTemplate(row){
        console.log('downloadTemplate', row)
        let fileName = row.wjmc
        downFile('/sys/common/download/' + row.bblj, {}).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName);
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName;
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
          this.exportLoading=false
        })
      },

    }
  }
</script>

<style scoped>

</style>