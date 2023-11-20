<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易批次号">
              <a-input placeholder="请输入交易批次号" v-model="queryParam.jypch"></a-input>
            </a-form-item>
          </a-col>
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


        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位账号">
              <a-input placeholder="请输入单位账号" v-model="queryParam.dwzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同号">
              <a-input placeholder="请输入合同号" v-model="queryParam.hth"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjh"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('代收代发流水表')">导出</a-button>
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
    <dsdflsb-modal ref="modalForm" @ok="modalFormOk"></dsdflsb-modal>
  </a-card>
</template>

<script>
  import DsdflsbModal from './modules/DsdflsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DsdflsbList",
    mixins:[JeecgListMixin],
    components: {
      DsdflsbModal
    },
    data () {
      return {
        description: '代收代发流水表管理页面',
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
            title: '交易日期',
            align:"center",
            dataIndex: 'jyrq'
           },
		   {
            title: '交易批次号',
            align:"center",
            dataIndex: 'jypch'
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
            title: '序列号',
            align:"center",
            dataIndex: 'xlh'
           },
		   {
            title: '单位账号',
            align:"center",
            dataIndex: 'dwzh'
           },
		   {
            title: '代收发标志',
            align:"center",
            dataIndex: 'dsfbz'
           },
		   {
            title: '证件种类',
            align:"center",
            dataIndex: 'zjlb'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjh'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '合同号',
            align:"center",
            dataIndex: 'hth'
           },
		   {
            title: '行别',
            align:"center",
            dataIndex: 'hb'
           },
		   {
            title: '应收金额',
            align:"center",
            dataIndex: 'ysje'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'jyje'
           },
		   {
            title: '交易标志',
            align:"center",
            dataIndex: 'jybz'
           },
		   {
            title: '大写金额',
            align:"center",
            dataIndex: 'dxje'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '纳税编号',
            align:"center",
            dataIndex: 'nsbh'
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
            title: '检查操作柜员',
            align:"center",
            dataIndex: 'jcczgy'
           },
		   {
            title: '检查操作机构',
            align:"center",
            dataIndex: 'jcczjg'
           },
		   {
            title: '检查日期',
            align:"center",
            dataIndex: 'jcrq'
           },
		   {
            title: '检查时间',
            align:"center",
            dataIndex: 'jcsj'
           },
		   {
            title: '检验UUID',
            align:"center",
            dataIndex: 'jyuuid'
           },
		   {
            title: '通过标志',
            align:"center",
            dataIndex: 'tgbz'
           },
		   {
            title: '错误信息',
            align:"center",
            dataIndex: 'cwxx'
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
            title: '核心错误码',
            align:"center",
            dataIndex: 'hostcode'
           },
		   {
            title: '核心错误信息',
            align:"center",
            dataIndex: 'hostcwxx'
           },
		   {
            title: '核心流水',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '核心交易日期',
            align:"center",
            dataIndex: 'hosttradedate'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		 /*  {
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
          list: "/dsdflsb/dsdflsb/list",
          delete: "/dsdflsb/dsdflsb/delete",
          deleteBatch: "/dsdflsb/dsdflsb/deleteBatch",
          exportXlsUrl: "dsdflsb/dsdflsb/exportXls",
          importExcelUrl: "dsdflsb/dsdflsb/importExcel",
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