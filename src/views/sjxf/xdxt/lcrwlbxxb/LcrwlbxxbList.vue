<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="当前任务号">
              <a-input placeholder="请输入当前任务号" v-model="queryParam.currTaskId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="处理人员编号">
              <a-input placeholder="请输入处理人员编号" v-model="queryParam.userId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="处理人员角色编号">
              <a-input placeholder="请输入处理人员角色编号" v-model="queryParam.roleId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="同意利率">
              <a-input placeholder="请输入同意利率" v-model="queryParam.temp2"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="同意期限">
              <a-input placeholder="请输入同意期限" v-model="queryParam.temp3"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="同意金额">
              <a-input placeholder="请输入同意金额" v-model="queryParam.temp1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="代理操作员号">
              <a-input placeholder="请输入代理操作员号" v-model="queryParam.trueUserId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门编号">
              <a-input placeholder="请输入部门编号" v-model="queryParam.deptId"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('流程任务列表信息表')">导出</a-button>
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
    <lcrwlbxxb-modal ref="modalForm" @ok="modalFormOk"></lcrwlbxxb-modal>
  </a-card>
</template>

<script>
  import LcrwlbxxbModal from './modules/LcrwlbxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "LcrwlbxxbList",
    mixins:[JeecgListMixin],
    components: {
      LcrwlbxxbModal
    },
    data () {
      return {
        description: '流程任务列表信息表管理页面',
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
            title: '备注4',
            align:"center",
            dataIndex: 'temp4'
           },
		   {
            title: '同意期限',
            align:"center",
            dataIndex: 'temp3'
           },
		   {
            title: '同意利率',
            align:"center",
            dataIndex: 'temp2'
           },
		   {
            title: '同意金额',
            align:"center",
            dataIndex: 'temp1'
           },
		   {
            title: '动作编号',
            align:"center",
            dataIndex: 'actionId'
           },
		   {
            title: '完成任务时间',
            align:"center",
            dataIndex: 'completeDate'
           },
		   {
            title: '接收任务时间',
            align:"center",
            dataIndex: 'creatDate'
           },
		   {
            title: '当前任务号',
            align:"center",
            dataIndex: 'currTaskId'
           },
		   {
            title: '强制执行时间',
            align:"center",
            dataIndex: 'forceTime'
           },
		   {
            title: '催办时间',
            align:"center",
            dataIndex: 'hastenTime'
           },
		   {
            title: '无',
            align:"center",
            dataIndex: 'isShow'
           },
		   {
            title: '下一个处理流水编号',
            align:"center",
            dataIndex: 'nextStep'
           },
		   {
            title: '下一个任务号',
            align:"center",
            dataIndex: 'nextTaskId'
           },
		   {
            title: '前一个处理流水编号',
            align:"center",
            dataIndex: 'previousStep'
           },
		   {
            title: 'remark',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '处理人员角色编号',
            align:"center",
            dataIndex: 'roleId'
           },
		   {
            title: '步骤号',
            align:"center",
            dataIndex: 'stepOn'
           },
		   {
            title: '处理人员编号',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '工作流编号',
            align:"center",
            dataIndex: 'wfFlowId'
           },
		   {
            title: '流水编号',
            align:"center",
            dataIndex: 'wfFlowOn'
           },
		   {
            title: '业务工作流编号',
            align:"center",
            dataIndex: 'wfIsFlowOn'
           },
		   {
            title: '部门编号',
            align:"center",
            dataIndex: 'deptId'
           },
		   {
            title: '代理操作员号',
            align:"center",
            dataIndex: 'trueUserId'
           },
		   {
            title: '是否结束标志',
            align:"center",
            dataIndex: 'isEnd'
           },
		   {
            title: '启动人员编号',
            align:"center",
            dataIndex: 'startUserId'
           },
		   {
            title: '启动部门编号',
            align:"center",
            dataIndex: 'startDeptId'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		 /*  {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/lcrwlbxxb/lcrwlbxxb/list",
          delete: "/lcrwlbxxb/lcrwlbxxb/delete",
          deleteBatch: "/lcrwlbxxb/lcrwlbxxb/deleteBatch",
          exportXlsUrl: "lcrwlbxxb/lcrwlbxxb/exportXls",
          importExcelUrl: "lcrwlbxxb/lcrwlbxxb/importExcel",
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