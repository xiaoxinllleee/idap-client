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
            <a-form-item label="视友号">
              <a-input placeholder="请输入视友号" v-model="queryParam.uucode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应服务账号">
              <a-input placeholder="请输入对应服务账号" v-model="queryParam.serverno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户名称">
              <a-input placeholder="请输入用户名称" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户有效身份号">
              <a-input placeholder="请输入用户有效身份号" v-model="queryParam.idcard"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('湖南有限电视支付平台交易流水表')">导出</a-button>
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
    <hnyxdszfptjylsb-modal ref="modalForm" @ok="modalFormOk"></hnyxdszfptjylsb-modal>
  </a-card>
</template>

<script>
  import HnyxdszfptjylsbModal from './modules/HnyxdszfptjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "HnyxdszfptjylsbList",
    mixins:[JeecgListMixin],
    components: {
      HnyxdszfptjylsbModal
    },
    data () {
      return {
        description: '湖南有限电视支付平台交易流水表管理页面',
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
            dataIndex: 'transtime'
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
            title: '上电视流水号',
            align:"center",
            dataIndex: 'tvSerialno'
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
            title: '视友号',
            align:"center",
            dataIndex: 'uucode'
           },
		   {
            title: '对应服务账号',
            align:"center",
            dataIndex: 'serverno'
           },
		   {
            title: '用户名称',
            align:"center",
            dataIndex: 'username'
           },
		   {
            title: '用户有效身份号',
            align:"center",
            dataIndex: 'idcard'
           },
		   {
            title: '交易发起方',
            align:"center",
            dataIndex: 'transorig'
           },
		   {
            title: '交易落地方',
            align:"center",
            dataIndex: 'transhome'
           },
		   {
            title: '服务提供商编码',
            align:"center",
            dataIndex: 'providercode'
           },
		   {
            title: '服务编码',
            align:"center",
            dataIndex: 'servicecode'
           },
		   {
            title: '电视方响应码',
            align:"center",
            dataIndex: 'tvRspcode'
           },
		   {
            title: '电视方响应信息',
            align:"center",
            dataIndex: 'tvRspmsg'
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
            title: '备注3',
            align:"center",
            dataIndex: 'remark3'
           },
		   {
            title: '备注4',
            align:"center",
            dataIndex: 'remark4'
           },
		   {
            title: '电视方交易码',
            align:"center",
            dataIndex: 'tvTranscode'
           },
		   {
            title: '报文版本号',
            align:"center",
            dataIndex: 'transversion'
           },
		   {
            title: '账号类型：',
            align:"center",
            dataIndex: 'noType'
           },
		   {
            title: '自动冲正标志：',
            align:"center",
            dataIndex: 'czbz'
           },
		   {
            title: '核心交易流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '渠道流水',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '渠道日期',
            align:"center",
            dataIndex: 'chnlseqno'
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
		  /* {
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
          list: "/hnyxdszfptjylsb/hnyxdszfptjylsb/list",
          delete: "/hnyxdszfptjylsb/hnyxdszfptjylsb/delete",
          deleteBatch: "/hnyxdszfptjylsb/hnyxdszfptjylsb/deleteBatch",
          exportXlsUrl: "hnyxdszfptjylsb/hnyxdszfptjylsb/exportXls",
          importExcelUrl: "hnyxdszfptjylsb/hnyxdszfptjylsb/importExcel",
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