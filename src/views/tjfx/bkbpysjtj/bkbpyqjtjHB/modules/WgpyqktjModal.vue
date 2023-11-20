<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"  :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             show-search :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网格编号">
              <a-input placeholder="请输入网格编号" v-model="queryParam.wgbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('评议情况统计(网格)')">导出</a-button>
      <a-button icon="area-chart" :loading="initLoading" @click="initData">提取</a-button>
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


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import { putAction } from '@api/manage'
  import store from '@/store/'

  export default {
    name: "WgpyqktjModal",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '评议情况统计(网格)管理页面',
        monthFormat: 'YYYY-MM-DD',
        defaultMonthOpera: '',
        initLoading: false,
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
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '网格编号',
            align:"center",
            dataIndex: 'wgbh'
           },
          {
            title: '网格名称',
            align:"center",
            dataIndex: 'wgbh_dictText'
          },
          {
            title: '总人数数',
            align:"center",
            dataIndex: 'zrs'
          },
		   {
            title: '总户数',
            align:"center",
            dataIndex: 'zhs'
           },
		   {
            title: '可评议户数',
            align:"center",
            dataIndex: 'kpyhs'
           },
		   {
            title: '第一轮评议户数',
            align:"center",
            dataIndex: 'pyhs1'
           },
		   {
            title: '第二轮评议户数',
            align:"center",
            dataIndex: 'pyhs2'
           },
		   {
            title: '第三轮评议户数',
            align:"center",
            dataIndex: 'pyhs3'
           },
		   {
            title: '第四轮评议户数',
            align:"center",
            dataIndex: 'pyhs4'
           },
		   {
            title: '综合评议户数',
            align:"center",
            dataIndex: 'zhpyhs'
           },
		   {
            title: '白名单户数',
            align:"center",
            dataIndex: 'bmdhs'
           },
		   {
            title: '可评率',
            align:"center",
            dataIndex: 'kpl'
           },
		   {
            title: '评议率',
            align:"center",
            dataIndex: 'pyl'
           },
		   {
            title: '白名单率',
            align:"center",
            dataIndex: 'bmdl'
           },

        ],
		url: {
          list: "/bkbpyqktj/wgpyqktj/list",
          delete: "/bkbpyqktj/wgpyqktj/delete",
          deleteBatch: "/bkbpyqktj/wgpyqktj/deleteBatch",
          exportXlsUrl: "bkbpyqktj/wgpyqktj/exportXls",
          importExcelUrl: "bkbpyqktj/wgpyqktj/importExcel",
          extract: "bkbpyqktj/wgpyqktj/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {sjrq: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      searchReset() {
        this.queryParam = {sjrq: undefined, sszh: undefined};
        this.queryParam.sjrq=this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      getQueryParams() {
        let sjrqDate = ''
        if (this.queryParam.sjrq) {
          sjrqDate = this.queryParam.sjrq.format('YYYY-MM-DD')
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.sjrq = sjrqDate
        return filterObj(param)
      },
      initData() {
        let sjrq=''
        var params = Object.assign({}, this.queryParam)
        if (params.sjrq === undefined || params.sjrq === null) {
          this.$message.warning("请选择数据日期！")
          return false
        }else {
          sjrq = moment(params.sjrq).format("YYYY-MM-DD")
        }
        this.initLoading = true
        putAction(this.url.extract, {sjrq: sjrq}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.initLoading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>