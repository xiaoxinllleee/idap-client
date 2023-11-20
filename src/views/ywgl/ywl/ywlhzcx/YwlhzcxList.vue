<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标志">
              <j-tree-select placeholder="请选择所属组织"
                             v-model="queryParam.zzbz"
                             dict="hr_bas_organization,zzjc,zzbz"
                             pidField="sjzzbz"
                             treeNodeFilterProp="title"
                             :sszh="true"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"
                             :filterTreeNode="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请输入统计月份" v-model="queryParam.tjyf" style="width: 100%"
                       :defaultValue="defaultMonthOpera" :format="monthFormat"></a-month-picker>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('业务量汇总查询')" v-has="'ywlhzcx:exportXls'">导出</a-button>
      <a-button icon="area-chart" @click="init" v-has="'ywlhzcx:init'">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
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
    <ywlhzcx-modal ref="modalForm" @ok="modalFormOk"></ywlhzcx-modal>
  </a-card>
</template>

<script>
  import YwlhzcxModal from './modules/YwlhzcxModal'
  import moment from 'moment'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "../../../../utils/util";
  import {getAction, postAction} from "../../../../api/manage";

  export default {
    name: "YwlhzcxList",
    mixins:[JeecgListMixin],
    components: {
      YwlhzcxModal,JTreeSelect
    },
    data () {
      return {
        description: '业务量汇总查询管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
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
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
           },
		   {
            title: '组织标志',
            align:"center",
            dataIndex: 'zzbz'
           },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
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
            title: '交易笔数',
            align:"center",
            dataIndex: 'jybs'
           },
		   {
            title: '折算后交易笔数',
            align:"center",
            dataIndex: 'zshjybs'
           },
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ywlhzcx/ywlhzcx/list",
          delete: "/ywlhzcx/ywlhzcx/delete",
          deleteBatch: "/ywlhzcx/ywlhzcx/deleteBatch",
          exportXlsUrl: "ywlhzcx/ywlhzcx/exportXls",
          importExcelUrl: "ywlhzcx/ywlhzcx/importExcel",
          init: "/ywlhzcx/ywlhzcx/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.getCurrentMonth()
    },
    methods: {
      init() {
        let tjyf = ''
        let params = this.queryParam
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        } else {
          tjyf = moment(params.tjyf).format("YYYY-MM") + '-01'
        }
        params = {
          tjyf: moment(this.queryParam.tjyf).format("YYYY-MM") + '-01',
        }
        this.loading = true
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loading = false
        })
      },

      getQueryParams() {
        let tjrqment = "";
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate);
      },
      loadData(arg) {
        // 获取当前月份
        this.getCurrentMonth()
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();
        if ((params.tjyf === undefined || params.tjyf == null)) {
          params.tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01';
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>