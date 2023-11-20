<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="第一责任人">
              <a-input placeholder="请输入第一责任人" v-model="queryParam.custCn"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户经理贷款信息统计月报')">导出</a-button>
      <a-button icon="area-chart"
                @click="initData">提取
      </a-button>
      <!--v-has="'xjlghjcajfp:init'"-->
      <!--  <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
        </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
    <!--  <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
        :scroll="{ x: 5000 }"
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
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { putAction } from '@api/manage'
import moment from 'moment'
import { filterObj } from '@/utils/util'
import store from '@views/tjfx/zfsjtj/sxyxtj/nh/zh/modules/ZhsxyxYbList'

export default {
  name: 'KhjldkxxtjYbList',
  mixins: [JeecgListMixin],
  components: {},
  data () {
    return {
      description: '客户经理贷款信息统计月报管理页面',
      defaultMonthOpera:undefined,
      monthFormat: 'YYYY-MM',
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },

        {
          title: '统计月份',
          align: 'center',
          dataIndex: 'tjyf',
          customRender: function (text) {
            return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
          },
          sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
          width: 100
        },
        {
          title: '第一责任人',
          align: 'center',
          dataIndex: 'custCn'
        },
        {
          title: '客户新增数',
          align: 'center',
          dataIndex: 'khxzs'
        },
        {
          title: '存量贷款总额',
          align: 'center',
          dataIndex: 'cldkze'
        },
        {
          title: '贷款总余额',
          align: 'center',
          dataIndex: 'zye'
        },
        {
          title: '贷款总金额',
          align: 'center',
          dataIndex: 'zje'
        },
        {
          title: '贷款总用户',
          align: 'center',
          dataIndex: 'dkzyh'
        },
        {
          title: '贷款净增余额(元)',
          align: 'center',
          dataIndex: 'dkjzye'
        },
        {
          title: '存量贷款户数',
          align: 'center',
          dataIndex: 'cldkhs'
        },
        {
          title: '存量贷款余额',
          align: 'center',
          dataIndex: 'cldkye'
        },
        {
          title: '正常类贷款余额(元)',
          align: 'center',
          dataIndex: 'zcldkye'
        },
        {
          title: '正常类贷款户数',
          align: 'center',
          dataIndex: 'zcldkhs'
        },
        {
          title: '正常贷款占比(%)',
          align: 'center',
          dataIndex: 'zcldkzb'
        },
        {
          title: '关注类贷款余额',
          align: 'center',
          dataIndex: 'gzldkye'
        },
        {
          title: '关注类贷款户数',
          align: 'center',
          dataIndex: 'gzldkhs'
        },
        {
          title: '关注贷款占比',
          align: 'center',
          dataIndex: 'gzdkzb'
        },
        {
          title: '不良贷款余额',
          align: 'center',
          dataIndex: 'bldkye'
        },
        {
          title: '不良贷款户数',
          align: 'center',
          dataIndex: 'bldkhs'
        },
        {
          title: '不良贷款占比',
          align: 'center',
          dataIndex: 'bldkzb'
        },
        {
          title: '到期贷款余额',
          align: 'center',
          dataIndex: 'dqdkye'
        },
        {
          title: '当期贷款到期收回率',
          align: 'center',
          dataIndex: 'dqdkdqshl'
        },

        {
          title: '不良率',
          align: 'center',
          dataIndex: 'bll'
        },
        {
          title: '贷款利息收回额',
          align: 'center',
          dataIndex: 'dklxshe'
        },
        {
          title: '利息收回率',
          align: 'center',
          dataIndex: 'lxshl'
        },
        {
          title: '贷款客户存款日平额',
          align: 'center',
          dataIndex: 'dkkhckrpe'
        },
        {
          title: '贷款客户贷款日平额',
          align: 'center',
          dataIndex: 'dkkhdkrpe'
        },
        {
          title: '资金归行率',
          align: 'center',
          dataIndex: 'zjghl'
        },

        {
          title: '录入标识',
          align: 'center',
          dataIndex: 'lrbz_dictText'
        },
        {
          title: '录入人',
          align: 'center',
          dataIndex: 'lrr'
        },
        {
          title: '录入时间',
          align: 'center',
          dataIndex: 'lrsj'
        }

        /*{
          title: '操作',
          dataIndex: 'action',
          align:"center",
          scopedSlots: { customRender: 'action' },
          fixed: "right",
          width: 120
        }*/
      ],
      url: {
        list: '/khjldkxxtj/khjldkxxtjyb/list',
        delete: '/khjldkxxtj/khjldkxxtjyb/delete',
        deleteBatch: '/khjldkxxtj/khjldkxxtjyb/deleteBatch',
        exportXlsUrl: 'khjldkxxtj/khjldkxxtjyb/exportXls',
        importExcelUrl: 'khjldkxxtj/khjldkxxtjyb/importExcel',
        init: '/khjldkxxtj/khjldkxxtjyb/init'
      }
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.getCurrentMonth()
  },
  methods: {
    moment,
    getCurrentMonth() {
      let curDate = new Date();
      this.defaultMonthOpera = moment(curDate, this.monthFormat);
      this.queryParam = {tjyf: undefined};
      this.queryParam.tjyf=this.defaultMonthOpera;
    },
    searchReset() {
      this.queryParam = {tjyf: undefined};
      this.queryParam.tjyf=this.defaultMonthOpera;
      this.loadData(1);
    },
    getQueryParams () {
      //获取查询条件
      let tjyfMoment = "";
      if (this.queryParam.tjyf) {
        tjyfMoment=moment(this.queryParam.tjyf).format("YYYY-MM")+'-01'
      }
      console.log(tjyfMoment)
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.tjyf=tjyfMoment;
      return filterObj(param)
    },

    initData () {
      var params = this.queryParam
      if (params.tjyf == null || params.tjyf == 'undefined') {
        this.$message.error('统计日期不能为空!')
        return
      }
      let tjyf = params.tjyf.format('YYYY-MM') + '-01'
      this.loading = true
      putAction(this.url.init, { 'tjyf': tjyf }).then((res) => {
        if (res.success) {
          this.$message.success('提取成功！')
          this.loadData(1)
        } else {
          this.$message.warning('提取失败!')
        }
        this.loading = false

      })
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>