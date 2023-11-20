<template>
  <div>
    <a-modal centered
             :title='title'
             :width='width'
             :visible='visible'
             @ok='handleOk'
             @cancel='handleCancel'
             cancelText='关闭'>
      <!-- 查询区域 -->
      <div class='table-page-search-wrapper'>
        <a-form layout='inline'>
          <a-row :gutter='24'>

            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='指标ID'>
                <a-input placeholder='请输入指标ID' v-model='queryParam.zbid'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='指标名称'>
                <j-input placeholder='模糊查询' v-model='queryParam.zbmc'></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='指标大类'>
                <j-dict-select-tag placeholder='请选择' v-model='queryParam.zbdl' dict-code='zbdl'></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='指标小类'>
                <j-dict-select-tag placeholder='请选择' v-model='queryParam.zbxl' dict-code='zbxl'></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='数据来源'>
                <j-dict-select-tag placeholder='请选择' v-model='queryParam.sjly' dict-code='data_source'></j-dict-select-tag>
              </a-form-item>
            </a-col>

            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
            </span>
            </a-col>

          </a-row>
        </a-form>
      </div>

      <!-- table区域-begin -->
      <div>
        <a-table bordered
                 size='small'
                 :rowKey='rowKey'
                 :columns='columns'
                 :dataSource='dataSource'
                 :pagination='ipagination'
                 :loading='loading'
                 :rowSelection='{
                   selectedRowKeys: selectedRowKeys,
                   onSelectAll:onSelectAll,
                   onSelect:onSelect,
                   onChange: onSelectChange,
                   type: type
                 }'
                 @change='handleTableChange'>

        </a-table>
      </div>
      <!-- table区域-end -->


    </a-modal>
  </div>
</template>

<script>
import { filterObj } from '@/utils/util'
import { getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@comp/jeecg/JInput.vue'
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'SelectJzkmModal',
  mixins: [JeecgListMixin],
  components: { JInput },
  rowKey: 'subject_no1,subject_no2',
  data() {
    return {
      title: '指标库',
      names: [],
      visible: false,
      placement: 'right',
      description: '',
      width: '75%',
      // 查询条件
      queryParam: {},
      type: 'radio',
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
          title: '指标ID',
          align: 'center',
          dataIndex: 'zbid',
          sorter: true,
        },
        {
          title: '指标名称',
          align: 'center',
          dataIndex: 'zbmc'
        },
        {
          title: '指标大类',
          align: 'center',
          dataIndex: 'zbdl_dictText'
        },
        {
          title: '指标小类',
          align: 'center',
          dataIndex: 'zbxl_dictText'
        },
        {
          title: '数据来源',
          align: 'center',
          dataIndex: 'sjly_dictText',
        },
        {
          title: '说明',
          align: 'center',
          dataIndex: 'remark'
        },
      ],
      //数据集
      dataSource: [],
      dataSource2: [],
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
      loading: false,
      selectedRowKeys: [],
      selectedRows: [],
      url: {
        list: '/jylrhs/csgl/zbk/list'
      }
    }
  },
  created() {
  },
  methods: {
    add() {
      this.onClearSelected()
      this.visible = true
    },
    onClearSelected() {
      this.selectedRowKeys = []
      this.selectionRows = []
      this.queryParam = {}
      this.loadData()
    },
    loadData(arg) {
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      //查询条件
      var params = this.getQueryParams()
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      }).finally(() => {
        this.loading = false
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.kg = 1
      console.log('查询条件', param)
      return filterObj(param)
    },
    searchQuery() {
      this.loadData(1)
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1)
    },
    handleOk() {
      this.dataSource2 = this.selectedRowKeys
      console.info('已选择', this.selectionRows)
      this.$emit('selectFinished', this.selectionRows)
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    onSelectAll(selected, selectedRows, changeRows) {
      if (selected === true) {
        for (var a = 0; a < changeRows.length; a++) {
          this.dataSource2.push(changeRows[a])
        }
      } else {
        for (var b = 0; b < changeRows.length; b++) {
          this.dataSource2.splice(this.dataSource2.indexOf(changeRows[b]), 1)
        }
      }
      // console.log(selected, selectedRows, changeRows);
    },
    onSelect(record, selected) {
      if (selected === true) {
        this.dataSource2.push(record)
      } else {
        var index = this.dataSource2.indexOf(record)
        //console.log();
        if (index >= 0) {
          this.dataSource2.splice(this.dataSource2.indexOf(record), 1)
        }
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      if (selectedRowKeys.length == 1) {
        this.selectedRowKeys = selectedRowKeys
        this.selectionRows = selectedRows
        console.info('已选择的:', this.selectionRows)
      } else {
        // alert('只能选择一项')
        this.selectedRows = []
        this.selectedRowKeys = []
        notification.warning({message: '系统提示', description: '只能选择一项！', duration: 4})
        return
      }
    },
    handleDelete: function(record) {
      this.dataSource2.splice(this.dataSource2.indexOf(record), 1)
    },
    handleTableChange(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      console.log(sorter)
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination = pagination
      this.loadData()
    },
    getQueryField() {
      //TODO 字段权限控制
    }
  }
}
</script>

<style lang='less' scoped>
.ant-card-body .table-operator {
  margin-bottom: 18px;
}

.ant-table-tbody .ant-table-row td {
  padding-top: 15px;
  padding-bottom: 15px;
}

.anty-row-operator button {
  margin: 0 5px
}

.ant-btn-danger {
  background-color: #ffffff
}

.ant-modal-cust-warp {
  height: 100%
}

.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto
}

.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden
}
</style>