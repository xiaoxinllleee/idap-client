<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷记卡卡号">
              <a-input placeholder="请输入贷记卡卡号" v-model="queryParam.kh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否还清">
              <a-input placeholder="请输入是否还清" v-model="queryParam.sfhq"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷记卡分行代号">
              <a-input placeholder="请输入贷记卡分行代号" v-model="queryParam.djkfhdh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <!--<a-input placeholder="请输入垫款流水号" v-model="queryParam.khjg"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.khjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="加载时间">
              <a-range-picker  @change="onChangejzsj" v-model="queryParam.loadDate"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('ETC贷记卡垫款记录表')">导出</a-button>
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
    <djkdkjlb-modal ref="modalForm" @ok="modalFormOk"></djkdkjlb-modal>
  </a-card>
</template>

<script>
  import DjkdkjlbModal from './modules/DjkdkjlbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import {filterObj} from '@/utils/util'

  export default {
    name: "DjkdkjlbList",
    mixins:[JeecgListMixin],
    components: {
      DjkdkjlbModal,JTreeSelect
    },
    data () {
      return {
        description: 'ETC贷记卡垫款记录表管理页面',
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
            title: '贷记卡卡号',
            align:"center",
            dataIndex: 'kh'
           },
		   {
            title: '垫款日期',
            align:"center",
            dataIndex: 'dkrq'
           },
		   {
            title: '垫款时间',
            align:"center",
            dataIndex: 'dksj'
           },
		   {
            title: '垫款流水号',
            align:"center",
            dataIndex: 'dklsh'
           },
		   {
            title: '垫款金额',
            align:"center",
            dataIndex: 'dkje'
           },
		   {
            title: '垫款原因',
            align:"center",
            dataIndex: 'dkyy'
           },
		   {
            title: '是否还清',
            align:"center",
            dataIndex: 'sfhq'
           },
		   {
            title: '贷记卡银行代号',
            align:"center",
            dataIndex: 'djkyhdh'
           },
		   {
            title: '贷记卡分行代号',
            align:"center",
            dataIndex: 'djkfhdh'
           },
		   {
            title: '上贷记卡流水号',
            align:"center",
            dataIndex: 'djklsh'
           },
		   {
            title: '回收日期',
            align:"center",
            dataIndex: 'hsrq'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg'
           },
		   {
            title: '湘通卡号',
            align:"center",
            dataIndex: 'xtkh'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   /*{
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
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
          list: "/djkdkjlb/djkdkjlb/list",
          delete: "/djkdkjlb/djkdkjlb/delete",
          deleteBatch: "/djkdkjlb/djkdkjlb/deleteBatch",
          exportXlsUrl: "djkdkjlb/djkdkjlb/exportXls",
          importExcelUrl: "djkdkjlb/djkdkjlb/importExcel",
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
        delete param.loadDate;
        return filterObj(param);
      },
      onChangejzsj(value,dateString){
        let loadDateString=dateString
        this.queryParam.loadDate_begin=loadDateString[0]
        this.queryParam.loadDate_end=loadDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>