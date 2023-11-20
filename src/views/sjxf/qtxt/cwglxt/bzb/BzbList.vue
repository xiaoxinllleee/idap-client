<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="币种内部编码">
              <a-input placeholder="请输入币种内部编码" v-model="queryParam.curNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="币种名称">
              <a-input placeholder="请输入币种名称" v-model="queryParam.curName"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('币种表')">导出</a-button>
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
    <bzb-modal ref="modalForm" @ok="modalFormOk"></bzb-modal>
  </a-card>
</template>

<script>
  import BzbModal from './modules/BzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "BzbList",
    mixins:[JeecgListMixin],
    components: {
      BzbModal
    },
    data () {
      return {
        description: '币种表管理页面',
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
            title: '币种内部编码',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '币种国际编码',
            align:"center",
            dataIndex: 'curEpn'
           },
		   {
            title: '币种名称',
            align:"center",
            dataIndex: 'curName'
           },
		   {
            title: '使用标志 Y 是 N 否',
            align:"center",
            dataIndex: 'useYn'
           },
		   {
            title: '显示标志 Y 是 N 否',
            align:"center",
            dataIndex: 'dispYn'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'curSeqn'
           },
		   {
            title: '币种符号',
            align:"center",
            dataIndex: 'curSbl'
           },
		   {
            title: '币种对应年终状态顺序位',
            align:"center",
            dataIndex: 'curBitSeqn'
           },
		   {
            title: '是否折算标志 Y 是 N 否',
            align:"center",
            dataIndex: 'zsYn'
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
          list: "/bzb/bzb/list",
          delete: "/bzb/bzb/delete",
          deleteBatch: "/bzb/bzb/deleteBatch",
          exportXlsUrl: "bzb/bzb/exportXls",
          importExcelUrl: "bzb/bzb/importExcel",
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