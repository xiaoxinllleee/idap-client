<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷记卡客户编码">
              <a-input placeholder="请输入推广人员编号" v-model="queryParam.tgrybh"></a-input>
            </a-form-item>
          </a-col>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'djkrygl:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷记卡人员关联')"
                v-has="'djkrygl:exportXls'">导出
      </a-button>
      <a-button icon="import" @click="excelImport" v-has="'djkrygl:import'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
<!--          <a @click="handleEdit(record)">编辑</a>-->

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'djkrygl:delete'">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <djkrygl-modal ref="modalForm" @ok="modalFormOk"></djkrygl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import DjkryglModal from './modules/DjkryglModal'
  import JInput from "@/components/jeecg/JInput"
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {deleteAction} from "../../../../api/manage";
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "DjkryglList",
    mixins: [JeecgListMixin],
    components: {
      DjkryglModal, ExcelImport, JInput
    },
    data() {
      return {
        description: '贷记卡人员关联管理页面',
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
            title: '贷记卡客户编码',
            align: "center",
            dataIndex: 'tgrybh'
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'ygxm'
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrczy'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/djkrygl/djkrygl/list",
          delete: "/djkrygl/djkrygl/delete",
          deleteBatch: "/djkrygl/djkrygl/deleteBatch",
          exportXlsUrl: "djkrygl/djkrygl/exportXls",
          importExcelUrl: "djkrygl/djkrygl/importExcel",
          exportTemplateUrl: "/djkrygl/djkrygl/exportTemplateXls",
        },
        exportTemplateName: '贷记卡人员关联导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {yggh: record.yggh, tgrybh: record.tgrybh}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>