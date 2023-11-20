<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
              <a-input placeholder="请输入机构码" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="系统码">
              <a-input placeholder="请输入系统码" v-model="queryParam.system"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="外部交易后两位">
              <a-input placeholder="请输入外部交易后两位" v-model="queryParam.origTran"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('桶子交易码表')">导出</a-button>
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
    <tzjymb-modal ref="modalForm" @ok="modalFormOk"></tzjymb-modal>
  </a-card>
</template>

<script>
  import TzjymbModal from './modules/TzjymbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "TzjymbList",
    mixins:[JeecgListMixin],
    components: {
      TzjymbModal
    },
    data () {
      return {
        description: '桶子交易码表管理页面',
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
            title: '机构码',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '系统码',
            align:"center",
            dataIndex: 'system'
           },
		   {
            title: '外部交易后两位',
            align:"center",
            dataIndex: 'origTran'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode01'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans01'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans01'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value01'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode02'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans02'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans02'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value02'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode03'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans03'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans03'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value03'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode04'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans04'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans04'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value04'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode05'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans05'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans05'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value05'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode06'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans06'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans06'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value06'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode07'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans07'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans07'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value07'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode08'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans08'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans08'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value08'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode09'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans09'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans09'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value09'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode10'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans10'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans10'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value10'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode11'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans11'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans11'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value11'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode12'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans12'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans12'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value12'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode13'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans13'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans13'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value13'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode14'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans14'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans14'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value14'
           },
		   {
            title: '桶子标识',
            align:"center",
            dataIndex: 'prCode15'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'normTrans15'
           },
		   {
            title: '冲正交易码',
            align:"center",
            dataIndex: 'corrTrans15'
           },
		   {
            title: '不用',
            align:"center",
            dataIndex: 'value15'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '导入日期',
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
          list: "/tzjymb/tzjymb/list",
          delete: "/tzjymb/tzjymb/delete",
          deleteBatch: "/tzjymb/tzjymb/deleteBatch",
          exportXlsUrl: "tzjymb/tzjymb/exportXls",
          importExcelUrl: "tzjymb/tzjymb/importExcel",
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