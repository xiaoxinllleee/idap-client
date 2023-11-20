<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="会计日期">
              <a-month-picker placeholder="请选择会计日期" v-model="queryParam.fiscalDate"
                              :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择开户机构"
                             v-model="queryParam.khjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款户名">
              <a-input placeholder="请输入贷款户名" v-model="queryParam.dkhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="便民卡卡号">
                <a-input placeholder="请输入便民卡卡号" v-model="queryParam.bmkkh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款账号">
                <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="企业规模">
                <a-input placeholder="请输入企业规模" v-model="queryParam.qygm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款期限">
                <a-input placeholder="请输入贷款期限" v-model="queryParam.dkqx"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户类型">
                <a-select placeholder="请选择客户类型" v-model="queryParam.khlx">
                  <a-select-option value="1">个体工商户</a-select-option>
                  <a-select-option value="2">小微企业</a-select-option>
                </a-select>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款发放登记簿')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
<!--      <a-button @click="handleDelete1" icon="delete">根据日期删除</a-button>-->
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
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <sgtzglDkffdjb-modal ref="modalForm" @ok="modalFormOk"></sgtzglDkffdjb-modal>
  </a-card>
</template>

<script>
import SgtzglDkffdjbModal from './modules/SgtzglDkffdjbModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import ExcelImport from '@comp/common/ExcelImport'
import moment from 'moment'
import {filterObj} from '@/utils/util'
import {deleteAction} from '@api/manage'

export default {
  name: "SgtzglDkffdjbList",
  mixins: [JeecgListMixin],
  components: {
    SgtzglDkffdjbModal, JTreeSelect, ExcelImport
  },
  data() {
    return {
      description: '贷款发放登记簿（月）管理页面',
      // 表头
      monthFormat: 'YYYY-MM',
      // 默认当前月份
      defaultMonthOpera: '',
      rq: '',
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '会计日期',
          align: "center",
          dataIndex: 'fiscalDate'
        },
        {
          title: '开户机构',
          align: "center",
          dataIndex: 'khjg_dictText'
        },
        {
          title: '贷款户名',
          align: "center",
          dataIndex: 'dkhm'
        },
        {
          title: '证件号码',
          align: "center",
          dataIndex: 'zjhm'
        },
        {
          title: '便民卡卡号',
          align: "center",
          dataIndex: 'bmkkh'
        },
        {
          title: '贷款账号',
          align: "center",
          dataIndex: 'dkzh'
        },
        {
          title: '产品名称',
          align: "center",
          dataIndex: 'cpmc'
        },
        {
          title: '担保方式',
          align: "center",
          dataIndex: 'dbfs'
        },
        {
          title: '借款日期',
          align: "center",
          dataIndex: 'jkrq'
        },
        {
          title: '到期日期',
          align: "center",
          dataIndex: 'dqrq'
        },
        {
          title: '利率',
          align: "center",
          dataIndex: 'll'
        },
        {
          title: '放款账号',
          align: "center",
          dataIndex: 'fkzh'
        },
        {
          title: '发放金额（元）',
          align: "center",
          dataIndex: 'ffje'
        },
        {
          title: '第一责任人',
          align: "center",
          dataIndex: 'dyzrr'
        },
        {
          title: '主客户经理',
          align: "center",
          dataIndex: 'zkhjl'
        },
        {
          title: '放款渠道',
          align: "center",
          dataIndex: 'fkqd'
        },
        {
          title: '贷款投向',
          align: "center",
          dataIndex: 'dktx'
        },
        {
          title: '贷款投向1',
          align: "center",
          dataIndex: 'dktx1'
        },
        {
          title: '贷款投向2',
          align: "center",
          dataIndex: 'dktx2'
        },
        {
          title: '企业规模',
          align: "center",
          dataIndex: 'qygm'
        },
        {
          title: '贷款期限',
          align: "center",
          dataIndex: 'dkqx'
        },
        {
          title: '单户授信额度',
          align: "center",
          dataIndex: 'dhsxed'
        },
        {
          title: '客户类型',
          align: "center",
          dataIndex: 'khlx',
          customRender: function(text) {
            if (text!=null && text!='' && text!=undefined) {
              if (text==1){
                return '个体工商户';
              }else if(text==2){
                return '小微企业'
              }else{
                return '其他'
              }
            }
          }
        },
        {
          title: '授信标识',
          align: "center",
          dataIndex: 'sxbs'
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
        list: "/Dkffdjb/sgtzglDkffdjb/list",
        delete: "/Dkffdjb/sgtzglDkffdjb/delete",
        deleteBatch: "/Dkffdjb/sgtzglDkffdjb/deleteBatch",
        deleteByBatch: "/Dkffdjb/sgtzglDkffdjb/deleteByBatch",
        exportXlsUrl: "Dkffdjb/sgtzglDkffdjb/exportXls",
        importExcelUrl: "Dkffdjb/sgtzglDkffdjb/importExcel",
        exportTemplateUrl: "/Dkffdjb/sgtzglDkffdjb/exportTemplateXls",
      },
      exportTemplateName: '贷款发放登记簿（月）导入模板'
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  methods: {
    handleDelete1: function () {
      if (!this.url.delete) {
        this.$message.error("请设置url.delete属性!")
        return
      }
      if (this.queryParam.fiscalDate == undefined && this.queryParam.fiscalDate == null) {
        this.$message.error("请选择数据日期!")
        return
      } else {
        this.rq = this.queryParam.fiscalDate.format("YYYYMM") + "01";
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

    beforeUpload() {
      if (this.queryParam.fiscalDate) {
        this.rq = this.queryParam.fiscalDate.format("YYYYMM") + "01";
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
        tjMoment = this.queryParam.fiscalDate.format("YYYYMM") + "01"
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.fiscalDate = tjMoment
      return filterObj(param)
    },
    handleDelete(record) {
      deleteAction(this.url.delete, {fiscalDate: record.fiscalDate, dkzh: record.dkzh}).then((res) => {
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