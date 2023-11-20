<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择支行查询" v-model="queryParam.sszh" :sszh="true" :showSearch="false" :treeDefaultExpandAll="true"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8"><a-form-item label="客户类型">
            <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="khlx"/>
          </a-form-item></a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户统一查询')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
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
          <a @click="nhhandleEdit(record)" v-if="record.khlx == '1'">农户明细</a>
          <a @click="shhandleEdit(record)" v-if="record.khlx == '2'">商户明细</a>

         <!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
        <span slot="dz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="5"/>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <vkhglKhtycx-modal ref="modalForm" @ok="modalFormOk"></vkhglKhtycx-modal>
    <v-khgl-shxxgl-modal ref="shmodalForm"/>
    <nhjbxxx-xq-modal ref="nhmodalForm"/>
  </a-card>
</template>

<script>
  import VkhglKhtycxModal from './modules/VKhglKhtycxModal'
  import VKhglShxxglModal from '@/views/khgl/sh/modules/VKhglShxxglModal'
  import  NhjbxxxXqModal from '@/views/khgl/nh_old/modules/NhjbxxxXqModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from '@/components/jeecg/JEllipsis'


  export default {
    name: "VkhglKhtycxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,VkhglKhtycxModal,JTreeSelect,VKhglShxxglModal,NhjbxxxXqModal
    },
    data () {
      return {
        description: '客户统一查询管理页面',
        // 表头
        columns: [
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText',
            width: 120,
          },
		   {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy_dictText',
           },
		   {
            title: '编码',
            align:"center",
            dataIndex: 'hhbm'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText',
           },
		   {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' },
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khgl.khglkhtycx/vkhglKhtycx/list",
          delete: "/khgl.khglkhtycx/vkhglKhtycx/delete",
          deleteBatch: "/khgl.khglkhtycx/vkhglKhtycx/deleteBatch",
          exportXlsUrl: "khgl.khglkhtycx/vkhglKhtycx/exportXls",
          importExcelUrl: "khgl.khglkhtycx/vkhglKhtycx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      shhandleEdit: function(record) {
        this.$refs.shmodalForm.edit(record,2);
        this.$refs.shmodalForm.title = "商户详情";
        this.$refs.shmodalForm.disableSubmit = true;
      },
      nhhandleEdit: function(record) {
        this.$refs.nhmodalForm.edit(record,2);
        this.$refs.nhmodalForm.title = "农户详情";
        this.$refs.nhmodalForm.disableSubmit = true;
      },
      initQueryParams() {
        //通过首页查询
        if(this.$route.query.type) {
          this.queryParam.type = this.$route.query.type;
          this.queryParam.hhbm = this.$route.query.queryValue;
          this.paramsInited = true;
        }
      },
      beforeSearchQuery() {
        this.queryParam.type = null;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>