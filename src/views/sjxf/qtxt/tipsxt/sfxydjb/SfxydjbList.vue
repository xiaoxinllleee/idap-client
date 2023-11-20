<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="协议书号">
              <a-input placeholder="请输入协议书号" v-model="queryParam.protocolno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款账户">
              <a-input placeholder="请输入付款账户" v-model="queryParam.payacct"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="征收机关代码">
              <a-input placeholder="请输入征收机关代码" v-model="queryParam.taxorgcode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="纳税人名称">
              <a-input placeholder="请输入纳税人名称" v-model="queryParam.taxpayname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="纳税人编码">
              <a-input placeholder="请输入纳税人编码" v-model="queryParam.taxpaycode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款开户行行号">
              <a-input placeholder="请输入付款开户行行号" v-model="queryParam.payopbkcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款行行号">
              <a-input placeholder="请输入付款行行号" v-model="queryParam.paybkcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
             <!-- <a-input placeholder="请输入开户机构" v-model="queryParam.accbrno"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.accbrno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款行行名">
              <a-input placeholder="请输入付款行行名" v-model="queryParam.paybkname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户类型">
              <a-input placeholder="请输入账户类型" v-model="queryParam.acctype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="协议状态">
              <a-input placeholder="请输入协议状态" v-model="queryParam.protocolstatus"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('TIPS三方协议登记簿')">导出</a-button>
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
    <sfxydjb-modal ref="modalForm" @ok="modalFormOk"></sfxydjb-modal>
  </a-card>
</template>

<script>
  import SfxydjbModal from './modules/SfxydjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "SfxydjbList",
    mixins:[JeecgListMixin],
    components: {
      SfxydjbModal,JTreeSelect
    },
    data () {
      return {
        description: 'TIPS三方协议登记簿管理页面',
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
            title: '书号',
            align:"center",
            dataIndex: 'protocolno'
           },
		   {
            title: '付款账户',
            align:"center",
            dataIndex: 'payacct'
           },
		   {
            title: '征收机关代码',
            align:"center",
            dataIndex: 'taxorgcode'
           },
		   {
            title: '纳税人名称',
            align:"center",
            dataIndex: 'taxpayname'
           },
		   {
            title: '纳税人编码',
            align:"center",
            dataIndex: 'taxpaycode'
           },
		   {
            title: '付款开户行行号',
            align:"center",
            dataIndex: 'payopbkcode'
           },
		   {
            title: '付款行行号',
            align:"center",
            dataIndex: 'paybkcode'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'accbrno_dictText'
           },
		   {
            title: '缴款单位名称',
            align:"center",
            dataIndex: 'handorgname'
           },
		   {
            title: '征收机关名称',
            align:"center",
            dataIndex: 'taxorgname'
           },
		   {
            title: '付款开户行行名',
            align:"center",
            dataIndex: 'payopbkname'
           },
		   {
            title: '付款行行名',
            align:"center",
            dataIndex: 'paybkname'
           },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'acctype'
           },
		   {
            title: '协议状态',
            align:"center",
            dataIndex: 'protocolstatus'
           },
		   {
            title: '录入柜员',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'busidate'
           },
		   {
            title: '验证日期',
            align:"center",
            dataIndex: 'vcdate'
           },
		   {
            title: '撤销日期',
            align:"center",
            dataIndex: 'canceldate'
           },
		   {
            title: '打印次数',
            align:"center",
            dataIndex: 'printcnt'
           },
		   {
            title: '数据来源',
            align:"center",
            dataIndex: 'datasource'
           },
		   {
            title: '预留字段1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留字段2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留字段3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '新付款账号',
            align:"center",
            dataIndex: 'xpayacct'
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
          list: "/sfxydjb/sfxydjb/list",
          delete: "/sfxydjb/sfxydjb/delete",
          deleteBatch: "/sfxydjb/sfxydjb/deleteBatch",
          exportXlsUrl: "sfxydjb/sfxydjb/exportXls",
          importExcelUrl: "sfxydjb/sfxydjb/importExcel",
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