<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
             <!-- <a-input placeholder="全部" v-model="queryParam.prtry"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.brno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类型">
              <a-input placeholder="请输入业务类型" v-model="queryParam.prtry"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务种类">
              <a-input placeholder="请输入业务种类" v-model="queryParam.busType"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易金额">
             <!-- <a-input placeholder="请输入交易金额" v-model="queryParam.amt"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.amt_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.amt_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人账号">
              <a-input placeholder="请输入收款人账号" v-model="queryParam.pyeAcc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人账号">
              <a-input placeholder="请输入付款人账号" v-model="queryParam.payAcc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存折余额">
            <!--  <a-input placeholder="请输入存折余额" v-model="queryParam.payVouBal"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.payVouBal_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.payVouBal_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="委托日期">
              <a-range-picker @change="onChangewtrq" v-model="queryParam.txDate" :format="dateFormat"/>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('通存通兑业务登记簿')">导出</a-button>

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
    <tctdywdjb-modal ref="modalForm" @ok="modalFormOk"></tctdywdjb-modal>
  </a-card>
</template>

<script>
  import TctdywdjbModal from './modules/TctdywdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import {filterObj} from '@/utils/util'

  export default {
    name: "TctdywdjbList",
    mixins:[JeecgListMixin],
    components: {
      TctdywdjbModal,JTreeSelect
    },
    data () {
      return {
        description: '通存通兑业务登记簿管理页面',
        // 表头
        dateFormat:'YYYYMMDD',
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
            title: '业务类型',
            align:"center",
            dataIndex: 'prtry'
           },
		   {
            title: '业务种类',
            align:"center",
            dataIndex: 'busType'
           },
		   {
            title: '委托日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '农信银日期',
            align:"center",
            dataIndex: 'npsDate'
           },
		   {
            title: '发送时间',
            align:"center",
            dataIndex: 'sndTime'
           },
		   {
            title: '账务日期',
            align:"center",
            dataIndex: 'accDate'
           },
		   {
            title: '清算日期',
            align:"center",
            dataIndex: 'sttlDate'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'brno_dictText'
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
            title: '发起成员行号',
            align:"center",
            dataIndex: 'sndSttlBrno'
           },
		   {
            title: '接收行号',
            align:"center",
            dataIndex: 'rcvNpsBrno'
           },
		   {
            title: '接受行名',
            align:"center",
            dataIndex: 'rcvNpsName'
           },
		   {
            title: '接收成员行号',
            align:"center",
            dataIndex: 'rcvSttlBrno'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '原交易流水号',
            align:"center",
            dataIndex: 'orTraceNo'
           },
		   {
            title: '主机流水号',
            align:"center",
            dataIndex: 'accTraceNo'
           },
		   {
            title: '止付编号',
            align:"center",
            dataIndex: 'stopNo'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'cur'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amt'
           },
		   {
            title: '现转标志',
            align:"center",
            dataIndex: 'ctFlag'
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
            title: '付款人账号',
            align:"center",
            dataIndex: 'payAcc'
           },
		   {
            title: '付款账户类型',
            align:"center",
            dataIndex: 'payAccType'
           },
		   {
            title: '付款人名称',
            align:"center",
            dataIndex: 'payName'
           },
		   {
            title: '付款人开户行行号',
            align:"center",
            dataIndex: 'payOpnBrno'
           },
		   {
            title: '付款行行号',
            align:"center",
            dataIndex: 'payNpsBrno'
           },
		   {
            title: '付款人开户清算行',
            align:"center",
            dataIndex: 'paySttlBrno'
           },
		   {
            title: '付款人地址',
            align:"center",
            dataIndex: 'payAddr'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'pyeAcc'
           },
		   {
            title: '收款账户类型',
            align:"center",
            dataIndex: 'pyeAccType'
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
            title: '收款人开户行行号',
            align:"center",
            dataIndex: 'pyeOpnBrno'
           },
		   {
            title: '收款行行号',
            align:"center",
            dataIndex: 'pyeNpsBrno'
           },
		   {
            title: '收款人开户清算行',
            align:"center",
            dataIndex: 'pyeSttlBrno'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'certType'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'certNo'
           },
		   {
            title: '付款人凭证号码',
            align:"center",
            dataIndex: 'payVouNo'
           },
		   {
            title: '存折余额',
            align:"center",
            dataIndex: 'payVouBal'
           },
		   {
            title: '收款人凭证号码',
            align:"center",
            dataIndex: 'pyeVouNo'
           },
		   {
            title: '存折余额',
            align:"center",
            dataIndex: 'pyeVouBal'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'ps'
           },
		   {
            title: '附言',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '存款确认标志',
            align:"center",
            dataIndex: 'affiFlag'
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
            title: '处理码',
            align:"center",
            dataIndex: 'respcd'
           },
		   {
            title: '主机响应码',
            align:"center",
            dataIndex: 'accRespcd'
           },
		   {
            title: '挂账账号',
            align:"center",
            dataIndex: 'susAcno'
           },
		   {
            title: 'NCC响应码',
            align:"center",
            dataIndex: 'npsRespcd'
           },
		   {
            title: '回执业务应答码',
            align:"center",
            dataIndex: 'rcvRespcd'
           },
		   {
            title: '拒绝码',
            align:"center",
            dataIndex: 'rejRespcd'
           },
		   {
            title: '拒绝信息',
            align:"center",
            dataIndex: 'rejReason'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'txTime'
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
            title: '授权员',
            align:"center",
            dataIndex: 'authTel'
           },
		   {
            title: '报文标识号',
            align:"center",
            dataIndex: 'msgid'
           },
		   {
            title: '发送报文标识号',
            align:"center",
            dataIndex: 'sndMsgid'
           },
		   {
            title: '发送报文编号',
            align:"center",
            dataIndex: 'sndPackid'
           },
		   {
            title: '参考报文标识号',
            align:"center",
            dataIndex: 'refMsgid'
           },
		   {
            title: '明细标识号',
            align:"center",
            dataIndex: 'txid'
           },
		   {
            title: '端到端标识号',
            align:"center",
            dataIndex: 'endid'
           },
		   {
            title: '渠道类型',
            align:"center",
            dataIndex: 'channel'
           },
		   {
            title: '预留',
            align:"center",
            dataIndex: 'reservers'
           },
		   {
            title: '卡序列号',
            align:"center",
            dataIndex: 'cardseqid'
           },
		   {
            title: '存款冲销记录原状态',
            align:"center",
            dataIndex: 'sreserve'
           },
		   {
            title: '保留',
            align:"center",
            dataIndex: 'dreserve'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'reserver1'
           },
		   {
            title: '扣款人账号',
            align:"center",
            dataIndex: 'debitAcc'
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
          list: "/tctdywdjb/tctdywdjb/list",
          delete: "/tctdywdjb/tctdywdjb/delete",
          deleteBatch: "/tctdywdjb/tctdywdjb/deleteBatch",
          exportXlsUrl: "tctdywdjb/tctdywdjb/exportXls",
          importExcelUrl: "tctdywdjb/tctdywdjb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.txDate;
        return filterObj(param);
      },
      onChangewtrq(value,dateString){
        let txDateString=dateString
        this.queryParam.txnDate_begin=txDateString[0]
        this.queryParam.txnDate_end=txDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>