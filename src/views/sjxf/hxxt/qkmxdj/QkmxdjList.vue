<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构码">
              <a-input placeholder="请输入机构码" v-model="queryParam.instNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="序号">
              <a-input placeholder="请输入序号" v-model="queryParam.bucketSeqNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易标识">
              <a-input placeholder="请输入交易标识" v-model="queryParam.txnInd"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易流水号">
              <a-input placeholder="请输入交易流水号" v-model="queryParam.jrnlNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('欠款明细登记')">导出</a-button>
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
        :scroll="{x:15000}"
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
    <qkmxdj-modal ref="modalForm" @ok="modalFormOk"></qkmxdj-modal>
  </a-card>
</template>

<script>
  import QkmxdjModal from './modules/QkmxdjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'

  export default {
    name: "QkmxdjList",
    mixins:[JeecgListMixin],
    components: {
      QkmxdjModal
    },
    data () {
      return {
        description: '欠款明细登记管理页面',
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
            title: '机构码',
            align:"center",
            dataIndex: 'instNo'
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '循环号码',
            align:"center",
            dataIndex: 'cycleNo'
           },
		   {
            title: '拖欠表的期数',
            align:"center",
            dataIndex: 'termNo'
           },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'bucketSeqNo'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'txnDate'
           },
		   {
            title: '此记录当前的状态',
            align:"center",
            dataIndex: 'recordStatus'
           },
		   {
            title: '交易标识',
            align:"center",
            dataIndex: 'txnInd'
           },
		   {
            title: '调整原因码',
            align:"center",
            dataIndex: 'adjReasonCode'
           },
		   {
            title: '入账日期',
            align:"center",
            dataIndex: 'postingDate'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'jrnlNo'
           },
		   {
            title: '倒退日调整金额',
            align:"center",
            dataIndex: 'backAdjAmt'
           },
		   {
            title: '是否有因为还款重算了还款金额',
            align:"center",
            dataIndex: 'repayPrnRecalc'
           },
		   {
            title: '标识延期的计提利息',
            align:"center",
            dataIndex: 'deferIntAccr'
           },
		   {
            title: '欠款桶子代码1',
            align:"center",
            dataIndex: 'bucketCode1'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode1'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt1'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt1'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt1'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate1'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays1'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate1'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate1'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt1'
           },
		   {
            title: '欠款桶子代码2',
            align:"center",
            dataIndex: 'bucketCode2'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode2'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt2'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt2'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt2'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate2'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays2'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate2'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate2'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt2'
           },
		   {
            title: '欠款桶子代码3',
            align:"center",
            dataIndex: 'bucketCode3'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode3'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt3'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt3'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt3'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate3'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays3'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate3'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate3'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt3'
           },
		   {
            title: '欠款桶子代码4',
            align:"center",
            dataIndex: 'bucketCode4'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode4'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt4'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt4'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt4'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate4'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays4'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate4'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate4'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt4'
           },
		   {
            title: '欠款桶子代码5',
            align:"center",
            dataIndex: 'bucketCode5'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode5'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt5'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt5'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt5'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate5'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays5'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate5'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate5'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt5'
           },
		   {
            title: '欠款桶子代码6',
            align:"center",
            dataIndex: 'bucketCode6'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode6'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt6'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt6'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt6'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate6'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays6'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate6'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate6'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt6'
           },
		   {
            title: '欠款桶子代码7',
            align:"center",
            dataIndex: 'bucketCode7'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode7'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt7'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt7'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt7'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate7'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays7'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate7'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate7'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt7'
           },
		   {
            title: '欠款桶子代码8',
            align:"center",
            dataIndex: 'bucketCode8'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode8'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt8'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt8'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt8'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate8'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays8'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate8'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate8'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt8'
           },
		   {
            title: '欠款桶子代码9',
            align:"center",
            dataIndex: 'bucketCode9'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode9'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt9'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt9'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt9'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate9'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays9'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate9'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate9'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt9'
           },
		   {
            title: '欠款桶子代码10',
            align:"center",
            dataIndex: 'bucketCode10'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode10'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt10'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt10'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt10'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate10'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays10'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate10'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate10'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt10'
           },
		   {
            title: '欠款桶子代码11',
            align:"center",
            dataIndex: 'bucketCode11'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode11'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt11'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt11'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt11'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate11'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays11'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate11'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate11'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt11'
           },
		   {
            title: '欠款桶子代码12',
            align:"center",
            dataIndex: 'bucketCode12'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode12'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt12'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt12'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt12'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate12'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays12'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate12'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate12'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt12'
           },
		   {
            title: '欠款桶子代码13',
            align:"center",
            dataIndex: 'bucketCode13'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode13'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt13'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt13'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt13'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate13'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays13'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate13'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate13'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt13'
           },
		   {
            title: '欠款桶子代码14',
            align:"center",
            dataIndex: 'bucketCode14'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode14'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt14'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt14'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt14'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate14'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays14'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate14'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate14'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt14'
           },
		   {
            title: '欠款桶子代码15',
            align:"center",
            dataIndex: 'bucketCode15'
           },
		   {
            title: '桶子子码',
            align:"center",
            dataIndex: 'subBucketCode15'
           },
		   {
            title: '应还金额',
            align:"center",
            dataIndex: 'txnAmt15'
           },
		   {
            title: '已还金额',
            align:"center",
            dataIndex: 'collectedAmt15'
           },
		   {
            title: '调整金额',
            align:"center",
            dataIndex: 'adjustedAmt15'
           },
		   {
            title: '当前的基础利率',
            align:"center",
            dataIndex: 'basedRate15'
           },
		   {
            title: '计算日期天数',
            align:"center",
            dataIndex: 'basedDays15'
           },
		   {
            title: '上一还款日，开始日',
            align:"center",
            dataIndex: 'basedDate15'
           },
		   {
            title: '交易当天日期，截止日',
            align:"center",
            dataIndex: 'basedToDate15'
           },
		   {
            title: '当前的本金金额',
            align:"center",
            dataIndex: 'basedAmt15'
           },
		   {
            title: '最后维护日期',
            align:"center",
            dataIndex: 'lstFinUpdDt'
           },
		   {
            title: '最后维护类型U-更新I-新增',
            align:"center",
            dataIndex: 'lstFinStat'
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
          list: "/qkmxdj/qkmxdj/list",
          delete: "/qkmxdj/qkmxdj/delete",
          deleteBatch: "/qkmxdj/qkmxdj/deleteBatch",
          exportXlsUrl: "qkmxdj/qkmxdj/exportXls",
          importExcelUrl: "qkmxdj/qkmxdj/importExcel",
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