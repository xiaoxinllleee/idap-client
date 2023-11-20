<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务代码">
              <a-input placeholder="请输入业务代码" v-model="queryParam.businessCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务类型">
              <a-input placeholder="请输入业务类型" v-model="queryParam.businessType"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <a-input placeholder="请输入客户类型" v-model="queryParam.businessType2"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="五级分类业务种类">
              <a-input placeholder="请输入五级分类业务种类" v-model="queryParam.fiveClassKind"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('业务描述表')">导出</a-button>
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
    <ywmsb-modal ref="modalForm" @ok="modalFormOk"></ywmsb-modal>
  </a-card>
</template>

<script>
  import YwmsbModal from './modules/YwmsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "YwmsbList",
    mixins:[JeecgListMixin],
    components: {
      YwmsbModal
    },
    data () {
      return {
        description: '业务描述表管理页面',
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
            title: '个人征信业务种类',
            align:"center",
            dataIndex: 'pcKind1'
           },
		   {
            title: '企业征信业务种类',
            align:"center",
            dataIndex: 'ecKind1'
           },
		   {
            title: '是否需要评级',
            align:"center",
            dataIndex: 'isEvaluate'
           },
		   {
            title: '每年放贷限额',
            align:"center",
            dataIndex: 'temp1'
           },
		   {
            title: '偿还本金比率（借新还旧）/首付比例（按揭贷款）',
            align:"center",
            dataIndex: 'temp2'
           },
		   {
            title: '五级分类业务种类',
            align:"center",
            dataIndex: 'fiveClassKind'
           },
		   {
            title: '业务序号',
            align:"center",
            dataIndex: 'bicfCode'
           },
		   {
            title: '父交易代码',
            align:"center",
            dataIndex: 'bicfParentCode'
           },
		   {
            title: '业务代码',
            align:"center",
            dataIndex: 'businessCode'
           },
		   {
            title: '业务品种描述',
            align:"center",
            dataIndex: 'businessDesc'
           },
		   {
            title: '业务对应的工作流程',
            align:"center",
            dataIndex: 'businessFlow'
           },
		   {
            title: '业务品种名称',
            align:"center",
            dataIndex: 'businessName'
           },
		   {
            title: '排序顺序号',
            align:"center",
            dataIndex: 'businessOrderIndex'
           },
		   {
            title: '业务页面编号',
            align:"center",
            dataIndex: 'businessTempId'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'businessType'
           },
		   {
            title: '业务类型新增、展期、借新还旧、还旧借新、贷款重组、合同变更',
            align:"center",
            dataIndex: 'businessType1'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'businessType2'
           },
		   {
            title: '备用字段',
            align:"center",
            dataIndex: 'businessType3'
           },
		   {
            title: '质押方式',
            align:"center",
            dataIndex: 'impawnType'
           },
		   {
            title: '是否授信',
            align:"center",
            dataIndex: 'isCredit'
           },
		   {
            title: '暂不用',
            align:"center",
            dataIndex: 'isLen'
           },
		   {
            title: '抵押方式',
            align:"center",
            dataIndex: 'pledgeType'
           },
		   {
            title: '风险类型',
            align:"center",
            dataIndex: 'riskType'
           },
		   {
            title: '业务适用的角色对象',
            align:"center",
            dataIndex: 'roleId'
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
            title: '业务种类',
            align:"center",
            dataIndex: 'businessKind'
           },
		   {
            title: '利率浮动比例(下限）',
            align:"center",
            dataIndex: 'temp3'
           },
		   {
            title: '检查产品代码标志(1:检查 2:不检查)',
            align:"center",
            dataIndex: 'checkProductFlag'
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
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ywmsb/ywmsb/list",
          delete: "/ywmsb/ywmsb/delete",
          deleteBatch: "/ywmsb/ywmsb/deleteBatch",
          exportXlsUrl: "ywmsb/ywmsb/exportXls",
          importExcelUrl: "ywmsb/ywmsb/importExcel",
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