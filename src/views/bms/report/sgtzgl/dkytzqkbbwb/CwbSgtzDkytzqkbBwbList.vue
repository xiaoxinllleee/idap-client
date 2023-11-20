<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultDateOpera"
                             :format="dateFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目代号">
              <a-input placeholder="请输入项目代号" v-model="queryParam.xmdh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名称" v-model="queryParam.xmmc"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('财务部-贷款与投资情况表')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
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

<!--        <span slot="action" slot-scope="text, record">-->
<!--          <a @click="handleEdit(record)">编辑</a>-->

<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
<!--        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
<!--    <cwbSgtzDkytzqkbBwb-modal ref="modalForm" @ok="modalFormOk"></cwbSgtzDkytzqkbBwb-modal>-->
  </a-card>
</template>

<script>
  //import CwbSgtzDkytzqkbBwbModal from './modules/CwbSgtzDkytzqkbBwbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "@/utils/util"
  import moment from 'moment'

  export default {
    name: "CwbSgtzDkytzqkbBwbList",
    mixins:[JeecgListMixin],
    components: {
      //CwbSgtzDkytzqkbBwbModal
    },
    data () {
      return {
        description: '财务部-贷款与投资情况表管理页面',
        rq: undefined,
        dateFormat: 'YYYY-MM-DD',
        //默认当前月份
        defaultDateOpera: undefined,
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
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq'
           },
		   {
            title: '项目代号',
            align:"center",
            dataIndex: 'xmdh'
           },
		   {
            title: '项目名称',
            align:"center",
            dataIndex: 'xmmc'
           },
		   {
            title: '投资收益',
            align:"center",
            dataIndex: 'tzysy'
           },
		   {
            title: '投资损失',
            align:"center",
            dataIndex: 'tzyss'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/cwbsgtz/cwbSgtzDkytzqkbBwb/list",
          delete: "/cwbsgtz/cwbSgtzDkytzqkbBwb/delete",
          deleteBatch: "/cwbsgtz/cwbSgtzDkytzqkbBwb/deleteBatch",
          exportXlsUrl: "cwbsgtz/cwbSgtzDkytzqkbBwb/exportXls",
          importExcelUrl: "cwbsgtz/cwbSgtzDkytzqkbBwb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      /**
       * 数据日期格式化
       */
      beforeUpload() {
        if (this.queryParam.sjrq) {
          this.rq = this.queryParam.sjrq.format('YYYYMMDD')
        }
      },
      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        let tjMoment = ''
        if (this.queryParam.sjrq) {
          tjMoment = moment(this.queryParam.sjrq).format('YYYYMMDD')
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.sjrq = tjMoment
        return filterObj(param)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>