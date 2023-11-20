<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标标识">
              <a-input placeholder="请输入指标标识" v-model="queryParam.indexId"></a-input>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="方案id">
              <a-input placeholder="请输入方案id" v-model="queryParam.schemeId"></a-input>
            </a-form-item>
          </a-col>-->

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
<!--      <a-button @click="handleAdd" type="primary" icon="plus" disabled="selectedRowKeys.length == 1">新增机构系数</a-button>-->

      <a-button  icon="download" @click="handleExportXls('岗位考核设置')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button  icon="import">导入</a-button>
      </a-upload>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
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
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />

          <a @click="handleEditJg(record)">编辑机构参数</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pmaGwkhsz-modal ref="modalForm" @ok="modalFormOk"></pmaGwkhsz-modal>
    <pma-f-param-info-modal-jg ref="modalFormJg"></pma-f-param-info-modal-jg>
  </a-card>
</template>

<script>
  import PmaGwkhszModal from './modules/PmaGwkhszModal'
  import { JeecgListMixin } from '../../../../mixins/JeecgListMixin'
  import PmaFParamInfoModalJg from './modules/PmaFParamInfoModalJg'

  export default {
    name: "PmaGwkhszList",
    mixins:[JeecgListMixin],
    components: {
      PmaGwkhszModal,PmaFParamInfoModalJg
    },
    data () {
      return {
        description: '岗位考核设置管理页面',
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
            title: '指标名称',
            align:"center",
            dataIndex: 'indexId_dictText'
           },
		   {
            title: '方案名称',
            align:"center",
            dataIndex: 'schemeId_dictText'
           },
		   {
            title: '指标单价',
            align:"center",
            dataIndex: 'zbdj'
           },
		   {
            title: '指标单位',
            align:"center",
            dataIndex: 'zbdw_dictText'
           },
		   {
            title: '调节系数',
            align:"center",
            dataIndex: 'tjxs'
           },
		   {
            title: '指标权重',
            align:"center",
            dataIndex: 'zbqz'
           },
		   {
            title: '任务外单价',
            align:"center",
            dataIndex: 'rwwdj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/jxkh/pmaGwkhsz/list",
          delete: "/jxkh/pmaGwkhsz/delete",
          deleteBatch: "/jxkh/pmaGwkhsz/deleteBatch",
          exportXlsUrl: "jxkh/pmaGwkhsz/exportXls",
          importExcelUrl: "jxkh/pmaGwkhsz/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleEditJg: function (record) {
        this.$refs.modalFormJg.edit(record);
        this.$refs.modalFormJg.title = "编辑";
        this.$refs.modalFormJg.disableSubmit = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>