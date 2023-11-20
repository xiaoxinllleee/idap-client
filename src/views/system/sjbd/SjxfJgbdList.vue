<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq" format="YYYY-MM-DD" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="表名">
              <a-input placeholder="请输入表名" v-model="queryParam.tablename"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="impala记录数">
              <a-input placeholder="请输入impala记录数" v-model="queryParam.impalaCount"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="oracle记录数">
              <a-input placeholder="请输入oracle记录数" v-model="queryParam.oracleCount"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数量是否一致">
              <a-input placeholder="请输入数量是否一致" v-model="queryParam.slsfyz"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('数据下发结果比对')">导出</a-button>
      <a-button @click="init" icon="search" >统计</a-button>

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
    <sjxfJgbd-modal ref="modalForm" @ok="modalFormOk"></sjxfJgbd-modal>
  </a-card>
</template>

<script>
  import SjxfJgbdModal from './modules/SjxfJgbdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction, putAction } from '@api/manage'
  import { filterObj } from '@/utils/util'

  export default {
    name: "SjxfJgbdList",
    mixins:[JeecgListMixin],
    components: {
      SjxfJgbdModal
    },
    data () {
      return {
        description: '数据下发结果比对管理页面',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq'
           },
		   {
            title: '表名',
            align:"center",
            dataIndex: 'tablename'
           },
		   {
            title: 'impala记录数',
            align:"center",
            dataIndex: 'impalaCount'
           },
		   {
            title: 'oracle记录数',
            align:"center",
            dataIndex: 'oracleCount'
           },
		   {
            title: '数量是否一致',
            align:"center",
            dataIndex: 'slsfyz'
           },
		   {
            title: 'impala金额和',
            align:"center",
            dataIndex: 'impalaSum'
           },
		   {
            title: 'oracle金额和',
            align:"center",
            dataIndex: 'oracleSum'
           },
		   {
            title: '金额是否一致',
            align:"center",
            dataIndex: 'jesfyz'
           },
		   {
            title: '信息',
            align:"center",
            dataIndex: 'info'
           }
        ],
		url: {
          list: "/system/sjbd/sjxfJgbd/list",
          init: "/system/sjbd/sjxfJgbd/init",
          delete: "/system/sjbd/sjxfJgbd/delete",
          deleteBatch: "/system/sjbd/sjxfJgbd/deleteBatch",
          exportXlsUrl: "system/sjbd/sjxfJgbd/exportXls",
          importExcelUrl: "system/sjbd/sjxfJgbd/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      init(){
        if (this.queryParam.sjrq == null || this.queryParam.sjrq == 'undefined') {
          this.$message.error('请选择需要比对的数据日期！')
          return
        }else{
          var params = this.getQueryParams();//查询条件
          console.info(params)
          getAction(this.url.init, params).then((res) => {
            console.log(res)
            if (res.success) {
              this.$message.success(res.message)
              this.loadData()
            } else {
              this.$message.warning(res.message,5)
            }
            this.loading = false
          })
        }
      },
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.sjrq) {
          tjrqment = this.queryParam.sjrq.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.sjrq) {
          param.sjrq = tjrqment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>