<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="参数编号">
              <a-input placeholder="请输入参数编号" v-model="queryParam.csid"/>
            </a-form-item>
          </a-col>
          <!--<a-col :md="6" :sm="8"><a-form-item label="备注">
            <j-input placeholder="请输入备注" v-model="queryParam.note" type="likemore"/>
          </a-form-item></a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="参数值">
              <a-input placeholder="请输入参数值" v-model="queryParam.csvalue"></a-input>
            </a-form-item></a-col>
          </template>-->
          <a-col :md="6" :sm="8">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'csgl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('参数管理')" v-has="'csgl:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="csid"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'csgl:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'csgl:delete'">
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
    <csszxx-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import CsszxxModal from './modules/CsszxxModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JInput from '../../../../components/jeecg/JInput'
  import {deleteAction} from '@/api/manage'

  export default {
    name: "CsszxxList",
    mixins: [JeecgListMixin],
    components: {
      JInput,
      CsszxxModal
    },
    data() {
      return {
        description: '参数管理管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            },
            align: "center",
            width: 60
          },
          {
            title: '参数编号',
            align: "center",
            dataIndex: 'csid',
            width: 80
          },
          {
            title: '参数值',
            align: "center",
            dataIndex: 'csvalue',
            width: 80
          },
          {
            title: '备注',
            align: "left",
            dataIndex: 'note',
            width: 550,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
            width: 80,
          }
        ],
        url: {
          list: "/csszgl/csgl/list",
          delete: "/csszgl/csgl/delete",
          deleteBatch: "/csszgl/csgl/deleteBatch",
          exportXlsUrl: "csszgl/csgl/exportXls",
          importExcelUrl: "csszgl/csgl/importExcel",
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
        this.$refs.modalForm.title = "新增参数";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑参数";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {csid: record.csid}).then((res) => {
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