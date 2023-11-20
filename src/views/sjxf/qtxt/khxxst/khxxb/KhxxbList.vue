<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="客户创建机构编号">
            <j-tree-select placeholder="请选择客户创建机构编号"
                           v-model="queryParam.createBranchNo"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :sszh="true"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户创建柜员编号">
              <a-input placeholder="请输入客户创建柜员编号" v-model="queryParam.createTellerNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <a-input placeholder="请输入客户类型" v-model="queryParam.custType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易流水号">
              <a-input placeholder="请输入交易流水号" v-model="queryParam.txSeqNo"></a-input>
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
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('客户信息表')">导出</a-button>

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
        :scroll="{x: 4000}"
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
    <khxxb-modal ref="modalForm" @ok="modalFormOk"></khxxb-modal>
  </a-card>
</template>

<script>
  import KhxxbModal from './modules/KhxxbModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "KhxxbList",
    mixins:[JeecgListMixin],
    components: {
      KhxxbModal,JTreeSelect
    },
    data () {
      return {
        description: '客户信息表管理页面',
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
            title: '客户创建机构编号',
            align:"center",
            dataIndex: 'createBranchNo'
          },
          {
            title: '客户创建柜员编号',
            align:"center",
            dataIndex: 'createTellerNo'
          },
          {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
          },
		   {
            title: '核心客户号',
            align:"center",
            dataIndex: 'coreNo'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'custType'
           },
		   {
            title: '财务系统客户身份',
            align:"center",
            dataIndex: 'finCustRole'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'identType'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'identNo'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '客户简称',
            align:"center",
            dataIndex: 'shortName'
           },
		   {
            title: '英文名称',
            align:"center",
            dataIndex: 'enName'
           },
		   {
            title: '英文简称',
            align:"center",
            dataIndex: 'enShortName'
           },
		   {
            title: '客户状态',
            align:"center",
            dataIndex: 'custStat'
           },
		   {
            title: '境内外标志',
            align:"center",
            dataIndex: 'inoutFlag'
           },
		   {
            title: 'VIP等级',
            align:"center",
            dataIndex: 'vipLevel'
           },
		   {
            title: '客户合并标志',
            align:"center",
            dataIndex: 'mergeFlag'
           },
		   {
            title: '联系人姓名',
            align:"center",
            dataIndex: 'linkmanName'
           },
		   {
            title: '联系人电话',
            align:"center",
            dataIndex: 'linkmanTel'
           },
		   {
            title: '推荐人',
            align:"center",
            dataIndex: 'recommender'
           },
		   {
            title: '客户创建日期',
            align:"center",
            dataIndex: 'createDate'
           },
          {
            title: '客户创建时间',
            align: "center",
            dataIndex: 'createTime'
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
          list: "/khxxb/khxxb/list",
          delete: "/khxxb/khxxb/delete",
          deleteBatch: "/khxxb/khxxb/deleteBatch",
          exportXlsUrl: "khxxb/khxxb/exportXls",
          importExcelUrl: "khxxb/khxxb/importExcel",
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