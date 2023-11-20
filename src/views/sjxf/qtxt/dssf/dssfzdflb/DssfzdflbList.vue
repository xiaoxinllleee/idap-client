<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="地市代码">
              <a-input placeholder="请输入地市代码" v-model="queryParam.dsdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="过渡账号">
              <a-input placeholder="请输入过渡账号" v-model="queryParam.flzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="过渡账户名称">
              <a-input placeholder="请输入过渡账户名称" v-model="queryParam.remark1"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主办行机构码">
             <!-- <a-input placeholder="请输入主办行机构码" v-model="queryParam.zbhjgm"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.zbhjgm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员">
              <a-input placeholder="请输入操作柜员" v-model="queryParam.czgy"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('代收水费自动分录表')">导出</a-button>
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
    <dssfzdflb-modal ref="modalForm" @ok="modalFormOk"></dssfzdflb-modal>
  </a-card>
</template>

<script>
  import DssfzdflbModal from './modules/DssfzdflbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "DssfzdflbList",
    mixins:[JeecgListMixin],
    components: {
      DssfzdflbModal,JTreeSelect
    },
    data () {
      return {
        description: '代收水费自动分录表管理页面',
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
            title: '地市代码',
            align:"center",
            dataIndex: 'dsdm'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '过渡账号',
            align:"center",
            dataIndex: 'flzh'
           },
		   {
            title: '主办行机构码',
            align:"center",
            dataIndex: 'zbhjgm_dictText'
           },
		   {
            title: '账户性质',
            align:"center",
            dataIndex: 'zhxz'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'czgy'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'djrq'
           },
		   {
            title: '归集账号',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '过渡账户名称',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '归集账户名称',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '主办行机构名称',
            align:"center",
            dataIndex: 'zbhjgmc'
           },
		   {
            title: '旧过渡账号',
            align:"center",
            dataIndex: 'oldFlzh'
           },
		   {
            title: '旧归集账号',
            align:"center",
            dataIndex: 'oldRemark'
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
          list: "/dssfzdflb/dssfzdflb/list",
          delete: "/dssfzdflb/dssfzdflb/delete",
          deleteBatch: "/dssfzdflb/dssfzdflb/deleteBatch",
          exportXlsUrl: "dssfzdflb/dssfzdflb/exportXls",
          importExcelUrl: "dssfzdflb/dssfzdflb/importExcel",
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