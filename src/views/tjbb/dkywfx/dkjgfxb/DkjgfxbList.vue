<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="统计日期" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
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
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('支行贷款结构分析表')" v-has="'zhdkjgfxb:exportXls'">导出</a-button>
      <a-button icon="area-chart" @click="init" v-has="'zhdkjgfxb:init'">提取</a-button>
    </div>
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
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { downFile, getAction } from '@/api/manage'
  import store from '@/store/'
  import moment from 'moment'
  import {postAction} from "../../../../api/manage";
  import {notification} from "ant-design-vue";

  export default {
    name: "DkjgfxbList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '贷款结构分析表管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
        // 重置标识
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
            title: '金额区间',
            align:"center",
            dataIndex: 'jeqj_dictText'
           },
          {
            title: '上年年底',
            children: [
		   {
            title: '户数',
            align:"center",
            dataIndex: 'snndHs'
           },
		   {
            title: '金额',
            align:"center",
            dataIndex: 'snndJe'
           },
		   {
            title: '余额',
            align:"center",
            dataIndex: 'snndYe'
           },
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
              },
            ]
          },

          {
            title: '户数较年初',
            children: [
              {
                title: '增减',
                align: "center",
                dataIndex: 'hsjncZj'
              },
              {
                title: '占比(%)',
                align: "center",
                dataIndex: 'hsjncZb'
              },
            ]
          },

          {
            title: '余额较年初',
            children: [
              {
                title: '增减',
                align: "center",
                dataIndex: 'yejncZj'
              },
              {
                title: '占比(%)',
                align: "center",
                dataIndex: 'yejncZb'
              },
            ]
          },

          {
            title: '户数较上月',
            children: [
              {
                title: '增减',
                align: "center",
                dataIndex: 'hsjsyZj'
              },
              {
                title: '占比(%)',
                align: "center",
                dataIndex: 'hsjsyZb'
              },
            ]
          },

          {
            title: '余额较上月',
            children: [
              {
                title: '增减',
                align: "center",
                dataIndex: 'yejsyZj'
              },
              {
                title: '占比(%)',
                align: "center",
                dataIndex: 'yejsyZb'
              },
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
        ],
		url: {
          list: "/dkjgfxb/dkjgfxb/list",
          delete: "/dkjgfxb/dkjgfxb/delete",
          deleteBatch: "/dkjgfxb/dkjgfxb/deleteBatch",
          exportXlsUrl: "dkjgfxb/dkjgfxb/exportXls",
          importExcelUrl: "dkjgfxb/dkjgfxb/importExcel",
          init: "/dkjgfxb/dkjgfxb/init",
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
        this.queryParam = {tjrq: undefined}
        this.queryParam.tjrq = this.defaultMonthOpera;
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
        postAction(this.url.init, params).then((res) => {
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
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjrqMoment = '';
        if (this.queryParam.tjrq !== undefined && this.queryParam.tjrq !== null) {
          tjrqMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        let param = this.queryParam;
        param.tjrq =tjrqMoment
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
        let tjrqMoment = '';
        if (this.queryParam.tjrq) {
          tjrqMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq = tjrqMoment;
        }
        return filterObj(param);
      },
      searchReset() {
        this.queryParam = {tjrq :undefined,jgdm:''};
        if (!store.getters.isRoot){
          this.queryParam.jgdm=store.getters.ywjgdm
        }
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