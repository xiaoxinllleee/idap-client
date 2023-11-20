<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数编号">
              <a-input placeholder="请输入参数编号" v-model="queryParam.csbh"></a-input>
            </a-form-item>
          </a-col><!--
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数值起">
              <a-input placeholder="请输入参数值起" v-model="queryParam.cszq"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数值止">
              <a-input placeholder="请输入参数值止" v-model="queryParam.cszz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="调整系数">
              <a-input placeholder="请输入调整系数" v-model="queryParam.tzxs"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="备注">
              <a-input placeholder="请输入备注" v-model="queryParam.bz"></a-input>
            </a-form-item>
          </a-col>
          </template>-->
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Yxdkedcs:add'">新增</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('营销贷款额度参数')" v-has="'Yxdkedcs:exp'">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport" v-has="'Yxdkedcs:imp'">导入</a-button>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table" size="middle" bordered
               :rowKey="rowKey" :columns="columns" :dataSource="dataSource"
               :pagination="ipagination" :loading="loading" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Yxdkedcs:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.csbh)">
                  <a v-has="'Yxdkedcs:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yxdkedcs-modal ref="modalForm" @ok="modalFormOk"></yxdkedcs-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import YxdkedcsModal from './modules/YxdkedcsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {deleteAction} from "@/api/manage";
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "YxdkedcsList",
    mixins:[JeecgListMixin],
    components: {
      YxdkedcsModal,
      ExcelImport,
    },
    data () {
      return {
        description: '营销贷款额度参数管理页面',
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
            title: '参数编号',
            align: "center",
            dataIndex: 'csbh'
          },
          {
            title: '参数值起',
            align: "center",
            dataIndex: 'cszq'
          },
          {
            title: '参数值止',
            align: "center",
            dataIndex: 'cszz'
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
          list: "/yxdkedcs/list",
          delete: "/yxdkedcs/delete",
          // deleteBatch: "/khlc.yxdkedcs/yxdkedcs/deleteBatch",
          exportXlsUrl: "yxdkedcs/exportXls",
          importExcelUrl: "yxdkedcs/importExcel",
          exportTemplateUrl: "yxdkedcs/exportTemplateXls",
        },
        exportTemplateName: '营销贷款额度参数导入模板',
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
        this.$refs.modalForm.title = '添加参数信息'
        this.$refs.modalForm.editdisabled = false
        this.$refs.modalForm.disableSubmit = false
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '修改参数信息'
        this.$refs.modalForm.editdisabled = true
        this.$refs.modalForm.disableSubmit = false
      },
      handleDelete: function (csbh) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { csbh: csbh }).then((res) => {
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