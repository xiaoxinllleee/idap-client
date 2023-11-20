<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq" placeholder="开始日期" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq" placeholder="结束日期" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="定活标识">
          <a-select placeholder="请选择定活标识" v-model="queryParam.savingFlag">
            <a-select-option value="1">
              活期
            </a-select-option>
            <a-select-option value="2">
              定期
            </a-select-option>
          </a-select>
              </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('财政保险应付利息明细')" v-has="'czbxyflxmx:exportXls'">导出</a-button>
      <a-button icon="area-chart" @click="init" v-has="'czbxyflxmx:init'">提取</a-button>

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

        <span slot="zjhm" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="ckzh" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import { downFile, getAction } from '@/api/manage'
  import moment from 'moment'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import JInput from "@/components/jeecg/JInput"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {postAction} from "@/api/manage";
  import {notification} from "ant-design-vue";
  import store from '@/store/'

  export default {
    name: "CzbxyflxmxList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,JEllipsis,JInput
    },
    data () {
      return {
        description: '财政保险应付利息明细管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
        queryParam:{
          ksrq:undefined,
          jsrq:undefined,
        },
        flag: true,
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
            title: '开始日期',
            align:"center",
            dataIndex: 'ksrq'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'jsrq'
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },

		   {
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh',
            scopedSlots: {customRender: 'ckzh'},
            width: 200
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 180
           },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
           },
		   {
            title: '累计利息',
            align:"center",
            dataIndex: 'ljlx'
           },
		   {
            title: '定活标识',
            align:"center",
            dataIndex: 'savingFlag_dictText'
           },
		   {
            title: '科目号',
            align:"center",
            dataIndex: 'subjNo'
           },
		   {
            title: '科目名称',
            align:"center",
            dataIndex: 'subjName'
           },
		   /*{
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
           },*/
        ],
		url: {
          list: "/czbxyflxmx/czbxyflxmx/list",
          delete: "/czbxyflxmx/czbxyflxmx/delete",
          deleteBatch: "/czbxyflxmx/czbxyflxmx/deleteBatch",
          exportXlsUrl: "czbxyflxmx/czbxyflxmx/exportXls",
          importExcelUrl: "czbxyflxmx/czbxyflxmx/importExcel",
          init: "/czbxyflxmx/czbxyflxmx/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      this.getCurrentDate()
    },
    methods: {
      getCurrentDate() {
        let curDate = new Date()
        this.defaultMonthOpera = moment(curDate,this.monthFormat)
        this.queryParam.ksrq = this.defaultMonthOpera;
        this.queryParam.jsrq = this.defaultMonthOpera;
      },
      init(){
        if (this.queryParam.ksrq === undefined || this.queryParam.ksrq === "") {
          notification.warning({message: '系统提示', description: '请选择开始日期！', duration: 4})
          return false
        }
        if (this.queryParam.jsrq === undefined || this.queryParam.jsrq === "") {
          notification.warning({message: '系统提示', description: '请选择结束日期！', duration: 4})
          return false
        }
        let params = {
          ksrq: moment(this.queryParam.ksrq).format("YYYY-MM-DD"),
          jsrq: moment(this.queryParam.jsrq).format("YYYY-MM-DD")
        }
        this.loading = true
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
            this.loadData(1)
          } else {
            notification.warning({message: '系统提示', description: '提取失败！'+res.message, duration: 4})
          }
        }).catch((error) => {
          notification.warning({message: '系统提示', description: '提取失败，请联系系统管理员！' + error, duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = Object.assign({},this.queryParam);
        let ksrq=''
        let jsrq=''
        if (this.queryParam.ksrq !== null && this.queryParam.ksrq !== undefined){
          ksrq = moment(this.queryParam.ksrq).format("YYYY-MM") + "-01";
        }
        if (this.queryParam.jsrq !== null && this.queryParam.jsrq !== undefined){
          param.jsrq = moment(this.queryParam.jsrq).format("YYYY-MM") + "-01";
        }
        param.ksrq=ksrq
        param.jsrq=jsrq
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey']=this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading=true
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
          this.exportLoading=false
        })
      },
      getQueryParams() {
        let tjrqmentB = ''
        let tjrqmentE = ''
        if (this.queryParam.ksrq) {
          tjrqmentB = this.queryParam.ksrq.format('YYYY-MM-DD')
        }
        if (this.queryParam.jsrq) {
          tjrqmentE = this.queryParam.jsrq.format('YYYY-MM-DD')
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.ksrq = tjrqmentB
        param.jsrq = tjrqmentE
        return filterObj(param)
      },
      searchReset() {
        this.queryParam = {jgdm:'',ksrq :undefined,jsrq :undefined};
        this.queryParam.jgdm = ""
        if (!store.getters.isRoot){
          this.queryParam.jgdm=store.getters.ywjgdm
        }
        this.queryParam.ksrq = this.defaultMonthOpera;
        this.queryParam.jsrq = this.defaultMonthOpera;
        this.loadData(1);
      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.ksrq != undefined && params.ksrq != null)) {
          params.ksrq = moment(params.ksrq).format("YYYY-MM-DD");
        }
        if ((params.jsrq != undefined && params.jsrq != null)) {
          params.jsrq = moment(params.jsrq).format("YYYY-MM-DD");
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
            this.loading = false;
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