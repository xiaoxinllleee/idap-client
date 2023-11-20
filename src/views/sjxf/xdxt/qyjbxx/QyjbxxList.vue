<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <a-input placeholder="请输入机构号" v-model="queryParam.deptId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人ID">
              <a-input placeholder="请输入法人ID" v-model="queryParam.corpId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主键流水号">
              <a-input placeholder="请输入主键流水号" v-model="queryParam.entInfoId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户许可证号">
              <a-input placeholder="请输入开户许可证号" v-model="queryParam.openLicense"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员号">
              <a-input placeholder="请输入操作员号" v-model="queryParam.userId"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业基本信息')">导出</a-button>
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
        :scroll="{x:14300}"
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
    <qyjbxx-modal ref="modalForm" @ok="modalFormOk"></qyjbxx-modal>
  </a-card>
</template>

<script>
  import QyjbxxModal from './modules/QyjbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "QyjbxxList",
    mixins:[JeecgListMixin],
    components: {
      QyjbxxModal
    },
    data () {
      return {
        description: '企业基本信息管理页面',
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
            title: '是否与政府合作',
            align:"center",
            dataIndex: 'budgetType'
           },
		   {
            title: '主管部门',
            align:"center",
            dataIndex: 'changeDepartment'
           },
		   {
            title: '法人ID',
            align:"center",
            dataIndex: 'corpId'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '担保金额销售额',
            align:"center",
            dataIndex: 'dbValue'
           },
		   {
            title: '描述1',
            align:"center",
            dataIndex: 'describe1'
           },
		   {
            title: '描述2',
            align:"center",
            dataIndex: 'describe2'
           },
		   {
            title: '描述3(担保机构经营许可证号)',
            align:"center",
            dataIndex: 'describe3'
           },
		   {
            title: '财务部联系方式',
            align:"center",
            dataIndex: 'describe4'
           },
		   {
            title: '企业所在地',
            align:"center",
            dataIndex: 'districtBelong'
           },
		   {
            title: '经济性质',
            align:"center",
            dataIndex: 'economyType'
           },
		   {
            title: '公司邮箱',
            align:"center",
            dataIndex: 'emailAddr'
           },
		   {
            title: '职工人数',
            align:"center",
            dataIndex: 'employeeNumber'
           },
		   {
            title: '主键流水号',
            align:"center",
            dataIndex: 'entInfoId'
           },
		   {
            title: '是否集团标志',
            align:"center",
            dataIndex: 'enterpriseBelong'
           },
		   {
            title: '财务主管',
            align:"center",
            dataIndex: 'financManger'
           },
		   {
            title: '报表类型',
            align:"center",
            dataIndex: 'financeBelong'
           },
		   {
            title: '报表时间间隔',
            align:"center",
            dataIndex: 'financeUpType'
           },
		   {
            title: '进出口资格',
            align:"center",
            dataIndex: 'hasIeRight'
           },
		   {
            title: '所属行业',
            align:"center",
            dataIndex: 'industryType'
           },
		   {
            title: '国标行业1',
            align:"center",
            dataIndex: 'industryType1'
           },
		   {
            title: '国标行业2',
            align:"center",
            dataIndex: 'industryType2'
           },
		   {
            title: '国标行业3',
            align:"center",
            dataIndex: 'industryType3'
           },
		   {
            title: '是否授权',
            align:"center",
            dataIndex: 'isAccredit'
           },
		   {
            title: '基本帐户开户行',
            align:"center",
            dataIndex: 'isBaseAccount'
           },
		   {
            title: '是否法人资格',
            align:"center",
            dataIndex: 'isCorp'
           },
		   {
            title: '是否担保企业',
            align:"center",
            dataIndex: 'isDb'
           },
		   {
            title: '董事会',
            align:"center",
            dataIndex: 'isDirectorate'
           },
		   {
            title: '是否我行股东',
            align:"center",
            dataIndex: 'isSh'
           },
		   {
            title: '法人担任职务',
            align:"center",
            dataIndex: 'juriDuty'
           },
		   {
            title: '法人是否我行高管',
            align:"center",
            dataIndex: 'juriIsHighManager'
           },
		   {
            title: '法人联系电话',
            align:"center",
            dataIndex: 'juriPhone'
           },
		   {
            title: '法律责任形式',
            align:"center",
            dataIndex: 'legalDutyType'
           },
		   {
            title: '是否上市公司',
            align:"center",
            dataIndex: 'listingCorpOrNot'
           },
		   {
            title: '经营范围及主要产品',
            align:"center",
            dataIndex: 'mainProduction'
           },
		   {
            title: '市场前景',
            align:"center",
            dataIndex: 'marketForeground'
           },
		   {
            title: '高新技术企业',
            align:"center",
            dataIndex: 'newTechCorpOrNot'
           },
		   {
            title: '办公地址',
            align:"center",
            dataIndex: 'officeAddr'
           },
		   {
            title: '传真号码',
            align:"center",
            dataIndex: 'officeTax'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'officeTel'
           },
		   {
            title: '邮政编码',
            align:"center",
            dataIndex: 'officeZip'
           },
		   {
            title: '开户许可证号',
            align:"center",
            dataIndex: 'openLicense'
           },
		   {
            title: '组织形式',
            align:"center",
            dataIndex: 'orgType'
           },
		   {
            title: '实收资本',
            align:"center",
            dataIndex: 'paicalUpCaptial'
           },
		   {
            title: '实收资本币种',
            align:"center",
            dataIndex: 'pcCurrency'
           },
		   {
            title: '注册资本币种',
            align:"center",
            dataIndex: 'rcCurrency'
           },
		   {
            title: '所在的行政区域代码',
            align:"center",
            dataIndex: 'regionCode'
           },
		   {
            title: '注册地址',
            align:"center",
            dataIndex: 'registerAddr'
           },
		   {
            title: '注册资本',
            align:"center",
            dataIndex: 'registerCaptial'
           },
		   {
            title: '离退休人数',
            align:"center",
            dataIndex: 'retireeNumber'
           },
		   {
            title: '主导产品',
            align:"center",
            dataIndex: 'saleMainProduct'
           },
		   {
            title: '销售情况',
            align:"center",
            dataIndex: 'saleThing'
           },
		   {
            title: '企业规模',
            align:"center",
            dataIndex: 'scopy'
           },
		   {
            title: '省联社所有制/商行性质分类',
            align:"center",
            dataIndex: 'slxHavSystem'
           },
		   {
            title: '省联社标准/商行行业分类',
            align:"center",
            dataIndex: 'slxStandard'
           },
		   {
            title: '技术人员人数',
            align:"center",
            dataIndex: 'technicianNumber'
           },
		   {
            title: '公司网站',
            align:"center",
            dataIndex: 'webAddr'
           },
		   {
            title: '资产总额',
            align:"center",
            dataIndex: 'zcValue'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '财务管理人员ID',
            align:"center",
            dataIndex: 'financMangerId'
           },
		   {
            title: '基本帐户开户行',
            align:"center",
            dataIndex: 'baseAccountBank'
           },
		   {
            title: '是否市辖区',
            align:"center",
            dataIndex: 'isCantonal'
           },
		   {
            title: '是否龙头企业',
            align:"center",
            dataIndex: 'isLongtou'
           },
		   {
            title: '龙头企业级别',
            align:"center",
            dataIndex: 'longtouJibie'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'deptId'
           },
		   {
            title: '操作员号',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '行业规模1',
            align:"center",
            dataIndex: 'scopy1'
           },
		   {
            title: '是否发送短信',
            align:"center",
            dataIndex: 'isSendMess'
           },
		   {
            title: '是否劳动密集性',
            align:"center",
            dataIndex: 'isWorkDense'
           },
		   {
            title: '公司类客户级别',
            align:"center",
            dataIndex: 'entCustClass'
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
          list: "/qyjbxx/qyjbxx/list",
          delete: "/qyjbxx/qyjbxx/delete",
          deleteBatch: "/qyjbxx/qyjbxx/deleteBatch",
          exportXlsUrl: "qyjbxx/qyjbxx/exportXls",
          importExcelUrl: "qyjbxx/qyjbxx/importExcel",
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