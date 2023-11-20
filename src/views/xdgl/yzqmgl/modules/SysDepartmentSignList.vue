<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='部门名称'>
              <j-dict-select-tag v-model='queryParam.departId' placeholder='请选择部门名称'
                                 dict-code='v_hr_bas_organization_cmms, zzjc, zzbz' allowClear />
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
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'departSign:add'">上传部门印章图片</a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel' v-has="'departSign:delete'">
            <a-icon type='delete' />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style='margin-left: 8px'> 批量操作
          <a-icon type='down' />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>
        <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a
        style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项
        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>
      </div>

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
          <a @click='viewDetail(record)'>预览</a>
          <a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item v-has="'departSign:delete'">
               <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
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
    <sysDepartmentSign-modal ref='modalForm' @ok='modalFormOk'></sysDepartmentSign-modal>
    <fj-modal ref='fjxx' />
  </a-card>
</template>

<script>
import SysDepartmentSignModal from './SysDepartmentSignModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import FjModal from '@views/xdgl/yzqmgl/modules/FjModal'

export default {
  name: 'SysDepartmentSignList',
  mixins: [JeecgListMixin],
  components: {
    SysDepartmentSignModal, FjModal
  },
  data() {
    return {
      description: '部门印章管理管理页面',
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
          title: '部门名称',
          align: 'center',
          dataIndex: 'departId_dictText'
        },
        {
          title: '上传时间',
          align: 'center',
          dataIndex: 'scsj'
        },
        {
          title: '上传人',
          align: 'center',
          dataIndex: 'scr_dictText'
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
        list: '/sys/sysDepartmentSign/list',
        delete: '/sys/sysDepartmentSign/delete',
        deleteBatch: '/sys/sysDepartmentSign/deleteBatch'
      }
    }
  },
  methods: {
    viewDetail(row) {
      this.$refs.fjxx.view(row,"1")
    }
  },
  created() {
    this.loadData(1)
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>