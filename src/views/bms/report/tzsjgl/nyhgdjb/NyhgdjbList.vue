<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="序号">
              <a-input placeholder="请输入序号" v-model="queryParam.hx"></a-input>
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
            <a-form-item label="成交单编号">
              <a-input placeholder="请输入成交单编号" v-model="queryParam.cjdbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="回购方向">
              <a-input placeholder="请输入回购方向" v-model="queryParam.hgfx"></a-input>
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
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('宁远回购登记簿')">导出</a-button>
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
    <nyhgdjb-modal ref="modalForm" @ok="modalFormOk"></nyhgdjb-modal>
  </a-card>
</template>

<script>
  import NyhgdjbModal from './modules/NyhgdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "NyhgdjbList",
    mixins:[JeecgListMixin],
    components: {
      NyhgdjbModal
    },
    data () {
      return {
        description: '宁远回购登记簿管理页面',
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
            title: '序号',
            align:"center",
            dataIndex: 'hx'
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
            title: '成交单编号',
            align:"center",
            dataIndex: 'cjdbh'
           },
		   {
            title: '回购方向',
            align:"center",
            dataIndex: 'hgfx'
           },
		   {
            title: '交易对手方',
            align:"center",
            dataIndex: 'jydsf'
           },
		   {
            title: '交易对手类别',
            align:"center",
            dataIndex: 'jydslb'
           },
		   {
            title: '交易品种',
            align:"center",
            dataIndex: 'jypz'
           },
		   {
            title: '实际占款天数（天）',
            align:"center",
            dataIndex: 'sjzkts'
           },
		   {
            title: '回购利率（%）',
            align:"center",
            dataIndex: 'hgll'
           },
		   {
            title: '券面总额（万元）',
            align:"center",
            dataIndex: 'qmze'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'jyrq'
           },
		   {
            title: '交易金额（元）',
            align:"center",
            dataIndex: 'jyje'
           },
		   {
            title: '首次结算日',
            align:"center",
            dataIndex: 'scjsr'
           },
		   {
            title: '到期结算金额（元）',
            align:"center",
            dataIndex: 'dqjsje'
           },
		   {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts'
           },
		   {
            title: '到期结算日',
            align:"center",
            dataIndex: 'dqjsr'
           },
		   {
            title: '报表日期',
            align:"center",
            dataIndex: 'bbrq'
           },
		   {
            title: '应收/付利息金额',
            align:"center",
            dataIndex: 'ysflxje'
           },
		   {
            title: '累计计提利息（元）',
            align:"center",
            dataIndex: 'ljjtlx'
           },
		   {
            title: '累计结算金额（元）',
            align:"center",
            dataIndex: 'ljjsje'
           },
		   {
            title: '到期利息（元）',
            align:"center",
            dataIndex: 'dqlx'
           },
		   {
            title: '挂账本金（元）',
            align:"center",
            dataIndex: 'gzbj'
           },
		   {
            title: '挂账利息（元）',
            align:"center",
            dataIndex: 'gzlx'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '业务状况',
            align:"center",
            dataIndex: 'ywzk'
           },
		   {
            title: '用债券质押比例（%）',
            align:"center",
            dataIndex: 'yzqzybl'
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
          list: "/nyhgdjb/nyhgdjb/list",
          delete: "/nyhgdjb/nyhgdjb/delete",
          deleteBatch: "/nyhgdjb/nyhgdjb/deleteBatch",
          exportXlsUrl: "nyhgdjb/nyhgdjb/exportXls",
          importExcelUrl: "nyhgdjb/nyhgdjb/importExcel",
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