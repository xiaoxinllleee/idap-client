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
            <a-form-item label="网点名称">
              <j-tree-select placeholder="请选择网点名称"
                             v-model="queryParam.wdmc"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款人名称">
              <a-input placeholder="请输入借款人名称" v-model="queryParam.jkrmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款人证件号码">
              <a-input placeholder="请输入借款人证件号码" v-model="queryParam.jkrzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款金额">
              <a-input placeholder="请输入贷款金额" v-model="queryParam.dkje"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款全明细')">导出</a-button>
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
        :scroll="{ x: 5500}"
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
    <sgtzglDkqmx-modal ref="modalForm" @ok="modalFormOk"></sgtzglDkqmx-modal>
  </a-card>
</template>

<script>
  import SgtzglDkqmxModal from './modules/SgtzglDkqmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import { deleteAction, getAction } from '@api/manage'

  export default {
    name: "SgtzglDkqmxList",
    mixins:[JeecgListMixin],
    components: {
      SgtzglDkqmxModal,ExcelImport,JTreeSelect,moment
    },
    data () {
      return {
        description: '贷款全明细管理页面',
        // 表头
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
        rq:'',
        columns: [
          {
            title: '序号',
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
            dataIndex: 'fiscalDate',
          },
		   {
            title: '网点名称',
            align:"center",
            dataIndex: 'wdmc_dictText'
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
           },
		   {
            title: '借款人名称',
            align:"center",
            dataIndex: 'jkrmc'
           },
		   {
            title: '借款人证件号码',
            align:"center",
            dataIndex: 'jkrzjhm'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '贷款日期',
            align:"center",
            dataIndex: 'dkrq'
           },
		   {
            title: '展期日期',
            align:"center",
            dataIndex: 'zqrq'
           },
		   {
            title: '贷款到期日',
            align:"center",
            dataIndex: 'dkdqr'
           },
		   {
            title: '上次结息日',
            align:"center",
            dataIndex: 'scjxr'
           },
		   {
            title: '贷款利率',
            align:"center",
            dataIndex: 'dkll'
           },
		   {
            title: '五级形态',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '客户经理',
            align:"center",
            dataIndex: 'khjl'
           },
		   {
            title: '主客户经理',
            align:"center",
            dataIndex: 'zkhjl'
           },
		   {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr'
           },
		   {
            title: '行政村组',
            align:"center",
            dataIndex: 'xzcz'
           },
		   {
            title: '客户详细地址',
            align:"center",
            dataIndex: 'khxxdz'
           },
		   {
            title: '客户联系方式',
            align:"center",
            dataIndex: 'khlxfs'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx'
           },
		   {
            title: '客户类型1',
            align:"center",
            dataIndex: 'khlx1'
           },
		   {
            title: '客户类型2',
            align:"center",
            dataIndex: 'khlx2'
           },
		   {
            title: '客户类型3',
            align:"center",
            dataIndex: 'khlx3'
           },
		   {
            title: '企业规模',
            align:"center",
            dataIndex: 'qygm'
           },
		   {
            title: '企业规模1',
            align:"center",
            dataIndex: 'qygm1'
           },
		   {
            title: '业务品种',
            align:"center",
            dataIndex: 'ywpz'
           },
		   {
            title: '贷款原始期限',
            align:"center",
            dataIndex: 'dkysqx'
           },
		   {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs'
           },
		   {
            title: '贷款投向',
            align:"center",
            dataIndex: 'dktx'
           },
		   {
            title: '贷款投向1',
            align:"center",
            dataIndex: 'dktx1'
           },
		   {
            title: '贷款投向2',
            align:"center",
            dataIndex: 'dktx2'
           },
		   {
            title: '贷款投向3',
            align:"center",
            dataIndex: 'dktx3'
           },
		   {
            title: '贷款投向4',
            align:"center",
            dataIndex: 'dktx4'
           },
		   {
            title: '贷款投向5',
            align:"center",
            dataIndex: 'dktx5'
           },
		   {
            title: '贷款投向6',
            align:"center",
            dataIndex: 'dktx6'
           },
		   {
            title: '贷款投向7',
            align:"center",
            dataIndex: 'dktx7'
           },
		   {
            title: '贷款投向8',
            align:"center",
            dataIndex: 'dktx8'
           },
		   {
            title: '是否财政贴息',
            align:"center",
            dataIndex: 'sfcztx'
           },
		   {
            title: '贷款其他类型',
            align:"center",
            dataIndex: 'dkqtlx'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'bz1'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'bz2'
           },
		   {
            title: '固定资产类型',
            align:"center",
            dataIndex: 'gdzclx'
           },
		   {
            title: '固定资产类型1',
            align:"center",
            dataIndex: 'gdzclx1'
           },
		   {
            title: '固定资产类型2',
            align:"center",
            dataIndex: 'gdzclx2'
           },
		   {
            title: '固定资产类型3',
            align:"center",
            dataIndex: 'gdzclx3'
           },
		   {
            title: '固定资产类型4',
            align:"center",
            dataIndex: 'gdzclx4'
           },
		   {
            title: '借款人所属行业门类',
            align:"center",
            dataIndex: 'jkrsshyml'
           },
		   {
            title: '借款人所属行业大类',
            align:"center",
            dataIndex: 'jkrsshydl'
           },
		   {
            title: '借款人所属行业中类',
            align:"center",
            dataIndex: 'jkrsshyzl'
           },
		   {
            title: '借款人所属行业小类',
            align:"center",
            dataIndex: 'jkrsshyxl'
           },
		   {
            title: '逾期日期',
            align:"center",
            dataIndex: 'yqrq'
           },
		   {
            title: '合同编号',
            align:"center",
            dataIndex: 'htbh'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: "right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkqmx/sgtzglDkqmx/list",
          delete: "/dkqmx/sgtzglDkqmx/delete",
          deleteBatch: "/dkqmx/sgtzglDkqmx/deleteBatch",
          deleteByBatch: "/dkqmx/sgtzglDkqmx/deleteByBatch",
          exportXlsUrl: "dkqmx/sgtzglDkqmx/exportXls",
          importExcelUrl: "dkqmx/sgtzglDkqmx/importExcel",
          exportTemplateUrl:"/dkqmx/sgtzglDkqmx/exportTemplateXls",
       },
        exportTemplateName: '贷款全明细导入模板'
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