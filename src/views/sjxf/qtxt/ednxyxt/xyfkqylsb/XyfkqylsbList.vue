<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="TEL">
              <a-input placeholder="请输入TEL" v-model="queryParam.tel"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="TRACE_NO">
              <a-input placeholder="请输入TRACE_NO" v-model="queryParam.traceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="SND_NPS_BRNO">
              <a-input placeholder="请输入SND_NPS_BRNO" v-model="queryParam.sndNpsBrno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="SND_NPS_NAME">
              <a-input placeholder="请输入SND_NPS_NAME" v-model="queryParam.sndNpsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="RCV_NPS_BRNO">
              <a-input placeholder="请输入RCV_NPS_BRNO" v-model="queryParam.rcvNpsBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="RCV_NPS_NAME">
              <a-input placeholder="请输入RCV_NPS_NAME" v-model="queryParam.rcvNpsName"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('协议付款签约流水表')">导出</a-button>

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
    <xyfkqylsb-modal ref="modalForm" @ok="modalFormOk"></xyfkqylsb-modal>
  </a-card>
</template>

<script>
  import XyfkqylsbModal from './modules/XyfkqylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XyfkqylsbList",
    mixins:[JeecgListMixin],
    components: {
      XyfkqylsbModal
    },
    data () {
      return {
        description: '协议付款签约流水表管理页面',
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
            title: 'TX_DATE',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: 'TX_TIME',
            align:"center",
            dataIndex: 'txTime'
           },
		   {
            title: 'TRACE_NO',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: 'NPS_DATE',
            align:"center",
            dataIndex: 'npsDate'
           },
		   {
            title: 'MSGID',
            align:"center",
            dataIndex: 'msgid'
           },
		   {
            title: 'BRNO',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: 'TEL',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: 'SND_NPS_BRNO',
            align:"center",
            dataIndex: 'sndNpsBrno'
           },
		   {
            title: 'RCV_NPS_BRNO',
            align:"center",
            dataIndex: 'rcvNpsBrno'
           },
		   {
            title: 'SND_NPS_NAME',
            align:"center",
            dataIndex: 'sndNpsName'
           },
		   {
            title: 'RCV_NPS_NAME',
            align:"center",
            dataIndex: 'rcvNpsName'
           },
		   {
            title: 'MANAGE_TYPE',
            align:"center",
            dataIndex: 'manageType'
           },
		   {
            title: 'PROTOCOLNO',
            align:"center",
            dataIndex: 'protocolno'
           },
		   {
            title: 'CUSTOMER_NUM',
            align:"center",
            dataIndex: 'customerNum'
           },
		   {
            title: 'MERCHANT',
            align:"center",
            dataIndex: 'merchant'
           },
		   {
            title: 'CHANNEL',
            align:"center",
            dataIndex: 'channel'
           },
		   {
            title: 'FLAG',
            align:"center",
            dataIndex: 'flag'
           },
		   {
            title: 'PAY_ACC',
            align:"center",
            dataIndex: 'payAcc'
           },
		   {
            title: 'PAY_ACC_NAME',
            align:"center",
            dataIndex: 'payAccName'
           },
		   {
            title: 'PAY_ACC_TYPE',
            align:"center",
            dataIndex: 'payAccType'
           },
		   {
            title: 'PAY_NPS_BRNO',
            align:"center",
            dataIndex: 'payNpsBrno'
           },
		   {
            title: 'PAY_NPS_NAME',
            align:"center",
            dataIndex: 'payNpsName'
           },
		   {
            title: 'CERTTYPE',
            align:"center",
            dataIndex: 'certtype'
           },
		   {
            title: 'CERTNO',
            align:"center",
            dataIndex: 'certno'
           },
		   {
            title: 'PHONE',
            align:"center",
            dataIndex: 'phone'
           },
		   {
            title: 'CARDVAILDATE',
            align:"center",
            dataIndex: 'cardvaildate'
           },
		   {
            title: 'CVV2',
            align:"center",
            dataIndex: 'cvv2'
           },
		   {
            title: 'MESSAGEID',
            align:"center",
            dataIndex: 'messageid'
           },
		   {
            title: 'MSGVERIFYCODE',
            align:"center",
            dataIndex: 'msgverifycode'
           },
		   {
            title: 'PYE_ACC',
            align:"center",
            dataIndex: 'pyeAcc'
           },
		   {
            title: 'PYE_ACC_NAME',
            align:"center",
            dataIndex: 'pyeAccName'
           },
		   {
            title: 'PYE_NPS_BRNO',
            align:"center",
            dataIndex: 'pyeNpsBrno'
           },
		   {
            title: 'PYE_NPS_NAME',
            align:"center",
            dataIndex: 'pyeNpsName'
           },
		   {
            title: 'CUSTOMER_ID',
            align:"center",
            dataIndex: 'customerId'
           },
		   {
            title: 'BUS_TYPE',
            align:"center",
            dataIndex: 'busType'
           },
		   {
            title: 'SINGLETRANSLIMIT',
            align:"center",
            dataIndex: 'singletranslimit'
           },
		   {
            title: 'DAYTOTALCOUNT',
            align:"center",
            dataIndex: 'daytotalcount'
           },
		   {
            title: 'DAYTOTALLIMIT',
            align:"center",
            dataIndex: 'daytotallimit'
           },
		   {
            title: 'PROTOCOL_BEGIN_DATE',
            align:"center",
            dataIndex: 'protocolBeginDate'
           },
		   {
            title: 'PROTOCOL_END_DATE',
            align:"center",
            dataIndex: 'protocolEndDate'
           },
		   {
            title: 'STTL_DATE',
            align:"center",
            dataIndex: 'sttlDate'
           },
		   {
            title: 'STAT',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: 'REJ_RESPCD',
            align:"center",
            dataIndex: 'rejRespcd'
           },
		   {
            title: 'REJ_REASON',
            align:"center",
            dataIndex: 'rejReason'
           },
		   {
            title: 'ADDINFO',
            align:"center",
            dataIndex: 'addinfo'
           },
		   {
            title: 'PURPOSE',
            align:"center",
            dataIndex: 'purpose'
           },
		   {
            title: 'RESERVE1',
            align:"center",
            dataIndex: 'reserve1'
           },
		   {
            title: 'RESERVE2',
            align:"center",
            dataIndex: 'reserve2'
           },
		   {
            title: 'S_DATE',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: 'E_DATE',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: 'LOAD_DATE',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: 'LEGAL_NO',
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
          list: "/xyfkqylsb/xyfkqylsb/list",
          delete: "/xyfkqylsb/xyfkqylsb/delete",
          deleteBatch: "/xyfkqylsb/xyfkqylsb/deleteBatch",
          exportXlsUrl: "xyfkqylsb/xyfkqylsb/exportXls",
          importExcelUrl: "xyfkqylsb/xyfkqylsb/importExcel",
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