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
            <a-form-item label="同业客户类型">
              <a-input placeholder="请输入同业客户类型" v-model="queryParam.finaCustType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="金融机构代码">
              <a-input placeholder="请输入金融机构代码" v-model="queryParam.finaOrgCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系电话">
              <a-input placeholder="请输入联系电话" v-model="queryParam.tel"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易流水号">
              <a-input placeholder="请输入交易流水号" v-model="queryParam.txSeqNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('同业客户表')">导出</a-button>
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
        :scroll="{x: 3500}"
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
    <tykhb-modal ref="modalForm" @ok="modalFormOk"></tykhb-modal>
  </a-card>
</template>

<script>
  import TykhbModal from './modules/TykhbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "TykhbList",
    mixins:[JeecgListMixin],
    components: {
      TykhbModal
    },
    data () {
      return {
        description: '同业客户表管理页面',
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
            title: '同业客户类型',
            align:"center",
            dataIndex: 'finaCustType'
           },
		   {
            title: '行号',
            align:"center",
            dataIndex: 'bankNo'
           },
		   {
            title: '行名',
            align:"center",
            dataIndex: 'bankName'
           },
		   {
            title: '行别',
            align:"center",
            dataIndex: 'bankType'
           },
		   {
            title: '金融机构类型',
            align:"center",
            dataIndex: 'finaOrgType'
           },
		   {
            title: '金融许可证',
            align:"center",
            dataIndex: 'finaLicNo'
           },
		   {
            title: '金融机构代码',
            align:"center",
            dataIndex: 'finaOrgCode'
           },
		   {
            title: '法定代表人',
            align:"center",
            dataIndex: 'legalRepr'
           },
		   {
            title: '地区代码',
            align:"center",
            dataIndex: 'zoneCode'
           },
		   {
            title: '邮政编码',
            align:"center",
            dataIndex: 'zipCode'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'address'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '信用等级',
            align:"center",
            dataIndex: 'creditLevel'
           },
		   {
            title: '信用等级有效期',
            align:"center",
            dataIndex: 'creditLevelPeriod'
           },
		   {
            title: '现代支付系统行号',
            align:"center",
            dataIndex: 'modernPaySysNo'
           },
		   {
            title: '同城交换号',
            align:"center",
            dataIndex: 'exchangeNo'
           },
		   {
            title: 'SWIFT',
            align:"center",
            dataIndex: 'swift'
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
            title: '核心系统保存的银行证件',
            align:"center",
            dataIndex: 'coreBankIdentno'
           },
		   {
            title: '核心系统保存的字母编码',
            align:"center",
            dataIndex: 'coreAlaphaCode'
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
       //    {
       //      title: '操作',
       //      dataIndex: 'action',
       //      align:"center",
       //      scopedSlots: { customRender: 'action' },
       //    }
        ],
		url: {
          list: "/tykhb/tykhb/list",
          delete: "/tykhb/tykhb/delete",
          deleteBatch: "/tykhb/tykhb/deleteBatch",
          exportXlsUrl: "tykhb/tykhb/exportXls",
          importExcelUrl: "tykhb/tykhb/importExcel",
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