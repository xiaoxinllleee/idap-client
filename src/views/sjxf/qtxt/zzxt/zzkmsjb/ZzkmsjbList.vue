<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构编码">
             <!-- <a-input placeholder="请输入机构编码" v-model="queryParam.brhmNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.brhmNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="币种编码">
              <a-input placeholder="请输入币种编码" v-model="queryParam.currNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目编码">
              <a-input placeholder="请输入科目编码" v-model="queryParam.itemNo"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('总帐科目数据表(结转前数据)')">导出</a-button>

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
        :scroll="{x:3430}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zzkmsjb-modal ref="modalForm" @ok="modalFormOk"></zzkmsjb-modal>
  </a-card>
</template>

<script>
  import ZzkmsjbModal from './modules/ZzkmsjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "ZzkmsjbList",
    mixins:[JeecgListMixin],
    components: {
      ZzkmsjbModal,JTreeSelect
    },
    data () {
      return {
        description: '总帐科目数据表(结转前数据)管理页面',
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
            title: '机构编码',
            align:"center",
            dataIndex: 'brhmNo_dictText'
           },
		   {
            title: '币种编码',
            align:"center",
            dataIndex: 'currNo'
           },
		   {
            title: '科目编码',
            align:"center",
            dataIndex: 'itemNo'
           },
		   {
            title: '日初借方金额',
            align:"center",
            dataIndex: 'dayBeginDr'
           },
		   {
            title: '日初贷方金额',
            align:"center",
            dataIndex: 'dayBeginCr'
           },
		   {
            title: '日初借方笔数',
            align:"center",
            dataIndex: 'dayBeginDrCount'
           },
		   {
            title: '日初贷方笔数',
            align:"center",
            dataIndex: 'dayBeginCrCount'
           },
		   {
            title: '日发生借方金额',
            align:"center",
            dataIndex: 'dayNetDr'
           },
		   {
            title: '日发生贷方金额',
            align:"center",
            dataIndex: 'dayNetCr'
           },
		   {
            title: '日发生借方笔数',
            align:"center",
            dataIndex: 'dayNetDrCount'
           },
		   {
            title: '日发生贷方笔数',
            align:"center",
            dataIndex: 'dayNetCrCount'
           },
		   {
            title: '日末借方金额',
            align:"center",
            dataIndex: 'dayEndDr'
           },
		   {
            title: '日末贷方金额',
            align:"center",
            dataIndex: 'dayEndCr'
           },
		   {
            title: '日末借方笔数',
            align:"center",
            dataIndex: 'dayEndDrCount'
           },
		   {
            title: '日末贷方笔数',
            align:"center",
            dataIndex: 'dayEndCrCount'
           },
		   {
            title: '月初借方金额',
            align:"center",
            dataIndex: 'monthBeginDr'
           },
		   {
            title: '月初贷方金额',
            align:"center",
            dataIndex: 'monthBeginCr'
           },
		   {
            title: '月发生借方金额',
            align:"center",
            dataIndex: 'monthNetDr'
           },
		   {
            title: '月发生贷方金额',
            align:"center",
            dataIndex: 'monthNetCr'
           },
		   {
            title: '季初借方金额',
            align:"center",
            dataIndex: 'quarterBeginDr'
           },
		   {
            title: '季初贷方金额',
            align:"center",
            dataIndex: 'quarterBeginCr'
           },
		   {
            title: '季发生借方金额',
            align:"center",
            dataIndex: 'quarterNetDr'
           },
		   {
            title: '季发生贷方金额',
            align:"center",
            dataIndex: 'quarterNetCr'
           },
		   {
            title: '年初借方金额',
            align:"center",
            dataIndex: 'yearBeginDr'
           },
		   {
            title: '年初贷方金额',
            align:"center",
            dataIndex: 'yearBeginCr'
           },
		   {
            title: '年发生借方金额',
            align:"center",
            dataIndex: 'yearNetDr'
           },
		   {
            title: '年发生贷方金额',
            align:"center",
            dataIndex: 'yearNetCr'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		/*   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/zzkmsjb/zzkmsjb/list",
          delete: "/zzkmsjb/zzkmsjb/delete",
          deleteBatch: "/zzkmsjb/zzkmsjb/deleteBatch",
          exportXlsUrl: "zzkmsjb/zzkmsjb/exportXls",
          importExcelUrl: "zzkmsjb/zzkmsjb/importExcel",
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