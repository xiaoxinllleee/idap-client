<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核项目">
              <j-dict-select-tag placeholder="请选择考核项目" v-model="queryParam.schemeId" dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type=3"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择组织标识" v-model="queryParam.zzbz"
                             dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" treeNodeFilterProp="title"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.gwbz"
                :pleaseSelect="false"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标维度">
              <j-dict-select-tag placeholder="请选择指标维度" v-model="queryParam.zbwd"   dict-code="zbwd"  />
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
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
      <a-button @click="handleAdd" icon="setting" v-has="'ErpAssessPhjfkListGw:set'" style="background-color: #009966;color: #fff">设置</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('岗位平衡计分卡考核设置')" v-has="'ErpAssessPhjfkListGw:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'ErpAssessPhjfkListGw:imp'">导入</a-button>
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
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x: 1600}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'ErpAssessPhjfkListGw:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'ErpAssessPhjfkListGw:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <!--<span slot="zbid_dictText" slot-scope="text">-->
        <!--<j-ellipsis :value="text" :length="4"></j-ellipsis>-->
        <!--</span>-->

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>

    <!-- 表单区域 -->
    <erpAssessPhjfk-modal ref="modalForm" @ok="modalFormOk"></erpAssessPhjfk-modal>
    <erp-assess-phjfk-gw-modal ref="modalForm2" @ok="modalFormOk"></erp-assess-phjfk-gw-modal>
  </a-card>
</template>

<script>
  import ErpAssessPhjfkModal from './modules/ErpAssessPhjfkModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'
  import ErpAssessPhjfkGwModal from './modules/ErpAssessPhjfkGwModal'
  import JEllipsis from '@comp/jeecg/JEllipsis'

  export default {
    name: "ErpAssessPhjfkListGw",
    mixins:[JeecgListMixin],
    components: {
      ErpAssessPhjfkModal,JTreeSelect,ExcelImport,ErpAssessPhjfkGwModal,JEllipsis
    },
    data () {
      return {
        description: '平衡积分卡考核设置管理页面',
        toggleSearchStatus: true,
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
            title: '考核项目',
            align:"center",
            dataIndex: 'schemeId_dictText',
            width: 150,
           },
		   // {
       //      title: '组织标识',
       //      align:"center",
       //      dataIndex: 'zzbz'
       //     },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
		   // {
       //      title: '岗位标识',
       //      align:"center",
       //      dataIndex: 'gwbz'
       //     },
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
          },
		   {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid'
           },
          {
            title: '指标名称',
            align:"center",
            scopedSlots: {customRender: 'zbid_dictText'},
            dataIndex: 'zbid_dictText',
            width: 120,
          },
		   {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText',
         width: 80,
           },
		   {
            title: '指标分值',
            align:"center",
            dataIndex: 'zbfz'
           },
		   {
            title: '指标增减符号',
            align:"center",
            dataIndex: 'zbabs_dictText'
           },
		   {
            title: '加权比率',
            align:"center",
            dataIndex: 'jqbl'
           },
		   {
            title: '加权比率分值',
            align:"center",
            dataIndex: 'jqblfz'
           },
		   {
            title: '加权限制分值',
            align:"center",
            dataIndex: 'xzfz'
           },
		   {
            title: '减权比率',
            align:"center",
            dataIndex: 'kqbl'
           },
		   {
            title: '减权比率分值',
            align:"center",
            dataIndex: 'kqblfz'
           },
		   {
            title: '减权限制分值',
            align:"center",
            dataIndex: 'kqxzfz'
           },
          {
            title: '指标权重',
            align:"center",
            dataIndex: 'zbqz'
          },
          {
            title: '计分制',
            align:"center",
            dataIndex: 'jfz_dictText'
          },
		  /* {
            title: '考核类别',
            align:"center",
            dataIndex: 'khlb'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khfagl/erpAssessPhjfk/list",
          delete: "/khfagl/erpAssessPhjfk/delete",
          deleteBatch: "/khfagl/erpAssessPhjfk/deleteBatch",
          exportXlsUrl: "khfagl/erpAssessPhjfk/exportXls",
          importExcelUrl: "khfagl/erpAssessPhjfk/importExcel",
          exportTemplateUrl:"/khfagl/erpAssessPhjfk/exportTemplateXls",
       },
        exportTemplateName: '岗位平衡计分卡考核设置导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm2.add();
        this.$refs.modalForm2.title = "设置";
        this.$refs.modalForm2.disableSubmit = false
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>