<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <a-input placeholder="请输入机构代码" v-model="queryParam.deptCd"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="对应客户编号">
              <a-input placeholder="请输入对应客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水编号">
              <a-input placeholder="请输入流水编号" v-model="queryParam.deptId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营业执照">
              <a-input placeholder="请输入营业执照" v-model="queryParam.shopCardNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="金融机构代码名称">
              <a-input placeholder="请输入金融机构代码名称" v-model="queryParam.finInsName"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('机构信息')">导出</a-button>
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
<!--
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>
-->

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
    <jgxx-modal ref="modalForm" @ok="modalFormOk"></jgxx-modal>
  </a-card>
</template>

<script>
  import JgxxModal from './modules/JgxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "JgxxList",
    mixins:[JeecgListMixin],
    components: {
      JgxxModal
    },
    data () {
      return {
        description: '机构信息管理页面',
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
            title: '五级分类流程分支标准',
            align:"center",
            dataIndex: 'fvStd'
           },
		   {
            title: '对应客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '综合业务结算代码',
            align:"center",
            dataIndex: 'deptAcno'
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'deptCd'
           },
		   {
            title: '流水编号',
            align:"center",
            dataIndex: 'deptId'
           },
		   {
            title: '机构级别',
            align:"center",
            dataIndex: 'deptLevel'
           },
		   {
            title: '上级机构机构代码',
            align:"center",
            dataIndex: 'deptParent'
           },
		   {
            title: '机构类型',
            align:"center",
            dataIndex: 'deptType'
           },
		   {
            title: '金融机构代码',
            align:"center",
            dataIndex: 'finInsCode'
           },
		   {
            title: '金融机构代码名称',
            align:"center",
            dataIndex: 'finInsName'
           },
		   {
            title: '金融机构密码',
            align:"center",
            dataIndex: 'finInsPwd'
           },
		   {
            title: '是否可用',
            align:"center",
            dataIndex: 'isEnabled'
           },
		   {
            title: '是否上报',
            align:"center",
            dataIndex: 'isReport'
           },
		   {
            title: '机构领导编号',
            align:"center",
            dataIndex: 'principalId'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '机构电话',
            align:"center",
            dataIndex: 'deptTel'
           },
		   {
            title: '金融机构许可证号码',
            align:"center",
            dataIndex: 'finInsAdmiNo'
           },
		   {
            title: '营业执照',
            align:"center",
            dataIndex: 'shopCardNo'
           },
		   {
            title: '是否市辖区',
            align:"center",
            dataIndex: 'isCantonal'
           },
		   {
            title: '机构地址',
            align:"center",
            dataIndex: 'deptAddr'
           },
		   {
            title: '是否办理贷款业务',
            align:"center",
            dataIndex: 'isCredit'
           },
		   {
            title: '加贷审会审批权限(金额)',
            align:"center",
            dataIndex: 'checkValueOne'
           },
		   {
            title: '风险管理委员会审批权限(金额)',
            align:"center",
            dataIndex: 'checkValueTwo'
           },
		   {
            title: '贴现权限(金额)',
            align:"center",
            dataIndex: 'checkValueThree'
           },
		   {
            title: '承兑汇票权限(金额)',
            align:"center",
            dataIndex: 'checkValueFour'
           },
		   {
            title: '风险管理部权限(金额)',
            align:"center",
            dataIndex: 'checkValueFive'
           },
		   {
            title: '业务发展部权限(金额)',
            align:"center",
            dataIndex: 'checkValueSix'
           },
		   {
            title: '信贷管理部权限(金额)',
            align:"center",
            dataIndex: 'checkValueSeven'
           },
		   {
            title: '是否需要现场照像',
            align:"center",
            dataIndex: 'isCamera'
           },
		   {
            title: '贷款余额上限',
            align:"center",
            dataIndex: 'checkValueEight'
           },
		   {
            title: '是否动态取贷审会成员',
            align:"center",
            dataIndex: 'isDynamic'
           },
		   {
            title: '贷审会总成员数',
            align:"center",
            dataIndex: 'examAllNum'
           },
		   {
            title: '贷审会动态成员数',
            align:"center",
            dataIndex: 'examDynamicNum'
           },
		   {
            title: '是否动态取风管会成员',
            align:"center",
            dataIndex: 'isRiskDynamic'
           },
		   {
            title: '风管会总成员数',
            align:"center",
            dataIndex: 'riskAllNum'
           },
		   {
            title: '风管会动态成员数',
            align:"center",
            dataIndex: 'riskDynamicNum'
           },
		   {
            title: '正常减值/计提比例',
            align:"center",
            dataIndex: 'normalRatio'
           },
		   {
            title: '关注减值/计提比例',
            align:"center",
            dataIndex: 'concernRatio'
           },
		   {
            title: '次级减值/计提比例',
            align:"center",
            dataIndex: 'secondaryRatio'
           },
		   {
            title: '可疑减值/计提比例',
            align:"center",
            dataIndex: 'supicousRatio'
           },
		   {
            title: '损失减值/计提比例',
            align:"center",
            dataIndex: 'loseRatio'
           },
		   {
            title: '综合计提测算序号',
            align:"center",
            dataIndex: 'devalueRatioId'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'checkValueNine'
           },
		   {
            title: '机构属性',
            align:"center",
            dataIndex: 'deptAttribute'
           },
		   {
            title: '机构统计属性',
            align:"center",
            dataIndex: 'deptCount'
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
            title: '加载日期',
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
          list: "/jgxx/jgxx/list",
          delete: "/jgxx/jgxx/delete",
          deleteBatch: "/jgxx/jgxx/deleteBatch",
          exportXlsUrl: "jgxx/jgxx/exportXls",
          importExcelUrl: "jgxx/jgxx/importExcel",
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