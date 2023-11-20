<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;" :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标志">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             show-search :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <a-form-item label="客户类型">-->
<!--              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="khlx"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
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
      <a-button icon="download" @click="handleExportXls('个人走访（汇总）')" v-has="'ShGrzfHz:exp'">导出</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="br" slot-scope="brzfs,record">
          <a @click="zfs(record,'1')">{{brzfs}}</a>
        </span>
        <span slot="bz" slot-scope="bzzfs,record">
          <a @click="zfs(record,'2')">{{bzzfs}}</a>
        </span>
        <span slot="by" slot-scope="byzfs,record">
          <a @click="zfs(record,'3')">{{byzfs}}</a>
        </span>
        <span slot="bj" slot-scope="bjzfs,record">
          <a @click="zfs(record,'4')">{{bjzfs}}</a>
        </span>
        <span slot="bn" slot-scope="bnzfs,record">
          <a @click="zfs(record,'5')">{{bnzfs}}</a>
        </span>
        <span slot="lj" slot-scope="ljzfs,record">
          <a @click="zfs(record,'6')">{{ljzfs}}</a>
        </span>
        <span slot="bryx" slot-scope="bryxzfs,record">
          <a @click="zfs(record,'7')">{{bryxzfs}}</a>
        </span>
        <span slot="bzyx" slot-scope="bzyxzfs,record">
          <a @click="zfs(record,'8')">{{bzyxzfs}}</a>
        </span>
        <span slot="byyx" slot-scope="byyxzfs,record">
          <a @click="zfs(record,'9')">{{byyxzfs}}</a>
        </span>
        <span slot="bjyx" slot-scope="bjyxzfs,record">
          <a @click="zfs(record,'10')">{{bjyxzfs}}</a>
        </span>
        <span slot="bnyx" slot-scope="bnyxzfs,record">
          <a @click="zfs(record,'11')">{{bnyxzfs}}</a>
        </span>
        <span slot="ljyx" slot-scope="ljyxzfs,record">
          <a @click="zfs(record,'12')">{{ljyxzfs}}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <shzfmx-modal ref="shzfmxModal"/>
    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import moment from 'moment'
  import ShzfmxModal from '@views/tjfx/zfsjtj/zfyxtj/sh/gr/modules/ShzfmxModal'
  import store from '@/store/'

  export default {
    name: "KhjlZfsjtjList",
    mixins:[JeecgListMixin],
    components: {
      ShzfmxModal,
      JTreeSelect,
    },
    data () {
      return {
        description: '客户经理走访数据统计管理页面',
        khlx: '2',
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
            dataIndex: 'tjrq'
           },
		   {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
           },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
		   {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
		   // {
       //      title: '客户类型',
       //      align:"center",
       //      dataIndex: 'khlx_dictText'
       //     },
		   {
            title: '本日走访数',
            align:"center",
            dataIndex: 'brzfs',
            scopedSlots: { customRender: 'br' }
           },
		   {
            title: '本周走访数',
            align:"center",
            dataIndex: 'bzzfs',
            scopedSlots: { customRender: 'bz' }
           },
		   {
            title: '本月走访数',
            align:"center",
            dataIndex: 'byzfs',
         scopedSlots: { customRender: 'by' }
           },
		   {
            title: '本季走访数',
            align:"center",
            dataIndex: 'bjzfs',
         scopedSlots: { customRender: 'bj' }
           },
		   {
            title: '本年走访数',
            align:"center",
            dataIndex: 'bnzfs',
         scopedSlots: { customRender: 'bn' }
           },
		   {
            title: '累计走访数',
            align:"center",
            dataIndex: 'ljzfs',
         scopedSlots: { customRender: 'lj' }
           },
		   {
            title: '本日有效走访数',
            align:"center",
            dataIndex: 'bryxzfs',
         scopedSlots: { customRender: 'bryx' }
           },
		   {
            title: '本周有效走访数',
            align:"center",
            dataIndex: 'bzyxzfs',
         scopedSlots: { customRender: 'bzyx' }
           },
		   {
            title: '本月有效走访数',
            align:"center",
            dataIndex: 'byyxzfs',
         scopedSlots: { customRender: 'byyx' }
           },
		   {
            title: '本季有效走访数',
            align:"center",
            dataIndex: 'bjyxzfs',
         scopedSlots: { customRender: 'bjyx' }
           },
		   {
            title: '本年有效走访数',
            align:"center",
            dataIndex: 'bnyxzfs',
         scopedSlots: { customRender: 'bnyx' }
           },
		   {
            title: '累计有效走访数',
            align:"center",
            dataIndex: 'ljyxzfs',
         scopedSlots: { customRender: 'ljyx' }
           },
        ],
		url: {
          list: "/zfsjtj/khjlzfsjtj/list",
          delete: "/zfsjtj/khjlzfsjtj/delete",
          deleteBatch: "/zfsjtj/khjlzfsjtj/deleteBatch",
          exportXlsUrl: "/zfsjtj/khjlzfsjtj/exportXlsshhz",
          importExcelUrl: "/zfsjtj/khjlzfsjtj/importExcel",
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
      this.searchReset();
    },
    methods: {
      getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
      },
      zfs(record,lx){
        console.log("shzfmxModal")
        console.log(record)
        console.log(lx+"lx")
        this.$refs.shzfmxModal.init(record,lx,'GR',null,'1');
      },
      searchReset() {
        this.queryParam = {tjrq: undefined, zzbz: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjrq){
          tjyfMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        let lx = {khlx: this.khlx}
        console.log(tjyfMoment)
        var param      = Object.assign({},this.queryParam,this.isorter,lx);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq   = tjyfMoment;
        }
        return filterObj(param);
      },
      // loadData(arg) {
      //   if(!this.url.list){
      //     this.$message.error("请设置url.list属性!")
      //     return
      //   }
      //   //加载数据 若传入参数1则加载第一页的内容
      //   if (arg === 1) {
      //     this.ipagination.current = 1;
      //   }
      //   var params = this.getQueryParams();//查询条件
      //   if (params.tjrq) {
      //     params.tjrq = params.tjrq.format("YYYY-MM-DD");
      //   }
      //   console.info(params)
      //   let lx = {khlx: this.khlx}
      //   this.loading = true;
      //   getAction(this.url.list, params,lx).then((res) => {
      //     if (res.success) {
      //       this.dataSource = res.result.records;
      //       this.ipagination.total = res.result.total;
      //       this.loading = false;
      //     }else{
      //       this.dataSource =[];
      //       this.ipagination.total=0;
      //       this.loading = false;
      //     }
      //     if(res.code===510){
      //       this.$message.warning(res.message,5)
      //       this.loading = false;
      //     }
      //     this.loading = false;
      //   })
      // },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>