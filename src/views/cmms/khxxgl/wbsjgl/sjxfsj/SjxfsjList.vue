<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <j-input placeholder="请输入姓名" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证">
              <j-input placeholder="请输入身份证" v-model="queryParam.zjhm"></j-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行名称">
              <a-input placeholder="请输入银行名称" v-model="queryParam.yhmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行卡号">
              <a-input placeholder="请输入银行卡号" v-model="queryParam.yhkh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡类别">
              <a-input placeholder="请输入卡类别" v-model="queryParam.klb"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Sjxfsj:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('市局下发数据')" v-has="'Sjxfsj:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Sjxfsj:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'Sjxfsj:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'Sjxfsj:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sjxfsj-modal ref="modalForm" @ok="modalFormOk"></sjxfsj-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import SjxfsjModal from './modules/SjxfsjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "SjxfsjList",
    mixins:[JeecgListMixin],
    components: {
      SjxfsjModal, ExcelImport, JInput
    },
    data () {
      return {
        description: '市局下发数据管理页面',
        exportTemplateName : '市局下发数据导入模板',
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
            title: '姓名',
            align:"center",
            width:70,
            dataIndex: 'khmc'
           },
		   {
            title: '身份证',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '银行名称',
            align:"center",
            dataIndex: 'yhmc'
           },
		   {
            title: '银行卡号',
            align:"center",
            dataIndex: 'yhkh'
           },
		   {
            title: '卡类别',
            align:"center",
            dataIndex: 'klb'
           },
		   {
            title: '是否本人持卡',
            align:"center",
            dataIndex: 'sfbrck'
           },
		   {
            title: '本人或亲属的签名',
            align:"center",
            dataIndex: 'brhqsqm'
           },
		   {
            title: '本人或亲属的联系方式',
            align:"center",
            dataIndex: 'brhqslxfs'
           },
		   {
            title: '是否发放过待遇',
            align:"center",
            dataIndex: 'sfffgdy'
           },
		   {
            title: '是否服刑人员',
            align:"center",
            dataIndex: 'sffxry'
           },
		   {
            title: '服刑开始时间',
            align:"center",
            dataIndex: 'fxkssj'
           },
		   {
            title: '服刑结束时间',
            align:"center",
            dataIndex: 'fxjssj'
           },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
            width: 80
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/wbsjgl/sjxfsj/list",
          delete: "/wbsjgl/sjxfsj/delete",
          deleteBatch: "/wbsjgl/sjxfsj/deleteBatch",
          exportXlsUrl: "wbsjgl/sjxfsj/exportXls",
          importExcelUrl: "wbsjgl/sjxfsj/importExcel",
          exportTemplateUrl: "wbsjgl/sjxfsj/exportTemplateXls",
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