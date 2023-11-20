<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf"
                              placeholder="请选择统计月份" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行查询"
                             pid-field="sjzzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.sszh"
                             :sszh="true"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="行政村">
              <a-input placeholder="请输入行政村名称" v-model="queryParam.xzc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
-->
      <a-button type="primary" icon="download" @click="handleExportXls('行政村行动挂图作业表2')">导出</a-button>
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
        :scroll="{ x: 3300 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="xzz" slot-scope="xzz ,record" >
          <a @click="handlesszhEdit(record,'/tjfx/xdgtzyb/xdgtzyb2/dhxdgtzyb2/Dhxdgtzyb2List')">{{xzz}}</a>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

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
    <xzcxdgtzy2-modal ref="modalForm" @ok="modalFormOk"></xzcxdgtzy2-modal>
  </a-card>
</template>

<script>
  import Xzcxdgtzy2Modal from './modules/Xzcxdgtzy2Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import moment from 'moment'

  export default {
    name: "Xzcxdgtzy2List",
    mixins:[JeecgListMixin],
    components: {
      Xzcxdgtzy2Modal,JTreeSelect
    },
    data () {
      return {
        description: '行政村行动挂图作业表2管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
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
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
          },
          {
            title: '存量日期',
            align:"center",
            dataIndex: 'clrq'
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText',
          },
          {
            title: '行政村',
            align:"center",
            dataIndex: 'xzc'
          },
          {
            title: '组',
            align:"center",
            dataIndex: 'xzz',
            scopedSlots:{customRender:'xzz'}
          },
          {
            title: '责任人',
            align:"center",
            dataIndex: 'zkhjl'
          },
          {
            title: '存量存款余额',
            align:"center",
            dataIndex: 'clckye'
          },
          {
            title: '当前存款余额',
            align:"center",
            dataIndex: 'dyckye'
          },
          {
            title: '存款净增余额',
            align:"center",
            dataIndex: 'ckjzye'
          },
          {
            title: '存量户数',
            align:"center",
            dataIndex: 'clhs'
          },
          {
            title: '当前存款户数',
            align:"center",
            dataIndex: 'dyhs'
          },
          {
            title: '存款净增户数',
            align:"center",
            dataIndex: 'ckjzhs'
          },
          {
            title: '存量贷款余额',
            align:"center",
            dataIndex: 'cldkye'
          },
          {
            title: '当前贷款余额',
            align:"center",
            dataIndex: 'dydkye'
          },
          {
            title: '贷款净增余额',
            align:"center",
            dataIndex: 'dkjzye'
          },
          {
            title: '存量贷款户数',
            align:"center",
            dataIndex: 'cldkhs'
          },
          {
            title: '当前贷款户数',
            align:"center",
            dataIndex: 'dydkhs'
          },
          {
            title: '贷款净增户数',
            align:"center",
            dataIndex: 'dkjzhs'
          },
          {
            title: '存量不良贷款余额',
            align:"center",
            dataIndex: 'clbldkye'
          },
          {
            title: '当前不良贷款余额',
            align:"center",
            dataIndex: 'dybldkye'
          },
          {
            title: '不良下降金额',
            align:"center",
            dataIndex: 'blxjje'
          },
          {
            title: '存量表外不良贷款余额',
            align:"center",
            dataIndex: 'clbwbldkye'
          },
          {
            title: '当前表外不良贷款余额',
            align:"center",
            dataIndex: 'dybwbldkye'
          },
          {
            title: '表外不良下降金额',
            align:"center",
            dataIndex: 'bwblxjje'
          },
          {
            title: '存量手机银行户数',
            align:"center",
            dataIndex: 'clsjyhhs'
          },
          {
            title: '手机银行户数',
            align:"center",
            dataIndex: 'dysjyhhs'
          },
          {
            title: '手机银行净增户数',
            align:"center",
            dataIndex: 'sjyhjzhs'
          },
          {
            title: '存量etc户数',
            align:"center",
            dataIndex: 'cletchs'
          },
          {
            title: '当前etc户数',
            align:"center",
            dataIndex: 'dyetchs'
          },
          {
            title: 'ETC净增户数',
            align:"center",
            dataIndex: 'etcjzhs'
          },


        ],
        url: {
          list: "/tjfx.xdgtzyb.xczxdgtzy2/xzcxdgtzy2/list",
          delete: "/tjfx.xdgtzyb.xczxdgtzy2/xzcxdgtzy2/delete",
          deleteBatch: "/tjfx.xdgtzyb.xczxdgtzy2/xzcxdgtzy2/deleteBatch",
          exportXlsUrl: "tjfx.xdgtzyb.xczxdgtzy2/xzcxdgtzy2/exportXls",
          importExcelUrl: "tjfx.xdgtzyb.xczxdgtzy2/xzcxdgtzy2/importExcel",
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
      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading = true;
        putAction(this.url.init, 'TJYF='+tjyfstr,'put').then((res) => {
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
        let tjyfMoment = "";
        let sszhvalue=this.$route.query.sszh;
        let tjyfvalue=this.$route.query.tjyf;
        let xzcvalue=this.$route.query.xzc;
        console.log(sszhvalue)
        console.log(tjyfvalue)
        if(this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        if(tjyfvalue){
          tjyfMoment=tjyfvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf     = tjyfMoment;

        if(sszhvalue){
          param.sszh = sszhvalue;
        }
        if(xzcvalue){
          param.xzc = xzcvalue;
        }
        this.$route.query.sszh=null;
        this.$route.query.tjyf=null;
        this.$route.query.xzc=null;
        return filterObj(param);
      },
      handlesszhEdit: function(record,path) {
        console.log(path);
        console.log(record.sszh);
        this.$router.push({path: path, query: {sszh: record.sszh,tjyf:record.tjyf,xzc:record.xzc,xzz:record.xzz}})
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>