<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务种类">
              <a-input placeholder="请输入业务种类" v-model="queryParam.ywzl"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="学校编码">
              <a-input placeholder="请输入学校编码" v-model="queryParam.xxbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="学校名称">
              <a-input placeholder="请输入学校名称" v-model="queryParam.xxmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款单位帐号">
              <a-input placeholder="请输入收款单位帐号" v-model="queryParam.skdwzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收款单位帐号名称">
              <a-input placeholder="请输入收款单位帐号名称" v-model="queryParam.skdwzhmc"></a-input>
            </a-form-item>
          </a-col>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('代收学费学校信息表')">导出</a-button>

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
    <dsxfxxxxb-modal ref="modalForm" @ok="modalFormOk"></dsxfxxxxb-modal>
  </a-card>
</template>

<script>
  import DsxfxxxxbModal from './modules/DsxfxxxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "DsxfxxxxbList",
    mixins:[JeecgListMixin],
    components: {
      DsxfxxxxbModal,JTreeSelect
    },
    data () {
      return {
        description: '代收学费学校信息表管理页面',
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
            title: '业务种类',
            align:"center",
            dataIndex: 'ywzl'
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
            title: '收款单位帐号',
            align:"center",
            dataIndex: 'skdwzh'
           },
		   {
            title: '收款单位帐号名称',
            align:"center",
            dataIndex: 'skdwzhmc'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'jgm_dictText'
           },
		   {
            title: '开通标志',
            align:"center",
            dataIndex: 'flag'
           },
		   {
            title: '查询标志',
            align:"center",
            dataIndex: 'cxflag'
           },
		   {
            title: '旧收款单位帐号',
            align:"center",
            dataIndex: 'jskdwzh'
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
          list: "/dsxfxxxxb/dsxfxxxxb/list",
          delete: "/dsxfxxxxb/dsxfxxxxb/delete",
          deleteBatch: "/dsxfxxxxb/dsxfxxxxb/deleteBatch",
          exportXlsUrl: "dsxfxxxxb/dsxfxxxxb/exportXls",
          importExcelUrl: "dsxfxxxxb/dsxfxxxxb/importExcel",
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