<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标名称">
              <a-input placeholder="请输入指标名称" v-model="queryParam.zbmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否启用">
              <j-dict-select-tag placeholder="请选择是否启用" v-model="queryParam.sfqy" dict-code="sfbz"/>
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
        <a-button @click="handleAdd" type="primary" icon="plus" v-has="'YxzfgzszNh:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('农户有效走访规则设置')" v-has="'YxzfgzszNh:exp'">导出</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'YxzfgzszNh:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown v-has="'YxzfgzszNh:del'">
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.zbid)">
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
    <yxzfgzsz-modal ref="modalForm" @ok="modalFormOk"></yxzfgzsz-modal>
  </a-card>
</template>

<script>
  import YxzfgzszModal from './YxzfgzszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YxzfgzszList",
    mixins:[JeecgListMixin],
    components: {
      YxzfgzszModal
    },
    data () {
      return {
        description: '农户有效走访规则设置管理页面',
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
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid'
           },
		   {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbmc'
           },
		   {
            title: '是否启用',
            align:"center",
            dataIndex: 'sfqy_dictText'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/jcsjgl/nhyxzfgzsz/list",
          delete: "/jcsjgl/nhyxzfgzsz/delete",
          deleteBatch: "/jcsjgl/nhyxzfgzsz/deleteBatch",
          exportXlsUrl: "jcsjgl/nhyxzfgzsz/exportXls",
          importExcelUrl: "jcsjgl/nhyxzfgzsz/importExcel",
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