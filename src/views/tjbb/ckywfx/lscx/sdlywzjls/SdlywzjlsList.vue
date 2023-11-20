<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq" placeholder="开始日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq" placeholder="结束日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>



        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号名称">
              <a-input placeholder="请输入账号名称" v-model="queryParam.acctName"></a-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>

      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('收单类业务资金流水')" v-has="'sdlywzzls:exportXls'">导出</a-button>
      <a-button @click="init" icon="area-chart" v-has="'sdlywzzls:init'">提取</a-button>

     <!-- <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button @click="searchReset" icon="reload">重置</a-button>-->
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
        :scroll="{x:2050}"
        @change="handleTableChange">

        <span slot="fy" slot-scope="text"><j-ellipsis :value="text" :length="10"></j-ellipsis></span>
        <span slot="lsh" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="acctNo" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="fkrzh" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="fkrkhhm" slot-scope="text"><j-ellipsis :value="text" :length="7"></j-ellipsis></span>


      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {filterObj} from '@/utils/util'
  import moment from 'moment'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import { downFile, postAction } from '../../../../../api/manage'
  import {notification} from "ant-design-vue";

  export default {
    name: "SdlywzjlsList",
    mixins: [JeecgListMixin],
    components: { JEllipsis },
    data() {
      return {
        description: '收单类业务资金流水管理页面',
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
            title: '开始日期',
            align: "center",
            dataIndex: 'ksrq',
            width: 100
          },
          {
            title: '结束日期',
            align: "center",
            dataIndex: 'jsrq',
            width: 100
          },
          {
            title: '收款人开户行行号',
            align: "center",
            dataIndex: 'khhh',
            width: 140
          },
          {
            title: '账号',
            align: "center",
            dataIndex: 'acctNo',
            width: 180,
            scopedSlots: {customRender: 'acctNo'},
          },
          {
            title: '账号名称',
            align: "center",
            dataIndex: 'acctName',
            width: 100
          },
          {
            title: '交易日期',
            align: "center",
            dataIndex: 'jyrq',
            width: 100
          },
          {
            title: '交易时间',
            align: "center",
            dataIndex: 'jysj',
            width: 100
          },
          {
            title: '交易金额',
            align: "center",
            dataIndex: 'jyje',
            width: 100
          },
          {
            title: '币种',
            align: "center",
            dataIndex: 'bz',
            width: 100
          },
          {
            title: '当前账户金额',
            align: "center",
            dataIndex: 'dqzhje',
            width: 120
          },
          {
            title: '流水号',
            align: "center",
            dataIndex: 'lsh',
            width: 200,
            scopedSlots: {customRender: 'lsh'},
          },
          {
            title: '借贷标志',
            align: "center",
            dataIndex: 'jdbz',
            width: 100
          },
          {
            title: '付款人姓名',
            align: "center",
            dataIndex: 'fkrxm',
            width: 100
          },
          {
            title: '付款人账号',
            align: "center",
            dataIndex: 'fkrzh',
            width: 180,
            scopedSlots: {customRender: 'fkrzh'},
          },
          {
            title: '付款人开户行名',
            align: "center",
            dataIndex: 'fkrkhhm',
            width: 130,
            scopedSlots: {customRender: 'fkrkhhm'},
          },
          {
            title: '附言',
            align: "center",
            dataIndex: 'fy',
            width: 200,
            scopedSlots: {customRender: 'fy'},
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
          list: "/sdlywzjls/sdlywzjls/list",
          delete: "/sdlywzjls/sdlywzjls/delete",
          deleteBatch: "/sdlywzjls/sdlywzjls/deleteBatch",
          exportXlsUrl: "sdlywzjls/sdlywzjls/exportXls",
          importExcelUrl: "sdlywzjls/sdlywzjls/importExcel",
          init: "/sdlywzjls/sdlywzjls/init",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      init() {
        if (this.queryParam.ksrq === undefined || this.queryParam.ksrq === "") {
          notification.warning({ message: '系统提示', description: '请选择开始日期！',duration: 4})
          return false
        }
        if (this.queryParam.jsrq === undefined || this.queryParam.jsrq === "") {
          notification.warning({ message: '系统提示', description: '请选择结束日期！',duration: 4})
          return false
        }
        let params = {
          ksrq: moment(this.queryParam.ksrq).format("YYYY-MM-DD"),
          jsrq: moment(this.queryParam.jsrq).format("YYYY-MM-DD")
        }
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
        let param = Object.assign({},this.queryParam);
        let tjrqmentB = ''
        let tjrqmentE = ''
        if (this.queryParam.ksrq!== undefined && this.queryParam.ksrq !== null) {
          tjrqmentB = this.queryParam.ksrq.format('YYYY-MM-DD')
        }
        if (this.queryParam.jsrq !== undefined && this.queryParam.jsrq !== null) {
          tjrqmentE = this.queryParam.jsrq.format('YYYY-MM-DD')
        }
        param.ksrq=tjrqmentB
        param.jsrq=tjrqmentE
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey']=this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading=true
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
          this.exportLoading=false
        })
      },
      getQueryParams() {
        let tjrqmentB = ''
        let tjrqmentE = ''
        if (this.queryParam.ksrq) {
          tjrqmentB = this.queryParam.ksrq.format('YYYY-MM-DD')
        }
        if (this.queryParam.jsrq) {
          tjrqmentE = this.queryParam.jsrq.format('YYYY-MM-DD')
        }

        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.ksrq = tjrqmentB
        param.jsrq = tjrqmentE
        return filterObj(param)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>