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
      <a-button icon="download" type="primary" :loading="exportLoading" @click="handleExportXls()">导出</a-button>
    </div>
    <a-table ref="table"
             size="middle"
             bordered
             :columns="colunms"
             :dataSource="dataSource"
             rowKey="id"
             :pagination="ipagination"
             :loading="loading"
             :scroll="{ x : 'max-content' }"
             @change="handleTableChange"
    >
    </a-table>
  </a-modal>
</template>

<script>
import { getAction, downFile } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'


  export default {
    name: "ZcsxmxModal",
    mixins:[JeecgListMixin],
    components: {},
    data () {
      return {
        fileName:"",
        title:"",
        dataSource: [],
        lx:'',
        type:'',
        sxlx:'',
        sjlx:'',
        hzfs:'',
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
        colunms: [],
        hndkDrColumns:[
          { title: '数据日期', dataIndex: 'sjrq' },
          { title: '客户姓名', dataIndex: 'khxm' },
          { title: '客户身份证号码', dataIndex: 'khsfzhm' },
          { title: '额度', dataIndex: 'ey' },
          { title: '基点', dataIndex: 'jd' },
          { title: '授信期限(月)', dataIndex: 'sxqx' },
          { title: '客户分群', dataIndex: 'khfq' },
          { title: '客户经理工号', dataIndex: 'khljgh' },
          { title: '调查责任人一工号', dataIndex: 'dczrrgh1' },
          { title: '调查责任人一比例', dataIndex: 'dczrrbl1' },
          { title: '调查责任人二工号', dataIndex: 'dczrrgh2' },
          { title: '调查责任人二比例', dataIndex: 'dczrrbl2' },
          { title: '管理责任人工号', dataIndex: 'glzrrgh' },
          { title: '管理责任人比例', dataIndex: 'glzrrbl' },
          { title: '审查责任人工号', dataIndex: 'sczrrgh' },
          { title: '审查责任人比例', dataIndex: 'sczrrbl' },
          { title: '最终审批责任人工号', dataIndex: 'zzspzrrgh' },
          { title: '最终审批责任人比例', dataIndex: 'zzspzrrbl' },
          { title: '第一责任人工号', dataIndex: 'dyzrrgh' },
          { title: '第一责任人比例', dataIndex: 'dyzrrbl' },
          { title: '民族', dataIndex: 'mz' },
          { title: '客户类型1', dataIndex: 'khlx1' },
          { title: '客户类型2', dataIndex: 'khlx2' },
          { title: '乡镇', dataIndex: 'xz' },
          { title: '有无子女', dataIndex: 'ywzn' },
          { title: '健康状况', dataIndex: 'jkzk' },
          { title: '婚姻状况', dataIndex: 'hyzk' },
          { title: '配偶姓名', dataIndex: 'poxm' },
          { title: '配偶身份证号码', dataIndex: 'posfzhm' },
          { title: '家庭人口', dataIndex: 'jtrk' },
          { title: '劳动能力', dataIndex: 'ldnl' },
          { title: '居住年限', dataIndex: 'jznx' },
          { title: '居住状况', dataIndex: 'jzzt' },
          { title: '最高学历', dataIndex: 'zgxl' },
          { title: '常住地址', dataIndex: 'czdz' },
          { title: '通讯地址', dataIndex: 'txdz' },
          { title: '行政区划代码', dataIndex: 'xzqdm' },
          { title: '住地邮政编码', dataIndex: 'xzqbm' },
          { title: '手机号码', dataIndex: 'sjhm' },
          { title: '是否户主', dataIndex: 'sfhz' },
          { title: '是否发送短信提醒', dataIndex: 'sffsdxtx' },
          { title: '现工资单位', dataIndex: 'xgzdw' },
          { title: '现担任职务', dataIndex: 'xdrzw' },
          { title: '行业', dataIndex: 'hy' },
          { title: '经营情况是否正常', dataIndex: 'jyqksfzc' },
          { title: '产品市场需求情况', dataIndex: 'cpscxqqk' },
          { title: '借款人还款意愿', dataIndex: 'jkrhkyy' },
          { title: '职业', dataIndex: 'zy' },
          { title: '职称', dataIndex: 'zc' },
          { title: '从业年限', dataIndex: 'cxnx' },
          { title: '综合评价标志', dataIndex: 'zhpjbz' },
          { title: '个体工商户名称', dataIndex: 'gtgshmc' },
          { title: '统一社会信用代码', dataIndex: 'tyshxydm' },
          { title: '家庭年收入', dataIndex: 'jtnsr' },
          { title: '个人年收入', dataIndex: 'grnsr' },
          { title: '循环标志', dataIndex: 'xhbz' },
          { title: '信用等级', dataIndex: 'xydj' },
        ],
        qyColumns:[
          { title: '机构代码', dataIndex: 'jgdm_dictText' },
          { title: '网格编号', dataIndex: 'wgbh_dictText' },
          { title: '客户名称', dataIndex: 'khmc' },
          { title: '证件号码', dataIndex: 'zjhm' },
          { title: '贷款业务合同号', dataIndex: 'hth' },
          { title: '业务编号', dataIndex: 'businessno' },
          { title: '业务阶段', dataIndex: 'businessphase' },
          { title: '合同发放日期', dataIndex: 'htffrq' },
          { title: '合同到期日期', dataIndex: 'htdqrq' },
          { title: '合同金额', dataIndex: 'htje' },
          { title: '是否惠农快贷', dataIndex: 'sfhnkd',customRender: text =>{
              if (text){
                return text=='1'?'是':'否'
              }
              return ''
            }},
          { title: '贷款账号', dataIndex: 'dkzh' },
          { title: '贷款金额', dataIndex: 'dkje' },
          { title: '贷款余额', dataIndex: 'dkye' },
          { title: '贷款发放日期', dataIndex: 'dkffrq' },
          { title: '贷款到期日期', dataIndex: 'dkdqrq' },
          { title: '累计贷款余额', dataIndex: 'ljdkye' },
          { title: '累计天数', dataIndex: 'ljts' },
          { title: '是否有效用信', dataIndex: 'sfyxyx' },
          { title: '有效用信日期', dataIndex: 'yxyxrq' },
          { title: '累计日期', dataIndex: 'ljrq' },
        ],
        url: {
          list: "/zcsxczjdb/zcsxczjdb/getZcsxMx",
          exportXlsUrl: "/zcsxczjdb/zcsxczjdb/exportZcsxMx"
        },
        otherlx:''
      }
    },
    methods: {
      init(record,lx,type,otherlx){
        console.log(record+"init")
        this.visible = true;
        this.lx = lx
        this.type=type
        this.record = record
        this.otherlx=otherlx
        let tip=''
        if (type=='zu'){
          tip='(村组)'
        }else if (type=='cun'){
          tip='(行政村)'
        }else if(type=='pc'){
          tip='(批次)'
        }else{
          tip='(支行)'
        }
        if (lx=='1'){
          this.colunms=this.hndkDrColumns
          this.title="惠农快贷-导入详情"
          this.fileName="整村授信"+tip+"-惠农快贷导入详情表"
        }else if (lx=='2'){
          this.colunms=this.hndkDrColumns
          this.title="惠农快贷-电话回访详情"
          this.fileName="整村授信"+tip+"-惠农快贷电话回访详情表"
        } else if (lx=='3'){
          this.colunms=this.qyColumns
          this.title="惠农快贷-签约客户详情"
          this.fileName="整村授信"+tip+"-惠农快贷签约客户详情表"
        } else if (lx=='4'){
          this.colunms=this.qyColumns
          if (otherlx=='dkht_byxz'){
            this.title="新增贷款合同-本月新增客户详情"
            this.fileName="整村授信"+tip+"-本月新增贷款合同客户详情表"
          }else if (otherlx=='dkht_bzxz'){
            this.title="新增贷款合同-本周新增客户详情"
            this.fileName="整村授信"+tip+"-本周新增贷款合同客户详情表"
          }else if(otherlx=='dkht_nqkh'){
            this.title="新增贷款合同-年轻客户签约详情"
            this.fileName="整村授信"+tip+"-年轻客户签约详情表"
          } else {
            this.title="新增贷款合同-新增客户详情"
            this.fileName="整村授信"+tip+"-新增贷款合同客户详情表"
          }
        } else if (lx=='5'){
          this.colunms=this.qyColumns
          if (otherlx=='yx_byxz'){
            this.title="新增贷款合同-本月新增用信客户详情"
            this.fileName="整村授信"+tip+"-本月新增用信客户详情表"
          }else if(otherlx=='yxyx_xz'){
            this.title="新增贷款合同-新增有效用信客户详情"
            this.fileName="整村授信"+tip+"-新增有效用信客户详情表"
          }else if(otherlx=='yx_byxz'){
            this.title="新增贷款合同-本月新增有效用信客户详情"
            this.fileName="整村授信"+tip+"-本月新增有效用信客户详情表"
          } else {
            this.title="新增用信-新增用信客户详情"
            this.fileName="整村授信"+tip+"-新增用信客户详情"
          }
        }
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
        let params = {}
        params.lx = this.lx
        params.tjrq = this.record.tjrq
        params.wgbh=this.record.wgbh
        params.filename=this.fileName
        params.otherlx=this.otherlx
        params.type=this.type
        params.sszh=this.record.sszh
        params.nf=this.record.nf
        params.pc=this.record.pc
        return params
      },
      handleExportXls(){
        if(!this.fileName || typeof this.fileName != "string"){
          this.fileName = "导出文件"
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
            window.navigator.msSaveOrOpenBlob(blob, this.fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = this.fileName+'.xls';
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