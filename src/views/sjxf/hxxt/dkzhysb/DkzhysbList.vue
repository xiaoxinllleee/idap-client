<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
<!--              <a-input placeholder="请输入机构号" v-model="queryParam.brchNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.brchNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.socNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="置换前账号">
              <a-input placeholder="请输入置换前账号" v-model="queryParam.reOldAcctNo"></a-input>
            </a-form-item>
          </a-col>


        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="置换后账号">
              <a-input placeholder="请输入置换后账号" v-model="queryParam.reNewAcctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>

          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款置换映射表')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
           :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:3430}"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkzhysb-modal ref="modalForm" @ok="modalFormOk"></dkzhysb-modal>
  </a-card>
</template>

<script>
  import DkzhysbModal from './modules/DkzhysbModal'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DkzhysbList",
    mixins:[JeecgListMixin],
    components: {
      DkzhysbModal,JTreeSelect
    },
    data () {
      return {
        description: '贷款置换映射表管理页面',
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
            title: '银行号',
            align:"center",
            dataIndex: 'socNo'
           },
		   {
            title: '置换前账号',
            align:"center",
            dataIndex: 'reOldAcctNo'
           },
		   {
            title: '置换后账号',
            align:"center",
            dataIndex: 'reNewAcctNo'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'brchNo'
           },
		   {
            title: '置换产品大类',
            align:"center",
            dataIndex: 'newAcctType'
           },
		   {
            title: '置换产品子类',
            align:"center",
            dataIndex: 'newIntCat'
           },
		   {
            title: '本金置换日期',
            align:"center",
            dataIndex: 'prnReDate'
           },
		   {
            title: '本金置换资金协议号',
            align:"center",
            dataIndex: 'prnReFundNo'
           },
		   {
            title: '利息置换日期',
            align:"center",
            dataIndex: 'intReDate'
           },
		   {
            title: '利息置换资金协议号',
            align:"center",
            dataIndex: 'intReFundNo'
           },
		   {
            title: '本金置换金额',
            align:"center",
            dataIndex: 'prnReAmount'
           },
		   {
            title: '利息置换金额',
            align:"center",
            dataIndex: 'intReAmount'
           },
		   {
            title: '填充字段',
            align:"center",
            dataIndex: 'varArea'
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
		   {
            title: '法人标识',
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
          list: "/dkzhysb/dkzhysb/list",
          delete: "/dkzhysb/dkzhysb/delete",
          deleteBatch: "/dkzhysb/dkzhysb/deleteBatch",
          exportXlsUrl: "dkzhysb/dkzhysb/exportXls",
          importExcelUrl: "dkzhysb/dkzhysb/importExcel",
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