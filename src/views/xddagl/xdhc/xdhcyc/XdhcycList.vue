<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="最新借款日期">
              <a-date-picker placeholder="请选择最新借款日期" v-model="queryParam.zxjkrq" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm"
                             :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核查日期">
              <a-date-picker placeholder="请选择核查日期" v-model="queryParam.lrsj" style="width: 100%"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否核查">
              <j-dict-select-tag  :placeholder="true" dict-code="sfhc" v-model="queryParam.sfhc"/>
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
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('信贷T+1核查先隐藏')" v-has="'xdhcyc:exportXls'">导出</a-button>
      <a-button  icon="import" @click="excelImport" v-has="'xdhcyc:import'">导入</a-button>
      <a-button  icon="area-chart" @click="init" v-has="'xdhcyc:init'">提取</a-button>

    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2600}"
        @change="handleTableChange">


        <span slot="action" slot-scope="text, record">
             <a @click="handleView(record)" v-has="'xdhcyc:view'">查看</a>
           <a-divider type="vertical" />
          <a @click="handleEdit(record)" v-has="'xdhcyc:edit'">编辑</a>

          <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xdhcyc-modal ref="modalForm" @ok="modalFormOk"></xdhcyc-modal>
    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
  import XdhcycModal from './modules/XdhcycModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import { filterObj } from '@/utils/util'
  import {deleteAction, getAction} from '@/api/manage'
  import moment from 'moment'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "XdhcycList",
    mixins:[JeecgListMixin],
    components: {
      XdhcycModal,JTreeSelect,JEllipsis,ExcelImport
    },
    data () {
      return {
        description: '信贷T+1核查先隐藏管理页面',
        // 表头
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
            dataIndex: 'xh',
            width: 100
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
            width: 100
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText',
            width: 100
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm',
            width: 100
           },
		   {
            title: '电话号码',
            align:"center",
            dataIndex: 'sjhm',
            width: 120,
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width: 180,
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'hth',
            width: 200
           },
		   {
            title: '最新借款日期',
            align:"center",
            dataIndex: 'zxjkrq',
            width: 120
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje',
            width: 150
           },
		   {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs',
            width: 100
           },
		   {
            title: '第一责任人',
            align:"center",
            dataIndex: 'zrr',
            width: 120
           },
		   {
            title: '主客户经理',
            align:"center",
            dataIndex: 'khjl',
            width: 120
           },
          {
            title: '利率',
            align:"center",
            dataIndex: 'll',
            width: 100
          },
          {
            title: '合同批准日',
            align:"center",
            dataIndex: 'htzpr',
            width: 120
           },
		   {
            title: '合同金额',
            align:"center",
            dataIndex: 'htje',
            width: 150
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            width: 150
           },
		   {
            title: '是否核查',
            align:"center",
            dataIndex: 'sfhc_dictText',
            width: 100
           },
		   {
            title: '核查日期',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
           },
          {
            title: '核查人员',
            align:"center",
            dataIndex: 'lrr',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width:150,
            fixed:"right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/xdhcyc/xdhcyc/list",
          delete: "/xdhcyc/xdhcyc/delete",
          deleteBatch: "/xdhcyc/xdhcyc/deleteBatch",
          exportXlsUrl: "xdhcyc/xdhcyc/exportXls",
          importExcelUrl: "xdhcyc/xdhcyc/importExcel",
          exportTemplateUrl: "/xdhcyc/xdhcyc/exportTemplateXls",
          init: "/xdhcyc/xdhcyc/init",
       },
        exportTemplateName: '信贷T+1核查先隐藏导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      init () {
        this.loading = true
        let params = {}
        getAction(this.url.init,params).then((res) => {
          if (res.success) {
            this.$message.success('提取成功')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败')
          }
        }).catch((err) => {
          this.$message.error('提取失败', error)
        }).finally(() => {
          this.loading = false
        })
      },

      getQueryParams(){
        let tjrqment = "";
        let hcsjment = "";
        if(this.queryParam.zxjkrq) {
          tjrqment = moment(this.queryParam.zxjkrq).format("YYYY-MM-DD");
        }
        if(this.queryParam.lrsj) {
          hcsjment = moment(this.queryParam.lrsj).format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
          param.zxjkrq = tjrqment;

          param.lrsj = hcsjment;
        return filterObj(param);
      },

      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.show = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {hth: record.hth}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>