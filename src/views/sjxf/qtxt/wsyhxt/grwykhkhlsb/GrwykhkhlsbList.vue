<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
              <a-input placeholder="请输入开户机构号" v-model="queryParam.ppfOpennode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="个人客户号">
              <a-input placeholder="请输入个人客户号" v-model="queryParam.ppfCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易代码">
              <a-input placeholder="请输入交易代码" v-model="queryParam.ppfBsncode"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款账号">
              <a-input placeholder="请输入付款账号" v-model="queryParam.ppfPayacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款行">
              <a-input placeholder="请输入付款行" v-model="queryParam.ppfPaybank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款账号">
              <a-input placeholder="请输入收款账号" v-model="queryParam.ppfRcvacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方户名">
              <a-input placeholder="请输入收款方户名" v-model="queryParam.ppfRcvname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款行">
              <a-input placeholder="请输入收款行" v-model="queryParam.ppfRcvbank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-input placeholder="请输入交易状态" v-model="queryParam.ppfStt"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人网银跨行快汇流水表')">导出</a-button>

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
    <grwykhkhlsb-modal ref="modalForm" @ok="modalFormOk"></grwykhkhlsb-modal>
  </a-card>
</template>

<script>
  import GrwykhkhlsbModal from './modules/GrwykhkhlsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GrwykhkhlsbList",
    mixins:[JeecgListMixin],
    components: {
      GrwykhkhlsbModal
    },
    data () {
      return {
        description: '个人网银跨行快汇流水表管理页面',
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
            dataIndex: 'ppfOpennode'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'ppfFlowno'
           },
		   {
            title: '个人客户号',
            align:"center",
            dataIndex: 'ppfCstno'
           },
		   {
            title: '交易代码',
            align:"center",
            dataIndex: 'ppfBsncode'
           },
		   {
            title: '付款账号',
            align:"center",
            dataIndex: 'ppfPayacc'
           },
		   {
            title: '付款行',
            align:"center",
            dataIndex: 'ppfPaybank'
           },
		   {
            title: '收款账号',
            align:"center",
            dataIndex: 'ppfRcvacc'
           },
		   {
            title: '收款方户名',
            align:"center",
            dataIndex: 'ppfRcvname'
           },
		   {
            title: '收款行',
            align:"center",
            dataIndex: 'ppfRcvbank'
           },
		   {
            title: '提交时间',
            align:"center",
            dataIndex: 'ppfSubtime'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'ppfTranamt'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'ppfStt'
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
          list: "/grwykhkhlsb/grwykhkhlsb/list",
          delete: "/grwykhkhlsb/grwykhkhlsb/delete",
          deleteBatch: "/grwykhkhlsb/grwykhkhlsb/deleteBatch",
          exportXlsUrl: "grwykhkhlsb/grwykhkhlsb/exportXls",
          importExcelUrl: "grwykhkhlsb/grwykhkhlsb/importExcel",
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