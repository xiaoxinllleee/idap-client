<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
              <a-input placeholder="请输入开户机构号" v-model="queryParam.opnBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户ID">
              <a-input placeholder="请输入账户ID" v-model="queryParam.acId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户部门">
              <a-input placeholder="请输入开户部门" v-model="queryParam.opnDepNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('内部台账主文件')">导出</a-button>

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
    <nbtzzwj-modal ref="modalForm" @ok="modalFormOk"></nbtzzwj-modal>
  </a-card>
</template>

<script>
  import NbtzzwjModal from './modules/NbtzzwjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "NbtzzwjList",
    mixins:[JeecgListMixin],
    components: {
      NbtzzwjModal
    },
    data () {
      return {
        description: '内部台账主文件管理页面',
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
            dataIndex: 'opnBrNo'
           },
		   {
            title: '账户ID',
            align:"center",
            dataIndex: 'acId'
           },
		   {
            title: '账户序号',
            align:"center",
            dataIndex: 'acSeqn'
           },
		   {
            title: '产品代码',
            align:"center",
            dataIndex: 'prdtNo'
           },
		   {
            title: '余额',
            align:"center",
            dataIndex: 'bal'
           },
		   {
            title: '昨日余额',
            align:"center",
            dataIndex: 'ysBal'
           },
		   {
            title: '明细余额',
            align:"center",
            dataIndex: 'hstBal'
           },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'opnDate'
           },
		   {
            title: '起息日期',
            align:"center",
            dataIndex: 'icDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'endDate'
           },
		   {
            title: '销户日期',
            align:"center",
            dataIndex: 'clsDate'
           },
		   {
            title: '上笔发生日期',
            align:"center",
            dataIndex: 'lstDate'
           },
		   {
            title: '计息类型',
            align:"center",
            dataIndex: 'intstKnd'
           },
		   {
            title: '利率(%)',
            align:"center",
            dataIndex: 'rate'
           },
		   {
            title: '逾期利率',
            align:"center",
            dataIndex: 'overRate'
           },
		   {
            title: '利息积数',
            align:"center",
            dataIndex: 'intstAcm'
           },
		   {
            title: '明细帐总笔数',
            align:"center",
            dataIndex: 'hstCnt'
           },
		   {
            title: '明细帐满页页数',
            align:"center",
            dataIndex: 'hstPg'
           },
		   {
            title: '冻结余额',
            align:"center",
            dataIndex: 'holdAmt'
           },
		   {
            title: '透支标志',
            align:"center",
            dataIndex: 'odInd'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'name'
           },
		   {
            title: '指标体系代码',
            align:"center",
            dataIndex: 'calCode'
           },
		   {
            title: '密押',
            align:"center",
            dataIndex: 'mac'
           },
		   {
            title: '支付金额',
            align:"center",
            dataIndex: 'zfBal'
           },
		   {
            title: '存期(按天)',
            align:"center",
            dataIndex: 'term'
           },
		   {
            title: '上次计提日期',
            align:"center",
            dataIndex: 'ljtDate'
           },
		   {
            title: '上次起息日期',
            align:"center",
            dataIndex: 'licDate'
           },
		   {
            title: '下次付息日期',
            align:"center",
            dataIndex: 'fxDate'
           },
		   {
            title: '是否能提前取款',
            align:"center",
            dataIndex: 'isTeller'
           },
		   {
            title: '是否允许到期转存',
            align:"center",
            dataIndex: 'isDeposit'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '日利率计算方式',
            align:"center",
            dataIndex: 'dateRateNum'
           },
		   {
            title: '开户部门',
            align:"center",
            dataIndex: 'opnDepNo'
           },
		   {
            title: '利率类型',
            align:"center",
            dataIndex: 'rateType'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
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
          list: "/nbtzzwj/nbtzzwj/list",
          delete: "/nbtzzwj/nbtzzwj/delete",
          deleteBatch: "/nbtzzwj/nbtzzwj/deleteBatch",
          exportXlsUrl: "nbtzzwj/nbtzzwj/exportXls",
          importExcelUrl: "nbtzzwj/nbtzzwj/importExcel",
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