<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="移除日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.ycrq" :format="DateFormat"
                              @change="onQxDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作人">
              <a-input placeholder="请输入操作人" v-model="queryParam.createBy"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证号">
              <a-input placeholder="请输入身份证号" v-model="queryParam.sfzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="原户号编码">
              <a-input placeholder="请输入原户号编码" v-model="queryParam.yhhbm"></a-input>
            </a-form-item>
          </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('家庭成员移除log')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  import moment from 'moment'
  export default {
    name: "JtcyYcLogList",
    mixins:[JeecgListMixin],
    components: {
    },
    data () {
      return {
        description: '家庭成员移除log管理页面',
        DateFormat: 'YYYY-MM-DD',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '移除日期',
            align:"center",
            dataIndex: 'ycrq'
           },
          {
            title: '操作人',
            align:"center",
            dataIndex: 'createBy'
          },

		   {
            title: '姓名',
            align:"center",
            dataIndex: 'xm'
           },
		   {
            title: '身份证号',
            align:"center",
            dataIndex: 'sfzh'
           },
		   {
            title: '原户号编码',
            align:"center",
            dataIndex: 'yhhbm'
           },
		   {
            title: '原与户主关系',
            align:"center",
            dataIndex: 'yyhzgx_dictText'
           },
		   {
            title: '现户号编码',
            align:"center",
            dataIndex: 'xhhbm'
           },
		   {
            title: '移除原因',
            align:"center",
            dataIndex: 'ycyy_dictText'
           },
          {
            title: '移除时间',
            align:"center",
            dataIndex: 'createTime'
          },

        ],
		url: {
          list: "/nhxxgl/jtcyYcLog/list",
          delete: "/nhxxgl/jtcyYcLog/delete",
          deleteBatch: "/nhxxgl/jtcyYcLog/deleteBatch",
          exportXlsUrl: "nhxxgl/jtcyYcLog/exportXls",
          importExcelUrl: "nhxxgl/jtcyYcLog/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      onQxDateChange: function(value, dateString) {
        let DateString = dateString
        this.queryParam.ycrq_begin = DateString[0]
        this.queryParam.ycrq_end = DateString[1]

      },

      getQueryParams () {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        delete param.ycrq
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>