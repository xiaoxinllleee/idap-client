<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构客户类型">
              <a-input placeholder="请输入机构客户类型" v-model="queryParam.orgCustType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织机构代码">
              <a-input placeholder="请输入组织机构代码" v-model="queryParam.orgCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营业执照号码">
              <a-input placeholder="请输入营业执照号码" v-model="queryParam.busiLicNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法定代表人证件号码">
              <a-input placeholder="请输入法定代表人证件号码" v-model="queryParam.legalReprIdentNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法定代表人名称">
              <a-input placeholder="请输入法定代表人名称" v-model="queryParam.legalReprName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('机构客户表')">导出</a-button>
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
        :scroll="{x: 8000}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
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
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jgkhb-modal ref="modalForm" @ok="modalFormOk"></jgkhb-modal>
  </a-card>
</template>

<script>
  import JgkhbModal from './modules/JgkhbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "JgkhbList",
    mixins:[JeecgListMixin],
    components: {
      JgkhbModal
    },
    data () {
      return {
        description: '机构客户表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '删除标识',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '机构客户类型',
            align:"center",
            dataIndex: 'orgCustType'
           },
		   {
            title: '国家或地区代码',
            align:"center",
            dataIndex: 'nationCode'
           },
		   {
            title: '行政区划代码',
            align:"center",
            dataIndex: 'areaCode'
           },
		   {
            title: '组织机构类型',
            align:"center",
            dataIndex: 'orgType'
           },
		   {
            title: '组织机构代码',
            align:"center",
            dataIndex: 'orgCode'
           },
		   {
            title: '营业执照号码',
            align:"center",
            dataIndex: 'busiLicNo'
           },
		   {
            title: '行业分类（主营）',
            align:"center",
            dataIndex: 'mainIndustry'
           },
		   {
            title: '行业分类（副营）',
            align:"center",
            dataIndex: 'minorIndustry'
           },
		   {
            title: '产业划分',
            align:"center",
            dataIndex: 'industryDivision'
           },
		   {
            title: '企业性质',
            align:"center",
            dataIndex: 'entProperty'
           },
		   {
            title: '企业规模',
            align:"center",
            dataIndex: 'entScale'
           },
		   {
            title: '资产规模',
            align:"center",
            dataIndex: 'assetsScale'
           },
		   {
            title: '员工规模',
            align:"center",
            dataIndex: 'employeeScale'
           },
		   {
            title: '经济类型',
            align:"center",
            dataIndex: 'economicType'
           },
		   {
            title: '控股类型',
            align:"center",
            dataIndex: 'comHoldType'
           },
		   {
            title: '组织形式',
            align:"center",
            dataIndex: 'orgForm'
           },
		   {
            title: '投资主体',
            align:"center",
            dataIndex: 'investType'
           },
		   {
            title: '企业隶属',
            align:"center",
            dataIndex: 'entBelong'
           },
		   {
            title: '成立日期',
            align:"center",
            dataIndex: 'buildDate'
           },
		   {
            title: '主管部门',
            align:"center",
            dataIndex: 'superDept'
           },
		   {
            title: '主营业务',
            align:"center",
            dataIndex: 'mainBusiness'
           },
		   {
            title: '兼营业务',
            align:"center",
            dataIndex: 'minorBusiness'
           },
		   {
            title: '经营方式',
            align:"center",
            dataIndex: 'businessMode'
           },
		   {
            title: '开始营业时间',
            align:"center",
            dataIndex: 'busiStartDate'
           },
		   {
            title: '经费来源',
            align:"center",
            dataIndex: 'fundSource'
           },
		   {
            title: '经济区编码',
            align:"center",
            dataIndex: 'zoneCode'
           },
		   {
            title: '外汇许可证号码',
            align:"center",
            dataIndex: 'fexcPrmCode'
           },
		   {
            title: '产业化龙头企业级别',
            align:"center",
            dataIndex: 'topCorpLevel'
           },
		   {
            title: '特种经营标志',
            align:"center",
            dataIndex: 'comSpBusiness'
           },
		   {
            title: '特种经营许可证编号',
            align:"center",
            dataIndex: 'comSpLicNo'
           },
		   {
            title: '特种经营情况',
            align:"center",
            dataIndex: 'comSpDetail'
           },
		   {
            title: '特种许可证颁发机关',
            align:"center",
            dataIndex: 'comSpLicOrg'
           },
		   {
            title: '特种经营起始日期',
            align:"center",
            dataIndex: 'comSpStrDate'
           },
		   {
            title: '特种经营到期日期',
            align:"center",
            dataIndex: 'comSpEndDate'
           },
		   {
            title: '法定代表人名称',
            align:"center",
            dataIndex: 'legalReprName'
           },
		   {
            title: '法定代表人性别',
            align:"center",
            dataIndex: 'legalReprGender'
           },
		   {
            title: '法定代表人证件类型',
            align:"center",
            dataIndex: 'legalReprIdentType'
           },
		   {
            title: '法定代表人证件号码',
            align:"center",
            dataIndex: 'legalReprIdentNo'
           },
		   {
            title: '法定代表人联系电话',
            align:"center",
            dataIndex: 'legalReprTel'
           },
		   {
            title: '法定代表人户籍地址',
            align:"center",
            dataIndex: 'legalReprAddr'
           },
		   {
            title: '法定代表人所在国家（地区）',
            align:"center",
            dataIndex: 'legalReprNationCode'
           },
		   {
            title: '财务报表类型',
            align:"center",
            dataIndex: 'finRepType'
           },
		   {
            title: '总资产',
            align:"center",
            dataIndex: 'totalAssets'
           },
		   {
            title: '总负债',
            align:"center",
            dataIndex: 'totalDebt'
           },
		   {
            title: '年收入',
            align:"center",
            dataIndex: 'annualIncome'
           },
		   {
            title: '年利润',
            align:"center",
            dataIndex: 'annualProfit'
           },
		   {
            title: '通讯地址',
            align:"center",
            dataIndex: 'orgAddr'
           },
		   {
            title: '邮政编码',
            align:"center",
            dataIndex: 'orgZipcode'
           },
		   {
            title: '联系人',
            align:"center",
            dataIndex: 'orgCus'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'orgTel'
           },
		   {
            title: '传真号码',
            align:"center",
            dataIndex: 'orgFex'
           },
		   {
            title: '电子邮件地址',
            align:"center",
            dataIndex: 'orgEmail'
           },
		   {
            title: '主页',
            align:"center",
            dataIndex: 'orgHomepage'
           },
		   {
            title: '微博',
            align:"center",
            dataIndex: 'orgWeibo'
           },
		   {
            title: '微信',
            align:"center",
            dataIndex: 'orgWeixin'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remarks'
           },
		   {
            title: '最后更新系统',
            align:"center",
            dataIndex: 'lastUpdateSys'
           },
		   {
            title: '最后更新人',
            align:"center",
            dataIndex: 'lastUpdateUser'
           },
		   {
            title: '最后更新时间',
            align:"center",
            dataIndex: 'lastUpdateTm'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'txSeqNo'
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
		   // {
       //      title: '天入库表编号-对不同的表名唯一',
       //      align:"center",
       //      dataIndex: 'dtnum'
       //     },
		   // {
       //      title: 'dttime',
       //      align:"center",
       //      dataIndex: 'dttime'
       //     },
		   // {
       //      title: 'legalReprIdentExpDate',
       //      align:"center",
       //      dataIndex: 'legalReprIdentExpDate'
       //     },
       //    {
       //      title: '操作',
       //      dataIndex: 'action',
       //      align:"center",
       //      scopedSlots: { customRender: 'action' },
       //    }
        ],
		url: {
          list: "/jgkhb/jgkhb/list",
          delete: "/jgkhb/jgkhb/delete",
          deleteBatch: "/jgkhb/jgkhb/deleteBatch",
          exportXlsUrl: "jgkhb/jgkhb/exportXls",
          importExcelUrl: "jgkhb/jgkhb/importExcel",
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