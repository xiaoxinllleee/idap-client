<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="区间编号">
              <a-input placeholder="请输入区间编号" v-model="queryParam.qjbh"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Dkqjjj:add'">新增</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('贷款区间计价')" v-has="'Dkqjjj:exp'">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport" v-has="'Dkqjjj:imp'">导入</a-button>
    </div>

    <div>

      <a-table ref="table" size="middle" bordered
               :rowKey="rowKey" :columns="columns" :dataSource="dataSource"
               :pagination="ipagination" :loading="loading" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Dkqjjj:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.qjbh)">
                  <a v-has="'Dkqjjj:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkqjjj-modal ref="modalForm" @ok="modalFormOk"></dkqjjj-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkqjjjModal from './modules/DkqjjjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {deleteAction} from "@/api/manage";
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "DkqjjjList",
    mixins:[JeecgListMixin],
    components: {
      DkqjjjModal,
      ExcelImport,
    },
    data () {
      return {
        description: '贷款区间计价管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '区间编号',
            align: "center",
            dataIndex: 'qjbh'
          },
          {
            title: '额度起',
            align: "center",
            dataIndex: 'edq'
          },
          {
            title: '额度止',
            align: "center",
            dataIndex: 'edz'
          },
          {
            title: '利率起',
            align: "center",
            dataIndex: 'llq'
          },
          {
            title: '利率止',
            align: "center",
            dataIndex: 'llz'
          },
          {
            title: '调整系数',
            align: "center",
            dataIndex: 'tzxs'
          },
          {
            title: '风险计提系数',
            align: "center",
            dataIndex: 'fxjtxs'
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz'
          },
          /*{
            title: 'lrr',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: 'lrsj',
            align: "center",
            dataIndex: 'lrsj'
          },
          {
            title: 'lrbz',
            align: "center",
            dataIndex: 'lrbz'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/khlc/dkqjjj/list",
          delete: "/khlc/dkqjjj/delete",
          // deleteBatch: "/khlc.yxdkedcs/yxdkedcs/deleteBatch",
          exportXlsUrl: "/khlc/dkqjjj/exportXls",
          importExcelUrl: "/khlc/dkqjjj/importExcel",
          exportTemplateUrl: "/khlc/dkqjjj/exportTemplateXls",
        },
        exportTemplateName: '贷款区间计价导入模板',
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '添加区间信息'
        this.$refs.modalForm.editdisabled = false
        this.$refs.modalForm.disableSubmit = false
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '修改区间信息'
        this.$refs.modalForm.editdisabled = true
        this.$refs.modalForm.disableSubmit = false
      },
      handleDelete: function (qjbh) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { qjbh: qjbh }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>