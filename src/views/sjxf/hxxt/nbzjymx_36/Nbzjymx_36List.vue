<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入金融序号" v-model="queryParam.jrnlNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="顺序号">
              <a-input placeholder="请输入顺序号" v-model="queryParam.recNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="交易码">
                <a-input placeholder="请输入交易码" v-model="queryParam.trnCode"></a-input>
              </a-form-item>
            </a-col>
            <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="交易日期">
                <a-range-picker @change="onChangejyrq" v-model="queryParam.trnDate"/>
              </a-form-item>
            </a-col>-->
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('内部帐交易明细_36')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:3430}"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <nbzjymx_36-modal ref="modalForm" @ok="modalFormOk"></nbzjymx_36-modal>
  </a-card>
</template>

<script>
  import Nbzjymx_36Modal from './modules/Nbzjymx_36Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  export default {
    name: "Nbzjymx_36List",
    mixins:[JeecgListMixin],
    components: {
      Nbzjymx_36Modal
    },
    data () {
      return {
        description: '内部帐交易明细_36管理页面',
        // 表头
        columns: [
          {
            title: '',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '金融序号',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '顺序号',
            align:"center",
            dataIndex: 'recNo'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tranType'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '过帐日期',
            align:"center",
            dataIndex: 'postDate'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'trnDate'
           },
		   {
            title: '系统日期',
            align:"center",
            dataIndex: 'systemDate'
           },
		   {
            title: '系统时间',
            align:"center",
            dataIndex: 'systemTime'
           },
		   {
            title: '机构柜员号',
            align:"center",
            dataIndex: 'tellAndBr'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'jrnlNo'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'trnCode'
           },
		   {
            title: '交易终端',
            align:"center",
            dataIndex: 'brterm'
           },
		   {
            title: '渠道类型',
            align:"center",
            dataIndex: 'channel'
           },
		   {
            title: '删除标志',
            align:"center",
            dataIndex: 'deli'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'code'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '交易系统',
            align:"center",
            dataIndex: 'system'
           },
		   {
            title: '定期扣款类型',
            align:"center",
            dataIndex: 'desc1'
           },
		   {
            title: '对方交易帐号',
            align:"center",
            dataIndex: 'accountno'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amount'
           },
		   {
            title: '交易终端号',
            align:"center",
            dataIndex: 'brterm1'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		  /* {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'dttime',
            align:"center",
            dataIndex: 'dttime'
           },
		   {
            title: 'desc',
            align:"center",
            dataIndex: 'desc'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/nbzjymx_36/nbzjymx_36/list",
          delete: "/nbzjymx_36/nbzjymx_36/delete",
          deleteBatch: "/nbzjymx_36/nbzjymx_36/deleteBatch",
          exportXlsUrl: "nbzjymx_36/nbzjymx_36/exportXls",
          importExcelUrl: "nbzjymx_36/nbzjymx_36/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.trnDate;
        return filterObj(param);
      },
      onChangejyrq(value,dateString){
        let trnDateString=dateString
        this.queryParam.trnDate_begin=trnDateString[0]
        this.queryParam.trnDate_end=trnDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>