<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='指标id'>
              <a-input placeholder='请输入指标id' v-model='queryParam.zbid'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='指标名称'>
              <a-input placeholder='请输入指标名称' v-model='queryParam.zbmc'></a-input>
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='指标维度'>
                <j-dict-select-tag placeholder='请选择指标维度' v-model='queryParam.zbwd' dict-code='zbwd' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='指标类型'>
                <j-dict-select-tag placeholder="请选择指标类型:" v-model="queryParam.zblx"
                                   dict-code="zblx"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='指标状态'>
                <a-input placeholder='请输入指标状态' v-model='queryParam.estat'></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
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
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('指标提取日志查询')">导出</a-button>
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
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

export default {
  name: 'RepIndexExecuteLogList',
  mixins: [JeecgListMixin],
  components: {},
  data() {
    return {
      description: '指标提取日志查询管理页面',
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
          dataIndex: 'sjrq'
        },
        {
          title: '指标id',
          align: 'center',
          dataIndex: 'zbid'
        },
        {
          title: '指标名称',
          align: 'center',
          dataIndex: 'zbmc'
        },
        {
          title: '指标维度',
          align: 'center',
          dataIndex: 'zbwd_dictText'
        },
        {
          title: '指标类型',
          align: 'center',
          dataIndex: 'zblx_dictText'
        },
        {
          title: '执行时间',
          align: 'center',
          dataIndex: 'etime'
        },
        {
          title: '执行状态',
          align: 'center',
          dataIndex: 'estat_dictText'
        },
        {
          title: '计算sql',
          align: 'center',
          dataIndex: 'jssql'
        },
        {
          title: '数据项结果',
          align: 'center',
          dataIndex: 'sjxjg'
        },
        {
          title: '执行耗时',
          align: 'center',
          dataIndex: 'usetime'
        },
        {
          title: '执行日志',
          align: 'center',
          dataIndex: 'einfo'
        },
        {
          title: '日志时间',
          align: 'center',
          dataIndex: 'itime'
        },
      ],
      url: {
        list: '/report/zbgl/zbtqrzcx/repIndexExecuteLog/list',
        delete: '/report/zbgl/zbtqrzcx/repIndexExecuteLog/delete',
        deleteBatch: '/report/zbgl/zbtqrzcx/repIndexExecuteLog/deleteBatch',
        exportXlsUrl: 'report/zbgl/zbtqrzcx/repIndexExecuteLog/exportXls',
        importExcelUrl: 'report/zbgl/zbtqrzcx/repIndexExecuteLog/importExcel'
      }
    }
  },
  computed: {},
  methods: {}
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>