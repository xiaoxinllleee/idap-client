<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="审批编号">
              <a-input placeholder="请输入审批编号" v-model="queryParam.appNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易单编号">
              <a-input placeholder="请输入交易单编号" v-model="queryParam.pactNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存出方账务部门">
              <a-input placeholder="请输入存出方账务部门" v-model="queryParam.outdcBrNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="品种编号">
              <a-input placeholder="请输入品种编号" v-model="queryParam.zjType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="财务流水号">
              <a-input placeholder="请输入财务流水号" v-model="queryParam.traceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="计划编号">
              <a-input placeholder="请输入计划编号" v-model="queryParam.planNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('约期存款登记簿')">导出</a-button>
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
    <yqckdjb-modal ref="modalForm" @ok="modalFormOk"></yqckdjb-modal>
  </a-card>
</template>

<script>
  import YqckdjbModal from './modules/YqckdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YqckdjbList",
    mixins:[JeecgListMixin],
    components: {
      YqckdjbModal
    },
    data () {
      return {
        description: '约期存款登记簿管理页面',
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
            title: '审批编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '交易单编号',
            align:"center",
            dataIndex: 'pactNo'
           },
		   {
            title: '交易明细笔次',
            align:"center",
            dataIndex: 'txCnt'
           },
		   {
            title: '存出部门',
            align:"center",
            dataIndex: 'outdepNo'
           },
		   {
            title: '存出联社',
            align:"center",
            dataIndex: 'outupBrNo'
           },
		   {
            title: '存出联社名称',
            align:"center",
            dataIndex: 'outupBrName'
           },
		   {
            title: '存入部门',
            align:"center",
            dataIndex: 'indepNo'
           },
		   {
            title: '存入联社',
            align:"center",
            dataIndex: 'inupBrNo'
           },
		   {
            title: '品种编号',
            align:"center",
            dataIndex: 'zjType'
           },
		   {
            title: '期限(天)',
            align:"center",
            dataIndex: 'term'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'icDate'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'mtrDate'
           },
		   {
            title: '存出方划款日期',
            align:"center",
            dataIndex: 'hkDate'
           },
		   {
            title: '存出方开户行行名',
            align:"center",
            dataIndex: 'outBankName'
           },
		   {
            title: '存出方核心账号',
            align:"center",
            dataIndex: 'outBankAcno'
           },
		   {
            title: '存入方开户行行名',
            align:"center",
            dataIndex: 'inBankName'
           },
		   {
            title: '存入方核心账号',
            align:"center",
            dataIndex: 'inBankAcno'
           },
		   {
            title: '存入方收款日期',
            align:"center",
            dataIndex: 'skDate'
           },
		   {
            title: '存出内部帐AC_NO',
            align:"center",
            dataIndex: 'outAcNo'
           },
		   {
            title: '存入内部帐AC_NO',
            align:"center",
            dataIndex: 'inAcNo'
           },
		   {
            title: '存出内部账AC_ID',
            align:"center",
            dataIndex: 'outAcId'
           },
		   {
            title: '存入内部账AC_ID',
            align:"center",
            dataIndex: 'inAcId'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'regDate'
           },
		   {
            title: '存出联社交易单寄发日期',
            align:"center",
            dataIndex: 'sendDate'
           },
		   {
            title: '存出联社收到回寄交易单日期',
            align:"center",
            dataIndex: 'getsendDate'
           },
		   {
            title: '存入联社交易单收到日期',
            align:"center",
            dataIndex: 'getDate'
           },
		   {
            title: '存入联社交易单回寄日期',
            align:"center",
            dataIndex: 'backDate'
           },
		   {
            title: '存出方状态',
            align:"center",
            dataIndex: 'outSts'
           },
		   {
            title: '转存后约期存款编号',
            align:"center",
            dataIndex: 'newAppNo'
           },
		   {
            title: '存出方业务编号',
            align:"center",
            dataIndex: 'outYwNo'
           },
		   {
            title: '计划编号',
            align:"center",
            dataIndex: 'planNo'
           },
		   {
            title: '计划日期',
            align:"center",
            dataIndex: 'chnlInd'
           },
		   {
            title: '财务流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '存出方账务部门',
            align:"center",
            dataIndex: 'outdcBrNo'
           },
		   {
            title: '存入方账务部门',
            align:"center",
            dataIndex: 'indcBrNo'
           },
		   {
            title: '存入方状态',
            align:"center",
            dataIndex: 'inSts'
           },
		   {
            title: '存入方业务编码',
            align:"center",
            dataIndex: 'inYwNo'
           },
		   {
            title: '清算速度',
            align:"center",
            dataIndex: 'qsSpeed'
           },
		   {
            title: '存入方经办人',
            align:"center",
            dataIndex: 'ctpyTrader'
           },
		   {
            title: '存出方经办人',
            align:"center",
            dataIndex: 'trader'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '存入方版本',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: '存入方个性化编号',
            align:"center",
            dataIndex: 'subCtpyNo'
           },
		   {
            title: '存入方个性化版本',
            align:"center",
            dataIndex: 'subVersion'
           },
		   {
            title: '存入方部门',
            align:"center",
            dataIndex: 'ctpyDepNo'
           },
		   {
            title: '存出方部门',
            align:"center",
            dataIndex: 'bctpyDepNo'
           },
		   {
            title: '存出方版本',
            align:"center",
            dataIndex: 'bversion'
           },
		   {
            title: '存出方个性化编号',
            align:"center",
            dataIndex: 'bsubCtpyNo'
           },
		   {
            title: '存出方编号',
            align:"center",
            dataIndex: 'bctpyNo'
           },
		   {
            title: '存入方编号',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '存出方个性化版本',
            align:"center",
            dataIndex: 'bsubVersion'
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
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
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
          list: "/yqckdjb/yqckdjb/list",
          delete: "/yqckdjb/yqckdjb/delete",
          deleteBatch: "/yqckdjb/yqckdjb/deleteBatch",
          exportXlsUrl: "yqckdjb/yqckdjb/exportXls",
          importExcelUrl: "yqckdjb/yqckdjb/importExcel",
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