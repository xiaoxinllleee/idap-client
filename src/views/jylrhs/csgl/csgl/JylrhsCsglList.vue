<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='参数编号'>
              <a-input placeholder='请输入参数编号' v-model='queryParam.paramNo'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='参数名称'>
              <a-input placeholder='请输入参数名称' v-model='queryParam.paramName'></a-input>
            </a-form-item>
          </a-col>
<!--          <template v-if='toggleSearchStatus'>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='数值1'>-->
<!--                <a-input placeholder='请输入数值1' v-model='queryParam.paramValue1'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='数值2'>-->
<!--                <a-input placeholder='请输入数值2' v-model='queryParam.paramValue2'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='文本参数'>-->
<!--                <a-input placeholder='请输入文本参数' v-model='queryParam.textParam'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--          </template>-->
<!--          <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>-->
<!--              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>-->
<!--              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>-->
<!--              <a @click='handleToggleSearch' style='margin-left: 8px'>-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />-->
<!--              </a>-->
<!--            </span>-->
<!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'JylrhsCsgl:add'">新增</a-button>
      <a-button type='primary' icon='download' :loading='exportLoading'
                @click="handleExportXls('经营利润核算（参数管理）')" v-has="'JylrhsCsgl:export'">导出
      </a-button>
      <a-button type='primary' @click='searchQuery' icon='search' style='margin-left: 8px'>查询</a-button>
      <a-button type='primary' @click='searchReset' icon='reload'>重置</a-button>
<!--      <a-upload name='file' :showUploadList='false' :multiple='false' :headers='tokenHeader' :action='importExcelUrl'-->
<!--                @change='handleImportExcel'>-->
<!--        <a-button type='primary' icon='import'>导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if='selectedRowKeys.length > 0'>-->
<!--        <a-menu slot='overlay'>-->
<!--          <a-menu-item key='1' @click='batchDel'>-->
<!--            <a-icon type='delete' />-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style='margin-left: 8px'> 批量操作-->
<!--          <a-icon type='down' />-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>-->
<!--        <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a-->
<!--        style='font-weight: 600'>{{ selectedRowKeys.length }}</a> 项-->
<!--        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>-->
<!--      </div>-->

      <a-table
        ref='table'
        size='small'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        @change='handleTableChange'>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)' v-has="'JylrhsCsgl:edit'">编辑</a>
          <a-divider type='vertical' v-has="'JylrhsCsgl:delete'"/>
          <a-dropdown v-has="'JylrhsCsgl:delete'">
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.paramNo)'>
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
    <jylrhsCsgl-modal ref='modalForm' @ok='modalFormOk'></jylrhsCsgl-modal>
  </a-card>
</template>

<script>
import JylrhsCsglModal from './modules/JylrhsCsglModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { deleteAction, downFile } from '@api/manage'
import moment from 'moment/moment'

export default {
  name: 'JylrhsCsglList',
  mixins: [JeecgListMixin],
  components: {
    JylrhsCsglModal
  },
  data() {
    return {
      description: '经营利润核算（参数管理）管理页面',
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
          title: '参数编号',
          align: 'center',
          dataIndex: 'paramNo'
        },
        {
          title: '参数名称',
          align: 'center',
          dataIndex: 'paramName'
        },
        {
          title: '数值1',
          align: 'center',
          dataIndex: 'paramValue1'
        },
        {
          title: '数值2',
          align: 'center',
          dataIndex: 'paramValue2'
        },
        {
          title: '文本参数',
          align: 'center',
          dataIndex: 'textParam'
        },
        {
          title: '操作类型',
          align: 'center',
          dataIndex: 'oprationType_dictText'
        },
        {
          title: '操作员',
          align: 'center',
          dataIndex: 'operator'
        },
        {
          title: '操作时间',
          align: 'center',
          dataIndex: 'oprationTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/jylrhs/csgl/csgl/list',
        delete: '/jylrhs/csgl/csgl/delete',
        deleteBatch: '/jylrhs/csgl/csgl/deleteBatch',
        exportXlsUrl: 'jylrhs/csgl/csgl/exportXls',
        importExcelUrl: 'jylrhs/csgl/csgl/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    handleDelete: function (paramNo) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      deleteAction(that.url.delete, { 'paramNo': paramNo }).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    handleExportXls (fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      fileName = fileName + '导出_' + moment(new Date()).format('YYYYMMDDHHmmss')
      let param = this.getQueryParams();
      if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
        param['selections'] = this.selectedRowKeys.join(",")
        param['rowKey'] = this.rowKey
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      downFile(this.url.exportXlsUrl, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        var blob = new Blob([data])
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
          return
        }
        var eleLink = document.createElement('a')
        eleLink.download = fileName + '.xls'
        eleLink.style.display = 'none'
        eleLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
        this.exportLoading = false
      })
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>