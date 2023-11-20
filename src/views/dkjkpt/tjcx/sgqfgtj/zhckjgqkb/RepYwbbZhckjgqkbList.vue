<template>
  <a-card :bordered="false">

    <!-- 图表区域 -->
    <div>
      <a-row :gutter="24">
        <a-col :lg="8" :style="{ marginBottom: '10px'}">
          <a-card :loading="loading" :bordered="true" :body-style="{ padding: '0' }" style="border: 1px dashed #E8E8E8; border-radius: 5px;">
            <bzt-echarts :EcharNameList=this.EcharNameList :EchartList=this.EchartdateList ref="bztecharts"> </bzt-echarts>
          </a-card>
        </a-col>

        <a-col :lg="8" :style="{ marginBottom: '10px'}">
          <a-card :loading="loading" :bordered="true" :body-style="{ padding: '0' }" style="border: 1px dashed #E8E8E8; border-radius: 5px;">
            <bztanlfl-echarts :EcharNameList=this.nlfcEcharNameList :EchartList=this.nlfcEchartdateList ref="bztanlflEcharts"> </bztanlfl-echarts>
          </a-card>
        </a-col>

        <a-col :lg="8" :style="{ marginBottom: '10px'}">
          <a-card :loading="loading" :bordered="true" :body-style="{ padding: '0' }" style="border: 1px dashed #E8E8E8; border-radius: 5px;">
            <bztdhckyefl-echarts :EcharNameList=this.ckyeEcharNameList :EchartList=this.ckyeEchartdateList ref="bztdhckyeflEcharts"> </bztdhckyefl-echarts>
          </a-card>
        </a-col>
      </a-row>




    </div>


    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
            <a-col :md="6" :sm="8"><a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item></a-col>
          <!--<a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjzzbz"
                             showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="hr_bas_organization, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="所属机构">
              <j-tree-select v-model="queryParam.jgdm"
                             :showSearch="true"
                             placeholder="请选择支行"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                             treeNodeFilterProp="title"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="area-chart" @click="initData" v-has="'RepYwbbZhckjgqkb:init'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('支行存款结构情况表')" style="margin-left: 8px;" v-has="'RepYwbbZhckjgqkb:exp'">导出</a-button>
     <!-- <a-button type="primary" @click="queryEchart" icon="reload" style="margin-left: 8px;">刷新</a-button>-->
      <a-button @click="TogglequeryData()" icon="reload" style="margin-left: 8px;" v-has="'RepYwbbZhckjgqkb:switch'">{{this.switch}}</a-button>

    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 3000 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

<!--
        <template slot="jgdm" slot-scope="jgdm, record">{{ jgdm.first }} {{ jgdm.last }}
        </template>-->
<!--      <span slot="jgmc" slot-scope="text">-->
<!--        <j-ellipsis :value="text" :length="5"/>-->
<!--      </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <repYwbbZhckjgqkb-modal ref="modalForm" @ok="modalFormOk"></repYwbbZhckjgqkb-modal>
  </a-card>
</template>

