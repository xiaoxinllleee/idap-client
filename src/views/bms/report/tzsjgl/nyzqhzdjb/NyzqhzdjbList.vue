<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="序号">
              <a-input placeholder="请输入序号" v-model="queryParam.xh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="申请编号">
              <a-input placeholder="请输入申请编号" v-model="queryParam.sqbh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="内部账号">
              <a-input placeholder="请输入内部账号" v-model="queryParam.nbzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="成交编号">
              <a-input placeholder="请输入成交编号" v-model="queryParam.cjbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="品种">
              <a-input placeholder="请输入品种" v-model="queryParam.pz"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('宁远债券汇总登记簿')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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
    <nyzqhzdjb-modal ref="modalForm" @ok="modalFormOk"></nyzqhzdjb-modal>
  </a-card>
</template>

<script>
  import NyzqhzdjbModal from './modules/NyzqhzdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "NyzqhzdjbList",
    mixins:[JeecgListMixin],
    components: {
      NyzqhzdjbModal
    },
    data () {
      return {
        description: '宁远债券汇总登记簿管理页面',
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
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq'
          },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
           },
		   {
            title: '申请编号',
            align:"center",
            dataIndex: 'sqbh'
           },
		   {
            title: '内部账号',
            align:"center",
            dataIndex: 'nbzh'
           },
		   {
            title: '成交编号',
            align:"center",
            dataIndex: 'cjbh'
           },
		   {
            title: '品种',
            align:"center",
            dataIndex: 'pz'
           },
		   {
            title: '债券（存单）代码',
            align:"center",
            dataIndex: 'zqcddm'
           },
		   {
            title: '债券（存单）简称',
            align:"center",
            dataIndex: 'zqcdjc'
           },
		   {
            title: '法行主体',
            align:"center",
            dataIndex: 'xfzt'
           },
		   {
            title: '是否含权',
            align:"center",
            dataIndex: 'sfhq'
           },
		   {
            title: '期限',
            align:"center",
            dataIndex: 'qx'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'qxr'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'dqr'
           },
		   {
            title: '到期',
            align:"center",
            dataIndex: 'dq'
           },
		   {
            title: '报表日期',
            align:"center",
            dataIndex: 'bbrq'
           },
		   {
            title: '天数',
            align:"center",
            dataIndex: 'ts'
           },
		   {
            title: '金额',
            align:"center",
            dataIndex: 'je'
           },
		   {
            title: '计息方式',
            align:"center",
            dataIndex: 'jxfs'
           },
		   {
            title: '结息方式',
            align:"center",
            dataIndex: 'jiexfs'
           },
		   {
            title: '买入时主体评级',
            align:"center",
            dataIndex: 'mrsztpj'
           },
		   {
            title: '买入时债项评级',
            align:"center",
            dataIndex: 'mrszxpj'
           },
		   {
            title: '购入日',
            align:"center",
            dataIndex: 'grr'
           },
		   {
            title: '券面总额（元）',
            align:"center",
            dataIndex: 'qmze'
           },
		   {
            title: '首次应计利息（元）',
            align:"center",
            dataIndex: 'scyjlx'
           },
		   {
            title: '初始购入全份（元/百元）',
            align:"center",
            dataIndex: 'csgrqf'
           },
		   {
            title: '初始购入净价（元/百元）',
            align:"center",
            dataIndex: 'csgrjj'
           },
		   {
            title: '持有至到期收益率（%）',
            align:"center",
            dataIndex: 'cyzdqsy'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'jylx'
           },
		   {
            title: '交易对手',
            align:"center",
            dataIndex: 'jyds'
           },
		   {
            title: '金融资产分类',
            align:"center",
            dataIndex: 'jrzcfl'
           },
		   {
            title: '账面余额',
            align:"center",
            dataIndex: 'zmye'
           },
		   {
            title: '账面价值',
            align:"center",
            dataIndex: 'zmjz'
           },
		   {
            title: '剩余面值',
            align:"center",
            dataIndex: 'symz'
           },
		   {
            title: '公允价值变动余额（元）',
            align:"center",
            dataIndex: 'gxjzbdye'
           },
		   {
            title: '利息调整余额（元）',
            align:"center",
            dataIndex: 'lxdzye'
           },
		   {
            title: '应收利息余额（元）',
            align:"center",
            dataIndex: 'yslxye'
           },
		   {
            title: '减值准备（元）',
            align:"center",
            dataIndex: 'jzzb'
           },
		   {
            title: '当期票面（%）',
            align:"center",
            dataIndex: 'dqpm'
           },
		   {
            title: '剩余年限',
            align:"center",
            dataIndex: 'synx'
           },
		   {
            title: '实时主体评级',
            align:"center",
            dataIndex: 'ssztpj'
           },
		   {
            title: '实时债项评级',
            align:"center",
            dataIndex: 'sszxpj'
           },
		   {
            title: '净价估值（元/百元）',
            align:"center",
            dataIndex: 'jjgz'
           },
		   {
            title: '估值市值',
            align:"center",
            dataIndex: 'gzsz'
           },
		   {
            title: '浮动盈亏（元）',
            align:"center",
            dataIndex: 'fdyk'
           },
		   {
            title: '浮动盈亏比例（%）',
            align:"center",
            dataIndex: 'fdykbl'
           },
		   {
            title: '部分卖出金额（元）',
            align:"center",
            dataIndex: 'bfmcje'
           },
		   {
            title: '部分卖出利息（元）',
            align:"center",
            dataIndex: 'bfmclx'
           },
		   {
            title: '累计结息金额（元）',
            align:"center",
            dataIndex: 'ljjxje'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'ywzt'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '特殊标识',
            align:"center",
            dataIndex: 'tsbs'
           },
		   {
            title: '投组',
            align:"center",
            dataIndex: 'tz'
           },
		   {
            title: '托管机构',
            align:"center",
            dataIndex: 'tgjg'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'jgh'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgmc'
           },
		   {
            title: '实收利息（元）',
            align:"center",
            dataIndex: 'sslx'
           },
		   {
            title: '资产等级',
            align:"center",
            dataIndex: 'zcdj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/nyzqhzdjb/nyzqhzdjb/list",
          delete: "/nyzqhzdjb/nyzqhzdjb/delete",
          deleteBatch: "/nyzqhzdjb/nyzqhzdjb/deleteBatch",
          exportXlsUrl: "nyzqhzdjb/nyzqhzdjb/exportXls",
          importExcelUrl: "nyzqhzdjb/nyzqhzdjb/importExcel",
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