<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-date-picker placeholder='请选择数据日期' v-model='queryParam.sjrq' :defaultValue='defaultMonthOpera'
                             :format='monthFormat' style='width: 100%;' @change='beforeUpload' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属支行'>
              <j-tree-select placeholder='请选择所属支行' v-model='queryParam.sszh'
                             dict='HR_BAS_ORGANIZATION,ZZJC,ZZBZ' pidField='sjzzbz' treeNodeFilterProp='title'
                             :sszh='true' :showSearch='false' :treeDefaultExpandAll='true' :filterTreeNode='true' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('商户支行评级授信统计报表')"
                v-has="'ZhPjsxtjbb:exp'">导出
      </a-button>
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

        <span slot='pjhs' slot-scope='pjhs,record'>
          <a @click='pjsxtjmx(record,pjhs,"1")'>{{ pjhs }}</a>
        </span>
        <span slot='sxhs' slot-scope='sxhs,record'>
          <a @click='pjsxtjmx(record,sxhs,"2")'>{{ sxhs }}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zhPjsxtjbb-modal ref='zhPjsxtjbbModal'></zhPjsxtjbb-modal>
  </a-card>
</template>

<script>
import ZhPjsxtjbbModal from './ZhPjsxtjbbModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import moment from 'moment'
import { filterObj } from '@/utils/util'
import { putAction } from '@api/manage'
import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
import JTreeSelect from '@comp/jeecg/JTreeSelect'

export default {
  name: 'ZhPjsxtjbbList',
  mixins: [JeecgListMixin],
  components: {
    ZhPjsxtjbbModal, JTreeSelectNotJg, JTreeSelect
  },
  data() {
    return {
      description: '支行评级授信统计报表管理页面',
      // 表头
      monthFormat: 'YYYY-MM-DD',
      // 默认当前月份
      defaultMonthOpera: '',
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
          dataIndex: 'sjrq'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '评级户数',
          align: 'center',
          dataIndex: 'pjhs',
          scopedSlots: { customRender: 'pjhs' }
        },
        {
          title: '授信户数',
          align: 'center',
          dataIndex: 'sxhs',
          scopedSlots: { customRender: 'sxhs' }
        },
        {
          title: '系统测算金额',
          align: 'center',
          dataIndex: 'xtcsje'
        },
        {
          title: '客户经理授信金额',
          align: 'center',
          dataIndex: 'khjlsxed'
        },
      ],
      url: {
        list: '/shpjsx/zh/tjfxZhpjsxtjbbSh/list',
        exportXlsUrl: 'shpjsx/zh/tjfxZhpjsxtjbbSh/exportXls',
        init: '/shpjsx/zh/tjfxZhpjsxtjbbSh/initData'
      }
    }
  },
  methods: {
    beforeUpload() {
      if (this.queryParam.sjrq) {
        this.queryParam.sjrq.format('YYYY-MM-DD')
      }
    },

    pjsxtjmx(record,num,type) {
      if(num<=0){
        this.successInfo("数量为0不展示明细！")
        return;
      }
      this.$refs.zhPjsxtjbbModal.init(record,type)
    },

    getQueryParams() {
      //获取查询条件
      let sqp = {}
      let tjMoment = ''
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      if (this.queryParam.sjrq) {
        tjMoment = moment(this.queryParam.sjrq).format('YYYY-MM-DD')
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.sjrq = tjMoment
      return filterObj(param)
    }

  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>