<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <a-input placeholder="请输入机构号" v-model="queryParam.socNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.mastAcct"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="子账号">
              <a-input placeholder="请输入子账号" v-model="queryParam.subAcctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关闭子账户流水号">
              <a-input placeholder="请输入关闭子账户流水号" v-model="queryParam.subAcCloseJrnl"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('活期存款主子账户对照表')">导出</a-button>

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
    <hqckzzzhdzb-modal ref="modalForm" @ok="modalFormOk"></hqckzzzhdzb-modal>
  </a-card>
</template>

<script>
  import HqckzzzhdzbModal from './modules/HqckzzzhdzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "HqckzzzhdzbList",
    mixins:[JeecgListMixin],
    components: {
      HqckzzzhdzbModal
    },
    data () {
      return {
        description: '活期存款主子账户对照表管理页面',
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
            title: '机构号',
            align:"center",
            dataIndex: 'socNo'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'mastAcct'
           },
		   {
            title: '子账号类型',
            align:"center",
            dataIndex: 'subAcctType'
           },
		   {
            title: '子账户利益范畴',
            align:"center",
            dataIndex: 'subAcctIntCate'
           },
		   {
            title: '子账号',
            align:"center",
            dataIndex: 'subAcctNo'
           },
		   {
            title: '子货币代码',
            align:"center",
            dataIndex: 'subAcctCurr'
           },
		   {
            title: '子货币类型',
            align:"center",
            dataIndex: 'subAcctCurrType'
           },
		   {
            title: '子账户状态',
            align:"center",
            dataIndex: 'subAcctStatus'
           },
		   {
            title: '关闭子账户流水号',
            align:"center",
            dataIndex: 'subAcCloseJrnl'
           },
		   {
            title: '关闭子账户日期',
            align:"center",
            dataIndex: 'subAcCloseDate'
           },
		   {
            title: '填充',
            align:"center",
            dataIndex: 'fil01'
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
          list: "/hqckzzzhdzb/hqckzzzhdzb/list",
          delete: "/hqckzzzhdzb/hqckzzzhdzb/delete",
          deleteBatch: "/hqckzzzhdzb/hqckzzzhdzb/deleteBatch",
          exportXlsUrl: "hqckzzzhdzb/hqckzzzhdzb/exportXls",
          importExcelUrl: "hqckzzzhdzb/hqckzzzhdzb/importExcel",
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