<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作网点">
              <a-input placeholder="请输入操作网点" v-model="queryParam.operbankno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作人员">
              <a-input placeholder="请输入操作人员" v-model="queryParam.operno"></a-input>
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
            <a-form-item label="开户机构">
            <!--  <a-input placeholder="请输入开户机构" v-model="queryParam.khjg"></a-input>-->
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
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.status"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('ETC绑定信息表')">导出</a-button>
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
        :scroll="{x:3450}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <bdxxb-modal ref="modalForm" @ok="modalFormOk"></bdxxb-modal>
  </a-card>
</template>

<script>
  import BdxxbModal from './modules/BdxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "BdxxbList",
    mixins:[JeecgListMixin],
    components: {
      BdxxbModal,JTreeSelect
    },
    data () {
      return {
        description: 'ETC绑定信息表管理页面',
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
            title: '绑定时间',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '操作网点',
            align:"center",
            dataIndex: 'operbankno'
           },
		   {
            title: '操作人员',
            align:"center",
            dataIndex: 'operno'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '湘通卡号',
            align:"center",
            dataIndex: 'xtkh'
           },
		   {
            title: '账户类型',
            align:"center",
            dataIndex: 'zhlx'
           },
		   {
            title: '账号',
            align:"center",
            dataIndex: 'zh'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
           },
		   {
            title: '车牌号码',
            align:"center",
            dataIndex: 'cphm'
           },
		   {
            title: '车牌颜色',
            align:"center",
            dataIndex: 'cpys'
           },
		   {
            title: '车辆类型',
            align:"center",
            dataIndex: 'cllx'
           },
		   {
            title: '发动机号',
            align:"center",
            dataIndex: 'fdjh'
           },
		   {
            title: '车辆特征',
            align:"center",
            dataIndex: 'cltz'
           },
		   {
            title: 'OBU序号',
            align:"center",
            dataIndex: 'obuid'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjg'
           },
		   {
            title: '账户序号',
            align:"center",
            dataIndex: 'zhxh'
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
            title: '状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '预解绑日期',
            align:"center",
            dataIndex: 'yjbrq'
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
		  /* {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
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
            title: 'zhOld',
            align:"center",
            dataIndex: 'zhOld'
           },
		   {
            title: 'acctno',
            align:"center",
            dataIndex: 'acctno'
           },
		   {
            title: 'ggjzjlx',
            align:"center",
            dataIndex: 'ggjzjlx'
           },
		   {
            title: 'etcstate',
            align:"center",
            dataIndex: 'etcstate'
           },
		   {
            title: 'ggjcardno',
            align:"center",
            dataIndex: 'ggjcardno'
           },
		   {
            title: 'channelno',
            align:"center",
            dataIndex: 'channelno'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/bdxxb/bdxxb/list",
          delete: "/bdxxb/bdxxb/delete",
          deleteBatch: "/bdxxb/bdxxb/deleteBatch",
          exportXlsUrl: "bdxxb/bdxxb/exportXls",
          importExcelUrl: "bdxxb/bdxxb/importExcel",
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