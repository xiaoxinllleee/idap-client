<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易机构号">
              <j-tree-select placeholder="全部"
                             v-model="queryParam.trnBrchNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流水号">
              <a-input placeholder="请输入流水号" v-model="queryParam.jrnlNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="序列号">
              <a-input placeholder="请输入序列号" v-model="queryParam.sequenceNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易代码">
              <a-input placeholder="请输入交易代码" v-model="queryParam.tranNo"></a-input>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangejyrq" v-model="queryParam.trnDate"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('重空交易历史表')">导出</a-button>
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
    <zkjylsb-modal ref="modalForm" @ok="modalFormOk"></zkjylsb-modal>
  </a-card>
</template>

<script>
  import ZkjylsbModal from './modules/ZkjylsbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'

  export default {
    name: "ZkjylsbList",
    mixins:[JeecgListMixin],
    components: {
      ZkjylsbModal,JTreeSelect
    },
    data () {
      return {
        description: '重空交易历史表管理页面',
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
            title: '交易日期',
            align:"center",
            dataIndex: 'tranDate'
           },
		   {
            title: '流水号',
            align:"center",
            dataIndex: 'jrnlNo'
           },
		   {
            title: '序列号',
            align:"center",
            dataIndex: 'sequenceNo'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'tranTime'
           },
		   {
            title: '银行号',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '省代码',
            align:"center",
            dataIndex: 'provinceCode'
           },
		   {
            title: '帐号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '凭证类型',
            align:"center",
            dataIndex: 'ibdType'
           },
		   {
            title: '起始号码',
            align:"center",
            dataIndex: 'startSerialNo'
           },
		   {
            title: '终止号码',
            align:"center",
            dataIndex: 'endSerialNo'
           },
		   {
            title: '调用码',
            align:"center",
            dataIndex: 'callCode'
           },
		   {
            title: '交易代码',
            align:"center",
            dataIndex: 'tranNo'
           },
		   {
            title: '交易机构号_dictText',
            align:"center",
            dataIndex: 'branchNo'
           },
		   {
            title: '交易柜员',
            align:"center",
            dataIndex: 'tellerNo'
           },
		   {
            title: '交易数量',
            align:"center",
            dataIndex: 'trnQty'
           },
		   {
            title: '旧状态',
            align:"center",
            dataIndex: 'oldStatus'
           },
		   {
            title: '新状态',
            align:"center",
            dataIndex: 'newStatus'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'supTellerNo'
           },
		   {
            title: '描述',
            align:"center",
            dataIndex: 'description'
           },
		   {
            title: '旧密码',
            align:"center",
            dataIndex: 'oldPassword'
           },
		   {
            title: '新密码',
            align:"center",
            dataIndex: 'newPassword'
           },
		   {
            title: '系统',
            align:"center",
            dataIndex: 'sys'
           },
		   {
            title: '过期日',
            align:"center",
            dataIndex: 'expiryDate'
           },
		   {
            title: '转出机构号',
            align:"center",
            dataIndex: 'frmBrNo'
           },
		   {
            title: '转入机构号',
            align:"center",
            dataIndex: 'toBrNo'
           },
		   {
            title: '转出柜员',
            align:"center",
            dataIndex: 'frmTelrNo'
           },
		   {
            title: '转入柜员',
            align:"center",
            dataIndex: 'toTelrNo'
           },
		   {
            title: '原交易流水号',
            align:"center",
            dataIndex: 'traceNo'
           },
		   {
            title: '冲正标识',
            align:"center",
            dataIndex: 'sysCorrectFlag'
           },
		   {
            title: '批处理标识',
            align:"center",
            dataIndex: 'sysBatchFlag'
           },
		   {
            title: '附加信息',
            align:"center",
            dataIndex: 'addiData'
           },
		   {
            title: '维护的日期',
            align:"center",
            dataIndex: 'lastMaintDate'
           },
		   {
            title: '维护标志',
            align:"center",
            dataIndex: 'lastMaintStat'
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
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		/*   {
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
          list: "/zkjylsb/zkjylsb/list",
          delete: "/zkjylsb/zkjylsb/delete",
          deleteBatch: "/zkjylsb/zkjylsb/deleteBatch",
          exportXlsUrl: "zkjylsb/zkjylsb/exportXls",
          importExcelUrl: "zkjylsb/zkjylsb/importExcel",
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
        delete param.trnDate;
        return filterObj(param);
      },
      onChangejyrq(value,dateString){
        let trnDateString=dateString
        this.queryParam.trnDate_begin=trnDateString[0]
        this.queryParam.trnDate_end=trnDateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>