<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf"
                             placeholder="请选择统计月份"
                             style="width: 100%;" :defaultValue="defaultMonthOpera" :format="monthFormat"/>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('全行授信用信统计')">导出</a-button>
    <!--  <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
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
        <span slot="action" slot-scope="text,record">
          <a href="javascript:;" @click="handlesszhEdit(record,'/tjfx/sxsjmx/tjfx_khsxyxtj_zhmx/Tjfx_khsxyxtj_zhmxList')">详情</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfx_khsxyxtj_qh-modal ref="modalForm" @ok="modalFormOk"></tjfx_khsxyxtj_qh-modal>
  </a-card>
</template>

<script>
  import Tjfx_khsxyxtj_qhModal from './modules/Tjfx_khsxyxtj_qhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import { filterObj } from '@/utils/util';
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import moment from 'moment'
  export default {
    name: "Tjfx_khsxyxtj_qhList",
    mixins:[JeecgListMixin],
    components: {
      Tjfx_khsxyxtj_qhModal,JInput,JTreeSelect
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          column: 'tjyf',
          order: 'desc',
        },
        columns: [
		   {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
         customRender:function (text) {
           return !text ? "" : (text.length>7 ? text.substr(0,7) : text)
         },
         sorter: true,
           },
		   {
            title: '授信额度',
            align:"center",
            dataIndex: 'sxed'
           },
		   {
            title: '用信额度',
            align:"center",
            dataIndex: 'yxed'
           },
		   {
            title: '预授信额度',
            align:"center",
            dataIndex: 'ysxed'
           },
          {
            title: '预授信户数',
            align:"center",
            dataIndex: 'ysxhs'
          },
          {
            title: '用信户数',
            align:"center",
            dataIndex: 'yxhs'
          },
          {
            title: '总户数',
            align:"center",
            dataIndex: 'zhs'
          },
          {
            title: '授信户数',
            align:"center",
            dataIndex: 'sxhs'
          },
          {
            title: '授信工作',
            align:"center",
            dataIndex: 'sxgzpyrs'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/tjfx_khsxyxtj_qh/tjfx_khsxyxtj_qh/list",
          delete: "/tjfx_khsxyxtj_qh/tjfx_khsxyxtj_qh/delete",
          deleteBatch: "/tjfx_khsxyxtj_qh/tjfx_khsxyxtj_qh/deleteBatch",
          exportXlsUrl: "tjfx_khsxyxtj_qh/tjfx_khsxyxtj_qh/exportXls",
          importExcelUrl: "tjfx_khsxyxtj_qh/tjfx_khsxyxtj_qh/importExcel",
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
        this.defaultMonthOpera = moment(curDate);
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

      handleExportXls(fileName){
        var param = this.getQueryParams();//查询条件
        if ((param.tjyf=='undefined' || param.tjyf==null) && this.flag==true) {
          param.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        //let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        // if (param.tjyf != null){
        //   param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
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
      handlesszhEdit: function(record,path) {
        console.log(path);
        console.log(record.sszh);
        this.$router.push({path: path, query: {sszh: record.sszh,tjyf:record.tjyf}})
      },
      getQueryParams(){
        let ksrqment = "";
        let sszhvalue=this.$route.query.sszh;
        let ksrqvalue=this.$route.query.tjyf;
        console.log(sszhvalue)


        if(this.queryParam.tjyf) {
          ksrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        if(ksrqvalue){
          ksrqment=ksrqvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf     = ksrqment;
        if(sszhvalue){
          param.sszh = sszhvalue;
        }
        this.$route.query.sszh=null;
        this.$route.query.tjyf=null;
        return filterObj(param);
      },
      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading = true;
        putAction("/tjfx_khsxyxtj_qh/tjfx_khsxyxtj_qh/extract", 'TJYF='+tjyfstr,'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
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