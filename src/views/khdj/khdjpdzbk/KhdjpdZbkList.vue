<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="指标维度">
            <a-select placeholder="请选择指标维度" v-model="queryParam.zbwd">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="MM">月</a-select-option>
              <a-select-option value="Q">季</a-select-option>
              <a-select-option value="YYYY">年</a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="指标ID">
            <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="指标名称">
            <j-input placeholder="请输入指标名称" v-model="queryParam.zbmc" type="likemore"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="版本类型">
                <j-dict-select-tag placeholder="请选择版本类型" v-model="queryParam.bblx" dictCode="bblx"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否启用">
                <j-dict-select-tag placeholder="请选择是否启用" v-model="queryParam.sfqy" dictCode="qybz"/>
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
      <a-button type="primary" icon="plus" @click="handleAdd" v-has="'KhdjpdZbk:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('客户等级评定指标')" style="margin-left: 8px;" v-has="'KhdjpdZbk:exp'">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay"><a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item></a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项
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
        <!-- 字符串超长截取省略号显示 -->
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'KhdjpdZbk:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown v-has="'KhdjpdZbk:del'">
            <a class="ant-dropdown-link">更多<a-icon type="down"/></a>
            <a-menu slot="overlay"><a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item></a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khdjpdZbk-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import KhdjpdZbkModal from './modules/KhdjpdZbkModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import JInput from '../../../components/jeecg/JInput'

  export default {
    name: "KhdjpdZbkList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      KhdjpdZbkModal
    },
    data () {
      return {
        description: '客户等级评定指标库管理页面',
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid',
          },
		      {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbmc'
          },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText',
          },
		      {
            title: '版本类型',
            align:"center",
            dataIndex: 'bblx_dictText',
          },
		      {
            title: '是否启用',
            align:"center",
            dataIndex: 'sfqy_dictText',
          },
		      {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		    url: {
          list: "/khdjpdzbk/khdjpdZbk/list",
          delete: "/khdjpdzbk/khdjpdZbk/delete",
          deleteBatch: "/khdjpdzbk/khdjpdZbk/deleteBatch",
          exportXlsUrl: "khdjpdzbk/khdjpdZbk/exportXls",
          // importExcelUrl: "khdjpdzbk/khdjpdZbk/importExcel",
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
        this.$refs.modalForm.title = "新增等级评定指标";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑等级评定指标";
        this.$refs.modalForm.disableSubmit = false;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>