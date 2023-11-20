<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="数据日期">
              <a-date-picker v-model="queryParam.sjrq" placeholder="请选择数据日期" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="组织机构">
              <a-input placeholder="请输入组织机构" v-model="queryParam.zzbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="岗位标志">
              <a-input placeholder="请输入岗位标志" v-model="queryParam.gwbz"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户经理标志">
              <a-input placeholder="请输入客户经理标志" v-model="queryParam.khjlbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="存款账户">
              <a-input placeholder="请输入存款账户" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
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
      <a-button type="primary" icon="download" @click="handleExportXls('定期存款到期预警')">导出</a-button>
      <a-button type="primary" @click="">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="ckzh"
        :scroll="{x :2000}"
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
    <ckjkptDqckdqyj-modal ref="modalForm" @ok="modalFormOk"></ckjkptDqckdqyj-modal>
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import  moment  from 'moment';
  import { filterObj } from '@/utils/util';

  export default {
    name: "CkjkptDqckdqyjList",
    mixins:[JeecgListMixin],
    components: {
    },
    data () {
      return {
        description: '定期存款到期预警管理页面',
        // 表头
        columns: [
          {
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq',
            width:120
          },
		   {
            title: '组织机构',
            align:"center",
            dataIndex: 'zzbz',
            width:120
        },
		   {
            title: '岗位标志',
            align:"center",
            dataIndex: 'gwbz',
            width:120

       },
		   {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh',
            width:120
        },
		   {
            title: '客户经理标志',
            align:"center",
            dataIndex: 'khjlbh',
            width:160

       },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm',
            width:160

       },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width:180
       },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg',
            width:120
        },
		   {
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh',
            width:120
        },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye',
            width:120
        },
		   {
            title: '月日平',
            align:"center",
            dataIndex: 'ckyrp',
            width:120
       },
		   {
            title: '年日平',
            align:"center",
            dataIndex: 'cknrp',
            width:120
        },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq',
            width:120
       },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq',
            width:120
       },
		   {
            title: '本期起息日',
            align:"center",
            dataIndex: 'bqqxr',
            width:120
       },
		   {
            title: '本期截至日',
            align:"center",
            dataIndex: 'bqjzr',
            width:120
       },
		   {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts',
            width:120
       },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'zhlx',
            width:120
       },
      ],
		url: {
          list: "/ckjkpt.dqckdqyj/ckjkptDqckdqyj/list",
          delete: "/ckjkpt.dqckdqyj/ckjkptDqckdqyj/delete",
          deleteBatch: "/ckjkpt.dqckdqyj/ckjkptDqckdqyj/deleteBatch",
          exportXlsUrl: "ckjkpt.dqckdqyj/ckjkptDqckdqyj/exportXls",
          importExcelUrl: "ckjkpt.dqckdqyj/ckjkptDqckdqyj/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams(){
        let tjyfment="";
        if(this.queryParam.sjrq){
          tjyfment=this.queryParam.sjrq.format("YYYY-MM-DD");
        }
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.sjrq=tjyfment;
        return filterObj(param);
      },
      moment,
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>