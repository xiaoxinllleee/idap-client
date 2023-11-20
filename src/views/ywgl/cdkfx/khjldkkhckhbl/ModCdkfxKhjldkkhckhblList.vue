<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="dateFormat"></a-date-picker>
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
            <a-form-item label="员工姓名">
              <j-dict-select-tag placeholder="请输入员工姓名" v-model="queryParam.yggh" dict-code="view_staff_dict,khjl,khjlbh" :show-search="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('客户经理贷款客户存款回报率')" v-has="'khjldkkhckhbl:exportXls'">导出</a-button>
      <a-button @click="count" icon="area-chart" v-has="'khjldkkhckhbl:init'">提取</a-button>
      <a-button icon="download" @click="exp('客户经理贷款客户存款回报率导出明细')" v-has="'khjldkkhckhbl:exp'">导出明细</a-button>
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :columns="columns"
        :dataSource="dataSource"
        rowKey="yggh"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'khjldkkhckhbl:edit'">编辑</a>

          <a-divider type="vertical" />
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                 </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'khjldkkhckhbl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <modCdkfxKhjldkkhckhbl-modal ref="modalForm" @ok="modalFormOk"></modCdkfxKhjldkkhckhbl-modal>
  </a-card>
</template>

<script>
  import ModCdkfxKhjldkkhckhblModal from './modules/ModCdkfxKhjldkkhckhblModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import { deleteAction, getAction,downFile } from '@/api/manage'
  import {filterObj} from "../../../../utils/util";
  import store from '@/store/'
  export default {
    name: "ModCdkfxKhjldkkhckhblList",
    mixins:[JeecgListMixin],
    components: {
      ModCdkfxKhjldkkhckhblModal,JTreeSelect
    },
    data () {
      return {
        description: '客户经理贷款客户存款回报率管理页面',
        dateFormat: 'YYYY-MM-DD',
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
            title: '统计日期',
            align:"center",
            dataIndex: 'tjyf'
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
            title: '客户经理标识',
            align:"center",
            dataIndex: 'khjl'
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
            title: '贷款年日平',
            align:"center",
            dataIndex: 'dknrp'
          },
          {
            title: '存款年日平',
            align:"center",
            dataIndex: 'cknrp'
          },
          {
            title: '存款回报率',
            align:"center",
            dataIndex: 'ckhbl'
          },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '存款回报率(余额)',
            align:"center",
            dataIndex: 'ckyehbl'
           },

          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },


        ],
		url: {
          list: "/khjldkkhckhbl/modCdkfxKhjldkkhckhbl/list",
          delete: "/khjldkkhckhbl/modCdkfxKhjldkkhckhbl/delete",
          deleteBatch: "/khjldkkhckhbl/modCdkfxKhjldkkhckhbl/deleteBatch",
          exportXlsUrl: "khjldkkhckhbl/modCdkfxKhjldkkhckhbl/exportXls",
          importExcelUrl: "khjldkkhckhbl/modCdkfxKhjldkkhckhbl/importExcel",
          exp:"khjldkkhckhbl/modCdkfxKhjldkkhckhbl/exp",
          count:"khjldkkhckhbl/modCdkfxKhjldkkhckhbl/count",
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
        let tjyf = ''
        let params = this.queryParam
        if (this.queryParam.tjyf == null || this.queryParam.tjyf == ''){
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM-DD")
        }else {
          tjyf = moment(this.queryParam.tjyf).format("YYYY-MM-DD");
        }
        params={
          tjyf: moment(params.tjyf).format("YYYY-MM-DD")
        }
        this.loading = true
        getAction(this.url.count,params).then((res)=>{
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
      getQueryParams() {
        let tjrqment = "";
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM-DD");
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },

      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.dateFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      searchReset () {
        this.queryParam = { tjyf: undefined ,jgdm:''}
        this.queryParam.tjyf = this.defaultMonthOpera
        if(!store.getters.isRoot) {
          console.log( store.getters.ywjgdm)
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1)
      },

      loadData(arg) {
        // 获取当前月份
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM-DD")
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
      exp(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM-DD")
        }
        param.tjyf=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading = true
        downFile(this.url.exp,param).then((data)=>{
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

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM-DD")
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
          // this.loadData(1)
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>