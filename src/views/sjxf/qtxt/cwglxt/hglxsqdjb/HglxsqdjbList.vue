<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="审批编号">
              <a-input placeholder="请输入审批编号" v-model="queryParam.appNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易类型">
              <a-input placeholder="请输入交易类型" v-model="queryParam.tradeType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易对手编号">
              <a-input placeholder="请输入交易对手编号" v-model="queryParam.ctpyNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="申请操作员">
              <a-input placeholder="请输入申请操作员" v-model="queryParam.pactNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="申请回购利率(%)">
              <a-input placeholder="请输入申请回购利率(%)" v-model="queryParam.repRate0"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('回购立项申请登记簿')">导出</a-button>
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
    <hglxsqdjb-modal ref="modalForm" @ok="modalFormOk"></hglxsqdjb-modal>
  </a-card>
</template>

<script>
  import HglxsqdjbModal from './modules/HglxsqdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "HglxsqdjbList",
    mixins:[JeecgListMixin],
    components: {
      HglxsqdjbModal
    },
    data () {
      return {
        description: '回购立项申请登记簿管理页面',
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
            title: '审批编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '质押物笔数',
            align:"center",
            dataIndex: 'pledgeCnt'
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
            title: '交易对手方名称',
            align:"center",
            dataIndex: 'ctpyName'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tradeType'
           },
		   {
            title: '回购期限(天)',
            align:"center",
            dataIndex: 'dCnt'
           },
		   {
            title: '清算方式',
            align:"center",
            dataIndex: 'qsSpeed'
           },
		   {
            title: '回购利率(%)',
            align:"center",
            dataIndex: 'repRate'
           },
		   {
            title: '首次结算方式',
            align:"center",
            dataIndex: 'firstSetrType'
           },
		   {
            title: '到期结算方式',
            align:"center",
            dataIndex: 'mtrSetrType'
           },
		   {
            title: '首次结算日',
            align:"center",
            dataIndex: 'firstDate'
           },
		   {
            title: '到期结算日',
            align:"center",
            dataIndex: 'mrtDate'
           },
		   {
            title: '质押物面值合计(万元)',
            align:"center",
            dataIndex: 'pledgeAmt'
           },
		   {
            title: '结算金额(万元)',
            align:"center",
            dataIndex: 'settlAmt'
           },
		   {
            title: '申请回购利率(%)',
            align:"center",
            dataIndex: 'repRate0'
           },
		   {
            title: '第1个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate1'
           },
		   {
            title: '第2个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate2'
           },
		   {
            title: '第3个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate3'
           },
		   {
            title: '第4个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate4'
           },
		   {
            title: '第5个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate5'
           },
		   {
            title: '第6个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate6'
           },
		   {
            title: '第7个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate7'
           },
		   {
            title: '第8个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate8'
           },
		   {
            title: '第9个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate9'
           },
		   {
            title: '第10个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate10'
           },
		   {
            title: '第11个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate11'
           },
		   {
            title: '第12个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate12'
           },
		   {
            title: '第13个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate13'
           },
		   {
            title: '第14个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate14'
           },
		   {
            title: '第15个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate15'
           },
		   {
            title: '第16个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate16'
           },
		   {
            title: '第17个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate17'
           },
		   {
            title: '第18个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate18'
           },
		   {
            title: '第19个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate19'
           },
		   {
            title: '第20个审批岗位审批回购利率',
            align:"center",
            dataIndex: 'repRate20'
           },
		   {
            title: '所属部门',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '回购成交单编号',
            align:"center",
            dataIndex: 'pactNo'
           },
		   {
            title: '到期结算申请编号',
            align:"center",
            dataIndex: 'dappNo'
           },
		   {
            title: '所属账务机构',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '申请操作员',
            align:"center",
            dataIndex: 'tel'
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
            title: '本方名称',
            align:"center",
            dataIndex: 'bctpyName'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '询价情况',
            align:"center",
            dataIndex: 'brf'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: 'CTPY_DEP_NO',
            align:"center",
            dataIndex: 'ctpyDepNo'
           },
		   {
            title: 'BCTPY_DEP_NO',
            align:"center",
            dataIndex: 'bctpyDepNo'
           },
		   {
            title: 'S_DATE',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: 'E_DATE',
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
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/hglxsqdjb/hglxsqdjb/list",
          delete: "/hglxsqdjb/hglxsqdjb/delete",
          deleteBatch: "/hglxsqdjb/hglxsqdjb/deleteBatch",
          exportXlsUrl: "hglxsqdjb/hglxsqdjb/exportXls",
          importExcelUrl: "hglxsqdjb/hglxsqdjb/importExcel",
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