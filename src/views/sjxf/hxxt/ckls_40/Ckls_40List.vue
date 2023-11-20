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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款流水_40')">导出</a-button>
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
    <ckls_40-modal ref="modalForm" @ok="modalFormOk"></ckls_40-modal>
  </a-card>
</template>

<script>
  import Ckls_40Modal from './modules/Ckls_40Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  export default {
    name: "Ckls_40List",
    mixins:[JeecgListMixin],
    components: {
      Ckls_40Modal
    },
    data () {
      return {
        description: '存款流水_40管理页面',
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
            title: '定期开始日期',
            align:"center",
            dataIndex: 'startDate'
           },
		   {
            title: '定期到期日',
            align:"center",
            dataIndex: 'maturityDate'
           },
		   {
            title: '定期开始日利率',
            align:"center",
            dataIndex: 'intRate'
           },
		   {
            title: '定期户付息方式和结息频率',
            align:"center",
            dataIndex: 'paymentMethod'
           },
		   {
            title: '标识当前定期户是否为',
            align:"center",
            dataIndex: 'opAutoMan'
           },
		   {
            title: '定存天数',
            align:"center",
            dataIndex: 'trmDay'
           },
		   {
            title: '贷记利率类型',
            align:"center",
            dataIndex: 'trmRateType'
           },
		   {
            title: '贷记分层利率组别',
            align:"center",
            dataIndex: 'tierGrpId'
           },
		   {
            title: '定存金额',
            align:"center",
            dataIndex: 'termValue'
           },
		   {
            title: '账户产品类型',
            align:"center",
            dataIndex: 'acctType'
           },
		   {
            title: '账户产品子类',
            align:"center",
            dataIndex: 'intCat'
           },
		   {
            title: '定期记账日期',
            align:"center",
            dataIndex: 'termPostDate'
           },
		   {
            title: '续存类型',
            align:"center",
            dataIndex: 'rollType'
           },
		   {
            title: '定期利率值',
            align:"center",
            dataIndex: 'recRate'
           },
		   {
            title: 'FILLER',
            align:"center",
            dataIndex: 'filler'
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
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ckls_40/ckls_40/list",
          delete: "/ckls_40/ckls_40/delete",
          deleteBatch: "/ckls_40/ckls_40/deleteBatch",
          exportXlsUrl: "ckls_40/ckls_40/exportXls",
          importExcelUrl: "ckls_40/ckls_40/importExcel",
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