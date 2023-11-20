<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjrq"
                              :defaultValue="defaultMonthOpera"
                              :format="this.monthFormat"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="download" @click="handleExportXls('客户经理回访考勤统计')">导出</a-button>
<!--
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
-->
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

       <span slot="sszh" slot-scope="sszh, record">
          <a @click="handle1SszhEdit(record, '/tjfx/tjbb/wdkq/hfkqbb/khjlhfkqbb/Tjfx_tjbb_khjlhfkqtjList')">{{sszh}}</a>
        </span>

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

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfx_tjbb_khjlhfkqtj-modal ref="modalForm" @ok="modalFormOk"></tjfx_tjbb_khjlhfkqtj-modal>
  </a-card>
</template>

<script>
  import Tjfx_tjbb_khjlhfkqtjModal from './modules/Tjfx_tjbb_khjlhfkqtjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'
  export default {
    name: "Tjfx_tjbb_khjlhfkqtjList",
    mixins:[JeecgListMixin],
    defaultMonthOpera: undefined,

    flag: true,
    isorter: {
      columns: 'tjyf',
      order: 'desc',
    },
    components: {
      Tjfx_tjbb_khjlhfkqtjModal,JTreeSelect
    },
    data () {
      return {
        monthFormat: 'YYYY-MM',
        description: '1管理页面',
        // 表头
        columns: [

		   {
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq',
         customRender:function (text) {
           return !text?"":(text.length>8?text.substr(0,7):text)
         },
         sorter: true,
           },
		   {
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz_dictText',
         scopedSlots:{customRender:'sszh'}
           },
		   {
            title: '回访次数',
            align:"center",
            dataIndex: 'hfcs'
           },
		   {
            title: '有效回访次数',
            align:"center",
            dataIndex: 'yxhfcs'
           },
		   {
            title: '有效出勤天数',
            align:"center",
            dataIndex: 'yxhfts'
           },
		   {
            title: '当年有效出勤天数',
            align:"center",
            dataIndex: 'dnyxhfts'
           },

        ],
		url: {
          list: "/tjfx_tjbb_zhhfkqtj/tjfx_tjbb_zhhfkqtj/list",
          delete: "/tjfx_tjbb_zhhfkqtj/tjfx_tjbb_zhhfkqtj/delete",
          deleteBatch: "/tjfx_tjbb_zhhfkqtj/tjfx_tjbb_zhhfkqtj/deleteBatch",
          exportXlsUrl: "tjfx_tjbb_zhhfkqtj/tjfx_tjbb_zhhfkqtj/exportXls",
          importExcelUrl: "tjfx_tjbb_zhhfkqtj/tjfx_tjbb_zhhfkqtj/importExcel",
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
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
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
        if ((params.tjrq=='undefined' || params.tjrq==null) && this.flag==true) {
          params.tjrq = this.defaultMonthOpera.format("YYYY-MM")+'-01';
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
        if( params.tjrq==null){
          this.$message.error("开始日期或者接受日期不能为空!")
          return
        }
        let ksrqstr=params.tjrq.format("YYYYMM")+'01'
        this.loading = true;
        putAction("/tjfx_tjbb_zhhfkqtj/tjfx_tjbb_zhhfkqtj/extract", 'TJYF='+ksrqstr,'put').then((res) => {
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
        let tjrqment = "";
        let tjyfvalue=this.$route.query.tjrq;
        if(this.queryParam.tjrq) {
          tjrqment = this.queryParam.tjrq.format("YYYY-MM")+'-01';
        }
        if(tjyfvalue){
          tjrqment=tjyfvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq   = tjrqment;
        }
        this.$route.query.tjrq=null;
        return filterObj(param);
      },
      handle1SszhEdit: function(record,path) {
        this.$router.push({path: path, query: {zzbz: record.zzbz,tjrq: record.tjrq}})
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>