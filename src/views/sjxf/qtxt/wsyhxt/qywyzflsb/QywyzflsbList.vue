<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银客户号">
              <a-input placeholder="请输入网银客户号" v-model="queryParam.bptMercode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转出账号">
              <a-input placeholder="请输入转出账号" v-model="queryParam.bptCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转出账号子账号">
              <a-input placeholder="请输入转出账号子账号" v-model="queryParam.bptOrderno"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转入账号">
              <a-input placeholder="请输入转入账号" v-model="queryParam.bptOrderamt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转入账号子账号">
              <a-input placeholder="请输入转入账号子账号" v-model="queryParam.bptTranfee"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户类型">
              <a-input placeholder="请输入账户类型" v-model="queryParam.bptPayaccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转出转入标志">
              <a-input placeholder="请输入转出转入标志" v-model="queryParam.bptOrderstt"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业网银支付流水表')">导出</a-button>

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

        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <qywyzflsb-modal ref="modalForm" @ok="modalFormOk"></qywyzflsb-modal>
  </a-card>
</template>

<script>
  import QywyzflsbModal from './modules/QywyzflsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QywyzflsbList",
    mixins:[JeecgListMixin],
    components: {
      QywyzflsbModal
    },
    data () {
      return {
        description: '企业网银支付流水表管理页面',
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
            title: '网银交易流水号',
            align:"center",
            dataIndex: 'bptFlowno'
           },
		   {
            title: '网银客户号',
            align:"center",
            dataIndex: 'bptMercode'
           },
		   {
            title: '转出账号',
            align:"center",
            dataIndex: 'bptCstno'
           },
		   {
            title: '转出账号子账号',
            align:"center",
            dataIndex: 'bptOrderno'
           },
		   {
            title: '转入账号',
            align:"center",
            dataIndex: 'bptOrderamt'
           },
		   {
            title: '转入账号子账号',
            align:"center",
            dataIndex: 'bptTranfee'
           },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'bptPayaccno'
           },
		   {
            title: '转出转入标志',
            align:"center",
            dataIndex: 'bptOrderstt'
           },
		   {
            title: '存期',
            align:"center",
            dataIndex: 'bptStt'
           },
		   {
            title: '是否自动转存',
            align:"center",
            dataIndex: 'bptOrderdate'
           },
		   {
            title: '通知日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '支取日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '用户提交时间',
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
          list: "/qywyzflsb/qywyzflsb/list",
          delete: "/qywyzflsb/qywyzflsb/delete",
          deleteBatch: "/qywyzflsb/qywyzflsb/deleteBatch",
          exportXlsUrl: "qywyzflsb/qywyzflsb/exportXls",
          importExcelUrl: "qywyzflsb/qywyzflsb/importExcel",
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