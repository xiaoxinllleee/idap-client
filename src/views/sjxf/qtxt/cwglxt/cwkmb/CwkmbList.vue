<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目号">
              <a-input placeholder="请输入科目号" v-model="queryParam.accNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目名称">
              <a-input placeholder="请输入科目名称" v-model="queryParam.accName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目级别">
              <a-input placeholder="请输入科目级别" v-model="queryParam.accLvl"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借贷标志">
              <a-input placeholder="请输入借贷标志" v-model="queryParam.dcInd"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目类型">
              <a-input placeholder="请输入科目类型" v-model="queryParam.accKnd"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('财务科目表')">导出</a-button>
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
        :scroll="{x:4450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <cwkmb-modal ref="modalForm" @ok="modalFormOk"></cwkmb-modal>
  </a-card>
</template>

<script>
  import CwkmbModal from './modules/CwkmbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CwkmbList",
    mixins:[JeecgListMixin],
    components: {
      CwkmbModal
    },
    data () {
      return {
        description: '财务科目表管理页面',
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
            title: '帐套类型',
            align:"center",
            dataIndex: 'accType'
           },
		   {
            title: '科目号',
            align:"center",
            dataIndex: 'accNo'
           },
		   {
            title: '科目控制字',
            align:"center",
            dataIndex: 'accHrt'
           },
		   {
            title: '应用代码',
            align:"center",
            dataIndex: 'appCod'
           },
		   {
            title: '汇总科目控制字',
            align:"center",
            dataIndex: 'upAccHrt'
           },
		   {
            title: '科目名称',
            align:"center",
            dataIndex: 'accName'
           },
		   {
            title: '子科目标志',
            align:"center",
            dataIndex: 'subAccYn'
           },
		   {
            title: '科目级别',
            align:"center",
            dataIndex: 'accLvl'
           },
		   {
            title: '借贷标志',
            align:"center",
            dataIndex: 'dcInd'
           },
		   {
            title: '轧差标志',
            align:"center",
            dataIndex: 'rollInd'
           },
		   {
            title: '科目类型',
            align:"center",
            dataIndex: 'accKnd'
           },
		   {
            title: '本外币标志',
            align:"center",
            dataIndex: 'foreInd'
           },
		   {
            title: '平衡标志',
            align:"center",
            dataIndex: 'equaInd'
           },
		   {
            title: '发生额方向',
            align:"center",
            dataIndex: 'amtDcInd'
           },
		   {
            title: '透支标志',
            align:"center",
            dataIndex: 'odInd'
           },
		   {
            title: '内部科目标志',
            align:"center",
            dataIndex: 'inInd'
           },
		   {
            title: '是否允许撤销',
            align:"center",
            dataIndex: 'scope'
           },
		   {
            title: '资产负债类型',
            align:"center",
            dataIndex: 'accInd'
           },
		   {
            title: '使用系统',
            align:"center",
            dataIndex: 'uSys'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'brf'
           },
		   {
            title: '预算属性',
            align:"center",
            dataIndex: 'ysInd'
           },
		   {
            title: '科目种类',
            align:"center",
            dataIndex: 'kmInd'
           },
		   {
            title: '传票打印属性',
            align:"center",
            dataIndex: 'printFlag'
           },
		   {
            title: '种类编号',
            align:"center",
            dataIndex: 'classCode'
           },
		   {
            title: '对应种类帐套代码',
            align:"center",
            dataIndex: 'iteAccCode'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'regDate'
           },
		   {
            title: '科目状态',
            align:"center",
            dataIndex: 'itemSts'
           },
		   {
            title: '帐种类型',
            align:"center",
            dataIndex: 'acntKind'
           },
		   {
            title: '汇总机构扎差标志',
            align:"center",
            dataIndex: 'brRollInd'
           },
		   {
            title: '内部科目名称',
            align:"center",
            dataIndex: 'innerAccName'
           },
		   {
            title: 'S_DATE',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: 'E_DATE',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/cwkmb/cwkmb/list",
          delete: "/cwkmb/cwkmb/delete",
          deleteBatch: "/cwkmb/cwkmb/deleteBatch",
          exportXlsUrl: "cwkmb/cwkmb/exportXls",
          importExcelUrl: "cwkmb/cwkmb/importExcel",
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