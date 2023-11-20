<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易对手编号">
              <a-input placeholder="请输入交易对手编号" v-model="queryParam.ctpyNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="版本号">
              <a-input placeholder="请输入版本号" v-model="queryParam.version"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资金账户户名">
              <a-input placeholder="请输入资金账户户名" v-model="queryParam.accountName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资金账号">
              <a-input placeholder="请输入资金账号" v-model="queryParam.bankAcno"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门号">
              <a-input placeholder="请输入部门号" v-model="queryParam.depNo"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('交易对手个性化信息表')">导出</a-button>
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
    <jydsgxhxxb-modal ref="modalForm" @ok="modalFormOk"></jydsgxhxxb-modal>
  </a-card>
</template>

<script>
  import JydsgxhxxbModal from './modules/JydsgxhxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "JydsgxhxxbList",
    mixins:[JeecgListMixin],
    components: {
      JydsgxhxxbModal
    },
    data () {
      return {
        description: '交易对手个性化信息表管理页面',
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
            title: '交易对手编号',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '版本号',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'businessType'
           },
		   {
            title: '资金账户户名',
            align:"center",
            dataIndex: 'accountName'
           },
		   {
            title: '资金开户行名',
            align:"center",
            dataIndex: 'bankName'
           },
		   {
            title: '资金账号',
            align:"center",
            dataIndex: 'bankAcno'
           },
		   {
            title: '支付系统行号',
            align:"center",
            dataIndex: 'bankNo'
           },
		   {
            title: '电话',
            align:"center",
            dataIndex: 'telecd'
           },
		   {
            title: '传真',
            align:"center",
            dataIndex: 'faxitl'
           },
		   {
            title: '投资限额(元)',
            align:"center",
            dataIndex: 'cptyAmt'
           },
		   {
            title: '投资比例(%)',
            align:"center",
            dataIndex: 'cptyRatio'
           },
		   {
            title: '内部风险评级',
            align:"center",
            dataIndex: 'cptyLevel'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '资金账户类型',
            align:"center",
            dataIndex: 'acnoType'
           },
		   {
            title: '维护方账务机构',
            align:"center",
            dataIndex: 'dcBrNo'
           },
		   {
            title: '交易对手个性信息编号',
            align:"center",
            dataIndex: 'subCtpyNo'
           },
		   {
            title: '对手方账务机构',
            align:"center",
            dataIndex: 'dsdcBrNo'
           },
		   {
            title: '对手部门号',
            align:"center",
            dataIndex: 'dsDepNo'
           },
		   {
            title: '部门号',
            align:"center",
            dataIndex: 'depNo'
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
		  /* {
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
          list: "/jydsgxhxxb/jydsgxhxxb/list",
          delete: "/jydsgxhxxb/jydsgxhxxb/delete",
          deleteBatch: "/jydsgxhxxb/jydsgxhxxb/deleteBatch",
          exportXlsUrl: "jydsgxhxxb/jydsgxhxxb/exportXls",
          importExcelUrl: "jydsgxhxxb/jydsgxhxxb/importExcel",
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