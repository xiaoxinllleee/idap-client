<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="消息类型">
              <a-input placeholder="请输入消息类型" v-model="queryParam.msgtype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易处理码">
              <a-input placeholder="请输入交易处理码" v-model="queryParam.proccode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户编号">
              <a-input placeholder="请输入商户编号" v-model="queryParam.merchantno"></a-input>
            </a-form-item>
          </a-col> <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户名称">
              <a-input placeholder="请输入商户名称" v-model="queryParam.merchantname"></a-input>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易时间">
              <a-range-picker @change="onChangejysj" v-model="queryParam.tradetime" :format="dateFormat"/>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易账号">
              <a-input  placeholder="请输入交易账号" v-model="queryParam.acctno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易名称">
              <a-input placeholder="请输入交易名称" v-model="queryParam.tradename"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('商户交易流水')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
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
        :scroll="{x:2430}"
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
    <shjyls-modal ref="modalForm" @ok="modalFormOk"></shjyls-modal>
  </a-card>
</template>

<script>
  import ShjylsModal from './modules/ShjylsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  export default {
    name: "ShjylsList",
    mixins:[JeecgListMixin],
    components: {
      ShjylsModal
    },
    data () {
      return {
        description: '商户交易流水管理页面',
        // 表头
        dateFormat:'YYYYMMDD',
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
            title: '流水日期',
            align:"center",
            dataIndex: 'cleardate'
           },
		   {
            title: '消息类型',
            align:"center",
            dataIndex: 'msgtype'
           },
		   {
            title: '交易处理码',
            align:"center",
            dataIndex: 'proccode'
           },
		   {
            title: '服务点条件码',
            align:"center",
            dataIndex: 'condcode'
           },
		   {
            title: '检索参考号',
            align:"center",
            dataIndex: 'indexrefno'
           },
		   {
            title: '商户编号',
            align:"center",
            dataIndex: 'merchantno'
           },
		   {
            title: '商户名称',
            align:"center",
            dataIndex: 'merchantname'
           },
		   {
            title: '终端编号',
            align:"center",
            dataIndex: 'termid'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'tradetime'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'tradeamount'
           },
		   {
            title: '手续费借贷标识',
            align:"center",
            dataIndex: 'dcflag'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'fee'
           },
		   {
            title: '交易账号',
            align:"center",
            dataIndex: 'acctno'
           },
		   {
            title: '交易名称',
            align:"center",
            dataIndex: 'tradename'
           },
		   {
            title: 'LASTTIME',
            align:"center",
            dataIndex: 'lasttime'
           },
		   {
            title: '银联流水号',
            align:"center",
            dataIndex: 'ylseqno'
           },
		   {
            title: '发卡机构',
            align:"center",
            dataIndex: 'cardbrno'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '导入日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		 /*  {
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
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/shjyls/shjyls/list",
          delete: "/shjyls/shjyls/delete",
          deleteBatch: "/shjyls/shjyls/deleteBatch",
          exportXlsUrl: "shjyls/shjyls/exportXls",
          importExcelUrl: "shjyls/shjyls/importExcel",
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
        delete param.tradetime;
        return filterObj(param);
      },
      onChangejysj(value,dateString){
        let tradetimeString=dateString
        this.queryParam.tradetime_begin=tradetimeString[0]
        this.queryParam.tradetime_end=tradetimeString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>