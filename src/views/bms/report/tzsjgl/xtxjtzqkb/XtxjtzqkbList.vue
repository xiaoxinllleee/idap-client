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
            <a-form-item label="债券代码">
              <a-input placeholder="请输入债券代码" v-model="queryParam.zjdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="债券名称">
              <a-input placeholder="请输入债券名称" v-model="queryParam.zjmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="债券票面利率">
              <a-input placeholder="请输入债券票面利率" v-model="queryParam.zjpmll"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="票面金额（元）">
              <a-input placeholder="请输入票面金额" v-model="queryParam.pmjey"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="票面金额（万元）">
              <a-input placeholder="请输入票面金额" v-model="queryParam.pmjewy"></a-input>
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
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('湘潭现券投资情况表')">导出</a-button>
      <a-button  icon="import" @click="excelImport">导入</a-button>
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
        :scroll="{x : 3600}"
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
    <xtxjtzqkb-modal ref="modalForm" @ok="modalFormOk"></xtxjtzqkb-modal>
  </a-card>
</template>

<script>
  import XtxjtzqkbModal from './modules/XtxjtzqkbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction, getAction } from '@api/manage'
  import { filterObj } from '@/utils/util'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "XtxjtzqkbList",
    mixins:[JeecgListMixin],
    components: {
      XtxjtzqkbModal,ExcelImport
    },
    data () {
      return {
        description: '湘潭现券投资情况表管理页面',
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
            title: '债券代码',
            align:"center",
            dataIndex: 'zjdm'
           },
		   {
            title: '债券名称',
            align:"center",
            dataIndex: 'zjmc'
           },
		   {
            title: '债券票面利率',
            align:"center",
            dataIndex: 'zjpmll'
           },
		   {
            title: '票面金额（元）',
            align:"center",
            dataIndex: 'pmjey'
           },
		   {
            title: '当前账面余额（元)',
            align:"center",
            dataIndex: 'dqzmjey'
           },
		   {
            title: '计提应收利息余额（元）',
            align:"center",
            dataIndex: 'jtyslxyey'
           },

		   {
            title: '计提减值准备（元）',
            align:"center",
            dataIndex: 'jzzb'
           },
		   {
            title: '应计提减值准备（万元）',
            align:"center",
            dataIndex: 'yjtjzzb'
           },
		   {
            title: '已计提减值',
            align:"center",
            dataIndex: 'yjtjz'
           },
		   {
            title: '账面余额合计（元）',
            align:"center",
            dataIndex: 'zmyehjy'
           },
		   {
            title: '账面余额合计（万元）',
            align:"center",
            dataIndex: 'zmyehjwy'
           },
		   {
            title: '债券类别',
            align:"center",
            dataIndex: 'zjlb'
           },
		   {
            title: '发行主体1',
            align:"center",
            dataIndex: 'fhzt1'
           },
		   {
            title: '发行主体2',
            align:"center",
            dataIndex: 'fhzt2'
           },
		   {
            title: '会计分类',
            align:"center",
            dataIndex: 'kjfl'
           },
		   {
            title: '买入日',
            align:"center",
            dataIndex: 'mrr'
           },
		   {
            title: '交易对手方（季度填写，报银监）',
            align:"center",
            dataIndex: 'jydsf'
           },
		   {
            title: '基准日',
            align:"center",
            dataIndex: 'jzr'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'dqr'
           },
		   {
            title: '剩余期限（天）',
            align:"center",
            dataIndex: 'syxq'
           },
		   {
            title: '剩余年数',
            align:"center",
            dataIndex: 'syns'
           },
		   {
            title: '剩余月数',
            align:"center",
            dataIndex: 'syys'
           },
		   {
            title: '评级',
            align:"center",
            dataIndex: 'pj'
           },
		   {
            title: '湖南地区',
            align:"center",
            dataIndex: 'dq'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '是否涉政',
            align:"center",
            dataIndex: 'shsz'
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
          list: "/xtxjtzqkb/xtxjtzqkb/list",
          delete: "/xtxjtzqkb/xtxjtzqkb/delete",
          deleteBatch: "/xtxjtzqkb/xtxjtzqkb/deleteBatch",
          exportXlsUrl: "xtxjtzqkb/xtxjtzqkb/exportXls",
          importExcelUrl: "xtxjtzqkb/xtxjtzqkb/importExcel",
          exportTemplateUrl: "/xtxjtzqkb/xtxjtzqkb/exportTemplateXls",
       },
        exportTemplateName: '现券投资情况表导入模板'
    }
  },
  computed: {
   /* importExcelUrl: function(){
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
        this.isCanExP = false
        this.loadData(1);
      },
      beforeUpload() {
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYY-MM") + '-01';
          this.isCanExP = true
        }else {
          this.isCanExP = false
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