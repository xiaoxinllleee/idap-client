<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员">
              <a-input placeholder="请输入操作员" v-model="queryParam.tel"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="财务流水号">
              <a-input placeholder="请输入财务流水号" v-model="queryParam.traceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账务部门">
              <a-input placeholder="请输入账务部门" v-model="queryParam.cashBal"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('柜员现金余额薄')">导出</a-button>
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
    <gyxjyeb-modal ref="modalForm" @ok="modalFormOk"></gyxjyeb-modal>
  </a-card>
</template>

<script>
  import GyxjyebModal from './modules/GyxjyebModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GyxjyebList",
    mixins:[JeecgListMixin],
    components: {
      GyxjyebModal
    },
    data () {
      return {
        description: '柜员现金余额薄管理页面',
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
            title: '操作员',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '财务现金额',
            align:"center",
            dataIndex: 'cashBal'
           },
		   {
            title: '财务现金限额',
            align:"center",
            dataIndex: 'limitBal'
           },
		   {
            title: '操作员所属部门',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '财务流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '所属联社',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '控制级别',
            align:"center",
            dataIndex: 'controllvl'
           },
		   {
            title: '是否财务现金操作员',
            align:"center",
            dataIndex: 'isCashtel'
           },
		   {
            title: '账务部门',
            align:"center",
            dataIndex: 'dcBrNo'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
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
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   /*{
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
          list: "/gyxjyeb/gyxjyeb/list",
          delete: "/gyxjyeb/gyxjyeb/delete",
          deleteBatch: "/gyxjyeb/gyxjyeb/deleteBatch",
          exportXlsUrl: "gyxjyeb/gyxjyeb/exportXls",
          importExcelUrl: "gyxjyeb/gyxjyeb/importExcel",
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