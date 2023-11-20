<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属法人联社">
              <a-input placeholder="请输入所属法人联社" v-model="queryParam.upBrNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="内部部门号">
              <a-input placeholder="请输入内部部门号" v-model="queryParam.depNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门名称">
              <a-input placeholder="请输入部门名称" v-model="queryParam.depName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属管辖内部部门号">
              <a-input placeholder="请输入所属管辖内部部门号" v-model="queryParam.upDepNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门号">
              <a-input placeholder="请输入部门号" v-model="queryParam.curDepNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.depSts"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营业状态">
              <a-input placeholder="请输入营业状态" v-model="queryParam.wrkSts"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('部门表')">导出</a-button>
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
        :scroll="{x:8430}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <bmb-modal ref="modalForm" @ok="modalFormOk"></bmb-modal>
  </a-card>
</template>

<script>
  import BmbModal from './modules/BmbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "BmbList",
    mixins:[JeecgListMixin],
    components: {
      BmbModal
    },
    data () {
      return {
        description: '部门表管理页面',
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
            title: '内部部门号',
            align:"center",
            dataIndex: 'depNo'
           },
		   {
            title: '部门名称',
            align:"center",
            dataIndex: 'depName'
           },
		   {
            title: '所属管辖内部部门号',
            align:"center",
            dataIndex: 'upDepNo'
           },
		   {
            title: '所属法人联社',
            align:"center",
            dataIndex: 'upBrNo'
           },
		   {
            title: '是否是账务部门',
            align:"center",
            dataIndex: 'dcInd'
           },
		   {
            title: '默认内部记账机构',
            align:"center",
            dataIndex: 'dcBrNo'
           },
		   {
            title: '部门负责人姓名',
            align:"center",
            dataIndex: 'depManager'
           },
		   {
            title: '部门负责人电话',
            align:"center",
            dataIndex: 'depPhone'
           },
		   {
            title: '部门类型',
            align:"center",
            dataIndex: 'depType'
           },
		   {
            title: '责任单位',
            align:"center",
            dataIndex: 'costProfitInd'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'depSts'
           },
		   {
            title: '营业状态',
            align:"center",
            dataIndex: 'wrkSts'
           },
		   {
            title: '网点IP地址',
            align:"center",
            dataIndex: 'ipaddr'
           },
		   {
            title: '通存通兑标志',
            align:"center",
            dataIndex: 'trfInd'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'filler'
           },
		   {
            title: '部门级别',
            align:"center",
            dataIndex: 'depLvl'
           },
		   {
            title: '是否有下级部门',
            align:"center",
            dataIndex: 'subYn'
           },
		   {
            title: '部门邮箱',
            align:"center",
            dataIndex: 'depMail'
           },
		   {
            title: '部门职能类型',
            align:"center",
            dataIndex: 'funcType'
           },
		   {
            title: '法人类型',
            align:"center",
            dataIndex: 'corpType'
           },
		   {
            title: '是否是独立法人',
            align:"center",
            dataIndex: 'blCorp'
           },
		   {
            title: '部门号',
            align:"center",
            dataIndex: 'curDepNo'
           },
		   {
            title: '上级部门号',
            align:"center",
            dataIndex: 'upCurDepNo'
           },
		   {
            title: '标记市机关管理哪个市',
            align:"center",
            dataIndex: 'cityDepNo'
           },
		   {
            title: '所属外部法人联社号',
            align:"center",
            dataIndex: 'curUpBrNo'
           },
		   {
            title: '默认记账机构号',
            align:"center",
            dataIndex: 'curDcBrNo'
           },
		   {
            title: '默认树类型',
            align:"center",
            dataIndex: 'queryTree'
           },
		   {
            title: '是否汇总部门',
            align:"center",
            dataIndex: 'isGather'
           },
		   {
            title: '是否上划部门',
            align:"center",
            dataIndex: 'shFlag'
           },
		   {
            title: '部门库存现金限额上限',
            align:"center",
            dataIndex: 'amtBlanceMax'
           },
		   {
            title: '部门库存现金限额下限',
            align:"center",
            dataIndex: 'amtBlanceMin'
           },
		   {
            title: '部门序号',
            align:"center",
            dataIndex: 'depSeqn'
           },
		   {
            title: '对外支付渠道所属机构',
            align:"center",
            dataIndex: 'hxAcDepNo'
           },
		   {
            title: '核心并账机构号',
            align:"center",
            dataIndex: 'hxDcBrNo'
           },
		   {
            title: '部门简称',
            align:"center",
            dataIndex: 'shortName'
           },
		   {
            title: '币种与年终状态对应标志位',
            align:"center",
            dataIndex: 'curBit'
           },
		   {
            title: '上划交易区别标志',
            align:"center",
            dataIndex: 'shDif'
           },
		   {
            title: '上级管理机构',
            align:"center",
            dataIndex: 'mngUpBrNo'
           },
		   {
            title: '机构类型',
            align:"center",
            dataIndex: 'ywType'
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
          list: "/bmb/bmb/list",
          delete: "/bmb/bmb/delete",
          deleteBatch: "/bmb/bmb/deleteBatch",
          exportXlsUrl: "bmb/bmb/exportXls",
          importExcelUrl: "bmb/bmb/importExcel",
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