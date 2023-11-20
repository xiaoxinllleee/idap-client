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
      <a-button icon="download" type="primary" :loading="exportLoading" @click="handleExportXls('农户走访明细')">导出</a-button>
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
      <span slot="detail" slot-scope="khmc,record">
        <a @click="nhxq(record)">{{khmc}}</a>
      </span>
    </a-table>
    <nhjbxxx-xq-modal ref="NhjbxxxXqModal" />
  </a-modal>
</template>

<script>
import { getAction, downFile } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { filterObj } from '@/utils/util'
import NhjbxxxXqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/NhjbxxxXqModal'

  export default {
    name: "NhzfmxModal",
    mixins:[JeecgListMixin],
    components: {
      NhjbxxxXqModal
    },
    data () {
      return {
        title:"详情",
        dataSource: [],
        lx:'',
        sxlx:'',
        sjlx:'',
        hzfs:'',
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
          // { title: '员工工号', dataIndex: 'yggh' },
          { title: '员工姓名', dataIndex: 'yggh_dictText' },
          { title: '户号编码', dataIndex: 'hhbm' },
          { title: '客户名称', dataIndex: 'khmc', scopedSlots: { customRender: 'detail' } },
          { title: '证件号码', dataIndex: 'hzzjhm' },
          // { title: '网格编号', dataIndex: 'wgbh' },
          { title: '网格名称', dataIndex: 'wgbh_dictText' },
          { title: '机构名称', dataIndex: 'jgdm_dictText' },
          { title: '是否有效走访', dataIndex: 'sfyxzf_dictText' },
        ],

        url: {
          list: "/zfsjmx/zfsjmx/list",
          edit: "/zfsjmx/zfsjmx/edit",
          exportXlsUrl: "/zfsjmx/zfsjmx/exportZfsjmxXls"
        },
      }
    },
    methods: {
      //lx：走访：1：日 2：周 3：月 4：季 5：年 6：累计  有效走访：7：日 8：周 9：月 10：季 11：年 12：累计
      //type: GR：个人 ZH：支行 WG：网格
      //sxlx：1：白名单 2：授信未用信 3：授信已用信 4：不予授信 9：存量客户（授信未用信+授信已用信）
      //hzfs：1：通过农户所在支行汇总 2：通过客户经理所在支行汇总
      //sjlx: 1：汇总表 2：维度统计表
      init(record,lx,type,sxlx,hzfs,sjlx){
        console.log(record+"init")
        this.visible = true;
        this.lx = lx
        this.record = record
        this.type = type
        this.sxlx = sxlx
        this.sjlx = sjlx
        this.hzfs = hzfs
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

        if(this.type == 'GR') {
          params.yggh = this.record.yggh
        } else if (this.type == 'ZH') {
          params.zzbz = this.record.zzbz
        } else if (this.type == 'WG') {
          params.wgbh = this.record.wgbh
        }
        if (this.sxlx) {
          params.sxlx = this.sxlx
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
      nhxq(record){
        getAction('/khflgl/nhxq/list', {hhbm: record.hhbm, khmc: record.khmc}).then((res)=>{
          console.log(res)
          if(res && res.result && res.result.records && res.result.records.length > 0) {
            this.$refs.NhjbxxxXqModal.edit(res.result.records[0]);
            this.$refs.NhjbxxxXqModal.title = "详情";
            this.$refs.NhjbxxxXqModal.disableSubmit = true;
          }
        });

      },
    }
  }
</script>

<style lang="less" scoped>

</style>