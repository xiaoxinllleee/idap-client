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
      <a-button  icon="area-chart" @click="initData">提取</a-button>
      <a-button  icon="download" @click="handleExportXls('全行存款结构情况表')">导出</a-button>
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
        :scroll="{ x: 3000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <repYwbbQhckjgqkb-modal ref="modalForm" @ok="modalFormOk"></repYwbbQhckjgqkb-modal>
  </a-card>
</template>

<script>
  import RepYwbbQhckjgqkbModal from './modules/RepYwbbQhckjgqkbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'

  export default {
    name: "RepYwbbQhckjgqkbList",
    mixins:[JeecgListMixin],
    components: {
      RepYwbbQhckjgqkbModal,JTreeSelect
    },
    data () {
      return {
        description: '全行存款结构情况表管理页面',
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
            align: "center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            width: 120,
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
          },
          {
            title:'存款总量',
            children:[
              {
                title: '存款总余额',
                align: "center",
                dataIndex: 'ckzye'
              },
              {
                title: '有余额户数',
                align: "center",
                dataIndex: 'yyehs'
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
                    dataIndex: 'cxhs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'cxye'
                  },
                ]
              },
              {
                title:'对公',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'dghs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'dgye'
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
                    dataIndex: 'sssyxhs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'sssyxye'
                  },
                ]
              },
              {
                title:'30岁到50岁',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'sszwsshs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'sszwssye'
                  },
                ]
              },
              {
                title:'50岁到65岁',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wszlsshs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wszlssye'
                  },
                ]
              },
              {
                title:'65岁以上',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'lswsyshs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'lswsysye'
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
                    dataIndex: 'ywyyxhs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'ywyyxye'
                  },
                ]
              },
              {
                title:'1万元至5万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'ywzwwyhs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'ywzwwyye'
                  },
                ]
              },
              {
                title:'5万元至10万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wwzswyhs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wwzswyye'
                  },
                ]
              },
              {
                title:'10万元至50万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'swzwswyhs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'swzwswyye'
                  },
                ]
              },
              {
                title:'50万元以上',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wswyyshs'
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wswyysye'
                  },
                ]
              },
            ]
          },
        ],
        url: {
          list: "/dkjkpt.tjcx.sgqfgtj.qhckjgqkb/repYwbbQhckjgqkb/list",
          delete: "/dkjkpt.tjcx.sgqfgtj.qhckjgqkb/repYwbbQhckjgqkb/delete",
          deleteBatch: "/dkjkpt.tjcx.sgqfgtj.qhckjgqkb/repYwbbQhckjgqkb/deleteBatch",
          exportXlsUrl: "dkjkpt.tjcx.sgqfgtj.qhckjgqkb/repYwbbQhckjgqkb/exportTemplateXls",
          importExcelUrl: "dkjkpt.tjcx.sgqfgtj.qhckjgqkb/repYwbbQhckjgqkb/importExcel",
          init:"/dkjkpt.tjcx.sgqfgtj.qhckjgqkb/repYwbbQhckjgqkb/extract",
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
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          params.tjyf = this.defaultMonthOpera
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>