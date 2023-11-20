<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报文编号">
              <a-input placeholder="请输入报文编号" v-model="queryParam.packid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起机构码">
              <a-input placeholder="请输入发起机构码" v-model="queryParam.sndBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起行号">
              <a-input placeholder="请输入发起行号" v-model="queryParam.sndNpsBrno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起行名">
              <a-input placeholder="请输入发起行名" v-model="queryParam.sndNpsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起成员行号（清算行号）">
              <a-input placeholder="请输入发起成员行号（清算行号）" v-model="queryParam.sndSttlBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收机构码(行内系统)">
              <a-input placeholder="请输入接收机构码(行内系统)" v-model="queryParam.rcvBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收行号">
              <a-input placeholder="请输入接收行号" v-model="queryParam.rcvNpsBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收成员行号（清算行号）">
              <a-input placeholder="请输入接收成员行号（清算行号）" v-model="queryParam.rcvSttlBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款清算行行号">
              <a-input placeholder="请输入付款清算行行号" v-model="queryParam.paySttlBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务种类">
              <a-input placeholder="请输入业务种类" v-model="queryParam.doType"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('汇票业务登记簿')">导出</a-button>
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
        :scroll="{x:8430}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hpywdjb-modal ref="modalForm" @ok="modalFormOk"></hpywdjb-modal>
  </a-card>
</template>

