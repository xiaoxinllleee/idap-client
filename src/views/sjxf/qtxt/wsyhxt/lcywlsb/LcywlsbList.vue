<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银客户号">
              <a-input placeholder="请输入网银客户号" v-model="queryParam.fdtCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转出账号">
              <a-input placeholder="请输入转出账号" v-model="queryParam.fdtPayacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转出账号子账号">
              <a-input placeholder="请输入转出账号子账号" v-model="queryParam.fdtPaysubacc"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转入账号">
              <a-input placeholder="请输入转入账号" v-model="queryParam.fdtRcvacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转入账号子账号">
              <a-input placeholder="请输入转入账号子账号" v-model="queryParam.fdtRcvsubacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户类型">
              <a-input placeholder="请输入账户类型" v-model="queryParam.fdtAcctype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转出转入标志">
              <a-input placeholder="请输入转出转入标志" v-model="queryParam.fdtTrantype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
             <!-- <a-input placeholder="请输入开户机构号" v-model="queryParam.cifOpennode"></a-input>-->
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('理财业务流水表')">导出</a-button>

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
    <lcywlsb-modal ref="modalForm" @ok="modalFormOk"></lcywlsb-modal>
  </a-card>
</template>

<script>
  import LcywlsbModal from './modules/LcywlsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "LcywlsbList",
    mixins:[JeecgListMixin],
    components: {
      LcywlsbModal,JTreeSelect
    },
    data () {
      return {
        description: '理财业务流水表管理页面',
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
            dataIndex: 'fdtFlowno'
           },
		   {
            title: '网银客户号',
            align:"center",
            dataIndex: 'fdtCstno'
           },
		   {
            title: '转出账号',
            align:"center",
            dataIndex: 'fdtPayacc'
           },
		   {
            title: '转出账号子账号',
            align:"center",
            dataIndex: 'fdtPaysubacc'
           },
		   {
            title: '转入账号',
            align:"center",
            dataIndex: 'fdtRcvacc'
           },
		   {
            title: '转入账号子账号',
            align:"center",
            dataIndex: 'fdtRcvsubacc'
           },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'fdtAcctype'
           },
		   {
            title: '转出转入标志',
            align:"center",
            dataIndex: 'fdtTrantype'
           },
		   {
            title: '存期',
            align:"center",
            dataIndex: 'fdtSaveperiod'
           },
		   {
            title: '是否自动转存',
            align:"center",
            dataIndex: 'fdtAutosave'
           },
		   {
            title: '通知日期',
            align:"center",
            dataIndex: 'fdtNoticedate'
           },
		   {
            title: '支取日期',
            align:"center",
            dataIndex: 'fdtDrawdate'
           },
		   {
            title: '用户提交时间',
            align:"center",
            dataIndex: 'fdtSubtime'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'fdtTranamt'
           },
		   {
            title: '指令状态',
            align:"center",
            dataIndex: 'fdtStt'
           },
		   {
            title: '开户机构号',
            align:"center",
            dataIndex: 'cifOpennode_dictText'
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
          list: "/lcywlsb/lcywlsb/list",
          delete: "/lcywlsb/lcywlsb/delete",
          deleteBatch: "/lcywlsb/lcywlsb/deleteBatch",
          exportXlsUrl: "lcywlsb/lcywlsb/exportXls",
          importExcelUrl: "lcywlsb/lcywlsb/importExcel",
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