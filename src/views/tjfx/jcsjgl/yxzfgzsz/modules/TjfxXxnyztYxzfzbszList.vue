<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='指标ID'>
              <a-input placeholder='请输入指标ID' v-model='queryParam.zbid'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='指标名称'>
              <a-input placeholder='请输入指标名称' v-model='queryParam.zbmc'></a-input>
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
      <a-button @click='handleAdd' type='primary' icon='plus'>新增</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('精准营销走访有效走访指标设置')">导出
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
        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'
        @change='handleTableChange'>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)'>编辑</a>

          <a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.zbid)'>
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxXxnyztYxzfzbsz-modal ref='modalForm' @ok='modalFormOk'></tjfxXxnyztYxzfzbsz-modal>
  </a-card>
</template>

<script>
import TjfxXxnyztYxzfzbszModal from './TjfxXxnyztYxzfzbszModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

export default {
  name: 'TjfxXxnyztYxzfzbszList',
  mixins: [JeecgListMixin],
  components: {
    TjfxXxnyztYxzfzbszModal
  },
  data() {
    return {
      description: '精准营销走访有效走访指标设置管理页面',
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
          dataIndex: 'zbid'
        },
        {
          title: '指标名称',
          align: 'center',
          dataIndex: 'zbmc'
        },
        {
          title: '是否启用',
          align: 'center',
          dataIndex: 'sfqy_dictText'
        },
        {
          title: '有效类型',
          align: 'center',
          dataIndex: 'yxlx'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/jcsjgl/tjfxXxnyztYxzfzbsz/list',
        delete: '/jcsjgl/tjfxXxnyztYxzfzbsz/delete',
        exportXlsUrl: 'jcsjgl/tjfxXxnyztYxzfzbsz/exportXls'

      }
    }
  },
  methods: {}
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>