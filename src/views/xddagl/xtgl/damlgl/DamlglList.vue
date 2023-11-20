<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="字典编码">
              <a-input placeholder="请输入字典编码" v-model="queryParam.dictCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.dictKey"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="dictCode"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text,record">
          <a @click="handleEdit(record)" v-has="'damlgl:edit'">编辑</a>

          <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'damlgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <damlgl-modal ref="modalForm" @ok="modalFormOk"></damlgl-modal>
  </a-card>
</template>

<script>
  import DamlglModal from './modules/DamlglModal'
  import { deleteAction } from '../../../../api/manage'
  import { JeecgListMixin } from '../../../../mixins/JeecgListMixin'

  export default {
    name: "DamlglList",
    mixins:[JeecgListMixin],
    components: {
      DamlglModal
    },
    data () {
      return {
        description: '档案目录管理(参数配置)管理页面',
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
            title: '参数编码',
            align:"center",
            dataIndex: 'dictCode'
           },
		   {
            title: '参数名称',
            align:"center",
            dataIndex: 'dictKey'
           },
		   {
            title: '参数值',
            align:"center",
            dataIndex: 'dictValue'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/damlgl/damlgl/list",
          delete: "/damlgl/damlgl/delete",
          deleteBatch: "/damlgl/damlgl/deleteBatch",
          exportXlsUrl: "damlgl/damlgl/exportXls",
          importExcelUrl: "damlgl/damlgl/importExcel",
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



      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { dictCode: record.dictCode , dictValue: record.dictValue}).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>