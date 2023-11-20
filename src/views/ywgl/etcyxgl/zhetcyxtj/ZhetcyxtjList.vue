<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" @click="handleExportXls('支行etc营销统计')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="area-chart" @click="init">提取</a-button>
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
        rowKey="id"
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
    <zhetcyxtj-modal ref="modalForm" @ok="modalFormOk"></zhetcyxtj-modal>
  </a-card>
</template>

<script>
  import ZhetcyxtjModal from './modules/ZhetcyxtjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "@/utils/util";
  import {getAction} from "@/api/manage";
  import moment from 'moment'

  export default {
    name: "ZhetcyxtjList",
    mixins:[JeecgListMixin],
    components: {
      ZhetcyxtjModal
    },
    data () {
      return {
        description: '支行etc营销统计管理页面',
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
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf'
           },
		   {
            title: '所属机构代码',
            align:"center",
            dataIndex: 'jgdm'
           },
          {
            title: '所属机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
		   {
            title: 'ETC总户数',
            align:"center",
            dataIndex: 'etczhs'
           },
		   {
            title: 'ETC开户数',
            align:"center",
            dataIndex: 'etckhs'
           },
		   {
            title: 'ETC销户数',
            align:"center",
            dataIndex: 'etcxhs'
           },
		   {
            title: 'ETC净增数',
            align:"center",
            dataIndex: 'etcjzs'
           },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrczy'
           },
		   /*{
            title: 'ETC期初户数',
            align:"center",
            dataIndex: 'etcqchs'
           },
		   {
            title: 'ETC期末户数',
            align:"center",
            dataIndex: 'etcqmhs'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/zhetcyxtj/zhetcyxtj/list",
          delete: "/zhetcyxtj/zhetcyxtj/delete",
          deleteBatch: "/zhetcyxtj/zhetcyxtj/deleteBatch",
          exportXlsUrl: "zhetcyxtj/zhetcyxtj/exportXls",
          importExcelUrl: "zhetcyxtj/zhetcyxtj/importExcel",
          init: "/zhetcyxtj/zhetcyxtj/init",
       },
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
      searchReset() {
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },
      init(){
        if (!this.queryParam.tjyf){
          this.$message.warning("统计月份不能为空！");
          return
        }
        if (this.queryParam.tjyf){
          this.queryParam.tjyf = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        getAction(this.url.init,this.queryParam).then((res)=>{
          if(res.code===500){
            this.$message.warning(res.message,5)
          }else if (res.code===200){
            this.$message.success(res.message)
          }
        });
      },

      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjyf) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>