<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择支行"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同号">
              <a-input placeholder="请输入合同号" v-model="queryParam.hth"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流程业务编号">
              <a-input placeholder="请输入流程业务编号" v-model="queryParam.businessnumber"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="录入时间">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.lrsj"
                              @change="onlrDateChange" style="width: 100%;"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('档案删除审批信息')" v-has="'dascspxx:exportXls'">导出</a-button>
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'dascspxx:see'">详情</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dascspxx-modal ref="modalForm" @ok="modalFormOk"></dascspxx-modal>
  </a-card>
</template>

<script>
  import DascspxxModal from './modules/DascspxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "../../../../utils/util";

  export default {
    name: "DascspxxList",
    mixins:[JeecgListMixin],
    components: {
      DascspxxModal,JTreeSelect
    },
    data () {
      return {
        description: '档案删除审批信息管理页面',
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
            dataIndex: 'jgdm'
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
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
            title: '合同号',
            align:"center",
            dataIndex: 'hth'
          },
          {
            title: '合同金额',
            align:"center",
            dataIndex: 'htje'
          },
          {
            title: '合同余额',
            align:"center",
            dataIndex: 'htye'
          },
		   {
            title: '贷款品种',
            align:"center",
            dataIndex: 'dkpz_dictText'
           },
		   {
            title: '贷款责任人工号',
            align:"center",
            dataIndex: 'dkzrr'
           },
          {
            title: '贷款责任人姓名',
            align:"center",
            dataIndex: 'dkzrr_dictText'
          },
		   {
            title: '流程业务编号',
            align:"center",
            dataIndex: 'businessnumber'
           },
          {
            title: '流程审批节点',
            align:"center",
            dataIndex: 'lczt'
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
		   /*{
            title: '流程编号',
            align:"center",
            dataIndex: 'processid'
           },
		   {
            title: '申请说明',
            align:"center",
            dataIndex: 'sqsm'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz'
           },

		   {
            title: '文件id',
            align:"center",
            dataIndex: 'wjid'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dascspxx/dascspxx/list",
          delete: "/dascspxx/dascspxx/delete",
          deleteBatch: "/dascspxx/dascspxx/deleteBatch",
          exportXlsUrl: "dascspxx/dascspxx/exportXls",
          importExcelUrl: "dascspxx/dascspxx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleView: function(record) {
        console.log('Dascspxx => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看详情";
        this.$refs.modalForm.disableSubmit = true;
      },
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>