<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="通信级标识号">
              <a-input placeholder="请输入通信级标识号" v-model="queryParam.commid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="通信级参考号">
              <a-input placeholder="请输入通信级参考号" v-model="queryParam.refcommid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报文标识号">
              <a-input placeholder="请输入报文标识号" v-model="queryParam.msgno"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起行行号">
              <a-input placeholder="请输入发起行行号" v-model="queryParam.orBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起行行名">
              <a-input placeholder="请输入发起行行名" v-model="queryParam.orBrNm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务状态">
              <a-input placeholder="请输入业务状态" v-model="queryParam.hvSts"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人账号">
              <a-input placeholder="请输入付款人账号" v-model="queryParam.payAcNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人姓名">
              <a-input placeholder="请输入付款人姓名" v-model="queryParam.payName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人账号">
              <a-input placeholder="请输入收款人账号" v-model="queryParam.cashAcNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人姓名">
              <a-input placeholder="请输入收款人姓名" v-model="queryParam.cashName"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('大额支付业务主表')">导出</a-button>
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
    <dezfywzb-modal ref="modalForm" @ok="modalFormOk"></dezfywzb-modal>
  </a-card>
</template>

<script>
  import DezfywzbModal from './modules/DezfywzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DezfywzbList",
    mixins:[JeecgListMixin],
    components: {
      DezfywzbModal
    },
    data () {
      return {
        description: '大额支付业务主表管理页面',
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
            title: 'CMT编号/报文类型',
            align:"center",
            dataIndex: 'cmtno'
           },
		   {
            title: '通信级标识号',
            align:"center",
            dataIndex: 'commid'
           },
		   {
            title: '通信级参考号',
            align:"center",
            dataIndex: 'refcommid'
           },
		   {
            title: '报文标识号',
            align:"center",
            dataIndex: 'msgno'
           },
		   {
            title: '发送网点',
            align:"center",
            dataIndex: 'sndBrNo'
           },
		   {
            title: '接收网点',
            align:"center",
            dataIndex: 'rcvBrNo'
           },
		   {
            title: '平台日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '委托日期',
            align:"center",
            dataIndex: 'wtDate'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'txTime'
           },
		   {
            title: '人行的交易序号',
            align:"center",
            dataIndex: 'orderno'
           },
		   {
            title: '货币符号',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '凭证类型',
            align:"center",
            dataIndex: 'noteType'
           },
		   {
            title: '冠子号码',
            align:"center",
            dataIndex: 'notePreno'
           },
		   {
            title: '凭证号',
            align:"center",
            dataIndex: 'noteNo'
           },
		   {
            title: '支取方式',
            align:"center",
            dataIndex: 'drawtype'
           },
		   {
            title: '密码/证件号码',
            align:"center",
            dataIndex: 'drawval'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'txAmt'
           },
		   {
            title: '手续费标志',
            align:"center",
            dataIndex: 'txChrgInd'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'chrgAmt'
           },
		   {
            title: '发起清算行行号',
            align:"center",
            dataIndex: 'payQsNo'
           },
		   {
            title: '发起行行号',
            align:"center",
            dataIndex: 'orBrNo'
           },
		   {
            title: '发起行行名',
            align:"center",
            dataIndex: 'orBrNm'
           },
		   {
            title: '付款人开户行行号',
            align:"center",
            dataIndex: 'payOpnBrNo'
           },
		   {
            title: '付款人开户行行名',
            align:"center",
            dataIndex: 'payOpnBrNm'
           },
		   {
            title: '付款人账号',
            align:"center",
            dataIndex: 'payAcNo'
           },
		   {
            title: '付款人姓名',
            align:"center",
            dataIndex: 'payName'
           },
		   {
            title: '付款人地址',
            align:"center",
            dataIndex: 'payAddr'
           },
		   {
            title: '接收行清算行号',
            align:"center",
            dataIndex: 'cashQsNo'
           },
		   {
            title: '接收行行号',
            align:"center",
            dataIndex: 'acBrNo'
           },
		   {
            title: '接收行行名',
            align:"center",
            dataIndex: 'acBrNm'
           },
		   {
            title: '收款人开户行行号',
            align:"center",
            dataIndex: 'cashOpnBrNo'
           },
		   {
            title: '收款人开户行行名',
            align:"center",
            dataIndex: 'cashOpnBrNm'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'cashAcNo'
           },
		   {
            title: '收款人姓名',
            align:"center",
            dataIndex: 'cashName'
           },
		   {
            title: '收款人地址',
            align:"center",
            dataIndex: 'cashAddr'
           },
		   {
            title: '中介机构1',
            align:"center",
            dataIndex: 'mediary1'
           },
		   {
            title: '中介机构1名称',
            align:"center",
            dataIndex: 'mediaryname1'
           },
		   {
            title: '中介机构2',
            align:"center",
            dataIndex: 'mediary2'
           },
		   {
            title: '中介机构2名称',
            align:"center",
            dataIndex: 'mediaryname2'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'ywKind'
           },
		   {
            title: '业务种类',
            align:"center",
            dataIndex: 'ywType'
           },
		   {
            title: '一二代标志',
            align:"center",
            dataIndex: 'begSts'
           },
		   {
            title: '优先级别',
            align:"center",
            dataIndex: 'operlevel'
           },
		   {
            title: '端到端标识号',
            align:"center",
            dataIndex: 'endtoendid'
           },
		   {
            title: '清算日期',
            align:"center",
            dataIndex: 'clsdate'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'hvSts'
           },
		   {
            title: '操作员',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '核心记账日期',
            align:"center",
            dataIndex: 'hostDate'
           },
		   {
            title: '核心记账流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '挂账标志',
            align:"center",
            dataIndex: 'susflag'
           },
		   {
            title: '入账账号',
            align:"center",
            dataIndex: 'enteracc'
           },
		   {
            title: '入账账户名称',
            align:"center",
            dataIndex: 'enteraccnm'
           },
		   {
            title: '入账账号开户机构',
            align:"center",
            dataIndex: 'enteropenbrn'
           },
		   {
            title: '手工入账核心日期',
            align:"center",
            dataIndex: 'enterdate'
           },
		   {
            title: '手工入账核心流水',
            align:"center",
            dataIndex: 'entertrace'
           },
		   {
            title: '手工入账柜员',
            align:"center",
            dataIndex: 'entertel'
           },
		   {
            title: '手工入账平台流水',
            align:"center",
            dataIndex: 'enterswno'
           },
		   {
            title: '发送时核心记账日期',
            align:"center",
            dataIndex: 'hostDateSnd'
           },
		   {
            title: '发送时核心记账流水号',
            align:"center",
            dataIndex: 'traceNoSnd'
           },
		   {
            title: '原支付来账交易状态',
            align:"center",
            dataIndex: 'hvOsts'
           },
		   {
            title: '人行对账检查状态',
            align:"center",
            dataIndex: 'checkflag'
           },
		   {
            title: '行内对账检查状态',
            align:"center",
            dataIndex: 'hostflag'
           },
		   {
            title: '打印次数',
            align:"center",
            dataIndex: 'hvPrtInd'
           },
		   {
            title: '拒绝重发标志',
            align:"center",
            dataIndex: 'resendInd'
           },
		   {
            title: '拒绝重新发送日期',
            align:"center",
            dataIndex: 'resendDate'
           },
		   {
            title: '来往标识',
            align:"center",
            dataIndex: 'lwInd'
           },
		   {
            title: '借贷标志',
            align:"center",
            dataIndex: 'cdFlag'
           },
		   {
            title: '接收平台流水号',
            align:"center",
            dataIndex: 'rcvSwno'
           },
		   {
            title: '授权操作员',
            align:"center",
            dataIndex: 'authTel'
           },
		   {
            title: '授权操作员流水号',
            align:"center",
            dataIndex: 'authTraceNo'
           },
		   {
            title: '复核操作员',
            align:"center",
            dataIndex: 'chk'
           },
		   {
            title: '复核操作员流水号',
            align:"center",
            dataIndex: 'chkTraceNo'
           },
		   {
            title: '发送操作员',
            align:"center",
            dataIndex: 'sendTel'
           },
		   {
            title: '发送操作员流水号',
            align:"center",
            dataIndex: 'sendTraceNo'
           },
		   {
            title: '错账处理日期',
            align:"center",
            dataIndex: 'dealerrDate'
           },
		   {
            title: '错账处理柜员',
            align:"center",
            dataIndex: 'dealerrTel'
           },
		   {
            title: '错账处理主机流水',
            align:"center",
            dataIndex: 'dealerrHostno'
           },
		   {
            title: '错账处理平台流水',
            align:"center",
            dataIndex: 'dealerrSwno'
           },
		   {
            title: '处理状态',
            align:"center",
            dataIndex: 'procstat'
           },
		   {
            title: '处理码',
            align:"center",
            dataIndex: 'respcode'
           },
		   {
            title: '应答信息',
            align:"center",
            dataIndex: 'rspinfo'
           },
		   {
            title: '业务处理参与机构',
            align:"center",
            dataIndex: 'procarty'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'hvBrf'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'hvBrf2'
           },
		   {
            title: '附言',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '附言2',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '记账账号',
            align:"center",
            dataIndex: 'accno'
           },
		   {
            title: '记账账号名称',
            align:"center",
            dataIndex: 'accnm'
           },
		   {
            title: '销账编号',
            align:"center",
            dataIndex: 'chargeoff'
           },
		   {
            title: '卡折标识',
            align:"center",
            dataIndex: 'kzFlag'
           },
		   {
            title: '授权标志',
            align:"center",
            dataIndex: 'sqbz'
           },
		   {
            title: '入账机构/挂账机构',
            align:"center",
            dataIndex: 'susBrno'
           },
		   {
            title: '渠道类型',
            align:"center",
            dataIndex: 'chanType'
           },
		   {
            title: '挂账账号',
            align:"center",
            dataIndex: 'susAcno'
           },
		   {
            title: '挂账原因',
            align:"center",
            dataIndex: 'susReason'
           },
		   {
            title: '补发标志',
            align:"center",
            dataIndex: 'resndflg'
           },
		   {
            title: '渠道ID',
            align:"center",
            dataIndex: 'chnlid'
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
           }
		   // {
       //      title: '天入库表编号-对不同的表名唯一',
       //      align:"center",
       //      dataIndex: 'dtnum'
       //     },
		   // {
       //      title: 'dttime',
       //      align:"center",
       //      dataIndex: 'dttime'
       //     },
       //    {
       //      title: '操作',
       //      dataIndex: 'action',
       //      align:"center",
       //      scopedSlots: { customRender: 'action' },
       //    }
        ],
		url: {
          list: "/dezfywzb/dezfywzb/list",
          delete: "/dezfywzb/dezfywzb/delete",
          deleteBatch: "/dezfywzb/dezfywzb/deleteBatch",
          exportXlsUrl: "dezfywzb/dezfywzb/exportXls",
          importExcelUrl: "dezfywzb/dezfywzb/importExcel",
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