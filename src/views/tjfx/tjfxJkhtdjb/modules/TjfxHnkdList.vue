<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户身份证号码">
              <a-input placeholder="请输入客户身份证号码" v-model="queryParam.khsfzhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="额度">
              <a-input placeholder="请输入额度" v-model="queryParam.ey"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="基点">
              <a-input placeholder="请输入基点" v-model="queryParam.jd"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('统计分析惠农快贷')" v-has="'hnkdbmd:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'hnkdbmd:imp'">导入</a-button>
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
        :scroll="{ x: 5500}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
<!--          <a @click="handleEdit(record)">编辑</a>-->
    <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
        <!--  <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>

              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <tjfxHnkd-modal ref="modalForm" @ok="modalFormOk"></tjfxHnkd-modal>
  </a-card>
</template>

<script>
  import TjfxHnkdModal from './TjfxHnkdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SgtzglDkqmxQydkModal from '@views/bms/report/sgtzgl/dkqmxQydk/modules/SgtzglDkqmxQydkModal'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'
  import { filterObj } from '@/utils/util'

  export default {
    name: "TjfxHnkdList",
    mixins:[JeecgListMixin],
    components: {
      TjfxHnkdModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '统计分析惠农快贷管理页面',
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
            dataIndex: 'sjrq'
          },
		  {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
          },
		  {
            title: '客户身份证号码',
            align:"center",
            dataIndex: 'khsfzhm'
          },
		  {
            title: '额度',
            align:"center",
            dataIndex: 'ey'
          },
          {
            title: '导入时间',
            align:"center",
            dataIndex: 'drsj'
          },
		  {
            title: '基点',
            align:"center",
            dataIndex: 'jd'
          },
		  {
            title: '授信期限(月)',
            align:"center",
            dataIndex: 'sxqx'
          },
		  {
            title: '客户分群',
            align:"center",
            dataIndex: 'khfq'
          },
		  {
            title: '客户经理工号',
            align:"center",
            dataIndex: 'khljgh'
          },
		  {
            title: '调查责任人一工号',
            align:"center",
            dataIndex: 'dczrrgh1'
          },
		  {
            title: '调查责任人一比例',
            align:"center",
            dataIndex: 'dczrrbl1'
          },
		  {
            title: '调查责任人二工号',
            align:"center",
            dataIndex: 'dczrrgh2'
          },
		  {
            title: '调查责任人二比例',
            align:"center",
            dataIndex: 'dczrrbl2'
          },
		  {
            title: '管理责任人工号',
            align:"center",
            dataIndex: 'glzrrgh'
          },
		  {
            title: '管理责任人比例',
            align:"center",
            dataIndex: 'glzrrbl'
          },
		  {
            title: '审查责任人工号',
            align:"center",
            dataIndex: 'sczrrgh'
          },
		  {
            title: '审查责任人比例',
            align:"center",
            dataIndex: 'sczrrbl'
          },
		  {
            title: '最终审批责任人工号',
            align:"center",
            dataIndex: 'zzspzrrgh'
          },
		  {
            title: '最终审批责任人比例',
            align:"center",
            dataIndex: 'zzspzrrbl'
          },
		  {
            title: '第一责任人工号',
            align:"center",
            dataIndex: 'dyzrrgh'
          },
		  {
            title: '第一责任人比例',
            align:"center",
            dataIndex: 'dyzrrbl'
          },
		  {
            title: '民族',
            align:"center",
            dataIndex: 'mz'
          },
		  {
            title: '客户类型1',
            align:"center",
            dataIndex: 'khlx1'
          },
		  {
            title: '客户类型2',
            align:"center",
            dataIndex: 'khlx2'
          },
		  {
            title: '乡镇',
            align:"center",
            dataIndex: 'xz'
          },
		  {
            title: '有无子女',
            align:"center",
            dataIndex: 'ywzn'
          },
		  {
            title: '健康状况',
            align:"center",
            dataIndex: 'jkzk'
          },
		  {
            title: '婚姻状况',
            align:"center",
            dataIndex: 'hyzk'
          },
      {
            title: '配偶姓名',
            align:"center",
            dataIndex: 'poxm'
          },
		  {
            title: '配偶身份证号码',
            align:"center",
            dataIndex: 'posfzhm'
          },
		  {
            title: '家庭人口',
            align:"center",
            dataIndex: 'jtrk'
          },
      {
            title: '劳动能力',
            align:"center",
            dataIndex: 'ldnl'
          },
		  {
            title: '居住年限',
            align:"center",
            dataIndex: 'jznx'
          },
		  {
            title: '居住状况',
            align:"center",
            dataIndex: 'jzzk'
          },
		  {
            title: '最高学历',
            align:"center",
            dataIndex: 'zgxl'
          },
		  {
            title: '常住地址',
            align:"center",
            dataIndex: 'czdz'
          },
		  {
            title: '通讯地址',
            align:"center",
            dataIndex: 'txdz'
          },
		  {
            title: '行政区划代码',
            align:"center",
            dataIndex: 'xzqhdm'
          },
		  {
            title: '住地邮政编码',
            align:"center",
            dataIndex: 'zdyzbm'
          },
		  {
            title: '手机号码',
            align:"center",
            dataIndex: 'sjhm'
          },
		  {
            title: '是否户主',
            align:"center",
            dataIndex: 'sfhz'
          },
		  {
            title: '是否发送短信提醒',
            align:"center",
            dataIndex: 'sffsdxtx'
          },
		  {
            title: '现工资单位',
            align:"center",
            dataIndex: 'xgzdw'
          },
		  {
            title: '现担任职务',
            align:"center",
            dataIndex: 'xdrzw'
          },
		  {
            title: '行业',
            align:"center",
            dataIndex: 'hy'
          },
		  {
            title: '经营情况是否正常',
            align:"center",
            dataIndex: 'jyqksfzc'
          },
		  {
            title: '产品市场需求情况',
            align:"center",
            dataIndex: 'cpscxqqk'
          },
		  {
            title: '借款人还款意愿',
            align:"center",
            dataIndex: 'jkrhkyy'
          },
		  {
            title: '职业',
            align:"center",
            dataIndex: 'zy'
          },
		  {
            title: '职称',
            align:"center",
            dataIndex: 'zc'
          },
		  {
            title: '从业年限',
            align:"center",
            dataIndex: 'cxnx'
          },
		  {
            title: '综合评价标志',
            align:"center",
            dataIndex: 'zhpjbz'
          },
		  {
            title: '个体工商户名称',
            align:"center",
            dataIndex: 'gtgshmc'
          },
		  {
            title: '统一社会信用代码',
            align:"center",
            dataIndex: 'tyshxydm'
          },
		  {
            title: '家庭年收入',
            align:"center",
            dataIndex: 'jtnsr'
          },
		  {
            title: '个人年收入',
            align:"center",
            dataIndex: 'grnsr'
          },
		  {
            title: '循环标志',
            align:"center",
            dataIndex: 'xhbz'
          },
		  {
            title: '信用等级',
            align:"center",
            dataIndex: 'xydj'
          },
        /*  {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/tjfxHnkd/tjfxHnkd/list",
          delete: "/tjfxHnkd/tjfxHnkd/delete",
          deleteBatch: "/tjfxHnkd/tjfxHnkd/deleteBatch",
          exportXlsUrl: "tjfxHnkd/tjfxHnkd/exportXls",
          importExcelUrl: "tjfxHnkd/tjfxHnkd/importExcel",
        exportTemplateUrl:"/tjfxHnkd/tjfxHnkd/exportTemplateXls",
        },
        exportTemplateName: '统计分析惠农快贷导入模板'
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      beforeUpload() {
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYY-MM-DD");
        }
      },
      excelImport(){
        if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
          this.$message.error("请选择数据日期!")
          return
        }else {
          let params = {}
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?sjrq=${this.rq}`
          params.exportTemplateName = this.exportTemplateName
          var param = Object.assign({},this.queryParam, params);
          this.$refs.excelImportModal.showModal(param);
        }
      },

      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.sjrq) {
          tjyfMoment = this.queryParam.sjrq.format("YYYY-MM-DD");
        }
        console.log(tjyfMoment+'====tjyfMoment=====')
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.sjrq) {
          param.sjrq = tjyfMoment;
        }
        return filterObj(param);
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
