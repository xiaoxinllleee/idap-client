<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="地址">
              <a-input placeholder="请输入地址" v-model="queryParam.dz"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="电话号码">
              <a-input placeholder="请输入电话号码" v-model="queryParam.dhhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证号码">
              <a-input placeholder="请输入身份证号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Xyksj:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('信用卡数据')" v-has="'Xyksj:exp'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'Xyksj:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'Xyksj:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'Xyksj:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khxxglWbsjglXyksj-modal ref="modalForm" @ok="modalFormOk"></khxxglWbsjglXyksj-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import KhxxglWbsjglXyksjModal from './modules/KhxxglWbsjglXyksjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "XyksjList",
    mixins:[JeecgListMixin],
    components: {
      KhxxglWbsjglXyksjModal,ExcelImport
    },
    data () {
      return {
        description: '信用卡数据管理页面',
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
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz'
           },
		   {
            title: '电话号码',
            align:"center",
            dataIndex: 'dhhm'
           },
		   {
            title: '身份证号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '卡号',
            align:"center",
            dataIndex: 'kh'
           },
		   {
            title: '贷款额度',
            align:"center",
            dataIndex: 'dked'
           },
		   {
            title: '信用卡额度',
            align:"center",
            dataIndex: 'xyked'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '卡状态',
            align:"center",
            dataIndex: 'kzt'
           },
		   {
            title: '逾期期数',
            align:"center",
            dataIndex: 'yqqs'
           },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'zhzt'
           },
		   {
            title: '账单地址',
            align:"center",
            dataIndex: 'zddz'
           },
		   {
            title: '发卡日期',
            align:"center",
            dataIndex: 'fkrq'
           },
		   {
            title: '是否激活',
            align:"center",
            dataIndex: 'sfjh'
           },
		   {
            title: '是否绑定微信',
            align:"center",
            dataIndex: 'sfbdwx'
           },
		   {
            title: '推广人',
            align:"center",
            dataIndex: 'tgr'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/xyksj/khxxglWbsjglXyksj/list",
          delete: "/xyksj/khxxglWbsjglXyksj/delete",
          deleteBatch: "/xyksj/khxxglWbsjglXyksj/deleteBatch",
          exportXlsUrl: "xyksj/khxxglWbsjglXyksj/exportXls",
          importExcelUrl: "xyksj/khxxglWbsjglXyksj/importExcel",
          exportTemplateUrl: "/xyksj/khxxglWbsjglXyksj/exportTemplateXls",
       },
        exportTemplateName: '信用卡数据导入模板'
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