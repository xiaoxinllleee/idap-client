<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="数据日期">
              <a-date-picker v-model="queryParam.tjyf" placeholder="请选择数据日期"   style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行查询"
                             pid-field="sjzzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.sszh"
                             :sszh="true"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="download" @click="handleExportXls('客户信息报表(支行)')">导出</a-button>
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
       <span slot="sszh" slot-scope="sszh ,record" >
          <a @click="handlesszhEdit(record,'/tjfx/tjbb/khxxbb/xzckhxxbb/XzckhxxbbList')">{{sszh}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zhkhxxbb-modal ref="modalForm" @ok="modalFormOk"></zhkhxxbb-modal>
  </a-card>
</template>

<script>
  import ZhkhxxbbModal from './modules/ZhkhxxbbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import moment from 'moment'

  export default {
    name: "ZhkhxxbbList",
    mixins:[JeecgListMixin],
    components: {
      ZhkhxxbbModal,JTreeSelect
    },
    data () {
      return {
        description: '客户信息报表(支行)管理页面',
        defaultMonthOpera: undefined,
        monthFormat: 'YYYY-MM',
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
          },
		   {
            title: '组织机构',
            align:"center",
            dataIndex: 'sszh_dictText',
            scopedSlots:{customRender:'sszh'}

       },
		   {
            title: '村社数',
            align:"center",
            dataIndex: 'csl'
           },
		   {
            title: '总客户数',
            align:"center",
            dataIndex: 'zkhs'
           },
		   {
            title: '信息完善客户数',
            align:"center",
            dataIndex: 'xxwskhs'
           },
		   {
            title: '信息采集客户数',
            align:"center",
            dataIndex: 'xxcjkhs'
           },
		   {
            title: '累计授信客户数',
            align:"center",
            dataIndex: 'ljsxkhs'
           },
		   {
            title: '本月授信客户数',
            align:"center",
            dataIndex: 'bysxkhs'
           },
		   {
            title: '累计用信客户数',
            align:"center",
            dataIndex: 'ljyxkhs'
           },
		   {
            title: '本月用信客户数',
            align:"center",
            dataIndex: 'byyxkhs'
           },

        ],
		url: {
          list: "/tjfx.tjbb.khxxbb/zhkhxxbb/list",
          delete: "/tjfx.tjbb.khxxbb/zhkhxxbb/delete",
          deleteBatch: "/tjfx.tjbb.khxxbb/zhkhxxbb/deleteBatch",
          exportXlsUrl: "tjfx.tjbb.khxxbb/zhkhxxbb/exportXls",
          importExcelUrl: "tjfx.tjbb.khxxbb/zhkhxxbb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf=='undefined' || params.tjyf==null) && this.flag==true) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
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
        let sszhvalue=this.$route.query.sszh;
        let tjyfvalue=this.$route.query.tjyf;
        console.log(sszhvalue)
        console.log(tjyfvalue)

        if(this.queryParam.tjyf) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        if(tjyfvalue){
          tjrqment=tjyfvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf     = tjrqment;
        if(sszhvalue){
          param.sszh = sszhvalue;
        }
        this.$route.query.sszh=null;
        this.$route.query.tjyf=null;
        return filterObj(param);
      },
      handlesszhEdit: function(record,path) {
        console.log(path);
        console.log(record.sszh);
        this.$router.push({path: path, query: {sszh: record.sszh,tjyf:record.tjyf,xzc:record.xzc}})
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.tjyf != null){
          param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
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

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>