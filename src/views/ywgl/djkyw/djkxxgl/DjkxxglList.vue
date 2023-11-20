<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.org"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请输入统计月份" v-model="queryParam.tjyf" style="width: 100%"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"></a-month-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.custName"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'djkxxgl:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷记卡信息管理')" v-has="'djkxxgl:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'djkxxgl:import'">导入</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

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
          <a @click="handleEdit(record)" v-has="'djkxxgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'djkxxgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <djkxxgl-modal ref="modalForm" @ok="modalFormOk"></djkxxgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import DjkxxglModal from './modules/DjkxxglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from "@/components/jeecg/JInput"
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import {deleteAction, downFile, getAction} from "@/api/manage";
  import ExcelImport from '@/components/common/ExcelImport'
  import store from '@/store/'
  export default {
    name: "DjkxxglList",
    mixins:[JeecgListMixin],
    components: {
      DjkxxglModal,JTreeSelect,ExcelImport,JInput
    },
    data () {
      return {
        description: '贷记卡信息管理管理页面',
        defaultMonthOpera:'',
        monthFormat:'YYYY-MM',
        // 表头
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
            title: '机构代码',
            align:"center",
            dataIndex: 'org'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'org_dictText'
          },
		   {
            title: '推广人员编号',
            align:"center",
            dataIndex: 'tgh'
           },
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
          {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'custManagerId'
          },
          {
            title: '员工号',
            align:"center",
            dataIndex: 'jobnumber'
          },
		   {
            title: '卡号',
            align:"center",
            dataIndex: 'acctNo'
           },
          {
            title: '种类',
            align:"center",
            dataIndex: 'jzkm'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'ctfcCd'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName'
          },
          {
            title: '余额',
            align:"center",
            dataIndex: 'balance'
          },
          {
            title: '逾期期数',
            align:"center",
            dataIndex: 'yqqs'
          },
		   {
            title: '发放日期',
            align:"center",
            dataIndex: 'putOutDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'maturity'
           },
		   {
            title: '最早欠息日期',
            align:"center",
            dataIndex: 'minCalcDate'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/djkxxgl/djkxxgl/list",
          delete: "/djkxxgl/djkxxgl/delete",
          deleteBatch: "/djkxxgl/djkxxgl/deleteBatch",
          exportXlsUrl: "djkxxgl/djkxxgl/exportXls",
          importExcelUrl: "djkxxgl/djkxxgl/importExcel",
          exportTemplateUrl: "/djkxxgl/djkxxgl/exportTemplateXls",
       },
        exportTemplateName: '贷记卡信息管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      getQueryParams() {
        let tjrqment = "";
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined, org: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.org = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      loadData(arg) {
        // 获取当前月份
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
        }
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
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {acctNo: record.acctNo,tjyf: record.tjyf}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(()=>{
          this.exportLoading = false
          this.loadData(1)
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>