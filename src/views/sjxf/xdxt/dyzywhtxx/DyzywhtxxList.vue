<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="被保险人">
              <a-input placeholder="请输入被保险人" v-model="queryParam.insurant"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="保单号码">
              <a-input placeholder="请输入保单号码" v-model="queryParam.insureCertNo"></a-input>
            </a-form-item>
          </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="抵押物保险单编号">
                <a-input placeholder="请输入抵押物保险单编号" v-model="queryParam.insureChangeDate"></a-input>
              </a-form-item>
            </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="投保人">
              <a-input placeholder="请输入投保人" v-model="queryParam.policyHolder"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号">
              <a-input placeholder="请输入业务编号" v-model="queryParam.businessNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="公证书编号">
              <a-input placeholder="请输入公证书编号" v-model="queryParam.guarantyNdNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.flag"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('抵押质押物合同信息')">导出</a-button>
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
        :scroll="{x:20000}"
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
    <dyzywhtxx-modal ref="modalForm" @ok="modalFormOk"></dyzywhtxx-modal>
  </a-card>
</template>

<script>
  import DyzywhtxxModal from './modules/DyzywhtxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DyzywhtxxList",
    mixins:[JeecgListMixin],
    components: {
      DyzywhtxxModal
    },
    data () {
      return {
        description: '抵押质押物合同信息管理页面',
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
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '被保险人',
            align:"center",
            dataIndex: 'insurant'
           },
		   {
            title: '开始日期',
            align:"center",
            dataIndex: 'insureBeginDate'
           },
		   {
            title: '保单号码',
            align:"center",
            dataIndex: 'insureCertNo'
           },
		   {
            title: '抵押物保险单编号',
            align:"center",
            dataIndex: 'insureChangeDate'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'insureCurrency'
           },
		   {
            title: '责任情况(66*3)',
            align:"center",
            dataIndex: 'insureDescribe'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'insureEndDate'
           },
		   {
            title: '保险金额',
            align:"center",
            dataIndex: 'insureSum'
           },
		   {
            title: '保险品种',
            align:"center",
            dataIndex: 'insureType'
           },
		   {
            title: '公司代码',
            align:"center",
            dataIndex: 'insurerCode'
           },
		   {
            title: '公司名称',
            align:"center",
            dataIndex: 'insurerName'
           },
		   {
            title: '是否变更',
            align:"center",
            dataIndex: 'isChange'
           },
		   {
            title: '是否核保',
            align:"center",
            dataIndex: 'isCheck'
           },
		   {
            title: '是否评估',
            align:"center",
            dataIndex: 'isEval'
           },
		   {
            title: '是否登记',
            align:"center",
            dataIndex: 'isGuaranty'
           },
		   {
            title: '是否保险',
            align:"center",
            dataIndex: 'isInsure'
           },
		   {
            title: '是否监管',
            align:"center",
            dataIndex: 'isMonitor'
           },
		   {
            title: '是否公正',
            align:"center",
            dataIndex: 'isNotary'
           },
		   {
            title: '权属情况,他人质权',
            align:"center",
            dataIndex: 'isOtherSignee'
           },
		   {
            title: '登记证入库',
            align:"center",
            dataIndex: 'isRegister'
           },
		   {
            title: '是否租赁',
            align:"center",
            dataIndex: 'isTenancy'
           },
		   {
            title: '抵押期限质押期限',
            align:"center",
            dataIndex: 'maturity'
           },
		   {
            title: '监管单位名称',
            align:"center",
            dataIndex: 'monitorDeptName'
           },
		   {
            title: '监管描述',
            align:"center",
            dataIndex: 'monitorDesc'
           },
		   {
            title: '监管编号',
            align:"center",
            dataIndex: 'monitorNo'
           },
		   {
            title: '公证人',
            align:"center",
            dataIndex: 'notary'
           },
		   {
            title: '公正日期',
            align:"center",
            dataIndex: 'notaryDate'
           },
		   {
            title: '公正机构',
            align:"center",
            dataIndex: 'notaryOrg'
           },
		   {
            title: '其它约定',
            align:"center",
            dataIndex: 'otherAssumpsit'
           },
		   {
            title: '权属所有人编号',
            align:"center",
            dataIndex: 'othermanId'
           },
		   {
            title: '注销日期',
            align:"center",
            dataIndex: 'outputDate'
           },
		   {
            title: '缴款开始日期',
            align:"center",
            dataIndex: 'payBeginDate'
           },
		   {
            title: '缴款结束日',
            align:"center",
            dataIndex: 'payEndDate'
           },
		   {
            title: '缴款方',
            align:"center",
            dataIndex: 'payMethod'
           },
		   {
            title: '缴款期限',
            align:"center",
            dataIndex: 'payTerm'
           },
		   {
            title: '投保人',
            align:"center",
            dataIndex: 'policyHolder'
           },
		   {
            title: '占有份额',
            align:"center",
            dataIndex: 'possessRate'
           },
		   {
            title: '开始时间,买入日期,起始日期',
            align:"center",
            dataIndex: 'purchaseDate'
           },
		   {
            title: '登记金额',
            align:"center",
            dataIndex: 'registerValue'
           },
		   {
            title: '暂末用',
            align:"center",
            dataIndex: 'relativeContract'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '出质人名称',
            align:"center",
            dataIndex: 'signeeName'
           },
		   {
            title: '抵押方式',
            align:"center",
            dataIndex: 'signeeType'
           },
		   {
            title: '担保关系',
            align:"center",
            dataIndex: 'sureRelation'
           },
		   {
            title: '担保保证期限',
            align:"center",
            dataIndex: 'suretyTerm'
           },
		   {
            title: '每期缴款金额',
            align:"center",
            dataIndex: 'termPaySum'
           },
		   {
            title: '录入操作员',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '已使用金额',
            align:"center",
            dataIndex: 'vouchValue'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '风险预警比例',
            align:"center",
            dataIndex: 'forecastRiskRatio'
           },
		   {
            title: '抵质押方式1',
            align:"center",
            dataIndex: 'guarantyDetail1'
           },
		   {
            title: '抵质押方式2',
            align:"center",
            dataIndex: 'guarantyDetail2'
           },
		   {
            title: '争议解决方式',
            align:"center",
            dataIndex: 'jjfs'
           },
		   {
            title: '仲裁机构全称',
            align:"center",
            dataIndex: 'zcjg'
           },
		   {
            title: '其他事项',
            align:"center",
            dataIndex: 'qtsx'
           },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'qyrq'
           },
		   {
            title: '签约地点',
            align:"center",
            dataIndex: 'qydd'
           },
		   {
            title: '合同份数',
            align:"center",
            dataIndex: 'fs'
           },
		   {
            title: '持票人,收益人,受益人',
            align:"center",
            dataIndex: 'beneficiary'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: '评估机构资质证结止日',
            align:"center",
            dataIndex: 'certificateEnddate'
           },
		   {
            title: '描述',
            align:"center",
            dataIndex: 'checkAssureDesc'
           },
		   {
            title: '核保人编号',
            align:"center",
            dataIndex: 'checkAssureId'
           },
		   {
            title: '变现能力',
            align:"center",
            dataIndex: 'chgCashAble'
           },
		   {
            title: '评估价格,质押物金额',
            align:"center",
            dataIndex: 'confirmValue'
           },
		   {
            title: '抵押合同号',
            align:"center",
            dataIndex: 'contractNo'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '登记证存放地',
            align:"center",
            dataIndex: 'depositary'
           },
		   {
            title: '出质人现地址',
            align:"center",
            dataIndex: 'describe1'
           },
		   {
            title: '出质人电话',
            align:"center",
            dataIndex: 'describe2'
           },
		   {
            title: '委托书编号',
            align:"center",
            dataIndex: 'describe3'
           },
		   {
            title: '委托人',
            align:"center",
            dataIndex: 'describe4'
           },
		   {
            title: '受托人',
            align:"center",
            dataIndex: 'describe5'
           },
		   {
            title: '委托日期',
            align:"center",
            dataIndex: 'describe6'
           },
		   {
            title: '内容描述',
            align:"center",
            dataIndex: 'describe7'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'describe8'
           },
		   {
            title: '评估编号',
            align:"center",
            dataIndex: 'evalCardNo'
           },
		   {
            title: '评估时间',
            align:"center",
            dataIndex: 'evalDate'
           },
		   {
            title: '评估方式',
            align:"center",
            dataIndex: 'evalMethod'
           },
		   {
            title: '评估机构',
            align:"center",
            dataIndex: 'evalName'
           },
		   {
            title: '抵押物价值,评估净值,质物价值',
            align:"center",
            dataIndex: 'evalNetValue'
           },
		   {
            title: '评估机构代码',
            align:"center",
            dataIndex: 'evalOrgId'
           },
		   {
            title: '评估机构名称',
            align:"center",
            dataIndex: 'evalOrgName'
           },
		   {
            title: '评估有效期',
            align:"center",
            dataIndex: 'evalTerm'
           },
		   {
            title: '认定价值',
            align:"center",
            dataIndex: 'evalValue'
           },
		   {
            title: '评估机构资质',
            align:"center",
            dataIndex: 'evalorgLevel'
           },
		   {
            title: '解除担保时间',
            align:"center",
            dataIndex: 'freeSureDate'
           },
		   {
            title: '是否冻结',
            align:"center",
            dataIndex: 'freezed'
           },
		   {
            title: '担保物数量',
            align:"center",
            dataIndex: 'guarantyAmount'
           },
		   {
            title: '物品性质',
            align:"center",
            dataIndex: 'guarantyAttribute'
           },
		   {
            title: '抵/质押代码',
            align:"center",
            dataIndex: 'guarantyCode'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'guarantyCurrency'
           },
		   {
            title: '担保物简述',
            align:"center",
            dataIndex: 'guarantyDescribe'
           },
		   {
            title: '流水编号',
            align:"center",
            dataIndex: 'guarantyDetailId'
           },
		   {
            title: '暂末用',
            align:"center",
            dataIndex: 'guarantyId'
           },
		   {
            title: '存放地点',
            align:"center",
            dataIndex: 'guarantyLocation'
           },
		   {
            title: '抵押物名称,质物名称,质押物名称',
            align:"center",
            dataIndex: 'guarantyName'
           },
		   {
            title: '公证书编号',
            align:"center",
            dataIndex: 'guarantyNdNo'
           },
		   {
            title: '抵押物编号,质押物编号',
            align:"center",
            dataIndex: 'guarantyNo'
           },
		   {
            title: '抵押率,质押率,担保率,折扣率',
            align:"center",
            dataIndex: 'guarantyRate'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'guarantyRegDate'
           },
		   {
            title: '登记编号',
            align:"center",
            dataIndex: 'guarantyRegNo'
           },
		   {
            title: '登记机构',
            align:"center",
            dataIndex: 'guarantyRegOrg'
           },
		   {
            title: '抵押物类型',
            align:"center",
            dataIndex: 'guarantySort'
           },
		   {
            title: '暂末用',
            align:"center",
            dataIndex: 'guarantyStatus'
           },
		   {
            title: '抵/质押期限',
            align:"center",
            dataIndex: 'guarantyTerm'
           },
		   {
            title: '账面价值',
            align:"center",
            dataIndex: 'guarantyTxtSum'
           },
		   {
            title: '抵押物种类,质物种类',
            align:"center",
            dataIndex: 'guarantyType'
           },
		   {
            title: '担保总价值',
            align:"center",
            dataIndex: 'guarantyValue'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'guarantyWoDate'
           },
		   {
            title: '抵押期限,质押期限',
            align:"center",
            dataIndex: 'holdTerm'
           },
		   {
            title: '抵押金额,质物金额',
            align:"center",
            dataIndex: 'implValue'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '抵质押人类型',
            align:"center",
            dataIndex: 'signeeCustType'
           },
		   {
            title: '通知书号',
            align:"center",
            dataIndex: 'sid'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'flag'
           },
		   {
            title: '已出库金额',
            align:"center",
            dataIndex: 'outputValue'
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
            title: '加载时间',
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
          list: "/dyzywhtxx/dyzywhtxx/list",
          delete: "/dyzywhtxx/dyzywhtxx/delete",
          deleteBatch: "/dyzywhtxx/dyzywhtxx/deleteBatch",
          exportXlsUrl: "dyzywhtxx/dyzywhtxx/exportXls",
          importExcelUrl: "dyzywhtxx/dyzywhtxx/importExcel",
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