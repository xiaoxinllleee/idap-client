<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;":defaultValue="defaultMonthOpera"
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
      <a-button icon="download" @click="handleExportXls('个人走访（累计）')" v-has="'GrzfLj:exp'">导出</a-button>
      <a-button icon="download" @click="handleExportMxXls('个人走访（累计明细）')">导出明细</a-button>
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
        @change="handleTableChange">
        <span slot="bmdZfhs" slot-scope="bmdZfhs,record">
          <a @click="zfs(record,'6','1')">{{bmdZfhs}}</a>
        </span>
        <span slot="sxwyxZfhs" slot-scope="sxwyxZfhs,record">
          <a @click="zfs(record,'6','2')">{{sxwyxZfhs}}</a>
        </span>
        <span slot="sxyyxZfhs" slot-scope="sxyyxZfhs,record">
          <a @click="zfs(record,'6','3')">{{sxyyxZfhs}}</a>
        </span>
        <span slot="bysxZfhs" slot-scope="bysxZfhs,record">
          <a @click="zfs(record,'6','4')">{{bysxZfhs}}</a>
        </span>
        <span slot="zfhs" slot-scope="zfhs,record">
          <a @click="zfs(record,'6')">{{zfhs}}</a>
        </span>
        <span slot="bmdYxzfhs" slot-scope="bmdYxzfhs,record">
          <a @click="zfs(record,'12','1')">{{bmdYxzfhs}}</a>
        </span>
        <span slot="sxwyxYxzfhs" slot-scope="sxwyxYxzfhs,record">
          <a @click="zfs(record,'12','2')">{{sxwyxYxzfhs}}</a>
        </span>
        <span slot="sxyyxYxzfhs" slot-scope="sxyyxYxzfhs,record">
          <a @click="zfs(record,'12','3')">{{sxyyxYxzfhs}}</a>
        </span>
        <span slot="bysxYxzfhs" slot-scope="bysxYxzfhs,record">
          <a @click="zfs(record,'12','4')">{{bysxYxzfhs}}</a>
        </span>
        <span slot="yxzfhs" slot-scope="yxzfhs,record">
          <a @click="zfs(record,'12')">{{yxzfhs}}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <nhzfmx-modal ref="nhzfmxModal"/>
    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import moment from 'moment'
  import {downFile} from "@/api/manage";
  import store from '@/store/'
  import NhzfmxModal from '@views/tjfx/zfsjtj/zfyxtj/nh/gr/modules/NhzfmxModal'

  export default {
    name: "KhjlZfyxtjRbList",
    mixins:[JeecgListMixin],
    components:{
      JTreeSelect, NhzfmxModal
    },
    data () {
      return {
        description: '客户经理走访营销统计管理页面',
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: undefined,
        khlx:'1',
        tjwd:'T',
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
            title: '统计日期',
            align:"center",
            width: 100,
            dataIndex: 'tjrq'
          },

          {
            title: '员工工号',
            align:"center",
            width: 80,
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align:"center",
            width: 80,
            dataIndex: 'yggh_dictText'
          },
          {
            title: '岗位标志',
            align:"center",
            width: 80,
            dataIndex: 'gwbz_dictText'
          },

          {
            title:'涉及走访',
            children:[
              {
                title: '新客户白名单',
                align:"center",
                width: 60,
                dataIndex: 'bmdZfhs',
                scopedSlots: { customRender: 'bmdZfhs' }
              },
              {
                title:'老客户',
                children:[
                  {
                    title: '授信未用信',
                    align:"center",
                    dataIndex: 'sxwyxZfhs',
                    scopedSlots: { customRender: 'sxwyxZfhs' }
                  },
                  {
                    title: '授信已用信',
                    align:"center",
                    dataIndex: 'sxyyxZfhs',
                    scopedSlots: { customRender: 'sxyyxZfhs' }
                  }
                ]
              },
              {
                title: '不予授信',
                align:"center",
                dataIndex: 'bysxZfhs',
                scopedSlots: { customRender: 'bysxZfhs' }
              },
              {
                title: '走访合计',
                align:"center",
                dataIndex: 'zfhs',
                scopedSlots: { customRender: 'zfhs' }
              },
            ]
          },
          {
            title:'有效走访',
            children:[
              {
                title: '新客户白名单',
                align:"center",
                width: 60,
                dataIndex: 'bmdYxzfhs',
                scopedSlots: { customRender: 'bmdYxzfhs' }
              },
              {
                title:'老客户',
                children:[
                  {
                    title: '授信未用信',
                    align:"center",
                    dataIndex: 'sxwyxYxzfhs',
                    scopedSlots: { customRender: 'sxwyxYxzfhs' }
                  },
                  {
                    title: '授信已用信',
                    align:"center",
                    dataIndex: 'sxyyxYxzfhs',
                    scopedSlots: { customRender: 'sxyyxYxzfhs' }
                  }
                ]
              },
              {
                title: '不予授信',
                align:"center",
                dataIndex: 'bysxYxzfhs',
                scopedSlots: { customRender: 'bysxYxzfhs' }
              },
              {
                title: '有效走访合计',
                children:[
                  {
                    title: '有效户数',
                    align:"center",
                    dataIndex: 'yxzfhs',
                    scopedSlots: { customRender: 'yxzfhs' }
                  },
                  {
                    title: '有效户数排名',
                    align:"center",
                    width: 75,
                    dataIndex: 'yxzfpm'
                  },
                ]
              },
            ]
          }
        ],
        url: {
          list: "/khjlzfyxtj/khjlZfyxtj/list",
          delete: "/khjlzfyxtj/khjlZfyxtj/delete",
          deleteBatch: "/khjlzfyxtj/khjlZfyxtj/deleteBatch",
          exportXlsUrl: "khjlzfyxtj/khjlZfyxtj/exportXlsnhlj",
          importExcelUrl: "khjlzfyxtj/khjlZfyxtj/importExcel",
          exportMxXlsUrl: "/zfsjmx/zfsjmx/exportZfsjmxQlXls",

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
      zfs(record,lx,sxlx){
        console.log("nhzfmxModal")
        console.log(record)
        console.log(lx+"lx")
        this.$refs.nhzfmxModal.init(record,lx,'GR',sxlx,null,'2');
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
        let params = this.getQueryParams()
        delete params.lx;
        delete params.khlx;
        delete params.tjwd;
        delete params.field;
        delete params.pageNo;
        delete params.pageSize;
        if(!this.queryParam.tjrq){
          this.$message.warning("请选择统计日期");
          return;
        }
        let  tjyfMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        params.tjrq =tjyfMoment
        if(this.queryParam.zzbz){
          params.zzbz = this.queryParam.zzbz
        }
        params.lx = 6
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