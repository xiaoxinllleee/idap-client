<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="6" :sm="8">
            <a-form-item label="数据维度">
              <j-dict-select-tag v-model="queryParam.sjwd" placeholder="请选择数据维度" dictCode="sjwd"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>


          <a-col :md="6" :sm="8">
            <a-form-item label="贷款金额">
              <a-input-group compact>
                <a-input placeholder="Min" v-model="queryParam.dkje_begin" style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input placeholder="Max" v-model="queryParam.dkje_end"
                         style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item></a-form-item>
            </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款余额">
              <a-input-group compact>
                <a-input placeholder="Min" v-model="queryParam.dkye_begin" style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input placeholder="Max" v-model="queryParam.dkye_end"
                         style="width: 40%; text-align: center; border-left: 0; "/>
              </a-input-group>
            </a-form-item>
          </a-col>
          </template>

                    <a-col :md="6" :sm="8" >
                      <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                        <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                        <a-button @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
                        <a @click="handleToggleSearch" style="margin-left: 8px">
                          {{ toggleSearchStatus ? '收起' : '展开' }}
                          <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
                        </a>
                      </span>
                    </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="area-chart" @click="initData" v-has="'qhdktjxb:extract1'">统计</a-button>
      <a-button icon="download" @click="handleExportXls('全行贷款统计(旬报)')" style="margin-left: 8px;" v-has="'qhdktjxb:exportXls'">导出
      </a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600;">{{-->
<!--        selectedRowKeys.length }} </a>项-->
<!--        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 1800 }"
               @change="handleTableChange"/>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction, putAction, httpAction } from '@/api/manage'
  import { filterObj } from '../../../../../utils/util'
  import moment from 'moment'
  export default {
    name: 'Qhbndktj_xbList',
    mixins: [JeecgListMixin],
    components: {},
    data() {
      return {
        description: '全行贷款统计(旬报)管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '数据维度',
            align: 'center',
            dataIndex: 'sjwd_dictText',
            width: 100
          },
          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            width: 120,
            customRender: function(text) {
              return !text ? '' : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/')
          },
          {
            title: '贷款户数',
            align: 'center',
            dataIndex: 'dkhs',
            width: 100
          },
          {
            title: '贷款笔数',
            align: 'center',
            dataIndex: 'dkbs',
            width: 100
          },
          {
            title: '贷款金额',
            align: 'center',
            dataIndex: 'dkje',
            width: 120
          },
          {
            title: '贷款余额',
            align: 'center',
            dataIndex: 'dkye',
            width: 120
          },
          {
            title: '不良余额',
            align: 'center',
            dataIndex: 'blye',
            width: 120
          },
          {
            title: '不良余额比例',
            align: 'center',
            dataIndex: 'blyebl',
            width: 120
          },
          {
            title: '当旬到期贷款金额',
            align: 'center',
            dataIndex: 'dndqdkje',
            width: 130
          },
          {
            title: '当旬到期收回金额',
            align: 'center',
            dataIndex: 'dndqshje',
            width: 130
          },
          {
            title: '当旬到期收回率',
            align: 'center',
            dataIndex: 'dqdqshl',
            width: 130
          }
        ],
        url: {
          list: '/qhbndktj_xb/qhbndktjXb/list',
          delete: '/qhbndktj_xb/qhbndktjXb/delete',
          deleteBatch: '/qhbndktj_xb/qhbndktjXb/deleteBatch',
          exportXlsUrl: 'qhbndktj_xb/qhbndktjXb/exportXls',
          importExcelUrl: 'qhbndktj_xb/qhbndktjXb/importExcel',
          init: 'qhbndktj_xb/qhbndktjXb/extract'
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
      searchReset() {
        this.flag = false
        this.queryParam = {}
        this.loadData(1)
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
        console.log(tjyfMoment)
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (param.tjyf) {
          param.tjyf = tjyfMoment
        }
        return filterObj(param)
      },
      searchQuery() {
        var params = this.queryParam
        if (params.sjwd == null || params.sjwd == 'undefined') {
          this.$message.warning('查询请选择数据维度！')
          return
        } else {
          this.loadData(1)
        }
      },
      initData() {
        this.loading = true
        var params = this.queryParam
        if (params.tjyf == null || params.sjwd == null || params.tjyf == 'undefined') {
          this.$message.error('统计月份或者时间维度不能为空!')
          return
        } else {
          var tjyf = params.tjyf.format('YYYYMM')
        }
        putAction(this.url.init, { 'tjyf': tjyf, 'sjwd': params.sjwd }, 'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      },
      // getQueryParams() {
      //   let sjwd = this.queryParam.sjwd
      //   let tjyf = this.queryParam.tjyf
      //   let tjyfMoment = ''
      //   if (tjyf != null && tjyf != 'undefined') {
      //     if (sjwd == '1') {
      //       tjyfMoment = tjyf.format('YYYY-MM') + '-10'
      //     } else if (sjwd == '2') {
      //       tjyfMoment = tjyf.format('YYYY-MM') + '-20'
      //     } else {
      //       let year = tjyf.getFullYear()
      //       let month = tjyf.getMonth() + 1
      //       let day = new Date(year, month, 0)
      //       let dayCount = day.getDate()
      //       tjyfMoment = tjyf.format('YYYY-MM') + dayCount
      //     }
      //   }
      //   console.log(tjyfMoment)
      //   var param = Object.assign({}, this.queryParam, this.isorter)
      //   param.field = this.getQueryField()
      //   param.pageNo = this.ipagination.current
      //   param.pageSize = this.ipagination.pageSize
      //   param.tjyf = tjyfMoment
      //   return filterObj(param)
      // }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>