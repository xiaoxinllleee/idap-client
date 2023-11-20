<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计年份">
              <a-select placeholder="请选择统计年份" v-model="queryParam.tjnf" :defaultValue="dateValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('员工管户贷款信息统计年报')">导出</a-button>
      <a-button icon="area-chart" @click="initData">提取</a-button>
     <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
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
         <!-- <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
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
  import { putAction } from '@api/manage'

  export default {
    name: "YgghdkxxtjNbList",
    mixins:[JeecgListMixin],
    components: {
    },
    data () {
      return {
        description: '员工管户贷款信息统计年报管理页面',
        dateValue: '',
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
            title: '统计年份',
            align:"center",
            dataIndex: 'tjnf',
         customRender: function (text) {
           return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
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
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
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
            title: '关注贷款占比',
            align:"center",
            dataIndex: 'gzdkzb'
          },
          {
            title: '不良贷款余额',
            align:"center",
            dataIndex: 'bldkye'
          },
          {
            title: '不良贷款户数',
            align:"center",
            dataIndex: 'bldkhs'
          },
          {
            title: '不良贷款占比',
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
            title: '不良率',
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
		   /*{
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
        ],
		url: {
          list: "/ygghdkxxtj/ygghdkxxtjNb/list",
          delete: "/ygghdkxxtj/ygghdkxxtjNb/delete",
          deleteBatch: "/ygghdkxxtj/ygghdkxxtjNb/deleteBatch",
          exportXlsUrl: "ygghdkxxtj/ygghdkxxtjNb/exportXls",
          importExcelUrl: "ygghdkxxtj/ygghdkxxtjNb/importExcel",
          init: "ygghdkxxtj/ygghdkxxtjNb/init",
       },
    }
  },
    created() {
      this.init();
    },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      searchReset() {
        this.queryParam = {tjnf: undefined};
        this.queryParam.tjnf = new Date().getFullYear();
        this.loadData(1);
      },
      // 获取当前年份
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
        this.queryParam = {tjnf: undefined};
        this.queryParam.tjnf = year;
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },

      getQueryParams() {
        console.log("getQueryParams => @@@@@@@@@@@@")
        let tjnf = this.queryParam.tjnf
        let tjnfMoment = "";
        if (tjnf!=null && tjnf!='undefined'){
          tjnfMoment = tjnf + '-01-01'
        }
        console.log(tjnfMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.tjnf=tjnfMoment;
        return filterObj(param);
      },
      initData () {
        let tjnf = this.queryParam.tjnf
        let tjnfMoment = "";
        if (tjnf!=null && tjnf!='undefined'){
          tjnfMoment = tjnf + '-01-01'
        }
        console.log(tjnfMoment)
        if (tjnfMoment == null || tjnfMoment == 'undefined') {
          this.$message.error('统计日期不能为空!')
          return
        }
        tjnf = tjnfMoment
        console.log(tjnf)
        this.loading = true
        putAction(this.url.init, { 'tjnf': tjnf }).then((res) => {
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