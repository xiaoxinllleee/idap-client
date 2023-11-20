<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作机构代码">
              <a-input placeholder="请输入操作机构代码" v-model="queryParam.operbankno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员号">
              <a-input placeholder="请输入操作柜员号" v-model="queryParam.operno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行账号">
              <a-input placeholder="请输入银行账号" v-model="queryParam.accountno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="入账账号（分录账号）">
              <a-input placeholder="请输入入账账号（分录账号）" v-model="queryParam.flzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="购房人姓名">
              <a-input placeholder="请输入购房人姓名" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="房产收据编号">
              <a-input placeholder="请输入房产收据编号" v-model="queryParam.sjbh"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('维修基金自缴交易流水')">导出</a-button>

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
    <wxjjzjjyls-modal ref="modalForm" @ok="modalFormOk"></wxjjzjjyls-modal>
  </a-card>
</template>

<script>
  import WxjjzjjylsModal from './modules/WxjjzjjylsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "WxjjzjjylsList",
    mixins:[JeecgListMixin],
    components: {
      WxjjzjjylsModal
    },
    data () {
      return {
        description: '维修基金自缴交易流水管理页面',
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
            title: '前置日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'acctDate'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'serialno'
           },
		   {
            title: '上核心交易流水号',
            align:"center",
            dataIndex: 'hostserialno'
           },
		   {
            title: '柜面交易代码',
            align:"center",
            dataIndex: 'gmTrxcode'
           },
		   {
            title: '核心交易代码',
            align:"center",
            dataIndex: 'hxTrxcode'
           },
		   {
            title: '操作机构代码',
            align:"center",
            dataIndex: 'operbankno'
           },
		   {
            title: '操作柜员号',
            align:"center",
            dataIndex: 'operno'
           },
		   {
            title: '授权柜员号',
            align:"center",
            dataIndex: 'powerteller'
           },
		   {
            title: '对账标志',
            align:"center",
            dataIndex: 'chkflag'
           },
		   {
            title: '交易终态状态',
            align:"center",
            dataIndex: 'tradestatus'
           },
		   {
            title: '手续费账号',
            align:"center",
            dataIndex: 'feeaccount'
           },
		   {
            title: '手续费金额',
            align:"center",
            dataIndex: 'feeamount'
           },
		   {
            title: '缴费方式',
            align:"center",
            dataIndex: 'payflag'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'kzflag'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amount'
           },
		   {
            title: '银行账号',
            align:"center",
            dataIndex: 'accountno'
           },
		   {
            title: '资金ID',
            align:"center",
            dataIndex: 'zjid'
           },
		   {
            title: '货币号',
            align:"center",
            dataIndex: 'currcode'
           },
		   {
            title: '凭证种类',
            align:"center",
            dataIndex: 'prooftype'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'proofno'
           },
		   {
            title: '原交易上核心流水号',
            align:"center",
            dataIndex: 'orifhostno'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '备注1购房人证件号码',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '自动冲正标志',
            align:"center",
            dataIndex: 'zdcz'
           },
		   {
            title: '入账账号（分录账号）',
            align:"center",
            dataIndex: 'flzh'
           },
		   {
            title: '购房人姓名',
            align:"center",
            dataIndex: 'username'
           },
		   {
            title: '房产收据编号',
            align:"center",
            dataIndex: 'sjbh'
           },
		   {
            title: '核心流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '渠道流水号',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '核心日期',
            align:"center",
            dataIndex: 'hostdate'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   /*{
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
          list: "/wxjjzjjyls/wxjjzjjyls/list",
          delete: "/wxjjzjjyls/wxjjzjjyls/delete",
          deleteBatch: "/wxjjzjjyls/wxjjzjjyls/deleteBatch",
          exportXlsUrl: "wxjjzjjyls/wxjjzjjyls/exportXls",
          importExcelUrl: "wxjjzjjyls/wxjjzjjyls/importExcel",
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