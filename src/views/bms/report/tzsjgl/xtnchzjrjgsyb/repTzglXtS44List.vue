<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-date-picker placeholder='请选择数据月份' v-model='queryParam.sjrq'
                             :defaultValue='defaultMonthOpera' :format='dayFormat' style='width: 100%;'
                             @change='beforeUpload' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button icon='import'  @click='excelImport'>导入</a-button>
      <a-button icon='download'  :loading='exportLoading'
                @click="handleExportXls('S44农村合作金融机构损益表')">导出
      </a-button>
      <a-button @click="handleDelete1" icon="delete">删除</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        @change='handleTableChange'>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <repTzglXtS44-modal ref='modalForm' @ok='modalFormOk'></repTzglXtS44-modal>
    <excel-import ref='excelImportModal' @ok='importComplete' />
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import { deleteAction, getAction } from '@api/manage'
import { filterObj } from '@/utils/util'

export default {
  name: 'repTzglXtS44List',
  mixins: [JeecgListMixin],
  components: {
    ExcelImport
  },
  data() {
    return {
      description: '湘潭-S44农村合作金融机构损益表管理页面',
      dayFormat: 'YYYY-MM-DD',
      defaultMonthOpera: '',
      rq: '',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '数据日期',
          align: 'center',
          dataIndex: 'sjrq',
          customRender: function(text) {
            return !text ? '' : text.substr(0, 4) + '-' + text.substr(4, 2) + '-' + text.substr(6, 2)
          }
        },
        {
          title: '项目名称',
          align: 'center',
          dataIndex: 'xmmc'
        },
        {
          title: '上年同期数',
          align: 'center',
          dataIndex: 'sntqs'
        },
        {
          title: '本期累计数',
          align: 'center',
          dataIndex: 'bqljs'
        }
      ],
      url: {
        list: '/xtnchzjrjgsyb/repTzglXtS44/list',
        delete: '/xtnchzjrjgsyb/repTzglXtS44/delete',
        deleteBatch: '/xtnchzjrjgsyb/repTzglXtS44/deleteBatch',
        exportXlsUrl: 'xtnchzjrjgsyb/repTzglXtS44/exportXls',
        importExcelUrl: 'xtnchzjrjgsyb/repTzglXtS44/importExcel',
        exportTemplateUrl: '/xtnchzjrjgsyb/repTzglXtS44/exportTemplateXls'
      },
      exportTemplateName: 'S44农村合作金融机构损益表导入模板'
    }
  },
  methods: {
    handleDelete1: function () {
      if(!this.url.delete){
        this.$message.error("请设置url.delete属性!")
        return
      }
      if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null){
        this.$message.error("请选择数据月份!")
        return
      }else {
        this.rq = this.queryParam.sjrq.format("YYYY-MM-DD") ;
        console.log(this.rq)
        var that = this;
        deleteAction(that.url.deleteBatch, {sjrq:this.rq}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      }
    },
    beforeUpload() {
      if (this.queryParam.sjrq) {
        this.rq = this.queryParam.sjrq.format('YYYYMMDD')
      }
    },
    excelImport() {
      if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
        this.$message.error('请选择数据月份!')
        return
      } else {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?sjrq=${this.rq}`
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({}, this.queryParam, params)
        this.$refs.excelImportModal.showModal(param)
      }
    },
    searchReset() {
      this.queryParam = {}
      this.isCanExP = false
      this.loadData(1)
    },
    loadData(arg) {
      // this.getCurrentMonth();
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()//查询条件
      /* if ((params.sjrq === undefined || params.sjrq == null)) {
         params.sjrq = this.defaultMonthOpera.format("YYYY-MM") + '-01'
       }*/
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message, 5)
        }
        this.loading = false
      })
    },
    getQueryParams() {
      let tjyfMoment = ''
      if (this.queryParam.sjrq) {
        tjyfMoment = this.queryParam.sjrq.format('YYYYMMDD')
      }
      console.log(tjyfMoment + '====tjyfMoment=====')
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (param.sjrq) {
        param.sjrq = tjyfMoment
      }
      return filterObj(param)
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>