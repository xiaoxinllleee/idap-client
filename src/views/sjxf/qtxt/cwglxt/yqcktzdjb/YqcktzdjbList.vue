<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="约期存款编号">
              <a-input placeholder="请输入约期存款编号" v-model="queryParam.appNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="约期存款序号">
              <a-input placeholder="请输入约期存款序号" v-model="queryParam.appSeqn"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存出账务部门">
              <a-input placeholder="请输入存出账务部门" v-model="queryParam.outdcBrNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易代码">
              <a-input placeholder="请输入交易代码" v-model="queryParam.txCode"></a-input>
            </a-form-item>
          </a-col>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('约期存款台帐登记簿')">导出</a-button>
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
        :scroll="{x:3430}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yqcktzdjb-modal ref="modalForm" @ok="modalFormOk"></yqcktzdjb-modal>
  </a-card>
</template>

<script>
  import YqcktzdjbModal from './modules/YqcktzdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YqcktzdjbList",
    mixins:[JeecgListMixin],
    components: {
      YqcktzdjbModal
    },
    data () {
      return {
        description: '约期存款台帐登记簿管理页面',
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
            title: '约期存款编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '约期存款序号',
            align:"center",
            dataIndex: 'appSeqn'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'icDate'
           },
		   {
            title: '期限(天)',
            align:"center",
            dataIndex: 'term'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'mtrDate'
           },
		   {
            title: '利率(%)',
            align:"center",
            dataIndex: 'rate'
           },
		   {
            title: '约存金额(元)',
            align:"center",
            dataIndex: 'futureAmt'
           },
		   {
            title: '取款日期',
            align:"center",
            dataIndex: 'repayDate'
           },
		   {
            title: '取款金额(元)',
            align:"center",
            dataIndex: 'repayAmt'
           },
		   {
            title: '余额',
            align:"center",
            dataIndex: 'bal'
           },
		   {
            title: '利息(元)',
            align:"center",
            dataIndex: 'intstAmt'
           },
		   {
            title: '存出账务部门',
            align:"center",
            dataIndex: 'outdcBrNo'
           },
		   {
            title: '存出联社',
            align:"center",
            dataIndex: 'outupBrNo'
           },
		   {
            title: '存入账务部门',
            align:"center",
            dataIndex: 'indcBrNo'
           },
		   {
            title: '存入联社',
            align:"center",
            dataIndex: 'inupBrNo'
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
          list: "/yqcktzdjb/yqcktzdjb/list",
          delete: "/yqcktzdjb/yqcktzdjb/delete",
          deleteBatch: "/yqcktzdjb/yqcktzdjb/deleteBatch",
          exportXlsUrl: "yqcktzdjb/yqcktzdjb/exportXls",
          importExcelUrl: "yqcktzdjb/yqcktzdjb/importExcel",
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