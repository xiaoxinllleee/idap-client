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
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
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
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xddalrtx-modal ref="modalForm" @ok="modalFormOk"></xddalrtx-modal>
  </a-card>
</template>

<script>
  import XddalrtxModal from './modules/XddalrtxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XddalrtxList",
    mixins:[JeecgListMixin],
    components: {
      XddalrtxModal
    },
    data () {
      return {
        description: '信贷档案录入提醒管理页面',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq'
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
           },
          {
            title: '机构名称',
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
            title: '合同号',
            align:"center",
            dataIndex: 'hth'
          },
          {
            title: '签约日期',
            align:"center",
            dataIndex: 'qyrq'
          },
        ],
		url: {
          list: "/xddalrtx/xddalrtx/list",
          delete: "/xddalrtx/xddalrtx/delete",
          deleteBatch: "/xddalrtx/xddalrtx/deleteBatch",
          exportXlsUrl: "xddalrtx/xddalrtx/exportXls",
          importExcelUrl: "xddalrtx/xddalrtx/importExcel",
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