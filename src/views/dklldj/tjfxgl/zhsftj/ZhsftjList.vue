<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                               :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请输入机构代码" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms,zzjc,ywjgdm"
                             pid-field="sjywjgdm" :tree-default-expand-all="true" :treeNodeFilterProp="title"
                             treeNodeFilterProp="true" :show-search="false"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
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
      <!--<a-button @click="init" type="primary" icon="area-chart">提取</a-button>-->
      <a-button icon="download" @click="handleExportXls('支行上浮统计')" v-has="'zhsftj:exportXls'">导出</a-button>
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
    <!--<zhsftj-modal ref="modalForm" @ok="modalFormOk"></zhsftj-modal>-->
  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {downFile, getAction, putAction} from '../../../../api/manage'
  import moment from 'moment'
  import {filterObj} from '@/utils/util';
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'

  export default {
    name: "ZhsftjList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
    },
    data() {
      return {
        description: '支行上浮统计管理页面',
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
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
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
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm',
            sorter: true
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '最高上浮幅度(%)',
            align: "center",
            dataIndex: 'zgsffd',
            sorter: true
          },
          {
            title: '最低上浮幅度(%)',
            align: "center",
            dataIndex: 'zdsffd',
            sorter: true
          },
          {
            title: '平均上浮幅度(%)',
            align: "center",
            dataIndex: 'pjsffd',
            sorter: true
          },
          // {
          //   title: '测算笔数',
          //   align: "center",
          //   dataIndex: 'csbs',
          //   width: 100,
          // },
          // {
          //   title: '发放笔数',
          //   align: "center",
          //   dataIndex: 'ffbs',
          //   width: 100,
          // },
          // {
          //   title: '最高得分',
          //   align: "center",
          //   dataIndex: 'zgdf',
          //   width: 100,
          // },
          // {
          //   title: '最低得分',
          //   align: "center",
          //   dataIndex: 'zddf',
          //   width: 100,
          // },
          // {
          //   title: '平均得分',
          //   align: "center",
          //   dataIndex: 'pjdf',
          //   width: 100,
          // },
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
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          init: "/tjfxgl/zhsftj/init",
          list: "/tjfxgl/zhsftj/list",
          delete: "/tjfxgl/zhsftj/delete",
          deleteBatch: "/tjfxgl/zhsftj/deleteBatch",
          exportXlsUrl: "tjfxgl/zhsftj/exportXls",
          importExcelUrl: "tjfxgl/zhsftj/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },
   /*   getCurrentMonth() {
        let curDate = new Date();
        // let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        // this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
        this.defaultMonthOpera = moment(curDate.getFullYear() + '-' + (curDate.getMonth() + 1), this.monthFormat); //当前月份
      },*/
      getQueryParams() {
        let tjyfMoment = '';
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM") + "-01";
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
      loadData(arg) {
        // 获取当前月份
        //this.getCurrentMonth();
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
       /* if ((params.tjyf == 'undefined' || params.tjyf == null)) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM") + '-01';
        }*/
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
      init() {
        if (this.queryParam.tjyf == null || this.queryParam === undefined) {
          this.$message.error("请选择统计月份！")
          return
        }
        let tjyfMoment = this.queryParam.tjyf.format("YYYYMMDD");
        this.loading = true
        putAction(this.url.init, {tjyf: tjyfMoment}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData()
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.warning("提取失败！", error);
        }).finally(() => {
          this.loading = false
        })
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = { ...this.queryParam }
        let tjyf = ''
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === '') {
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        }else {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf
        console.log('导出参数', param)
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        })
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>