<template>
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    @ok="handleCancel"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    >
    <div style="margin-bottom: 10px;">
      <a-button icon="download" type="primary" :loading="exportLoading" @click="handleExportXls('农户授信明细')">导出</a-button>
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
    />
  </a-modal>
</template>

<script>
import { getAction, downFile } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "NhsxmxModal",
    mixins:[JeecgListMixin],
    data () {
      return {
        title:"详情",
        dataSource: [],
        lx:'',
        sxlx:'',
        type: '',
        record: {},
        tjrq:'',
        exportLoading: false,
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
        loading: false,
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
          { title: '统计日期', dataIndex: 'tjrq' },
          { title: '网格名称', dataIndex: 'wgbh_dictText' },
          { title: '机构名称', dataIndex: 'jgdm_dictText' },
          { title: '户号编码', dataIndex: 'hhbm' },
          { title: '客户名称', dataIndex: 'khmc' },
          { title: '证件号码', dataIndex: 'zjhm' },
          { title: '授信金额', dataIndex: 'sxje' },

        ],

        url: {
          list: "/sxyxtj/nhsxmx/list",
          exportXlsUrl: "/sxyxtj/nhsxmx/exportNhsxmxXls"
        },
      }
    },
    methods: {
      //lx：1：日 2：周 3：月 4：季 5：年 6：累计
      //type: GR：个人 ZH：支行 WG：网格
      //sxlx：1：全部 2：存量客户 3：新客户 4：惠农快贷
      init(record,lx,type,sxlx){
        console.log(record+"init")
        this.visible = true;
        this.lx = lx
        this.record = record
        this.sxlx = sxlx
        this.type = type
        this.loadData();
      },
      loadData () {
        let params = this.initParams();
        console.log('params', params);
        this.loading = true;
        getAction(this.url.list,params).then((res)=>{
          console.log(res)
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
        }).finally(() =>{
          this.loading = false;
        });
      },
      initParams() {
        let params = this.getQueryParams()
        params.lx = this.lx
        params.tjrq = this.record.tjrq
        if (this.type == 'ZH') {
          params.zzbz = this.record.zzbz
        } else if (this.type == 'WG') {
          params.wgbh = this.record.wgbh
        }

        if (this.sxlx) {
          params.sxlx = this.sxlx
        }
        return params
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let params = this.initParams()
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
      getQueryField() {
        //TODO 字段权限控制
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