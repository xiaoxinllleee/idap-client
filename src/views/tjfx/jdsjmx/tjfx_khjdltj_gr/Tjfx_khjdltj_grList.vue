<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="建档日期">
            <!--  <a-date-picker v-model="queryParam.jdrq"
                              placeholder="请选择开始日期"
                              style="width: 230px;"/>-->
              <a-date-picker placeholder="请选择建档日期" v-model="queryParam.jdrq" style="width: 100%;"/>
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
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="责任人">
              <j-input placeholder="请输入责任人" v-model="queryParam.zkhjl" type="likemore"></j-input>
            </a-form-item>
          </a-col>
          </template>
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
      <a-button type="primary" icon="download" @click="handleExportXls('个人建档数据统计')">导出</a-button>
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
  import { filterObj } from '@/utils/util';
  import JInput from '@/components/jeecg/JInput'
  export default {
    name: "Tjfx_khjdltj_grList",
    mixins:[JeecgListMixin],
    components: {
     JTreeSelect,JInput
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
		   {
            title: '建档日期',
            align:"center",
            dataIndex: 'jdrq',
         customRender:function (text) {
           return !text ? "" : (text.length>10 ? text.substr(0,10) : text)
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
            dataIndex: 'xzc'
           },
		   {
            title: '组',
            align:"center",
            dataIndex: 'xzz_dictText'
           },
		   {
            title: '责任人',
            align:"center",
            dataIndex: 'zkhjl_dictText'
           },
		   {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '是否户主',
            align:"center",
            dataIndex: 'sfhz_dictText'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },
		   {
            title: '建档完整度',
            align:"center",
            dataIndex: 'jdwzd'
           },
        ],
		url: {
          list: "/tjfx_khjdltj_gr/tjfx_khjdltj_gr/list",
          delete: "/tjfx_khjdltj_gr/tjfx_khjdltj_gr/delete",
          deleteBatch: "/tjfx_khjdltj_gr/tjfx_khjdltj_gr/deleteBatch",
          exportXlsUrl: "tjfx_khjdltj_gr/tjfx_khjdltj_gr/exportXls",
          importExcelUrl: "tjfx_khjdltj_gr/tjfx_khjdltj_gr/importExcel",
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
        let ksrqvalue=this.$route.query.jdrq;
       let bgeinDayValue  = this.$route.query.beginDay;
       let endDayValue    = this.$route.query.endDay;
       let xzcValue1       = this.$route.query.xzc;
       let xzz    = this.$route.query.xzz;
       let hhbm     = this.$route.query.hhbm;
        if(this.queryParam.jdrq) {
         ksrqment = this.queryParam.jdrq.format("YYYY-MM-DD");
        }
        if(ksrqvalue){
          ksrqment=ksrqvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.jdrq     = ksrqment;
        if(sszhvalue){
          param.sszh = sszhvalue;
        }
       if (bgeinDayValue&&endDayValue) {
         param.tjrq_begin = bgeinDayValue;
         param.tjrq_end   = endDayValue;
       }
       if(xzcValue1){
         param.xzc = xzcValue1;
       }
       if(xzz){
         param.xzz = xzz;
       }
       if(hhbm){
         param.hhbm = hhbm;
       }

        return filterObj(param);
      },
      searchReset() {
        this.flag = false;
        this.$route.query.sszh=null;
        this.$route.query.jdrq=null;
        this.$route.query.xzc=null;
        this.$route.query.xzz=null;
        this.$route.query.hhbm=null;
        this.$route.query.beginDay = null;
        this.$route.query.endDay   = null;
        this.queryParam = {};
        this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>