<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="应收款审批编号">
              <a-input placeholder="请输入应收款审批编号" v-model="queryParam.appNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编码">
              <a-input placeholder="请输入业务编码" v-model="queryParam.ywNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款职工号">
              <a-input placeholder="请输入借款职工号" v-model="queryParam.budgetDep"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款人名称">
              <a-input placeholder="请输入借款人名称" v-model="queryParam.budgetDepName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="明细分类编码">
              <a-input placeholder="请输入明细分类编码" v-model="queryParam.dtlOptNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发票号码">
              <a-input placeholder="请输入发票号码" v-model="queryParam.billNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同编号">
              <a-input placeholder="请输入合同编号" v-model="queryParam.contractNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款人客户号">
              <a-input placeholder="请输入贷款人客户号" v-model="queryParam.customerNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款人名称">
              <a-input placeholder="请输入贷款人名称" v-model="queryParam.loanName"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('应收款登记簿')">导出</a-button>

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
        :scroll="{x:5430}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yskdjb-modal ref="modalForm" @ok="modalFormOk"></yskdjb-modal>
  </a-card>
</template>

<script>
  import YskdjbModal from './modules/YskdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YskdjbList",
    mixins:[JeecgListMixin],
    components: {
      YskdjbModal
    },
    data () {
      return {
        description: '应收款登记簿管理页面',
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
            title: '应收款审批编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '业务编码',
            align:"center",
            dataIndex: 'ywNo'
           },
		   {
            title: '明细分类编码',
            align:"center",
            dataIndex: 'dtlOptNo'
           },
		   {
            title: '交易笔数',
            align:"center",
            dataIndex: 'tdCnt'
           },
		   {
            title: '借款职工号',
            align:"center",
            dataIndex: 'budgetDep'
           },
		   {
            title: '借款人名称',
            align:"center",
            dataIndex: 'budgetDepName'
           },
		   {
            title: '预算项目编码',
            align:"center",
            dataIndex: 'budgetCode'
           },
		   {
            title: '预算项目编码名称',
            align:"center",
            dataIndex: 'budgetName'
           },
		   {
            title: '发票号码',
            align:"center",
            dataIndex: 'billNo'
           },
		   {
            title: '发票数量',
            align:"center",
            dataIndex: 'billNum'
           },
		   {
            title: '事项审批编号',
            align:"center",
            dataIndex: 'itemNo'
           },
		   {
            title: '事项审批序号',
            align:"center",
            dataIndex: 'appSeqn'
           },
		   {
            title: '已收回金额',
            align:"center",
            dataIndex: 'backAmt'
           },
		   {
            title: '冲账标志',
            align:"center",
            dataIndex: 'appSts'
           },
		   {
            title: '合同编号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '经办人',
            align:"center",
            dataIndex: 'agentNo'
           },
		   {
            title: '预计还款日期',
            align:"center",
            dataIndex: 'preBackDate'
           },
		   {
            title: '贷款人客户号',
            align:"center",
            dataIndex: 'customerNo'
           },
		   {
            title: '贷款人名称',
            align:"center",
            dataIndex: 'loanName'
           },
		   {
            title: '垫款类型',
            align:"center",
            dataIndex: 'loanType'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'filler'
           },
		   {
            title: '已计提坏账准备金额',
            align:"center",
            dataIndex: 'hzzbAmt'
           },
		   {
            title: '所属账务部门',
            align:"center",
            dataIndex: 'dcBrNo'
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
            title: '初始挂账金额',
            align:"center",
            dataIndex: 'oBal'
           },
		   {
            title: '产品号',
            align:"center",
            dataIndex: 'prdtNo'
           },
		   {
            title: '账号ID',
            align:"center",
            dataIndex: 'acId'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '已核销金额',
            align:"center",
            dataIndex: 'hxAmt'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
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
          list: "/yskdjb/yskdjb/list",
          delete: "/yskdjb/yskdjb/delete",
          deleteBatch: "/yskdjb/yskdjb/deleteBatch",
          exportXlsUrl: "yskdjb/yskdjb/exportXls",
          importExcelUrl: "yskdjb/yskdjb/importExcel",
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