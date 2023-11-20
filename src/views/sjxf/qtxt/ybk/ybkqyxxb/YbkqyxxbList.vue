<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
             <!-- <a-input placeholder="请输入机构码" v-model="queryParam.jgm"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.jgm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="中间业务类型">
              <a-input placeholder="请输入中间业务类型" v-model="queryParam.zjywlx"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="三方合同号">
              <a-input placeholder="请输入三方合同号" v-model="queryParam.sfhth"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="协议类型">
              <a-input placeholder="请输入协议类型" v-model="queryParam.zflx"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号帐号">
              <a-input placeholder="请输入卡号帐号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号">
              <a-input placeholder="请输入证件号" v-model="queryParam.zjh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="登记柜员">
              <a-input placeholder="请输入登记柜员" v-model="queryParam.gy"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('医保卡签约信息表')">导出</a-button>

    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

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
    <ybkqyxxb-modal ref="modalForm" @ok="modalFormOk"></ybkqyxxb-modal>
  </a-card>
</template>

<script>
  import YbkqyxxbModal from './modules/YbkqyxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "YbkqyxxbList",
    mixins:[JeecgListMixin],
    components: {
      YbkqyxxbModal,JTreeSelect
    },
    data () {
      return {
        description: '医保卡签约信息表管理页面',
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
            title: '机构码',
            align:"center",
            dataIndex: 'jgm_dictText'
           },
		   {
            title: '中间业务类型',
            align:"center",
            dataIndex: 'zjywlx'
           },
		   {
            title: '姓名',
            align:"center",
            dataIndex: 'xm'
           },
		   {
            title: '三方合同号',
            align:"center",
            dataIndex: 'sfhth'
           },
		   {
            title: '协议类型',
            align:"center",
            dataIndex: 'zflx'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'kzbz'
           },
		   {
            title: '卡号帐号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx'
           },
		   {
            title: '证件号',
            align:"center",
            dataIndex: 'zjh'
           },
		   {
            title: '金额',
            align:"center",
            dataIndex: 'je'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'djrq'
           },
		   {
            title: '登记柜员',
            align:"center",
            dataIndex: 'gy'
           },
		   {
            title: '标志',
            align:"center",
            dataIndex: 'flag'
           },
		   {
            title: '旧卡号账号',
            align:"center",
            dataIndex: 'newzh'
           },
		   {
            title: '起始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'edate'
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
          list: "/ybkqyxxb/ybkqyxxb/list",
          delete: "/ybkqyxxb/ybkqyxxb/delete",
          deleteBatch: "/ybkqyxxb/ybkqyxxb/deleteBatch",
          exportXlsUrl: "ybkqyxxb/ybkqyxxb/exportXls",
          importExcelUrl: "ybkqyxxb/ybkqyxxb/importExcel",
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