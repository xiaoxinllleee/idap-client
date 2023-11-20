<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6"><a-form-item label="规则维度">
            <a-select placeholder="请选择规则维度" v-model="queryParam.gzwd">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="MM">月</a-select-option>
              <a-select-option value="Q">季</a-select-option>
              <a-select-option value="YYYY">年</a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :span="6"><a-form-item label="规则编号">
            <j-input placeholder="请输入规则编号" v-model="queryParam.gzbh"/>
          </a-form-item></a-col>
          <a-col :span="6"><a-form-item label="客户等级">
            <j-dict-select-tag placeholder="请选择客户等级" v-model="queryParam.khdjbh" dictCode="KHDJ_KHDJSZ, DJMC, DJBH"/>
          </a-form-item></a-col>
          <a-col :span="6" ><span class="table-page-search-submitButtons" style="float: left;overflow: hidden;">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
          </span></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'KhdjpdGzszGzxx:add'">新增</a-button>
      <!--<a-button type="primary" icon="download" @click="handleExportXls('客户等级规则设置')" style="margin-left: 8px;">导出</a-button>-->
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import" style="margin-left: 8px;">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay"><a-menu-item key="1" @click="batchDel">
          <a-icon type="delete"/>删除
        </a-menu-item></a-menu>
        <a-button style="margin-left: 8px;">批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i><span>已选择 </span>
        <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a><span>项</span>
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'KhdjpdGzszGzxx:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'KhdjpdGzszGzxx:del'">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khdjpd-gzsz-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import KhdjpdGzszModal from './modules/KhdjpdGzszModal'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JInput from '../../../components/jeecg/JInput'

  export default {
    name: "KhdjpdGzszGzxxList",
    mixins: [JeecgListMixin],
    components: {
      AFormItem,
      KhdjpdGzszModal,
      JInput
    },
    data () {
      return {
        description: '客户等级规则设置管理页面',
        // 表头
        columns: [
          {
            title: '客户等级',
            align: "center",
            dataIndex: 'khdjbh_dictText',
            sorter: true
          },
          {
            title: '规则维度',
            align: "center",
            dataIndex: 'gzwd_dictText',
          },
          {
            title: '规则编号',
            align: "center",
            dataIndex: 'gzbh',
            scopedSlots: { customRender: 'edit' },
          },
          {
            title: '规则名称',
            align: "center",
            dataIndex: 'gzmc'
          },
          {
            title: '规则概述',
            align: "left",
            dataIndex: 'gzgs'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 请求参数
        url: {
          list: "/khdj/khdjpdgzsz/list",
          delete: "/khdj/khdjpdgzsz/delete",
          deleteBatch: "/khdj/khdjpdgzsz/deleteBatch",
          exportXlsUrl: "khdj/khdjpdgzsz/exportXls",
          importExcelUrl: "khdj/khdjpdgzsz/importExcel",
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
        this.$refs.modalForm.okType = 'edit';
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>