<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="走访日期">
              <a-date-picker v-model="queryParam.zfrq" placeholder="请选择走访日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             show-search :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
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
      <a-button @click="initData" icon="area-chart" v-has="'bldkhzfmx:init'">提取</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('不良贷款户走访数据明细')" v-has="'bldkhzfmx:exp'">导出</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">-->
        <!--<a-menu slot="overlay">-->
          <!--<a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
        <!--</a-menu>-->
        <!--<a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--</a-dropdown>-->
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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
    <bldkhZfsjmx-modal ref="modalForm" @ok="modalFormOk"></bldkhZfsjmx-modal>
  </a-card>
</template>

<script>
  import BldkhZfsjmxModal from './modules/BldkhZfsjmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import store from '@/store/'
  import { getAction, postAction } from '@/api/manage'

  export default {
    name: "BldkhZfsjmxList",
    mixins:[JeecgListMixin],
    components: {
      BldkhZfsjmxModal, JTreeSelect
    },
    data () {
      return {
        description: '不良贷款户走访数据明细管理页面',
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
            dataIndex: 'tjrq'
           },
		   {
            title: '走访日期',
            align:"center",
            dataIndex: 'zfrq'
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
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '贷款真实性',
            align:"center",
            dataIndex: 'dkzsx_dictText'
           },
		   {
            title: '健康状态',
            align:"center",
            dataIndex: 'jkzk_dictText'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz'
           },
		   {
            title: '备注1',
            align:"center",
            dataIndex: 'bz1'
           },
		   {
            title: '备注2',
            align:"center",
            dataIndex: 'bz2'
           },
		   {
            title: '资料数量',
            align:"center",
            dataIndex: 'zlsl'
           },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
		url: {
          list: "/zfsjmx/bldkhZfsjmx/list",
          delete: "/zfsjmx/bldkhZfsjmx/delete",
          deleteBatch: "/zfsjmx/bldkhZfsjmx/deleteBatch",
          exportXlsUrl: "zfsjmx/bldkhZfsjmx/exportXls",
          importExcelUrl: "zfsjmx/bldkhZfsjmx/importExcel",
          init: "/zfsjmx/bldkhZfsjmx/init",
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
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate);
        this.queryParam = {tjrq: undefined,zzbz: undefined};
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
        if ((params.tjrq != undefined && params.tjrq != null)) {
          params.tjrq = moment(params.tjrq).format("YYYY-MM-DD");
        }
        if ((params.zfrq != undefined && params.zfrq != null)) {
          params.zfrq = moment(params.zfrq).format("YYYY-MM-DD");
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
        let tjrq=''
        var params = Object.assign({}, this.queryParam)
        if (params.tjrq === undefined || params.tjrq === null) {
          this.$message.warning("请选择统计日期！")
          return false
        }else {
          tjrq = moment(params.tjrq).format("YYYY-MM-DD")
        }
        this.loading = true
        postAction(this.url.init, {'tjrq': tjrq}).then((res) => {
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