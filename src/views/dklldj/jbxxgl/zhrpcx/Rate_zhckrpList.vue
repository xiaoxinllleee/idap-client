<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属组织" v-model="queryParam.zzbz" getAllZzjg="1"
                             dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" :sszh="true" :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="存款账号">
              <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="户名">
              <j-input placeholder="请输入户名" v-model="queryParam.hm"></j-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="handleExportXls('支行存款日平')" v-has="'zhrpcx:exportXls'">导出</a-button>
      <a-button icon="area-chart" @click="initData" v-has="'zhrpcx:init'" :loading="extractLoading">提取</a-button>
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

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'zhrpcx:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'zhrpcx:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction, putAction, httpAction} from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import {filterObj} from '@/utils/util';
  import {downFile} from "../../../../api/manage";
  import {mapGetters} from "vuex";
  import store from '@/store/'
  import moment from 'moment'
  import {notification} from "ant-design-vue";

  export default {
    name: "RateZhckrpList",
    mixins: [JeecgListMixin],
    components: {
      JInput,
      JTreeSelect,
      ExcelImport
    },
    data() {
      return {
        description: '账号日平查询管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        extractLoading: false,
        // 重置标识
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '统计类型',
            align: "center",
            dataIndex: 'tjlx_dictText'
          },
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
          },
          {
            title: '所属组织',
            align: "center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '存款账号',
            align: "center",
            dataIndex: 'ckzh',
            width: 200
          },
          {
            title: '户名',
            align: "center",
            dataIndex: 'hm'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180
          },
          {
            title: '存款余额',
            align: "center",
            dataIndex: 'ckye',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '存款日平余额',
            align: "center",
            dataIndex: 'ckrpye',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '卡号',
            align: "center",
            dataIndex: 'kh',

          },
          {
            title: '起始日期',
            align: "center",
            dataIndex: 'beginday'
          },
          {
            title: '结束日期',
            align: "center",
            dataIndex: 'endday'
          },
        ],
        url: {
          list: "/rate_zhckrp/rate_zhckrp/list",
          delete: "/rate_zhckrp/rate_zhckrp/delete",
          deleteBatch: "/rate_zhckrp/rate_zhckrp/deleteBatch",
          exportXlsUrl: "rate_zhckrp/rate_zhckrp/exportXls",
          importExcelUrl: "rate_zhckrp/rate_zhckrp/importExcel",
          exportTemplateUrl: "dklldj.jbxxgl.khxxgl/rate_khjbxxb/exportTemplateXls",
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
      handleImport() {
        let param = {};
        param.exportTemplateUrl = this.url.exportTemplateUrl;
        param.importExcelUrl = this.importExcelUrl;
        param.exportTemplateName = "支行存款日平导入模板";
        this.$refs.excelImportModal.showModal(param);
      },

      getCurrentMonth() {
        let curDate = new Date()
        this.defaultMonthOpera = moment(curDate,this.monthFormat)
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
      },

      // initQueryParams() {
      //   if (!store.getters.isRoot) {
      //     this.queryParam.zzbz = store.getters.userInfo.orgCode
      //   }
      //   this.paramsInited = true
      // },

      searchReset() {
        this.flag = false
        this.queryParam = {tjyf: undefined}
        this.queryParam.tjyf = this.defaultMonthOpera
        // if (!store.getters.isRoot) {
        //   this.queryParam.zzbz = store.getters.userInfo.orgCode
        // }
        this.loadData(1)
      },

      loadData(arg) {
        if (!this.url.list) {
          notification.error({message: '系统提示', description: '请设置url.list属性!', duration: 4})
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        //查询条件
        var params = this.getQueryParams();
        if (params.tjyf !== undefined && params.tjyf !== null && params.tjyf !== '') {
          params.tjyf = moment(params.tjyf).format('YYYY-MM') + '-01'
        }
        console.info('查询条件:',params)
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

      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },

      initData() {
        var params = Object.assign({}, this.queryParam)
        if (params.tjyf === undefined || params.tjyf == null) {
          notification.warning({message: '系统提示', description: '请选择统计月份!', duration: 4})
          return false
        }
        let tjyfstr = moment(params.tjyf).format("YYYYMM") + '01'
        if (params.zjhm == null && params.ckzh == null && params.kh == null) {
          notification.warning({message: '系统提示', description: '证件号码/账号/卡号须任意填写一个!', duration: 4})
          return false
        }
        this.extractLoading = true
        this.loading = true
        putAction("/rate_zhckrp/rate_zhckrp/extract", {
          "zjhm": params.zjhm,
          "tjyf": tjyfstr,
          "ckzh": params.ckzh,
          "kh"  : params.kh
        }).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功!', duration: 4})
            this.loading = false
            this.loadData()
          } else {
            notification.warning({message: '系统提示', description: '提取失败!', duration: 4})
            this.loading = false
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '提取失败!' + error, duration: 4})
          this.loading = false
        }).finally(() => {
          this.extractLoading = false
        })
      },

      handleExportXls(fileName) {
        // fileName = this.exportTemplateName;
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = Object.assign({}, this.queryParam)
        let tjyf = ''
        if (param.tjyf !== undefined && param.tjyf !== null && param.tjyf !== '') {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('下载参数:', param)
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          console.log('handleExportXls data:', data)
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
        })
      },

      importComplete() {},

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>