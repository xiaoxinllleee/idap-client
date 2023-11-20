<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjrq"
                              :defaultValue="defaultMonthOpera"
                              :format="monthFormat"
                           style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择支行"
                             v-model="queryParam.ssjgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="客户经理编号">
              <a-input placeholder="请输入客户经理编号" v-model="queryParam.khjlbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button type="primary" icon="download" @click="handleExportXls('客户经理考勤打卡统计')">导出</a-button>
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
        @change="handleTableChange">

        <span slot="khjl" slot-scope="khjl, record">
          <a @click="handle2SszhEdit(record, '/tjfx/tjbb/wdkq/kqdkbb/grkqdkbb/Tjfx_kqdkbb_signList')">{{khjl}}</a>
        </span>

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
    <tjfx_tjbb_khjlkqdktj-modal ref="modalForm" @ok="modalFormOk"></tjfx_tjbb_khjlkqdktj-modal>
  </a-card>
</template>

<script>
  import Tjfx_tjbb_khjlkqdktjModal from './modules/Tjfx_tjbb_khjlkqdktjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction,downFile} from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'
  export default {
    name: "Tjfx_tjbb_khjlkqdktjList",
    mixins:[JeecgListMixin],
    defaultMonthOpera: undefined,
    monthFormat: 'YYYY-MM',
    flag: true,
    isorter: {
      columns: 'tjyf',
      order: 'desc',
    },
    components: {
      Tjfx_tjbb_khjlkqdktjModal,JTreeSelect
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [

		   {
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq',
         customRender:function (text) {
           return !text?"":(text.length>8?text.substr(0,7):text)
         },
         sorter: true,
           },
		   {
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
		   {
            title: '客户经理编号',
            align:"center",
            dataIndex: 'khjlbh',
         scopedSlots:{customRender:'khjl'}
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khjlbh_dictText'
           },
		   {
            title: '打卡次数',
            align:"center",
            dataIndex: 'dkcs'
           },
		   {
            title: '有效打卡次数',
            align:"center",
            dataIndex: 'yxdkcs'
           },
		   {
            title: '有效打卡天数',
            align:"center",
            dataIndex: 'yxdkts'
           },
          {
            title: '当年有效打卡天数',
            align:"center",
            dataIndex: 'dnyxdkts'
          },
        ],
		url: {
          list: "/tjfx_tjbb_khjlkqdktj/tjfx_tjbb_khjlkqdktj/list",
          delete: "/tjfx_tjbb_khjlkqdktj/tjfx_tjbb_khjlkqdktj/delete",
          deleteBatch: "/tjfx_tjbb_khjlkqdktj/tjfx_tjbb_khjlkqdktj/deleteBatch",
          exportXlsUrl: "tjfx_tjbb_khjlkqdktj/tjfx_tjbb_khjlkqdktj/exportXls",
          importExcelUrl: "tjfx_tjbb_khjlkqdktj/tjfx_tjbb_khjlkqdktj/importExcel",
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
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.$route.query.zzbz=null;
        this.$route.query.tjrq=null;
        this.queryParam = {};
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
        if ((params.tjrq=='undefined' || params.tjrq==null) && this.flag==true) {
          params.tjrq = this.defaultMonthOpera.format("YYYY-MM")+'-01';
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
      initData() {
        var params = this.queryParam;
        if( params.tjrq==null){
          this.$message.error("开始日期或者接受日期不能为空!")
          return
        }
        let ksrqstr=params.tjrq.format("YYYYMM")+'01'
        this.loading = true;
        putAction("/tjfx_tjbb_khjlkqdktj/tjfx_tjbb_khjlkqdktj/extract", 'TJYF='+ksrqstr,'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        let tjrqment = "";
        let sszhvalue=this.$route.query.zzbz;
        let tjyfvalue=this.$route.query.tjrq;
        if(this.queryParam.tjrq) {
          tjrqment = this.queryParam.tjrq.format("YYYY-MM")+'-01';
        }
        if(tjyfvalue){
          tjrqment=tjyfvalue;
        }

        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if(sszhvalue){
          param.zzbz = sszhvalue;
        }

        return filterObj(param);
      },
      handle2SszhEdit: function(record,path) {
        this.$router.push({path: path, query: {zzbz: record.zzbz,tjrq: record.tjrq,user_id:record.khjlbh}})
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.tjrq != null){
          param.tjrq=param.tjrq.format("YYYY-MM")+'-01'}
        console.log("导出参数",param)
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
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>