<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属网格">
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp="title"
              >
              </a-tree-select>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('评议情况统计表')" v-has="'pyqktj:exp'">导出</a-button>
      <a-button icon="import" @click="initData" v-has="'pyqktj:init'">提取</a-button>
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
        :scroll="{ x: 2000}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
<!--          <a @click="handleEdit(record)">编辑</a>-->
    <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
        <!--  <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>

              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import store from '@/store/'
  import { downFile, putAction, getAction } from '@/api/manage'
  import moment from 'moment'

  export default {
    name: "TjfxPyqktjList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect, moment
    },
    data () {
      return {
        description: '评议情况统计页面',
        // 表头
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
        rq:'',
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
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
		      {
            title: '整村授信试点村',
            align:"center",
            dataIndex: 'wgbh_dictText'
          },
		      {
            title: '挂点人员',
            align:"center",
            dataIndex: 'gdry'
          },
		      {
            title: '人口数',
            align:"center",
            dataIndex: 'zrs'
          },
          {
            title: '户数',
            align:"center",
            dataIndex: 'zhs'
          },
          {
            title: '可评议户数',
            align:"center",
            dataIndex: 'kpyhs'
          },
          {
            title: '综合评议户数',
            align:"center",
            dataIndex: 'zhpyhs'
          },
          {
            title: '评议剩余户数',
            align:"center",
            dataIndex: 'pysyhs'
          },
          {
            title: '白名单率',
            align:"center",
            dataIndex: 'bmdl'
          },
          {
            title: '惠农快贷导入户数',
            align:"center",
            dataIndex: 'hnkddrhs'
          },
          {
            title: '农户快贷导入授信金额',
            align:"center",
            dataIndex: 'hnkddred'
          },
          {
            title: '惠农快贷导入户数净增',
            align:"center",
            dataIndex: 'hnkddrhsjz'
          },
          {
            title: '完成导入白名单以及完成2轮评议户数',
            align:"center",
            dataIndex: 'hnkddrpyhs'
          },
          {
            title: '惠农快贷白名单生成率',
            align:"center",
            dataIndex: 'hnkdbmdl'
          },
          {
            title: '存量客户数',
            align:"center",
            dataIndex: 'clkhs'
          },
          {
            title: '期末客户数',
            align:"center",
            dataIndex: 'qmkhs'
          },
          {
            title: '新签合同户数（含20万以上）',
            align:"center",
            dataIndex: 'xkhs1'
          },
          {
            title: '新签合同户数(10-20万）',
            align:"center",
            dataIndex: 'xkhs2'
          },
          {
            title: '新签合同户数(10万以下）',
            align:"center",
            dataIndex: 'xkhs3'
          },
          {
            title: '授信金额',
            align:"center",
            dataIndex: 'sxje'
          },
          {
            title: '用信金额',
            align:"center",
            dataIndex: 'yxje'
          },
          {
            title: '用信率',
            align:"center",
            dataIndex: 'yxl'
          },
        ],
		    url: {
          list: "/tjfx/pyqktj/list",
          delete: "/tjfx/pyqktj/delete",
          deleteBatch: "/tjfx/pyqktj/deleteBatch",
          exportXlsUrl: "tjfx/pyqktj/exportXls",
          extract: "tjfx/pyqktj/init",
        },
        replaceFields:
          { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
        sswgTreeDateoptions: [],
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.getCurrentMonth()
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl').then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
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
          this.queryParam.zzbz = store.getters.orgCode
        }
        this.loadData(1);
      },
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjrq) {
          tjyfMoment = this.queryParam.tjrq.format("YYYY-MM-DD");
        }
        console.log(tjyfMoment+'====tjyfMoment=====')
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq = tjyfMoment;
        }
        return filterObj(param);
      },
      initData() {
        let tjrq=''
        var params = Object.assign({}, this.queryParam)
        if (params.tjrq === undefined || params.tjrq === null) {
          this.$message.warning("请选择统计日期！")
          return false
        }else {
          tjrq = moment(params.tjrq).format("YYYY-MM-DD")
        }
        this.loading = true
        putAction(this.url.extract, {'tjrq': tjrq}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error(error, "提取失败！")
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
