<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易批次号">
              <a-input placeholder="请输入交易批次号" v-model="queryParam.jypch"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位名称">
              <a-input placeholder="请输入单位名称" v-model="queryParam.dwmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位编号">
              <a-input placeholder="请输入单位编号" v-model="queryParam.dwbh"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目编号">
              <a-input placeholder="请输入项目编号" v-model="queryParam.xmbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名称" v-model="queryParam.xmmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位帐号">
              <a-input placeholder="请输入单位帐号" v-model="queryParam.dwzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位账号户名">
              <a-input placeholder="请输入单位账号户名" v-model="queryParam.dwzhhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="初始操作柜员">
              <a-input placeholder="请输入初始操作柜员" v-model="queryParam.csczgy"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="初始操作机构">
              <a-input placeholder="请输入初始操作机构" v-model="queryParam.csczjg"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('代收代发项目管理表')">导出</a-button>
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
        :scroll="{x:8450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dsdfxmglb-modal ref="modalForm" @ok="modalFormOk"></dsdfxmglb-modal>
  </a-card>
</template>

<script>
  import DsdfxmglbModal from './modules/DsdfxmglbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DsdfxmglbList",
    mixins:[JeecgListMixin],
    components: {
      DsdfxmglbModal
    },
    data () {
      return {
        description: '代收代发项目管理表管理页面',
        // 表头
        columns: [
          {
            title: '',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '单位编号',
            align:"center",
            dataIndex: 'dwbh'
           },
		   {
            title: '项目编号',
            align:"center",
            dataIndex: 'xmbh'
           },
		   {
            title: '单位名称',
            align:"center",
            dataIndex: 'dwmc'
           },
		   {
            title: '项目名称',
            align:"center",
            dataIndex: 'xmmc'
           },
		   {
            title: '单位账户类型',
            align:"center",
            dataIndex: 'dwzhlx'
           },
		   {
            title: '单位帐号',
            align:"center",
            dataIndex: 'dwzh'
           },
		   {
            title: '单位账号户名',
            align:"center",
            dataIndex: 'dwzhhm'
           },
		   {
            title: '子账户编码',
            align:"center",
            dataIndex: 'zhbm'
           },
		   {
            title: '立项日期',
            align:"center",
            dataIndex: 'lxrq'
           },
		   {
            title: '代收代发进度',
            align:"center",
            dataIndex: 'dsdfjd'
           },
		   {
            title: '是否转入过渡户',
            align:"center",
            dataIndex: 'sfzrgdh'
           },
		   {
            title: '是否转账支票',
            align:"center",
            dataIndex: 'sfzzzp'
           },
		   {
            title: '代收发标志',
            align:"center",
            dataIndex: 'dsfbz'
           },
		   {
            title: '数据格式',
            align:"center",
            dataIndex: 'sjgs'
           },
		   {
            title: '打印格式',
            align:"center",
            dataIndex: 'dygs'
           },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz'
           },
		   {
            title: '摘要',
            align:"center",
            dataIndex: 'zy'
           },
		   {
            title: '状态',
            align:"center",
            dataIndex: 'zt'
           },
		   {
            title: '交易日期',
            align:"center",
            dataIndex: 'jyrq'
           },
		   {
            title: '交易批次号',
            align:"center",
            dataIndex: 'jypch'
           },
		   {
            title: '核心UUID',
            align:"center",
            dataIndex: 'hxuuid'
           },
		   {
            title: '核心批次号',
            align:"center",
            dataIndex: 'hxpch'
           },
		   {
            title: '明细1',
            align:"center",
            dataIndex: 'mx1'
           },
		   {
            title: '明细2',
            align:"center",
            dataIndex: 'mx2'
           },
		   {
            title: '明细3',
            align:"center",
            dataIndex: 'mx3'
           },
		   {
            title: '明细4',
            align:"center",
            dataIndex: 'mx4'
           },
		   {
            title: '明细5',
            align:"center",
            dataIndex: 'mx5'
           },
		   {
            title: '明细6',
            align:"center",
            dataIndex: 'mx6'
           },
		   {
            title: '明细7',
            align:"center",
            dataIndex: 'mx7'
           },
		   {
            title: '明细8',
            align:"center",
            dataIndex: 'mx8'
           },
		   {
            title: '明细9',
            align:"center",
            dataIndex: 'mx9'
           },
		   {
            title: '明细10',
            align:"center",
            dataIndex: 'mx10'
           },
		   {
            title: '明细11',
            align:"center",
            dataIndex: 'mx11'
           },
		   {
            title: '明细12',
            align:"center",
            dataIndex: 'mx12'
           },
		   {
            title: '明细13',
            align:"center",
            dataIndex: 'mx13'
           },
		   {
            title: '明细14',
            align:"center",
            dataIndex: 'mx14'
           },
		   {
            title: '明细15',
            align:"center",
            dataIndex: 'mx15'
           },
		   {
            title: '处理状态',
            align:"center",
            dataIndex: 'clzt'
           },
		   {
            title: '总笔数',
            align:"center",
            dataIndex: 'zbs'
           },
		   {
            title: '总金额',
            align:"center",
            dataIndex: 'zje'
           },
		   {
            title: '成功笔数',
            align:"center",
            dataIndex: 'cgbs'
           },
		   {
            title: '成功金额',
            align:"center",
            dataIndex: 'cgje'
           },
		   {
            title: '失败笔数',
            align:"center",
            dataIndex: 'sbbs'
           },
		   {
            title: '失败金额',
            align:"center",
            dataIndex: 'sbje'
           },
		   {
            title: '退回金额',
            align:"center",
            dataIndex: 'thje'
           },
		   {
            title: '退回状态',
            align:"center",
            dataIndex: 'thzt'
           },
		   {
            title: '请求文件路径',
            align:"center",
            dataIndex: 'qqwjlj'
           },
		   {
            title: '请求文件名称',
            align:"center",
            dataIndex: 'qqwjmc'
           },
		   {
            title: '应答文件路径',
            align:"center",
            dataIndex: 'ydwjlj'
           },
		   {
            title: '应答文件名称',
            align:"center",
            dataIndex: 'ydwjmc'
           },
		   {
            title: '回盘文件路径',
            align:"center",
            dataIndex: 'hpwjlj'
           },
		   {
            title: '回盘文件名称',
            align:"center",
            dataIndex: 'hpwjmc'
           },
		   {
            title: '录入操作柜员',
            align:"center",
            dataIndex: 'lrczgy'
           },
		   {
            title: '录入操作机构',
            align:"center",
            dataIndex: 'lrczjg'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'lrrq'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '修改操作柜员',
            align:"center",
            dataIndex: 'xgczgy'
           },
		   {
            title: '修改操作机构',
            align:"center",
            dataIndex: 'xgczjg'
           },
		   {
            title: '修改日期',
            align:"center",
            dataIndex: 'xgrq'
           },
		   {
            title: '修改时间',
            align:"center",
            dataIndex: 'xgsj'
           },
		   {
            title: '初始操作柜员',
            align:"center",
            dataIndex: 'csczgy'
           },
		   {
            title: '初始操作机构',
            align:"center",
            dataIndex: 'csczjg'
           },
		   {
            title: '初始日期',
            align:"center",
            dataIndex: 'csrq'
           },
		   {
            title: '初始时间',
            align:"center",
            dataIndex: 'cssj'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'yl1'
           },
		   {
            title: '预留2',
            align:"center",
            dataIndex: 'yl2'
           },
		   {
            title: '预留3',
            align:"center",
            dataIndex: 'yl3'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		  /* {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'dttime',
            align:"center",
            dataIndex: 'dttime'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dsdfxmglb/dsdfxmglb/list",
          delete: "/dsdfxmglb/dsdfxmglb/delete",
          deleteBatch: "/dsdfxmglb/dsdfxmglb/deleteBatch",
          exportXlsUrl: "dsdfxmglb/dsdfxmglb/exportXls",
          importExcelUrl: "dsdfxmglb/dsdfxmglb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>