<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="删除标志">
              <a-input placeholder="请输入删除标志" v-model="queryParam.dataFlag"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户中文名称">
              <a-input placeholder="请输入客户中文名称" v-model="queryParam.custCn"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户英文名称">
              <a-input placeholder="请输入客户英文名称" v-model="queryParam.custEn"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <a-input placeholder="请输入客户类型" v-model="queryParam.custType"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户注册信息')">导出</a-button>
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
    <khzcxx-modal ref="modalForm" @ok="modalFormOk"></khzcxx-modal>
  </a-card>
</template>

<script>
  import KhzcxxModal from './modules/KhzcxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "KhzcxxList",
    mixins:[JeecgListMixin],
    components: {
      KhzcxxModal
    },
    data () {
      return {
        description: '客户注册信息管理页面',
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
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '乡',
            align:"center",
            dataIndex: 'xiang'
           },
		   {
            title: '村',
            align:"center",
            dataIndex: 'cun'
           },
		   {
            title: '组',
            align:"center",
            dataIndex: 'zu'
           },
		   {
            title: '客户分类',
            align:"center",
            dataIndex: 'custClass'
           },
		   {
            title: '客户中文名称',
            align:"center",
            dataIndex: 'custCn'
           },
		   {
            title: '客户英文名称',
            align:"center",
            dataIndex: 'custEn'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '客户关系',
            align:"center",
            dataIndex: 'custRelation'
           },
		   {
            title: '客户简称',
            align:"center",
            dataIndex: 'custSi'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'custType'
           },
		   {
            title: '即期信用等级',
            align:"center",
            dataIndex: 'immediateEvaluate'
           },
		   {
            title: '黑名单',
            align:"center",
            dataIndex: 'isReport'
           },
		   {
            title: '年度信用等',
            align:"center",
            dataIndex: 'yearEvaluate'
           },
		   {
            title: '客户地区码',
            align:"center",
            dataIndex: 'custAreacode'
           },
		   {
            title: '客户类型1',
            align:"center",
            dataIndex: 'custType1'
           },
		   {
            title: '客户类型2',
            align:"center",
            dataIndex: 'custType2'
           },
		   {
            title: '客户类型3',
            align:"center",
            dataIndex: 'custType3'
           },
		   {
            title: '客户地址',
            align:"center",
            dataIndex: 'custBusadd'
           },
		   {
            title: '客户电话号码',
            align:"center",
            dataIndex: 'custTel'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '客户属性',
            align:"center",
            dataIndex: 'custAttribute'
           },
		   {
            title: 'ecif客户号',
            align:"center",
            dataIndex: 'ecifCustId'
           },
		   {
            title: '核心客户号',
            align:"center",
            dataIndex: 'coreCustId'
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
            title: '加载时间',
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
          list: "/khzcxx/khzcxx/list",
          delete: "/khzcxx/khzcxx/delete",
          deleteBatch: "/khzcxx/khzcxx/deleteBatch",
          exportXlsUrl: "khzcxx/khzcxx/exportXls",
          importExcelUrl: "khzcxx/khzcxx/importExcel",
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