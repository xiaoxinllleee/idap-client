<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='任务年度'>
<!--              <a-input placeholder='请输入任务年度' v-model='queryParam.taskYear'></a-input>-->
              <a-select placeholder="请选择任务年度" v-model="rwnd" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属机构'>
<!--              <a-input placeholder='请选择' v-model='queryParam.branchNo'></a-input>-->
              <j-tree-select placeholder="请选择" v-model="queryParam.branchNo" dict="v_hr_bas_organization, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm_b" :showSearch="true" :treeDefaultExpandAll="true"
                             condition='{"sjywjgdm": "ywjgdm"}'></j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='任务编码'>
              <a-input placeholder='请输入任务编码' v-model='queryParam.taskCode'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='任务名称'>
              <j-input placeholder='请输入任务名称' v-model='queryParam.taskName'></j-input>
            </a-form-item>
          </a-col>
<!--          <template v-if='toggleSearchStatus'>-->
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
      <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
      <a-button type='primary' @click='searchReset' icon='reload'>重置</a-button>
<!--      <a-button @click='handleAdd' type='primary' icon='plus' style='margin-left: 8px'>新增</a-button>-->
      <a-button type='primary' icon='download' :loading='exportLoading' @click="handleExportXls('支行年度任务')">导出
      </a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
<!--      <a-upload name='file' :showUploadList='false' :multiple='false' :headers='tokenHeader' :action='importExcelUrl' @change='handleImportExcel'>-->
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
        <!--        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'-->

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)'>编辑</a>
<!--          <a-divider type='vertical' />-->
<!--          <a-dropdown>-->
<!--            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>-->
<!--            <a-menu slot='overlay'>-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zhrwszgl-modal ref='modalForm' @ok='modalFormOk'></zhrwszgl-modal>

    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
import ZhrwszglModal from './modules/ZhrwszglModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@comp/jeecg/JInput.vue'
import moment from 'moment'
import { filterObj } from '@/utils/util'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import ExcelImport from '@comp/common/ExcelImport.vue'
import { downFile } from '@api/manage'
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'ZhrwszglList',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelect,
    JInput,
    ZhrwszglModal,
    ExcelImport
  },
  data() {
    return {
      description: '支行年度任务设置管理',
      rwnd: '',
      years: [],
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
        // {
        //   title: '任务ID',
        //   align: 'center',
        //   dataIndex: 'taskId'
        // },
        {
          title: '任务年度',
          align: 'center',
          dataIndex: 'taskYear',
          customRender: function (text) {
            return !text ? "" : (text.length >= 4 ? text.substr(0, 4) : text)
          },
        },
        {
          title: '机构编码',
          align: 'center',
          dataIndex: 'branchNo'
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'branchName'
        },
        {
          title: '任务编码',
          align: 'center',
          dataIndex: 'taskCode'
        },
        {
          title: '任务名称',
          align: 'center',
          dataIndex: 'taskName'
        },
        {
          title: '任务值',
          align: 'center',
          dataIndex: 'taskValue'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'remarks'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/report/csgl/zhrwszgl/list',
        //delete: '/report/csgl/zhrwszgl/delete',
        //deleteBatch: '/report/csgl/zhrwszgl/deleteBatch',
        exportXlsUrl: 'report/csgl/zhrwszgl/exportXls',
        importExcelUrl: 'report/csgl/zhrwszgl/importExcel',
        exportTemplateUrl: 'report/csgl/zhrwszgl/exportTemplateXls',
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      var myDate = new Date
      var year = myDate.getFullYear()
      this.rwnd = year
      this.queryParam.taskYear = moment(this.rwnd+'0101').format("YYYY-MM-DD")
      console.info('queryParam.taskYear',this.queryParam.taskYear)
      this.initSelectYear(year)
    },
    /**
     * 初始化年份选择下拉框
     * @param year 当前年份
     */
    initSelectYear(year) {
      this.years = []
      for (let i = 0; i < 30; i++) {
        this.years.push({value: ((year - i) + ''), label: ((year - i) + '')})
      }
    },
    selectValue(value) {
      this.queryParam.taskYear = moment(value+'0101').format("YYYY-MM-DD")
      console.info('queryParam.taskYear',this.queryParam.taskYear)
      this.$emit('change', value)
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      let taskYear = ''
      if (this.rwnd) {
        taskYear = moment(this.rwnd+'0101').format("YYYYMMDD")
      }
      param.taskYear = taskYear
      return filterObj(param)
    },
    excelImport() {
      let params = {}
      if (this.queryParam.taskYear === undefined || this.queryParam.taskYear === 'Invalid date') {
        notification.error({ message: '系统提示', description:'请选择任务年度!',duration: 4})
        return
      } else {
        var taskYear = moment(this.queryParam.taskYear).format('YYYY') + '0101'
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?taskYear=${taskYear}`
        this.exportTemplateName = '支行' + moment(this.queryParam.taskYear).format('YYYY') + '年度任务_导入模板_'+moment(new Date()).format("YYYYMMDDHHmmss")
      }
      params.exportTemplateName = this.exportTemplateName
      var param = Object.assign({}, this.queryParam, params);
      this.$refs.excelImportModal.showModal(param);
    },
    handleExportXls (fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      fileName = fileName + '_' + moment(this.queryParam.taskYear).format("YYYY")
      //let param = {...this.queryParam};
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