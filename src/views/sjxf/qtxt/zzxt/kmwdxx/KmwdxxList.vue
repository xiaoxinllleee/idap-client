<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目编码">
              <a-input placeholder="请输入科目编码" v-model="queryParam.itemNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目名称">
              <a-input placeholder="请输入科目名称" v-model="queryParam.itemName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目级别">
              <a-input placeholder="请输入科目级别" v-model="queryParam.itemLv"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目类别编码">
              <a-input placeholder="请输入科目类别编码" v-model="queryParam.itemCategoryCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目类别名称">
              <a-input placeholder="请输入科目类别名称" v-model="queryParam.itemCategoryName"></a-input>
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
     <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('科目维度信息')">导出</a-button>
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
    <kmwdxx-modal ref="modalForm" @ok="modalFormOk"></kmwdxx-modal>
  </a-card>
</template>

<script>
  import KmwdxxModal from './modules/KmwdxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'


  export default {
    name: "KmwdxxList",
    mixins:[JeecgListMixin],
    components: {
      KmwdxxModal
    },
    data () {
      return {
        description: '科目维度信息管理页面',
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
            title: '科目编码',
            align:"center",
            dataIndex: 'itemNo'
           },
		   {
            title: '科目名称',
            align:"center",
            dataIndex: 'itemName'
           },
		   {
            title: '科目级别',
            align:"center",
            dataIndex: 'itemLv'
           },
		   {
            title: '科目类别编码',
            align:"center",
            dataIndex: 'itemCategoryCode'
           },
		   {
            title: '科目类别名称',
            align:"center",
            dataIndex: 'itemCategoryName'
           },
		   {
            title: '余额方向',
            align:"center",
            dataIndex: 'balanceDirection'
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
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
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
          list: "/kmwdxx/kmwdxx/list",
          delete: "/kmwdxx/kmwdxx/delete",
          deleteBatch: "/kmwdxx/kmwdxx/deleteBatch",
          exportXlsUrl: "kmwdxx/kmwdxx/exportXls",
          importExcelUrl: "kmwdxx/kmwdxx/importExcel",
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