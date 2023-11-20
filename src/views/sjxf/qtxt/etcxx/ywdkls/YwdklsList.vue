<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="争议流水号">
              <a-input placeholder="请输入争议流水号" v-model="queryParam.disputedlistno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-input placeholder="请输入交易状态" v-model="queryParam.tradestatus"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <!--<a-input placeholder="请输入开户机构" v-model="queryParam.khjg"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.khjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户类型">
              <a-input placeholder="请输入账户类型" v-model="queryParam.zhlx"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('ETC业务代扣流水')">导出</a-button>
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
        :scroll="{x:8450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ywdkls-modal ref="modalForm" @ok="modalFormOk"></ywdkls-modal>
  </a-card>
</template>

<script>
  import YwdklsModal from './modules/YwdklsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "YwdklsList",
    mixins:[JeecgListMixin],
    components: {
      YwdklsModal,JTreeSelect
    },
    data () {
      return {
        description: 'ETC业务代扣流水管理页面',
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
            title: '争议流水号',
            align:"center",
            dataIndex: 'disputedlistno'
           },
		   {
            title: '入口路段编码',
            align:"center",
            dataIndex: 'inroadno'
           },
		   {
            title: '入口站编码',
            align:"center",
            dataIndex: 'instationno'
           },
		   {
            title: '入口站名',
            align:"center",
            dataIndex: 'instationname'
           },
		   {
            title: '入口车道号',
            align:"center",
            dataIndex: 'inlaneno'
           },
		   {
            title: '出口路段',
            align:"center",
            dataIndex: 'roadno'
           },
		   {
            title: '站编码',
            align:"center",
            dataIndex: 'stationid'
           },
		   {
            title: '站名',
            align:"center",
            dataIndex: 'stationname'
           },
		   {
            title: '车道号',
            align:"center",
            dataIndex: 'laneno'
           },
		   {
            title: '车型',
            align:"center",
            dataIndex: 'vehtype'
           },
		   {
            title: '车种',
            align:"center",
            dataIndex: 'vehclass'
           },
		   {
            title: '车牌号',
            align:"center",
            dataIndex: 'vehplate'
           },
		   {
            title: '工班号',
            align:"center",
            dataIndex: 'squadno'
           },
		   {
            title: '工班日期',
            align:"center",
            dataIndex: 'squaddate'
           },
		   {
            title: '收费时间',
            align:"center",
            dataIndex: 'optime'
           },
		   {
            title: '湘通卡卡号',
            align:"center",
            dataIndex: 'paycardid'
           },
		   {
            title: '湘通卡表面号',
            align:"center",
            dataIndex: 'paycardno'
           },
		   {
            title: '湘通卡类型',
            align:"center",
            dataIndex: 'paycardtype'
           },
		   {
            title: 'OBU编码',
            align:"center",
            dataIndex: 'obuid'
           },
		   {
            title: '湘通卡余额',
            align:"center",
            dataIndex: 'paycardbalance'
           },
		   {
            title: '湘通卡折扣率',
            align:"center",
            dataIndex: 'paycarddiscount'
           },
		   {
            title: '优惠前金额',
            align:"center",
            dataIndex: 'pdiscounttoll'
           },
		   {
            title: '收费车金额',
            align:"center",
            dataIndex: 'cashmoney'
           },
		   {
            title: '免费车金额',
            align:"center",
            dataIndex: 'freemoney'
           },
		   {
            title: '公务车金额',
            align:"center",
            dataIndex: 'officemoney'
           },
		   {
            title: '未付金额',
            align:"center",
            dataIndex: 'unpaymoney'
           },
		   {
            title: '湘通卡金额',
            align:"center",
            dataIndex: 'etcmoney'
           },
		   {
            title: 'Tac码',
            align:"center",
            dataIndex: 'etctac'
           },
		   {
            title: '终端交易序列号',
            align:"center",
            dataIndex: 'etctermtradno'
           },
		   {
            title: '终端机编号',
            align:"center",
            dataIndex: 'etctermcode'
           },
		   {
            title: '卡区域号',
            align:"center",
            dataIndex: 'cardnetwork'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tradtype'
           },
		   {
            title: '确认为争议流水时间',
            align:"center",
            dataIndex: 'disputedtime'
           },
		   {
            title: '争议原因',
            align:"center",
            dataIndex: 'disputedreason'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '更新时间',
            align:"center",
            dataIndex: 'upddate'
           },
		   {
            title: '入口时间',
            align:"center",
            dataIndex: 'inoptime'
           },
		   {
            title: '批次号',
            align:"center",
            dataIndex: 'pch'
           },
		   {
            title: '上核心流水号',
            align:"center",
            dataIndex: 'hostserialno'
           },
		   {
            title: '处理日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '处理时间',
            align:"center",
            dataIndex: 'worktime'
           },
		   {
            title: '账户类型:',
            align:"center",
            dataIndex: 'zhlx'
           },
		   {
            title: '扣款账号',
            align:"center",
            dataIndex: 'kkzh'
           },
		   {
            title: '收款账号',
            align:"center",
            dataIndex: 'skzh'
           },
		   {
            title: '是否争议',
            align:"center",
            dataIndex: 'isdisputed'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'tradestatus'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg_dictText'
           },
		   {
            title: '贷记卡银行代号',
            align:"center",
            dataIndex: 'djkyhdh'
           },
		   {
            title: '贷记卡分行代号',
            align:"center",
            dataIndex: 'djkfhdh'
           },
		   {
            title: '流水类型:',
            align:"center",
            dataIndex: 'eexittype'
           },
		   {
            title: '(未绑定)回收日期',
            align:"center",
            dataIndex: 'hsrq'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		  /* {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
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
          list: "/ywdkls/ywdkls/list",
          delete: "/ywdkls/ywdkls/delete",
          deleteBatch: "/ywdkls/ywdkls/deleteBatch",
          exportXlsUrl: "ywdkls/ywdkls/exportXls",
          importExcelUrl: "ywdkls/ywdkls/importExcel",
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