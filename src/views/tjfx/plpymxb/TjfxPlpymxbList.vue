<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.pysj" :format="DateFormat"
                              @change="onDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属村组">
              <JTreeSelectNotJg placeholder="请选择所属网格"
                                v-model="queryParam.czbm"
                                treeNodeFilterProp="title"
                                pidField="PARENT_ID"
                                dict="YXDYGL_MAIN,WGMC,ID"
                                pidValue="0"
                                :showSearch="true"
                                :treeDefaultExpandAll="true"/>

            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户号编码">
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户证件号码">
              <a-input placeholder="请输入客户证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定等级">
              <j-dict-select-tag placeholder="请输入评定等级" v-model="queryParam.pddj" dict-code="plpypddj"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评议轮数">
              <a-input placeholder="请输入评议轮数" v-model="queryParam.pyls"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评议员姓名">
              <a-input placeholder="请输入评议员姓名" v-model="queryParam.pyyxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评议员证件号码">
              <a-input placeholder="请输入评议员证件号码" v-model="queryParam.pyyzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入员工">
              <a-input placeholder="请输入录入员工" v-model="queryParam.lryg"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('批量评议明细表')">导出</a-button>
      <a-button icon="area-chart" @click="init">提取</a-button>
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

        <!-- 字符串超长截取省略号显示 -->
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="hhbm" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="czbm" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>

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

    <!-- 表单区域 -->
    <tjfxPlpymxb-modal ref="modalForm" @ok="modalFormOk"></tjfxPlpymxb-modal>
  </a-card>
</template>

<script>
  import TjfxPlpymxbModal from './modules/TjfxPlpymxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
  import moment from 'moment'
  import { postAction } from '@api/manage'
  import { filterObj } from '@/utils/util'
  import JEllipsis from '@comp/jeecg/JEllipsis'

  export default {
    name: "TjfxPlpymxbList",
    mixins:[JeecgListMixin],
    components: {
      TjfxPlpymxbModal,JTreeSelect,JTreeSelectNotJg,JEllipsis
    },
    data () {
      return {
        description: '批量评议明细表管理页面',
        DateFormat: 'YYYY-MM-DD',
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
            title: '统计日期',
            align:"center",
            dataIndex: 'pysj'
           },
		   {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '村组编码',
            align:"center",
            dataIndex: 'czbm',
         scopedSlots: { customRender: 'czbm' }
           },
          {
            title: '村组名称',
            align:"center",
            dataIndex: 'czbm_dictText'
           },
		   {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm',
         scopedSlots: { customRender: 'hhbm' }
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
         scopedSlots: { customRender: 'zjhm' }
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
           },
		   {
            title: '评议得分',
            align:"center",
            dataIndex: 'pddf'
           },
		   {
            title: '评定等级',
            align:"center",
            dataIndex: 'pddj_dictText'
           },
		   {
            title: '建议授信额度',
            align:"center",
            dataIndex: 'jysxed'
           },
		   {
            title: '评议轮数',
            align:"center",
            dataIndex: 'pyls'
           },
		   {
            title: '评议员姓名',
            align:"center",
            dataIndex: 'pyyxm'
           },
		   {
            title: '评议员证件号码',
            align:"center",
            dataIndex: 'pyyzjhm'
           },
		   {
            title: '录入员工',
            align:"center",
            dataIndex: 'lryg'
           },
        ],
		url: {
          list: "/tjfx/tjfxPlpymxb/list",
          init: "/tjfx/tjfxPlpymxb/init",
          delete: "/tjfx/tjfxPlpymxb/delete",
          deleteBatch: "/tjfx/tjfxPlpymxb/deleteBatch",
          exportXlsUrl: "tjfx/tjfxPlpymxb/exportXls",
          importExcelUrl: "tjfx/tjfxPlpymxb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      onDateChange: function(value, dateString) {
        let pysjDateString = dateString
        this.queryParam.pysj_begin = pysjDateString[0]
        this.queryParam.pysj_end = pysjDateString[1]
      },
      getQueryParams: function() {
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        delete param.pysj
        return filterObj(param)
      },
      init() {
        this.loading = true
        postAction(this.url.init, "").then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>