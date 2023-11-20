<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款类型">
              <j-dict-select-tag placeholder="请选择贷款类型" v-model="queryParam.dklx" dict-code="xdgl_dklx"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资料类型">
              <j-dict-select-tag placeholder="请选择资料类型" v-model="queryParam.zllx" dict-code="xdgl_zllx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资料名称">
              <a-input placeholder="请输入资料名称" v-model="queryParam.zlmc"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'XdglDkzl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('信贷贷款资料管理')" v-has="'XdglDkzl:exp'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel" v-has="'XdglDkzl:imp'">
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
        size="small"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="view(record)" v-has="'XdglDkzl:view'">预览</a>
          <a-divider type="vertical" />
          <a @click="down(record)" v-has="'XdglDkzl:down'">下载</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'XdglDkzl:del'">
                  <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xdglDkzl-modal ref="modalForm" @ok="modalFormOk"></xdglDkzl-modal>
  </a-card>
</template>

<script>
  import XdglDkzlModal from './modules/XdglDkzlModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "XdglDkzlList",
    mixins:[JeecgListMixin],
    components: {
      XdglDkzlModal
    },
    data () {
      return {
        description: '信贷贷款资料管理管理页面',
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
            title: '贷款类型',
            align:"center",
            dataIndex: 'dklx_dictText'
          },
		   {
            title: '资料类型',
            align:"center",
            dataIndex: 'zllx_dictText'
           },
		   {
            title: '资料名称',
            align:"center",
            dataIndex: 'zlmc'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime',
          },

         {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }


        ],
		url: {
          list: "/xdgl/dkzlgl/xdglDkzl/list",
          delete: "/xdgl/dkzlgl/xdglDkzl/delete",
          deleteBatch: "/xdgl/dkzlgl/xdglDkzl/deleteBatch",
          exportXlsUrl: "xdgl/dkzlgl/xdglDkzl/exportXls",
          importExcelUrl: "xdgl/dkzlgl/xdglDkzl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      down(record){
        console.log(record)
        //http://127.0.0.1:3001/cmms/sys/common/download/demo_1594171157273.docx
        window.open(
          `${window._CONFIG['staticDomainURL']}/`+ record.fwlj
        );
      },
      view(record){
        console.log(record)
        let url= `${window._CONFIG['staticDomainURL']}/`+ record.fwlj;
        window.open(
          //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
          `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url)

        );
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>