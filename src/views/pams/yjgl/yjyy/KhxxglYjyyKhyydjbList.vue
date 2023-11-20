<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="预约类型">
              <j-dict-select-tag   placeholder="请选择预约类型"  v-model="queryParam.yylx" dictCode="yylx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="预约日期">
              <a-date-picker v-model="queryParam.yyrq" placeholder="请选择预约日期" style="width: 100%;"
                             format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销人工号">
              <a-input placeholder="请输入营销人工号" v-model="queryParam.yxrgh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="预约编号">
              <a-input placeholder="请输入预约编号" v-model="queryParam.yybh"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'KhxxglYjyyKhyydjb:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户预约登记簿')" v-has="'KhxxglYjyyKhyydjb:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'KhxxglYjyyKhyydjb:imp'">导入</a-button>
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
        :scroll="{x:1800}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'KhxxglYjyyKhyydjb:edit'" v-if="record.sbzt=='0'">编辑</a>
          <a @click="handleEdit(record)" v-has="'KhxxglYjyyKhyydjb:edit'" v-else>详情</a>
          <a-divider type="vertical" />
          <a @click="handleApprove(record)" v-has="'KhxxglYjyyKhyydjb:approve'" v-if="record.sbzt=='3'">审批</a>
          <a-divider type="vertical" v-has="'KhxxglYjyyKhyydjb:approve'" v-if="record.sbzt=='3'"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'KhxxglYjyyKhyydjb:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>

    <!-- 表单区域 -->
    <khxxglYjyyKhyydjb-modal ref="modalForm" @ok="modalFormOk"></khxxglYjyyKhyydjb-modal>
    <khxxgl-yjyy-khyydjb-sp-modal ref="spModalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import KhxxglYjyyKhyydjbModal from './modules/KhxxglYjyyKhyydjbModal'
  import KhxxglYjyyKhyydjbSpModal from './modules/KhxxglYjyyKhyydjbSpModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'
  import store from '@/store/'

  export default {
    name: "KhxxglYjyyKhyydjbList",
    mixins:[JeecgListMixin],
    components: {
      KhxxglYjyyKhyydjbModal, KhxxglYjyyKhyydjbSpModal, JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '客户预约登记簿管理页面',
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
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '手机号码',
            align:"center",
            dataIndex: 'sjhm'
          },
		   {
            title: '预约编号',
            align:"center",
            dataIndex: 'yybh'
           },
		   {
            title: '预约类型',
            align:"center",
            dataIndex: 'yylx_dictText'
           },
          {
            title: '存款种类',
            align:"center",
            dataIndex: 'ckzl_dictText'
          },
		   {
            title: '预约日期',
            align:"center",
            dataIndex: 'yyrq'
           },
		   {
            title: '营销人工号',
            align:"center",
            dataIndex: 'yxrgh'
           },
          {
            title: '营销人姓名',
            align:"center",
            dataIndex: 'yxrgh_dictText'
          },
		   {
            title: '营销比例',
            align:"center",
            dataIndex: 'yxbl'
           },
		   {
            title: '申报状态',
            align:"center",
            dataIndex: 'sbzt_dictText'
           },
          {
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh'
          },
          {
            title: '存款金额',
            align:"center",
            dataIndex: 'ckje'
          },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: 'right',
            width: 110,
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/yjyy/khxxglYjyyKhyydjb/list",
          delete: "/yjyy/khxxglYjyyKhyydjb/delete",
          deleteBatch: "/yjyy/khxxglYjyyKhyydjb/deleteBatch",
          exportXlsUrl: "yjyy/khxxglYjyyKhyydjb/exportXls",
          importExcelUrl: "yjyy/khxxglYjyyKhyydjb/importExcel",
           exportTemplateUrl:"/yjyy/khxxglYjyyKhyydjb/exportTemplateXls",
       },
         exportTemplateName: '客户预约登记簿导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      searchReset() {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        if (record.sbzt == '0') {
          this.$refs.modalForm.disableSubmit = false;
        } else {
          this.$refs.modalForm.disableSubmit = true;
        }
      },
      handleApprove(record) {
        console.log('handleApprove', record)
        this.$refs.spModalForm.edit(record)
        this.$refs.spModalForm.title = '审批'
        this.$refs.spModalForm.disableSubmit = false
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>