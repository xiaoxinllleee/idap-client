<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjrq" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="金额区间">
              <a-select placeholder="请选择金额区间" v-model="queryParam.jeqj">
                <a-select-option value="1">
                  <50万
                </a-select-option>
                <a-select-option value="2">
                  其中:小额农贷
                </a-select-option>
                <a-select-option value="3">
                  50万(含)-100万
                </a-select-option>
                <a-select-option value="4">
                  100万(含)-300万
                </a-select-option>
                <a-select-option value="5">
                  300万(含)-500万
                </a-select-option>
                <a-select-option value="6">
                  500万(含)-1000万
                </a-select-option>
                <a-select-option value="7">
                  1000万(含)以上
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('全行贷款结构分析表')" v-has="'qhdkjgfxb:exportXls'">导出</a-button>
      <a-button icon="area-chart" @click="init" v-has="'qhdkjgfxb:init'">提取</a-button>

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

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import { downFile, putAction } from '@/api/manage'
  import {getAction} from "@/api/manage";
  import {notification} from "ant-design-vue";
  import store from '@views/tjbb/dkywfx/dkjgfxb/DkjgfxbList'

  export default {
    name: "QhdkjgfxbList",
    mixins:[JeecgListMixin],
    components: {},
    data () {
      return {
        description: '全行贷款结构分析表管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
        //重置标识
        flag: true,
        isorter: {
          columns: 'tjrq',
          order: 'desc',
        },
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
            dataIndex: 'tjrq'
           },
		   {
            title: '金额区间',
            align:"center",
            dataIndex: 'jeqj_dictText'
           },

          {
            title: '上年年底',
            children: [
          {
            title: '户数',
            align: "center",
            dataIndex: 'snndHs'
          },
          {
            title: '金额',
            align: "center",
            dataIndex: 'snndJe'
          },
          {
            title: '余额',
            align: "center",
            dataIndex: 'snndYe'
          }
        ]
      },

          {
            title: '当日',
            children: [
          {
            title: '户数',
            align: "center",
            dataIndex: 'drHs'
          },
          {
            title: '金额',
            align: "center",
            dataIndex: 'drJe'
          },
          {
            title: '余额',
            align: "center",
            dataIndex: 'drYe'
          }
        ]
      },

          {
            title: '户数较年初',
            children:[
          {
            title: '增减',
            align: "center",
            dataIndex: 'hsjncZj'
          },
          {
            title: '占比(%)',
            align: "center",
            dataIndex: 'hsjncZb'
          }
        ]
      },

          {
            title: '余额较年初',
            children:[
          {
            title: '增减',
            align: "center",
            dataIndex: 'yejncZj'
          },
          {
            title: '占比(%)',
            align: "center",
            dataIndex: 'yejncZb'
          }
        ]
      },

          {
            title: '户数较上月',
            children:[
          {
            title: '增减',
            align: "center",
            dataIndex: 'hsjsyZj'
          },
          {
            title: '占比(%)',
            align: "center",
            dataIndex: 'hsjsyZb'
          }
        ]
      },

          {
            title: '余额较上月',
            children:[
          {
            title: '增减',
            align: "center",
            dataIndex: 'yejsyZj'
          },
          {
            title: '占比(%)',
            align: "center",
            dataIndex: 'yejsyZb'
          }
        ]
      },

		   /*{
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },*/
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/qhdkjgfxb/qhdkjgfxb/list",
          delete: "/qhdkjgfxb/qhdkjgfxb/delete",
          deleteBatch: "/qhdkjgfxb/qhdkjgfxb/deleteBatch",
          exportXlsUrl: "qhdkjgfxb/qhdkjgfxb/exportXls",
          importExcelUrl: "qhdkjgfxb/qhdkjgfxb/importExcel",
          init: "/qhdkjgfxb/qhdkjgfxb/init",
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
        this.queryParam = {tjrq :undefined};
        this.queryParam.tjrq = this.defaultMonthOpera;
      },
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjrq) {
          tjrqment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq = tjrqment;
        }
        return filterObj(param);
      },

      init(){
        if (this.queryParam.tjrq === undefined || this.queryParam.tjrq === "") {
          notification.warning({message: '系统提示', description: '请选择统计日期！', duration: 4})
          return false
        }
        let params = {
          tjrq: moment(this.queryParam.tjrq).format("YYYY-MM-DD"),
        }
        this.loading = true
        putAction(this.url.init, params).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
            this.loadData(1)
          } else {
            notification.warning({message: '系统提示', description: '提取失败！'+res.message, duration: 4})
          }
        }).catch((error) => {
          notification.warning({message: '系统提示', description: '提取失败！'+error, duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let tjrq = ''
        let param =Object.assign({},this.queryParam)
        if (this.queryParam.tjrq === undefined && this.queryParam.tjrq === null) {
          notification.warning({message: '系统提示', description: '请选择统计日期！' + res.message, duration: 4})
          return false
        }else {
          tjrq = moment(param.tjrq).format("YYYY-MM-DD")
        }
        param.tjrq = tjrq;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数", param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(() => {
          this.exportLoading = false
          this.loadData(1)
        })
      },
      searchReset() {
        this.queryParam = {tjrq :undefined};
        this.queryParam.tjrq = this.defaultMonthOpera;
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
        if ((params.tjrq != undefined && params.tjrq != null)) {
          params.tjrq = moment(params.tjrq).format("YYYY-MM-DD");
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