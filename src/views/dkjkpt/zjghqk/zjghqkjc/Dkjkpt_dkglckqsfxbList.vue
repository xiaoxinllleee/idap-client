<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
            <a-col :md="6" :sm="8">
              <a-form-item label="统计月份">
              <a-month-picker placeholder="请输入统计月份" v-model="queryParam.tjyf" style="width: 230px;"/>
            </a-form-item>
            </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjzzbz"
                             showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户类型">
              <j-dict-select-tag  v-model="queryParam.khlx" placeholder="请选择客户类型"
                                  dictCode="dkjkpt_khlx"/>
            </a-form-item>


          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
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
      <!--<a-button type="primary" @click="">提取</a-button>-->

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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

       <!-- <span slot="action" slot-scope="text, record">
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
    <dkjkpt_dkglckqsfxb-modal ref="modalForm" @ok="modalFormOk"></dkjkpt_dkglckqsfxb-modal>
  </a-card>
</template>

<script>
  import Dkjkpt_dkglckqsfxbModal from './modules/Dkjkpt_dkglckqsfxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';



  export default {
    name: "Dkjkpt_dkglckqsfxbList",
    mixins:[JeecgListMixin],
    components: {
      Dkjkpt_dkglckqsfxbModal,JTreeSelect
    },
    data () {
      return {
        description: '资金归行情况监测管理页面',
        // 表头
        columns: [

		   {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf'
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
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },
		   {
            title: '客户地址',
            align:"center",
            dataIndex: 'khdz'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
           },
		   {
            title: '资金归行率%',
            align:"center",
            dataIndex: 'zjghl'
           },
		   {
            title: '贷款日平',
            align:"center",
            dataIndex: 'dkrp'
           },
		   {
            title: '存款日平',
            align:"center",
            dataIndex: 'ckrp'
           },
		   {
            title: '贷款月日平',
            align:"center",
            dataIndex: 'dkrpM'
           },
		   {
            title: '存款月日平',
            align:"center",
            dataIndex: 'ckrpM'
           },
		   {
            title: '贷款季日平',
            align:"center",
            dataIndex: 'dkrpQ'
           },
		   {
            title: '存款季日平',
            align:"center",
            dataIndex: 'ckrpQ'
           },
		   /*{
            title: 'zjghlM',
            align:"center",
            dataIndex: 'zjghlM'
           },
		   {
            title: 'zjghlQ',
            align:"center",
            dataIndex: 'zjghlQ'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dkjkpt.zjghqk.zjghqkjc/dkjkpt_dkglckqsfxb/list",
          delete: "/dkjkpt.zjghqk.zjghqkjc/dkjkpt_dkglckqsfxb/delete",
          deleteBatch: "/dkjkpt.zjghqk.zjghqkjc/dkjkpt_dkglckqsfxb/deleteBatch",
          exportXlsUrl: "dkjkpt.zjghqk.zjghqkjc/dkjkpt_dkglckqsfxb/exportXls",
          importExcelUrl: "dkjkpt.zjghqk.zjghqkjc/dkjkpt_dkglckqsfxb/importExcel",
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
        let tjyfment="";
        if(this.queryParam.tjyf){
          tjyfment=this.queryParam.tjyf.format("YYYY-MM")+"-01";
        }
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf=tjyfment;
        return filterObj(param);
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>