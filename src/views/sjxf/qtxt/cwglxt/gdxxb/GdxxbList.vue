<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代号">
              <a-input placeholder="请输入机构代号" v-model="queryParam.opnBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="股东编号">
              <a-input placeholder="请输入股东编号" v-model="queryParam.clientNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="股东名称">
              <a-input placeholder="请输入股东名称" v-model="queryParam.clientName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="股东类型">
              <a-input placeholder="请输入股东类型" v-model="queryParam.clientType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系电话">
              <a-input placeholder="请输入联系电话" v-model="queryParam.telno"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('股东信息表')">导出</a-button>
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
    <gdxxb-modal ref="modalForm" @ok="modalFormOk"></gdxxb-modal>
  </a-card>
</template>

<script>
  import GdxxbModal from './modules/GdxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GdxxbList",
    mixins:[JeecgListMixin],
    components: {
      GdxxbModal
    },
    data () {
      return {
        description: '股东信息表管理页面',
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
            title: '机构代号',
            align:"center",
            dataIndex: 'opnBrNo'
           },
		   {
            title: '股东编号',
            align:"center",
            dataIndex: 'clientNo'
           },
		   {
            title: '股东名称',
            align:"center",
            dataIndex: 'clientName'
           },
		   {
            title: '股东类型',
            align:"center",
            dataIndex: 'clientType'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'certiftype'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'certifno'
           },
		   {
            title: '发证机关',
            align:"center",
            dataIndex: 'certifdep'
           },
		   {
            title: '股东地址',
            align:"center",
            dataIndex: 'address'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'telno'
           },
		   {
            title: '法定代表人姓名',
            align:"center",
            dataIndex: 'cprtName'
           },
		   {
            title: '法定代表人身份证号码',
            align:"center",
            dataIndex: 'cprtId'
           },
		   {
            title: '法定代表人联系电话',
            align:"center",
            dataIndex: 'cprtTelno'
           },
		   {
            title: '企业性质',
            align:"center",
            dataIndex: 'cmpType'
           },
		   {
            title: '营业执照号码',
            align:"center",
            dataIndex: 'buslceNo'
           },
		   {
            title: '员工所属单位编号',
            align:"center",
            dataIndex: 'branchNo'
           },
		   {
            title: '核心结算户账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '开户行号',
            align:"center",
            dataIndex: 'acctBranch'
           },
		   {
            title: '经办人姓名',
            align:"center",
            dataIndex: 'deputyName'
           },
		   {
            title: '经办人证件类型',
            align:"center",
            dataIndex: 'deputyType'
           },
		   {
            title: '经办人身份证号码',
            align:"center",
            dataIndex: 'deputyNo'
           },
		   {
            title: '代理人联系电话',
            align:"center",
            dataIndex: 'deputyTel'
           },
		   {
            title: '最后操作日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '最后操作操作员',
            align:"center",
            dataIndex: 'operId'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '注册资本',
            align:"center",
            dataIndex: 'regCapital'
           },
		   {
            title: '核心结算户名',
            align:"center",
            dataIndex: 'certifaddress'
           },
		   {
            title: '性别',
            align:"center",
            dataIndex: 'sex'
           },
		   {
            title: '行业',
            align:"center",
            dataIndex: 'industry'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '内部或外部股东区分标志',
            align:"center",
            dataIndex: 'ownership'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'regDate'
           },
		   {
            title: '股东编号',
            align:"center",
            dataIndex: 'holdNo'
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
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
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
          list: "/gdxxb/gdxxb/list",
          delete: "/gdxxb/gdxxb/delete",
          deleteBatch: "/gdxxb/gdxxb/deleteBatch",
          exportXlsUrl: "gdxxb/gdxxb/exportXls",
          importExcelUrl: "gdxxb/gdxxb/importExcel",
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