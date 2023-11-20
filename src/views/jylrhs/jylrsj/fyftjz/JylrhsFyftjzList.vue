<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='记账日期'>
<!--              <a-month-picker placeholder='请选择会计日期' v-model='queryParam.fiscalDate' :format='monthFormat' style='width: 100%'></a-month-picker>-->
              <a-range-picker v-model="queryParam.fiscalDateRange" format="YYYY-MM-DD" :placeholder="['记账日期(起)', '记账日期(止)']"
                              @change="onFiscalDateChange" />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='业务机构'>
<!--              <j-tree-select placeholder='请选择业务机构' v-model='queryParam.jgdm'-->
<!--                             dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm' treeNodeFilterProp='title'-->
<!--                             show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true' :isAll='false' />-->
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
            <a-form-item label='记账分类'>
              <j-dict-select-tag placeholder='请选择' v-model='queryParam.jzfl' dict-code='zbdl'></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='一级科目号'>
              <a-input placeholder='一级科目号' v-model='queryParam.yjkmbh' ></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='一级科目名称'>
              <j-input placeholder='一级科目名称' v-model='queryParam.yjkmmc' ></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
<!--            <a-form-item label='记账科目'>-->
<!--              <a-input-search placeholder="记账科目" v-model="subjectName" readOnly @search="onSearchLookup">-->
<!--                <a-button slot="enterButton" :disabled="disabled">查找带回</a-button>-->
<!--              </a-input-search>-->
<!--            </a-form-item>-->
            <a-form-item label='记账科目号'>
              <j-input placeholder='记账科目号' v-model='queryParam.jzkm' ></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='记账科目名称'>
              <j-input placeholder='记账科目名称' v-model='queryParam.jzkmmc' ></j-input>
            </a-form-item>
          </a-col>
<!--          <template v-if='toggleSearchStatus'>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='金额'>-->
<!--                <a-input type='number' placeholder='请输入金额' v-model='queryParam.je' :min='0'></a-input>-->
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
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'JylrhsFyftjz:add'">新增</a-button>
      <a-button type='primary' icon='download' :loading='exportLoading'
                @click="handleExportXls('经营利润核算（费用分摊记账）')" v-has="'JylrhsFyftjz:export'">导出
      </a-button>
      <a-button icon="import" @click="excelImport" v-has="'JylrhsFyftjz:import'">导入</a-button>
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

        <span slot="remark" slot-scope="text">
          <j-ellipsis :value="text" :length="12" />
        </span>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEditRole(record)' v-has="'JylrhsFyftjz:edit'">编辑</a>
          <a-divider type='vertical' v-has="'JylrhsFyftjz:delete'"/>
          <a-dropdown v-has="'JylrhsFyftjz:delete'">
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
    <jylrhsFyftjz-modal ref='modalForm' @ok='modalFormOk'></jylrhsFyftjz-modal>

    <select-jzkm-modal ref="selectJzkmModal" @selectFinished="selectOK"/>

    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
import JylrhsFyftjzModal from './modules/JylrhsFyftjzModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import ExcelImport from '@comp/common/ExcelImport.vue'
import moment from 'moment/moment'
import { deleteAction, downFile, getAction } from '@api/manage'
import { mapGetters } from 'vuex'
import notification from 'ant-design-vue/lib/notification'
import { filterObj } from '@/utils/util'
import SelectJzkmModal from '@views/jylrhs/jylrsj/fyftjz/modules/SelectJzkmModal.vue'
import JEllipsis from '@comp/jeecg/JEllipsis.vue'
import JInput from '@comp/jeecg/JInput.vue'

