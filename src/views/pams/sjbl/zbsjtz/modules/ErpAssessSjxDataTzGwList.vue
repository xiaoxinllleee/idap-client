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
            <a-form-item label="考核月份">
              <a-month-picker placeholder="请选择考核月份" v-model="queryParam.tjyf" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织名称">
              <j-tree-select placeholder="请选择组织名称"
                             pid-field="sjzzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.zzbz"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">-->
            <!--<a-form-item label="指标维度">-->
              <!--<j-dict-select-tag placeholder="请输入指标维度" v-model="queryParam.zbwd" dict-code="zbwd"></j-dict-select-tag>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="调整类型">
              <j-dict-select-tag placeholder="请输入调整类型" v-model="queryParam.tzlx" dict-code="jx_tzlx"></j-dict-select-tag>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ErpAssessSjxDataTzGw:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('岗位指标数据调整')" v-has="'ErpAssessSjxDataTzGw:exp'">导出</a-button>
        <a-button icon="import" @click="excelImport" v-has="'ErpAssessSjxDataTzGw:imp'">导入</a-button>
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
        :scroll="{x:1300}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'ErpAssessSjxDataTzGw:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'ErpAssessSjxDataTzGw:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <erpAssessSjxDataTzGw-modal ref="modalForm" @ok="modalFormOk"></erpAssessSjxDataTzGw-modal>
  </a-card>
</template>

<script>
  import ErpAssessSjxDataTzGwModal from './ErpAssessSjxDataTzGwModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import store from '@/store/'

  export default {
    name: "ErpAssessSjxDataTzGwList",
    mixins:[JeecgListMixin],
    components: {
      ErpAssessSjxDataTzGwModal,ExcelImport,JTreeSelect
    },
    data () {
      return {
        description: '指标结果补录管理页面',
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
		   {
            title: '考核月份',
            align:"center",
            dataIndex: 'tjyf'
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
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
		   {
            title: '指标id',
            align:"center",
            dataIndex: 'zbid'
           },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbid_dictText'
          },
		   {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
           },
          {
            title: '调整类型',
            align:"center",
            dataIndex: 'tzlx_dictText'
          },
		   {
            title: '调整值',
            align:"center",
            dataIndex: 'tzz'
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
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zbjgbl/erpAssessSjxDataTz/listGW",
          delete: "/zbjgbl/erpAssessSjxDataTz/delete",
          deleteBatch: "/zbjgbl/erpAssessSjxDataTz/deleteBatch",
          exportXlsUrl: "zbjgbl/erpAssessSjxDataTz/exportXlsGW",
          importExcelUrl: "zbjgbl/erpAssessSjxDataTz/importExcelGW",
          exportTemplateUrl: "zbjgbl/erpAssessSjxDataTz/exportTemplateXlsGW",
       },
        exportTemplateName: '岗位指标数据调整导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      searchReset() {
        this.queryParam = {zzbz: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.orgCode
        }
        this.loadData(1);
      },
      handleAdd: function () {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '新增'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = true
      },
      handleEdit (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = false
      },
      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        //日期格式调整
        let tjyfment = ""
        if (this.queryParam.tjyf) {
          tjyfment = moment(this.queryParam.tjyf).format("YYYY-MM"+"-01")
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>