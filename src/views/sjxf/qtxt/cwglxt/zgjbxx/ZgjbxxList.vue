<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="职工号">
              <a-input placeholder="请输入职工号" v-model="queryParam.staffNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="职工名字">
              <a-input placeholder="请输入职工名字" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.idNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="职工默认部门号">
              <a-input placeholder="请输入职工默认部门号" v-model="queryParam.depNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属法人联社">
              <a-input placeholder="请输入所属法人联社" v-model="queryParam.upBrNo"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('职工基本信息')">导出</a-button>

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
        :scroll="{x:5430}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zgjbxx-modal ref="modalForm" @ok="modalFormOk"></zgjbxx-modal>
  </a-card>
</template>

<script>
  import ZgjbxxModal from './modules/ZgjbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZgjbxxList",
    mixins:[JeecgListMixin],
    components: {
      ZgjbxxModal
    },
    data () {
      return {
        description: '职工基本信息管理页面',
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
            title: '职工号',
            align:"center",
            dataIndex: 'staffNo'
           },
		   {
            title: '职工名字',
            align:"center",
            dataIndex: 'name'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'idType'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'idNo'
           },
		   {
            title: '职工职位描述',
            align:"center",
            dataIndex: 'telDesc'
           },
		   {
            title: '结算账号',
            align:"center",
            dataIndex: 'acNo'
           },
		   {
            title: '应付账号',
            align:"center",
            dataIndex: 'accNo'
           },
		   {
            title: '职工默认部门号',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '所属法人联社',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '结算户开户行名称',
            align:"center",
            dataIndex: 'acBrName'
           },
		   {
            title: '股金证号',
            align:"center",
            dataIndex: 'stockNo'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'sts'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'filler'
           },
		   {
            title: '状态2',
            align:"center",
            dataIndex: 'csts'
           },
		   {
            title: '是否入股',
            align:"center",
            dataIndex: 'isShareholder'
           },
		   {
            title: '住址',
            align:"center",
            dataIndex: 'addr'
           },
		   {
            title: '电话',
            align:"center",
            dataIndex: 'phoneNo'
           },
		   {
            title: '紧急联系人',
            align:"center",
            dataIndex: 'emcContact'
           },
		   {
            title: '紧急联系人电话',
            align:"center",
            dataIndex: 'emcPhoneNo'
           },
		   {
            title: '结算户名',
            align:"center",
            dataIndex: 'acName'
           },
		   {
            title: '电子邮箱',
            align:"center",
            dataIndex: 'email'
           },
		   {
            title: '职务',
            align:"center",
            dataIndex: 'staffPost'
           },
		   {
            title: '职称',
            align:"center",
            dataIndex: 'techTitle'
           },
		   {
            title: '入职日期',
            align:"center",
            dataIndex: 'hireDate'
           },
		   {
            title: '政治面貌',
            align:"center",
            dataIndex: 'politicalSts'
           },
		   {
            title: '性别',
            align:"center",
            dataIndex: 'sex'
           },
		   {
            title: '学历',
            align:"center",
            dataIndex: 'edu'
           },
		   {
            title: '民族',
            align:"center",
            dataIndex: 'nation'
           },
		   {
            title: '聘用形式',
            align:"center",
            dataIndex: 'hireType'
           },
		   {
            title: '职工目标机构',
            align:"center",
            dataIndex: 'desDepNo'
           },
		   {
            title: '借调日期',
            align:"center",
            dataIndex: 'seDate'
           },
		   {
            title: '是否借调',
            align:"center",
            dataIndex: 'isFlag'
           },
		   {
            title: '撤并时间',
            align:"center",
            dataIndex: 'cbDate'
           },
		   {
            title: '撤并前机构号',
            align:"center",
            dataIndex: 'cbqDepNo'
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
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   /*{
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
          list: "/zgjbxx/zgjbxx/list",
          delete: "/zgjbxx/zgjbxx/delete",
          deleteBatch: "/zgjbxx/zgjbxx/deleteBatch",
          exportXlsUrl: "zgjbxx/zgjbxx/exportXls",
          importExcelUrl: "zgjbxx/zgjbxx/importExcel",
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