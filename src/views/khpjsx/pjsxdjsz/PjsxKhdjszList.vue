<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="等级编号">
            <a-input placeholder="请输入等级编号" v-model="queryParam.djbh"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="等级名称">
            <j-input placeholder="请输入等级名称" v-model="queryParam.djmc"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户类型">
            <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="khlx"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
<!--            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>-->
            <a-col :md="6" :sm="8"><a-form-item label="是否启用">
              <j-dict-select-tag placeholder="请选择是否启用" v-model="queryParam.status" dict-code="qybz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="分数值起">
              <a-input-group compact>
                <a-input placeholder="起" v-model="queryParam.fszbegin_begin"
                         style="width: 100px; text-align: center;"/>
                <a-input placeholder="~" disabled
                         style="width: 30px; border-left: 0; pointer-events: none;"/>
                <a-input placeholder="止" v-model="queryParam.fszbegin_end"
                         style="width: 100px; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="分数值止">
              <a-input-group compact>
                <a-input placeholder="起" v-model="queryParam.fszend_begin"
                         style="width: 100px; text-align: center;"/>
                <a-input placeholder="~" disabled
                         style="width: 30px; border-left: 0; pointer-events: none;"/>
                <a-input placeholder="止" v-model="queryParam.fszend_end"
                         style="width: 100px; text-align: center; border-left: 0;"/>
              </a-input-group>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'PjsxKhdjsz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('评级授信等级设置')" v-has="'PjsxKhdjsz:exp'">导出</a-button>
      <a-button icon="import" @click="handleImport" v-has="'PjsxKhdjsz:imp'">导入</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
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
               :scroll="{ x:1500 }"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'PjsxKhdjsz:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'PjsxKhdjsz:del'">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item><a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a>删除</a>
              </a-popconfirm></a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="6" />
        </span>
        <span slot="djmc" slot-scope="text">
          <j-ellipsis :value="text" :length="6" />
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxKhdjsz-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import PjsxKhdjszModal from './modules/PjsxKhdjszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../components/jeecg/JInput'
  import ExcelImport from '../../../components/common/ExcelImport'
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "PjsxKhdjszList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      PjsxKhdjszModal,
      JInput,
      ExcelImport,
    },
    data () {
      return {
        description: '评级授信等级设置管理页面',
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
            title: '等级编号',
            align: "center",
            dataIndex: 'djbh',
            width: 120,
            sorter: (a, b) => a.djbh - b.djbh,
          },
          {
            title: '等级名称',
            align: "center",
            dataIndex: 'djmc',
            width: 150,
            scopedSlots: {customRender: 'djmc'},
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 120
          },
          {
            title: '分数值起(含)',
            align: "center",
            dataIndex: 'fszbegin',
            width: 120
          },
          {
            title: '分数值止',
            align: "center",
            dataIndex: 'fszend',
            width: 120
          },
          {
            title: '等级系数',
            align: "center",
            dataIndex: 'djxs',
            width: 120,
            sorter: (a, b) => a.djxs - b.djxs,
          },
          {
            title: '是否启用',
            align: "center",
            dataIndex: 'status_dictText',
            width: 100,
            filters: [
              { text: '启用', value: '1', },
              { text: '禁用', value: '2', }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
          },
          // {
          //   title: '区域代码',
          //   align:"center",
          //   dataIndex: 'qydm'
          // },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz',
            width: 150,
            scopedSlots: {customRender: 'bz'},
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
            width: 100
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
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            width: 120,
          }
        ],
        url: {
          list: "/pjsxdjsz/pjsxKhdjsz/list",
          delete: "/pjsxdjsz/pjsxKhdjsz/delete",
          deleteBatch: "/pjsxdjsz/pjsxKhdjsz/deleteBatch",
          exportXlsUrl: "pjsxdjsz/pjsxKhdjsz/exportXls",
          importExcelUrl: "pjsxdjsz/pjsxKhdjsz/importExcel",
          exportTemplateUrl: "pjsxdjsz/pjsxKhdjsz/exportTemplateXls",
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
        this.$refs.modalForm.title = "新增评级授信等级";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑评级授信等级";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleImport() {
        let param = {};
        param.exportTemplateUrl = this.url.exportTemplateUrl;
        param.importExcelUrl = this.importExcelUrl;
        param.exportTemplateName = "评级授信客户等级设置导入模板";
        this.$refs.excelImportModal.showModal(param);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>