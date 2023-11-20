<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='业务名称'>
              <a-input placeholder='请输入业务名称' v-model='queryParam.ywmc'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='客户名称'>
              <a-input placeholder='请输入客户名称' v-model='queryParam.khmc'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='证件号码'>
              <a-input placeholder='请输入证件号码' v-model='queryParam.zjhm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='管户人'>
              <a-input placeholder='请输入管户人' v-model='queryParam.ghr'></a-input>
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
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'ywghb:add'">新增</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('业务管户表')" v-has="'ywghb:export'">导出</a-button>
      <a-button icon='import' @click='excelImport' v-has="'ywghb:import'">导入</a-button>
      <a-button icon="import" @click="delBatchBySxtj" v-has="'ywghb:delbatch'">按筛选条件批量删除</a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel' v-has="'ywghb:del'">
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
          <a @click='handleEdit(record)' v-has="'ywghb:edit'">编辑</a>

          <a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
                  <a v-has="'ywghb:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <taskYwghb-modal ref='modalForm' @ok='modalFormOk'></taskYwghb-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import TaskYwghbModal from './modules/TaskYwghbModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import { syncGwxxZzbz } from '@api/api'
import { deleteAction } from '@api/manage'

export default {
  name: 'TaskYwghbList',
  mixins: [JeecgListMixin],
  components: {
    TaskYwghbModal,ExcelImport
  },
  data() {
    return {
      description: '业务管户表管理页面',
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
          title: '业务名称',
          align: 'center',
          dataIndex: 'ywmc'
        },
        {
          title: '客户名称',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '管户人',
          align: 'center',
          dataIndex: 'ghr'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/zzrw/taskYwghb/list',
        delete: '/zzrw/taskYwghb/delete',
        deleteBatch: '/zzrw/taskYwghb/deleteBatch',
        exportXlsUrl: 'zzrw/taskYwghb/exportXls',
        importExcelUrl: 'zzrw/taskYwghb/importExcel',
        importTemplateXls:'zzrw/taskYwghb/importTemplateXls',
        deleteBatchOther:'/zzrw/taskYwghb/deleteBatchOther'
      },
      exportTemplateName:'业务管户表',
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.searchReset()
  },
  methods: {
    excelImport() {
      let params = {}
      params.exportTemplateUrl = this.url.importTemplateXls
      params.exportTemplateName = this.exportTemplateName
      params.importExcelUrl = this.url.importExcelUrl
      this.$refs.excelImportModal.showModal(params);
    },
    delBatchBySxtj(){
      console.log("龚辉"+JSON.stringify(this.queryParam))
      let that = this;
      that.$confirm({
        title:'确认操作',
        okText: '确定',
        cancelText: '取消',
        content: '该操作会根据筛选条件进行批量删除，如果筛选条件为空则会删除所有，确定进行此操作吗?',
        onOk: () => {
          this.loading=true
          deleteAction(this.url.deleteBatchOther,this.queryParam).then(res=>{
            if (res.success){
              this.$message.success("批量删除删除成功！")
              this.searchReset()
            }
            this.loading=false
          })
        },
        onCancel: e => {
          if (e.triggerCancel) {
            // 点击x或者按键盘esc关闭的弹窗
            return
          }
          // 函数体 方法
          e()
        }
      })
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>