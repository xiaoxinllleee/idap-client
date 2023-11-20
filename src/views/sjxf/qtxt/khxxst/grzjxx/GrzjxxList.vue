<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构证件ID">
              <a-input placeholder="请输入机构证件ID" v-model="queryParam.identId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件户名">
              <a-input placeholder="请输入证件户名" v-model="queryParam.identCustName"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人证件信息')">导出</a-button>
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
        :scroll="{x: 3500}"
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
    <grzjxx-modal ref="modalForm" @ok="modalFormOk"></grzjxx-modal>
  </a-card>
</template>

<script>
  import GrzjxxModal from './modules/GrzjxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GrzjxxList",
    mixins:[JeecgListMixin],
    components: {
      GrzjxxModal
    },
    data () {
      return {
        description: '个人证件信息管理页面',
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
            title: '机构证件ID',
            align:"center",
            dataIndex: 'identId'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '机构证件类型',
            align:"center",
            dataIndex: 'identType'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'identNo'
           },
		   {
            title: '证件户名',
            align:"center",
            dataIndex: 'identCustName'
           },
		   {
            title: '证件描述',
            align:"center",
            dataIndex: 'identDesc'
           },
		   {
            title: '发证国家或地区',
            align:"center",
            dataIndex: 'countryOrRegion'
           },
		   {
            title: '发证机构',
            align:"center",
            dataIndex: 'identOrg'
           },
		   {
            title: '证件年检标志',
            align:"center",
            dataIndex: 'identCheckFlag'
           },
		   {
            title: '证件年检到期日',
            align:"center",
            dataIndex: 'identCheckingDate'
           },
		   {
            title: '证件年检日期',
            align:"center",
            dataIndex: 'identCheckedDate'
           },
		   {
            title: '证件有效期',
            align:"center",
            dataIndex: 'identValidPeriod'
           },
		   {
            title: '证件生效期',
            align:"center",
            dataIndex: 'identEffectiveDate'
           },
		   {
            title: '证件失效日期',
            align:"center",
            dataIndex: 'identExpiredDate'
           },
		   {
            title: '证件有效标志',
            align:"center",
            dataIndex: 'identValidFlag'
           },
		   {
            title: '是否开户证件',
            align:"center",
            dataIndex: 'isOpenAccIdent'
           },
		   {
            title: '证件修改标志',
            align:"center",
            dataIndex: 'identModifiedFlag'
           },
		   {
            title: '证件修改时间',
            align:"center",
            dataIndex: 'identModifiedTime'
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
            title: '加载结束时间',
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
          list: "/grzjxx/grzjxx/list",
          delete: "/grzjxx/grzjxx/delete",
          deleteBatch: "/grzjxx/grzjxx/deleteBatch",
          exportXlsUrl: "grzjxx/grzjxx/exportXls",
          importExcelUrl: "grzjxx/grzjxx/importExcel",
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