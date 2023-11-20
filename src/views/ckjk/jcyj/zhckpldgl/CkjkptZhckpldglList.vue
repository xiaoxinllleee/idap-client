<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="支行名称">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm_b"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.sjjg"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization, zzjc, ywjgdm"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="存款类型">
              <j-dict-select-tag placeholder="请输入存款类型" v-model="queryParam.tjbs" dict-code="pldcklx"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="偏离度（月）">
              <a-input placeholder="" v-model="queryParam.ypld_begin" style="width: 40%; text-align: center"/>
              <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
              <a-input placeholder="" v-model="queryParam.ypld_end" style="width: 40%; text-align: center; border-left: 0"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="偏离度（年）">
                <a-input placeholder="" v-model="queryParam.npld_begin" style="width: 40%; text-align: center"/>
                <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
                <a-input placeholder="" v-model="queryParam.npld_end" style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <!--<a-col :md="6" :sm="8">
              <a-form-item label="余额">
                <a-input-number placeholder="请输入余额" v-model="queryParam.ye" style="width: 100%;"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="月日平">
                <a-input-number placeholder="请输入月日平" v-model="queryParam.yrp" style="width: 100%;"/>
              </a-form-item>
            </a-col>-->
          </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('支行存款偏离度管理')" v-has="'zhckpldgl:exportXls'">导出</a-button>
      <a-button icon="import" @click="initData" v-has="'zhckpldgl:init'">提取</a-button>
    </div>

    <!-- table区域-begin -->
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
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import moment from 'moment'
  import {initDictOptions, filterDictText} from '@/components/dict/JDictSelectUtil'
  import { filterObj } from '@/utils/util'
  import { downFile, postAction } from '../../../../api/manage'
  import store from '@/store/'

  export default {
    name: "CkjkptZhckpldglList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      moment
    },
    data () {
      return {
        description: '支行存款偏离度管理',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 重置标识
        flag: true,
        show: true,
        isorter: {
          order: 'desc',
        },
        zyjbDictOptions:[],
        // 表头
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
          },
          {
            title: '支行代码',
            align:"center",
            dataIndex: 'sjjg',
          },
          {
            title: '支行名称',
            align:"center",
            dataIndex: 'sjjg_dictText',
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
            title: '存款类型',
            align:"center",
            dataIndex: 'tjbs_dictText'
          },
          {
            title: '余额',
            align:"center",
            dataIndex: 'ye',
            sorter: true,
          },
          {
            title: '月日平',
            align:"center",
            dataIndex: 'yrp',
            sorter: true,
          },
          {
            title: '年日平',
            align:"center",
            dataIndex: 'nrp',
            sorter: true,
          },
          {
            title: '偏离度（月）',
            align:"center",
            dataIndex: 'ypld',
            sorter: true,
          },
          {
            title: '偏离度（年）',
            align:"center",
            dataIndex: 'npld',
            sorter: true,
          }
        ],
        url: {
          list: "/CkjkptZhckpldgl/ckjkptZhckpldgl/list",
          delete: "/CkjkptZhckpldgl/ckjkptZhckpldgl/delete",
          deleteBatch: "/CkjkptZhckpldgl/ckjkptZhckpldgl/deleteBatch",
          exportXlsUrl: "CkjkptZhckpldgl/ckjkptZhckpldgl/exportXls",
          importExcelUrl: "CkjkptZhckpldgl/ckjkptZhckpldgl/importExcel",
          extract: "/CkjkptZhckpldgl/ckjkptZhckpldgl/extract",
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
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      searchReset() {
        this.queryParam = {tjyf: undefined, jgdm: undefined, sjjg: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
          this.queryParam.sjjg = store.getters.ywjgdm
        }
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
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
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
      initData() {
        let tjyf=''
        var params = Object.assign({}, this.queryParam)
        if (params.tjyf === undefined || params.tjyf === null) {
          this.$message.warning("请选择统计月份！")
          return false
        }else {
           tjyf = moment(params.tjyf).format("YYYY-MM")+"-01"
        }
        this.loading = true
        putAction(this.url.extract, {'tjyf': tjyf}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error(error, "提取失败！")
        }).finally(() => {
          this.loading = false
        })
      },
      getQueryParams(){
        let tjyfMoment = "";
        if(this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
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