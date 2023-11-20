<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="终端所属机构">
<!--              <a-input placeholder="请输入终端所属机构" v-model="queryParam.branch"></a-input>-->
              <j-tree-select placeholder="全部" v-model="queryParam.branch" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="终端号">
              <a-input placeholder="请输入终端类型" v-model="queryParam.id"></a-input>
            </a-form-item>
          </a-col>
 <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="终端类型">
              <a-input placeholder="请输入终端类型" v-model="queryParam.idType"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="受理机构">
              <a-input placeholder="请输入受理机构" v-model="queryParam.acquirer"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="终端所属行">
              <a-input placeholder="请输入终端所属行" v-model="queryParam.owner"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="终端使用状态">
              <a-input placeholder="请输入终端使用状态" v-model="queryParam.activity"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('自助设备基本信息')">导出</a-button>
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
    <zzsbjbxx-modal ref="modalForm" @ok="modalFormOk"></zzsbjbxx-modal>
  </a-card>
</template>

<script>
  import ZzsbjbxxModal from './modules/ZzsbjbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  export default {
    name: "ZzsbjbxxList",
    mixins:[JeecgListMixin],
    components: {
      ZzsbjbxxModal,JTreeSelect
    },
    data () {
      return {
        description: '自助设备基本信息管理页面',
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
            title: '终端号',
            align:"center",
            dataIndex: 'id'
           }, {
            title: '终端类型',
            align:"center",
            dataIndex: 'idType'
           },
		   {
            title: '终端所属机构',
            align:"center",
            dataIndex: 'branch'
           },
		   {
            title: '终端对应虚拟柜员',
            align:"center",
            dataIndex: 'vteller'
           },
		   {
            title: '在途现金BGL',
            align:"center",
            dataIndex: 'bglAccount'
           },
		   {
            title: '受理机构',
            align:"center",
            dataIndex: 'acquirer'
           },
		   {
            title: '卡片接受方',
            align:"center",
            dataIndex: 'acceptor'
           },
		   {
            title: '终端名称和所在位置',
            align:"center",
            dataIndex: 'nameLocation'
           },
		   {
            title: '终端所属行',
            align:"center",
            dataIndex: 'owner'
           },
		   {
            title: '终端使用状态',
            align:"center",
            dataIndex: 'activity'
           },
		   {
            title: '最近维护日期',
            align:"center",
            dataIndex: 'lastMaintainDate'
           },
		   {
            title: '最近维护标识',
            align:"center",
            dataIndex: 'lastMaintainFlag'
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
            title: '加载日期',
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
          list: "/zzsbjbxx/zzsbjbxx/list",
          delete: "/zzsbjbxx/zzsbjbxx/delete",
          deleteBatch: "/zzsbjbxx/zzsbjbxx/deleteBatch",
          exportXlsUrl: "zzsbjbxx/zzsbjbxx/exportXls",
          importExcelUrl: "zzsbjbxx/zzsbjbxx/importExcel",
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