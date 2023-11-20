<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="中间业务类型">
              <a-input placeholder="请输入中间业务类型" v-model="queryParam.zjywlx"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
             <!-- <a-input placeholder="请输入机构码" v-model="queryParam.dljgm"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.dljgm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人">
              <a-input placeholder="请输入付款人" v-model="queryParam.fkr"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人帐号">
              <a-input placeholder="请输入付款人帐号" v-model="queryParam.fkrzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="付款人户名">
              <a-input placeholder="请输入付款人户名" v-model="queryParam.fkrhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员">
              <a-input placeholder="请输入操作柜员" v-model="queryParam.gy"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('国土招拍挂业务交易流水表')">导出</a-button>

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
    <gtzpgywjylsb-modal ref="modalForm" @ok="modalFormOk"></gtzpgywjylsb-modal>
  </a-card>
</template>

<script>
  import GtzpgywjylsbModal from './modules/GtzpgywjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "GtzpgywjylsbList",
    mixins:[JeecgListMixin],
    components: {
      GtzpgywjylsbModal,JTreeSelect
    },
    data () {
      return {
        description: '国土招拍挂业务交易流水表管理页面',
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
            title: '中间业务类型',
            align:"center",
            dataIndex: 'zjywlx'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'dljgm_dictText'
           },
		   {
            title: '竞买号',
            align:"center",
            dataIndex: 'jmh'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'jyrq'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'jysj'
           },
		   {
            title: '中心流水号',
            align:"center",
            dataIndex: 'zxlsh'
           },
		   {
            title: '柜员流水号',
            align:"center",
            dataIndex: 'gylsh'
           },
		   {
            title: '前置机流水号',
            align:"center",
            dataIndex: 'qzjlsh'
           },
		   {
            title: '付款人',
            align:"center",
            dataIndex: 'fkr'
           },
		   {
            title: '付款人帐号',
            align:"center",
            dataIndex: 'fkrzh'
           },
		   {
            title: '付款人户名',
            align:"center",
            dataIndex: 'fkrhm'
           },
		   {
            title: '缴款方式',
            align:"center",
            dataIndex: 'jkfs'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'jyje'
           },
		   {
            title: '收款帐号',
            align:"center",
            dataIndex: 'skzh'
           },
		   {
            title: '子帐号',
            align:"center",
            dataIndex: 'zzh'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'gy'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'sqgy'
           },
		   {
            title: '标志',
            align:"center",
            dataIndex: 'flag'
           },
		   {
            title: '核心返回流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '渠道流水号',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '主机返回日期',
            align:"center",
            dataIndex: 'hostdate'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
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
          list: "/gtzpgywjylsb/gtzpgywjylsb/list",
          delete: "/gtzpgywjylsb/gtzpgywjylsb/delete",
          deleteBatch: "/gtzpgywjylsb/gtzpgywjylsb/deleteBatch",
          exportXlsUrl: "gtzpgywjylsb/gtzpgywjylsb/exportXls",
          importExcelUrl: "gtzpgywjylsb/gtzpgywjylsb/importExcel",
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