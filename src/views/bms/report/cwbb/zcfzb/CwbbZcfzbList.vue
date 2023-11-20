<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-month-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资产">
              <a-input placeholder="请输入资产" v-model="queryParam.zc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="行次">
              <a-input placeholder="请输入行次" v-model="queryParam.hc1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="期末余额">
              <a-input placeholder="请输入期末余额" v-model="queryParam.zcqmye"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="年初余额">
              <a-input placeholder="请输入年初余额" v-model="queryParam.zcncye"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('财务报表资产负债表')">导出</a-button>
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
<!--          <a @click="handleEdit(record)">编辑</a>-->

             <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>

      <!--    <a-divider type="vertical" />
          <a-dropdown>
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
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <cwbbZcfzb-modal ref="modalForm" @ok="modalFormOk"></cwbbZcfzb-modal>
  </a-card>
</template>

<script>
  import cwbbZcfzbModal from './modules/CwbbZcfzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction, getAction } from '@api/manage'
  import { filterObj } from '@/utils/util'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "cwbbZcfzbList",
    mixins:[JeecgListMixin],
    components: {
      cwbbZcfzbModal,ExcelImport
    },
    data () {
      return {
        description: '财务报表资产负债表管理页面',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq',
        customRender: function (text) {
          return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
        },
        sorter: (a, b) => b.sjrq.replace(/-/g, '/') - a.sjrq.replace(/-/g, '/'),
        width: 100
          },
		  {
            title: '资产',
            align:"center",
            dataIndex: 'zc'
          },
		  {
            title: '行次',
            align:"center",
            dataIndex: 'hc1'
          },
		  {
            title: '期末余额',
            align:"center",
            dataIndex: 'zcqmye'
          },
		  {
            title: '年初余额',
            align:"center",
            dataIndex: 'zcncye'
          },
		  {
            title: '负债和所有者权益(或股东权益)',
            align:"center",
            dataIndex: 'fzhsyzqy'
          },
		  {
            title: '行次',
            align:"center",
            dataIndex: 'hc2'
          },
		  {
            title: '期末余额',
            align:"center",
            dataIndex: 'fzqmye'
          },
		  {
            title: '年初余额',
            align:"center",
            dataIndex: 'fzncye'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zcfzb/cwbbZcfzb/list",
          delete: "/zcfzb/cwbbZcfzb/delete",
          deleteBatch: "/zcfzb/cwbbZcfzb/deleteBatch",
          exportXlsUrl: "zcfzb/cwbbZcfzb/exportXls",
          importExcelUrl: "zcfzb/cwbbZcfzb/importExcel",
          exportTemplateUrl:"/zcfzb/cwbbZcfzb/exportTemplateXls",
        },
        exportTemplateName: '财务报表资产负债表导入模板'
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      beforeUpload() {
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYY-MM")+'-01';
        }
      },
      handleDelete(record) {
        deleteAction(this.url.delete, {sjrq: record.sjrq, zc: record.zc}).then((res) => {
          if (res.success) {
            this.$message.success("删除成功！");
            this.searchReset()
          }
        })
      },
      handleDelete1: function () {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null){
          this.$message.error("请选择数据日期!")
          return
        }else {
          this.rq = this.queryParam.sjrq.format("YYYY-MM")+'-01';
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
      excelImport(){
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
      },
      searchReset() {
        this.queryParam = {}
        this.isCanExP = false
        this.loadData(1);
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

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
