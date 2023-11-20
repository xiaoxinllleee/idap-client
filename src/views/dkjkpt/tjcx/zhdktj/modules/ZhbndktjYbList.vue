<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="16">

          <a-col :md="6" :sm="8"><a-form-item label="统计月份">
            <a-month-picker placeholder="请输入统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                            :format="monthFormat" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="V_HR_BAS_ORGANIZATION_CMMSZH, ZZJC, YWJGDM" pid-field="SJYWJGDM"
                           treeNodeFilterProp="title" :showSearch="true" :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="贷款金额">
            <a-input-group compact>
              <a-input placeholder="Min" v-model="queryParam.dkje_begin" style="width: 40%; text-align: center;"/>
              <a-input placeholder="~" disabled style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF;"/>
              <a-input placeholder="Max" v-model="queryParam.dkje_end" style="width: 40%; text-align: center; border-left: 0;"/>
            </a-input-group>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item>
            </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="贷款余额">
            <a-input-group compact>
              <a-input placeholder="Min" v-model="queryParam.dkye_begin" style="width: 40%; text-align: center;"/>
              <a-input placeholder="~" disabled style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF;"/>
              <a-input placeholder="Max" v-model="queryParam.dkye_end" style="width: 40%; text-align: center; border-left: 0;"/>
            </a-input-group>
          </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="area-chart" @click="initData" v-has="'zhdktjyb:extract1'">统计</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('支行贷款统计(月报)')" style="margin-left: 8px;" v-has="'zhdktjyb:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a>项-->
<!--        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 2000 }"
               @change="handleTableChange"/>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction } from '@/api/manage'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import { filterObj } from '../../../../../utils/util'
  import moment from 'moment'
  import {downFile} from "../../../../../api/manage";

  export default {
    name: "Zhbndktj_ybList",
    mixins:[ JeecgListMixin ],
    components: { JTreeSelect },
    data () {
      return {
        description: '支行贷款统计(月报)管理页面',
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
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
            width: 120
          },
		      {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
            width: 100
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '贷款户数',
            align:"center",
            dataIndex: 'dkhs',
            width: 100
          },
          {
            title: '贷款笔数',
            align:"center",
            dataIndex: 'dkbs',
            width: 100
          },
		      {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje',
            width: 100
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye',
            width: 100
          },
		      {
            title: '不良余额',
            align:"center",
            dataIndex: 'blye',
            width: 100
          },
		      {
            title: '不良余额比例',
            align:"center",
            dataIndex: 'blyebl',
            width: 120
          },
		      {
            title: '当月到期贷款金额',
            align:"center",
            dataIndex: 'dndqdkje',
            width: 130
          },
		      {
            title: '当月到期收回金额',
            align:"center",
            dataIndex: 'dndqshje',
            width: 130
          },
		      {
            title: '当月到期收回率',
            align:"center",
            dataIndex: 'dqdqshl',
            width: 130
          }
        ],
		    url: {
          list: "/zhbndktj_yb/zhbndktjYb/list",
          delete: "/zhbndktj_yb/zhbndktjYb/delete",
          deleteBatch: "/zhbndktj_yb/zhbndktjYb/deleteBatch",
          exportXlsUrl: "zhbndktj_yb/zhbndktjYb/exportXls",
          importExcelUrl: "zhbndktj_yb/zhbndktjYb/importExcel",
          init: "/zhbndktj_yb/zhbndktjYb/extract",
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
        this.queryParam.tjyf = this.defaultMonthOpera;
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
        var params = this.queryParam
        let tjyf = ''
        if( params.tjyf==null || params.tjyf=='undefined'){
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        } else {
           tjyf = params.tjyf.format("YYYY-MM")+'-01';
        }
        this.loading = true;
        putAction(this.url.init, {tjyf: tjyf}, 'put').then((res) => {
          if(res.success){
            this.$message.success("提取成功！");
            this.loadData(1)
          }else{
            this.$message.warning("提取失败！");
          }
          this.loading = false;
        })
      },
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf){
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM")+'-01';
        }
        console.log(tjyfMoment)
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf   = tjyfMoment;
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