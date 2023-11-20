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
            <a-form-item label="指标维度">
              <j-dict-select-tag placeholder="请输入指标维度" v-model="queryParam.zbwd" dict-code="zbwd"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标类型">
              <j-dict-select-tag placeholder="请输入指标类型" v-model="queryParam.zblx" dict-code="jx_zblx"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核方式">
              <j-dict-select-tag placeholder="请输入考核方式" v-model="queryParam.khfs" dict-code="khfs"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否启用">
              <j-dict-select-tag placeholder="请输入是否启用" v-model="queryParam.sfqy" dict-code="sfqy"></j-dict-select-tag>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ErpBasSjxArea:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('指标逻辑管理')" v-has="'ErpBasSjxArea:exp'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import" v-has="'ErpBasSjxArea:imp'">导入</a-button>
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
        :scroll="{x:1800}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'ErpBasSjxArea:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'ErpBasSjxArea:delete'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <erpBasSjxArea-modal ref="modalForm" @ok="modalFormOk"></erpBasSjxArea-modal>
  </a-card>
</template>

<script>
  import ErpBasSjxAreaModal from './modules/ErpBasSjxAreaModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "ErpBasSjxAreaList",
    mixins:[JeecgListMixin],
    components: {
      ErpBasSjxAreaModal,JTreeSelect
    },
    data () {
      return {
        description: '指标逻辑管理页面',
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
            dataIndex: 'zbid_dictText'
          },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
          },
          {
            title: '指标类型',
            align:"center",
            dataIndex: 'zblx_dictText'
          },
          {
            title: '考核方式',
            align:"center",
            dataIndex: 'khfs_dictText'
          },
          {
            title: '区域代码',
            align:"center",
            dataIndex: 'qydm'
          },
          {
            title: '是否启用',
            align:"center",
            dataIndex: 'sfqy_dictText'
          },
          {
            title: '执行顺序',
            align:"center",
            dataIndex: 'zxsx'
          },
         /* {
            title: '明细计算SQL',
            align:"center",
            dataIndex: 'mxjssql'
          },
          {
            title: '结果计算SQL',
            align:"center",
            dataIndex: 'jgjssql'
          },
          {
            title: '得分计算SQL',
            align:"center",
            dataIndex: 'dfjssql'
          },
          {
            title: '工资计算SQL',
            align:"center",
            dataIndex: 'gzjssql'
          },*/
          {
            title: '明细计算说明',
            align:"center",
            dataIndex: 'mxjssm',
            width: 150,
            ellipsis: true,
          },
          {
            title: '结果计算说明',
            align:"center",
            dataIndex: 'jgjssm',
            width: 150,
            ellipsis: true,
          },
          {
            title: '得分计算说明',
            align:"center",
            dataIndex: 'dfjssm',
            width: 150,
            ellipsis: true,
          },
          {
            title: '工资计算说明',
            align:"center",
            dataIndex: 'gzsjsm',
            width: 150,
            ellipsis: true,
          },

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: "right",
            width: 110,
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zbljgl/erpBasSjxArea/list",
          delete: "/zbljgl/erpBasSjxArea/delete",
          deleteBatch: "/zbljgl/erpBasSjxArea/deleteBatch",
          exportXlsUrl: "zbljgl/erpBasSjxArea/exportXls",
          importExcelUrl: "zbljgl/erpBasSjxArea/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.queryParam = {sfqy: '1'}
    },
    methods: {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>