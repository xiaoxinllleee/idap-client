<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡流水号">
              <a-input placeholder="请输入卡流水号" v-model="queryParam.jnlno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水类型">
              <a-input placeholder="请输入流水类型" v-model="queryParam.type"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主账号">
              <a-input placeholder="请输入主账号" v-model="queryParam.txnAccount"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker  @change="onChangezjcsrq" v-model="queryParam.txnDate" :format="YYYYMMDD"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易网点">
              <a-input placeholder="请输入交易网点" v-model="queryParam.txnBranch"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易受理柜员">
              <a-input placeholder="请输入交易受理柜员" v-model="queryParam.txnTeller"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否冲正成功标志">
              <a-input placeholder="请输入是否冲正成功标志" v-model="queryParam.suspended"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('卡账交易流水')">导出</a-button>
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
        :scroll="{x:4450}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <kzjyls-modal ref="modalForm" @ok="modalFormOk"></kzjyls-modal>
  </a-card>
</template>

<script>
  import KzjylsModal from './modules/KzjylsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  export default {
    name: "KzjylsList",
    mixins:[JeecgListMixin],
    components: {
      KzjylsModal
    },
    data () {
      return {
        description: '卡账交易流水管理页面',
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
            title: 'Clusternodeidentifier',
            align:"center",
            dataIndex: 'node'
           },
		   {
            title: '卡流水号',
            align:"center",
            dataIndex: 'jnlno'
           },
		   {
            title: '处理进程名称',
            align:"center",
            dataIndex: 'process'
           },
		   {
            title: '流水类型',
            align:"center",
            dataIndex: 'type'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'txnCode'
           },
		   {
            title: '主账号',
            align:"center",
            dataIndex: 'txnAccount'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txnDate'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'txnAmount'
           },
		   {
            title: '交易机构索引',
            align:"center",
            dataIndex: 'txnInst'
           },
		   {
            title: '交易网点',
            align:"center",
            dataIndex: 'txnBranch'
           },
		   {
            title: '交易受理柜员',
            align:"center",
            dataIndex: 'txnTeller'
           },
		   {
            title: '交易终端',
            align:"center",
            dataIndex: 'txnTerminal'
           },
		   {
            title: '交易接收时间',
            align:"center",
            dataIndex: 'systemDate'
           },
		   {
            title: '清算日期',
            align:"center",
            dataIndex: 'settleDate'
           },
		   {
            title: '主机业务处理日期',
            align:"center",
            dataIndex: 'businessDate'
           },
		   {
            title: '是否冲正成功标志',
            align:"center",
            dataIndex: 'suspended'
           },
		   {
            title: '交易授权方',
            align:"center",
            dataIndex: 'authorised'
           },
		   {
            title: '是否是通知冲正类交易',
            align:"center",
            dataIndex: 'advice'
           },
		   {
            title: '交易是否已冲正',
            align:"center",
            dataIndex: 'corrected'
           },
		   {
            title: '跟踪号(第11域)',
            align:"center",
            dataIndex: 'trace'
           },
		   {
            title: '交易错误码',
            align:"center",
            dataIndex: 'error'
           },
		   {
            title: '受理机构(第32域)',
            align:"center",
            dataIndex: 'acquirer'
           },
		   {
            title: '交易源名称',
            align:"center",
            dataIndex: 'source'
           },
		   {
            title: '发送交易的PORTAL进程名称',
            align:"center",
            dataIndex: 'sender'
           },
		   {
            title: '二进制大字段',
            align:"center",
            dataIndex: 'data'
           },
		   {
            title: '主机处理交易的时间',
            align:"center",
            dataIndex: 'procTime'
           },
		   {
            title: '处理交易的TPROC进程实例编号',
            align:"center",
            dataIndex: 'procInstance'
           },
		   {
            title: '线程编号',
            align:"center",
            dataIndex: 'procThread'
           },
		   {
            title: '主机授权号(卡系统产生)',
            align:"center",
            dataIndex: 'authResponse'
           },
		   {
            title: '主机流水',
            align:"center",
            dataIndex: 'hostJournal'
           },
		   {
            title: '交易唯一标识码',
            align:"center",
            dataIndex: 'uuid'
           },
		   {
            title: '原交易唯一标识码',
            align:"center",
            dataIndex: 'uuidOriginal'
           },
		   {
            title: '现在同字段UUID,存储122域前32位UUID',
            align:"center",
            dataIndex: 'acqinstUid'
           },
		   {
            title: '是否被调账',
            align:"center",
            dataIndex: 'reconFlag'
           },
		   {
            title: '最近维护日期',
            align:"center",
            dataIndex: 'lastMaintainDate'
           },
		   {
            title: '最近维护标识',
            align:"center",
            dataIndex: 'lastMaintainFlag'
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
          list: "/kzjyls/kzjyls/list",
          delete: "/kzjyls/kzjyls/delete",
          deleteBatch: "/kzjyls/kzjyls/deleteBatch",
          exportXlsUrl: "kzjyls/kzjyls/exportXls",
          importExcelUrl: "kzjyls/kzjyls/importExcel",
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
        delete param.txnDate;
        return filterObj(param);
      },
      onChangezjcsrq(value,dateString){
        let txnDateString = dateString
        this.queryParam.txnDate_begin =txnDateString[0]
        this.queryParam.txnDate_end =txnDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>