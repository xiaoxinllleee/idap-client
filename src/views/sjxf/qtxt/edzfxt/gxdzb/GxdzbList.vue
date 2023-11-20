<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支付系统行号">
              <a-input placeholder="请输入支付系统行号" v-model="queryParam.orBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本行机构号">
              <a-input placeholder="请输入本行机构号" v-model="queryParam.brNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input placeholder="请输入机构名称" v-model="queryParam.brName"></a-input>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支付系统行名">
              <a-input placeholder="请输入支付系统行名" v-model="queryParam.orBrName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('行内机构对应支付系统行号关系对照表')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>


      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <gxdzb-modal ref="modalForm" @ok="modalFormOk"></gxdzb-modal>
  </a-card>
</template>

<script>
  import GxdzbModal from './modules/GxdzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GxdzbList",
    mixins:[JeecgListMixin],
    components: {
      GxdzbModal
    },
    data () {
      return {
        description: '行内机构对应支付系统行号关系对照表管理页面',
        // 表头
        columns: [
          {
            title: '',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '支付系统行号',
            align:"center",
            dataIndex: 'orBrNo'
           },
		   {
            title: '本行机构号',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '清算中心行号',
            align:"center",
            dataIndex: 'qsNo'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'brName'
           },
		   {
            title: '支付系统行名',
            align:"center",
            dataIndex: 'orBrName'
           },
		   {
            title: '清算中心名称',
            align:"center",
            dataIndex: 'qsName'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		  /* {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'dttime',
            align:"center",
            dataIndex: 'dttime'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/gxdzb/gxdzb/list",
          delete: "/gxdzb/gxdzb/delete",
          deleteBatch: "/gxdzb/gxdzb/deleteBatch",
          exportXlsUrl: "gxdzb/gxdzb/exportXls",
          importExcelUrl: "gxdzb/gxdzb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>