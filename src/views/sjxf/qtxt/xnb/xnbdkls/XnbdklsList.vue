<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作网点">
              <a-input placeholder="请输入操作网点" v-model="queryParam.brno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员">
              <a-input placeholder="请输入操作柜员" v-model="queryParam.tellerno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="文件类型">
              <a-input placeholder="请输入文件类型" v-model="queryParam.filetype"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作类型">
              <a-input placeholder="请输入操作类型" v-model="queryParam.opertype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="社保机构代码">
              <a-input placeholder="请输入社保机构代码" v-model="queryParam.socialorgcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同编号">
              <a-input placeholder="请输入合同编号" v-model="queryParam.contractno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="缴费人员姓名">
              <a-input placeholder="请输入缴费人员姓名" v-model="queryParam.truename"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务状态">
              <a-input placeholder="请输入业务状态" v-model="queryParam.busistatus"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="文件名称">
              <a-input placeholder="请输入文件名称" v-model="queryParam.filename"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('新农保代扣流水')">导出</a-button>
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
    <xnbdkls-modal ref="modalForm" @ok="modalFormOk"></xnbdkls-modal>
  </a-card>
</template>

<script>
  import XnbdklsModal from './modules/XnbdklsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XnbdklsList",
    mixins:[JeecgListMixin],
    components: {
      XnbdklsModal
    },
    data () {
      return {
        description: '新农保代扣流水管理页面',
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
            title: '平台受理日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '平台业务序号',
            align:"center",
            dataIndex: 'workseqid'
           },
		   {
            title: '平台受理时间',
            align:"center",
            dataIndex: 'worktime'
           },
		   {
            title: '操作网点',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '文件类型',
            align:"center",
            dataIndex: 'filetype'
           },
		   {
            title: '操作类型',
            align:"center",
            dataIndex: 'opertype'
           },
		   {
            title: '社保机构代码',
            align:"center",
            dataIndex: 'socialorgcode'
           },
		   {
            title: '合同编号',
            align:"center",
            dataIndex: 'contractno'
           },
		   {
            title: '代扣账户账号',
            align:"center",
            dataIndex: 'acctno'
           },
		   {
            title: '缴费人员序号',
            align:"center",
            dataIndex: 'payseqno'
           },
		   {
            title: '缴费人员姓名',
            align:"center",
            dataIndex: 'truename'
           },
		   {
            title: '缴费人员身份证号',
            align:"center",
            dataIndex: 'identno'
           },
		   {
            title: '险种编码',
            align:"center",
            dataIndex: 'socialkind'
           },
		   {
            title: '缴费金额',
            align:"center",
            dataIndex: 'payamt'
           },
		   {
            title: '行政区划',
            align:"center",
            dataIndex: 'xzqh'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'address'
           },
		   {
            title: '反馈交易类型',
            align:"center",
            dataIndex: 'backtype'
           },
		   {
            title: '反馈交易信息',
            align:"center",
            dataIndex: 'backmsg'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'busistatus'
           },
		   {
            title: '文件名称',
            align:"center",
            dataIndex: 'filename'
           },
		   {
            title: '文件路径',
            align:"center",
            dataIndex: 'filepath'
           },
		   {
            title: '回执文件',
            align:"center",
            dataIndex: 'backfile'
           },
		   {
            title: '回执路径',
            align:"center",
            dataIndex: 'backpath'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '批次号',
            align:"center",
            dataIndex: 'batchno'
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
          list: "/xnbdkls/xnbdkls/list",
          delete: "/xnbdkls/xnbdkls/delete",
          deleteBatch: "/xnbdkls/xnbdkls/deleteBatch",
          exportXlsUrl: "xnbdkls/xnbdkls/exportXls",
          importExcelUrl: "xnbdkls/xnbdkls/importExcel",
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