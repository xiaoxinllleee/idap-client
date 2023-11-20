<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="上送核心流水号">
              <a-input placeholder="请输入上送核心流水号" v-model="queryParam.uuid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="票号">
              <a-input placeholder="请输入票号" v-model="queryParam.ph"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类型">
              <a-input placeholder="请输入业务类型" v-model="queryParam.ywlx"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人名称">
              <a-input placeholder="请输入收款人名称" v-model="queryParam.skrqc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款人账号">
              <a-input placeholder="请输入收款人账号" v-model="queryParam.skrzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="缴款人姓名">
              <a-input placeholder="请输入缴款人姓名" v-model="queryParam.jkr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="缴款人账号">
              <a-input placeholder="请输入缴款人账号" v-model="queryParam.jkrzh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
             <!-- <a-input placeholder="请输入机构码" v-model="queryParam.operbankno"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.operbankno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜员号">
              <a-input placeholder="请输入柜员号" v-model="queryParam.operno"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('非税业务交易流水')">导出</a-button>
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
        :scroll="{x:6450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <fsywjyls-modal ref="modalForm" @ok="modalFormOk"></fsywjyls-modal>
  </a-card>
</template>

<script>
  import FsywjylsModal from './modules/FsywjylsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "FsywjylsList",
    mixins:[JeecgListMixin],
    components: {
      FsywjylsModal,JTreeSelect
    },
    data () {
      return {
        description: '非税业务交易流水管理页面',
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
            title: '平台交易日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '平台时间',
            align:"center",
            dataIndex: 'worktime'
           },
		   {
            title: '上送核心流水号',
            align:"center",
            dataIndex: 'uuid'
           },
		   {
            title: '票号',
            align:"center",
            dataIndex: 'ph'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'ywlx'
           },
		   {
            title: '缴款方式',
            align:"center",
            dataIndex: 'jkfs'
           },
		   {
            title: '收款人名称',
            align:"center",
            dataIndex: 'skrqc'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'skrzh'
           },
		   {
            title: '缴款人姓名',
            align:"center",
            dataIndex: 'jkr'
           },
		   {
            title: '缴款人账号',
            align:"center",
            dataIndex: 'jkrzh'
           },
		   {
            title: '金额',
            align:"center",
            dataIndex: 'je'
           },
		   {
            title: '核心记账状态',
            align:"center",
            dataIndex: 'hoststatus'
           },
		   {
            title: '核心对账标志',
            align:"center",
            dataIndex: 'hostchkflag'
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
            title: '银行交易流水号',
            align:"center",
            dataIndex: 'yhjylsh'
           },
		   {
            title: '银行收款时间',
            align:"center",
            dataIndex: 'yhsksj'
           },
		   {
            title: '渠道流水',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'operbankno_dictText'
           },
		   {
            title: '柜员号',
            align:"center",
            dataIndex: 'operno'
           },
		   {
            title: '财政区划内码',
            align:"center",
            dataIndex: 'czqhnm'
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
          list: "/fsywjyls/fsywjyls/list",
          delete: "/fsywjyls/fsywjyls/delete",
          deleteBatch: "/fsywjyls/fsywjyls/deleteBatch",
          exportXlsUrl: "fsywjyls/fsywjyls/exportXls",
          importExcelUrl: "fsywjyls/fsywjyls/importExcel",
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