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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="终端号">
              <a-input placeholder="请输入终端号" v-model="queryParam.brterm"></a-input>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款流水_01')">导出</a-button>
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
        :scroll="{x:3430}"

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
    <ckls_01-modal ref="modalForm" @ok="modalFormOk"></ckls_01-modal>
  </a-card>
</template>

<script>
  import Ckls_01Modal from './modules/Ckls_01Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JEllipsis from '@comp/jeecg/JEllipsis'

  export default {
    name: "Ckls_01List",
    mixins:[JeecgListMixin],
    components: {
      Ckls_01Modal,JEllipsis
    },
    data () {
      return {
        description: '存款流水_01管理页面',
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
            title: '支票有效天数',
            align:"center",
            dataIndex: 'chqNoDays'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amount'
           },
		   {
            title: '账户余额',
            align:"center",
            dataIndex: 'balance'
           },
		   {
            title: '批次号',
            align:"center",
            dataIndex: 'batchNo'
           },
		   {
            title: '利息推迟标志',
            align:"center",
            dataIndex: 'dayfileFlag'
           },
		   {
            title: '冲正标志',
            align:"center",
            dataIndex: 'correction'
           },
		   {
            title: '国家代码',
            align:"center",
            dataIndex: 'merchCountryCode'
           },
		   {
            title: '利息延迟天数',
            align:"center",
            dataIndex: 'deferDays'
           },
		   {
            title: '借贷标识',
            align:"center",
            dataIndex: 'miscDrCrInd'
           },
		   {
            title: '记账时间',
            align:"center",
            dataIndex: 'repostTime'
           },
		   {
            title: '记账序列',
            align:"center",
            dataIndex: 'postSeq'
           },
		   {
            title: '交易标识',
            align:"center",
            dataIndex: 'txnInd'
           },
		   {
            title: '交易所属系统',
            align:"center",
            dataIndex: 'tranSystem'
           },
		   {
            title: '转账交易标识',
            align:"center",
            dataIndex: 'tranDesc'
           },
		   {
            title: '转账交易的转账账号',
            align:"center",
            dataIndex: 'tranAcct'
           },
		   {
            title: '一本通存折标识',
            align:"center",
            dataIndex: 'mcaPwdlStat'
           },
		   {
            title: '定期一本通部提后册号',
            align:"center",
            dataIndex: 'mcaPwdlVolumeNo'
           },
		   {
            title: '定期一本通部提后序号',
            align:"center",
            dataIndex: 'mcaPwdlSeqNo'
           },
		   {
            title: '零存计数',
            align:"center",
            dataIndex: 'thisDepCnt'
           },
		   {
            title: '标识零存是否违约',
            align:"center",
            dataIndex: 'brkRuleindBefimg'
           },
		   {
            title: '标识是否更新当前余额',
            align:"center",
            dataIndex: 'updCurrBalInd'
           },
		   {
            title: '子账户产品子类',
            align:"center",
            dataIndex: 'subAcctType'
           },
		   {
            title: '存折册号',
            align:"center",
            dataIndex: 'volume'
           },
		   {
            title: '存折序号',
            align:"center",
            dataIndex: 'sequNum'
           },
		   {
            title: '支取方式',
            align:"center",
            dataIndex: 'withdrMeth'
           },
		   {
            title: '标识是否为教育储蓄',
            align:"center",
            dataIndex: 'eduInd'
           },
		   {
            title: '标识是否强制到期',
            align:"center",
            dataIndex: 'maturityFlg'
           },
		   {
            title: '凭证挂失日期',
            align:"center",
            dataIndex: 'lostDte'
           },
		   {
            title: '挂失登记号',
            align:"center",
            dataIndex: 'lostLogNum'
           },
		   {
            title: '支票签发日期',
            align:"center",
            dataIndex: 'issueDate'
           },
		   {
            title: '转代销户标识',
            align:"center",
            dataIndex: 'crChangeToSuspClo'
           },
		   {
            title: '交易币种',
            align:"center",
            dataIndex: 'curr'
           },
		   {
            title: '提示码',
            align:"center",
            dataIndex: 'promoCode'
           },
		   {
            title: '现金统计分析码',
            align:"center",
            dataIndex: 'cshAnalyNum'
           },
		   {
            title: '原流水号',
            align:"center",
            dataIndex: 'origJrnl'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'supervisorid'
           },
		   {
            title: '部提或关户结息金额',
            align:"center",
            dataIndex: 'pwdlIntAmount'
           },
		   {
            title: '子渠道',
            align:"center",
            dataIndex: 'subChannel'
           },
		   {
            title: 'filler2',
            align:"center",
            dataIndex: 'filler2'
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
          list: "/ckls_01/ckls_01/list",
          delete: "/ckls_01/ckls_01/delete",
          deleteBatch: "/ckls_01/ckls_01/deleteBatch",
          exportXlsUrl: "ckls_01/ckls_01/exportXls",
          importExcelUrl: "ckls_01/ckls_01/importExcel",
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