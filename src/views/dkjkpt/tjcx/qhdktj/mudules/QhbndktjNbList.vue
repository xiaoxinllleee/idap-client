<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="16">

          <a-col :md="6" :sm="8"><a-form-item label="统计年份">
            <a-select placeholder="请选择统计年份" v-model="queryParam.tjyf" :defaultValue="dateValue">
              <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款金额">
              <a-input-group compact>
                <a-input style=" width: 40%; text-align: center; "
                         v-model="queryParam.dkje_begin"
                         placeholder="Min" />
                <a-input style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "
                         placeholder="~"
                         disabled />
                <a-input style="width: 40%; text-align: center; border-left: 0;"
                         v-model="queryParam.dkje_end"
                         placeholder="Max" />
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款余额">
              <a-input-group compact>
                <a-input style=" width: 40%; text-align: center; "
                         v-model="queryParam.dkye_begin"
                         placeholder="Min" />
                <a-input style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "
                         placeholder="~"
                         disabled />
                <a-input style="width: 40%; text-align: center; border-left: 0; "
                         v-model="queryParam.dkye_end"
                         placeholder="Max" />
              </a-input-group>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;"
                  class="table-page-search-submitButtons">
              <a-button type="primary"
                        icon="search"
                        @click="searchQuery">查询</a-button>
              <a-button icon="reload"
                        @click="searchReset"
                        style="margin-left: 8px;">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="area-chart"
                @click="initData" v-has="'qhdktjnb:extract1'">统计</a-button>
      <a-button icon="download"
                @click="handleExportXls('全行贷款统计(年报)')"
                style="margin-left: 8px;" v-has="'qhdktjnb:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项-->
<!--        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>-->
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
        :scroll="{ x: 1800 }"
        @change="handleTableChange"/>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { putAction } from '@/api/manage'
  import { filterObj } from '../../../../../utils/util'

  export default {
    name: "Qhbndktj_nbList",
    mixins:[JeecgListMixin],
    components: {
    },
    data () {
      return {
        description: '全行贷款统计(年报)管理页面',
        dateValue: '',
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
            title: '统计年份',
            align:"center",
            dataIndex: 'tjyf',
            width: 120,
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
            },
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
            title: '当年到期贷款金额',
            align:"center",
            dataIndex: 'dndqdkje',
            width: 130
          },
		      {
            title: '当年到期收回金额',
            align:"center",
            dataIndex: 'dndqshje',
            width: 130
          },
		      {
            title: '当年到期收回率',
            align:"center",
            dataIndex: 'dqdqshl',
            width: 130
          }
        ],
		    url: {
          list: "/qhbndktj_nb/qhbndktjNb/list",
          delete: "/qhbndktj_nb/qhbndktjNb/delete",
          deleteBatch: "/qhbndktj_nb/qhbndktjNb/deleteBatch",
          exportXlsUrl: "qhbndktj_nb/qhbndktjNb/exportXls",
          importExcelUrl: "qhbndktj_nb/qhbndktjNb/importExcel",
          init:"qhbndktj_nb/qhbndktjNb/extract",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.init();
    },
    methods: {
      // 获取当前年份
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      initData() {
        this.loading = true;
        var params = this.queryParam
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("统计年份不能为空!")
          return
        } else {
          var tjyf = params.tjyf+'1201';
        }
        putAction(this.url.init,{"tjyf":tjyf},'put').then((res) => {
          if(res.success){
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams() {
        console.log("getQueryParams => @@@@@@@@@@@@")
        let tjyf = this.queryParam.tjyf
        let tjyfMoment = "";
        if (tjyf!=null && tjyf!='undefined'){
          tjyfMoment = tjyf + '-12-01'
        }
        console.log(tjyfMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.tjyf=tjyfMoment;
        return filterObj(param);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>