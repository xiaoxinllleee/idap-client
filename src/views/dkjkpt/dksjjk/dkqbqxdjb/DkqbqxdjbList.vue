<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.sjrq" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <a-input placeholder="请输入开户机构" v-model="queryParam.khjg"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款类型">
              <a-input placeholder="请输入贷款类型" v-model="queryParam.dklx"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款欠本欠息登记簿')">导出</a-button>
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
        <!--  <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />-->
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
         <!-- <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>

              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete" />
    <!-- 表单区域 -->
    <dkqbqxdjb-modal ref="modalForm" @ok="modalFormOk"></dkqbqxdjb-modal>
  </a-card>
</template>

<script>
  import DkqbqxdjbModal from './modules/DkqbqxdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import { deleteAction, getAction } from '@api/manage'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'

  export default {
    name: "DkqbqxdjbList",
    mixins:[JeecgListMixin],
    components: {
      DkqbqxdjbModal,ExcelImport
    },
    data () {
      return {
        description: '贷款欠本欠息登记簿管理页面',
        monthFormat: 'YYYY-MM',
        rq:'',
        // 默认当前月份
        defaultMonthOpera: undefined,
        isorter: {
          columns: 'sjrq',
          order: 'desc'
        },
        // 表头
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
            title: '统计月份',
            align: 'center',
            dataIndex: 'sjrq',
            width: 120,
            customRender: function(text) {
              return !text ? '' : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/')
          },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '最后交易日',
            align:"center",
            dataIndex: 'zhjyr'
           },
		   {
            title: '贷款金额（元）',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '期数',
            align:"center",
            dataIndex: 'qs'
           },
		   {
            title: '结欠本金（元）',
            align:"center",
            dataIndex: 'jqbj'
           },
		   {
            title: '结欠利息（元）',
            align:"center",
            dataIndex: 'jqlx'
           },
		   {
            title: '结欠罚息（元）',
            align:"center",
            dataIndex: 'jqfx'
           },
		   {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr'
           },
		   {
            title: '主客户经理',
            align:"center",
            dataIndex: 'zkhjl'
           },
		   {
            title: '贷款类型',
            align:"center",
            dataIndex: 'dklx'
           },
		   {
            title: '计息起始日',
            align:"center",
            dataIndex: 'jxqsr'
           },
		   {
            title: '计息终止日',
            align:"center",
            dataIndex: 'jxzzr'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkqbqxdjb/dkqbqxdjb/list",
          delete: "/dkqbqxdjb/dkqbqxdjb/delete",
          deleteBatch: "/dkqbqxdjb/dkqbqxdjb/deleteBatch",
          deleteBatchAll: "/dkqbqxdjb/dkqbqxdjb/deleteBatchAll",
          exportXlsUrl: "dkqbqxdjb/dkqbqxdjb/exportXls",
          importExcelUrl: "dkqbqxdjb/dkqbqxdjb/importExcel",
          exportTemplateUrl: 'dkqbqxdjb/dkqbqxdjb/exportTemplateXls',
       },
        exportTemplateName: '贷款欠本欠息登记簿导入模板'
    }
  },
  computed: {
  /*  importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
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
      beforeUpload() {
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYY-MM") + '-01';
        }
      },
      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { khjg: record.khjg,zjhm:record.zjhm,zh:record.zh,dklx:record.dklx }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      loadData (arg) {
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        console.info(params)
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
            this.loading = false
          } else {
            this.dataSource = []
            this.ipagination.total = 0
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
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
          deleteAction(that.url.deleteBatchAll, {sjrq:this.rq}).then((res) => {
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