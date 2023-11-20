<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="4" :md="8" :sm="24">
            <a-form-item label="指标编号">
              <a-input placeholder="请输入指标编号" v-model="queryParam.indexId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="4" :md="8" :sm="24">
            <a-form-item label="指标名称">
              <a-input placeholder="请输入指标名称" v-model="queryParam.indexName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="4" :md="8" :sm="24">
            <a-form-item label="考核对象">
              <j-dict-select-tag   v-model="queryParam.evlobjTypeId"  :triggerChange="true" placeholder="请选择考核对象" dictCode="OBJ"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button  icon="download" @click="handleExportXls('派生指标管理')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pmaFevlIndexInfo-modal ref="modalForm" @ok="modalFormOk"></pmaFevlIndexInfo-modal>
  </a-card>
</template>

<script>
  import PmaFevlIndexInfoModal from './modules/PmaFevlIndexInfoModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "PmaFevlIndexInfoList",
    mixins:[JeecgListMixin],
    components: {
      PmaFevlIndexInfoModal
    },
    data () {
      return {
        description: '派生指标管理管理页面',
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
            title: '指标编号',
            align:"center",
            dataIndex: 'indexId'
           },
		   {
            title: '指标名称',
            align:"center",
            dataIndex: 'indexName'
           },

          {
            title: '度量类型',
            align:"center",
            dataIndex: 'metricType_dictText'
          },
        {
            title: '考核对象',
            align:"center",
            dataIndex: 'evlobjTypeId_dictText'
         },
          {
            title: '结果值类型',
            align:"center",
            dataIndex: 'type_dictText'
          },
		  /* {
            title: '指标归属机构',
            align:"center",
            dataIndex: 'orgId'
           },*/
		     {
            title: '描述',
            align:"center",
            dataIndex: 'remark'
           },

          {
            title: '创建人',
            align: 'center',
            dataIndex: 'createBy',
          },
          {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createTime',
            customRender: function(text) {
              return !text ? "":(text.length>10 ? text.substr(0,10) : text)
            }
          },
          {
            title: '修改人',
            align: 'center',
            dataIndex: 'updateBy',
          },
          {
            title: '修改时间',
            align: 'center',
            dataIndex: 'updateTime',
            customRender: function(text) {
              return !text ? "":(text.length>10 ? text.substr(0,10) : text)
            }
          },

		  /* {
            title: '计算公式',
            align:"center",
            dataIndex: 'formula'
           },
		   {
            title: '计算公式描述',
            align:"center",
            dataIndex: 'formulaNotes'
           },*/

		  /* {
            title: '作用域机构',
            align:"center",
            dataIndex: 'scopeOrgId'
           },
		   {
            title: '数据删除标志',
            align:"center",
            dataIndex: 'statFlag'
           },*/
		   /*{
            title: '业务条线编号',
            align:"center",
            dataIndex: 'bussSysNo'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khlc/pszbgl/pmaFevlIndexInfo/list",
          delete: "/khlc/pszbgl/pmaFevlIndexInfo/delete",
          deleteBatch: "/khlc/pszbgl/pmaFevlIndexInfo/deleteBatch",
          exportXlsUrl: "khlc/pszbgl/pmaFevlIndexInfo/exportXls",
          importExcelUrl: "khlc/pszbgl/pmaFevlIndexInfo/importExcel",
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