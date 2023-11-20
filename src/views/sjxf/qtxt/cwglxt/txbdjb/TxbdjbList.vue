<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="审批编号">
              <a-input placeholder="请输入审批编号" v-model="queryParam.appNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贴现合同号">
              <a-input placeholder="请输入贴现合同号" v-model="queryParam.contractNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易类型">
              <a-input placeholder="请输入交易类型" v-model="queryParam.tradeType"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人联社号">
              <a-input placeholder="请输入法人联社号" v-model="queryParam.upBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="五级分类结果">
              <a-input placeholder="请输入五级分类结果" v-model="queryParam.lvlFive"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贴现包登记簿--贴现合同与贴现协议关联表')">导出</a-button>
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
        :scroll="{x:8450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <txbdjb-modal ref="modalForm" @ok="modalFormOk"></txbdjb-modal>
  </a-card>
</template>

<script>
  import TxbdjbModal from './modules/TxbdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "TxbdjbList",
    mixins:[JeecgListMixin],
    components: {
      TxbdjbModal
    },
    data () {
      return {
        description: '贴现包登记簿--贴现合同与贴现协议关联表管理页面',
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
            title: '贴现合同号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '交易明细笔次',
            align:"center",
            dataIndex: 'txCnt'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tradeType'
           },
		   {
            title: '交易操作类型',
            align:"center",
            dataIndex: 'discountType'
           },
		   {
            title: '贴现签收日期(贴现日)',
            align:"center",
            dataIndex: 'discountDate'
           },
		   {
            title: '票据面值总额(元)',
            align:"center",
            dataIndex: 'totalParAmt'
           },
		   {
            title: '未摊销利息调整总额(元)',
            align:"center",
            dataIndex: 'adjustAmt'
           },
		   {
            title: '贴现结算总金额(元)',
            align:"center",
            dataIndex: 'totalPayAmt'
           },
		   {
            title: '减值准备总额(元)',
            align:"center",
            dataIndex: 'totalInpairAmt'
           },
		   {
            title: '减值损失总额(元)',
            align:"center",
            dataIndex: 'totalLossAmt'
           },
		   {
            title: '已确认利息支出金额(元)',
            align:"center",
            dataIndex: 'ytotalAdjustAmt'
           },
		   {
            title: '线上清算标记',
            align:"center",
            dataIndex: 'isOnline'
           },
		   {
            title: '利息调整标志',
            align:"center",
            dataIndex: 'adjustFlag'
           },
		   {
            title: '利息调整摊销方法',
            align:"center",
            dataIndex: 'adjustMethod'
           },
		   {
            title: '回购约定日期',
            align:"center",
            dataIndex: 'backDate'
           },
		   {
            title: '组织机构代码证',
            align:"center",
            dataIndex: 'ogzCode'
           },
		   {
            title: '资金账号',
            align:"center",
            dataIndex: 'bankAcno'
           },
		   {
            title: '开户行行号',
            align:"center",
            dataIndex: 'bankNo'
           },
		   {
            title: '审批编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '贴现合同状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '登记操作员',
            align:"center",
            dataIndex: 'regTel'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'regDate'
           },
		   {
            title: '账务机构',
            align:"center",
            dataIndex: 'brNo'
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
            title: '利率来源方式',
            align:"center",
            dataIndex: 'rateSource'
           },
		   {
            title: '产品1',
            align:"center",
            dataIndex: 'prdtNo1'
           },
		   {
            title: '产品2',
            align:"center",
            dataIndex: 'prdtNo2'
           },
		   {
            title: '产品3',
            align:"center",
            dataIndex: 'prdtNo3'
           },
		   {
            title: '产品4',
            align:"center",
            dataIndex: 'prdtNo4'
           },
		   {
            title: '产品5',
            align:"center",
            dataIndex: 'prdtNo5'
           },
		   {
            title: '利率类型',
            align:"center",
            dataIndex: 'rateType'
           },
		   {
            title: '到期申请审批编号',
            align:"center",
            dataIndex: 'dappNo'
           },
		   {
            title: '日利率计算方式',
            align:"center",
            dataIndex: 'dateRateNum'
           },
		   {
            title: '处理模式',
            align:"center",
            dataIndex: 'doModel'
           },
		   {
            title: '交易对手编号',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '交易对方名称',
            align:"center",
            dataIndex: 'discountName'
           },
		   {
            title: '资金开户行行名',
            align:"center",
            dataIndex: 'bankName'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: 'VERSION',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: 'SUB_CTPY_NO',
            align:"center",
            dataIndex: 'subCtpyNo'
           },
		   {
            title: 'SUB_VERSION',
            align:"center",
            dataIndex: 'subVersion'
           },
		   {
            title: 'CTPY_DEP_NO',
            align:"center",
            dataIndex: 'ctpyDepNo'
           },
		   {
            title: 'BCTPY_DEP_NO',
            align:"center",
            dataIndex: 'bctpyDepNo'
           },
		   {
            title: 'BVERSION',
            align:"center",
            dataIndex: 'bversion'
           },
		   {
            title: 'BSUB_CTPY_NO',
            align:"center",
            dataIndex: 'bsubCtpyNo'
           },
		   {
            title: 'BCTPY_NO',
            align:"center",
            dataIndex: 'bctpyNo'
           },
		   {
            title: 'BSUB_VERSION',
            align:"center",
            dataIndex: 'bsubVersion'
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
            title: '原系统标识',
            align:"center",
            dataIndex: 'sourceId'
           },
		   {
            title: '加载类型',
            align:"center",
            dataIndex: 'loadType'
           },
		   {
            title: 'LEGAL_NO',
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
          list: "/txbdjb/txbdjb/list",
          delete: "/txbdjb/txbdjb/delete",
          deleteBatch: "/txbdjb/txbdjb/deleteBatch",
          exportXlsUrl: "txbdjb/txbdjb/exportXls",
          importExcelUrl: "txbdjb/txbdjb/importExcel",
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