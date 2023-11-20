<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员">
              <a-input placeholder="请输入操作柜员" v-model="queryParam.tellerno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
             <!-- <a-input placeholder="请输入机构码" v-model="queryParam.bankno"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.bankno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="学校编码">
              <a-input placeholder="请输入学校编码" v-model="queryParam.xxbm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="学校名称">
              <a-input placeholder="请输入学校名称" v-model="queryParam.xxmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="学费期次">
              <a-input placeholder="请输入学费期次" v-model="queryParam.termno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户号码">
              <a-input placeholder="请输入用户号码" v-model="queryParam.userid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户姓名">
              <a-input placeholder="请输入用户姓名" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="专业">
              <a-input placeholder="请输入专业" v-model="queryParam.major"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人账号">
              <a-input placeholder="请输入付款人账号" v-model="queryParam.payeraccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人名称">
              <a-input placeholder="请输入付款人名称" v-model="queryParam.payername"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人账号">
              <a-input placeholder="请输入收款人账号" v-model="queryParam.payeeaccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人名称">
              <a-input placeholder="请输入收款人名称" v-model="queryParam.payeename"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('代收学费交易流水')">导出</a-button>

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
    <dsxfjyls-modal ref="modalForm" @ok="modalFormOk"></dsxfjyls-modal>
  </a-card>
</template>

<script>
  import DsxfjylsModal from './modules/DsxfjylsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "DsxfjylsList",
    mixins:[JeecgListMixin],
    components: {
      DsxfjylsModal,JTreeSelect
    },
    data () {
      return {
        description: '代收学费交易流水管理页面',
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
            title: '渠道交易日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '渠道交易流水',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '平台交易日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '平台交易流水',
            align:"center",
            dataIndex: 'workseqno'
           },
		   {
            title: '上核心流水号',
            align:"center",
            dataIndex: 'hostserialno'
           },
		   {
            title: '平台时间',
            align:"center",
            dataIndex: 'worktime'
           },
		   {
            title: '地区代码',
            align:"center",
            dataIndex: 'zoneid'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'tradetype'
           },
		   {
            title: '对于代收代付类的交易',
            align:"center",
            dataIndex: 'cupflag'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '操作终端号',
            align:"center",
            dataIndex: 'terminalno'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'bankno_dictText'
           },
		   {
            title: '柜面流水号',
            align:"center",
            dataIndex: 'counterseqno'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'authtellerno'
           },
		   {
            title: '对账区分',
            align:"center",
            dataIndex: 'needchk'
           },
		   {
            title: '核心记账状态',
            align:"center",
            dataIndex: 'hoststatus'
           },
		   {
            title: '核心交易流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '核心交易日期',
            align:"center",
            dataIndex: 'hostdate'
           },
		   {
            title: '核心错误码',
            align:"center",
            dataIndex: 'hosterrcode'
           },
		   {
            title: '核心错误信息',
            align:"center",
            dataIndex: 'hosterrmsg'
           },
		   {
            title: '核心对账标志',
            align:"center",
            dataIndex: 'hostchkflag'
           },
		   {
            title: '第三方处理状态',
            align:"center",
            dataIndex: 'corpstatus'
           },
		   {
            title: '第三方流水号',
            align:"center",
            dataIndex: 'corpseqno'
           },
		   {
            title: '第三方交易日期',
            align:"center",
            dataIndex: 'corpdate'
           },
		   {
            title: '第三方错误码',
            align:"center",
            dataIndex: 'corperrcode'
           },
		   {
            title: '第三方错误信息',
            align:"center",
            dataIndex: 'corperrmsg'
           },
		   {
            title: '第三方对账标志',
            align:"center",
            dataIndex: 'corpchkflag'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'busistatus'
           },
		   {
            title: '业务错误码',
            align:"center",
            dataIndex: 'busierrcode'
           },
		   {
            title: '业务错误信息',
            align:"center",
            dataIndex: 'busierrmsg'
           },
		   {
            title: '学校编码',
            align:"center",
            dataIndex: 'xxbm'
           },
		   {
            title: '学校名称',
            align:"center",
            dataIndex: 'xxmc'
           },
		   {
            title: '学费期次',
            align:"center",
            dataIndex: 'termno'
           },
		   {
            title: '用户号码',
            align:"center",
            dataIndex: 'userid'
           },
		   {
            title: '用户姓名',
            align:"center",
            dataIndex: 'username'
           },
		   {
            title: '专业',
            align:"center",
            dataIndex: 'major'
           },
		   {
            title: '班级',
            align:"center",
            dataIndex: 'classxx'
           },
		   {
            title: '电话',
            align:"center",
            dataIndex: 'mobile'
           },
		   {
            title: '付款人账号',
            align:"center",
            dataIndex: 'payeraccno'
           },
		   {
            title: '付款人名称',
            align:"center",
            dataIndex: 'payername'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'acctseqno'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'payeeaccno'
           },
		   {
            title: '收款人名称',
            align:"center",
            dataIndex: 'payeename'
           },
		   {
            title: '收款人开户机构号',
            align:"center",
            dataIndex: 'payeeopenbrno'
           },
		   {
            title: '缴费方式',
            align:"center",
            dataIndex: 'cashflag'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'cardflag'
           },
		   {
            title: '现金项目编号',
            align:"center",
            dataIndex: 'cashprjcode'
           },
		   {
            title: '中间账户',
            align:"center",
            dataIndex: 'acctbrno'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'currcode'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amt'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'fee'
           },
		   {
            title: '摘要码',
            align:"center",
            dataIndex: 'memcode'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'idno'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'idtype'
           },
		   {
            title: '凭证类型',
            align:"center",
            dataIndex: 'vouchtype'
           },
		   {
            title: '凭证机构',
            align:"center",
            dataIndex: 'vouchbatch'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'vouchno'
           },
		   {
            title: '凭证日期',
            align:"center",
            dataIndex: 'vouchdate'
           },
		   {
            title: '发票打印次数',
            align:"center",
            dataIndex: 'prtnum'
           },
		   {
            title: '冲正标志',
            align:"center",
            dataIndex: 'revflag'
           },
		   {
            title: '原交易日期',
            align:"center",
            dataIndex: 'otrandate'
           },
		   {
            title: '原交易流水号',
            align:"center",
            dataIndex: 'otranseqno'
           },
		   {
            title: '原交易上核心流水号',
            align:"center",
            dataIndex: 'otranhostno'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'reserve1'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'reserve2'
           },
		   {
            title: '备注3',
            align:"center",
            dataIndex: 'reserve3'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '导入日期',
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
          list: "/dsxfjyls/dsxfjyls/list",
          delete: "/dsxfjyls/dsxfjyls/delete",
          deleteBatch: "/dsxfjyls/dsxfjyls/deleteBatch",
          exportXlsUrl: "dsxfjyls/dsxfjyls/exportXls",
          importExcelUrl: "dsxfjyls/dsxfjyls/importExcel",
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