<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="指标ID">
            <j-input placeholder="请输入指标ID" v-model="queryParam.zbid" />
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="指标名称">
            <j-input placeholder="请输入指标名称" v-model="queryParam.zbmc" type="likemore" />
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="录入方式">
            <j-dict-select-tag placeholder="请选择录入方式" v-model="queryParam.llfs" dict-code="dklldj_lrfs" />
          </a-form-item></a-col>

          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'khxmsz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('考核项目设置')" v-has="'khxmsz:exportXls'">导出</a-button>
      <!--<a-button type="primary" icon="import" @click="handleImport">导入</a-button>-->
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="zbid"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'khxmsz:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.zbid)" v-has="'khxmsz:delete'">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khxmsz-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import KhxmszModal from './modules/KhxmszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../../components/jeecg/JInput'
  import { deleteAction } from '@/api/manage'
  import ExcelImport from '../../../../components/common/ExcelImport'

  export default {
    name: "KhxmszList",
    mixins:[JeecgListMixin],
    components: {
      ExcelImport,
      JInput,
      KhxmszModal
    },
    data () {
      return {
        description: '考核项目设置管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          // {
          //   title: 'qydm',
          //   align: "center",
          //   dataIndex: 'qydm'
          // },
          {
            title: '指标ID',
            align: "center",
            dataIndex: 'zbid',
          },
          {
            title: '指标名称',
            align: "center",
            dataIndex: 'zbmc'
          },
          {
            title: '录入方式',
            align: "center",
            dataIndex: 'llfs_dictText',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/csszgl/khxmsz/list",
          delete: "/csszgl/khxmsz/delete",
          deleteBatch: "/csszgl/khxmsz/deleteBatch",
          exportXlsUrl: "csszgl/khxmsz/exportXls",
          importExcelUrl: "csszgl/khxmsz/importExcel",
          exportTemplateUrl: "csszgl/khxmsz/exportTemplateXls",
        },
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
        this.$refs.modalForm.title = "新增考核项目";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑考核项目";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleImport() {
        let param = {};
        param.exportTemplateUrl = this.url.exportTemplateUrl;
        param.importExcelUrl = this.importExcelUrl;
        param.exportTemplateName = "考核项目设置导入模板";
        this.$refs.excelImportModal.showModal(param);
      },
      handleDelete: function (zbid) {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zbid: zbid}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      batchDel: function () {
        if(!this.url.deleteBatch){
          this.$message.error("请设置url.deleteBatch属性!")
          return
        }
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！');
          return;
        } else {
          var zbids = "";
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
            zbids += this.selectedRowKeys[a] + ",";
          }
          var that = this;
          this.$confirm({
            title: "确认删除",
            content: "是否删除选中数据?",
            onOk: function () {
              that.loading = true;
              deleteAction(that.url.deleteBatch, {zbids: zbids}).then((res) => {
                if (res.success) {
                  that.$message.success(res.message);
                  that.loadData();
                  that.onClearSelected();
                } else {
                  that.$message.warning(res.message);
                }
              }).finally(() => {
                that.loading = false;
              });
            }
          });
        }
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>