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
            <a-form-item label="资产名称">
              <a-input placeholder="请输入资产名称" v-model="queryParam.capName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="抵债协议编号">
              <a-input placeholder="请输入抵债协议编号" v-model="queryParam.pactNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <a-input placeholder="请输入所属机构" v-model="queryParam.dcDepNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="财务流水号">
              <a-input placeholder="请输入财务流水号" v-model="queryParam.traceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人联社号">
              <a-input placeholder="请输入法人联社号" v-model="queryParam.upBrNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('抵债资产登记簿')">导出</a-button>
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
        :scroll="{x:6430}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dzzcdjb-modal ref="modalForm" @ok="modalFormOk"></dzzcdjb-modal>
  </a-card>
</template>

<script>
  import DzzcdjbModal from './modules/DzzcdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DzzcdjbList",
    mixins:[JeecgListMixin],
    components: {
      DzzcdjbModal
    },
    data () {
      return {
        description: '抵债资产登记簿管理页面',
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
            title: '资产名称',
            align:"center",
            dataIndex: 'capName'
           },
		   {
            title: '抵债资产取得方式',
            align:"center",
            dataIndex: 'obtainType'
           },
		   {
            title: '抵债协议编号',
            align:"center",
            dataIndex: 'pactNo'
           },
		   {
            title: '抵债资产类别',
            align:"center",
            dataIndex: 'capType'
           },
		   {
            title: '所属机构',
            align:"center",
            dataIndex: 'dcDepNo'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '评估价值（公允价值）',
            align:"center",
            dataIndex: 'pubVal'
           },
		   {
            title: '补价金额',
            align:"center",
            dataIndex: 'fillAmt'
           },
		   {
            title: '营业税金',
            align:"center",
            dataIndex: 'taxAmt1'
           },
		   {
            title: '城市维护建设税',
            align:"center",
            dataIndex: 'taxAmt2'
           },
		   {
            title: '教育费附加',
            align:"center",
            dataIndex: 'taxAmt3'
           },
		   {
            title: '契税',
            align:"center",
            dataIndex: 'taxAmt4'
           },
		   {
            title: '印花税',
            align:"center",
            dataIndex: 'taxAmt5'
           },
		   {
            title: '其他税费',
            align:"center",
            dataIndex: 'taxAmt6'
           },
		   {
            title: '税费合计',
            align:"center",
            dataIndex: 'taxAmt'
           },
		   {
            title: '运费',
            align:"center",
            dataIndex: 'feeAmt1'
           },
		   {
            title: '其他费用',
            align:"center",
            dataIndex: 'feeAmt2'
           },
		   {
            title: '抵债资产入账价值',
            align:"center",
            dataIndex: 'bookVal'
           },
		   {
            title: '存放地点（座落地）',
            align:"center",
            dataIndex: 'location'
           },
		   {
            title: '保管方式',
            align:"center",
            dataIndex: 'mngeMode'
           },
		   {
            title: '管理部门',
            align:"center",
            dataIndex: 'mngerDepNo'
           },
		   {
            title: '管理人(职工号)',
            align:"center",
            dataIndex: 'mngerTlrno'
           },
		   {
            title: '接收日期',
            align:"center",
            dataIndex: 'obtainDate'
           },
		   {
            title: '接收方式',
            align:"center",
            dataIndex: 'obtainMode'
           },
		   {
            title: '产权状况',
            align:"center",
            dataIndex: 'property'
           },
		   {
            title: '资产发票号码',
            align:"center",
            dataIndex: 'billNo'
           },
		   {
            title: '结构形式',
            align:"center",
            dataIndex: 'structure'
           },
		   {
            title: '抵债建筑面积',
            align:"center",
            dataIndex: 'buildArea'
           },
		   {
            title: '产权证号',
            align:"center",
            dataIndex: 'no'
           },
		   {
            title: '土地纳税等级',
            align:"center",
            dataIndex: 'taxLvl'
           },
		   {
            title: '抵债土地面积',
            align:"center",
            dataIndex: 'landArea'
           },
		   {
            title: '土地使用证号',
            align:"center",
            dataIndex: 'no1'
           },
		   {
            title: '车牌号码',
            align:"center",
            dataIndex: 'no2'
           },
		   {
            title: '发动机号码',
            align:"center",
            dataIndex: 'no3'
           },
		   {
            title: '车架号码',
            align:"center",
            dataIndex: 'no4'
           },
		   {
            title: '抵债时行程数',
            align:"center",
            dataIndex: 'km'
           },
		   {
            title: '计量单位',
            align:"center",
            dataIndex: 'unit'
           },
		   {
            title: '数量',
            align:"center",
            dataIndex: 'count'
           },
		   {
            title: '购建（买）年份',
            align:"center",
            dataIndex: 'year'
           },
		   {
            title: '尚能使用年限',
            align:"center",
            dataIndex: 'years'
           },
		   {
            title: '预计处理变现日期',
            align:"center",
            dataIndex: 'months'
           },
		   {
            title: '备注说明',
            align:"center",
            dataIndex: 'filler'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '抵债资产账号',
            align:"center",
            dataIndex: 'acNo'
           },
		   {
            title: '处置日期',
            align:"center",
            dataIndex: 'czDate'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '记账日期',
            align:"center",
            dataIndex: 'jzDate'
           },
		   {
            title: '资产状况',
            align:"center",
            dataIndex: 'oCapNo'
           },
		   {
            title: '房产税上次计提日期',
            align:"center",
            dataIndex: 'ldateFcs'
           },
		   {
            title: '土地使用税上次计提日期',
            align:"center",
            dataIndex: 'ldateTds'
           },
		   {
            title: '是否房地合一',
            align:"center",
            dataIndex: 'blUnity'
           },
		   {
            title: '房地合一时关联的土地使用权编号',
            align:"center",
            dataIndex: 'intCapNo'
           },
		   {
            title: '登记日期',
            align:"center",
            dataIndex: 'regDate'
           },
		   {
            title: '登记操作员',
            align:"center",
            dataIndex: 'regTel'
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
            title: '使用人',
            align:"center",
            dataIndex: 'userPerson'
           },
		   {
            title: '使用部门',
            align:"center",
            dataIndex: 'usePart'
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
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '资产状况',
            align:"center",
            dataIndex: 'useSts'
           },
		   {
            title: '附件编号',
            align:"center",
            dataIndex: 'annexNo'
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
          list: "/dzzcdjb/dzzcdjb/list",
          delete: "/dzzcdjb/dzzcdjb/delete",
          deleteBatch: "/dzzcdjb/dzzcdjb/deleteBatch",
          exportXlsUrl: "dzzcdjb/dzzcdjb/exportXls",
          importExcelUrl: "dzzcdjb/dzzcdjb/importExcel",
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