<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="sjywjgdm">
              <a-input placeholder="请输入sjywjgdm" v-model="queryParam.sjywjgdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="custid">
              <a-input placeholder="请输入custid" v-model="queryParam.custid"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="tjyf">
              <a-input placeholder="请输入tjyf" v-model="queryParam.tjyf"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="beginday">
              <a-input placeholder="请输入beginday" v-model="queryParam.beginday"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="endday">
              <a-input placeholder="请输入endday" v-model="queryParam.endday"></a-input>
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
      <a-button icon="download" @click="handleExportXls('客户经理贷款发放收回统计')">导出</a-button>
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
    <khjLkhdkffshqkVo-modal ref="modalForm" @ok="modalFormOk"></khjLkhdkffshqkVo-modal>
  </a-card>
</template>

<script>
  import KhjLkhdkffshqkVoModal from './modules/KhjLkhdkffshqkVoModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import store from '@/store/'

  export default {
    name: "KhjLkhdkffshqkVoList",
    mixins:[JeecgListMixin],
    components: {
      KhjLkhdkffshqkVoModal
    },
    data () {
      return {
        description: '客户经理贷款发放收回统计管理页面',
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
            title: 'sjywjgdm',
            align:"center",
            dataIndex: 'sjywjgdm'
           },
		   {
            title: 'custid',
            align:"center",
            dataIndex: 'custid'
           },
		   {
            title: 'tjyf',
            align:"center",
            dataIndex: 'tjyf'
           },
		   {
            title: 'beginday',
            align:"center",
            dataIndex: 'beginday'
           },
		   {
            title: 'endday',
            align:"center",
            dataIndex: 'endday'
           },
		   {
            title: 'dnffysh',
            align:"center",
            dataIndex: 'dnffysh'
           },
		   {
            title: 'dnffwsh',
            align:"center",
            dataIndex: 'dnffwsh'
           },
		   {
            title: 'dnffyish',
            align:"center",
            dataIndex: 'dnffyish'
           },
		   {
            title: 'dnffdqshl',
            align:"center",
            dataIndex: 'dnffdqshl'
           },
		   {
            title: 'yqnffysh',
            align:"center",
            dataIndex: 'yqnffysh'
           },
		   {
            title: 'yqnffwsh',
            align:"center",
            dataIndex: 'yqnffwsh'
           },
		   {
            title: 'yqnffyish',
            align:"center",
            dataIndex: 'yqnffyish'
           },
		   {
            title: 'yqnffdqshl',
            align:"center",
            dataIndex: 'yqnffdqshl'
           },
		   {
            title: 'lrsj',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: 'lrbz',
            align:"center",
            dataIndex: 'lrbz'
           },
		   {
            title: 'lrczy',
            align:"center",
            dataIndex: 'lrczy'
           },
		   {
            title: 'ffysh',
            align:"center",
            dataIndex: 'ffysh'
           },
		   {
            title: 'ffwsh',
            align:"center",
            dataIndex: 'ffwsh'
           },
		   {
            title: 'ffyish',
            align:"center",
            dataIndex: 'ffyish'
           },
		   {
            title: 'ffdqshl',
            align:"center",
            dataIndex: 'ffdqshl'
           },
		   {
            title: 'jgdm',
            align:"center",
            dataIndex: 'jgdm'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khjldkffhstj/khjLkhdkffshqkVo/list",
          delete: "/khjldkffhstj/khjLkhdkffshqkVo/delete",
          deleteBatch: "/khjldkffhstj/khjLkhdkffshqkVo/deleteBatch",
          exportXlsUrl: "khjldkffhstj/khjLkhdkffshqkVo/exportXls",
          importExcelUrl: "khjldkffhstj/khjLkhdkffshqkVo/importExcel",
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