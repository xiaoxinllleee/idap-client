<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.jym"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
              <a-input placeholder="请输入机构码" v-model="queryParam.jgm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目编号">
              <a-input placeholder="请输入项目编号" v-model="queryParam.xmbh"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜员号">
              <a-input placeholder="请输入柜员号" v-model="queryParam.gyh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.khbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户账号">
              <a-input placeholder="请输入客户账号" v-model="queryParam.khzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支付单位代码">
              <a-input placeholder="请输入支付单位代码" v-model="queryParam.idno"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('烟草业务交易流水表')">导出</a-button>

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
    <ycywjylsb-modal ref="modalForm" @ok="modalFormOk"></ycywjylsb-modal>
  </a-card>
</template>

<script>
  import YcywjylsbModal from './modules/YcywjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YcywjylsbList",
    mixins:[JeecgListMixin],
    components: {
      YcywjylsbModal
    },
    data () {
      return {
        description: '烟草业务交易流水表管理页面',
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
            title: '查询日期',
            align:"center",
            dataIndex: 'cxrq'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'jym'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'jgm'
           },
		   {
            title: '项目编号',
            align:"center",
            dataIndex: 'xmbh'
           },
		   {
            title: '柜员号',
            align:"center",
            dataIndex: 'gyh'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'sqgy'
           },
		   {
            title: '废弃字段1',
            align:"center",
            dataIndex: 'czgy'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'khbh'
           },
		   {
            title: '客户账号',
            align:"center",
            dataIndex: 'khzh'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '账号密码',
            align:"center",
            dataIndex: 'zhmm'
           },
		   {
            title: '废弃字段2',
            align:"center",
            dataIndex: 'khzj'
           },
		   {
            title: '废弃字段3',
            align:"center",
            dataIndex: 'khpz'
           },
		   {
            title: '废弃字段4',
            align:"center",
            dataIndex: 'xzbz'
           },
		   {
            title: '支付单位代码',
            align:"center",
            dataIndex: 'idno'
           },
		   {
            title: '接收流水号',
            align:"center",
            dataIndex: 'jslsh'
           },
		   {
            title: '发送流水号流水号',
            align:"center",
            dataIndex: 'fslsh'
           },
		   {
            title: '处理日期',
            align:"center",
            dataIndex: 'clrq'
           },
		   {
            title: '查询流水号',
            align:"center",
            dataIndex: 'cxlsh'
           },
		   {
            title: '总笔数',
            align:"center",
            dataIndex: 'zbs'
           },
		   {
            title: '总金额',
            align:"center",
            dataIndex: 'zje'
           },
		   {
            title: '成功笔数',
            align:"center",
            dataIndex: 'cgbs'
           },
		   {
            title: '成功金额',
            align:"center",
            dataIndex: 'cgje'
           },
		   {
            title: '失败笔数',
            align:"center",
            dataIndex: 'sbbs'
           },
		   {
            title: '失败金额',
            align:"center",
            dataIndex: 'sbje'
           },
		   {
            title: '余额',
            align:"center",
            dataIndex: 'ye'
           },
		   {
            title: '明细笔数',
            align:"center",
            dataIndex: 'mxbs'
           },
		   {
            title: '废弃字段5',
            align:"center",
            dataIndex: 'dycs'
           },
		   {
            title: '废弃字段6',
            align:"center",
            dataIndex: 'dzbz'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'zt'
           },
		   {
            title: '返回状态',
            align:"center",
            dataIndex: 'retcode'
           },
		   {
            title: '返回错误码',
            align:"center",
            dataIndex: 'errmsg'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'jyrq'
           },
		   {
            title: '贷方账号',
            align:"center",
            dataIndex: 'dfzh'
           },
		   {
            title: '贷方名称',
            align:"center",
            dataIndex: 'dfmc'
           },
		   {
            title: '核心返回流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '主机日期',
            align:"center",
            dataIndex: 'hostdate'
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
          list: "/ycywjylsb/ycywjylsb/list",
          delete: "/ycywjylsb/ycywjylsb/delete",
          deleteBatch: "/ycywjylsb/ycywjylsb/deleteBatch",
          exportXlsUrl: "ycywjylsb/ycywjylsb/exportXls",
          importExcelUrl: "ycywjylsb/ycywjylsb/importExcel",
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