<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <j-tree-select placeholder="全部"
                             v-model="queryParam.branchNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <a-input placeholder="请输入机构号" v-model="queryParam.socNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入流水号" v-model="queryParam.jrnlNo"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="序号">
              <a-input placeholder="请输入序号" v-model="queryParam.sequenceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="帐号">
              <a-input placeholder="请输入帐号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜员号">
              <a-input placeholder="请输入柜员号" v-model="queryParam.tellerNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('冻结解冻登记簿')">导出</a-button>
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
    <djjddjb-modal ref="modalForm" @ok="modalFormOk"></djjddjb-modal>
  </a-card>
</template>

<script>
  import DjjddjbModal from './modules/DjjddjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "DjjddjbList",
    mixins:[JeecgListMixin],
    components: {
      DjjddjbModal,JTreeSelect
    },
    data () {
      return {
        description: '冻结解冻登记簿管理页面',
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
            dataIndex: 'socNo'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '入账日期',
            align:"center",
            dataIndex: 'postDate'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'jrnlNo'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'businessType'
           },
		   {
            title: '入账时间',
            align:"center",
            dataIndex: 'postTime'
           },
		   {
            title: '序列号',
            align:"center",
            dataIndex: 'seqNo'
           },
		   {
            title: '柜员号',
            align:"center",
            dataIndex: 'tellerNo'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'branchNo'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'supTellerNo'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'customerName'
           },
		   {
            title: '政府机构',
            align:"center",
            dataIndex: 'governmentAgency'
           },
		   {
            title: '法律实施',
            align:"center",
            dataIndex: 'lawEnforceOfir'
           },
		   {
            title: '办公人员名',
            align:"center",
            dataIndex: 'officerIdName'
           },
		   {
            title: '办公人员ID',
            align:"center",
            dataIndex: 'officerIdNo'
           },
		   {
            title: '法律文书',
            align:"center",
            dataIndex: 'legalDocName'
           },
		   {
            title: '通知号',
            align:"center",
            dataIndex: 'noticeNo'
           },
		   {
            title: '冻结类型',
            align:"center",
            dataIndex: 'freezeType'
           },
		   {
            title: '冻结原因',
            align:"center",
            dataIndex: 'freezeReason'
           },
		   {
            title: '透支标志',
            align:"center",
            dataIndex: 'odInd'
           },
		   {
            title: '冻结金额',
            align:"center",
            dataIndex: 'freezeAmount'
           },
		   {
            title: '原冻结流水号',
            align:"center",
            dataIndex: 'oriFreezeJrnlNo'
           },
		   {
            title: '原冻结日期',
            align:"center",
            dataIndex: 'oriFreezeDate'
           },
		   {
            title: '冻结日期',
            align:"center",
            dataIndex: 'freezeMatDate'
           },
		   {
            title: '转账类型',
            align:"center",
            dataIndex: 'trfType'
           },
		   {
            title: '转账金额',
            align:"center",
            dataIndex: 'trfAmount'
           },
		   {
            title: '接收账号',
            align:"center",
            dataIndex: 'receiveAcctNo'
           },
		   {
            title: '接收姓名',
            align:"center",
            dataIndex: 'receiveCustName'
           },
		   {
            title: '接收银行',
            align:"center",
            dataIndex: 'receiveBankName'
           },
		   {
            title: '转账SRN号',
            align:"center",
            dataIndex: 'trfSrnNo'
           },
		   {
            title: '查询内容',
            align:"center",
            dataIndex: 'enquiryContent'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '子类型',
            align:"center",
            dataIndex: 'subType'
           },
		   {
            title: '册号',
            align:"center",
            dataIndex: 'volumeNo'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'sequenceNo'
           },
		   {
            title: '优先级',
            align:"center",
            dataIndex: 'priorityNo'
           },
		   {
            title: '账户余额',
            align:"center",
            dataIndex: 'acctBalance'
           },
		   {
            title: '可用金额',
            align:"center",
            dataIndex: 'availAmt'
           },
		   {
            title: 'othGovFreeAmt',
            align:"center",
            dataIndex: 'othGovFreeAmt'
           },
		   {
            title: 'marFreeAmt',
            align:"center",
            dataIndex: 'marFreeAmt'
           },
		   {
            title: 'pleFreeFlg',
            align:"center",
            dataIndex: 'pleFreeFlg'
           },
		   {
            title: '实际冻结金额',
            align:"center",
            dataIndex: 'realFreezeAmt'
           },
		   {
            title: '原始冻结金额',
            align:"center",
            dataIndex: 'origFreezeAmt'
           },
		   {
            title: '开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'edate'
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
		   /*{
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
          list: "/djjddjb/djjddjb/list",
          delete: "/djjddjb/djjddjb/delete",
          deleteBatch: "/djjddjb/djjddjb/deleteBatch",
          exportXlsUrl: "djjddjb/djjddjb/exportXls",
          importExcelUrl: "djjddjb/djjddjb/importExcel",
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