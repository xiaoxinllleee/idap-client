<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" >
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="统计月份">
            <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjrq" :defaultValue="defaultMonthOpera"
                            :format="monthFormat" style="width: 100%;"/>
          </a-form-item></a-col>
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
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
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
      <a-button icon="download" @click="handleExportXls('农户支行走访(月报)列表')" v-has="'ZhzfYb:exp'">导出</a-button>
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
          <a @click="zfs(record,'3','1')">{{bmdZfhs}}</a>
        </span>
        <span slot="sxwyxZfhs" slot-scope="sxwyxZfhs,record">
          <a @click="zfs(record,'3','2')">{{sxwyxZfhs}}</a>
        </span>
        <span slot="sxyyxZfhs" slot-scope="sxyyxZfhs,record">
          <a @click="zfs(record,'3','3')">{{sxyyxZfhs}}</a>
        </span>
        <span slot="bysxZfhs" slot-scope="bysxZfhs,record">
          <a @click="zfs(record,'3','4')">{{bysxZfhs}}</a>
        </span>
        <span slot="zfhs" slot-scope="zfhs,record">
          <a @click="zfs(record,'3')">{{zfhs}}</a>
        </span>
        <span slot="bmdYxzfhs" slot-scope="bmdYxzfhs,record">
          <a @click="zfs(record,'9','1')">{{bmdYxzfhs}}</a>
        </span>
        <span slot="sxwyxYxzfhs" slot-scope="sxwyxYxzfhs,record">
          <a @click="zfs(record,'9','2')">{{sxwyxYxzfhs}}</a>
        </span>
        <span slot="sxyyxYxzfhs" slot-scope="sxyyxYxzfhs,record">
          <a @click="zfs(record,'9','3')">{{sxyyxYxzfhs}}</a>
        </span>
        <span slot="bysxYxzfhs" slot-scope="bysxYxzfhs,record">
          <a @click="zfs(record,'9','4')">{{bysxYxzfhs}}</a>
        </span>
        <span slot="yxzfhs" slot-scope="yxzfhs,record">
          <a @click="zfs(record,'9')">{{yxzfhs}}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <nhzfmx-modal ref="nhzfmxModal"/>
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
  import NhzfmxModal from '@views/tjfx/zfsjtj/zfyxtj/nh/gr/modules/NhzfmxModal'

  export default {
    name: "ZhzfYbList",
    mixins:[JeecgListMixin],
    components:{
      JTreeSelect, NhzfmxModal
    },
    props: {
      hzfs: {
        type: String,
      }
    },
    data () {
      return {
        description: '农户支行走访营销统计管理页面',
        // 表头
        khlx:'1',
        tjwd:'MM',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
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
            dataIndex: 'tjrq',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjrq.replace(/-/g, '/') - a.tjrq.replace(/-/g, '/'),
            width: 100
          },

          {
            title: '机构名称',
            align:"center",
            width: 90,
            dataIndex: 'zzbz_dictText'
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
                    title: '比上月',
                    align:"center",
                    dataIndex: 'yxzfhsBsq'
                  },
                  {
                    title: '排名',
                    align:"center",
                    dataIndex: 'yxzfpm'
                  },
                ]
              },
              {
                title: '当月任务',
                align:"center",
                dataIndex: 'zfrw',
              },
              {
                title: '当月任务完成率',
                align:"center",
                dataIndex: 'zfrwwcl',
                width: 75,
              },
            ]
          }
        ],
        url: {
          list: "/zhzftj/zhzftj/listRb",
          exportXlsUrl: "/zhzftj/zhzftj/exportXlsnh",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    watch: {
      hzfs(val) {
        console.log('watch hzfs', val)
        if(val == '1') {
          this.url = {
            list: "/zhzftj/zhzftj/listRb",
            exportXlsUrl: "/zhzftj/zhzftj/exportXlsnh",
          }
        } else if (val == '2') {
          this.url = {
            list: "/zhzftj/zhkhjlzftj/listRb",
            exportXlsUrl: "/zhzftj/zhkhjlzftj/exportXlszhzf",
          }
        }
        this.searchReset()
      }
    },
    created() {
      this.getCurrentMonth()
      this.searchReset()
    },
    methods: {
      moment,
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
        //获取查询条件
        let sqp = {}
        let para ={ khlx : this.khlx,tjwd:this.tjwd}
        let tjyfMoment = "";
        if (this.queryParam.tjrq){
          tjyfMoment = moment(this.queryParam.tjrq).format("YYYY-MM")+'-01';
        }
        if(this.superQueryParams){
          sqp['superQueryParams']=encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters,para);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq  = tjyfMoment;
        }
        return filterObj(param);
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = {...this.queryParam,khlx:this.khlx,tjwd:this.tjwd};
        if (this.queryParam.tjrq !== undefined && this.queryParam.tjrq !== null) {
          tjyf = moment(param.tjrq).format("YYYY-MM") + '-01'
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
      zfs(record,lx,sxlx){
        console.log("nhzfmxModal")
        console.log(record)
        console.log(lx+"lx")
        this.$refs.nhzfmxModal.init(record,lx,'ZH',sxlx, this.hzfs,'2');
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>