<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.institution"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡bin号">
              <a-input placeholder="请输入卡bin号" v-model="queryParam.bin"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产口号">
              <a-input placeholder="请输入产口号" v-model="queryParam.no"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品名称">
              <a-input placeholder="请输入产品名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <J-input placeholder="请输入客户类型" v-model="queryParam.custTypeRestrict"></J-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡介质类型">
              <a-input placeholder="请输入卡介质类型" v-model="queryParam.mediaType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-input placeholder="请输入状态" v-model="queryParam.status"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开卡方式">
              <a-input placeholder="请输入开卡方式" v-model="queryParam.issueWayFlag"></a-input>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡的默认有效时限">
              <a-input placeholder="请输入卡的默认有效时限" v-model="queryParam.defaultExpiry"></a-input>
            </a-form-item>
          </a-col>-->
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('卡产品信息')">导出</a-button>
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
        :scroll="{x: 7000}"
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
    <kcpxx-modal ref="modalForm" @ok="modalFormOk"></kcpxx-modal>
  </a-card>
</template>

<script>
  import KcpxxModal from './modules/KcpxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "KcpxxList",
    mixins:[JeecgListMixin],
    components: {
      KcpxxModal,JInput
    },
    data () {
      return {
        description: '卡产品信息管理页面',
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
            title: '银行号',
            align:"center",
            dataIndex: 'institution'
           },
		   {
            title: '卡bin号',
            align:"center",
            dataIndex: 'bin'
           },
		   {
            title: '产口号',
            align:"center",
            dataIndex: 'no'
           },
		   {
            title: '产品名称',
            align:"center",
            dataIndex: 'name'
           },
		   {
            title: '卡的默认有效时限',
            align:"center",
            dataIndex: 'defaultExpiry'
           },
		   {
            title: '服务码',
            align:"center",
            dataIndex: 'serviceRestrict'
           },
		   {
            title: '交易约束标识位',
            align:"center",
            dataIndex: 'txnRestrict'
           },
		   {
            title: '商户约束标识位',
            align:"center",
            dataIndex: 'merchantRestrict'
           },
		   {
            title: '商户类型限制',
            align:"center",
            dataIndex: 'merchanttypeRestrict'
           },
		   {
            title: '区域约束',
            align:"center",
            dataIndex: 'regionRestrict'
           },
		   {
            title: '附属卡数量',
            align:"center",
            dataIndex: 'subsidiaryRestrict'
           },
		   {
            title: '交易币种',
            align:"center",
            dataIndex: 'currencyRestrict'
           },
		   {
            title: '卡段索引',
            align:"center",
            dataIndex: 'cardRange'
           },
		   {
            title: '卡段格式',
            align:"center",
            dataIndex: 'cardRangeFormat'
           },
		   {
            title: '未用',
            align:"center",
            dataIndex: 'pvki'
           },
		   {
            title: '客户关联卡数量',
            align:"center",
            dataIndex: 'replica'
           },
		   {
            title: '电子渠道交易开关',
            align:"center",
            dataIndex: 'secondaryAccess'
           },
		   {
            title: '密码重输次数',
            align:"center",
            dataIndex: 'pinRetries'
           },
		   {
            title: 'CVV重试次数',
            align:"center",
            dataIndex: 'cvvRetries'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'custTypeRestrict'
           },
		   {
            title: '客户性别约束',
            align:"center",
            dataIndex: 'genderRestrict'
           },
		   {
            title: '卡介质类型',
            align:"center",
            dataIndex: 'mediaType'
           },
		   {
            title: '重要空白凭证号',
            align:"center",
            dataIndex: 'ibdType'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '换卡关联信息_1',
            align:"center",
            dataIndex: 'controlInfo01'
           },
		   {
            title: '换卡关联信息_2',
            align:"center",
            dataIndex: 'controlInfo02'
           },
		   {
            title: '换卡关联信息_3',
            align:"center",
            dataIndex: 'controlInfo03'
           },
		   {
            title: '换卡关联信息_4',
            align:"center",
            dataIndex: 'controlInfo04'
           },
		   {
            title: '换卡关联信息_5',
            align:"center",
            dataIndex: 'controlInfo05'
           },
		   {
            title: '换卡关联信息_6',
            align:"center",
            dataIndex: 'controlInfo06'
           },
		   {
            title: '换卡关联信息_7',
            align:"center",
            dataIndex: 'controlInfo07'
           },
		   {
            title: '换卡关联信息_8',
            align:"center",
            dataIndex: 'controlInfo08'
           },
		   {
            title: '换卡关联信息_9',
            align:"center",
            dataIndex: 'controlInfo09'
           },
		   {
            title: '换卡关联信息_10',
            align:"center",
            dataIndex: 'controlInfo10'
           },
		   {
            title: '账户关联信息_1',
            align:"center",
            dataIndex: 'linkInfo01'
           },
		   {
            title: '账户关联信息_2',
            align:"center",
            dataIndex: 'linkInfo02'
           },
		   {
            title: '账户关联信息_3',
            align:"center",
            dataIndex: 'linkInfo03'
           },
		   {
            title: '账户关联信息_4',
            align:"center",
            dataIndex: 'linkInfo04'
           },
		   {
            title: '账户关联信息_5',
            align:"center",
            dataIndex: 'linkInfo05'
           },
		   {
            title: '账户关联信息_6',
            align:"center",
            dataIndex: 'linkInfo06'
           },
		   {
            title: '账户关联信息_7',
            align:"center",
            dataIndex: 'linkInfo07'
           },
		   {
            title: '账户关联信息_8',
            align:"center",
            dataIndex: 'linkInfo08'
           },
		   {
            title: '账户关联信息_9',
            align:"center",
            dataIndex: 'linkInfo09'
           },
		   {
            title: '账户关联信息_10',
            align:"center",
            dataIndex: 'linkInfo10'
           },
		   {
            title: '开卡方式',
            align:"center",
            dataIndex: 'issueWayFlag'
           },
		   {
            title: '银联交易开通标识',
            align:"center",
            dataIndex: 'cuppayDefaultFlag'
           },
		   {
            title: '最近维护日期',
            align:"center",
            dataIndex: 'lastMaintainDate'
           },
		   {
            title: '最近维护标志',
            align:"center",
            dataIndex: 'lastMaintainFlag'
           },
		   {
            title: '产品码',
            align:"center",
            dataIndex: 'productCode'
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
		 /*  {
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
          list: "/kcpxx/kcpxx/list",
          delete: "/kcpxx/kcpxx/delete",
          deleteBatch: "/kcpxx/kcpxx/deleteBatch",
          exportXlsUrl: "kcpxx/kcpxx/exportXls",
          importExcelUrl: "kcpxx/kcpxx/importExcel",
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