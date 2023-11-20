<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="数据日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择数据日期"   style="width: 100%;"/>
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
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户潜在业务报表(全行)')">导出</a-button>
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
        :scroll="{ x: 2200 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="detail" slot-scope="text, record">
          <a @click="handleSszhEdit(record, '/tjfx/tjbb/khqzywbb/ZhkhqzywbbList')">详情</a>
        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util';
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import moment from 'moment'



  export default {
    name: "QhkhywbbList",
    mixins:[JeecgListMixin],
    components: {
    },
    data () {
      return {
        description: '客户潜在业务报表(全行)',
        // 表头
        columns: [
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'tjrq'
           },
          {
            title: '总潜在客户数',
            align:"center",
            dataIndex: 'qzzhs'
          },
          {
            title: '潜在办理贷款业务客户数',
            align:"center",
            dataIndex: 'qzdkhs'
          },
          {
            title: '潜在办理存款业务客户数',
            align:"center",
            dataIndex: 'qzckhs'
          },
          {
            title: '潜在办理网上银行客户数',
            align:"center",
            dataIndex: 'qzwsyhhs'
          },
          {
            title: '潜在办理手机银行客户数',
            align:"center",
            dataIndex: 'qzsjyhhs'
          },
          {
            title: '潜在办理ETC客户数',
            align:"center",
            dataIndex: 'qzetchs'
          },
          {
            title: '潜在办理E支付客户数',
            align:"center",
            dataIndex: 'qzezfhs'
          },
          {
            title: '潜在办理E缴费客户数',
            align:"center",
            dataIndex: 'qzejfhs'
          },
          {
            title: '潜在办理POS机客户数',
            align:"center",
            dataIndex: 'qzposhs'
          },
          {
            title: '潜在办理助农终端客户数',
            align:"center",
            dataIndex: 'qzznzdhs'
          },
          {
            title: '潜在办理理财业务客户数',
            align:"center",
            dataIndex: 'qzlchs'
          },
          {
            title: '潜在办理代理保险业务客户数',
            align:"center",
            dataIndex: 'qzbxhs'
          },
          {
            title: '详情',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'detail' },
          },
        ],
        url: {
          list: "/tjfx.tjbb.khqzywbb/qhkhqzywbb/list",
          delete: "/tjfx.tjbb.khqzywbb/qhkhqzywbb/delete",
          deleteBatch: "/tjfx.tjbb.khqzywbb/qhkhqzywbb/deleteBatch",
          exportXlsUrl: "tjfx.tjbb.khqzywbb/qhkhqzywbb/exportXls",
          importExcelUrl: "tjfx.tjbb.khqzywbb/qhkhqzywbb/importExcel",
          init:"/tjfx.tjbb.khqzywbb/qhkhqzywbb/extract",
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
      initData() {
        this.loading = true;
        putAction(this.url.init,'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        let tjrqMoment = "";
        if(this.queryParam.tjrq) {
          tjrqMoment = this.queryParam.tjrq.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq   = tjrqMoment;
        }
        return filterObj(param);
      },
      handleSszhEdit: function(record,path) {
        this.$router.push({
          path: path,
          query: { tjrq: record.tjrq },
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
        if (param.tjrq != null){
          param.tjrq=param.tjrq.format("YYYY-MM")+'-01'}
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