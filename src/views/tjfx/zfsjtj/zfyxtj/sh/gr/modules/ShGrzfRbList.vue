<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;" :defaultValue="defaultMonthOpera"
                             :format="monthFormat"/>
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
<!--            <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--              <a-form-item label="客户类型">-->
<!--                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="khlx"/>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
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
      <a-button icon="download" @click="handleExportXls('个人走访（日报）')" v-has="'ShGrzfRb:exp'">导出</a-button>
      <a-button icon="download" @click="handleExportMxXls('个人走访（日报明细）')" v-has="'ShGrzf:expMx'">导出明细</a-button>
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
        <span slot="zfhs" slot-scope="zfhs,record">
          <a @click="zfs(record,'1')">{{zfhs}}</a>
        </span>
        <span slot="yxzfhs" slot-scope="yxzfhs,record">
          <a @click="zfs(record,'7')">{{yxzfhs}}</a>
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
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import store from '@/store/'
  import ShzfmxModal from '@views/tjfx/zfsjtj/zfyxtj/sh/gr/modules/ShzfmxModal'
  import {downFile} from "@/api/manage";

  export default {
    name: "KhjlZfyxtjRbList",
    mixins:[JeecgListMixin],
    components:{
      JTreeSelect, ShzfmxModal
    },
    data () {
      return {
        description: '客户经理走访营销统计管理页面',
        khlx:'2',
        tjwd:'DD',
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
            title: '岗位标志',
            align:"center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '走访户数',
            align:"center",
            dataIndex: 'zfhs',
            scopedSlots: { customRender: 'zfhs' }
          },

          {
            title: '有效户数',
            align:"center",
            dataIndex: 'yxzfhs',
            scopedSlots: { customRender: 'yxzfhs' }
          },
          {
            title: '有效户数比昨日',
            align:"center",
            dataIndex: 'yxzfhsBsq'
          },
          {
            title: '有效走访排名',
            align:"center",
            dataIndex: 'yxzfpm'
          }
        ],
        url: {
          list: "/khjlzfyxtj/khjlZfyxtj/list",
          delete: "/khjlzfyxtj/khjlZfyxtj/delete",
          deleteBatch: "/khjlzfyxtj/khjlZfyxtj/deleteBatch",
          exportXlsUrl: "khjlzfyxtj/khjlZfyxtj/exportXlsshrb",
          importExcelUrl: "khjlzfyxtj/khjlZfyxtj/importExcel",
          exportMxXlsUrl: "/shzfsjmx/shzfsjmx/exportZfsjmxQlXls",
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
      this.searchReset()
    },
    methods: {
      getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
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
        let lx = {khlx: this.khlx,tjwd: this.tjwd}
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
      zfs(record,lx){
        this.$refs.shzfmxModal.init(record,lx,'GR',null,'2');
      },
      handleExportMxXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let params = this.initMxParams()
        if(!params){
          return;
        }
        console.log("导出参数",params)
        this.exportLoading = true
        downFile(this.url.exportMxXlsUrl, params).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(()=>{
          this.exportLoading = false
        })
      },
      initMxParams() {
        let params = Object.assign({},this.queryParam,this.isorter);
        if(!this.queryParam.tjrq){
          this.$message.warning("请选择统计日期");
          return;
        }
        let  tjyfMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        params.tjrq =tjyfMoment
        params.lx = 1
        params.hzfs = 1
        params.sjlx = 2
        return params
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>