<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资产编号">
              <a-input placeholder="请输入资产编号" v-model="queryParam.assetNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <a-input placeholder="请输入所属机构" v-model="queryParam.brNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资产名称">
              <a-input placeholder="请输入资产名称" v-model="queryParam.assetName"></a-input>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="初分类操作员">
              <a-input placeholder="请输入初分类操作员" v-model="queryParam.frstSortTel"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('非信贷资产五级分类登记簿')">导出</a-button>
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
        :scroll="{x:5430}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <fxdzcwjfldjb-modal ref="modalForm" @ok="modalFormOk"></fxdzcwjfldjb-modal>
  </a-card>
</template>

<script>
  import FxdzcwjfldjbModal from './modules/FxdzcwjfldjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "FxdzcwjfldjbList",
    mixins:[JeecgListMixin],
    components: {
      FxdzcwjfldjbModal
    },
    data () {
      return {
        description: '非信贷资产五级分类登记簿管理页面',
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
            dataIndex: 'assetNo'
           },
		   {
            title: '资产名称',
            align:"center",
            dataIndex: 'assetName'
           },
		   {
            title: '所属机构',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '资产类型',
            align:"center",
            dataIndex: 'assetType'
           },
		   {
            title: '核算科目',
            align:"center",
            dataIndex: 'accNo'
           },
		   {
            title: '账面价值',
            align:"center",
            dataIndex: 'depBal'
           },
		   {
            title: '资产取得日期',
            align:"center",
            dataIndex: 'opnDate'
           },
		   {
            title: '分类时间',
            align:"center",
            dataIndex: 'sortDate'
           },
		   {
            title: '预计损失',
            align:"center",
            dataIndex: 'preLossBal'
           },
		   {
            title: '预计损失率',
            align:"center",
            dataIndex: 'preLossPer'
           },
		   {
            title: '背景资料',
            align:"center",
            dataIndex: 'backgroundInfo'
           },
		   {
            title: '风险因素分析',
            align:"center",
            dataIndex: 'riskFactorAly'
           },
		   {
            title: '损失测算',
            align:"center",
            dataIndex: 'lostTestDsp'
           },
		   {
            title: '初分意见',
            align:"center",
            dataIndex: 'firstSort'
           },
		   {
            title: '初分意见说明',
            align:"center",
            dataIndex: 'firstSortDisp'
           },
		   {
            title: '处置措施及管理办法',
            align:"center",
            dataIndex: 'handleDisp'
           },
		   {
            title: '初分类操作员',
            align:"center",
            dataIndex: 'frstSortTel'
           },
		   {
            title: '初分类日期',
            align:"center",
            dataIndex: 'firstSortDate'
           },
		   {
            title: '初审意见',
            align:"center",
            dataIndex: 'firstAppRs'
           },
		   {
            title: '初审认定结果',
            align:"center",
            dataIndex: 'firstAppDisp'
           },
		   {
            title: '初审操作员',
            align:"center",
            dataIndex: 'firstAppTel'
           },
		   {
            title: '初审日期',
            align:"center",
            dataIndex: 'firstAppDate'
           },
		   {
            title: '初始认定结果',
            align:"center",
            dataIndex: 'firstCfrmRs'
           },
		   {
            title: '初始认定结果说明',
            align:"center",
            dataIndex: 'firstCfrmDisp'
           },
		   {
            title: '初始认定人',
            align:"center",
            dataIndex: 'firstCfrmTel'
           },
		   {
            title: '初始认定日期',
            align:"center",
            dataIndex: 'firstCfrmDate'
           },
		   {
            title: '认定状态',
            align:"center",
            dataIndex: 'assetSts'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
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
          list: "/fxdzcwjfldjb/fxdzcwjfldjb/list",
          delete: "/fxdzcwjfldjb/fxdzcwjfldjb/delete",
          deleteBatch: "/fxdzcwjfldjb/fxdzcwjfldjb/deleteBatch",
          exportXlsUrl: "fxdzcwjfldjb/fxdzcwjfldjb/exportXls",
          importExcelUrl: "fxdzcwjfldjb/fxdzcwjfldjb/importExcel",
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