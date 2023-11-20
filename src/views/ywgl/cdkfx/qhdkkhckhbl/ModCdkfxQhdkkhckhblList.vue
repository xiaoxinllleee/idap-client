<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjyf" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('全行贷款客户存款回报率')" v-has="'qhdkkhckhbl:exportXls'">导出</a-button>
      <a-button @click="count" icon="area-chart" v-has="'qhdkkhckhbl:init'">提取</a-button>
    </div>
    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'qhdkkhckhbl:edit'">编辑</a>

          <a-divider type="vertical" />
        <!--  <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'qhdkkhckhbl:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <modCdkfxQhdkkhckhbl-modal ref="modalForm" @ok="modalFormOk"></modCdkfxQhdkkhckhbl-modal>
  </a-card>
</template>

<script>
  import ModCdkfxQhdkkhckhblModal from './modules/ModCdkfxQhdkkhckhblModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { deleteAction, getAction,downFile } from '@/api/manage'
  import {filterObj} from "../../../../utils/util";
  import store from '@/store/'
  export default {
    name: "ModCdkfxQhdkkhckhblList",
    mixins:[JeecgListMixin],
    components: {
      ModCdkfxQhdkkhckhblModal
    },
    data () {
      return {
        description: '全行贷款客户存款回报率管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
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
            title: '统计日期',
            align:"center",
            dataIndex: 'tjyf'
          },
          {
            title: '贷款年日平',
            align:"center",
            dataIndex: 'dknrp'
          },
          {
            title: '存款年日平',
            align:"center",
            dataIndex: 'cknrp'
          },
          {
            title: '存款回报率',
            align:"center",
            dataIndex: 'ckhbl'
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
          },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
           },
		   {
            title: '存款回报率(余额)',
            align:"center",
            dataIndex: 'ckyehbl'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
		url: {
          list: "/qhdkkhckhbl/modCdkfxQhdkkhckhbl/list",
          delete: "/qhdkkhckhbl/modCdkfxQhdkkhckhbl/delete",
          deleteBatch: "/qhdkkhckhbl/modCdkfxQhdkkhckhbl/deleteBatch",
          exportXlsUrl: "qhdkkhckhbl/modCdkfxQhdkkhckhbl/exportXls",
          importExcelUrl: "qhdkkhckhbl/modCdkfxQhdkkhckhbl/importExcel",
      count: "qhdkkhckhbl/modCdkfxQhdkkhckhbl/count",
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
      count(){
        let tjyf = ''
        let params = this.queryParam
        if (this.queryParam.tjyf == null || this.queryParam.tjyf == ''){
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM-DD")
        }else {
          tjyf = moment(params.tjyf).format("YYYY-MM-DD")
        }
        params = {
          tjyf: moment(this.queryParam.tjyf).format("YYYY-MM-DD"),
        }
        this.loading=true
        getAction(this.url.count,params).then((res)=>{
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loading = false
        })
      },
      getQueryParams() {
        let tjrqment = "";
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM-DD");
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
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },

      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
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
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM-DD");
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
          // this.loadData(1)
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>