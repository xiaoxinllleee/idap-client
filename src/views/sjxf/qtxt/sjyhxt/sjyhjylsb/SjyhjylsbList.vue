<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="渠道流水号">
              <a-input placeholder="请输入渠道流水号" v-model="queryParam.flowno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.cstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易代码">
              <a-input placeholder="请输入交易代码" v-model="queryParam.bsncode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方账号">
              <a-input placeholder="请输入付款方账号" v-model="queryParam.payacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方户名">
              <a-input placeholder="请输入付款方户名" v-model="queryParam.payname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款方账号">
              <a-input placeholder="请输入付款方账号" v-model="queryParam.payacc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方户名">
              <a-input placeholder="请输入收款方户名" v-model="queryParam.rcvname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款方开户行">
              <a-input placeholder="请输入收款方开户行" v-model="queryParam.rcvbank"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.stt"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('交易流水表')">导出</a-button>
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
    <sjyhjylsb-modal ref="modalForm" @ok="modalFormOk"></sjyhjylsb-modal>
  </a-card>
</template>

<script>
  import SjyhjylsbModal from './modules/SjyhjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "SjyhjylsbList",
    mixins:[JeecgListMixin],
    components: {
      SjyhjylsbModal
    },
    data () {
      return {
        description: '交易流水表管理页面',
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
            title: '渠道流水号',
            align:"center",
            dataIndex: 'flowno'
           },
		   {
            title: '客户号',
            align:"center",
            dataIndex: 'cstno'
           },
		   {
            title: '交易代码',
            align:"center",
            dataIndex: 'bsncode'
           },
		   {
            title: '付款方账号',
            align:"center",
            dataIndex: 'payacc'
           },
		   {
            title: '付款方户名',
            align:"center",
            dataIndex: 'payname'
           },
		   {
            title: '收款方账号',
            align:"center",
            dataIndex: 'rcvacc'
           },
		   {
            title: '收款方户名',
            align:"center",
            dataIndex: 'rcvname'
           },
		   {
            title: '收款方开户行',
            align:"center",
            dataIndex: 'rcvbank'
           },
		   {
            title: '用户提交时间',
            align:"center",
            dataIndex: 'subtime'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'tranamt'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'fee'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'stt'
           },
		   {
            title: '交易渠道',
            align:"center",
            dataIndex: 'channel'
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
          list: "/sjyhjylsb/sjyhjylsb/list",
          delete: "/sjyhjylsb/sjyhjylsb/delete",
          deleteBatch: "/sjyhjylsb/sjyhjylsb/deleteBatch",
          exportXlsUrl: "sjyhjylsb/sjyhjylsb/exportXls",
          importExcelUrl: "sjyhjylsb/sjyhjylsb/importExcel",
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