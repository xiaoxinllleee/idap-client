<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <!--<a-col :md="6" :sm="8"><a-form-item label="区域代码">
            <a-input placeholder="请输入区域代码" v-model="queryParam.qydm"></a-input>
          </a-form-item></a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="客户类型">
            <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="khlx"/>
          </a-form-item></a-col>
         <!-- <a-col :md="6" :sm="8"><a-form-item label="数据项维度">
            <j-dict-select-tag placeholder="请选择数据项维度" v-model="queryParam.sjxwd" dict-code="rqwd"/>
          </a-form-item></a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="数据项ID">
            <a-input placeholder="请输入数据项ID" v-model="queryParam.sjxid"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="数据项名称">
              <j-input placeholder="请输入数据项名称" v-model="queryParam.sjxmc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否启用">
              <j-dict-select-tag placeholder="请选择是否启用" v-model="queryParam.status" dict-code="qybz"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" ><span style="float: left; overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
            <a @click="handleToggleSearch" style="margin-left: 8px;">
              {{ toggleSearchStatus ? '收起' : '展开' }}
              <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
            </a>
          </span></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'PjsxSjxArea:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('区域数据项')" v-has="'PjsxSjxArea:exp'">导出</a-button>
      <a-button icon="import" @click="handleImport" v-has="'PjsxSjxArea:imp'">导入</a-button>
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
        <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
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
               :scroll="{ x:1650 }"
               @change="handleTableChange">

        <!-- 字符串超长截取省略号显示 -->
        <span slot="sjxmc" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="sjxsql" slot-scope="text">
          <j-ellipsis :value="text" :length="10" />
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'PjsxSjxArea:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'PjsxSjxArea:del'">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay"><a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item></a-menu>
          </a-dropdown>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxSjxArea-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import PjsxSjxAreaModal from './modules/PjsxSjxAreaModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../components/jeecg/JInput'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import ExcelImport from '../../../components/common/ExcelImport'

  export default {
    name: "PjsxSjxAreaList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      PjsxSjxAreaModal,
      JInput,
      ExcelImport,
    },
    data () {
      return {
        description: '区域数据项管理页面',
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
      /*    {
            title: '数据项维度',
            align:"center",
            dataIndex: 'sjxwd_dictText',
            width: 100,
          },*/
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText',
            width: 120,
          },
          // {
          //   title: '区域代码',
          //   align:"center",
          //   dataIndex: 'qydm'
          // },
          {
            title: '数据项ID',
            align:"center",
            dataIndex: 'sjxid',
            width: 90,
          },
          {
            title: '数据项名称',
            align:"center",
            dataIndex: 'sjxmc',
            scopedSlots: { customRender: 'sjxmc' },
            width: 150,
          },
          {
            title: '数据项SQL',
            align:"center",
            scopedSlots: { customRender: 'sjxsql' },
            dataIndex: 'sjxsql',
            width: 200,
          },
          {
            title: '执行顺序',
            align:"center",
            dataIndex: 'zxsx',
            width: 80,
          },
          {
            title: '数据来源',
            align:"center",
            dataIndex: 'sjly_dictText',
            width: 80,
          },
          {
            title: '备注',
            align:"center",
            scopedSlots: { customRender: 'bz' },
            dataIndex: 'bz',
            width: 150,
          },
          {
            title: '是否启用',
            align:"center",
            dataIndex: 'status_dictText',
            width: 80,
          },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
            width: 100
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
            width: 100
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
            fixed: "right",
            scopedSlots: { customRender: 'action' },
            width: 120,
          }
        ],
        url: {
          list: "/pjsjxsjxarea/pjsxSjxArea/list",
          delete: "/pjsjxsjxarea/pjsxSjxArea/delete",
          deleteBatch: "/pjsjxsjxarea/pjsxSjxArea/deleteBatch",
          exportXlsUrl: "pjsjxsjxarea/pjsxSjxArea/exportXls",
          importExcelUrl: "pjsjxsjxarea/pjsxSjxArea/importExcel",
          exportTemplateUrl: "pjsjxsjxarea/pjsxSjxArea/exportTemplateXls",
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
        this.$refs.modalForm.title = "新增区域数据项";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑区域数据项";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleImport() {
        let param = {};
        param.exportTemplateUrl = this.url.exportTemplateUrl;
        param.importExcelUrl = this.importExcelUrl;
        param.exportTemplateName = "评级授信区域数据项导入模板";
        this.$refs.excelImportModal.showModal(param);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>