<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入流水号" v-model="queryParam.seqno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="内部交易码">
              <a-input placeholder="请输入内部交易码" v-model="queryParam.tradecode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="渠道代码">
              <a-input placeholder="请输入渠道代码" v-model="queryParam.chnlcode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="渠道流水">
              <a-input placeholder="请输入渠道流水" v-model="queryParam.chnlseqno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易柜员号">
              <a-input placeholder="请输入交易柜员号" v-model="queryParam.trantellerno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易机构代码">
              <a-input placeholder="请输入交易机构代码" v-model="queryParam.tranbranchid"></a-input>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangejyrq" v-model="queryParam.tradedate"/>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.cardno"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('电话银行交易流水表')">导出</a-button>
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
    <dhyhjylsb-modal ref="modalForm" @ok="modalFormOk"></dhyhjylsb-modal>
  </a-card>
</template>

<script>
  import DhyhjylsbModal from './modules/DhyhjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  export default {
    name: "DhyhjylsbList",
    mixins:[JeecgListMixin],
    components: {
      DhyhjylsbModal
    },
    data () {
      return {
        description: '电话银行交易流水表管理页面',
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
            title: '交易日期',
            align:"center",
            dataIndex: 'tradedate'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'tradetime'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'seqno'
           },
		   {
            title: '内部交易码',
            align:"center",
            dataIndex: 'tradecode'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'busitype'
           },
		   {
            title: '渠道代码',
            align:"center",
            dataIndex: 'chnlcode'
           },
		   {
            title: '渠道流水',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '渠道时间',
            align:"center",
            dataIndex: 'chnltime'
           },
		   {
            title: '交易柜员号',
            align:"center",
            dataIndex: 'trantellerno'
           },
		   {
            title: '交易机构代码',
            align:"center",
            dataIndex: 'tranbranchid'
           },
		   {
            title: '终端号',
            align:"center",
            dataIndex: 'terminalcode'
           },
		   {
            title: '卡号',
            align:"center",
            dataIndex: 'cardno'
           },
		   {
            title: '金额',
            align:"center",
            dataIndex: 'amt'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'tradestate'
           },
		   {
            title: '返回码',
            align:"center",
            dataIndex: 'retcode'
           },
		   {
            title: '返回信息',
            align:"center",
            dataIndex: 'retmsg'
           },
		   {
            title: '平台日志ID',
            align:"center",
            dataIndex: 'logid'
           },
		   {
            title: '核心/行内返回码',
            align:"center",
            dataIndex: 'hostRetcode'
           },
		   {
            title: '核心/行内返回信息',
            align:"center",
            dataIndex: 'hostRetmsg'
           },
		   {
            title: '错误码',
            align:"center",
            dataIndex: 'errorcode'
           },
		   {
            title: '错误信息',
            align:"center",
            dataIndex: 'errormsg'
           },
		   {
            title: '原交易码',
            align:"center",
            dataIndex: 'orgtradecode'
           },
		   {
            title: '预留字段1',
            align:"center",
            dataIndex: 'reservedfield1'
           },
		   {
            title: '预留字段2',
            align:"center",
            dataIndex: 'reservedfield2'
           },
		   {
            title: '预留字段3',
            align:"center",
            dataIndex: 'reservedfield3'
           },
		   {
            title: '预留字段4',
            align:"center",
            dataIndex: 'reservedfield4'
           },
		   {
            title: '核心流水号',
            align:"center",
            dataIndex: 'hostseqno'
           },
		   {
            title: '核心uuid',
            align:"center",
            dataIndex: 'uuid'
           },
		   {
            title: '交易开始时间',
            align:"center",
            dataIndex: 'startTime'
           },
		   {
            title: '交易结束时间',
            align:"center",
            dataIndex: 'endTime'
           },
		   {
            title: '备份字段1',
            align:"center",
            dataIndex: 'bak1'
           },
		   {
            title: '备份字段2',
            align:"center",
            dataIndex: 'bak2'
           },
		   {
            title: 'FLAG',
            align:"center",
            dataIndex: 'flag'
           },
		   {
            title: 'SYSFLAG',
            align:"center",
            dataIndex: 'sysflag'
           },
		   {
            title: 'TRADESEQ',
            align:"center",
            dataIndex: 'tradeseq'
           },
		   {
            title: 'CURRSYSSEQNO',
            align:"center",
            dataIndex: 'currsysseqno'
           },
		   {
            title: 'UUID2',
            align:"center",
            dataIndex: 'uuid2'
           },
		   {
            title: 'CURRSYSSEQNO2',
            align:"center",
            dataIndex: 'currsysseqno2'
           },
		   {
            title: 'HOSTSEQNO2',
            align:"center",
            dataIndex: 'hostseqno2'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载时间',
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
          list: "/dhyhjylsb/dhyhjylsb/list",
          delete: "/dhyhjylsb/dhyhjylsb/delete",
          deleteBatch: "/dhyhjylsb/dhyhjylsb/deleteBatch",
          exportXlsUrl: "dhyhjylsb/dhyhjylsb/exportXls",
          importExcelUrl: "dhyhjylsb/dhyhjylsb/importExcel",
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
        delete param.tradedate;
        return filterObj(param);
      },
      onChangejyrq(value,dateString){
        let tradedateString=dateString
        this.queryParam.tradedate_begin=tradedateString[0]
        this.queryParam.tradedate_end=tradedateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>