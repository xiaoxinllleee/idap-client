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
            <a-form-item label="监管单位账号">
              <a-input placeholder="请输入监管单位账号" v-model="queryParam.flzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卖方姓名">
              <a-input placeholder="请输入卖方姓名" v-model="queryParam.csfxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卖方证件号">
              <a-input placeholder="请输入卖方证件号" v-model="queryParam.csfzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="买方姓名">
              <a-input placeholder="请输入买方姓名" v-model="queryParam.zrfxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="买方证件号">
              <a-input placeholder="请输入买方证件号" v-model="queryParam.zrfzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜面交易代码">
              <a-input placeholder="请输入柜面交易代码" v-model="queryParam.gmTrxcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.zt"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('二手房交易记录表')">导出</a-button>
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
    <esfjyjlb-modal ref="modalForm" @ok="modalFormOk"></esfjyjlb-modal>
  </a-card>
</template>

<script>
  import EsfjyjlbModal from './modules/EsfjyjlbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "EsfjyjlbList",
    mixins:[JeecgListMixin],
    components: {
      EsfjyjlbModal
    },
    data () {
      return {
        description: '二手房交易记录表管理页面',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'acctDate'
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
            title: '卖方姓名',
            align:"center",
            dataIndex: 'csfxm'
           },
		   {
            title: '卖方证件号',
            align:"center",
            dataIndex: 'csfzjhm'
           },
		   {
            title: '买方姓名',
            align:"center",
            dataIndex: 'zrfxm'
           },
		   {
            title: '买方证件号',
            align:"center",
            dataIndex: 'zrfzjhm'
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
            title: '业务宗号',
            align:"center",
            dataIndex: 'ywzh'
           },
		   {
            title: '监管协议',
            align:"center",
            dataIndex: 'tgxy'
           },
		   {
            title: '监管金额',
            align:"center",
            dataIndex: 'tgje'
           },
		   {
            title: '到账通知',
            align:"center",
            dataIndex: 'dztz'
           },
		   {
            title: '撤销交易上核心流水号',
            align:"center",
            dataIndex: 'orifhostno'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '自动冲正标志',
            align:"center",
            dataIndex: 'zdcz'
           },
		   {
            title: '监管单位账号',
            align:"center",
            dataIndex: 'flzh'
           },
		   {
            title: '划款标志',
            align:"center",
            dataIndex: 'fkbz'
           },
		   {
            title: '阶段标志',
            align:"center",
            dataIndex: 'jdbz'
           },
		   {
            title: '县级编码 01长沙县',
            align:"center",
            dataIndex: 'xjbm'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'zt'
           },
		   {
            title: '标志',
            align:"center",
            dataIndex: 'flag'
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
            title: '核心流水号',
            align:"center",
            dataIndex: 'hostseqno'
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
            title: '原系统标识',
            align:"center",
            dataIndex: 'sourceId'
           },
		   {
            title: '加载类型',
            align:"center",
            dataIndex: 'loadType'
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
          list: "/esfjyjlb/esfjyjlb/list",
          delete: "/esfjyjlb/esfjyjlb/delete",
          deleteBatch: "/esfjyjlb/esfjyjlb/deleteBatch",
          exportXlsUrl: "esfjyjlb/esfjyjlb/exportXls",
          importExcelUrl: "esfjyjlb/esfjyjlb/importExcel",
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