<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行编号">
              <a-input placeholder="请输入银行编号" v-model="queryParam.bank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易类型">
              <a-input placeholder="请输入交易类型" v-model="queryParam.transType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.cardNbr"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易网点">
              <a-input placeholder="请输入交易网点" v-model="queryParam.brno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易柜员">
              <a-input placeholder="请输入交易柜员" v-model="queryParam.empno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="代理机构、转发机构、发卡机构代码">
              <a-input placeholder="请输入代理机构、转发机构、发卡机构代码" v-model="queryParam.mcposData"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangejyrq" v-model="queryParam.inpDate" :format="dateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="入帐日期">
              <a-range-picker @change="onChangerzrq" v-model="queryParam.valDate" :format="dateFormat2"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户交易数据')">导出</a-button>
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
        :scroll="{x:6450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khjysj-modal ref="modalForm" @ok="modalFormOk"></khjysj-modal>
  </a-card>
</template>

<script>
  import KhjysjModal from './modules/KhjysjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  export default {
    name: "KhjysjList",
    mixins:[JeecgListMixin],
    components: {
      KhjysjModal
    },
    data () {
      return {
        description: '客户交易数据管理页面',
        // 表头
        dateFormat:'YYYYMMDD',
        dateFormat2:'YYYYMMDD',
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
            title: '银行编号',
            align:"center",
            dataIndex: 'bank'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'transType'
           },
		   {
            title: '交易类型描述',
            align:"center",
            dataIndex: 'descPrint'
           },
		   {
            title: '卡号',
            align:"center",
            dataIndex: 'cardNbr'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'billAmt'
           },
		   {
            title: '交易金额符号',
            align:"center",
            dataIndex: 'billAmtSign'
           },
		   {
            title: '商户类型',
            align:"center",
            dataIndex: 'merCatCd'
           },
		   {
            title: '商户代码',
            align:"center",
            dataIndex: 'merchant'
           },
		   {
            title: '受卡机终端标识码',
            align:"center",
            dataIndex: 'terminali'
           },
		   {
            title: '检索参考号',
            align:"center",
            dataIndex: 'microRef'
           },
		   {
            title: '授权应答码',
            align:"center",
            dataIndex: 'authCode'
           },
		   {
            title: '清算日期',
            align:"center",
            dataIndex: 'settleDay'
           },
		   {
            title: '交易币种',
            align:"center",
            dataIndex: 'currncyCd'
           },
		   {
            title: '撤销、冲正标志',
            align:"center",
            dataIndex: 'revInd'
           },
		   {
            title: '交易描述1',
            align:"center",
            dataIndex: 'desLine1'
           },
		   {
            title: '交易描述2',
            align:"center",
            dataIndex: 'desLine2'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'inpDate'
           },
		   {
            title: '入帐日期',
            align:"center",
            dataIndex: 'valDate'
           },
		   {
            title: '交易发生日期',
            align:"center",
            dataIndex: 'purDate'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'inpTime'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'xtranno'
           },
		   {
            title: '交易网点',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: '交易柜员',
            align:"center",
            dataIndex: 'empno'
           },
		   {
            title: '汇兑手续费或系统追踪号',
            align:"center",
            dataIndex: 'schmfeeamt'
           },
		   {
            title: '月份编号',
            align:"center",
            dataIndex: 'monthNbr'
           },
		   {
            title: '原始币种',
            align:"center",
            dataIndex: 'orgnCurr'
           },
		   {
            title: '原始金额',
            align:"center",
            dataIndex: 'orgnAmt'
           },
		   {
            title: '交易来源',
            align:"center",
            dataIndex: 'transSrc'
           },
		   {
            title: '受理方标识码',
            align:"center",
            dataIndex: 'capAddr'
           },
		   {
            title: '分期付款类型',
            align:"center",
            dataIndex: 'secLvl'
           },
		   {
            title: '人行渠道标志',
            align:"center",
            dataIndex: 'cbRights'
           },
		   {
            title: '分期付款序号及其他信息',
            align:"center",
            dataIndex: 'merchSeq'
           },
		   {
            title: '交易金额中溢缴款部分金额',
            align:"center",
            dataIndex: 'expayAmt'
           },
		   {
            title: '万事达免汇兑手续费交易标志或IC卡交易标志',
            align:"center",
            dataIndex: 'pointPost'
           },
		   {
            title: '渠道标识',
            align:"center",
            dataIndex: 'purchseId'
           },
		   {
            title: '代理机构、转发机构、发卡机构代码',
            align:"center",
            dataIndex: 'mcposData'
           },
		   {
            title: '国家代码',
            align:"center",
            dataIndex: 'merchStat'
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
		  /* {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
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
          list: "/khjysj/khjysj/list",
          delete: "/khjysj/khjysj/delete",
          deleteBatch: "/khjysj/khjysj/deleteBatch",
          exportXlsUrl: "khjysj/khjysj/exportXls",
          importExcelUrl: "khjysj/khjysj/importExcel",
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
        delete param.inpDate;
        delete param.valDate;
        return filterObj(param);
      },
      onChangejyrq(value,dateString){
        let inpDateString = dateString
        this.queryParam.inpDate_begin = inpDateString[0]
        this.queryParam.inpDate_end = inpDateString[1]
      },
      onChangerzrq(value,dateString){
        let valDateString = dateString
        this.queryParam.valDate_begin = valDateString[0]
        this.queryParam.valDate_end = valDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>