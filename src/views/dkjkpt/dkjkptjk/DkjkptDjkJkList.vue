<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请输入统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" @change="beforeUpload"/>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
                <j-tree-select placeholder="请选择机构查询"
                               pid-field="sjywjgdm"
                               :showSearch="true"
                               treeNodeFilterProp="title"
                               v-model="queryParam.jgdm"
                               dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                               :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="推广人员">
              <a-input placeholder="请输入推广人员" v-model="queryParam.tgry"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('金卡')">导出</a-button>
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
  <!--    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
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
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
    <!-- 表单区域 -->
    <dkjkptDjkJk-modal ref="modalForm" @ok="modalFormOk"></dkjkptDjkJk-modal>
  </a-card>
</template>

<script>
  import DkjkptDjkJkModal from './modules/DkjkptDjkJkModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'
  import { deleteAction } from '@api/manage'

  export default {
    name: "DkjkptDjkJkList",
    mixins:[JeecgListMixin],
    components: {
      DkjkptDjkJkModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '金卡管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        rq:'',
        // 表头
        columns: [
		   {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
           },
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
            width: '100',
          },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
		   {
            title: '姓名',
            align:"center",
            dataIndex: 'xm'
           },
		   {
            title: '信用额度',
            align:"center",
            dataIndex: 'xyed'
           },
		   {
            title: '逾期期数',
            align:"center",
            dataIndex: 'yqqs'
           },
		   {
            title: '账单最小还款额',
            align:"center",
            dataIndex: 'zdzxhke'
           },
		   {
            title: '透支金额',
            align:"center",
            dataIndex: 'tzje'
           },
          {
            title: '其中',
            children: [
              {
                title: '透支本金',
                align:"center",
                dataIndex: 'tzbj'
              },
              {
                title: '利息',
                align:"center",
                dataIndex: 'lx'
              },
              {
                title: '违约金',
                align:"center",
                dataIndex: 'wyj'
              },
              {
                title: '罚息',
                align:"center",
                dataIndex: 'fx'
              },
          ]
          },

		   {
            title: '推广人员',
            align:"center",
            dataIndex: 'tgry'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/djkjk/dkjkptDjkJk/list",
          delete: "/djkjk/dkjkptDjkJk/delete",
          deleteBatch: "/djkjk/dkjkptDjkJk/deleteBatch",
          deleteBatchAll: "/djkjk/dkjkptDjkJk/deleteBatchAll",
          exportXlsUrl: "djkjk/dkjkptDjkJk/exportXls",
          importExcelUrl: "djkjk/dkjkptDjkJk/importExcel",
          exportTemplateUrl: '/djkjk/dkjkptDjkJk/exportTemplateXls',
       },
        exportTemplateName:'标准金卡管理管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      excelImport(){
        if (this.queryParam.tjyf == undefined || this.queryParam.tjyf == '') {
          this.$message.error("请选择统计月份!")
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
      beforeUpload() {
        if (this.queryParam.tjyf){
          this.rq = this.queryParam.tjyf.format("YYYY-MM") + '-01';
        }
      },
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
      handleDelete1: function () {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        if (this.queryParam.tjyf == undefined && this.queryParam.tjyf == null){
          this.$message.error("请选择数据月份!")
          return
        }else {
          this.rq = this.queryParam.tjyf.format("YYYY-MM") + '-01';
          console.log(this.rq)
          var that = this;
          deleteAction(that.url.deleteBatchAll, {tjyf:this.rq}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>