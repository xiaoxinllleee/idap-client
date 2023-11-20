<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('全行表内不良贷款结构情况表2')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 5000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <qhBnbldkJgqkb2-modal ref="modalForm" @ok="modalFormOk"></qhBnbldkJgqkb2-modal>
  </a-card>
</template>

<script>
  import QhBnbldkJgqkb2Modal from './modules/QhBnbldkJgqkb2Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import moment from "moment"

  export default {
    name: "QhBnbldkJgqkb2List",
    mixins:[JeecgListMixin],
    components: {
      QhBnbldkJgqkb2Modal,JTreeSelect
    },
    data () {
      return {
        description: '全行表内不良贷款结构情况表2管理页面',
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
            width:120,
          },

          {
            title:'按形成原因分类',
            children:[
              {
                title:'宏观产业政策',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'hgcyzchs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'hgcyzcje'
                  },
                ]
              },
              {
                title:'企业经营管理',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'qyjyglhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'qyjyglje'
                  },
                ]
              },
              {
                title:'客户涉及民间融资',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'khsjmjrzhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'khsjmjrzje'
                  },
                ]
              },
              {
                title:'其它客观性因素',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'qtkgyshs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'qtkgysje'
                  },
                ]
              },

              {
                title:'制度缺失',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'zdqshshs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'zdqshsje'
                  },
                ]
              },
              {
                title:'决策失误',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'jcswhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'jcswje'
                  },
                ]
              },

              {
                title:'信贷人员违规',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'xdrywghs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'xdrywgje'
                  },
                ]
              },


              {
                title:'风险意识淡薄',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'fxysdbhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'fxysdbje'
                  },
                ]
              },

              {
                title:'管理、交接不规范',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'gljjbgfhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'gljjbgfje'
                  },
                ]
              },

              {
                title:'其它主观原因',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'qtzgyyhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'qtzgyyje'
                  },
                ]
              },

            ]
          },

          {
            title:'按借款主体分类',
            children:[
              {
                title:'农户',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'nhhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'nhje'
                  },
                ]
              },
              {
                title:'商户',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'qyhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'qyje'
                  },
                ]
              },
              {
                title:'其它自然人',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'zrrhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'zrrje'
                  },
                ]
              },
              {
                title:'公司类客户',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'gslhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'gslje'
                  },
                ]
              },

              {
                title:'新型农业经营主体',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'xxnyjyzths'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'xxnyjyztje'
                  },
                ]
              },
            ]
          },

		  /* {
            title: '其他户数',
            align:"center",
            dataIndex: 'qths'
           },
		   {
            title: '其他金额',
            align:"center",
            dataIndex: 'qtje'
           },*/

        ],
        url: {
          list: "/dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb2/qhBnbldkJgqkb2/list",
          delete: "/dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb2/qhBnbldkJgqkb2/delete",
          deleteBatch: "/dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb2/qhBnbldkJgqkb2/deleteBatch",
          exportXlsUrl: "dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb2/qhBnbldkJgqkb2/exportTemplateXls",
          importExcelUrl: "dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb2/qhBnbldkJgqkb2/importExcel",
          init:"/dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb2/qhBnbldkJgqkb2/extract",
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
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1 }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
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
        if(this.queryParam.tjyf) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf  = tjrqment;
        }
        return filterObj(param);
      },
      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
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
          param.tjyf=param.tjyf.format("YYYY-MM")+'-01'
        }
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
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>