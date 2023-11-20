<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq"
                              placeholder="请选择开始日期"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq"
                              placeholder="请选择结束日期"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('全行行动挂图作业表1')">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 4000 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <span slot="action" slot-scope="text,record">
          <a href="javascript:;" @click="handlesszhEdit(record,'/tjfx/xdgtzyb1/zhxdgt/ZhxdgtList')">详情</a>
        </span>
        <span slot="xzc" slot-scope="xzc ,record" >
          <a @click="handlesszhEdit(record,'/tjfx/xdgtzyb/xdgtzyb2/xczxdgtzy2/Xzcxdgtzy2List')">{{xzc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <qhxdgt-modal ref="modalForm" @ok="modalFormOk"></qhxdgt-modal>
  </a-card>
</template>

<script>
  import QhxdgtModal from './modules/QhxdgtModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import { getAction,putAction,httpAction } from '@/api/manage'
  import moment from 'moment'
  export default {
    name: "QhxdgtList",
    mixins:[JeecgListMixin],
    defaultMonthOperaKSRQ: undefined,
    defaultMonthOperaJSRQ: undefined,
    monthFormat: 'YYYY-MM-DD',
    flag: true,
    isorter: {
      columns: 'tjyf',
      order: 'desc',
    },
    components: {
      QhxdgtModal,JTreeSelect
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
          {
            title: '开始日期',
            align:"center",
            dataIndex: 'ksrq',
            sorter: true,
          },
          {
            title: '结束日期',
            align:"center",
            dataIndex: 'jsrq',
            sorter:true,
          },
          {
            title: '行政村个数',
            align:"center",
            dataIndex: 'xzcgs'
          },
          {
            title: '村民（居民）小组个数',
            align:"center",
            dataIndex: 'cmxzgs'
          },
          {
            title: '辖内农户（居民）户数',
            align:"center",
            dataIndex: 'xnnhhs'
          },
          {
            title: '辖内商户户数',
            align:"center",
            dataIndex: 'xnshhs'
          },
          {
            title: '辖内企业户数',
            align:"center",
            dataIndex: 'xnqyhs'
          },
          {
            title: '本周农户（居民）户数',
            align:"center",
            dataIndex: 'bznhhs'
          },
          {
            title: '累计农户（居民）户数',
            align:"center",
            dataIndex: 'ljnhhs'
          },
          {
            title: '本周商户户数',
            align:"center",
            dataIndex: 'bzshhs'
          },
          {
            title: '累计商户户数',
            align:"center",
            dataIndex: 'ljshhs'
          },
          {
            title: '本周企业户数',
            align:"center",
            dataIndex: 'bzqyhs'
          },
          {
            title: '累计企业户数',
            align:"center",
            dataIndex: 'ljqyhs'
          },
          {
            title: '本周合计户数',
            align:"center",
            dataIndex: 'bzhjhs'
          },
          {
            title: '累计合计户数',
            align:"center",
            dataIndex: 'ljhjhs'
          },
          {
            title: '本周采集信息',
            align:"center",
            dataIndex: 'bzcjxx'
          },
          {
            title: '累计采集信息',
            align:"center",
            dataIndex: 'ljcjxx'
          },
          {
            title: '本周评级户数',
            align:"center",
            dataIndex: 'bzpjhs'
          },
          {
            title: '累计评级户数',
            align:"center",
            dataIndex: 'ljpjhs'
          },
          {
            title: '本周授信金额',
            align:"center",
            dataIndex: 'bzsxje'
          },
          {
            title: '累计授信金额',
            align:"center",
            dataIndex: 'ljsxje'
          },
          {
            title: '本周用信金额',
            align:"center",
            dataIndex: 'bzyxje'
          },
          {
            title: '累计用信金额',
            align:"center",
            dataIndex: 'ljyxje'
          },
          {
            title: '本周整组评级授信完成个数',
            align:"center",
            dataIndex: 'bzzzpjsxwcgs'
          },
          {
            title: '累计整组评级授信完成个数',
            align:"center",
            dataIndex: 'ljzzpjsxwcgs'
          },
          {
            title: '本周整村评级授信完成个数',
            align:"center",
            dataIndex: 'bzzcpjsxwcgs'
          },
          {
            title: '累计整村评级授信完成个数',
            align:"center",
            dataIndex: 'ljzcpjsxwcgs'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 100
          }
        ],
        url: {
          list: "/qhxdgt/qhxdgt/list",
          delete: "/qhxdgt/qhxdgt/delete",
          deleteBatch: "/qhxdgt/qhxdgt/deleteBatch",
          exportXlsUrl: "qhxdgt/qhxdgt/exportXls",
          importExcelUrl: "qhxdgt/qhxdgt/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      getCurrentMonth() {
        let date = new Date();
        date.setDate(1);
        let month = parseInt(date.getMonth()+1);
        let day = date.getDate();
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        let jdate=new Date();
        let currentMonth=jdate.getMonth();
        let nextMonth=++currentMonth;
        let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
        let oneDay=1000*60*60*24;
        let lastTime = new Date(nextMonthFirstDay-oneDay);
        let jmonth = parseInt(lastTime.getMonth()+1);
        let jday = lastTime.getDate();
        if (jmonth < 10) {
          jmonth = '0' + jmonth
        }
        if (jday < 10) {
          jday = '0' + jday
        }

        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1,kday: day,jday:jday}
        this.defaultMonthOperaKSRQ = moment(curMonth.year+'-'+curMonth.month+'-'+curMonth.kday, this.monthFormat);
        this.defaultMonthOperaJSRQ = moment(curMonth.year+'-'+curMonth.month+'-'+curMonth.jday, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.ksrq=='undefined' || params.ksrq==null) && this.flag==true) {
          if((params.jsrq=='undefined' || params.jsrq==null) && this.flag==true){
            params.ksrq = this.defaultMonthOperaKSRQ.format("YYYY-MM")+'-01';
            params.jsrq = this.defaultMonthOperaJSRQ.format("YYYY-MM")+'-01';
          }
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      initData() {
        var params = this.queryParam;
        if( params.ksrq==null || params.ksrq=='undefined'){
          this.$message.error("请选择开始日期!")
          return
        }
        if( params.jsrq==null || params.jsrq=='undefined'){
          this.$message.error("请选择结束日期!")
          return
        }
        let ksrqstr=params.ksrq.format("YYYYMMDD");
        let jsrqstr=params.jsrq.format("YYYYMMDD");
        this.loading = true;
        putAction("/qhxdgt/qhxdgt/extract", {"ksrq":ksrqstr,"jsrq":jsrqstr},'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        let ksrqment = "";
        let jsrqment = "";
        let sszhvalue = this.$route.query.sszh;
        let ksrqvalue = this.$route.query.ksrq;
        let jsrqvalue = this.$route.query.jsrq;
        console.log(sszhvalue)
        if(this.queryParam.ksrq) {
          ksrqment = this.queryParam.ksrq.format("YYYY-MM-DD");
        }
        if(this.queryParam.jsrq) {
          jsrqment = this.queryParam.jsrq.format("YYYY-MM-DD");
        }
        if(ksrqvalue) {
          ksrqment=ksrqvalue;
        }
        if(jsrqvalue) {
          jsrqment=jsrqvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.ksrq     = ksrqment;
        param.jsrq     = jsrqment;
        if(sszhvalue){
          param.sszh = sszhvalue;
        }
        this.$route.query.sszh=null;
        this.$route.query.tjyf=null;
        return filterObj(param);
      },
      handlesszhEdit: function(record,path) {
        console.log(path);
        console.log(record.sszh);
        this.$router.push({path: path, query: {sszh: record.sszh,ksrq:record.ksrq,jsrq:record.jsrq}})
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>