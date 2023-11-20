<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="批次号">
              <a-input placeholder="请输入批次号" v-model="queryParam.pch"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择开户机构"
                             v-model="queryParam.khjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开始日期">
              <a-date-picker @change="onChangeks" v-model="queryParam.ksrq" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="结束日期">
              <a-date-picker @change="onChangejs" v-model="queryParam.jsrq" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号类型">
              <a-select placeholder="全部" v-model="queryParam.zhlx">
                <a-select-option value="1">
                  对私活期
                </a-select-option>
                <a-select-option value="2">
                  对公活期
                </a-select-option>
                <a-select-option value="3">
                  定期
                </a-select-option>
                <a-select-option value="4">
                  一本通
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
      <a-button  icon="download" @click="handleExportXls('客户存款日均查询')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>
      <a-button  icon="area-chart">提取</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
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
    <khckrjcx-modal ref="modalForm" @ok="modalFormOk"></khckrjcx-modal>
  </a-card>
</template>

<script>
  import KhckrjcxModal from './modules/KhckrjcxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "KhckrjcxList",
    mixins:[JeecgListMixin],
    components: {
      KhckrjcxModal,JTreeSelect
    },
    data () {
      return {
        description: '客户存款日均查询管理页面',
        /*defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',*/
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
            title: '批次号',
            align:"center",
            dataIndex: 'pch'
           },
          {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'khjg_dictText'
          },
          {
            title: '账号',
            align:"center",
            dataIndex: 'zh'
          },
          {
            title: '卡号',
            align:"center",
            dataIndex: 'kh'
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
            title: '账号类型',
            align:"center",
            dataIndex: 'zhlx_dictText'
          },
          {
            title: '日均余额',
            align:"center",
            dataIndex: 'rjye'
          },
		   {
            title: '结束日期当天余额',
            align:"center",
            dataIndex: 'ye'
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
            title: '统计天数',
            align:"center",
            dataIndex: 'tjts'
          },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入操作员',
            align:"center",
            dataIndex: 'lrczy'
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/khckrjcx/khckrjcx/list",
          delete: "/khckrjcx/khckrjcx/delete",
          deleteBatch: "/khckrjcx/khckrjcx/deleteBatch",
          exportXlsUrl: "khckrjcx/khckrjcx/exportXls",
          importExcelUrl: "khckrjcx/khckrjcx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      onChangeks(date,dateString){
        this.queryParam.ksrq = dateString;
      },
      onChangejs(date,dateString){
        this.queryParam.jsrq = dateString;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>