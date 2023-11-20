<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类别代码">
              <a-input placeholder="请输入业务类别代码" v-model="queryParam.ywlbdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类别名称">
              <a-input placeholder="请输入业务类别名称" v-model="queryParam.ywlbmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应交易码">
              <a-input placeholder="请输入对应交易码" v-model="queryParam.dyjym"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('业务类别管理')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel()"><a-icon type="delete"/>删除</a-menu-item>
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
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <ywlbgl-modal ref="modalForm" @ok="modalFormOk"></ywlbgl-modal>
  </a-card>
</template>

<script>
  import YwlbglModal from './modules/YwlbglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import { deleteAction } from '@api/manage'

  export default {
    name: "YwlbglList",
    mixins:[JeecgListMixin],
    components: {
      YwlbglModal,ExcelImport
    },
    data () {
      return {
        description: '业务类别管理管理页面',
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
            title: '业务类别代码',
            align:"center",
            dataIndex: 'ywlbdm'
           },
		   {
            title: '业务类别名称',
            align:"center",
            dataIndex: 'ywlbmc'
           },
		   {
            title: '对应交易码',
            align:"center",
            dataIndex: 'dyjym'
           },
		   {
            title: '折算笔数',
            align:"center",
            dataIndex: 'zsbs'
           },
		   {
            title: '折算计算式',
            align:"center",
            dataIndex: 'zsbseval'
           },
		   {
            title: '分配标志',
            align:"center",
            dataIndex: 'fpbz_dictText'
           },
		   {
            title: '分配比例',
            align:"center",
            dataIndex: 'fpbl'
           },
		   {
            title: '有效标志',
            align:"center",
            dataIndex: 'yxbz_dictText'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入操作员',
            align:"center",
            dataIndex: 'lrczy_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/ywlbgl/ywlbgl/list",
          delete: "/ywlbgl/ywlbgl/delete",
          deleteBatch: "/ywlbgl/ywlbgl/deleteBatch",
          exportXlsUrl: "ywlbgl/ywlbgl/exportXls",
          importExcelUrl: "ywlbgl/ywlbgl/importExcel",
          exportTemplateUrl:"/ywlbgl/ywlbgl/exportTemplateXls",
       },
          exportTemplateName: '业务类别管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { ywlbdm: record.ywlbdm }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      onSelectChange (selectedRowKeys, selectionRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectionRows = selectionRows

      },
      batchDel: function () {
        if (!this.url.deleteBatch) {
          this.$message.error('请设置url.deleteBatch属性!')
          return
        }
        if (this.selectionRows.length <= 0) {
          this.$message.warning('请选择一条记录！')
          return
        } else {
          var ids = ''
          for (var a = 0; a < this.selectionRows.length; a++) {
            ids += this.selectionRows[a].ywlbdm + ','
          }
          console.log(this.selectionRows)
          console.log(ids)
          var that = this
          this.$confirm({
            title: '确认删除',
            content: '是否删除选中数据?',
            onOk: function () {
              that.loading = true
              deleteAction(that.url.deleteBatch, { ids: ids }).then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              }).finally(() => {
                that.loading = false
              })
            }
          })
        }
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>