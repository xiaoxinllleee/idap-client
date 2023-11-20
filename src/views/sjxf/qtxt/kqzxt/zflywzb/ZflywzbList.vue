<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作网点">
<!--              <a-input placeholder="请输入操作网点" v-model="queryParam.brno"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.brno"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="平台业务序号">
              <a-input placeholder="请输入平台业务序号" v-model="queryParam.workseqid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="平台交易代码">
              <a-input placeholder="请输入平台交易代码" v-model="queryParam.tradecode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务标识">
              <a-input placeholder="请输入业务标识" v-model="queryParam.busiflag"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起渠道代码">
              <a-input placeholder="请输入发起渠道代码" v-model="queryParam.chnlcode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发起渠道流水号">
              <a-input placeholder="请输入发起渠道流水号" v-model="queryParam.chnlseqno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作柜员">
              <a-input placeholder="请输入操作柜员" v-model="queryParam.tellerno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.idno"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('支付类业务主表')">导出</a-button>
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
        :scroll="{x:14300}"
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
    <zflywzb-modal ref="modalForm" @ok="modalFormOk"></zflywzb-modal>
  </a-card>
</template>

<script>
  import ZflywzbModal from './modules/ZflywzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  export default {
    name: "ZflywzbList",
    mixins:[JeecgListMixin],
    components: {
      ZflywzbModal,JTreeSelect
    },
    data () {
      return {
        description: '支付类业务主表管理页面',
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
            title: '平台受理日期',
            align:"center",
            dataIndex: 'workdate'
           },
		   {
            title: '平台业务序号',
            align:"center",
            dataIndex: 'workseqid'
           },
		   {
            title: '平台受理时间',
            align:"center",
            dataIndex: 'worktime'
           },
		   {
            title: '平台模板代码',
            align:"center",
            dataIndex: 'templatecode'
           },
		   {
            title: '平台交易代码',
            align:"center",
            dataIndex: 'tradecode'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'tradetype'
           },
		   {
            title: '系统标识',
            align:"center",
            dataIndex: 'sysid'
           },
		   {
            title: '应用标识',
            align:"center",
            dataIndex: 'appid'
           },
		   {
            title: '预留标识',
            align:"center",
            dataIndex: 'resid'
           },
		   {
            title: '业务受理日期',
            align:"center",
            dataIndex: 'busidate'
           },
		   {
            title: '业务标识',
            align:"center",
            dataIndex: 'busiflag'
           },
		   {
            title: '发起渠道代码',
            align:"center",
            dataIndex: 'chnlcode'
           },
		   {
            title: '发起渠道交易种类',
            align:"center",
            dataIndex: 'chnlprocode'
           },
		   {
            title: '发起渠道交易时间',
            align:"center",
            dataIndex: 'chnltrantime'
           },
		   {
            title: '发起渠道日期',
            align:"center",
            dataIndex: 'chnldate'
           },
		   {
            title: '发起渠道时间',
            align:"center",
            dataIndex: 'chnltime'
           },
		   {
            title: '发起渠道流水号',
            align:"center",
            dataIndex: 'chnlseqno'
           },
		   {
            title: '发起渠道检索参考号',
            align:"center",
            dataIndex: 'chnlrefno'
           },
		   {
            title: '操作分行号',
            align:"center",
            dataIndex: 'zoneno'
           },
		   {
            title: '操作网点',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: '操作柜员',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '复核柜员',
            align:"center",
            dataIndex: 'chktellerno'
           },
		   {
            title: '授权柜员',
            align:"center",
            dataIndex: 'authtellerno'
           },
		   {
            title: '出纳员',
            align:"center",
            dataIndex: 'cashier'
           },
		   {
            title: '虚拟账户',
            align:"center",
            dataIndex: 'virtualaccno'
           },
		   {
            title: '业务受理清算行号',
            align:"center",
            dataIndex: 'bankno'
           },
		   {
            title: '来往账标志',
            align:"center",
            dataIndex: 'mbflag'
           },
		   {
            title: '借贷标识',
            align:"center",
            dataIndex: 'dcflag'
           },
		   {
            title: '现金转账标识',
            align:"center",
            dataIndex: 'cashflag'
           },
		   {
            title: '交易货币',
            align:"center",
            dataIndex: 'curcode'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'amt'
           },
		   {
            title: '实际交易金额',
            align:"center",
            dataIndex: 'realtradeamt'
           },
		   {
            title: '手续费类型',
            align:"center",
            dataIndex: 'feeflag'
           },
		   {
            title: '手续费金额',
            align:"center",
            dataIndex: 'feeamt'
           },
		   {
            title: '报文类型',
            align:"center",
            dataIndex: 'msgtype'
           },
		   {
            title: '报文标识号',
            align:"center",
            dataIndex: 'msgid'
           },
		   {
            title: '交易处理码',
            align:"center",
            dataIndex: 'processcode'
           },
		   {
            title: '交易传输时间',
            align:"center",
            dataIndex: 'systime'
           },
		   {
            title: '源ID',
            align:"center",
            dataIndex: 'sourceid'
           },
		   {
            title: '目标ID',
            align:"center",
            dataIndex: 'destid'
           },
		   {
            title: '发起方类型',
            align:"center",
            dataIndex: 'sendtype'
           },
		   {
            title: '发起方日期',
            align:"center",
            dataIndex: 'senddate'
           },
		   {
            title: '发起方时间',
            align:"center",
            dataIndex: 'sendtime'
           },
		   {
            title: '发起方流水号',
            align:"center",
            dataIndex: 'sendseqno'
           },
		   {
            title: '发起清算机构标识码',
            align:"center",
            dataIndex: 'sendclearbank'
           },
		   {
            title: '发起机构标识码',
            align:"center",
            dataIndex: 'sendbank'
           },
		   {
            title: '接收方日期',
            align:"center",
            dataIndex: 'recvdate'
           },
		   {
            title: '接收方时间',
            align:"center",
            dataIndex: 'recvtime'
           },
		   {
            title: '接收方流水号',
            align:"center",
            dataIndex: 'recvseqno'
           },
		   {
            title: '接收清算机构标识码',
            align:"center",
            dataIndex: 'recvclearbank'
           },
		   {
            title: '接收机构标识码',
            align:"center",
            dataIndex: 'recvbank'
           },
		   {
            title: '接收方处理状态',
            align:"center",
            dataIndex: 'recvstatus'
           },
		   {
            title: '接收方处理码',
            align:"center",
            dataIndex: 'recverrcode'
           },
		   {
            title: '接收方处理信息',
            align:"center",
            dataIndex: 'recverrmsg'
           },
		   {
            title: '账务系统受理日期',
            align:"center",
            dataIndex: 'bankdate'
           },
		   {
            title: '账务系统受理流水号',
            align:"center",
            dataIndex: 'bankseqno'
           },
		   {
            title: '账务系统记账日期',
            align:"center",
            dataIndex: 'bankrspdate'
           },
		   {
            title: '账务系统记账流水号',
            align:"center",
            dataIndex: 'bankrspseqno'
           },
		   {
            title: '核心处理状态',
            align:"center",
            dataIndex: 'bankstatus'
           },
		   {
            title: '核心处理码',
            align:"center",
            dataIndex: 'bankerrcode'
           },
		   {
            title: '核心处理信息',
            align:"center",
            dataIndex: 'bankerrmsg'
           },
		   {
            title: '账务系统对账状态',
            align:"center",
            dataIndex: 'bankchkflag'
           },
		   {
            title: '账务系统冲正标志',
            align:"center",
            dataIndex: 'bankrevflag'
           },
		   {
            title: '核心交易码',
            align:"center",
            dataIndex: 'bankmsgtype'
           },
		   {
            title: '核心交易处理码',
            align:"center",
            dataIndex: 'bankprocode'
           },
		   {
            title: '核心受理流水序号',
            align:"center",
            dataIndex: 'bankseqid'
           },
		   {
            title: '核心记账检索参考号8583格式',
            align:"center",
            dataIndex: 'bankrefno'
           },
		   {
            title: '第三方交易日期',
            align:"center",
            dataIndex: 'corpdate'
           },
		   {
            title: '第三方交易时间',
            align:"center",
            dataIndex: 'corptime'
           },
		   {
            title: '第三方处理状态',
            align:"center",
            dataIndex: 'corpstatus'
           },
		   {
            title: '第三方处理码',
            align:"center",
            dataIndex: 'corperrcode'
           },
		   {
            title: '第三方处理信息',
            align:"center",
            dataIndex: 'corperrmsg'
           },
		   {
            title: '第三方对账状态',
            align:"center",
            dataIndex: 'corpchkflag'
           },
		   {
            title: '第三方交易传输时间',
            align:"center",
            dataIndex: 'corptrantime'
           },
		   {
            title: '交易当前业务步骤',
            align:"center",
            dataIndex: 'tradebusistep'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'busistatus'
           },
		   {
            title: '业务冲正标志',
            align:"center",
            dataIndex: 'revflag'
           },
		   {
            title: '主账号',
            align:"center",
            dataIndex: 'accno'
           },
		   {
            title: '子账号',
            align:"center",
            dataIndex: 'subaccno'
           },
		   {
            title: '主账号名称',
            align:"center",
            dataIndex: 'accname'
           },
		   {
            title: '主账号实际余额',
            align:"center",
            dataIndex: 'accbal'
           },
		   {
            title: '主账号开户机构',
            align:"center",
            dataIndex: 'accbrno'
           },
		   {
            title: '卡类型',
            align:"center",
            dataIndex: 'cardtype'
           },
		   {
            title: '卡有效期',
            align:"center",
            dataIndex: 'expiredate'
           },
		   {
            title: '卡序列号',
            align:"center",
            dataIndex: 'cardseqid'
           },
		   {
            title: '二磁道数据',
            align:"center",
            dataIndex: 'track2'
           },
		   {
            title: '三磁道数据',
            align:"center",
            dataIndex: 'track3'
           },
		   {
            title: '转出主账号',
            align:"center",
            dataIndex: 'outaccno'
           },
		   {
            title: '转出子账号',
            align:"center",
            dataIndex: 'outsubaccno'
           },
		   {
            title: '转出主账号名称',
            align:"center",
            dataIndex: 'outaccname'
           },
		   {
            title: '转出主账号实际余额',
            align:"center",
            dataIndex: 'outaccbal'
           },
		   {
            title: '转入主账号',
            align:"center",
            dataIndex: 'inaccno'
           },
		   {
            title: '转入子账号',
            align:"center",
            dataIndex: 'insubaccno'
           },
		   {
            title: '转入主账号名称',
            align:"center",
            dataIndex: 'inaccname'
           },
		   {
            title: '转入主账号实际余额',
            align:"center",
            dataIndex: 'inaccbal'
           },
		   {
            title: '服务点进入方式',
            align:"center",
            dataIndex: 'inputtype'
           },
		   {
            title: '服务点条件码',
            align:"center",
            dataIndex: 'condcode'
           },
		   {
            title: '服务点PIN获取码',
            align:"center",
            dataIndex: 'pincode'
           },
		   {
            title: '检索参考号',
            align:"center",
            dataIndex: 'indexrefno'
           },
		   {
            title: '银联检索参考号',
            align:"center",
            dataIndex: 'corprefno'
           },
		   {
            title: '终端标识',
            align:"center",
            dataIndex: 'devid'
           },
		   {
            title: '终端类型',
            align:"center",
            dataIndex: 'devtype'
           },
		   {
            title: '终端清算日期',
            align:"center",
            dataIndex: 'devcleardate'
           },
		   {
            title: '终端状态',
            align:"center",
            dataIndex: 'devstatus'
           },
		   {
            title: '终端对账状态',
            align:"center",
            dataIndex: 'devchkflag'
           },
		   {
            title: '商户类型',
            align:"center",
            dataIndex: 'merchanttype'
           },
		   {
            title: '商户号',
            align:"center",
            dataIndex: 'merchantno'
           },
		   {
            title: '商户名称',
            align:"center",
            dataIndex: 'merchantname'
           },
		   {
            title: '清算日期',
            align:"center",
            dataIndex: 'cleardate'
           },
		   {
            title: '清算金额',
            align:"center",
            dataIndex: 'clearamt'
           },
		   {
            title: '清算汇率',
            align:"center",
            dataIndex: 'clearrate'
           },
		   {
            title: '原平台受理日期',
            align:"center",
            dataIndex: 'origworkdate'
           },
		   {
            title: '原平台受理序号',
            align:"center",
            dataIndex: 'origworkseqid'
           },
		   {
            title: '原始数据',
            align:"center",
            dataIndex: 'origdata'
           },
		   {
            title: '原报文类型',
            align:"center",
            dataIndex: 'origmsgtype'
           },
		   {
            title: '原报文标识号',
            align:"center",
            dataIndex: 'origmsgid'
           },
		   {
            title: '原银联交易传输时间',
            align:"center",
            dataIndex: 'origcorptrantime'
           },
		   {
            title: '原发起清算机构标识码',
            align:"center",
            dataIndex: 'origsendclearbank'
           },
		   {
            title: '原发起机构标识码',
            align:"center",
            dataIndex: 'origsendbank'
           },
		   {
            title: '原交易金额',
            align:"center",
            dataIndex: 'origamt'
           },
		   {
            title: '原交易手续费',
            align:"center",
            dataIndex: 'origfeeamt'
           },
		   {
            title: '原账务系统受理日期',
            align:"center",
            dataIndex: 'origbankdate'
           },
		   {
            title: '原账务系统受理流水号',
            align:"center",
            dataIndex: 'origbankseqno'
           },
		   {
            title: '响应码',
            align:"center",
            dataIndex: 'rspcode'
           },
		   {
            title: '响应数据',
            align:"center",
            dataIndex: 'rspdata'
           },
		   {
            title: '网络管理信息码',
            align:"center",
            dataIndex: 'netmanagecode'
           },
		   {
            title: '凭证类型',
            align:"center",
            dataIndex: 'vouchtype'
           },
		   {
            title: '凭证日期',
            align:"center",
            dataIndex: 'vouchdate'
           },
		   {
            title: '凭证号码',
            align:"center",
            dataIndex: 'vouchno'
           },
		   {
            title: '实际余额',
            align:"center",
            dataIndex: 'actualbal'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'idtype'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'idno'
           },
		   {
            title: '授权代码',
            align:"center",
            dataIndex: 'authno'
           },
		   {
            title: '授权完成码',
            align:"center",
            dataIndex: 'authcode'
           },
		   {
            title: '附加数据',
            align:"center",
            dataIndex: 'adddata'
           },
		   {
            title: '版本号',
            align:"center",
            dataIndex: 'verid'
           },
		   {
            title: '交易信息',
            align:"center",
            dataIndex: 'tradeinfo'
           },
		   {
            title: '附加交易信息',
            align:"center",
            dataIndex: 'addtradeinfo'
           },
		   {
            title: '第三方预留',
            align:"center",
            dataIndex: 'corpreserved'
           },
		   {
            title: '受理方保留',
            align:"center",
            dataIndex: 'sendreserved'
           },
		   {
            title: '发卡方保留',
            align:"center",
            dataIndex: 'cardreserved'
           },
		   {
            title: '消息鉴别码MAC',
            align:"center",
            dataIndex: 'mac'
           },
		   {
            title: 'BSP集群标识号',
            align:"center",
            dataIndex: 'bspno'
           },
		   {
            title: '结算标识',
            align:"center",
            dataIndex: 'chkflag'
           },
		   {
            title: '交易批次号',
            align:"center",
            dataIndex: 'batchnum'
           },
		   {
            title: 'F60自定义域',
            align:"center",
            dataIndex: 'custom'
           },
		   {
            title: 'IC卡数据',
            align:"center",
            dataIndex: 'iccarddata'
           },
		   {
            title: 'IC卡锁卡状态',
            align:"center",
            dataIndex: 'lockicstatus'
           },
		   {
            title: '打印次数',
            align:"center",
            dataIndex: 'printcnt'
           },
		   {
            title: '平台受理日期8583格式',
            align:"center",
            dataIndex: 'date8583'
           },
		   {
            title: '平台交易传输时间8583格式',
            align:"center",
            dataIndex: 'trantime8583'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '账务系统类型',
            align:"center",
            dataIndex: 'bankhosttype'
           },
		   {
            title: '最后处理时间',
            align:"center",
            dataIndex: 'lasttime'
           },
		   {
            title: 'bap请求流水号',
            align:"center",
            dataIndex: 'bapseqno'
           },
		   {
            title: 'bsp请求流水号',
            align:"center",
            dataIndex: 'bspseqno'
           },
		   {
            title: '应答',
            align:"center",
            dataIndex: 'bspseqnoa'
           },
		   {
            title: '数据日期',
            align:"center",
            dataIndex: 'dataDate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		  /* {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
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
          list: "/zflywzb/zflywzb/list",
          delete: "/zflywzb/zflywzb/delete",
          deleteBatch: "/zflywzb/zflywzb/deleteBatch",
          exportXlsUrl: "zflywzb/zflywzb/exportXls",
          importExcelUrl: "zflywzb/zflywzb/importExcel",
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