<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.zzbz"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Dkspedsz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('贷款审批额度设置')" v-has="'Dkspedsz:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Dkspedsz:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'Dkspedsz:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown v-has="'Dkspedsz:del'">
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
    <dkspedsz-modal ref="modalForm" @ok="modalFormOk"></dkspedsz-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkspedszModal from './modules/DkspedszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'

  export default {
    name: "DkspedszList",
    mixins:[JeecgListMixin],
    components: {
      DkspedszModal, ExcelImport, JTreeSelect
    },
    data () {
      return {
        description: '贷款审批额度设置页面',
        isAll: false,
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
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
		      {
            title: '审批额度起(万元)',
            align:"center",
            dataIndex: 'spedBegin'
           },
		      {
            title: '审批额度止(万元)',
            align:"center",
            dataIndex: 'spedEnd'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		    url: {
          list: "/dksp/edsz/list",
          delete: "/dksp/edsz/delete",
          deleteBatch: "/dksp/edsz/deleteBatch",
          exportXlsUrl: "dksp/edsz/exportXls",
          importExcelUrl: "dksp/edsz/importExcel",
          exportTemplateUrl: "/dksp/edsz/exportTemplateXls",
        },
        exportTemplateName: '贷款审批额度设置导入模板'
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
    },
    methods: {
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>