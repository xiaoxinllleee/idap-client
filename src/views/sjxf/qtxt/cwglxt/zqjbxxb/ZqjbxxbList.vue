<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="债券代码">
              <a-input placeholder="请输入债券代码" v-model="queryParam.bondNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="债券名称">
              <a-input placeholder="请输入债券名称" v-model="queryParam.bondName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人联社号">
              <a-input placeholder="请输入债券名称" v-model="queryParam.upBrNo"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('债券基本信息表')">导出</a-button>

    </div>

    <!-- table区域-begin -->
    <div>
   <!--   <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
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
        :scroll="{x:5430}"
        @change="handleTableChange">

       <!-- <span slot="action" slot-scope="text, record">
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
    <zqjbxxb-modal ref="modalForm" @ok="modalFormOk"></zqjbxxb-modal>
  </a-card>
</template>

<script>
  import ZqjbxxbModal from './modules/ZqjbxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZqjbxxbList",
    mixins:[JeecgListMixin],
    components: {
      ZqjbxxbModal
    },
    data () {
      return {
        description: '债券基本信息表管理页面',
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
            title: '评级机构',
            align:"center",
            dataIndex: 'ratingAgency'
          },
          {
            title: '托管机构',
            align:"center",
            dataIndex: 'trustee'
          },

		   {
            title: '债券代码',
            align:"center",
            dataIndex: 'bondNo'
           },
		   {
            title: '交易明细笔次',
            align:"center",
            dataIndex: 'txCnt'
           },
		   {
            title: '债券名称',
            align:"center",
            dataIndex: 'bondName'
           },
		   {
            title: '债券简称',
            align:"center",
            dataIndex: 'bondShortname'
           },
		   {
            title: '债券发行方组织机构代码证号',
            align:"center",
            dataIndex: 'ctpyNo'
           },
		   {
            title: '计划发行总额(元)',
            align:"center",
            dataIndex: 'planTotalAmt'
           },
		   {
            title: '实际发行总额(元)',
            align:"center",
            dataIndex: 'actualTotalAmt'
           },
		   {
            title: '发行价格(元/百元面值)',
            align:"center",
            dataIndex: 'bondPrice'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curNo'
           },
		   {
            title: '债券发行方种类',
            align:"center",
            dataIndex: 'bondProperty'
           },
		   {
            title: '债券子性质',
            align:"center",
            dataIndex: 'bondSubProperty'
           },
		   {
            title: '发行日期',
            align:"center",
            dataIndex: 'issueDate'
           },
		   {
            title: '发行起息日期',
            align:"center",
            dataIndex: 'fxQxDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'mtrDate'
           },
		   {
            title: '利率变动日期',
            align:"center",
            dataIndex: 'bdDate'
           },
		   {
            title: '债券期限(月)',
            align:"center",
            dataIndex: 'bondTerm'
           },
		   {
            title: '利率类型',
            align:"center",
            dataIndex: 'rateType'
           },
		   {
            title: '票面利率(%)',
            align:"center",
            dataIndex: 'cpnRate'
           },
		   {
            title: '变动前票面利率',
            align:"center",
            dataIndex: 'lCpnRate'
           },
		   {
            title: '付息方式',
            align:"center",
            dataIndex: 'intstType'
           },
		   {
            title: '付息周期',
            align:"center",
            dataIndex: 'intstPerd'
           },
		   {
            title: '计提利息周期',
            align:"center",
            dataIndex: 'intstCycle'
           },
		   {
            title: '日利率计算方式',
            align:"center",
            dataIndex: 'dateRateNum'
           },
		   {
            title: '计提利息方式',
            align:"center",
            dataIndex: 'jtType'
           },
		   {
            title: '计提利息子方式',
            align:"center",
            dataIndex: 'subJtType'
           },
		   {
            title: '五级分类结果',
            align:"center",
            dataIndex: 'lvlFive'
           },
		   {
            title: '债券评级',
            align:"center",
            dataIndex: 'bondRating'
           },

		   {
            title: '状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '上次起息日期',
            align:"center",
            dataIndex: 'lIcDate'
           },
		   {
            title: '本次起息日期',
            align:"center",
            dataIndex: 'icDate'
           },
		   {
            title: '下次付息日期',
            align:"center",
            dataIndex: 'fxDate'
           },
		   {
            title: '利率变动周期',
            align:"center",
            dataIndex: 'ratePerd'
           },
		   {
            title: '法人联社号',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '债券发行方子类',
            align:"center",
            dataIndex: 'categoryType'
           },
		   {
            title: '债券发行方名称',
            align:"center",
            dataIndex: 'issuerName'
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
		 /*  {
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
          list: "/zqjbxxb/zqjbxxb/list",
          delete: "/zqjbxxb/zqjbxxb/delete",
          deleteBatch: "/zqjbxxb/zqjbxxb/deleteBatch",
          exportXlsUrl: "zqjbxxb/zqjbxxb/exportXls",
          importExcelUrl: "zqjbxxb/zqjbxxb/importExcel",
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