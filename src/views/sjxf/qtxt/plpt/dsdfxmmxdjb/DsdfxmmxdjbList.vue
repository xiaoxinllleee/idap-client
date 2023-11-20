<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位编号">
              <a-input placeholder="请输入单位编号" v-model="queryParam.dwbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目编号">
              <a-input placeholder="请输入项目编号" v-model="queryParam.xmbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="帐号">
              <a-input placeholder="请输入帐号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="老账号">
              <a-input placeholder="请输入老账号" v-model="queryParam.oldzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号">
              <a-input placeholder="请输入证件号" v-model="queryParam.zjh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入操作柜员">
              <a-input placeholder="请输入录入操作柜员" v-model="queryParam.lrczgy"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入操作机构">
              <a-input placeholder="请输入录入操作机构" v-model="queryParam.lrczjg"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('代收代发项目明细登记簿')">导出</a-button>

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
        :scroll="{x:6450}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dsdfxmmxdjb-modal ref="modalForm" @ok="modalFormOk"></dsdfxmmxdjb-modal>
  </a-card>
</template>

<script>
  import DsdfxmmxdjbModal from './modules/DsdfxmmxdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DsdfxmmxdjbList",
    mixins:[JeecgListMixin],
    components: {
      DsdfxmmxdjbModal
    },
    data () {
      return {
        description: '代收代发项目明细登记簿管理页面',
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
            dataIndex: 'dwbh'
           },
		   {
            title: '项目编号',
            align:"center",
            dataIndex: 'xmbh'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
           },
		   {
            title: '代收发标志',
            align:"center",
            dataIndex: 'dsfbz'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '老账号',
            align:"center",
            dataIndex: 'oldzh'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '金额',
            align:"center",
            dataIndex: 'je'
           },
		   {
            title: '证件类别',
            align:"center",
            dataIndex: 'zjlb'
           },
		   {
            title: '证件号',
            align:"center",
            dataIndex: 'zjh'
           },
		   {
            title: '明细金额1',
            align:"center",
            dataIndex: 'mxje1'
           },
		   {
            title: '明细金额2',
            align:"center",
            dataIndex: 'mxje2'
           },
		   {
            title: '明细金额3',
            align:"center",
            dataIndex: 'mxje3'
           },
		   {
            title: '明细金额4',
            align:"center",
            dataIndex: 'mxje4'
           },
		   {
            title: '明细金额5',
            align:"center",
            dataIndex: 'mxje5'
           },
		   {
            title: '明细金额6',
            align:"center",
            dataIndex: 'mxje6'
           },
		   {
            title: '明细金额7',
            align:"center",
            dataIndex: 'mxje7'
           },
		   {
            title: '明细金额8',
            align:"center",
            dataIndex: 'mxje8'
           },
		   {
            title: '明细金额9',
            align:"center",
            dataIndex: 'mxje9'
           },
		   {
            title: '明细金额10',
            align:"center",
            dataIndex: 'mxje10'
           },
		   {
            title: '明细金额11',
            align:"center",
            dataIndex: 'mxje11'
           },
		   {
            title: '明细金额12',
            align:"center",
            dataIndex: 'mxje12'
           },
		   {
            title: '明细金额13',
            align:"center",
            dataIndex: 'mxje13'
           },
		   {
            title: '明细金额14',
            align:"center",
            dataIndex: 'mxje14'
           },
		   {
            title: '明细金额15',
            align:"center",
            dataIndex: 'mxje15'
           },
		   {
            title: '录入操作柜员',
            align:"center",
            dataIndex: 'lrczgy'
           },
		   {
            title: '录入操作机构',
            align:"center",
            dataIndex: 'lrczjg'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'lrrq'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '修改操作柜员',
            align:"center",
            dataIndex: 'xgczgy'
           },
		   {
            title: '修改操作机构',
            align:"center",
            dataIndex: 'xgczjg'
           },
		   {
            title: '修改日期',
            align:"center",
            dataIndex: 'xgrq'
           },
		   {
            title: '修改时间',
            align:"center",
            dataIndex: 'xgsj'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'yl1'
           },
		   {
            title: '预留2',
            align:"center",
            dataIndex: 'yl2'
           },
		   {
            title: '预留3',
            align:"center",
            dataIndex: 'yl3'
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
          list: "/dsdfxmmxdjb/dsdfxmmxdjb/list",
          delete: "/dsdfxmmxdjb/dsdfxmmxdjb/delete",
          deleteBatch: "/dsdfxmmxdjb/dsdfxmmxdjb/deleteBatch",
          exportXlsUrl: "dsdfxmmxdjb/dsdfxmmxdjb/exportXls",
          importExcelUrl: "dsdfxmmxdjb/dsdfxmmxdjb/importExcel",
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