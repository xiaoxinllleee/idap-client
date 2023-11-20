<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-date-picker placeholder='请选择数据日期' v-model='queryParam.fiscalDate'
                             :defaultValue='defaultMonthOpera'
                             :format='monthFormat' style='width: 100%;' @change='beforeUpload' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='机构名称'>
              <j-tree-select placeholder='请选择机构名称'
                             v-model='queryParam.jgmc'
                             treeNodeFilterProp='title'
                             pid-field='sjywjgdm'
                             dict='v_hr_bas_organization_cmms, zzjc, ywjgdm'
                             :showSearch='true'
                             :treeDefaultExpandAll='true' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='账号'>
              <a-input placeholder='请输入账号' v-model='queryParam.zh'></a-input>
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='客户名称'>
                <a-input placeholder='请输入客户名称' v-model='queryParam.khmc'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='票据号码'>
                <a-input placeholder='请输入票据号码' v-model='queryParam.pjhm'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='票据金额'>
                <a-input placeholder='请输入票面金额' v-model='queryParam.pjje'></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button @click='handleAdd' type='primary' icon='plus'>新增</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('贴现登记簿')">导出</a-button>
      <a-button icon='import' @click='excelImport'>导入</a-button>
      <a-button @click='handleDelete1' icon='delete'>删除</a-button>
      <!--  <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
        </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--  <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>-->

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
    <sgtzglTxdjb-modal ref='modalForm' @ok='modalFormOk'></sgtzglTxdjb-modal>
  </a-card>
</template>

<script>
import SgtzglTxdjbModal from './modules/SgtzglTxdjbModal'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import moment from 'moment'
import { filterObj } from '@/utils/util'
import { deleteAction } from '@api/manage'

export default {
  name: 'SgtzglTxdjbList',
  mixins: [JeecgListMixin],
  components: {
    SgtzglTxdjbModal, JTreeSelect, ExcelImport
  },
  data() {
    return {
      description: '贴现登记簿管理页面',
      // 表头
      monthFormat: 'YYYY-MM-DD',
      // 默认当前月份
      defaultMonthOpera: '',
      rq: '',
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
          title: '机构名称',
          align: 'center',
          dataIndex: 'jgmc_dictText'
        },
        {
          title: '账号',
          align: 'center',
          dataIndex: 'zh'
        },
        {
          title: '客户名称',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '票据号码',
          align: 'center',
          dataIndex: 'pjhm'
        },
        {
          title: '票据金额',
          align: 'center',
          dataIndex: 'pjje'
        },
        {
          title: '贴现金额',
          align: 'center',
          dataIndex: 'txxj'
        },
        {
          title: '贴现余额',
          align: 'center',
          dataIndex: 'txje'
        },
        {
          title: '贴现日期',
          align: 'center',
          dataIndex: 'txrq'
        },
        {
          title: '到期日期',
          align: 'center',
          dataIndex: 'dqrq'
        },
        {
          title: '票据状态',
          align: 'center',
          dataIndex: 'pjzt'
        },
        {
          title: '企业规模',
          align: 'center',
          dataIndex: 'qygm'
        },
        {
          title: '投向',
          align: 'center',
          dataIndex: 'tx'
        },
        {
          title: '投向1',
          align: 'center',
          dataIndex: 'tx1'
        },
        {
          title: '授信金额',
          align: 'center',
          dataIndex: 'sxje'
        },
        {
          title: '贴现利率',
          align: 'center',
          dataIndex: 'txll'
        },
        {
          title: '实际金额',
          align: 'center',
          dataIndex: 'sjje'
        },
        {
          title: '贴现利息',
          align: 'center',
          dataIndex: 'txlx'
        },
        {
          title: '年化收益',
          align: 'center',
          dataIndex: 'nhsy'
        },
        {
          title: '分摊后金额',
          align: 'center',
          dataIndex: 'fthje'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/txdjb/sgtzglTxdjb/list',
        delete: '/txdjb/sgtzglTxdjb/delete',
        deleteBatch: '/txdjb/sgtzglTxdjb/deleteBatch',
        deleteByBatch: '/txdjb/sgtzglTxdjb/deleteByBatch',
        exportXlsUrl: 'txdjb/sgtzglTxdjb/exportXls',
        importExcelUrl: 'txdjb/sgtzglTxdjb/importExcel',
        exportTemplateUrl: '/txdjb/sgtzglTxdjb/exportTemplateXls'
      },
      exportTemplateName: '贴现登记簿导入模板'
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    handleDelete1: function() {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      if (this.queryParam.fiscalDate == undefined && this.queryParam.fiscalDate == null) {
        this.$message.error('请选择数据日期!')
        return
      } else {
        this.rq = this.queryParam.fiscalDate.format('YYYYMMDD')
        console.log(this.rq)
        var that = this
        deleteAction(that.url.deleteByBatch, { fiscalDate: this.rq }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      }
    },
    beforeUpload() {
      if (this.queryParam.fiscalDate) {
        this.rq = this.queryParam.fiscalDate.format('YYYYMMDD')
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
        tjMoment = moment(this.queryParam.fiscalDate).format('YYYYMMDD')
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