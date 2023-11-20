<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh" @change="sszhChange"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8"><a-form-item label="行政村">
            <a-select placeholder="请先选择支行然后选择行政村" v-model="queryParam.xzc">
              <a-select-option v-for="item in xzcOptions" :key="item.dybh" :value="item.dybh">{{ item.dymc }}</a-select-option>
            </a-select>
          </a-form-item></a-col>

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
      <a-button @click="handleInit" type="primary" icon="area-chart">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
        <span slot="image" slot-scope="text, record">
          <img :src="getImgView(record.fwlj)" preview style="width:100px; height:100px"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="viewDetail(record)">查看详情</a>
          <a-divider type="vertical" />
          <a @click="exportDetail(record)">导出详情</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <tpcfsctj-modal ref="tpcfsctjModal" />
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import TpcfsctjModal from './modules/TpcfsctjModal'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  export default {
    name: "XzcTpcfsctjList",
    mixins:[JeecgListMixin],
    components: {
      TpcfsctjModal, JTreeSelect
    },
    data () {
      return {
        description: '行政村图片重复上传统计',
        monthFormat: 'YYYY-MM',
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
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText',
          },
          {
            title: '行政村',
            align: "center",
            dataIndex: 'xzc_dictText',
          },
          {
            title: '图片',
            align: "center",
            dataIndex: 'fwlj',
            scopedSlots: { customRender: 'image' },
          },
          {
            title: '重复上传户数',
            align: "center",
            dataIndex: 'cfschs',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/tjfx/tpcfsctj/xzclist",
          init: "/tjfx/tpcfsctj/init",
          exportXlsUrl: "/tjfx/tpcfsctj/exportDetail",
          getXzcList: "/yxdygl/ejyxdygl/querlist"
        },
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
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      sszhChange(value) {
        console.log('sszhChange', value)
        //根据所选支行获取行政村数据
        let params = {}
        params.sszh = value
        params.pageSize = 999
        this.$set(this.queryParam, 'xzc', '')
        if (value) {
          getAction(this.url.getXzcList, params).then(res => {
            console.log('getXzcList', res)
            this.xzcOptions = res.result.records
            console.log(this.xzcOptions)
          })
        } else {
          this.xzcOptions = []
        }
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
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      viewDetail(record) {
        this.$refs['tpcfsctjModal'].init(record, 3)
      },
      exportDetail(record) {
        let fileName = "图片重复上传详情"
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {}
        param.md5 = record.md5
        param.sszh = record.sszh
        param.xzc = record.xzc
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