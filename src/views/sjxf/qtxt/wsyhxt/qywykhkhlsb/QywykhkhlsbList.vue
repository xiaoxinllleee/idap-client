<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
              <a-input placeholder="请输入开户机构号" v-model="queryParam.cifOpennode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="个人客户号">
              <a-input placeholder="请输入个人客户号" v-model="queryParam.cpfCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易代码">
              <a-input placeholder="请输入交易代码" v-model="queryParam.cpfBsncode"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款账号">
              <a-input placeholder="请输入付款账号" v-model="queryParam.cpfPayacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款行">
              <a-input placeholder="请输入付款行" v-model="queryParam.cpfPaybank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款账号">
              <a-input placeholder="请输入收款账号" v-model="queryParam.cpfRcvacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方户名">
              <a-input placeholder="请输入收款方户名" v-model="queryParam.cpfRcvname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款行">
              <a-input placeholder="请输入收款行" v-model="queryParam.cpfRcvbank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-input placeholder="请输入交易状态" v-model="queryParam.cpfStt"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业网银跨行快汇流水表')">导出</a-button>

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
    <qywykhkhlsb-modal ref="modalForm" @ok="modalFormOk"></qywykhkhlsb-modal>
  </a-card>
</template>

<script>
  import QywykhkhlsbModal from './modules/QywykhkhlsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QywykhkhlsbList",
    mixins:[JeecgListMixin],
    components: {
      QywykhkhlsbModal
    },
    data () {
      return {
        description: '企业网银跨行快汇流水表管理页面',
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
            title: '开户机构号',
            align:"center",
            dataIndex: 'cifOpennode'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'cpfFlowno'
           },
		   {
            title: '个人客户号',
            align:"center",
            dataIndex: 'cpfCstno'
           },
		   {
            title: '交易代码',
            align:"center",
            dataIndex: 'cpfBsncode'
           },
		   {
            title: '付款账号',
            align:"center",
            dataIndex: 'cpfPayacc'
           },
		   {
            title: '付款行',
            align:"center",
            dataIndex: 'cpfPaybank'
           },
		   {
            title: '收款账号',
            align:"center",
            dataIndex: 'cpfRcvacc'
           },
		   {
            title: '收款方户名',
            align:"center",
            dataIndex: 'cpfRcvname'
           },
		   {
            title: '收款行',
            align:"center",
            dataIndex: 'cpfRcvbank'
           },
		   {
            title: '提交时间',
            align:"center",
            dataIndex: 'cpfSubtime'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'cpfTranamt'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'cpfStt'
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
          list: "/qywykhkhlsb/qywykhkhlsb/list",
          delete: "/qywykhkhlsb/qywykhkhlsb/delete",
          deleteBatch: "/qywykhkhlsb/qywykhkhlsb/deleteBatch",
          exportXlsUrl: "qywykhkhlsb/qywykhkhlsb/exportXls",
          importExcelUrl: "qywykhkhlsb/qywykhkhlsb/importExcel",
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