<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="日期">
              <a-input placeholder="请输入日期" v-model="queryParam.statDate"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评价对象ID">
              <a-input placeholder="请输入评价对象ID" v-model="queryParam.evlObjId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="基础指标编号">
              <a-input placeholder="请输入基础指标编号" v-model="queryParam.indexId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标值">
              <a-input placeholder="请输入指标值" v-model="queryParam.indexValue"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="余额类型">
              <a-input placeholder="请输入余额类型" v-model="queryParam.balTypeId"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('基础指标结果')">导出</a-button>
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
    <pmaFBaseIndexRes-modal ref="modalForm" @ok="modalFormOk"></pmaFBaseIndexRes-modal>
  </a-card>
</template>

<script>
  import PmaFBaseIndexResModal from './modules/PmaFBaseIndexResModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "PmaFBaseIndexResList",
    mixins:[JeecgListMixin],
    components: {
      PmaFBaseIndexResModal
    },
    data () {
      return {
        description: '基础指标结果管理页面',
        // 表头
        columns: [
          /*{
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
            title: '日期',
            align:"center",
            dataIndex: 'statDate'
           },
		   {
            title: '评价对象ID',
            align:"center",
            dataIndex: 'evlObjId'
           },
          {
            title: '评价对象',
            align:"center",
            dataIndex: 'evlObjId_dictText'
          },
		   {
            title: '基础指标编号',
            align:"center",
            dataIndex: 'indexId'
           },
          {
            title: '基础指标名称',
            align:"center",
            dataIndex: 'indexId_dictText'
          },
		   {
            title: '指标值',
            align:"center",
            dataIndex: 'indexValue'
           },
		   /*{
            title: '余额类型',
            align:"center",
            dataIndex: 'balTypeId'
           },
		   {
            title: '评价对象类型',
            align:"center",
            dataIndex: 'evlObjType'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curTypeId'
           },
		   {
            title: '应用类型',
            align:"center",
            dataIndex: 'applyTypeId'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/jczbjg/pmaFBaseIndexRes/list",
          delete: "/jczbjg/pmaFBaseIndexRes/delete",
          deleteBatch: "/jczbjg/pmaFBaseIndexRes/deleteBatch",
          exportXlsUrl: "jczbjg/pmaFBaseIndexRes/exportXls",
          importExcelUrl: "jczbjg/pmaFBaseIndexRes/importExcel",
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
  @import '~@assets/less/common.less';
</style>