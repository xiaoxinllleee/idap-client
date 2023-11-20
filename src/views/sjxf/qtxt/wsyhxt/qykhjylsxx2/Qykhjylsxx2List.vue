<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银客户号">
              <a-input placeholder="请输入网银客户号" v-model="queryParam.tflCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转账类型">
              <a-input placeholder="请输入转账类型" v-model="queryParam.tflType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方网点">
              <a-input placeholder="请输入付款方网点" v-model="queryParam.tflPaynode"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方账号">
              <a-input placeholder="请输入付款方账号" v-model="queryParam.tflPayacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方户名">
              <a-input placeholder="请输入付款方户名" v-model="queryParam.tflPayname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方账号开户行">
              <a-input placeholder="请输入收款方账号开户行" v-model="queryParam.tflRcvbank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方账号">
              <a-input placeholder="请输入收款方账号" v-model="queryParam.tflRcvacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方户名">
              <a-input placeholder="请输入收款方户名" v-model="queryParam.tflRcvname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号(客户)">
              <a-input placeholder="请输入开户机构号(客户)" v-model="queryParam.tflMemberbankid"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业客户交易流水信息(当天查证)')">导出</a-button>

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
    <qykhjylsxx2-modal ref="modalForm" @ok="modalFormOk"></qykhjylsxx2-modal>
  </a-card>
</template>

<script>
  import Qykhjylsxx2Modal from './modules/Qykhjylsxx2Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "Qykhjylsxx2List",
    mixins:[JeecgListMixin],
    components: {
      Qykhjylsxx2Modal
    },
    data () {
      return {
        description: '企业客户交易流水信息(当天查证)管理页面',
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
            title: '网银指令流水号',
            align:"center",
            dataIndex: 'tflFlowno'
           },
		   {
            title: '批次号',
            align:"center",
            dataIndex: 'tflBatchno'
           },
		   {
            title: '网银客户号',
            align:"center",
            dataIndex: 'tflCstno'
           },
		   {
            title: '转账类型',
            align:"center",
            dataIndex: 'tflType'
           },
		   {
            title: '转账提交时间',
            align:"center",
            dataIndex: 'tflSubmittime'
           },
		   {
            title: '交易发送主机时间',
            align:"center",
            dataIndex: 'tflSendtime'
           },
		   {
            title: '查证更新时间',
            align:"center",
            dataIndex: 'tflUpdatetime'
           },
		   {
            title: '付款方网点',
            align:"center",
            dataIndex: 'tflPaynode'
           },
		   {
            title: '付款方账号',
            align:"center",
            dataIndex: 'tflPayacc'
           },
		   {
            title: '付款方户名',
            align:"center",
            dataIndex: 'tflPayname'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'tflTranamt'
           },
		   {
            title: '收款方账号开户行',
            align:"center",
            dataIndex: 'tflRcvbank'
           },
		   {
            title: '收款方账号',
            align:"center",
            dataIndex: 'tflRcvacc'
           },
		   {
            title: '收款方户名',
            align:"center",
            dataIndex: 'tflRcvname'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'tflFee1'
           },
		   {
            title: '指令状态',
            align:"center",
            dataIndex: 'tflStt'
           },
		   {
            title: '开户机构号(客户)',
            align:"center",
            dataIndex: 'tflMemberbankid'
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
          list: "/qykhjylsxx2/qykhjylsxx2/list",
          delete: "/qykhjylsxx2/qykhjylsxx2/delete",
          deleteBatch: "/qykhjylsxx2/qykhjylsxx2/deleteBatch",
          exportXlsUrl: "qykhjylsxx2/qykhjylsxx2/exportXls",
          importExcelUrl: "qykhjylsxx2/qykhjylsxx2/importExcel",
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