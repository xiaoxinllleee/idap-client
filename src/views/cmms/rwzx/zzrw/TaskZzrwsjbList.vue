<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='任务名称'>
              <a-input placeholder='请输入任务名称' v-model='queryParam.rwmc'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行"
                             v-model="queryParam.sszh"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             getAllZzjg="1"
                             :treeDefaultExpandAll="true" />
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label="归属网格">
                <a-tree-select
                  :treeData=sswgTreeDateoptions
                  :replaceFields=replaceFields
                  v-model="queryParam.sswg"
                  defaultExpandAll="false"
                  allow-clear
                  :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                  showSearch
                  treeNodeFilterProp="title"
                />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='业务所属支行'>
                <j-tree-select placeholder="请选择所属支行"
                               v-model="queryParam.ywsszh"
                               treeNodeFilterProp="title"
                               pid-field="sjzzbz"
                               dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                               :showSearch="true"
                               getAllZzjg="1"
                               :treeDefaultExpandAll="true" />
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
              <a-form-item label='联系方式'>
                <a-input placeholder='请输入联系方式' v-model='queryParam.lxfs'></a-input>
              </a-form-item>
            </a-col>

            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='客户类型'>
                <j-dict-select-tag placeholder='请选择客户类型' v-model='queryParam.khlx'
                                   dict-code='khlx1'></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='客户类型2'>
                <j-dict-select-tag placeholder='请选择客户类型2' v-model='queryParam.khlx2'
                                   dict-code='yx_khlx2'></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='客户等级'>
                <j-dict-select-tag placeholder='请选择客户等级' v-model='queryParam.khdj'
                                   dict-code='khdj_yx'></j-dict-select-tag>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'zzrwsjb:add'">新增</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('自主任务数据表')" v-has="'zzrwsjb:export'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'zzrwsjb:import'">导入</a-button>
      <a-button icon="import" @click="delBatchBySxtj" v-has="'zzrwsjb:delbatch'">按筛选条件批量删除</a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel' v-has="'zzrwsjb:del'">
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
          <a @click='handleEdit(record)' v-has="'zzrwsjb:edit'">编辑</a>

          <a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
                  <a v-has="'zzrwsjb:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <taskZzrwsjb-modal ref='modalForm' @ok='modalFormOk'></taskZzrwsjb-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import TaskZzrwsjbModal from './modules/TaskZzrwsjbModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import { deleteAction, getAction } from '@api/manage'
import JTreeSelect from '@/components/jeecg/JTreeSelect'

export default {
  name: 'TaskZzrwsjbList',
  mixins: [JeecgListMixin],
  components: {
    TaskZzrwsjbModal,ExcelImport,JTreeSelect
  },
  data() {
    return {
      sswgTreeDateoptions: [],
      replaceFields:
        { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
      description: '自主任务数据表管理页面',
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
          title: '任务名称',
          align: 'center',
          dataIndex: 'rwmc'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '所属网格',
          align: 'center',
          dataIndex: 'sswg_dictText'
        },
        {
          title: '业务所属支行',
          align: 'center',
          dataIndex: 'ywsszh_dictText'
        },
        {
          title: '户号编码',
          align: 'center',
          dataIndex: 'hhbm'
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
          title: '联系方式',
          align: 'center',
          dataIndex: 'lxfs'
        },
        {
          title: '客户类型',
          align: 'center',
          dataIndex: 'khlx_dictText'
        },
        {
          title: '客户类型2',
          align: 'center',
          dataIndex: 'khlx2_dictText'
        },
        {
          title: '客户等级',
          align: 'center',
          dataIndex: 'khdj_dictText'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/zzrw/taskZzrwsjb/list',
        delete: '/zzrw/taskZzrwsjb/delete',
        deleteBatch: '/zzrw/taskZzrwsjb/deleteBatch',
        exportXlsUrl: 'zzrw/taskZzrwsjb/exportXls',
        importExcelUrl: 'zzrw/taskZzrwsjb/importExcel',
        importTemplateXls:'zzrw/taskZzrwsjb/importTemplateXls',
        deleteBatchOther:'/zzrw/taskZzrwsjb/deleteBatchOther'
      },
      exportTemplateName:'自主任务数据表',
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl').then(res => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      }
    })
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
      let params=this.queryParam
      deleteAction(this.url.deleteBatchOther,params).then(res=>{
        if (res.success){
          this.$message.success("批量删除成功！")
        }
      })
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>