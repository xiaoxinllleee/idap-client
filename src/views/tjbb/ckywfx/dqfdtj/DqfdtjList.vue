<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/><!--:defaultValue="defaultMonthOpera" :format="monthFormat"-->
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('定期分段统计')" v-has="'dqfdtj:exportXls'">导出</a-button>
      <a-button @click="init" icon="area-chart" v-has="'dqfdtj:init'">提取</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

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
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import {getAction} from '@/api/manage'
  import {filterObj} from '@/utils/util'
  import {downFile, postAction} from "../../../../api/manage";
  import {notification} from "ant-design-vue";

  export default {
    name: "DqfdtjList",
    mixins: [JeecgListMixin],
    components: {},
    data() {
      return {
        description: '定期分段统计管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
        isorter: {
          order: 'desc'
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
          },
          {
            title: '0-1万（含）',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'fd1ye'
              },
              {
                title: '笔数',
                align: "center",
                dataIndex: 'fd1bs'
              },
            ]
          },

          {
            title: '1万-2万（含）',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'fd2ye'
              },
              {
                title: '笔数',
                align: "center",
                dataIndex: 'fd2bs'
              },
            ]
          },

          {
            title: '2万-5万（含）',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'fd3ye'
              },
              {
                title: '笔数',
                align: "center",
                dataIndex: 'fd3bs'
              },
            ]
          },

          {
            title: '5万-10万（含）',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'fd4ye'
              },
              {
                title: '笔数',
                align: "center",
                dataIndex: 'fd4bs'
              },
            ]
          },

          {
            title: '10万-20万（含）',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'fd5ye'
              },
              {
                title: '笔数',
                align: "center",
                dataIndex: 'fd5bs'
              },
            ]
          },

          {
            title: '20万-50万（含）',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'fd6ye'
              },
              {
                title: '笔数',
                align: "center",
                dataIndex: 'fd6bs'
              },
            ]
          },

          {
            title: '50万-100万（含）',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'fd7ye'
              },
              {
                title: '笔数',
                align: "center",
                dataIndex: 'fd7bs'
              },
            ]
          },

          {
            title: '100万以上',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'fd8ye'
              },
              {
                title: '笔数',
                align: "center",
                dataIndex: 'fd8bs'
              },
            ]
          },

          /*{
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },*/
        ],
        url: {
          list: "/dqfdtj/dqfdtj/list",
          delete: "/dqfdtj/dqfdtj/delete",
          deleteBatch: "/dqfdtj/dqfdtj/deleteBatch",
          exportXlsUrl: "dqfdtj/dqfdtj/exportXls",
          importExcelUrl: "dqfdtj/dqfdtj/importExcel",
          init: "/dqfdtj/dqfdtj/init",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      init() {
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === null) {
          notification.warning({ message: '系统提示', description: '请选择统计月份！',duration: 4})
          return false
        }
        let params = {'tjyf': moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'}
        this.loading = true
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: '提取成功！',duration: 4})
            this.loadData(1)
          } else {
            notification.warning({ message: '系统提示', description: '提取失败，请联系系统管理员！',duration: 4})
          }
        }).catch((error) => {
          notification.warning({ message: '系统提示', description: '提取失败，请联系系统管理员！'+error,duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = this.queryParam
        let tjyf = ''
        if (this.queryParam.tjyf === undefined && this.queryParam.tjyf === null) {
          notification.warning({ message: '系统提示', description: '请选择统计日期！',duration: 4})
          return false
        }else {
          tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf=tjyf
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
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
      getQueryParams() {
        let tjrqment = "";
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        //this.queryParam.tjyf = this.defaultMonthOpera;
        this.queryParam = {tjyf :undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },
      getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate,this.monthFormat);
        //重新清空选择新日期
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
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
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM")+ '-01';
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
      // loadData(arg) {
      //   // 获取当前月份
      //   //this.getCurrentMonth()
      //   if (!this.url.list) {
      //     this.$message.error("请设置url.list属性!");
      //     return;
      //   }
      //   // 加载数据 若传入参数1则加载第一页的内容
      //   if (arg === 1) {
      //     this.ipagination.current = 1;
      //   }
      //   // 查询条件
      //   var params = this.getQueryParams();
      //   if ((params.tjyf === undefined || params.tjyf == null)) {
      //     params.tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01';
      //   }
      //   this.loading = true;
      //   getAction(this.url.list, params).then((res) => {
      //     if (res.success) {
      //       this.dataSource = res.result.records;
      //       this.ipagination.total = res.result.total;
      //     }
      //     if (res.code === 510) {
      //       this.$message.warning(res.message,5)
      //     }
      //     this.loading = false;
      //   })
      // },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>