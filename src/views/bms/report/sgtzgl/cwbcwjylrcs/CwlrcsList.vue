<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" style="width: 100%;" :format="yearFormat" @change="changeDay"
                             v-model="queryParam.fiscalDate"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <a-input placeholder="请输入机构代码" v-model="queryParam.jgdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" :loading="exportLoading"
                @click="handleExportXls('财务部_手工台账_经营利润测算')">导出
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
        :scroll="{ x : 'max-content' }"
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
    <cwlrcs-modal ref="modalForm" @ok="modalFormOk"></cwlrcs-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import CwlrcsModal from './modules/CwlrcsModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import ExcelImport from '@comp/common/ExcelImport'
import {deleteAction} from "../../../../../api/manage";
import {filterObj} from "../../../../../utils/util";

export default {
  name: "CwlrcsList",
  mixins: [JeecgListMixin],
  components: {
    CwlrcsModal, ExcelImport
  },
  data() {
    return {
      yearFormat: 'YYYY-MM-DD',
      rq: '',
      description: '财务部_手工台账_经营利润测算管理页面',
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
          dataIndex: 'fiscalDate',
          customRender: function (text) {
            return !text ? "" : text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(6, 2)
          },
        },
        {
          title: '机构名称',
          align: "center",
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '年初村行存款日平',
          align: "center",
          dataIndex: 'ncchckrp'
        },
        {
          title: '月末村行存款日平',
          align: "center",
          dataIndex: 'ymchckrp'
        },
        {
          title: '年初国际业务存款日平',
          align: "center",
          dataIndex: 'ncgjywckrp'
        },
        {
          title: '月末国际业务存款日平',
          align: "center",
          dataIndex: 'ymgjywckrp'
        },
        {
          title: '总部分摊手续费收入（不含税）',
          align: "center",
          dataIndex: 'zbftsxfsrbhs'
        },
        {
          title: '6403其他税金',
          align: "center",
          dataIndex: 'qtsj'
        },
        {
          title: '总部分摊手续费支出',
          align: "center",
          dataIndex: 'zbftsxfzc'
        },
        {
          title: '支行费用台账计算',
          align: "center",
          dataIndex: 'zhfytzjs'
        },
        {
          title: '6602其他业务支出科目',
          align: "center",
          dataIndex: 'qtywzckm'
        },
        {
          title: '6711营业外支出科目',
          align: "center",
          dataIndex: 'yywzckm'
        },
        {
          title: '报批费用',
          align: "center",
          dataIndex: 'bpfy'
        },
        {
          title: '经营利润任务',
          align: "center",
          dataIndex: 'jylrrw'
        },
        {
          title: '库存现金日均余额(外折人)',
          align: "center",
          dataIndex: 'kcxjrjye'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          fixed: "right",
          scopedSlots: {customRender: 'action'},
        }
      ],
      url: {
        list: "/report/sgtzgl/cwbcwjylrcs/cwlrcs/list",
        delete: "/report/sgtzgl/cwbcwjylrcs/cwlrcs/delete",
        deleteBatch: "/report/sgtzgl/cwbcwjylrcs/cwlrcs/deleteBatch",
        deleteByBatch: "/report/sgtzgl/cwbcwjylrcs/cwlrcs/deleteByBatch",
        exportXlsUrl: "report/sgtzgl/cwbcwjylrcs/cwlrcs/exportXls",
        importExcelUrl: "report/sgtzgl/cwbcwjylrcs/cwlrcs/importExcel",
        exportTemplateUrl: "/report/sgtzgl/cwbcwjylrcs/cwlrcs/exportTemplateXls",
      },
      exportTemplateName: '财务经营利润测试导入模板'
    }
  },
  methods: {
    changeDay() {
      if (this.queryParam.fiscalDate) {
        this.rq = this.queryParam.fiscalDate.format("YYYYMMDD");
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
      if (this.queryParam.fiscalDate) {
        tjMoment = this.queryParam.fiscalDate.format("YYYYMMDD");
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.fiscalDate = tjMoment
      return filterObj(param)
    },
    handleDelete1: function () {
      if (!this.url.deleteByBatch) {
        this.$message.error("请设置url.delete属性!")
        return
      }
      if (this.queryParam.fiscalDate == undefined && this.queryParam.fiscalDate == null) {
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
    excelImport() {
      if (this.queryParam.fiscalDate == undefined || this.queryParam.fiscalDate == '') {
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
      deleteAction(this.url.delete, {'fiscalDate': record.fiscalDate, 'jgdm': record.jgdm}).then((res) => {
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