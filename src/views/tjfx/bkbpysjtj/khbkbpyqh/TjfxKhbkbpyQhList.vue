<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button type="primary" icon="download" @click="handleExportXls('客户背靠背评议_全行')">导出</a-button>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
         <span slot="detail" slot-scope="text, record">
          <a @click="handleDetailToZh(record, '/tjfx/bkbpysjtj/Khbkbpyzh/TjfxKhbkbpyZhList')">支行详情</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxKhbkbpyQh-modal ref="modalForm" @ok="modalFormOk"></tjfxKhbkbpyQh-modal>
  </a-card>
</template>

<script>
  import TjfxKhbkbpyQhModal from './modules/TjfxKhbkbpyQhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import { getAction, putAction, httpAction, downFile } from '@/api/manage'
  import moment from 'moment'
  export default {
    name: "TjfxKhbkbpyQhList",
    mixins:[JeecgListMixin],
    components: {
      TjfxKhbkbpyQhModal,JTreeSelect,JInput
    },
    data () {
      return {
        description: '客户背靠背评议_全行管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          column: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            width: 100,
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
		   {
            title: '评议户数',
            align:"center",
            dataIndex: 'pyhs'
           },
		   {
            title: '其中电子评议人数',
            align:"center",
            dataIndex: 'qzdzpyrs'
           },
		   {
            title: '其中纸质评议人数',
            align:"center",
            dataIndex: 'qzzzpyrs'
           },
		   {
            title: '其中开会评议人数',
            align:"center",
            dataIndex: 'qzhypyrs'
           },
		   {
            title: '其中电话评议人数',
            align:"center",
            dataIndex: 'qzdhpyrs'
           },
		   {
            title: '其中微信评议人数',
            align:"center",
            dataIndex: 'qzwxpyrs'
           },
          {
            title: '详情',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'detail' },
          }

        ],
		url: {
          list: "/tjfx.bkbpysjtj.khbkbpyqh/tjfxKhbkbpyQh/list",
          delete: "/tjfx.bkbpysjtj.khbkbpyqh/tjfxKhbkbpyQh/delete",
          deleteBatch: "/tjfx.bkbpysjtj.khbkbpyqh/tjfxKhbkbpyQh/deleteBatch",
          exportXlsUrl: "tjfx.bkbpysjtj.khbkbpyqh/tjfxKhbkbpyQh/exportXls",
          importExcelUrl: "tjfx.bkbpysjtj.khbkbpyqh/tjfxKhbkbpyQh/importExcel",
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
      getQueryParams() {
        let tjyfMoment = "";
        let tjyfValue  = this.$route.query.tjyf;
        let sszhValue  = this.$route.query.sszh;
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        if (tjyfValue) {
          tjyfMoment = tjyfValue;
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf = tjyfMoment;
        if (sszhValue) {
          param.sszh = sszhValue;
        }
        return filterObj(param);
      },
      searchReset() {
        this.flag = false
        this.$route.query.tjyf = null
        this.$route.query.sszh = null
        this.$route.query.xzc = null
        this.queryParam = {}
        this.loadData(1)
      },
      handleDetailToZh: function(record, path) {
        this.$router.push({
          path: path,
          query: {
            tjyf: record.tjyf, sszh: record.sszh,
            szc: record.xzc, xzz: record.xzz
          }
        })
      },
      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading = true;
        putAction("/tjfx.bkbpysjtj.khbkbpyqh/tjfxKhbkbpyQh/extract", 'TJYF='+tjyfstr,'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      handleExportXls(fileName) {
        var param = this.getQueryParams();//查询条件
        if ((param.tjyf=='undefined' || param.tjyf==null) && this.flag==true) {
          param.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        //let param = { ...this.queryParam }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        // if (param.tjyf != null) {
        //   param.tjyf = param.tjyf.format('YYYY-MM') + '-01'
        // }
        console.log('导出参数', param)
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>