<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjyf"  @change="onChange" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门名称">
              <j-tree-select placeholder="请选择部门名称" v-model="queryParam.zzbz"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ"
                             pidField="sjzzbz"
                             treeNodeFilterProp="title"
                             :sszh="true"
                             :showSearch="false"
                             :treeDefaultExpandAll="true"
                             :filterTreeNode="true" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户日期">
              <a-range-picker @change="onChangebegin" v-model="queryParam.khrq" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"></a-range-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日期">
              <a-range-picker @change="onChangedq" v-model="queryParam.dqrq" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"></a-range-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款账户">
              <a-input placeholder="请输入存款账户" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="拓展人工号">
              <a-input placeholder="请输入拓展人工号" v-model="queryParam.tzrgh"></a-input>
            </a-form-item>
          </a-col>
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
      <a-button icon="download" @click="handleExportXls('机关揽储明细')">导出</a-button>
      <a-button icon="area-chart" @click="init">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

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
    <jglcmx2-modal ref="modalForm" @ok="modalFormOk"></jglcmx2-modal>
  </a-card>
</template>

<script>
  import Jglcmx2Modal from './modules/Jglcmx2Modal'
  import moment from 'moment'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction, postAction} from "../../../../api/manage";
  import {filterObj} from "@/utils/util";

  export default {
    name: "Jglcmx2List",
    mixins:[JeecgListMixin],
    components: {
      Jglcmx2Modal,
      JTreeSelect
    },
    data () {
      return {
        description: '机关揽储明细管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
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
            dataIndex: 'tjyf'
          },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '存款账户',
            align:"center",
            dataIndex: 'ckzh'
          },
          {
            title: '账户类型',
            align:"center",
            dataIndex: 'zhlx'
          },
          {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq'
          },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
           },
		   {
            title: '拓展人工号',
            align:"center",
            dataIndex: 'tzrgh'
           },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'tzrgh_dictText'
          },
		   {
            title: '部门名称',
            align:"center",
            dataIndex: 'tzrsszz_dictText'
           },
		   {
            title: '期末余额',
            align:"center",
            dataIndex: 'qmye'
           },
		   {
            title: '期末月日平',
            align:"center",
            dataIndex: 'qmyrp'
           },
		   {
            title: '期末年日平',
            align:"center",
            dataIndex: 'qmnrp'
           },
		   /*{
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },*/
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/jglcmx2/jglcmx2/list",
          delete: "/jglcmx2/jglcmx2/delete",
          deleteBatch: "/jglcmx2/jglcmx2/deleteBatch",
          exportXlsUrl: "jglcmx2/jglcmx2/exportXls",
          importExcelUrl: "jglcmx2/jglcmx2/importExcel",
          init: "/jglcmx2/jglcmx2/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.getCurrentDate()
      this.queryParam.khrq_end = moment(new Date()).format('YYYY-MM-DD');
      this.queryParam.dqrq_end = moment(new Date()).format('YYYY-MM-DD');
    },
    methods: {
      moment,
      onChange(date,dateString){
        this.queryParam.tjyf = dateString;
      },
      onChangebegin(value,dateString){
        //this.queryParam.begindayString = dateString[0] + ',' + dateString[1];
        let khrqString = dateString
        this.queryParam.khrq_begin = khrqString[0]
        this.queryParam.khrq_end = khrqString[1]
      },
      onChangedq(value,dateString){
        //this.queryParam.dqrqString = dateString[0] + ',' + dateString[1];
        let dqrqString = dateString
        this.queryParam.dqrq_begin = dqrqString[0]
        this.queryParam.dqrq_end = dqrqString[1]
      },
      getCurrentDate() {
        let curDate = new Date()
        let curMonth= {year : curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate)
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        if (!this.url.list){
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();
        // if ((params.tjyf=='undefined' || params.tjyf==null) && this.flag==true) {
        //   params.tjyf = this.defaultMonthOpera.format("YYYY-MM-DD");
        // }
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
        /*let tjrqment = "";
        if(this.queryParam.tjyf) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM-DD");
        }*/
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        /*if (param.tjyf) {
          param.tjyf = tjrqment;
        }*/
        return filterObj(param);
      },
      init(){
        console.info('统计日期', this.queryParam.tjyf)
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          this.$message.warning("统计日期不能为空！")
          return false
        }
        let params = {'tjyf': moment(this.queryParam.tjyf).format("YYYY-MM-DD"),}
        this.loading = true
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData()
          } else {
            this.$message.warning(res.message,5)
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>