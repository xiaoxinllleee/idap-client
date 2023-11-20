<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银客户号">
              <a-input placeholder="请输入网银客户号" v-model="queryParam.frcCstno"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.frcAccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="费种代码">
              <a-input placeholder="请输入费种代码" v-model="queryParam.frcFeeCode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指令状态">
              <a-input placeholder="请输入指令状态" v-model="queryParam.frcStt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
            <!--  <a-input placeholder="请输入开户机构号" v-model="queryParam.frcBranchId"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.frcBranchId"
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人支付缴费信息')">导出</a-button>
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

        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <grzfjfxx-modal ref="modalForm" @ok="modalFormOk"></grzfjfxx-modal>
  </a-card>
</template>

<script>
  import GrzfjfxxModal from './modules/GrzfjfxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "GrzfjfxxList",
    mixins:[JeecgListMixin],
    components: {
      GrzfjfxxModal,JTreeSelect
    },
    data () {
      return {
        description: '个人支付缴费信息管理页面',
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
            title: '指令流水号',
            align:"center",
            dataIndex: 'frcFlowno'
           },
		   {
            title: '网银客户号',
            align:"center",
            dataIndex: 'frcCstno'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'frcAccno'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'frcAmount'
           },
		   {
            title: '费种代码',
            align:"center",
            dataIndex: 'frcFeeCode'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'frcFee'
           },
		   {
            title: '提交时间',
            align:"center",
            dataIndex: 'frcSubmitTime'
           },
		   {
            title: '指令状态',
            align:"center",
            dataIndex: 'frcStt'
           },
		   {
            title: '开户机构号',
            align:"center",
            dataIndex: 'frcBranchId_dictText'
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
		   /*{
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
          list: "/grzfjfxx/grzfjfxx/list",
          delete: "/grzfjfxx/grzfjfxx/delete",
          deleteBatch: "/grzfjfxx/grzfjfxx/deleteBatch",
          exportXlsUrl: "grzfjfxx/grzfjfxx/exportXls",
          importExcelUrl: "grzfjfxx/grzfjfxx/importExcel",
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