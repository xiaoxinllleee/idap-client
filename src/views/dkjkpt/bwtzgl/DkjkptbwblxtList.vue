<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="担保类型">
              <j-dict-select-tag placeholder="请输入担保类型" v-model="queryParam.dbfs" dict-code="dbfs"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核销日期">
              <a-input placeholder="请输入核销日期" v-model="queryParam.hxny"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="有无权益">
              <a-input placeholder="请输入有无权益" v-model="queryParam.ywqy"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款类型">
              <a-input placeholder="请输入贷款类型" v-model="queryParam.dklx"></a-input>
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
      <a-button @click="handleExtract" icon="area-chart" v-has="'bwtzgl:extract'">统计</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('表外台账管理')">导出</a-button>
      <a-button icon="import" @click="excelImport" >导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
    <!--  <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

         <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="dkzh" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

         <!-- <a-divider type="vertical" />
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
    <dkjkptbwblxt-modal ref="modalForm" @ok="modalFormOk"></dkjkptbwblxt-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import DkjkptbwblxtModal from './modules/DkjkptbwblxtModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JEllipsis from '@comp/jeecg/JEllipsis'
  import ExcelImport from '@comp/common/ExcelImport'
  import { getAction } from '@api/manage'

  export default {
    name: "DkjkptbwblxtList",
    mixins:[JeecgListMixin],
    components: {
      DkjkptbwblxtModal,JTreeSelect,JEllipsis,ExcelImport
    },
    data () {
      return {
        description: '贷款监控平台表外不良_湘潭管理页面',
        // 表头
        columns: [
          {
            title: '支行',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '清收任务',
            align:"center",
            dataIndex: 'qsrw'
          },
          {
            title: '拟合计清收',
            align:"center",
            dataIndex: 'nhjqs'
          },
          {
            title: '实合计清收',
            align:"center",
            dataIndex: 'shjqs'
          },
          {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
          },
          {
            title: '户名',
            align:"center",
            dataIndex: 'khxm'
          },
		   {
            title: '证件号',
            align:"center",
            dataIndex: 'zjhm',
         scopedSlots: { customRender: 'zjhm' }
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'dkzh',
         scopedSlots: { customRender: 'dkzh' }
           },

          {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq'
          },
          {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
          },
		   {
            title: '核销年月',
            align:"center",
            dataIndex: 'hxny'
           },
		   {
            title: '有无权益',
            align:"center",
            dataIndex: 'ywqy'
           },
		   {
            title: '年初余额',
            align:"center",
            dataIndex: 'ncye'
           },
		   {
            title: '当前表外余额',
            align:"center",
            dataIndex: 'dqbwye'
           },
		   {
            title: '本年清收',
            align:"center",
            dataIndex: 'bnqs'
           },
          {
            title: '担保类型',
            align:"center",
            dataIndex: 'dbfs_dictText'
          },
          {
            title: '诉讼情况',
            align:"center",
            dataIndex: 'ssqk'
          },
          {
            title: '贷款类型',
            align:"center",
            dataIndex: 'dklx'
          },
		   {
            title: '管理责任人',
            align:"center",
            dataIndex: 'glzrr'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dksjjktz/dkjkptbwblxt/list",
          delete: "/dksjjktz/dkjkptbwblxt/delete",
          deleteBatch: "/dksjjktz/dkjkptbwblxt/deleteBatch",
          exportXlsUrl: "dksjjktz/dkjkptbwblxt/exportXls",
          importExcelUrl: "dksjjktz/dkjkptbwblxt/importExcel",
          exportTemplateUrl: '/bndksjjktz/dndksjjktz/exportTemplateXlsBwbl',
          init: '/dksjjktz/dkjkptbwblxt/init',
       },
        exportTemplateName:'表外台账管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleExtract() {
        this.loading = true
        let params = {}
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>