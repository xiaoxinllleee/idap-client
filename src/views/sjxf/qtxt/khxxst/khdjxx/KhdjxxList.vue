<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户等级ID">
              <a-input placeholder="请输入客户等级ID" v-model="queryParam.custGradeId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评级机构名称">
              <a-input placeholder="请输入评级机构名称" v-model="queryParam.orgName"></a-input>
            </a-form-item>
          </a-col>



        </a-row>
        <a-row :gutter="24">
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户等级信息')">导出</a-button>
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
        :scroll="{x: 3200}"
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
    <khdjxx-modal ref="modalForm" @ok="modalFormOk"></khdjxx-modal>
  </a-card>
</template>

<script>
  import KhdjxxModal from './modules/KhdjxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "KhdjxxList",
    mixins:[JeecgListMixin],
    components: {
      KhdjxxModal
    },
    data () {
      return {
        description: '客户等级信息管理页面',
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
            title: '客户等级ID',
            align:"center",
            dataIndex: 'custGradeId'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '评级机构编码存储法人编码',
            align:"center",
            dataIndex: 'orgCode'
           },
		   {
            title: '评级机构名称',
            align:"center",
            dataIndex: 'orgName'
           },
		   {
            title: '等级类型码值:VIP普通',
            align:"center",
            dataIndex: 'custGradeType'
           },
		   {
            title: '客户等级等级类型=VIP时生效0普通客户',
            align:"center",
            dataIndex: 'custGrade'
           },
		   {
            title: '评定日期',
            align:"center",
            dataIndex: 'evaluateDate'
           },
		   {
            title: '生效日期',
            align:"center",
            dataIndex: 'effectiveDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'expiredDate'
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
            title: '有效期',
            align:"center",
            dataIndex: 'validPeriod'
           },
		   {
            title: '原ECIF法人编号',
            align:"center",
            dataIndex: 'legalNoOri'
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
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人编号',
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
          list: "/khdjxx/khdjxx/list",
          delete: "/khdjxx/khdjxx/delete",
          deleteBatch: "/khdjxx/khdjxx/deleteBatch",
          exportXlsUrl: "khdjxx/khdjxx/exportXls",
          importExcelUrl: "khdjxx/khdjxx/importExcel",
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