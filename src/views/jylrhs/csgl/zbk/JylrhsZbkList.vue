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
              <j-input placeholder='模糊查询' v-model='queryParam.zbmc'></j-input>
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
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
              <a-form-item label='启用/停用'>
                <j-dict-select-tag placeholder='请选择' v-model='queryParam.kg' dict-code='sfqy'></j-dict-select-tag>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
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
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'JylrhsZbk:add'">新增</a-button>
      <a-button type='primary' icon='download' :loading='exportLoading' v-has="'JylrhsZbk:export'"
                @click="handleExportXls('经营利润核算（指标库）')">导出
      </a-button>
      <a-button icon="import" @click="excelImport" v-has="'JylrhsZbk:import'">导入</a-button>
<!--      <a-upload name='file' :showUploadList='false' :multiple='false' :headers='tokenHeader' :action='importExcelUrl'-->
<!--                @change='handleImportExcel'>-->
<!--        <a-button type='primary' icon='import'>导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if='selectedRowKeys.length > 0'>-->
<!--        <a-menu slot='overlay' v-has="'JylrhsZbk:batchDel'">-->
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
<!--        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'-->

        <span slot="kg" slot-scope="kg,record">
          <a-tag :key="kg" :color="kg==='启用'?'#57DB92':kg==='停用'?'#FB325F':'white'">
            <a-popconfirm title='确定启用/停用吗?' @confirm='() => handleEnable(record)'>
              <a>{{ kg }}</a>
            </a-popconfirm>
          </a-tag>
        </span>-->

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)' v-has="'JylrhsZbk:edit'">编辑</a>

          <a-divider type='vertical' v-has="'JylrhsZbk:delete'"/>
          <a-dropdown v-has="'JylrhsZbk:delete'">
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
    <jylrhsZbk-modal ref='modalForm' @ok='modalFormOk'></jylrhsZbk-modal>

    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
import JylrhsZbkModal from './modules/JylrhsZbkModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@comp/jeecg/JInput.vue'
import { downFile, httpAction } from '@api/manage'
import ExcelImport from '@comp/common/ExcelImport.vue'
import notification from 'ant-design-vue/lib/notification'
import moment from 'moment/moment'

export default {
  name: 'JylrhsZbkList',
  mixins: [JeecgListMixin],
  components: {
    ExcelImport,
    JInput,
    JylrhsZbkModal
  },
  data() {
    return {
      description: '经营利润核算（指标库）管理页面',
      rowKey: 'zbid',
      loading: false,
      isorter: {
        order: 'desc',
      },
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
        // {
        //   title: '函数',
        //   align: 'center',
        //   dataIndex: 'fun'
        // },
        {
          title: '说明',
          align: 'center',
          dataIndex: 'remark'
        },
        {
          title: '数据来源',
          align: 'center',
          dataIndex: 'sjly_dictText',
        },
        {
          title: '开关（点击操作）',
          align: 'center',
          dataIndex: 'kg_dictText',
          scopedSlots: { customRender: 'kg' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/jylrhs/csgl/zbk/list',
        delete: '/jylrhs/csgl/zbk/delete',
        //deleteBatch: '/jylrhs/csgl/zbk/deleteBatch',
        exportXlsUrl: 'jylrhs/csgl/zbk/exportXls',
        importExcelUrl: 'jylrhs/csgl/zbk/importExcel',
        exportTemplateUrl: 'jylrhs/csgl/zbk/exportTemplateXls',
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    handleEnable: function(record) {
      console.log('启停',record)
      this.loading = true
      httpAction('/jylrhs/csgl/zbk/editEnable', record, 'put').then((res) => {
        if (res.success) {
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
      }).catch((error)=>{
        this.$message.error('操作失败！')
        console.log('（启停）操作失败！',error)
      }).finally(()=>{
        this.loadData()
      })
    },
    excelImport() {
      let params = {}
      params.exportTemplateUrl = this.url.exportTemplateUrl
      params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      this.exportTemplateName = '经营利润核算（指标库）导入模板' + '_' + moment(new Date()).format('YYYYMMDDHHmmss')
      params.exportTemplateName = this.exportTemplateName
      var param = Object.assign({}, this.queryParam, params);
      this.$refs.excelImportModal.showModal(param);
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