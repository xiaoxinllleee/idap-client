<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="前置流水号">
              <a-input placeholder="请输入前置流水号" v-model="queryParam.txSeqNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="行号">
              <a-input placeholder="请输入行号" v-model="queryParam.bankNo"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="行名">
              <a-input placeholder="请输入行名" v-model="queryParam.bankName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.acctName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.certCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.state"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('国库集中支付批量账务明细表')">导出</a-button>

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
        :scroll="{x:3450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <gkjzzfplcwmxb-modal ref="modalForm" @ok="modalFormOk"></gkjzzfplcwmxb-modal>
  </a-card>
</template>

<script>
  import GkjzzfplcwmxbModal from './modules/GkjzzfplcwmxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GkjzzfplcwmxbList",
    mixins:[JeecgListMixin],
    components: {
      GkjzzfplcwmxbModal
    },
    data () {
      return {
        description: '国库集中支付批量账务明细表管理页面',
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
            dataIndex: 'txDate'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'txTime'
           },
		   {
            title: '前置流水号',
            align:"center",
            dataIndex: 'txSeqNo'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'serialNo'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '行号',
            align:"center",
            dataIndex: 'bankNo'
           },
		   {
            title: '行名',
            align:"center",
            dataIndex: 'bankName'
           },
		   {
            title: '账号类型',
            align:"center",
            dataIndex: 'acctType'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'acctName'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'certType'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'certCode'
           },
		   {
            title: '企业明细流水号',
            align:"center",
            dataIndex: 'listSeqNo'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'txAmt'
           },
		   {
            title: '摘要码',
            align:"center",
            dataIndex: 'rmrkCode'
           },
		   {
            title: '摘要说明',
            align:"center",
            dataIndex: 'rmrk'
           },
		   {
            title: '实际交易成功金额',
            align:"center",
            dataIndex: 'succAmt'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'state'
           },
		   {
            title: '出错码',
            align:"center",
            dataIndex: 'errCode'
           },
		   {
            title: '出错信息',
            align:"center",
            dataIndex: 'errMsg'
           },
		   {
            title: '核心账务日期',
            align:"center",
            dataIndex: 'hostDate'
           },
		   {
            title: '核心流水号',
            align:"center",
            dataIndex: 'hostSeqNo'
           },
		   {
            title: '自定义自段1',
            align:"center",
            dataIndex: 'usrDefine1'
           },
		   {
            title: '自定义自段2',
            align:"center",
            dataIndex: 'usrDefine2'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '导入日期',
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
          list: "/gkjzzfplcwmxb/gkjzzfplcwmxb/list",
          delete: "/gkjzzfplcwmxb/gkjzzfplcwmxb/delete",
          deleteBatch: "/gkjzzfplcwmxb/gkjzzfplcwmxb/deleteBatch",
          exportXlsUrl: "gkjzzfplcwmxb/gkjzzfplcwmxb/exportXls",
          importExcelUrl: "gkjzzfplcwmxb/gkjzzfplcwmxb/importExcel",
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