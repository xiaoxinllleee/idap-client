<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="长期待摊编号">
              <a-input placeholder="请输入长期待摊编号" v-model="queryParam.longDtNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.suppNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.suppName"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="长期待摊费用名称">
              <a-input placeholder="请输入长期待摊费用名称" v-model="queryParam.longDtName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属部门">
              <a-input placeholder="请输入所属部门" v-model="queryParam.depNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="当前操作员">
              <a-input placeholder="请输入当前操作员" v-model="queryParam.tel"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款账户账号">
              <a-input placeholder="请输入付款账户账号" v-model="queryParam.payAcNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="待摊账号">
              <a-input placeholder="请输入待摊账号" v-model="queryParam.inAcNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('长期待摊费用登记簿')">导出</a-button>
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
        :scroll="{x:6430}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <cqdtfydjb-modal ref="modalForm" @ok="modalFormOk"></cqdtfydjb-modal>
  </a-card>
</template>

<script>
  import CqdtfydjbModal from './modules/CqdtfydjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CqdtfydjbList",
    mixins:[JeecgListMixin],
    components: {
      CqdtfydjbModal
    },
    data () {
      return {
        description: '长期待摊费用登记簿管理页面',
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
            title: '长期待摊编号',
            align:"center",
            dataIndex: 'longDtNo'
           },
		   {
            title: '长期待摊费用名称',
            align:"center",
            dataIndex: 'longDtName'
           },
		   {
            title: '待摊关联事项号',
            align:"center",
            dataIndex: 'dtAppNo'
           },
		   {
            title: '待摊类型',
            align:"center",
            dataIndex: 'dtType'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'suppNo'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'suppName'
           },
		   {
            title: '所属部门',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '记账部门号',
            align:"center",
            dataIndex: 'dcBrNo'
           },
		   {
            title: '摊销方式',
            align:"center",
            dataIndex: 'depMod'
           },
		   {
            title: '摊销周期',
            align:"center",
            dataIndex: 'depCyc'
           },
		   {
            title: '摊销期限(月)',
            align:"center",
            dataIndex: 'depTime'
           },
		   {
            title: '付款账户账号',
            align:"center",
            dataIndex: 'payAcNo'
           },
		   {
            title: '付款账户名称',
            align:"center",
            dataIndex: 'payAcName'
           },
		   {
            title: '支出金额',
            align:"center",
            dataIndex: 'payAmt'
           },
		   {
            title: '事由',
            align:"center",
            dataIndex: 'brf'
           },
		   {
            title: '记账状态',
            align:"center",
            dataIndex: 'jzFlag'
           },
		   {
            title: '累计摊销次数',
            align:"center",
            dataIndex: 'totDepCnt'
           },
		   {
            title: '累计摊销金额',
            align:"center",
            dataIndex: 'totDepBal'
           },
		   {
            title: '摊销状态',
            align:"center",
            dataIndex: 'depSts'
           },
		   {
            title: '待摊账号',
            align:"center",
            dataIndex: 'inAcNo'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'openDate'
           },
		   {
            title: '当前操作员',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '记账操作员',
            align:"center",
            dataIndex: 'jzTel'
           },
		   {
            title: '记账日期',
            align:"center",
            dataIndex: 'jzDate'
           },
		   {
            title: '操作员流水号',
            align:"center",
            dataIndex: 'telTraceNo'
           },
		   {
            title: '财务流水号',
            align:"center",
            dataIndex: 'hostTraceNo'
           },
		   {
            title: '总账流水号',
            align:"center",
            dataIndex: 'zzTraceNo'
           },
		   {
            title: '核心流水号',
            align:"center",
            dataIndex: 'hxTraceNo'
           },
		   {
            title: '产品号',
            align:"center",
            dataIndex: 'prdtNo'
           },
		   {
            title: '租入房屋地址',
            align:"center",
            dataIndex: 'addr'
           },
		   {
            title: '租入房屋面积',
            align:"center",
            dataIndex: 'buildArea'
           },
		   {
            title: '租入起始日',
            align:"center",
            dataIndex: 'rentStdate'
           },
		   {
            title: '租入终止日',
            align:"center",
            dataIndex: 'rentOvdate'
           },
		   {
            title: '租金支付方式',
            align:"center",
            dataIndex: 'rentType'
           },
		   {
            title: '广告费宣传项目名称',
            align:"center",
            dataIndex: 'adName'
           },
		   {
            title: '广告方式',
            align:"center",
            dataIndex: 'adType'
           },
		   {
            title: '财务流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '交易笔次',
            align:"center",
            dataIndex: 'tdCnt'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '上次摊销日期',
            align:"center",
            dataIndex: 'depDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'expDate'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'dataDate'
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
          list: "/cqdtfydjb/cqdtfydjb/list",
          delete: "/cqdtfydjb/cqdtfydjb/delete",
          deleteBatch: "/cqdtfydjb/cqdtfydjb/deleteBatch",
          exportXlsUrl: "cqdtfydjb/cqdtfydjb/exportXls",
          importExcelUrl: "cqdtfydjb/cqdtfydjb/importExcel",
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