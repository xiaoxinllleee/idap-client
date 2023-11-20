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
      <a-button icon="download" type="primary" :loading="exportLoading" @click="handleExportXls('商户走访明细')">导出</a-button>
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
      <span slot="detail" slot-scope="shmc,record">
        <a @click="shxq(record)">{{shmc}}</a>
      </span>
    </a-table>
    <ShjbxxxXqModal ref="ShjbxxxXqModal"></ShjbxxxXqModal>
  </a-modal>
</template>

<script>
import { getAction, downFile } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { filterObj } from '@/utils/util'
import ShjbxxxXqModal from '@views/cmms/khxxgl/khflgl/shxq/modules/ShjbxxxXqModal'

  export default {
    name: "ShzfmxModal",
    mixins:[JeecgListMixin],
    components: {
      ShjbxxxXqModal
    },
    data () {
      return {
        title:"详情",
        dataSource: [],
        lx:'',
        hzfs:'',
        sjlx:'',
        record: {},
        type: '',
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
          { title: '走访日期', dataIndex: 'tjrq' },
          { title: '员工姓名', dataIndex: 'yggh_dictText' },
          { title: '商户ID', dataIndex: 'shid' },
          { title: '商户名称', dataIndex: 'shmc',  scopedSlots: { customRender: 'detail' } },
          { title: '统一社会信用代码', dataIndex: 'tyshxydm' },
          { title: '网格名称', dataIndex: 'wgbh_dictText' },
          { title: '机构名称', dataIndex: 'jgdm_dictText' },
        ],

        url: {
          list: "/shzfsjmx/shzfsjmx/list",
          edit: "/shzfsjmx/shzfsjmx/edit",
          exportXlsUrl: "/shzfsjmx/shzfsjmx/exportZfsjmxXls"
        },
      }
    },
    methods: {
      //lx：走访：1：日 2：周 3：月 4：季 5：年 6：累计  有效走访：7：日 8：周 9：月 10：季 11：年 12：累计
      //type: GR：个人 ZH：支行 WG：网格
      //hzfs：1：通过农户所在支行汇总 2：通过客户经理所在支行汇总
      //sjlx: 1：汇总表 2：维度统计表
      init(record,lx,type,hzfs,sjlx){
        console.log(record+"init")
        this.visible = true;
        this.lx = lx
        this.hzfs = hzfs
        this.sjlx = sjlx
        this.record = record
        this.type = type
        this.loadData();
      },
      loadData () {
        let params = this.initParams()
        console.log('params', params)
        this.loading = true;
        getAction(this.url.list, params).then((res)=>{
          console.log(res)
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
          this.loading = false;
        });
      },
      initParams() {
        let params = this.getQueryParams()
        params.lx = this.lx
        params.tjrq = this.record.tjrq
        if(this.type == 'GR') {
          params.yggh = this.record.yggh
        } else if (this.type == 'ZH') {
          params.zzbz = this.record.zzbz
        } else if (this.type == 'WG') {
          params.wgbh = this.record.wgbh
        }
        if (this.hzfs) {
          params.hzfs = this.hzfs
        }
        if (this.sjlx) {
          params.sjlx = this.sjlx
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
      shxq(record){
        getAction('/khflgl/shxq/queryById', {id: record.shid}).then((res)=>{
          console.log(res)
          if(res && res.result) {
            this.$refs.ShjbxxxXqModal.edit(res.result);
            this.$refs.ShjbxxxXqModal.title = "详情";
            this.$refs.ShjbxxxXqModal.disableSubmit = true;
          }
        });
      },
    }
  }
</script>

<style lang="less" scoped>

</style>