<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.cstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号/卡号">
              <a-input placeholder="请输入账号/卡号" v-model="queryParam.accno"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('账户限额表')">导出</a-button>
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
    <zhxeb-modal ref="modalForm" @ok="modalFormOk"></zhxeb-modal>
  </a-card>
</template>

<script>
  import ZhxebModal from './modules/ZhxebModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZhxebList",
    mixins:[JeecgListMixin],
    components: {
      ZhxebModal
    },
    data () {
      return {
        description: '账户限额表管理页面',
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
            title: '账号/卡号',
            align:"center",
            dataIndex: 'accno'
           },
		   {
            title: '客户号',
            align:"center",
            dataIndex: 'cstno'
           },
		   {
            title: '个人设置的单日交易限额',
            align:"center",
            dataIndex: 'daymaxP'
           },
		   {
            title: '个人设置的单笔交易限额',
            align:"center",
            dataIndex: 'singlemaxP'
           },
		   {
            title: '开户时间',
            align:"center",
            dataIndex: 'opentime'
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
          list: "/zhxeb/zhxeb/list",
          delete: "/zhxeb/zhxeb/delete",
          deleteBatch: "/zhxeb/zhxeb/deleteBatch",
          exportXlsUrl: "zhxeb/zhxeb/exportXls",
          importExcelUrl: "zhxeb/zhxeb/importExcel",
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