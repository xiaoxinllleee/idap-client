<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="内部帐所属分行">
<!--              <a-input placeholder="请输入内部帐所属分行" v-model="queryParam.branch"></a-input>-->
              <j-tree-select placeholder="请选择内部帐所属分行"
                             v-model="queryParam.branch"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.key1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入流水号" v-model="queryParam.jrnlseq"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.customerNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="40位长账户名，供查询使用">
              <a-input placeholder="请输入40位长账户名，供查询使用" v-model="queryParam.ledgerName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品类型">
              <a-input placeholder="请输入产品类型" v-model="queryParam.prodType"></a-input>
            </a-form-item>
          </a-col>
         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户开户日期">
              <a-range-picker @change="onChangezjzhkhrq" v-model="queryParam.acctOpenDate" :format="dateFormat"/>
            </a-form-item>
          </a-col>-->

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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('总账账户主表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
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
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
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
        :scroll="{x: 20000}"
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
    <zzzhzb-modal ref="modalForm" @ok="modalFormOk"></zzzhzb-modal>
  </a-card>
</template>

<script>
  import ZzzhzbModal from './modules/ZzzhzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'

  export default {
    name: "ZzzhzbList",
    mixins:[JeecgListMixin],
    components: {
      ZzzhzbModal,JTreeSelect
    },
    data () {
      return {
        description: '总账账户主表管理页面',
        // 表头
        dateFormat: 'YYYYMMDD',
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
            title: '账号',
            align:"center",
            dataIndex: 'key1'
           },
		   {
            title: '表明最近的GLDM记录',
            align:"center",
            dataIndex: 'gldvst'
           },
		   {
            title: '转换使用',
            align:"center",
            dataIndex: 'noTrans'
           },
		   {
            title: '系统名',
            align:"center",
            dataIndex: 'syst'
           },
		   {
            title: '内部帐所属分行',
            align:"center",
            dataIndex: 'branch'
           },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '产品类型',
            align:"center",
            dataIndex: 'prodType'
           },
		   {
            title: '产品子类',
            align:"center",
            dataIndex: 'prodCat'
           },
		   {
            title: '供未来使用',
            align:"center",
            dataIndex: 'relationship'
           },
		   {
            title: '供未来使用',
            align:"center",
            dataIndex: 'allocation'
           },
		   {
            title: '40位长账户名供查询使用',
            align:"center",
            dataIndex: 'ledgerName'
           },
		   {
            title: '30位长其他语言账户名供查询使用',
            align:"center",
            dataIndex: 'othCurrLedgName'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'currency'
           },
		   {
            title: '当前账户余额',
            align:"center",
            dataIndex: 'cumCurrVal'
           },
		   {
            title: '开户余额',
            align:"center",
            dataIndex: 'openVal'
           },
		   {
            title: '月实际余额1',
            align:"center",
            dataIndex: 'monthVal01'
           },
		   {
            title: '月实际余额2',
            align:"center",
            dataIndex: 'monthVal02'
           },
		   {
            title: '月实际余额3',
            align:"center",
            dataIndex: 'monthVal03'
           },
		   {
            title: '月实际余额4',
            align:"center",
            dataIndex: 'monthVal04'
           },
		   {
            title: '月实际余额5',
            align:"center",
            dataIndex: 'monthVal05'
           },
		   {
            title: '月实际余额6',
            align:"center",
            dataIndex: 'monthVal06'
           },
		   {
            title: '月实际余额7',
            align:"center",
            dataIndex: 'monthVal07'
           },
		   {
            title: '月实际余额8',
            align:"center",
            dataIndex: 'monthVal08'
           },
		   {
            title: '月实际余额9',
            align:"center",
            dataIndex: 'monthVal09'
           },
		   {
            title: '月实际余额10',
            align:"center",
            dataIndex: 'monthVal10'
           },
		   {
            title: '月实际余额11',
            align:"center",
            dataIndex: 'monthVal11'
           },
		   {
            title: '月实际余额12',
            align:"center",
            dataIndex: 'monthVal12'
           },
		   {
            title: '月实际余额13',
            align:"center",
            dataIndex: 'monthVal13'
           },
		   {
            title: '累计预算金额',
            align:"center",
            dataIndex: 'bdgtCumVal'
           },
		   {
            title: '预算起始金额',
            align:"center",
            dataIndex: 'bdgtOpenVal'
           },
		   {
            title: '月预算余额1',
            align:"center",
            dataIndex: 'bdgtMonthVal01'
           },
		   {
            title: '月预算余额2',
            align:"center",
            dataIndex: 'bdgtMonthVal02'
           },
		   {
            title: '月预算余额3',
            align:"center",
            dataIndex: 'bdgtMonthVal03'
           },
		   {
            title: '月预算余额4',
            align:"center",
            dataIndex: 'bdgtMonthVal04'
           },
		   {
            title: '月预算余额5',
            align:"center",
            dataIndex: 'bdgtMonthVal05'
           },
		   {
            title: '月预算余额6',
            align:"center",
            dataIndex: 'bdgtMonthVal06'
           },
		   {
            title: '月预算余额7',
            align:"center",
            dataIndex: 'bdgtMonthVal07'
           },
		   {
            title: '月预算余额8',
            align:"center",
            dataIndex: 'bdgtMonthVal08'
           },
		   {
            title: '月预算余额9',
            align:"center",
            dataIndex: 'bdgtMonthVal09'
           },
		   {
            title: '月预算余额10',
            align:"center",
            dataIndex: 'bdgtMonthVal10'
           },
		   {
            title: '月预算余额11',
            align:"center",
            dataIndex: 'bdgtMonthVal11'
           },
		   {
            title: '月预算余额12',
            align:"center",
            dataIndex: 'bdgtMonthVal12'
           },
		   {
            title: '月预算余额13',
            align:"center",
            dataIndex: 'bdgtMonthVal13'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'jrnlseq'
           },
		   {
            title: '项目号,当前未用',
            align:"center",
            dataIndex: 'projCode'
           },
		   {
            title: '上一本汇票前缀',
            align:"center",
            dataIndex: 'lastChqAlpha'
           },
		   {
            title: '上一本汇票号码',
            align:"center",
            dataIndex: 'lastChqSeq'
           },
		   {
            title: '本账户签发本汇票数量',
            align:"center",
            dataIndex: 'chqsIssTday'
           },
		   {
            title: '本账户签发本汇票总金额',
            align:"center",
            dataIndex: 'chqsIssTdayAmt'
           },
		   {
            title: '本账户已解付本汇票数量',
            align:"center",
            dataIndex: 'chqsPaidTday'
           },
		   {
            title: '本账户已解付本汇票金额',
            align:"center",
            dataIndex: 'chqsPaidTdayAmt'
           },
		   {
            title: '本账户未结清本汇票数量',
            align:"center",
            dataIndex: 'unclChqs'
           },
		   {
            title: '本账户已冻结本汇票数量',
            align:"center",
            dataIndex: 'stoppedChqs'
           },
		   {
            title: '未记录的跨货币交易总金额',
            align:"center",
            dataIndex: 'crossCurrVal'
           },
		   {
            title: '未记录的跨分行交易总金额',
            align:"center",
            dataIndex: 'interBrVal'
           },
		   {
            title: '非交易跨货币金额',
            align:"center",
            dataIndex: 'nonTxCrCurrVal'
           },
		   {
            title: '本账户已冻结本汇票金额',
            align:"center",
            dataIndex: 'chqsStoppedAmt'
           },
		   {
            title: '状态最后修改日期',
            align:"center",
            dataIndex: 'lastStatDate'
           },
		   {
            title: '安全校验标志位',
            align:"center",
            dataIndex: 'secAccessInd'
           },
		   {
            title: '特殊账户标识',
            align:"center",
            dataIndex: 'specialAcctInd'
           },
		   {
            title: '该账户已取消本汇票数量',
            align:"center",
            dataIndex: 'chqsCancelledCtr'
           },
		   {
            title: '该账户已取消本汇票金额',
            align:"center",
            dataIndex: 'chqsCancelledAmt'
           },
		   {
            title: '上一支票顺序号',
            align:"center",
            dataIndex: 'lastChqDupNo'
           },
		   {
            title: '客户号',
            align:"center",
            dataIndex: 'customerNo'
           },
		   {
            title: '对账单产生频率',
            align:"center",
            dataIndex: 'stmntFreq'
           },
		   {
            title: '对账单格式',
            align:"center",
            dataIndex: 'stmntForm'
           },
		   {
            title: '对账单日期历法',
            align:"center",
            dataIndex: 'stmntDateIndic'
           },
		   {
            title: '对账单借方总金额',
            align:"center",
            dataIndex: 'totDr'
           },
		   {
            title: '对账单贷方总金额',
            align:"center",
            dataIndex: 'totCr'
           },
		   {
            title: '供未来使用',
            align:"center",
            dataIndex: 'consolidateFlag'
           },
		   {
            title: '账户上一交易会计日',
            align:"center",
            dataIndex: 'lstFinDt'
           },
		   {
            title: '账户对账单数量',
            align:"center",
            dataIndex: 'noOfStmnt'
           },
		   {
            title: '账户未发送电子邮件数',
            align:"center",
            dataIndex: 'msgsPending'
           },
		   {
            title: '账户总电子邮件数(不包括已发送)',
            align:"center",
            dataIndex: 'noOfMessages'
           },
		   {
            title: '对账单周期',
            align:"center",
            dataIndex: 'statementCycle'
           },
		   {
            title: '对账单日期',
            align:"center",
            dataIndex: 'statementDay'
           },
		   {
            title: '账户开户日期',
            align:"center",
            dataIndex: 'acctOpenDate'
           },
		   {
            title: '32种的转账限制',
            align:"center",
            dataIndex: 'postingMask'
           },
		   {
            title: '32种报告限制',
            align:"center",
            dataIndex: 'reportMask'
           },
		   {
            title: 'GLCCGL',
            align:"center",
            dataIndex: 'glClassCode'
           },
		   {
            title: '段码',
            align:"center",
            dataIndex: 'glSegment'
           },
		   {
            title: '对账单份数(每次产生对账单的份数)',
            align:"center",
            dataIndex: 'statementCopies'
           },
		   {
            title: '上一次产品类型修改日期',
            align:"center",
            dataIndex: 'lastAcctTypeChg'
           },
		   {
            title: '该账户是否涉及预约转账',
            align:"center",
            dataIndex: 'sweepAcctFlag'
           },
		   {
            title: '是否更新外汇头寸账户',
            align:"center",
            dataIndex: 'exchgPosnFlag'
           },
		   {
            title: '该账户最早的倒退日交易日期',
            align:"center",
            dataIndex: 'oldestBdateDate'
           },
		   {
            title: '销帐码标识',
            align:"center",
            dataIndex: 'srnInd'
           },
		   {
            title: '销帐码借贷标识',
            align:"center",
            dataIndex: 'srnCrdrInd'
           },
		   {
            title: '预约转账标识',
            align:"center",
            dataIndex: 'sweepInd'
           },
		   {
            title: '推迟转账日',
            align:"center",
            dataIndex: 'delayDays'
           },
		   {
            title: '预约转账的转入账户',
            align:"center",
            dataIndex: 'motherAcctno'
           },
		   {
            title: '指明向母账户中上划资金的方式',
            align:"center",
            dataIndex: 'pushPostingFlag'
           },
		   {
            title: '交易用借贷标识',
            align:"center",
            dataIndex: 'drCrFlag'
           },
		   {
            title: '交易总借方金额',
            align:"center",
            dataIndex: 'cshadvTotDr'
           },
		   {
            title: '交易总贷方金额',
            align:"center",
            dataIndex: 'cshadvTotCr'
           },
		   {
            title: '收益代码',
            align:"center",
            dataIndex: 'profitCode'
           },
		   {
            title: '关户标识,用于关户交易',
            align:"center",
            dataIndex: 'closureFlag'
           },
		   {
            title: '库存限额',
            align:"center",
            dataIndex: 'vaultLimitAmt'
           },
		   {
            title: '免税种类',
            align:"center",
            dataIndex: 'chrExemProfile'
           },
		   {
            title: '收费次数01',
            align:"center",
            dataIndex: 'chrCnt01'
           },
		   {
            title: '收费金额01',
            align:"center",
            dataIndex: 'chrVal01'
           },
		   {
            title: '收费次数02',
            align:"center",
            dataIndex: 'chrCnt02'
           },
		   {
            title: '收费金额02',
            align:"center",
            dataIndex: 'chrVal02'
           },
		   {
            title: '收费次数03',
            align:"center",
            dataIndex: 'chrCnt03'
           },
		   {
            title: '收费金额03',
            align:"center",
            dataIndex: 'chrVal03'
           },
		   {
            title: '收费次数04',
            align:"center",
            dataIndex: 'chrCnt04'
           },
		   {
            title: '收费金额04',
            align:"center",
            dataIndex: 'chrVal04'
           },
		   {
            title: '收费次数05',
            align:"center",
            dataIndex: 'chrCnt05'
           },
		   {
            title: '收费金额05',
            align:"center",
            dataIndex: 'chrVal05'
           },
		   {
            title: '收费次数06',
            align:"center",
            dataIndex: 'chrCnt06'
           },
		   {
            title: '收费金额06',
            align:"center",
            dataIndex: 'chrVal06'
           },
		   {
            title: '收费次数07',
            align:"center",
            dataIndex: 'chrCnt07'
           },
		   {
            title: '收费金额07',
            align:"center",
            dataIndex: 'chrVal07'
           },
		   {
            title: '收费次数08',
            align:"center",
            dataIndex: 'chrCnt08'
           },
		   {
            title: '收费金额08',
            align:"center",
            dataIndex: 'chrVal08'
           },
		   {
            title: '收费次数09',
            align:"center",
            dataIndex: 'chrCnt09'
           },
		   {
            title: '收费金额09',
            align:"center",
            dataIndex: 'chrVal09'
           },
		   {
            title: '收费次数10',
            align:"center",
            dataIndex: 'chrCnt10'
           },
		   {
            title: '收费金额10',
            align:"center",
            dataIndex: 'chrVal10'
           },
		   {
            title: '是否允许bancslink柜员访问的产品',
            align:"center",
            dataIndex: 'allowBl'
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
          list: "/zzzhzb/zzzhzb/list",
          delete: "/zzzhzb/zzzhzb/delete",
          deleteBatch: "/zzzhzb/zzzhzb/deleteBatch",
          exportXlsUrl: "zzzhzb/zzzhzb/exportXls",
          importExcelUrl: "zzzhzb/zzzhzb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.acctOpenDate;
        return filterObj(param);
      },
      onChangezjzhkhrq(value,dateString){
        let acctOpenDateString=dateString
        this.queryParam.acctOpenDate_begin=acctOpenDateString[0]
        this.queryParam.acctOpenDate_end=acctOpenDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>