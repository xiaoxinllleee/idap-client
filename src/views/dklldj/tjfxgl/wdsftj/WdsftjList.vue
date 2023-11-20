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
          <a-col :md="6" :sm="8"><a-form-item label="组织机构">
            <j-tree-select placeholder="请选择组织机构" v-model="queryParam.zzbz" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pid-field="SJZZBZ"
                           treeNodeFilterProp="title" :tree-default-expand-all="true" :show-search="false" getAllZzjg="1"/>
          </a-form-item></a-col>
          <template v-if="toggleSearchStatus"></template>
          <a-col :md="6" :sm="8" >
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
      <a-button icon="area-chart" @click="init" v-has="'wdsftj:init'">统计</a-button>
      <a-button icon="download" @click="handleExportXls('网点上浮统计')" style="margin-left: 8px;" v-has="'wdsftj:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
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

    <!-- 表单区域 -->
    <!--<wdsftj-modal ref="modalForm" @ok="modalFormOk"></wdsftj-modal>-->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {downFile, getAction, putAction} from '../../../../api/manage'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import moment from 'moment'
  import { filterObj } from '@/utils/util';
  import store from '@/store/'
  import {notification} from "ant-design-vue";

  export default {
    name: "WdsftjList",
    mixins:[JeecgListMixin],
    components: { JTreeSelect },
    data () {
      return {
        description: '网点上浮统计管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 重置标识
        flag: true,
        isorter: {
          order: 'desc',
        },
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
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 7 ? text.substr(0, 7) : text)
            },
            sorter: true,
          },
          {
            title: '所属组织',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          // {
          //   title: '最高基点(加/减)BP',
          //   align:"center",
          //   dataIndex: 'zgjdbp'
          // },
          // {
          //   title: '最低基点(加/减)BP',
          //   align:"center",
          //   dataIndex: 'zdjdbp'
          // },
          // {
          //   title: '平均基点(加/减)BP',
          //   align:"center",
          //   dataIndex: 'pjjdbp'
          // },
          {
            title: '最高上浮幅度(%)',
            align:"center",
            dataIndex: 'zgsffd',
            sorter: true,
          },
          {
            title: '最低上浮幅度(%)',
            align:"center",
            dataIndex: 'zdsffd',
            sorter: true,
          },
          {
            title: '平均上浮幅度(%)',
            align:"center",
            dataIndex: 'pjsffd',
            sorter: true,
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          init: "/tjfxgl/wdsftj/init",
          list: "/tjfxgl/wdsftj/list",
          delete: "/tjfxgl/wdsftj/delete",
          deleteBatch: "/tjfxgl/wdsftj/deleteBatch",
          exportXlsUrl: "tjfxgl/wdsftj/exportXls",
          importExcelUrl: "tjfxgl/wdsftj/importExcel",
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
      init() {
        this.loading = true
        putAction(this.url.init).then((response) => {
          if (response.success) {
            notification.success({ message: '系统提示', description: '提取成功！', duration: 4 });
            this.loadData()
          } else {
            notification.warning({ message: '系统提示', description: '提取失败！'+response.message, duration: 4 });
          }
        }).catch((error) => {
          notification.warning({ message: '系统提示', description: '提取失败！'+error, duration: 4 });
        }).finally(() => {
          this.loading = false
        })
      },

      getCurrentMonth() {
        let curDate = new Date()
        this.defaultMonthOpera = moment(curDate,this.monthFormat)
        this.queryParam = {tjyf: undefined}
        this.queryParam.tjyf = this.defaultMonthOpera
      },

      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        // 查询条件
        var params = this.getQueryParams();
        if (params.tjyf !== undefined && params.tjyf !== null && params.tjyf !== '') {
          params.tjyf = moment(params.tjyf).format('YYYY-MM') + '-01'
        }
        console.info('查询条件:',params)
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      },

      getQueryParams() {
        let tjyfMoment = '';
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+"-01";
        }
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
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
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>