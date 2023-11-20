<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易流水号">
              <a-input placeholder="请输入交易流水号" v-model="queryParam.serialno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户编号">
              <a-input placeholder="请输入用户编号" v-model="queryParam.userNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户名称">
              <a-input placeholder="请输入用户名称" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行账号">
              <a-input placeholder="请输入银行账号" v-model="queryParam.accountno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行卡号">
              <a-input placeholder="请输入银行卡号" v-model="queryParam.cardno"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('水费代收业务交易流水表')">导出</a-button>
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
    <sfdsywjylsb-modal ref="modalForm" @ok="modalFormOk"></sfdsywjylsb-modal>
  </a-card>
</template>

<script>
  import SfdsywjylsbModal from './modules/SfdsywjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "SfdsywjylsbList",
    mixins:[JeecgListMixin],
    components: {
      SfdsywjylsbModal
    },
    data () {
      return {
        description: '水费代收业务交易流水表管理页面',
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
            title: '交易日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '账务日期',
            align:"center",
            dataIndex: 'acctDate'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'serialno'
           },
		   {
            title: '上核心流水号',
            align:"center",
            dataIndex: 'hostserialno'
           },
		   {
            title: '前置交易代码',
            align:"center",
            dataIndex: 'qzTrxcode'
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
            title: '冲正标识',
            align:"center",
            dataIndex: 'czbz'
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
            title: '银行卡号',
            align:"center",
            dataIndex: 'cardno'
           },
		   {
            title: '用户编号',
            align:"center",
            dataIndex: 'userNo'
           },
		   {
            title: '用户名称',
            align:"center",
            dataIndex: 'username'
           },
		   {
            title: '用户地址',
            align:"center",
            dataIndex: 'useraddr'
           },
		   {
            title: '供水单位',
            align:"center",
            dataIndex: 'powerUnit'
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
            title: '货币号',
            align:"center",
            dataIndex: 'currcode'
           },
		   {
            title: '收据号码',
            align:"center",
            dataIndex: 'receiptNo'
           },
		   {
            title: '文件批次号',
            align:"center",
            dataIndex: 'fileBatchid'
           },
		   {
            title: '原交易日期',
            align:"center",
            dataIndex: 'origdate'
           },
		   {
            title: '原交易流水号',
            align:"center",
            dataIndex: 'origserialno'
           },
		   {
            title: '原交易上核心流水号',
            align:"center",
            dataIndex: 'orifhostno'
           },
		   {
            title: '备注1(开账日期)',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '备注2(接水点编号)',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '备注3(批扣每笔结果)',
            align:"center",
            dataIndex: 'remark3'
           },
		   {
            title: '备注4(账户名称)',
            align:"center",
            dataIndex: 'remark4'
           },
		   {
            title: '批扣序号',
            align:"center",
            dataIndex: 'serialNum'
           },
		   {
            title: '核心返回流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '柜面流水号',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '柜面日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '核心日期',
            align:"center",
            dataIndex: 'hostdate'
           },
		   {
            title: '账户序号',
            align:"center",
            dataIndex: 'zhxh'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '导入日期',
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
          list: "/sfdsywjylsb/sfdsywjylsb/list",
          delete: "/sfdsywjylsb/sfdsywjylsb/delete",
          deleteBatch: "/sfdsywjylsb/sfdsywjylsb/deleteBatch",
          exportXlsUrl: "sfdsywjylsb/sfdsywjylsb/exportXls",
          importExcelUrl: "sfdsywjylsb/sfdsywjylsb/importExcel",
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