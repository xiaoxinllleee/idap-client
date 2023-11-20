<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门标识">
              <a-tree-select
                style="width: 100%"
                v-model="queryParam.bmbz"
                :tree-data="treeData2"
                :replaceFields="children"
                :allowClear="true"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择部门标识"
                tree-default-expand-all
                @change="onChange"
                @search="onSearch"
              />
            <!--  <j-tree-select placeholder="请选择部门标识"
                             v-model="queryParam.bmbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="hr_bas_organization, zzjc,zzbz"
                             :showSearch="true"
                             :ssbm="true"
                             :treeDefaultExpandAll="true"/>-->
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="挂片组织标识">
              <j-tree-select placeholder="请选择挂片组织标识"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
       <!-- <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入标识">
              <a-input placeholder="请输入录入标识" v-model="queryParam.lrbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入操作员">
              <a-input placeholder="请输入录入操作员" v-model="queryParam.lrczy"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入时间">
              <a-input placeholder="请输入录入时间" v-model="queryParam.lrsj"></a-input>
            </a-form-item>
          </a-col>
          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
         <!--     <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" icon="plus" v-has="'Bmgpgl:add'">设置</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('部门挂片管理')" v-has="'Bmgpgl:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Bmgpgl:imp'">导入</a-button>
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
        <!--  <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />-->
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a v-has="'Bmgpgl:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <bmgpgl-modal ref="modalForm" @ok="modalFormOk"></bmgpgl-modal>
  </a-card>
</template>

<script>
  import BmgpglModal from './modules/BmgpglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { deleteAction, getAction } from '@api/manage'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "BmgpglList",
    mixins:[JeecgListMixin],
    components: {
      BmgpglModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '部门挂片管理管理页面',
        // 表头
        treeData2:[],
        children: {title:'zzjc',key:'zzbz',value:'zzbz' },
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
            title: '部门名称',
            align:"center",
            dataIndex: 'bmbz_dictText'
           },
		   {
            title: '挂片组织标识',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入操作员',
            align:"center",
            dataIndex: 'lrczy'
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
          list: "/bmgpgl/bmgpgl/list",
          delete: "/bmgpgl/bmgpgl/delete",
          deleteBatch: "/bmgpgl/bmgpgl/deleteBatch",
          exportXlsUrl: "bmgpgl/bmgpgl/exportXls",
          importExcelUrl: "bmgpgl/bmgpgl/importExcel",
          exportTemplateUrl:"/bmgpgl/bmgpgl/exportTemplateXls",
       },
        exportTemplateName: '部门挂片管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      this.bmbzList()
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '设置'
        this.$refs.modalForm.disableSubmit = false
      },

      bmbzList(){
        getAction('/bmgpgl/bmgpgl/bmbzList', {}).then(res => {
          console.log('res.result', res.result)
          this.treeData2 = res.result

        })
      },


      searchReset () {
        this.queryParam = {}
        this.loadData(1)
      },

      onChange(value) {
           console.log(value);
           this.queryParam.bmbz = value;
      },
      onSearch() {
        console.log(...arguments);
      },
      onSelect(e) {
        console.log(e);
        console.log(...arguments);
      },

      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { bmbz: record.bmbz,zzbz:record.zzbz }).then((res) => {
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