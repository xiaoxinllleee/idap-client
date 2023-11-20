<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="县级行政区划编码">
              <a-input placeholder="请输入县级行政区划编码" v-model="queryParam.xzqbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.status"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="分录账号">
              <a-input placeholder="请输入分录账号" v-model="queryParam.flzh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主办行机构码">
              <!--<a-input placeholder="请输入主办行机构码" v-model="queryParam.zbhjgm"></a-input>-->
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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input placeholder="请输入机构名称" v-model="queryParam.jgmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户名称">
              <a-input placeholder="请输入账户名称" v-model="queryParam.zhmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户性质">
              <a-input placeholder="请输入账户性质" v-model="queryParam.zhxz"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('财政惠农字段分录表')">导出</a-button>
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
    <czhnzdflb-modal ref="modalForm" @ok="modalFormOk"></czhnzdflb-modal>
  </a-card>
</template>

<script>
  import CzhnzdflbModal from './modules/CzhnzdflbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "CzhnzdflbList",
    mixins:[JeecgListMixin],
    components: {
      CzhnzdflbModal,JTreeSelect
    },
    data () {
      return {
        description: '财政惠农字段分录表管理页面',
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
            title: '县级行政区划编码',
            align:"center",
            dataIndex: 'xzqbm'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '分录账号',
            align:"center",
            dataIndex: 'flzh'
           },
		   {
            title: '主办行机构码',
            align:"center",
            dataIndex: 'zbhjgm_dictText'
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
            title: '机构名称',
            align:"center",
            dataIndex: 'jgmc'
           },
		   {
            title: '账户名称',
            align:"center",
            dataIndex: 'zhmc'
           },
		   {
            title: '账户性质',
            align:"center",
            dataIndex: 'zhxz'
           },
		   {
            title: '分录账号标识',
            align:"center",
            dataIndex: 'flzhbz'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '旧分录账号',
            align:"center",
            dataIndex: 'jflzh'
           },
		   {
            title: '旧备注',
            align:"center",
            dataIndex: 'jremark1'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
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
          list: "/czhnzdflb/czhnzdflb/list",
          delete: "/czhnzdflb/czhnzdflb/delete",
          deleteBatch: "/czhnzdflb/czhnzdflb/deleteBatch",
          exportXlsUrl: "czhnzdflb/czhnzdflb/exportXls",
          importExcelUrl: "czhnzdflb/czhnzdflb/importExcel",
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