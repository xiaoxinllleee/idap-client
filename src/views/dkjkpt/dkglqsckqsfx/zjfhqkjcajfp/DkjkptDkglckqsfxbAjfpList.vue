<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf"
                              placeholder="请选择统计月份" :defaultValue="defaultMonthOpera" :format="monthFormat"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label=" 机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户姓名">
              <j-input placeholder="请输入客户姓名" v-model="queryParam.khmc"/>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款余额">
                <!--<a-input placeholder="请输入贷款余额" v-model="queryParam.dkye"></a-input>-->
                <a-input-group compact>
                  <a-input style=" width: 40%; text-align: center; "
                           v-model="queryParam.dkye_begin"
                           placeholder="Min"/>
                  <a-input style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "
                           placeholder="~"
                           disabled />
                  <a-input style="width: 40%; text-align: center; border-left: 0; "
                           v-model="queryParam.dkye_end"
                           placeholder="Max"/>
                </a-input-group>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary"
                        @click="searchQuery"
                        icon="search">查询</a-button>
              <a-button @click="searchReset"
                        icon="reload"
                        style="margin-left: 8px">重置</a-button>
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
      <a-button icon="area-chart"
                @click="initData" v-has="'zjfhqkjcajfp:init'">提取</a-button>
      <a-button icon="download"
                :loading="exportLoading"
                @click="handleExportXls('资金返还情况监测（按揭、扶贫）')"
                style="margin-left: 8px" v-has="'zjfhqkjcajfp:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 2500 }"
        @change="handleTableChange"/>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkjkptDkglckqsfxbAjfp-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import DkjkptDkglckqsfxbAjfpModal from './modules/DkjkptDkglckqsfxbAjfpModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'
  import JInput from '../../../../components/jeecg/JInput'
  import {downFile} from "../../../../api/manage";

  export default {
    name: "DkjkptDkglckqsfxbAjfpList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      DkjkptDkglckqsfxbAjfpModal,
      JSelectDepart,
      JTreeSelect
    },
    data () {
      return {
        description: '资金返还情况监测（按揭、扶贫）管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
            width:120
          },
          {
              title: '机构代码',
              align:"center",
              dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
              title: '客户姓名',
              align:"center",
              dataIndex: 'khmc'
          },
          {
              title: '证件号码',
              align:"center",
              dataIndex: 'zjhm'
          },
          {
              title: '客户类型',
              align:"center",
              dataIndex: 'khlx_dictText'
          },
          {
              title: '客户地址',
              align:"center",
              dataIndex: 'khdz'
          },
          {
            title: '信贷贷款品种',
            align:"center",
            dataIndex: 'dkpz_dictText'
          },
          {
              title: '贷款余额',
              align:"center",
              dataIndex: 'dkye'
          },
          {
              title: '存款余额',
              align:"center",
              dataIndex: 'ckye'
          },
          {
            title: '贷款月日平',
            align:"center",
            dataIndex: 'dkrpM'
          },
          {
            title: '存款月日平',
            align:"center",
            dataIndex: 'ckrpM'
          },
          {
            title: '月资金归行率(%)',
            align:"center",
            dataIndex: 'zjghlM'
          },
          {
            title: '贷款季日平',
            align:"center",
            dataIndex: 'dkrpQ'
          },
          {
            title: '存款季日平',
            align:"center",
            dataIndex: 'ckrpQ'
          },
          {
            title: '季资金归行率(%)',
            align:"center",
            dataIndex: 'zjghlQ'
          },
          {
              title: '贷款年日平',
              align:"center",
              dataIndex: 'dkrp'
          },
          {
              title: '存款年日平',
              align:"center",
              dataIndex: 'ckrp'
          },
          {
            title: '资金归行率(%)',
            align:"center",
            dataIndex: 'zjghl'
          }
        ],
		    url: {
          list: "/dkjkpt.dkglqsckqsfx.zjfhqkjcajfp/dkjkptDkglckqsfxbAjfp/list",
          delete: "/dkjkpt.dkglqsckqsfx.zjfhqkjcajfp/dkjkptDkglckqsfxbAjfp/delete",
          deleteBatch: "/dkjkpt.dkglqsckqsfx.zjfhqkjcajfp/dkjkptDkglckqsfxbAjfp/deleteBatch",
          exportXlsUrl: "dkjkpt.dkglqsckqsfx.zjfhqkjcajfp/dkjkptDkglckqsfxbAjfp/exportXls",
          importExcelUrl: "dkjkpt.dkglqsckqsfx.zjfhqkjcajfp/dkjkptDkglckqsfxbAjfp/importExcel",
          init:"/dkjkpt.dkglqsckqsfx.zjfhqkjcajfp/dkjkptDkglckqsfxbAjfp/extract",
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
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera
        this.loadData(1);
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
          params.tjyf = moment(this.defaultMonthOpera).format("YYYY-MM")+'-01';
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
      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          params.tjyf = moment(this.defaultMonthOpera)
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading=true;
          putAction(this.url.init, 'TJYF='+tjyfstr).then((res) => {
            if(res.success){
              this.$message.success(res.message);
              this.loadData(1)
            }else{
              this.$message.warning(res.message,5);
            }
            this.loading=false;

          })
      },
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf   = tjrqment;
        }
        return filterObj(param);
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = this.queryParam
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          //this.$message.warning("统计月份不能为空！")
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        }else {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf=tjyf;
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>