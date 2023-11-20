<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
              <a-input placeholder="请输入开户机构号" v-model="queryParam.cifOpennode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="企业客户号">
              <a-input placeholder="请输入企业客户号" v-model="queryParam.wflCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方账号">
              <a-input placeholder="请输入付款方账号" v-model="queryParam.wflPayacc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指令状态">
              <a-input placeholder="请输入指令状态" v-model="queryParam.wflStt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="批次号">
              <a-input placeholder="请输入批次号" v-model="queryParam.wflBatchno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="代发月份">
              <a-input placeholder="请输入代发月份" v-model="queryParam.wflMonth"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业代发工资差旅流水表')">导出</a-button>

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
    <qydfgzcllsb-modal ref="modalForm" @ok="modalFormOk"></qydfgzcllsb-modal>
  </a-card>
</template>

<script>
  import QydfgzcllsbModal from './modules/QydfgzcllsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QydfgzcllsbList",
    mixins:[JeecgListMixin],
    components: {
      QydfgzcllsbModal
    },
    data () {
      return {
        description: '企业代发工资差旅流水表管理页面',
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
            title: '开户机构号',
            align:"center",
            dataIndex: 'cifOpennode'
           },
		   {
            title: '批次号',
            align:"center",
            dataIndex: 'wflBatchno'
           },
		   {
            title: '企业客户号',
            align:"center",
            dataIndex: 'wflCstno'
           },
		   {
            title: '付款方账号',
            align:"center",
            dataIndex: 'wflPayacc'
           },
		   {
            title: '总笔数',
            align:"center",
            dataIndex: 'wflTotalnum'
           },
		   {
            title: '总金额',
            align:"center",
            dataIndex: 'wflTotalamt'
           },
		   {
            title: '费用1手续费',
            align:"center",
            dataIndex: 'wflFee1'
           },
		   {
            title: '费用2',
            align:"center",
            dataIndex: 'wflFee2'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'wflSubmittime'
           },
		   {
            title: '代发月份',
            align:"center",
            dataIndex: 'wflMonth'
           },
		   {
            title: '指令状态',
            align:"center",
            dataIndex: 'wflStt'
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
          list: "/qydfgzcllsb/qydfgzcllsb/list",
          delete: "/qydfgzcllsb/qydfgzcllsb/delete",
          deleteBatch: "/qydfgzcllsb/qydfgzcllsb/deleteBatch",
          exportXlsUrl: "qydfgzcllsb/qydfgzcllsb/exportXls",
          importExcelUrl: "qydfgzcllsb/qydfgzcllsb/importExcel",
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