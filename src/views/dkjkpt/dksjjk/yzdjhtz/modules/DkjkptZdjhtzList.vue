<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-month-picker placeholder="请输入数据日期" v-model="queryParam.sjrq" :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;"></a-month-picker>
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
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="签订类型">
              <j-dict-select-tag  v-model="queryParam.qdlx" placeholder="请选择签订类型"
                                  dictCode="qdlx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="还款频率">
              <j-dict-select-tag  v-model="queryParam.hkpl" placeholder="请选择还款频率"
                                  dictCode="ywltj_tjwd"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="计划还款截止日期">
              <a-input placeholder="请输入计划还款截止日期" v-model="queryParam.jhhkjzrq"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否到位">
              <j-dict-select-tag  placeholder="请选择是否到位" v-model="queryParam.sfdw" dict-code="sfdw"></j-dict-select-tag>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('已制定计划台账')">导出</a-button>
      <a-button @click="extract"  icon="area-chart" v-has="'yzdjhtz:init'">提取</a-button>
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

    <!-- 表单区域 -->
    <dkjkptZdjhtz-modal ref="modalForm" @ok="modalFormOk"></dkjkptZdjhtz-modal>
  </a-card>
</template>

<script>
  import DkjkptZdjhtzModal from './DkjkptZdjhtzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import moment from 'moment'
  import { deleteAction, putAction } from '@api/manage'
  import { filterObj } from '@/utils/util'

  export default {
    name: "DkjkptZdjhtzList",
    mixins:[JeecgListMixin],
    components: {
      DkjkptZdjhtzModal,JTreeSelect
    },
    data () {
      return {
        description: '已制定计划台账管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
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
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '签订类型',
            align:"center",
            dataIndex: 'qdlx_dictText'
           },
		   {
            title: '还款频率',
            align:"center",
            dataIndex: 'hkpl_dictText'
           },
		   {
            title: '计划还款金额',
            align:"center",
            dataIndex: 'jhkkjg'
           },
		   {
            title: '计划还款截止日期',
            align:"center",
            dataIndex: 'jhhkjzrq'
           },
		   {
            title: '到位情况',
            align:"center",
            dataIndex: 'dwqk'
           },
		   {
            title: '是否到位',
            align:"center",
            dataIndex: 'sfdw_dictText'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zdjhtz/dkjkptZdjhtz/list",
          delete: "/zdjhtz/dkjkptZdjhtz/delete",
          deleteBatch: "/zdjhtz/dkjkptZdjhtz/deleteBatch",
          exportXlsUrl: "zdjhtz/dkjkptZdjhtz/exportXls",
          importExcelUrl: "zdjhtz/dkjkptZdjhtz/importExcel",
          init: "zdjhtz/dkjkptZdjhtz/init",
       },
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
        deleteAction(that.url.delete, { sjrq: record.sjrq,jgdm: record.jgdm, zjhm: record.zjhm, qdlx: record.qdlx, hkpl: record.hkpl }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        let tjMoment=""
        if (this.queryParam.sjrq) {
          tjMoment=moment(this.queryParam.sjrq).format("YYYY-MM")+'-01'
        }

        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.sjrq = tjMoment
        return filterObj(param)
      },
      extract() {
        var params = Object.assign({}, this.queryParam)
        if (params.sjrq === undefined || params.sjrq == null) {
          this.$message.error('统计日期不能为空!')
          return
        }
        let sjrq = moment(params.sjrq).format('YYYY-MM')+'-01'
        this.loading = true
        putAction(this.url.init, { 'sjrq': sjrq }).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败！", error)
        }).finally(() => {
          this.loading = false
        })
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>