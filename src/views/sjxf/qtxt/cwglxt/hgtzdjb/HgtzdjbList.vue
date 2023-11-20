<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="回购成交单编号">
              <a-input placeholder="请输入回购成交单编号" v-model="queryParam.pactNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易代码">
              <a-input placeholder="请输入交易代码" v-model="queryParam.txCode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="财务流水号">
              <a-input placeholder="请输入财务流水号" v-model="queryParam.traceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易部门">
              <a-input placeholder="请输入交易部门" v-model="queryParam.txPartNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易操作员">
              <a-input placeholder="请输入交易操作员" v-model="queryParam.tlrno"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('回购台账登记簿')">导出</a-button>

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
        :scroll="{x:3450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hgtzdjb-modal ref="modalForm" @ok="modalFormOk"></hgtzdjb-modal>
  </a-card>
</template>

<script>
  import HgtzdjbModal from './modules/HgtzdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "HgtzdjbList",
    mixins:[JeecgListMixin],
    components: {
      HgtzdjbModal
    },
    data () {
      return {
        description: '回购台账登记簿管理页面',
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
            title: '回购成交单编号',
            align:"center",
            dataIndex: 'pactNo'
           },
		   {
            title: '成交日期',
            align:"center",
            dataIndex: 'closingDate'
           },
		   {
            title: '交易对手',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tradeType'
           },
		   {
            title: '成交金额(元)',
            align:"center",
            dataIndex: 'industryAmt'
           },
		   {
            title: '利率(%)',
            align:"center",
            dataIndex: 'rate'
           },
		   {
            title: '期限(天)',
            align:"center",
            dataIndex: 'term'
           },
		   {
            title: '首次交割日',
            align:"center",
            dataIndex: 'icDate'
           },
		   {
            title: '到期交割日',
            align:"center",
            dataIndex: 'mtrDate'
           },
		   {
            title: '利息(元)',
            align:"center",
            dataIndex: 'intstAmt'
           },
		   {
            title: '所属账务部门',
            align:"center",
            dataIndex: 'dcBrNo'
           },
		   {
            title: '所属联社',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '交易代码',
            align:"center",
            dataIndex: 'txCode'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '财务流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '交易部门',
            align:"center",
            dataIndex: 'txPartNo'
           },
		   {
            title: '交易操作员',
            align:"center",
            dataIndex: 'tlrno'
           },
		   {
            title: '操作员流水号',
            align:"center",
            dataIndex: 'ejfNo'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '明细笔次',
            align:"center",
            dataIndex: 'txCnt'
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
          list: "/hgtzdjb/hgtzdjb/list",
          delete: "/hgtzdjb/hgtzdjb/delete",
          deleteBatch: "/hgtzdjb/hgtzdjb/deleteBatch",
          exportXlsUrl: "hgtzdjb/hgtzdjb/exportXls",
          importExcelUrl: "hgtzdjb/hgtzdjb/importExcel",
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