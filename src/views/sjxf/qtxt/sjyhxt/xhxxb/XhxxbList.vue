<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.cstno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.ctfno"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="手机号码">
              <a-input placeholder="请输入手机号码" v-model="queryParam.mobile"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态(0:正常 1:暂停)">
              <a-input placeholder="请输入状态(0:正常 1:暂停)" v-model="queryParam.stt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
             <!-- <a-input placeholder="请输入开户机构" v-model="queryParam.opennode"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.opennode"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户柜员">
              <a-input placeholder="请输入开户柜员" v-model="queryParam.openteller"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="注销柜员">
              <a-input placeholder="请输入注销柜员" v-model="queryParam.clsteller"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('销户信息表')">导出</a-button>
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
    <xhxxb-modal ref="modalForm" @ok="modalFormOk"></xhxxb-modal>
  </a-card>
</template>

<script>
  import XhxxbModal from './modules/XhxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "XhxxbList",
    mixins:[JeecgListMixin],
    components: {
      XhxxbModal,JTreeSelect
    },
    data () {
      return {
        description: '销户信息表管理页面',
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
            title: '客户号',
            align:"center",
            dataIndex: 'cstno'
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'name'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'ctftype'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'ctfno'
           },
		   {
            title: '手机号码',
            align:"center",
            dataIndex: 'mobile'
           },
		   {
            title: '状态(0:正常 1:暂停)',
            align:"center",
            dataIndex: 'stt'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'opennode'
           },
		   {
            title: '开户柜员',
            align:"center",
            dataIndex: 'openteller'
           },
		   {
            title: '开户时间',
            align:"center",
            dataIndex: 'opentime'
           },
		   {
            title: '注销日期',
            align:"center",
            dataIndex: 'clsdate'
           },
		   {
            title: '注销网点',
            align:"center",
            dataIndex: 'clsbrchid'
           },
		   {
            title: '注销柜员',
            align:"center",
            dataIndex: 'clsteller'
           },
		   {
            title: '注销原因',
            align:"center",
            dataIndex: 'clsrsn'
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
          list: "/xhxxb/xhxxb/list",
          delete: "/xhxxb/xhxxb/delete",
          deleteBatch: "/xhxxb/xhxxb/deleteBatch",
          exportXlsUrl: "xhxxb/xhxxb/exportXls",
          importExcelUrl: "xhxxb/xhxxb/importExcel",
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