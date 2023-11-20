<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq"
                             placeholder="请选择开始日期"
                             style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq"
                             placeholder="请选择结束日期"
                             style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label=" 机构代码">
              <j-tree-select placeholder="请选择机构查询" v-model="queryParam.brNo"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM" pid-field="SJYWJGDM" treeNodeFilterProp="title"
                              :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="客户姓名">
                <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="现金流入">
                <a-input-group compact>
                  <a-input style=" width: 40%; text-align: center; "
                           v-model="queryParam.xjlr_begin"
                           placeholder="Min"/>
                  <a-input style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "
                           placeholder="~"
                           disabled />
                  <a-input style="width: 40%; text-align: center; border-left: 0; "
                           v-model="queryParam.xjlr_end"
                           placeholder="Max"/>
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="现金流出">
                <a-input-group compact>
                  <a-input style=" width: 40%; text-align: center; "
                           v-model="queryParam.xjlc_begin"
                           placeholder="Min"/>
                  <a-input style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "
                           placeholder="~"
                           disabled />
                  <a-input style="width: 40%; text-align: center; border-left: 0; "
                           v-model="queryParam.xjlc_end"
                           placeholder="Max"/>
                </a-input-group>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary"
                        @click="searchQuery"
                        icon="search">查询</a-button>
              <a-button @click="searchReset"
                        icon="reload"
                        style="margin-left: 8px">重置</a-button>
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
      <a-button icon="area-chart"
                @click="initData" v-has="'xjlghjcajfp:init'">提取</a-button>
      <a-button icon="download"
                :loading="exportLoading"
                @click="handleExportXls('现金流归行监测（按揭、扶贫）')"
                style="margin-left: 8px" v-has="'xjlghjcajfp:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"/>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkjkptXjlghtjAjfp-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import DkjkptXjlghtjAjfpModal from './modules/DkjkptXjlghtjAjfpModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction,downFile} from '@/api/manage'
  import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';


  export default {
    name: "DkjkptXjlghtjAjfpList",
    mixins:[JeecgListMixin],
    components: {
      DkjkptXjlghtjAjfpModal,
      JSelectDepart,
      JTreeSelect
    },
    data () {
      return {
        description: '现金流归行监测（按揭、扶贫）管理页面',
        // 表头
        columns: [
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
            dataIndex: 'brNo'
          },
		      {
            title: '机构名称',
            align:"center",
            dataIndex: 'brNo_dictText'
          },
		      {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'identNo'
          },
          {
            title: '信贷贷款品种',
            align:"center",
            dataIndex: 'dkpz_dictText'
          },
		      {
            title: '现金流入',
            align:"center",
            dataIndex: 'xjlr'
          },
		      {
            title: '现金流出',
            align:"center",
            dataIndex: 'xjlc'
          }
        ],
		url: {
          list: "/dkjkpt.dkglqsckqsfx.xjlghjcajfp/dkjkptXjlghtjAjfp/list",
          delete: "/dkjkpt.dkglqsckqsfx.xjlghjcajfp/dkjkptXjlghtjAjfp/delete",
          deleteBatch: "/dkjkpt.dkglqsckqsfx.xjlghjcajfp/dkjkptXjlghtjAjfp/deleteBatch",
          exportXlsUrl: "dkjkpt.dkglqsckqsfx.xjlghjcajfp/dkjkptXjlghtjAjfp/exportXls",
          importExcelUrl: "dkjkpt.dkglqsckqsfx.xjlghjcajfp/dkjkptXjlghtjAjfp/importExcel",
          init:"/dkjkpt.dkglqsckqsfx.xjlghjcajfp/dkjkptXjlghtjAjfp/extract",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      initData() {
        var params = this.queryParam;
        if( params.ksrq==null || params.jsrq==null || params.ksrq=='undefined'){
          this.$message.error("开始日期或者结束日期不能为空!")
          return
        }
        let ksrqstr=params.ksrq.format("YYYYMMDD");
        let jsrqstr=params.jsrq.format("YYYYMMDD");
        //let formData = Object.assign(ksrqstr, jsrqstr);
        this.loading=true;
        putAction(this.url.init, {"ksrq":ksrqstr,"jsrq":jsrqstr},'put').then((res) => {
          if(res.success){
            this.$message.success(res.message);
            this.loadData(1)
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading=false;

        })
      },


      getQueryParams(){
        let tjrqment = "";
        let jsrq=" ";
        if(this.queryParam.ksrq) {
          tjrqment = this.queryParam.ksrq.format("YYYY-MM-DD");
        }
        if(this.queryParam.jsrq) {
          jsrq = this.queryParam.jsrq.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.ksrq     = tjrqment;
        param.jsrq     = jsrq;
        return filterObj(param);
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }

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