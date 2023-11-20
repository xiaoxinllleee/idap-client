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
            <a-form-item label="字典名称">
              <a-input placeholder="请输入字典名称" v-model="queryParam.dictName"></a-input>
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
        rowKey="id"
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
             <a @click="handleView(record)" >配置</a>
                <a-divider type="vertical" />
          <a @click="handleEdit(record)" v-has="'sjzidgl:edit'">编辑</a>


          <a-divider type="vertical" />
         <!-- <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                 </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'sjzidgl:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xddaglsjzdgl-modal ref="modalForm" @ok="modalFormOk"></xddaglsjzdgl-modal>
    <sjzdglpz-modal ref="sjzdglpzModal" @ok="modalFormOk"></sjzdglpz-modal>
  </a-card>
</template>

<script>
  import XddaglsjzdglModal from './modules/XddaglsjzdglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction } from '../../../../api/manage'
  import SjzdglpzModal from '@/views/xddagl/xtgl/xddaglsjzdgl/modules/SjzdglpzModal'

  export default {
    name: "XddaglsjzdglList",
    mixins:[JeecgListMixin],
    components: {
      XddaglsjzdglModal,SjzdglpzModal
    },
    data () {
      return {
        description: '数据字典管理管理页面',
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
            title: '字典编码',
            align:"center",
            dataIndex: 'dictCode'
           },
          {
            title: '字典名称',
            align:"center",
            dataIndex: 'dictName'
          },
		   {
            title: '字典描述',
            align:"center",
            dataIndex: 'description'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入标识',
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
          list: "/xddaglsjzdgl/xddaglsjzdgl/list",
          delete: "/xddaglsjzdgl/xddaglsjzdgl/delete",
          deleteBatch: "/xddaglsjzdgl/xddaglsjzdgl/deleteBatch",
          exportXlsUrl: "xddaglsjzdgl/xddaglsjzdgl/exportXls",
          importExcelUrl: "xddaglsjzdgl/xddaglsjzdgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

      handleView: function (record) {
        this.$refs.sjzdglpzModal.edit(record);
        this.$refs.sjzdglpzModal.title = "配置";
        this.$refs.sjzdglpzModal.disableSubmit = false;
      },

      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { dictCode: record.dictCode }).then((res) => {
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