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
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户姓名：">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
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



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkjkpt_zhzjfhtj-modal ref="modalForm" @ok="modalFormOk"></dkjkpt_zhzjfhtj-modal>
  </a-card>
</template>

<script>
  import Dkjkpt_zhzjfhtjModal from './modules/Dkjkpt_zhzjfhtjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';

  export default {
    name: "Dkjkpt_zhzjfhtjList",
    mixins:[JeecgListMixin],
    components: {
      Dkjkpt_zhzjfhtjModal,JTreeSelect
    },
    data () {
      return {
        description: '支行资金返还率统计管理页面',
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
            title: '贷款年日平',
            align:"center",
            dataIndex: 'dkrpY'
           },
		   {
            title: '存款年日平',
            align:"center",
            dataIndex: 'ckrpY'
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
		   {
            title: '月资金归行率',
            align:"center",
            dataIndex: 'zjghlM'
           },
		   {
            title: '季资金归行率',
            align:"center",
            dataIndex: 'zjghlQ'
           },
		   {
            title: '年资金归行率',
            align:"center",
            dataIndex: 'zjghlY'
           },
		   {
            title: '客户覆盖面',
            align:"center",
            dataIndex: 'khfgm'
           },
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dkjkpt.zjghqk.zhzjfhltj/dkjkpt_zhzjfhtj/list",
          delete: "/dkjkpt.zjghqk.zhzjfhltj/dkjkpt_zhzjfhtj/delete",
          deleteBatch: "/dkjkpt.zjghqk.zhzjfhltj/dkjkpt_zhzjfhtj/deleteBatch",
          exportXlsUrl: "dkjkpt.zjghqk.zhzjfhltj/dkjkpt_zhzjfhtj/exportXls",
          importExcelUrl: "dkjkpt.zjghqk.zhzjfhltj/dkjkpt_zhzjfhtj/importExcel",
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