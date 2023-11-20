<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.card"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户类型">
              <a-input placeholder="请输入账户类型" v-model="queryParam.isoType"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户序号">
              <a-input placeholder="请输入账户序号" v-model="queryParam.category"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.account"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.inst"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('卡账号关联关系')">导出</a-button>

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
    <kzhglgx-modal ref="modalForm" @ok="modalFormOk"></kzhglgx-modal>
  </a-card>
</template>

<script>
  import KzhglgxModal from './modules/KzhglgxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'


  export default {
    name: "KzhglgxList",
    mixins:[JeecgListMixin],
    components: {
      KzhglgxModal
    },
    data () {
      return {
        description: '卡账号关联关系管理页面',
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
            title: '卡号',
            align:"center",
            dataIndex: 'card'
           },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'isoType'
           },
		   {
            title: '账户序号',
            align:"center",
            dataIndex: 'category'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'account'
           },
		   {
            title: '银行号',
            align:"center",
            dataIndex: 'inst'
           },
		   {
            title: '是否是eChannel(电话银行/网银)默认账户',
            align:"center",
            dataIndex: 'isPrimary'
           },
		   {
            title: '电话银行/网银',
            align:"center",
            dataIndex: 'sequence'
           },
		   {
            title: '电话银行/网银账户产品类型',
            align:"center",
            dataIndex: 'hostType'
           },
		   {
            title: '电话银行/网银账户产品子类',
            align:"center",
            dataIndex: 'hostCat'
           },
		   {
            title: '关联类型',
            align:"center",
            dataIndex: 'channel'
           },
		   {
            title: '账户币种',
            align:"center",
            dataIndex: 'currency'
           },
		   {
            title: '最近维护日期',
            align:"center",
            dataIndex: 'lastMaintainDate'
           },
		   {
            title: '最近维护标识',
            align:"center",
            dataIndex: 'lastMaintainFlag'
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
          list: "/kzhglgx/kzhglgx/list",
          delete: "/kzhglgx/kzhglgx/delete",
          deleteBatch: "/kzhglgx/kzhglgx/deleteBatch",
          exportXlsUrl: "kzhglgx/kzhglgx/exportXls",
          importExcelUrl: "kzhglgx/kzhglgx/importExcel",
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