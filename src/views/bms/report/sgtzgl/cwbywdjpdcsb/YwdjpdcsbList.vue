<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq" style="width: 100%;" :format="dayFormat" @change="changeDay"/>
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
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" :loading="exportLoading"
                @click="handleExportXls('财务部_手工台账_业务等级评定参数表')">导出
      </a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-button @click="handleDelete1" icon="delete">根据日期删除</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
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

    <!-- 表单区域 -->
    <ywdjpdcsb-modal ref="modalForm" @ok="modalFormOk"></ywdjpdcsb-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import YwdjpdcsbModal from './modules/YwdjpdcsbModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import ExcelImport from '@comp/common/ExcelImport'
import {deleteAction} from "../../../../../api/manage";
import {filterObj} from "../../../../../utils/util";

export default {
  name: "YwdjpdcsbList",
  mixins: [JeecgListMixin],
  components: {
    YwdjpdcsbModal, ExcelImport
  },
  data() {
    return {
      description: '财务部_手工台账_业务等级评定参数表管理页面',
      dayFormat: 'YYYY-MM-DD',
      rq:'',
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
          title: '数据日期',
          align: "center",
          dataIndex: 'sjrq',
          customRender:function (text) {
            return !text?"": text.substr(0,4)+"-"+text.substr(4,2)+"-"+text.substr(6,2)
          },
        },
        {
          title: '项目代号',
          align: "center",
          dataIndex: 'xmdh'
        },
        {
          title: '项目名称',
          align: "center",
          dataIndex: 'xmmc'
        },
        {
          title: '参数值',
          align: "center",
          dataIndex: 'csz'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          scopedSlots: {customRender: 'action'},
        }
      ],
      url: {
        list: "/report/sgtzgl/cwbywdjpdcsb/ywdjpdcsb/list",
        delete: "/report/sgtzgl/cwbywdjpdcsb/ywdjpdcsb/delete",
        deleteBatch: "/report/sgtzgl/cwbywdjpdcsb/ywdjpdcsb/deleteBatch",
        deleteByBatch: "/report/sgtzgl/cwbywdjpdcsb/ywdjpdcsb/deleteByBatch",
        exportXlsUrl: "report/sgtzgl/cwbywdjpdcsb/ywdjpdcsb/exportXls",
        importExcelUrl: "report/sgtzgl/cwbywdjpdcsb/ywdjpdcsb/importExcel",
        exportTemplateUrl: "/report/sgtzgl/cwbywdjpdcsb/ywdjpdcsb/exportTemplateXls",
      },
      exportTemplateName: '业务等级评定参数表导入模板'
    }
  },
  methods: {
    changeDay(){
      if (this.queryParam.sjrq){
        this.rq=this.queryParam.sjrq.format("YYYYMMDD");
      }
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1);
    },
    getQueryParams() {
      //获取查询条件
      let sqp = {}
      let tjMoment = ""
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      if (this.queryParam.sjrq) {
        tjMoment = this.queryParam.sjrq.format("YYYYMMDD");
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.sjrq = tjMoment
      return filterObj(param)
    },
    handleDelete1: function () {
      if (!this.url.delete) {
        this.$message.error("请设置url.delete属性!")
        return
      }
      if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null) {
        this.$message.error("请选择数据日期!")
        return
      } else {
        console.log(this.rq)
        var that = this;
        deleteAction(that.url.deleteByBatch, {fiscalDate: this.rq}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.searchReset()
          } else {
            that.$message.warning(res.message);
          }
        });
      }
    },
    excelImport(){
      if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
        this.$message.error("请选择数据日期!")
        return
      } else {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rq}`
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      }
    },
    handleDelete(record) {
      deleteAction(this.url.delete, {fiscalDate: record.sjrq, xmdh: record.xmdh}).then((res) => {
        if (res.success) {
          this.$message.success("删除成功！");
          this.searchReset()
        }
      })
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>