<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位编号">
              <a-input placeholder="请输入单位编号" v-model="queryParam.aifCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目编号">
              <a-input placeholder="请输入项目编号" v-model="queryParam.aifAccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="帐号">
              <a-input placeholder="请输入帐号" v-model="queryParam.aifBranchname"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="老账号">
              <a-input placeholder="请输入老账号" v-model="queryParam.aifCrytype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.liaSinglemax"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号">
              <a-input placeholder="请输入证件号" v-model="queryParam.aifModifyteller"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业普通账号信息')">导出</a-button>

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
    <qyptzhxx-modal ref="modalForm" @ok="modalFormOk"></qyptzhxx-modal>
  </a-card>
</template>

<script>
  import QyptzhxxModal from './modules/QyptzhxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QyptzhxxList",
    mixins:[JeecgListMixin],
    components: {
      QyptzhxxModal
    },
    data () {
      return {
        description: '企业普通账号信息管理页面',
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
            title: '单位编号',
            align:"center",
            dataIndex: 'aifCstno'
           },
		   {
            title: '项目编号',
            align:"center",
            dataIndex: 'aifAccno'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'aifStt'
           },
		   {
            title: '代收发标志',
            align:"center",
            dataIndex: 'aifOpennode'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'aifBranchname'
           },
		   {
            title: '老账号',
            align:"center",
            dataIndex: 'aifCrytype'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'liaSinglemax'
           },
		   {
            title: '金额',
            align:"center",
            dataIndex: 'liaDaymax'
           },
		   {
            title: '证件类别',
            align:"center",
            dataIndex: 'cifHostno'
           },
		   {
            title: '证件号',
            align:"center",
            dataIndex: 'aifModifyteller'
           },
		   {
            title: '明细金额1',
            align:"center",
            dataIndex: 'aifModifytime'
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
		  /* {
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
          list: "/qyptzhxx/qyptzhxx/list",
          delete: "/qyptzhxx/qyptzhxx/delete",
          deleteBatch: "/qyptzhxx/qyptzhxx/deleteBatch",
          exportXlsUrl: "qyptzhxx/qyptzhxx/exportXls",
          importExcelUrl: "qyptzhxx/qyptzhxx/importExcel",
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