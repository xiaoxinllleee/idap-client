<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="数据项维度">
            <a-select placeholder="请选择数据项维度" v-model="queryParam.sjxwd">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="MM">月</a-select-option>
              <a-select-option value="Q">季</a-select-option>
              <a-select-option value="YYYY">年</a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="数据项ID">
            <j-input placeholder="请输入数据项ID" v-model="queryParam.sjxid"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="数据项名称">
            <j-input placeholder="请输入数据项名称" v-model="queryParam.sjxmc" type="likemore"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="启用标识">
              <j-dict-select-tag placeholder="请选择是否启用" v-model="queryParam.sfqy" dictCode="qybz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否为评定规则">
              <j-dict-select-tag placeholder="请选择是否评定规则" v-model="queryParam.sfpdgz" dictCode="sfbz"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'KhdjpdSjx:add'">新增</a-button>
      <a-button @click="handleExportXls('客户等级评定数据项')" icon="download" style="margin-left: 8px;" v-has="'KhdjpdSjx:exp'">导出</a-button>
      <!--<a-button type="primary" icon="import" @click="handleImport" style="margin-left: 8px;">导入</a-button>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down"/></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               @change="handleTableChange"
               :columns="columns"
               :loading="loading"
               :dataSource="dataSource"
               :pagination="ipagination"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">

        <span slot="sjxmc" slot-scope="text, record">
          <j-ellipsis :value="text" :length="12" />
        </span>
        <span slot="sjxsql" slot-scope="text, record">
          <j-ellipsis :value="text" :length="40" />
        </span>
        <span slot="bz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="20" />
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'KhdjpdSjx:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'KhdjpdSjx:del'">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khdjpdSjx-modal ref="modalForm" @ok="modalFormOk"/>
    <!--<excel-import ref="excelImportModal" @ok="importComplete"/>-->
  </a-card>
</template>

<script>
  import KhdjpdSjxModal from './modules/KhdjpdSjxModal'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../components/jeecg/JInput'
  import ExcelImport from '../../../components/common/ExcelImport'

  export default {
    name: "KhdjpdSjxList",
    mixins:[JeecgListMixin],
    components: {
      ExcelImport, KhdjpdSjxModal, JEllipsis, JInput
    },
    data () {
      return {
        description: '客户等级评定数据项管理',
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '数据项维度',
            align: "center",
            dataIndex: 'sjxwd_dictText',
            width: 100,
          },
          {
            title: '数据项ID',
            align: "center",
            dataIndex: 'sjxid',
            width: 120,
          },
		      {
            title: '数据项名称',
            align: "center",
            dataIndex: 'sjxmc',
            scopedSlots: { customRender: 'sjxmc' },
            width: 180,
          },
          {
            title: '计算SQL',
            align: "left",
            dataIndex: 'sjxsql',
            scopedSlots: { customRender: 'sjxsql' },
            width: 300,
          },
		      {
            title: '折算系数',
            align: "center",
            dataIndex: 'zsxs',
            width: 100,
            sorter: true,
          },
          {
            title: '执行顺序',
            align: "center",
            dataIndex: 'zxsx',
            width: 100,
            sorter: true,
          },
          {
            title: '是否启用',
            align: "center",
            dataIndex: 'sfqy_dictText',
            width: 100,
          },
		      {
            title: '是否评定规则',
            align: "center",
            dataIndex: 'sfpdgz_dictText',
            width: 150,
          },
		      {
            title: '备注',
            align: "left",
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 100,
          }
        ],
		    url: {
          list: "/khdjpdsjx/khdjpdSjx/list",
          delete: "/khdjpdsjx/khdjpdSjx/delete",
          deleteBatch: "/khdjpdsjx/khdjpdSjx/deleteBatch",
          exportXlsUrl: "khdjpdsjx/khdjpdSjx/exportXls",
          importExcelUrl: "khdjpdsjx/khdjpdSjx/importExcel",
          exportTemplateUrl: "khdjpdsjx/khdjpdSjx/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.readonlyFlag = true;
        this.$refs.modalForm.okType = 'edit';
      },
      handleImport() {
        let param = {};
        param.exportTemplateUrl = this.url.exportTemplateUrl;
        param.importExcelUrl = this.importExcelUrl;
        param.exportTemplateName = "客户等级评定数据项信息导入";
        this.$refs.excelImportModal.showModal(param);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>