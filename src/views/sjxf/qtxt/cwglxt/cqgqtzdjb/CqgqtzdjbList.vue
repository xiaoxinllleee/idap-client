<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="投资项目编号">
              <a-input placeholder="请输入投资项目编号" v-model="queryParam.objNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编码">
              <a-input placeholder="请输入业务编码" v-model="queryParam.ywNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="五级分类结果">
              <a-input placeholder="请输入五级分类结果" v-model="queryParam.lvlFive"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="投资对象名称">
              <a-input placeholder="请输入投资对象名称" v-model="queryParam.objName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员">
              <a-input placeholder="请输入操作员" v-model="queryParam.tel"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="财务流水号">
              <a-input placeholder="请输入财务流水号" v-model="queryParam.traceNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('长期股权投资登记簿')">导出</a-button>
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
        :scroll="{x:6430}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <cqgqtzdjb-modal ref="modalForm" @ok="modalFormOk"></cqgqtzdjb-modal>
  </a-card>
</template>

<script>
  import CqgqtzdjbModal from './modules/CqgqtzdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CqgqtzdjbList",
    mixins:[JeecgListMixin],
    components: {
      CqgqtzdjbModal
    },
    data () {
      return {
        description: '长期股权投资登记簿管理页面',
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
            title: '投资项目编号',
            align:"center",
            dataIndex: 'objNo'
           },
		   {
            title: '投资对象名称',
            align:"center",
            dataIndex: 'objName'
           },
		   {
            title: '投资对象企业性质',
            align:"center",
            dataIndex: 'objAttr'
           },
          {
            title: '投资对象经营场所',
            align:"center",
            dataIndex: 'objAddr'
           },
          {
            title: '投资对象法人名称',
            align:"center",
            dataIndex: 'objCorp'
           },
          {
            title: '投资对象是否上市',
            align:"center",
            dataIndex: 'isStock'
           },

		      {
            title: '投资对象股金总额',
            align:"center",
            dataIndex: 'stockAmt'
           },
          {
            title: '投资对象所有者权益账面价值',
            align:"center",
            dataIndex: 'objEarnAmt'
           },
          {
            title: '投资比例(%)',
            align:"center",
            dataIndex: 'investPro'
           },
          {
            title: '初始投资日期',
            align:"center",
            dataIndex: 'investSDate'
           },
          {
            title: '取得长期股权投资的方法',
            align:"center",
            dataIndex: 'gainWay'
           },
          {
            title: '对被投单位的影响',
            align:"center",
            dataIndex: 'infctLvl'
           },
          {
            title: '计量方法',
            align:"center",
            dataIndex: 'accMethod'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
          {
            title: '投资限制备注',
            align:"center",
            dataIndex: 'investRes'
           },
          {
            title: '投资对象组织机构代码证',
            align:"center",
            dataIndex: 'objBrNo'
           },

		   {
            title: '票面成本',
            align:"center",
            dataIndex: 'parAmt'
           },
		   {
            title: '应收股金',
            align:"center",
            dataIndex: 'stockIntst'
           },
		   {
            title: '实付金额',
            align:"center",
            dataIndex: 'realPayAmt'
           },
		   {
            title: '公允价值',
            align:"center",
            dataIndex: 'objFairValue'
           },
		   {
            title: '投资成本',
            align:"center",
            dataIndex: 'investCost'
           },
		   {
            title: '损益调整余额',
            align:"center",
            dataIndex: 'earnAdjust'
           },
		   {
            title: '其他权益变动余额',
            align:"center",
            dataIndex: 'oEarnAdj'
           },
		   {
            title: '股本溢价',
            align:"center",
            dataIndex: 'overCapital'
           },
		   {
            title: '任意盈余公积',
            align:"center",
            dataIndex: 'anySurplus'
           },
          {
            title: '法定盈余公积',
            align:"center",
            dataIndex: 'lawSurplus'
           },
          {
            title: '未非配利润',
            align:"center",
            dataIndex: 'unpayProfit'
           },
          {
            title: '其他应收款',
            align:"center",
            dataIndex: 'accRec'
           },
		   {
            title: '预计负债',
            align:"center",
            dataIndex: 'preDebt'
           },
		   {
            title: '公允价值变动',
            align:"center",
            dataIndex: 'fairValueChag'
           },
		   {
            title: '减值准备金额',
            align:"center",
            dataIndex: 'devalue'
           },
          {
            title: '减值损失金额',
            align:"center",
            dataIndex: 'devalueLoss'
           },
          {
            title: '处置原因',
            align:"center",
            dataIndex: 'dealReason'
           },
		   {
            title: '处置比例',
            align:"center",
            dataIndex: 'dealPro'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '操作员',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '财务流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '交易笔次',
            align:"center",
            dataIndex: 'tdCnt'
           },
		   {
            title: '所属账务机构',
            align:"center",
            dataIndex: 'txBrNo'
           },
		   {
            title: '股权投资成本法对应账号',
            align:"center",
            dataIndex: 'costAcNo'
           },
		   {
            title: '股权投资权益法对应账号',
            align:"center",
            dataIndex: 'equityAcNo'
           },
          {
            title: '备注',
            align:"center",
            dataIndex: 'filler'
           },
		   {
            title: '业务编码',
            align:"center",
            dataIndex: 'ywNo'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '投资对象净资产公允价值',
            align:"center",
            dataIndex: 'objFairAmt'
           },
          {
            title: '购入股本数量',
            align:"center",
            dataIndex: 'buyNum'
           },
		   {
            title: '购入股本单价',
            align:"center",
            dataIndex: 'buyPrice'
           },
		   {
            title: '购入股本单位面值',
            align:"center",
            dataIndex: 'unitAmt'
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
		 /*  {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'objCorp',
            align:"center",
            dataIndex: 'objCorp'
           },
		   {
            title: 'objAddr',
            align:"center",
            dataIndex: 'objAddr'
           },
		   {
            title: 'isStock',
            align:"center",
            dataIndex: 'isStock'
           },
		   {
            title: 'objEarnAmt',
            align:"center",
            dataIndex: 'objEarnAmt'
           },
		   {
            title: 'investPro',
            align:"center",
            dataIndex: 'investPro'
           },
		   {
            title: 'investSDate',
            align:"center",
            dataIndex: 'investSDate'
           },
		   {
            title: 'gainWay',
            align:"center",
            dataIndex: 'gainWay'
           },
		   {
            title: 'infctLvl',
            align:"center",
            dataIndex: 'infctLvl'
           },
		   {
            title: 'accMethod',
            align:"center",
            dataIndex: 'accMethod'
           },
		   {
            title: 'investRes',
            align:"center",
            dataIndex: 'investRes'
           },
		   {
            title: 'objBrNo',
            align:"center",
            dataIndex: 'objBrNo'
           },
		   {
            title: 'lawSurplus',
            align:"center",
            dataIndex: 'lawSurplus'
           },
		   {
            title: 'unpayProfit',
            align:"center",
            dataIndex: 'unpayProfit'
           },
		   {
            title: 'accRec',
            align:"center",
            dataIndex: 'accRec'
           },
		   {
            title: 'devalueLoss',
            align:"center",
            dataIndex: 'devalueLoss'
           },
		   {
            title: 'dealReason',
            align:"center",
            dataIndex: 'dealReason'
           },
		   {
            title: 'filler',
            align:"center",
            dataIndex: 'filler'
           },
		   {
            title: 'buyNum',
            align:"center",
            dataIndex: 'buyNum'
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
          list: "/cqgqtzdjb/cqgqtzdjb/list",
          delete: "/cqgqtzdjb/cqgqtzdjb/delete",
          deleteBatch: "/cqgqtzdjb/cqgqtzdjb/deleteBatch",
          exportXlsUrl: "cqgqtzdjb/cqgqtzdjb/exportXls",
          importExcelUrl: "cqgqtzdjb/cqgqtzdjb/importExcel",
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