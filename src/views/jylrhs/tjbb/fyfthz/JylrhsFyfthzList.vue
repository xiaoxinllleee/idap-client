<template>
  <a-card :bordered='false'>
    <a-tabs default-active-key='1' @change='changeTabs'>

      <a-tab-pane tab='支行' key='1' :forceRender='true'>
        <!-- 查询区域 -->
        <div class='table-page-search-wrapper'>
          <a-form layout='inline' @keyup.enter.native='searchQuery'>
            <a-row :gutter='24'>

              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <a-form-item label='会计日期'>
                  <!--                  <a-input placeholder='请输入会计日期' v-model='queryParam.fiscalDate'></a-input>-->
                  <a-month-picker placeholder='请选择会计日期（月末）' v-model='queryParam.fiscalDate'
                                  :format='monthFormat' style='width: 100%;' @change='beforeUpload(1)'></a-month-picker>
                </a-form-item>
              </a-col>
              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <a-form-item label='业务机构'>
                  <!--                  <a-input placeholder='请输入业务机构' v-model='queryParam.jgdm'></a-input>-->
<!--                  <j-tree-select placeholder='请选择业务机构' v-model='queryParam.jgdm'-->
<!--                                 dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm'-->
<!--                                 treeNodeFilterProp='title'-->
<!--                                 show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true'-->
<!--                                 :isAll='false' />-->
                  <j-tree-select placeholder="请选择业务机构"
                                 pid-field="sjywjgdm_b"
                                 :showSearch="true"
                                 treeNodeFilterProp="title"
                                 v-model="queryParam.jgdm"
                                 dict="v_hr_bas_organization,zzjc,ywjgdm"
                                 condition='{"sjywjgdm": "ywjgdm"}'
                                 :tree-default-expand-all="true"/>
                </a-form-item>
              </a-col>
              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
                  <a-button type='primary' @click='searchQuery(1)' icon='search'>查询</a-button>
                  <a-button type='primary' @click='searchReset(1)' icon='reload'
                            style='margin-left: 8px'>重置</a-button>
                </span>
              </a-col>

            </a-row>
          </a-form>
        </div>

        <!-- 操作按钮区域 -->
        <div class='table-operator'>
          <a-button type='primary' icon='plus' :loading='initDataLoading1' @click='handleInitData(1)'
                    v-has="'JylrhsFyfthzZh:initdata'">
            {{ initDataBtnName1 }}
          </a-button>
          <a-button type='primary' icon='download' :loading='exportLoading'
                    @click="handleExportXls('费用分摊（支行汇总）',1)" style='margin-left: 8px'
                    v-has="'JylrhsFyfthzZh:export'">
            导出
          </a-button>
        </div>

        <!-- table区域-begin -->
        <div>
          <a-table ref='table'
                   size='small'
                   bordered
                   :rowKey='rowKey'
                   :columns='columns'
                   :dataSource='dataSource1'
                   :pagination='ipagination1'
                   :loading='loading1'
                   @change='handleTableChange1'>
          </a-table>
        </div>
        <!-- table区域-end -->

      </a-tab-pane>

      <a-tab-pane tab='项目' key='2' :forceRender='true'>
        <!-- 查询区域 -->
        <div class='table-page-search-wrapper'>
          <a-form layout='inline' @keyup.enter.native='searchQuery'>
            <a-row :gutter='24'>

              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <a-form-item label='会计日期'>
                  <!--                  <a-input placeholder='请输入会计日期' v-model='queryParam.fiscalDate'></a-input>-->
                  <a-month-picker placeholder='请选择会计日期（月末）' v-model='queryParam.fiscalDate'
                                  :format='monthFormat' style='width: 100%;' @change='beforeUpload(2)'></a-month-picker>
                </a-form-item>
              </a-col>
              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <a-form-item label='业务机构'>
                  <!--                  <a-input placeholder='请输入业务机构' v-model='queryParam.jgdm'></a-input>-->
