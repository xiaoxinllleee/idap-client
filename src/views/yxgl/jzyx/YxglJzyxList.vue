<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行查询"
                             pid-field="sjzzbz"
                             showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.sszh"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
         <!-- <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <a-input placeholder="请输入所属支行" v-model="queryParam.sszh"></a-input>
            </a-form-item>
          </a-col>-->


          <a-col :md="6" :sm="8">
            <a-form-item label="客户经理工号">
              <a-input placeholder="请输入客户经理工号" v-model="queryParam.khjl"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户经理姓名">
              <j-dict-select-tag
                v-model="queryParam.khjl"
                placeholder="请选择客户经理姓名"
                dictCode="HR_BAS_STAFF,ygxm,yggh"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="like" ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户潜在业务">
              <a-input placeholder="请输入客户潜在业务" v-model="queryParam.khqzyw"></a-input>
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
      <a-button @click="handleExtract" type="primary" icon="cloud-download">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('精准营销')">导出</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yxglJzyx-modal ref="modalForm" @ok="modalFormOk"></yxglJzyx-modal>
  </a-card>
</template>

<script>
  import YxglJzyxModal from './modules/YxglJzyxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'

  export default {
    name: "YxglJzyxList",
    mixins:[JeecgListMixin],
    components: {
      YxglJzyxModal,JTreeSelect
    },
    data () {
      return {
        description: '精准营销管理页面',
        // 表头
        columns: [
		   {
            title: '所属支行代码',
            align:"center",
            dataIndex: 'sszh'
           },
          {
            title: '所属支行名称',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
		   {
            title: '客户经理',
            align:"center",
            dataIndex: 'khjl_dictText'
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
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'jzdz'
           },
		   {
            title: '客户潜在业务',
            align:"center",
            dataIndex: 'khqzyw_dictText'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },

        ],
		url: {
          list: "/yxgl.jzyx/yxglJzyx/list",
          delete: "/yxgl.jzyx/yxglJzyx/delete",
          init: "/yxgl.jzyx/yxglJzyx/init",
          deleteBatch: "/yxgl.jzyx/yxglJzyx/deleteBatch",
          exportXlsUrl: "yxgl.jzyx/yxglJzyx/exportXls",
          importExcelUrl: "yxgl.jzyx/yxglJzyx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleExtract() {
        let params = {}
        this.loading = true;
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>