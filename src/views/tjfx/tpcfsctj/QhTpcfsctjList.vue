<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="图片编码">
            <a-input placeholder="请输入图片编码" v-model="queryParam.md5"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleInit" icon="area-chart" v-has="'QhTpcfsctj:init'">提取</a-button>
      <a-button icon="download" @click="handleQhExportXls('全行图片重复上传')" v-has="'QhTpcfsctj:exp'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
        <span slot="image" slot-scope="text, record">
          <img :src="getImgView(record.fwlj)" preview style="width:100px; height:100px"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="viewDetail(record)" v-has="'QhTpcfsctj:view'">查看详情</a>
          <a-divider type="vertical" />
          <a @click="exportDetail(record)" v-has="'QhTpcfsctj:expDetail'">导出详情</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <tpcfsctj-modal ref="tpcfsctjModal" />
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import TpcfsctjModal from './modules/TpcfsctjModal'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  export default {
    name: "QhTpcfsctjList",
    mixins:[JeecgListMixin],
    components: {
      TpcfsctjModal
    },
    data () {
      return {
        description: '全行图片重复上传统计',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        // 表头
        isAll: false,
        sszh :'',
        xzcOptions: [],
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '图片',
            align: "center",
            dataIndex: 'fwlj',
            scopedSlots: { customRender: 'image' },
          },
          {
            title: '图片编码',
            align: "center",
            dataIndex: 'md5',
          },
          {
            title: '重复上传户数',
            align: "center",
            dataIndex: 'cfschs',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/tjfx/tpcfsctj/list",
          init: "/tjfx/tpcfsctj/init",
          exportXlsUrl: "/tjfx/tpcfsctj/exportDetail",
          exportQhXlsUrl: "/tjfx/tpcfsctj/exportQhXls",
        },
      }
    },
    created(){
    },
    methods: {
      handleInit: function() {
        this.loading = true;
        getAction(this.url.init, {}).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData(1);
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      viewDetail(record) {
        this.$refs['tpcfsctjModal'].init(record, 1)
      },
      exportDetail(record) {
        let fileName = "图片重复上传详情"
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {}
        param.md5 = record.md5
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
      handleQhExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        downFile(this.url.exportQhXlsUrl,param).then((data)=>{
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