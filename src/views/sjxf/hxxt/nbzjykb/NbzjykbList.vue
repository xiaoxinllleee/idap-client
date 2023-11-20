<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易机构">
<!--              <a-input placeholder="请输入数据日期" v-model="queryParam.brNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.brNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangejyrq" v-model="queryParam.trnDate"/>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入流水号" v-model="queryParam.jrnlNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="记录号">
              <a-input placeholder="请输入记录号" v-model="queryParam.recNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.trnCode"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('内部帐交易宽表')">导出</a-button>
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
        :scroll="{x:3430}"
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
    <nbzjykb-modal ref="modalForm" @ok="modalFormOk"></nbzjykb-modal>
  </a-card>
</template>

<script>
  import NbzjykbModal from './modules/NbzjykbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JEllipsis from '@comp/jeecg/JEllipsis'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "NbzjykbList",
    mixins:[JeecgListMixin],
    components: {
      NbzjykbModal,JEllipsis,JTreeSelect
    },
    data () {
      return {
        description: '内部帐交易宽表管理页面',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '账号名称',
            align:"center",
            dataIndex: 'acctName'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'tranType'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'stat'
           },
		   {
            title: '过账日期',
            align:"center",
            dataIndex: 'postDate'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'trnDate'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'trnCode'
           },
		   {
            title: '交易码名称',
            align:"center",
            dataIndex: 'trnName'
           },
		   {
            title: '现金总额',
            align:"center",
            dataIndex: 'cashTots'
           },
		   {
            title: '渠道类型',
            align:"center",
            dataIndex: 'channel'
           },
		   {
            title: '交易机构',
            align:"center",
            dataIndex: 'brNo'
           },
		   {
            title: '交易机构名称',
            align:"center",
            dataIndex: 'brName'
           },
		   {
            title: '交易柜员',
            align:"center",
            dataIndex: 'brTell'
           },
		   {
            title: '交易柜员名称',
            align:"center",
            dataIndex: 'brTellName'
           },
		   {
            title: '销账信息',
            align:"center",
            dataIndex: 'srnInfo'
           },
		   {
            title: '转账信息',
            align:"center",
            dataIndex: 'accountno'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amount'
           },
		   {
            title: '当前账户金额',
            align:"center",
            dataIndex: 'currentBalance'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'comments'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'jrnlNo'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'currency'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'trnTime'
           },
		   {
            title: '冲正标识',
            align:"center",
            dataIndex: 'correction'
           },
		   {
            title: '柜员类型',
            align:"center",
            dataIndex: 'empType'
           },
		   {
            title: '虚拟柜员对应的终端',
            align:"center",
            dataIndex: 'terminalId'
           },
		   {
            title: '记录号',
            align:"center",
            dataIndex: 'recNo'
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
          list: "/nbzjykb/nbzjykb/list",
          delete: "/nbzjykb/nbzjykb/delete",
          deleteBatch: "/nbzjykb/nbzjykb/deleteBatch",
          exportXlsUrl: "nbzjykb/nbzjykb/exportXls",
          importExcelUrl: "nbzjykb/nbzjykb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.trnDate;
        return filterObj(param);
      },
      onChangejyrq(value,dateString){
        let trnDateString=dateString
        this.queryParam.trnDate_begin=trnDateString[0]
        this.queryParam.trnDate_end=trnDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>