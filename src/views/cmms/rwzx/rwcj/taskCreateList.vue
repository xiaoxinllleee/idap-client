<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="任务类型">
              <j-dict-select-tag v-model="queryParam.rwlx" placeholder="请选择任务类型" dictCode="marketing_type1"
                                 allowClear />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="任务名称">
              <a-input placeholder="请输入任务名称" v-model="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销类型">
              <j-dict-select-tag v-model="queryParam.marketingType" placeholder="请选择营销类型" dictCode="marketing_type"
                                 allowClear />
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="优先级">
                <j-dict-select-tag v-model="queryParam.yxj" placeholder="请选择优先级" dictCode="yxj"
                                   allowClear />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'taskCreate:xjrw'">新建任务</a-button>
<!--      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('任务创建')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="viewMxsj(record)" v-has="'taskCreate:edit'">查看明细</a>

          <a-divider type="vertical" />
          <a-dropdown v-has="'taskCreate:del'">
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
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
    <taskCreate-modal ref="modalForm" @ok="modalFormOk"></taskCreate-modal>
    <TaskMxsjModal ref="taskMxsjModal" @ok="modalFormOk"></TaskMxsjModal>
    <TaskMxsjZzrwModal  ref="taskMxsjZzrwModal" @ok="modalFormOk"></TaskMxsjZzrwModal>
  </a-card>
</template>

<script>
import taskCreateModal from './modules/taskCreateModal'
import TaskMxsjModal from './modules/TaskMxsjModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import TaskMxsjZzrwModal from './modules/TaskMxsjZzrwModal'

export default {
  name: 'taskCreateList',
  mixins: [JeecgListMixin],
  components: {
    taskCreateModal,TaskMxsjModal,TaskMxsjZzrwModal
  },
  data () {
    return {
      description: '任务创建管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },

        {
          title: '任务类型',
          align: 'center',
          dataIndex: 'rwlx_dictText'
        },
        {
          title: '任务名称',
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: '营销类型',
          align: 'center',
          dataIndex: 'marketingType_dictText'
        },
        {
          title: '优先级',
          align: 'center',
          dataIndex: 'yxj_dictText'
        },
        {
          title: '开始时间',
          align: 'center',
          dataIndex: 'startTime'
        },
        {
          title: '结束时间',
          align: 'center',
          dataIndex: 'endTime'
        },

        {
          title: '任务对象类型',
          align: 'center',
          dataIndex: 'dxlx_dictText'
        },
        {
          title: '任务数',
          align: 'center',
          dataIndex: 'rws'
        },
        {
          title: '完成数',
          align: 'center',
          dataIndex: 'wcs'
        },

       /* {
          title: '已走访',
          align: 'center',
          dataIndex: 'yyx'
        },
        {
          title: '未走访',
          align: 'center',
          dataIndex: 'wyx'
        },*/
        /*{
          title: '状态',
          align: 'center',
          dataIndex: 'status_dictText'
        },*/
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],

      url: {
        list: '/rwwcqk/vtaskRwwcqk/list',
        delete: '/rwcj/taskCreate/delete',
        deleteBatch: '/rwcj/taskCreate/deleteBatch',
        exportXlsUrl: 'rwcj/taskCreate/exportXls',
        importExcelUrl: 'rwcj/taskCreate/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    viewMxsj(row){
      if(row.rwlx!=3){
        this.$refs.taskMxsjModal.visible = true;
        this.$refs.taskMxsjModal.edit(row);
      }else{
        this.$refs.taskMxsjZzrwModal.visible = true;
        this.$refs.taskMxsjZzrwModal.edit(row);
      }

    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>