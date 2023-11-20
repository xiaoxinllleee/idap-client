<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代号">
              <a-input placeholder="请输入机构代号" v-model="queryParam.opnBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="股金账号">
              <a-input placeholder="请输入股金账号" v-model="queryParam.stockno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.acId"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('股金账户表')">导出</a-button>
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
        :scroll="{x:5450}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <gjzhb-modal ref="modalForm" @ok="modalFormOk"></gjzhb-modal>
  </a-card>
</template>

<script>
  import GjzhbModal from './modules/GjzhbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GjzhbList",
    mixins:[JeecgListMixin],
    components: {
      GjzhbModal
    },
    data () {
      return {
        description: '股金账户表管理页面',
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
            title: '机构代号',
            align:"center",
            dataIndex: 'opnBrNo'
           },
		   {
            title: '股金账号',
            align:"center",
            dataIndex: 'stockno'
           },
		   {
            title: '股东编号',
            align:"center",
            dataIndex: 'clientNo'
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'opnDate'
           },
		   {
            title: '销户日期',
            align:"center",
            dataIndex: 'clsDate'
           },
		   {
            title: '股金性质',
            align:"center",
            dataIndex: 'stocktype'
           },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'state'
           },
		   {
            title: '挂失标志',
            align:"center",
            dataIndex: 'stppb'
           },
		   {
            title: '冻结标志',
            align:"center",
            dataIndex: 'actfzn'
           },
		   {
            title: '冻结股数',
            align:"center",
            dataIndex: 'ctlamt'
           },
		   {
            title: '总股数',
            align:"center",
            dataIndex: 'stacknum'
           },
		   {
            title: '股价',
            align:"center",
            dataIndex: 'price'
           },
		   {
            title: '总金额',
            align:"center",
            dataIndex: 'txamt'
           },
		   {
            title: '股权证号',
            align:"center",
            dataIndex: 'noteNo'
           },
		   {
            title: '密印标志',
            align:"center",
            dataIndex: 'pswdcd'
           },
		   {
            title: '密码',
            align:"center",
            dataIndex: 'passwd'
           },
		   {
            title: '备注摘要信息',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'acId'
           },
		   {
            title: '入股方式',
            align:"center",
            dataIndex: 'stockMode'
           },
		   {
            title: '资产类型',
            align:"center",
            dataIndex: 'assetsType'
           },
		   {
            title: '入股资产编号',
            align:"center",
            dataIndex: 'assetsNo'
           },
		   {
            title: '可用股数',
            align:"center",
            dataIndex: 'usramt'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '代持账号',
            align:"center",
            dataIndex: 'agentno'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
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
          list: "/gjzhb/gjzhb/list",
          delete: "/gjzhb/gjzhb/delete",
          deleteBatch: "/gjzhb/gjzhb/deleteBatch",
          exportXlsUrl: "gjzhb/gjzhb/exportXls",
          importExcelUrl: "gjzhb/gjzhb/importExcel",
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