<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标志">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :zzbz="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <a-input placeholder="请输入岗位标识" v-model="queryParam.gwbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('组织岗位管理')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->

      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>


      <a-button @click="handRelation" type="primary" icon="retweet">关联</a-button>

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

          <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
<!--          <a @click="handleEdit(record)">编辑</a>

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
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hrBasOrganPost-modal ref="modalForm" @ok="modalFormOk"></hrBasOrganPost-modal>
    <OrganRelationModal  ref="relationForm"></OrganRelationModal>
    <excel-import ref="excelImportModal" @close="loadData(1)"></excel-import>

  </a-card>
</template>

<script>
  import HrBasOrganPostModal from './modules/HrBasOrganPostModal'
  import OrganRelationModal from './modules/OrganRelationModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { deleteAction, getAction,downFile } from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "HrBasOrganPostList",
    mixins:[JeecgListMixin],
    components: {
      HrBasOrganPostModal,OrganRelationModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '组织岗位管理管理页面',
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
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
           },
		   {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
		   {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zzgwgl/hrBasOrganPost/list",
          delete: "/zzgwgl/hrBasOrganPost/delete",
          deleteBatch: "/zzgwgl/hrBasOrganPost/deleteBatch",
          exportXlsUrl: "zzgwgl/hrBasOrganPost/exportXls",
          importExcelUrl: "zzgwgl/hrBasOrganPost/importExcel",
          exportTemplateUrl: "zzgwgl/hrBasOrganPost/exportTemplateXls",

    },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handRelation(){
        this.$refs.relationForm.edit();
        this.$refs.relationForm.title = "关联组织岗位信息";
        this.$refs.relationForm.disableSubmit = false;
      },
      handleDelete(record){
        deleteAction(this.url.delete, {zzbz: record.zzbz,gwbz:record.gwbz}).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
        });
      }


    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>