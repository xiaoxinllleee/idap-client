<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <a-input placeholder="请输入所属支行" v-model="queryParam.sszh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="单元名称">
              <a-input placeholder="请输入单元名称" v-model="queryParam.dymc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="单元编号">
              <a-input placeholder="请输入单元编号" v-model="queryParam.dybh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="单元性质">
              <a-input placeholder="请输入单元性质" v-model="queryParam.dyxz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="农户数">
              <a-input placeholder="请输入农户数" v-model="queryParam.nhs"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
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
      <a-button type="primary" icon="download" @click="handleExportXls('1')">导出</a-button>
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
        rowKey="id"
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
    <yjdygl-modal ref="modalForm" @ok="modalFormOk"></yjdygl-modal>
  </a-card>
</template>

<script>
  import YjdyglModal from './YjdyglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YjdyglList",
    mixins:[JeecgListMixin],
    components: {
      YjdyglModal
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
         /* {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },*/
		   {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh'
           },
		   {
            title: '单元名称',
            align:"center",
            dataIndex: 'dymc'
           },
		   {
            title: '单元编号',
            align:"center",
            dataIndex: 'dybh'
           },
		   {
            title: '单元性质',
            align:"center",
            dataIndex: 'dyxz'
           },
		   {
            title: '农户数',
            align:"center",
            dataIndex: 'nhs'
           },
		   {
            title: '农户建档数',
            align:"center",
            dataIndex: 'nhjds'
           },
		   {
            title: '农户建档覆盖率',
            align:"center",
            dataIndex: 'nhjdfgl'
           },
		   {
            title: '商户数',
            align:"center",
            dataIndex: 'shs'
           },
		   {
            title: '商户建档数',
            align:"center",
            dataIndex: 'shjds'
           },
		   {
            title: '商户建档覆盖率',
            align:"center",
            dataIndex: 'shjdfgl'
           },
		   {
            title: '城区居民',
            align:"center",
            dataIndex: 'cqjm'
           },
		   {
            title: '城区居民建档数',
            align:"center",
            dataIndex: 'cqjmjds'
           },
		   {
            title: '城区居民建档覆盖率',
            align:"center",
            dataIndex: 'cqjmjdfgl'
           },
		   {
            title: '企业数',
            align:"center",
            dataIndex: 'qys'
           },
		   {
            title: '企业建档数',
            align:"center",
            dataIndex: 'qyjds'
           },
		   {
            title: '企业建档覆盖率',
            align:"center",
            dataIndex: 'qyjdfgl'
           },
		   {
            title: '机构树',
            align:"center",
            dataIndex: 'jgs'
           },
		   {
            title: '机构建档数',
            align:"center",
            dataIndex: 'jgjds'
           },
		   {
            title: '机构建档覆盖率',
            align:"center",
            dataIndex: 'jgjdfgl'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          // list: "/api/yjdygl/list",
          list: "/api/zg",
          delete: "/yjdygl/yjdygl/delete",
          deleteBatch: "/yjdygl/yjdygl/deleteBatch",
          exportXlsUrl: "yjdygl/yjdygl/exportXls",
          importExcelUrl: "yjdygl/yjdygl/importExcel",
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