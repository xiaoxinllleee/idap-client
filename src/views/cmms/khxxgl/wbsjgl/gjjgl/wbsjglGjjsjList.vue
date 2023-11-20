<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'wbsjglGjjsj:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('公积金数据')" v-has="'wbsjglGjjsj:exp'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'wbsjglGjjsj:imp'">导入</a-button>
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
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
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
          <a @click="handleEdit(record)" v-has="'wbsjglGjjsj:edit'">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'wbsjglGjjsj:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khxxglWbsjglGjjsj-modal ref="modalForm" @ok="modalFormOk"></khxxglWbsjglGjjsj-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import KhxxglWbsjglGjjsjModal from './modules/KhxxglWbsjglGjjsjModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "wbsjglGjjsjList",
    mixins: [JeecgListMixin],
    components: {
      KhxxglWbsjglGjjsjModal,ExcelImport
    },
    data() {
      return {
        description: '公积金数据管理页面',
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
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '年龄',
            align: "center",
            dataIndex: 'age'
          },
          {
            title: '个人账户状态',
            align: "center",
            dataIndex: 'grzhzt'
          },
          {
            title: '公积金起缴年月',
            align: "center",
            dataIndex: 'gjjqjny'
          },
          {
            title: '公积金月缴额',
            align: "center",
            dataIndex: 'gjjyje'
          },
          {
            title: '个人账户余额',
            align: "center",
            dataIndex: 'grzhye'
          },
          {
            title: '单位名称',
            align: "center",
            dataIndex: 'dwmc'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/gjjsj/khxxglWbsjglGjjsj/list",
          delete: "/gjjsj/khxxglWbsjglGjjsj/delete",
          deleteBatch: "/gjjsj/khxxglWbsjglGjjsj/deleteBatch",
          exportXlsUrl: "gjjsj/khxxglWbsjglGjjsj/exportXls",
          importExcelUrl: "gjjsj/khxxglWbsjglGjjsj/importExcel",
          exportTemplateUrl: "/gjjsj/khxxglWbsjglGjjsj/exportTemplateXls",
        },
        exportTemplateName: '公积金数据导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {}
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>