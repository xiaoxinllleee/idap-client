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
            <a-form-item label="交易类型">
              <a-input placeholder="请输入交易类型" v-model="queryParam.tradeType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="质押物类型">
              <a-input placeholder="请输入质押物类型" v-model="queryParam.pledgeType"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="申请编号">
              <a-input placeholder="请输入申请编号" v-model="queryParam.appNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易金额(元)">
              <a-input placeholder="请输入交易金额" v-model="queryParam.firstAmt"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('回购成交登记簿')">导出</a-button>
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
        :scroll="{x:6450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hgcjdjb-modal ref="modalForm" @ok="modalFormOk"></hgcjdjb-modal>
  </a-card>
</template>

<script>
  import HgcjdjbModal from './modules/HgcjdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "HgcjdjbList",
    mixins:[JeecgListMixin],
    components: {
      HgcjdjbModal
    },
    data () {
      return {
        description: '回购成交登记簿管理页面',
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
            title: '质押物类型',
            align:"center",
            dataIndex: 'pledgeType'
           },
		   {
            title: '交易明细笔次',
            align:"center",
            dataIndex: 'txCnt'
           },
		   {
            title: '质押物笔数',
            align:"center",
            dataIndex: 'pledgeCnt'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tradeType'
           },
		   {
            title: '内部帐AC_NO',
            align:"center",
            dataIndex: 'acNo'
           },
		   {
            title: '内部账AC_ID',
            align:"center",
            dataIndex: 'acId'
           },
		   {
            title: '回购利率(%)',
            align:"center",
            dataIndex: 'repRate'
           },
		   {
            title: '质押物面额合计(万元)',
            align:"center",
            dataIndex: 'pledgeBal'
           },
		   {
            title: '交易金额(元)',
            align:"center",
            dataIndex: 'firstAmt'
           },
		   {
            title: '应计利息(元)',
            align:"center",
            dataIndex: 'isIntst'
           },
		   {
            title: '日利率计算方式',
            align:"center",
            dataIndex: 'dateRateNum'
           },
		   {
            title: '使用部门',
            align:"center",
            dataIndex: 'intstAmt'
           },
		   {
            title: '到期结算金额(元)',
            align:"center",
            dataIndex: 'mtrAmt'
           },
		   {
            title: '首次结算方式',
            align:"center",
            dataIndex: 'firstSetrType'
           },
		   {
            title: '到期结算方式',
            align:"center",
            dataIndex: 'mtrSetrType'
           },
		   {
            title: '成交日期',
            align:"center",
            dataIndex: 'signDate'
           },
		   {
            title: '首次结算日',
            align:"center",
            dataIndex: 'firstDate'
           },
		   {
            title: '到期结算日',
            align:"center",
            dataIndex: 'mrtDate'
           },
		   {
            title: '回购期限(天)',
            align:"center",
            dataIndex: 'dCnt'
           },
		   {
            title: '实际占款天数',
            align:"center",
            dataIndex: 'realDays'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'regDate'
           },
		   {
            title: '上次计提日期',
            align:"center",
            dataIndex: 'lJtDate'
           },
		   {
            title: '交易品种',
            align:"center",
            dataIndex: 'tradeNo'
           },
		   {
            title: '交易对手编号',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '交易对手版本号',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: '申请编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '回购所属账务机构',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '使用部门',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '使用人',
            align:"center",
            dataIndex: 'suppNo'
           },
		   {
            title: '回购状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '累计计提利息金额(元)',
            align:"center",
            dataIndex: 'ljJtIntst'
           },
		   {
            title: '实际收取利息金额(元)',
            align:"center",
            dataIndex: 'ljSqIntst'
           },
		   {
            title: '主产品号',
            align:"center",
            dataIndex: 'prdtNo'
           },
		   {
            title: '对方交易员',
            align:"center",
            dataIndex: 'ctpyTrader'
           },
		   {
            title: '本方交易员',
            align:"center",
            dataIndex: 'trader'
           },
		   {
            title: '业务类型号',
            align:"center",
            dataIndex: 'ywNo'
           },
		   {
            title: '计划编号',
            align:"center",
            dataIndex: 'planNo'
           },
		   {
            title: '计划日期',
            align:"center",
            dataIndex: 'chnlInd'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '摘要',
            align:"center",
            dataIndex: 'brf'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: 'bctpyNo',
            align:"center",
            dataIndex: 'bctpyNo'
           },
		   {
            title: 'bversion',
            align:"center",
            dataIndex: 'bversion'
           },
		   {
            title: 'sDate',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: 'eDate',
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
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/hgcjdjb/hgcjdjb/list",
          delete: "/hgcjdjb/hgcjdjb/delete",
          deleteBatch: "/hgcjdjb/hgcjdjb/deleteBatch",
          exportXlsUrl: "hgcjdjb/hgcjdjb/exportXls",
          importExcelUrl: "hgcjdjb/hgcjdjb/importExcel",
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