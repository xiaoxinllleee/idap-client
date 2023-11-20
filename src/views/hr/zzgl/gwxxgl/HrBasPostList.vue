<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <a-input placeholder="请输入岗位标识" v-model="queryParam.gwbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位名称">
              <j-input placeholder="请输入岗位名称" v-model="queryParam.gwmc"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位性质">
              <j-dict-select-tag v-model="queryParam.gwxz" placeholder="请选择岗位性质" dictCode="gwxz"/>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'gwxxgl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('岗位信息管理')" v-has="'gwxxgl:export'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'gwxxgl:import'">导入</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel" v-has="'gwxxgl:delete'"><a-icon type="delete"/>删除</a-menu-item>
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
        rowKey="gwbz"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="sfqyTag" slot-scope="text, record">
          <a-tag v-if="record.sfqy=='1'" color="blue">
            {{record.sfqy_dictText}}
          </a-tag>
          <a-tag v-else-if="record.sfqy=='2'" color="pink">
            {{record.sfqy_dictText}}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'gwxxgl:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a v-has="'gwxxgl:delete'">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hrBasPost-modal ref="modalForm" @ok="modalFormOk"></hrBasPost-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import HrBasPostModal from './modules/HrBasPostModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction, getAction,downFile } from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from "@/components/jeecg/JInput";


  export default {
    name: "HrBasPostList",
    mixins:[JeecgListMixin],
    components: {
      HrBasPostModal,ExcelImport,JInput
    },
    data () {
      return {
        description: '岗位信息管理管理页面',
        exportTemplateName: '岗位信息导入模板',
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
            title: '岗位标识',
            align:"center",
            dataIndex: 'gwbz'
           },
		   {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwmc'
           },
          {
            title: '岗位性质',
            align:"center",
            dataIndex: 'gwxz_dictText'
          },
		      {
            title: '是否启用',
            align:"center",
            dataIndex: 'sfqy_dictText',
            scopedSlots: { customRender: 'sfqyTag' },
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/gwxxgl/hrBasPost/list",
          delete: "/gwxxgl/hrBasPost/delete",
          deleteBatch: "/gwxxgl/hrBasPost/deleteBatch",
          exportXlsUrl: "gwxxgl/hrBasPost/exportXls",
          importExcelUrl: "gwxxgl/hrBasPost/importExcel",
          exportTemplateUrl: "gwxxgl/hrBasPost/exportTemplateXls",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete(record){
        deleteAction(this.url.delete, {gwbz:record.gwbz}).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
        });
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>