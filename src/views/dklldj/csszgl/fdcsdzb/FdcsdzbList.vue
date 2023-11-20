<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="定价得分">
              <a-input-number placeholder="定价得分起" v-model="queryParam.djdf_begin"
                              style="width: 40%; text-align: center" :min="0"/>
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled/>
              <a-input-number placeholder="定价得分止" v-model="queryParam.djdf_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款授信金额（起）">
              <a-input placeholder="请输入贷款授信金额（起）" v-model="queryParam.dksxjeBegin"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款授信金额（止）（含）：">
              <a-input placeholder="请输入贷款授信金额（止）" v-model="queryParam.dksxjeEnd"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款期限">
              <j-dict-select-tag placeholder="请选择贷款期限" v-model="queryParam.dkqx" dict-code="dkqxly"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应浮动幅度(%)">
              <!--              <a-input placeholder="请输入对应浮动幅度" v-model="queryParam.dyfdfd"></a-input>-->
              <a-input-number placeholder="" v-model="queryParam.dyfdfd_begin"
                              style="width: 40%; text-align: center" :min="0"/>
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled/>
              <a-input-number placeholder="" v-model="queryParam.dyfdfd_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="按LPR加基点（BP）">
              <a-input-number placeholder="" v-model="queryParam.dyjdbp_begin"
                              style="width: 40%; text-align: center" :min="0"/>
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled/>
              <a-input-number placeholder="" v-model="queryParam.dyjdbp_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0"/>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

          <!--<template v-if="toggleSearchStatus">
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
          </a-col>-->
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">

      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('浮动查算对照表')">导出</a-button>
   <!--   <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" >导入</a-button>
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
    <fdcsdzb-modal ref="modalForm" @ok="modalFormOk"></fdcsdzb-modal>
    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
  import FdcsdzbModal from './modules/FdcsdzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "FdcsdzbList",
    mixins:[JeecgListMixin],
    components: {
      FdcsdzbModal,ExcelImport
    },
    data () {
      return {
        description: '浮动查算对照表管理页面',
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
            title: 'ID',
            align:"center",
            dataIndex: 'id'
          },
		   {
            title: '定价得分',
            align:"center",
            dataIndex: 'djdf'
           },
		   {
            title: '贷款期限',
            align:"center",
            dataIndex: 'dkqx_dictText'
           },
		   {
            title: '贷款授信金额（起）',
            align:"center",
            dataIndex: 'dksxjeBegin'
           },
		   {
            title: '贷款授信金额（止）（含）',
            align:"center",
            dataIndex: 'dksxjeEnd'
           },
		   {
            title: '对应浮动幅度（%）',
            align:"center",
            dataIndex: 'dyfdfd'
           },
		   {
            title: '按LPR加基点（BP）',
            align:"center",
            dataIndex: 'dyjdbp'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/fdcsdzb/fdcsdzb/list",
          delete: "/fdcsdzb/fdcsdzb/delete",
          deleteBatch: "/fdcsdzb/fdcsdzb/deleteBatch",
          exportXlsUrl: "fdcsdzb/fdcsdzb/exportXls",
          importExcelUrl: "fdcsdzb/fdcsdzb/importExcel",
          exportTemplateUrl: "/fdcsdzb/fdcsdzb/exportTemplateXls",
       },
        exportTemplateName: '浮动查算对照表管理页面导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>