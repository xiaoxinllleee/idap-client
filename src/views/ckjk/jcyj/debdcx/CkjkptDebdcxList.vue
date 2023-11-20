<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="交易日期">
            <a-date-picker placeholder="请选择交易日期" v-model="queryParam.tjrq" style="width: 100%;"
                           :defaultValue="defaultMonthOpera" :format="monthFormat"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择机构查询" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           pid-field="sjywjgdm" treeNodeFilterProp="title"
                           :showSearch="true" :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="员工工号">
            <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户姓名">
            <j-input placeholder="请输入客户姓名" v-model="queryParam.khxm"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="流出金额">
              <a-input-number placeholder="" v-model="queryParam.lcje_begin" style="width: 40%; text-align: center" :min="0"/>
              <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
              <a-input-number placeholder="" v-model="queryParam.lcje_end" style="width: 40%; text-align: center; border-left: 0" :min="0"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="流入金额">
              <a-input-number placeholder="" v-model="queryParam.lrje_begin" style="width: 40%; text-align: center" :min="0"/>
              <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
              <a-input-number placeholder="" v-model="queryParam.lrje_end" style="width: 40%; text-align: center; border-left: 0" :min="0"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="净现金流">
              <a-input-number placeholder="" v-model="queryParam.jxjl_begin" style="width: 40%; text-align: center" :min="0"/>
              <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
              <a-input-number placeholder="" v-model="queryParam.jxjl_end" style="width: 40%; text-align: center; border-left: 0" :min="0"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="总现金流">
              <a-input-number placeholder="" v-model="queryParam.zxjl_begin" style="width: 40%; text-align: center" :min="0"/>
              <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
              <a-input-number placeholder="" v-model="queryParam.zxjl_end" style="width: 40%; text-align: center; border-left: 0" :min="0"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
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
      <a-button  icon="area-chart" @click="initData" v-has="'debdcx:init'">提取</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('大额变动查询')" v-has="'debdcx:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="middle"
               bordered
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import JInput from '../../../../components/jeecg/JInput'
  import moment from "moment"
  import store from '@/store/'

  export default {
    name: "CkjkptDebdcxList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JTreeSelect
    },
    data () {
      return {
        description: '大额变动查询管理页面',
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
        // 重置标识
        flag: true,
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '交易日期',
            align:"center",
            dataIndex: 'tjrq',
            customRender: function (text) {
              return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
            },
            sorter: true,
          },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
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
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '流出金额',
            align:"center",
            dataIndex: 'lcje'
          },
          {
            title: '流入金额',
            align:"center",
            dataIndex: 'lrje'
          },
          {
            title: '净现金流',
            align:"center",
            dataIndex: 'jxjl'
          },
          {
            title: '总现金流',
            align:"center",
            dataIndex: 'zxjl'
          },

        ],
        url: {
          init: "/CkjkptDebdcx/ckjkptDebdcx/extract",
          list: "/CkjkptDebdcx/ckjkptDebdcx/list",
          delete: "/CkjkptDebdcx/ckjkptDebdcx/delete",
          deleteBatch: "/CkjkptDebdcx/ckjkptDebdcx/deleteBatch",
          exportXlsUrl: "CkjkptDebdcx/ckjkptDebdcx/exportXls",
          importExcelUrl: "CkjkptDebdcx/ckjkptDebdcx/importExcel",
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
    },
    methods: {
      getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjrq: undefined, jgdm: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      getQueryParams() {
        let tjrqMoment = "";
        if (this.queryParam.tjrq) {
          tjrqMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD")
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq = tjrqMoment;
        }
        return filterObj(param);
      },
      initData() {
        var params = Object.assign({}, this.queryParam)
        if (params.tjrq === undefined || params.tjrq == null) {
          this.$message.warning("请选择交易日期!")
          return
        }
        let jyrq = moment(params.tjrq).format("YYYY-MM-DD")
        this.loading = true
        putAction(this.url.init, {'jyrq': jyrq}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败！", error)
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