<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标id">
              <a-input placeholder="请输入指标id" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标名称">
              <a-input placeholder="请输入指标名称" v-model="queryParam.zbmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标维度">
              <j-dict-select-tag placeholder="请选择指标维度" v-model="queryParam.zbwd"   dict-code="zbwd"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标类型">
              <j-dict-select-tag placeholder="请选择指标类型:" v-model="queryParam.zblx" dict-code="zblx" ></j-dict-select-tag>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('区域指标数据项管理')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
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
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <qyzbsjxgl-modal ref="modalForm" @ok="modalFormOk"></qyzbsjxgl-modal>
  </a-card>
</template>

<script>
  import QyzbsjxglModal from './modules/QyzbsjxglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QyzbsjxglList",
    mixins:[JeecgListMixin],
    components: {
      QyzbsjxglModal
    },
    data () {
      return {
        description: '区域指标数据项管理管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '指标id',
            align:"center",
            dataIndex: 'zbid'
           },
		   {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbmc'
           },
		   {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
           },
		   {
            title: '指标类型',
            align:"center",
            dataIndex: 'zblx_dictText'
           },
		   {
            title: '计算sql',
            align:"center",
            dataIndex: 'jssql'
           },
          {
            title: '关联表名',
            align:"center",
            dataIndex: 'glbm'
          },
		   {
            title: '数据来源',
            align:"center",
            dataIndex: 'sjly_dictText'
           },
		   {
            title: '执行顺序',
            align:"center",
            dataIndex: 'zxsx'
           },
		   {
            title: '执行批次',
            align:"center",
            dataIndex: 'zxpc'
           },
		   {
            title: '区域代码',
            align:"center",
            dataIndex: 'qydm'
           },
		   {
            title: '是否启用',
            align:"center",
            dataIndex: 'sfqy_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zbgl/qyzbsjxgl/list",
          delete: "/zbgl/qyzbsjxgl/delete",
          deleteBatch: "/zbgl/qyzbsjxgl/deleteBatch",
          exportXlsUrl: "zbgl/qyzbsjxgl/exportXls",
          importExcelUrl: "zbgl/qyzbsjxgl/importExcel",
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