<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银客户号">
              <a-input placeholder="请输入网银客户号" v-model="queryParam.trfCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转账类型">
              <a-input placeholder="请输入转账类型" v-model="queryParam.trfTrantype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="渠道标志注释">
              <a-input placeholder="请输入渠道标志注释" v-model="queryParam.trfChannelflag"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方账号开户行(账户下挂机构)">
              <a-input placeholder="请输入付款方账号开户行(账户下挂机构)" v-model="queryParam.trfPayaccOpennode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方账号">
              <a-input placeholder="请输入付款方账号" v-model="queryParam.trfPayacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方户名">
              <a-input placeholder="请输入付款方户名" v-model="queryParam.trfPayname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方开户行">
              <a-input placeholder="请输入收款方开户行" v-model="queryParam.trfRcvbank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方账号">
              <a-input placeholder="请输入收款方账号" v-model="queryParam.trfRcvacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方户名">
              <a-input placeholder="请输入收款方户名" v-model="queryParam.trfRcvname"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人客户交易流水信息(当天查证)')">导出</a-button>

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
        :scroll="{x:2450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <grkhjylsxx-modal ref="modalForm" @ok="modalFormOk"></grkhjylsxx-modal>
  </a-card>
</template>

<script>
  import GrkhjylsxxModal from './modules/GrkhjylsxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GrkhjylsxxList",
    mixins:[JeecgListMixin],
    components: {
      GrkhjylsxxModal
    },
    data () {
      return {
        description: '个人客户交易流水信息(当天查证)管理页面',
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
            dataIndex: 'trfFlowno'
           },
		   {
            title: '批次号',
            align:"center",
            dataIndex: 'trfBatno'
           },
		   {
            title: '网银客户号',
            align:"center",
            dataIndex: 'trfCstno'
           },
		   {
            title: '转账类型',
            align:"center",
            dataIndex: 'trfTrantype'
           },
		   {
            title: '渠道标志注释',
            align:"center",
            dataIndex: 'trfChannelflag'
           },
		   {
            title: '用户提交时间',
            align:"center",
            dataIndex: 'trfSubtime'
           },
		   {
            title: '查证更新时间',
            align:"center",
            dataIndex: 'trfUpdatetime'
           },
		   {
            title: '付款方账号开户行(账户下挂机构)',
            align:"center",
            dataIndex: 'trfPayaccOpennode'
           },
		   {
            title: '付款方账号',
            align:"center",
            dataIndex: 'trfPayacc'
           },
		   {
            title: '付款方户名',
            align:"center",
            dataIndex: 'trfPayname'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'trfTranamt'
           },
		   {
            title: '收款方开户行',
            align:"center",
            dataIndex: 'trfRcvbank'
           },
		   {
            title: '收款方账号',
            align:"center",
            dataIndex: 'trfRcvacc'
           },
		   {
            title: '收款方户名',
            align:"center",
            dataIndex: 'trfRcvname'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'trfFee2'
           },
		   {
            title: '指令状态',
            align:"center",
            dataIndex: 'trfStt'
           },
		   {
            title: '付款方账号开户行',
            align:"center",
            dataIndex: 'trfOpennode'
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
          list: "/grkhjylsxx/grkhjylsxx/list",
          delete: "/grkhjylsxx/grkhjylsxx/delete",
          deleteBatch: "/grkhjylsxx/grkhjylsxx/deleteBatch",
          exportXlsUrl: "grkhjylsxx/grkhjylsxx/exportXls",
          importExcelUrl: "grkhjylsxx/grkhjylsxx/importExcel",
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