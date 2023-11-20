<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="协定号">
              <a-input placeholder="请输入协定号" v-model="queryParam.contractNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易流水号">
              <a-input placeholder="请输入交易流水号" v-model="queryParam.txJrnlNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="协定账号">
              <a-input placeholder="请输入协定账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易柜员">
              <a-input placeholder="请输入交易柜员" v-model="queryParam.txTelrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('协定存款交易明细')">导出</a-button>
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
        :scroll="{x:3430}"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
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
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xdckjymx-modal ref="modalForm" @ok="modalFormOk"></xdckjymx-modal>
  </a-card>
</template>

<script>
  import XdckjymxModal from './modules/XdckjymxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XdckjymxList",
    mixins:[JeecgListMixin],
    components: {
      XdckjymxModal
    },
    data () {
      return {
        description: '协定存款交易明细管理页面',
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
            title: '行号',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '协定账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '协定号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '协定金额',
            align:"center",
            dataIndex: 'contractAmt'
           },
		   {
            title: '协定生效日',
            align:"center",
            dataIndex: 'contractEftDate'
           },
		   {
            title: '协定到期日',
            align:"center",
            dataIndex: 'contractMtyDate'
           },
		   {
            title: '自动延期标志',
            align:"center",
            dataIndex: 'autoExtFlag'
           },
		   {
            title: '协定状态',
            align:"center",
            dataIndex: 'contractStatus'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '交易行号',
            align:"center",
            dataIndex: 'txInstNo'
           },
		   {
            title: '交易分行号',
            align:"center",
            dataIndex: 'txBrhnNo'
           },
		   {
            title: '交易柜员',
            align:"center",
            dataIndex: 'txTelrNo'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'txJrnlNo'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'txTime'
           },
		   {
            title: '交易功能',
            align:"center",
            dataIndex: 'txFuncNo'
           },
		   {
            title: '协定合同期',
            align:"center",
            dataIndex: 'contrTermLength'
           },
		   {
            title: '基期',
            align:"center",
            dataIndex: 'contrTermBasic'
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
		   /*{
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
          list: "/xdckjymx/xdckjymx/list",
          delete: "/xdckjymx/xdckjymx/delete",
          deleteBatch: "/xdckjymx/xdckjymx/deleteBatch",
          exportXlsUrl: "xdckjymx/xdckjymx/exportXls",
          importExcelUrl: "xdckjymx/xdckjymx/importExcel",
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