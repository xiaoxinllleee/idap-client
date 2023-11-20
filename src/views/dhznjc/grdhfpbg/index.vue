<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='高危状态'>
              <a-select v-model='queryParam.gwzt' @change='change'>
                <a-select-option value='1'>全部</a-select-option>
                <a-select-option value='2'>是</a-select-option>
                <a-select-option value='3'>否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='报告状态'>
              <a-select v-model='queryParam.jkzt' @change='change'>
                <a-select-option value='1'>全部</a-select-option>
                <a-select-option value='2'>查询中</a-select-option>
                <a-select-option value='3'>成功</a-select-option>
                <a-select-option value='4'>失败</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='列表排序'>
              <a-select v-model='queryParam.lbpx' @change='change'>
                <a-select-option value='1'>默认</a-select-option>
                <a-select-option value='2'>批次</a-select-option>
                <a-select-option value='3'>手机号</a-select-option>
                <a-select-option value='4'>报告编号</a-select-option>
                <a-select-option value='5'>报告创建时间</a-select-option>
                <a-select-option value='6'>身份证</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='高危分类'>
              <a-select v-model='queryParam.gwfl' @change='change'>
                <a-select-option value='1'>全部</a-select-option>
                <a-select-option value='2'>手机异常</a-select-option>
                <a-select-option value='3'>公安负面信息</a-select-option>
                <a-select-option value='4'>失信被执行人</a-select-option>
                <a-select-option value='5'>被执行人</a-select-option>
                <a-select-option value='6'>特殊名单核验</a-select-option>
                <a-select-option value='7'>7天内多次申请</a-select-option>
                <a-select-option value='8'>1个月内多次申请</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='时间范围'>
              <a-select v-model='queryParam.sjfw' @change='change'>
                <a-select-option value='1'>请选择</a-select-option>
                <a-select-option value='2'>本月新增高危</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label=''>
              <a-input placeholder='报告编号/姓名/手机号码/身份证号码/批次号' v-model='queryParam.qtxx' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='日期'>
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model='queryParam.tjrq' :format='DateFormat'
                              style='width: 100%;' />
            </a-form-item>
          </a-col>
        </a-row>
        <row :gutter='24'>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <a-button style='background-color: #f7bf67;color: white;margin-left: 10px' @click='down'>批量下载报告</a-button>
            </span>
          </a-col>
        </row>

      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>
      <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a
      style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项
      <a style='margin-left: 24px' @click='onClearSelected'>清空</a>
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
        :scroll="{ x : 'max-content' }"
        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'
        @change='handleTableChange'>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@/components/jeecg/JInput'
import { getAction } from '@api/manage'

export default {
  name: 'VKhxxglKhxqNhJzyxList',
  mixins: [JeecgListMixin],
  components: { JInput },
  data() {
    return {
      loading: false,
      queryParam: {
        gwzt: '1',
        bgzt: '1',
        lbpx: '1',
        gwfl: '1',
        sjfw: '1'
      },
      DateFormat: 'YYYY-MM-DD',
      description: '贷后报告明细',
      replaceFields: { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'hhbm'
        },
        {
          title: '分配账号',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '报告编号',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '批次号',
          align: 'center',
          dataIndex: 'zfyxfs_dictText'
        },
        {
          title: '申请人姓名',
          align: 'center',
          dataIndex: 'zfyxfs_dictText'
        },
        {
          title: '申请人证件号码',
          align: 'center',
          dataIndex: 'zfyxfs_dictText'
        },
        {
          title: '申请人手机号',
          align: 'center',
          dataIndex: 'zfyxfs_dictText'
        },
        {
          title: '高危预警项',
          align: 'center',
          dataIndex: 'zfyxfs_dictText'
        },
        {
          title: '高危状态',
          align: 'center',
          dataIndex: 'zfyxfs_dictText'
        }
      ]
    }
  },
  created() {
  },
  methods: {
    searchReset() {
      this.queryParam = {}
      this.queryParam.gwzt = '1'
      this.queryParam.bgzt = '1'
      this.queryParam.lbpx = '1'
      this.queryParam.gwfl = '1'
      this.queryParam.sjfw = '1'
    },
    searchQuery() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    down() {
      let that = this
      that.$confirm({
        title: '系统消息',
        okText: '确定',
        content: '请勾选需要下载报告!'
      })
    },
    change(){
      this.$forceUpdate()
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>