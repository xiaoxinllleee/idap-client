<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据月份">
              <a-month-picker placeholder="请选择数据月份" v-model="queryParam.sjrq"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input placeholder="请输入机构名称" v-model="queryParam.jgdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款帐号">
              <a-input placeholder="请输入贷款帐号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="注册证件号">
              <a-input placeholder="请输入注册证件号" v-model="queryParam.zczjhm"></a-input>
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
      <a-button @click="handleDelete1" icon="delete">删除</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('湘潭贷款全明细')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"  @change="handleImportExcel">
        <a-button type="primary" icon="import" >导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport">导入</a-button>
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
        :scroll="{x : 4500}"
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
    <xtdkqmx-modal ref="modalForm" @ok="modalFormOk"></xtdkqmx-modal>
  </a-card>
</template>

<script>
  import XtdkqmxModal from './modules/XtdkqmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction, getAction } from '@api/manage'
  import { filterObj } from '@/utils/util'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "XtdkqmxList",
    mixins:[JeecgListMixin],
    components: {
      XtdkqmxModal,ExcelImport
    },
    data () {
      return {
        description: '湘潭贷款全明细管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
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
            title: '数据月份',
            align:"center",
            dataIndex: 'sjrq',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.sjrq.replace(/-/g, '/') - a.sjrq.replace(/-/g, '/'),
            width: 100
          },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
		   {
            title: '贷款帐号',
            align:"center",
            dataIndex: 'dkzh'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmz'
           },
		   {
            title: '注册证件号',
            align:"center",
            dataIndex: 'zczjhm'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
           },
		   {
            title: '本金余额',
            align:"center",
            dataIndex: 'bjye'
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
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
           },
		   {
            title: '上次结息日',
            align:"center",
            dataIndex: 'scjxq'
           },
		   {
            title: '贷款年利率%',
            align:"center",
            dataIndex: 'dknll'
           },
		   {
            title: '五级分类状态',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '逾期天数',
            align:"center",
            dataIndex: 'yqts'
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
            title: '详细地址',
            align:"center",
            dataIndex: 'xxdz'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh'
           },
		   {
            title: '借款人性质分类',
            align:"center",
            dataIndex: 'jkrxzfl'
           },
		   {
            title: '借款人性质分类1',
            align:"center",
            dataIndex: 'jkrxzfl1'
           },
		   {
            title: '借款人性质分类2',
            align:"center",
            dataIndex: 'jkrxzfl2'
           },
		   {
            title: '借款人性质分类3',
            align:"center",
            dataIndex: 'jkrxzfl3'
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
            title: '贷款品种',
            align:"center",
            dataIndex: 'dkpz'
           },
		   {
            title: '期限分类',
            align:"center",
            dataIndex: 'qxfl'
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
            title: '借款人行业分类',
            align:"center",
            dataIndex: 'jkrhyfl'
           },
		   {
            title: '借款人行业分类1',
            align:"center",
            dataIndex: 'jkrhyfl1'
           },
		   {
            title: '借款人行业分类2',
            align:"center",
            dataIndex: 'jkrhyfl2'
           },
		   {
            title: '借款人行业分类3',
            align:"center",
            dataIndex: 'jkrhyfl3'
           },
		   {
            title: '逾期日期',
            align:"center",
            dataIndex: 'yqrq'
           },
		   {
            title: '借据号',
            align:"center",
            dataIndex: 'jhj'
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
          list: "/xtdkqmx/xtdkqmx/list",
          delete: "/xtdkqmx/xtdkqmx/delete",
          deleteBatch: "/xtdkqmx/xtdkqmx/deleteBatch",
          exportXlsUrl: "xtdkqmx/xtdkqmx/exportXls",
          importExcelUrl: "xtdkqmx/xtdkqmx/importExcel",
          exportTemplateUrl: "/xtdkqmx/xtdkqmx/exportTemplateXls",
       },
        exportTemplateName: '贷款全明细导入模板'
    }
  },
  computed: {
    /*importExcelUrl: function(){

      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?sjrq=${this.rq}`;
    }*/
  },
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
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.sjrq) {
          param.sjrq = tjyfMoment;
        }
        return filterObj(param);
      },

      handle(info){
        console.log(this.rq,"rq")
        console.log(this.sjrq,"sjrq")
        console.log(this.info,"info")
        if (this.queryParam.sjrq == null && this.queryParam.sjrq == undefined){
          this.$message.error("请选择数据日期!")
          return
        }else {

        }

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
          deleteAction(that.url.deleteBatch, {sjrq:this.rq}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>