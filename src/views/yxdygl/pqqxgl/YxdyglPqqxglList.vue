<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属网格">
              <JTreeSelectNotJg placeholder="请选择所属网格"
                                v-model="queryParam.menuId"
                                treeNodeFilterProp="title"
                                pidField="PARENT_ID"
                                dict="YXDYGL_MAIN,WGMC,ID"
                                pidValue="0"
                                :showSearch="true"
                                :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网格名称">
              <a-input placeholder="请输入网格名称" v-model="queryParam.wgmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理工号">
              <a-input placeholder="请输入客户经理工号" v-model="queryParam.khjl"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户经理类型">
                <j-dict-select-tag placeholder="请选择客户经理类型" style="width: 100%;"
                                   v-model="queryParam.sfzkhjl" dictCode="sfzkhjl" />
              </a-form-item>
            </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">-->
            <!--<a-form-item label="所属单元编号">-->
              <!--<a-input placeholder="请输入所属单元编号" v-model="queryParam.menuId"></a-input>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">-->
            <!--<a-form-item label="客户经理">-->
              <!--<a-input placeholder="请输入客户经理" v-model="queryParam.khjl"></a-input>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">-->
            <!--<a-form-item label="区分标识(1:农户，2：商户)">-->
              <!--<a-input placeholder="请输入区分标识(1:农户，2：商户)" v-model="queryParam.qfbs"></a-input>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'YxdyglPqqxgl:add'">新增</a-button>
      <a-button @click="handleAdjust" type="primary" icon="plus" v-has="'YxdyglPqqxgl:adjust'">调整</a-button>
      <!--<a-button @click="handleAdd" type="primary" icon="plus">移交</a-button>-->
      <a-button icon="download" @click="handleExportXls('网格权限管理')" v-has="'YxdyglPqqxgl:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'YxdyglPqqxgl:imp'">导入</a-button>
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
          <a @click="transfer(record)" v-has="'YxdyglPqqxgl:edit'">编辑权限</a>
          <a-divider type="vertical" v-has="'YxdyglPqqxgl:del'"/>
          <a-dropdown v-has="'YxdyglPqqxgl:del'">
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item v-has="'YxdyglPqqxgl:del'">
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
    <yxdyglPqqxgl-modal ref="modalForm" @ok="modalFormOk"></yxdyglPqqxgl-modal>
    <yxdygl-pqzrrgl-modal-drawer ref="editForm" @ok="modalFormOk"></yxdygl-pqzrrgl-modal-drawer>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <yxdygl-pqqxgl-adjust ref="adjustModal" />
  </a-card>
</template>

<script>
  import YxdyglPqqxglModal from './modules/YxdyglPqqxglModal'
  import { JeecgListMixin } from '../../../mixins/JeecgListMixin'
  import YxdyglPqzrrglModalDrawer from './modules/YxdyglPqqxglModalDrawer'
  import ExcelImport from '@/components/common/ExcelImport'
  import YxdyglPqqxglAdjust from './modules/YxdyglPqqxglAdjust'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  export default {
    name: "YxdyglPqqxglList",
    mixins:[JeecgListMixin],
    components: {
      YxdyglPqqxglModal,YxdyglPqzrrglModalDrawer,ExcelImport,YxdyglPqqxglAdjust,JTreeSelectNotJg
    },
    data () {
      return {
        description: '片区权限管理管理页面',
        exportTemplateName: '网格权限导入模板',
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
		   /*{
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh'
           },*/
          {
            title: '网格编号',
            align:"center",
            dataIndex: 'menuId'
          },
          {
            title: '网格名称',
            align:"center",
            dataIndex: 'menuId_dictText'
          },
          {
            title: '客户经理工号',
            align:"center",
            dataIndex: 'khjl'
          },
          {
            title: '客户经理名称',
            align:"center",
            dataIndex: 'khjl_dictText'
          },
		   {
            title: '是否主客户经理',
            align:"center",
            dataIndex: 'sfzkhjl_dictText'
           },
		   /*{
            title: '区分标识(1:农户，2：商户)',
            align:"center",
            dataIndex: 'qfbs'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/pqqxgl/yxdyglPqqxgl/list",
          delete: "/pqqxgl/yxdyglPqqxgl/delete",
          deleteBatch: "/pqqxgl/yxdyglPqqxgl/deleteBatch",
          exportXlsUrl: "pqqxgl/yxdyglPqqxgl/exportXls",
          importExcelUrl: "pqqxgl/yxdyglPqqxgl/importExcel",
          exportTemplateUrl: "/pqqxgl/yxdyglPqqxgl/exportTemplateXls",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      transfer(record){
        this.$refs.editForm.edit(record);
        this.$refs.editForm.title = "编辑";
        this.$refs.editForm.disableSubmit = false;
      },
      handleAdjust() {
        this.$refs.adjustModal.init();
        this.$refs.adjustModal.disableSubmit = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>