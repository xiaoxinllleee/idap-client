<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户间关系ID">
              <a-input placeholder="请输入客户间关系ID" v-model="queryParam.custRelId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户间关系类型">
              <a-input placeholder="请输入客户间关系类型" v-model="queryParam.custRelType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="源客户编号">
              <a-input placeholder="请输入源客户编号" v-model="queryParam.srcCustId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="目标客户编号">
              <a-input placeholder="请输入目标客户编号" v-model="queryParam.destCustId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易流水号">
              <a-input placeholder="请输入交易流水号" v-model="queryParam.txSeqNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户间关系表')">导出</a-button>
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

        <span slot="action" slot-scope="text, record">
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
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khjgxb-modal ref="modalForm" @ok="modalFormOk"></khjgxb-modal>
  </a-card>
</template>

<script>
  import KhjgxbModal from './modules/KhjgxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "KhjgxbList",
    mixins:[JeecgListMixin],
    components: {
      KhjgxbModal
    },
    data () {
      return {
        description: '客户间关系表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '删除标识',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '客户间关系ID',
            align:"center",
            dataIndex: 'custRelId'
           },
		   {
            title: '客户间关系类型',
            align:"center",
            dataIndex: 'custRelType'
           },
		   {
            title: '客户间关系描述',
            align:"center",
            dataIndex: 'custRelDesc'
           },
		   {
            title: '客户间关系状态',
            align:"center",
            dataIndex: 'custRelStat'
           },
		   {
            title: '源客户编号',
            align:"center",
            dataIndex: 'srcCustId'
           },
		   {
            title: '目标客户编号',
            align:"center",
            dataIndex: 'destCustId'
           },
		   {
            title: '关系开始日期',
            align:"center",
            dataIndex: 'relStartDate'
           },
		   {
            title: '关系结束日期',
            align:"center",
            dataIndex: 'relEndDate'
           },
		   {
            title: '最后更新系统',
            align:"center",
            dataIndex: 'lastUpdateSys'
           },
		   {
            title: '最后更新人',
            align:"center",
            dataIndex: 'lastUpdateUser'
           },
		   {
            title: '最后更新时间',
            align:"center",
            dataIndex: 'lastUpdateTm'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'txSeqNo'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载方式',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   // {
       //      title: '天入库表编号-对不同的表名唯一',
       //      align:"center",
       //      dataIndex: 'dtnum'
       //     },
		   // {
       //      title: 'dttime',
       //      align:"center",
       //      dataIndex: 'dttime'
       //     },
       //    {
       //      title: '操作',
       //      dataIndex: 'action',
       //      align:"center",
       //      scopedSlots: { customRender: 'action' },
       //    }
        ],
		url: {
          list: "/khjgxb/khjgxb/list",
          delete: "/khjgxb/khjgxb/delete",
          deleteBatch: "/khjgxb/khjgxb/deleteBatch",
          exportXlsUrl: "khjgxb/khjgxb/exportXls",
          importExcelUrl: "khjgxb/khjgxb/importExcel",
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