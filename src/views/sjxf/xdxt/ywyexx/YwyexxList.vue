<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易社网点号">
<!--              <a-input placeholder="全部" v-model="queryParam.org"></a-input>-->
                <j-tree-select placeholder="全部"
                               v-model="queryParam.org"
                               treeNodeFilterProp="title"
                               pid-field="sjywjgdm"
                               dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                               :showSearch="true"
                               :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.accNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号">
              <a-input placeholder="请输入业务编号" v-model="queryParam.businessNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款类别">
              <a-input placeholder="请输入贷款类别" v-model="queryParam.businessType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="信贷客户号">
              <a-input placeholder="请输入信贷客户号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="放款人员">
              <a-input placeholder="请输入放款人员" v-model="queryParam.fkId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借据号/汇票号">
              <a-input placeholder="请输入借据号/汇票号" v-model="queryParam.voucherNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('业务余额信息')">导出</a-button>
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
        :scroll="{x:14300}"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
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
    <ywyexx-modal ref="modalForm" @ok="modalFormOk"></ywyexx-modal>
  </a-card>
</template>

<script>
  import YwyexxModal from './modules/YwyexxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "YwyexxList",
    mixins:[JeecgListMixin],
    components: {
      YwyexxModal,JTreeSelect
    },
    data () {
      return {
        description: '业务余额信息管理页面',
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
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'accNo'
           },
		   {
            title: '未收利息',
            align:"center",
            dataIndex: 'accruedIuterest'
           },
		   {
            title: '贷款帐号/汇票号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '实际还款金额',
            align:"center",
            dataIndex: 'actualPayMonthSum'
           },
		   {
            title: '呆帐金额',
            align:"center",
            dataIndex: 'badbal'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'balance'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: '交易编码',
            align:"center",
            dataIndex: 'businessPhase'
           },
		   {
            title: '贷款类别',
            align:"center",
            dataIndex: 'businessType'
           },
		   {
            title: '冲销标志',
            align:"center",
            dataIndex: 'cancelFlag'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'currency'
           },
		   {
            title: '信贷客户号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '核心客户号',
            align:"center",
            dataIndex: 'custNo'
           },
		   {
            title: '贷款合同号码',
            align:"center",
            dataIndex: 'dkhth'
           },
		   {
            title: '实收利息',
            align:"center",
            dataIndex: 'dueLuterest'
           },
		   {
            title: '呆滞金额',
            align:"center",
            dataIndex: 'dullbal'
           },
		   {
            title: '罚息金额',
            align:"center",
            dataIndex: 'finebal'
           },
		   {
            title: '销户日期',
            align:"center",
            dataIndex: 'finishDate'
           },
		   {
            title: '放款人员',
            align:"center",
            dataIndex: 'fkId'
           },
		   {
            title: '获取数据时间',
            align:"center",
            dataIndex: 'getDate'
           },
		   {
            title: '收息账户余额',
            align:"center",
            dataIndex: 'houldPayMonthSum'
           },
		   {
            title: '表内欠息余额',
            align:"center",
            dataIndex: 'intbal1'
           },
		   {
            title: '表外欠息余额',
            align:"center",
            dataIndex: 'intbal2'
           },
		   {
            title: '贷款类型0贷款1票据2贴现',
            align:"center",
            dataIndex: 'kind'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'maturity'
           },
		   {
            title: '本月利息累收',
            align:"center",
            dataIndex: 'monthIntbalPileAccept'
           },
		   {
            title: '本月本金累收',
            align:"center",
            dataIndex: 'monthOwePileAccept'
           },
		   {
            title: '本月本金累放',
            align:"center",
            dataIndex: 'monthOwePilePut'
           },
		   {
            title: '交易社网点号',
            align:"center",
            dataIndex: 'org'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'orgId'
           },
		   {
            title: '逾期金额',
            align:"center",
            dataIndex: 'overDuebal'
           },
		   {
            title: '逾期期数',
            align:"center",
            dataIndex: 'overDuebalTerm'
           },
		   {
            title: '欠本金额',
            align:"center",
            dataIndex: 'oweBalance'
           },
		   {
            title: '结算账号',
            align:"center",
            dataIndex: 'payAcctno'
           },
		   {
            title: '还款月数',
            align:"center",
            dataIndex: 'payTermMonth'
           },
		   {
            title: '贷款日期',
            align:"center",
            dataIndex: 'putOutDate'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'putoutSum'
           },
		   {
            title: '利率',
            align:"center",
            dataIndex: 'rate'
           },
		   {
            title: '本月应还款金额',
            align:"center",
            dataIndex: 'shouldPayMonthSum'
           },
		   {
            title: '应还款期数',
            align:"center",
            dataIndex: 'shouldPayTerm'
           },
		   {
            title: '贷款期限',
            align:"center",
            dataIndex: 'term'
           },
		   {
            title: '借据号/汇票号',
            align:"center",
            dataIndex: 'voucherNo'
           },
		   {
            title: '本年利息累收',
            align:"center",
            dataIndex: 'yearIntbalPileAccept'
           },
		   {
            title: '本年本金累收',
            align:"center",
            dataIndex: 'yearOwePileAccept'
           },
		   {
            title: '本年本金累放',
            align:"center",
            dataIndex: 'yearOwePilePut'
           },
		   {
            title: '逾期利率',
            align:"center",
            dataIndex: 'yqll'
           },
		   {
            title: '罚息利率',
            align:"center",
            dataIndex: 'fxll'
           },
		   {
            title: '展期利率',
            align:"center",
            dataIndex: 'zqll'
           },
		   {
            title: '展期利率1',
            align:"center",
            dataIndex: 'zqll1'
           },
		   {
            title: '展期金额',
            align:"center",
            dataIndex: 'zqje'
           },
		   {
            title: '收息账号',
            align:"center",
            dataIndex: 'sxzh'
           },
		   {
            title: '挂息账号',
            align:"center",
            dataIndex: 'gxzh'
           },
		   {
            title: '表外账号',
            align:"center",
            dataIndex: 'bwzh'
           },
		   {
            title: '暂末用',
            align:"center",
            dataIndex: 'bjflh'
           },
		   {
            title: '应收利率累计',
            align:"center",
            dataIndex: 'yslxlj'
           },
		   {
            title: '发放累计',
            align:"center",
            dataIndex: 'fflj'
           },
		   {
            title: '回收累计',
            align:"center",
            dataIndex: 'hslj'
           },
		   {
            title: '贷款用途(核心)',
            align:"center",
            dataIndex: 'dkyt'
           },
		   {
            title: '计账科目',
            align:"center",
            dataIndex: 'jzkm'
           },
		   {
            title: '起息日期',
            align:"center",
            dataIndex: 'qxrDate'
           },
		   {
            title: '四级分类状态',
            align:"center",
            dataIndex: 'fourClassState'
           },
		   {
            title: '核心借据号',
            align:"center",
            dataIndex: 'hxjjh'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '记息标志',
            align:"center",
            dataIndex: 'jxbz'
           },
		   {
            title: '最近一次还款日期',
            align:"center",
            dataIndex: 'zjychkrq'
           },
		   {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs'
           },
		   {
            title: '信贷证件类型',
            align:"center",
            dataIndex: 'xdzjlx'
           },
		   {
            title: '信贷证件号码',
            align:"center",
            dataIndex: 'xdzjhm'
           },
		   {
            title: '总余额',
            align:"center",
            dataIndex: 'totleBalance'
           },
		   {
            title: '总减值金额',
            align:"center",
            dataIndex: 'zjzje'
           },
		   {
            title: '减值标志',
            align:"center",
            dataIndex: 'jzbz'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '逾期罚息余额',
            align:"center",
            dataIndex: 'fineBalance1'
           },
		   {
            title: '分期业务欠本金',
            align:"center",
            dataIndex: 'taBalance'
           },
		   {
            title: '分期业务欠利息',
            align:"center",
            dataIndex: 'taInterestBalance'
           },
		   {
            title: '累计欠款期数',
            align:"center",
            dataIndex: 'taTimes'
           },
		   {
            title: '连续欠款期数',
            align:"center",
            dataIndex: 'lcaTimes'
           },
		   {
            title: '展期次数',
            align:"center",
            dataIndex: 'extendTimes'
           },
		   {
            title: '垫款标志',
            align:"center",
            dataIndex: 'advanceFlag'
           },
		   {
            title: '还款频率',
            align:"center",
            dataIndex: 'termsFreq'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'businessStat'
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
          list: "/ywyexx/ywyexx/list",
          delete: "/ywyexx/ywyexx/delete",
          deleteBatch: "/ywyexx/ywyexx/deleteBatch",
          exportXlsUrl: "ywyexx/ywyexx/exportXls",
          importExcelUrl: "ywyexx/ywyexx/importExcel",
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