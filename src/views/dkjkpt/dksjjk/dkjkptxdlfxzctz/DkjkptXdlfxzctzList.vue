<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网点">
              <j-tree-select placeholder="请输入网点" v-model="queryParam.wd"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM" pid-field="SJYWJGDM" treeNodeFilterProp="title"
                             :showSearch="show" :tree-default-expand-all="true"/>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.hm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款日期">
              <a-date-picker placeholder="请选择贷款日期" v-model="queryParam.dkrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;"/>
<!--              <a-input placeholder="请输入贷款日期" v-model="queryParam.dkrq"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日期">
              <a-date-picker placeholder="请选择到期日期" v-model="queryParam.dqrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;"/>
<!--              <a-input placeholder="请输入到期日期" v-model="queryParam.dqrq"></a-input>-->
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('信贷类风险资产台账')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:6500}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
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
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <dkjkptXdlfxzctz-modal ref="modalForm" @ok="modalFormOk"></dkjkptXdlfxzctz-modal>
  </a-card>
</template>

<script>
  import DkjkptXdlfxzctzModal from './modules/DkjkptXdlfxzctzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "DkjkptXdlfxzctzList",
    mixins:[JeecgListMixin],
    components: {
      DkjkptXdlfxzctzModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '信贷类风险资产台账管理页面',
        // 表头
        // 默认当前月份
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
        show: true,
        columns: [
         /* {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },*/
          {
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq'
          },
		   {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
           },
		   {
            title: '市州',
            align:"center",
            dataIndex: 'sz'
           },
		   {
            title: '农商银行',
            align:"center",
            dataIndex: 'nsyh'
           },
		   {
            title: '网点（支行）',
            align:"center",
            dataIndex: 'wd_dictText'
           },
		   {
            title: '户名',
            align:"center",
            dataIndex: 'hm'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
           },
		   {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
           },
		   {
            title: '贷款期限（月）',
            align:"center",
            dataIndex: 'dkqx'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText'
           },
		   {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx'
           },
		   {
            title: '贷款投向',
            align:"center",
            dataIndex: 'dktx'
           },
		   {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt_dictText'
           },
		   {
            title: '贷款类型',
            align:"center",
            dataIndex: 'dklx'
           },
		   {
            title: '利率（%）',
            align:"center",
            dataIndex: 'll'
           },
		   {
            title: '还款期限（月/季/年）',
            align:"center",
            dataIndex: 'hkqx'
           },
		   {
            title: '观察期贷款',
            align:"center",
            dataIndex: 'gcqdk'
           },

          {
            title: '观察期贷款',
            children: [
              {
                title: '模拟观察期形态',
                align:"center",
                dataIndex: 'mngcqxt'
              },
              {
                title: '出不良日期',
                align:"center",
                dataIndex: 'cblrq'
              },
              {
                title: '观察期到期日',
                align:"center",
                dataIndex: 'gcqdqr'
              },
          ]
          },




          {
            title: '调减利息',
            children: [
              {
                title: '是否属于调减利息',
                align:"center",
                dataIndex: 'sfsytjlx'
              },
              {
                title: '利息调整前',
                align:"center",
                dataIndex: 'lxtzq'
              },
              {
                title: '利息调整后',
                align:"center",
                dataIndex: 'lxtzh'
              },
              {
                title: '一年或两个还款周期内累计调减利息额度',
                align:"center",
                dataIndex: 'ljtjlxed'
              },
              {
                title: '一年或两个还款周期内累计调减利息次数',
                align:"center",
                dataIndex: 'ljtjlxcs'
              },
              {
                title: '利息调减日期',
                align:"center",
                dataIndex: 'lxtjrq'
              },
              {
                title: '预计退出日期',
                align:"center",
                dataIndex: 'yqtcrq'
              },
            ]
          },


          {
            title: '延期付息',
            children: [
              {
                title: '是否属于延期付息',
                align:"center",
                dataIndex: 'sfsyyqfx'
              },
              {
                title: '延期付息日期',
                align:"center",
                dataIndex: 'yqfxrq'
              },
              {
                title: '延期付息天数',
                align:"center",
                dataIndex: 'yqfxts'
              },
              {
                title: '延期到期后欠本日期',
                align:"center",
                dataIndex: 'yqdqhqbrq'
              },
              {
                title: '延期到期后欠息日期',
                align:"center",
                dataIndex: 'yqdqhqxrq'
              },

            ]
          },

		   {
            title: '是否属于低息贷款',
            align:"center",
            dataIndex: 'sfsydxdk'
           },


          {
            title: '一户多形态',
            children: [
              {
                title: '是否属于一户多形态',
                align:"center",
                dataIndex: 'sfsyyhdxt'
              },
              {
                title: '本人表外不良贷款余额',
                align:"center",
                dataIndex: 'brbwbldkye'
              },
              {
                title: '本人表外不良贷款归属机构',
                align:"center",
                dataIndex: 'brbwbldkgsjg'
              },
              {
                title: '本人表内不良贷款余额',
                align:"center",
                dataIndex: 'brbnbldkye'
              },
              {
                title: '本人表内不良贷款归属机构',
                align:"center",
                dataIndex: 'brbnbldkgsjg'
              },
              {
                title: '配偶表外不良贷款余额',
                align:"center",
                dataIndex: 'pobwbldkye'
              },
              {
                title: '配偶表外不良贷款归属机构',
                align:"center",
                dataIndex: 'pobwbldkgsjg'
              },
              {
                title: '配偶表内不良贷款余额',
                align:"center",
                dataIndex: 'pobnbldkye'
              },
              {
                title: '配偶表内不良贷款归属机构',
                align:"center",
                dataIndex: 'pobnbldkgsjg'
              },
            ]
          },

          {
            title: '是否逾期贷款',
            children: [
              {
                title: '是否逾期贷款',
                align:"center",
                dataIndex: 'sfyqdk',
              },
              {
                title: '逾期天数',
                align:"center",
                dataIndex: 'yqts',
              },
            ]
          },

         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dkjkptxdlfxzctz/dkjkptXdlfxzctz/list",
          delete: "/dkjkptxdlfxzctz/dkjkptXdlfxzctz/delete",
          deleteBatch: "/dkjkptxdlfxzctz/dkjkptXdlfxzctz/deleteBatch",
          exportXlsUrl: "dkjkptxdlfxzctz/dkjkptXdlfxzctz/exportXls",
          importExcelUrl: "dkjkptxdlfxzctz/dkjkptXdlfxzctz/importExcel",
          exportTemplateUrl: "/dkjkptxdlfxzctz/dkjkptXdlfxzctz/exportTemplateXls",
       },
        exportTemplateName: '信贷类风险资产台账导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        let tjMoment=""
        let dqMoment=""
        let dkrqMoment=""
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        if (this.queryParam.sjrq) {
          tjMoment = moment(this.queryParam.sjrq).format("YYYYMMDD")
        }
        if (this.queryParam.dkrq) {
          dkrqMoment = moment(this.queryParam.dkrq).format("YYYYMMDD")
        }
        if (this.queryParam.dqrq) {
          dqMoment = moment(this.queryParam.dqrq).format("YYYYMMDD")
        }
        param.sjrq=tjMoment
        param.dkrq=dkrqMoment
        param.dqrq=dqMoment
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>