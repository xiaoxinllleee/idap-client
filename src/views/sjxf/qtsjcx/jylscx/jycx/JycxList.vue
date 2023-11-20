<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易机构">
              <!--<a-input placeholder="请输入交易机构" v-model="queryParam.brNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.brNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易账号">
              <a-input placeholder="请输入交易账号" v-model="queryParam.accNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangejyrq" v-model="queryParam.trnDate" :format="dateFormat"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易机构名称">
              <a-input placeholder="请输入交易机构名称" v-model="queryParam.brName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.trxCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易金额">
            <!--  <a-input placeholder="请输入交易金额" v-model="queryParam.amount"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.amount_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.amount_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
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
     <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('交易查询')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
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


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jycx-modal ref="modalForm" @ok="modalFormOk"></jycx-modal>
  </a-card>
</template>

<script>
  import JycxModal from './modules/JycxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import {filterObj} from '@/utils/util'

  export default {
    name: "JycxList",
    mixins:[JeecgListMixin],
    components: {
      JycxModal,JTreeSelect
    },
    data () {
      return {
        description: '交易查询管理页面',
        // 表头
        dateFormat:'YYYYMMDD',
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
            title: '交易户名',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '交易账号',
            align:"center",
            dataIndex: 'accNo'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'trnDate'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'trnTime'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'brNo_dictText'
           },
		   {
            title: '交易机构名称',
            align:"center",
            dataIndex: 'brName'
           },
		   {
            title: '对方账号',
            align:"center",
            dataIndex: 'oppAccNo'
           },
		   {
            title: '对方户名',
            align:"center",
            dataIndex: 'oppAccName'
           },
		   {
            title: '对方机构号',
            align:"center",
            dataIndex: 'oppBrNo'
           },
		   {
            title: '对方机构名称',
            align:"center",
            dataIndex: 'oppBrName'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'trxCode'
           },
		   {
            title: '交易名称',
            align:"center",
            dataIndex: 'trxName'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amount'
           },
		   {
            title: '柜员名称',
            align:"center",
            dataIndex: 'tellName'
           },
/*
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
*/
        ],
		url: {
          list: "/jycx/jycx/list",
          delete: "/jycx/jycx/delete",
          deleteBatch: "/jycx/jycx/deleteBatch",
          exportXlsUrl: "jycx/jycx/exportXls",
          importExcelUrl: "jycx/jycx/importExcel",
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
        delete param.trnDate;
        return filterObj(param);
      },
      onChangejyrq(value,dateString){
        let trnDateString = dateString
        this.queryParam.trnDate_begin = trnDateString[0]
        this.queryParam.trnDate_end = trnDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>