<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资产编号">
              <a-input placeholder="请输入资产编号" v-model="queryParam.capNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.dkAcName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="抵债贷款账号">
              <a-input placeholder="请输入抵债贷款账号" v-model="queryParam.dkAcNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('抵债资产与贷款关联登记簿')">导出</a-button>
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
        :scroll:="{x: 3450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dzzcydkgldjb-modal ref="modalForm" @ok="modalFormOk"></dzzcydkgldjb-modal>
  </a-card>
</template>

<script>
  import DzzcydkgldjbModal from './modules/DzzcydkgldjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DzzcydkgldjbList",
    mixins:[JeecgListMixin],
    components: {
      DzzcydkgldjbModal
    },
    data () {
      return {
        description: '抵债资产与贷款关联登记簿管理页面',
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
            title: '资产编号',
            align:"center",
            dataIndex: 'capNo'
           },
		   {
            title: '抵债贷款账号',
            align:"center",
            dataIndex: 'dkAcNo'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'dkAcName'
           },
		   {
            title: '本金',
            align:"center",
            dataIndex: 'amt1'
           },
		   {
            title: '表内利息',
            align:"center",
            dataIndex: 'amt2'
           },
		   {
            title: '表外利息',
            align:"center",
            dataIndex: 'amt3'
           },
		   {
            title: '抵债类型',
            align:"center",
            dataIndex: 'type'
           },
		   {
            title: '冲本金',
            align:"center",
            dataIndex: 'amt11'
           },
		   {
            title: '冲表内利息',
            align:"center",
            dataIndex: 'amt22'
           },
		   {
            title: '冲表外利息',
            align:"center",
            dataIndex: 'amt33'
           },
		   {
            title: '冲减合计',
            align:"center",
            dataIndex: 'sumAmt'
           },
		   {
            title: '待定',
            align:"center",
            dataIndex: 'devAmt'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '利息',
            align:"center",
            dataIndex: 'accrual'
           },
		   {
            title: '还贷方式',
            align:"center",
            dataIndex: 'payType'
           },
		   {
            title: '付款指令号',
            align:"center",
            dataIndex: 'payNo'
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
          list: "/dzzcydkgldjb/dzzcydkgldjb/list",
          delete: "/dzzcydkgldjb/dzzcydkgldjb/delete",
          deleteBatch: "/dzzcydkgldjb/dzzcydkgldjb/deleteBatch",
          exportXlsUrl: "dzzcydkgldjb/dzzcydkgldjb/exportXls",
          importExcelUrl: "dzzcydkgldjb/dzzcydkgldjb/importExcel",
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