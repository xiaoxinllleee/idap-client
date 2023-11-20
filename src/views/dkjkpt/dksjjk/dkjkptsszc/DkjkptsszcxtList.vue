<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM"
                             pid-field="SJYWJGDM" :showSearch="true" treeNodeFilterProp="title"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否起诉">
              <j-dict-select-tag placeholder="请输入是否起诉" v-model="queryParam.sfqs" dict-code="sfbz"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="判决日期">
              <a-date-picker placeholder="请选择判决日期" v-model="queryParam.pjrq" style="width: 100%"></a-date-picker>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款监控平台诉讼资产')">导出</a-button>
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
        :scroll="{ x: 6000 }"
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
    <dkjkptsszcxt-modal ref="modalForm" @ok="modalFormOk"></dkjkptsszcxt-modal>
  </a-card>
</template>

<script>
  import DkjkptsszcxtModal from './modules/DkjkptsszcxtModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'

  export default {
    name: "DkjkptsszcxtList",
    mixins:[JeecgListMixin],
    components: {
      DkjkptsszcxtModal,JTreeSelect
    },
    data () {
      return {
        description: '贷款监控平台诉讼资产_湘潭管理页面',
        // 表头
        columns: [
          {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户姓名',
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
            title: '余额',
            align:"center",
            dataIndex: 'ye'
          },
          {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText'
          },

		   {
            title: '担保/抵押有效性',
            align:"center",
            dataIndex: 'dbdyyxx'
           },
		   {
            title: '转入表外日期',
            align:"center",
            dataIndex: 'zrbwrq'
           },
		   {
            title: '转入表外类型',
            align:"center",
            dataIndex: 'zrbwlx_dictText'
           },
		   {
            title: '是否有权益',
            align:"center",
            dataIndex: 'sfyqy_dictText'
           },
		   {
            title: '有无借据（合同）原件',
            align:"center",
            dataIndex: 'ywjj'
           },
		   {
            title: '借款人类型',
            align:"center",
            dataIndex: 'jkrlx'
           },
		   {
            title: '借款人现状',
            align:"center",
            dataIndex: 'jkrxz'
           },
		   {
            title: '是否起诉',
            align:"center",
            dataIndex: 'sfqs_dictText'
           },
          {
            title: '判决日期',
            align:"center",
            dataIndex: 'pjrq'
          },
		   {
            title: '是否有诉讼时效',
            align:"center",
            dataIndex: 'sfysssx_dictText'
           },
		   {
            title: '是否有执行时效',
            align:"center",
            dataIndex: 'sfyzxsx_dictText'
           },
		   {
            title: '诉讼阶段',
            align:"center",
            dataIndex: 'ssjd'
           },
		   {
            title: '抵押资产处置情况',
            align:"center",
            dataIndex: 'dyzcczqk'
           },
		   {
            title: '剩余未处置资产对应贷款本金',
            align:"center",
            dataIndex: 'sywczzcdydkbj'
           },
		   {
            title: '未处置抵押物性质',
            align:"center",
            dataIndex: 'wczdywxz'
           },
		   {
            title: '未处置抵押物位置、楼层',
            align:"center",
            dataIndex: 'wqcdywwz'
           },
		   {
            title: '未处置抵押物面积',
            align:"center",
            dataIndex: 'wczdywmj'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
        ],
		url: {
          list: "/dkjkptsszcxt/dkjkptsszcxt/list",
          delete: "/dkjkptsszcxt/dkjkptsszcxt/delete",
          deleteBatch: "/dkjkptsszcxt/dkjkptsszcxt/deleteBatch",
          exportXlsUrl: "dkjkptsszcxt/dkjkptsszcxt/exportXls",
          importExcelUrl: "dkjkptsszcxt/dkjkptsszcxt/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        let pjrqment = ''

        if (this.queryParam.pjrq) {
          pjrqment = this.queryParam.pjrq.format('YYYYMMDD')
        }

        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.pjrq=pjrqment
        return filterObj(param)
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>