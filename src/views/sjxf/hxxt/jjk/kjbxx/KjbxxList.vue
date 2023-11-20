<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发卡机构">
              <!--              <a-input placeholder="请输入组织标识" v-model="queryParam.zzbz"></a-input>-->
              <j-tree-select placeholder="全部" v-model="queryParam.issueBranch" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.inst"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <j-input placeholder="请输入卡号" v-model="queryParam.no"></j-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡产品号">
              <a-input placeholder="请输入卡产品号" v-model="queryParam.product"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡BIN代码">
              <a-input placeholder="请输入卡BIN代码" v-model="queryParam.bin"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.customer"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡创建日期">
              <a-range-picker  @change="onChangekcjrq" v-model="queryParam.creationDate"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡签发日期">
              <a-range-picker @change="onChangekqfrq" v-model="queryParam.issueDate"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡状态">
              <a-input placeholder="请输入卡状态" v-model="queryParam.status"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('卡基本信息')">导出</a-button>
      <!--   <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
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
        :scroll="{x: 25000}"
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
    <kjbxx-modal ref="modalForm" @ok="modalFormOk"></kjbxx-modal>
  </a-card>
</template>

<script>
  import KjbxxModal from './modules/KjbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JEllipsis from '@comp/jeecg/JEllipsis'
  import { filterObj } from '@/utils/util'
  import JInput from "@/components/jeecg/JInput"

  export default {
    name: "KjbxxList",
    mixins:[JeecgListMixin],
    components: {
      KjbxxModal,JTreeSelect,JEllipsis,JInput
    },
    data () {
      return {
        description: '卡基本信息管理页面',
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
            dataIndex: 'inst'
           },
		   {
            title: '卡号',
            align:"center",
            dataIndex: 'no',
            customRender: function (text) {
           return !text ? "" : (text.length > 0 ? text.substr(1, text.length) : text)
         },
           },
		   {
            title: '卡产品号',
            align:"center",
            dataIndex: 'product'
           },
		   {
            title: '卡BIN代码',
            align:"center",
            dataIndex: 'bin'
           },
		   {
            title: '客户号',
            align:"center",
            dataIndex: 'customer'
           },
		   {
            title: '卡名_1',
            align:"center",
            dataIndex: 'name1'
           },
		   {
            title: '卡名_2',
            align:"center",
            dataIndex: 'name2'
           },
		   {
            title: '地址行_1',
            align:"center",
            dataIndex: 'address1'
           },
		   {
            title: '地址行_2',
            align:"center",
            dataIndex: 'address2'
           },
		   {
            title: '地址行_3',
            align:"center",
            dataIndex: 'address3'
           },
		   {
            title: '地址行_4',
            align:"center",
            dataIndex: 'address4'
           },
		   {
            title: '邮编',
            align:"center",
            dataIndex: 'postcode'
           },
		   {
            title: '电话号码',
            align:"center",
            dataIndex: 'phone'
           },
		   {
            title: '专用地址标记',
            align:"center",
            dataIndex: 'hasAddress'
           },
		   {
            title: '专用地址到期日期',
            align:"center",
            dataIndex: 'addressExpiry'
           },
		   {
            title: '卡创建日期',
            align:"center",
            dataIndex: 'creationDate'
           },
		   {
            title: '卡签发日期',
            align:"center",
            dataIndex: 'issueDate'
           },
		   {
            title: '卡压印浮字日期',
            align:"center",
            dataIndex: 'embossingDate'
           },
		   {
            title: '卡到期日',
            align:"center",
            dataIndex: 'expiryDate'
           },
		   {
            title: '卡重发日',
            align:"center",
            dataIndex: 'reissueDate'
           },
		   {
            title: '卡最后保留日期',
            align:"center",
            dataIndex: 'lastMaintDate'
           },
		   {
            title: '卡最后支取日期',
            align:"center",
            dataIndex: 'lastWithdrawalDate'
           },
		   {
            title: '卡最后使用日期',
            align:"center",
            dataIndex: 'lastUseDate'
           },
		   {
            title: '最后一次卡费',
            align:"center",
            dataIndex: 'lastFeeDate'
           },
		   {
            title: '卡的使用柜台',
            align:"center",
            dataIndex: 'useCount'
           },
		   {
            title: '密码',
            align:"center",
            dataIndex: 'pvv'
           },
		   {
            title: '无效的PIN的重试计数',
            align:"center",
            dataIndex: 'pinRetries'
           },
		   {
            title: '卡状况',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '卡托收分行',
            align:"center",
            dataIndex: 'colBranch'
           },
		   {
            title: '设为hot卡的原因码',
            align:"center",
            dataIndex: 'hotReason'
           },
		   {
            title: '设为hot的机构',
            align:"center",
            dataIndex: 'hotBranch'
           },
		   {
            title: '设为warm卡的原因码',
            align:"center",
            dataIndex: 'warmReason'
           },
		   {
            title: '设为warm卡的机构',
            align:"center",
            dataIndex: 'warmBranch'
           },
		   {
            title: '标志',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '记名票据',
            align:"center",
            dataIndex: 'note'
           },
		   {
            title: '记名票据日期',
            align:"center",
            dataIndex: 'noteDate'
           },
		   {
            title: '便民卡放款密码',
            align:"center",
            dataIndex: 'password'
           },
		   {
            title: '卡签发次数',
            align:"center",
            dataIndex: 'issueCount'
           },
		   {
            title: '发卡机构',
            align:"center",
            dataIndex: 'issueBranch_dictText'
           },
		   {
            title: '发卡所在分行',
            align:"center",
            dataIndex: 'issueRegion'
           },
		   {
            title: '省份机构',
            align:"center",
            dataIndex: 'provincialBranch'
           },
		   {
            title: 'warm卡的次数计数',
            align:"center",
            dataIndex: 'warmCount'
           },
		   {
            title: '卡是否已经自动warm',
            align:"center",
            dataIndex: 'autowarmed'
           },
		   {
            title: 'pcv码',
            align:"center",
            dataIndex: 'pcv'
           },
		   {
            title: '总行',
            align:"center",
            dataIndex: 'parent'
           },
		   {
            title: 'Pvk类型',
            align:"center",
            dataIndex: 'pvkType'
           },
		   {
            title: '口挂日期',
            align:"center",
            dataIndex: 'informalLostDate'
           },
		   {
            title: '书挂日期',
            align:"center",
            dataIndex: 'formalLostDate'
           },
		   {
            title: '密码挂失日期',
            align:"center",
            dataIndex: 'pinLostDate'
           },
		   {
            title: '密码挂失重置日期',
            align:"center",
            dataIndex: 'pinLostReissueDate'
           },
		   {
            title: '锁卡日期',
            align:"center",
            dataIndex: 'lockedDate'
           },
		   {
            title: '卡解锁日期',
            align:"center",
            dataIndex: 'hotDate'
           },
		   {
            title: 'Visa卡重试计数',
            align:"center",
            dataIndex: 'cvvRetries'
           },
		   {
            title: '短信签约标志',
            align:"center",
            dataIndex: 'sms'
           },
		   {
            title: '发卡索引',
            align:"center",
            dataIndex: 'issueIndex'
           },
		   {
            title: '下期年费日期',
            align:"center",
            dataIndex: 'annualFeeNext'
           },
		   {
            title: '年费日期',
            align:"center",
            dataIndex: 'annualFeeDate'
           },
		   {
            title: '年费百分值',
            align:"center",
            dataIndex: 'annualFeePercent'
           },
		   {
            title: '年费周期',
            align:"center",
            dataIndex: 'annualFreePeriod'
           },
		   {
            title: '剩余年费',
            align:"center",
            dataIndex: 'annualFeeResidual'
           },
		   {
            title: '列入黑名单日期',
            align:"center",
            dataIndex: 'blacklistDate'
           },
		   {
            title: '列入黑名单原因',
            align:"center",
            dataIndex: 'blacklistReason'
           },
		   {
            title: '列入黑名单机构',
            align:"center",
            dataIndex: 'blacklistBranch'
           },
		   {
            title: '主帐号更新',
            align:"center",
            dataIndex: 'panReplaced'
           },
		   {
            title: '有效值',
            align:"center",
            dataIndex: 'availablePoints'
           },
		   {
            title: '历史可用积分',
            align:"center",
            dataIndex: 'hisAvailablePoints'
           },
		   {
            title: '使用值',
            align:"center",
            dataIndex: 'usedPoints'
           },
		   {
            title: '总值',
            align:"center",
            dataIndex: 'totalPoints'
           },
		   {
            title: 'Pin初始化标志',
            align:"center",
            dataIndex: 'pinForceInit'
           },
		   {
            title: '专用visa标志',
            align:"center",
            dataIndex: 'hasCvv'
           },
		   {
            title: '员工标识',
            align:"center",
            dataIndex: 'isStaff'
           },
		   {
            title: '城市银行代码',
            align:"center",
            dataIndex: 'pbocCity'
           },
		   {
            title: '省份隐含代码',
            align:"center",
            dataIndex: 'pbocProvince'
           },
		   {
            title: '个人标志',
            align:"center",
            dataIndex: 'personalised'
           },
		   {
            title: 'CVN',
            align:"center",
            dataIndex: 'cvn'
           },
		   {
            title: '客户服务ID',
            align:"center",
            dataIndex: 'customer2'
           },
		   {
            title: '年费周期内卡消费次数累积',
            align:"center",
            dataIndex: 'poscount'
           },
		   {
            title: '最近重置POSCOUNT字段日期',
            align:"center",
            dataIndex: 'resetdate'
           },
		   {
            title: 'ATM行内转账交易开通标识',
            align:"center",
            dataIndex: 'atmTfxIntFlag'
           },
		   {
            title: 'ATM跨行转账交易开通标识',
            align:"center",
            dataIndex: 'atmTfxExtFlag'
           },
		   {
            title: '银联开通日期',
            align:"center",
            dataIndex: 'cuppaySignDate'
           },
		   {
            title: '银联关闭日期',
            align:"center",
            dataIndex: 'cuppayCloseDate'
           },
		   {
            title: '银联开通标识',
            align:"center",
            dataIndex: 'cuppaySignFlag'
           },
		   {
            title: '银联重试次数',
            align:"center",
            dataIndex: 'cuppayRetries'
           },
		   {
            title: '最后银联交易日期',
            align:"center",
            dataIndex: 'lastCuppayRetryDate'
           },
		   {
            title: '最后PIN重试日期',
            align:"center",
            dataIndex: 'lastPinRetryDate'
           },
		   {
            title: '最后更新时间',
            align:"center",
            dataIndex: 'lastMaintainDate'
           },
		   {
            title: '最后更新操作',
            align:"center",
            dataIndex: 'lastMaintainFlag'
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
          list: "/kjbxx/kjbxx/list",
          delete: "/kjbxx/kjbxx/delete",
          deleteBatch: "/kjbxx/kjbxx/deleteBatch",
          exportXlsUrl: "kjbxx/kjbxx/exportXls",
          importExcelUrl: "kjbxx/kjbxx/importExcel",
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
        delete param.creationDate;
        delete param.issueDate;
        return filterObj(param);
      },
      onChangekcjrq(value,dateString){
        let creationDateString = dateString;
        this.queryParam.creationDate_begin = creationDateString[0];
        this.queryParam.creationDate_end = creationDateString[1]
      },
      onChangekqfrq(value,dateString) {
        let issueDateString = dateString;
        this.queryParam.issueDate_begin=issueDateString[0];
        this.queryParam.issueDate_end=issueDateString[1]

      },


    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>