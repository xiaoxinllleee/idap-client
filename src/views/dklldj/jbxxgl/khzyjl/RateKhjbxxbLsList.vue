<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="原组织标识">
              <j-tree-select placeholder="请选择支行查询" v-model="queryParam.yzzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,zzbz" pidField="sjzzbz"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="现组织标识">
              <j-tree-select placeholder="请选择支行查询" v-model="queryParam.xzzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,zzbz" pidField="sjzzbz"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="客户名称">
                <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="lldj_khlx"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
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
      <a-button icon="download" @click="handleExportXls('客户转移记录')" v-has="'khzyjl:exportXls'">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="xgsj"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="khlx" slot-scope="khlx">
          <a-tag :key="khlx" :color="khlx==='个人'?'#FB6241':khlx==='企业'?'#8A2BE2':'grey'">
            {{ khlx }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "RateKhjbxxbLsList",
    mixins: [JeecgListMixin],
    components: {
      JInput,
      JTreeSelect
    },
    data() {
      return {
        description: '客户转移记录管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '原组织标识',
            align: "center",
            dataIndex: 'yzzbz'
          },
          {
            title: '原组织名称',
            align: "center",
            dataIndex: 'yzzbz_dictText'
          },
          {
            title: '现组织标识',
            align: "center",
            dataIndex: 'xzzbz'
          },
          {
            title: '现组织名称',
            align: "center",
            dataIndex: 'xzzbz_dictText'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            scopedSlots: {customRender: 'khlx'},
          },
          {
            title: '法人代表',
            align: "center",
            dataIndex: 'frdb'
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'xgsj'
          },
          {
            title: '修改操作员',
            align: "center",
            dataIndex: 'xgczy'
          },
        ],
        url: {
          list: "/rateKhjbxxbLs/rateKhjbxxbLs/list",
          delete: "/rateKhjbxxbLs/rateKhjbxxbLs/delete",
          deleteBatch: "/rateKhjbxxbLs/rateKhjbxxbLs/deleteBatch",
          exportXlsUrl: "rateKhjbxxbLs/rateKhjbxxbLs/exportXls",
          importExcelUrl: "rateKhjbxxbLs/rateKhjbxxbLs/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {}
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>