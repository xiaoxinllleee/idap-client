<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-date-picker v-model='queryParam.sjrq' placeholder='数据日期' style='width: 100%;'
                             :defaultValue='maxDate' :format='dateFormat' :allowClear='true' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属支行'>
              <j-tree-select placeholder='请选择所属支行'
                             v-model='queryParam.sszh'
                             treeNodeFilterProp='title'
                             pid-field='sjzzbz'
                             dict='v_hr_bas_organization, zzjc, zzbz'
                             :showSearch='true'
                             :treeDefaultExpandAll='true' />
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
      <a-button type='primary' @click='extract' :loading='loading' icon='area-chart' v-has="'qhdkqk:init'">提取
      </a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('全行贷款情况')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='(record,index)=>{return index}'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :scroll="{ x : 'max-content' }"
        @change='handleTableChange'>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction, putAction } from '@api/manage'
import moment from 'moment'
import { filterObj } from '@/utils/util'
import JTreeSelect from '@comp/jeecg/JTreeSelect'

export default {
  name: 'TjfxQhdkqkList',
  mixins: [JeecgListMixin],
  components: { JTreeSelect },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      description: '全行贷款情况管理页面',
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
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText',
          customRender: function(text) {
            if (text != null && text != undefined && text != '') {
              return text
            } else {
              return '合计'
            }
          }
        },
        {
          title: '当期贷款总额',
          align: 'center',
          dataIndex: 'dqdkze'
        },
        {
          title: '月初贷款总额',
          align: 'center',
          dataIndex: 'ycdkze'
        },
        {
          title: '较月初净增减',
          align: 'center',
          dataIndex: 'jycjzj'
        },
        {
          title: '年初贷款总额',
          align: 'center',
          dataIndex: 'ncdkze'
        },
        {
          title: '较年初净增减',
          align: 'center',
          dataIndex: 'jncjzj'
        },
        {
          title: '关注贷款',
          children: [
            {
              title: '当前余额',
              align: 'center',
              dataIndex: 'gzdkDqye'
            },
            {
              title: '月初余额',
              align: 'center',
              dataIndex: 'gzdkYcye'
            },
            {
              title: '比月初净增减',
              align: 'center',
              dataIndex: 'gzdkBycjzj'
            },
            {
              title: '年初余额',
              align: 'center',
              dataIndex: 'gzdkNcye'
            },
            {
              title: '比年初净增减',
              align: 'center',
              dataIndex: 'gzdkBncjzj'
            },
            {
              title: '占比(%)',
              align: 'center',
              dataIndex: 'gzdkZb'
            }]
        },
        {
          title: '不良贷款',
          children: [
            {
              title: '次级贷款',
              children: [
                {
                  title: '当前余额',
                  align: 'center',
                  dataIndex: 'bldkCjdkDqye'
                },
                {
                  title: '月初余额',
                  align: 'center',
                  dataIndex: 'bldkCjdkYcye'
                },
                {
                  title: '比月初净增减',
                  align: 'center',
                  dataIndex: 'bldkCjdkBycjzj'
                },
                {
                  title: '年初余额',
                  align: 'center',
                  dataIndex: 'bldkCjdkNcye'
                },
                {
                  title: '比年初净增减',
                  align: 'center',
                  dataIndex: 'bldkCjdkBncjzj'
                },
                {
                  title: '占比(%)',
                  align: 'center',
                  dataIndex: 'bldkCjdkZb'
                }]
            },
            {
              title: '可疑贷款',
              children: [
                {
                  title: '当前余额',
                  align: 'center',
                  dataIndex: 'bldkKydkDqye'
                },
                {
                  title: '月初余额',
                  align: 'center',
                  dataIndex: 'bldkKydkYcye'
                },
                {
                  title: '比月初净增减',
                  align: 'center',
                  dataIndex: 'bldkKydkBycjzj'
                },
                {
                  title: '年初余额',
                  align: 'center',
                  dataIndex: 'bldkKydkNcye'
                },
                {
                  title: '比年初净增减',
                  align: 'center',
                  dataIndex: 'bldkKydkBncjzj'
                },
                {
                  title: '占比(%)',
                  align: 'center',
                  dataIndex: 'bldkKydkZb'
                }]
            },
            {
              title: '损失贷款',
              children: [
                {
                  title: '当前余额',
                  align: 'center',
                  dataIndex: 'bldkSsdkDqye'
                },
                {
                  title: '月初余额',
                  align: 'center',
                  dataIndex: 'bldkSsdkYcye'
                },
                {
                  title: '比月初净增减',
                  align: 'center',
                  dataIndex: 'bldkSsdkBycjzj'
                },
                {
                  title: '年初余额',
                  align: 'center',
                  dataIndex: 'bldkSsdkNcye'
                },
                {
                  title: '比年初净增减',
                  align: 'center',
                  dataIndex: 'bldkSsdkBncjzj'
                },
                {
                  title: '占比(%)',
                  align: 'center',
                  dataIndex: 'bldkSsdkZb'
                }]
            },
            {
              title: '不良贷款合计',
              align: 'center',
              dataIndex: 'bldkhj'
            },
            {
              title: '不良贷款占比(%)',
              align: 'center',
              dataIndex: 'bldkzb'
            }
          ]
        }
      ],
      url: {
        list: '/qhdkqk/tjfxqhdkqk/list',
        exportXlsUrl: 'qhdkqk/tjfxqhdkqk/exportXls',
        init: '/qhdkqk/tjfxqhdkqk/initData'
      },
      maxDate: ''
    }
  },
  created() {
    this.getMaxDateToQuery()
  },
  methods: {
    getMaxDateToQuery(){
      getAction('/qhdkqk/tjfxqhdkqk/getMaxDate').then(res => {
        if (res.success) {
          if (!this.isCheck(res.result)){
            this.maxDate=''
          }else{
            this.maxDate=moment(res.result)
          }
          this.queryParam.sjrq = this.maxDate
        }
      }).finally(() => {
        this.queryParam = { sjrq: this.maxDate }
        this.loadData(1)
      })
    },
    searchReset() {
      this.queryParam = { sjrq: this.maxDate }
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
    getQueryParams() {
      let sjrqMoment = ''
      if (this.queryParam.sjrq) {
        sjrqMoment = moment(this.queryParam.sjrq).format('YYYY-MM-DD')
      }
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (param.sjrq) {
        param.sjrq = sjrqMoment
      }
      return filterObj(param)
    },
    extract() {
      if (!this.isCheck(this.queryParam.sjrq)) {
        this.$message.error('请选择数据提取日期！')
        return
      }
      this.loading = true
      putAction(this.url.init, {sjrq:moment(this.queryParam.sjrq).format('YYYY-MM-DD')}).then((res) => {
        if (res.success) {
          this.$message.success('提取成功！')
          this.getMaxDateToQuery()
        } else {
          this.$message.warning('提取失败！')
        }
      }).catch((error) => {
        this.$message.error('提取失败！', error)
      }).finally(() => {
        this.loading = false
      })
    },
    isCheck(e) {
      if (e == null || e == undefined || e == '') {
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>