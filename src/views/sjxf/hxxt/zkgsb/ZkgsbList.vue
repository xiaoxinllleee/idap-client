<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易机构">
              <j-tree-select placeholder="全部"
                             v-model="queryParam.trnBrchNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="凭证号码">
              <a-input placeholder="请输入凭证号码" v-model="queryParam.serialNo"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="记录号">
              <a-input placeholder="请输入记录号" v-model="queryParam.recNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易柜员">
              <a-input placeholder="请输入交易柜员" v-model="queryParam.trnTelrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="挂失人身份证号码">
              <a-input placeholder="请输入挂失人身份证号码" v-model="queryParam.idNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('重空挂失表')">导出</a-button>
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
    <zkgsb-modal ref="modalForm" @ok="modalFormOk"></zkgsb-modal>
  </a-card>
</template>

<script>
  import ZkgsbModal from './modules/ZkgsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "ZkgsbList",
    mixins:[JeecgListMixin],
    components: {
      ZkgsbModal,JTreeSelect
    },
    data () {
      return {
        description: '重空挂失表管理页面',
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
            title: '银行号',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '省代码',
            align:"center",
            dataIndex: 'provinceCode'
           },
		   {
            title: '凭证类型',
            align:"center",
            dataIndex: 'ibdType'
           },
		   {
            title: '凭证前缀及凭证号码',
            align:"center",
            dataIndex: 'srlNoPrefix'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'serialNo'
           },
		   {
            title: '记录号',
            align:"center",
            dataIndex: 'recNo'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '挂失日期',
            align:"center",
            dataIndex: 'trnDate'
           },
		   {
            title: '挂失时间',
            align:"center",
            dataIndex: 'trnTime'
           },
		   {
            title: '交易柜员',
            align:"center",
            dataIndex: 'trnTelrNo'
           },
		   {
            title: '交易机构',
            align:"center",
            dataIndex: 'trnBrchNo_dictText'
           },
		   {
            title: '挂失类型',
            align:"center",
            dataIndex: 'lstType'
           },
		   {
            title: '挂失开始日期',
            align:"center",
            dataIndex: 'lstStartDate'
           },
		   {
            title: '挂失终止日期',
            align:"center",
            dataIndex: 'lstEndDate'
           },
		   {
            title: '挂失人',
            align:"center",
            dataIndex: 'proposer'
           },
		   {
            title: '重空签发日期',
            align:"center",
            dataIndex: 'issueDate'
           },
		   {
            title: '挂失金额',
            align:"center",
            dataIndex: 'issueAmt'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'jrnlNo'
           },
		   {
            title: '当挂失的存单、存折挂失换折后，该标识位会置为1',
            align:"center",
            dataIndex: 'procFlag'
           },
		   {
            title: '挂失人身份证类型',
            align:"center",
            dataIndex: 'idType'
           },
		   {
            title: '挂失人身份证号码',
            align:"center",
            dataIndex: 'idNo'
           },
		   {
            title: '挂失原因',
            align:"center",
            dataIndex: 'lstReason'
           },
		   {
            title: '挂失代理人身份证类型',
            align:"center",
            dataIndex: 'agentIdType'
           },
		   {
            title: '挂失代理人身份证号码',
            align:"center",
            dataIndex: 'agentIdNo'
           },
		   {
            title: '解挂网点号',
            align:"center",
            dataIndex: 'lstCancelBr'
           },
		   {
            title: '解挂柜员号',
            align:"center",
            dataIndex: 'lstCancelTelr'
           },
		   {
            title: '解挂日期',
            align:"center",
            dataIndex: 'lstCancelDt'
           },
		   {
            title: '解挂时间',
            align:"center",
            dataIndex: 'lstCancelTime'
           },
		   {
            title: '解挂流水号',
            align:"center",
            dataIndex: 'lstCancelJrnl'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'edate'
           },
		  /* {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },*/
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
          list: "/zkgsb/zkgsb/list",
          delete: "/zkgsb/zkgsb/delete",
          deleteBatch: "/zkgsb/zkgsb/deleteBatch",
          exportXlsUrl: "zkgsb/zkgsb/exportXls",
          importExcelUrl: "zkgsb/zkgsb/importExcel",
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