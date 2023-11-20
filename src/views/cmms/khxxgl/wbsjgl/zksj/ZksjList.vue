<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证">
              <j-input placeholder="请输入身份证" v-model="queryParam.zjhm"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <j-input placeholder="请输入姓名" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系电话">
              <a-input placeholder="请输入联系电话" v-model="queryParam.lxdh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行名称">
              <j-input placeholder="请输入银行名称" v-model="queryParam.yhmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行卡号">
              <j-input placeholder="请输入银行卡号" v-model="queryParam.yhkh"></j-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Zksj:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('制卡数据')" v-has="'Zksj:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Zksj:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'Zksj:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'Zksj:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zksj-modal ref="modalForm" @ok="modalFormOk"></zksj-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import ZksjModal from './modules/ZksjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "ZksjList",
    mixins:[JeecgListMixin],
    components: {
      ZksjModal, ExcelImport, JInput
    },
    data () {
      return {
        description: '制卡数据管理页面',
        exportTemplateName : '制卡数据导入模板',
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
            title: '身份证',
            align:"center",
            dataIndex: 'zjhm'
          },
		   {
            title: '姓名',
            align:"center",
            width:70,
            dataIndex: 'khmc'
           },

		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh'
           },
		   {
            title: '联系地址',
            align:"center",
            dataIndex: 'lxdz'
           },
		   {
            title: '单位',
            align:"center",
            dataIndex: 'dw'
           },
		   {
            title: '网点名称',
            align:"center",
            dataIndex: 'wdmc'
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
            title: '卡状态',
            align:"center",
            dataIndex: 'kzt'
           },
		   {
            title: '医保用卡记录',
            align:"center",
            dataIndex: 'ybykjl'
           },
		   {
            title: '前期排查的疑似风险卡',
            align:"center",
            dataIndex: 'ysfxk'
           },
          {
            title: '登记序号',
            align:"center",
            dataIndex: 'djxh'
          },
          {
            title: '社保号',
            align:"center",
            dataIndex: 'sbh'
          },
          {
            title: '计税依据',
            align:"center",
            dataIndex: 'jsyj'
          },
          {
            title: '实缴金额',
            align:"center",
            dataIndex: 'sjje'
          },
          {
            title: '应征发生日期',
            align:"center",
            dataIndex: 'yzfsrq'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/wbsjgl/zksj/list",
          delete: "/wbsjgl/zksj/delete",
          deleteBatch: "/wbsjgl/zksj/deleteBatch",
          exportXlsUrl: "wbsjgl/zksj/exportXls",
          importExcelUrl: "wbsjgl/zksj/importExcel",
          exportTemplateUrl: "wbsjgl/zksj/exportTemplateXls",
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