<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="参数编码">
              <a-input placeholder="请输入参数编码" v-model="queryParam.csbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="参数名称">
              <a-input placeholder="请输入参数名称" v-model="queryParam.csmc"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="6" :sm="8">
             <a-form-item label="参数值">
               <a-input placeholder="请输入参数值" v-model="queryParam.csz"></a-input>
             </a-form-item>
           </a-col>
           <template v-if="toggleSearchStatus">
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('参数管理')" v-has="'csgl:exportXls'">导出
      </a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel" v-has="'csgl:import'">
        <a-button icon="import">导入</a-button>
      </a-upload>
      <!--  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
        <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>-->
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v- has="'cssz:edit'">编辑</a>
          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'csgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ckjkptCsgl-modal ref="modalForm" @ok="modalFormOk"></ckjkptCsgl-modal>
  </a-card>
</template>

<script>
import CkjkptCsglModal from './modules/CkjkptCsglModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'

export default {
  name: "CkjkptCsglList",
  mixins: [JeecgListMixin],
  components: {
    CkjkptCsglModal
  },
  data() {
    return {
      description: '参数管理页面',
      // 表头
      columns: [
        {
          title: '参数编码',
          align: "center",
          dataIndex: 'csbm'
        },
        {
          title: '参数名称',
          align: "center",
          dataIndex: 'csmc'
        },
        {
          title: '参数值',
          align: "center",
          dataIndex: 'csz'
        },
        {
          title: '备注',
          align: "center",
          dataIndex: 'bz'
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
          dataIndex: 'lrsj'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          scopedSlots: {customRender: 'action'},
        }
      ],
      url: {
        list: "/CkjkptCsgl/ckjkptCsgl/list",
        delete: "/CkjkptCsgl/ckjkptCsgl/delete",
        deleteBatch: "/CkjkptCsgl/ckjkptCsgl/deleteBatch",
        exportXlsUrl: "CkjkptCsgl/ckjkptCsgl/exportXls",
        importExcelUrl: "CkjkptCsgl/ckjkptCsgl/importExcel",
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
      this.$refs.modaLForm.title = "编辑";
      this.$refs.modalForm.disableSubmit = false;
      this.$refs.modaLForm.disabLed = true;
    }
  }
}
</script>

<style scoped>
@import '~@assets/less/common.less'
</style>