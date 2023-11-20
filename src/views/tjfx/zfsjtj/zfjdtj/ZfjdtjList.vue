<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="统计年份">
            <a-select placeholder="请选择统计年份" v-model="queryParam.tjrq" :defaultValue="dateValue">
              <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('走访进度统计')" v-has="'Zfjdtj:exp'">导出</a-button>
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
        @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'
  import { filterObj } from '@/utils/util'
  export default {
    name: "ZfjdtjList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '走访进度统计页面',
        dateValue: '',

        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width: 40,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '统计年份',
            align:"center",
            dataIndex: 'tjrq',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
            },
            sorter: (a, b) => b.tjrq.replace(/-/g, '/') - a.tjrq.replace(/-/g, '/'),
            width: 100
          },

          {
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText',
            width: 120
          },
          {
            title: '前年累计户数',
            align:"center",
            dataIndex: 'qnljhs'
          },
          {
            title: '去年累计户数',
            align:"center",
            dataIndex: 'snljhs',
          },
          {
            title: '较年初',
            align:"center",
            dataIndex: 'yxzfhs',
          },
          {
            title: '当前累计户数',
            align:"center",
            dataIndex: 'dqljhs',
          },
          {
            title: '当年任务',
            align:"center",
            dataIndex: 'rw',
          },
          {
            title: '完成率(%)',
            align:"center",
            dataIndex: 'wcl',
          },
        ],
        url: {
          list: "/zfsjtj/nhzfjdtj/list",
          exportXlsUrl: "/zfsjtj/nhzfjdtj/exportXls",
        },
      }
    },
    created() {
      this.init()
    },
    methods: {
      searchReset() {
        this.queryParam = {zzbz: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.orgCode
        }
        this.loadData(1);
      },
      // 获取当前年份
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq = year;
      },
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },
      getQueryParams() {
        //获取查询条件
        let sqp = {}
        let tjrq = this.queryParam.tjrq
        let tjyfMoment = "";
        if (tjrq!=null && tjrq!=undefined){
          tjyfMoment = tjrq + '-01-01'
        }
        if(this.superQueryParams){
          sqp['superQueryParams']=encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjrq=tjyfMoment;
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>