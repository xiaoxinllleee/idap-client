<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" >
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="统计年份">
            <a-select placeholder="请选择统计年份" v-model="queryParam.tjrq" :defaultValue="dateValue">
              <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
            </a-select>
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
      <a-button icon="download" @click="handleExportXls('商户支行授信用信(年报)列表')" v-has="'shZhsxyxNb:exp'">导出</a-button>
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
        :scroll="{x:800}"
        @change="handleTableChange">
        <span slot="sxhs" slot-scope="sxhs,record">
          <a @click="sxmx(record,'5','1')">{{sxhs}}</a>
        </span>
        <span slot="clkhSxhs" slot-scope="clkhSxhs,record">
          <a @click="sxmx(record,'5','2')">{{clkhSxhs}}</a>
        </span>
        <span slot="xkhSxhs" slot-scope="xkhSxhs,record">
          <a @click="sxmx(record,'5','3')">{{xkhSxhs}}</a>
        </span>
        <span slot="hnkdSxhs" slot-scope="hnkdSxhs,record">
          <a @click="sxmx(record,'5','4')">{{hnkdSxhs}}</a>
        </span>
        <span slot="yxhs" slot-scope="yxhs,record">
          <a @click="yxmx(record,'5','1')">{{yxhs}}</a>
        </span>
        <span slot="clkhYxhs" slot-scope="clkhYxhs,record">
          <a @click="yxmx(record,'5','2')">{{clkhYxhs}}</a>
        </span>
        <span slot="xkhYxhs" slot-scope="xkhYxhs,record">
          <a @click="yxmx(record,'5','3')">{{xkhYxhs}}</a>
        </span>
        <span slot="hnkdYxhs" slot-scope="hnkdYxhs,record">
          <a @click="yxmx(record,'5','4')">{{hnkdYxhs}}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <shsxmx-modal ref="shsxmxModal"/>
    <shyxmx-modal ref="shyxmxModal"/>
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
  import ShsxmxModal from '@views/tjfx/zfsjtj/sxyxtj/sh/zh/modules/ShsxmxModal'
  import ShyxmxModal from '@views/tjfx/zfsjtj/sxyxtj/sh/zh/modules/ShyxmxModal'

  export default {
    name: "ShzfNbList",
    mixins:[JeecgListMixin],
    components:{
      JTreeSelect, ShsxmxModal, ShyxmxModal
    },
    data () {
      return {
        description: '商户支行授信用信统计管理页面',
        dateValue: '',
        isorter: {
          columns: 'tjrq',
          order: 'desc',
        },
        // 表头
        khlx:'2',
        tjwd:'YYYY',
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
            title:'全部贷款（剔除按揭）',
            children:[
              {
                title:'评级授信',
                children:[
                  {
                    title: '授信户数',
                    align:"center",
                    dataIndex: 'sxhs',
                    width: 80,
                    scopedSlots: { customRender: 'sxhs' }
                  },
                  {
                    title: '授信金额(万元)',
                    align:"center",
                    dataIndex: 'sxje',
                    width: 80,
                  },
                  {
                    title: '授信户数比上月',
                    align:"center",
                    dataIndex: 'sxhsBsq',
                    width: 80,
                  },
                  {
                    title: '授信金额比上月',
                    align:"center",
                    dataIndex: 'sxjeBsq',
                    width: 80,
                  },
                  {
                    title: '授信户数排名',
                    align:"center",
                    dataIndex: 'sxhspm',
                    width: 80,
                  }

                ]
              },
              {
                title:'用信',
                children:[
                  {
                    title: '用信户数',
                    align:"center",
                    dataIndex: 'yxhs',
                    scopedSlots: { customRender: 'yxhs' },
                    width: 80,
                  },
                  {
                    title: '用信金额(万元)',
                    align:"center",
                    dataIndex: 'yxje',
                    width: 80,
                  },
                  {
                    title: '用信户数比上月',
                    align:"center",
                    dataIndex: 'yxhsBsq',
                    width: 80,
                  },
                  {
                    title: '用信金额比上月',
                    align:"center",
                    dataIndex: 'yxjeBsq',
                    width: 80,
                  },
                  {
                    title: '用信户数排名',
                    align:"center",
                    dataIndex: 'yxhspm',
                    width: 80,
                  }
                ]
              },
            ]
          },
          {
            title:'其中老客户',
            children:[
              {
                title:'评级授信',
                children:[
                  {
                    title: '授信户数',
                    align:"center",
                    dataIndex: 'clkhSxhs',
                    scopedSlots: { customRender: 'clkhSxhs' },
                    width: 80,
                  },
                  {
                    title: '授信金额(万元)',
                    align:"center",
                    dataIndex: 'clkhSxje',
                    width: 80,
                  },
                  {
                    title: '授信户数比上月',
                    align:"center",
                    dataIndex: 'clkhSxhsBsq',
                    width: 80,
                  },
                  {
                    title: '授信金额比上月',
                    align:"center",
                    dataIndex: 'clkhSxjeBsq',
                    width: 80,
                  },
                  {
                    title: '授信户数排名',
                    align:"center",
                    dataIndex: 'clkhSxhspm',
                    width: 80,
                  }

                ]
              },
              {
                title:'用信',
                children:[
                  {
                    title: '用信户数',
                    align:"center",
                    dataIndex: 'clkhYxhs',
                    scopedSlots: { customRender: 'clkhYxhs' },
                    width: 80,
                  },
                  {
                    title: '用信金额(万元)',
                    align:"center",
                    dataIndex: 'clkhYxje',
                    width: 80,
                  },
                  {
                    title: '用信户数比上月',
                    align:"center",
                    dataIndex: 'clkhYxhsBsq',
                    width: 80,
                  },
                  {
                    title: '用信金额比上月',
                    align:"center",
                    dataIndex: 'clkhYxjeBsq',
                    width: 80,
                  },
                  {
                    title: '用信户数排名',
                    align:"center",
                    dataIndex: 'clkhYxhspm',
                    width: 80,
                  }
                ]
              },
            ]
          },
          {
            title:'其中白名单客户（新客户）',
            children:[
              {
                title:'评级授信',
                children:[
                  {
                    title: '授信户数',
                    align:"center",
                    dataIndex: 'xkhSxhs',
                    scopedSlots: { customRender: 'xkhSxhs' },
                    width: 80,
                  },
                  {
                    title: '授信金额(万元)',
                    align:"center",
                    dataIndex: 'xkhSxje',
                    width: 80,
                  },
                  {
                    title: '授信户数比上月',
                    align:"center",
                    dataIndex: 'xkhSxhsBsq',
                    width: 80,
                  },
                  {
                    title: '授信金额比上月',
                    align:"center",
                    dataIndex: 'xkhSxjeBsq',
                    width: 80,
                  },
                  {
                    title: '授信户数排名',
                    align:"center",
                    dataIndex: 'xkhSxhspm',
                    width: 80,
                  }

                ]
              },
              {
                title:'用信',
                children:[
                  {
                    title: '用信户数',
                    align:"center",
                    dataIndex: 'xkhYxhs',
                    scopedSlots: { customRender: 'xkhYxhs' },
                    width: 80,
                  },
                  {
                    title: '用信金额(万元)',
                    align:"center",
                    dataIndex: 'xkhYxje',
                    width: 80,
                  },
                  {
                    title: '用信户数比上月',
                    align:"center",
                    dataIndex: 'xkhYxhsBsq',
                    width: 80,
                  },
                  {
                    title: '用信金额比上月',
                    align:"center",
                    dataIndex: 'xkhYxjeBsq',
                    width: 80,
                  },
                  {
                    title: '用信户数排名',
                    align:"center",
                    dataIndex: 'xkhYxhspm',
                    width: 80,
                  }
                ]
              },
            ]
          },
          {
            title:'其中惠农快贷',
            children:[
              {
                title:'评级授信',
                children:[
                  {
                    title: '授信户数',
                    align:"center",
                    dataIndex: 'hnkdSxhs',
                    scopedSlots: { customRender: 'hnkdSxhs' },
                    width: 80,
                  },
                  {
                    title: '授信金额(万元)',
                    align:"center",
                    dataIndex: 'hnkdSxje',
                    width: 80,
                  },
                  {
                    title: '授信户数比上月',
                    align:"center",
                    dataIndex: 'hnkdSxhsBsq',
                    width: 80,
                  },
                  {
                    title: '授信金额比上月',
                    align:"center",
                    dataIndex: 'hnkdSxjeBsq',
                    width: 80,
                  },
                  {
                    title: '授信户数排名',
                    align:"center",
                    dataIndex: 'hnkdSxhspm',
                    width: 80,
                  }

                ]
              },
              {
                title:'用信',
                children:[
                  {
                    title: '用信户数',
                    align:"center",
                    dataIndex: 'hnkdYxhs',
                    scopedSlots: { customRender: 'hnkdYxhs' },
                    width: 80,
                  },
                  {
                    title: '用信金额(万元)',
                    align:"center",
                    dataIndex: 'hnkdYxje',
                    width: 80,
                  },
                  {
                    title: '用信户数比上月',
                    align:"center",
                    dataIndex: 'hnkdYxhsBsq',
                    width: 80,
                  },
                  {
                    title: '用信金额比上月',
                    align:"center",
                    dataIndex: 'hnkdYxjeBsq',
                    width: 80,
                  },
                  {
                    title: '用信户数排名',
                    align:"center",
                    dataIndex: 'hnkdYxhspm',
                    width: 80,
                  }
                ]
              },
            ]
          },
        ],
        url: {
          list: "/sxyxtj/zhsxyxtj/list",
          exportXlsUrl: "/sxyxtj/zhsxyxtj/exportXls",
        },
        qybm:'',
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.init();
    },
    methods: {
      searchReset() {
        this.queryParam = {tjrq: undefined, zzbz: undefined};
        this.queryParam.tjrq = new Date().getFullYear();
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
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
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      loadData() {

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
        let sqp = {}
        let para ={ khlx : this.khlx,tjwd:this.tjwd}
        let tjrq = this.queryParam.tjrq
        let tjyfMoment = "";
        if (tjrq!=null && tjrq!='undefined'){
          tjyfMoment = tjrq + '-01-01'
        }
        console.log(tjyfMoment)
        if(this.superQueryParams){
          sqp['superQueryParams']=encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters,para);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjrq=tjyfMoment;
        return filterObj(param);
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = {...this.queryParam,khlx:this.khlx,tjwd:this.tjwd};
        if (this.queryParam.tjrq === undefined || this.queryParam.tjrq === "") {
          tjyf = this.queryParam.tjrq + '-01-01'
        }else {
          tjyf =this.queryParam.tjrq + '-01-01'
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
      sxmx(record,lx,sxlx){
        this.$refs.shsxmxModal.init(record,lx,'ZH',sxlx);
      },
      yxmx(record,lx,sxlx){
        this.$refs.shyxmxModal.init(record,lx,'ZH',sxlx);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>