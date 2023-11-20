<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.jym"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易名称">
              <a-input placeholder="请输入交易名称" v-model="queryParam.jymc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否启用">
              <a-select placeholder="全部" v-model="queryParam.sfqy">
                <a-select-option value="1">
                  启用
                </a-select-option>
                <a-select-option value="2">
                  停用
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'xjlljymgl:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('现金流量交易码管理')" v-has="'xjlljymgl:exportXls'">导出
      </a-button>
      <a-button icon="import" @click="excelImport" v-has="'xjlljymgl:import'">导入</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'xjlljymgl:edit'">编辑</a>

          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'xjlljymgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xjlljymgl-modal ref="modalForm" @ok="modalFormOk"></xjlljymgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import XjlljymglModal from './modules/XjlljymglModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import {deleteAction} from "@/api/manage";

  export default {
    name: "XjlljymglList",
    mixins: [JeecgListMixin],
    components: {
      XjlljymglModal,ExcelImport
    },
    data() {
      return {
        description: '现金流量交易码管理管理页面',
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
            title: '交易码',
            align: "center",
            dataIndex: 'jym'
          },
          {
            title: '交易名称',
            align: "center",
            dataIndex: 'jymc'
          },
          {
            title: '是否启用',
            align: "center",
            dataIndex: 'sfqy_dictText'
          },
          {
            title: '录入标志',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
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
          list: "/xjlljymgl/xjlljymgl/list",
          delete: "/xjlljymgl/xjlljymgl/delete",
          deleteBatch: "/xjlljymgl/xjlljymgl/deleteBatch",
          exportXlsUrl: "xjlljymgl/xjlljymgl/exportXls",
          importExcelUrl: "xjlljymgl/xjlljymgl/importExcel",
          exportTemplateUrl: "/xjlljymgl/xjlljymgl/exportTemplateXls",
        },
        exportTemplateName: '现金流量交易码管理导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
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
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {jym: record.jym}).then((res) => {
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