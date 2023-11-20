<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="上供水公司流水号">
              <a-input placeholder="请输入上供水公司流水号" v-model="queryParam.serialno"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户编号">
              <a-input placeholder="请输入用户编号" v-model="queryParam.userNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户名称">
              <a-input placeholder="请输入用户名称" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用户身份证号码">
              <a-input placeholder="请输入用户身份证号码" v-model="queryParam.userSfzno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户网点">
              <!--<a-input placeholder="请输入开户网点" v-model="queryParam.bankCode"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.bankCode"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户名称">
              <a-input placeholder="请输入账户名称" v-model="queryParam.acctName"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('水费代扣签约信息')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>


      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:5450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sfdkqyxx-modal ref="modalForm" @ok="modalFormOk"></sfdkqyxx-modal>
  </a-card>
</template>

<script>
  import SfdkqyxxModal from './modules/SfdkqyxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "SfdkqyxxList",
    mixins:[JeecgListMixin],
    components: {
      SfdkqyxxModal,JTreeSelect
    },
    data () {
      return {
        description: '水费代扣签约信息管理页面',
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
            title: '协议登记日期',
            align:"center",
            dataIndex: 'startdate'
           },
		   {
            title: '协议终止日期',
            align:"center",
            dataIndex: 'endDate'
           },
		   {
            title: '上供水公司流水号',
            align:"center",
            dataIndex: 'serialno'
           },
		   {
            title: '用户编号',
            align:"center",
            dataIndex: 'userNo'
           },
		   {
            title: '用户名称',
            align:"center",
            dataIndex: 'username'
           },
		   {
            title: '用户身份证号码',
            align:"center",
            dataIndex: 'userSfzno'
           },
		   {
            title: '操作机构代码',
            align:"center",
            dataIndex: 'operbankno'
           },
		   {
            title: '操作柜员号',
            align:"center",
            dataIndex: 'operno'
           },
		   {
            title: '授权柜员号',
            align:"center",
            dataIndex: 'powerteller'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'bustype'
           },
		   {
            title: '协议状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '银行账号',
            align:"center",
            dataIndex: 'accountno'
           },
		   {
            title: '卡折标志',
            align:"center",
            dataIndex: 'kzflag'
           },
		   {
            title: '账户名称',
            align:"center",
            dataIndex: 'acctName'
           },
		   {
            title: '开户网点',
            align:"center",
            dataIndex: 'bankCode'
           },
		   {
            title: '接水点编号',
            align:"center",
            dataIndex: 'jsdNo'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '用户地址',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '联系方式1',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '联系方式2',
            align:"center",
            dataIndex: 'remark3'
           },
		   {
            title: '新账号',
            align:"center",
            dataIndex: 'newAccountno'
           },
		   {
            title: '起始日期',
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
          list: "/sfdkqyxx/sfdkqyxx/list",
          delete: "/sfdkqyxx/sfdkqyxx/delete",
          deleteBatch: "/sfdkqyxx/sfdkqyxx/deleteBatch",
          exportXlsUrl: "sfdkqyxx/sfdkqyxx/exportXls",
          importExcelUrl: "sfdkqyxx/sfdkqyxx/importExcel",
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