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
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="序号">
              <a-input placeholder="请输入序号" v-model="queryParam.xh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="县(市、区、旗)">
              <a-input placeholder="请输入县(市、区、旗)" v-model="queryParam.cs"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="乡(镇)">
              <a-input placeholder="请输入乡(镇)" v-model="queryParam.xz"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('边缘易致贫人口名单')">导出</a-button>
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
        :scroll="{x:4000}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link"> <a-icon type="down" /></a>
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
    <sgtzglByyzprkmd-modal ref="modalForm" @ok="modalFormOk"></sgtzglByyzprkmd-modal>
  </a-card>
</template>

<script>
  import SgtzglByyzprkmdModal from './modules/SgtzglByyzprkmdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import ExcelImport from '@comp/common/ExcelImport'
  import { deleteAction } from '@api/manage'

  export default {
    name: "SgtzglByyzprkmdList",
    mixins:[JeecgListMixin],
    components: {
      SgtzglByyzprkmdModal,ExcelImport
    },
    data () {
      return {
        description: '边缘易致贫人口名单管理页面',
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
            title: '序号',
            align:"center",
            dataIndex: 'xh'
           },
          {
            title: '数据日期',
            align:"center",
            dataIndex: 'fiscalDate'
          },
		   {
            title: '县(市、区、旗)',
            align:"center",
            dataIndex: 'cs'
           },
		   {
            title: '乡(镇)',
            align:"center",
            dataIndex: 'xz'
           },
		   {
            title: '行政村',
            align:"center",
            dataIndex: 'xzc'
           },
		   {
            title: '自然村',
            align:"center",
            dataIndex: 'zrc'
           },
		   {
            title: '户编号',
            align:"center",
            dataIndex: 'hbh'
           },
		   {
            title: '人编号',
            align:"center",
            dataIndex: 'rgh'
           },
		   {
            title: '姓名',
            align:"center",
            dataIndex: 'xm'
           },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
		   {
            title: '人数',
            align:"center",
            dataIndex: 'rs'
           },
		   {
            title: '与户主关系',
            align:"center",
            dataIndex: 'yhzgx'
           },
		   {
            title: '民族',
            align:"center",
            dataIndex: 'mz'
           },
		   {
            title: '文化程度',
            align:"center",
            dataIndex: 'whcd'
           },
		   {
            title: '在校生状况',
            align:"center",
            dataIndex: 'zxszk'
           },
		   {
            title: '健康状况',
            align:"center",
            dataIndex: 'jkzk'
           },
		   {
            title: '劳动技能',
            align:"center",
            dataIndex: 'ldjn'
           },
		   {
            title: '务工时间（月）',
            align:"center",
            dataIndex: 'wgsj'
           },
		   {
            title: '是否参加大病保险',
            align:"center",
            dataIndex: 'sfcjdbbx'
           },
		   {
            title: '致贫原因1',
            align:"center",
            dataIndex: 'zpyy'
           },
		   {
            title: '危房户',
            align:"center",
            dataIndex: 'wfh'
           },
		   {
            title: '是否解决安全饮用水',
            align:"center",
            dataIndex: 'sfjjaqyys'
           },
		   {
            title: '人均纯收入',
            align:"center",
            dataIndex: 'rjcsr'
           },
		   {
            title: '户联系电话',
            align:"center",
            dataIndex: 'hlxdh'
           },
		   {
            title: '人联系电话',
            align:"center",
            dataIndex: 'rlxdh'
           },
		   {
            title: '首次识别时间',
            align:"center",
            dataIndex: 'scsbsj'
           },
		   {
            title: '人员识别时间',
            align:"center",
            dataIndex: 'rysbsj'
           },
		   {
            title: '户类型',
            align:"center",
            dataIndex: 'hlx'
           },
		   {
            title: '易返贫致贫户(监测对象)类型',
            align:"center",
            dataIndex: 'yfpzph'
           },
		   {
            title: '风险是否消除',
            align:"center",
            dataIndex: 'fxsfxc'
           },
		   {
            title: '风险识别时间',
            align:"center",
            dataIndex: 'fxsbsj'
           },
		   {
            title: '风险消除时间',
            align:"center",
            dataIndex: 'fxxcsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/byyzprkmd/sgtzglByyzprkmd/list",
          delete: "/byyzprkmd/sgtzglByyzprkmd/delete",
          deleteBatch: "/byyzprkmd/sgtzglByyzprkmd/deleteBatch",
          deleteByBatch: "/byyzprkmd/sgtzglByyzprkmd/deleteByBatch",
          exportXlsUrl: "byyzprkmd/sgtzglByyzprkmd/exportXls",
          importExcelUrl: "byyzprkmd/sgtzglByyzprkmd/importExcel",
          exportTemplateUrl:"/byyzprkmd/sgtzglByyzprkmd/exportTemplateXls",
       },
          exportTemplateName: '边缘易致贫人口名单导入模板'
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
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        let tjMoment=""
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