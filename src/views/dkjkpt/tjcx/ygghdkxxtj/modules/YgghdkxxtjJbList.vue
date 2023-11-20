<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <!--  <a-form-item label="统计日期">
              <a-input placeholder="请输入统计日期" v-model="queryParam.tjrq"></a-input>
            </a-form-item>-->
            <a-form-item label="统计季度">
              <a-select placeholder="所属年份" v-model="ssnf" :defaultValue="defaultYear" @change="selectValue" style="width: 80px;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="统计季度" v-model="tjjd" @change="selectValue" style="width: 148px;">
                <a-select-option value="">请选择统计季度</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工姓名">
              <j-dict-select-tag placeholder="请输入员工姓名" v-model="queryParam.yggh" dict-code="Hr_bas_staff,ygxm,yggh" :show-search="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理编号">
              <a-input placeholder="请输入客户经理编号" v-model="queryParam.khjlbh"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('员工管户贷款信息统计季报')">导出</a-button>
      <a-button icon="area-chart" @click="initData">提取</a-button>
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
  import { filterObj } from '@/utils/util'
  import moment from 'moment'
  import { putAction } from '@api/manage'

  export default {
    name: "YgghdkxxtjJbList",
    mixins:[JeecgListMixin],
    components: {
    },

    data () {
      return {
        description: '员工管户贷款信息统计季报管理页面',
        defaultYear: '',
        ssnf: '',
        tjjd: '',
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '统计季度',
            align:"center",
            dataIndex: 'tjrq',
         customRender: function (text) {
           return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
         },
         sorter: (a, b) => b.tjrq.replace(/-/g, '/') - a.tjrq.replace(/-/g, '/'),
         width: 100
           },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
		   {
            title: '客户经理编号',
            align:"center",
            dataIndex: 'khjlbh'
           },
		   {
            title: '客户净增数',
            align:"center",
            dataIndex: 'khxzs'
           },
          {
            title: '贷款总额(元)',
            align:"center",
            dataIndex: 'dkje'
          },
          {
            title: '贷款余额(元)',
            align:"center",
            dataIndex: 'dkye'
          },
          {
            title: '贷款总用户',
            align:"center",
            dataIndex: 'dkzyh'
          },
          {
            title: '贷款净增余额(元)',
            align:"center",
            dataIndex: 'dkjzye'
          },
          {
            title: '正常类贷款余额(元)',
            align:"center",
            dataIndex: 'zcldkye'
          },
          {
            title: '正常类贷款户数',
            align:"center",
            dataIndex: 'zcldkhs'
          },
          {
            title: '正常贷款占比(%)',
            align:"center",
            dataIndex: 'zcldkzb'
          },
          {
            title: '关注类贷款余额(元)',
            align:"center",
            dataIndex: 'gzldkye'
          },
          {
            title: '关注类贷款户数',
            align:"center",
            dataIndex: 'gzldkhs'
          },
          {
            title: '关注贷款占比(%)',
            align:"center",
            dataIndex: 'gzdkzb'
          },
          {
            title: '不良贷款余额(元)',
            align:"center",
            dataIndex: 'bldkye'
          },
          {
            title: '不良贷款户数',
            align:"center",
            dataIndex: 'bldkhs'
          },
          {
            title: '不良贷款占比(%)',
            align:"center",
            dataIndex: 'bldkzb'
          },
          {
            title: '到期贷款余额(元)',
            align:"center",
            dataIndex: 'dqdkye'
          },
          {
            title: '当期贷款到期收回率',
            align:"center",
            dataIndex: 'dqdkdqshl'
          },
          {
            title: '不良率(%)',
            align:"center",
            dataIndex: 'bll'
          },
          {
            title: '贷款利息收回额(元)',
            align:"center",
            dataIndex: 'dklxshe'
          },
          {
            title: '利息收回率',
            align:"center",
            dataIndex: 'lxshl'
          },
          {
            title: '贷款客户存款日平额',
            align:"center",
            dataIndex: 'dkkhckrpe'
          },
          {
            title: '贷款客户贷款日平额',
            align:"center",
            dataIndex: 'dkkhdkrpe'
          },
          {
            title: '资金归行率',
            align:"center",
            dataIndex: 'zjghl'
          },
		  /* {
            title: '存量贷款总额',
            align:"center",
            dataIndex: 'cldkze'
           },
		   {
            title: '存量贷款户数',
            align:"center",
            dataIndex: 'cldkhs'
           },
		   {
            title: '存量贷款余额',
            align:"center",
            dataIndex: 'cldkye'
           },*/
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
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
          list: "/ygghdkxxtj/ygghdkxxtjJb/list",
          delete: "/ygghdkxxtj/ygghdkxxtjJb/delete",
          deleteBatch: "/ygghdkxxtj/ygghdkxxtjJb/deleteBatch",
          exportXlsUrl: "ygghdkxxtj/ygghdkxxtjJb/exportXls",
          importExcelUrl: "ygghdkxxtj/ygghdkxxtjJb/importExcel",
          init: "ygghdkxxtj/ygghdkxxtjJb/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.init()
    },
    methods: {
      /** 获取当前年份 */
      init() {
        let date = new Date
        let year = date.getFullYear()
        this.initYear(year)
        this.ssnf = year
        this.tjjd = this.dqjd()
      },
      dqjd() {
        let today = new Date(); //获取当前时间
        let month = today.getMonth() + 1;//getMonth返回0-11
        if(month >=1 && month <=3){
          return '01'
        }else if(month >=4 && month <=6){
          return '04'
        }else if(month >=7 && month <=9){
          return '07'
        }else{
          return  '10'
        }
      },
      /** 初始化年份下拉框 */
      initYear(year) {
        this.years = []
        for(let i=0; i<30; i++) {
          this.years.push({ value:((year-i)+''),label:((year-i)+'') });
        }
      },
      /** 下拉选择 */
      selectValue(value,date) {
        console.log('selectValue(value) => '+value,date)
        let val = value
        this.$emit('change', val)
      },
      /** queryParam格式化 */
      getQueryParams() {
        let tjMoment=""
        if (this.ssnf !== ''  && this.tjjd !== '') {
          let day = new Date(this.ssnf, this.tjjd, 0)
          let dayCount = day.getDate()
          tjMoment = this.ssnf + '-' + this.tjjd + '-01'
        }
        var param = Object.assign({}, this.queryParam)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize=this.ipagination.pageSize
        param.tjrq = tjMoment
        return filterObj(param)
      },
      /** 重置查询条件 */
      searchReset() {
        this.queryParam = {}
        // 重置时清除季度所属年份
        this.ssnf = new Date().getFullYear()
        // 重置时清除评定年份
        this.tjjd = this.dqjd()
        this.loadData(1)
      },
      initData () {
        let tjMoment=""
        if (this.ssnf != null || this.tjjd != null) {
          let day = new Date(this.ssnf, this.tjjd, 0)
          let dayCount = day.getDate()
          tjMoment = this.ssnf + '-' + this.tjjd + '-01'
        }
        //let tjrq = moment(tjMoment).format('YYYY-MM-DD')
        var params = this.queryParam
        params.tjrq = tjMoment
        console.log(params.tjrq)
        if (params.tjrq == null || params.tjrq == 'undefined') {
          this.$message.error('统计日期不能为空!')
          return
        }
        let tjrq = moment(params.tjrq).format('YYYY-MM-DD')
        this.loading = true
        putAction(this.url.init, { 'tjrq': tjrq }).then((res) => {
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