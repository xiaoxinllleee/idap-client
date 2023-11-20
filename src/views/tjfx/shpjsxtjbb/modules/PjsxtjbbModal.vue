<template>
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleCancel"
    @cancel="handleCancel"
    >

    <div style="margin-bottom: 10px;">
      <a-button icon="download" type="primary" :loading="exportLoading" @click="handleExportXls('商户评级授信统计明细')">导出</a-button>
    </div>
    <a-table ref="table"
             size="middle"
             bordered
             :columns="colunms"
             :dataSource="dataSource"
             rowKey="id"
             :pagination="ipagination"
             :loading="loading"
             @change="handleTableChange"
    >
    </a-table>

  </a-modal>
</template>

<script>
import { downFile, getAction, httpAction } from '@/api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "PjsxtjbbModal",
    mixins:[JeecgListMixin],
    components: {
    },
    data () {
      return {
        title:"明细数据",
        dataSource: [],
        record: {},
        // 分页参数
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        colunms: [
          { title: '归属机构', dataIndex: 'sszh_dictText' },
          { title: '归属网格', dataIndex: 'ssyxdy_dictText' },
          { title: '商户名称', dataIndex: 'shmc' },
          { title: '系统测算授信额度', dataIndex: 'xtcsed' },
          { title: '客户经理评定等级', dataIndex: 'khjlpddj_dictText'},
          { title: '客户经理授信额度', dataIndex: 'khjlsxed' },
          { title: '评级人工号', dataIndex: 'lrr' },
          { title: '评级人', dataIndex: 'lrrxm' },
          { title: '评级时间', dataIndex: 'lrsj' },
        ],
        url: {
          list: "/shpjsx/wg/tjfxPjsxtjbbSh/queryPageListMx",
          exportXlsUrl: "/shpjsx/wg/tjfxPjsxtjbbSh/exportShPjsxMxXls"
        },
        type:'',
      }
    },
    methods: {
      init(record,type){
        if (type=='1'){
          this.title='商户评级授信-评级户数详情'
        }else{
          this.title='商户评级授信-授信户数详情'
        }
        console.log(record+"init")
        this.visible = true;
        this.record = record
        this.type=type
        this.loadData();
      },
      loadData () {
        console.log(this.record.sswg+"loadData")
        let params = {
          'sswg':this.record.sswg,
          'sjrq':this.record.sjrq,
          'type':this.type,
          pageNo:this.ipagination.current,
          pageSize:this.ipagination.pageSize,
        }
        console.log('params', params);
        this.loading = true;
        getAction(this.url.list,params).then((res)=>{
          console.log(res)
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.length;
        }).finally(() =>{
          this.loading = false;
        });
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        if (this.type=='1'){
          fileName="商户评级授信统计-评级户数明细"
        }else{
          fileName="商户评级授信统计明细-授信户数明细"
        }
        let params = {
          'sswg':this.record.sswg,
          'sjrq':this.record.sjrq,
          'type':this.type
        }
        console.log("导出参数",params)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, params).then((data)=>{
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
        }).finally(()=>{
          this.exportLoading = false
        })
      },


      close () {
        this.visible = false;
        this.dataSource = []
        this.ipagination.current=1
        this.ipagination.pageSize=10
      },
      handleCancel () {
        this.visible = false
        this.close()
      },
      handleTableChange(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
        }
        this.ipagination = pagination;
        this.loadData();
      },

    }
  }
</script>

<style lang="less" scoped>

</style>