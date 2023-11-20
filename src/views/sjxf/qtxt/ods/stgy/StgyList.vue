<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="新机构号">
              <!--<a-input placeholder="请输入新机构号" v-model="queryParam.newBrNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.newBrNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="旧机构号">
           <!--   <a-input placeholder="请输入旧机构号" v-model="queryParam.oldBrNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.oldBrNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="新柜员号">
              <a-input placeholder="请输入新柜员号" v-model="queryParam.newTlNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="旧员工号">
              <a-input placeholder="请输入旧员工号" v-model="queryParam.oldTlNo1"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证号码">
              <a-input placeholder="请输入身份证号码" v-model="queryParam.identNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <a-input placeholder="请输入机构号" v-model="queryParam.organId"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('实体柜员')">导出</a-button>

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
    <stgy-modal ref="modalForm" @ok="modalFormOk"></stgy-modal>
  </a-card>
</template>

<script>
  import StgyModal from './modules/StgyModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "StgyList",
    mixins:[JeecgListMixin],
    components: {
      StgyModal,JTreeSelect
    },
    data () {
      return {
        description: '实体柜员管理页面',
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
            title: '新机构号',
            align:"center",
            dataIndex: 'newBrNo_dictText'
           },
		   {
            title: '旧机构号',
            align:"center",
            dataIndex: 'oldBrNo_dictText'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'brName'
           },
		   {
            title: '姓名',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '新柜员号(员工号)',
            align:"center",
            dataIndex: 'newTlNo'
           },
		   {
            title: '旧柜员号',
            align:"center",
            dataIndex: 'oldTlNo'
           },
		   {
            title: '身份证号码',
            align:"center",
            dataIndex: 'identNo'
           },
		   {
            title: '新系统柜员等级',
            align:"center",
            dataIndex: 'theLevel'
           },
		   {
            title: '新系统岗位名称',
            align:"center",
            dataIndex: 'gwName'
           },
		   {
            title: '新员工号',
            align:"center",
            dataIndex: 'newTlNo1'
           },
		   {
            title: '旧员工号',
            align:"center",
            dataIndex: 'oldTlNo1'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'organId'
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
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/stgy/stgy/list",
          delete: "/stgy/stgy/delete",
          deleteBatch: "/stgy/stgy/deleteBatch",
          exportXlsUrl: "stgy/stgy/exportXls",
          importExcelUrl: "stgy/stgy/importExcel",
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