<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开始时间">
              <a-date-picker placeholder="请选择开始时间" v-model="queryParam.kssj"  :format="monthFormat" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="结束时间">
              <a-date-picker placeholder="请选择结束时间" v-model="queryParam.jssj"  :format="monthFormat" style="width: 100%;" />
            </a-form-item>
          </a-col>

<!--    <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标志">
           <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>
         -->
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.sskhjl"></a-input>
            </a-form-item>
          </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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

      <a-button type="primary"
                icon="area-chart"
                @click="initData">提取</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('客户转化客户经理汇总')">导出</a-button>


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
        :scroll="{x:3500}"
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
    <khjlhz-modal ref="modalForm" @ok="modalFormOk"></khjlhz-modal>
  </a-card>
</template>

<script>
  import KhjlhzModal from './modules/KhjlhzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import { deleteAction, getAction, putAction } from '@/api/manage'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "KhjlhzList",
    mixins:[JeecgListMixin],
    components: {
      KhjlhzModal,JTreeSelect
    },
    data () {
      return {
        description: '客户转化客户经理汇总管理页面',
        monthFormat: 'YYYY-MM-DD',
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
		  /* {
            title: '组织标志',
            align:"center",
            dataIndex: 'zzbz'
           },
		   {
            title: '岗位标志',
            align:"center",
            dataIndex: 'gwbz'
           },
		   {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },*/
		   {
            title: '开始时间',
            align:"center",
            dataIndex: 'kssj'
           },
		   {
            title: '结束时间',
            align:"center",
            dataIndex: 'jssj'
           },

          {
            title: '员工工号',
            align:"center",
            dataIndex: 'sskhjl'
          },
		   {
            title: '客户经理名称',
            align:"center",
            dataIndex: 'sskhjl_dictText'
           },
		   {
            title: '走访户数',
            align:"center",
            dataIndex: 'zfhs'
           },
		   {
            title: '有效走访户数',
            align:"center",
            dataIndex: 'yxzfhs'
           },
		   {
            title: '评议户数',
            align:"center",
            dataIndex: 'pyhs'
           },
		   {
            title: '评议金额',
            align:"center",
            dataIndex: 'pyje'
           },
		   {
            title: '评级授信户数',
            align:"center",
            dataIndex: 'pjsxhs'
           },
		   {
            title: '预授信金额',
            align:"center",
            dataIndex: 'ysxje'
           },
		   {
            title: '贷款户数',
            align:"center",
            dataIndex: 'dkhs'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '贷款转化户数',
            align:"center",
            dataIndex: 'dkzhhs'
           },
		   {
            title: '贷款转化率',
            align:"center",
            dataIndex: 'dkzhl'
           },
		   {
            title: '存款户数',
            align:"center",
            dataIndex: 'ljhs'
           },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ljye'
           },
		   {
            title: '活期户数',
            align:"center",
            dataIndex: 'hqhs'
           },
		   {
            title: '活期余额',
            align:"center",
            dataIndex: 'hqye'
           },
		   {
            title: '定期户数',
            align:"center",
            dataIndex: 'dqhs'
           },
		   {
            title: '定期余额',
            align:"center",
            dataIndex: 'dqye'
           },
		   {
            title: '存款转化户数',
            align:"center",
            dataIndex: 'ckzhhs'
           },
		   {
            title: '存款转化率',
            align:"center",
            dataIndex: 'ckzhl'
           },
		   {
            title: '手机银行户数',
            align:"center",
            dataIndex: 'sjyhhs'
           },
		   {
            title: '手机银行转化户数',
            align:"center",
            dataIndex: 'sjyhzhhs'
           },
		   {
            title: '手机银行转化率',
            align:"center",
            dataIndex: 'sjyhzhl'
           },
		   {
            title: '网上银行户数',
            align:"center",
            dataIndex: 'wsyhhs'
           },
		   {
            title: '网上银行转化户数',
            align:"center",
            dataIndex: 'wsyhzhhs'
           },
		   {
            title: '网上银行转化率',
            align:"center",
            dataIndex: 'wsyhzhl'
           },
		   {
            title: 'ETC户数',
            align:"center",
            dataIndex: 'etchs'
           },
		   {
            title: 'ETC转化户数',
            align:"center",
            dataIndex: 'etzhhs'
           },
		   {
            title: 'ETC转化率',
            align:"center",
            dataIndex: 'etczhl'
           },
		   {
            title: '信用卡户数',
            align:"center",
            dataIndex: 'xykhs'
           },
		   {
            title: '信用卡转化户数',
            align:"center",
            dataIndex: 'xykzhhs'
           },
		   {
            title: '信用卡转化率',
            align:"center",
            dataIndex: 'xykzhl'
           },
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/khzhhz/khjlhz/list",
          init: "/khzhhz/khjlhz/extract",
          delete: "/khzhhz/khjlhz/delete",
          deleteBatch: "/khzhhz/khjlhz/deleteBatch",
          exportXlsUrl: "khzhhz/khjlhz/exportXls",
          importExcelUrl: "khzhhz/khjlhz/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      loadData (arg) {
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        if (!this.queryParam.kssj||!this.queryParam.jssj) {
          this.$message.error("请选择开始日期或结束日期!")
          return
        }

        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        console.info(params)
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
            this.loading = false
          } else {
            this.dataSource = []
            this.ipagination.total = 0
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
      },
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        let ksrqMoment=""
        let jsrqMoment=""
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        if (this.queryParam.kssj) {
          ksrqMoment=moment(this.queryParam.kssj).format("YYYY-MM-DD")
        }
        if (this.queryParam.jssj) {
          jsrqMoment=moment(this.queryParam.jssj).format("YYYY-MM-DD")
        }
        param.kssj=ksrqMoment
        param.jssj=jsrqMoment
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize

        return filterObj(param)
      },
      initData() {
        var params = this.queryParam;

        if (!params.kssj||!params.jssj) {
          this.$message.error("请选择开始日期或结束日期!")
          return
        }

        let ksrqstr=params.kssj.format("YYYYMMDD");
        let jsrqstr=params.jssj.format("YYYYMMDD");

        let par={"ksrq":ksrqstr,"jsrq":jsrqstr}
        this.loading = true;
        putAction(this.url.init, par).then((res) => {
          if(res.success){
            this.loadData()
            this.loading = false;
            this.$message.success(res.message);
          }else{
            this.loading = false;
            this.$message.warning(res.message,5);
          }
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>