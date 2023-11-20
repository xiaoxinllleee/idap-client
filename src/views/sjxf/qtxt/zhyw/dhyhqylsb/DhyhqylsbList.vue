<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="变更日期">
              <a-range-picker @change="onChangebgrq" v-model="queryParam.changedate"/>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.newacctno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.changetime"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="经办人证件号码">
              <a-input placeholder="请输入经办人证件号码" v-model="queryParam.operidentno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="变更机构">
              <a-input placeholder="请输入变更机构" v-model="queryParam.changebranchid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="变更柜员">
              <a-input placeholder="请输入变更柜员" v-model="queryParam.changetellerno"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('电话银行签约流水表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
         :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"

        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
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
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dhyhqylsb-modal ref="modalForm" @ok="modalFormOk"></dhyhqylsb-modal>
  </a-card>
</template>

<script>
  import DhyhqylsbModal from './modules/DhyhqylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  export default {
    name: "DhyhqylsbList",
    mixins:[JeecgListMixin],
    components: {
      DhyhqylsbModal
    },
    data () {
      return {
        description: '电话银行签约流水表管理页面',
        // 表头
        columns: [
          {
            title: '',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '变更日期',
            align:"center",
            dataIndex: 'changedate'
           },
		   {
            title: '变更时间',
            align:"center",
            dataIndex: 'changetime'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'newacctno'
           },
		   {
            title: '变更类型',
            align:"center",
            dataIndex: 'changetype'
           },
		   {
            title: '签约功能',
            align:"center",
            dataIndex: 'signfunction'
           },
		   {
            title: '单笔限额',
            align:"center",
            dataIndex: 'singlelimit'
           },
		   {
            title: '单日限额',
            align:"center",
            dataIndex: 'daylimit'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'identtype'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'identno'
           },
		   {
            title: '经办人证件类型',
            align:"center",
            dataIndex: 'operidenttype'
           },
		   {
            title: '经办人证件号码',
            align:"center",
            dataIndex: 'operidentno'
           },
		   {
            title: '变更渠道',
            align:"center",
            dataIndex: 'changechannel'
           },
		   {
            title: '变更机构',
            align:"center",
            dataIndex: 'changebranchid'
           },
		   {
            title: '变更柜员',
            align:"center",
            dataIndex: 'changetellerno'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '预留字段1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留字段2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留字段3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		  /* {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'dttime',
            align:"center",
            dataIndex: 'dttime'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dhyhqylsb/dhyhqylsb/list",
          delete: "/dhyhqylsb/dhyhqylsb/delete",
          deleteBatch: "/dhyhqylsb/dhyhqylsb/deleteBatch",
          exportXlsUrl: "dhyhqylsb/dhyhqylsb/exportXls",
          importExcelUrl: "dhyhqylsb/dhyhqylsb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.changedate;
        return filterObj(param);
      },
      onChangebgrq(value,dateString){
        let changedateString=dateString
        this.queryParam.changedate_begin=changedateString[0]
        this.queryParam.changedate_end=changedateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>