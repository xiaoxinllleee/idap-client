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
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('社保卡查询')" v-has="'sbkcx:exportXls'">
        导出
      </a-button>
      <a-button icon="area-chart" @click="init" v-has="'sbkcx:init'">提取</a-button>

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

        <span slot="bankNo" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="cardNo" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {getAction} from "@/api/manage";
  import {filterObj} from '@/utils/util';
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import moment from 'moment'
  import {downFile, postAction} from "../../../../api/manage";
  import {notification} from "ant-design-vue";
  import store from '@views/tjbb/ywltj/dsfzfk/DsfzfkList'

  export default {
    name: "SbkcxList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis
    },
    data() {
      return {
        description: '社保卡查询管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
        flag: true,
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
          },
          {
            title: '银行号',
            align: "center",
            dataIndex: 'bankNo',
            width: 150,
            scopedSlots: {customRender: 'bankNo'},
          },
          {
            title: '卡号',
            align: "center",
            dataIndex: 'cardNo',
            scopedSlots: {customRender: 'cardNo'},
            width: 200
          },
          {
            title: '卡产品号',
            align: "center",
            dataIndex: 'cardProduct'
          },
          {
            title: '卡BIN代码',
            align: "center",
            dataIndex: 'cardBinCode'
          },
          {
            title: '客户号',
            align: "center",
            dataIndex: 'customerNo'
          },
          {
            title: '卡名1',
            align: "center",
            dataIndex: 'cardName1'
          },
          {
            title: '卡名2',
            align: "center",
            dataIndex: 'cardName2'
          },
          {
            title: '电话号码',
            align: "center",
            dataIndex: 'telphone'
          },
          {
            title: '卡创建日期',
            align: "center",
            dataIndex: 'cardCreateDate'
          },
          {
            title: '卡状态',
            align: "center",
            dataIndex: 'cardStatus'
          },
          {
            title: '发卡机构',
            align: "center",
            dataIndex: 'issueBranch'
          },
          {
            title: '发卡所在分行',
            align: "center",
            dataIndex: 'issueRegion'
          },
          {
            title: 'PIN初始化标志',
            align: "center",
            dataIndex: 'pinInitFlag'
          },
          /*{
               title: '录入标识',
               align:"center",
               dataIndex: 'lrbz_dictText'
              },
          {
               title: '录入人',
               align:"center",
               dataIndex: 'lrr'
              },
          {
               title: '录入时间',
               align:"center",
               dataIndex: 'lrsj'
              },*/
        ],
        url: {
          list: "/sbkcx/sbkcx/list",
          delete: "/sbkcx/sbkcx/delete",
          deleteBatch: "/sbkcx/sbkcx/deleteBatch",
          exportXlsUrl: "sbkcx/sbkcx/exportXls",
          importExcelUrl: "sbkcx/sbkcx/importExcel",
          init: "/sbkcx/sbkcx/init",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
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
        this.queryParam = {tjyf :undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
      },
      init() {
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          notification.warning({message: '系统提示', description: '请选择统计月份！', duration: 4})
          return false
        }
        let  params = {
          tjyf: moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        }
        this.loading = true
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
            this.loadData(1)
          } else {
            notification.warning({message: '系统提示', description: '提取失败！' + res.message, duration: 4})
          }
        }).catch((error) => {
          notification.warning({message: '系统提示', description: '提取失败！' + error, duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
         let tjyf = ''
        let param = this.queryParam
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== "") {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf;
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
        this.queryParam = {};
        this.queryParam = {tjyf :undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>