<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开始机构号">
             <!-- <a-input placeholder="请输入开始机构号" v-model="queryParam.beginNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.beginNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="结束机构">
             <!-- <a-input placeholder="请输入结束机构" v-model="queryParam.endNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.endNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人联社标识">
              <a-input placeholder="请输入法人联社标识" v-model="queryParam.upBrNo"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人联社标识">
              <a-input placeholder="请输入法人联社名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构类型">
              <a-input placeholder="请输入机构类型" v-model="queryParam.corpType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构状态">
              <a-input placeholder="请输入机构状态" v-model="queryParam.corpSts"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('法人机构范围信息')">导出</a-button>

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
    <frjgfwxx-modal ref="modalForm" @ok="modalFormOk"></frjgfwxx-modal>
  </a-card>
</template>

<script>
  import FrjgfwxxModal from './modules/FrjgfwxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "FrjgfwxxList",
    mixins:[JeecgListMixin],
    components: {
      FrjgfwxxModal,JTreeSelect
    },
    data () {
      return {
        description: '法人机构范围信息管理页面',
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
            title: '法人联社标识',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '法人联社名称',
            align:"center",
            dataIndex: 'name'
           },
		   {
            title: '开始机构号',
            align:"center",
            dataIndex: 'beginNo_dictText'
           },
		   {
            title: '结束机构号',
            align:"center",
            dataIndex: 'endNo_dictText'
           },
		   {
            title: '机构类型',
            align:"center",
            dataIndex: 'corpType'
           },
		   {
            title: '机构状态',
            align:"center",
            dataIndex: 'corpSts'
           },
		   {
            title: '维护日期',
            align:"center",
            dataIndex: 'weihuDate'
           },
		 /*  {
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
          list: "/frjgfwxx/frjgfwxx/list",
          delete: "/frjgfwxx/frjgfwxx/delete",
          deleteBatch: "/frjgfwxx/frjgfwxx/deleteBatch",
          exportXlsUrl: "frjgfwxx/frjgfwxx/exportXls",
          importExcelUrl: "frjgfwxx/frjgfwxx/importExcel",
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