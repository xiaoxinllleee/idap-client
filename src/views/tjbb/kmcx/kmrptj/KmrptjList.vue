<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目编码">
              <a-input placeholder="请输入科目编码" v-model="queryParam.kmbm"/>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('科目日平统计')" v-has="'kmrptj:exportXls'">
        导出
      </a-button>
      <a-button icon="area-chart" @click="init" v-has="'kmrptj:init'">提取</a-button>

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
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from '@/utils/util';
  import {getAction} from "@/api/manage";
  import moment from 'moment'
  import {postAction, downFile} from "../../../../api/manage";
  import {notification} from "ant-design-vue";
  import store from '@/store/'

  export default {
    name: "KmrptjList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
    },
    data() {
      return {
        description: '科目日平统计管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
        flag: true,
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '科目编码',
            align: "center",
            dataIndex: 'kmbm'
          },
          {
            title: '日末借方金额',
            align: "center",
            dataIndex: 'rmjfje'
          },
          {
            title: '借方日平余额(月)',
            align: "center",
            dataIndex: 'jfrpye'
          },
        ],
        url: {
          list: "/kmrptj/kmrptj/list",
          delete: "/kmrptj/kmrptj/delete",
          deleteBatch: "/kmrptj/kmrptj/deleteBatch",
          exportXlsUrl: "kmrptj/kmrptj/exportXls",
          importExcelUrl: "kmrptj/kmrptj/importExcel",
          init: "/kmrptj/kmrptj/init",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
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
        this.queryParam = {tjyf :undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
      },
      init() {
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          notification.warning({message: '系统提示', description: '请选择统计月份！', duration: 4})
          return false
        }
        let params = {tjyf: moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'}
        this.loading = true
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
            this.loadData(1)
          } else {
            notification.warning({message: '系统提示', description: '提取失败！' + res.message, duration: 4})
          }
        }).catch((error) => {
          notification.warning({message: '系统提示', description: '提取失败！' + error, duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
         let tjyf = ''
        let param = Object.assign({},this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== "") {
          tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数", param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(() => {
          this.exportLoading = false
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
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.userInfo.orgCode
          console.log(this.queryParam.jgdm)
        }
        this.paramsInited = true
      },
      searchReset() {
        this.queryParam = {jgdm:'',tjuf:undefined};
        if (!store.getters.isRoot){
          this.queryParam.jgdm=store.getters.ywjgdm
        }
        this.queryParam.tjyf = this.defaultMonthOpera;
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