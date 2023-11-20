<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" >
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
         <!-- <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="khlx"/>
              </a-form-item>
            </a-col>
          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="loadData" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
             <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
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
      <a-button icon="download" @click="handleExportXls('商户支行走访(日报)列表')" v-has="'shZhzfRb:exp'">导出</a-button>
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
<!--    <khjlZfyxtj-modal ref="modalForm" @ok="modalFormOk"></khjlZfyxtj-modal>-->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { downFile, getAction } from '@api/manage'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'
  import store from '@/store/'
  import ShzfmxModal from '@views/tjfx/zfsjtj/zfyxtj/sh/gr/modules/ShzfmxModal'

  export default {
    name: "ZhzfRbList",
    mixins:[JeecgListMixin],
    components:{
      JTreeSelect, ShzfmxModal
    },
    props: {
      hzfs: {
        type: String,
      }
    },
    data () {
      return {
        description: '商户支行走访营销统计管理页面',
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 表头
        khlx:'2',
        tjwd:'DD',
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
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
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
          list: "/zhzftj/zhzftj/listRb",
          exportXlsUrl: "/zhzftj/zhzftj/exportXlssh",
        },
      }
    },
    created() {
      this.getCurrentMonth()
      this.searchReset();
    },
    watch: {
      hzfs(val) {
        console.log('watch hzfs', val)
        if(val == '1') {
          this.url = {
            list: "/zhzftj/zhzftj/listRb",
            exportXlsUrl: "/zhzftj/zhzftj/exportXlssh",
          }
        } else if (val == '2') {
          this.url = {
            list: "/zftjhz/zhkhjlzftjhz/list",
            exportXlsUrl: "/zftjhz/zhkhjlzftjhz/exportXlszhzf",
          }
        }
        this.searchReset()
      }
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

      loadData(arg) {
        console.log(arg,"arg")
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          }else{
            this.dataSource =[];
            this.ipagination.total=0;
            this.loading = false;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },
      getQueryParams() {
        //获取查询条件
        let para ={ khlx : this.khlx,tjwd:this.tjwd}
        let tjyfMoment = "";
        if (this.queryParam.tjrq){
          tjyfMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        var param = Object.assign({}, this.queryParam, this.isorter ,this.filters,para);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq   = tjyfMoment;
        }
        return filterObj(param);
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = {...this.queryParam,khlx:this.khlx,tjwd:this.tjwd};
        if (this.queryParam.tjrq === undefined || this.queryParam.tjrq === "") {
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM-DD")
        }else {
          tjyf = moment(param.tjrq).format("YYYY-MM-DD")
        }
        param.tjrq=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey']=this.rowKey
        }
          let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
          param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading=true
        downFile(this.url.exportXlsUrl,param).then((data)=>{
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
          this.loadData(1)
        })
      },
      zfs(record,lx){
        console.log("shzfmxModal")
        console.log(record)
        console.log(lx+"lx")
        this.$refs.shzfmxModal.init(record,lx,'ZH',this.hzfs,'2');
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>