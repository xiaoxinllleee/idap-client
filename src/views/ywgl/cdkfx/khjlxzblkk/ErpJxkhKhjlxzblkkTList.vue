<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.khyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">

          </template>


        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"></a-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="count" icon="area-chart" v-has="'khjlxzblkk:init'">提取</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('客户经理新增不良扣款')" v-has="'khjlxzblkk:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'khjlxzblkk:import'">导入</a-button>
     <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="yggh"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2500}"
        @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'khjlxzblkk:edit'">修改</a>
        <!--  <a-divider type="vertical" />-->
          <!--          <a-dropdown>-->
          <!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
          <!--            <a-menu slot="overlay">-->
          <!--              <a-menu-item>-->
          <!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
          <!--                  <a>删除</a>-->
          <!--                </a-popconfirm>-->
          <!--              </a-menu-item>-->
          <!--            </a-menu>-->
          <!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <erp-jxkh-khjlxzblkk-t-modal ref="modalForm" @ok="loadData"/>
    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import ErpJxkhKhjlxzblkkTModal from './modules/ErpJxkhKhjlxzblkkTModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import moment from 'moment'
import { filterObj } from '@/utils/util';
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import  {getAction} from '@/api/manage'
import {downFile} from "../../../../api/manage";
import ExcelImport from '@/components/common/ExcelImport'
import store from '@/store/'

export default {
  name: "ErpJxkhKhjlxzblkkTList",
  mixins:[JeecgListMixin],
  components: {
    JTreeSelect,ExcelImport,ErpJxkhKhjlxzblkkTModal
  },
  data () {
    return {
      description: '客户经理新增不良扣款管理页面',
      monthFormat: 'YYYY-MM',
      // 默认当前月份
      defaultMonthOpera: '',
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
          title: '考核月份',
          align:"center",
          dataIndex: 'khyf',
          customRender:function (text){
            return !text?"":(text.length>8?text.substr(0,7):text)
          }
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
          title: '员工工号',
          align:"center",
          dataIndex: 'yggh'
        },
        {
          title: '员工姓名',
          align:"center",
          dataIndex: 'yggh_dictText'
        },
        {
          title: '客户经理标识',
          align:"center",
          dataIndex: 'khjlbz'
        },
        {
          title: '岗位名称',
          align:"center",
          dataIndex: 'gwbz_dictText'
        },

        {
          title: '2019年以前',
          align:"center",
          children:[
            {
              title: '不良余额',
              align:"center",
              dataIndex: 'blye1'
            },

            {
              title: '本期应计扣款档次(元)',
              align:"center",
              dataIndex: 'yjkh1'
            },
          ]
        }  ,
        {
          title:'2019年以后',
          align: 'center',
          children: [
            {
              title: '第一责任人不良余额（万元）',
              align:"center",
              dataIndex: 'dyzrrblye'
            },
            {
              title: '管理责任人不良余额（万元）',
              align:"center",
              dataIndex: 'glzrrblye'
            },

            {
              title: '本期应计扣款金额（元）',
              align:"center",
              dataIndex: 'yjkh2'
            },
          ]
        },

        {
          title: '本期应计扣款总额（元）',
          align:"center",
          dataIndex: 'bqyjze'
        },
        {
          title: '上期实扣总额（元）',
          align:"center",
          dataIndex: 'sqsk'
        },
        {
          title: '本期应扣金额（元）',
          align:"center",
          dataIndex: 'bqyk'
        },
        {
          title: '本期应退金额（元）',
          align:"center",
          dataIndex: 'bqyt'
        },
        {
          title: '本期实扣(元)',
          align:"center",
          dataIndex: 'bqsk'
        },
        {
          title: '录入标志',
          align:"center",
          dataIndex: 'lrbz_dictText'
        },
        {
          title: '录入时间',
          align:"center",
          dataIndex: 'lrsj'
        },

        {
          title: '录入操作员',
          align:"center",
          dataIndex: 'lrczy'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align:"center",
          fixed: 'right',
          width:100,
          scopedSlots: { customRender: 'action' },
        }
      ],
      url: {
        list: "/khjlxzblkk/erpJxkhKhjlxzblkkT/list",
        delete: "/khjlxzblkk/erpJxkhKhjlxzblkkT/delete",
        deleteBatch: "/khjlxzblkk/erpJxkhKhjlxzblkkT/deleteBatch",
        exportXlsUrl: "khjlxzblkk/erpJxkhKhjlxzblkkT/exportXls",
        importExcelUrl: "khjlxzblkk/erpJxkhKhjlxzblkkT/importExcel",
        count: "khjlxzblkk/erpJxkhKhjlxzblkkT/count",
        exportTemplateUrl: "/khjlxzblkk/erpJxkhKhjlxzblkkT/exportTemplateXls",
      },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  created() {
    this.getCurrentMonth()

  },
  methods: {
    count(){
      let khyf = ''
      let params = this.queryParam
      if (this.queryParam.khyf == null || this.queryParam.khyf == ''){
        khyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
      }else {
        khyf = moment(this.queryParam.khyf).format("YYYY-MM")+'-01';
      }
      // params = {
      //   khyf: moment(params.khyf).format("YYYY-MM")+'-01'
      // }
      // params.khyf = tjyf
      this.loading = true
      getAction(this.url.count,{tjyf:khyf}).then((res)=>{
        if (res.success) {
          this.$message.success("提取成功！")
          this.loadData(1)
        } else {
          this.$message.warning("提取失败！")
        }
      }).catch((error) => {
        this.$message.error("提取失败", error)
      }).finally(() => {
        this.loading = false
      })
    },
    handleEdit: function (record) {
       this.$refs.modalForm.edit(record);
       this.$refs.modalForm.title = "编辑";
       this.$refs.modalForm.disableSubmit = false;
    },

    getCurrentMonth() {
      let curDate = new Date();
      let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
      this.defaultMonthOpera = moment(curDate, this.monthFormat);
      this.queryParam = {khyf: undefined};
      this.queryParam.khyf=this.defaultMonthOpera;
    },
    searchReset () {
      this.queryParam = { khyf: undefined ,jgdm:''}
      this.queryParam.khyf = this.defaultMonthOpera
      if(!store.getters.isRoot) {
        console.log( store.getters.ywjgdm)
        this.queryParam.jgdm = store.getters.ywjgdm
      }
      this.loadData(1)
    },
    loadData(arg) {
      if(!this.url.list){
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams();//查询条件
      if ((params.khyf != undefined && params.khyf != null)) {
        params.khyf = moment(params.khyf).format("YYYY-MM") + '-01';
      }
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
        if(res.code===510){
          this.$message.warning(res.message,5)
        }
        this.loading = false
      })
    },

    getQueryParams() {
      //获取查询条件
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      //日期格式调整
      let tjrqment = ""
      if (this.queryParam.khyf) {
        tjrqment = moment(this.queryParam.khyf).format("YYYY-MM") + '-01'
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if (param.khyf) {
        param.khyf = tjrqment;
      }
      return filterObj(param);
    },

    handleExportXls(fileName){
      if(!fileName || typeof fileName != "string"){
        fileName = "导出文件"
      }
      let tjyf = ''
      let param = Object.assign({}, this.queryParam)
      if (this.queryParam.khyf !== undefined && this.queryParam.khyf !== null) {
        tjyf = moment(param.khyf).format("YYYY-MM") + '-01'
      }
      param.khyf=tjyf;
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
        // this.loadData(1)
      })
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>