<script>
  import HpywdjbModal from './modules/HpywdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "HpywdjbList",
    mixins:[JeecgListMixin],
    components: {
      HpywdjbModal
    },
    data () {
      return {
        description: '汇票业务登记簿管理页面',
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
            title: '报文编号',
            align:"center",
            dataIndex: 'packid'
           },
		   {
            title: '委托日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '账务日期',
            align:"center",
            dataIndex: 'accDate'
           },
		   {
            title: '农信银日期',
            align:"center",
            dataIndex: 'npsDate'
           },
		   {
            title: '清算日期',
            align:"center",
            dataIndex: 'sttlDate'
           },
		   {
            title: '发起机构码',
            align:"center",
            dataIndex: 'sndBrno'
           },
		   {
            title: '发起行号',
            align:"center",
            dataIndex: 'sndNpsBrno'
           },
		   {
            title: '发起行名',
            align:"center",
            dataIndex: 'sndNpsName'
           },
		   {
            title: '发起成员行号（清算行号）',
            align:"center",
            dataIndex: 'sndSttlBrno'
           },
		   {
            title: '接收机构码(行内系统)',
            align:"center",
            dataIndex: 'rcvBrno'
           },
		   {
            title: '接收行号',
            align:"center",
            dataIndex: 'rcvNpsBrno'
           },
		   {
            title: '接收行名',
            align:"center",
            dataIndex: 'rcvNpsName'
           },
		   {
            title: '接收成员行号（清算行号）',
            align:"center",
            dataIndex: 'rcvSttlBrno'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '主机流水号',
            align:"center",
            dataIndex: 'accTraceNo'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'cur'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'txAmt'
           },
		   {
            title: '现转标志',
            align:"center",
            dataIndex: 'cfFlag'
           },
		   {
            title: '出票金额',
            align:"center",
            dataIndex: 'draftAmt'
           },
		   {
            title: '剩余金额',
            align:"center",
            dataIndex: 'remainAmt'
           },
		   {
            title: '收取客户手续费',
            align:"center",
            dataIndex: 'cusChrg'
           },
		   {
            title: '手续费现转标志',
            align:"center",
            dataIndex: 'chrgFlag'
           },
		   {
            title: '付给NCC手续费',
            align:"center",
            dataIndex: 'npsChrg'
           },
		   {
            title: '支取方式',
            align:"center",
            dataIndex: 'drawType'
           },
		   {
            title: '核押标志',
            align:"center",
            dataIndex: 'testFlag'
           },
		   {
            title: '付款账号',
            align:"center",
            dataIndex: 'payAcc'
           },
		   {
            title: '付款人名称',
            align:"center",
            dataIndex: 'payName'
           },
		   {
            title: '付款人地址',
            align:"center",
            dataIndex: 'payAddr'
           },
		   {
            title: '付款行号',
            align:"center",
            dataIndex: 'payNpsBrno'
           },
		   {
            title: '付款清算行行号',
            align:"center",
            dataIndex: 'paySttlBrno'
           },
		   {
            title: '持票人账号',
            align:"center",
            dataIndex: 'holdAcc'
           },
		   {
            title: '持票人名称',
            align:"center",
            dataIndex: 'holdName'
           },
		   {
            title: '持票人行号',
            align:"center",
            dataIndex: 'holdNpsBrno'
           },
		   {
            title: '卡着标志',
            align:"center",
            dataIndex: 'cbFlag'
           },
		   {
            title: '扣款人账号',
            align:"center",
            dataIndex: 'debitAcc'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'pyeAcc'
           },
		   {
            title: '收款人名称',
            align:"center",
            dataIndex: 'pyeName'
           },
		   {
            title: '收款人地址',
            align:"center",
            dataIndex: 'pyeAddr'
           },
		   {
            title: '收款人开户行',
            align:"center",
            dataIndex: 'pyeNpsBrno'
           },
		   {
            title: '收款人清算行',
            align:"center",
            dataIndex: 'pyeSttlBrno'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '汇票日期（票据日期）',
            align:"center",
            dataIndex: 'draftDate'
           },
		   {
            title: '汇票号码（票据号码）',
            align:"center",
            dataIndex: 'draftNo'
           },
		   {
            title: '票据版本号',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: '兑付方式',
            align:"center",
            dataIndex: 'payWay'
           },
		   {
            title: '复核发送日期',
            align:"center",
            dataIndex: 'sndDate'
           },
		   {
            title: '接收落地日期',
            align:"center",
            dataIndex: 'rcvDate'
           },
		   {
            title: '对账标志',
            align:"center",
            dataIndex: 'chkFlag'
           },
		   {
            title: '往来标志',
            align:"center",
            dataIndex: 'srFlag'
           },
		   {
            title: '密押',
            align:"center",
            dataIndex: 'seal'
           },
		   {
            title: '支付密码',
            align:"center",
            dataIndex: 'payPwd'
           },
		   {
            title: '用途',
            align:"center",
            dataIndex: 'purpose'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '主机响应码',
            align:"center",
            dataIndex: 'accRespcd'
           },
		   {
            title: 'NCC响应码',
            align:"center",
            dataIndex: 'npsRespcd'
           },
		   {
            title: '打印次数',
            align:"center",
            dataIndex: 'prtTimes'
           },
		   {
            title: '交易时间HHMMSS',
            align:"center",
            dataIndex: 'txTime'
           },
		   {
            title: '操作员(交易控制/统计用字段)',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '复核员(交易控制/统计用字段)',
            align:"center",
            dataIndex: 'chkTel'
           },
		   {
            title: '授权员(交易控制/统计用字段)',
            align:"center",
            dataIndex: 'authTel'
           },
		   {
            title: '有无第三联标志',
            align:"center",
            dataIndex: 'billflg'
           },
		   {
            title: '报文标识号',
            align:"center",
            dataIndex: 'msgid'
           },
		   {
            title: '报文标识号(针对来帐应到填写此字段)',
            align:"center",
            dataIndex: 'sndMsgid'
           },
		   {
            title: '报文编码(针对来帐应到填写此字段)',
            align:"center",
            dataIndex: 'sndPackid'
           },
		   {
            title: '参考报文标识号',
            align:"center",
            dataIndex: 'refMsgid'
           },
		   {
            title: '业务种类',
            align:"center",
            dataIndex: 'doType'
           },
		   {
            title: '退票原因',
            align:"center",
            dataIndex: 'reason'
           },
		   {
            title: '挂账账号',
            align:"center",
            dataIndex: 'susAcno'
           },
		   {
            title: '复核流水号',
            align:"center",
            dataIndex: 'refTraceno'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'reserver1'
           },
		   {
            title: '预留2',
            align:"center",
            dataIndex: 'reserver2'
           },
		   {
            title: '起始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
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
          }
        ],
		url: {
          list: "/hpywdjb/hpywdjb/list",
          delete: "/hpywdjb/hpywdjb/delete",
          deleteBatch: "/hpywdjb/hpywdjb/deleteBatch",
          exportXlsUrl: "hpywdjb/hpywdjb/exportXls",
          importExcelUrl: "hpywdjb/hpywdjb/importExcel",
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