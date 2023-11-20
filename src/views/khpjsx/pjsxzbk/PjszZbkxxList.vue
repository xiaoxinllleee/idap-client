<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <!--<a-col :md="6" :sm="8"><a-form-item label="指标维度">
            <a-input placeholder="请输入指标维度" v-model="queryParam.zbwd"></a-input>
          </a-form-item></a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="指标维度">
            <j-dict-select-tag placeholder="请选择指标维度" v-model="queryParam.zbwd" dict-code="rqwd"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="指标ID">
            <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="指标名称">
            <j-input placeholder="请输入指标名称" v-model="queryParam.zbmc"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否启用">
              <j-dict-select-tag placeholder="请选择是否启用" v-model="queryParam.status" dict-code="qybz"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px;">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('评级授信指标库')">导出</a-button>
      <a-button type="primary" icon="import" @click="handleImport">导入</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
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
    <pjszZbkxx-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import PjszZbkxxModal from './modules/PjszZbkxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../components/jeecg/JInput'
  import ExcelImport from '../../../components/common/ExcelImport'

  export default {
    name: "PjszZbkxxList",
    mixins:[JeecgListMixin],
    components: {
      PjszZbkxxModal,
      JInput,
      ExcelImport,
    },
    data () {
      return {
        description: '评级授信指标库管理页面',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key:'rowIndex',
          //   width:60,
          //   align:"center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText',
            width: 120
          },
          {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid',
            width: 120
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbmc',
            width: 150
          },
          // {
          //   title: '考核类别',
          //   align:"center",
          //   dataIndex: 'zblb'
          // },
          // {
          //   title: '评级方式',
          //   align:"center",
          //   dataIndex: 'pjfs'
          // },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            width: 150
          },
          {
            title: '是否启用',
            align:"center",
            dataIndex: 'status_dictText',
            width: 100
          },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
            width: 120
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime',
            width: 120
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'updateBy',
            width: 120
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'updateTime',
            width: 120
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width: 120
          }
        ],
        url: {
          list: "/pjsxzbkxx/pjszZbkxx/list",
          delete: "/pjsxzbkxx/pjszZbkxx/delete",
          deleteBatch: "/pjsxzbkxx/pjszZbkxx/deleteBatch",
          exportXlsUrl: "pjsxzbkxx/pjszZbkxx/exportXls",
          importExcelUrl: "pjsxzbkxx/pjszZbkxx/importExcel",
          exportTemplateUrl: "pjsxzbkxx/pjszZbkxx/exportTemplateXls",
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
        this.$refs.modalForm.title = "新增评级授信指标";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑评级授信指标";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleImport() {
        let param = {};
        param.exportTemplateUrl = this.url.exportTemplateUrl;
        param.importExcelUrl = this.importExcelUrl;
        param.exportTemplateName = "评级授信指标库导入模板";
        this.$refs.excelImportModal.showModal(param);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>