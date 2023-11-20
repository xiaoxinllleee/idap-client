<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报表类型">
              <j-dict-select-tag  v-model="queryParam.bblx" placeholder="请选择报表类型"
                                  dictCode="rep_bblx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报表时间">
<!--              <a-input placeholder="请输入报表月份" v-model="queryParam.bbyf"></a-input>-->
              <a-date-picker v-if="queryParam.bblx=='4'" placeholder="请选择报表时间" v-model="queryParam.bbyf"  allowClear/>
              <a-month-picker v-else placeholder="请选择报表时间" v-model="queryParam.bbyf"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报表编号">
              <a-input placeholder="请输入报表编号" v-model="queryParam.bbbh"></a-input>
            </a-form-item>
          </a-col>

        <!--<template v-if="toggleSearchStatus">-->
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">-->
            <!--<a-form-item label="报表路径">-->
              <!--<a-input placeholder="请输入报表路径" v-model="queryParam.bblj"></a-input>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
          <!--</template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">-->
                <!--{{ toggleSearchStatus ? '收起' : '展开' }}-->
                <!--<a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--</a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">创建</a-button>
      <a-button icon="download" @click="handleExportXls('报表数据管理')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>

      <a-button icon="download" :loading="downLoading" @click="downloadAll">全部下载</a-button>


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
          <a @click="initOneReport(record)">重新生成</a>
          <a-divider type="vertical" />
          <a @click="downloadFile(record)">下载</a>
          <a-divider type="vertical" />
          <a @click="previewFile(record)">预览</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-divider type="vertical" />-->
          <!--<a-dropdown>-->
            <!--<a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
            <!--<a-menu slot="overlay">-->
              <!--<a-menu-item>-->
                <!---->
              <!--</a-menu-item>-->
            <!--</a-menu>-->
          <!--</a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <bbsjgl-modal ref="modalForm" @ok="modalFormOk"></bbsjgl-modal>
    <bbsjgl-preview-modal ref="previewModal"></bbsjgl-preview-modal>
  </a-card>
</template>

<script>
  import BbsjglModal from './modules/BbsjglModal'
  import BbsjglPreviewModal from './modules/BbsjglPreviewModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { downFile, getAction, postAction } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import moment from "moment"

  export default {
    name: "BbsjglList",
    mixins:[JeecgListMixin],
    components: {
      BbsjglModal, BbsjglPreviewModal
    },
    data () {
      return {
        downLoading:false,
        description: '报表数据管理管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
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
            title: '报表时间',
            align:"center",
            dataIndex: 'bbyf'
           },
		   {
            title: '报表编号',
            align:"center",
            dataIndex: 'bbbh'
           },
		   {
            title: '报表名称',
            align:"center",
            dataIndex: 'bbmc'
           },
          {
            title: '报表类型',
            align:"center",
            dataIndex: 'bblx_dictText'
          },
          {
            title: '时间类型',
            align:"center",
            dataIndex: 'sjlx_dictText'
          },
          {
            title: '创建人',
            align:"center",
            dataIndex: 'createBy'
          },
          {
            title: '创建时间',
            align:"center",
            dataIndex: 'createTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/bbgl/vBbsjgl/list",
          delete: "/bbgl/vBbsjgl/delete",
          initOneReport:"/bbgl/bbsjgl/initOneReport",
          create: "/bbgl/bbsjgl/create",
          deleteBatch: "/bbgl/vBbsjgl/deleteBatch",
          exportXlsUrl: "bbgl/vBbsjgl/exportXls",
          importExcelUrl: "bbgl/vBbsjgl/importExcel",
          downloadAllUrl:"/bbgl/bbsjgl/downloadAll",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      previewFile(row) {
        this.$refs['previewModal'].preview(row)
      },
      downloadFile(row){
        console.log('downloadFile', row)
        let fileName = row.bbmc
        downFile('/sys/common/downloadReport/' + row.bblj, {}).then((data)=>{
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

      initOneReport: function (record) {
        let params = {}
        params.bbyf = moment(record.bbyf).format("YYYY-MM") + '-01';
        if (record.bblx == '4') {
          //周报
          params.bbyf = moment(record.bbyf).format("YYYY-MM-DD")
        }
        params.bbbhStr = record.bbbh
        this.loading = true
        postAction(this.url.create, params).then((res)=>{
          if(res.success){
            this.loadData();
            this.$message.success("操作成功！");
          }else {
            this.$message.error("操作失败！");
          }
        }).finally(() => {
          this.loading = false
        })
      },
      downloadAll: function () {
        console.log(this.queryParam.bbyf)
        if(this.queryParam.bbyf==undefined||this.queryParam.bbyf==null||this.queryParam.bbyf==""){
          return this.$message.warning("请选择报表月份！");
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
        this.downLoading = true;
        getAction(this.url.downloadAllUrl, params).then((res) => {
          if (res.success) {
            console.log(res.result)
            downFile('/sys/common/downloadReportByFileName', {fileName:res.result}).then((data)=>{
              if (!data) {
                this.$message.error("文件下载失败")
                return
              }
              var blob = new Blob([data]);
              if('msSaveOrOpenBlob' in navigator){
                window.navigator.msSaveOrOpenBlob(blob, res.result);
                return;
              }
              var eleLink = document.createElement('a');
              eleLink.download = res.result;
              eleLink.style.display = 'none'
              eleLink.href = URL.createObjectURL(blob);
              document.body.appendChild(eleLink);
              eleLink.click();
              document.body.removeChild(eleLink);
              this.exportLoading=false
            })

            this.downLoading = false;
          }else{
            this.$message.error(res.message,5);
            this.downLoading = false;
          }
        })
      },
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.bbyf) {
          tjyfMoment = this.queryParam.bbyf.format("YYYY-MM") + '-01';
          if (this.queryParam.bblx == '4') {
            tjyfMoment = this.queryParam.bbyf.format("YYYY-MM-DD")
          }
        }
        console.log(tjyfMoment+'====tjyfMoment=====')
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.bbyf) {
          param.bbyf = tjyfMoment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>