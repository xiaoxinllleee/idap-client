<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报文类型">
              <a-input placeholder="请输入报文类型" v-model="queryParam.msgtype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易机构">
              <a-input placeholder="请输入交易机构" v-model="queryParam.brNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="挂账标志">
              <a-input placeholder="请输入挂账标志" v-model="queryParam.susflag"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类型">
              <a-input placeholder="请输入业务类型" v-model="queryParam.txtype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务种类">
              <a-input placeholder="请输入业务种类" v-model="queryParam.txkind"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起行行号">
              <a-input placeholder="请输入发起行行号" v-model="queryParam.orBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起清算行行号">
              <a-input placeholder="请输入发起清算行行号" v-model="queryParam.payQsNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收行行号">
              <a-input placeholder="请输入接收行行号" v-model="queryParam.acBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收清算行行号">
              <a-input placeholder="请输入接收清算行行号" v-model="queryParam.cashQsNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态(可参考附录)">
              <a-input placeholder="请输入交易状态(可参考附录)" v-model="queryParam.lvSts"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('小额支付交易主表')">导出</a-button>
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
        :scroll="{x:10430}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xezfjyzb-modal ref="modalForm" @ok="modalFormOk"></xezfjyzb-modal>
  </a-card>
</template>

<script>
  import XezfjyzbModal from './modules/XezfjyzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XezfjyzbList",
    mixins:[JeecgListMixin],
    components: {
      XezfjyzbModal
    },
    data () {
      return {
        description: '小额支付交易主表管理页面',
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
            title: '报文类型',
            align:"center",
            dataIndex: 'msgtype'
           },
		   {
            title: '交易机构',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '核心记账日期',
            align:"center",
            dataIndex: 'jzDate'
           },
		   {
            title: '核心记账流水号',
            align:"center",
            dataIndex: 'hostno'
           },
		   {
            title: '挂账标志',
            align:"center",
            dataIndex: 'susflag'
           },
		   {
            title: '入账帐号',
            align:"center",
            dataIndex: 'enteracc'
           },
		   {
            title: '入账帐户名称',
            align:"center",
            dataIndex: 'enteraccnm'
           },
		   {
            title: '入账账号开户机构',
            align:"center",
            dataIndex: 'enteropenbrn'
           },
		   {
            title: '手工入账日期/借记来帐处理日期',
            align:"center",
            dataIndex: 'enterdate'
           },
		   {
            title: '手工入账流水/借记来账处理流水',
            align:"center",
            dataIndex: 'entertrace'
           },
		   {
            title: '手工入账柜员/借记来账处理柜员',
            align:"center",
            dataIndex: 'entertel'
           },
		   {
            title: '手工入账平台流水/借记来账处理平台流水',
            align:"center",
            dataIndex: 'enterswno'
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
            title: '小额日期',
            align:"center",
            dataIndex: 'bepsdate'
           },
		   {
            title: '支付交易序号',
            align:"center",
            dataIndex: 'orderno'
           },
		   {
            title: '回执支付序号',
            align:"center",
            dataIndex: 'respno'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'txTime'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'txtype'
           },
		   {
            title: '业务种类',
            align:"center",
            dataIndex: 'txkind'
           },
		   {
            title: '发起行行号',
            align:"center",
            dataIndex: 'orBrNo'
           },
		   {
            title: '发起清算行行号',
            align:"center",
            dataIndex: 'payQsNo'
           },
		   {
            title: '接收行行号',
            align:"center",
            dataIndex: 'acBrNo'
           },
		   {
            title: '接收清算行行号',
            align:"center",
            dataIndex: 'cashQsNo'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'txAmt'
           },
		   {
            title: '借贷标志',
            align:"center",
            dataIndex: 'cdflag'
           },
		   {
            title: '凭证种类',
            align:"center",
            dataIndex: 'noteType'
           },
		   {
            title: '冠字号码',
            align:"center",
            dataIndex: 'notePreno'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'noteNo'
           },
		   {
            title: '支取方式',
            align:"center",
            dataIndex: 'drawtype'
           },
		   {
            title: '密码/证件号码/支付密码',
            align:"center",
            dataIndex: 'drawval'
           },
		   {
            title: '付款人开户行',
            align:"center",
            dataIndex: 'payOpnBrNo'
           },
		   {
            title: '付款人开户行名称',
            align:"center",
            dataIndex: 'payOpnBrNm'
           },
		   {
            title: '付款人账号',
            align:"center",
            dataIndex: 'payAcNo'
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
            title: '收款人开户行',
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
            title: '附言',
            align:"center",
            dataIndex: 'lvBrf'
           },
		   {
            title: '附言2',
            align:"center",
            dataIndex: 'lvBrf2'
           },
		   {
            title: '回执期限',
            align:"center",
            dataIndex: 'returndays'
           },
		   {
            title: '多方协议号',
            align:"center",
            dataIndex: 'protno'
           },
		   {
            title: 'NPC转发日期',
            align:"center",
            dataIndex: 'trandate'
           },
		   {
            title: '来往标识',
            align:"center",
            dataIndex: 'lwInd'
           },
		   {
            title: '回执日期',
            align:"center",
            dataIndex: 'respDate'
           },
		   {
            title: '业务回执状态',
            align:"center",
            dataIndex: 'rcpstat'
           },
		   {
            title: '业务拒绝码',
            align:"center",
            dataIndex: 'rejectcode'
           },
		   {
            title: '业务拒绝原因',
            align:"center",
            dataIndex: 'rejectreason'
           },
		   {
            title: '录入操作员',
            align:"center",
            dataIndex: 'inputTel'
           },
		   {
            title: '复核操作员',
            align:"center",
            dataIndex: 'checkTel'
           },
		   {
            title: '授权操作员',
            align:"center",
            dataIndex: 'authTel'
           },
		   {
            title: '发送操作员',
            align:"center",
            dataIndex: 'sendTel'
           },
		   {
            title: '回执操作员',
            align:"center",
            dataIndex: 'respTel'
           },
		   {
            title: '复核平台流水',
            align:"center",
            dataIndex: 'checkTraceNo'
           },
		   {
            title: '接收平台流水',
            align:"center",
            dataIndex: 'rcvTraceNo'
           },
		   {
            title: '错账处理操作员',
            align:"center",
            dataIndex: 'dealTel'
           },
		   {
            title: '错账处理日期',
            align:"center",
            dataIndex: 'dealDate'
           },
		   {
            title: '错账处理平台流水/冻结流水',
            align:"center",
            dataIndex: 'dealSwno'
           },
		   {
            title: '错账处理流水号',
            align:"center",
            dataIndex: 'dealTraceNo'
           },
		   {
            title: '交易状态(可参考附录)',
            align:"center",
            dataIndex: 'lvSts'
           },
		   {
            title: '打印次数',
            align:"center",
            dataIndex: 'prtTimes'
           },
		   {
            title: '手续费标志',
            align:"center",
            dataIndex: 'txChrgInd'
           },
		   {
            title: '手续费金额',
            align:"center",
            dataIndex: 'chrgAmt'
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
            title: '包委托日期',
            align:"center",
            dataIndex: 'packDate'
           },
		   {
            title: '包序号',
            align:"center",
            dataIndex: 'packno'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'filler'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'filler2'
           },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'accType'
           },
		   {
            title: '记账账号',
            align:"center",
            dataIndex: 'accno'
           },
		   {
            title: '记账账户名称',
            align:"center",
            dataIndex: 'accnm'
           },
		   {
            title: '报文优先级',
            align:"center",
            dataIndex: 'mesgpriority'
           },
		   {
            title: '销账编号',
            align:"center",
            dataIndex: 'chargeoff'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'kzFlag'
           },
		   {
            title: '渠道类型',
            align:"center",
            dataIndex: 'chanType'
           },
		   {
            title: '挂账机构/入账机构',
            align:"center",
            dataIndex: 'susBrno'
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
            title: '代收付标志',
            align:"center",
            dataIndex: 'dsfFlag'
           },
		   {
            title: '合同号',
            align:"center",
            dataIndex: 'batch'
           },
		   {
            title: '处理标识',
            align:"center",
            dataIndex: 'dealflag'
           },
		   {
            title: '渠道ID',
            align:"center",
            dataIndex: 'chnlid'
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
            title: '数据加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   /*{
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
          list: "/xezfjyzb/xezfjyzb/list",
          delete: "/xezfjyzb/xezfjyzb/delete",
          deleteBatch: "/xezfjyzb/xezfjyzb/deleteBatch",
          exportXlsUrl: "xezfjyzb/xezfjyzb/exportXls",
          importExcelUrl: "xezfjyzb/xezfjyzb/importExcel",
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