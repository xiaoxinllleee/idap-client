<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.cardNbr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品编号">
              <a-input placeholder="请输入产品编号" v-model="queryParam.product"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡片状态代码">
              <a-input placeholder="请输入卡片状态代码" v-model="queryParam.canclCode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.custrNbr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡片序号">
              <a-input placeholder="请输入卡片序号" v-model="queryParam.issueNbr"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('卡片资料表')">导出</a-button>
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
        :scroll="{x:12450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <kpzlb-modal ref="modalForm" @ok="modalFormOk"></kpzlb-modal>
  </a-card>
</template>

<script>
  import KpzlbModal from './modules/KpzlbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "KpzlbList",
    mixins:[JeecgListMixin],
    components: {
      KpzlbModal
    },
    data () {
      return {
        description: '卡片资料表管理页面',
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
            title: '卡号',
            align:"center",
            dataIndex: 'cardNbr'
           },
		   {
            title: '产品编号',
            align:"center",
            dataIndex: 'product'
           },
		   {
            title: '卡片状态代码',
            align:"center",
            dataIndex: 'canclCode'
           },
		   {
            title: '卡片状态日期',
            align:"center",
            dataIndex: 'canclDay'
           },
		   {
            title: '卡片挂失员工',
            align:"center",
            dataIndex: 'canclEmpl'
           },
		   {
            title: '卡片挂失时间',
            align:"center",
            dataIndex: 'canclTime'
           },
		   {
            title: '外卡黑名单动作代码',
            align:"center",
            dataIndex: 'actioncode'
           },
		   {
            title: '产生日期',
            align:"center",
            dataIndex: 'createDay'
           },
		   {
            title: '每日外币预借现金笔数',
            align:"center",
            dataIndex: 'cashadNox'
           },
		   {
            title: '每日本币预借现金笔数',
            align:"center",
            dataIndex: 'cashadvNo'
           },
		   {
            title: '递送方式',
            align:"center",
            dataIndex: 'despatch'
           },
		   {
            title: '第二道凸字(企业卡的公司名称)',
            align:"center",
            dataIndex: 'embossLn2'
           },
		   {
            title: '凸字名称',
            align:"center",
            dataIndex: 'embossNme'
           },
		   {
            title: '到期日(YYMM)',
            align:"center",
            dataIndex: 'expiryDte'
           },
		   {
            title: '重发卡的新到期日(YYMM)',
            align:"center",
            dataIndex: 'expiryNew'
           },
		   {
            title: '卡片费用代码',
            align:"center",
            dataIndex: 'feeCode'
           },
		   {
            title: '发卡日期',
            align:"center",
            dataIndex: 'issueDay'
           },
		   {
            title: '发卡原因代码',
            align:"center",
            dataIndex: 'issueReas'
           },
		   {
            title: '卡片遗失日期',
            align:"center",
            dataIndex: 'lossDay'
           },
		   {
            title: '挂失方式',
            align:"center",
            dataIndex: 'lossReprt'
           },
		   {
            title: '卡片遗失时间',
            align:"center",
            dataIndex: 'lossTime'
           },
		   {
            title: '允许每日外币存款最大金额',
            align:"center",
            dataIndex: 'depamTdx'
           },
		   {
            title: '允许每日本币存款最大金额',
            align:"center",
            dataIndex: 'depamTdy'
           },
		   {
            title: '允许每日外币存款最多次数(作废)',
            align:"center",
            dataIndex: 'depnoTdx'
           },
		   {
            title: '允许每日本币存款最多次数(作废)',
            align:"center",
            dataIndex: 'depnoTdy'
           },
		   {
            title: '允许每日存款最多次数(作废)',
            align:"center",
            dataIndex: 'depositNo'
           },
		   {
            title: '允许本币预借现金最多次数',
            align:"center",
            dataIndex: 'hrcashNo'
           },
		   {
            title: '允许外币预借现金最多次数',
            align:"center",
            dataIndex: 'hrcashNox'
           },
		   {
            title: '允许每日外币缴款最大金额',
            align:"center",
            dataIndex: 'maxPamtx'
           },
		   {
            title: '允许使用PIN错误最多次数',
            align:"center",
            dataIndex: 'maxPintry'
           },
		   {
            title: '允许每日PIN错误次数',
            align:"center",
            dataIndex: 'pinFaildl'
           },
		   {
            title: '允许PIN错误次数',
            align:"center",
            dataIndex: 'pinFails'
           },
		   {
            title: '允许每日外币购货总额',
            align:"center",
            dataIndex: 'purcamTdx'
           },
		   {
            title: '允许每日本币购货总额',
            align:"center",
            dataIndex: 'purcamTdy'
           },
		   {
            title: '允许今日外币购货次数',
            align:"center",
            dataIndex: 'purchsNox'
           },
		   {
            title: '允许今日本币购货次数',
            align:"center",
            dataIndex: 'purchseNo'
           },
		   {
            title: '重发卡日期',
            align:"center",
            dataIndex: 'reissDte'
           },
		   {
            title: '紧急替代卡标志',
            align:"center",
            dataIndex: 'urgentfee'
           },
		   {
            title: '有效期的起始日期',
            align:"center",
            dataIndex: 'validFrom'
           },
		   {
            title: '重发卡有效期的起始日期',
            align:"center",
            dataIndex: 'validNew'
           },
		   {
            title: '短信通知标志',
            align:"center",
            dataIndex: 'smsYn'
           },
		   {
            title: '消费使用密码标志',
            align:"center",
            dataIndex: 'pinChk'
           },
		   {
            title: '卡片版面',
            align:"center",
            dataIndex: 'cdfrm'
           },
		   {
            title: '附卡单独设置额度比例',
            align:"center",
            dataIndex: 'limitX'
           },
		   {
            title: '附卡额度比例',
            align:"center",
            dataIndex: 'credLmt'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'custrNbr'
           },
		   {
            title: '入网机构代码',
            align:"center",
            dataIndex: 'areaCode'
           },
		   {
            title: '下次收年费月份',
            align:"center",
            dataIndex: 'feeMonth'
           },
		   {
            title: '外币网上交易开通标志',
            align:"center",
            dataIndex: 'ecYn'
           },
		   {
            title: '外币网上交易开通期限',
            align:"center",
            dataIndex: 'ecEnddt'
           },
		   {
            title: '境外交易开关',
            align:"center",
            dataIndex: 'ltnonlyYn'
           },
		   {
            title: '本币无磁交易开关',
            align:"center",
            dataIndex: 'track2N'
           },
		   {
            title: '卡片激活日期',
            align:"center",
            dataIndex: 'activeday'
           },
		   {
            title: '卡片激活渠道',
            align:"center",
            dataIndex: 'activech'
           },
		   {
            title: '卡片注销原因代码',
            align:"center",
            dataIndex: 'canclReas'
           },
		   {
            title: '是否允许无磁无密商户交易',
            align:"center",
            dataIndex: 'ntnpYn'
           },
		   {
            title: '消费密码生效金额',
            align:"center",
            dataIndex: 'pinLmt'
           },
		   {
            title: '卡片单独积分兑换年费',
            align:"center",
            dataIndex: 'cdptfeeYn'
           },
		   {
            title: '可取现功能',
            align:"center",
            dataIndex: 'withdrwYn'
           },
		   {
            title: '可转出功能',
            align:"center",
            dataIndex: 'xfrfromYn'
           },
		   {
            title: '可存款功能',
            align:"center",
            dataIndex: 'depositYn'
           },
		   {
            title: '可余额查询功能',
            align:"center",
            dataIndex: 'balinqYn'
           },
		   {
            title: '可消费功能',
            align:"center",
            dataIndex: 'purchYn'
           },
		   {
            title: '可找现功能',
            align:"center",
            dataIndex: 'cashbckYn'
           },
		   {
            title: 'ATM转账、电话转账、网银转账、手机转账功能字段',
            align:"center",
            dataIndex: 'xfrchnl'
           },
		   {
            title: '续卡类型',
            align:"center",
            dataIndex: 'reissType'
           },
		   {
            title: '取消PRMMT账期控制',
            align:"center",
            dataIndex: 'clmlimYn'
           },
		   {
            title: '是否续卡标志位',
            align:"center",
            dataIndex: 'reissFlg'
           },
		   {
            title: '换卡收费标志位',
            align:"center",
            dataIndex: 'replacefee'
           },
		   {
            title: 'IC卡标志位',
            align:"center",
            dataIndex: 'pbocYn'
           },
		   {
            title: '最后一次交易发生日期',
            align:"center",
            dataIndex: 'authPday'
           },
		   {
            title: '最后一次交易发生时间',
            align:"center",
            dataIndex: 'authPtime'
           },
		   {
            title: '硬件序列号',
            align:"center",
            dataIndex: 'hdwrSn'
           },
		   {
            title: '卡片序号',
            align:"center",
            dataIndex: 'issueNbr'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '数据结束日期',
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
          list: "/kpzlb/kpzlb/list",
          delete: "/kpzlb/kpzlb/delete",
          deleteBatch: "/kpzlb/kpzlb/deleteBatch",
          exportXlsUrl: "kpzlb/kpzlb/exportXls",
          importExcelUrl: "kpzlb/kpzlb/importExcel",
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