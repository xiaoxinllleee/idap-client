<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户编码">
              <a-input placeholder="请输入商户编码" v-model="queryParam.bptMercode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="订单号">
              <a-input placeholder="请输入订单号" v-model="queryParam.bptOrderno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款账号">
              <a-input placeholder="请输入付款账号" v-model="queryParam.bptPayaccno"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-input placeholder="请输入交易状态" v-model="queryParam.bptStt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收货人姓名">
              <a-input placeholder="请输入收货人姓名" v-model="queryParam.bptRecname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="订单提交人姓名">
              <a-input placeholder="请输入订单提交人姓名" v-model="queryParam.bptSubname"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人网银支付流水表')">导出</a-button>

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
    <grwyzflsb-modal ref="modalForm" @ok="modalFormOk"></grwyzflsb-modal>
  </a-card>
</template>

<script>
  import GrwyzflsbModal from './modules/GrwyzflsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GrwyzflsbList",
    mixins:[JeecgListMixin],
    components: {
      GrwyzflsbModal
    },
    data () {
      return {
        description: '个人网银支付流水表管理页面',
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
            title: '流水号',
            align:"center",
            dataIndex: 'bptFlowno'
           },
		   {
            title: '商户编码',
            align:"center",
            dataIndex: 'bptMercode'
           },
		   {
            title: '订单号',
            align:"center",
            dataIndex: 'bptOrderno'
           },
		   {
            title: '订单金额',
            align:"center",
            dataIndex: 'bptOrderamt'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'bptTranfee'
           },
		   {
            title: '付款账号',
            align:"center",
            dataIndex: 'bptPayaccno'
           },
		   {
            title: '订单状态',
            align:"center",
            dataIndex: 'bptOrderstt'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'bptStt'
           },
		   {
            title: '订单提交日期',
            align:"center",
            dataIndex: 'bptOrderdate'
           },
		   {
            title: '收货人姓名',
            align:"center",
            dataIndex: 'bptRecname'
           },
		   {
            title: '订单提交人姓名',
            align:"center",
            dataIndex: 'bptSubname'
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
          list: "/grwyzflsb/grwyzflsb/list",
          delete: "/grwyzflsb/grwyzflsb/delete",
          deleteBatch: "/grwyzflsb/grwyzflsb/deleteBatch",
          exportXlsUrl: "grwyzflsb/grwyzflsb/exportXls",
          importExcelUrl: "grwyzflsb/grwyzflsb/importExcel",
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