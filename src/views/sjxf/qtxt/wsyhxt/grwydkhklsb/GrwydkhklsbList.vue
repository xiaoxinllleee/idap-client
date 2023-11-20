<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银客户号">
              <a-input placeholder="请输入网银客户号" v-model="queryParam.plfCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.plfLoanacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款户名">
              <a-input placeholder="请输入贷款户名" v-model="queryParam.plfLoanname"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号开户行">
              <a-input placeholder="请输入贷款账号开户行" v-model="queryParam.plfLoanaccopennode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款网点名称">
              <a-input placeholder="请输入贷款网点名称" v-model="queryParam.plfLoanbranchname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="还款账号">
              <a-input placeholder="请输入还款账号" v-model="queryParam.plfRcvacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="还款户名">
              <a-input placeholder="请输入还款户名" v-model="queryParam.plfRcvname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="还款开户行">
              <a-input placeholder="请输入还款开户行" v-model="queryParam.plfRcvbank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="还款开户行名称">
              <a-input placeholder="请输入还款开户行名称" v-model="queryParam.plfRcvaccname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-input placeholder="请输入交易状态" v-model="queryParam.plfState"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
              <!--<a-input placeholder="请输入开户机构号" v-model="queryParam.cifOpennode"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.cifOpennode"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人网银贷款还款流水表')">导出</a-button>
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
    <grwydkhklsb-modal ref="modalForm" @ok="modalFormOk"></grwydkhklsb-modal>
  </a-card>
</template>

<script>
  import GrwydkhklsbModal from './modules/GrwydkhklsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "GrwydkhklsbList",
    mixins:[JeecgListMixin],
    components: {
      GrwydkhklsbModal,JTreeSelect
    },
    data () {
      return {
        description: '个人网银贷款还款流水表管理页面',
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
            title: '网银交易流水号',
            align:"center",
            dataIndex: 'plfFlowno'
           },
		   {
            title: '网银客户号',
            align:"center",
            dataIndex: 'plfCstno'
           },
		   {
            title: '贷款序号',
            align:"center",
            dataIndex: 'plfLoanseq'
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'plfLoanacc'
           },
		   {
            title: '贷款户名',
            align:"center",
            dataIndex: 'plfLoanname'
           },
		   {
            title: '贷款账号开户行',
            align:"center",
            dataIndex: 'plfLoanaccopennode'
           },
		   {
            title: '贷款网点名称',
            align:"center",
            dataIndex: 'plfLoanbranchname'
           },
		   {
            title: '还款账号',
            align:"center",
            dataIndex: 'plfRcvacc'
           },
		   {
            title: '还款户名',
            align:"center",
            dataIndex: 'plfRcvname'
           },
		   {
            title: '还款开户行',
            align:"center",
            dataIndex: 'plfRcvbank'
           },
		   {
            title: '还款开户行名称',
            align:"center",
            dataIndex: 'plfRcvaccname'
           },
		   {
            title: '贷款、还款金额',
            align:"center",
            dataIndex: 'plfLoanamt'
           },
		   {
            title: '计息方式',
            align:"center",
            dataIndex: 'plfIntrsttype'
           },
		   {
            title: '计息方式',
            align:"center",
            dataIndex: 'plfPayflag'
           },
		   {
            title: '类型',
            align:"center",
            dataIndex: 'plfTrantype'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'plfFee'
           },
		   {
            title: '用户提交时间',
            align:"center",
            dataIndex: 'plfSubtime'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'plfState'
           },
		   {
            title: '开户机构号',
            align:"center",
            dataIndex: 'cifOpennode_dtctText'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载日期',
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
          list: "/grwydkhklsb/grwydkhklsb/list",
          delete: "/grwydkhklsb/grwydkhklsb/delete",
          deleteBatch: "/grwydkhklsb/grwydkhklsb/deleteBatch",
          exportXlsUrl: "grwydkhklsb/grwydkhklsb/exportXls",
          importExcelUrl: "grwydkhklsb/grwydkhklsb/importExcel",
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