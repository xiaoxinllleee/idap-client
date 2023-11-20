<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
<!--              <a-input placeholder="全部" v-model="queryParam.brNo"></a-input>-->
              <j-tree-select placeholder="请选择机构码"
                             v-model="queryParam.brNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账户(16位)">
              <a-input placeholder="请输入加载日期" v-model="queryParam.accNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账户(17位)">
              <a-input placeholder="请输入加载日期" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="放款金额">
              <a-input-number placeholder="Minimum" v-model="queryParam.advVal_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.advVal_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款金额">
              <a-input-number placeholder="Minimum" v-model="queryParam.applicAmount_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.applicAmount_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input placeholder="请输入机构名称" v-model="queryParam.brName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.payCustName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同号">
              <a-input placeholder="请输入合同号" v-model="queryParam.businessNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款日期">
              <a-range-picker @change="onChangezjjkrq" v-model="queryParam.qxDate" :format="dateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日">
              <a-range-picker  @change="onChangezjdqr" v-model="queryParam.endDate" :format="dateFormat2"/>
            </a-form-item>
          </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="科目号">
                <a-input placeholder="请输入科目号" v-model="queryParam.subjNo"></a-input>
              </a-form-item>
          </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款主档宽表')">导出</a-button>
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
        :scroll="{x: 25000}"
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
    <dkzdkb-modal ref="modalForm" @ok="modalFormOk"></dkzdkb-modal>
  </a-card>
</template>

