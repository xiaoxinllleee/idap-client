<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-date-picker placeholder='请选择数据日期' v-model='queryParam.dataDate' style='width: 100%;'
                             @change='dateChage()' :disabled-date='disabledDate' :format='dateFormat'></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.jgbm" dict="v_hr_bas_organization_cmms,zzjc,ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"></j-tree-select>
            </a-form-item>
          </a-col>
          <!--<a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='机构代码'>
              <a-input placeholder='请输入机构代码' v-model='queryParam.jgbm'></a-input>
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='机构名称'>
                <a-input placeholder='请输入机构名称' v-model='queryParam.jgmc'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='卡类型'>
                <a-select placeholder='请输入卡类型' v-model='queryParam.cardType'>
                  <a-select-option value='1'>标卡</a-select-option>
                  <a-select-option value='2'>非标卡</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>-->
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <!--<a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon='download' :loading='exportLoading' @click="handleExportXls('手工台账：信用卡五级分类及不良统计')">导出</a-button>
      <a-button type="primary" icon='import' @click='excelImport' v-has="'xykWjflBltj:import'">导入</a-button>
      <span style="float: right; font-size: 10pt;font-weight: bold;">单元/元</span>
    </div>

    <div>
      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        @change='handleTableChange'>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)' v-has="'xykWjflBltj:edit'">编辑</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xykWjflBltj-modal ref='modalForm' @ok='modalFormOk'></xykWjflBltj-modal>
    <excel-import ref='excelImportModal' @ok='importComplete' />
  </a-card>
</template>

<script>
import XykWjflBltjModal from './modules/XykWjflBltjModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import moment from 'moment'
import { filterObj } from '@/utils/util'
import JTreeSelect from "@/components/jeecg/JTreeSelect";

export default {
  name: 'XykWjflBltjList',
  mixins: [JeecgListMixin],
  components: {
    XykWjflBltjModal,
    ExcelImport,
    JTreeSelect,
  },
  data() {
    return {
      description: '手工台账：信用卡五级分类及不良统计管理页面',
      dateFormat: 'YYYY-MM-DD',
      rq: '',
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
          title: '数据日期',
          align: 'center',
          dataIndex: 'dataDate'
        },
        {
          title: '机构代码',
          align: 'center',
          dataIndex: 'jgbm'
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'jgmc'
        },
        // {
        //   title: '卡类型',
        //   align: 'center',
        //   dataIndex: 'cardType',
        //   customRender: function(text) {
        //     if (text == 1) {
        //       return '标卡'
        //     } else if (text == 2) {
        //       return '非标卡'
        //     } else {
        //       return ''
        //     }
        //   }
        // },
        {
          title: '透支本金合计',
          align: 'center',
          dataIndex: 'tzbjhj'
        },
        {
          title: '正常',
          align: 'center',
          dataIndex: 'zc'
        },
        {
          title: '关注',
          align: 'center',
          dataIndex: 'gz'
        },
        {
          title: '次级',
          align: 'center',
          dataIndex: 'cj'
        },
        {
          title: '可疑',
          align: 'center',
          dataIndex: 'ky'
        },
        {
          title: '损失',
          align: 'center',
          dataIndex: 'ss'
        },
        {
          title: '不良本金合计',
          align: 'center',
          dataIndex: 'blbjhj'
        },
        {
          title: '不良率',
          align: 'center',
          dataIndex: 'bll'
        },
        // {
        //   title: '录入标识(0 导入 1 录入 2 修改)',
        //   align: 'center',
        //   dataIndex: 'lrbz'
        // },
        // {
        //   title: '录入人',
        //   align: 'center',
        //   dataIndex: 'lrr'
        // },
        // {
        //   title: '录入时间',
        //   align: 'center',
        //   dataIndex: 'lrsj'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/tjbb/tjfz/sgtzdr/xykwjflbltj/xykWjflBltj/list',
        delete: '/tjbb/tjfz/sgtzdr/xykwjflbltj/xykWjflBltj/delete',
        deleteBatch: '/tjbb/tjfz/sgtzdr/xykwjflbltj/xykWjflBltj/deleteBatch',
        exportXlsUrl: 'tjbb/tjfz/sgtzdr/xykwjflbltj/xykWjflBltj/exportXls',
        importExcelUrl: 'tjbb/tjfz/sgtzdr/xykwjflbltj/xykWjflBltj/importExcel',
        exportTemplateUrl:'tjbb/tjfz/sgtzdr/xykwjflbltj/xykWjflBltj/exportTemplateXls'
      },
      exportTemplateName: '信用卡五级分类及不良统计导入模板',
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.getCurrentDate()
  },
  methods: {
    getCurrentDate() {
      this.queryParam = {
        dataDate: undefined
      }
      // this.queryParam.dataDate = moment(this.getCurrentDataFront()).format(this.dateFormat)
    },
    getCurrentDataFront () {
      var date = new Date()
      // date.setDate(1)
      var month = parseInt(date.getMonth() + 1)
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      const time = date.getFullYear() + '-' + month + '-' + day
      return time
    },
    moment,
    disabledDate(current) {
      return current && current > moment()
    },
    dateChage(){
      if (this.queryParam.dataDate) {
        this.rq = this.queryParam.dataDate.format("YYYY-MM-DD");
      }
    },
    excelImport(){
      if (this.queryParam.dataDate == undefined || this.queryParam.dataDate == '') {
        this.$message.error("请选择数据日期!")
        return
      } else {
        let params = {}
        this.rq=moment(this.queryParam.dataDate).format("YYYY-MM-DD");
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rq}`
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      }
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1);
    },
    getQueryParams () {
      //获取查询条件
      let sqp = {}
      let tjMoment=""
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      if (this.queryParam.dataDate) {
        tjMoment=moment(this.queryParam.dataDate).format("YYYY-MM-DD")
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.dataDate = tjMoment
      return filterObj(param)
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>