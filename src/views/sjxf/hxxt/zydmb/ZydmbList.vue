<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主代码">
              <a-input placeholder="请输入主代码" v-model="queryParam.promoNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('摘要代码表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
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
    <zydmb-modal ref="modalForm" @ok="modalFormOk"></zydmb-modal>
  </a-card>
</template>

<script>
  import ZydmbModal from './modules/ZydmbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZydmbList",
    mixins:[JeecgListMixin],
    components: {
      ZydmbModal
    },
    data () {
      return {
        description: '摘要代码表管理页面',
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
            dataIndex: 'instNo'
           },
		   {
            title: '语言代码',
            align:"center",
            dataIndex: 'languageCode'
           },
		   {
            title: '主代码',
            align:"center",
            dataIndex: 'promoNo'
           },
		   {
            title: '助记',
            align:"center",
            dataIndex: 'mnemonic'
           },
		   {
            title: '描述',
            align:"center",
            dataIndex: 'description'
           },
		   {
            title: '对账单备注',
            align:"center",
            dataIndex: 'statement'
           },
		   {
            title: '社会保险号标志',
            align:"center",
            dataIndex: 'socialSecInd'
           },
		   {
            title: '免收费标志',
            align:"center",
            dataIndex: 'exemptInd'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '总账代码覆盖指示',
            align:"center",
            dataIndex: 'glcOvrdInd'
           },
		   {
            title: '填充',
            align:"center",
            dataIndex: 'fil01'
           },
		   {
            title: '费用类型',
            align:"center",
            dataIndex: 'feeMask'
           },
		   {
            title: '长记符',
            align:"center",
            dataIndex: 'longMnemonic'
           },
		   {
            title: '费用金额',
            align:"center",
            dataIndex: 'feeAmount'
           },
		   {
            title: '开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
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
          list: "/zydmb/zydmb/list",
          delete: "/zydmb/zydmb/delete",
          deleteBatch: "/zydmb/zydmb/deleteBatch",
          exportXlsUrl: "zydmb/zydmb/exportXls",
          importExcelUrl: "zydmb/zydmb/importExcel",
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