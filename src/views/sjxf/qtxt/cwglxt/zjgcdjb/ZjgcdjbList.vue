<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="在建工程立项编号">
              <a-input placeholder="请输入在建工程立项编号" v-model="queryParam.projectAppNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="工程编号（卡片代号）">
              <a-input placeholder="请输入工程编号（卡片代号）" v-model="queryParam.projectNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="工程名称">
              <a-input placeholder="请输入工程名称" v-model="queryParam.projectName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员号">
              <a-input placeholder="请输入操作员号" v-model="queryParam.tel"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
              <a-input placeholder="请输入开户机构号" v-model="queryParam.opnBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同编号">
              <a-input placeholder="请输入合同编号" v-model="queryParam.contractNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品号">
              <a-input placeholder="请输入产品号" v-model="queryParam.prdtNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="财务流水号">
              <a-input placeholder="请输入财务流水号" v-model="queryParam.traceNo"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('在建工程登记簿')">导出</a-button>
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
        :scroll="{x:7430}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zjgcdjb-modal ref="modalForm" @ok="modalFormOk"></zjgcdjb-modal>
  </a-card>
</template>

<script>
  import ZjgcdjbModal from './modules/ZjgcdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZjgcdjbList",
    mixins:[JeecgListMixin],
    components: {
      ZjgcdjbModal
    },
    data () {
      return {
        description: '在建工程登记簿管理页面',
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
            title: '在建工程立项编号',
            align:"center",
            dataIndex: 'projectAppNo'
           },
		   {
            title: '工程编号（卡片代号）',
            align:"center",
            dataIndex: 'projectNo'
           },
		   {
            title: '工程名称',
            align:"center",
            dataIndex: 'projectName'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'openDate'
           },
		   {
            title: '工程分摊项目数',
            align:"center",
            dataIndex: 'appCnt'
           },
		   {
            title: '总成本',
            align:"center",
            dataIndex: 'totCost'
           },
		   {
            title: '总预算成本',
            align:"center",
            dataIndex: 'totBal'
           },
		   {
            title: '在建工程类型',
            align:"center",
            dataIndex: 'projectKnd'
           },
		   {
            title: '取得方式',
            align:"center",
            dataIndex: 'rootIn'
           },
		   {
            title: '其他费用',
            align:"center",
            dataIndex: 'feeAmt'
           },
		   {
            title: '分期付款次数',
            align:"center",
            dataIndex: 'payTerm'
           },
		   {
            title: '已付分期数',
            align:"center",
            dataIndex: 'useTerm'
           },
		   {
            title: '首付',
            align:"center",
            dataIndex: 'firstPay'
           },
		   {
            title: '分期付款额',
            align:"center",
            dataIndex: 'instalments'
           },
		   {
            title: '购买价的现值',
            align:"center",
            dataIndex: 'nowBal'
           },
		   {
            title: '确认的融资费用',
            align:"center",
            dataIndex: 'knowBal'
           },
		   {
            title: '未确认的融资金额',
            align:"center",
            dataIndex: 'unknowBal'
           },
		   {
            title: '应付本金减少额',
            align:"center",
            dataIndex: 'payBal'
           },
		   {
            title: '应付本金余额',
            align:"center",
            dataIndex: 'unPayBal'
           },
		   {
            title: '折现率',
            align:"center",
            dataIndex: 'leaveRate'
           },
		   {
            title: '实际利率(%)',
            align:"center",
            dataIndex: 'actRate'
           },
		   {
            title: '上次减值额',
            align:"center",
            dataIndex: 'evedepamt'
           },
		   {
            title: '上次交易日',
            align:"center",
            dataIndex: 'lstDate'
           },
		   {
            title: '今日交易笔数',
            align:"center",
            dataIndex: 'tdCnt'
           },
		   {
            title: '减值金额',
            align:"center",
            dataIndex: 'devalue'
           },
		   {
            title: '分期周期',
            align:"center",
            dataIndex: 'projectCyc'
           },
		   {
            title: '操作员号',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '开户机构号',
            align:"center",
            dataIndex: 'opnBrNo'
           },
		   {
            title: '工程状态',
            align:"center",
            dataIndex: 'projectSts'
           },
		   {
            title: '地点',
            align:"center",
            dataIndex: 'addr'
           },
		   {
            title: '盘盈盘亏金额',
            align:"center",
            dataIndex: 'profitLostBal'
           },
		   {
            title: '分期付款方法',
            align:"center",
            dataIndex: 'instalmentsType'
           },
		   {
            title: '完工日期',
            align:"center",
            dataIndex: 'finishDay'
           },
		   {
            title: '合同笔数',
            align:"center",
            dataIndex: 'loanCnt'
           },
		   {
            title: '启用日期',
            align:"center",
            dataIndex: 'useDate'
           },
		   {
            title: '摘要',
            align:"center",
            dataIndex: 'brf'
           },
		   {
            title: '增加批准文号',
            align:"center",
            dataIndex: 'addAuthNo'
           },
		   {
            title: '减少批准文号',
            align:"center",
            dataIndex: 'redAuthNo'
           },
		   {
            title: '注销日期',
            align:"center",
            dataIndex: 'redDate'
           },
		   {
            title: '合同编号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '资产类型',
            align:"center",
            dataIndex: 'capCode'
           },
		   {
            title: '所属事项编号',
            align:"center",
            dataIndex: 'projectCfmNo'
           },
		   {
            title: '工程总预算（暂未使用）',
            align:"center",
            dataIndex: 'projectBudg'
           },
		   {
            title: '资金来源',
            align:"center",
            dataIndex: 'fundSrc'
           },
		   {
            title: '在建工程状况',
            align:"center",
            dataIndex: 'projectCond'
           },
		   {
            title: '在建工程账户',
            align:"center",
            dataIndex: 'proAcNo'
           },
		   {
            title: '记账标志',
            align:"center",
            dataIndex: 'jzFlag'
           },
		   {
            title: '事后确认子序号',
            align:"center",
            dataIndex: 'projectCfmSeqn'
           },
		   {
            title: '产品号',
            align:"center",
            dataIndex: 'prdtNo'
           },
		   {
            title: '原资产编号',
            align:"center",
            dataIndex: 'oCapNo'
           },
		   {
            title: '股东号',
            align:"center",
            dataIndex: 'shareholderNo'
           },
		   {
            title: '入股股数',
            align:"center",
            dataIndex: 'shareSize'
           },
		   {
            title: '每股票面价格',
            align:"center",
            dataIndex: 'sharePrice'
           },
		   {
            title: '资本溢价金额',
            align:"center",
            dataIndex: 'premiumBal'
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
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '初始取得资产编号',
            align:"center",
            dataIndex: 'srcCapNo'
           },
		   {
            title: '初始取得资产来源',
            align:"center",
            dataIndex: 'oRootIn'
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
            title: '附件编号',
            align:"center",
            dataIndex: 'annexNo'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
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
		 /*  {
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
          list: "/zjgcdjb/zjgcdjb/list",
          delete: "/zjgcdjb/zjgcdjb/delete",
          deleteBatch: "/zjgcdjb/zjgcdjb/deleteBatch",
          exportXlsUrl: "zjgcdjb/zjgcdjb/exportXls",
          importExcelUrl: "zjgcdjb/zjgcdjb/importExcel",
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