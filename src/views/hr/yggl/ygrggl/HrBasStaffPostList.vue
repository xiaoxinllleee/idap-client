<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form @keyup.enter.native='searchQuery' :label-col='labelCol' :wrapper-col='wrapperCol'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='月份'>
              <!--              <j-date v-model="queryParam.yf" date-format='yyyy-MM' allow-clear></j-date>-->
              <a-month-picker placeholder='请选择月份' v-model='queryParam.yf'
                              :defaultValue='defaultMonthOpera' style='width: 100%;' />
            </a-form-item>
          </a-col>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='组织标志'>
              <j-tree-select placeholder='请选择所属支行' v-model='queryParam.zzbz'
                             dict='HR_BAS_ORGANIZATION,ZZJC,ZZBZ' pidField='sjzzbz' treeNodeFilterProp='title'
                             show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true'
                             :isAll='false' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='岗位标识'>
              <j-dict-select-tag v-model='queryParam.gwbz' placeholder='请选择岗位标识'
                                 dictCode='hr_bas_post,gwmc,gwbz' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='员工工号'>
              <a-input placeholder='请输入员工工号' v-model='queryParam.yggh'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='员工姓名'>
              <a-input placeholder='请输入员工姓名' v-model='queryParam.ygxm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='客户经理标识'>
              <a-input placeholder='请输入客户经理标识' v-model='queryParam.khjlbz'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='柜员号'>
              <a-input placeholder='请输入柜员号' v-model='queryParam.gyh'></a-input>
            </a-form-item>
          </a-col>

          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='入岗类型'>
                <j-dict-select-tag v-model='queryParam.rglx' placeholder='请选择入岗类型' dictCode='rglx' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='是否参与考核'>
                <j-dict-select-tag v-model='queryParam.sfcykh' placeholder='请选择是否参与考核' dictCode='sfbz' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='是否临退休'>
                <j-dict-select-tag v-model='queryParam.sfltx' placeholder='请选择是否临退休' dictCode='sfbz' />
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='入岗日期'>
                <j-date v-model='queryParam.rgrq' style='width: 100%;'></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='离岗日期'>
                <j-date v-model='queryParam.lgrq' style='width: 100%;'></j-date>
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
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'yggwgl:add'">入岗</a-button>
      <a-button icon='download' @click="handleExportXls('员工入岗管理')" v-has="'yggwgl:export'">导出</a-button>
      <a-button icon='import' @click='excelImport' v-has="'yggwgl:import'">导入</a-button>
      <a-button icon='import' @click='excelImportIfo' v-has="'yggwgl:import'">导入调动人员信息</a-button>
      <a-button icon='download' @click="handleExportXlsInfo('员工调动信息')" v-has="'yggwgl:export'">导出调动人员信息
      </a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel' v-has="'yggwgl:delete'">
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
        <span slot='detail' slot-scope='ygxm, record'>
          <a @click='handleView(record)'>{{ ygxm }}</a>
        </span>
        <span slot='sfcykhTag' slot-scope='text, record'>
          <a-tag v-if="record.sfcykh=='1'" color='blue'>
            {{ record.sfcykh_dictText }}
          </a-tag>
          <a-tag v-else-if="record.sfcykh=='2'" color='pink'>
            {{ record.sfcykh_dictText }}
          </a-tag>
        </span>
        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)' v-has="'yggwgl:edit'">编辑</a>
          <a-divider type='vertical' />
          <a @click='handleEditDG(record)' v-show='record.lgrq == null' v-has="'yggwgl:edit'">调岗</a>
          <a-divider type='vertical' v-show='record.lgrq == null' />
          <a @click='handleEditLG(record)' v-show='record.lgrq == null' v-has="'yggwgl:edit'">离岗</a>
          <a-divider type='vertical' v-show='record.lgrq == null' />
          <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
            <a v-has="'yggwgl:delete'">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hrBasStaffPost-modal ref='modalForm' @ok='modalFormOk'></hrBasStaffPost-modal>
    <hr-bas-staff-post-modal-d-g ref='modalFormDG' @ok='modalFormOk'></hr-bas-staff-post-modal-d-g>
    <hr-bas-staff-post-modal-l-g ref='modalFormLG' @ok='modalFormOk'></hr-bas-staff-post-modal-l-g>
    <excel-import2 ref='excelImportModal' @ok='importComplete'></excel-import2>
  </a-card>
</template>

<script>
import HrBasStaffPostModal from './modules/HrBasStaffPostModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JDate from '@/components/jeecg/JDate'
import HrBasStaffPostModalDG from '@views/hr/yggl/ygrggl/modules/HrBasStaffPostModalDG'
import HrBasStaffPostModalLG from '@views/hr/yggl/ygrggl/modules/HrBasStaffPostModalLG'
import ExcelImport2 from './modules/ExcelImport2'
import moment from 'moment'
import { downFile, getAction } from '../../../../api/manage'
import { filterObj } from '@/utils/util'