<!--                  <j-tree-select placeholder='请选择业务机构' v-model='queryParam.jgdm'-->
<!--                                 dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm'-->
<!--                                 treeNodeFilterProp='title'-->
<!--                                 show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true'-->
<!--                                 :isAll='false' />-->
                  <j-tree-select placeholder="请选择业务机构"
                                 pid-field="sjywjgdm_b"
                                 :showSearch="true"
                                 treeNodeFilterProp="title"
                                 v-model="queryParam.jgdm"
                                 dict="v_hr_bas_organization,zzjc,ywjgdm"
                                 condition='{"sjywjgdm": "ywjgdm"}'
                                 :tree-default-expand-all="true"/>
                </a-form-item>
              </a-col>
              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <a-form-item label='一级科目'>
                  <a-input hidden placeholder='一级科目号' v-model='queryParam.yjkm'></a-input>
                  <a-input-search placeholder='请选择' v-model='subjectName1' readOnly @search='onSearchLookup'>
                    <a-button slot='enterButton'>查找带回</a-button>
                  </a-input-search>
                </a-form-item>
              </a-col>
              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <a-form-item label='记账科目'>
                  <j-dict-select-tag placeholder='请选择' v-model='queryParam.jzkm'
                                     dict-code='jylrhs:jylrhs_kmsz,subject_name2,subject_no2' disabled>
                  </j-dict-select-tag>
                </a-form-item>
              </a-col>
              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <a-form-item label='记账分类'>
                  <j-dict-select-tag placeholder='请选择' v-model='queryParam.jzfl'
                                     dict-code='zbdl'></j-dict-select-tag>
                </a-form-item>
              </a-col>
              <a-col :xl='6' :lg='7' :md='8' :sm='24'>
                <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
                  <a-button type='primary' @click='searchQuery(2)' icon='search'>查询</a-button>
                  <a-button type='primary' @click='searchReset(2)' icon='reload'
                            style='margin-left: 8px'>重置</a-button>
                </span>
              </a-col>

            </a-row>
          </a-form>
        </div>

        <!-- 操作按钮区域 -->
        <div class='table-operator'>
          <a-button type='primary' icon='plus' :loading='initDataLoading2' @click='handleInitData(2)'
                    v-has="'JylrhsFyfthzXm:initdata'">
            {{ initDataBtnName2 }}
          </a-button>
          <a-button type='primary' icon='download' :loading='exportLoading'
                    @click="handleExportXls('费用分摊（项目汇总）',2)" v-has="'JylrhsFyfthzXm:export'">
            导出
          </a-button>
        </div>

        <!-- table区域-begin -->
        <div>
          <a-table ref='table'
                   size='small'
                   bordered
                   :rowKey='rowKey'
                   :columns='columns1'
                   :dataSource='dataSource2'
                   :pagination='ipagination2'
                   :loading='loading2'
                   @change='handleTableChange2'>
          </a-table>
        </div>
        <!-- table区域-end -->
        <select-jzkm-modal ref='selectJzkmModal' @selectFinished='selectOK' />
      </a-tab-pane>

    </a-tabs>
  </a-card>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { deleteAction, downFile, getAction, postAction } from '@api/manage'
import { filterObj } from '@/utils/util'
import moment from 'moment'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JInput from '@/components/jeecg/JInput'
import notification from 'ant-design-vue/lib/notification'
import SelectJzkmModal from '@views/jylrhs/jylrsj/fyftjz/modules/SelectJzkmModal.vue'

