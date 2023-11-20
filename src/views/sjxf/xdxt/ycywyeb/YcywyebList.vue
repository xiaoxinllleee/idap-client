<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构网点号">
              <a-input placeholder="请输入机构网点号" v-model="queryParam.org"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="票据号码">
              <a-input placeholder="请输入票据号码" v-model="queryParam.billNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务标志">
              <a-input placeholder="请输入业务标志" v-model="queryParam.kind"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.zt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构编号">
              <a-input placeholder="请输入机构编号" v-model="queryParam.orgId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员编号">
              <a-input placeholder="请输入操作员编号" v-model="queryParam.fkId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.custName"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('银承业务余额表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
         :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

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
    <ycywyeb-modal ref="modalForm" @ok="modalFormOk"></ycywyeb-modal>
  </a-card>
</template>

<script>
  import YcywyebModal from './modules/YcywyebModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "YcywyebList",
    mixins:[JeecgListMixin],
    components: {
      YcywyebModal,JTreeSelect
    },
    data () {
      return {
        description: '银承业务余额表管理页面',
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
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'getDate'
           },
		   {
            title: '机构网点号',
            align:"center",
            dataIndex: 'org'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '票据号码',
            align:"center",
            dataIndex: 'billNo'
           },
		   {
            title: '票据余额',
            align:"center",
            dataIndex: 'balance'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'currency'
           },
		   {
            title: '业务标志',
            align:"center",
            dataIndex: 'kind'
           },
		   {
            title: '利率',
            align:"center",
            dataIndex: 'rate'
           },
		   {
            title: '签发日期',
            align:"center",
            dataIndex: 'putOutDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'maturity'
           },
		   {
            title: '表外账号',
            align:"center",
            dataIndex: 'bwzh'
           },
		   {
            title: '付款行号',
            align:"center",
            dataIndex: 'fkhh'
           },
		   {
            title: '付款行名',
            align:"center",
            dataIndex: 'fkhm'
           },
		   {
            title: '出票人名称',
            align:"center",
            dataIndex: 'cprmc'
           },
		   {
            title: '出票人账号',
            align:"center",
            dataIndex: 'cprzh'
           },
		   {
            title: '出票人开户行',
            align:"center",
            dataIndex: 'cprkhh'
           },
		   {
            title: '收款人名称',
            align:"center",
            dataIndex: 'skrmc'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'skrzh'
           },
		   {
            title: '收款人开户行',
            align:"center",
            dataIndex: 'skrkhh'
           },
		   {
            title: '票据金额',
            align:"center",
            dataIndex: 'putoutSum'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'zt'
           },
		   {
            title: '机构编号',
            align:"center",
            dataIndex: 'orgId'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '操作员编号',
            align:"center",
            dataIndex: 'fkId'
           },
		   {
            title: '业务交易代码',
            align:"center",
            dataIndex: 'businessPhase'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '通知书号',
            align:"center",
            dataIndex: 'sid'
           },
		   {
            title: '结清日期',
            align:"center",
            dataIndex: 'cancelDate'
           },
		   {
            title: '垫款日期',
            align:"center",
            dataIndex: 'laterDate'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '银承合同号',
            align:"center",
            dataIndex: 'ychth'
           },
		   {
            title: '核心客户号',
            align:"center",
            dataIndex: 'custNo'
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
          list: "/ycywyeb/ycywyeb/list",
          delete: "/ycywyeb/ycywyeb/delete",
          deleteBatch: "/ycywyeb/ycywyeb/deleteBatch",
          exportXlsUrl: "ycywyeb/ycywyeb/exportXls",
          importExcelUrl: "ycywyeb/ycywyeb/importExcel",
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