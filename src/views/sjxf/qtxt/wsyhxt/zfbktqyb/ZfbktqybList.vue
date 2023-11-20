<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡通协议号">
              <a-input placeholder="请输入卡通协议号" v-model="queryParam.ccsSignno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.ccsCertno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支付宝账号">
              <a-input placeholder="请输入支付宝账号" v-model="queryParam.ccsCtaccno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="个人网银客户号">
              <a-input placeholder="请输入个人网银客户号" v-model="queryParam.ccsCstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网银账号">
              <a-input placeholder="请输入网银账号" v-model="queryParam.ccsAccno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="手机号">
              <a-input placeholder="请输入手机号" v-model="queryParam.ccsPhoneno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="0:签约1:注销">
              <a-input placeholder="请输入0:签约1:注销" v-model="queryParam.ccsType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签约柜员号">
              <a-input placeholder="请输入签约柜员号" v-model="queryParam.ccsOpenteller"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签约网点机构号">
              <a-input placeholder="请输入签约网点机构号" v-model="queryParam.ccsOpennode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.ccsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="经理号">
              <a-input placeholder="请输入经理号" v-model="queryParam.ccsManageno"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('支付宝卡通签约表')">导出</a-button>

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
    <zfbktqyb-modal ref="modalForm" @ok="modalFormOk"></zfbktqyb-modal>
  </a-card>
</template>

<script>
  import ZfbktqybModal from './modules/ZfbktqybModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZfbktqybList",
    mixins:[JeecgListMixin],
    components: {
      ZfbktqybModal
    },
    data () {
      return {
        description: '支付宝卡通签约表管理页面',
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
            title: '签约流水号',
            align:"center",
            dataIndex: 'ccsFlowno'
           },
		   {
            title: '卡通协议号',
            align:"center",
            dataIndex: 'ccsSignno'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'ccsCerttype'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'ccsCertno'
           },
		   {
            title: '支付宝账号',
            align:"center",
            dataIndex: 'ccsCtaccno'
           },
		   {
            title: '个人网银客户号',
            align:"center",
            dataIndex: 'ccsCstno'
           },
		   {
            title: '网银账号',
            align:"center",
            dataIndex: 'ccsAccno'
           },
		   {
            title: '手机号',
            align:"center",
            dataIndex: 'ccsPhoneno'
           },
		   {
            title: '0:签约1:注销',
            align:"center",
            dataIndex: 'ccsType'
           },
		   {
            title: '0:成功 1:失败 4:处理中',
            align:"center",
            dataIndex: 'ccsState'
           },
		   {
            title: '签约渠道',
            align:"center",
            dataIndex: 'ccsStartchannel'
           },
		   {
            title: '解约渠道',
            align:"center",
            dataIndex: 'ccsEndcheannel'
           },
		   {
            title: '签约柜员号',
            align:"center",
            dataIndex: 'ccsOpenteller'
           },
		   {
            title: '签约授权柜员号',
            align:"center",
            dataIndex: 'ccsOpenauthteller'
           },
		   {
            title: '签约网点机构号',
            align:"center",
            dataIndex: 'ccsOpennode'
           },
		   {
            title: '签约时间',
            align:"center",
            dataIndex: 'ccsOpendate'
           },
		   {
            title: '解约柜员号',
            align:"center",
            dataIndex: 'ccsCancelteller'
           },
		   {
            title: '解约授权柜员号',
            align:"center",
            dataIndex: 'ccsCancelauthteller'
           },
		   {
            title: '解约网点机构号',
            align:"center",
            dataIndex: 'ccsCancelnode'
           },
		   {
            title: '解约时间',
            align:"center",
            dataIndex: 'ccsEnddate'
           },
		   {
            title: '监控状态',
            align:"center",
            dataIndex: 'ccsBankStat'
           },
		   {
            title: '单笔限额',
            align:"center",
            dataIndex: 'ccsSinglemax'
           },
		   {
            title: '日累计限额',
            align:"center",
            dataIndex: 'ccsDaymax'
           },
		   {
            title: '限额修改时间',
            align:"center",
            dataIndex: 'ccsLimitupdatedate'
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'ccsName'
           },
		   {
            title: '修改时间',
            align:"center",
            dataIndex: 'ccsOptime'
           },
		   {
            title: '经理号',
            align:"center",
            dataIndex: 'ccsManageno'
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
          list: "/zfbktqyb/zfbktqyb/list",
          delete: "/zfbktqyb/zfbktqyb/delete",
          deleteBatch: "/zfbktqyb/zfbktqyb/deleteBatch",
          exportXlsUrl: "zfbktqyb/zfbktqyb/exportXls",
          importExcelUrl: "zfbktqyb/zfbktqyb/importExcel",
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