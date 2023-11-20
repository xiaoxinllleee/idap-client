<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('走访存量数据')" v-has="'Zfclsj:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Zfclsj:exp'">导入</a-button>
    </div>

    <!-- table区域-begin -->
    <div>


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
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import store from '@/store/'
  export default {
    name: "ZfclsjList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect, ExcelImport
    },
    data () {
      return {
        description: '走访存量数据页面',

        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width: 40,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText',
            width: 120
          },
          {
            title: '前年累计户数',
            align:"center",
            dataIndex: 'qnljhs'
          },
          {
            title: '去年累计户数',
            align:"center",
            dataIndex: 'snljhs',
          },
        ],
        url: {
          list: "/zfsjtj/zfclsj/list",
          exportXlsUrl: "/zfsjtj/zfclsj/exportXls",
          exportTemplateUrl: "/zfsjtj/zfclsj/exportTemplateXls",
          importExcelUrl: "zfsjtj/zfclsj/importExcel",
        },
        exportTemplateName: '走访存量数据导入模板'
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>