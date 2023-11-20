<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :md='6' :sm='8'>
            <a-form-item label='参数编码'>
              <a-input placeholder='请输入参数编码' v-model='queryParam.csbm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :md='6' :sm='8'>
            <a-form-item label='参数名称'>
              <a-input placeholder='请输入参数名称' v-model='queryParam.csmc'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='8'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button @click='handleAdd' type='primary' icon='plus'>新增</a-button>
      <a-button icon='download' @click="handleExportXls('参数设置')">导出</a-button>
      <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
         <a-button icon="import">导入</a-button>
       </a-upload>-->
      <a-button icon='import' @click='excelImport'>导入</a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel'>
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
        rowKey='id'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'
        @change='handleTableChange'>

        <span slot='action' slot-scope='text,record'>
          <a @click='handleEdit(record)'>编辑</a>

          <a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete1(record)'>
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref='excelImportModal' @ok='importComplete' />
    <!-- 表单区域 -->
    <tbTjfxCssz-modal ref='modalForm' @ok='modalFormOk'></tbTjfxCssz-modal>
  </a-card>
</template>

<script>
import TbTjfxCsszModal from './modules/TbTjfxCsszModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { httpAction, deleteAction, putAction } from '@/api/manage'
import ExcelImport from '@/components/common/ExcelImport'


export default {
  name: 'TbTjfxCsszList',
  mixins: [JeecgListMixin],
  components: {
    TbTjfxCsszModal, ExcelImport
  },
  data() {
    return {
      description: '参数设置管理页面',
      // 表头
      columns: [
        {
          title: '参数编码',
          align: 'center',
          dataIndex: 'csbm'
        },
        {
          title: '参数名称',
          align: 'center',
          dataIndex: 'csmc'
        },
        {
          title: '参数值',
          align: 'center',
          dataIndex: 'csz',
          width: 200,
          ellipsis: true
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        },
        {
          title: '录入标识',
          align: 'center',
          dataIndex: 'lrbz_dictText'
        },
        {
          title: '录入时间',
          align: 'center',
          dataIndex: 'lrsj'
        },
        {
          title: '录入人',
          align: 'center',
          dataIndex: 'lrr'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/tjfx.jcsjgl.cssz/tjfxCssz/list',
        delete: '/tjfx.jcsjgl.cssz/tjfxCssz/delete',
        deleteBatch: '/tjfx.jcsjgl.cssz/tjfxCssz/deleteBatch',
        exportXlsUrl: 'tjfx.jcsjgl.cssz/tjfxCssz/exportXls',
        importExcelUrl: 'tjfx.jcsjgl.cssz/tjfxCssz/importExcel',
        exportTemplateUrl: '/tjfx.jcsjgl.cssz/tjfxCssz/exportTemplateXls'
      },
      exportTemplateName: '参数设置导入模板'
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    handleDelete1: function(record) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      putAction(that.url.delete, { csbm: record.csbm }, 'put').then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    }

  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>