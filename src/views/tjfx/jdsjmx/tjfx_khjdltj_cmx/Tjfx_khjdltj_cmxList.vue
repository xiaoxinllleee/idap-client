<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf"
                              placeholder="请选择统计月份"
                              style="width: 100%;" :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行查询"
                             pid-field="sjzzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.sszh"
                             :sszh="true"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="行政村">
              <j-input placeholder="请输入行政村" v-model="queryParam.xzc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8">
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
      <a-button type="primary" icon="download" @click="handleExportXls('行政村建档数据明细')">导出</a-button>

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
<span slot="xzc" slot-scope="xzc ,record" >
          <a @click="handlesszhEdit(record,'/tjfx/jdsjmx/tjfx_khjdltj_z/Tjfx_khjdltj_zList')">{{xzc}}</a>
        </span>
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

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import JInput from '@/components/jeecg/JInput'
  import moment from 'moment'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  export default {
    name: "Tjfx_khjdltj_cmxList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,JInput
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          column: 'tjyf',
          order: 'desc',
        },
        columns: [
		   {
            title: '统计日期',
            align:"center",
            dataIndex: 'tjyf',
         customRender:function (text) {
           return !text ? "" : (text.length>7 ? text.substr(0,7) : text)
         },
         sorter: true,
           },
		   {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '行政村',
            align:"center",
            dataIndex: 'xzc',
         scopedSlots:{customRender:'xzc'}
           },
		   {
            title: '建档人数',
            align:"center",
            dataIndex: 'jdrs'
           },
		   {
            title: '整村人数',
            align:"center",
            dataIndex: 'zcrs'
           },
		   {
            title: '建档覆盖率',
            align:"center",
            dataIndex: 'jdfgl'
           },
        ],
		url: {
          list: "/tjfx_khjdltj_cmx/tjfx_khjdltj_cmx/list",
          delete: "/tjfx_khjdltj_cmx/tjfx_khjdltj_cmx/delete",
          deleteBatch: "/tjfx_khjdltj_cmx/tjfx_khjdltj_cmx/deleteBatch",
          exportXlsUrl: "tjfx_khjdltj_cmx/tjfx_khjdltj_cmx/exportXls",
          importExcelUrl: "tjfx_khjdltj_cmx/tjfx_khjdltj_cmx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams(){
        let ksrqment = "";
        let sszhvalue=this.$route.query.sszh;
        let ksrqvalue=this.$route.query.tjyf;
        console.log(sszhvalue)
        if(this.queryParam.tjyf) {
          ksrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        if(ksrqvalue){
          ksrqment=ksrqvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf     = ksrqment;
        if(sszhvalue){
          param.sszh = sszhvalue;
        }

        return filterObj(param);
      },
      handlesszhEdit: function(record,path) {
        console.log(path);
        console.log(record.sszh);
        this.$router.push({path: path, query: {sszh: record.sszh,tjyf:record.tjyf,xzc:record.xzc}})
      },
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.$route.query.sszh=null;
        this.$route.query.tjyf=null;
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
        if ((params.tjyf=='undefined' || params.tjyf==null) && this.flag==true) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>