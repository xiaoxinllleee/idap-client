<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银客户号">
              <a-input placeholder="请输入网银客户号" v-model="queryParam.aifCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.aifAccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号核心开户网点">
              <a-input placeholder="请输入账号核心开户网点" v-model="queryParam.aifOpennode"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号核心开户网点名称">
              <a-input placeholder="请输入账号核心开户网点名称" v-model="queryParam.aifBranchname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核心客户号">
              <a-input placeholder="请输入核心客户号" v-model="queryParam.cifHostno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作标志">
              <a-input placeholder="请输入操作标志" v-model="queryParam.livOptflag"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银状态">
              <a-input placeholder="请输入网银状态" v-model="queryParam.aifStt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="启用标志">
              <a-input placeholder="请输入启用标志" v-model="queryParam.livFlag"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业VIP账号信息')">导出</a-button>

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
    <qyvipzhxx-modal ref="modalForm" @ok="modalFormOk"></qyvipzhxx-modal>
  </a-card>
</template>

<script>
  import QyvipzhxxModal from './modules/QyvipzhxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QyvipzhxxList",
    mixins:[JeecgListMixin],
    components: {
      QyvipzhxxModal
    },
    data () {
      return {
        description: '企业VIP账号信息管理页面',
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
            title: '流水号(自动生成)',
            align:"center",
            dataIndex: 'livFlowno'
           },
		   {
            title: '网银客户号',
            align:"center",
            dataIndex: 'aifCstno'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'aifAccno'
           },
		   {
            title: '操作标志',
            align:"center",
            dataIndex: 'livOptflag'
           },
		   {
            title: '启用标志',
            align:"center",
            dataIndex: 'livFlag'
           },
		   {
            title: '网银状态',
            align:"center",
            dataIndex: 'aifStt'
           },
		   {
            title: '账号核心开户网点',
            align:"center",
            dataIndex: 'aifOpennode'
           },
		   {
            title: '账号核心开户网点名称',
            align:"center",
            dataIndex: 'aifBranchname'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'aifCrytype'
           },
		   {
            title: '单笔限额',
            align:"center",
            dataIndex: 'livSinglemax'
           },
		   {
            title: '日累计限额',
            align:"center",
            dataIndex: 'livDaymax'
           },
		   {
            title: '核心客户号',
            align:"center",
            dataIndex: 'cifHostno'
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
          list: "/qyvipzhxx/qyvipzhxx/list",
          delete: "/qyvipzhxx/qyvipzhxx/delete",
          deleteBatch: "/qyvipzhxx/qyvipzhxx/deleteBatch",
          exportXlsUrl: "qyvipzhxx/qyvipzhxx/exportXls",
          importExcelUrl: "qyvipzhxx/qyvipzhxx/importExcel",
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