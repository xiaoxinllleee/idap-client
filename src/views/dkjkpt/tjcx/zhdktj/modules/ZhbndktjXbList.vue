<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="16">

          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择支行" v-model="queryParam.jgdm" dict="V_HR_BAS_ORGANIZATION_CMMSZH, ZZJC, YWJGDM" pid-field="SJYWJGDM"
                           treeNodeFilterProp="title" :showSearch="true" :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="数据维度">
            <j-dict-select-tag placeholder="请选择数据维度" v-model="queryParam.sjwd" dictCode="sjwd" :change="handlePdzq()"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="统计月份" v-if="this.sjwdsx!=null">
            <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"/>
          </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="贷款金额">
                <a-input-group compact>
                  <a-input placeholder="Min" v-model="queryParam.dkje_begin" style="width: 40%; text-align: center;"/>
                  <a-input placeholder="~" disabled style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF;"/>
                  <a-input placeholder="Max" v-model="queryParam.dkje_end" style="width: 40%; text-align: center; border-left: 0;"/>
                </a-input-group>
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
      <a-button icon="area-chart" @click="initData" v-has="'zhdktjxb:extract1'">统计</a-button>
      <a-button icon="download" @click="handleExportXls('支行贷款统计(旬报)')" style="margin-left: 8px;" v-has="'zhdktjxb:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a>项-->
<!--        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
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
  import { putAction,getAction } from '@/api/manage'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import { filterObj } from '../../../../../utils/util'

  export default {
    name: "Zhbndktj_xbList",
    mixins:[ JeecgListMixin ],
    components: {
      AFormItem,
      JTreeSelect,
      JSelectDepart
    },
    data () {
      return {
        description: '支行贷款统计(旬报)管理页面',
        // monthFormat: 'YYYY-MM',
        // // 默认当前月份
        // defaultMonthOpera: undefined,
        // // 重置标识
        // flag: true,
        sjwdsx:null,
        sjwdzx:null,
        sjwdxx:null,
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
            title: '统计日期',
            align:"center",
            dataIndex: 'tjyf',
            width: 120
          },
          {
            title: '数据维度',
            align:"center",
            dataIndex: 'sjwd_dictText',
            width: 100
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
            width: 120
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye',
            width: 120
          },
		      {
            title: '不良余额',
            align:"center",
            dataIndex: 'blye',
            width: 120
          },
		      {
            title: '不良余额比例',
            align:"center",
            dataIndex: 'blyebl',
            width: 120
          },
		      {
            title: '当旬到期贷款金额',
            align:"center",
            dataIndex: 'dndqdkje',
            width: 130
          },
		      {
            title: '当旬到期收回金额',
            align:"center",
            dataIndex: 'dndqshje',
            width: 130
          },
		      {
            title: '当旬到期收回率',
            align:"center",
            dataIndex: 'dqdqshl',
            width: 120
          }
        ],
		    url: {
          list: "/zhbndktj_xb/zhbndktjXb/list",
          delete: "/zhbndktj_xb/zhbndktjXb/delete",
          deleteBatch: "/zhbndktj_xb/zhbndktjXb/deleteBatch",
          exportXlsUrl: "zhbndktj_xb/zhbndktjXb/exportXls",
          importExcelUrl: "zhbndktj_xb/zhbndktjXb/importExcel",
          init:"/zhbndktj_xb/zhbndktjXb/extract"
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {

      handlePdzq(){
        var param = this.queryParam
        if (param.sjwd !=null) {
          this.sjwdsx = param.sjwd
        }
      },

      /*searchQuery(){
        var params = this.queryParam
        if (params.sjwd==null || params.sjwd=='undefined'){
          this.$message.warning("查询请选择数据维度！");
          return
        } else {
          this.loadData(1);
        }
      },*/
      initData() {
        var params = this.queryParam
        if (params.tjyf==null || params.sjwd ==null || params.tjyf=='undefined') {
          this.$message.error("统计月份或者时间维度不能为空!")
          return
        }
        let tjyf = params.tjyf.format("YYYYMM");
        this.loading = true;
        putAction(this.url.init,{"tjyf":tjyf,"sjwd":params.sjwd},'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message);
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      // 查询条件格式化转换
      getQueryParams() {
        console.log("@@@@@@@@@@@@@@@@@@@@@@")
        let sjwd = this.queryParam.sjwd
        let tjyf = this.queryParam.tjyf
        let tjyfMoment = ""
        if(tjyf!=null && tjyf!='undefined') {
          tjyfMoment=tjyf.format("YYYY-MM")+'-01'
        }
        console.log(tjyfMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.tjyf = tjyfMoment;
        this.sjwdsx=null;
        return filterObj(param);
      },
      /*loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
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
        this.queryParam = {}
      },*/
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>