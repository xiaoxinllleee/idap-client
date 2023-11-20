<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="客户类型" v-model="queryParam.khlx" dictCode="dkjkpt_khlx"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入时间">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.lrsj" @change="onlrDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款合同">
              <a-input placeholder="请输入贷款合同" v-model="queryParam.hth"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款品种">
              <j-dict-select-tag placeholder="请选择贷款品种" v-model="queryParam.dkpz" dictCode="dkzl"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('信贷档案资料管理')" v-has="'xddazlgl:exportXls'">导出</a-button>


    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2030}"
        @change="handleTableChange">

        <span slot="hth" slot-scope="text">
          <j-ellipsis :value="text" :length="15"/>
        </span>
        <span slot="dkpz" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="lxdz" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="wjlj" slot-scope="text">
          <j-ellipsis :value="text" :length="20"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'xddazlgl:see'">详情</a>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkhtsjgl-modal ref="modalForm" @ok="modalFormOk"></dkhtsjgl-modal>
  </a-card>
</template>

<script>
  //import XddazlglModal from './modules/XddazlglModal'
  import DkhtsjglModal from './modules/DkhtsjglModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "../../../../utils/util";

  export default {
    name: "XddazlglList",
    mixins:[JeecgListMixin],
    components: {
      DkhtsjglModal,JEllipsis,JTreeSelect
    },
    data () {
      return {
        description: '信贷档案资料管理管理页面',
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
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
            width: 100
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText',
            width: 100
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc',
            width: 100
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width: 160
          },
          {
            title: '贷款合同',
            align:"center",
            dataIndex: 'hth',
            scopedSlots: { customRender: 'hth' },
            width: 180
          },
          {
            title: '贷款品种',
            align:"center",
            dataIndex: 'dkpz_dictText',
            scopedSlots: { customRender: 'dkpz' },
            width: 160
          },
          {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh',
            width: 120
          },
          {
            title: '联系地址',
            align:"center",
            dataIndex: 'lxdz',
            scopedSlots: { customRender: 'lxdz' },
            width: 180
          },
          {
            title: '档案类型',
            align:"center",
            dataIndex: 'fjlx',
            width: 150
          },
          {
            title: '文件路径',
            align:"center",
            dataIndex: 'wjlj',
            scopedSlots: { customRender: 'wjlj' },
            width: 200
          },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText',
            width: 100
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr',
            width: 100
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
          },

		   /*{
            title: 'wjid',
            align:"center",
            dataIndex: 'wjid'
           },

		   {
            title: 'dkzl',
            align:"center",
            dataIndex: 'dkzl'
           },
		   {
            title: 'fwlj',
            align:"center",
            dataIndex: 'fwlj'
           },
		   {
            title: 'wjdx',
            align:"center",
            dataIndex: 'wjdx'
           },
		   {
            title: 'fjlx1',
            align:"center",
            dataIndex: 'fjlx1'
           },
		   {
            title: 'fwlj1',
            align:"center",
            dataIndex: 'fwlj1'
           },
		   {
            title: 'wjlj1',
            align:"center",
            dataIndex: 'wjlj1'
           },
		   {
            title: 'ywbh',
            align:"center",
            dataIndex: 'ywbh'
           },
		   {
            title: 'dkzrr',
            align:"center",
            dataIndex: 'dkzrr'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/xddazlgl/xddazlgl/list",
          delete: "/xddazlgl/xddazlgl/delete",
          deleteBatch: "/xddazlgl/xddazlgl/deleteBatch",
          exportXlsUrl: "xddazlgl/xddazlgl/exportXls",
          importExcelUrl: "xddazlgl/xddazlgl/importExcel",
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
        delete param.lrsj;
        return filterObj(param);
      },

      onlrDateChange(date,dateString){
        this.queryParam.lrsjString = dateString[0] + "," + dateString[1];
      },

      handleView: function(record) {
        console.log('Xddazlgl => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>