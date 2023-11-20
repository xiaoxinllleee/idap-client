<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="登陆账户">
              <a-input placeholder="请输入登陆账户" v-model="queryParam.dlzh"></a-input>
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
    <!--  <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('日志管理')" v-has="'rzgl:exportXls'">导出</a-button>
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
    <xddagrzgl-modal ref="modalForm" @ok="modalFormOk"></xddagrzgl-modal>
  </a-card>
</template>

<script>
  import XddagrzglModal from './modules/XddagrzglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XddagrzglList",
    mixins:[JeecgListMixin],
    components: {
      XddagrzglModal
    },
    data () {
      return {
        description: '日志管理管理页面',
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
            title: '员工姓名',
            align:"center",
            dataIndex: 'ygxm'
           },
		   {
            title: '登陆账户',
            align:"center",
            dataIndex: 'dlzh'
           },
		   {
            title: 'ip地址',
            align:"center",
            dataIndex: 'ip'
           },
		   {
            title: '操作功能',
            align:"center",
            dataIndex: 'czlj'
           },
          {
            title: '操作时间',
            align:"center",
            dataIndex: 'czsj'
          },
          {
            title: '操作内容',
            align:"center",
            dataIndex: 'cznr'
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
          },
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/xddagrzgl/xddagrzgl/list",
          delete: "/xddagrzgl/xddagrzgl/delete",
          deleteBatch: "/xddagrzgl/xddagrzgl/deleteBatch",
          exportXlsUrl: "xddagrzgl/xddagrzgl/exportXls",
          importExcelUrl: "xddagrzgl/xddagrzgl/importExcel",
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