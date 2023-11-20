<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参与者行号">
              <a-input placeholder="请输入参与者行号" v-model="queryParam.bankcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参与者全称">
              <a-input placeholder="请输入参与者全称" v-model="queryParam.bankname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参与者类别">
              <a-input placeholder="请输入参与者类别" v-model="queryParam.bankcatalog"></a-input>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参与者行别">
              <a-input placeholder="请输入参与者行别" v-model="queryParam.banktype"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('全国支付系统行号表')">导出</a-button>
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
    <qgzfxthhb-modal ref="modalForm" @ok="modalFormOk"></qgzfxthhb-modal>
  </a-card>
</template>

<script>
  import QgzfxthhbModal from './modules/QgzfxthhbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QgzfxthhbList",
    mixins:[JeecgListMixin],
    components: {
      QgzfxthhbModal
    },
    data () {
      return {
        description: '全国支付系统行号表管理页面',
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
            title: '参与者行号',
            align:"center",
            dataIndex: 'bankcode'
           },
		   {
            title: '参与者全称',
            align:"center",
            dataIndex: 'bankname'
           },
		   {
            title: '参与者简称',
            align:"center",
            dataIndex: 'bankaliasname'
           },
		   {
            title: '参与者类别',
            align:"center",
            dataIndex: 'bankcatalog'
           },
		   {
            title: '参与者行别',
            align:"center",
            dataIndex: 'banktype'
           },
		   {
            title: '管辖人行行号',
            align:"center",
            dataIndex: 'pbccode'
           },
		   {
            title: '参与者所属CCPC',
            align:"center",
            dataIndex: 'ccpc'
           },
		   {
            title: '所属直接参与机构',
            align:"center",
            dataIndex: 'dreccode'
           },
		   {
            title: '代理清算参与机构号',
            align:"center",
            dataIndex: 'agentsettbank'
           },
		   {
            title: '上级参与者',
            align:"center",
            dataIndex: 'suprlist'
           },
		   {
            title: '承接行行号',
            align:"center",
            dataIndex: 'sbstitnbk'
           },
		   {
            title: '所属城市',
            align:"center",
            dataIndex: 'debtorcity'
           },
		   {
            title: '加入业务系统标识',
            align:"center",
            dataIndex: 'syscode'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'addr'
           },
		   {
            title: '邮编',
            align:"center",
            dataIndex: 'postcode'
           },
		   {
            title: '电话/电挂',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '电子邮件地址',
            align:"center",
            dataIndex: 'email'
           },
		   {
            title: '生效日期',
            align:"center",
            dataIndex: 'effectdate'
           },
		   {
            title: '注销日期',
            align:"center",
            dataIndex: 'expdate'
           },
		   {
            title: '起始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '结束日期',
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
          list: "/qgzfxthhb/qgzfxthhb/list",
          delete: "/qgzfxthhb/qgzfxthhb/delete",
          deleteBatch: "/qgzfxthhb/qgzfxthhb/deleteBatch",
          exportXlsUrl: "qgzfxthhb/qgzfxthhb/exportXls",
          importExcelUrl: "qgzfxthhb/qgzfxthhb/importExcel",
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