<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.tranCode"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="查询代号">
              <a-input placeholder="请输入助记码" v-model="queryParam.enqCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜员级别">
              <a-input placeholder="请输入现金总额" v-model="queryParam.txCap"></a-input>
            </a-form-item>
          </a-col>


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
             <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('交易参数表2')">导出</a-button>
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

<!--        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jycsb2-modal ref="modalForm" @ok="modalFormOk"></jycsb2-modal>
  </a-card>
</template>

<script>
  import Jycsb2Modal from './modules/Jycsb2Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "Jycsb2List",
    mixins:[JeecgListMixin],
    components: {
      Jycsb2Modal
    },
    data () {
      return {
        description: '交易参数表2管理页面',
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
            title: '银行号',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'tranCode'
           },
		   {
            title: '助记码',
            align:"center",
            dataIndex: 'mnemonic'
           },
		   {
            title: '现金总额',
            align:"center",
            dataIndex: 'cashTots'
           },
		   {
            title: '状态汇总',
            align:"center",
            dataIndex: 'stTots'
           },
		   {
            title: '查询代号',
            align:"center",
            dataIndex: 'enqCode'
           },
		   {
            title: '分类码代号',
            align:"center",
            dataIndex: 'ledgerCode'
           },
		   {
            title: '柜员级别',
            align:"center",
            dataIndex: 'txCap'
           },
		   {
            title: '交易描述',
            align:"center",
            dataIndex: 'txDesc'
           },
		   {
            title: '费用矩阵',
            align:"center",
            dataIndex: 'feeMask'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '多货币统计',
            align:"center",
            dataIndex: 'mcurrStTots'
           },
		   {
            title: '本交易内部分行统计第一网点',
            align:"center",
            dataIndex: 'ibStTots'
           },
		   {
            title: '多货币内部分行统计',
            align:"center",
            dataIndex: 'mcIbStTots'
           },
		   {
            title: '有关本交易对应要求标识',
            align:"center",
            dataIndex: 'correspondenceReq'
           },
		   {
            title: '过账层级',
            align:"center",
            dataIndex: 'postingLevel'
           },
		   {
            title: 'CGL组件1',
            align:"center",
            dataIndex: 'cglComponent1Sb'
           },
		   {
            title: 'CGL组件2',
            align:"center",
            dataIndex: 'cglComponent2Sb'
           },
		   {
            title: '记账标识',
            align:"center",
            dataIndex: 'cglPostingIndSb'
           },
		   {
            title: 'CGL组件1',
            align:"center",
            dataIndex: 'cglComponent1Cc'
           },
		   {
            title: 'CGL组件2',
            align:"center",
            dataIndex: 'cglComponent2Cc'
           },
		   {
            title: '记账标识',
            align:"center",
            dataIndex: 'cglPostingIndCc'
           },
		   {
            title: 'CGL组件1',
            align:"center",
            dataIndex: 'cglComponent1Ib'
           },
		   {
            title: 'CGL组件2',
            align:"center",
            dataIndex: 'cglComponent2Ib'
           },
		   {
            title: '记账标识',
            align:"center",
            dataIndex: 'cglPostingIndIb'
           },
		   {
            title: '限制指示器',
            align:"center",
            dataIndex: 'cglQualifier'
           },
		   {
            title: '逆转符号',
            align:"center",
            dataIndex: 'cglSignReversal'
           },
		   {
            title: '报表解释序列号',
            align:"center",
            dataIndex: 'tcnarrSeqNo'
           },
		   {
            title: '报表解释交易类型',
            align:"center",
            dataIndex: 'narrTxtType'
           },
		   {
            title: '还款优先级',
            align:"center",
            dataIndex: 'priorityCode'
           },
		   {
            title: '夜间允许标志',
            align:"center",
            dataIndex: 'nightEnable'
           },
		   {
            title: 'OFFSITE_BRH_FLG',
            align:"center",
            dataIndex: 'offsiteBrhFlg'
           },
		   {
            title: '是否允许跨机构交易',
            align:"center",
            dataIndex: 'ibAllowedFlag'
           },
		   {
            title: 'SUPR_OVERRIDE_FLG',
            align:"center",
            dataIndex: 'suprOverrideFlg'
           },
		   {
            title: '凭证打印标志',
            align:"center",
            dataIndex: 'voucherReqInd'
           },
		   {
            title: '凭证格式1',
            align:"center",
            dataIndex: 'voucherForm1'
           },
		   {
            title: '凭证格式2',
            align:"center",
            dataIndex: 'voucherForm2'
           },
		   {
            title: '凭证输出代码',
            align:"center",
            dataIndex: 'vchrOutputCode'
           },
		   {
            title: '刷新标识',
            align:"center",
            dataIndex: 'refreshMask'
           },
		   {
            title: '交易描述的记忆码',
            align:"center",
            dataIndex: 'longMnemonic'
           },
		   {
            title: '跨机构标志',
            align:"center",
            dataIndex: 'interBranch'
           },
		   {
            title: '授权类型',
            align:"center",
            dataIndex: 'overriderType'
           },
		   {
            title: '交易金额限制标志',
            align:"center",
            dataIndex: 'txnAmtLimitInd'
           },
		   {
            title: '限制金额',
            align:"center",
            dataIndex: 'txnLimitAmt'
           },
		   {
            title: 'CARD_NO_REQD',
            align:"center",
            dataIndex: 'cardNoReqd'
           },
		   {
            title: '费用矩阵',
            align:"center",
            dataIndex: 'feeMatrix'
           },
		   {
            title: '自动/半自动收费标志',
            align:"center",
            dataIndex: 'autoInd'
           },
		   {
            title: '现金收费的账号',
            align:"center",
            dataIndex: 'semiCashBglacct'
           },
		   {
            title: 'FEE_SUBMOD',
            align:"center",
            dataIndex: 'feeSubmod'
           },
		   {
            title: '反洗钱标志',
            align:"center",
            dataIndex: 'amlFlag'
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
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
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
          list: "/jycsb2/jycsb2/list",
          delete: "/jycsb2/jycsb2/delete",
          deleteBatch: "/jycsb2/jycsb2/deleteBatch",
          exportXlsUrl: "jycsb2/jycsb2/exportXls",
          importExcelUrl: "jycsb2/jycsb2/importExcel",
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