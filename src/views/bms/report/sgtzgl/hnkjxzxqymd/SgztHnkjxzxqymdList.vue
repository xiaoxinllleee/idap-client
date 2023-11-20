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
            <a-form-item label="企业名称">
              <a-input placeholder="请输入企业名称" v-model="queryParam.qymc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统一社会信用代码">
              <a-input placeholder="请输入统一社会信用代码" v-model="queryParam.tyshxydm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="企业注册地">
                <a-input placeholder="请输入企业注册地" v-model="queryParam.qyzcd"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="评价状态">
                <a-input placeholder="请输入评价状态" v-model="queryParam.pjzt"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否高企">
                <a-input placeholder="请输入是否高企" v-model="queryParam.sfgq"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('湖南科技型中小企业名单')">导出
      </a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-button @click="handleDelete1" icon="delete">删除</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
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

    <!-- 表单区域 -->
    <sgztHnkjxzxqymd-modal ref="modalForm" @ok="modalFormOk"></sgztHnkjxzxqymd-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import SgztHnkjxzxqymdModal from './modules/SgztHnkjxzxqymdModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import moment from 'moment'
import { filterObj } from '@/utils/util'
import { deleteAction } from '@api/manage'

export default {
  name: "SgztHnkjxzxqymdList",
  mixins: [JeecgListMixin],
  components: {
    SgztHnkjxzxqymdModal, ExcelImport
  },
  data() {
    return {
      description: '湖南科技型中小企业名单管理页面',
      // 表头
      monthFormat: 'YYYY-MM-DD',
      // 默认当前月份
      defaultMonthOpera: '',
      rq:'',
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '数据日期',
          align: "center",
          dataIndex: 'fiscalDate'
        },
        {
          title: '企业名称',
          align: "center",
          dataIndex: 'qymc'
        },
        {
          title: '统一社会信用代码',
          align: "center",
          dataIndex: 'tyshxydm'
        },
        {
          title: '企业注册地',
          align: "center",
          dataIndex: 'qyzcd'
        },
        {
          title: '评价状态',
          align: "center",
          dataIndex: 'pjzt'
        },
        {
          title: '是否高企',
          align: "center",
          dataIndex: 'sfgq'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          scopedSlots: {customRender: 'action'},
        }
      ],
      url: {
        list: "/hnkjxzxqymd/sgztHnkjxzxqymd/list",
        delete: "/hnkjxzxqymd/sgztHnkjxzxqymd/delete",
        deleteBatch: "/hnkjxzxqymd/sgztHnkjxzxqymd/deleteBatch",
        deleteByBatch: "/hnkjxzxqymd/sgztHnkjxzxqymd/deleteByBatch",
        exportXlsUrl: "hnkjxzxqymd/sgztHnkjxzxqymd/exportXls",
        importExcelUrl: "hnkjxzxqymd/sgztHnkjxzxqymd/importExcel",
        exportTemplateUrl:"/hnkjxzxqymd/sgztHnkjxzxqymd/exportTemplateXls",
      },
      exportTemplateName: '湖南科技型中小企业名单导入模板'
    }
  },
  computed: {},
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