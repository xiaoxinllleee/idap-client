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
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属组织" getAllZzjg="1"
                             v-model="queryParam.zzbz"
                             dict="v_hr_bas_organization_cmms,zzjc,zzbz"
                             pidField="sjzzbz"
                             treeNodeFilterProp="title"
                             :sszh="true"
                             :showSearch="false"
                             :treeDefaultExpandAll="true"
                             :filterTreeNode="true"/>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">
            查询
          </a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">
            重置
          </a-button>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织类别">
              <j-dict-select-tag placeholder="请选择组织类别"
                                 v-model="queryParam.zzlb"
                                 dict-code="zzlb"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计类型">
              <j-dict-select-tag placeholder="请选择统计类型"
                                 v-model="queryParam.tjlx"
                                 dict-code="rqwd"/>
            </a-form-item>
          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('支行上浮统计')">
        导出
      </a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{selectedRowKeys.length}}</a> 项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               :rowKey="rowKey"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from "@/components/jeecg/JTreeSelect"
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import {downFile, getAction} from "@/api/manage";
  import store from '@/store/'

  export default {
    name: "RateTjfxList",
    mixins: [JeecgListMixin],
    components: {JTreeSelect},
    data() {
      return {
        description: '支行上浮统计管理页面',
        isorter: {
          order: 'desc',
        },
        // 统计月份格式
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 重置标识
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
            sorter: true
          },
          // {
          //   title: '统计类型',
          //   align: "center",
          //   dataIndex: 'tjlx_dictText'
          // },
          {
            title: '组织标志',
            align: "center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          // {
          //   title: '组织类别',
          //   align: "center",
          //   dataIndex: 'zzlb_dictText'
          // },
          {
            title: '最高上浮幅度(%)',
            align: "center",
            dataIndex: 'zgsffd'
          },
          {
            title: '最低上浮幅度(%)',
            align: "center",
            dataIndex: 'zdsffd'
          },
          {
            title: '平均上浮幅度(%)',
            align: "center",
            dataIndex: 'pjsffd'
          },
          // {
          //   title: '最高基点(加/减)BP',
          //   align: "center",
          //   dataIndex: 'zgjdbp'
          // },
          // {
          //   title: '最低基点(加/减)BP',
          //   align: "center",
          //   dataIndex: 'zdjdbp'
          // },
          // {
          //   title: '平均基点(加/减)BP',
          //   align: "center",
          //   dataIndex: 'pjjdbp'
          // }
        ],
        url: {
          list: "/tjfxgl/zhsftjfx/list",
          delete: "/tjfxgl/zhsftjfx/delete",
          deleteBatch: "/tjfxgl/zhsftjfx/deleteBatch",
          exportXlsUrl: "tjfxgl/zhsftjfx/exportXls",
          importExcelUrl: "tjfxgl/zhsftjfx/importExcel",
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
      getCurrentMonth() {
        let curDate = new Date()
        this.defaultMonthOpera = moment(curDate,this.monthFormat)
        this.queryParam = {tjyf: undefined}
        this.queryParam.tjyf = this.defaultMonthOpera
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