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
            <a-form-item label="身份证号">
              <a-input placeholder="请输入身份证号" v-model="queryParam.identno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="社保卡号">
              <a-input placeholder="请输入社保卡号" v-model="queryParam.socialcardno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="社保机构编码">
              <a-input placeholder="请输入社保机构编码" v-model="queryParam.socialorgcode"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="社保险种">
              <a-input placeholder="请输入社保险种" v-model="queryParam.socialkind"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.truename"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('新农保代发流水')">导出</a-button>
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
    <xnbdfls-modal ref="modalForm" @ok="modalFormOk"></xnbdfls-modal>
  </a-card>
</template>

<script>
  import XnbdflsModal from './modules/XnbdflsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XnbdflsList",
    mixins:[JeecgListMixin],
    components: {
      XnbdflsModal
    },
    data () {
      return {
        description: '新农保代发流水管理页面',
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
            title: '社保机构编码',
            align:"center",
            dataIndex: 'socialorgcode'
           },
		   {
            title: '身份证号',
            align:"center",
            dataIndex: 'identno'
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
            title: '姓名',
            align:"center",
            dataIndex: 'truename'
           },
		   {
            title: '缴费金额',
            align:"center",
            dataIndex: 'payamt'
           },
		   {
            title: '社保卡号',
            align:"center",
            dataIndex: 'socialcardno'
           },
		   {
            title: '财务支付单号',
            align:"center",
            dataIndex: 'finpayno'
           },
		   {
            title: '行政区划',
            align:"center",
            dataIndex: 'xzqh'
           },
		   {
            title: '人行银行网点编码',
            align:"center",
            dataIndex: 'bankcode'
           },
		   {
            title: '人行银行网点名称',
            align:"center",
            dataIndex: 'bankname'
           },
		   {
            title: '反馈类型',
            align:"center",
            dataIndex: 'backtype'
           },
		   {
            title: '银行账号',
            align:"center",
            dataIndex: 'bankacctno'
           },
		   {
            title: '错误信息',
            align:"center",
            dataIndex: 'errmsg'
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
            title: '批量批次号',
            align:"center",
            dataIndex: 'batchno'
           },
		   {
            title: '顺序号',
            align:"center",
            dataIndex: 'serialno'
           },
		   {
            title: '发放流水号',
            align:"center",
            dataIndex: 'seqno'
           },
		   {
            title: '社保险种',
            align:"center",
            dataIndex: 'socialkind'
           },
		   {
            title: '是否新增',
            align:"center",
            dataIndex: 'flag'
           },
		   {
            title: '发放月份',
            align:"center",
            dataIndex: 'ffyf'
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
          list: "/xnbdfls/xnbdfls/list",
          delete: "/xnbdfls/xnbdfls/delete",
          deleteBatch: "/xnbdfls/xnbdfls/deleteBatch",
          exportXlsUrl: "xnbdfls/xnbdfls/exportXls",
          importExcelUrl: "xnbdfls/xnbdfls/importExcel",
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