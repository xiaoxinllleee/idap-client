<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-month-picker placeholder="请选择数据日期" v-model="queryParam.fiscalDate"  :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='项目'>
              <a-input placeholder='请输入项目' v-model='queryParam.xm'></a-input>
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
      <a-button @click='handleAdd' type='primary' icon='plus'>新增</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('1104-手工台帐-支付结算业务统计表四')">
        导出
      </a-button>
      <a-button icon='import' @click='excelImport'>导入</a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel'>
            <a-icon type='delete' />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style='margin-left: 8px'> 批量操作
          <a-icon type='down' />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>
        <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a
        style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项
        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>
      </div>

      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'
        @change='handleTableChange'>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)'>编辑</a>

          <a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref='excelImportModal' @ok='importComplete' />
    <!-- 表单区域 -->
    <adsRepSgtzZfjsywtjbs-modal ref='modalForm' @ok='modalFormOk'></adsRepSgtzZfjsywtjbs-modal>
  </a-card>
</template>

<script>
import AdsRepSgtzZfjsywtjbsModal from './modules/AdsRepSgtzZfjsywtjbsModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ExcelImport from '@comp/common/ExcelImport'
import moment from 'moment/moment'
import { filterObj } from '@/utils/util'

export default {
  name: 'AdsRepSgtzZfjsywtjbsList',
  mixins: [JeecgListMixin],
  components: {
    AdsRepSgtzZfjsywtjbsModal, ExcelImport
  },
  data() {
    return {
      description: '1104-手工台帐-支付结算业务统计表四管理页面',
      monthFormat: 'YYYY-MM',
      // 默认当前月份
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
          dataIndex: 'fiscalDate'
        },
        {
          title: '项目',
          align: 'center',
          dataIndex: 'xm'
        },
        {
          title: '代收笔数',
          align: 'center',
          dataIndex: 'dsbs'
        },
        {
          title: '代收金额',
          align: 'center',
          dataIndex: 'dsje'
        },
        {
          title: '代付笔数',
          align: 'center',
          dataIndex: 'dfbs'
        },
        {
          title: '代付金额',
          align: 'center',
          dataIndex: 'dfje'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/zfjsywtjbs/adsRepSgtzZfjsywtjbs/list',
        delete: '/zfjsywtjbs/adsRepSgtzZfjsywtjbs/delete',
        deleteBatch: '/zfjsywtjbs/adsRepSgtzZfjsywtjbs/deleteBatch',
        exportXlsUrl: 'zfjsywtjbs/adsRepSgtzZfjsywtjbs/exportXls',
        importExcelUrl: 'zfjsywtjbs/adsRepSgtzZfjsywtjbs/importExcel',
        exportTemplateUrl: 'zfjsywtjbs/adsRepSgtzZfjsywtjbs/exportTemplateXls'
      },
      exportTemplateName: '支付结算业务统计表四导入模板'
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    //默认日期
    this.defaultMonthOpera = moment(new Date(), "YYYYMMDD");
    this.queryParam = {fiscalDate: undefined};
    this.queryParam.fiscalDate=this.defaultMonthOpera;
    if (this.queryParam.fiscalDate){
      this.rq = this.queryParam.fiscalDate.format("YYYYMM")+'01';
    }
  },
  methods: {
    beforeUpload() {
      if (this.queryParam.fiscalDate){
        this.rq = this.queryParam.fiscalDate.format("YYYYMM")+'01';
      }
    },
    excelImport() {
      if (this.queryParam.fiscalDate == undefined || this.queryParam.fiscalDate == '') {
        this.$message.error('请选择数据日期!')
        return
      } else {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rq}`
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({}, this.queryParam, params)
        this.$refs.excelImportModal.showModal(param)
      }
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1)
    },
    getQueryParams() {
      //获取查询条件
      let sqp = {}
      let tjMoment = ''
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      if (this.queryParam.fiscalDate) {
        tjMoment=moment(this.queryParam.fiscalDate).format("YYYYMM")+'01'
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.fiscalDate = tjMoment
      return filterObj(param)
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>