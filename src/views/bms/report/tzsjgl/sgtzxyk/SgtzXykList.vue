<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-month-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构名称"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="推广人员">
              <a-input placeholder="请输入推广人员" v-model="queryParam.tgry"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡种">
              <a-input placeholder="请输入卡种" v-model="queryParam.kz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('信用卡')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-button @click="handleDelete1" icon="delete">批量删除</a-button>
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
        :scroll="{ x: 2800}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
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
    <sgtzXyk-modal ref="modalForm" @ok="modalFormOk"></sgtzXyk-modal>
  </a-card>
</template>

<script>
  import SgtzXykModal from './modules/SgtzXykModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { deleteAction } from '@api/manage'
  import { filterObj } from '@/utils/util'

  export default {
    name: "SgtzXykList",
    mixins:[JeecgListMixin],
    components: {
      SgtzXykModal,ExcelImport,JTreeSelect
    },
    data () {
      return {
        description: '信用卡_湘潭管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
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
            dataIndex: 'sjrq',
         customRender: function (text) {
           return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
         },
         sorter: (a, b) => b.sjrq.replace(/-/g, '/') - a.sjrq.replace(/-/g, '/'),
         width: 100
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
		   {
            title: '卡号',
            align:"center",
            dataIndex: 'kh'
           },
		   {
            title: '卡种',
            align:"center",
            dataIndex: 'kz'
           },
		   {
            title: '推广人员',
            align:"center",
            dataIndex: 'tgry'
           },
          {
            title: '推广人员姓名',
            align:"center",
            dataIndex: 'tgry_dictText'
           },

		   {
            title: '推广专案',
            align:"center",
            dataIndex: 'tgza'
           },
		   {
            title: '卡片状态',
            align:"center",
            dataIndex: 'kpzt'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '卡片到期日',
            align:"center",
            dataIndex: 'kpdqr'
           },
		   {
            title: '姓名',
            align:"center",
            dataIndex: 'xm'
           },
		   {
            title: '手机号码',
            align:"center",
            dataIndex: 'sjhm'
           },
		   {
            title: '逾期月份',
            align:"center",
            dataIndex: 'yqyf'
           },
		   {
            title: '循环额度',
            align:"center",
            dataIndex: 'xhed'
           },
		   {
            title: '账单最小还款',
            align:"center",
            dataIndex: 'zdzxhk'
           },
		   {
            title: '账单逾期金额',
            align:"center",
            dataIndex: 'zdyqje'
           },
		   {
            title: '透支全额',
            align:"center",
            dataIndex: 'tzje'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
           },
		   {
            title: '制卡日期',
            align:"center",
            dataIndex: 'zkrq'
           },
		   {
            title: '激活日期',
            align:"center",
            dataIndex: 'jhrq'
           },
		   {
            title: '发卡日期',
            align:"center",
            dataIndex: 'fkrq'
           },
		   {
            title: '逾期期数',
            align:"center",
            dataIndex: 'yqqs'
           },
		   {
            title: '五级分类',
            align:"center",
            dataIndex: 'wjfl_dictText'
           },
		   {
            title: '逾期天数',
            align:"center",
            dataIndex: 'yqts'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: "right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/sgtzxyk/sgtzXyk/list",
          delete: "/sgtzxyk/sgtzXyk/delete",
          deleteBatch: "/sgtzxyk/sgtzXyk/deleteBatch",
          deleteByBatch: "/sgtzxyk/sgtzXyk/deleteByBatch",
          exportXlsUrl: "sgtzxyk/sgtzXyk/exportXls",
          importExcelUrl: "sgtzxyk/sgtzXyk/importExcel",
          exportTemplateUrl:"/sgtzxyk/sgtzXyk/exportTemplateXls",
       },
          exportTemplateName: '信用卡导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { sjrq: record.sjrq,zjhm:record.zjhm }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      handleDelete1: function () {

        if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null){
          this.$message.error("请选择数据日期!")
          return
        }else {
          this.rq = this.queryParam.sjrq.format("YYYY-MM")+'-01';
          console.log(this.rq)
          var that = this;
          deleteAction(that.url.deleteByBatch, {sjrq:this.rq}).then((res) => {
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
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYY-MM")+'-01';
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
        if (this.queryParam.sjrq) {
          tjMoment=this.queryParam.sjrq.format("YYYY-MM") + '-01'
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (param.sjrq) {
          param.sjrq = tjMoment;
        }
        return filterObj(param)
      },
      handleAdd: function () {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '新增'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = false;
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = true;
      },


    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>