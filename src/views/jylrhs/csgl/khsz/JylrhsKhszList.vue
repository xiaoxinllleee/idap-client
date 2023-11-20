<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='业务机构'>
<!--              <j-tree-select placeholder='请选择业务机构' v-model='queryParam.jgdm'-->
<!--                             dict='HR_BAS_ORGANIZATION,zzjc,ywjgdm' pidField='sjzzbz' treeNodeFilterProp='title'-->
<!--                             show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true' :isAll='false' />-->
              <j-tree-select placeholder="请选择业务机构"
                             v-model="queryParam.jgdm"
                             pid-field="sjywjgdm_b"
                             treeNodeFilterProp="title"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             dict="v_hr_bas_organization,zzjc,ywjgdm"
                             :showSearch="true"
                             :tree-default-expand-all="true" />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='指标'>
<!--              <a-input placeholder='请输入指标ID' v-model='queryParam.zbid'></a-input>-->
<!--              <j-dict-select-tag placeholder='请选择' v-model='queryParam.zbid' dict-code='jylrhs:jylrhs_zbk,zbid||zbmc,zbid,kg=1 order by zbid'></j-dict-select-tag>-->
              <a-input hidden placeholder='指标ID' v-model='queryParam.zbid'></a-input>
              <a-input-search placeholder="请选择指标" v-model="zbmc" readOnly @search="onSearchLookup">
                <a-button slot="enterButton">查找带回</a-button>
              </a-input-search>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='考核周期'>
              <j-dict-select-tag placeholder='请选择' v-model='queryParam.khzq' dict-code="rqwd"></j-dict-select-tag>
            </a-form-item>
          </a-col>
<!--          <template v-if='toggleSearchStatus'>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='记账类型'>-->
<!--                <a-input placeholder='请输入记账类型' v-model='queryParam.jzlx'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='计提比率'>-->
<!--                <a-input placeholder='请输入计提比率' v-model='queryParam.jtbl'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='参考利率'>-->
<!--                <a-input placeholder='请输入参考利率' v-model='queryParam.ckll'></a-input>-->
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
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'JylrhsKhsz:add'">新增</a-button>
      <a-button type='primary' icon='download' :loading='exportLoading'
                @click="handleExportXls('经营利润核算（考核设置）')" v-has="'JylrhsKhsz:export'">导出
      </a-button>
      <a-button icon="import" @click="excelImport" v-has="'JylrhsKhsz:import'">导入</a-button>
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
          <a @click='handleEdit(record)' v-has="'JylrhsKhsz:edit'">编辑</a>
          <a-divider type='vertical'  v-has="'JylrhsKhsz:delete'"/>
          <a-dropdown v-has="'JylrhsKhsz:delete'">
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
    <jylrhsKhsz-modal ref='modalForm' @ok='modalFormOk'></jylrhsKhsz-modal>
    <select-zb-modal ref='selectZbModal' @selectFinished="selectOK"/>
    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
import JylrhsKhszModal from './modules/JylrhsKhszModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import ExcelImport from '@comp/common/ExcelImport.vue'
import moment from 'moment'
import { deleteAction, downFile } from '@api/manage'
import JDictSelectTag from '@comp/dict/JDictSelectTag.vue'
import SelectZbModal from '@views/jylrhs/csgl/zbk/modules/SelectZbModal.vue'

export default {
  name: 'JylrhsKhszList',
  mixins: [JeecgListMixin],
  components: {
    JDictSelectTag,
    ExcelImport,
    JTreeSelect,
    JylrhsKhszModal,
    SelectZbModal
  },
  data() {
    return {
      description: '经营利润核算（考核设置）',
      rowKey: 'jgdm,zbid,khzq',
      zbmc: undefined,
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
          title: '业务机构',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '指标ID',
          align: 'center',
          dataIndex: 'zbid'
        },
        {
          title: '指标名称',
          align: 'center',
          dataIndex: 'zbid_dictText'
        },
        {
          title: '考核周期',
          align: 'center',
          dataIndex: 'khzq_dictText'
        },
        // {
        //   title: '记账类型',
        //   align: 'center',
        //   dataIndex: 'jzlx'
        // },
        {
          title: '计提比率',
          align: 'center',
          dataIndex: 'jtbl'
        },
        {
          title: '参考利率',
          align: 'center',
          dataIndex: 'ckll'
        },
        {
          title: '调剂系数',
          align: 'center',
          dataIndex: 'tjxs'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/jylrhs/csgl/khsz/list',
        delete: '/jylrhs/csgl/khsz/delete',
        deleteBatch: '/jylrhs/csgl/khsz/deleteBatch',
        exportXlsUrl: 'jylrhs/csgl/khsz/exportXls',
        importExcelUrl: 'jylrhs/csgl/khsz/importExcel',
        exportTemplateUrl: 'jylrhs/csgl/khsz/exportTemplateXls',
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
      this.exportTemplateName = '经营利润核算（考核设置）导入模板' + '_' + moment(new Date()).format('YYYYMMDDHHmmss')
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
      let params = {
        'jgdm': record.jgdm,
        'zbid': record.zbid,
        'khzq': record.khzq
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

    searchReset () {
      this.zbmc = undefined
      this.queryParam = {}
      this.beforeSearchQuery()
      this.loadData(1)
    },
    onSearchLookup: function() {
      this.$refs.selectZbModal.add()
    },

    selectOK: function (data) {
      console.info('selectOK 已选择：',data[0])
      this.zbmc = data[0].zbmc
      this.queryParam.zbid = data[0].zbid
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>