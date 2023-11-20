<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构号">
<!--              <a-input placeholder="全部" v-model="queryParam.branchNo"></a-input>-->
              <j-tree-select placeholder="请选择开户机构号"
                             v-model="queryParam.branchNo"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.accNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户日期">
              <a-range-picker @change="onChangezjcsrq" v-model="queryParam.acctOpenDt" :format="dateFormat"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品大类">
              <a-input placeholder="请输入产品大类" v-model="queryParam.acctType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品子类">
              <a-input placeholder="请输入产品子类" v-model="queryParam.intCat"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品代码">
              <a-input placeholder="请输入产品代码" v-model="queryParam.productCode"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号产品名称">
              <J-input placeholder="请输入账号产品名称" v-model="queryParam.productName"></J-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主账号">
              <a-input placeholder="请输入主账号" v-model="queryParam.mastAcct"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="子账号">
              <a-input placeholder="请输入子账号" v-model="queryParam.subAcctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
            </a-form-item>
          </a-col>


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="当前余额">
<!--              <a-input placeholder="请输入当前余额" v-model="queryParam.currBal"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.currBal_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.currBal_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.customerNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户类型码">
              <a-input placeholder="请输入账户类型码" v-model="queryParam.productNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="科目号">
              <a-input placeholder="请输入科目号" v-model="queryParam.subjNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户组别">
              <a-select placeholder="全部" v-model="queryParam.acctGrp">
                <a-select-option value="C">
                  对公
                </a-select-option>
                <a-select-option value="P">
                  对私
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户处理标示">
              <a-select placeholder="全部" v-model="queryParam.acctDesc">
                <a-select-option value="S">
                  活期
                </a-select-option>
                <a-select-option value="T">
                  定期
                </a-select-option>
                <a-select-option value="M">
                  一本通主账户
                </a-select-option>
                <a-select-option value="V">
                  来账
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本期截至日">
              <a-input placeholder="请输入本期截至日" v-model="queryParam.intToDt"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="全部" v-model="queryParam.currStatus">
                <a-select-option value="00">
                  正常
                </a-select-option>
                <a-select-option value="01">
                  睡眠
                </a-select-option>
                <a-select-option value="02">
                  无主
                </a-select-option>
                <a-select-option value="03">
                  透支
                </a-select-option>
                <a-select-option value="07">
                  关户
                </a-select-option>
                <a-select-option value="25">
                  未激活
                </a-select-option>
              </a-select>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款主档宽表')">导出</a-button>
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
        :scroll="{x: 30000}"
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
    <ckzdkb-modal ref="modalForm" @ok="modalFormOk"></ckzdkb-modal>
  </a-card>
</template>

