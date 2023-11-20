<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="系统编号">
              <a-input placeholder="请输入系统编号" v-model="queryParam.sysid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="应用编号">
              <a-input placeholder="请输入应用编号" v-model="queryParam.appid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.tradecode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易柜员">
              <a-input placeholder="请输入交易柜员" v-model="queryParam.tellerno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易机构">
              <a-input placeholder="请输入交易机构" v-model="queryParam.brno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户号">
              <a-input placeholder="请输入商户号" v-model="queryParam.shh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="受理机构代码">
              <a-input placeholder="请输入受理机构代码" v-model="queryParam.sljgdm"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('固网支付流水表')">导出</a-button>
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
        :scroll="{x:6430}"
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
    <gwzflsb-modal ref="modalForm" @ok="modalFormOk"></gwzflsb-modal>
  </a-card>
</template>

<script>
  import GwzflsbModal from './modules/GwzflsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GwzflsbList",
    mixins:[JeecgListMixin],
    components: {
      GwzflsbModal
    },
    data () {
      return {
        description: '固网支付流水表管理页面',
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
            title: '系统编号',
            align:"center",
            dataIndex: 'sysid'
           },
		   {
            title: '应用编号',
            align:"center",
            dataIndex: 'appid'
           },
		   {
            title: '应用子类',
            align:"center",
            dataIndex: 'resid'
           },
		   {
            title: '业务日期',
            align:"center",
            dataIndex: 'busidate'
           },
		   {
            title: '平台日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '平台流水',
            align:"center",
            dataIndex: 'workseqid'
           },
		   {
            title: '平台时间',
            align:"center",
            dataIndex: 'worktime'
           },
		   {
            title: '模板代码',
            align:"center",
            dataIndex: 'templatecode'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'tradecode'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tradetype'
           },
		   {
            title: '交易柜员',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '交易机构',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amt'
           },
		   {
            title: '手续费',
            align:"center",
            dataIndex: 'feeamt'
           },
		   {
            title: '实际金额',
            align:"center",
            dataIndex: 'sjamt'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curcode'
           },
		   {
            title: '卡友日期',
            align:"center",
            dataIndex: 'bdjyrq'
           },
		   {
            title: '系统跟踪号',
            align:"center",
            dataIndex: 'xtgzh'
           },
		   {
            title: '卡友交易时间',
            align:"center",
            dataIndex: 'bdjysj'
           },
		   {
            title: '清算日期',
            align:"center",
            dataIndex: 'qsrq'
           },
		   {
            title: '商户类型',
            align:"center",
            dataIndex: 'shlx'
           },
		   {
            title: '商户号',
            align:"center",
            dataIndex: 'shh'
           },
		   {
            title: '受理机构代码',
            align:"center",
            dataIndex: 'sljgdm'
           },
		   {
            title: '发送机构代码',
            align:"center",
            dataIndex: 'fsjgdm'
           },
		   {
            title: '终端号',
            align:"center",
            dataIndex: 'zdh'
           },
		   {
            title: '转出卡号',
            align:"center",
            dataIndex: 'outcardno'
           },
		   {
            title: '转入卡号',
            align:"center",
            dataIndex: 'incardno'
           },
		   {
            title: '转出账号',
            align:"center",
            dataIndex: 'outacctno'
           },
		   {
            title: '转入账号',
            align:"center",
            dataIndex: 'inacctno'
           },
		   {
            title: '中心状态',
            align:"center",
            dataIndex: 'corpstatus'
           },
		   {
            title: '中心代码',
            align:"center",
            dataIndex: 'corperrcode'
           },
		   {
            title: '中心信息',
            align:"center",
            dataIndex: 'corperrmsg'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'busistatus'
           },
		   {
            title: '交易步骤',
            align:"center",
            dataIndex: 'tradebusistep'
           },
		   {
            title: '错误代码',
            align:"center",
            dataIndex: 'errcode'
           },
		   {
            title: '错误信息',
            align:"center",
            dataIndex: 'errmsg'
           },
		   {
            title: '凭证类型',
            align:"center",
            dataIndex: 'vouchtype'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'vouchno'
           },
		   {
            title: '圈存类型',
            align:"center",
            dataIndex: 'qclx'
           },
		   {
            title: '圈存号码',
            align:"center",
            dataIndex: 'qchm'
           },
		   {
            title: '圈存状态',
            align:"center",
            dataIndex: 'qcstatus'
           },
		   {
            title: '圈存信息',
            align:"center",
            dataIndex: 'qcinfo'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '备注3',
            align:"center",
            dataIndex: 'remark3'
           },
		   {
            title: '圈存标志',
            align:"center",
            dataIndex: 'qcbz'
           },
		   {
            title: '日志编号',
            align:"center",
            dataIndex: 'logsid'
           },
		   {
            title: '核心状态',
            align:"center",
            dataIndex: 'bankstatus'
           },
		   {
            title: '核心日期',
            align:"center",
            dataIndex: 'bankdate'
           },
		   {
            title: '最后处理时间',
            align:"center",
            dataIndex: 'lasttime'
           },
		   {
            title: '固网支付业务类型',
            align:"center",
            dataIndex: 'custno'
           },
		   {
            title: '请求日期时间',
            align:"center",
            dataIndex: 'reqdatetime'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'transno'
           },
		   {
            title: '转出账号行号',
            align:"center",
            dataIndex: 'fkhno'
           },
		   {
            title: '转出账号行名',
            align:"center",
            dataIndex: 'fkhname'
           },
		   {
            title: '加急标志',
            align:"center",
            dataIndex: 'tranchl'
           },
		   {
            title: '收款名称',
            align:"center",
            dataIndex: 'skname'
           },
		   {
            title: '转入账号行号',
            align:"center",
            dataIndex: 'skhno'
           },
		   {
            title: '转入账号行名',
            align:"center",
            dataIndex: 'skhname'
           },
		   {
            title: '固网支付交易码',
            align:"center",
            dataIndex: 'trancode'
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
		  /* {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
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
          list: "/gwzflsb/gwzflsb/list",
          delete: "/gwzflsb/gwzflsb/delete",
          deleteBatch: "/gwzflsb/gwzflsb/deleteBatch",
          exportXlsUrl: "gwzflsb/gwzflsb/exportXls",
          importExcelUrl: "gwzflsb/gwzflsb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>