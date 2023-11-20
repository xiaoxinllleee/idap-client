<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属支行'>
              <j-tree-select placeholder='请选择所属支行'
                             v-model='queryParam.zzbz'
                             treeNodeFilterProp='title'
                             pid-field='sjzzbz'
                             dict='v_hr_bas_organization, zzjc, zzbz'
                             :showSearch='true'
                             :treeDefaultExpandAll='true' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='员工姓名'>
              <a-input placeholder='请输入员工姓名(支持模糊查询)' v-model='queryParam.yggh'></a-input>
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
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('全行汇总统计')">导出</a-button>
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
import JTreeSelect from '@comp/jeecg/JTreeSelect'

export default {
  name: 'VTjfxHztjKhjlList',
  mixins: [JeecgListMixin],
  components: { JTreeSelect },
  data() {
    return {
      description: '全行汇总统计管理页面',
      // 表头
      columns: [
        {
          title: '排名',
          align: 'center',
          dataIndex: 'pm'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'zzbz_dictText'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'yggh_dictText'
        },
        {
          title: '本日',
          children: [
            {
              title: '走访数',
              align: 'center',
              sorter: true,
              dataIndex: 'brzfs'
            },
            {
              title: '有效走访数',
              align: 'center',
              sorter: true,
              dataIndex: 'bryxzfs'
            },
            {
              title: '完成任务数',
              align: 'center',
              sorter: true,
              dataIndex: 'brwcrws'
            }]
        },
        {
          title: '本周',
          children: [
            {
              title: '走访数',
              align: 'center',
              sorter: true,
              dataIndex: 'bzzfs'
            },
            {
              title: '有效走访数',
              align: 'center',
              sorter: true,
              dataIndex: 'bzyxzfs'
            },
            {
              title: '完成任务数',
              align: 'center',
              sorter: true,
              dataIndex: 'bzwcrws'
            }]
        },
        {
          title: '本月',
          children: [
            {
              title: '走访数',
              align: 'center',
              sorter: true,
              dataIndex: 'byzfs'
            },
            {
              title: '有效走访数',
              align: 'center',
              sorter: true,
              dataIndex: 'byyxzfs'
            },
            {
              title: '完成任务数',
              align: 'center',
              sorter: true,
              dataIndex: 'bywcrws'
            }]
        },
        {
          title: '累计走访数',
          align: 'center',
          sorter: true,
          dataIndex: 'ljzfs'
        },
        {
          title: '累计完成任务数',
          align: 'center',
          sorter: true,
          dataIndex: 'ljwcrws'
        }
      ],
      url: {
        list: '/khjlhztj/vTjfxHztjKhjl/list',
        exportXlsUrl: 'khjlhztj/vTjfxHztjKhjl/exportXls'
      },
      isorter: {
        column: '',
        order: ''
      }
    }
  },
  created() {
    this.queryParam.isPc="1"
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      //分页、排序
      console.log(JSON.stringify(sorter))
      if (Object.keys(sorter).length > 0 && sorter.order != null && sorter.order != undefined && sorter.order != '') {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      } else {
        this.isorter.column = ''
        this.isorter.order = ''
      }
      this.ipagination = pagination
      this.loadData()
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>