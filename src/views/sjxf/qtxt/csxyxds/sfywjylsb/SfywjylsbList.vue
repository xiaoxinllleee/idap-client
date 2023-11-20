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
            <a-form-item label="对账标志">
              <a-input placeholder="请输入对账标志" v-model="queryParam.chkflag"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行账号">
              <a-input placeholder="请输入银行账号" v-model="queryParam.accountno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="入账账号（分录账号）">
              <a-input placeholder="请输入入账账号（分录账号）" v-model="queryParam.flzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="智能卡号">
              <a-input placeholder="请输入智能卡号" v-model="queryParam.znkh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户编号">
              <a-input placeholder="请输入用户编号" v-model="queryParam.yhbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户姓名">
              <a-input placeholder="请输入用户姓名" v-model="queryParam.yhxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜面交易代码">
              <a-input placeholder="请输入柜面交易代码" v-model="queryParam.gmTrxcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核心交易代码">
              <a-input placeholder="请输入核心交易代码" v-model="queryParam.hxTrxcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="电视交易代码">
              <a-input placeholder="请输入电视交易代码" v-model="queryParam.tvTrxcode"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('长沙县有线电视收费业务交易流水表')">导出</a-button>

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
    <sfywjylsb-modal ref="modalForm" @ok="modalFormOk"></sfywjylsb-modal>
  </a-card>
</template>

<script>
  import SfywjylsbModal from './modules/SfywjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "SfywjylsbList",
    mixins:[JeecgListMixin],
    components: {
      SfywjylsbModal
    },
    data () {
      return {
        description: '长沙县有线电视收费业务交易流水表管理页面',
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
            title: '电视交易代码',
            align:"center",
            dataIndex: 'tvTrxcode'
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
            title: '入账账号（分录账号）',
            align:"center",
            dataIndex: 'flzh'
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
            title: '智能卡号',
            align:"center",
            dataIndex: 'znkh'
           },
		   {
            title: '套餐编号',
            align:"center",
            dataIndex: 'tcbh'
           },
		   {
            title: '套餐单价',
            align:"center",
            dataIndex: 'tcdj'
           },
		   {
            title: '计价单位',
            align:"center",
            dataIndex: 'jjdw'
           },
		   {
            title: '购买单元',
            align:"center",
            dataIndex: 'gmdy'
           },
		   {
            title: '续费金额',
            align:"center",
            dataIndex: 'xfje'
           },
		   {
            title: '欠费额度',
            align:"center",
            dataIndex: 'qfed'
           },
		   {
            title: '用户编号',
            align:"center",
            dataIndex: 'yhbh'
           },
		   {
            title: '用户姓名',
            align:"center",
            dataIndex: 'yhxm'
           },
		   {
            title: '用户地址',
            align:"center",
            dataIndex: 'yhdz'
           },
		   {
            title: '原交易上核心流水号',
            align:"center",
            dataIndex: 'orifhostno'
           },
		   {
            title: '自动冲正标志：',
            align:"center",
            dataIndex: 'zdcz'
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
            title: '核心交易流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '渠道流水',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '核心返回日期',
            align:"center",
            dataIndex: 'hostdate'
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
		 /*  {
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
          list: "/sfywjylsb/sfywjylsb/list",
          delete: "/sfywjylsb/sfywjylsb/delete",
          deleteBatch: "/sfywjylsb/sfywjylsb/deleteBatch",
          exportXlsUrl: "sfywjylsb/sfywjylsb/exportXls",
          importExcelUrl: "sfywjylsb/sfywjylsb/importExcel",
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