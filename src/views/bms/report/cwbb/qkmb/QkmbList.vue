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
            <a-form-item label="期初借方余额">
              <a-input placeholder="请输入期初借方余额" v-model="queryParam.qcjfye"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="期初贷方余额">
              <a-input placeholder="请输入期初贷方余额" v-model="queryParam.qcdfye"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('1104财务报表-全科目表')">导出</a-button>
     <!-- <a-upload name="file"  :showUploadList="false" :multiple="false" :headers="tokenHeader" >
          <a-button type="primary" icon="import" @click="importExcelUrl">导入</a-button>
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
    <qkmb-modal ref="modalForm" @ok="modalFormOk"></qkmb-modal>
  </a-card>
</template>

<script>
  import QkmbModal from './modules/QkmbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction, getAction } from '@api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'

  export default {
    name: "QkmbList",
    mixins:[JeecgListMixin],
    components: {
      QkmbModal,ExcelImport
    },
    data () {
      return {
        description: '1104财务报表-全科目表管理页面',
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
            title: '期初借方余额',
            align:"center",
            dataIndex: 'qcjfye'
           },
		   {
            title: '期初贷方余额',
            align:"center",
            dataIndex: 'qcdfye'
           },
		   {
            title: '本期借方发生额',
            align:"center",
            dataIndex: 'bqjffse'
           },
		   {
            title: '本期贷方发生额',
            align:"center",
            dataIndex: 'bqdffse'
           },
		   {
            title: '期末借方余额',
            align:"center",
            dataIndex: 'qmjfye'
           },
		   {
            title: '期末贷方余额',
            align:"center",
            dataIndex: 'qmdfye'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/qkmb/qkmb/list",
          delete: "/qkmb/qkmb/delete",
          deleteBatch: "/qkmb/qkmb/deleteBatch",
          exportXlsUrl: "qkmb/qkmb/exportXls",
          importExcelUrl: "qkmb/qkmb/importExcel",
          exportTemplateUrl: "/qkmb/qkmb/exportTemplateXls",
       },
        exportTemplateName: '全科目表导入模板'
    }
  },
    computed: {
       /* importExcelUrl(){
                return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?sjrq=${this.rq}`;
            },*/
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
        if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == null){
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