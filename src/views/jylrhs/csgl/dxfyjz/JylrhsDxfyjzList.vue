<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

<!--          <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--            <a-form-item label='记账ID'>-->
<!--              <a-input placeholder='请输入记账ID' v-model='queryParam.jzid'></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='业务机构'>
<!--              <a-input placeholder='请输入业务机构' v-model='queryParam.jgdm'></a-input>-->
              <j-tree-select placeholder="请选择业务机构"
                             pid-field="sjywjgdm_b"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization,zzjc,ywjgdm"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='记账日期'>
              <a-date-picker placeholder='请选择记账日期' v-model='queryParam.jzrq' style='width: 100%'></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='列账子目'>
              <j-dict-select-tag placeholder='请选择' v-model='queryParam.lzzm'
                                 dict-code="jylrhs:jylrhs_kmsz,subject_name2,subject_no2,subject_no1='6601' order by subject_no2">
              </j-dict-select-tag>
            </a-form-item>
          </a-col>
<!--          <template v-if='toggleSearchStatus'>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='摘要'>-->
<!--                <a-input placeholder='请输入摘要' v-model='queryParam.zy'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='金额'>-->
<!--                <a-input placeholder='请输入金额' v-model='queryParam.je'></a-input>-->
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
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'JylrhsDxfyjz:add'">新增</a-button>
      <a-button type='primary' icon='download' :loading='exportLoading'
                @click="handleExportXls('经营利润核算（单项费用记账）')" v-has="'JylrhsDxfyjz:export'">导出
      </a-button>
      <a-button icon="import" @click="excelImport" v-has="'JylrhsDxfyjz:import'">导入</a-button>
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

        <span slot="zy" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)' v-has="'JylrhsDxfyjz:edit'">编辑</a>

          <a-divider type='vertical' v-has="'JylrhsDxfyjz:delete'"/>
          <a-dropdown v-has="'JylrhsDxfyjz:delete'">
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.jzid)'>
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
    <jylrhsDxfyjz-modal ref='modalForm' @ok='modalFormOk'></jylrhsDxfyjz-modal>

    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
import JylrhsDxfyjzModal from './modules/JylrhsDxfyjzModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import JEllipsis from '@comp/jeecg/JEllipsis.vue'
import ExcelImport from '@comp/common/ExcelImport.vue'
import moment from 'moment'
import { downFile } from '@api/manage'
import { filterObj } from '@/utils/util'

export default {
  name: 'JylrhsDxfyjzList',
  mixins: [JeecgListMixin],
  components: {
    ExcelImport,
    JEllipsis,
    JTreeSelect,
    JylrhsDxfyjzModal
  },
  data() {
    return {
      description: '经营利润核算（单项费用记账）管理页面',
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
        //   title: '记账ID',
        //   align: 'center',
        //   dataIndex: 'jzid'
        // },
        {
          title: '业务机构',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '记账日期',
          align: 'center',
          dataIndex: 'jzrq'
        },
        {
          title: '摘要',
          align: 'center',
          dataIndex: 'zy'
        },
        {
          title: '金额(元)',
          align: 'center',
          dataIndex: 'je',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '列账子目编号',
          align: 'center',
          dataIndex: 'lzzm'
        },
        {
          title: '列账子目',
          align: 'center',
          dataIndex: 'lzzm_dictText'
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
        list: '/jylrhs/csgl/dxfyjz/list',
        delete: '/jylrhs/csgl/dxfyjz/delete',
        deleteBatch: '/jylrhs/csgl/dxfyjz/deleteBatch',
        exportXlsUrl: 'jylrhs/csgl/dxfyjz/exportXls',
        importExcelUrl: 'jylrhs/csgl/dxfyjz/importExcel',
        exportTemplateUrl: 'jylrhs/csgl/dxfyjz/exportTemplateXls',
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {

    getQueryParams () {
      //获取查询条件
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      console.log('param',param)
      if (param.jzrq) {
        param.jzrq = moment(param.jzrq).format("YYYY-MM-DD")
      }
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },

    excelImport() {
      let params = {}
      params.exportTemplateUrl = this.url.exportTemplateUrl
      params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      this.exportTemplateName = '经营利润核算（单项费用记账）导入模板' + '_' + moment(new Date()).format('YYYYMMDDHHmmss')
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