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
            <a-form-item label="上核心流水号">
              <a-input placeholder="请输入上核心流水号" v-model="queryParam.hostserialno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易终态状态">
              <a-input placeholder="请输入交易终态状态" v-model="queryParam.tradestatus"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户账号">
              <a-input placeholder="请输入客户账号" v-model="queryParam.khzh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户身份证号码">
              <a-input placeholder="请输入客户身份证号码" v-model="queryParam.khsfz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="直补种类编码">
              <a-input placeholder="请输入直补种类编码" v-model="queryParam.zbzlbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="直补种类名称">
              <a-input placeholder="请输入直补种类名称" v-model="queryParam.zbzlmc"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('财政直补业务交易流水表')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

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
    <ywjylsb-modal ref="modalForm" @ok="modalFormOk"></ywjylsb-modal>
  </a-card>
</template>

<script>
  import YwjylsbModal from './modules/YwjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YwjylsbList",
    mixins:[JeecgListMixin],
    components: {
      YwjylsbModal
    },
    data () {
      return {
        description: '财政直补业务交易流水表管理页面',
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
            title: '财政方交易代码',
            align:"center",
            dataIndex: 'czTrxcode'
           },
		   {
            title: '柜面交易代码',
            align:"center",
            dataIndex: 'gmTrxcode'
           },
		   {
            title: '前置交易代码',
            align:"center",
            dataIndex: 'qzTrxcode'
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
            title: '核心返回码',
            align:"center",
            dataIndex: 'hostcode'
           },
		   {
            title: '交易信息',
            align:"center",
            dataIndex: 'errmsg'
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
            title: '文件批次号',
            align:"center",
            dataIndex: 'fileBatchid'
           },
		   {
            title: '县级行政区划编码',
            align:"center",
            dataIndex: 'xjxzqbm'
           },
		   {
            title: '直补个人编号',
            align:"center",
            dataIndex: 'zbgrbh'
           },
		   {
            title: '客户账号',
            align:"center",
            dataIndex: 'khzh'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '客户身份证号码',
            align:"center",
            dataIndex: 'khsfz'
           },
		   {
            title: '直补种类编码',
            align:"center",
            dataIndex: 'zbzlbm'
           },
		   {
            title: '直补种类名称',
            align:"center",
            dataIndex: 'zbzlmc'
           },
		   {
            title: '直补金额',
            align:"center",
            dataIndex: 'zbje'
           },
		   {
            title: '直补摘要',
            align:"center",
            dataIndex: 'zbzy'
           },
		   {
            title: '分录账号',
            align:"center",
            dataIndex: 'accountno'
           },
		   {
            title: '打印次数',
            align:"center",
            dataIndex: 'prtNum'
           },
		   {
            title: '货币号',
            align:"center",
            dataIndex: 'currcode'
           },
		   {
            title: '自动冲正标志',
            align:"center",
            dataIndex: 'zdcz'
           },
		   {
            title: '主办行',
            align:"center",
            dataIndex: 'zbhjgm'
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
            title: '核心返回流水号?',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '缴费人员顺序',
            align:"center",
            dataIndex: 'seqno'
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
          list: "/ywjylsb/ywjylsb/list",
          delete: "/ywjylsb/ywjylsb/delete",
          deleteBatch: "/ywjylsb/ywjylsb/deleteBatch",
          exportXlsUrl: "ywjylsb/ywjylsb/exportXls",
          importExcelUrl: "ywjylsb/ywjylsb/importExcel",
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