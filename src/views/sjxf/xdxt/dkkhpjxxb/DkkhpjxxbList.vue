<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="实授信用等级">
              <a-input placeholder="请输入实授信用等级" v-model="queryParam.appEvalGrade"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="应授信用等级">
              <a-input placeholder="请输入应授信用等级" v-model="queryParam.applyEvalGrade"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评估级别">
              <a-input placeholder="请输入评估级别" v-model="queryParam.evalGrade"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评估ID流水号">
              <a-input placeholder="请输入评估ID流水号" v-model="queryParam.evalInfoId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员编号">
              <a-input placeholder="请输入操作员编号" v-model="queryParam.userId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门编号">
              <a-input placeholder="请输入部门编号" v-model="queryParam.deptId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号">
              <a-input placeholder="请输入业务编号" v-model="queryParam.businessNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款客户评级信息表')">导出</a-button>
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
    <dkkhpjxxb-modal ref="modalForm" @ok="modalFormOk"></dkkhpjxxb-modal>
  </a-card>
</template>

<script>
  import DkkhpjxxbModal from './modules/DkkhpjxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DkkhpjxxbList",
    mixins:[JeecgListMixin],
    components: {
      DkkhpjxxbModal
    },
    data () {
      return {
        description: '贷款客户评级信息表管理页面',
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
            title: '调整说明',
            align:"center",
            dataIndex: 'adjustExplain'
           },
		   {
            title: '实授信用等级',
            align:"center",
            dataIndex: 'appEvalGrade'
           },
		   {
            title: '应授信用等级',
            align:"center",
            dataIndex: 'applyEvalGrade'
           },
		   {
            title: '客户认定类别',
            align:"center",
            dataIndex: 'custEvalType'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '报表编号',
            align:"center",
            dataIndex: 'entFncInfoId'
           },
		   {
            title: '评估日期',
            align:"center",
            dataIndex: 'evalDate'
           },
		   {
            title: '评估流水编号',
            align:"center",
            dataIndex: 'evalFlowId'
           },
		   {
            title: '评估级别',
            align:"center",
            dataIndex: 'evalGrade'
           },
		   {
            title: '评估ID流水号',
            align:"center",
            dataIndex: 'evalInfoId'
           },
		   {
            title: '评估总得分',
            align:"center",
            dataIndex: 'evalScore'
           },
		   {
            title: '评估类别',
            align:"center",
            dataIndex: 'evalType'
           },
		   {
            title: '当前评级是否有效',
            align:"center",
            dataIndex: 'isEnabled'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'remark1'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'remark2'
           },
		   {
            title: '备注3',
            align:"center",
            dataIndex: 'remark3'
           },
		   {
            title: '评级使用报表',
            align:"center",
            dataIndex: 'reportDate'
           },
		   {
            title: '操作员编号',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '部门编号',
            align:"center",
            dataIndex: 'deptId'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
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
          list: "/dkkhpjxxb/dkkhpjxxb/list",
          delete: "/dkkhpjxxb/dkkhpjxxb/delete",
          deleteBatch: "/dkkhpjxxb/dkkhpjxxb/deleteBatch",
          exportXlsUrl: "dkkhpjxxb/dkkhpjxxb/exportXls",
          importExcelUrl: "dkkhpjxxb/dkkhpjxxb/importExcel",
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