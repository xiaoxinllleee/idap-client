<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.fiscalDate"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="申请编号">
              <a-input placeholder="请输入申请编号" v-model="queryParam.sqbh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="内部账号">
              <a-input placeholder="请输入内部账号" v-model="queryParam.nbzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="成交编号">
              <a-input placeholder="请输入成交编号" v-model="queryParam.cjbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="品种">
              <a-input placeholder="请输入品种" v-model="queryParam.pz"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('债券汇总登记簿')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-button @click="handleDelete1" icon="delete">删除</a-button>
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
        :scroll="{ x: 5000}"
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
    <sgtzglZqhzdjb-modal ref="modalForm" @ok="modalFormOk"></sgtzglZqhzdjb-modal>
  </a-card>
</template>

<script>
  import SgtzglZqhzdjbModal from './SgtzglZqhzdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import { deleteAction } from '@api/manage'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'

  export default {
    name: "SgtzglZqhzdjbList",
    mixins:[JeecgListMixin],
    components: {
      SgtzglZqhzdjbModal,ExcelImport
    },
    data () {
      return {
        description: '手工台账-债券汇总登记簿管理页面',
        // 表头
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
        rq:'',
        columns: [
          {
            title: '#',
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
            dataIndex: 'fiscalDate'
           },
          {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
          },
		   {
            title: '申请编号',
            align:"center",
            dataIndex: 'sqbh'
           },
		   {
            title: '内部账号',
            align:"center",
            dataIndex: 'nbzh'
           },
		   {
            title: '成交编号',
            align:"center",
            dataIndex: 'cjbh'
           },
		   {
            title: '品种',
            align:"center",
            dataIndex: 'pz'
           },
		   {
            title: '债券（存单）代码',
            align:"center",
            dataIndex: 'dm'
           },
		   {
            title: '债券（存单）简称',
            align:"center",
            dataIndex: 'jc'
           },
		   {
            title: '发行主体',
            align:"center",
            dataIndex: 'fxzt'
           },
		   {
            title: '是否含权',
            align:"center",
            dataIndex: 'sfhq'
           },
		   {
            title: '期限',
            align:"center",
            dataIndex: 'qx'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'qxr'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'dqx'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'qxr1'
           },
		   {
            title: '到期日',
            align:"center",
            dataIndex: 'dqx1'
           },
		   {
            title: '计息方式',
            align:"center",
            dataIndex: 'jxfss'
           },
		   {
            title: '结息方式',
            align:"center",
            dataIndex: 'jxfs'
           },
		   {
            title: '买入时主体评级',
            align:"center",
            dataIndex: 'mrsztpj'
           },
		   {
            title: '买入时债项评级',
            align:"center",
            dataIndex: 'mrszxpj'
           },
		   {
            title: '购入日',
            align:"center",
            dataIndex: 'grr'
           },
		   {
            title: '购入日',
            align:"center",
            dataIndex: 'grr1'
           },
		   {
            title: '券面总额(元)',
            align:"center",
            dataIndex: 'qmze'
           },
		   {
            title: '券面总额(万元)',
            align:"center",
            dataIndex: 'qmze1'
           },
		   {
            title: '首次应计利息(元)',
            align:"center",
            dataIndex: 'scyjlx'
           },
		   {
            title: '初始购入全价（元/百元）',
            align:"center",
            dataIndex: 'csgrqj'
           },
		   {
            title: '初始购入净价（元/百元）',
            align:"center",
            dataIndex: 'csgrjj'
           },
		   {
            title: '持有至到期收益率（%）',
            align:"center",
            dataIndex: 'cyzdqsyl'
           },
		   {
            title: '交易类型',
            align:"center",
            dataIndex: 'jylx'
           },
		   {
            title: '交易对手',
            align:"center",
            dataIndex: 'jyds'
           },
		   {
            title: '金融资产分类',
            align:"center",
            dataIndex: 'jrzcfl'
           },
		   {
            title: '账面余额',
            align:"center",
            dataIndex: 'zmye'
           },
		   {
            title: '账面价值',
            align:"center",
            dataIndex: 'zmjz'
           },
		   {
            title: '含减值余额',
            align:"center",
            dataIndex: 'hjzye'
           },
		   {
            title: '含减值余额（万元）',
            align:"center",
            dataIndex: 'hjzyewy'
           },
		   {
            title: '剩余面值',
            align:"center",
            dataIndex: 'symz'
           },
		   {
            title: '公允价值变动余额（元）',
            align:"center",
            dataIndex: 'gyjzbdye'
           },
		   {
            title: '利息调整余额(元)',
            align:"center",
            dataIndex: 'lxtzye'
           },
		   {
            title: '应收利息余额（元）',
            align:"center",
            dataIndex: 'yslxye'
           },
		   {
            title: '减值准备(元)',
            align:"center",
            dataIndex: 'jzzb'
           },
		   {
            title: '当期票面（%）',
            align:"center",
            dataIndex: 'dqpm'
           },
		   {
            title: '剩余年限',
            align:"center",
            dataIndex: 'synx'
           },
		   {
            title: '剩余月限',
            align:"center",
            dataIndex: 'syyx'
           },
		   {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts'
           },
		   {
            title: '实时主体评级',
            align:"center",
            dataIndex: 'ssztpj'
           },
		   {
            title: '实时债项评级',
            align:"center",
            dataIndex: 'sszxpj'
           },
		   {
            title: '净价估值（元/百元）',
            align:"center",
            dataIndex: 'jjgz'
           },
		   {
            title: '估值市值',
            align:"center",
            dataIndex: 'gzsz'
           },
		   {
            title: '浮动盈亏（元）',
            align:"center",
            dataIndex: 'fdyk'
           },
		   {
            title: '浮动盈亏（万元）',
            align:"center",
            dataIndex: 'fdykwy'
           },
		   {
            title: '浮动盈亏比例（%）',
            align:"center",
            dataIndex: 'fdykbl'
           },
		   {
            title: '部分卖出金额(元)',
            align:"center",
            dataIndex: 'bfmcje'
           },
		   {
            title: '部分卖出利息(元)',
            align:"center",
            dataIndex: 'bfmclx'
           },
		   {
            title: '累计结息金额(元)',
            align:"center",
            dataIndex: 'ljjxje'
           },
		   {
            title: '业务状态',
            align:"center",
            dataIndex: 'ywzt'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl'
           },
		   {
            title: '特殊标识',
            align:"center",
            dataIndex: 'tsbz'
           },
		   {
            title: '投组',
            align:"center",
            dataIndex: 'tz'
           },
		   {
            title: '托管机构',
            align:"center",
            dataIndex: 'tgjg'
           },
		   {
            title: '机构号',
            align:"center",
            dataIndex: 'jgh'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgmc'
           },
		   {
            title: '实收利息(元)',
            align:"center",
            dataIndex: 'sslx'
           },
		   {
            title: '资产等级',
            align:"center",
            dataIndex: 'zcdj'
           },


        ],
		url: {
          list: "/Zqhzdjb/sgtzglZqhzdjb/list",
          delete: "/Zqhzdjb/sgtzglZqhzdjb/delete",
          deleteBatch: "/Zqhzdjb/sgtzglZqhzdjb/deleteBatch",
          deleteByBatch: "/Zqhzdjb/sgtzglZqhzdjb/deleteByBatch",
          exportXlsUrl: "Zqhzdjb/sgtzglZqhzdjb/exportXls",
          importExcelUrl: "Zqhzdjb/sgtzglZqhzdjb/importExcel",
          exportTemplateUrl: "Zqhzdjb/sgtzglZqhzdjb/exportTemplateXls",
       },
        exportTemplateName: '债券汇总登记簿导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete1: function () {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        if (this.queryParam.fiscalDate == undefined && this.queryParam.fiscalDate == null){
          this.$message.error("请选择数据日期!")
          return
        }else {
          this.rq = this.queryParam.fiscalDate.format("YYYYMMDD");
          console.log(this.rq)
          var that = this;
          deleteAction(that.url.deleteByBatch, {fiscalDate:this.rq}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }
      },
      beforeUpload() {
        if (this.queryParam.fiscalDate){
          this.rq = this.queryParam.fiscalDate.format("YYYYMMDD");
        }
      },
      excelImport(){
        if (this.queryParam.fiscalDate == undefined || this.queryParam.fiscalDate == '') {
          this.$message.error("请选择数据日期!")
          return
        }else {
          let params = {}
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rq}`
          params.exportTemplateName = this.exportTemplateName
          var param = Object.assign({},this.queryParam, params);
          this.$refs.excelImportModal.showModal(param);
        }
      },
      searchReset() {
        this.queryParam = {}
        this.loadData(1);
      },
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        let tjMoment=""
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        if (this.queryParam.fiscalDate) {
          tjMoment=moment(this.queryParam.fiscalDate).format("YYYYMMDD")
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.fiscalDate = tjMoment
        return filterObj(param)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>