<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数编码">
              <a-input placeholder="请输入参数编码" v-model="queryParam.csbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数名称">
              <a-input placeholder="请输入参数名称" v-model="queryParam.csmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开始日期">
              <a-input  v-model="queryParam.ksrq"  width="100%"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="结束日期">
              <a-input  v-model="queryParam.jsrq" width="100%" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="启用标志">
              <a-select  placeholder="全部" v-model="queryParam.qybz" style="width: 100%" >
                <a-select-option value="0">
                  未启用
                </a-select-option>
                <a-select-option value="1">
                  启用
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否跨月">
              <a-select  placeholder="全部" v-model="queryParam.sfky" style="width: 100%" >
                <a-select-option value="0">
                  是
                </a-select-option>
                <a-select-option value="1">
                  否
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'dkdyrpcssz:add'">新增</a-button>
      <a-button  :loading="exportLoading" icon="download" @click="handleExportXls('贷款当月日平参数设置表')" v-has="'dkdyrpcssz:exportXls'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
     <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

  <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="csbm"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkdyrpcssz:edit'">编辑</a>

          <a-divider type="vertical" />
         <!-- <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                 </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.csbm)" v-has="'dkdyrpcssz:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <erpBasWyxcssz-modal ref="modalForm" @ok="modalFormOk"></erpBasWyxcssz-modal>
  </a-card>
</template>

<script>
  import ErpBasWyxcsszModal from './modules/ErpBasWyxcsszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import store from '@/store/'
  export default {
    name: "ErpBasWyxcsszList",
    mixins:[JeecgListMixin],
    components: {
      ErpBasWyxcsszModal
    },
    data () {
      return {
        description: '贷款当月日平参数设置表管理页面',
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
            dataIndex: 'csbm'
           },
		   {
            title: '参数名称',
            align:"center",
            dataIndex: 'csmc'
           },
		   {
            title: '开始日期',
            align:"center",
            dataIndex: 'ksrq'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'jsrq'
           },
		   {
            title: '启用标识',
            align:"center",
            dataIndex: 'qybz_dictText'
           },
		   {
            title: '是否跨月',
            align:"center",
            dataIndex: 'sfky_dictText'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
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
          list: "/dkdyrp/erpBasWyxcssz/list",
          delete: "/dkdyrp/erpBasWyxcssz/delete",
          deleteBatch: "/dkdyrp/erpBasWyxcssz/deleteBatch",
          exportXlsUrl: "dkdyrp/erpBasWyxcssz/exportXls",
          importExcelUrl: "dkdyrp/erpBasWyxcssz/importExcel",
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