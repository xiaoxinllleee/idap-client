<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <!--<a-form-item label='数据日期'>
              <a-date-picker placeholder='请选择数据日期' v-model='queryParam.dataDate' style='width: 100%;'
                             @change='yearChange()' :disabled-date='disabledDate' :format='dateFormat'></a-date-picker>
            </a-form-item>-->
            <a-form-item label="任务年份">
              <a-select placeholder="请选择任务年份" v-model="rwnf" :allowClear="true" >
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.jgbm" dict="v_hr_bas_organization_cmms,zzjc,ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"></j-tree-select>
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='网点名称'>
                <a-input placeholder='请输入网点名称' v-model='queryParam.wdmc'></a-input>
              </a-form-item>
            </a-col>
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='全年利息收入'>-->
<!--                <a-input placeholder='请输入全年利息收入' v-model='queryParam.qnlxsr'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :xl='6' :lg='7' :md='8' :sm='24'>-->
<!--              <a-form-item label='一季度利息收入'>-->
<!--                <a-input placeholder='请输入一季度利息收入' v-model='queryParam.jdlxsrOne'></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
<!--              <a @click='handleToggleSearch' style='margin-left: 8px'>-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />-->
<!--              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <!--<a-button @click='handleAdd' type='primary' icon='plus'>新增</a-button>-->
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('贷款利息收入任务分配')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport" v-has="'dklxsrrwfp:import'">导入</a-button>
      <span style="float: right; font-size: 10pt;font-weight: bold;">单元/万元</span>
    </div>

    <!-- table区域-begin -->
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
          <a @click='handleEdit(record)' v-has="'dklxsrrwfp:edit'">编辑</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dklxsrRwfp-modal ref='modalForm' @ok='modalFormOk'></dklxsrRwfp-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import DklxsrRwfpModal from './modules/DklxsrRwfpModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import moment from 'moment/moment'
import ExcelImport from '@/components/common/ExcelImport'
import { filterObj } from '@/utils/util'
import JTreeSelect from "@/components/jeecg/JTreeSelect";

export default {
  name: 'DklxsrRwfpList',
  mixins: [JeecgListMixin],
  components: {
    DklxsrRwfpModal,
    ExcelImport,
    JTreeSelect,
  },
  data() {
    return {
      description: '手工台账：贷款利息收入任务分配管理页面',
      //dateFormat: 'YYYY-MM-DD',
      years: '',
      rwnf: '',
      rq:'',
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
          title: '任务年份',
          align: 'center',
          dataIndex: 'dataDate',
          customRender: function (text) {
            return !text ? "" : (text.length > 4 ? text.substr(0, 4) : text)
          },
        },
        {
          title: '网点编码',
          align: 'center',
          dataIndex: 'jgbm'
        },
        {
          title: '网点名称',
          align: 'center',
          dataIndex: 'wdmc'
        },
        {
          title: '全年利息收入',
          align: 'center',
          dataIndex: 'qnlxsr'
        },
        {
          title: '一季度利息收入',
          align: 'center',
          dataIndex: 'jdlxsrOne'
        },
        {
          title: '二季度利息收入',
          align: 'center',
          dataIndex: 'jdlxsrTwo'
        },
        {
          title: '三季度利息收入',
          align: 'center',
          dataIndex: 'jdlxsrThree'
        },
        {
          title: '四季度利息收入',
          align: 'center',
          dataIndex: 'jdlxsrFour'
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
        list: '/tjbb/tjfz/sgtzdr/dklxsrrwfp/dklxsrRwfp/list',
        delete: '/tjbb/tjfz/sgtzdr/dklxsrrwfp/dklxsrRwfp/delete',
        deleteBatch: '/tjbb/tjfz/sgtzdr/dklxsrrwfp/dklxsrRwfp/deleteBatch',
        exportXlsUrl: 'tjbb/tjfz/sgtzdr/dklxsrrwfp/dklxsrRwfp/exportXls',
        importExcelUrl: 'tjbb/tjfz/sgtzdr/dklxsrrwfp/dklxsrRwfp/importExcel',
        exportTemplateUrl:"tjbb/tjfz/sgtzdr/dklxsrrwfp/dklxsrRwfp/exportTemplateXls"
      },
      exportTemplateName: '贷款利息收入任务分配导入模板',
    }
  },
  created() {
    this.getCurrentYear()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    moment,
    getCurrentYear() {
      let date = new Date
      let year = date.getFullYear()
      // this.rwnf = year
      this.initYear(year)
    },
    /**
     * 初始化年份下拉框
     * @param year
     */
    initYear(year) {
      this.years = []
      for(let i=0; i<30; i++) {
        this.years.push({ value:((year-i)+''),label:((year-i)+'') });
      }
    },
    /**
     * 年份下拉选择
     * @param value
     * @param date
     */
    selectValue(value,date) {
      console.log('年份下拉选择:',value,date)
      this.$emit('change', value)
    },
    searchReset() {
      this.queryParam = {
        dataDate: undefined
      }
      this.getCurrentYear()
      this.loadData(1);
    },
    getQueryParams () {
      //获取查询条件
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      let rwnf=""
      if (this.rwnf) {
        rwnf = moment(this.rwnf).format("YYYY")+'-01-01'
      }
      console.info('任务年份',this.rwnf)
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.dataDate = rwnf
      return filterObj(param)
    },
    yearChange(){
      if (this.queryParam.dataDate) {
        this.rq = moment(this.queryParam.dataDate).format("YYYY-MM-DD");
      }
    },
    excelImport(){
      if (this.rwnf === undefined || this.rwnf === '') {
        this.$message.error("请选择任务年份!")
        return
      } else {
        let params = {}
        this.rq = moment(this.rwnf).format("YYYY")+'-01-01'
        console.log('导入年份',this.rq)
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rq}`
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      }
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>