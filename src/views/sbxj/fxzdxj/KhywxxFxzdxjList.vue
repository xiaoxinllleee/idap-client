<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="站点编号">
              <a-input placeholder="请输入站点编号" v-model="queryParam.zdbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="站点名称">
              <a-input placeholder="请输入站点名称" v-model="queryParam.zdmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="入网时间">
              <a-date-picker placeholder="请选择入网时间" v-model="queryParam.rwsj" style="width: 100%;"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="地址">
              <a-input placeholder="请输入地址" v-model="queryParam.dz"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('福祥站点巡检')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
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
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <khywxxFxzdxj-modal ref="modalForm" @ok="modalFormOk"></khywxxFxzdxj-modal>
  </a-card>
</template>

<script>
  import KhywxxFxzdxjModal from './modules/KhywxxFxzdxjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "KhywxxFxzdxjList",
    mixins:[JeecgListMixin],
    components: {
      KhywxxFxzdxjModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '福祥站点主表管理页面',
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
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '站点编号',
            align:"center",
            dataIndex: 'zdbh'
           },
		   {
            title: '站点名称',
            align:"center",
            dataIndex: 'zdmc'
           },
		   {
            title: '入网时间',
            align:"center",
            dataIndex: 'rwsj'
           },
		  /* {
            title: '经度',
            align:"center",
            dataIndex: 'jd'
           },
		   {
            title: '纬度',
            align:"center",
            dataIndex: 'wd'
           },*/
		   {
            title: '站点负责人',
            align:"center",
            dataIndex: 'zdfzr'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh'
           },
          {
            title: '地址',
            align:"center",
            dataIndex: 'dz'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/fxzdxj/khywxxFxzdxj/list",
          delete: "/fxzdxj/khywxxFxzdxj/delete",
          deleteBatch: "/fxzdxj/khywxxFxzdxj/deleteBatch",
          exportXlsUrl: "fxzdxj/khywxxFxzdxj/exportXls",
          importExcelUrl: "fxzdxj/khywxxFxzdxj/importExcel",
          exportTemplateUrl: "/fxzdxj/khywxxFxzdxj/exportTemplateXls",
       },
        exportTemplateName: '福祥站点巡检导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams(){
        let tjrqment = "";
        let tjyfvalue=this.$route.query.rwsj;
        if(this.queryParam.rwsj) {
          tjrqment = this.queryParam.rwsj.format("YYYY-MM-DD");
        }
        if(tjyfvalue){
          tjrqment=tjyfvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.rwsj) {
          param.rwsj   = tjrqment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>