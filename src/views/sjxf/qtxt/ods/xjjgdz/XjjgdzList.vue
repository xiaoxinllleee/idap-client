<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="新机构号">
             <!-- <a-input placeholder="请输入新机构号" v-model="queryParam.newBrNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.newBrNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="旧机构号">
              <!--<a-input placeholder="请输入旧机构号" v-model="queryParam.oldBrNo"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.oldBrNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系方式">
              <a-input placeholder="请输入联系方式" v-model="queryParam.tel"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人联社编号">
              <a-input placeholder="请输入法人联社编号" v-model="queryParam.frlsbh1"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
              <a-input placeholder="请输入机构号" v-model="queryParam.organId"></a-input>
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('新旧机构对照')">导出</a-button>

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
    <xjjgdz-modal ref="modalForm" @ok="modalFormOk"></xjjgdz-modal>
  </a-card>
</template>

<script>
  import XjjgdzModal from './modules/XjjgdzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'

  export default {
    name: "XjjgdzList",
    mixins:[JeecgListMixin],
    components: {
      XjjgdzModal,JTreeSelect
    },
    data () {
      return {
        description: '新旧机构对照管理页面',
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
            title: '新机构号',
            align:"center",
            dataIndex: 'newBrNo_dictText'
           },
		   {
            title: '旧机构号',
            align:"center",
            dataIndex: 'oldBrNo_dictText'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'brName'
           },
		   {
            title: '联系方式',
            align:"center",
            dataIndex: 'tel'
           },
		   {
            title: '上级管理机构（老财务）',
            align:"center",
            dataIndex: 'sjgljg'
           },
		   {
            title: '上级清算关系（老核心）',
            align:"center",
            dataIndex: 'sjqsgx'
           },
		   {
            title: '法人联社编号（老财务）',
            align:"center",
            dataIndex: 'frlsbh'
           },
		   {
            title: '法人联社编号',
            align:"center",
            dataIndex: 'frlsbh1'
           },
		   {
            title: '支付系统行号',
            align:"center",
            dataIndex: 'zfxthh'
           },
		   {
            title: '国结(SWIFT)地址',
            align:"center",
            dataIndex: 'gjdz'
           },
		   {
            title: '银行机构代码（新核心）',
            align:"center",
            dataIndex: 'yhjgdm'
           },
		   {
            title: '金融机构许可证（新核心）',
            align:"center",
            dataIndex: 'jrjgxkz'
           },
		   {
            title: '是否启用银承（新核心）',
            align:"center",
            dataIndex: 'sfqyyc'
           },
		   {
            title: '联社级管理中心（新核心）',
            align:"center",
            dataIndex: 'lsjglzx'
           },
		   {
            title: '上级分行代码（新核心）',
            align:"center",
            dataIndex: 'sjfhdm'
           },
		   {
            title: '上级业务机构（新核心）',
            align:"center",
            dataIndex: 'sjywjg'
           },
		   {
            title: '上级清算机构（新核心）',
            align:"center",
            dataIndex: 'sjqsjg'
           },
		   {
            title: '上级现金机构（新核心）',
            align:"center",
            dataIndex: 'sjxjjg'
           },
		   {
            title: '上级重空机构（新核心）',
            align:"center",
            dataIndex: 'sjzkjg'
           },
		   {
            title: '银行卡城市代码',
            align:"center",
            dataIndex: 'yhkcsdm'
           },
		   {
            title: '城市代码',
            align:"center",
            dataIndex: 'csdm'
           },
		   {
            title: '机构使用状态',
            align:"center",
            dataIndex: 'jgsyzt'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'organId'
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
		 /*  {
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
          list: "/xjjgdz/xjjgdz/list",
          delete: "/xjjgdz/xjjgdz/delete",
          deleteBatch: "/xjjgdz/xjjgdz/deleteBatch",
          exportXlsUrl: "xjjgdz/xjjgdz/exportXls",
          importExcelUrl: "xjjgdz/xjjgdz/importExcel",
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