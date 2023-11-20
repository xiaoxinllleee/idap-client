<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构号">
<!--              <a-input placeholder="全部" v-model="queryParam.trandate"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.orgno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户账号">
              <a-input placeholder="请输入客户账号" v-model="queryParam.accountno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户姓名">
              <a-input placeholder="请输入账户姓名" v-model="queryParam.accountname"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="分账号">
              <a-input placeholder="请输入分账号" v-model="queryParam.faccountno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷方账号">
              <a-input placeholder="请输入贷方账号" v-model="queryParam.debitno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷方户名">
              <a-input placeholder="请输入贷方户名" v-model="queryParam.debitname"></a-input>
            </a-form-item>
          </a-col>

        <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangejyrq" v-model="queryParam.trandate" :format="DateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜面交易流水号">
              <a-input placeholder="请输入柜面交易流水号" v-model="queryParam.taskno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.tradecode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易名称">
              <a-input placeholder="请输入交易名称" v-model="queryParam.tranname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="经办柜员号">
              <a-input placeholder="请输入经办柜员号" v-model="queryParam.tlid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-input placeholder="请输入交易状态" v-model="queryParam.transstatus"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易类型">
              <a-input placeholder="请输入交易类型" v-model="queryParam.trantype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易金额">
<!--              <a-input placeholder="请输入交易金额" v-model="queryParam.money"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.money_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.money_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('交易流水登记信息')">导出</a-button>
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

       <!-- <span slot="action" slot-scope="text, record">
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
    <jylsdjxx-modal ref="modalForm" @ok="modalFormOk"></jylsdjxx-modal>
  </a-card>
</template>

<script>
  import JylsdjxxModal from './modules/JylsdjxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import moment from 'moment'

  export default {
    name: "JylsdjxxList",
    mixins:[JeecgListMixin],
    components: {
      JylsdjxxModal,JTreeSelect
    },
    data () {
      return {
        description: '交易流水登记信息管理页面',
        DateFormat:'yyyy-MM-DD',
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
            dataIndex: 'trandate'
           },
		   {
            title: '柜面交易流水号',
            align:"center",
            dataIndex: 'taskno'
           },
		   {
            title: '交易时间,精确到毫秒',
            align:"center",
            dataIndex: 'transtime'
           },
		   {
            title: '交易码',
            align:"center",
            dataIndex: 'tradecode'
           },
		   {
            title: '交易名称',
            align:"center",
            dataIndex: 'tranname'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'orgno'
           },
		   {
            title: '经办柜员号',
            align:"center",
            dataIndex: 'tlid'
           },
		   {
            title: '同机授权柜员号',
            align:"center",
            dataIndex: 'authtlid'
           },
		   {
            title: '交易状态',
            align:"center",
            dataIndex: 'transstatus'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'trantype'
           },
		   {
            title: '系统码',
            align:"center",
            dataIndex: 'syscode'
           },
		   {
            title: '会计日期',
            align:"center",
            dataIndex: 'accdate'
           },
		   {
            title: '会计时间',
            align:"center",
            dataIndex: 'acctime'
           },
		   {
            title: '后台流水号',
            align:"center",
            dataIndex: 'serialno'
           },
		   {
            title: '后台返回码',
            align:"center",
            dataIndex: 'code'
           },
		   {
            title: '后台返回信息',
            align:"center",
            dataIndex: 'message'
           },
		   {
            title: '客户账号',
            align:"center",
            dataIndex: 'accountno'
           },
		   {
            title: '账户姓名',
            align:"center",
            dataIndex: 'accountname'
           },
		   {
            title: '分账号',
            align:"center",
            dataIndex: 'faccountno'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'money'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'currtype'
           },
		   {
            title: '钞汇标志',
            align:"center",
            dataIndex: 'commcode'
           },
		   {
            title: '交易数据路径',
            align:"center",
            dataIndex: 'trandatapath'
           },
		   {
            title: '上送报文路径',
            align:"center",
            dataIndex: 'upmespath'
           },
		   {
            title: '下送报文路径',
            align:"center",
            dataIndex: 'downmespath'
           },
		   {
            title: 'UUID',
            align:"center",
            dataIndex: 'uuid'
           },
		   {
            title: 'SENDMAP',
            align:"center",
            dataIndex: 'sendmap'
           },
		   {
            title: '原流水号',
            align:"center",
            dataIndex: 'tracenum'
           },
		   {
            title: '借方账号序号',
            align:"center",
            dataIndex: 'childxuno'
           },
		   {
            title: '贷方账号',
            align:"center",
            dataIndex: 'debitno'
           },
		   {
            title: '贷方户名',
            align:"center",
            dataIndex: 'debitname'
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
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/jylsdjxx/jylsdjxx/list",
          delete: "/jylsdjxx/jylsdjxx/delete",
          deleteBatch: "/jylsdjxx/jylsdjxx/deleteBatch",
          exportXlsUrl: "jylsdjxx/jylsdjxx/exportXls",
          importExcelUrl: "jylsdjxx/jylsdjxx/importExcel",
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
        delete param.trandate;
        return filterObj(param);
      },
      onChangejyrq(value,dateString){
        let trandateString=dateString
        this.queryParam.trandate_begin=moment(trandateString[0]).format("YYYYMMDD")
        this.queryParam.trandate_end=moment(trandateString[1]).format("YYYYMMDD")

      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>