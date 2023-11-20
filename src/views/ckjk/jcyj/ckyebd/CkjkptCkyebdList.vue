<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">

        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="时间起">
              <a-date-picker v-model="queryParam.tjyfB" placeholder="时间起" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="时间止">
              <a-date-picker v-model="queryParam.tjyfE" placeholder="时间止" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户姓名">
              <j-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="余额净增">
                <!--<a-input placeholder="请输入余额净增" v-model="queryParam.ldje"></a-input>-->
                <a-input placeholder="" v-model="queryParam.ldje_begin" style="width: 40%; text-align: center" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input placeholder="" v-model="queryParam.ldje_end"
                         style="width: 40%; text-align: center; border-left: 0" />

              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="余额(起)">
              <a-input placeholder="" v-model="queryParam.zrye_begin" style="width: 40%; text-align: center" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input placeholder="" v-model="queryParam.zrye_end"
                       style="width: 40%; text-align: center; border-left: 0" />
            </a-form-item>
          </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="余额(止)">
                <a-input placeholder="" v-model="queryParam.drye_begin" style="width: 40%; text-align: center" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input placeholder="" v-model="queryParam.drye_end"
                         style="width: 40%; text-align: center; border-left: 0" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="增减标识">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.ldbs" dict-code="zjbz"/>
              </a-form-item>
            </a-col>

          </template>
          <a-col :md="6" :sm="8">
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
      <a-button  icon="area-chart" @click="initData" v-has="'ckyebd:init'">提取</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('存款余额变动')" v-has="'ckyebd:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->

    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :scroll="{x:2300}"
      @change="handleTableChange">
      <span slot="address" slot-scope="text">
          <j-ellipsis :value="text" :length="10"></j-ellipsis>
        </span>
    </a-table>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction, putAction, httpAction } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'
  import JEllipsis from "../../../../components/jeecg/JEllipsis";
  import JInput from "@/components/jeecg/JInput";
  import store from '@/store/'

  export default {
    name: 'CkjkptCkyebdList',
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect,JEllipsis,JInput
    },
    data() {
      return {
        description: '存款余额变动查询管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
        // 重置标识
        flag: true,
        show: true,
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '时间起',
            align: 'center',
            dataIndex: 'tjyfB',
            width: 100,
            customRender: function(text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }
          },
          {
            title: '时间止',
            align: 'center',
            dataIndex: 'tjyfE',
            width: 100,
            customRender: function(text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }
          },
          {
            title: '支行名称',
            align: 'center',
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '机构代码',
            align: 'center',
            dataIndex: 'jgdm',
            width: 100
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm',
            width: 200
          },
          {
            title: '客户姓名',
            align: 'center',
            dataIndex: 'khxm',
            width: 150
          },
           {
              title: '员工工号',
              align:"center",
              dataIndex: 'yggh',width: 150,
            },
            {
              title: '员工姓名',
              align:"center",
              dataIndex: 'yggh_dictText',width: 150,
            },
          {
            title: '电话号码',
            align: 'center',
            dataIndex: 'dhhm',
            width: 150
          },
          {
            title: '地址',
            align: 'center',
            scopedSlots: { customRender: 'address' },
            dataIndex: 'dz'
          },
          {
            title: '余额(起)',
            align: 'center',
            dataIndex: 'zrye',
            width: 150
          },
          {
            title: '余额(止)',
            align: 'center',
            dataIndex: 'drye',
            width: 150
          },
          {
            title: '余额净增',
            align: 'center',
            dataIndex: 'ldje',
            width: 150
          },
          {
            title: '余额比（%）',
            align: 'center',
            dataIndex: 'ldbl',
            width: 150
          },
          {
            title: '增减标识',
            align: 'center',
            dataIndex: 'ldbs_dictText',
            width: 150
          },
        ],
        url: {
          list: '/CkjkptCkyebd/ckjkptCkyebd/list',
          delete: '/CkjkptCkyebd/ckjkptCkyebd/delete',
          deleteBatch: '/CkjkptCkyebd/ckjkptCkyebd/deleteBatch',
          exportXlsUrl: 'CkjkptCkyebd/ckjkptCkyebd/exportXls',
          importExcelUrl: 'CkjkptCkyebd/ckjkptCkyebd/importExcel',
          extract: "/CkjkptCkyebd/ckjkptCkyebd/extract"
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyfB: undefined, tjyfE: undefined};
        this.queryParam.tjyfB=this.defaultMonthOpera;
        this.queryParam.tjyfE=this.defaultMonthOpera;
      },
      searchReset() {
        this.queryParam = {tjyfB: undefined, tjyfE: undefined, jgdm: undefined};
        this.queryParam.tjyfB=this.defaultMonthOpera;
        this.queryParam.tjyfE=this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      initData() {
        var params = Object.assign({}, this.queryParam)
        if (params.tjyfB === undefined || params.tjyfB == null) {
          this.$message.error('时间起不能为空!')
          return
        }
        if (params.tjyfE === undefined || params.tjyfE == null) {
          this.$message.error('时间止不能为空!')
          return
        }
        let kssj = moment(params.tjyfB).format('YYYY-MM-DD')
        let jssj = moment(params.tjyfE).format('YYYY-MM-DD')
        this.loading = true
        putAction(this.url.extract, { 'ksrq': kssj, 'jsrq': jssj }).then((res) => {
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

      getQueryParams() {
        let tjrqmentB = ''
        let tjrqmentE = ''

        if (this.queryParam.tjyfE) {
          tjrqmentE = this.queryParam.tjyfE.format('YYYY-MM-DD')
        }
        if (this.queryParam.tjyfB) {
          tjrqmentB = this.queryParam.tjyfB.format('YYYY-MM-DD')
        }

        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.tjyfB = tjrqmentB
        param.tjyfE = tjrqmentE
        return filterObj(param)
      },
      searchQuery() {
        this.loadData(1)
      },
      /*getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyfB === undefined || params.tjyfB === null) && this.flag === true) {
          params.tjyfB = moment(this.defaultMonthOpera).format("YYYY-MM-DD")
        }
        if ((params.tjyfE === undefined || params.tjyfE === null) && this.flag === true) {
          params.tjyfE = moment(this.defaultMonthOpera).format("YYYY-MM-DD")
        }
        this.loading = true
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
      },*/
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>