<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="行号">
              <a-input placeholder="请输入行号" v-model="queryParam.npsBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.stat"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="清算行号">
              <a-input placeholder="请输入清算行号" v-model="queryParam.sttlNpsBrno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="行名">
              <a-input placeholder="请输入行名" v-model="queryParam.npsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="原农信银行号">
              <a-input placeholder="请输入原农信银行号" v-model="queryParam.orNpsBrno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应人行行号">
              <a-input placeholder="请输入对应人行行号" v-model="queryParam.pbocBrno"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('农信银成员行行号表')">导出</a-button>
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
        :scroll="{x:3450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <nxycyhhhb-modal ref="modalForm" @ok="modalFormOk"></nxycyhhhb-modal>
  </a-card>
</template>

<script>
  import NxycyhhhbModal from './modules/NxycyhhhbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "NxycyhhhbList",
    mixins:[JeecgListMixin],
    components: {
      NxycyhhhbModal
    },
    data () {
      return {
        description: '农信银成员行行号表管理页面',
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
            dataIndex: 'npsBrno'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '属性',
            align:"center",
            dataIndex: 'att'
           },
		   {
            title: '清算行号',
            align:"center",
            dataIndex: 'sttlNpsBrno'
           },
		   {
            title: '行名',
            align:"center",
            dataIndex: 'npsName'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'addr'
           },
		   {
            title: '邮编',
            align:"center",
            dataIndex: 'post'
           },
		   {
            title: '电话',
            align:"center",
            dataIndex: 'telnum'
           },
		   {
            title: '电子邮箱',
            align:"center",
            dataIndex: 'email'
           },
		   {
            title: '原农信银行号',
            align:"center",
            dataIndex: 'orNpsBrno'
           },
		   {
            title: '原农信银业务权限',
            align:"center",
            dataIndex: 'orNpsRight'
           },
		   {
            title: '生效日期',
            align:"center",
            dataIndex: 'validDate'
           },
		   {
            title: '失效日期',
            align:"center",
            dataIndex: 'invalidDate'
           },
		   {
            title: '最近更新操作',
            align:"center",
            dataIndex: 'modifyType'
           },
		   {
            title: '对应人行行号',
            align:"center",
            dataIndex: 'pbocBrno'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '行别',
            align:"center",
            dataIndex: 'bankcty'
           },
		   {
            title: '地区代码',
            align:"center",
            dataIndex: 'areacode'
           },
		   {
            title: '数据起始日期',
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
          list: "/nxycyhhhb/nxycyhhhb/list",
          delete: "/nxycyhhhb/nxycyhhhb/delete",
          deleteBatch: "/nxycyhhhb/nxycyhhhb/deleteBatch",
          exportXlsUrl: "nxycyhhhb/nxycyhhhb/exportXls",
          importExcelUrl: "nxycyhhhb/nxycyhhhb/importExcel",
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