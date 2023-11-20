<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请输入机构代码" v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             pid-field="sjywjgdm" treeNodeFilterProp="title"
                             :showSearch="true" :tree-default-expand-all="true">
              </j-tree-select>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择" v-model="queryParam.custType" dict-code="jx_zhlx">
              </j-dict-select-tag>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款标签">
              <j-dict-select-tag placeholder="请选择" v-model="queryParam.dkbq" dict-code="dkbq">
              </j-dict-select-tag>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户姓名">
                <j-input placeholder="请输入客户姓名" v-model="queryParam.custName" type="likemore"></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款账号">
                <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Tsdkgl:add'">新增</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('特殊贷款管理')" v-has="'Tsdkgl:exp'">导出</a-button>
      <a-button  icon="import" @click="excelImport" v-has="'Tsdkgl:imp'">导入</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">-->
        <!--<a-menu slot="overlay">-->
          <!--<a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
        <!--</a-menu>-->
        <!--<a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--</a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table" size="small" bordered
               :rowKey="rowKey" :columns="columns" :dataSource="dataSource" :pagination="ipagination" :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Tsdkgl:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.dkzh)" v-has="'Tsdkgl:delete'">
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
    <tsdkgl-modal ref="modalForm" @ok="modalFormOk"></tsdkgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import TsdkglModal from './modules/TsdkglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from "@/components/jeecg/JInput"
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "TsdkglList",
    mixins:[JeecgListMixin],
    components: {
      TsdkglModal,
      JTreeSelect,
      JInput,
      ExcelImport
    },
    data () {
      return {
        description: '特殊贷款管理页面',
        toggleSearchStatus: true,
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户姓名',
            align: "center",
            dataIndex: 'custName'
          },
          {
            title: '贷款账号',
            align: "center",
            dataIndex: 'dkzh'
          },
          {
            title: '贷款金额',
            align: "center",
            dataIndex: 'dkje'
          },
          {
            title: '贷款余额',
            align: "center",
            dataIndex: 'dkye'
          },
          {
            title: '发放日期',
            align: "center",
            dataIndex: 'jkrq'
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'dqrq'
          },
          {
            title: '贷款标签',
            align: "center",
            dataIndex: 'dkbq_dictText'
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz'
          },
          // {
          //   title: '客户类型',
          //   align: "center",
          //   dataIndex: 'custType_dictText'
          // },
          // {
          //   title: '利率',
          //   align: "center",
          //   dataIndex: 'll'
          // },
          // {
          //   title: '担保方式',
          //   align: "center",
          //   dataIndex: 'dbfs'
          // },
          // {
          //   title: '贷款状态',
          //   align: "center",
          //   dataIndex: 'dkzt'
          // },
          // {
          //   title: '员工考核',
          //   align: "center",
          //   dataIndex: 'ygkh'
          // },
          // {
          //   title: '机构考核',
          //   align: "center",
          //   dataIndex: 'jgkh'
          // },
          // {
          //   title: '录入人',
          //   align: "center",
          //   dataIndex: 'lrr'
          // },
          // {
          //   title: '录入标志',
          //   align: "center",
          //   dataIndex: 'lrbz'
          // },
          // {
          //   title: '录入时间',
          //   align: "center",
          //   dataIndex: 'lrsj'
          // },
          // {
          //   title: '修改人',
          //   align: "center",
          //   dataIndex: 'xgr'
          // },
          // {
          //   title: '修改时间',
          //   align: "center",
          //   dataIndex: 'xgsj'
          // },
          // {
          //   title: '折扣比例',
          //   align: "center",
          //   dataIndex: 'zkbl'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/tsdkgl/tsdkgl/list",
          delete: "/tsdkgl/tsdkgl/delete",
          // deleteBatch: "/tsdkgl/tsdkgl/deleteBatch",
          exportXlsUrl: "tsdkgl/tsdkgl/exportXls",
          importExcelUrl: "tsdkgl/tsdkgl/importExcelT",
          exportTemplateUrl: "tsdkgl/tsdkgl/exportTemplateXls",
        },
        exportTemplateName: '特殊贷款管理导入模板',
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>