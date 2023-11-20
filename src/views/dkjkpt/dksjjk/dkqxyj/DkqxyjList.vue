<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjrq" style="width: 100%;" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构名称" v-model="queryParam.jgdm" dict="V_HR_BAS_ORGANIZATION_CMMSZH,ZZJC,YWJGDM" pid-field="SJYWJGDM"
                             treeNodeFilterProp="title" :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="欠息（到本月21号）">
                <a-input placeholder="请输入欠息（到本月21号）" v-model="queryParam.qx"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="收息账号金额是否能还款">
                <j-dict-select-tag placeholder="请输入收息账号金额是否能还款" v-model="queryParam.sxzhjesfnhk" dict-code="sfbz"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户姓名">
                <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="身份证">
                <a-input placeholder="请输入身份证" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button @click="handleInit" icon="area-chart" v-has="'dkqxyj:InitData'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('贷款欠息预警')" v-has="'dkqxyj:exportXls'">导出</a-button>
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
        :scroll="{ x: 'max-content'}"
        @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
import {getAction, putAction} from "../../../../api/manage";
import {filterObj} from "../../../../utils/util";

export default {
  name: "DkqxyjList",
  mixins: [JeecgListMixin],
  components: {JTreeSelect},
  data() {
    return {
      description: '贷款欠息预警管理页面',
      monthFormat: 'YYYY-MM-DD',
      isorter: {
        column: 'tjrq',
        order: 'desc',
      },
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '统计日期',
          align: "center",
          dataIndex: 'tjrq',
          customRender:function (text) {
            return !text?"":(text.length>10?text.substr(0,10):text)
          },
        },
        {
          title: '机构代码',
          align: "center",
          dataIndex: 'jgdm'
        },
        {
          title: '机构名称',
          align: "center",
          dataIndex: 'jgmc'
        },
        {
          title: '欠息（到本月21号）',
          align: "center",
          dataIndex: 'qx'
        },
        {
          title: '收息账号金额是否能还款',
          align: "center",
          dataIndex: 'sxzhjesfnhk_dictText'
        },
        {
          title: '客户姓名',
          align: "center",
          dataIndex: 'khmc'
        },
        {
          title: '身份证',
          align: "center",
          dataIndex: 'zjhm'
        },
        {
          title: '客户类型',
          align: "center",
          dataIndex: 'khlx_dictText'
        },
        {
          title: '地址',
          align: "center",
          dataIndex: 'dz'
        },
        {
          title: '电话号码',
          align: "center",
          dataIndex: 'dhhm'
        },
        {
          title: '存款账号（收息账号）',
          align: "center",
          dataIndex: 'ckzh'
        },
        {
          title: '存款金额（收息账号）',
          align: "center",
          dataIndex: 'ckje'
        },
        {
          title: '贷款账号',
          align: "center",
          dataIndex: 'dkzh'
        },
        {
          title: '贷款金额',
          align: "center",
          dataIndex: 'dkje'
        },
        {
          title: '表内应计利息',
          align: "center",
          dataIndex: 'bnyjlx'
        },
        {
          title: '表内应收利息',
          align: "center",
          dataIndex: 'blyslx'
        },
        {
          title: '借款日期',
          align: "center",
          dataIndex: 'jkrq',
          customRender: function(text) {
            return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
          }
        },
        {
          title: '到期日期',
          align: "center",
          dataIndex: 'dqrq',
          customRender: function(text) {
            return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
          }
        },
        {
          title: '起息日',
          align: "center",
          dataIndex: 'qxr',
          customRender: function(text) {
            return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
          }
        },
        {
          title: '结息日',
          align: "center",
          dataIndex: 'jxr'
        },
        {
          title: '贷款利率(%)',
          align: "center",
          dataIndex: 'dkll'
        },
        {
          title: '第一责任人',
          align: "center",
          dataIndex: 'dyzrr'
        }
      ],
      url: {
        list: "/dkjkpt/dkqxyj/list",
        exportXlsUrl: "dkjkpt/dkqxyj/exportXls",
        importExcelUrl: "dkjkpt/dkqxyj/importExcel",
        init:"/dkjkpt/dkqxyj/init",
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  methods: {
    handleInit(){
      this.loading = true;
      putAction(this.url.init).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.loadData();
        } else {
          this.$message.warning(res.message,5);
        }
        this.loading = false;
      })
    },
    loadData(arg) {
      if(!this.url.list){
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      var params = this.getQueryParams();//查询条件
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
    getQueryParams() {
      if (this.queryParam.tjrq) {
        this.queryParam.tjrq = this.queryParam.tjrq.format("YYYY-MM-DD");
      }
      var param = Object.assign({}, this.queryParam, this.isorter);
      param.field    = this.getQueryField();
      param.pageNo   = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      return filterObj(param);
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>