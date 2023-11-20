<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易流水">
              <a-input placeholder="请输入交易流水" v-model="queryParam.traceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起行号">
              <a-input placeholder="请输入发起行号" v-model="queryParam.sndNpsBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起行名">
              <a-input placeholder="请输入发起行名" v-model="queryParam.sndNpsName"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发送清算行号">
              <a-input placeholder="请输入发送清算行号" v-model="queryParam.sndSttlBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收行号">
              <a-input placeholder="请输入接收行号" v-model="queryParam.rcvNpsBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收行名">
              <a-input placeholder="请输入接收行名" v-model="queryParam.rcvNpsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收清算行号">
              <a-input placeholder="请输入接收清算行号" v-model="queryParam.rcvSttlBrno"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('农信银电子汇兑流水表')">导出</a-button>
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
        :scroll="{x:13450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <nxydzhdlsb-modal ref="modalForm" @ok="modalFormOk"></nxydzhdlsb-modal>
  </a-card>
</template>

<script>
  import NxydzhdlsbModal from './modules/NxydzhdlsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "NxydzhdlsbList",
    mixins:[JeecgListMixin],
    components: {
      NxydzhdlsbModal
    },
    data () {
      return {
        description: '农信银电子汇兑流水表管理页面',
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
            title: '交易日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'txTime'
           },
		   {
            title: '交易流水',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '发起行号',
            align:"center",
            dataIndex: 'sndNpsBrno'
           },
		   {
            title: '接收行号',
            align:"center",
            dataIndex: 'rcvNpsBrno'
           },
		   {
            title: '扣款人账号',
            align:"center",
            dataIndex: 'debitAcc'
           },
		   {
            title: '扣款户名',
            align:"center",
            dataIndex: 'debitName'
           },
		   {
            title: '付款账号',
            align:"center",
            dataIndex: 'payAcc'
           },
		   {
            title: '付款开户行号',
            align:"center",
            dataIndex: 'payNpsBrno'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'txAmt'
           },
		   {
            title: '发起行名',
            align:"center",
            dataIndex: 'sndNpsName'
           },
		   {
            title: '接收行名',
            align:"center",
            dataIndex: 'rcvNpsName'
           },
		   {
            title: '发送清算行号',
            align:"center",
            dataIndex: 'sndSttlBrno'
           },
		   {
            title: '接收清算行号',
            align:"center",
            dataIndex: 'rcvSttlBrno'
           },
		   {
            title: '报文标识号',
            align:"center",
            dataIndex: 'msgid'
           },
		   {
            title: '优先级别',
            align:"center",
            dataIndex: 'npsLevel'
           },
		   {
            title: '交易种类',
            align:"center",
            dataIndex: 'transferType'
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
            title: '原交易日期（退汇时）',
            align:"center",
            dataIndex: 'orTxDate'
           },
		   {
            title: '原交易流水（退汇时）',
            align:"center",
            dataIndex: 'orTraceno'
           },
		   {
            title: '账务日期',
            align:"center",
            dataIndex: 'accDate'
           },
		   {
            title: '主机流水号',
            align:"center",
            dataIndex: 'accTraceno'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'cur'
           },
		   {
            title: '现转标志',
            align:"center",
            dataIndex: 'ctFlag'
           },
		   {
            title: '赔偿金金额',
            align:"center",
            dataIndex: 'cpsAmt'
           },
		   {
            title: '拒付金额',
            align:"center",
            dataIndex: 'rfuAmt'
           },
		   {
            title: '原托收金额',
            align:"center",
            dataIndex: 'orgnlamt'
           },
		   {
            title: '支付金额',
            align:"center",
            dataIndex: 'pmtamt'
           },
		   {
            title: '多付金额',
            align:"center",
            dataIndex: 'oddamt'
           },
		   {
            title: '收取客户手续费',
            align:"center",
            dataIndex: 'chrg'
           },
		   {
            title: '手续费标志',
            align:"center",
            dataIndex: 'chrgCtFlag'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'cbFlag'
           },
		   {
            title: '支取方式',
            align:"center",
            dataIndex: 'drawType'
           },
		   {
            title: '付款人地址',
            align:"center",
            dataIndex: 'payAddr'
           },
		   {
            title: '付款人名称',
            align:"center",
            dataIndex: 'payName'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'pyeAcc'
           },
		   {
            title: '收款人开户行行号',
            align:"center",
            dataIndex: 'pyeNpsBrno'
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
            title: '密押',
            align:"center",
            dataIndex: 'authWord'
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
            title: '业务类型',
            align:"center",
            dataIndex: 'attr'
           },
		   {
            title: '业务种类',
            align:"center",
            dataIndex: 'busType'
           },
		   {
            title: '凭证种类',
            align:"center",
            dataIndex: 'noteType'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'noteNum'
           },
		   {
            title: '票据种类',
            align:"center",
            dataIndex: 'vouType'
           },
		   {
            title: '票据日期',
            align:"center",
            dataIndex: 'vouDate'
           },
		   {
            title: '票据号码',
            align:"center",
            dataIndex: 'vouNumber'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'idType'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'idNo'
           },
		   {
            title: '退汇原因',
            align:"center",
            dataIndex: 'backReason'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '收费单位流水号',
            align:"center",
            dataIndex: 'flownb'
           },
		   {
            title: '所属期间',
            align:"center",
            dataIndex: 'term'
           },
		   {
            title: '缴费类型',
            align:"center",
            dataIndex: 'payfeetp'
           },
		   {
            title: '收费附言',
            align:"center",
            dataIndex: 'rmk'
           },
		   {
            title: '发送落地日期',
            align:"center",
            dataIndex: 'sndDate'
           },
		   {
            title: '接收落地日期',
            align:"center",
            dataIndex: 'rcvDate'
           },
		   {
            title: '往来标志',
            align:"center",
            dataIndex: 'srFlag'
           },
		   {
            title: '对账标志',
            align:"center",
            dataIndex: 'chkFlag'
           },
		   {
            title: '中心应答码',
            align:"center",
            dataIndex: 'npsRespcd'
           },
		   {
            title: '主机响应码',
            align:"center",
            dataIndex: 'accRespcd'
           },
		   {
            title: '支付平台处理码',
            align:"center",
            dataIndex: 'respcd'
           },
		   {
            title: '挂账账号',
            align:"center",
            dataIndex: 'susAcno'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'sndTime'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: '操作员',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '复核员',
            align:"center",
            dataIndex: 'chkTel'
           },
		   {
            title: '原发起行行号',
            align:"center",
            dataIndex: 'orNpsBrno'
           },
		   {
            title: '授权员',
            align:"center",
            dataIndex: 'authTel'
           },
		   {
            title: '二次授权员',
            align:"center",
            dataIndex: 'authTel2'
           },
		   {
            title: '授权标志',
            align:"center",
            dataIndex: 'authFlag'
           },
		   {
            title: '参考报文标识号',
            align:"center",
            dataIndex: 'orMsgid'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '原状态',
            align:"center",
            dataIndex: 'reservers'
           },
		   {
            title: '复核流水',
            align:"center",
            dataIndex: 'refTraceno'
           },
		   {
            title: '来账次数',
            align:"center",
            dataIndex: 'rcvTimes'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'reserver1'
           },
		   {
            title: '挂账原因',
            align:"center",
            dataIndex: 'susReason'
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
          list: "/nxydzhdlsb/nxydzhdlsb/list",
          delete: "/nxydzhdlsb/nxydzhdlsb/delete",
          deleteBatch: "/nxydzhdlsb/nxydzhdlsb/deleteBatch",
          exportXlsUrl: "nxydzhdlsb/nxydzhdlsb/exportXls",
          importExcelUrl: "nxydzhdlsb/nxydzhdlsb/importExcel",
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