<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="内部产品代码">
              <a-input placeholder="请输入内部产品代码" v-model="queryParam.prdtNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类型号">
              <a-input placeholder="请输入业务类型号" v-model="queryParam.ywNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
             <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('产品表')">导出</a-button>

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
    <cpb-modal ref="modalForm" @ok="modalFormOk"></cpb-modal>
  </a-card>
</template>

<script>
  import CpbModal from './modules/CpbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CpbList",
    mixins:[JeecgListMixin],
    components: {
      CpbModal
    },
    data () {
      return {
        description: '产品表管理页面',
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
            title: '内部产品代码',
            align:"center",
            dataIndex: 'prdtNo'
           },
		   {
            title: '科目控制字',
            align:"center",
            dataIndex: 'accHrt'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '产品描述',
            align:"center",
            dataIndex: 'prdtMo'
           },
		   {
            title: '借贷标志',
            align:"center",
            dataIndex: 'dcInd'
           },
		   {
            title: '发生额方向',
            align:"center",
            dataIndex: 'amtDc'
           },
		   {
            title: '启用日期',
            align:"center",
            dataIndex: 'starDate'
           },
		   {
            title: '止用日期',
            align:"center",
            dataIndex: 'stopDate'
           },
		   {
            title: '最低限额',
            align:"center",
            dataIndex: 'minAmt'
           },
		   {
            title: '最高限额',
            align:"center",
            dataIndex: 'maxAmt'
           },
		   {
            title: '最小期限',
            align:"center",
            dataIndex: 'minTerm'
           },
		   {
            title: '最大期限',
            align:"center",
            dataIndex: 'maxTerm'
           },
		   {
            title: '期限类型',
            align:"center",
            dataIndex: 'termType'
           },
		   {
            title: '利率编号',
            align:"center",
            dataIndex: 'rateNo'
           },
		   {
            title: '罚息利率编号',
            align:"center",
            dataIndex: 'fineRateNo'
           },
		   {
            title: '利率浮动比例下限',
            align:"center",
            dataIndex: 'minFlotRate'
           },
		   {
            title: '利率浮动比例上限',
            align:"center",
            dataIndex: 'maxFlotRate'
           },
		   {
            title: '计息天数类型',
            align:"center",
            dataIndex: 'calDayType'
           },
		   {
            title: '记息标志',
            align:"center",
            dataIndex: 'intstInd'
           },
		   {
            title: '计息类型',
            align:"center",
            dataIndex: 'intstKnd'
           },
		   {
            title: '积数计算方法',
            align:"center",
            dataIndex: 'acmType'
           },
		   {
            title: '计息月份',
            align:"center",
            dataIndex: 'intstMon'
           },
		   {
            title: '计息日',
            align:"center",
            dataIndex: 'intstDate'
           },
		   {
            title: '是否允许透支',
            align:"center",
            dataIndex: 'odInd'
           },
		   {
            title: '透支额度',
            align:"center",
            dataIndex: 'odAmt'
           },
		   {
            title: '会计代码',
            align:"center",
            dataIndex: 'dcCode'
           },
		   {
            title: '是否摊销',
            align:"center",
            dataIndex: 'sharInd'
           },
		   {
            title: '摊销期限',
            align:"center",
            dataIndex: 'sharTerm'
           },
		   {
            title: '摊销期限类型',
            align:"center",
            dataIndex: 'sharTermType'
           },
		   {
            title: '逾期处理类型',
            align:"center",
            dataIndex: 'overDateType'
           },
		   {
            title: '是否允许通用记账',
            align:"center",
            dataIndex: 'invstType'
           },
		   {
            title: '预提投资收益周期',
            align:"center",
            dataIndex: 'preTerm'
           },
		   {
            title: '特殊标志',
            align:"center",
            dataIndex: 'speInd'
           },
		   {
            title: '是否有存期',
            align:"center",
            dataIndex: 'termInd'
           },
		   {
            title: '是否展示',
            align:"center",
            dataIndex: 'opInd'
           },
		   {
            title: '银行类型',
            align:"center",
            dataIndex: 'bankInd'
           },
		   {
            title: '业务类型号',
            align:"center",
            dataIndex: 'ywNo'
           },
		   {
            title: '应用代码',
            align:"center",
            dataIndex: 'appCod'
           },
		   {
            title: '资产负债类型',
            align:"center",
            dataIndex: 'accInd'
           },
		   {
            title: '平衡标志',
            align:"center",
            dataIndex: 'equaInd'
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
		   /*{
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
          list: "/cpb/cpb/list",
          delete: "/cpb/cpb/delete",
          deleteBatch: "/cpb/cpb/deleteBatch",
          exportXlsUrl: "cpb/cpb/exportXls",
          importExcelUrl: "cpb/cpb/importExcel",
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