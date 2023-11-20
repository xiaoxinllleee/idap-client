<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="协议书号">
              <a-input placeholder="请输入协议书号" v-model="queryParam.protocolno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款账户">
              <a-input placeholder="请输入付款账户" v-model="queryParam.payacct"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="征收机关代码">
              <a-input placeholder="请输入征收机关代码" v-model="queryParam.taxorgcode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="纳税人名称/缴费单位名称">
              <a-input placeholder="请输入纳税人名称/缴费单位名称" v-model="queryParam.taxpayname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="纳税人代码">
              <a-input placeholder="请输入纳税人代码" v-model="queryParam.taxpaycode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款开户行行号">
              <a-input placeholder="请输入付款开户行行号" v-model="queryParam.payopbkcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款行行号">
              <a-input placeholder="请输入付款行行号" v-model="queryParam.paybkcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <!--<a-input placeholder="请输入开户机构" v-model="queryParam.accbrno"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.accbrno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('TIPS交易流水')">导出</a-button>
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
        :scroll="{x:10450}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jyls-modal ref="modalForm" @ok="modalFormOk"></jyls-modal>
  </a-card>
</template>

<script>
  import JylsModal from './modules/JylsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "JylsList",
    mixins:[JeecgListMixin],
    components: {
      JylsModal,JTreeSelect
    },
    data () {
      return {
        description: 'TIPS交易流水管理页面',
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
            title: '平台受理日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '平台业务序号',
            align:"center",
            dataIndex: 'workseqid'
           },
		   {
            title: '平台受理时间',
            align:"center",
            dataIndex: 'worktime'
           },
		   {
            title: '平台模板代码',
            align:"center",
            dataIndex: 'templatecode'
           },
		   {
            title: '平台交易代码',
            align:"center",
            dataIndex: 'tradecode'
           },
		   {
            title: '系统标识',
            align:"center",
            dataIndex: 'sysid'
           },
		   {
            title: '应用标识',
            align:"center",
            dataIndex: 'appid'
           },
		   {
            title: '预留系统标识',
            align:"center",
            dataIndex: 'resid'
           },
		   {
            title: '发起渠道代码',
            align:"center",
            dataIndex: 'chnlcode'
           },
		   {
            title: '发起渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '发起渠道流水号',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '操作网点',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '复核柜员',
            align:"center",
            dataIndex: 'chktellerno'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'authtellerno'
           },
		   {
            title: '操作终端号',
            align:"center",
            dataIndex: 'terminalno'
           },
		   {
            title: '来往账标志',
            align:"center",
            dataIndex: 'mbflag'
           },
		   {
            title: '商业银行行号',
            align:"center",
            dataIndex: 'bankno'
           },
		   {
            title: '委托日期',
            align:"center",
            dataIndex: 'busidate'
           },
		   {
            title: '应答报文标识号',
            align:"center",
            dataIndex: 'rspmsgid'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'busistatus'
           },
		   {
            title: '交易当前业务步骤',
            align:"center",
            dataIndex: 'tradebusistep'
           },
		   {
            title: '版本号',
            align:"center",
            dataIndex: 'ver'
           },
		   {
            title: '发起节点代码',
            align:"center",
            dataIndex: 'src'
           },
		   {
            title: '接收节点代码',
            align:"center",
            dataIndex: 'des'
           },
		   {
            title: '应用名称',
            align:"center",
            dataIndex: 'app'
           },
		   {
            title: '报文编号',
            align:"center",
            dataIndex: 'msgtype'
           },
		   {
            title: '报文标识号',
            align:"center",
            dataIndex: 'msgid'
           },
		   {
            title: '报文参考号',
            align:"center",
            dataIndex: 'msgref'
           },
		   {
            title: '工作日期',
            align:"center",
            dataIndex: 'cleardate'
           },
		   {
            title: '预留字段',
            align:"center",
            dataIndex: 'reserve'
           },
		   {
            title: '实时批量标志',
            align:"center",
            dataIndex: 'realflag'
           },
		   {
            title: '征收机关代码',
            align:"center",
            dataIndex: 'taxorgcode'
           },
		   {
            title: '包流水号',
            align:"center",
            dataIndex: 'packno'
           },
		   {
            title: '交易流水号/申报序号',
            align:"center",
            dataIndex: 'trano'
           },
		   {
            title: '外部申报电子序号',
            align:"center",
            dataIndex: 'outerlevyno'
           },
		   {
            title: '申报状态',
            align:"center",
            dataIndex: 'levystatus'
           },
		   {
            title: '经收类别',
            align:"center",
            dataIndex: 'handletype'
           },
		   {
            title: '收款行行号',
            align:"center",
            dataIndex: 'payeebankno'
           },
		   {
            title: '收款单位代码',
            align:"center",
            dataIndex: 'payeeorgcode'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'payeeacct'
           },
		   {
            title: '收款人名称',
            align:"center",
            dataIndex: 'payeename'
           },
		   {
            title: '付款行行号',
            align:"center",
            dataIndex: 'paybkcode'
           },
		   {
            title: '付款开户行行号',
            align:"center",
            dataIndex: 'payopbkcode'
           },
		   {
            title: '付款账户',
            align:"center",
            dataIndex: 'payacct'
           },
		   {
            title: '缴款单位名称',
            align:"center",
            dataIndex: 'handorgname'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'traamt'
           },
		   {
            title: '税票号码/费票号码',
            align:"center",
            dataIndex: 'taxvouno'
           },
		   {
            title: '税种/险种条数',
            align:"center",
            dataIndex: 'taxtypenum'
           },
		   {
            title: '开票日期',
            align:"center",
            dataIndex: 'billdate'
           },
		   {
            title: '税务登记号',
            align:"center",
            dataIndex: 'taxregistno'
           },
		   {
            title: '纳税人代码',
            align:"center",
            dataIndex: 'taxpaycode'
           },
		   {
            title: '纳税人名称/缴费单位名称',
            align:"center",
            dataIndex: 'taxpayname'
           },
		   {
            title: '协议书号',
            align:"center",
            dataIndex: 'protocolno'
           },
		   {
            title: '国库代码',
            align:"center",
            dataIndex: 'trecode'
           },
		   {
            title: '企业代码',
            align:"center",
            dataIndex: 'corpcode'
           },
		   {
            title: '预算种类',
            align:"center",
            dataIndex: 'budgettype'
           },
		   {
            title: '整理期标志',
            align:"center",
            dataIndex: 'trimsign'
           },
		   {
            title: '企业注册类型',
            align:"center",
            dataIndex: 'corptype'
           },
		   {
            title: '打印付款凭证标志',
            align:"center",
            dataIndex: 'printvousign'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '回执处理结果',
            align:"center",
            dataIndex: 'result'
           },
		   {
            title: '回执附言',
            align:"center",
            dataIndex: 'addword'
           },
		   {
            title: '扣税日期/扣费日期',
            align:"center",
            dataIndex: 'taxdate'
           },
		   {
            title: '扣税/扣费处理结果',
            align:"center",
            dataIndex: 'payresult'
           },
		   {
            title: '扣税/扣费附言',
            align:"center",
            dataIndex: 'payaddword'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'accbrno_dictText'
           },
		   {
            title: '账务系统受理日期',
            align:"center",
            dataIndex: 'bankdate'
           },
		   {
            title: '账务系统受理时间',
            align:"center",
            dataIndex: 'banktime'
           },
		   {
            title: '账务系统受理流水号',
            align:"center",
            dataIndex: 'bankseqno'
           },
		   {
            title: '账务系统记账日期',
            align:"center",
            dataIndex: 'bankrspdate'
           },
		   {
            title: '账务系统记账流水号',
            align:"center",
            dataIndex: 'bankrspseqno'
           },
		   {
            title: '账务系统处理状态',
            align:"center",
            dataIndex: 'bankstatus'
           },
		   {
            title: '账务系统处理错误码',
            align:"center",
            dataIndex: 'bankerrcode'
           },
		   {
            title: '账务系统处理错误信息',
            align:"center",
            dataIndex: 'bankerrmsg'
           },
		   {
            title: '账务系统对账状态',
            align:"center",
            dataIndex: 'bankchkflag'
           },
		   {
            title: '对账类型',
            align:"center",
            dataIndex: 'chkaccttype'
           },
		   {
            title: '对账日期',
            align:"center",
            dataIndex: 'chkdate'
           },
		   {
            title: '对账批次',
            align:"center",
            dataIndex: 'chkacctord'
           },
		   {
            title: '对账状态',
            align:"center",
            dataIndex: 'chkflag'
           },
		   {
            title: '撤销标志',
            align:"center",
            dataIndex: 'backflag'
           },
		   {
            title: '撤销流水号',
            align:"center",
            dataIndex: 'backno'
           },
		   {
            title: '撤销日期',
            align:"center",
            dataIndex: 'backdate'
           },
		   {
            title: '撤销原因',
            align:"center",
            dataIndex: 'backreason'
           },
		   {
            title: '冲正标志',
            align:"center",
            dataIndex: 'revflag'
           },
		   {
            title: '冲正申请序号',
            align:"center",
            dataIndex: 'cancelno'
           },
		   {
            title: '冲正原因',
            align:"center",
            dataIndex: 'cancelreason'
           },
		   {
            title: 'MQID',
            align:"center",
            dataIndex: 'mqid'
           },
		   {
            title: '打印次数',
            align:"center",
            dataIndex: 'printcnt'
           },
		   {
            title: '数据来源',
            align:"center",
            dataIndex: 'datasource'
           },
		   {
            title: '对账处理标志',
            align:"center",
            dataIndex: 'dealflag'
           },
		   {
            title: '预留字段1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留字段2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留字段3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   /*{
            title: '加载时间',
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
          }*/
        ],
		url: {
          list: "/jyls/jyls/list",
          delete: "/jyls/jyls/delete",
          deleteBatch: "/jyls/jyls/deleteBatch",
          exportXlsUrl: "jyls/jyls/exportXls",
          importExcelUrl: "jyls/jyls/importExcel",
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