<script>
  import DkzdkbModal from './modules/DkzdkbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  export default {
    name: "DkzdkbList",
    mixins:[JeecgListMixin],
    components: {
      DkzdkbModal,JTreeSelect

    },
    data () {
      return {
        description: '贷款主档宽表管理页面',
        // 表头
        dateFormat :'YYYYMMDD',
        dateFormat2 :'YYYYMMDD',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '客户号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'brNo_dictText'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'brName'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'identType'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'identNo'
           },
		   {
            title: '贷款账号(17位)',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '信贷拮据号',
            align:"center",
            dataIndex: 'voucherNo'
           },
		   {
            title: '合同号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: '借款日期',
            align:"center",
            dataIndex: 'qxDate'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'endDate'
           },
		   {
            title: '贷款种类',
            align:"center",
            dataIndex: 'loanKind'
           },
		   {
            title: '剩余天数',
            align:"center",
            dataIndex: 'remainingDays'
           },
		   {
            title: '利率',
            align:"center",
            dataIndex: 'intRate'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'applicAmount'
           },
		   {
            title: '放款金额',
            align:"center",
            dataIndex: 'advVal'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'loanBal'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'intStrtDate'
           },
		   {
            title: '结息日',
            align:"center",
            dataIndex: 'repayDay'
           },
		   {
            title: '产品大类',
            align:"center",
            dataIndex: 'tfMcaSubAcctTp'
           },
		   {
            title: '产品小类',
            align:"center",
            dataIndex: 'tfMcaSubIntCat'
           },
		   {
            title: '产品名称',
            align:"center",
            dataIndex: 'catTypeName'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'custType'
           },
		   {
            title: '客户所属行业类型',
            align:"center",
            dataIndex: 'mainIndustry'
           },
		   {
            title: '企业规模',
            align:"center",
            dataIndex: 'entScale'
           },
		   {
            title: '贷款投向',
            align:"center",
            dataIndex: 'purposeType'
           },

          {
            title: '还款账号',
            align:"center",
            dataIndex: 'accNo'
          },
		   {
            title: '扣款户名',
            align:"center",
            dataIndex: 'payCustName'
           },
		   {
            title: '还款账户余额',
            align:"center",
            dataIndex: 'payAcctBal'
           },
		   {
            title: '五级分类调整日期',
            align:"center",
            dataIndex: 'fiveAdjustDate'
           },
		   {
            title: '贷款形态',
            align:"center",
            dataIndex: 'fiveClassType'
           },
		   {
            title: '担保方式',
            align:"center",
            dataIndex: 'vouchType'
           },
		   {
            title: '第一责任人',
            align:"center",
            dataIndex: 'custCn'
           },
		   {
            title: '最终审批人',
            align:"center",
            dataIndex: 'dutyCustId'
           },
		   {
            title: '最终审批人name',
            align:"center",
            dataIndex: 'employeeName'
           },
		   {
            title: '客户电话',
            align:"center",
            dataIndex: 'linkmanTel'
           },
		   {
            title: '客户地址',
            align:"center",
            dataIndex: 'addr'
           },
		   {
            title: '贷款账户欠息',
            align:"center",
            dataIndex: 'oweInterest'
           },
		   {
            title: '放款账号',
            align:"center",
            dataIndex: 'trfAcctNo'
           },
		   {
            title: '便民卡卡号',
            align:"center",
            dataIndex: 'cardNo'
           },
		   {
            title: '还款方式',
            align:"center",
            dataIndex: 'repaySched'
           },
		   {
            title: '贷款总期数',
            align:"center",
            dataIndex: 'loanTrm'
           },
		   {
            title: '不良贷款标识',
            align:"center",
            dataIndex: 'badDebtInd'
           },
		   {
            title: '产品代码',
            align:"center",
            dataIndex: 'actType'
           },
		   {
            title: '桶子[P],未还本金13523拖欠本金',
            align:"center",
            dataIndex: 'unpdPrinBal'
           },
		   {
            title: '桶子[I],拖欠利息结息交易13509',
            align:"center",
            dataIndex: 'capUnpdInt'
           },
		   {
            title: '桶子[A],FINE2利息罚息结息交易11721',
            align:"center",
            dataIndex: 'unpdArrsIntBal'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curr'
           },
		   {
            title: '利息计提',
            align:"center",
            dataIndex: 'intAccr'
           },
		   {
            title: '拖欠本金',
            align:"center",
            dataIndex: 'unpdArrPrnBal'
           },
		   {
            title: '本金罚息计提',
            align:"center",
            dataIndex: 'arrIntAccr'
           },
		   {
            title: '利息罚息计提',
            align:"center",
            dataIndex: 'fine2IntAccr'
           },
		   {
            title: '欠本罚息',
            align:"center",
            dataIndex: 'unpdIntArrPrn'
           },
		   {
            title: '复利应计利息',
            align:"center",
            dataIndex: 'fine4IntAccr'
           },
		   {
            title: '本金核算码',
            align:"center",
            dataIndex: 'glClassCode'
           },
		   {
            title: '合同金额',
            align:"center",
            dataIndex: 'appSum'
           },
		   {
            title: '应计利息',
            align:"center",
            dataIndex: 'intIncr'
           },
		   {
            title: '是否停止计息',
            align:"center",
            dataIndex: 'stopAccrual'
           },
		   {
            title: '科目号',
            align:"center",
            dataIndex: 'subjNo'
           },
		   {
            title: '科目号名称',
            align:"center",
            dataIndex: 'subjName'
           },
		   {
            title: '最后金融交易日期',
            align:"center",
            dataIndex: 'lstFinDate'
           },
		   {
            title: '垫款贷款',
            align:"center",
            dataIndex: 'ctaReference'
           },
		   {
            title: '贷款账号(16位)',
            align:"center",
            dataIndex: 'accNo'
           },
		   {
            title: '展期前产品子类',
            align:"center",
            dataIndex: 'currIntCat'
           },
		   {
            title: '展期后产品子类',
            align:"center",
            dataIndex: 'newIntCat'
           },
		   {
            title: '展期后产品代码',
            align:"center",
            dataIndex: 'newAcctType'
           },
		   {
            title: '展期前产品代码',
            align:"center",
            dataIndex: 'currAcctType'
           },
		   {
            title: '展期前到期日',
            align:"center",
            dataIndex: 'currExpDate'
           },
		   {
            title: '展期后到期日',
            align:"center",
            dataIndex: 'newExpDate'
           },
		   {
            title: '重整批准日期',
            align:"center",
            dataIndex: 'approveDt'
           },
		   {
            title: '展期原利率',
            align:"center",
            dataIndex: 'oldRate'
           },
		   {
            title: '展期标志',
            align:"center",
            dataIndex: 'expFlag'
           },
		   {
            title: '核销本金',
            align:"center",
            dataIndex: 'glBucketDue01'
           },
		   {
            title: '核销利息',
            align:"center",
            dataIndex: 'glBucketDue02'
           },
		   {
            title: '核销罚息3',
            align:"center",
            dataIndex: 'glBucketDue03'
           },
		   {
            title: '核销罚息4',
            align:"center",
            dataIndex: 'glBucketDue04'
           },
		   {
            title: '核销罚息5',
            align:"center",
            dataIndex: 'glBucketDue05'
           },
		   {
            title: '放款日期',
            align:"center",
            dataIndex: 'appPutOutDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'appMaturityDate'
           },
		   {
            title: '置换旧账号',
            align:"center",
            dataIndex: 'reOldAcctNo'
           },
		   {
            title: '本金置换日期',
            align:"center",
            dataIndex: 'prnReDate'
           },
		   {
            title: '利息置换日期',
            align:"center",
            dataIndex: 'intReDate'
           },
		   {
            title: '本金置换金额',
            align:"center",
            dataIndex: 'prnReAmount'
           },
		   {
            title: '利息置换金额',
            align:"center",
            dataIndex: 'intReAmount'
           },
		   {
            title: '贷款还款金额',
            align:"center",
            dataIndex: 'dueAmt'
           },
		   {
            title: '原贷款还款金额',
            align:"center",
            dataIndex: 'oldDueAmt'
           },
		   {
            title: '原贷款总期数',
            align:"center",
            dataIndex: 'oldLoanTrm'
           },
		   {
            title: '资金协议号',
            align:"center",
            dataIndex: 'fundAgrNo'
           },
		   {
            title: '核销日期',
            align:"center",
            dataIndex: 'badDebtTrfDte'
           },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'signDate'
           },
		   {
            title: '合同约定发放日',
            align:"center",
            dataIndex: 'contractPutOutDate'
           },
		   {
            title: '合同约定到期日',
            align:"center",
            dataIndex: 'contractMaturity'
           },
		   {
            title: '合同批准日期',
            align:"center",
            dataIndex: 'appDate'
           },
		   {
            title: '录入机构',
            align:"center",
            dataIndex: 'orgId'
           },
		   {
            title: '申请币种',
            align:"center",
            dataIndex: 'applyCurrency'
           },
		   {
            title: '贷款期限',
            align:"center",
            dataIndex: 'appTerm'
           },
		   {
            title: '信贷贷款品种',
            align:"center",
            dataIndex: 'businessPhase'
           },
		   {
            title: '五级分类调整日期',
            align:"center",
            dataIndex: 'fiveClassDate'
           },
		   {
            title: '剩余期数',
            align:"center",
            dataIndex: 'remRepays'
           },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '拖欠本金',
            align:"center",
            dataIndex: 'oweAmtP'
           },
		   {
            title: '拖欠利息',
            align:"center",
            dataIndex: 'oweAmtI'
           },
		   {
            title: '本金罚息',
            align:"center",
            dataIndex: 'oweAmtW'
           },
		   {
            title: '利息罚息',
            align:"center",
            dataIndex: 'oweAmtA'
           },
		   {
            title: '拖欠复利',
            align:"center",
            dataIndex: 'oweAmtE'
           },
		   {
            title: '应计本金',
            align:"center",
            dataIndex: 'bucketCdeP'
           },
		   {
            title: '应计本金的利息',
            align:"center",
            dataIndex: 'bucketCdeI'
           },
		   {
            title: '应计本金的罚息',
            align:"center",
            dataIndex: 'bucketCdeW'
           },
		   {
            title: '应计利息的罚息',
            align:"center",
            dataIndex: 'bucketCdeA'
           },
		   {
            title: '应计利息的复利',
            align:"center",
            dataIndex: 'bucketCdeE'
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
            title: 'autoDbtAcctNo',
            align:"center",
            dataIndex: 'autoDbtAcctNo'
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
          list: "/dkzdkb/dkzdkb/list",
          delete: "/dkzdkb/dkzdkb/delete",
          deleteBatch: "/dkzdkb/dkzdkb/deleteBatch",
          exportXlsUrl: "dkzdkb/dkzdkb/exportXls",
          importExcelUrl: "dkzdkb/dkzdkb/importExcel",
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
        delete param.qxDate;
        delete param.endDate;
        return filterObj(param);
      },

      onChangezjjkrq(value,dateString){
        let qxDateString=dateString
        this.queryParam.qxDate_begin=qxDateString[0]
        this.queryParam.qxDate_end=qxDateString[1]
      },
      onChangezjdqr(value,dateString){
        let endDateString=dateString
        this.queryParam.endDate_begin=endDateString[0]
        this.queryParam.endDate_end=endDateString[1]
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>