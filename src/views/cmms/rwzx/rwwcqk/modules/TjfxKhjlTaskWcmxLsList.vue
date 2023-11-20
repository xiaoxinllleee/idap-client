<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='统计日期'>
              <a-range-picker v-model:value='tjrq' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属支行'>
              <j-tree-select placeholder='请选择所属支行'
                             v-model='queryParam.sszh'
                             treeNodeFilterProp='title'
                             pid-field='sjzzbz'
                             dict='v_hr_bas_organization_cmms, zzjc, zzbz'
                             :showSearch='true'
                             :treeDefaultExpandAll='true' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='员工姓名'>
              <a-input v-model='queryParam.yggh' placeholder='请输入员工姓名（支持模糊查询）' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='任务名称'>
              <a-input v-model='queryParam.rwmc' placeholder='请输入任务名称（支持模糊查询）' />
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

    <div class='table-operator'>
      <a-button type='primary' icon='area-chart' @click='initData'>提取</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('客户经理任务完成情况统计表')">导出
      </a-button>
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
        :scroll="{ x : 'max-content' }"
        @change='handleTableChange'>

         <span slot='drzf' slot-scope='drzf,record'>
          <a @click="detailInfo(record,'1',drzf)">{{ drzf }}</a>
         </span>
        <span slot='dryxcg' slot-scope='dryxcg,record'>
          <a @click="detailInfo(record,'2',dryxcg)">{{ dryxcg }}</a>
         </span>
        <span slot='dryxsb' slot-scope='dryxsb,record'>
          <a @click="detailInfo(record,'3',dryxsb)">{{ dryxsb }}</a>
         </span>
        <span slot='ljzf' slot-scope='ljzf,record'>
          <a @click="detailInfo(record,'4',ljzf)">{{ ljzf }}</a>
         </span>
        <span slot='ljyxcg' slot-scope='ljyxcg,record'>
          <a @click="detailInfo(record,'5',ljyxcg)">{{ ljyxcg }}</a>
         </span>
        <span slot='ljyxsb' slot-scope='ljyxsb,record'>
          <a @click="detailInfo(record,'6',ljyxsb)">{{ ljyxsb }}</a>
         </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <rwwcmx-modal ref='rwwc'></rwwcmx-modal>
    <a-modal
      title='任务完成情况统计提取'
      :width='800'
      :visible='initDataVisible'
      :confirmLoading='initDataLoading'
      @ok='dataInitOk'
      @cancel='dataInitCancel'
      okText='开始提取'
      cancelText='关闭'>
      <div>
        <a-form layout='inline'>
          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='提取日期'>
                <a-date-picker v-model='initDate' :allowClear='false' :disabled-date='disabledDate' />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { downFile, getAction, putAction } from '@api/manage'
import moment from 'moment'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import RwwcmxModal from '@views/cmms/rwzx/rwwcqk/modules/RwwcmxModal'

