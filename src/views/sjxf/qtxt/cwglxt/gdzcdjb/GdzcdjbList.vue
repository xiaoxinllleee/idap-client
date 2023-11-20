<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资产编号">
              <a-input placeholder="请输入资产编号" v-model="queryParam.capNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="源资产编号">
              <a-input placeholder="请输入源资产编号" v-model="queryParam.oCapNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡片序号">
              <a-input placeholder="请输入卡片序号" v-model="queryParam.acSeqn"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <a-input placeholder="请输入所属机构" v-model="queryParam.opnBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资产名称">
              <a-input placeholder="请输入资产名称" v-model="queryParam.capName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="登记部门">
              <a-input placeholder="请输入登记部门" v-model="queryParam.regDepNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员号">
              <a-input placeholder="请输入操作员号" v-model="queryParam.tel"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资产账号">
              <a-input placeholder="请输入资产账号" v-model="queryParam.inAcNo"></a-input>
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
     <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('固定资产登记簿')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
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
     <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
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
        :scroll="{x:14300}"
        @change="handleTableChange">

      <!--  <span slot="action" slot-scope="text, record">
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
    <gdzcdjb-modal ref="modalForm" @ok="modalFormOk"></gdzcdjb-modal>
  </a-card>
</template>

<script>
  import GdzcdjbModal from './modules/GdzcdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GdzcdjbList",
    mixins:[JeecgListMixin],
    components: {
      GdzcdjbModal
    },
    data () {
      return {
        description: '固定资产登记簿管理页面',
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
            title: '资产编号',
            align:"center",
            dataIndex: 'capNo'
           },
		   {
            title: '源资产编号',
            align:"center",
            dataIndex: 'oCapNo'
           },
		   {
            title: '卡片序号',
            align:"center",
            dataIndex: 'acSeqn'
           },
		   {
            title: '资产性质',
            align:"center",
            dataIndex: 'captype'
           },
		   {
            title: '资产名称',
            align:"center",
            dataIndex: 'capName'
           },
		   {
            title: '取得方式',
            align:"center",
            dataIndex: 'rootIn'
           },
		   {
            title: '单价',
            align:"center",
            dataIndex: 'price'
           },
		   {
            title: '入账日期',
            align:"center",
            dataIndex: 'openDate'
           },
		   {
            title: '登记部门',
            align:"center",
            dataIndex: 'regDepNo'
           },
		   {
            title: '资产种类',
            align:"center",
            dataIndex: 'capCode'
           },
		   {
            title: '资产子类',
            align:"center",
            dataIndex: 'subCapCode'
           },
		   {
            title: '品牌型号',
            align:"center",
            dataIndex: 'chara'
           },
		   {
            title: '单位',
            align:"center",
            dataIndex: 'unit'
           },
		   {
            title: '数量',
            align:"center",
            dataIndex: 'totnum'
           },
		   {
            title: '原值',
            align:"center",
            dataIndex: 'cost'
           },
		   {
            title: '折旧后余额（净值）或称账面价值',
            align:"center",
            dataIndex: 'depBal'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'depSts'
           },
		   {
            title: '折旧方式',
            align:"center",
            dataIndex: 'depMode'
           },
		   {
            title: '净残值率(%)',
            align:"center",
            dataIndex: 'leaveRate'
           },
		   {
            title: '实际利率(%)',
            align:"center",
            dataIndex: 'actRate'
           },
		   {
            title: '分摊方式',
            align:"center",
            dataIndex: 'proMode'
           },
		   {
            title: '折旧周期',
            align:"center",
            dataIndex: 'depCyc'
           },
		   {
            title: '折旧期限（月）',
            align:"center",
            dataIndex: 'depTime'
           },
		   {
            title: '已使用月数（月）',
            align:"center",
            dataIndex: 'useTime'
           },
		   {
            title: '已折旧次数',
            align:"center",
            dataIndex: 'afDepCnt'
           },
		   {
            title: '总工作量',
            align:"center",
            dataIndex: 'tWorkAmt'
           },
		   {
            title: '本期工作量',
            align:"center",
            dataIndex: 'workTime'
           },
		   {
            title: '折旧率',
            align:"center",
            dataIndex: 'depRate'
           },
		   {
            title: '存放地点（座落地）',
            align:"center",
            dataIndex: 'addr'
           },
		   {
            title: '资产使用状况',
            align:"center",
            dataIndex: 'capBrf'
           },
		   {
            title: '上次折旧额',
            align:"center",
            dataIndex: 'evedepamt'
           },
		   {
            title: '土地使用税上次计提日',
            align:"center",
            dataIndex: 'lstDate'
           },
		   {
            title: '交易笔数',
            align:"center",
            dataIndex: 'tdCnt'
           },
		   {
            title: '减值金额（总额）',
            align:"center",
            dataIndex: 'devalue'
           },
		   {
            title: '操作员号',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '所属机构',
            align:"center",
            dataIndex: 'opnBrNo'
           },
		   {
            title: '市场价格',
            align:"center",
            dataIndex: 'marval'
           },
		   {
            title: '评估日期',
            align:"center",
            dataIndex: 'evaDate'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '计量日期',
            align:"center",
            dataIndex: 'pubDate'
           },
		   {
            title: '公允价值',
            align:"center",
            dataIndex: 'pubBal'
           },
		   {
            title: '计量方式',
            align:"center",
            dataIndex: 'comType'
           },
		   {
            title: '租赁开始日期',
            align:"center",
            dataIndex: 'charterDate'
           },
		   {
            title: '房产税上次计提日期',
            align:"center",
            dataIndex: 'turnDate'
           },
		   {
            title: '处置日期',
            align:"center",
            dataIndex: 'dealDate'
           },
		   {
            title: '处置金额',
            align:"center",
            dataIndex: 'dealAmt'
           },
		   {
            title: '处置费用',
            align:"center",
            dataIndex: 'dealFee'
           },
		   {
            title: '转入资本公积金金额',
            align:"center",
            dataIndex: 'zrZbgjjBal'
           },
		   {
            title: '在建工程卡片号',
            align:"center",
            dataIndex: 'projectNo'
           },
		   {
            title: '在建工程细分的',
            align:"center",
            dataIndex: 'partNo'
           },
		   {
            title: '维护费用',
            align:"center",
            dataIndex: 'prepareFee'
           },
		   {
            title: '分期付款类型',
            align:"center",
            dataIndex: 'installType'
           },
		   {
            title: '供应单位',
            align:"center",
            dataIndex: 'sale'
           },
		   {
            title: '启用日期',
            align:"center",
            dataIndex: 'useDate'
           },
		   {
            title: '使用部门',
            align:"center",
            dataIndex: 'usePart'
           },
		   {
            title: '净额=残值',
            align:"center",
            dataIndex: 'leaveBal'
           },
		   {
            title: '本期折旧额',
            align:"center",
            dataIndex: 'curDepValue'
           },
		   {
            title: '上期折旧额',
            align:"center",
            dataIndex: 'lcurDepValue'
           },
		   {
            title: '固定资产年初原值',
            align:"center",
            dataIndex: 'btAvbal'
           },
		   {
            title: '期初原值',
            align:"center",
            dataIndex: 'qcAvbal'
           },
		   {
            title: '本年原值累计增加',
            align:"center",
            dataIndex: 'yAddAvbal'
           },
		   {
            title: '期间原值累计增加',
            align:"center",
            dataIndex: 'termAddAvbal'
           },
		   {
            title: '本年原值累计减少',
            align:"center",
            dataIndex: 'yDecAvbal'
           },
		   {
            title: '期间原值累计减少',
            align:"center",
            dataIndex: 'termDecAvbal'
           },
		   {
            title: '年初累计折旧余额',
            align:"center",
            dataIndex: 'yDepBal'
           },
		   {
            title: '期初累计折旧余额',
            align:"center",
            dataIndex: 'termDepBal'
           },
		   {
            title: '本年累计折旧减少',
            align:"center",
            dataIndex: 'yDepDec'
           },
		   {
            title: '期间累计折旧减少',
            align:"center",
            dataIndex: 'termDepDec'
           },
		   {
            title: '本年累计折旧总额',
            align:"center",
            dataIndex: 'yDepamt'
           },
		   {
            title: '是否房地合一',
            align:"center",
            dataIndex: 'blUnity'
           },
		   {
            title: '关联无形资产编号',
            align:"center",
            dataIndex: 'intCapNo'
           },
		   {
            title: '资产账号',
            align:"center",
            dataIndex: 'inAcNo'
           },
		   {
            title: '记账标志',
            align:"center",
            dataIndex: 'jzFlag'
           },
		   {
            title: '上次折旧日期',
            align:"center",
            dataIndex: 'depDate'
           },
		   {
            title: '土地应缴税额级别',
            align:"center",
            dataIndex: 'payTaxInd'
           },
		   {
            title: '应缴税额',
            align:"center",
            dataIndex: 'payTax'
           },
		   {
            title: '附件地址',
            align:"center",
            dataIndex: 'attachAddr'
           },
		   {
            title: '土地面积',
            align:"center",
            dataIndex: 'buildArea'
           },
		   {
            title: '保管人',
            align:"center",
            dataIndex: 'manager'
           },
		   {
            title: '处置数量',
            align:"center",
            dataIndex: 'dealCnt'
           },
		   {
            title: '处置原因',
            align:"center",
            dataIndex: 'dealBrf'
           },
		   {
            title: '资产分类',
            align:"center",
            dataIndex: 'capKind'
           },
		   {
            title: '土地位置',
            align:"center",
            dataIndex: 'landPosition'
           },
		   {
            title: '土地权证编号',
            align:"center",
            dataIndex: 'landCardno'
           },
		   {
            title: '用地性质',
            align:"center",
            dataIndex: 'landUsekind'
           },
		   {
            title: '土地取得日期',
            align:"center",
            dataIndex: 'landGetdate'
           },
		   {
            title: '土地到期日期',
            align:"center",
            dataIndex: 'landExpdate'
           },
		   {
            title: '结构形式',
            align:"center",
            dataIndex: 'archStruct'
           },
		   {
            title: '建筑面积',
            align:"center",
            dataIndex: 'archArea'
           },
		   {
            title: '机具设备号',
            align:"center",
            dataIndex: 'machineNo'
           },
		   {
            title: '车辆号',
            align:"center",
            dataIndex: 'carNo'
           },
		   {
            title: '房屋应缴税额级别',
            align:"center",
            dataIndex: 'payTaxLvl'
           },
		   {
            title: '清理余额',
            align:"center",
            dataIndex: 'qlAmt'
           },
		   {
            title: '增加批准文号',
            align:"center",
            dataIndex: 'authNo'
           },
		   {
            title: '土地权证编号',
            align:"center",
            dataIndex: 'buildCardno'
           },
		   {
            title: '用途',
            align:"center",
            dataIndex: 'useKind'
           },
		   {
            title: '发票号码',
            align:"center",
            dataIndex: 'fpbh'
           },
		   {
            title: '条形码',
            align:"center",
            dataIndex: 'txm'
           },
		   {
            title: '盘点状态',
            align:"center",
            dataIndex: 'chkSts'
           },
		   {
            title: '盘点确定日期',
            align:"center",
            dataIndex: 'chkSDate'
           },
		   {
            title: '盘点机构',
            align:"center",
            dataIndex: 'chkBrNo'
           },
		   {
            title: '盘点人描述',
            align:"center",
            dataIndex: 'chkTel'
           },
		   {
            title: '盘点日期',
            align:"center",
            dataIndex: 'chkDate'
           },
		   {
            title: '政府补助编号',
            align:"center",
            dataIndex: 'grantNo'
           },
		   {
            title: '事后确认事项号',
            align:"center",
            dataIndex: 'cfmAppNo'
           },
		   {
            title: '事后确认子序号',
            align:"center",
            dataIndex: 'cfmAppNoSeq'
           },
		   {
            title: '买价',
            align:"center",
            dataIndex: 'payAmt'
           },
		   {
            title: '安装费',
            align:"center",
            dataIndex: 'installAmt'
           },
		   {
            title: '税费',
            align:"center",
            dataIndex: 'taxAmt'
           },
		   {
            title: '运费',
            align:"center",
            dataIndex: 'transportAmt'
           },
		   {
            title: '其他费用',
            align:"center",
            dataIndex: 'otherAmt'
           },
		   {
            title: '使用人',
            align:"center",
            dataIndex: 'usePerson'
           },
		   {
            title: '购置部门',
            align:"center",
            dataIndex: 'payDepNo'
           },
		   {
            title: '购置人',
            align:"center",
            dataIndex: 'payPerson'
           },
		   {
            title: '产权证号',
            align:"center",
            dataIndex: 'propertyNo'
           },
		   {
            title: '发动机号',
            align:"center",
            dataIndex: 'engineNo'
           },
		   {
            title: '车架号码',
            align:"center",
            dataIndex: 'frameNo'
           },
		   {
            title: '立项审批编号',
            align:"center",
            dataIndex: 'projectAppNo'
           },
		   {
            title: '申请编号',
            align:"center",
            dataIndex: 'appNo'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'suppNo'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'suppName'
           },
		   {
            title: '合同编号',
            align:"center",
            dataIndex: 'pactNo'
           },
		   {
            title: '预付款编号',
            align:"center",
            dataIndex: 'advanceNo'
           },
		   {
            title: '预付款金额',
            align:"center",
            dataIndex: 'advanceAmt'
           },
		   {
            title: '当前市场公允价值',
            align:"center",
            dataIndex: 'currPubBal'
           },
		   {
            title: '租金支付总金额',
            align:"center",
            dataIndex: 'rentAmt'
           },
		   {
            title: '未确认融资费用',
            align:"center",
            dataIndex: 'unrecognizedBal'
           },
		   {
            title: '租赁期限',
            align:"center",
            dataIndex: 'rentTime'
           },
		   {
            title: '折现利率',
            align:"center",
            dataIndex: 'cashRate'
           },
		   {
            title: '股东号',
            align:"center",
            dataIndex: 'shareholderNo'
           },
		   {
            title: '入股股数',
            align:"center",
            dataIndex: 'shareSize'
           },
		   {
            title: '每股票面价格',
            align:"center",
            dataIndex: 'sharePrice'
           },
		   {
            title: '资本溢价金额',
            align:"center",
            dataIndex: 'premiumBal'
           },
		   {
            title: '捐赠单位/个人',
            align:"center",
            dataIndex: 'presentName'
           },
		   {
            title: '捐赠单位/事由',
            align:"center",
            dataIndex: 'presentBrf'
           },
		   {
            title: '盘盈时间',
            align:"center",
            dataIndex: 'gainsDate'
           },
		   {
            title: '低值易耗品类别',
            align:"center",
            dataIndex: 'gainsNo'
           },
		   {
            title: '盘点经办人',
            align:"center",
            dataIndex: 'gainsName'
           },
		   {
            title: '盘盈确认审批编号',
            align:"center",
            dataIndex: 'gainsAppNo'
           },
		   {
            title: '资产状况',
            align:"center",
            dataIndex: 'useSts'
           },
		   {
            title: '保证金金额',
            align:"center",
            dataIndex: 'marginAmt'
           },
		   {
            title: '产品号',
            align:"center",
            dataIndex: 'prdtNo'
           },
		   {
            title: '业务编码',
            align:"center",
            dataIndex: 'ywNo'
           },
		   {
            title: '财务流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txDate'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'expDate'
           },
		   {
            title: '初始取得资产编号',
            align:"center",
            dataIndex: 'srcCapNo'
           },
		   {
            title: '初始取得资产来源',
            align:"center",
            dataIndex: 'oRootIn'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '管理人',
            align:"center",
            dataIndex: 'manPart'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '数据结束日期',
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
          list: "/gdzcdjb/gdzcdjb/list",
          delete: "/gdzcdjb/gdzcdjb/delete",
          deleteBatch: "/gdzcdjb/gdzcdjb/deleteBatch",
          exportXlsUrl: "gdzcdjb/gdzcdjb/exportXls",
          importExcelUrl: "gdzcdjb/gdzcdjb/importExcel",
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