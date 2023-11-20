<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数编码">
              <a-input placeholder="请输入参数编码" v-model="queryParam.csbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数名称">
              <a-input placeholder="请输入参数名称" v-model="queryParam.csmc"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'csgl:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('参数管理')" v-has="'csgl:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <!--<a-button type="primary" icon="import">导入</a-button>-->
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table ref="table"
               bordered
               rowKey=""
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange"><!--:scroll="{ x: 3000 }"-->

        <span slot="csmc" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="csz" slot-scope="text">
          <j-ellipsis :value="text" :length="15"/>
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="25"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'csgl:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'csgl:delete'">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <csgl-modal ref="modalForm" @ok="modalFormOk"></csgl-modal>
  </a-card>
</template>

<script>
  import CsglModal from './modules/CsglModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {deleteAction} from '@/api/manage'
  import JEllipsis from "../../../../components/jeecg/JEllipsis";

  export default {
    name: "CsglList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      CsglModal,
      JTreeSelect
    },
    data() {
      return {
        description: '参数管理管理页面',
        isorter: {
          order: 'asc'
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '参数编码',
            align: "center",
            dataIndex: 'csbm',
            sorter: true
          },
          {
            title: '参数名称',
            align: "left",
            dataIndex: 'csmc',
            scopedSlots: {customRender: 'csmc'},
          },
          {
            title: '参数值',
            align: "left",
            dataIndex: 'csz',
            scopedSlots: {customRender: 'csz'},
          },
          {
            title: '备注',
            align: "left",
            dataIndex: 'bz',
            scopedSlots: {customRender: 'bz'},
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: "right",
            width: 150,
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/csgl/csgl/list",
          delete: "/csgl/csgl/delete",
          deleteBatch: "/csgl/csgl/deleteBatch",
          exportXlsUrl: "csgl/csgl/exportXls",
          importExcelUrl: "csgl/csgl/importExcel",
        },
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
        deleteAction(that.url.delete, {csbm: record.csbm}).then((res) => {
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