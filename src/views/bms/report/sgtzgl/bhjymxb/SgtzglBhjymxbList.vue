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
            <a-form-item label="出具日期">
              <a-date-picker placeholder="请选择出具日期" v-model="queryParam.cjrq" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="生效日期">
              <a-date-picker placeholder="请选择生效日期" v-model="queryParam.sxrq" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日期">
              <a-date-picker placeholder="请选择到期日期" v-model="queryParam.dqrq" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="基础日期">
              <a-date-picker placeholder="请选择基础日期" v-model="queryParam.jcrq" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="剩余天数">
              <a-input placeholder="请输入剩余天数" v-model="queryParam.syts"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('保函结余明细表')">导出</a-button>
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

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <sgtzglBhjymxb-modal ref="modalForm" @ok="modalFormOk"></sgtzglBhjymxb-modal>
  </a-card>
</template>

<script>
  import SgtzglBhjymxbModal from './modules/SgtzglBhjymxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import { deleteAction, getAction } from '@api/manage'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'

  export default {
    name: "SgtzglBhjymxbList",
    mixins:[JeecgListMixin],
    components: {
      SgtzglBhjymxbModal,ExcelImport
    },
    data () {
      return {
        description: '保函结余明细表管理页面',
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
            title: '支行',
            align:"center",
            dataIndex: 'zh'
          },
          {
            title: '客户经理',
            align:"center",
            dataIndex: 'khjl'
          },
		   {
            title: '出具日期',
            align:"center",
            dataIndex: 'cjrq'
           },
		   {
            title: '生效日期',
            align:"center",
            dataIndex: 'sxrq'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
           },
		   {
            title: '基础日期',
            align:"center",
            dataIndex: 'jcrq'
           },
		   {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts'
           },
		   {
            title: '申请人',
            align:"center",
            dataIndex: 'sqr'
           },
		   {
            title: '收益人',
            align:"center",
            dataIndex: 'syr'
           },
		   {
            title: '保函金额',
            align:"center",
            dataIndex: 'bhje'
           },
		   {
            title: '保证金',
            align:"center",
            dataIndex: 'bzj'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'sxf'
           },
		   {
            title: '保函种类',
            align:"center",
            dataIndex: 'bhzl'
           },
		   {
            title: '保函编号',
            align:"center",
            dataIndex: 'bhbh'
           },
		   {
            title: '退回日期',
            align:"center",
            dataIndex: 'thrq'
           },
		   {
            title: '经办',
            align:"center",
            dataIndex: 'jb'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: '企业规模',
            align:"center",
            dataIndex: 'qygm'
           },
		   {
            title: '行业',
            align:"center",
            dataIndex: 'hy'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/bhjymxb/sgtzglBhjymxb/list",
          delete: "/bhjymxb/sgtzglBhjymxb/delete",
          deleteBatch: "/bhjymxb/sgtzglBhjymxb/deleteBatch",
          deleteByBatch: "/bhjymxb/sgtzglBhjymxb/deleteByBatch",
          exportXlsUrl: "bhjymxb/sgtzglBhjymxb/exportXls",
          importExcelUrl: "bhjymxb/sgtzglBhjymxb/importExcel",
          exportTemplateUrl:"/bhjymxb/sgtzglBhjymxb/exportTemplateXls",
       },
        exportTemplateName: '保函结余明细表导入模板'
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
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        let tjMoment=""
        let cjrqMoment='';
        let sxrqMoment='';
        let dqrqMoment='';
        let jcrqMoment='';
        if (this.queryParam.fiscalDate) {
          tjMoment=moment(this.queryParam.fiscalDate).format("YYYYMMDD")
        }
        if (this.queryParam.cjrq){
           cjrqMoment=moment(this.queryParam.cjrq).format("YYYYMMDD")
        }
        if (this.queryParam.sxrq){
          sxrqMoment=moment(this.queryParam.sxrq).format("YYYYMMDD")
        }
        if (this.queryParam.dqrq){
          dqrqMoment=moment(this.queryParam.dqrq).format("YYYYMMDD")
        }
        if (this.queryParam.jcrq){
          jcrqMoment=moment(this.queryParam.jcrq).format("YYYYMMDD")
        }

        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.fiscalDate = tjMoment
        param.cjrq=cjrqMoment;
        param.sxrq=sxrqMoment;
        param.dqrq=dqrqMoment;
        param.jcrq=jcrqMoment;
        return filterObj(param)
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>