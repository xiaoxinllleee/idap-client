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
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择网点名称"
                             v-model="queryParam.khjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户日期">
              <a-date-picker placeholder="请选择开户日期" v-model="queryParam.khrq"></a-date-picker>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户名称">
              <a-input placeholder="请输入账户名称" v-model="queryParam.zhmc"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('对公存款账户余额表')">导出</a-button>
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
        :scroll="{ x: 5000 }"
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

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <sgtzglDgckzhyeb-modal ref="modalForm" @ok="modalFormOk"></sgtzglDgckzhyeb-modal>
  </a-card>
</template>

<script>
  import SgtzglDgckzhyebModal from './modules/SgtzglDgckzhyebModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { deleteAction } from '@api/manage'

  export default {
    name: "SgtzglDgckzhyebList",
    mixins:[JeecgListMixin],
    components: {
      SgtzglDgckzhyebModal,ExcelImport,JTreeSelect
    },
    data () {
      return {
        description: '对公存款账户余额表管理页面',
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
            title: '序号',
            align:"center",
            dataIndex: 'xh'
           },
          {
            title: '数据日期',
            align:"center",
            dataIndex: 'fiscalDate'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg'
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq'
           },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx'
           },
		   {
            title: '账户名称',
            align:"center",
            dataIndex: 'zhmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '子账号',
            align:"center",
            dataIndex: 'zzh'
           },
		   {
            title: '科目编码',
            align:"center",
            dataIndex: 'kmbm'
           },
		   {
            title: '科目名称',
            align:"center",
            dataIndex: 'kmmc'
           },
		   {
            title: '产品编码',
            align:"center",
            dataIndex: 'cpbm'
           },
		   {
            title: '产品名称',
            align:"center",
            dataIndex: 'cpmc'
           },
		   {
            title: '账户余额（元）',
            align:"center",
            dataIndex: 'zhye'
           },
		   {
            title: '应付利息（元）',
            align:"center",
            dataIndex: 'yflx'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq'
           },
		   {
            title: '推荐人',
            align:"center",
            dataIndex: 'tjr'
           },
		   {
            title: '年平均',
            align:"center",
            dataIndex: 'npj'
           },
		   {
            title: '月平均',
            align:"center",
            dataIndex: 'ypj'
           },
		   {
            title: '年初余额',
            align:"center",
            dataIndex: 'ncye'
           },
		   {
            title: '比年初',
            align:"center",
            dataIndex: 'bnc'
           },
		   {
            title: '上月余额',
            align:"center",
            dataIndex: 'syye'
           },
		   {
            title: '比上月',
            align:"center",
            dataIndex: 'bsy'
           },
		   {
            title: '昨日余额',
            align:"center",
            dataIndex: 'zrye'
           },
		   {
            title: '比昨日',
            align:"center",
            dataIndex: 'bzr'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'bz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dgckzhyeb/sgtzglDgckzhyeb/list",
          delete: "/dgckzhyeb/sgtzglDgckzhyeb/delete",
          deleteBatch: "/dgckzhyeb/sgtzglDgckzhyeb/deleteBatch",
          deleteByBatch: "/dgckzhyeb/sgtzglDgckzhyeb/deleteByBatch",
          exportXlsUrl: "dgckzhyeb/sgtzglDgckzhyeb/exportXls",
          importExcelUrl: "dgckzhyeb/sgtzglDgckzhyeb/importExcel",
          exportTemplateUrl:"/dgckzhyeb/sgtzglDgckzhyeb/exportTemplateXls",
       },
        exportTemplateName: '对公存款账户余额表导入模板'
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
        let khDate=""
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        if (this.queryParam.fiscalDate) {
          tjMoment=moment(this.queryParam.fiscalDate).format("YYYYMMDD")
        }
        if (this.queryParam.khrq){
          khDate=moment(this.queryParam.khrq).format("YYYYMMDD")
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.fiscalDate = tjMoment
        param.khrq = khDate
        return filterObj(param)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>