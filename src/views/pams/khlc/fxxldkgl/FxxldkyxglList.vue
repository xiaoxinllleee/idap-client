<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="品种">
              <a-input placeholder="请输入品种" v-model="queryParam.dkpz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <a-input placeholder="请输入所属机构" v-model="queryParam.ssjg"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('福祥系列贷款营销管理')">导出</a-button>
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
    <fxxldkyxgl-modal ref="modalForm" @ok="modalFormOk"></fxxldkyxgl-modal>
  </a-card>
</template>

<script>
  import FxxldkyxglModal from './modules/FxxldkyxglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'

  export default {
    name: "FxxldkyxglList",
    mixins:[JeecgListMixin],
    components: {
      FxxldkyxglModal
    },
    data () {
      return {
        description: '福祥系列贷款营销管理管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
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
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },

          },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '品种',
            align:"center",
            dataIndex: 'dkpz'
           },
		   {
            title: '所属机构',
            align:"center",
            dataIndex: 'ssjg'
           },
		   {
            title: '营销人',
            align:"center",
            dataIndex: 'yxr'
           },
		   {
            title: '主客户经理',
            align:"center",
            dataIndex: 'zkhjl'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/fxxldkgl/fxxldkyxgl/list",
          delete: "/fxxldkgl/fxxldkyxgl/delete",
          deleteBatch: "/fxxldkgl/fxxldkyxgl/deleteBatch",
          exportXlsUrl: "fxxldkgl/fxxldkyxgl/exportXls",
          importExcelUrl: "fxxldkgl/fxxldkyxgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams(){
        let tjyfMoment = "";
        if(this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>