<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属网格">
              <JTreeSelectNotJg placeholder="请选择所属网格"
                                v-model="queryParam.wgbh"
                                treeNodeFilterProp="title"
                                pidField="PARENT_ID"
                                dict="YXDYGL_MAIN,WGMC,ID"
                                pidValue="0"
                                :showSearch="true"
                                :treeDefaultExpandAll="true"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('信贷白名单汇总')" v-has="'XdbmdhzXzz:exp'">导出</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">-->
        <!--<a-menu slot="overlay">-->
          <!--<a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
        <!--</a-menu>-->
        <!--<a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--</a-dropdown>-->
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
    <xdbmdhzXzz-modal ref="modalForm" @ok="modalFormOk"></xdbmdhzXzz-modal>
  </a-card>
</template>

<script>
  import XdbmdhzXzzModal from './modules/XdbmdhzXzzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'

  export default {
    name: "XdbmdhzXzzList",
    mixins:[JeecgListMixin],
    components: {
      XdbmdhzXzzModal, JTreeSelectNotJg
    },
    data () {
      return {
        description: '信贷白名单汇总管理页面1',
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
            title: '所属网格',
            align:"center",
            dataIndex: 'wgbh_dictText'
           },
		   {
            title: '总户数',
            align:"center",
            dataIndex: 'zhs'
           },
		   {
            title: '贷款户数',
            align:"center",
            dataIndex: 'dkhs'
           },
		   {
            title: '贷款户数比例',
            align:"center",
            dataIndex: 'dkhsBl'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '表外贷款户数',
            align:"center",
            dataIndex: 'bwdkhs'
           },
		   {
            title: '表外贷款余额',
            align:"center",
            dataIndex: 'bwdkye'
           },
		   {
            title: '便民卡户数',
            align:"center",
            dataIndex: 'bmkhs'
           },
		   {
            title: '便民卡余额',
            align:"center",
            dataIndex: 'bmkye'
           },
		   {
            title: '村组白名单户数',
            align:"center",
            dataIndex: 'czbmdhs'
           },
		   {
            title: '潜在营销户数',
            align:"center",
            dataIndex: 'qzyxhs'
           },
		   {
            title: '潜在营销户数比例',
            align:"center",
            dataIndex: 'qzyxhsBl'
           },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
		url: {
          list: "/tjfx/xdbmdhzXzz/list",
          delete: "/tjfx/xdbmdhzXzz/delete",
          deleteBatch: "/tjfx/xdbmdhzXzz/deleteBatch",
          exportXlsUrl: "tjfx/xdbmdhzXzz/exportXls",
          importExcelUrl: "tjfx/xdbmdhzXzz/importExcel",
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