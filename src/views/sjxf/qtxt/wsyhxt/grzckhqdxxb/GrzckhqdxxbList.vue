<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户柜员号">
              <a-input placeholder="请输入开户柜员号" v-model="queryParam.openteller"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理编号">
              <a-input placeholder="请输入客户经理编号" v-model="queryParam.manamcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户网点机构号">
              <a-input placeholder="请输入开户网点机构号" v-model="queryParam.opennode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户时间">
              <a-input placeholder="请输入开户时间" v-model="queryParam.opentime"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="起始日期">
              <a-input placeholder="请输入起始日期" v-model="queryParam.sDate"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="结束日期">
              <a-input placeholder="请输入结束日期" v-model="queryParam.eDate"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人编号">
              <a-input placeholder="请输入法人编号" v-model="queryParam.legalNo"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人注册客户渠道信息表')">导出</a-button>

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
    <grzckhqdxxb-modal ref="modalForm" @ok="modalFormOk"></grzckhqdxxb-modal>
  </a-card>
</template>

<script>
  import GrzckhqdxxbModal from './modules/GrzckhqdxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GrzckhqdxxbList",
    mixins:[JeecgListMixin],
    components: {
      GrzckhqdxxbModal
    },
    data () {
      return {
        description: '个人注册客户渠道信息表管理页面',
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
            title: '网银客户号',
            align:"center",
            dataIndex: 'cstno'
           },
		   {
            title: '类型(0网银，1手机银行)',
            align:"center",
            dataIndex: 'channelid'
           },
		   {
            title: '开户柜员号',
            align:"center",
            dataIndex: 'openteller'
           },
		   {
            title: '开户网点机构号',
            align:"center",
            dataIndex: 'opennode'
           },
		   {
            title: '开户时间',
            align:"center",
            dataIndex: 'opentime'
           },
		   {
            title: '客户经理编号',
            align:"center",
            dataIndex: 'manamcode'
           },
		   {
            title: '客户经理姓名',
            align:"center",
            dataIndex: 'manamname'
           },
		   {
            title: '最后更新柜员',
            align:"center",
            dataIndex: 'modifyteller'
           },
		   {
            title: '最后更新时间',
            align:"center",
            dataIndex: 'modifytime'
           },
		   {
            title: '冻结或注销原因',
            align:"center",
            dataIndex: 'reason'
           },
		   {
            title: '开户授权柜员号',
            align:"center",
            dataIndex: 'openauthteller'
           },
		   {
            title: '销户柜员号',
            align:"center",
            dataIndex: 'cancelteller'
           },
		   {
            title: '销户授权柜员号',
            align:"center",
            dataIndex: 'cancelauthteller'
           },
		   {
            title: '销户网点机构号',
            align:"center",
            dataIndex: 'cancelnode'
           },
		   {
            title: '销户时间',
            align:"center",
            dataIndex: 'canceltime'
           },
		   {
            title: '认证方式',
            align:"center",
            dataIndex: 'security'
           },
		   {
            title: '索引',
            align:"center",
            dataIndex: 'equipno'
           },
		   {
            title: '渠道状态',
            align:"center",
            dataIndex: 'stt'
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
            title: '导入日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人编号',
            align:"center",
            dataIndex: 'legalNo'
           },
		  /* {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/grzckhqdxxb/grzckhqdxxb/list",
          delete: "/grzckhqdxxb/grzckhqdxxb/delete",
          deleteBatch: "/grzckhqdxxb/grzckhqdxxb/deleteBatch",
          exportXlsUrl: "grzckhqdxxb/grzckhqdxxb/exportXls",
          importExcelUrl: "grzckhqdxxb/grzckhqdxxb/importExcel",
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