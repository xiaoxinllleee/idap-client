<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="协议号">
              <a-input placeholder="请输入协议号" v-model="queryParam.qyxyh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="移动电话">
              <a-input placeholder="请输入移动电话" v-model="queryParam.yddh"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('农信银授权协议签约交易主表')">导出</a-button>

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
        :scroll="{x:2430}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <nxysqxyqyjyzb-modal ref="modalForm" @ok="modalFormOk"></nxysqxyqyjyzb-modal>
  </a-card>
</template>

<script>
  import NxysqxyqyjyzbModal from './modules/NxysqxyqyjyzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "NxysqxyqyjyzbList",
    mixins:[JeecgListMixin],
    components: {
      NxysqxyqyjyzbModal
    },
    data () {
      return {
        description: '农信银授权协议签约交易主表管理页面',
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
            title: '协议号',
            align:"center",
            dataIndex: 'qyxyh'
           },
		   {
            title: '签约类型',
            align:"center",
            dataIndex: 'qylx'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '移动电话',
            align:"center",
            dataIndex: 'yddh'
           },
		   {
            title: '支付宝账户',
            align:"center",
            dataIndex: 'zfbzh'
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
           },
		   {
            title: '卡号',
            align:"center",
            dataIndex: 'kh'
           },
		   {
            title: '撤约渠道',
            align:"center",
            dataIndex: 'qyqd'
           },
		   {
            title: '修改渠道',
            align:"center",
            dataIndex: 'cyqd'
           },
		   {
            title: '运营商',
            align:"center",
            dataIndex: 'xgqd'
           },
		   {
            title: '单笔限额',
            align:"center",
            dataIndex: 'yys'
           },
		   {
            title: '单日限额',
            align:"center",
            dataIndex: 'dbxe'
           },
		   {
            title: '签约状态',
            align:"center",
            dataIndex: 'drxe'
           },
		   {
            title: '签约时间',
            align:"center",
            dataIndex: 'qyzt'
           },
		   {
            title: '签约渠道',
            align:"center",
            dataIndex: 'qysj'
           },
		   {
            title: '撤约时间',
            align:"center",
            dataIndex: 'cysj'
           },
		   {
            title: '最近修改时间',
            align:"center",
            dataIndex: 'zjxgsj'
           },
		   {
            title: '备用1',
            align:"center",
            dataIndex: 'byzd1'
           },
		   {
            title: '备用2',
            align:"center",
            dataIndex: 'byzd2'
           },
		   {
            title: '备用3',
            align:"center",
            dataIndex: 'byzd3'
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
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   /*{
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
          list: "/nxysqxyqyjyzb/nxysqxyqyjyzb/list",
          delete: "/nxysqxyqyjyzb/nxysqxyqyjyzb/delete",
          deleteBatch: "/nxysqxyqyjyzb/nxysqxyqyjyzb/deleteBatch",
          exportXlsUrl: "nxysqxyqyjyzb/nxysqxyqyjyzb/exportXls",
          importExcelUrl: "nxysqxyqyjyzb/nxysqxyqyjyzb/importExcel",
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