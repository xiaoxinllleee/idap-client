<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq" placeholder="结束日期" style="width: 100%;"  :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq" placeholder="结束日期" style="width: 100%;"  :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <a-select placeholder="请选择客户类型" v-model="queryParam.khlx">
                <a-select-option value="01">
                  个体工商户
                </a-select-option>
                <a-select-option value="02">
                  农户
                </a-select-option>
                <a-select-option value="03">
                  微型企业
                </a-select-option>
                <a-select-option value="04">
                  小型企业
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷款发放明细')" v-has="'dkffmx:exportXls'">
        导出
      </a-button>
      <a-button icon="area-chart" @click="init" v-has="'dkffmx:init'">提取</a-button>

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

        <span slot="dbfs" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="dkzh" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="zjhm" slot-scope="text"><j-ellipsis :value="text" :length="18"></j-ellipsis></span>

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {filterObj} from '@/utils/util'
  import { downFile, getAction } from '@/api/manage'
  import moment from 'moment'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import JInput from "@/components/jeecg/JInput"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {postAction} from "../../../../api/manage";
  import {notification} from "ant-design-vue";
  import store from '@/store/'

  export default {
    name: "DkffmxList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect, JEllipsis, JInput
    },
    data() {
      return {
        description: '贷款发放明细管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
        // 重置标识
        flag: true,
        isorter: {
          order: 'desc',
        },
        queryParam:{
          ksrq:undefined,
          jsrq:undefined,
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
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm',
            width: 100
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 110,
          },
          {
            title: '贷款账号',
            align: "center",
            width: 200,
            dataIndex: 'dkzh',
            scopedSlots: {customRender: 'dkzh'},
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            width: 100
          },
          {
            title: '证件号码',
            align: "center",
            width: 200,
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
          },
          {
            title: '借款日期',
            align: "center",
            dataIndex: 'jkrq',
            width: 100
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'dqrq',
            width: 100
          },
          {
            title: '贷款金额',
            align: "center",
            dataIndex: 'dkje',
            width: 100
          },
          {
            title: '贷款余额',
            align: "center",
            dataIndex: 'dkye',
            width: 100
          },
          /*{
               title: '五级分类标识',
               align:"center",
               dataIndex: 'wjfl_dictText',
               width: 120
              },*/
          {
            title: '担保方式',
            align: "center",
            dataIndex: 'dbfs_dictText',
            width: 180,
            scopedSlots: {customRender: 'dbfs'},
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
          list: "/dkffmx/dkffmx/list",
          delete: "/dkffmx/dkffmx/delete",
          deleteBatch: "/dkffmx/dkffmx/deleteBatch",
          exportXlsUrl: "dkffmx/dkffmx/exportXls",
          importExcelUrl: "dkffmx/dkffmx/importExcel",
          init: "/dkffmx/dkffmx/init",
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
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate,this.monthFormat);
        this.queryParam.ksrq = this.defaultMonthOpera;
        this.queryParam.jsrq = this.defaultMonthOpera;
      },
      init() {
        if (this.queryParam.ksrq === undefined || this.queryParam.ksrq === "") {
          notification.warning({message: '系统提示', description: '请选择开始日期！', duration: 4})
          return false
        }
        if (this.queryParam.jsrq === undefined || this.queryParam.jsrq === "") {
          notification.warning({message: '系统提示', description: '请选择结束日期！', duration: 4})
          return false
        }
        let params = {
          ksrq: moment(this.queryParam.ksrq).format("YYYY-MM-DD"),
          jsrq: moment(this.queryParam.jsrq).format("YYYY-MM-DD")
        }
        this.loading = true
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
            this.loadData(1)
          } else {
            notification.warning({message: '系统提示', description: '提取失败！'+res.message, duration: 4})
          }
        }).catch((error) => {
          notification.warning({message: '系统提示', description: '提取失败，请联系系统管理员！' + error, duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      searchReset() {
        this.queryParam = {ksrq :undefined,jsrq :undefined,jgdm:''};
        if (!store.getters.isRoot){
          this.queryParam.jgdm=store.getters.ywjgdm
        }
        this.queryParam.ksrq = this.defaultMonthOpera;
        this.queryParam.jsrq = this.defaultMonthOpera;
        this.loadData(1);
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

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = Object.assign({},this.queryParam) ;
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
        if ((params.ksrq != undefined && params.ksrq != null)) {
          params.ksrq = moment(params.ksrq).format("YYYY-MM-DD");
        }
        if ((params.jsrq != undefined && params.jsrq != null)) {
          params.jsrq = moment(params.jsrq).format("YYYY-MM-DD");
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