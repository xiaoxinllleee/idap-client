<template>
  <a-card :bordered="false">

    <!--图表区域-->
    <div class="page-header-index-wide">
      <a-row :gutter="24">
        <qkhs ref="qkhs" ></qkhs>
      </a-row>
    </div>

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper" style="margin-top: 10px;">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="统计月份">
            <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行查询" v-model="queryParam.zhmc" dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pid-field="sjzzbz"
                           treeNodeFilterProp="title" :showSearch="true" :sszh="true" :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <!--<a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-dict-select-tag placeholder="请选择营销单元查询" v-model="queryParam.yxdy" dictCode="V_KHHMC_SSYXDY,XZMC,YJDYBH" :show-search="false"/>
          </a-form-item></a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="所属乡镇">
            <j-dict-select-tag placeholder="请选择所属乡镇" v-model="queryParam.ssxz" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH"
                               :showSearch="true" @change="getyjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24" ><a-form-item label="行政村">
            <j-dict-select-tag placeholder="请选择行政村" v-model="queryParam.xzc" :dict-code="this.ejyxdybh"
                               :showSearch="true" :disabled=this.sfjsejyxdy @change="getejyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if="this.sfktsjyxdy==1" ><a-form-item label="行政组">
            <j-dict-select-tag placeholder="请选择行政组" v-model="this.sjyxdybhdate" :dict-code="this.sjyxdybh"
                               :showSearch="true" :disabled=this.sfjssjyxdy @change="getsjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="area-chart" @click="initData" >统计</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户年龄分层统计')" style="margin-left: 8px">导出</a-button>
      <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 8px">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
    </div>

    <!-- table区域 -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

      </a-table>
    </div>
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,downFile } from '@/api/manage'
  import moment from 'moment'
  import {initDictOptions, filterDictText} from '@/components/dict/JDictSelectUtil'
  import { filterObj } from '@/utils/util';
  import qkhs from './modules/QKHS'
  import JInput from '../../../components/jeecg/JInput'
  import store from '../../khgl/khhmc/KhhmcList'

  export default {
    mixins: [JeecgListMixin],
    components: {
      JInput, JSelectDepart, JTreeSelect, moment, qkhs
    },
    data() {
      return {
        sfktsjyxdy: 1,
        description: '客户年龄分层统计',
        // 重置标识
        flag: true,
        // 默认当前月份
        defaultMonthOpera: undefined,
        monthFormat: 'YYYY-MM',
        msg: [],
        zyjbDictOptions: [],
        sfjsejyxdy: true,
        sfjssjyxdy: true,
        ejyxdybh: "YXDYGL_EJYXDYGL,DYMC,DYBH",
        sjyxdybh: "YXDYGL_SJYXDYGL,DYMC,DYBH",
        sjyxdybhdate:'',
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            width: 120,
            sorter: true,
          },
          {
            title: ' 所属支行',
            align: "center",
            dataIndex: 'zhmc_dictText',
            sorter: true,
          },
          // {
          //   title: '所属营销单元',
          //   align: "center",
          //   dataIndex: 'yxdy_dictText',
          //   sorter: true,
          // },
          {
            title: '所属乡镇',
            align:"center",
            dataIndex: 'ssxz_dictText'
          },
          {
            title: '行政村',
            align:"center",
            dataIndex: 'xzc_dictText'
          },
          {
            title: '行政组',
            align:"center",
            dataIndex: 'xzz_dictText'
          },
          {
            title: '年龄不详客户数',
            align: "center",
            dataIndex: 'nlbxkhs',
            sorter: true,
          },
          {
            title: '18岁以下客户数',
            align: "center",
            dataIndex: 'sbsyxkhs',
            sorter: true,
          },
          {
            title: '19-26岁客户数',
            align: "center",
            dataIndex: 'sjzel',
            sorter: true,
          },
          {
            title: '27-30岁客户数',
            align: "center",
            dataIndex: 'eqzsh',
            sorter: true,
          },
          {
            title: '31-40岁客户数',
            align: "center",
            dataIndex: 'syzsh',
            sorter: true,
          },
          {
            title: '41-55岁客户数',
            align: "center",
            dataIndex: 'syzww',
            sorter: true,
          },
          {
            title: '56-65岁客户数',
            align: "center",
            dataIndex: 'wlzlw',
            sorter: true,
          },
          {
            title: '66岁以上客户数',
            align: "center",
            dataIndex: 'llsys',
            sorter: true,
          },
        ],
        url: {
          list: "/tjfx.khnlfctj/tjfxkhnlfctj/list",
          delete: "/tjfx.khnlfctj/tjfxkhnlfctj/delete",
          deleteBatch: "/tjfx.khnlfctj/tjfxkhnlfctj/deleteBatch",
          exportXlsUrl: "tjfx.khnlfctj/tjfxkhnlfctj/exportXls",
          importExcelUrl: "tjfx.khnlfctj/tjfxkhnlfctj/importExcel",
          extract: "tjfx.khnlfctj/tjfxkhnlfctj/extract",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      // created(){
      //   this.querycsz()
      // },
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
        console.log("getCurrentMonth()："+this.defaultMonthOpera);
      },
      searchQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.sfjsejyxdy=true;
        this.sfjssjyxdy=true;
        this.sjyxdybhdate='';
        this.loadData(1);
      },
      loadData(arg) {
        this.querycsz();
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
        if ((params.tjyf=='undefined' || params.tjyf == null) && this.flag == true) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
          console.log("loadData()："+params.tjyf);
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      initData() {
        var params = this.getQueryParams();
        this.loading = true;
        putAction("/tjfx.khnlfctj/tjfxkhnlfctj/extract").then((res) => {
          this.$refs.qkhs.updateV();
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
          console.log("getQueryParams()："+tjyfMoment);
        }
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
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
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        // let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        // param.paramsStr = paramsStr
        // console.log("参数字符串",paramsStr)
        if (param.tjyf != null) {
          param.tjyf = param.tjyf.format("YYYY-MM")+"-01"
        }
        console.log("导出参数",param.tjyf)
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
        })
      },

      //查询是否显示三级营销单元字段1：是 2：否
      querycsz(){
        let params = { "csbm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          console.log("---------")
          if(res.result.csz==2){
            this.columns.splice(4,1)
          }
          this.sfktsjyxdy =res.result.csz

        });
      },

      getyjyxdybh(value) {
        if (value) {
          this.sfjsejyxdy=false,
            this.sfjssjyxdy=true,
            this.queryParam.ssxz = value
          let yjyxdybh = value
          this.ejyxdybh = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + yjyxdybh;
          console.log(this.ejyxdybh)
        }
      },
      getejyxdybh(value){
        if(value) {
          this.sfjssjyxdy=false,
            this.queryParam.xzc = value
          let ejyxdybh = value
          this.sjyxdybh = "YXDYGL_SJYXDYGL,DYMC,DYBH,EJYXDYBH = "+ejyxdybh;
          console.log(this.sjyxdybh)
        }
      },
      getsjyxdybh(value){
        this.sjyxdybhdate="",
          this.queryParam.xzz = value
        this.sjyxdybhdate = value
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>