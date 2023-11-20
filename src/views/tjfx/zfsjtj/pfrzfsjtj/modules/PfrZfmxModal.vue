<template>
  <a-modal
    title='陪访人走访明细'
    :width='1450'
    :visible='visible'
    @ok='handleCancel'
    :confirmLoading='confirmLoading'
    @cancel='handleCancel'
  >
    <a-table ref='table'
             size='middle'
             bordered
             :columns='colunms'
             :dataSource='dataSource'
             rowKey='id'
             :pagination='ipagination'
             :loading='loading'
             :scroll="{ x : 'max-content' }"
             @change='handleTableChange'
    >
    </a-table>
  </a-modal>
</template>

<script>
import { getAction, downFile } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import moment from 'moment'

export default {
  name: 'PfrZfmxModal',
  mixins: [JeecgListMixin],
  components: {},
  data() {
    return {
      dataSource: [],
      lx: '',
      record: {},
      // 分页参数
      ipagination: {
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
      visible: false,
      loading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      colunms: [
        { title: '走访日期', dataIndex: 'hfrq' },
        { title: '走访时间', dataIndex: 'hfsj' },
        { title: '客户姓名', dataIndex: 'khmc' },
        { title: '客户类型', dataIndex: 'khlx_dictText' },
        { title: '走访人工号', dataIndex: 'zfr' },
        { title: '走访人', dataIndex: 'zfr_dictText' },
        { title: '走访支行', dataIndex: 'zfzh_dictText' },
        { title: '所属网格', dataIndex: 'sswg_dictText' },
        { title: '所属支行', dataIndex: 'khsszh_dictText' }
      ],
      url: {
        list: '/zfsjtj/pfrZfsjtj/getPfrZfMx'
      }
    }
  },
  methods: {
    init(record, lx) {
      console.log(record + 'init')
      this.visible = true
      this.lx = lx
      this.record = record
      this.loadData()
    },
    loadData() {
      let params = this.initParams()
      console.log('params', params)
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        console.log(res)
        this.dataSource = res.result.records
        this.ipagination.total = res.result.total
      }).finally(() => {
        this.loading = false
      })
    },
    initParams() {
      let params = {}
      params.lx = this.lx
      params.tjrq = this.record.tjrq
      params.gwbz = this.record.gwbz
      params.yggh = this.record.yggh
      params.khlx = this.record.khlx
      return params
    },
    close() {
      this.visible = false
      this.dataSource = []
      this.ipagination.current = 1
      this.ipagination.pageSize = 10
    },

    handleCancel() {
      this.visible = false
      this.close()
    },
    getQueryField() {
      //TODO 字段权限控制
    },
    handleTableChange(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination = pagination
      this.loadData()
    }
  }
}
</script>

<style lang='less' scoped>

</style>