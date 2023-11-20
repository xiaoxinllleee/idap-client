<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="删除标志">
              <a-input placeholder="请输入删除标志" v-model="queryParam.dataFlag"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="担保合同号">
              <a-input placeholder="请输入担保合同号" v-model="queryParam.contactNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款人客户名称">
              <a-input placeholder="请输入借款人客户名称" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="公证号">
              <a-input placeholder="请输入公证号" v-model="queryParam.notarizationNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="担保人客户编号">
              <a-input placeholder="请输入担保人客户编号" v-model="queryParam.sureCustId"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('保证人信息')">导出</a-button>
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
        :scroll="{x:6830}"
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
    <bzrxx-modal ref="modalForm" @ok="modalFormOk"></bzrxx-modal>
  </a-card>
</template>

<script>
  import BzrxxModal from './modules/BzrxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "BzrxxList",
    mixins:[JeecgListMixin],
    components: {
      BzrxxModal
    },
    data () {
      return {
        description: '保证人信息管理页面',
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
            title: '保证效力',
            align:"center",
            dataIndex: 'bzxl'
           },
		   {
            title: '代偿能力',
            align:"center",
            dataIndex: 'dcnl'
           },
		   {
            title: '核保人',
            align:"center",
            dataIndex: 'checkUserId'
           },
		   {
            title: '担保合同号',
            align:"center",
            dataIndex: 'contactNo'
           },
		   {
            title: '担保币种',
            align:"center",
            dataIndex: 'currencyType'
           },
		   {
            title: '借款人客户名称',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '实际保证能力',
            align:"center",
            dataIndex: 'factSureCaption'
           },
		   {
            title: '公证书编号',
            align:"center",
            dataIndex: 'guarantyNdNo'
           },
		   {
            title: '保证人对外已担保金额',
            align:"center",
            dataIndex: 'hasAssurerAmt'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '是否保证中心',
            align:"center",
            dataIndex: 'isAssurerCenter'
           },
		   {
            title: '是否反担保',
            align:"center",
            dataIndex: 'isCg'
           },
		   {
            title: '是否变更',
            align:"center",
            dataIndex: 'isChange'
           },
		   {
            title: '是否核保',
            align:"center",
            dataIndex: 'isCheck'
           },
		   {
            title: '是否可用',
            align:"center",
            dataIndex: 'isEnabled'
           },
		   {
            title: '是否公正',
            align:"center",
            dataIndex: 'isNotary'
           },
		   {
            title: '公证号',
            align:"center",
            dataIndex: 'notarizationNo'
           },
		   {
            title: '公正人',
            align:"center",
            dataIndex: 'notary'
           },
		   {
            title: '公正日期',
            align:"center",
            dataIndex: 'notaryDate'
           },
		   {
            title: '公正机构',
            align:"center",
            dataIndex: 'notaryOrg'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '董事会决议',
            align:"center",
            dataIndex: 'resolutionDesc'
           },
		   {
            title: '股东授权范围',
            align:"center",
            dataIndex: 'shImpowerDesc'
           },
		   {
            title: '分担比例,所占份额',
            align:"center",
            dataIndex: 'shareProp'
           },
		   {
            title: '担保人客户编号',
            align:"center",
            dataIndex: 'sureCustId'
           },
		   {
            title: '担保关系',
            align:"center",
            dataIndex: 'sureRelation'
           },
		   {
            title: '保证资格',
            align:"center",
            dataIndex: 'sureRight'
           },
		   {
            title: '保证方式',
            align:"center",
            dataIndex: 'sureType'
           },
		   {
            title: '担保金额',
            align:"center",
            dataIndex: 'suretyAmt'
           },
		   {
            title: '担保起始日期',
            align:"center",
            dataIndex: 'suretyBeginDate'
           },
		   {
            title: '担保到期日期',
            align:"center",
            dataIndex: 'suretyEndDate'
           },
		   {
            title: '担保期限',
            align:"center",
            dataIndex: 'suretyTerm'
           },
		   {
            title: '保证人最高额担保金额',
            align:"center",
            dataIndex: 'tiptopAssurerAmt'
           },
		   {
            title: '解除担保时间',
            align:"center",
            dataIndex: 'unchainSureTime'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '操作员编号',
            align:"center",
            dataIndex: 'userId'
           },

		   {
            title: '保证方式1',
            align:"center",
            dataIndex: 'assurerDetail'
           },
          {
            title: '保证方式2',
            align:"center",
            dataIndex: 'assurerDetail2'
          },
		   {
            title: '争议解决方式',
            align:"center",
            dataIndex: 'jjfs'
           },
		   {
            title: '仲裁机构全称',
            align:"center",
            dataIndex: 'zcjg'
           },
		   {
            title: '其他事项',
            align:"center",
            dataIndex: 'qtsx'
           },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'qyrq'
           },
		   {
            title: '签约地点',
            align:"center",
            dataIndex: 'qydd'
           },
		   {
            title: '合同份数',
            align:"center",
            dataIndex: 'fs'
           },
		   {
            title: '承诺函编号',
            align:"center",
            dataIndex: 'acceptanceCd'
           },
		   {
            title: '承诺函签定日',
            align:"center",
            dataIndex: 'acceptanceSignDate'
           },
		   {
            title: '流出编号',
            align:"center",
            dataIndex: 'assurerId'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: '情况描述',
            align:"center",
            dataIndex: 'cgDesc'
           },
		   {
            title: '反担人名称',
            align:"center",
            dataIndex: 'cgName'
           },
		   {
            title: '反担保日期',
            align:"center",
            dataIndex: 'checkAssureDate'
           },
		   {
            title: '描述',
            align:"center",
            dataIndex: 'checkAssureDesc'
           },
		   {
            title: '反担保人名称',
            align:"center",
            dataIndex: 'checkAssureName'
           },
		   {
            title: '催收登记日期',
            align:"center",
            dataIndex: 'urgedSignDate'
           },
		   {
            title: '代偿归还日期',
            align:"center",
            dataIndex: 'subrogationDate'
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
          list: "/bzrxx/bzrxx/list",
          delete: "/bzrxx/bzrxx/delete",
          deleteBatch: "/bzrxx/bzrxx/deleteBatch",
          exportXlsUrl: "bzrxx/bzrxx/exportXls",
          importExcelUrl: "bzrxx/bzrxx/importExcel",
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