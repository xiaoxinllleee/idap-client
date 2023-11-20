<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易对手编号">
              <a-input placeholder="请输入交易对手编号" v-model="queryParam.ctpyNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="版本号">
              <a-input placeholder="请输入版本号" v-model="queryParam.version"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易对手名称">
              <a-input placeholder="请输入交易对手名称" v-model="queryParam.ctpyName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
             <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('交易对手信息表')">导出</a-button>

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
    <jydsxxb-modal ref="modalForm" @ok="modalFormOk"></jydsxxb-modal>
  </a-card>
</template>

<script>
  import JydsxxbModal from './modules/JydsxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "JydsxxbList",
    mixins:[JeecgListMixin],
    components: {
      JydsxxbModal
    },
    data () {
      return {
        description: '交易对手信息表管理页面',
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
            title: '交易对手编号',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '版本号',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: '组织机构代码证',
            align:"center",
            dataIndex: 'ogzCode'
           },
		   {
            title: '交易对手名称',
            align:"center",
            dataIndex: 'ctpyName'
           },
		   {
            title: '交易对手种类',
            align:"center",
            dataIndex: 'ctpyBustype'
           },
		   {
            title: '营业执照',
            align:"center",
            dataIndex: 'operatLic'
           },
		   {
            title: '金融许可证',
            align:"center",
            dataIndex: 'financialLic'
           },
		   {
            title: '税务登记证',
            align:"center",
            dataIndex: 'taxRegCertf'
           },
		   {
            title: '法人代表名称',
            align:"center",
            dataIndex: 'legalName'
           },
		   {
            title: '法人代表身份证',
            align:"center",
            dataIndex: 'legalCardid'
           },
		   {
            title: '上级机构授权',
            align:"center",
            dataIndex: 'agenAuth'
           },
		   {
            title: '资产总额(元)',
            align:"center",
            dataIndex: 'totalAssets'
           },
		   {
            title: '负债总额(元)',
            align:"center",
            dataIndex: 'totalLiabts'
           },
		   {
            title: '所有者权益总额(元)',
            align:"center",
            dataIndex: 'totalStocks'
           },
		   {
            title: '股本金总额(元)',
            align:"center",
            dataIndex: 'totalEquity'
           },
		   {
            title: '存款总额(元)',
            align:"center",
            dataIndex: 'totalDeposits'
           },
		   {
            title: '资本充足率(%)',
            align:"center",
            dataIndex: 'capAdeqyRatio'
           },
		   {
            title: '托管账户户名',
            align:"center",
            dataIndex: 'dpbkName'
           },
		   {
            title: '托管机构',
            align:"center",
            dataIndex: 'dpbkBrno'
           },
		   {
            title: '托管账号',
            align:"center",
            dataIndex: 'dpbkAcno'
           },
		   {
            title: '资信状况',
            align:"center",
            dataIndex: 'creditStatus'
           },
		   {
            title: '主体评级',
            align:"center",
            dataIndex: 'mainlv'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'addres'
           },
		   {
            title: '主维护部门',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '主维护联社',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '交易对手类型',
            align:"center",
            dataIndex: 'ctpyType'
           },
		   {
            title: '交易对手子类',
            align:"center",
            dataIndex: 'categoryType'
           },
		   {
            title: '区域类型',
            align:"center",
            dataIndex: 'placeFlag'
           },
		   {
            title: '是否债券承销商',
            align:"center",
            dataIndex: 'isBondseller'
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
          list: "/jydsxxb/jydsxxb/list",
          delete: "/jydsxxb/jydsxxb/delete",
          deleteBatch: "/jydsxxb/jydsxxb/deleteBatch",
          exportXlsUrl: "jydsxxb/jydsxxb/exportXls",
          importExcelUrl: "jydsxxb/jydsxxb/importExcel",
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