<script>
  import CkzdkbModal from './modules/CkzdkbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import JEllipsis from '@comp/jeecg/JEllipsis'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "CkzdkbList",
    mixins:[JeecgListMixin],
    components: {
      CkzdkbModal,JTreeSelect,JEllipsis,JInput
    },
    data () {
      return {
        description: '存款主档宽表管理页面',
        dateFormat :'YYYYMMDD',
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
            title: '账号',
            align:"center",
            dataIndex: 'accNo',
         scopedSlots: {customRender: 'accNo'},
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'acctOpenDt'
           },
		   {
            title: '产品大类',
            align:"center",
            dataIndex: 'acctType'
           },
		   {
            title: '产品子类',
            align:"center",
            dataIndex: 'intCat'
           },
		   {
            title: '产品代码',
            align:"center",
            dataIndex: 'productCode'
           },
		   {
            title: '账号产品名称',
            align:"center",
            dataIndex: 'productName',
         scopedSlots: {customRender: 'acproductNamecNo'},
           },
		   {
            title: '主账号',
            align:"center",
            dataIndex: 'mastAcct'
           },
		   {
            title: '子账号',
            align:"center",
            dataIndex: 'subAcctNo'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'identType'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'identNo'
           },
		   {
            title: '子账号编码',
            align:"center",
            dataIndex: 'subAcctCode'
           },
		   {
            title: '子账号币别',
            align:"center",
            dataIndex: 'subAcctCurr'
           },
		   {
            title: '子账号类型',
            align:"center",
            dataIndex: 'subAcctCurrType'
           },
		   {
            title: '账户类型标识',
            align:"center",
            dataIndex: 'mcaInd'
           },
		   {
            title: '来源tab标识',
            align:"center",
            dataIndex: 'fromTab'
           },
		   {
            title: '凭证类型',
            align:"center",
            dataIndex: 'voucherType'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'voucherNo'
           },
		   {
            title: '册号',
            align:"center",
            dataIndex: 'pbVolumeNo'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'pbSequenceNo'
           },
		   {
            title: '累计余额',
            align:"center",
            dataIndex: 'defaultBal'
           },
		   {
            title: '开户机构号',
            align:"center",
            dataIndex: 'branchNo_dictText'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'branchName'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'currStatus_dictText'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'currency'
           },
		   {
            title: '当前余额',
            align:"center",
            dataIndex: 'currBal'
           },
		   {
            title: '客户号',
            align:"center",
            dataIndex: 'customerNo'
           },
		   {
            title: '所属客户类型码',
            align:"center",
            dataIndex: 'belongCusttype'
           },
		   {
            title: '所属客户类型描述',
            align:"center",
            dataIndex: 'belongCustdesc'
           },
		   {
            title: '定活期类型码',
            align:"center",
            dataIndex: 'savingType'
           },
		   {
            title: '定活期类型描述',
            align:"center",
            dataIndex: 'savinDesc'
           },
		   {
            title: '账户类型码',
            align:"center",
            dataIndex: 'productNo'
           },
		   {
            title: '账户类型描述',
            align:"center",
            dataIndex: 'acctName'
           },
		   {
            title: '最近一笔金融交易的发生日期',
            align:"center",
            dataIndex: 'lstFinDt'
           },
		   {
            title: '保存对当前户有效的贷记利率值',
            align:"center",
            dataIndex: 'crStoreRate'
           },
		   {
            title: '账户层边际利率百分比',
            align:"center",
            dataIndex: 'acctPctMgnRate'
           },
		   {
            title: '科目号',
            align:"center",
            dataIndex: 'subjNo'
           },
		   {
            title: '科目号名称',
            align:"center",
            dataIndex: 'subjName'
           },
		   {
            title: '核算码',
            align:"center",
            dataIndex: 'glClassCode'
           },
		   {
            title: '本期起息日',
            align:"center",
            dataIndex: 'intFrmDt'
           },
		   {
            title: '本期截至日',
            align:"center",
            dataIndex: 'intToDt'
           },
		   {
            title: '利率',
            align:"center",
            dataIndex: 'rate'
           },
		   {
            title: '输出子账号',
            align:"center",
            dataIndex: 'subAcctOut'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'endDate'
           },
		   {
            title: '协议存款产品利率基准ID',
            align:"center",
            dataIndex: 'contractBaseId'
           },
		   {
            title: '协议存款产品利率ID',
            align:"center",
            dataIndex: 'contractRateId'
           },
		   {
            title: '推荐人',
            align:"center",
            dataIndex: 'acNo'
           },
		   {
            title: '账户启用日期',
            align:"center",
            dataIndex: 'acctEfctDate'
           },
		   {
            title: '年审日期',
            align:"center",
            dataIndex: 'annlReviewDate'
           },
		   {
            title: '核准号',
            align:"center",
            dataIndex: 'aprlNo'
           },
		   {
            title: '是否违约标示',
            align:"center",
            dataIndex: 'breakRuleInd'
           },
		   {
            title: '取现有效期',
            align:"center",
            dataIndex: 'cashWdlExpDate'
           },
		   {
            title: '对公账户自动冻结到期日',
            align:"center",
            dataIndex: 'expDateAutoFrz'
           },
		   {
            title: '外币代码',
            align:"center",
            dataIndex: 'fcyCode'
           },
		   {
            title: '首次存入金额',
            align:"center",
            dataIndex: 'firstDepAmt'
           },
		   {
            title: '绿色账户标识',
            align:"center",
            dataIndex: 'greenAcctInd'
           },
		   {
            title: '绿色账户到期日',
            align:"center",
            dataIndex: 'greenExpiryDt'
           },
		   {
            title: '变更开户行后新的分行号',
            align:"center",
            dataIndex: 'newBranchNo'
           },
		   {
            title: '国债账户标示',
            align:"center",
            dataIndex: 'ngbAcctInd'
           },
		   {
            title: '止存数目',
            align:"center",
            dataIndex: 'noOfStopDep'
           },
		   {
            title: '止取数目',
            align:"center",
            dataIndex: 'noOfStopWdl'
           },
		   {
            title: '账户原到期日',
            align:"center",
            dataIndex: 'orinMatDt'
           },
		   {
            title: '部提金额',
            align:"center",
            dataIndex: 'partialWdlAmt'
           },
		   {
            title: '部提次数',
            align:"center",
            dataIndex: 'partialWdlCnt'
           },
		   {
            title: '实存次数',
            align:"center",
            dataIndex: 'realDepCnt'
           },
		   {
            title: '临时户到期日',
            align:"center",
            dataIndex: 'tempAcctExpDt'
           },
		   {
            title: '特殊转账限制标示',
            align:"center",
            dataIndex: 'tfrRestFlag'
           },
		   {
            title: '标识该账户是否修改过产品类型',
            align:"center",
            dataIndex: 'acctTypeChgFlag'
           },
		   {
            title: '标识是否是ATM账户',
            align:"center",
            dataIndex: 'atmAcctFlag'
           },
		   {
            title: '费用豁免设置',
            align:"center",
            dataIndex: 'chrExemProfile'
           },
		   {
            title: '贷记分层利率的分组ID',
            align:"center",
            dataIndex: 'crTierGrpId'
           },
		   {
            title: '冻结到期日',
            align:"center",
            dataIndex: 'freezeExpDate'
           },
		   {
            title: '冻结金额',
            align:"center",
            dataIndex: 'holdVal'
           },
		   {
            title: '累计利息金额',
            align:"center",
            dataIndex: 'intAvailable'
           },
		   {
            title: '定期累计的期内贷记利息',
            align:"center",
            dataIndex: 'typeIntAccr'
           },
		   {
            title: '转存约定的标示',
            align:"center",
            dataIndex: 'termManRollNo'
           },
		   {
            title: '已发生的冻结数目',
            align:"center",
            dataIndex: 'noOfHolds'
           },
		   {
            title: '账户止付数目',
            align:"center",
            dataIndex: 'noOfStops'
           },
		   {
            title: '大字段',
            align:"center",
            dataIndex: 'odArea'
           },
		   {
            title: '标识该透支户是否链接有活期户',
            align:"center",
            dataIndex: 'odLinkInd'
           },
		   {
            title: '大字段',
            align:"center",
            dataIndex: 'odVisaArea'
           },
		   {
            title: '是否使用SWEEP处理',
            align:"center",
            dataIndex: 'sweepAcctFlag'
           },
		   {
            title: '标识该户是否为柜员专用账户',
            align:"center",
            dataIndex: 'telrAcctProd'
           },
		   {
            title: '转账账户',
            align:"center",
            dataIndex: 'trfAcctNo'
           },
		   {
            title: '可变利率',
            align:"center",
            dataIndex: 'varIntRate'
           },
		   {
            title: '利息税类型',
            align:"center",
            dataIndex: 'withTaxType'
           },
		   {
            title: '钞汇标志',
            align:"center",
            dataIndex: 'fcyCashTrf'
           },
		   {
            title: '本币账户属性',
            align:"center",
            dataIndex: 'lcyAcctType'
           },
		   {
            title: '透支标志',
            align:"center",
            dataIndex: 'odIndicator'
           },
		   {
            title: '产品标识',
            align:"center",
            dataIndex: 'productInd'
           },
		   {
            title: '定期基期',
            align:"center",
            dataIndex: 'termBasis'
           },
		   {
            title: '定期最大存期',
            align:"center",
            dataIndex: 'termDaysMax'
           },
		   {
            title: '账户组别',
            align:"center",
            dataIndex: 'acctGrp_dictText'
           },
		   {
            title: '账户处理标示',
            align:"center",
            dataIndex: 'acctDesc_dictText'
           },
		   {
            title: '上期起息日',
            align:"center",
            dataIndex: 'sIntFrmDt'
           },
		   {
            title: '境内外标志',
            align:"center",
            dataIndex: 'inoutFlag'
           },
		   {
            title: '借记利息调整金额',
            align:"center",
            dataIndex: 'drIntAdjustment'
           },
		   {
            title: '累计Commitment利息调整',
            align:"center",
            dataIndex: 'fccCiAdjAccr'
           },
		   {
            title: '定期利息调整',
            align:"center",
            dataIndex: 'trmIntAccr'
           },
		   {
            title: '利息增量',
            align:"center",
            dataIndex: 'contractIntIncr'
           },
		   {
            title: '产品定活处理',
            align:"center",
            dataIndex: 'acctDescDepp'
           },
		   {
            title: '贷记本期开始日期',
            align:"center",
            dataIndex: 'crSopDate'
           },
		   {
            title: '贷记本期结束日期',
            align:"center",
            dataIndex: 'drEopDate'
           },
		   {
            title: '产品编码',
            align:"center",
            dataIndex: 'crIdDet'
           },
		   {
            title: '最近账户维护日期',
            align:"center",
            dataIndex: 'lstMntDt'
           },
		   {
            title: '最近一次贷方金融交易的发生日期',
            align:"center",
            dataIndex: 'lstCustCrDt'
           },
		   {
            title: '最近一次借方金融交易的发生日期',
            align:"center",
            dataIndex: 'lstCustDrDt'
           },
		   {
            title: '年度平均余额',
            align:"center",
            dataIndex: 'netAvBalYtd'
           },
		   {
            title: '计算年度平均余额的天数',
            align:"center",
            dataIndex: 'netAvNoYtd'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ckzdkb/ckzdkb/list",
          delete: "/ckzdkb/ckzdkb/delete",
          deleteBatch: "/ckzdkb/ckzdkb/deleteBatch",
          exportXlsUrl: "ckzdkb/ckzdkb/exportXls",
          importExcelUrl: "ckzdkb/ckzdkb/importExcel",
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
        delete param.acctOpenDt;
        return filterObj(param);
      },
      onChangezjcsrq(value,dateString){
        let acctOpenDtString=dateString
        this.queryParam.acctOpenDt_begin=acctOpenDtString[0]
        this.queryParam.acctOpenDt_end=acctOpenDtString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>