<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应的客户编号">
              <a-input placeholder="请输入对应的客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="前台柜员号">
              <a-input placeholder="请输入前台柜员号" v-model="queryParam.frontCd"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员状态">
              <a-input placeholder="请输入操作员状态" v-model="queryParam.userStatus"></a-input>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员类型">
              <a-input placeholder="请输入操作员类型" v-model="queryParam.userType"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('操作员信息')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

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

<!--        <span slot="action" slot-scope="text, record">
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
    <czyxx-modal ref="modalForm" @ok="modalFormOk"></czyxx-modal>
  </a-card>
</template>

<script>
  import CzyxxModal from './modules/CzyxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CzyxxList",
    mixins:[JeecgListMixin],
    components: {
      CzyxxModal
    },
    data () {
      return {
        description: '操作员信息管理页面',
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
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '五级分类权限',
            align:"center",
            dataIndex: 'fiveValue'
           },
		   {
            title: '评级权限',
            align:"center",
            dataIndex: 'evalValue'
           },
		   {
            title: '呆账核销权限',
            align:"center",
            dataIndex: 'badValue'
           },
		   {
            title: '对应的客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '前台柜员号',
            align:"center",
            dataIndex: 'frontCd'
           },
		   {
            title: '是否可用',
            align:"center",
            dataIndex: 'isEnabled'
           },
		   {
            title: '该操作员的权限',
            align:"center",
            dataIndex: 'loginIp'
           },
		   {
            title: '暂时无作用',
            align:"center",
            dataIndex: 'loginTime'
           },
		   {
            title: '列表显示行数',
            align:"center",
            dataIndex: 'pageSize'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '登陆号',
            align:"center",
            dataIndex: 'userCd'
           },
		   {
            title: '流水编号',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '登陆密码',
            align:"center",
            dataIndex: 'userPassword'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '修改日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '放款日期(起',
            align:"center",
            dataIndex: 'startDate'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'endDate'
           },
		   {
            title: '审批金额',
            align:"center",
            dataIndex: 'checkValue'
           },
		   {
            title: '是否注销',
            align:"center",
            dataIndex: 'islogoff'
           },
		   {
            title: '密码更新日期',
            align:"center",
            dataIndex: 'passwordUpdate'
           },
		   {
            title: '操作员状态',
            align:"center",
            dataIndex: 'userStatus'
           },
		   {
            title: '登录IP',
            align:"center",
            dataIndex: 'loginIpAddress'
           },
		   {
            title: '是否固定贷审会成员',
            align:"center",
            dataIndex: 'isFixMember'
           },
		   {
            title: '是否固定风管会成员',
            align:"center",
            dataIndex: 'isRiskFixMember'
           },
		   {
            title: '企业损失类权限',
            align:"center",
            dataIndex: 'fiveEmpLoseValue'
           },
		   {
            title: '企业非损失类权限',
            align:"center",
            dataIndex: 'noFiveEmpLoseValue'
           },
		   {
            title: '个人损失类权限',
            align:"center",
            dataIndex: 'fivePerLoseValue'
           },
		   {
            title: '个人非损失类权限',
            align:"center",
            dataIndex: 'noFivePerLoseValue'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'telePhone'
           },
		   {
            title: '公开授信权限(授信)',
            align:"center",
            dataIndex: 'creditValue'
           },
		   {
            title: '操作员类型',
            align:"center",
            dataIndex: 'userType'
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
          list: "/czyxx/czyxx/list",
          delete: "/czyxx/czyxx/delete",
          deleteBatch: "/czyxx/czyxx/deleteBatch",
          exportXlsUrl: "czyxx/czyxx/exportXls",
          importExcelUrl: "czyxx/czyxx/importExcel",
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