export default {
  name: 'HrBasStaffPostList',
  mixins: [JeecgListMixin],
  components: {
    HrBasStaffPostModal, JTreeSelect, JDate, HrBasStaffPostModalDG, HrBasStaffPostModalLG, ExcelImport2
  },
  data() {
    return {
      moment,
      description: '员工入岗管理管理页面',
      exportTemplateName: '员工入岗导入模板',
      // 默认当前月份
      defaultMonthOpera: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      // 表头
      columns: [
        /*{
          title: '#',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
         },*/
        {
          title: '组织标识',
          align: 'center',
          dataIndex: 'zzbz'
        }, {
          title: '组织名称',
          align: 'center',
          dataIndex: 'zzbz_dictText'
        },
        {
          title: '员工工号',
          align: 'center',
          dataIndex: 'yggh'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'yggh_dictText',
          scopedSlots: { customRender: 'detail' }
        },
        {
          title: '岗位标识',
          align: 'center',
          dataIndex: 'gwbz'
        },
        {
          title: '岗位名称',
          align: 'center',
          dataIndex: 'gwbz_dictText'
        },

        {
          title: '柜员号',
          align: 'center',
          dataIndex: 'gyh'
        },
        {
          title: '客户经理标识',
          align: 'center',
          dataIndex: 'khjlbz'
        },
        {
          title: '入岗类型',
          align: 'center',
          dataIndex: 'rglx_dictText'
        },
        {
          title: '入岗日期',
          align: 'center',
          dataIndex: 'rgrq'
        },
        {
          title: '离岗日期',
          align: 'center',
          dataIndex: 'lgrq'
        },
        {
          title: '是否参与考核',
          align: 'center',
          dataIndex: 'sfcykh_dictText',
          scopedSlots: { customRender: 'sfcykhTag' }
        },
        {
          title: '是否临退休',
          align: 'center',
          dataIndex: 'sfltx_dictText'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/ygrggl/hrBasStaffPost/list',
        delete: '/ygrggl/hrBasStaffPost/delete',
        deleteBatch: '/ygrggl/hrBasStaffPost/deleteBatch',
        exportXlsUrl: 'ygrggl/hrBasStaffPost/exportXls',
        importExcelUrl: 'ygrggl/hrBasStaffPost/importExcel',
        exportTemplateUrl: 'ygrggl/hrBasStaffPost/exportTemplateXls',
        importExcelUrl1: 'ygrggl/hrBasStaffPost/importExcel2'
      },
      exportTemplateName1: '员工调动信息导入模板'
    }
  },

  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.defaultMonthOpera = moment(new Date(), "yyyy-MM");
    this.queryParam = {yf: undefined};
    this.queryParam.yf=this.defaultMonthOpera;
  },
  methods: {
    // getQueryParams(){
    //   let tjyfMoment = "";
    //   if(this.queryParam.yf) {
    //     tjyfMoment = moment(this.queryParam.yf).format("YYYY-MM");
    //   }
    //   var param      = Object.assign({}, this.queryParam,this.isorter);
    //   param.field    = this.getQueryField();
    //   param.pageNo   = this.ipagination.current;
    //   param.pageSize = this.ipagination.pageSize;
    //   if (param.yf) {
    //     param.yf = tjyfMoment;
    //   }
    //   return filterObj(param);
    // },
    handleEditDG: function(record) {
      this.$refs.modalFormDG.edit(record)
      this.$refs.modalFormDG.title = '调岗'
      this.$refs.modalFormDG.disableSubmit = false
    },
    handleEditLG: function(record) {
      this.$refs.modalFormLG.edit(record)
      this.$refs.modalFormLG.title = '离岗'
      this.$refs.modalFormLG.disableSubmit = false
    },
    excelImportIfo() {
      let params = {}
      params.exportTemplateUrl = 'ygrggl/hrBasStaffPost/exportTemplateXls2'
      params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl1}`
      params.exportTemplateName = this.exportTemplateName1
      var param = Object.assign({}, this.queryParam, params)
      this.$refs.excelImportModal.showModal(param)
    },
    handleExportXlsInfo(fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      let param = this.getQueryParams()
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
        param['rowKey'] = this.rowKey
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      downFile('/ygrggl/hrBasStaffPost/exportXls2', param).then((data) => {
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
    }
  }
}
</script>
<style scoped lang='scss'>
.ant-form-horizontal .ant-form-item {
  margin-bottom: 0px !important;
}

.table-page-search-wrapper .table-page-search-submitButtons {
  margin-top: 5px;
}
</style>