export default {
  name: 'TjfxTaskWcmxList',
  mixins: [JeecgListMixin],
  components: { JTreeSelect, RwwcmxModal },
  data() {
    return {
      tjrq: [],
      initDate: '',
      initDataVisible: false,
      initDataLoading: false,
      description: '统计分析-任务完成明细管理页面',
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
          title: '统计日期',
          align: 'center',
          dataIndex: 'tjrq'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'yggh_dictText'
        },
        {
          title: '任务名称',
          align: 'center',
          dataIndex: 'rwmc'
        },
        {
          title: '当日任务',
          align: 'center',
          dataIndex: 'drrw'
        },
        {
          title: '当日完成',
          align: 'center',
          dataIndex: 'drwc'
        },
        {
          title: '当日走访',
          align: 'center',
          dataIndex: 'drzf',
          scopedSlots: { customRender: 'drzf' }
        },
        {
          title: '当日营销成功',
          align: 'center',
          dataIndex: 'dryxcg',
          scopedSlots: { customRender: 'dryxcg' }
        },
        {
          title: '当日营销失败',
          align: 'center',
          dataIndex: 'dryxsb',
          scopedSlots: { customRender: 'dryxsb' }
        },
        {
          title: '累计任务',
          align: 'center',
          dataIndex: 'ljrw'
        },
        {
          title: '累计完成',
          align: 'center',
          dataIndex: 'ljwc'
        },
        {
          title: '累计走访',
          align: 'center',
          dataIndex: 'ljzf',
          scopedSlots: { customRender: 'ljzf' }
        },
        {
          title: '累计营销成功',
          align: 'center',
          dataIndex: 'ljyxcg',
          scopedSlots: { customRender: 'ljyxcg' }
        },
        {
          title: '累计营销失败',
          align: 'center',
          dataIndex: 'ljyxsb',
          scopedSlots: { customRender: 'ljyxsb' }
        },
        {
          title: '客户转换率',
          align: 'center',
          dataIndex: 'khzhl',
          customRender: function(text) {
            return text + '%'
          }
        }
      ],
      url: {
        list: '/rwwcmx/tjfxTaskWcmxLs/list',
        exportXlsUrl: '/rwwcmx/tjfxTaskWcmxLs/exportXls',
        initData: '/rwwcmx/tjfxTaskWcmxLs/initData'
      },
      maxDate: ''
    }
  },
  created() {
    this.getMaxDate()
  },
  methods: {
    getMaxDate() {
      getAction('/rwwcmx/tjfxTaskWcmxLs/getMaxDate', null).then(res => {
        if (res.success) {
          if (res.result != null && res.result != undefined && res.result != '') {
            this.maxDate = res.result
            this.tjrq = ['','']
            this.tjrq[0] = moment(this.maxDate).format('YYYYMMDD')
            this.tjrq[1] = moment(this.maxDate).format('YYYYMMDD')
          } else {
            this.tjrq = ['','']
            this.maxDate = ''
          }
        } else {
          this.tjrq = ['','']
          this.maxDate = ''
        }
      }).finally(() => {
        this.loadData(1)
      })
    },
    disabledDate(current) {
      return current && current > moment()
    },
    dataInitOk() {
      this.initDataLoading = true
      putAction(this.url.initData, { tjrq: moment(this.initDate).format('YYYY-MM-DD') }).then(res => {
        if (res.success) {
          this.$message.success('提取成功！！！')
        }
      }).finally(() => {
        this.initDataLoading = false
        this.initDataVisible = false
        this.maxDate = this.initDate
        this.tjrq = []
        this.tjrq[0] = moment(this.maxDate).format('YYYYMMDD')
        this.tjrq[1] = moment(this.maxDate).format('YYYYMMDD')
        this.loadData(1)
      })
    },
    dataInitCancel() {
      this.initDataVisible = false
    },
    initData() {
      this.initDataVisible = true
    },
    searchReset() {
      this.queryParam = {}
      this.dataSource = []
      this.getMaxDate()
    },
    searchQuery() {
      if (!this.tjrq || this.tjrq.length != 2) {
        this.tjrq[0] = moment(this.maxDate).format('YYYYMMDD')
        this.tjrq[1] = moment(this.maxDate).format('YYYYMMDD')
      }
      this.loadData(1)
    },
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()//查询条件
      params.startDay = moment(this.tjrq[0]).format('YYYYMMDD')
      params.endDay = moment(this.tjrq[1]).format('YYYYMMDD')
      console.info(params)
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
          this.loading = false
        } else {
          this.dataSource = []
          this.ipagination.total = 0
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message, 5)
          this.loading = false
        }
        this.loading = false
      })
    },
    detailInfo(row, lx,num) {
      if (num<=0){
        this.$message.success("数量为0不展示明细！")
        return
      }
      this.$refs.rwwc.init(row, lx,'khjl')
    },
    handleExportXls(fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }

      //let param = {...this.queryParam};
      let param = this.getQueryParams()
      param.startDay = moment(this.tjrq[0]).format('YYYYMMDD')
      param.endDay = moment(this.tjrq[1]).format('YYYYMMDD')
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
        param['rowKey'] = this.rowKey
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
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
        this.exportLoading = false
      })
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>