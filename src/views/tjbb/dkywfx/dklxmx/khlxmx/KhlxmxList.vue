<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq" placeholder="开始日期" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq" placeholder="结束日期" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
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
              <j-dict-select-tag v-model="queryParam.khlx" placeholder="请选择客户类型" dictCode="dklxmx_khlx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
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
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('客户利息明细')" v-has="'khlxmx:exportXls'">
        导出
      </a-button>
      <a-button icon="area-chart" @click="init" v-has="'khlxmx:init'">提取</a-button>

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
        :scroll="{x:3970}"
        @change="handleTableChange">

        <span slot="zjhm" slot-scope="text"><j-ellipsis :value="text" :length="18"></j-ellipsis></span>
        <span slot="dkzh" slot-scope="text"><j-ellipsis :value="text" :length="18"></j-ellipsis></span>
        <span slot="khlx" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="cpmc" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="kmmc" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="khmc" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="khdz" slot-scope="text"><j-ellipsis :value="text" :length="10"></j-ellipsis></span>
        <span slot="khlx1" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="khlx2" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="dbfs" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="dktx" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="dktx1" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="dktx2" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="dktx3" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>
        <span slot="dktx4" slot-scope="text"><j-ellipsis :value="text" :length="5"></j-ellipsis></span>

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import {filterObj} from '@/utils/util'
  import { downFile, getAction } from '@/api/manage'
  import moment from 'moment'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {postAction} from "../../../../../api/manage";
  import {notification} from "ant-design-vue";
  import store from '@/store/'

  export default {
    name: "KhlxmxList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect,
      JEllipsis
    },
    data() {
      return {
        description: '客户利息明细管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
        queryParam:{
          ksrq:undefined,
          jsrq:undefined,
        },
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
            scopedSlots: {customRender: 'khlx'},
            width: 110
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180,
            scopedSlots: {customRender: 'zjhm'}
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'khmc'},
            width: 100
          },
          {
            title: '贷款账号',
            align: "center",
            dataIndex: 'dkzh',
            width: 180,
            scopedSlots: {customRender: 'dkzh'}
          },
          {
            title: '收息日',
            align: "center",
            dataIndex: 'sxr',
            width: 100
          },
          {
            title: '利息',
            align: "center",
            dataIndex: 'lx',
            width: 100
          },
          {
            title: '授信金额',
            align: "center",
            dataIndex: 'sxje',
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
            title: '贷款期限(天)',
            align: "center",
            dataIndex: 'dkqx',
            width: 120
          },
          {
            title: '贷款总期数',
            align: "center",
            dataIndex: 'dkzqs',
            width: 100
          },
          {
            title: '利率',
            align: "center",
            dataIndex: 'lv',
            width: 100
          },
          {
            title: '批准利率',
            align: "center",
            dataIndex: 'pzlv',
            width: 100
          },
          {
            title: '基准利率',
            align: "center",
            dataIndex: 'jzll',
            width: 100
          },
          {
            title: '产品名称',
            align: "center",
            dataIndex: 'cpmc',
            width: 100,
            scopedSlots: {customRender: 'cpmc'}
          },
          {
            title: '科目号',
            align: "center",
            dataIndex: 'kmh',
            width: 100
          },
          {
            title: '科目名称',
            align: "center",
            dataIndex: 'kmmc',
            scopedSlots: {customRender: 'kmmc'},
            width: 100
          },
          {
            title: '客户地址',
            align: "center",
            dataIndex: 'khdz',
            scopedSlots: {customRender: 'khdz'},
            width: 200
          },
          {
            title: '客户电话',
            align: "center",
            dataIndex: 'khdh',
            width: 120
          },
          {
            title: '客户类型1',
            align: "center",
            dataIndex: 'khlx1_dictText',
            scopedSlots: {customRender: 'khlx1'},
            width: 120
          },
          {
            title: '客户类型2',
            align: "center",
            dataIndex: 'khlx2_dictText',
            scopedSlots: {customRender: 'khlx2'},
            width: 120
          },
          {
            title: '担保方式',
            align: "center",
            dataIndex: 'dbfs_dictText',
            scopedSlots: {customRender: 'dbfs'},
            width: 120
          },
          {
            title: '第一责任人',
            align: "center",
            dataIndex: 'dyzrr',
            width: 100
          },
          {
            title: '企业规模',
            align: "center",
            dataIndex: 'qygm_dictText',
            width: 100
          },
          {
            title: '实际用途',
            align: "center",
            dataIndex: 'sjyt',
            width: 100
          },
          {
            title: '贷款投向',
            align: "center",
            dataIndex: 'dktx_dictText',
            scopedSlots: {customRender: 'dktx'},
            width: 120
          },
          {
            title: '贷款投向1',
            align: "center",
            dataIndex: 'dktx1_dictText',
            scopedSlots: {customRender: 'dktx1'},
            width: 120
          },
          {
            title: '贷款投向2',
            align: "center",
            dataIndex: 'dktx2_dictText',
            scopedSlots: {customRender: 'dktx2'},
            width: 120
          },
          {
            title: '贷款投向3',
            align: "center",
            dataIndex: 'dktx3_dictText',
            scopedSlots: {customRender: 'dktx3'},
            width: 120
          },
          {
            title: '贷款投向4',
            align: "center",
            dataIndex: 'dktx4_dictText',
            scopedSlots: {customRender: 'dktx4'},
            width: 120
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
          list: "/khlxmx/khlxmx/list",
          delete: "/khlxmx/khlxmx/delete",
          deleteBatch: "/khlxmx/khlxmx/deleteBatch",
          exportXlsUrl: "khlxmx/khlxmx/exportXls",
          importExcelUrl: "khlxmx/khlxmx/importExcel",
          init: "/khlxmx/khlxmx/init",
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
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = Object.assign({},this.queryParam);
        let ksrq = ''
        let jsrq = ''
        if (this.queryParam.ksrq !== null  && this.queryParam.ksrq !== undefined){
          ksrq = moment(this.queryParam.ksrq).format("YYYY-MM-DD");
        }

        if (this.queryParam.jsrq !== null  && this.queryParam.jsrq !== undefined){
          jsrq = moment(this.queryParam.jsrq).format("YYYY-MM-DD");
        }
        param.ksrq=ksrq;
        param.jsrq=jsrq;
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
          tjrqmentB = moment(this.queryParam.ksrq).format('YYYY-MM-DD')
        }
        if (this.queryParam.jsrq) {
          tjrqmentE = moment(this.queryParam.jsrq).format('YYYY-MM-DD')
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.ksrq = tjrqmentB
        param.jsrq = tjrqmentE
        return filterObj(param)
      },
      searchReset() {
        this.queryParam = {
                      jgdm:'',
                      jsrq :undefined,
                      ksrq :undefined
        };
        if (!store.getters.isRoot){
          this.queryParam.jgdm=store.getters.ywjgdm
        }
        this.queryParam.ksrq = this.defaultMonthOpera;
        this.queryParam.jsrq = this.defaultMonthOpera;
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