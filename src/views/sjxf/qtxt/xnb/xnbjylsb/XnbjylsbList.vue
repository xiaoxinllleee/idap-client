<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作网点">
              <a-input placeholder="请输入操作网点" v-model="queryParam.brno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员">
              <a-input placeholder="请输入操作柜员" v-model="queryParam.tellerno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证号">
              <a-input placeholder="请输入身份证号" v-model="queryParam.identno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="社保机构编码">
              <a-input placeholder="请输入社保机构编码" v-model="queryParam.socialorgcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="社保险种">
              <a-input placeholder="请输入社保险种" v-model="queryParam.socialkind"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.truename"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务状态">
              <a-input placeholder="请输入业务状态" v-model="queryParam.busistatus"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('新农保交易流水表')">导出</a-button>
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
        :scroll="{x:8450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xnbjylsb-modal ref="modalForm" @ok="modalFormOk"></xnbjylsb-modal>
  </a-card>
</template>

<script>
  import XnbjylsbModal from './modules/XnbjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XnbjylsbList",
    mixins:[JeecgListMixin],
    components: {
      XnbjylsbModal
    },
    data () {
      return {
        description: '新农保交易流水表管理页面',
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
            title: '平台受理日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '平台业务序号',
            align:"center",
            dataIndex: 'workseqid'
           },
		   {
            title: '平台受理时间',
            align:"center",
            dataIndex: 'worktime'
           },
		   {
            title: '平台交易代码',
            align:"center",
            dataIndex: 'tradecode'
           },
		   {
            title: '系统标识',
            align:"center",
            dataIndex: 'sysid'
           },
		   {
            title: '应用标识',
            align:"center",
            dataIndex: 'appid'
           },
		   {
            title: '发起渠道代码',
            align:"center",
            dataIndex: 'chnlcode'
           },
		   {
            title: '发起渠道流水号',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '发起渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '发起渠道时间',
            align:"center",
            dataIndex: 'chnltime'
           },
		   {
            title: '操作网点',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '授权网点',
            align:"center",
            dataIndex: 'authbrno'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'authtellerno'
           },
		   {
            title: '操作终端号',
            align:"center",
            dataIndex: 'terminalcode'
           },
		   {
            title: '身份证号',
            align:"center",
            dataIndex: 'identno'
           },
		   {
            title: '姓名',
            align:"center",
            dataIndex: 'truename'
           },
		   {
            title: '缴费年度',
            align:"center",
            dataIndex: 'payyear'
           },
		   {
            title: '缴费档次',
            align:"center",
            dataIndex: 'paylevel'
           },
		   {
            title: '缴费身份',
            align:"center",
            dataIndex: 'payident'
           },
		   {
            title: '缴费金额',
            align:"center",
            dataIndex: 'payamt'
           },
		   {
            title: '缴款方式',
            align:"center",
            dataIndex: 'payway'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'cardflag'
           },
		   {
            title: '缴款卡号',
            align:"center",
            dataIndex: 'paycardno'
           },
		   {
            title: '缴款账号',
            align:"center",
            dataIndex: 'payacctno'
           },
		   {
            title: '存折号码',
            align:"center",
            dataIndex: 'passbookno'
           },
		   {
            title: '缴费单号',
            align:"center",
            dataIndex: 'payno'
           },
		   {
            title: '社保机构编码',
            align:"center",
            dataIndex: 'socialorgcode'
           },
		   {
            title: '社保险种',
            align:"center",
            dataIndex: 'socialkind'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'voucherno'
           },
		   {
            title: '打印方式',
            align:"center",
            dataIndex: 'printway'
           },
		   {
            title: '起始时间',
            align:"center",
            dataIndex: 'startdate'
           },
		   {
            title: '截止时间',
            align:"center",
            dataIndex: 'enddate'
           },
		   {
            title: '核心请求UUID',
            align:"center",
            dataIndex: 'requuid'
           },
		   {
            title: '核心应答UUID',
            align:"center",
            dataIndex: 'rspuuid'
           },
		   {
            title: '账务系统处理状态',
            align:"center",
            dataIndex: 'bankstatus'
           },
		   {
            title: '账务系统处理错误码',
            align:"center",
            dataIndex: 'bankerrcode'
           },
		   {
            title: '账务系统处理错误信息',
            align:"center",
            dataIndex: 'bankerrmsg'
           },
		   {
            title: '账务系统对账状态',
            align:"center",
            dataIndex: 'bankchkflag'
           },
		   {
            title: '第三方交易时间',
            align:"center",
            dataIndex: 'reqtime'
           },
		   {
            title: '第三方处理状态',
            align:"center",
            dataIndex: 'corpstatus'
           },
		   {
            title: '第三方处理码',
            align:"center",
            dataIndex: 'corperrcode'
           },
		   {
            title: '第三方处理信息',
            align:"center",
            dataIndex: 'corperrmsg'
           },
		   {
            title: '第三方对账状态',
            align:"center",
            dataIndex: 'corpchkflag'
           },
		   {
            title: '交易当前业务步骤',
            align:"center",
            dataIndex: 'tradebusistep'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'busistatus'
           },
		   {
            title: '原平台受理日期',
            align:"center",
            dataIndex: 'origworkdate'
           },
		   {
            title: '原平台业务序号',
            align:"center",
            dataIndex: 'origworkseqid'
           },
		   {
            title: '冲正标志',
            align:"center",
            dataIndex: 'revflag'
           },
		   {
            title: 'BSP标识号',
            align:"center",
            dataIndex: 'bspno'
           },
		   {
            title: '业务拒绝码',
            align:"center",
            dataIndex: 'errcode'
           },
		   {
            title: '业务拒绝原因',
            align:"center",
            dataIndex: 'errmsg'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '核心流水',
            align:"center",
            dataIndex: 'hostreqno'
           },
		   {
            title: '核心日期',
            align:"center",
            dataIndex: 'hostdate'
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
          list: "/xnbjylsb/xnbjylsb/list",
          delete: "/xnbjylsb/xnbjylsb/delete",
          deleteBatch: "/xnbjylsb/xnbjylsb/deleteBatch",
          exportXlsUrl: "xnbjylsb/xnbjylsb/exportXls",
          importExcelUrl: "xnbjylsb/xnbjylsb/importExcel",
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