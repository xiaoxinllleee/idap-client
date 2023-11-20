<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标名称">
              <a-input placeholder="请输入指标名称" v-model="queryParam.zbmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标类别">
              <j-dict-select-tag placeholder="请输入指标类别" v-model="queryParam.zblb" dict-code="zblb"></j-dict-select-tag>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ErpBasZbk:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('指标库管理')" v-has="'ErpBasZbk:exp'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import" v-has="'ErpBasZbk:imp'">导入</a-button>
      </a-upload>
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
          <a @click="handleEdit(record)" v-has="'ErpBasZbk:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.zbid)">
                  <a v-has="'ErpBasZbk:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ErpBasZbk-modal ref="modalForm" @ok="modalFormOk"></ErpBasZbk-modal>
  </a-card>
</template>

<script>
  import ErpBasZbkModal from './modules/ErpBasZbkModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {deleteAction} from "@/api/manage";

  export default {
    name: "ErpBasZbkList",
    mixins:[JeecgListMixin],
    components: {
      ErpBasZbkModal
    },
    data () {
      return {
        description: '指标库管理管理页面',
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
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid'
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbmc'
          },
          {
            title: '指标类别',
            align:"center",
            width: 120,
            dataIndex: 'zblb_dictText'
          },
          // {
          //   title: '工资类别',
          //   align:"center",
          //   dataIndex: 'gzlb'
          // },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width: 110,
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/jczbgl/erpBasZbk/list",
          delete: "/jczbgl/erpBasZbk/delete",
          deleteBatch: "/jczbgl/erpBasZbk/deleteBatch",
          exportXlsUrl: "jczbgl/erpBasZbk/exportXls",
          importExcelUrl: "jczbgl/erpBasZbk/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete: function (zbid) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { zbid: zbid }).then((res) => {
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