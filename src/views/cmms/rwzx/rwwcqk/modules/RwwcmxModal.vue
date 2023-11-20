<template>
  <a-modal
    :title='title'
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
      <span slot='fj' slot-scope='fj,record'>
          <a @click='getFjxx(record)'>查看附件</a>
         </span>
    </a-table>
    <task-fjxx-modal ref='fjxx'></task-fjxx-modal>
  </a-modal>
</template>

<script>
import { getAction, downFile } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import TaskFjxxModal from '@views/cmms/rwzx/rwwcqk/modules/TaskFjxxModal'
import store from '@/store/'


export default {
  name: 'ZcsxmxModal',
  mixins: [JeecgListMixin],
  components: {TaskFjxxModal},
  data() {
    return {
      title: '',
      dataSource: [],
      lx: '',
      record: {},
      tjrq: '',
      exportLoading: false,
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
        { title: '营销走访人', dataIndex: 'yxzfr_dictText' },
        { title: '客户名称', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '营销时间', dataIndex: 'createTime' },
        { title: '营销方式', dataIndex: 'yxlx_dictText' },
        {
          title: '营销结果', dataIndex: 'yxjg_dictText', customRender: text => {
            if (text != null && text != undefined && text != '') {
              return text
            }
            return '成功'
          }
        },
        { title: '营销产品', dataIndex: 'yxcp_dictText' },
        { title: '营销失败原因', dataIndex: 'yxsbyy' },
        { title: '意向产品', dataIndex: 'khyx_dictText' },
        { title: '备注', dataIndex: 'bz' },
        { title: '附件', dataIndex: 'fj', scopedSlots: { customRender: 'fj' } },
        { title: '是否有业务新增时间（在任务完成时间后一个月）', dataIndex: 'sfyywxz_dictText'},
        { title: '是否有营销产品新增时间（在任务完成时间后一个月）', dataIndex: 'sfyyxcpxz_dictText' },
        { title: '营销人所在支行是否和业务产生支行是否同一个', dataIndex: 'ywzhsfyz_dictText' }
      ],
      url: {
        list: '/tjfx/taskWcmx/getRwwcmx',
        listLs: '/rwwcmx/tjfxTaskWcmxLs/getRwwcmx'
      },
      tjwd:'',
      qybm:'',
    }
  },
  methods: {
    init(record, lx,tjwd) {
      console.log(record + 'init')
      this.visible = true
      this.lx = lx
      this.record = record
      this.tjwd=tjwd
      this.qybm = store.getters.qybm
      this.loadData()
    },
    loadData() {
      let params = this.initParams()
      console.log('params', params)
      if (this.qybm=='420'){
        this.url.list=this.url.listLs
      }
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
      params.yggh = this.record.ygxm
      params.sszh = this.record.sszh
      params.rwlx = this.record.rwlx
      params.tjrq = this.record.tjrq
      params.tjwd = this.tjwd
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
    },
    getFjxx(row) {
      this.$refs.fjxx.edit(row)
      this.$refs.fjxx.title = '附件信息'
      this.$refs.fjxx.disableSubmit = false
    },
  }
}
</script>

<style lang='less' scoped>

</style>