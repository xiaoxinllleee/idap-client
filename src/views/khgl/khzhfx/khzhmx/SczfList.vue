<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.sjrq" :format="DateFormat"
                              @change="onDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="网格编号">
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
              <a-form-item label="员工工号">
                <a-input placeholder="请输入员工工号" v-model="queryParam.sskhjl"></a-input>
              </a-form-item>
            </a-col>
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
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('首次走访明细')">导出</a-button>
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
    <sczf-modal ref="modalForm" @ok="modalFormOk"></sczf-modal>
  </a-card>
</template>

<script>
  import SczfModal from './modules/SczfModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import CkxxModal from './modules/CkxxModal'
  export default {
    name: "SczfList",
    mixins:[JeecgListMixin],
    components: {
      SczfModal,JTreeSelect,JTreeSelectNotJg
    },
    data () {
      return {
        description: '首次走访明细管理页面',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq'
           },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '网格编号',
            align:"center",
            dataIndex: 'wgbh_dictText'
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'sskhjl'
          },
          {
            title: '客户经理名称',
            align:"center",
            dataIndex: 'sskhjl_dictText'
          },
		   {
            title: '户号编码',
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
            title: '首次走访日期',
            align:"center",
            dataIndex: 'sczfrq'
           },
		   {
            title: '首次走访人员',
            align:"center",
            dataIndex: 'sczfry'
           },
		   {
            title: '授信类型',
            align:"center",
            dataIndex: 'sxlx'
           },

        ],
		url: {
          list: "/khzhmx/sczf/list",
          delete: "/khzhmx/sczf/delete",
          deleteBatch: "/khzhmx/sczf/deleteBatch",
          exportXlsUrl: "khzhmx/sczf/exportXls",
          importExcelUrl: "khzhmx/sczf/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      onDateChange: function(value, dateString) {
        let dqrqDateString         = dateString;
        this.queryParam.sjrq_begin = dqrqDateString[0];
        this.queryParam.sjrq_end   = dqrqDateString[1];
      },
      getQueryParams: function() {
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.sjrq;
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>