<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='操作账户'>
              <a-select v-model='queryParam.czzh' @change='change'>
                <a-select-option value="1">当前用户和子账号</a-select-option>
                <a-select-option value="2" >当前账户</a-select-option>
                <a-select-option value="3">下级子账号</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='日期'>
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.tjrq" :format="DateFormat"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label=''>
              <a-input placeholder="报告编号/姓名/手机号码/身份证号码/批次号" v-model="queryParam.qtxx" />
            </a-form-item>
          </a-col>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button  @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
      style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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
  components: {JInput},
  data() {
    return {
      loading:false,
      queryParam:{},
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
          title: '用户账号',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '报告编号',
          align: 'center',
          dataIndex: 'wgbh_dictText'
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'hhbm'
        },
        {
          title: '身份证号',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '手机号',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '查询事件',
          align: 'center',
          dataIndex: 'zfyxfs_dictText'
        },
      ],
    }
  },
  created() {
    this.queryParam.czzh='2'
  },
  methods: {
    searchReset(){
      this.queryParam={}
      this.queryParam.czzh='2'
    },
    searchQuery(){
      this.loading=true
      setTimeout(()=>{
        this.loading=false
      },1000)
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