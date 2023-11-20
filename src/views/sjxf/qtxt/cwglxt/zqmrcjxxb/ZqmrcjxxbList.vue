<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="成交单编号">
              <a-input placeholder="请输入成交单编号" v-model="queryParam.pactNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="债券代码">
              <a-input placeholder="请输入债券代码" v-model="queryParam.bondNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="债券名称">
              <a-input placeholder="请输入债券名称" v-model="queryParam.bondName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易对手编号">
              <a-input placeholder="请输入交易对手编号" v-model="queryParam.ctpyNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品号">
              <a-input placeholder="请输入产品号" v-model="queryParam.prdtNo"></a-input>
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
    <!--  <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('债券买入成交单信息薄')">导出</a-button>
     <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
     <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
           :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:9300}"
        @change="handleTableChange">

        <!--<span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zqmrcjxxb-modal ref="modalForm" @ok="modalFormOk"></zqmrcjxxb-modal>
  </a-card>
</template>

<script>
  import ZqmrcjxxbModal from './modules/ZqmrcjxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZqmrcjxxbList",
    mixins:[JeecgListMixin],
    components: {
      ZqmrcjxxbModal
    },
    data () {
      return {
        description: '债券买入成交单信息薄管理页面',
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
            title: '成交单编号',
            align:"center",
            dataIndex: 'pactNo'
           },
		   {
            title: '交易明细笔次',
            align:"center",
            dataIndex: 'txCnt'
           },
		   {
            title: '债券代码',
            align:"center",
            dataIndex: 'bondNo'
           },
		   {
            title: '债券名称',
            align:"center",
            dataIndex: 'bondName'
           },
		   {
            title: '债券市场类型',
            align:"center",
            dataIndex: 'bondMarkettype'
           },
		   {
            title: '交易对手编号',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '交易对手版本号',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: '持有意图',
            align:"center",
            dataIndex: 'holdAim'
           },
		   {
            title: '剩余期限',
            align:"center",
            dataIndex: 'remianTerm'
           },
		   {
            title: '产品号',
            align:"center",
            dataIndex: 'prdtNo'
           },
		   {
            title: '结算金额(元)',
            align:"center",
            dataIndex: 'fullPrice'
           },
		   {
            title: '券面总额(万元)',
            align:"center",
            dataIndex: 'parBal'
           },
		   {
            title: '到期收益率(%)',
            align:"center",
            dataIndex: 'yieldMaty'
           },
		   {
            title: '累计实收利息金额(元)',
            align:"center",
            dataIndex: 'actRecIntst'
           },
		   {
            title: '累计计提金额(元)',
            align:"center",
            dataIndex: 'sumJtAmt'
           },
		   {
            title: '累计确认投资收益(元)',
            align:"center",
            dataIndex: 'sumSyAmt'
           },
		   {
            title: '本年累计计提金额(元)',
            align:"center",
            dataIndex: 'bnSumJtAmt'
           },
		   {
            title: '本年累计确认投资收益(元)',
            align:"center",
            dataIndex: 'bnSumSyAmt'
           },
		   {
            title: '内部帐AC_NO',
            align:"center",
            dataIndex: 'acNo'
           },
		   {
            title: '内部账AC_ID',
            align:"center",
            dataIndex: 'acId'
           },
		   {
            title: '实际利率(%)',
            align:"center",
            dataIndex: 'actRate'
           },
		   {
            title: '上次计提日期',
            align:"center",
            dataIndex: 'lJtDate'
           },
		   {
            title: '上次起息日期',
            align:"center",
            dataIndex: 'lIcDate'
           },
		   {
            title: '本次起息日期',
            align:"center",
            dataIndex: 'icDate'
           },
		   {
            title: '下次付息日期',
            align:"center",
            dataIndex: 'fxDate'
           },
		   {
            title: '结算方式',
            align:"center",
            dataIndex: 'settleType'
           },
		   {
            title: '资金结算速度',
            align:"center",
            dataIndex: 'capSettype'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'regDate'
           },
		   {
            title: '购入日期',
            align:"center",
            dataIndex: 'buyDate'
           },
		   {
            title: '资金结算日',
            align:"center",
            dataIndex: 'capDate'
           },
		   {
            title: '对方交易员',
            align:"center",
            dataIndex: 'ctpyTrader'
           },
		   {
            title: '本方交易员',
            align:"center",
            dataIndex: 'trader'
           },
		   {
            title: '摘要',
            align:"center",
            dataIndex: 'brf'
           },
		   {
            title: '买入立项申请编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '买入立项分项序号',
            align:"center",
            dataIndex: 'appSeqn'
           },
		   {
            title: '资金拨付申请编号',
            align:"center",
            dataIndex: 'zjappNo'
           },
		   {
            title: '债券所属账务机构',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '使用部门',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '使用人',
            align:"center",
            dataIndex: 'suppNo'
           },
		   {
            title: '债券状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '交易净价(元)',
            align:"center",
            dataIndex: 'byNetPrice'
           },
		   {
            title: '百元应计利息(元)',
            align:"center",
            dataIndex: 'byIntst'
           },
		   {
            title: '百元全价(元)',
            align:"center",
            dataIndex: 'byFullPrice'
           },
		   {
            title: '买入时应计利息总额(元)',
            align:"center",
            dataIndex: 'buyintstAmt'
           },
		   {
            title: '交易金额(元)',
            align:"center",
            dataIndex: 'netPrice'
           },
		   {
            title: '业务类型号',
            align:"center",
            dataIndex: 'ywNo'
           },
		   {
            title: '计划编号',
            align:"center",
            dataIndex: 'planNo'
           },
		   {
            title: '计划日期',
            align:"center",
            dataIndex: 'chnlInd'
           },
		   {
            title: '计提利息周期',
            align:"center",
            dataIndex: 'intstCycle'
           },
		   {
            title: '日利率计算方式',
            align:"center",
            dataIndex: 'dateRateNum'
           },
		   {
            title: '计提利息方式',
            align:"center",
            dataIndex: 'jtType'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '正回购质押面值总额(元)',
            align:"center",
            dataIndex: 'zyParBal'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '债券序号',
            align:"center",
            dataIndex: 'bondSeqn'
           },
		   {
            title: '手续费比例',
            align:"center",
            dataIndex: 'serviceRate'
           },
		   {
            title: '手续费收入',
            align:"center",
            dataIndex: 'serviceIncome'
           },
		   {
            title: '本方编号',
            align:"center",
            dataIndex: 'bctpyNo'
           },
		   {
            title: '本方版本号',
            align:"center",
            dataIndex: 'bversion'
           },
		   {
            title: '回购金额',
            align:"center",
            dataIndex: 'backParBal'
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
            title: '数据加载日期',
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
          list: "/zqmrcjxxb/zqmrcjxxb/list",
          delete: "/zqmrcjxxb/zqmrcjxxb/delete",
          deleteBatch: "/zqmrcjxxb/zqmrcjxxb/deleteBatch",
          exportXlsUrl: "zqmrcjxxb/zqmrcjxxb/exportXls",
          importExcelUrl: "zqmrcjxxb/zqmrcjxxb/importExcel",
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