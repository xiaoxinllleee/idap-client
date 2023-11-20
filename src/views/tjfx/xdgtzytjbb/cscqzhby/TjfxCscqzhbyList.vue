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
                             style="width: 230px;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq"
                             placeholder="请选择结束日期"
                             style="width: 230px;"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="行政村（居委会）">
              <j-dict-select-tag
                v-model="queryParam.xzc"
                placeholder="请选择行政村查询"
                dictCode="v_yxdygl_czxxgl,VILLAGE,VILLAGE"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

          <!--<a-col :md="6" :sm="8">
            <a-form-item label="行政村（居委会）">
              <j-input placeholder="请输入行政村名称" v-model="queryParam.xzc" type="like" ></j-input>
            </a-form-item>
          </a-col>-->
        <template v-if="toggleSearchStatus">

          </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('村社村前统计支行表一')">导出</a-button>
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
        :scroll="{ x: 3500 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxCscqzhby-modal ref="modalForm" @ok="modalFormOk"></tjfxCscqzhby-modal>
  </a-card>
</template>

<script>
  import TjfxCscqzhbyModal from './modules/TjfxCscqzhbyModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import JInput from "../../../../components/jeecg/JInput.vue";


  export default {
    name: "TjfxCscqzhbyList",
    mixins:[JeecgListMixin],
    components: {
      TjfxCscqzhbyModal,JInput
    },
    data () {
      return {
        description: '村社村前统计支行表一管理页面',
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
            title: '行政村（居委会）',
            align:"center",
            dataIndex: 'xzc'
           },
		   {
            title: '村民（居民）小组个数',
            align:"center",
            dataIndex: 'cmxzgs'
           },
		   {
            title: '辖内农户（居民）户数',
            align:"center",
            dataIndex: 'xnnhhs'
           },
		   {
            title: '辖内商户户数',
            align:"center",
            dataIndex: 'xnshhs'
           },
		   {
            title: '辖内企业户数',
            align:"center",
            dataIndex: 'xnqyhs'
           },
		   {
            title: '本周农户（居民）户数',
            align:"center",
            dataIndex: 'bznhhs'
           },
		   {
            title: '累计农户（居民）户数',
            align:"center",
            dataIndex: 'ljnhhs'
           },
		   {
            title: '本周商户户数',
            align:"center",
            dataIndex: 'bzshhs'
           },
		   {
            title: '累计商户户数',
            align:"center",
            dataIndex: 'ljshhs'
           },
		   {
            title: '本周企业户数',
            align:"center",
            dataIndex: 'bzqyhs'
           },
		   {
            title: '累计企业户数',
            align:"center",
            dataIndex: 'ljqyhs'
           },
		   {
            title: '本周合计户数',
            align:"center",
            dataIndex: 'bzhjhs'
           },
		   {
            title: '累计合计户数',
            align:"center",
            dataIndex: 'ljhjhs'
           },
		   {
            title: '本周采集信息',
            align:"center",
            dataIndex: 'bzcjxx'
           },
		   {
            title: '累计采集信息',
            align:"center",
            dataIndex: 'ljcjxx'
           },
		   {
            title: '本周评级户数',
            align:"center",
            dataIndex: 'bzpjhs'
           },
		   {
            title: '累计评级户数',
            align:"center",
            dataIndex: 'ljpjhs'
           },
		   {
            title: '本周授信金额',
            align:"center",
            dataIndex: 'bzsxje'
           },
		   {
            title: '累计授信金额',
            align:"center",
            dataIndex: 'ljsxje'
           },
		   {
            title: '本周用信金额',
            align:"center",
            dataIndex: 'bzyxje'
           },
		   {
            title: '累计用信金额',
            align:"center",
            dataIndex: 'ljyxje'
           },
		   {
            title: '本周整组评级授信完成个数',
            align:"center",
            dataIndex: 'bzzzpjsxwcgs'
           },
		   {
            title: '累计整组评级授信完成个数',
            align:"center",
            dataIndex: 'ljzzpjsxwcgs'
           },
        ],
		url: {
          list: "/tjfx.xdgtzytjbb.cscqzhby/tjfxCscqzhby/list",
          delete: "/tjfx.xdgtzytjbb.cscqzhby/tjfxCscqzhby/delete",
          deleteBatch: "/tjfx.xdgtzytjbb.cscqzhby/tjfxCscqzhby/deleteBatch",
          exportXlsUrl: "tjfx.xdgtzytjbb.cscqzhby/tjfxCscqzhby/exportTemplateXls",
          importExcelUrl: "tjfx.xdgtzytjbb.cscqzhby/tjfxCscqzhby/importExcel",
          init:"/tjfx.xdgtzytjbb.cscqzhby/tjfxCscqzhby/extract"

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
          this.$message.error("开始日期或者接受日期不能为空!")
          return
        }

        let ksrqstr=params.ksrq.format("YYYYMMDD");
        let jsrqstr=params.jsrq.format("YYYYMMDD");
        //let formData = Object.assign(ksrqstr, jsrqstr);
        this.loading = true;
        putAction(this.url.init, {"ksrq":ksrqstr,"jsrq":jsrqstr},'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.ksrq != null ){
          param.ksrq=param.ksrq.format("YYYY-MM-DD")
        }
        if (param.jsrq != null){
          param.jsrq=param.jsrq.format("YYYY-MM-DD")
        }
        console.log("导出参数",param)
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
        })
      },

      getQueryParams(){
        let tjrqment = "";
        let jsrq = " ";
        if(this.queryParam.ksrq != null) {
          tjrqment = this.queryParam.ksrq.format("YYYY-MM-DD");
        }
        if (this.queryParam.jsrq !=null){
          jsrq     = this.queryParam.jsrq.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.ksrq     = tjrqment;
        param.jsrq     = jsrq;
        return filterObj(param);
      },


    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>