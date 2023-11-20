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
            <a-form-item label="签发机构名称">
              <j-tree-select placeholder="请选择签发机构名称"
                             v-model="queryParam.qfjgmc"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行承兑汇票或有账户账号">
              <a-input placeholder="请输入银行承兑汇票或有账户账号" v-model="queryParam.yhcdhphyzhzh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="出票人名称">
              <a-input placeholder="请输入出票人名称" v-model="queryParam.cprmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="出票人账号">
              <a-input placeholder="请输入出票人账号" v-model="queryParam.cprzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="票面金额(元)">
              <a-input placeholder="请输入票面金额(元)" v-model="queryParam.pmje"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('银行承兑汇票登记薄')">导出</a-button>
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
        :scroll="{ x: 2900}"
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
    <sgtzglYhcdhpdjb-modal ref="modalForm" @ok="modalFormOk"></sgtzglYhcdhpdjb-modal>
  </a-card>
</template>

<script>
  import SgtzglYhcdhpdjbModal from './modules/SgtzglYhcdhpdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import { deleteAction } from '@api/manage'

  export default {
    name: "SgtzglYhcdhpdjbList",
    mixins:[JeecgListMixin],
    components: {
      SgtzglYhcdhpdjbModal,ExcelImport,JTreeSelect
    },
    data () {
      return {
        description: '银行承兑汇票登记薄管理页面',
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
            title: '签发机构名称',
            align:"center",
            dataIndex: 'qfjgmc_dictText'
           },
		   {
            title: '银行承兑汇票或有账户账号',
            align:"center",
            dataIndex: 'yhcdhphyzhzh'
           },
		   {
            title: '出票人名称',
            align:"center",
            dataIndex: 'cprmc'
           },
		   {
            title: '出票人账号',
            align:"center",
            dataIndex: 'cprzh'
           },
		   {
            title: '票面金额(元)',
            align:"center",
            dataIndex: 'pmje'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'pzhm'
           },
		   {
            title: '签发日期',
            align:"center",
            dataIndex: 'qfrq'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
           },
		   {
            title: '未用注销日期',
            align:"center",
            dataIndex: 'wyzxrq'
           },
		   {
            title: '当前状态',
            align:"center",
            dataIndex: 'dqzt'
           },
		   {
            title: '新银行承兑汇票号',
            align:"center",
            dataIndex: 'xyhcdhph'
           },
		   {
            title: '兑付日期',
            align:"center",
            dataIndex: 'dfrq'
           },
		   {
            title: '保证金账号',
            align:"center",
            dataIndex: 'bzjzh'
           },
		   {
            title: '保证金比例（%）',
            align:"center",
            dataIndex: 'bzjbl'
           },
		   {
            title: '保证金金额(元)',
            align:"center",
            dataIndex: 'bzjje'
           },
		   {
            title: '收费比例（‰）',
            align:"center",
            dataIndex: 'sfbl'
           },
		   {
            title: '收费金额(元)',
            align:"center",
            dataIndex: 'sfje'
           },
		   {
            title: '收款人名称',
            align:"center",
            dataIndex: 'skrmc'
           },
		   {
            title: '收款人账号',
            align:"center",
            dataIndex: 'skrzh'
           },
		   {
            title: '收款人行号',
            align:"center",
            dataIndex: 'skrhh'
           },
		   {
            title: '经办柜员',
            align:"center",
            dataIndex: 'jbgy'
           },
		   {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr'
           },
		   {
            title: '是否发生垫款',
            align:"center",
            dataIndex: 'sffsdk'
           },
		   {
            title: '垫款账号',
            align:"center",
            dataIndex: 'dkzh'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'ywbh'
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
          list: "/yhcdhpdjb/sgtzglYhcdhpdjb/list",
          delete: "/yhcdhpdjb/sgtzglYhcdhpdjb/delete",
          deleteBatch: "/yhcdhpdjb/sgtzglYhcdhpdjb/deleteBatch",
          deleteByBatch: "/yhcdhpdjb/sgtzglYhcdhpdjb/deleteByBatch",
          exportXlsUrl: "yhcdhpdjb/sgtzglYhcdhpdjb/exportXls",
          importExcelUrl: "yhcdhpdjb/sgtzglYhcdhpdjb/importExcel",
          exportTemplateUrl:"/yhcdhpdjb/sgtzglYhcdhpdjb/exportTemplateXls",
       },
          exportTemplateName: '银行承兑汇票登记薄管理导入模板'
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