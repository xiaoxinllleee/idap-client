<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
<!--              <a-input placeholder="请输入机构号" v-model="queryParam.socNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.brchNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.socNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜员号">
              <a-input placeholder="请输入柜员号" v-model="queryParam.tellerNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主银行号">
              <a-input placeholder="请输入主银行号" v-model="queryParam.primInst"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="终端号">
              <a-input placeholder="请输入终端号" v-model="queryParam.termInBranch"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行内的终端号">
              <a-input placeholder="请输入银行内的终端号" v-model="queryParam.termNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('柜员信息表')">导出</a-button>
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
<!--
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>
-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:16000}"
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
    <gyxxb-modal ref="modalForm" @ok="modalFormOk"></gyxxb-modal>
  </a-card>
</template>

<script>
  import GyxxbModal from './modules/GyxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "GyxxbList",
    mixins:[JeecgListMixin],
    components: {
      GyxxbModal,JTreeSelect
    },
    data () {
      return {
        description: '柜员信息表管理页面',
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
            dataIndex: 'socNo'
           },
		   {
            title: '柜员号',
            align:"center",
            dataIndex: 'tellerNo'
           },
		   {
            title: '主银行号',
            align:"center",
            dataIndex: 'primInst'
           },
		   {
            title: '最近的消息序号',
            align:"center",
            dataIndex: 'lastMsgSeq'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'brchNo'
           },
		   {
            title: '主机构号',
            align:"center",
            dataIndex: 'primBranch'
           },
		   {
            title: '终端号',
            align:"center",
            dataIndex: 'termInBranch'
           },
		   {
            title: '最近签到机构',
            align:"center",
            dataIndex: 'lastBranchSignon'
           },
		   {
            title: '银行内的终端号',
            align:"center",
            dataIndex: 'termNo'
           },
		   {
            title: '终端类型',
            align:"center",
            dataIndex: 'termType'
           },
		   {
            title: '签到日期',
            align:"center",
            dataIndex: 'signOnDate'
           },
		   {
            title: '二进制日期',
            align:"center",
            dataIndex: 'signOnDateBin'
           },
		   {
            title: '记账日期',
            align:"center",
            dataIndex: 'postDate'
           },
		   {
            title: '签到标志',
            align:"center",
            dataIndex: 'signonFlag'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '语言代码',
            align:"center",
            dataIndex: 'preferredLang'
           },
		   {
            title: '能力级别',
            align:"center",
            dataIndex: 'capable'
           },
		   {
            title: '主级别',
            align:"center",
            dataIndex: 'primCap'
           },
		   {
            title: '组别',
            align:"center",
            dataIndex: 'grpNo'
           },
		   {
            title: '主组别',
            align:"center",
            dataIndex: 'primGrp'
           },
		   {
            title: '电子邮件模块安全级别',
            align:"center",
            dataIndex: 'elmSec'
           },
		   {
            title: '电子邮件模块基本安全级别',
            align:"center",
            dataIndex: 'primElmSec'
           },
		   {
            title: '最近活动日期',
            align:"center",
            dataIndex: 'dteLastActive'
           },
		   {
            title: '主币种',
            align:"center",
            dataIndex: 'primCurrency'
           },
		   {
            title: '外币1',
            align:"center",
            dataIndex: 'foreignCurr01'
           },
		   {
            title: '外币2',
            align:"center",
            dataIndex: 'foreignCurr02'
           },
		   {
            title: '外币3',
            align:"center",
            dataIndex: 'foreignCurr03'
           },
		   {
            title: '外币4',
            align:"center",
            dataIndex: 'foreignCurr04'
           },
		   {
            title: '外币5',
            align:"center",
            dataIndex: 'foreignCurr05'
           },
		   {
            title: '有效的消息号码',
            align:"center",
            dataIndex: 'noActMsgs'
           },
		   {
            title: '待阅信息数',
            align:"center",
            dataIndex: 'msgsPending'
           },
		   {
            title: '柜员名称',
            align:"center",
            dataIndex: 'tellerName'
           },
		   {
            title: '柜员密码',
            align:"center",
            dataIndex: 'tellerPword'
           },
		   {
            title: '错误密码尝试次数',
            align:"center",
            dataIndex: 'tellerPwordRetry'
           },
		   {
            title: '访问安全代码',
            align:"center",
            dataIndex: 'accessSecurCode'
           },
		   {
            title: '基本安全代码',
            align:"center",
            dataIndex: 'primSecCode'
           },
		   {
            title: '密码变更日期',
            align:"center",
            dataIndex: 'changePwordDate'
           },
		   {
            title: '授权号',
            align:"center",
            dataIndex: 'tellerAuthority'
           },
		   {
            title: '最近十次使用过的密码1',
            align:"center",
            dataIndex: 'pwordArea01'
           },
		   {
            title: '最近十次使用过的密码2',
            align:"center",
            dataIndex: 'pwordArea02'
           },
		   {
            title: '最近十次使用过的密码3',
            align:"center",
            dataIndex: 'pwordArea03'
           },
		   {
            title: '最近十次使用过的密码4',
            align:"center",
            dataIndex: 'pwordArea04'
           },
		   {
            title: '最近十次使用过的密码5',
            align:"center",
            dataIndex: 'pwordArea05'
           },
		   {
            title: '最近十次使用过的密码6',
            align:"center",
            dataIndex: 'pwordArea06'
           },
		   {
            title: '最近十次使用过的密码7',
            align:"center",
            dataIndex: 'pwordArea07'
           },
		   {
            title: '最近十次使用过的密码8',
            align:"center",
            dataIndex: 'pwordArea08'
           },
		   {
            title: '最近十次使用过的密码9',
            align:"center",
            dataIndex: 'pwordArea09'
           },
		   {
            title: '最近十次使用过的密码10',
            align:"center",
            dataIndex: 'pwordArea10'
           },
		   {
            title: '当前交易的账号',
            align:"center",
            dataIndex: 'currentAc'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'currentTran'
           },
		   {
            title: 'ACC_INVOLVED',
            align:"center",
            dataIndex: 'accInvolved'
           },
		   {
            title: '处理标志',
            align:"center",
            dataIndex: 'progressFlag'
           },
		   {
            title: '需要授权交易的错误码1',
            align:"center",
            dataIndex: 'errorCode01'
           },
		   {
            title: '授权值1',
            align:"center",
            dataIndex: 'errorOverride01'
           },
		   {
            title: '需要授权交易的错误码2',
            align:"center",
            dataIndex: 'errorCode02'
           },
		   {
            title: '授权值2',
            align:"center",
            dataIndex: 'errorOverride02'
           },
		   {
            title: '需要授权交易的错误码3',
            align:"center",
            dataIndex: 'errorCode03'
           },
		   {
            title: '授权值3',
            align:"center",
            dataIndex: 'errorOverride03'
           },
		   {
            title: '需要授权交易的错误码4',
            align:"center",
            dataIndex: 'errorCode04'
           },
		   {
            title: '授权值4',
            align:"center",
            dataIndex: 'errorOverride04'
           },
		   {
            title: '需要授权交易的错误码5',
            align:"center",
            dataIndex: 'errorCode05'
           },
		   {
            title: '授权值5',
            align:"center",
            dataIndex: 'errorOverride05'
           },
		   {
            title: '需要授权交易的错误码6',
            align:"center",
            dataIndex: 'errorCode06'
           },
		   {
            title: '授权值6',
            align:"center",
            dataIndex: 'errorOverride06'
           },
		   {
            title: '需要授权交易的错误码7',
            align:"center",
            dataIndex: 'errorCode07'
           },
		   {
            title: '授权值7',
            align:"center",
            dataIndex: 'errorOverride07'
           },
		   {
            title: '需要授权交易的错误码8',
            align:"center",
            dataIndex: 'errorCode08'
           },
		   {
            title: '授权值8',
            align:"center",
            dataIndex: 'errorOverride08'
           },
		   {
            title: '需要授权交易的错误码9',
            align:"center",
            dataIndex: 'errorCode09'
           },
		   {
            title: '授权值9',
            align:"center",
            dataIndex: 'errorOverride09'
           },
		   {
            title: '需要授权交易的错误码10',
            align:"center",
            dataIndex: 'errorCode10'
           },
		   {
            title: '授权值10',
            align:"center",
            dataIndex: 'errorOverride10'
           },
		   {
            title: '往来目的标识',
            align:"center",
            dataIndex: 'corrDestination'
           },
		   {
            title: '柜员缺席原因',
            align:"center",
            dataIndex: 'absReasCode'
           },
		   {
            title: '授权柜员号',
            align:"center",
            dataIndex: 'supTeller'
           },
		   {
            title: '消息数',
            align:"center",
            dataIndex: 'noOfMessages'
           },
		   {
            title: 'SECTION部门',
            align:"center",
            dataIndex: 'section'
           },
		   {
            title: '最近的终端消息',
            align:"center",
            dataIndex: 'lastTerminalMsg'
           },
		   {
            title: '用户类型',
            align:"center",
            dataIndex: 'userType'
           },
		   {
            title: '额度监控标志',
            align:"center",
            dataIndex: 'limitMonitorFlag'
           },
		   {
            title: '货币对模板代码',
            align:"center",
            dataIndex: 'curpTemplateCode'
           },
		   {
            title: '未在FF中找到',
            align:"center",
            dataIndex: 'aoGroup'
           },
		   {
            title: '会计主管经理号',
            align:"center",
            dataIndex: 'aoManagerNo'
           },
		   {
            title: '柜员交易限额',
            align:"center",
            dataIndex: 'tellerLimits'
           },
		   {
            title: '员工号',
            align:"center",
            dataIndex: 'employeeId'
           },
		   {
            title: '日终轧账检查标志',
            align:"center",
            dataIndex: 'eodBalInd'
           },
		   {
            title: '用户部门',
            align:"center",
            dataIndex: 'userDepart'
           },
		   {
            title: '授权柜员组号',
            align:"center",
            dataIndex: 'authGroupNo'
           },
		   {
            title: '临时值班机构号',
            align:"center",
            dataIndex: 'tempBranchNo'
           },
		   {
            title: '临时值班用户组',
            align:"center",
            dataIndex: 'tempUserTeamNo'
           },
		   {
            title: '临时值班用户级别',
            align:"center",
            dataIndex: 'tempUserLevel'
           },
		   {
            title: '临时值班用户类型',
            align:"center",
            dataIndex: 'tempUserType'
           },
		   {
            title: '临时值班开始日期',
            align:"center",
            dataIndex: 'tempStartDate'
           },
		   {
            title: '临时值班结束日期',
            align:"center",
            dataIndex: 'tempEndDate'
           },
		   {
            title: '填充',
            align:"center",
            dataIndex: 'fil01'
           },
		   {
            title: '上次交易日期',
            align:"center",
            dataIndex: 'lastMaintDate'
           },
		   {
            title: '上次交易状态',
            align:"center",
            dataIndex: 'lastMaintStat'
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
          list: "/gyxxb/gyxxb/list",
          delete: "/gyxxb/gyxxb/delete",
          deleteBatch: "/gyxxb/gyxxb/deleteBatch",
          exportXlsUrl: "gyxxb/gyxxb/exportXls",
          importExcelUrl: "gyxxb/gyxxb/importExcel",
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