<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主账号">
              <a-input placeholder="请输入主账号" v-model="queryParam.mastAcct"></a-input>
            </a-form-item>
          </a-col>


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="顺序号">
              <a-input placeholder="请输入顺序号" v-model="queryParam.sequenceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存折号">
              <a-input placeholder="请输入存折号" v-model="queryParam.pbNo"></a-input>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="子账号">
              <a-input placeholder="请输入子账号" v-model="queryParam.subAcctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>

      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('定期存款主子账户对照表')">导出</a-button>
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

        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dqckzzzhdzb-modal ref="modalForm" @ok="modalFormOk"></dqckzzzhdzb-modal>
  </a-card>
</template>

<script>
  import DqckzzzhdzbModal from './modules/DqckzzzhdzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "DqckzzzhdzbList",
    mixins:[JeecgListMixin],
    components: {
      DqckzzzhdzbModal,JTreeSelect
    },
    data () {
      return {
        description: '定期存款主子账户对照表管理页面',
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
            title: '系统号',
            align:"center",
            dataIndex: 'socNo'
           },
		   {
            title: '主账号',
            align:"center",
            dataIndex: 'mastAcct'
           },
		   {
            title: '次数号',
            align:"center",
            dataIndex: 'volumeNo'
           },
		   {
            title: '顺序号',
            align:"center",
            dataIndex: 'sequenceNo'
           },
		   {
            title: '存折号',
            align:"center",
            dataIndex: 'pbNo'
           },
		   {
            title: '子账号',
            align:"center",
            dataIndex: 'subAcctNo'
           },
		   {
            title: '货币代码',
            align:"center",
            dataIndex: 'currency'
           },
		   {
            title: '子账户状态值',
            align:"center",
            dataIndex: 'activeFlag'
           },
		   {
            title: '填充',
            align:"center",
            dataIndex: 'fil01'
           },
		   {
            title: '最近交易日期',
            align:"center",
            dataIndex: 'lastMaintDate'
           },
		   {
            title: '最近交易状态',
            align:"center",
            dataIndex: 'lastMaintStat'
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
		 /*  {
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
          list: "/dqckzzzhdzb/dqckzzzhdzb/list",
          delete: "/dqckzzzhdzb/dqckzzzhdzb/delete",
          deleteBatch: "/dqckzzzhdzb/dqckzzzhdzb/deleteBatch",
          exportXlsUrl: "dqckzzzhdzb/dqckzzzhdzb/exportXls",
          importExcelUrl: "dqckzzzhdzb/dqckzzzhdzb/importExcel",
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