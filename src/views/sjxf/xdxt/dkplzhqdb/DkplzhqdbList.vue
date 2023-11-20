<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流程流水编号">
              <a-input placeholder="请输入流程流水编号" v-model="queryParam.flowId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="启动时间">
              <a-input placeholder="请输入启动时间" v-model="queryParam.startDate"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员编号">
              <a-input placeholder="请输入操作员编号" v-model="queryParam.userId"></a-input>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构编号">
              <a-input placeholder="请输入机构编号" v-model="queryParam.orgId"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款批量置换启动表')">导出</a-button>
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
    <dkplzhqdb-modal ref="modalForm" @ok="modalFormOk"></dkplzhqdb-modal>
  </a-card>
</template>

<script>
  import DkplzhqdbModal from './modules/DkplzhqdbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DkplzhqdbList",
    mixins:[JeecgListMixin],
    components: {
      DkplzhqdbModal
    },
    data () {
      return {
        description: '贷款批量置换启动表管理页面',
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
            title: '启动序号',
            align:"center",
            dataIndex: 'startId'
           },
		   {
            title: '启动时间',
            align:"center",
            dataIndex: 'startDate'
           },
		   {
            title: '流程流水编号',
            align:"center",
            dataIndex: 'flowId'
           },
		   {
            title: '操作员编号',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '机构编号',
            align:"center",
            dataIndex: 'orgId'
           },
		   {
            title: '置换笔数',
            align:"center",
            dataIndex: 'offNum'
           },
		   {
            title: '置换标志',
            align:"center",
            dataIndex: 'zhbz'
           },
		   {
            title: '置换方式',
            align:"center",
            dataIndex: 'replaceType'
           },
		   {
            title: '置换本金合计',
            align:"center",
            dataIndex: 'offPrincipal'
           },
		   {
            title: '置换利息合计',
            align:"center",
            dataIndex: 'offInterest'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '置换协议号',
            align:"center",
            dataIndex: 'protocolNo'
           },
		   {
            title: '通知书号',
            align:"center",
            dataIndex: 'noticeNo'
           },
		   {
            title: '文件名称',
            align:"center",
            dataIndex: 'fileName'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   /*{
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dkplzhqdb/dkplzhqdb/list",
          delete: "/dkplzhqdb/dkplzhqdb/delete",
          deleteBatch: "/dkplzhqdb/dkplzhqdb/deleteBatch",
          exportXlsUrl: "dkplzhqdb/dkplzhqdb/exportXls",
          importExcelUrl: "dkplzhqdb/dkplzhqdb/importExcel",
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