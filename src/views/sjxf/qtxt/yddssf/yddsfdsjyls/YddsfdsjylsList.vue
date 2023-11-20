<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类型">
              <a-input placeholder="请输入业务类型" v-model="queryParam.tradetype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员">
              <a-input placeholder="请输入操作柜员" v-model="queryParam.tellerno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
        <!--      <a-input placeholder="请输入机构码" v-model="queryParam.bankno"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.bankno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务状态">
              <a-input placeholder="请输入业务状态" v-model="queryParam.busistatus"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人账号">
              <a-input placeholder="请输入付款人账号" v-model="queryParam.payeraccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人名称">
              <a-input placeholder="请输入付款人名称" v-model="queryParam.payername"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人账号">
              <a-input placeholder="请输入收款人账号" v-model="queryParam.payeeaccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人名称">
              <a-input placeholder="请输入收款人名称" v-model="queryParam.payeename"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户名">
              <a-input placeholder="请输入用户名" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户身份证号">
              <a-input placeholder="请输入用户身份证号" v-model="queryParam.useridentno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="电视卡卡号">
              <a-input placeholder="请输入电视卡卡号" v-model="queryParam.tvcardno"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('移动电视费代收交易流水')">导出</a-button>

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
    <yddsfdsjyls-modal ref="modalForm" @ok="modalFormOk"></yddsfdsjyls-modal>
  </a-card>
</template>

<script>
  import YddsfdsjylsModal from './modules/YddsfdsjylsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "YddsfdsjylsList",
    mixins:[JeecgListMixin],
    components: {
      YddsfdsjylsModal,JTreeSelect
    },
    data () {
      return {
        description: '移动电视费代收交易流水管理页面',
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
            title: '平台交易日期时间',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '平台交易流水',
            align:"center",
            dataIndex: 'serialno'
           },
		   {
            title: '平台交易日期',
            align:"center",
            dataIndex: 'acctDate'
           },
		   {
            title: '前置流水号',
            align:"center",
            dataIndex: 'hostserialno'
           },
		   {
            title: '第三方流水号',
            align:"center",
            dataIndex: 'transno'
           },
		   {
            title: '第三方请求日期时间',
            align:"center",
            dataIndex: 'reqdatetime'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'tradetype'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'bankno_dictText'
           },
		   {
            title: '对账区分',
            align:"center",
            dataIndex: 'needchk'
           },
		   {
            title: '核心记账状态',
            align:"center",
            dataIndex: 'hoststatus'
           },
		   {
            title: '核心交易流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '核心交易日期',
            align:"center",
            dataIndex: 'hostdate'
           },
		   {
            title: '核心错误码',
            align:"center",
            dataIndex: 'hosterrcode'
           },
		   {
            title: '核心错误信息',
            align:"center",
            dataIndex: 'hosterrmsg'
           },
		   {
            title: '核心对账标志',
            align:"center",
            dataIndex: 'hostchkflag'
           },
		   {
            title: '第三方处理状态',
            align:"center",
            dataIndex: 'corpstatus'
           },
		   {
            title: '第三方流水号',
            align:"center",
            dataIndex: 'corpseqno'
           },
		   {
            title: '第三方交易日期',
            align:"center",
            dataIndex: 'corpdate'
           },
		   {
            title: '第三方错误码',
            align:"center",
            dataIndex: 'corperrcode'
           },
		   {
            title: '第三方错误信息',
            align:"center",
            dataIndex: 'corperrmsg'
           },
		   {
            title: '第三方对账标志',
            align:"center",
            dataIndex: 'corpchkflag'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'busistatus'
           },
		   {
            title: '业务错误码',
            align:"center",
            dataIndex: 'busierrcode'
           },
		   {
            title: '业务错误信息',
            align:"center",
            dataIndex: 'busierrmsg'
           },
		   {
            title: '付款人账号',
            align:"center",
            dataIndex: 'payeraccno'
           },
		   {
            title: '付款人名称',
            align:"center",
            dataIndex: 'payername'
           },
		   {
            title: '账号序号',
            align:"center",
            dataIndex: 'acctseqno'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'payeeaccno'
           },
		   {
            title: '收款人名称',
            align:"center",
            dataIndex: 'payeename'
           },
		   {
            title: '缴费方式',
            align:"center",
            dataIndex: 'payway'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'cardflag'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amt'
           },
		   {
            title: '冲正标志',
            align:"center",
            dataIndex: 'revflag'
           },
		   {
            title: '用户名',
            align:"center",
            dataIndex: 'username'
           },
		   {
            title: '用户地址',
            align:"center",
            dataIndex: 'useraddr'
           },
		   {
            title: '用户身份证号',
            align:"center",
            dataIndex: 'useridentno'
           },
		   {
            title: '电视卡卡号',
            align:"center",
            dataIndex: 'tvcardno'
           },
		   {
            title: '节目ID',
            align:"center",
            dataIndex: 'gameid'
           },
		   {
            title: '节目名称',
            align:"center",
            dataIndex: 'gamename'
           },
		   {
            title: '原交易日期',
            align:"center",
            dataIndex: 'origtrandate'
           },
		   {
            title: '原交易流水号',
            align:"center",
            dataIndex: 'orighostno'
           },
		   {
            title: '批量标志',
            align:"center",
            dataIndex: 'batchflag'
           },
		   {
            title: '批量流水号',
            align:"center",
            dataIndex: 'batchtransno'
           },
		   {
            title: '批量明细序号',
            align:"center",
            dataIndex: 'batchxh'
           },
		   {
            title: '渠道流水',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '付款人账号序号',
            align:"center",
            dataIndex: 'payeracctseqno'
           },
		   {
            title: '收款人账号序号',
            align:"center",
            dataIndex: 'payeeacctseqno'
           },
		   {
            title: '控制子',
            align:"center",
            dataIndex: 'controlflag'
           },
		   {
            title: 'uuid',
            align:"center",
            dataIndex: 'uuid'
           },
		   {
            title: '中间业务类型',
            align:"center",
            dataIndex: 'zjywlx'
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
		   /*{
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
          list: "/yddsfdsjyls/yddsfdsjyls/list",
          delete: "/yddsfdsjyls/yddsfdsjyls/delete",
          deleteBatch: "/yddsfdsjyls/yddsfdsjyls/deleteBatch",
          exportXlsUrl: "yddsfdsjyls/yddsfdsjyls/exportXls",
          importExcelUrl: "yddsfdsjyls/yddsfdsjyls/importExcel",
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