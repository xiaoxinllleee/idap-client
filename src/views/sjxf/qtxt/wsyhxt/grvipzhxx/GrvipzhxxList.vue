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
            <a-form-item label="网银状态(0:正常;1:冻结3:销户)">
              <a-input placeholder="请输入网银状态" v-model="queryParam.aifStt"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核心开户网点">
              <a-input placeholder="请输入核心开户网点" v-model="queryParam.aifOpennode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核心开户网点名称">
              <a-input placeholder="请输入核心开户网点名称" v-model="queryParam.aifBranchname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核心客户号">
              <a-input placeholder="请输入核心客户号" v-model="queryParam.cifHostno"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人VIP账号信息')">导出</a-button>
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
    <grvipzhxx-modal ref="modalForm" @ok="modalFormOk"></grvipzhxx-modal>
  </a-card>
</template>

<script>
  import GrvipzhxxModal from './modules/GrvipzhxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GrvipzhxxList",
    mixins:[JeecgListMixin],
    components: {
      GrvipzhxxModal
    },
    data () {
      return {
        description: '个人VIP账号信息管理页面',
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
            dataIndex: 'plvFlowno'
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
            title: '操作标志(0:增加;1:修改;2:删除)默认:0',
            align:"center",
            dataIndex: 'aifOptflag'
           },
		   {
            title: '启用标志(0:未启用;1:启用)',
            align:"center",
            dataIndex: 'aifFlag'
           },
		   {
            title: '网银状态(0:正常;1:冻结3:销户)',
            align:"center",
            dataIndex: 'aifStt'
           },
		   {
            title: '核心开户网点',
            align:"center",
            dataIndex: 'aifOpennode'
           },
		   {
            title: '核心开户网点名称',
            align:"center",
            dataIndex: 'aifBranchname'
           },
		   {
            title: '单笔限额',
            align:"center",
            dataIndex: 'plvSinglemax'
           },
		   {
            title: '日累计限额',
            align:"center",
            dataIndex: 'plvDaymax'
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
          list: "/grvipzhxx/grvipzhxx/list",
          delete: "/grvipzhxx/grvipzhxx/delete",
          deleteBatch: "/grvipzhxx/grvipzhxx/deleteBatch",
          exportXlsUrl: "grvipzhxx/grvipzhxx/exportXls",
          importExcelUrl: "grvipzhxx/grvipzhxx/importExcel",
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