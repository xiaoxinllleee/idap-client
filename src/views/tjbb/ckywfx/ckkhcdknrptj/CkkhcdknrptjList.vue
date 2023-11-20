<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;" :format="monthFormat"
                              :defaultValue="defaultMonthOpera"/><!--:defaultValue="defaultMonthOpera" :format="monthFormat"-->
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属组织" v-model="queryParam.jgdm"  dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>

          <!--<template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px;">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>-->

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('存款客户存贷款年日平统计')" v-has="'ckkhcdknrptj:exportXls'">导出</a-button>
      <a-button @click="init" icon="area-chart" v-has="'ckkhcdknrptj:init'">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

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

        <span slot="khmc" slot-scope="text">
          <j-ellipsis :value="text" :length="12"/>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction } from '@/api/manage'
  import store from '@/store/'
  import moment from 'moment'
  import {downFile, postAction} from "../../../../api/manage";
  import JInput from "../../../../components/jeecg/JInput";
  import JEllipsis from "../../../../components/jeecg/JEllipsis";
  import {notification} from "ant-design-vue";

  export default {
    name: "CkkhcdknrptjList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      JTreeSelect
    },
    data() {
      return {
        queryParam:{
          jgdm:'',
        },
        exportLoading:false,
        description: '存款客户存贷款年日平统计管理页面',
        monthFormat: 'YYYY-MM',
        //默认当前月份
        defaultMonthOpera: '',
        // 重置标识
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            },
            width: 50,
          },
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
            width: 100,
          },
          {
            title: '所属组织',
            align: "center",
            dataIndex: 'zzbz',
            width: 100,
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            width: 120,
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm',
            width: 100,
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            width: 120,
            scopedSlots: {customRender: 'khmc'}
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180,
            scopedSlots: {customRender: 'zjhm'}
          },
          {
            title: '授信金额',
            align: "center",
            dataIndex: 'sxje',
            width: 80,
          },
          {
            title: '前三年第一年存款日平',
            align: "center",
            dataIndex: 'qsnDynckrp',
            width: 85,
          },
          {
            title: '前三年第二年存款日平',
            align: "center",
            dataIndex: 'qsnDenckrp',
            width: 85,
          },
          {
            title: '前三年第三年存款日平',
            align: "center",
            dataIndex: 'qsnDsnckrp',
            width: 85,
          },
          {
            title: '前三年第一年贷款日平',
            align: "center",
            dataIndex: 'qsnDyndkrp',
            width: 85,
          },
          {
            title: '前三年第二年贷款日平',
            align: "center",
            dataIndex: 'qsnDendkrp',
            width: 85,
          },
          {
            title: '前三年第三年贷款日平',
            align: "center",
            dataIndex: 'qsnDsndkrp',
            width: 85,
          },
        ],
        url: {
          list: "/ckkhcdknrptj/ckkhcdknrptj/list",
          delete: "/ckkhcdknrptj/ckkhcdknrptj/delete",
          deleteBatch: "/ckkhcdknrptj/ckkhcdknrptj/deleteBatch",
          exportXlsUrl: "ckkhcdknrptj/ckkhcdknrptj/exportXls",
          importExcelUrl: "ckkhcdknrptj/ckkhcdknrptj/importExcel",
          init: "/ckkhcdknrptj/ckkhcdknrptj/init",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.getCurrentMonth()
    },
    methods: {

      init() {
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === null) {
          notification.warning({ message: '系统提示', description: '请选择统计月份！',duration: 4})
          return false
        }
        var param = {'tjyf': moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'}
        this.loading = true
        postAction(this.url.init, param).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: '提取成功！',duration: 4})
            this.loadData(1)
          } else {
            notification.error({ message: '系统提示', description: '提取失败，请联系系统管理员！',duration: 4})
          }
        }).catch((error) => {
          notification.error({ message: '系统提示', description: '提取失败，请联系系统管理员！'+error,duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      handleExportXls(fileName){
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let param = Object.assign({}, this.queryParam)
        let tjyf =''
         if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
           tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
         }
         param.tjyf=tjyf
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
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
        }).finally(()=>{
          this.exportLoading=false
          this.loadData(1)
        })

      },
      getQueryParams() {
        let tjrqment = "";
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
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
        //let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate,this.monthFormat);
        //重新清空选择新日期
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
      },
      searchReset() {
        //this.flag = false
        //判断当前用户是不是root 如果是的话
        this.queryParam = {jgdm:'',tjyf:undefined}
        console.log(store.getters.isRoot)
        console.log(store.getters.ywjgdm)
        if (!store.getters.isRoot){
          this.queryParam.jgdm =store.getters.ywjgdm;
        }
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1)
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
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM")+ '-01';
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