<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.fiscalDate"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行名称">
              <a-input placeholder="请输入银行名称" v-model="queryParam.yhmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="自主/委外投资">
              <a-input placeholder="请输入自主/委外投资" v-model="queryParam.zztz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="受托机构名称">
              <a-input placeholder="请输入受托机构名称" v-model="queryParam.stjgmc"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('手工台账-投资同业存单持有情况表')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-button @click="handleDelete1" icon="delete">删除</a-button>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

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
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <sgtzglTztycdcyqkb-modal ref="modalForm" @ok="modalFormOk"></sgtzglTztycdcyqkb-modal>
  </a-card>
</template>

<script>
  import SgtzglTztycdcyqkbModal from './SgtzglTztycdcyqkbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction } from '@api/manage'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "SgtzglTztycdcyqkbList",
    mixins:[JeecgListMixin],
    components: {
      SgtzglTztycdcyqkbModal,ExcelImport
    },
    data () {
      return {
        description: '手工台账-投资同业存单持有情况表管理页面',
        // 表头
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
        rq:'',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'fiscalDate'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
           },
		   {
            title: '银行名称',
            align:"center",
            dataIndex: 'yhmc'
           },
		   {
            title: '自主/委外投资',
            align:"center",
            dataIndex: 'zztz'
           },
		   {
            title: '受托机构名称',
            align:"center",
            dataIndex: 'stjgmc'
           },
		   {
            title: '产品名称',
            align:"center",
            dataIndex: 'cpmc'
           },
		   {
            title: '发行人',
            align:"center",
            dataIndex: 'fxr'
           },
		   {
            title: '交易对手',
            align:"center",
            dataIndex: 'jyds'
           },
		   {
            title: '发行金额(万元)',
            align:"center",
            dataIndex: 'fxje'
           },
		   {
            title: '投资金额(万元)',
            align:"center",
            dataIndex: 'tzje'
           },
		   {
            title: '账面余额(万元)',
            align:"center",
            dataIndex: 'zmye'
           },
		   {
            title: '期限(天)',
            align:"center",
            dataIndex: 'qx'
           },
		   {
            title: '到期',
            align:"center",
            dataIndex: 'dq'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '减值准备',
            align:"center",
            dataIndex: 'jzzb'
           },
		   {
            title: '预期收益率%',
            align:"center",
            dataIndex: 'yqsyl'
           },
		   {
            title: '最终审批人',
            align:"center",
            dataIndex: 'zzspr'
           },
		   {
            title: '本行风险评估结果',
            align:"center",
            dataIndex: 'bhfxpgjg'
           },
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/Tztycdcyqkb/sgtzglTztycdcyqkb/list",
          delete: "/Tztycdcyqkb/sgtzglTztycdcyqkb/delete",
          deleteBatch: "/Tztycdcyqkb/sgtzglTztycdcyqkb/deleteBatch",
          deleteByBatch: "/Tztycdcyqkb/sgtzglTztycdcyqkb/deleteByBatch",
          exportXlsUrl: "Tztycdcyqkb/sgtzglTztycdcyqkb/exportXls",
          importExcelUrl: "Tztycdcyqkb/sgtzglTztycdcyqkb/importExcel",
          exportTemplateUrl: "Tztycdcyqkb/sgtzglTztycdcyqkb/exportTemplateXls",
       },
        exportTemplateName: '投资同业存单持有情况导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete1: function () {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        if (this.queryParam.fiscalDate == undefined && this.queryParam.fiscalDate == null){
          this.$message.error("请选择数据日期!")
          return
        }else {
          this.rq = this.queryParam.fiscalDate.format("YYYYMMDD");
          console.log(this.rq)
          var that = this;
          deleteAction(that.url.deleteByBatch, {fiscalDate:this.rq}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }
      },
      beforeUpload() {
        if (this.queryParam.fiscalDate){
          this.rq = this.queryParam.fiscalDate.format("YYYYMMDD");
        }
      },
      excelImport(){
        if (this.queryParam.fiscalDate == undefined || this.queryParam.fiscalDate == '') {
          this.$message.error("请选择数据日期!")
          return
        }else {
          let params = {}
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rq}`
          params.exportTemplateName = this.exportTemplateName
          var param = Object.assign({},this.queryParam, params);
          this.$refs.excelImportModal.showModal(param);
        }
      },
      searchReset() {
        this.queryParam = {}
        this.loadData(1);
      },
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        let tjMoment=""
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        if (this.queryParam.fiscalDate) {
          tjMoment=moment(this.queryParam.fiscalDate).format("YYYYMMDD")
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.fiscalDate = tjMoment
        return filterObj(param)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>