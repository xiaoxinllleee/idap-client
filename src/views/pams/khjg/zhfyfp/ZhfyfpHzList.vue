<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="分配月份">
              <a-month-picker placeholder="请选择分配月份" v-model="queryParam.fpyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标志">
              <j-tree-select placeholder="请选择组织机构"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="hr_bas_organization, zzjc, zzbz"
                             getAllZzjg="1"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="费用类型">
              <j-dict-select-tag placeholder="请选择费用类型" v-model="queryParam.fylx" dict-code="fylx"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('支行费用分配')" v-has="'ZhfyfpHz:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'ZhfyfpHz:imp'">导入</a-button>
      <a-button  @click="initData" v-has="'ZhfyfpHz:init'">提取</a-button>

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
          <a @click="handleFp(record)" v-has="'ZhfyfpHz:fp'">分配</a>
           <a-divider type="vertical" />
          <a @click="handleEdit(record)" v-has="'ZhfyfpHz:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'ZhfyfpHz:del'">删除</a>
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
    <zhfyfpHz-modal ref="modalForm" @ok="modalFormOk"></zhfyfpHz-modal>
    <zhfyfp-hz-fp-modal ref="modalForm2" @ok="modalFormOk"></zhfyfp-hz-fp-modal>
  </a-card>
</template>

<script>
  import ZhfyfpHzModal from './modules/ZhfyfpHzModal'
  import ZhfyfpHzFpModal from './modules/ZhfyfpHzFpModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import { getAction } from '@/api/manage'
  import ExcelImport from '@comp/common/ExcelImport'
  import {extractZhfy} from '@/api/api'

  export default {
    name: "ZhfyfpHzList",
    mixins:[JeecgListMixin],
    components: {
      ZhfyfpHzModal,JTreeSelect,ExcelImport,ZhfyfpHzFpModal
    },
    data () {
      return {
        description: '支行费用分配管理页面',
        monthFormat: 'YYYY-MM',
        flag:true,
        // 默认当前月份
        defaultMonthOpera: undefined,
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
            title: '分配月份',
            align:"center",
            dataIndex: 'fpyf'
           },
		   {
            title: '组织标志',
            align:"center",
            dataIndex: 'zzbz'
           },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
		   {
            title: '费用类型',
            align:"center",
            dataIndex: 'fylx_dictText'
           },
		   {
            title: '总金额',
            align:"center",
            dataIndex: 'zje'
           },
		   {
            title: '已分配金额',
            align:"center",
            dataIndex: 'yfpje'
           },
		   {
            title: '未分配金额',
            align:"center",
            dataIndex: 'dfpje'
           },
		   {
            title: '分配状态',
            align:"center",
            dataIndex: 'fpzt_dictText'
           },
		   {
            title: '提交状态',
            align:"center",
            dataIndex: 'tjzt_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zhfyfp/zhfyfpHz/list",
          delete: "/zhfyfp/zhfyfpHz/delete",
          deleteBatch: "/zhfyfp/zhfyfpHz/deleteBatch",
          exportXlsUrl: "zhfyfp/zhfyfpHz/exportXls",
          importExcelUrl: "zhfyfp/zhfyfpHz/importExcel",
          exportTemplateUrl:"/zhfyfp/zhfyfpHz/exportTemplateXls",
      },
         exportTemplateName: '支行费用分配导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },

    methods: {
      moment,
      handleFp: function (record) {
        this.$refs.modalForm2.edit(record)
        this.$refs.modalForm2.init(record)
        this.$refs.modalForm2.title = '分配'
        this.$refs.modalForm2.disableSubmit = false
      },

      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1 }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        console.log(111)
        if(!this.url.list){
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
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.fpyf) {
          tjrqment = this.queryParam.fpyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.fpyf) {
          param.fpyf = tjrqment;
        }
        return filterObj(param);
      },
      initData(){
        if(!this.queryParam.fpyf) {
          this.$message.error('请选择分配月份',5)
          return;
        }
        if(!this.queryParam.fylx) {
          this.$message.error('请选择费用类型',5)
          return;
        }
        extractZhfy({fpyf:this.queryParam.fpyf,fylx:this.queryParam.fpyf}).then((res) => {
          if (res.success) {
            this.$message.success(res.message,5)
            this.loadData();
          } else {
            this.$message.warning(res.message,5)
          }
        });
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>