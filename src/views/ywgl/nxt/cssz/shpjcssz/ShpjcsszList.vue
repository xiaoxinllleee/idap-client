<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数编号">
              <a-input placeholder="请输入参数编号" v-model="queryParam.csbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数名称">
              <a-input placeholder="请输入参数名称" v-model="queryParam.csmc"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'shpjcssz:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('商户评级参数设置')" v-has="'shpjcssz:exportXls'">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
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
          <a @click="handleEdit(record)" v-has="'shpjcssz:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <!--<a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
            <!--<a-menu slot="overlay">-->
              <!--<a-menu-item>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'shpjcssz:delete'">
                  <a>删除</a>
                </a-popconfirm>
              <!--</a-menu-item>-->
            <!--</a-menu>-->
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <shpjcssz-modal ref="modalForm" @ok="modalFormOk"></shpjcssz-modal>
  </a-card>
</template>

<script>
  import ShpjcsszModal from './modules/ShpjcsszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {deleteAction} from "@/api/manage";

  export default {
    name: "ShpjcsszList",
    mixins:[JeecgListMixin],
    components: {
      ShpjcsszModal
    },
    data () {
      return {
        description: '商户评级参数设置管理页面',
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
            title: '参数编号',
            align:"center",
            dataIndex: 'csbh'
          },
          {
            title: '参数名称',
            align:"center",
            dataIndex: 'csmc'
          },
		   {
            title: '评定类型',
            align:"center",
            dataIndex: 'pdlx_dictText'
           },

		   {
            title: '参数值起',
            align:"center",
            dataIndex: 'cszq'
           },
		   {
            title: '参数值止',
            align:"center",
            dataIndex: 'cszz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/shpjcssz/shpjcssz/list",
          delete: "/shpjcssz/shpjcssz/delete",
          deleteBatch: "/shpjcssz/shpjcssz/deleteBatch",
          exportXlsUrl: "shpjcssz/shpjcssz/exportXls",
          importExcelUrl: "shpjcssz/shpjcssz/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },

      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {csbh: record.csbh}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>