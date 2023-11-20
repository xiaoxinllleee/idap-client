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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('日志管理')" v-has="'rzgl:exportXls'">导出</a-button>

    </div>

    <!-- table区域-begin -->
    <div>


      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'rzgl:edit'">编辑</a>

          <a-divider type="vertical" />
        <!--  <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                  </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'rzgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <rzgl-modal ref="modalForm" @ok="modalFormOk"></rzgl-modal>
  </a-card>
</template>

<script>
  import RzglModal from './modules/RzglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "RzglList",
    mixins:[JeecgListMixin],
    components: {
      RzglModal
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
            title: 'IP地址',
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
            title: '文件路径',
            align:"center",
            dataIndex: 'wjlj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/rzgl/rzgl/list",
          delete: "/rzgl/rzgl/delete",
          deleteBatch: "/rzgl/rzgl/deleteBatch",
          exportXlsUrl: "rzgl/rzgl/exportXls",
          importExcelUrl: "rzgl/rzgl/importExcel",
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