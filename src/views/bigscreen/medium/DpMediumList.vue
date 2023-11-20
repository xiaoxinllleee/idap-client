<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="媒体分类">
              <a-input placeholder="请输入媒体分类" v-model="queryParam.type"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="排序">
              <a-input placeholder="请输入排序" v-model="queryParam.ph"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="文件相对路径">
              <a-input placeholder="请输入文件相对路径" v-model="queryParam.wjxdlj"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('大屏媒体数据')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
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
    <dpMedium-modal ref="modalForm" @ok="modalFormOk"></dpMedium-modal>
  </a-card>
</template>

<script>
  import DpMediumModal from './modules/DpMediumModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DpMediumList",
    mixins:[JeecgListMixin],
    components: {
      DpMediumModal
    },
    data () {
      return {
        description: '大屏媒体数据管理页面',
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
            title: '媒体分类',
            align:"center",
            dataIndex: 'type'
           },
		   {
            title: '排序',
            align:"center",
            dataIndex: 'ph'
           },
		   {
            title: '文件相对路径',
            align:"center",
            dataIndex: 'wjxdlj'
           },
		   {
            title: '文件绝对路径',
            align:"center",
            dataIndex: 'wjjdlj'
           },
		   {
            title: '文件名称',
            align:"center",
            dataIndex: 'fileName'
           },
		   {
            title: '人员的个人简介名称',
            align:"center",
            dataIndex: 'username'
           },
		   {
            title: '人员的简介',
            align:"center",
            dataIndex: 'jj'
           },
		   {
            title: '轮播图片采集人',
            align:"center",
            dataIndex: 'cjr'
           },
		   {
            title: '轮播图片采集时间',
            align:"center",
            dataIndex: 'cjsj'
           },
		   {
            title: '是否审批',
            align:"center",
            dataIndex: 'sfsp'
           },
		   {
            title: '审批人',
            align:"center",
            dataIndex: 'spr'
           },
		   {
            title: '审批时间',
            align:"center",
            dataIndex: 'spsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/bigscreen/dpMedium/list",
          delete: "/bigscreen/dpMedium/delete",
          deleteBatch: "/bigscreen/dpMedium/deleteBatch",
          exportXlsUrl: "bigscreen/dpMedium/exportXls",
          importExcelUrl: "bigscreen/dpMedium/importExcel",
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