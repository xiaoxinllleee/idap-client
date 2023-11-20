<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工姓名">
              <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"></j-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="家属姓名">
                <a-input placeholder="请输入家属姓名" v-model="queryParam.jsxm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="家属证件号码">
                <a-input placeholder="请输入家属证件号码" v-model="queryParam.jszjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="家属关系">
                <j-dict-select-tag v-model="queryParam.jsgx" placeholder="请选择家属关系" dictCode="ygjsgx"/>
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
      <a-button icon="download" @click="handleExportXls('员工家属信息管理')">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'ygxxgl:import'">导入</a-button>
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
        <span slot="detail" slot-scope="ygxm, record">
          <a @click="handleView(record)">{{ygxm}}</a>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />

          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <erpBasYgjsxxb-modal ref="modalForm" @ok="modalFormOk"></erpBasYgjsxxb-modal>
  </a-card>
</template>

<script>
  import ErpBasYgjsxxbModal from './modules/ErpBasYgjsxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "ErpBasYgjsxxbList",
    mixins:[JeecgListMixin],
    components: {
      ErpBasYgjsxxbModal, ExcelImport, JInput
    },
    data () {
      return {
        description: '员工家属信息管理管理页面',
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
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
		   {
            title: '员工姓名',
            align:"center",
            dataIndex: 'ygxm',
            scopedSlots: { customRender: 'detail' },
           },
          {
            title: '家属姓名',
            align:"center",
            dataIndex: 'jsxm'
          },
          {
            title: '家属证件号码',
            align:"center",
            dataIndex: 'jszjhm'
          },
		   {
            title: '家属关系',
            align:"center",
            dataIndex: 'jsgx'
           },
		   {
            title: '家属联系方式',
            align:"center",
            dataIndex: 'jslxfs'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/ygjsxxgl/erpBasYgjsxxb/list",
          delete: "/ygjsxxgl/erpBasYgjsxxb/delete",
          deleteBatch: "/ygjsxxgl/erpBasYgjsxxb/deleteBatch",
          exportXlsUrl: "ygjsxxgl/erpBasYgjsxxb/exportXls",
          importExcelUrl: "ygjsxxgl/erpBasYgjsxxb/importExcel",
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