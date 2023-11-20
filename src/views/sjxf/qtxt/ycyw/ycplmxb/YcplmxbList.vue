<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
              <!--<a-input placeholder="请输入机构码" v-model="queryParam.jgm"></a-input>-->
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
            <a-form-item label="存款单位代码">
              <a-input placeholder="请输入存款单位代码" v-model="queryParam.mxbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款账号">
              <a-input placeholder="请输入收款账号" v-model="queryParam.mxzh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款名称">
              <a-input placeholder="请输入收款名称" v-model="queryParam.mxmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.mxzt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="批次号">
              <a-input placeholder="请输入批次号" v-model="queryParam.batchId"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('烟草批量明细表')">导出</a-button>

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
    <ycplmxb-modal ref="modalForm" @ok="modalFormOk"></ycplmxb-modal>
  </a-card>
</template>

<script>
  import YcplmxbModal from './modules/YcplmxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  export default {
    name: "YcplmxbList",
    mixins:[JeecgListMixin],
    components: {
      YcplmxbModal,JTreeSelect
    },
    data () {
      return {
        description: '烟草批量明细表管理页面',
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
            title: '交易日期',
            align:"center",
            dataIndex: 'jyrq'
           },
		   {
            title: '处理日期',
            align:"center",
            dataIndex: 'clrq'
           },
		   {
            title: '接收流水号',
            align:"center",
            dataIndex: 'jslsh'
           },
		   {
            title: '明细流水号',
            align:"center",
            dataIndex: 'mxxh'
           },
		   {
            title: '存款单位代码',
            align:"center",
            dataIndex: 'mxbh'
           },
		   {
            title: '收款账号',
            align:"center",
            dataIndex: 'mxzh'
           },
		   {
            title: '收款名称',
            align:"center",
            dataIndex: 'mxmc'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'mxje'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'mxzt'
           },
		   {
            title: '废弃字段1',
            align:"center",
            dataIndex: 'xydm'
           },
		   {
            title: '废弃字段2',
            align:"center",
            dataIndex: 'xyxx'
           },
		   {
            title: '批次序号',
            align:"center",
            dataIndex: 'serialNum'
           },
		   {
            title: '批次号',
            align:"center",
            dataIndex: 'batchId'
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
          list: "/ycplmxb/ycplmxb/list",
          delete: "/ycplmxb/ycplmxb/delete",
          deleteBatch: "/ycplmxb/ycplmxb/deleteBatch",
          exportXlsUrl: "ycplmxb/ycplmxb/exportXls",
          importExcelUrl: "ycplmxb/ycplmxb/importExcel",
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