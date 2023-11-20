<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择机构查询" v-model="queryParam.jgdm"
                           dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM" pid-field="SJYWJGDM" treeNodeFilterProp="title"
                           :showSearch="show" :tree-default-expand-all="true"/>
          </a-form-item></a-col>

        <!--<template v-if="toggleSearchStatus"></template>-->
          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleExtract" icon="area-chart" v-has="'zhdkshtj:init'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('支行贷款收回统计')" v-has="'zhdkshtj:exportXls'">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a> 项-->
<!--        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>-->
<!--        &lt;!&ndash;<span style="float: right;">-->
<!--          <a @click="loadData"><a-icon type="sync"/>刷新</a>-->
<!--          <a-divider type="vertical"/>-->
<!--        </span>&ndash;&gt;-->
<!--      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 1500, y: 300 }"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zhdkshtj-modal ref="modalForm" @ok="modalFormOk"></zhdkshtj-modal>
  </a-card>
</template>

<script>
  import ZhdkshtjModal from './modules/ZhdkshtjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from "@/components/jeecg/JEllipsis"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction ,putAction} from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'

  export default {
    name: "ZhdkshtjList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      ZhdkshtjModal,
      JEllipsis
    },
    data () {
      return {
        description: '支行贷款收回统计管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        show: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
            width: 100,
          },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '收回本金',
            align:"center",
            dataIndex: 'shbj',
            width: 150
          },
          {
            title: '收回本金笔数',
            align:"center",
            dataIndex: 'shbjbs',
            width: 150
          },
          {
            title: '收回本金户数',
            align:"center",
            dataIndex: 'shbjhs',
            width: 150
          },
          {
            title: '收回利息',
            align:"center",
            dataIndex: 'shlx',
            width: 150
          },
          {
            title: '收回利息笔数',
            align:"center",
            dataIndex: 'shlxbs',
            width: 150
          },
          {
            title: '收回利息户数',
            align:"center",
            dataIndex: 'shlxhs',
            width: 150
          },
		      {
            title: '收回罚息',
            align:"center",
            dataIndex: 'shfx',
            width: 150
          },
		      {
            title: '收回罚息笔数',
            align:"center",
            dataIndex: 'shfxbs',
            width: 150
          },
		      {
            title: '收回罚息户数',
            align:"center",
            dataIndex: 'shfxhs',
            width: 150
          },
        ],
		    url: {
          init: "/zhdkshtj/zhdkshtj/init",
          list: "/zhdkshtj/zhdkshtj/list",
          delete: "/zhdkshtj/zhdkshtj/delete",
          deleteBatch: "/zhdkshtj/zhdkshtj/deleteBatch",
          exportXlsUrl: "zhdkshtj/zhdkshtj/exportXls",
          importExcelUrl: "zhdkshtj/zhdkshtj/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curDate);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf=='undefined' || params.tjyf==null) && this.flag==true) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        let tjyfMoment = "";
        console.log(this.queryParam.tjyf)
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        //时间参数不传递后台
        //delete param.tjyf;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
      handleExtract() {
        //var params = this.getQueryParams();
        var params = this.queryParam;
        let tjyfMoment = ''
        if (this.queryParam.tjyf==null || this.queryParam.tjyf==undefined) {
          tjyfMoment = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        } else {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM") +'-01';
        }
        this.loading = true;
        putAction(this.url.init, { tjyf: tjyfMoment }).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message);
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
        // putAction(this.url.init, 'TJYF='+tjyfstr).then((res) => {
        //   if(res.success){
        //     this.loadData()
        //     this.$message.success(res.message);
        //   }else{
        //     this.$message.warning(res.message,5);
        //   }
        //   this.loading = false;
        // })
      },
      // onChange(date, dateString) {
      //   console.log(date, dateString);
      //   this.queryParam.tjyf=dateString+'-01';
      // }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>