<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据月份">
              <a-month-picker placeholder="请选择数据月份" v-model="queryParam.sjrq"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;"
                              @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贴现日期">
              <a-input placeholder="请输入贴现日期" v-model="queryParam.txrq"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="申请单位">
              <a-input placeholder="请输入申请单位" v-model="queryParam.sqdw"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="承兑行">
                <a-input placeholder="请输入承兑行" v-model="queryParam.cdh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="出票日">
                <a-input placeholder="请输入出票日" v-model="queryParam.cpr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="到期日">
                <a-input placeholder="请输入到期日" v-model="queryParam.dqr"></a-input>
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
      <a-button @click="handleDelete1" icon="delete">删除</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贴现登记簿')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
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
        :scroll="{x : 'max-content'}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
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
    <xtTxdjb-modal ref="modalForm" @ok="modalFormOk"></xtTxdjb-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import XtTxdjbModal from './modules/XtTxdjbModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import {filterObj} from '@/utils/util'
import {deleteAction, getAction} from '@api/manage'
import ExcelImport from '@/components/common/ExcelImport'

export default {
  name: "XtTxdjbList",
  mixins: [JeecgListMixin],
  components: {
    XtTxdjbModal, ExcelImport
  },
  data() {
    return {
      description: '贴现登记簿管理页面',
      monthFormat: 'YYYY-MM',
      defaultMonthOpera: '',
      rq: '',
      // 表头
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
          title: '数据日期',
          align: "center",
          dataIndex: 'sjrq',
          customRender: function (text) {
            return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
          },
          sorter: (a, b) => b.sjrq.replace(/-/g, '/') - a.sjrq.replace(/-/g, '/'),
          width: 100
        },
        {
          title: '贴现日期',
          align: "center",
          dataIndex: 'txrq'
        },
        {
          title: '申请单位',
          align: "center",
          dataIndex: 'sqdw'
        },
        {
          title: '承兑行',
          align: "center",
          dataIndex: 'cdh'
        },
        {
          title: '出票日',
          align: "center",
          dataIndex: 'cpr'
        },
        {
          title: '到期日',
          align: "center",
          dataIndex: 'dqr'
        },
        {
          title: '贴现金额(元)',
          align: "center",
          dataIndex: 'txje'
        },
        {
          title: '剩余天数',
          align: "center",
          dataIndex: 'syts'
        },
        {
          title: '贴现利率',
          align: "center",
          dataIndex: 'txll',
          customRender: function(text) {
            return Number(text).toFixed(6)
          },
        },
        {
          title: '贴现余额(元)',
          align: "center",
          dataIndex: 'txye'
        },
        {
          title: '申请支行',
          align: "center",
          dataIndex: 'sqzh'
        },
        {
          title: '行业',
          align: "center",
          dataIndex: 'hy'
        },
        {
          title: '规模',
          align: "center",
          dataIndex: 'gm'
        },
        {
          title: '分摊后金额(元)',
          align: "center",
          dataIndex: 'fthje'
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
        list: "/xttxdjb/xtTxdjb/list",
        delete: "/xttxdjb/xtTxdjb/delete",
        deleteById:"/xttxdjb/xtTxdjb/deleteById",
        deleteBatch: "/xttxdjb/xtTxdjb/deleteBatch",
        exportXlsUrl: "xttxdjb/xtTxdjb/exportXls",
        importExcelUrl: "xttxdjb/xtTxdjb/importExcel",
        exportTemplateUrl:"/xttxdjb/xtTxdjb/exportTemplateXls",
      },
      exportTemplateName: '贴现登记簿导入模板'
    }
  },
  computed: {},
  methods: {
    excelImport(){
      if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
        this.$message.error("请选择数据月份!")
        return
      }else {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?sjrq=${this.rq}`
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({},this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      }
    },
    searchReset() {
      this.queryParam = {}
      this.isCanExP = false
      this.loadData(1);
    },
    beforeUpload() {
      if (this.queryParam.sjrq){
        this.rq = this.queryParam.sjrq.format("YYYY-MM") + '-01';
      }
    },

    loadData(arg) {
      // this.getCurrentMonth();
      if (!this.url.list) {
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      var params = this.getQueryParams();//查询条件
      /* if ((params.sjrq === undefined || params.sjrq == null)) {
         params.sjrq = this.defaultMonthOpera.format("YYYY-MM") + '-01'
       }*/
      this.loading = true;
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
        }
        this.loading = false;
      })
    },
    getQueryParams() {
      let tjyfMoment = "";
      if (this.queryParam.sjrq) {
        tjyfMoment = this.queryParam.sjrq.format("YYYY-MM") + '-01';
      }
      console.log(tjyfMoment+'====tjyfMoment=====')
      var param = Object.assign({}, this.queryParam, this.isorter);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if (param.sjrq) {
        param.sjrq = tjyfMoment;
      }
      return filterObj(param);
    },
    handleDelete1: function () {
      if(!this.url.delete){
        this.$message.error("请设置url.delete属性!")
        return
      }
      if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null){
        this.$message.error("请选择数据月份!")
        return
      }else {
        this.rq = this.queryParam.sjrq.format("YYYY-MM") + '-01';
        console.log(this.rq)
        var that = this;
        deleteAction(that.url.delete, {sjrq:this.rq}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      }
    },
    handleDelete(id){
      if(!this.url.deleteById){
        this.$message.error("请设置url.deleteById属性!")
        return
      }
      let that = this;
      deleteAction(that.url.deleteById,{'id':id}).then((res)=>{
        if (res.success) {
          that.$message.success(res.message);
          that.loadData();
        } else {
          that.$message.warning(res.message);
        }
      })
    }
  }
}
</script>
<style scoped>
</style>