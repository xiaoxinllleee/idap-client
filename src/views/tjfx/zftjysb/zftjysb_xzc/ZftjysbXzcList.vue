<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择" v-model="queryParam.sszh" @change="sszhChange"
                             dict="v_hr_bas_organization_cmms,zzjc,zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="isAll"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="行政村（请先选择所属支行）">
              <a-select placeholder="请选择" v-model="queryParam.xzc" :disabled="XzcDisabled">
                <a-select-option v-for="item in xzcOptions" :key="item.wgbh" :value="item.wgbh">{{ item.wgmc }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="tasksetQuery" icon="search" style="margin-left: 8px"
                        v-has="'ZftjysbXzcL:tasksetQuery'">查询任务数据</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleInit" icon="area-chart" v-has="'ZftjysbXzcL:init'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('行政村走访数据明细统计')" v-has="'ZftjysbXzcL:exp'">导出</a-button>
      <a-button icon="download" @click="handleTasksetExportXls('行政村走访数据明细统计')"
                v-has="'ZftjysbXzcL:tasksetExport'">导出任务数据
      </a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a-button @click="viewDetail(record)" v-has="'ZftjysbXzcL:viewDetail'">用信明细</a-button>
<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <yxkh-modal ref="yxkhModal" />
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import { mapGetters } from 'vuex'
  import { filterObj } from '@/utils/util'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import yxkhModal from './modules/yxkhModal'
  import store from '@/store/'
  export default {
    name: "ZftjysbXzcList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      JInput,
      yxkhModal
    },
    data () {
      return {
        description: '永兴走访统计验收表',
        monthFormat: 'YYYY-MM',
        XzcDisabled: true,
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        // 表头
        isAll: false,
        sszh :'',
        xzcOptions: [],
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '支行名称',
            align: "center",
            dataIndex: 'sszh_dictText',
            sorter: (a, b) => b.sszh - a.sszh,
          },
          {
            title: '自然村',
            align: "center",
            dataIndex: 'xzc_dictText',
          },
          {
            title: '示范村户数',
            align: "center",
            dataIndex: 'zhs'
          },
          {
            title: '黑名单户数',
            align: "center",
            dataIndex: 'heimdhs'
          },
          {
            title: '灰名单户数',
            align: "center",
            dataIndex: 'huimdhs',
          },
          {
            title: '背靠背评议数',
            align: "center",
            dataIndex: 'bkbpyhs',
          },
          {
            title: '走访数',
            align: "center",
            dataIndex: 'zfhs',
          },
          {
            title: '授信户数',
            align: "center",
            dataIndex: 'sxhs',
          },
          {
            title: '用信户数',
            align: "center",
            dataIndex: 'yxhs',
          },
          {
            title: '得分',
            align: "center",
            dataIndex: 'zdf',
          },
          {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            align: "center",
            scopedSlots: { customRender: 'action' },
            width: 80,
          }
        ],
        url: {
          list: "/tjfx/zftjysb/xzcysb/list",
          tastsetList: "/tjfx/zftjysb/xzcysb/tasksetList",
          delete: "/tjfx/zftjysb/xzcysb/delete",
          deleteBatch: "/tjfx/zftjysb/xzcysb/deleteBatch",
          exportXlsUrl: "tjfx/zftjysb/xzcysb/exportXls",
          exportTasksetXlsUrl: "tjfx/zftjysb/xzcysb/exportTasksetXls",
          importExcelUrl: "tjfx/zftjysb/xzcysb/importExcel",
          init: "/tjfx/zftjysb/xzcysb/init",
          // getXzcList: "/yxdygl/ejyxdygl/querlist"
          getXzcList: "/yxdyglmain/yxdyglMain/querlist"
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created(){
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
    },
    methods: {
      ...mapGetters(["userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.flag = false;
        this.$route.query.sszh = null;
        this.queryParam = {}
        this.xzcOptions = []
        this.XzcDisabled=true
        if (!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      sszhChange(value) {
        console.log('所属支行监听事件 -', value)
        //根据所选支行获取行政村数据
        let params = {}
        params.zzbz = value
        params.wgxz = 2
        params.pageSize = 999
        this.$set(this.queryParam, 'xzc', '')
        if (value) {
          this.XzcDisabled=true
          getAction(this.url.getXzcList, params).then(res => {
            console.log('getXzcList', res)
            this.xzcOptions = res.result.records
            console.log(this.xzcOptions)
          }).finally(()=>{
            this.XzcDisabled=false
          })
        } else {
          this.xzcOptions = []
        }
      },
      loadData(arg, queryUrl) {
        if (!queryUrl) {
          queryUrl = this.url.list
        }
        if(!queryUrl){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件

        this.loading = true;
        getAction(queryUrl, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          } else {
            this.dataSource = []
            this.ipagination.total = 0
          }
          if(res.code===510){
            this.$message.warning(res.message)
          }
          this.loading = false;
        })
      },
      tasksetQuery() {
        //根据设置的任务查询对应的数据
        this.loadData(1, this.url.tastsetList)
      },
      getQueryParams() {
        let sszhValue  = this.$route.query.sszh;
        var param = Object.assign({}, this.queryParam);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (sszhValue) {
          param.sszh = sszhValue;
        }

        return filterObj(param);
      },

      handleInit: function() {
        this.loading = true;
        getAction(this.url.init, {}).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData(1);
          } else {
            this.$message.warning(res.message);
          }
          this.loading = false;
        })
      },
      handleTasksetExportXls(fileName) {
        this.handleExportXls(fileName, this.url.exportTasksetXlsUrl)
      },
      handleExportXls(fileName, exportUrl){
        if (!exportUrl) {
          exportUrl = this.url.exportXlsUrl
        }
        var param = this.getQueryParams();//查询条件
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        //let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        // if (param.tjyf != null){
        //   param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
        console.log("导出参数",param)
        downFile(exportUrl,param).then((data)=>{
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
      viewDetail(record) {
        console.log('viewDetail', record)
        this.$refs['yxkhModal'].detail(record)
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>