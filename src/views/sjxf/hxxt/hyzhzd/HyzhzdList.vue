<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户所在的机构">
<!--              <a-input placeholder="请输入机构码" v-model="queryParam.instNo"></a-input>-->
              <j-tree-select placeholder="请选择开户所在的机构"
                             v-model="queryParam.branch"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="帐号">
              <a-input placeholder="请输入帐号" v-model="queryParam.accNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
              <a-input placeholder="请输入机构码" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.customerNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人姓名">
              <a-input placeholder="请输入收款人姓名" v-model="queryParam.benefName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同号">
              <a-input placeholder="请输入合同号" v-model="queryParam.contractNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人帐号">
              <a-input placeholder="请输入收款人帐号" v-model="queryParam.payeeAcctNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('或有账户主档')">导出</a-button>

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
        :scroll="{x:10450}"
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
    <hyzhzd-modal ref="modalForm" @ok="modalFormOk"></hyzhzd-modal>
  </a-card>
</template>

<script>
  import HyzhzdModal from './modules/HyzhzdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'

  export default {
    name: "HyzhzdList",
    mixins:[JeecgListMixin],
    components: {
      HyzhzdModal,JTreeSelect
    },
    data () {
      return {
        description: '或有账户主档管理页面',
        // 表头
        dateFormat:'YYYYMMDD',
        dateFormat2:'YYYYMMDD',
        dateFormat3:'YYYYMMDD',
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
            title: '机构码',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'accNo'
           },
		   {
            title: 'CTAVST',
            align:"center",
            dataIndex: 'ctavst'
           },
		   {
            title: 'NO_TX',
            align:"center",
            dataIndex: 'noTx'
           },
		   {
            title: 'NO_PER_TX',
            align:"center",
            dataIndex: 'noPerTx'
           },
		   {
            title: '记录号',
            align:"center",
            dataIndex: 'recNo'
           },
		   {
            title: 'NO_NON_FIN',
            align:"center",
            dataIndex: 'noNonFin'
           },
		   {
            title: '系统模块',
            align:"center",
            dataIndex: 'system'
           },
		   {
            title: '客户所在的机构',
            align:"center",
            dataIndex: 'branch'
           },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'acctType'
           },
		   {
            title: '产品细类',
            align:"center",
            dataIndex: 'intCat'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'currency'
           },
		   {
            title: '最近的维护交易日',
            align:"center",
            dataIndex: 'lastMaintDt'
           },
		   {
            title: '最近的金融交易日',
            align:"center",
            dataIndex: 'lastFinDt'
           },
		   {
            title: 'GL分类代码',
            align:"center",
            dataIndex: 'glClassCode'
           },
		   {
            title: '客户号',
            align:"center",
            dataIndex: 'customerNo'
           },
		   {
            title: '当前账户金额',
            align:"center",
            dataIndex: 'currentBalance'
           },
		   {
            title: '访问码',
            align:"center",
            dataIndex: 'accessCode'
           },
		   {
            title: '进入机构号',
            align:"center",
            dataIndex: 'accessBranchNo'
           },
		   {
            title: '进入柜员号',
            align:"center",
            dataIndex: 'accessTellerNo'
           },
		   {
            title: '票据类型',
            align:"center",
            dataIndex: 'instrumentType'
           },
		   {
            title: 'FEE_BEARER',
            align:"center",
            dataIndex: 'feeBearer'
           },
		   {
            title: '申请日期',
            align:"center",
            dataIndex: 'applicationDate'
           },
		   {
            title: '申请金额',
            align:"center",
            dataIndex: 'applicationAmt'
           },
		   {
            title: '原国家',
            align:"center",
            dataIndex: 'originCountry'
           },
		   {
            title: '目标国家',
            align:"center",
            dataIndex: 'destCountry'
           },
		   {
            title: '可信用银行',
            align:"center",
            dataIndex: 'creditAvailWith'
           },
		   {
            title: '是否有信用',
            align:"center",
            dataIndex: 'creditAvailBy'
           },
		   {
            title: '适用地区',
            align:"center",
            dataIndex: 'placeOfExpiry'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'dateOfExpiry'
           },
		   {
            title: '支付免除文件',
            align:"center",
            dataIndex: 'chargeExProfile'
           },
		   {
            title: '核准日',
            align:"center",
            dataIndex: 'approvalDate'
           },
		   {
            title: '核准金额',
            align:"center",
            dataIndex: 'approvalAmount'
           },
		   {
            title: '最新变更账户类型日期',
            align:"center",
            dataIndex: 'lastAcctTypeChg'
           },
		   {
            title: '释放交易金额',
            align:"center",
            dataIndex: 'releaseAmount'
           },
		   {
            title: '担保费率',
            align:"center",
            dataIndex: 'feeRate'
           },
		   {
            title: '保证金比例',
            align:"center",
            dataIndex: 'marginRate'
           },
		   {
            title: '商业交易ID',
            align:"center",
            dataIndex: 'busSalesId'
           },
		   {
            title: '交易部门监督人',
            align:"center",
            dataIndex: 'busDepSpvsr'
           },
		   {
            title: '存档文件序列号',
            align:"center",
            dataIndex: 'fldDocSrlNo'
           },
		   {
            title: '取款日期',
            align:"center",
            dataIndex: 'drwdownDate'
           },
		   {
            title: '第一次下载长度',
            align:"center",
            dataIndex: 'frstDrwdownLen'
           },
		   {
            title: '利息偿还通知天数',
            align:"center",
            dataIndex: 'intRpyNtcDays'
           },
		   {
            title: '还款收据',
            align:"center",
            dataIndex: 'rpayReceipt'
           },
		   {
            title: '存储状态',
            align:"center",
            dataIndex: 'storeStatus'
           },
		   {
            title: '利润费用',
            align:"center",
            dataIndex: 'marginFee'
           },
		   {
            title: '账单接收号码',
            align:"center",
            dataIndex: 'baNo'
           },
		   {
            title: 'L/C即付标识',
            align:"center",
            dataIndex: 'lcSightInd'
           },
		   {
            title: 'PRE_RECEIVABLE',
            align:"center",
            dataIndex: 'preReceivable'
           },
		   {
            title: 'CTA的期数',
            align:"center",
            dataIndex: 'term'
           },
		   {
            title: '期数单位',
            align:"center",
            dataIndex: 'termBasis'
           },
		   {
            title: 'IBP号码',
            align:"center",
            dataIndex: 'ibpNo'
           },
		   {
            title: '收款人姓名',
            align:"center",
            dataIndex: 'benefName'
           },
		   {
            title: '合同号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '合同类型',
            align:"center",
            dataIndex: 'contractType'
           },
		   {
            title: '出票人帐号',
            align:"center",
            dataIndex: 'escrowAcct'
           },
		   {
            title: '核准等级',
            align:"center",
            dataIndex: 'apprvalLevel'
           },
		   {
            title: '保证金帐号',
            align:"center",
            dataIndex: 'guarrantyNo'
           },
		   {
            title: '假日处理',
            align:"center",
            dataIndex: 'holProcess'
           },
		   {
            title: '到期自动扣款方式',
            align:"center",
            dataIndex: 'deductMethod'
           },
		   {
            title: '收款人姓名',
            align:"center",
            dataIndex: 'drawerName'
           },
		   {
            title: '逾期利率',
            align:"center",
            dataIndex: 'overdueIntRate'
           },
		   {
            title: '收款行地址',
            align:"center",
            dataIndex: 'payeeBankNo'
           },
		   {
            title: '收款人帐号',
            align:"center",
            dataIndex: 'payeeAcctNo'
           },
		   {
            title: '客户经理',
            align:"center",
            dataIndex: 'relManager'
           },
		   {
            title: 'HOLD_JRN_NO',
            align:"center",
            dataIndex: 'holdJrnNo'
           },
		   {
            title: '票据号码',
            align:"center",
            dataIndex: 'draftNumber'
           },
		   {
            title: 'BGD所在的机构',
            align:"center",
            dataIndex: 'bgdBranch'
           },
		   {
            title: '收款行的名称',
            align:"center",
            dataIndex: 'payeeBankName'
           },
		   {
            title: '收款行地址1',
            align:"center",
            dataIndex: 'payeeBankAdd1'
           },
		   {
            title: '收款行地址2',
            align:"center",
            dataIndex: 'payeeBankAdd2'
           },
		   {
            title: '收款行地址3',
            align:"center",
            dataIndex: 'payeeBankAdd3'
           },
		   {
            title: '一本通子账户类型',
            align:"center",
            dataIndex: 'escrowMcaSubTyp'
           },
		   {
            title: '填充',
            align:"center",
            dataIndex: 'fil01'
           },
		   {
            title: '最后的维护日期',
            align:"center",
            dataIndex: 'lastMaintDate'
           },
		   {
            title: '最后的维护状态',
            align:"center",
            dataIndex: 'lastMaintStat'
           },
		   {
            title: '最后维护日期',
            align:"center",
            dataIndex: 'lstFinUpdDt'
           },
		   {
            title: '最后维护类型',
            align:"center",
            dataIndex: 'lstFinStat'
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
          list: "/hyzhzd/hyzhzd/list",
          delete: "/hyzhzd/hyzhzd/delete",
          deleteBatch: "/hyzhzd/hyzhzd/deleteBatch",
          exportXlsUrl: "hyzhzd/hyzhzd/exportXls",
          importExcelUrl: "hyzhzd/hyzhzd/importExcel",
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
        delete param.applicationDate;
        delete param.approvalDate;
        delete param.dateOfExpiry;
        return filterObj(param);
      },

      onChangezjkzr(value,dateString){
        let approvalDateString = dateString
        this.queryParam.approvalDate_begin= approvalDateString[0]
        this.queryParam.approvalDate_end= approvalDateString[1]

      },
      onChangezjsqrq(value,dateString){
        let applicationDateString=dateString
        this.queryParam.applicationDate_begin=applicationDateString[0]
        this.queryParam.applicationDate_end=applicationDateString[1]
      },
      onChangezjdqr(value,dateString){
        let dateOfExpiryString=dateString
        this.queryParam.dateOfExpiry_begin=dateOfExpiryString[0]
        this.queryParam.dateOfExpiry_end=dateOfExpiryString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>