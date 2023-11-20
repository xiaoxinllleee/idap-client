<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='记账分类'>
              <j-dict-select-tag placeholder='请选择' v-model='queryParam.szfl' dict-code='zbdl'></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='统计分类'>
              <j-dict-select-tag placeholder='请输入统计分类' v-model='queryParam.tjfl' dict-code='zbxl'></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='一级科目号'>
              <a-input placeholder='请输入一级科目号' v-model='queryParam.subjectNo1'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='一级科目名'>
              <j-input placeholder='请输入一级科目名' v-model='queryParam.subjectName1'></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='二级科目号'>
              <a-input placeholder='请输入二级科目号' v-model='queryParam.subjectNo2'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='二级科目名'>
              <j-input placeholder='请输入二级科目名' v-model='queryParam.subjectName2'></j-input>
            </a-form-item>
          </a-col>
<!--          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
      <a-button type='primary' @click='searchReset' icon='reload' >重置</a-button>
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'JylrhsKmsz:add'">新增</a-button>
      <a-button type='primary' icon='download' :loading='exportLoading'
                @click="handleExportXls('经营利润核算（科目设置）')" v-has="'JylrhsKmsz:export'">导出
      </a-button>
      <a-button icon="import" @click="excelImport" v-has="'JylrhsKmsz:import'">导入</a-button>
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
<!--        style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项-->
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
          <a @click='handleEdit(record)' v-has="'JylrhsKmsz:edit'">编辑</a>
          <a-divider type='vertical' v-has="'JylrhsKmsz:delete'"/>
          <a-dropdown v-has="'JylrhsKmsz:delete'">
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record)'>
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
    <jylrhsKmsz-modal ref='modalForm' @ok='modalFormOk'></jylrhsKmsz-modal>

    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
import JylrhsKmszModal from './modules/JylrhsKmszModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@comp/jeecg/JInput.vue'
import { deleteAction, downFile } from '@api/manage'
import moment from 'moment/moment'
import ExcelImport from '@comp/common/ExcelImport.vue'

export default {
  name: 'JylrhsKmszList',
  mixins: [JeecgListMixin],
  components: {
    ExcelImport,
    JInput,
    JylrhsKmszModal
  },
  data() {
    return {
      description: '经营利润核算（科目设置）',
      rowKey: 'subject_no1,subject_no2',
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
          title: '一级科目号',
          align: 'center',
          dataIndex: 'subjectNo1'
        },
        {
          title: '一级科目名',
          align: 'center',
          dataIndex: 'subjectName1'
        },
        {
          title: '二级科目号',
          align: 'center',
          dataIndex: 'subjectNo2'
        },
        {
          title: '二级科目名',
          align: 'center',
          dataIndex: 'subjectName2'
        },
        {
          title: '收支分类',
          align: 'center',
          dataIndex: 'szfl_dictText'
        },
        {
          title: '统计分类',
          align: 'center',
          dataIndex: 'tjfl_dictText'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'remark'
        },
        {
          title: '录入人',
          align: 'center',
          dataIndex: 'operator'
        },
        {
          title: '操作类型',
          align: 'center',
          dataIndex: 'oprationType_dictText'
        },
        {
          title: '录入/修改时间',
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
        list: '/jylrhs/csgl/kmsz/list',
        delete: '/jylrhs/csgl/kmsz/delete',
        deleteBatch: '/jylrhs/csgl/kmsz/deleteBatch',
        exportXlsUrl: 'jylrhs/csgl/kmsz/exportXls',
        importExcelUrl: 'jylrhs/csgl/kmsz/importExcel',
        exportTemplateUrl: 'jylrhs/csgl/kmsz/exportTemplateXls',
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    excelImport() {
      let params = {}
      params.exportTemplateUrl = this.url.exportTemplateUrl
      params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      this.exportTemplateName = '经营利润核算（科目设置）导入模板' + '_' + moment(new Date()).format('YYYYMMDDHHmmss')
      params.exportTemplateName = this.exportTemplateName
      var param = Object.assign({}, this.queryParam, params);
      this.$refs.excelImportModal.showModal(param);
    },
    handleDelete: function (record) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      console.log('record',record)
      let params = {
        'szfl': record.szfl,
        'tjfl': record.tjfl,
        'subjectNo1': record.subjectNo1,
        'subjectNo2': record.subjectNo2
      }
      deleteAction(that.url.delete, params).then((res) => {
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