export default {
  name: 'JylrhsFyftjzList',
  mixins: [JeecgListMixin],
  components: {
    JInput,
    JEllipsis,
    ExcelImport,
    JTreeSelect,
    JylrhsFyftjzModal,
    SelectJzkmModal,
  },
  data() {
    return {
      description: '经营利润核算（费用分摊记账）',
      rowKey: 'fiscalDate,jgdm,jzfl,jzkm',
      monthFormat: 'YYYY-MM',
      dateFormat: 'YYYY-MM-DD',
      disabled: false,
      subjectName: undefined,
      isAdmin: false,
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
          title: '记账日期',
          align: 'center',
          dataIndex: 'fiscalDate'
        },
        {
          title: '业务机构代码',
          align: 'center',
          dataIndex: 'jgdm'
        },
        {
          title: '业务机构',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '记账分类',
          align: 'center',
          dataIndex: 'jzfl_dictText'
        },
        {
          title: '一级科目号',
          align: 'center',
          dataIndex: 'yjkmbh'
        },
        {
          title: '一级科目名称',
          align: 'center',
          dataIndex: 'yjkmmc'
        },
        {
          title: '记账科目号',
          align: 'center',
          dataIndex: 'jzkm'
        },
        {
          title: '记账科目名称',
          align: 'center',
          dataIndex: 'jzkmmc'
        },
        // {
        //   title: '记账科目',
        //   align: 'center',
        //   dataIndex: 'jzkm_dictText'
        // },
        {
          title: '金额(元)',
          align: 'center',
          dataIndex: 'je',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '记账部门',
          align: 'center',
          dataIndex: 'jzbm_dictText'
        },
        {
          title: '备注',
          align: 'left',
          dataIndex: 'remark',
          scopedSlots: { customRender: 'remark' },
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
        list: '/jylrhs/jylrsj/fyftjz/list',
        delete: '/jylrhs/jylrsj/fyftjz/delete',
        deleteBatch: '/jylrhs/jylrsj/fyftjz/deleteBatch',
        exportXlsUrl: 'jylrhs/jylrsj/fyftjz/exportXls',
        importExcelUrl: 'jylrhs/jylrsj/fyftjz/importExcel',
        exportTemplateUrl: 'jylrhs/jylrsj/fyftjz/exportTemplateXls',
      }
    }
  },
  created() {
    //this.getCurrentMonth()
    this.getOprIsAdmin()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    ...mapGetters(['nickname', 'avatar', 'userInfo', 'orgCode']),

    onFiscalDateChange: function(value, dateString) {
      console.log(dateString[0], dateString[1])
      this.queryParam.fiscalDate_begin = dateString[0]
      this.queryParam.fiscalDate_end = dateString[1]
    },

    getCurrentMonth() {
      this.queryParam = { fiscalDate: undefined }
      this.queryParam.fiscalDate = moment(this.getCurrentDataFront()).format(this.monthFormat)
      // console.info('默认会计日期:',this.queryParam.fiscalDate)
    },
    getCurrentDataFront () {
      var date = new Date()
      date.setDate(1)
      var month = parseInt(date.getMonth()) + 1
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return date.getFullYear() + '-' + month + '-' + day
    },
    //获取当月最后1天日期
    getMonthLastDay(fiscalDate) {
      // console.log('获取当月最后1天日期 / 当前月份', fiscalDate)
      var date = moment(fiscalDate).format('YYYYMMDD')
      // var date = new Date()
      // console.log('当前会计日期', date)
      let new_year = parseInt(date.substring(0, 4))//取当前的年份
      let month = parseInt(date.substring(4, 6))
      let new_month = month//取当前的月份
      // console.log('month', month)
      // console.log('new_month', new_month)
      // let weekday = date.getDay();  //获取是周几
      let d = new Date(new_year, new_month, 1)//取当年当月中的第一天
      // 如果一个日期格式和一个毫秒相减，会变成一个时间毫秒戳
      // 获取当月最后一天日期
      return new Date(d.getTime() - 1000 * 60 * 60 * 24).getDate()
    },
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      var params = this.getQueryParams();
      // if (params.fiscalDate !== undefined && params.fiscalDate !== null && params.fiscalDate !== '') {
      //   let lastday = this.getMonthLastDay(params.fiscalDate)
      //   // console.log('(loadData)月末日期',lastday)
      //   params.fiscalDate = moment(params.fiscalDate).format('YYYY-MM') + '-' + lastday
      // }
      console.info(params)
      this.loading = true;
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
          this.loading = false;
        } else {
          this.dataSource = [];
          this.ipagination.total = 0;
          this.loading = false;
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false;
        }
        this.loading = false;
      })
    },
    getQueryParams() {
      // let fiscalDateMoment = ''
      // if (this.queryParam.fiscalDate) {
      //   let lastday = this.getMonthLastDay(this.queryParam.fiscalDate)
      //   // console.log('(getQueryParams)月末日期',lastday)
      //   fiscalDateMoment = moment(this.queryParam.fiscalDate).format('YYYY-MM') + '-' + lastday
      // }
      var param      = Object.assign({},this.queryParam,this.isorter);
      param.field    = this.getQueryField();
      param.pageNo   = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      // if (param.fiscalDate) {
      //   param.fiscalDate = fiscalDateMoment;
      // }
      delete param.fiscalDateRange; //范围参数不传递后台
      return filterObj(param);
    },
    searchReset() {
      this.queryParam = {}
      // this.queryParam.fiscalDateRange = undefined
      // this.queryParam.fiscalDate_begin = undefined
      // this.queryParam.fiscalDate_end = undefined
      this.subjectName = undefined
      // this.getCurrentMonth()
      this.loadData(1)
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
      // let fiscalDateMoment = ''
      // if (param.fiscalDate !== undefined && param.fiscalDate !== null && param.fiscalDate !== '') {
      //   let lastday = this.getMonthLastDay(param.fiscalDate)
      //   // console.log('(handleExportXls)月末日期',lastday)
      //   fiscalDateMoment = moment(param.fiscalDate).format("YYYY-MM") + '-' + lastday
      // }
      // param.fiscalDate = fiscalDateMoment
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

    excelImport() {
      let params = {}
      params.exportTemplateUrl = this.url.exportTemplateUrl
      params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      this.exportTemplateName = '经营利润核算（费用分摊记账）导入模板' + '_' + moment(new Date()).format('YYYYMMDDHHmmss')
      params.exportTemplateName = this.exportTemplateName
      var param = Object.assign({}, this.queryParam, params);
      this.$refs.excelImportModal.showModal(param);
    },
    handleEdit: function(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.opEdit = true
      this.$refs.modalForm.disableSubmit = false
    },
    handleEditRole: function (record) {
      console.log('当前操作员是否为管理员',this.isAdmin)
      if (!this.isAdmin && record.operator !== this.userInfo().username) {
        notification.warning({message: '系统提示', description: '仅能编辑本人录入的数据！', duration: 4})
        return
      } else {
        this.handleEdit(record)
      }
    },
    handleDelete: function (record) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      let params = {
        'fiscal_date': record.fiscalDate,
        'jgdm': record.jgdm,
        'jzfl': record.jzfl,
        'jzkm': record.jzkm
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

    onSearchLookup: function() {
      let jzfl = this.getQueryParams().jzfl
      console.info('已选择记账分类',jzfl)
      if (jzfl !== undefined && jzfl !== 'undefined') {
        this.$refs.selectJzkmModal.szfl = jzfl
      } else {
        this.$refs.selectJzkmModal.szfl = undefined
      }
      this.$refs.selectJzkmModal.add()
    },
    selectOK: function (data) {
      console.info('已选择记账科目',data[0])
      console.info('已选择记账二级科目',data[0].subjectName2,data[0].subjectNo2)
      this.subjectName = data[0].subjectName2
      this.queryParam.jzkm = data[0].subjectNo2
    },

    //判断当前操作员是否为管理员、财务主管角色
    getOprIsAdmin() {
      let roles = this.userInfo().roles.split(",")
      console.log('用户角色',roles)
      roles.forEach((roleId)=>{
        getAction('/sys/role/queryById', {'id': roleId}).then((res) => {
          if (res.success) {
            let rolecode = res.result.roleCode.toLocaleLowerCase()
            // console.log('当前操作员角色编码',rolecode)
            if (rolecode === 'admin' || rolecode === 'zhxtgly' || rolecode === 'dms_cwzg') {
              this.isAdmin = true
            }
          } else {
            this.isAdmin = false
          }
        }).catch((error)=>{
          console.error('当前操作员是否为管理员查询操作失败！',error)
        }).finally(()=>{
          console.log('当前操作员是否为管理员',this.isAdmin)
        })
      })
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>