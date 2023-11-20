<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款金额">
              <a-input placeholder="请输入贷款金额" v-model="queryParam.dkje"></a-input>
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
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('利息、本金逾期将进关注类')">导出</a-button>
      <a-button icon="menu-unfold" @click="more">更多</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
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
      <a-modal
        title="明细"
        width="80%"
        :footer="null"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel">
        <a-table
          ref="table"
          size="middle"
          bordered
          :rowKey="rowKey"
          :columns="columns2"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          @change="handleTableChange">
        </a-table>

      </a-modal>


    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
<!--    <fxgljcYqjjgzl-modal ref="modalForm" @ok="modalFormOk"></fxgljcYqjjgzl-modal>-->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "FxgljcYqjjgzlList",
    mixins:[JeecgListMixin],
    components: {
    },
    data () {
      return {
        description: '利息、本金逾期将进关注类管理页面',
        // 表头
        visible:false,
        confirmLoading: false,
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
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
          },
          {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
          },

        ],
        columns2: [
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
            title: '支行名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
           },
		   {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '欠息天数',
            align:"center",
            dataIndex: 'qxts'
           },
		   {
            title: '欠本天数',
            align:"center",
            dataIndex: 'qbts'
           },
		   {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText'
           },
		   {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt_dictText'
           },

        ],
		url: {
          list: "/yqjjgzl/fxgljcYqjjgzl/list",
          delete: "/yqjjgzl/fxgljcYqjjgzl/delete",
          deleteBatch: "/yqjjgzl/fxgljcYqjjgzl/deleteBatch",
          exportXlsUrl: "yqjjgzl/fxgljcYqjjgzl/exportXls",
          importExcelUrl: "yqjjgzl/fxgljcYqjjgzl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      more(){
        this.loadData(1)
        this.visible = true;
      },
      handleCancel() {
        console.log('Clicked cancel button');
        this.model={}
        this.visible = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>