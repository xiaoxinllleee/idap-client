<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <a-input placeholder="请输入机构号" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入流水号" v-model="queryParam.jrnlNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="记录号">
              <a-input placeholder="请输入记录号" v-model="queryParam.recNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="帐号">
              <a-input placeholder="请输入帐号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.trnCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜员号和网点">
              <a-input placeholder="请输入柜员号和网点" v-model="queryParam.tellAndBr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易授权柜员">
              <a-input placeholder="请输入交易授权柜员" v-model="queryParam.supervisorId"></a-input>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易发生日期">
              <a-range-picker  @change="onChangezjyfsrq" v-model="queryParam.trnDate"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款流水_60')">导出</a-button>
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
    <ckls_60-modal ref="modalForm" @ok="modalFormOk"></ckls_60-modal>
  </a-card>
</template>

<script>
  import Ckls_60Modal from './modules/Ckls_60Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JEllipsis from '@comp/jeecg/JEllipsis'

  export default {
    name: "Ckls_60List",
    mixins:[JeecgListMixin],
    components: {
      Ckls_60Modal,JEllipsis
    },
    data () {
      return {
        description: '存款流水_60管理页面',
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
            title: '机构号',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '记录号',
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
            title: '该条数据记录日期',
            align:"center",
            dataIndex: 'postDate'
           },
		   {
            title: '交易发生日期',
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
            title: '柜员号和网点',
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
            title: '终端号',
            align:"center",
            dataIndex: 'brterm'
           },
		   {
            title: '渠道',
            align:"center",
            dataIndex: 'channel'
           },
		   {
            title: '删除标志',
            align:"center",
            dataIndex: 'deli'
           },
		   {
            title: '类型',
            align:"center",
            dataIndex: 'type'
           },
		   {
            title: '状态1',
            align:"center",
            dataIndex: 'stat1'
           },
		   {
            title: 'POST_DATE1',
            align:"center",
            dataIndex: 'postDate1'
           },
		   {
            title: 'filler01',
            align:"center",
            dataIndex: 'filler01'
           },
		   {
            title: '交易码1',
            align:"center",
            dataIndex: 'trnCode1'
           },
		   {
            title: '流水号1',
            align:"center",
            dataIndex: 'jrnlNo1'
           },
		   {
            title: '处理通知的日期',
            align:"center",
            dataIndex: 'procDate'
           },
		   {
            title: '支取关户标识',
            align:"center",
            dataIndex: 'wdlClseInd'
           },
		   {
            title: '标识通知结束时是否转账处理',
            align:"center",
            dataIndex: 'autoInd'
           },
		   {
            title: '支取交易金额',
            align:"center",
            dataIndex: 'amount'
           },
		   {
            title: '通知天数',
            align:"center",
            dataIndex: 'daysNotice'
           },
		   {
            title: '转账系统',
            align:"center",
            dataIndex: 'trfSys'
           },
		   {
            title: '转入帐号',
            align:"center",
            dataIndex: 'account'
           },
		   {
            title: '跨机构转账使用的排序代码',
            align:"center",
            dataIndex: 'extSortCode'
           },
		   {
            title: '通知存款到期日',
            align:"center",
            dataIndex: 'expiryDate'
           },
		   {
            title: '标识是否被删除',
            align:"center",
            dataIndex: 'delete1'
           },
		   {
            title: '交易发起终端号1',
            align:"center",
            dataIndex: 'brterm1'
           },
		   {
            title: '提款类别',
            align:"center",
            dataIndex: 'wtype'
           },
		   {
            title: '建立通知的机构',
            align:"center",
            dataIndex: 'branch'
           },
		   {
            title: '取消通知的日期',
            align:"center",
            dataIndex: 'cancelDate'
           },
		   {
            title: '取消通知的机构',
            align:"center",
            dataIndex: 'cancelBrh'
           },
		   {
            title: '罚息标识',
            align:"center",
            dataIndex: 'penaltyFlag'
           },
		   {
            title: '交易授权柜员',
            align:"center",
            dataIndex: 'supervisorid'
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
            title: 'delete',
            align:"center",
            dataIndex: 'delete'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ckls_60/ckls_60/list",
          delete: "/ckls_60/ckls_60/delete",
          deleteBatch: "/ckls_60/ckls_60/deleteBatch",
          exportXlsUrl: "ckls_60/ckls_60/exportXls",
          importExcelUrl: "ckls_60/ckls_60/importExcel",
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
      onChangezjyfsrq(value,dateString){
        let trnDateString = dateString
        this.queryParam.trnDate_begin=trnDateString[0]
        this.queryParam.trnDate_end=trnDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>