export default {
  name: 'JylrhsFyfthzList',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelect, JInput, SelectJzkmModal
  },
  data() {
    return {
      description: '经营利润核算（费用分摊汇总）管理页面',
      monthFormat: 'YYYY-MM',
      loading1: false,
      loading2: false,
      initDataLoading1: false,
      initDataLoading2: false,
      initDataBtnName1: '统计：支行',
      initDataBtnName2: '统计：项目',
      subjectName1: undefined,
      //默认当前月份
      defaultDateOpera: '',
      //当前数据日期
      rq: '',
      tabsKey: undefined,
      rowKey: 'fiscalDate,jgdm',
      dataSource1: [],
      dataSource2: [],
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
          title: '会计日期',
          align: 'center',
          dataIndex: 'fiscalDate'
        },
        {
          title: '业务机构',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '收入',
          align: 'center',
          children: [
            {
              title: '月度',
              align: 'center',
              dataIndex: 'srM'
            },
            {
              title: '季度',
              align: 'center',
              dataIndex: 'srQ'
            },
            {
              title: '年度',
              align: 'center',
              dataIndex: 'srY'
            }
          ]
        },
        {
          title: '支出',
          align: 'center',
          children: [
            {
              title: '月度',
              align: 'center',
              dataIndex: 'zcM'
            },
            {
              title: '季度',
              align: 'center',
              dataIndex: 'zcQ'
            },
            {
              title: '年度',
              align: 'center',
              dataIndex: 'zcY'
            }
          ]
        },
        {
          title: '统计时间',
          align: 'center',
          dataIndex: 'tjsj'
        }
        // {
        //   title: '操作类型',
        //   align: 'center',
        //   dataIndex: 'oprationType'
        // },
        // {
        //   title: '操作员',
        //   align: 'center',
        //   dataIndex: 'operator'
        // },
        // {
        //   title: '操作时间',
        //   align: 'center',
        //   dataIndex: 'oprationTime'
        // },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      columns1: [
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
          title: '会计日期',
          align: 'center',
          dataIndex: 'fiscalDate'
        },
        {
          title: '业务机构',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '记账分类',
          align: 'center',
          dataIndex: 'jzfl_dictText'
        },
        {
          title: '一级科目',
          align: 'center',
          dataIndex: 'yjkm_dictText'
        },
        {
          title: '记账科目',
          align: 'center',
          dataIndex: 'jzkm_dictText'
        },
        {
          title: '月度汇总',
          align: 'center',
          dataIndex: 'hzM'
        },
        {
          title: '季度汇总',
          align: 'center',
          dataIndex: 'hzQ'
        },
        {
          title: '年度汇总',
          align: 'center',
          dataIndex: 'hzY'
        },
        {
          title: '统计时间',
          align: 'center',
          dataIndex: 'tjsj'
        }
        // {
        //   title: '操作类型',
        //   align: 'center',
        //   dataIndex: 'oprationType'
        // },
        // {
        //   title: '操作员',
        //   align: 'center',
        //   dataIndex: 'operator'
        // },
        // {
        //   title: '操作时间',
        //   align: 'center',
        //   dataIndex: 'oprationTime'
        // },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      ipagination1: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true
      },
      ipagination2: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      url: {
        list1: '/jylrhs/tjbb/fyfthz/zh/list',
        exportXlsUrl1: 'jylrhs/tjbb/fyfthz/zh/exportXls',
        importExcelUrl1: 'jylrhs/tjbb/fyfthz/zh/importExcel',
        exportTemplateUrl1: 'jylrhs/tjbb/fyfthz/zh/exportTemplateXls',
        initData1: '/jylrhs/tjbb/fyfthz/zh/initData',

        list2: '/jylrhs/tjbb/fyfthz/xm/list',
        exportXlsUrl2: 'jylrhs/tjbb/fyfthz/xm/exportXls',
        importExcelUrl2: 'jylrhs/tjbb/fyfthz/xm/importExcel',
        exportTemplateUrl2: 'jylrhs/tjbb/fyfthz/xm/exportTemplateXls',
        initData2: '/jylrhs/tjbb/fyfthz/xm/initData'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.changeTabs()
    this.getCurrentMonth()
  },
  methods: {

    getCurrentMonth() {
      this.queryParam = { fiscalDate: undefined }
      this.queryParam.fiscalDate = moment(this.getCurrentDataFront()).format(this.monthFormat)
      // console.info('默认会计日期:',this.queryParam.fiscalDate)
    },
    getCurrentDataFront() {
      var date = new Date()
      date.setDate(1)
      var month = parseInt(date.getMonth()) + 1
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return date.getFullYear() + '-' + month + '-' + day
    },
    //获取当月最后1天日期
    getMonthLastDay(fiscalDate) {
      // console.log('获取当月最后1天日期 / 当前月份', fiscalDate)
      var date = moment(fiscalDate).format('YYYYMMDD')
      // var date = new Date()
      // console.log('当前会计日期', date)
      let new_year = parseInt(date.substring(0, 4))//取当前的年份
      let month = parseInt(date.substring(4, 6))
      let new_month = month//取当前的月份
      // console.log('month', month)
      // console.log('new_month', new_month)
      // let weekday = date.getDay();  //获取是周几
      let d = new Date(new_year, new_month, 1)//取当年当月中的第一天
      // 如果一个日期格式和一个毫秒相减，会变成一个时间毫秒戳
      // 获取当月最后一天日期
      return new Date(d.getTime() - 1000 * 60 * 60 * 24).getDate()
    },

    handleTableChange1(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination1 = pagination
      this.loadData(1)
    },
    handleTableChange2(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination2 = pagination
      this.loadData(2)
    },

    handleExportXls(fileName, num) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      //let param = {...this.queryParam};
      let param = this.getQueryParams()
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
        param['rowKey'] = this.rowKey
      }
      fileName = fileName + moment(new Date()).format('YYYYMMDDHHmmss')
      //let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      //param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      console.log('handleExportXls.num->', num)
      if (num == 1) {
        downFile(this.url.exportXlsUrl1, param).then((data) => {
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
      } else {
        downFile(this.url.exportXlsUrl2, param).then((data) => {
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
    },
    handleInitData: function(num) {
      var params = this.getQueryParams()
      if (!params.fiscalDate) {
        notification.warning({ message: '系统提示', description: '请选择数据日期！', duration: 4 })
        return
      }
      var sjrq = moment(params.fiscalDate).format('YYYYMM')
      var dqrq = moment(new Date()).format('YYYYMM')
      if (sjrq > dqrq) {
        notification.warning({ message: '系统提示', description: '数据日期不得大于系统日期！', duration: 4 })
        return
      }
      var fiscalDate = moment(params.fiscalDate).format('YYYY-MM') + '-' + this.getMonthLastDay(params.fiscalDate)
      console.log('当前统计数据日期', num, fiscalDate)
      if (num == 1) {
        this.loading1 = true
        this.initDataLoading1 = true
        this.initDataBtnName1 = '正在统计，请稍等...'
        postAction(this.url.initData1, { 'fiscalDate': fiscalDate }).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: '统计成功！', duration: 4 })
          } else {
            notification.warning({ message: '系统提示', description: res.message, duration: 4 })
          }
        }).catch((error) => {
          notification.error({ message: '系统提示', description: '统计失败，请联系系统管理员！', duration: 4 })
          console.error('统计失败！', error)
        }).finally(() => {
          this.loading1 = false
          this.initDataLoading1 = false
          this.initDataBtnName1 = '统计'
          this.loadData(1)
        })
      } else {
        this.loading2 = true
        this.initDataLoading2 = true
        this.initDataBtnName2 = '正在统计，请稍等...'
        postAction(this.url.initData2, { 'fiscalDate': fiscalDate }).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: '统计成功！', duration: 4 })
          } else {
            notification.warning({ message: '系统提示', description: res.message, duration: 4 })
          }
        }).catch((error) => {
          notification.error({ message: '系统提示', description: '统计失败，请联系系统管理员！', duration: 4 })
          console.error('统计失败！', error)
        }).finally(() => {
          this.loading2 = false
          this.initDataLoading2 = false
          this.initDataBtnName2 = '统计'
          this.loadData(2)
        })
      }
    },

    /**
     * 数据日期格式化
     * @param num 报表类型 1 存款 2 现金 3 表外
     */
    beforeUpload(num) {
      console.log('beforeUpload.num->', num)
      if (num == 1) {
        if (this.queryParam.fiscalDate) {
          this.rq = this.queryParam.fiscalDate.format('YYYYMMDD')
        }
      } else {
        if (this.queryParam.fiscalDate) {
          this.rq = this.queryParam.fiscalDate.format('YYYYMMDD')
        }
      }
    },
    changeTabs(key) {
      console.log('changeTabs.key->', key)
      if (key == undefined) {
        key = 1
      }
      this.tabsKey = key
      this.searchReset(key)
      this.getCurrentMonth()
    },
    ok(num) {
      console.log('ok.num->', num)
      this.loadData(num)
    },
    searchQuery(num) {
      console.log('searchQuery.num->', num)
      this.loadData(num, 1)
    },
    searchReset(num) {
      console.log('searchReset.num->', num)
      this.ipagination1.current = 1
      this.ipagination2.current = 1
      this.subjectName1 = undefined
      this.queryParam = {}
      this.getCurrentMonth()
      this.loadData(num)
    },
    loadData(num, arg) {
      console.log('loadData.num->', num)
      console.log('loadData.arg->', arg)
      if (arg == 1) {
        this.ipagination1.current = 1
        this.ipagination2.current = 1
      }
      var params = this.getQueryParams()//查询条件
      console.log('当前查询条件',params)
      if (num == 1) {
        this.loading1 = true
        console.log('支行')
        getAction(this.url.list1, params).then((res) => {
          if (res.success) {
            this.dataSource1 = res.result.records
            this.ipagination1.total = res.result.total
            this.loading1 = false
          } else {
            this.$message.error(res.message, 5)
            this.loading1 = false
          }
        })
      } else {
        console.log('项目')
        this.loading2 = true
        getAction(this.url.list2, params).then((res) => {
          if (res.success) {
            this.dataSource2 = res.result.records
            this.ipagination2.total = res.result.total
            this.loading2 = false
          } else {
            this.$message.error(res.message, 5)
            this.loading2 = false
          }
        })
      }
    },
    getQueryParams() {
      //获取查询条件
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      // console.log('param',param)
      param.field = this.getQueryField()
      console.log('页签No', this.tabsKey)
      if (this.tabsKey == 1) {
        if (param.fiscalDate !== undefined && param.fiscalDate !== null && param.fiscalDate !== '') {
          let lastday = this.getMonthLastDay(param.fiscalDate)
          param.fiscalDate = moment(param.fiscalDate).format('YYYY-MM') + '-' + lastday
        }
        param.pageNo = this.ipagination1.current
        param.pageSize = this.ipagination1.pageSize
      } else {
        if (param.fiscalDate !== undefined && param.fiscalDate !== null && param.fiscalDate !== '') {
          let lastday = this.getMonthLastDay(param.fiscalDate)
          param.fiscalDate = moment(param.fiscalDate).format('YYYY-MM') + '-' + lastday
        }
        param.pageNo = this.ipagination2.current
        param.pageSize = this.ipagination2.pageSize
      }
      console.log('param', param)
      return filterObj(param)
    },

    onSearchLookup: function() {
      this.$refs.selectJzkmModal.add()
    },
    selectOK: function(data) {
      console.info('已选择科目', data[0])
      this.subjectName1 = data[0].subjectName1
      this.queryParam.yjkm = data[0] ? data[0].subjectNo1 : undefined
      this.queryParam.jzkm = data[0] ? data[0].subjectNo2 : undefined
    }

  }
}
</script>