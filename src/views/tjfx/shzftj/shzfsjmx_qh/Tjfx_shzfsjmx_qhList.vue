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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleInit" type="primary" icon="cloud-download">提取</a-button>

      <a-button type="primary" icon="download" @click="handleExportXls('商户走访数据明细统计_全行')">导出</a-button>

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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="detail" slot-scope="text, record">
          <a @click="handleDetailToZh(record, '/tjfx/shzftj/shzfsjmx_zh')">支行详情</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '../../../../utils/util'
  import { getAction, putAction, downFile } from '@/api/manage'

  export default {
    name: 'Tjfx_shzfsjmx_qhList',
    mixins: [JeecgListMixin],
    components: {},
    data() {
      return {
        description: '商户走访数据明细统计_全行管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          column: 'tjyf',
          order: 'desc'
        },
        // 表头
        columns: [

          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            customRender: function(text) {
              return !text ? '' : (text.length > 7 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/')
          },
          {
            title: '有效走访户数',
            align: 'center',
            dataIndex: 'yxzfhs'
          },
          {
            title: '全行总户数',
            align: 'center',
            dataIndex: 'zhs'
          },
          {
            title: '走访覆盖率',
            align: 'center',
            dataIndex: 'zffgl',
            sorter: (a, b) => b.zffgl - a.zffgl

          },
          {
            title: '累计走访户数',
            align: 'center',
            dataIndex: 'ljzfhs'
          },
          {
            title: '涉及走访户数',
            align: 'center',
            dataIndex: 'sjzfhs'
          },
          {
            title: '详情',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'detail' }
          }
        ],
        url: {
          init: '/TJFX_SHZFSJMX_QH/tjfx_shzfsjmx_qh/init',
          list: '/TJFX_SHZFSJMX_QH/tjfx_shzfsjmx_qh/list',
          delete: '/TJFX_SHZFSJMX_QH/tjfx_shzfsjmx_qh/delete',
          deleteBatch: '/TJFX_SHZFSJMX_QH/tjfx_shzfsjmx_qh/deleteBatch',
          exportXlsUrl: 'TJFX_SHZFSJMX_QH/tjfx_shzfsjmx_qh/exportXls',
          importExcelUrl: 'TJFX_SHZFSJMX_QH/tjfx_shzfsjmx_qh/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date()
        let curMonth = { year: curDate.getFullYear(), month: curDate.getMonth() + 1 }
        this.defaultMonthOpera = moment(curDate)
      },

      loadData(arg) {
        this.getCurrentMonth()
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件

        if ((params.tjyf == 'undefined' || params.tjyf == null) && this.flag == true) {
          params.tjyf = this.defaultMonthOpera.format('YYYY-MM') + '-01'
        }
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
        let tjyfMoment = ''
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format('YYYY-MM') + '-01'
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        console.log('param')
        console.log(param)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (param.tjyf) {
          param.tjyf = tjyfMoment
        }
        return filterObj(param)
      },

      searchReset() {
        this.flag = false
        this.queryParam = {}
        this.loadData(1)
      },

      handleInit() {
        var params = this.queryParam
        // if (this.defaultMonthOpera!=null && this.defaultMonthOpera!=undefined) {
        //   params.tjyf = this.defaultMonthOpera;
        // }
        if (params.tjyf == null || params.tjyf == undefined) {
          this.$message.error('请选择统计月份！')
          return
        }
        let tjyfFormat = params.tjyf.format('YYYYMMDD')
        this.loading = true
        putAction(this.url.init, { tjyf: tjyfFormat }).then((res) => {
          console.log(res)
          if (res.success) {
            this.$message.success(res.message)
            this.loadData()
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      },

      handleDetailToZh: function(record, path) {
        console.log("-----path-----")
        console.log(path)
        this.$router.push({
          path: path,
          query: { tjyf: record.tjyf }
        })
      },

      handleExportXls(fileName) {
        var param = this.getQueryParams();//查询条件
        if ((param.tjyf=='undefined' || param.tjyf==null) && this.flag==true) {
          param.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        //let param = { ...this.queryParam }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        // if (param.tjyf != null) {
        //   param.tjyf = param.tjyf.format('YYYY-MM') + '-01'
        // }
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