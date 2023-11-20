<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <a-input placeholder="请输入机构号" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入流水号" v-model="queryParam.jrnlNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="记录号">
              <a-input placeholder="请输入记录号" v-model="queryParam.recNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="帐号">
              <a-input placeholder="请输入帐号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.trnCode"></a-input>
            </a-form-item>
          </a-col>
         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易发生日期">
              <a-range-picker  @change="onChangezjyfsrq" v-model="queryParam.trnDate"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款流水_80')">导出</a-button>
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
        :scroll="{x:8430}"
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
    <ckls_80-modal ref="modalForm" @ok="modalFormOk"></ckls_80-modal>
  </a-card>
</template>

<script>
  import Ckls_80Modal from './modules/Ckls_80Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@comp/jeecg/JEllipsis'
  import { filterObj } from '@/utils/util'

  export default {
    name: "Ckls_80List",
    mixins:[JeecgListMixin],
    components: {
      Ckls_80Modal,JEllipsis
    },
    data () {
      return {
        description: '存款流水_80管理页面',
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
            title: '机构号',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '记录号',
            align:"center",
            dataIndex: 'recNo'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tranType'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '该条数据记录日期',
            align:"center",
            dataIndex: 'postDate'
           },
		   {
            title: '交易发生日期',
            align:"center",
            dataIndex: 'trnDate'
           },
		   {
            title: '系统日期',
            align:"center",
            dataIndex: 'systemDate'
           },
		   {
            title: '系统时间',
            align:"center",
            dataIndex: 'systemTime'
           },
		   {
            title: '柜员号和网点',
            align:"center",
            dataIndex: 'tellAndBr'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'jrnlNo'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'trnCode'
           },
		   {
            title: '终端号',
            align:"center",
            dataIndex: 'brterm'
           },
		   {
            title: '渠道',
            align:"center",
            dataIndex: 'channel'
           },
		   {
            title: '删除标志',
            align:"center",
            dataIndex: 'deli'
           },
		   {
            title: 'chqNoDays',
            align:"center",
            dataIndex: 'chqNoDays'
           },
		   {
            title: 'amount',
            align:"center",
            dataIndex: 'amount'
           },
		   {
            title: 'balance',
            align:"center",
            dataIndex: 'balance'
           },
		   {
            title: 'batchNo',
            align:"center",
            dataIndex: 'batchNo'
           },
		   {
            title: 'dayfileFlag',
            align:"center",
            dataIndex: 'dayfileFlag'
           },
		   {
            title: 'correction',
            align:"center",
            dataIndex: 'correction'
           },
		   {
            title: 'merchCountryCode',
            align:"center",
            dataIndex: 'merchCountryCode'
           },
		   {
            title: 'deferDays',
            align:"center",
            dataIndex: 'deferDays'
           },
		   {
            title: 'miscDrCrInd',
            align:"center",
            dataIndex: 'miscDrCrInd'
           },
		   {
            title: 'repostTime',
            align:"center",
            dataIndex: 'repostTime'
           },
		   {
            title: 'postSeq',
            align:"center",
            dataIndex: 'postSeq'
           },
		   {
            title: 'chqType',
            align:"center",
            dataIndex: 'chqType'
           },
		   {
            title: 'txnInd',
            align:"center",
            dataIndex: 'txnInd'
           },
		   {
            title: 'tranSystem',
            align:"center",
            dataIndex: 'tranSystem'
           },
		   {
            title: 'tranDesc',
            align:"center",
            dataIndex: 'tranDesc'
           },
		   {
            title: 'tranAcct',
            align:"center",
            dataIndex: 'tranAcct'
           },
		   {
            title: 'virtualAcct',
            align:"center",
            dataIndex: 'virtualAcct'
           },
		   {
            title: 'thisDepCnt',
            align:"center",
            dataIndex: 'thisDepCnt'
           },
		   {
            title: 'brkRuleindBefimg',
            align:"center",
            dataIndex: 'brkRuleindBefimg'
           },
		   {
            title: 'updCurrBalInd',
            align:"center",
            dataIndex: 'updCurrBalInd'
           },
		   {
            title: 'subAcctType',
            align:"center",
            dataIndex: 'subAcctType'
           },
		   {
            title: 'volume',
            align:"center",
            dataIndex: 'volume'
           },
		   {
            title: 'sequNum',
            align:"center",
            dataIndex: 'sequNum'
           },
		   {
            title: 'withdrMeth',
            align:"center",
            dataIndex: 'withdrMeth'
           },
		   {
            title: 'cloNoticeNum',
            align:"center",
            dataIndex: 'cloNoticeNum'
           },
		   {
            title: 'noticeNum',
            align:"center",
            dataIndex: 'noticeNum'
           },
		   {
            title: 'eduInd',
            align:"center",
            dataIndex: 'eduInd'
           },
		   {
            title: 'maturityFlg',
            align:"center",
            dataIndex: 'maturityFlg'
           },
		   {
            title: 'lostDte',
            align:"center",
            dataIndex: 'lostDte'
           },
		   {
            title: 'lostLogNum',
            align:"center",
            dataIndex: 'lostLogNum'
           },
		   {
            title: 'filler',
            align:"center",
            dataIndex: 'filler'
           },
		   {
            title: 'issueDate',
            align:"center",
            dataIndex: 'issueDate'
           },
		   {
            title: 'delayIntDays',
            align:"center",
            dataIndex: 'delayIntDays'
           },
		   {
            title: 'trfInActTyp',
            align:"center",
            dataIndex: 'trfInActTyp'
           },
		   {
            title: 'crSettleIntReason',
            align:"center",
            dataIndex: 'crSettleIntReason'
           },
		   {
            title: 'crChangeToSuspClo',
            align:"center",
            dataIndex: 'crChangeToSuspClo'
           },
		   {
            title: 'curr',
            align:"center",
            dataIndex: 'curr'
           },
		   {
            title: 'promoCode',
            align:"center",
            dataIndex: 'promoCode'
           },
		   {
            title: 'cshAnalyNum',
            align:"center",
            dataIndex: 'cshAnalyNum'
           },
		   {
            title: 'filler1',
            align:"center",
            dataIndex: 'filler1'
           },
		   {
            title: 'origJrnl',
            align:"center",
            dataIndex: 'origJrnl'
           },
		   {
            title: 'supervisorid',
            align:"center",
            dataIndex: 'supervisorid'
           },
		   {
            title: 'clientContact',
            align:"center",
            dataIndex: 'clientContact'
           },
		   {
            title: 'pwdlIntAmount',
            align:"center",
            dataIndex: 'pwdlIntAmount'
           },
		   {
            title: 'filler2',
            align:"center",
            dataIndex: 'filler2'
           },
		   {
            title: 'dataDate',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: 'loadDate',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ckls_80/ckls_80/list",
          delete: "/ckls_80/ckls_80/delete",
          deleteBatch: "/ckls_80/ckls_80/deleteBatch",
          exportXlsUrl: "ckls_80/ckls_80/exportXls",
          importExcelUrl: "ckls_80/ckls_80/importExcel",
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
        delete param.trnDate;
        return filterObj(param);
      },
      onChangezjyfsrq(value,dateString){
        let trnDateString = dateString
        this.queryParam.trnDate_begin=trnDateString[0]
        this.queryParam.trnDate_end=trnDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>