<script>
  import RepYwbbZhckjgqkbModal from './modules/RepYwbbZhckjgqkbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'
  import bztEcharts from './modules/bztEcharts'
  import bztanlflEcharts from './modules/bztanlflEcharts'
  import bztdhckyeflEcharts from './modules/bztdhckyeflEcharts'
  import JEllipsis from '../../../../../components/jeecg/JEllipsis'



  export default {
    name: "RepYwbbZhckjgqkbList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      RepYwbbZhckjgqkbModal,JTreeSelect,bztEcharts,bztanlflEcharts,bztdhckyeflEcharts
    },
    data () {
      return {
        description: '支行存款结构情况表管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        EcharNameList:[],
        EchartdateList:[],
        nlfcEcharNameList:[],
        nlfcEchartdateList:[],
        ckyeEcharNameList:[],
        ckyeEchartdateList:[],
        sjlx:1,
        switch:'切换余额',
        // 重置标识
        flag: true,
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            width: 120,
            sorter: true,
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm',
            sorter: true,
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText',
            scopedSlots: { customRender: 'jgmc' },
          },
          {
            title:'存款总量',
            children:[
              {
                title: '存款总余额',
                align: "center",
                dataIndex: 'ckzye',
                sorter: true,
              },
              {
                title: '有余额户数',
                align: "center",
                dataIndex: 'yyehs',
                sorter: true,
              },
            ]
          },
          {
            title:'按客户性质分',
            children:[
              {
                title:'储蓄',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'cxhs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'cxye',
                    sorter: true,
                  },
                ]
              },
              {
                title:'对公',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'dghs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'dgye',
                    sorter: true,
                  },
                ]
              },
            ]
          },
          {
            title:'个人客户按年龄分类',
            children:[
              {
                title:'30岁以下',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'sssyxhs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'sssyxye',
                    sorter: true,
                  },
                ]
              },
              {
                title:'30岁到50岁',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'sszwsshs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'sszwssye',
                    sorter: true,
                  },
                ]
              },
              {
                title:'50岁到65岁',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wszlsshs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wszlssye',
                    sorter: true,
                  },
                ]
              },
              {
                title:'65岁以上',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'lswsyshs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'lswsysye',
                    sorter: true,
                  },
                ]
              },
            ]
          },
          {
            title:'按单户存款余额分类',
            children:[
              {
                title:'1万元以下',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'ywyyxhs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'ywyyxye',
                    sorter: true,
                  },
                ]
              },
              {
                title:'1万元至5万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'ywzwwyhs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'ywzwwyye',
                    sorter: true,
                  },
                ]
              },
              {
                title:'5万元至10万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wwzswyhs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wwzswyye',
                    sorter: true,
                  },
                ]
              },
              {
                title:'10万元至50万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'swzwswyhs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'swzwswyye',
                    sorter: true,
                  },
                ]
              },
              {
                title:'50万元以上',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wswyyshs',
                    sorter: true,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wswyysye',
                    sorter: true,
                  },
                ]
              },
            ]
          },
        ],
        url: {
          list: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/list",
          delete: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/delete",
          deleteBatch: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/deleteBatch",
          exportXlsUrl: "dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/exportTemplateXls",
          importExcelUrl: "dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/importExcel",
          init:"/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/extract",
          queryechart:"/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/queryechart",

        },
      }
    },
    created() {
      this.queryData(this.sjlx)
    },
    /*mounted(){
      this.$nextTick(function() {
        this.$ref.bztEcharts.initEchartM();
      })
    },*/
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {

      searchQuery() {
        this.beforeSearchQuery();
        this.loadData(1);
        this.queryData(this.sjlx);
      },

      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },

      searchReset() {
        this.flag = false;
        this.queryParam = {};
       /* if (this.sjlx==1){
          this.sjlx=2
        }else(

          this.sjlx=1
        )*/
        this.queryData(this.sjlx)
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
      getQueryParams(){
        let tjrqment = "";
        let tjrqstr = this.queryParam.tjyf;
        console.info(this.queryParam.tjyf)
        if(this.queryParam.tjyf&&tjrqstr.toString().length!=10) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }else{
          tjrqment = this.queryParam.tjyf
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
      initData() {
        var params =this.queryParam;
        if (params.tjyf==null || params.tjyf=='undefined') {
          params.tjyf = this.defaultMonthOpera;
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading = true;
        putAction(this.url.init, 'TJYF='+tjyfstr).then((res) => {
          if(res.success){
            this.loadData()
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.tjyf != null){
          param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
        console.log("导出参数",param)
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


      /*handleTableChange(ipagination, filters, sorter) {
        console.log(ipagination);
        const pager = { ...this.ipagination };
        pager.current = ipagination.current;
        this.ipagination = pager;
        this.fetch({
          results: ipagination.pageSize,
          page: ipagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
      fetch(params = {}) {
        console.log('params:', params);
        this.loading = true;
        getAction({
          url: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/list",
          method: 'get',
          data: {
            results: 10,
            ...params,
          },
          type: 'json',
        }).then(data => {
          const ipagination = { ...this.ipagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          ipagination.total = 200;
          this.loading = false;
          this.data = data.results;
          this.ipagination = ipagination;
        });
      },*/


      TogglequeryData( ) {
        this.EcharNameList=[];
        this.EchartdateList=[];
        this.nlfcEcharNameList=[];
        this.nlfcEchartdateList=[];
        this.ckyeEcharNameList=[];
        this.ckyeEchartdateList=[];

        if (this.sjlx ==1) {
          this.sjlx = 2;
          this.switch ='切换户数';
        }else{
          this.sjlx = 1
          this.switch ='切换余额';
        }
        this.queryData(this.sjlx)
      },

      queryData(cxlx) {
        //cxlx 1 是查询户数，2是查询余额
        var paramss =this.queryParam;
       if(this.queryParam.tjyf) {
         paramss.tjyf  = moment(paramss.tjyf).format("YYYY-MM")+'-01';
         // alert(paramss.tjyf)
        }
        putAction(this.url.queryechart,{"jgdm":paramss.jgdm,"tjyf":paramss.tjyf,"cxlx":cxlx}).then((res) => {
          if(res.success){
            if (cxlx==1) {
              this.$message.success(res.message);
              this.EcharNameList.push("储蓄户数", "对公户数")
              this.EchartdateList = res.result.list;
              console.info(res.result.list)
              this.nlfcEcharNameList.push("30岁以下户数", "30~50岁户数","50~65岁户数","65岁以上户数")
              this.nlfcEchartdateList = res.result.nlfclist;
              console.info("-----")
              this.ckyeEcharNameList.push("1万元以下户数", "1~5万元户数","5~10万元户数","10~50万元户数","50万元以上户数")
              this.ckyeEchartdateList = res.result.ckyefclist;
              console.info("-----")


            }else {
              this.$message.success(res.message);
              this.EcharNameList.push("储蓄余额", "对公余额")
              this.EchartdateList = res.result.list;
              console.info(res.result.list)
              this.nlfcEcharNameList.push("30岁以下存款余额", "30~50岁存款余额","50~65岁存款余额","65岁以上存款余额")
              this.nlfcEchartdateList = res.result.nlfclist;

              this.ckyeEcharNameList.push("1万元以下余额","1~5万元余额","5~10万元余额","10~50万元余额","50万元以上余额")
              this.ckyeEchartdateList = res.result.ckyefclist;
              console.log(this.ckyeEchartdateList)
              console.log("@@@")
              console.log(this.ckyeEcharNameList)
            }
            this.loadData(1);
          }else{
            this.$message.warning(res.message,5);
          }
        })
      },


      queryEchart(){
          this.$refs.bztecharts.initEchartM();

      }

    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>