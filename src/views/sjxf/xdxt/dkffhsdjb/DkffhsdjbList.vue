<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
<!--              <a-input placeholder="全部" v-model="queryParam.jgm"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.jgm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="标志">
              <a-input placeholder="请输入标志" v-model="queryParam.bz"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="五级分类">
              <a-input placeholder="请输入五级分类" v-model="queryParam.wjfl"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="四级分类">
              <a-input placeholder="请输入四级分类" v-model="queryParam.sjfl"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="凭证号码">
              <a-input placeholder="请输入凭证号码" v-model="queryParam.voucherNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款发放/回收登记薄')">导出</a-button>
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
    <dkffhsdjb-modal ref="modalForm" @ok="modalFormOk"></dkffhsdjb-modal>
  </a-card>
</template>

<script>
  import DkffhsdjbModal from './modules/DkffhsdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "DkffhsdjbList",
    mixins:[JeecgListMixin],
    components: {
      DkffhsdjbModal,JTreeSelect
    },
    data () {
      return {
        description: '贷款发放/回收登记薄管理页面',
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
            title: '借方发生额',
            align:"center",
            dataIndex: 'jffse'
           },
		   {
            title: '贷方发生额',
            align:"center",
            dataIndex: 'dffse'
           },
		   {
            title: '机构码',
            align:"center",
            dataIndex: 'jgm_dictTest'
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '合同号',
            align:"center",
            dataIndex: 'hth'
           },
		   {
            title: '借据号',
            align:"center",
            dataIndex: 'jjh'
           },
		   {
            title: '发放/回收日期',
            align:"center",
            dataIndex: 'rq'
           },
		   {
            title: '本金',
            align:"center",
            dataIndex: 'bj'
           },
		   {
            title: '柜员',
            align:"center",
            dataIndex: 'gy'
           },
		   {
            title: '标志',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '四级分类',
            align:"center",
            dataIndex: 'sjfl'
           },
		   {
            title: '科目号',
            align:"center",
            dataIndex: 'kmh'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'ret1'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'voucherNo'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'ret2'
           },
		   {
            title: '中心流水号',
            align:"center",
            dataIndex: 'zxlsh'
           },
		   {
            title: '数据日期',
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
          list: "/dkffhsdjb/dkffhsdjb/list",
          delete: "/dkffhsdjb/dkffhsdjb/delete",
          deleteBatch: "/dkffhsdjb/dkffhsdjb/deleteBatch",
          exportXlsUrl: "dkffhsdjb/dkffhsdjb/exportXls",
          importExcelUrl: "dkffhsdjb/dkffhsdjb/importExcel",
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