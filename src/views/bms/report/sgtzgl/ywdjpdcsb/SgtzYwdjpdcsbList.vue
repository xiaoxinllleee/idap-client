<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目代号">
              <a-input placeholder="请输入项目代号" v-model="queryParam.xmdh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名称" v-model="queryParam.xmmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数值">
              <a-input placeholder="请输入参数值" v-model="queryParam.csz"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('业务等级评定参数表')">导出</a-button>
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
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
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
    <sgtzYwdjpdcsb-modal ref="modalForm" @ok="modalFormOk"></sgtzYwdjpdcsb-modal>
  </a-card>
</template>

<script>
  import SgtzYwdjpdcsbModal from './modules/SgtzYwdjpdcsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'
  import { deleteAction } from '@api/manage'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'

  export default {
    name: "SgtzYwdjpdcsbList",
    mixins:[JeecgListMixin],
    components: {
      SgtzYwdjpdcsbModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '业务等级评定参数表管理页面',
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
            dataIndex: 'sjrq'
           },
		   {
            title: '项目代号',
            align:"center",
            dataIndex: 'xmdh'
           },
		   {
            title: '项目名称',
            align:"center",
            dataIndex: 'xmmc'
           },
		   {
            title: '参数值',
            align:"center",
            dataIndex: 'csz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/ywdjpdcsb/sgtzYwdjpdcsb/list",
          delete: "/ywdjpdcsb/sgtzYwdjpdcsb/delete",
          deleteBatch: "/ywdjpdcsb/sgtzYwdjpdcsb/deleteBatch",
          deleteByBatch: "/ywdjpdcsb/sgtzYwdjpdcsb/deleteByBatch",
          exportXlsUrl: "ywdjpdcsb/sgtzYwdjpdcsb/exportXls",
          importExcelUrl: "ywdjpdcsb/sgtzYwdjpdcsb/importExcel",
          exportTemplateUrl:"/ywdjpdcsb/sgtzYwdjpdcsb/exportTemplateXls",
       },
        exportTemplateName: '业务等级评定参数表导入模板'
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
        if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null){
          this.$message.error("请选择数据日期!")
          return
        }else {
          this.rq = this.queryParam.sjrq.format("YYYY-MM-DD");
          console.log(this.rq)
          var that = this;
          deleteAction(that.url.deleteByBatch, {sjrq:this.rq}).then((res) => {
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
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYYMMDD");
        }
      },

  /*    excelImport(){
        if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
          this.$message.error("请选择数据日期!")
          return
        }else {
          let params = {}
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?sjrq=${this.rq}`
          params.exportTemplateName = this.exportTemplateName
          var param = Object.assign({},this.queryParam, params);
          this.$refs.excelImportModal.showModal(param);
        }
      },*/
      searchReset() {
        this.queryParam = {}
        this.loadData(1);
      },
      handleDelete(record) {
        deleteAction(this.url.delete, {sjrq: record.sjrq, xmdh: record.xmdh}).then((res) => {
          if (res.success) {
            this.$message.success("删除成功！");
            this.searchReset()
          }
        })
      },
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        let tjMoment=""
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        if (this.queryParam.sjrq) {
          tjMoment=moment(this.queryParam.sjrq).format("YYYY-MM-DD")
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.sjrq = tjMoment
        return filterObj(param)
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>